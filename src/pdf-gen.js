/**
 * career-ops-wrap / src/pdf-gen.js
 * ATS-Optimized PDF Generator · PDF生成器
 */

const fs = require('fs');
const path = require('path');

class PDFGenerator {
  constructor(options = {}) {
    this.templateDir = options.templateDir || path.join(__dirname, '../templates');
    this.outputDir = options.outputDir || path.join(__dirname, '../output');
    this.fonts = {
      heading: 'Space Grotesk',
      body: 'DM Sans'
    };
  }

  /**
   * Generate ATS-optimized CV PDF
   * @param {Object} params - Generation parameters
   * @returns {string} Path to generated PDF
   */
  async generateCV({ cv, jobDescription, outputName }) {
    const html = this._buildHTML(cv, jobDescription);
    const outputPath = path.join(this.outputDir, `${outputName || 'cv'}.pdf`);

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // In real usage, this uses Playwright to render HTML → PDF
    // playwright: await this._renderPDF(html, outputPath);
    console.log(`📄 [DEMO] PDF would be generated at: ${outputPath}`);
    console.log(`   Template: ${this.fonts.heading} + ${this.fonts.body}`);
    console.log(`   ATS keywords injected for: ${jobDescription?.substring(0, 50)}...`);

    return outputPath;
  }

  _buildHTML(cv, jobDescription) {
    return `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'DM Sans', sans-serif; color: #1a1a2e; }
    h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
    .keyword-highlight { background: #e8f4fd; padding: 0 4px; border-radius: 2px; }
  </style>
</head>
<body>${cv}</body>
</html>`;
  }

  /**
   * Inject ATS keywords from job description into CV
   * @param {string} cv - CV markdown content
   * @param {string} jd - Job description text
   * @returns {string} CV with injected keywords
   */
  injectKeywords(cv, jd) {
    // Extract keywords from JD, highlight matching terms in CV
    const keywords = this._extractKeywords(jd);
    let processed = cv;
    keywords.slice(0, 15).forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      processed = processed.replace(regex, '<span class="keyword-highlight">$1</span>');
    });
    return processed;
  }

  _extractKeywords(text) {
    // Simple keyword extraction (real version uses AI reasoning)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return text.split(/\s+/)
      .filter(w => w.length > 4 && !stopWords.has(w.toLowerCase()))
      .slice(0, 20);
  }
}

// Demo
const generator = new PDFGenerator();
generator.generateCV({
  cv: fs.readFileSync(path.join(__dirname, '../examples/sample-cv.md'), 'utf8'),
  jobDescription: 'Looking for Senior LLMOps Engineer with LangChain, Python, Go, AWS, and experience building production ML pipelines',
  outputName: 'ming-llmops-cv'
}).then(p => console.log(`\n✅ Demo complete: ${p}`));

module.exports = { PDFGenerator };
