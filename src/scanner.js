/**
 * career-ops-wrap / src/scanner.js
 * Portal Scanner · 招聘门户扫描器
 */

const https = require('https');

class PortalScanner {
  constructor(options = {}) {
    this.portals = options.portals || this._defaultPortals();
    this.verify = options.verify || false;
  }

  _defaultPortals() {
    return {
      // AI Labs
      anthropic: { url: 'https://boards.greenhouse.io/anthropic', board: 'greenhouse' },
      openai: { url: 'https://jobs.ashbyhq.com/openai', board: 'ashby' },
      elevenlabs: { url: 'https://apply.workable.com/elevenlabs', board: 'workable' },
      langchain: { url: 'https://www.linkedin.com/company/langchain/jobs', board: 'linkedin' },
      pinecone: { url: 'https://www.pinecone.io/careers', board: 'custom' },

      // Voice AI
      polyai: { url: 'https://boards.greenhouse.io/polyai', board: 'greenhouse' },
      parlea: { url: 'https://apply.workable.com/parloa', board: 'workable' },
      hume: { url: 'https://careers.hume.ai', board: 'custom' },
      deepgram: { url: 'https://boards.greenhouse.io/deepgram', board: 'greenhouse' },

      // AI Platforms
      retool: { url: 'https://jobs.ashbyhq.com/retool', board: 'ashby' },
      vercel: { url: 'https://vercel.com/careers', board: 'custom' },
      temporal: { url: 'https://www.temporal.io/careers', board: 'custom' },
      glean: { url: 'https://www.glean.com/careers', board: 'custom' },

      // Contact Center
      ada: { url: 'https://www.ada.careers', board: 'custom' },
      sierra: { url: 'https://jobs.sierra-ai.com', board: 'custom' },
      talkdesk: { url: 'https://www.talkdesk.com/careers', board: 'custom' },

      // Enterprise
      salesforce: { url: 'https://salesforce.wd1.myworkdayjobs.com', board: 'workday' },
      twilio: { url: 'https://careers.twilio.com', board: 'custom' },
      gong: { url: 'https://www.gong.io/careers', board: 'custom' },

      // LLMOps
      langfuse: { url: 'https://www.langfuse.com/careers', board: 'custom' },
      wandb: { url: 'https://wandb.ai/careers', board: 'custom' },
      lindy: { url: 'https://www.lindy.ai/careers', board: 'custom' },

      // Automation
      n8n: { url: 'https://n8n.io/careers', board: 'custom' },
      zapier: { url: 'https://careers.zapier.com', board: 'custom' }
    };
  }

  /**
   * Scan all configured portals · 扫描所有配置的门
   * @returns {Promise<Array>} Array of job listings found
   */
  async scanAll() {
    console.log(`🔍 Scanning ${Object.keys(this.portals).length} portals...\n`);

    const results = [];
    for (const [name, portal] of Object.entries(this.portals)) {
      try {
        const jobs = await this._fetchJobs(portal);
        console.log(`  ✅ ${name}: ${jobs.length} jobs found`);
        results.push(...jobs.map(j => ({ ...j, source: name })));
      } catch (err) {
        console.log(`  ❌ ${name}: ${err.message}`);
      }
    }

    // Deduplicate
    const deduped = this._deduplicate(results);
    console.log(`\n📊 Total: ${results.length} found → ${deduped.length} unique\n`);

    return deduped;
  }

  /**
   * Scan specific company by name
   * @param {string} companyName
   * @returns {Promise<Array>}
   */
  async scanCompany(companyName) {
    const portal = this.portals[companyName.toLowerCase()];
    if (!portal) {
      throw new Error(`Unknown company: ${companyName}`);
    }
    return this._fetchJobs(portal);
  }

  async _fetchJobs(portal) {
    // In real usage, this makes HTTP requests to each ATS
    // This demo returns placeholder data
    return [
      {
        title: `Senior AI Engineer @ ${portal.url.split('//')[1].split('.')[0]}`,
        url: portal.url,
        posted: new Date().toISOString().split('T')[0],
        board: portal.board
      }
    ];
  }

  _deduplicate(jobs) {
    const seen = new Set();
    return jobs.filter(job => {
      const key = `${job.title}|${job.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

// Demo
const scanner = new PortalScanner({ verify: false });

(async () => {
  console.log('🎯 Career-Ops Wrapper · Portal Scanner Demo\n');
  const jobs = await scanner.scanAll();
  console.log('Sample results:', jobs.slice(0, 3));
})();

module.exports = { PortalScanner };
