/**
 * career-ops-wrap / src/evaluator.js
 * A-F Scoring Evaluation Engine · 评估引擎
 */

class CareerEvaluator {
  constructor(options = {}) {
    this.profile = options.profile || {};
    this.cv = options.cv || '';
    this.dimensions = [
      'role_match',      // 角色匹配度
      'comp_gap',        // 薪资差距
      'level_fit',      // 级别适配
      'tech_stack',     // 技术栈契合
      'growth',         // 成长空间
      'stability',      // 公司稳定性
      'culture',        // 文化契合
      'location',       // 地理位置
      'remote',         // 远程政策
      'signing_bonus'   // 签字费
    ];
  }

  /**
   * Evaluate a job offer · 评估一个Offer
   * @param {Object} job - Job description object
   * @returns {Object} Evaluation result with A-F grade
   */
  evaluate(job) {
    const scores = {};
    let total = 0;

    this.dimensions.forEach(dim => {
      scores[dim] = this._scoreDimension(dim, job);
      total += scores[dim];
    });

    const avg = total / this.dimensions.length;
    const grade = this._gradeFromScore(avg);
    const recommendation = avg >= 4.0 ? 'CONSIDER' : 'SKIP';

    return {
      job_title: job.title,
      company: job.company,
      grade,
      score: Math.round(avg * 100) / 100,
      dimension_scores: scores,
      recommendation,
      archetype: this._detectArchetype(job),
      timestamp: new Date().toISOString()
    };
  }

  _scoreDimension(dim, job) {
    // Placeholder scoring logic
    // In real usage, this reads cv.md and reasons about fit
    return 3.0 + (Math.random() * 1.5);
  }

  _gradeFromScore(score) {
    if (score >= 4.5) return 'A+';
    if (score >= 4.0) return 'A';
    if (score >= 3.5) return 'B+';
    if (score >= 3.0) return 'B';
    if (score >= 2.5) return 'C';
    return 'D';
  }

  _detectArchetype(job) {
    const title = (job.title || '').toLowerCase();
    const desc = (job.description || '').toLowerCase();

    if (title.includes('llm') || desc.includes('llmops')) return 'LLMOps';
    if (title.includes('agent')) return 'Agentic';
    if (title.includes('product') || title.includes('pm')) return 'PM';
    if (title.includes('solutions') || title.includes('architect')) return 'SA';
    if (title.includes('founder') || title.includes('cto')) return 'FDE';
    return 'Transformation';
  }

  /**
   * Batch evaluate multiple offers · 批量评估
   * @param {Array} jobs - Array of job objects
   * @returns {Array} Sorted evaluation results
   */
  batchEvaluate(jobs) {
    return jobs
      .map(job => this.evaluate(job))
      .sort((a, b) => b.score - a.score);
  }
}

// Demo usage
const jobs = [
  {
    title: 'Senior LLMOps Engineer',
    company: 'Anthropic',
    description: 'Build and scale Claude API infrastructure...'
  },
  {
    title: 'AI Platform Engineer',
    company: 'ElevenLabs',
    description: 'Design voice AI infrastructure...'
  },
  {
    title: 'Head of Applied AI',
    company: 'Retool',
    description: 'Lead AI integration across enterprise platform...'
  }
];

const evaluator = new CareerEvaluator({
  profile: { name: 'Ming', target_roles: ['LLMOps', 'AI Engineer'] },
  cv: 'See examples/sample-cv.md'
});

console.log('🎯 Career-Ops Wrapper · Evaluation Demo\n');
jobs.forEach(job => {
  const result = evaluator.evaluate(job);
  console.log(`[${result.grade}] ${result.company} · ${result.job_title}`);
  console.log(`   Score: ${result.score}/5.0 · Archetype: ${result.archetype}`);
  console.log(`   Recommendation: ${result.recommendation}\n`);
});

module.exports = { CareerEvaluator };
