/**
 * career-ops-wrap / src/batch.js
 * Batch Processor · 批量处理器
 */

const { CareerEvaluator } = require('./evaluator');

class BatchProcessor {
  constructor(options = {}) {
    this.evaluator = new CareerEvaluator(options.evaluatorOptions || {});
    this.concurrency = options.concurrency || 5;
  }

  /**
   * Process multiple job listings in parallel
   * @param {Array} jobs - Array of job objects
   * @returns {Promise<Array>} Sorted results
   */
  async processBatch(jobs) {
    console.log(`⚡ Processing ${jobs.length} jobs with concurrency ${this.concurrency}...\n`);

    const chunks = this._chunkArray(jobs, this.concurrency);
    let allResults = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`  Batch ${i + 1}/${chunks.length}: processing ${chunk.length} jobs`);

      const chunkResults = await Promise.all(
        chunk.map(job => this._processWithRetry(job))
      );

      allResults = allResults.concat(chunkResults);
      console.log(`  ✅ Batch ${i + 1} complete\n`);
    }

    // Sort by score descending
    return allResults.sort((a, b) => b.score - a.score);
  }

  /**
   * Process a single job with retry logic
   * @param {Object} job
   * @returns {Promise<Object>}
   */
  async _processWithRetry(job, retries = 2) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // In real usage: spawns claude -p worker sub-agent
        // worker runs modes/oferta.md evaluation
        const result = this.evaluator.evaluate(job);
        return { ...result, attempts: attempt + 1 };
      } catch (err) {
        if (attempt === retries) throw err;
        await this._delay(1000 * Math.pow(2, attempt)); // exponential backoff
      }
    }
  }

  _chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate batch report
   * @param {Array} results
   * @returns {string} Markdown report
   */
  generateReport(results) {
    const lines = [
      '# Batch Evaluation Report',
      `Generated: ${new Date().toISOString()}`,
      `Total: ${results.length} offers evaluated\n`,
      '## Top Picks\n'
    ];

    results.slice(0, 10).forEach((r, i) => {
      lines.push(`${i + 1}. **[${r.grade}]** ${r.company} · ${r.job_title}`);
      lines.push(`   Score: ${r.score}/5.0 | Archetype: ${r.archetype} | Attempts: ${r.attempts}`);
    });

    lines.push('\n## Summary\n');
    const grades = results.reduce((acc, r) => {
      acc[r.grade] = (acc[r.grade] || 0) + 1;
      return acc;
    }, {});
    Object.entries(grades).forEach(([g, c]) => lines.push(`- ${g}: ${c}`));

    return lines.join('\n');
  }
}

// Demo
const processor = new BatchProcessor({ concurrency: 3 });

const mockJobs = Array.from({ length: 12 }, (_, i) => ({
  title: ['Senior LLMOps Engineer', 'AI Platform Engineer', 'Head of Applied AI', 'Staff SWE'][i % 4],
  company: ['Anthropic', 'OpenAI', 'ElevenLabs', 'Retool', 'n8n', 'LangChain'][i % 6],
  description: 'AI role with focus on production ML systems'
}));

(async () => {
  console.log('🎯 Career-Ops Wrapper · Batch Processor Demo\n');
  const results = await processor.processBatch(mockJobs);
  console.log('\n📋 Report:\n');
  console.log(processor.generateReport(results));
})();

module.exports = { BatchProcessor };
