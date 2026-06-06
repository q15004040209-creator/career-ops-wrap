# Career-Ops Wrapper · Documentation

## Architecture · 架构概览

```
┌─────────────────────────────────────────────────────┐
│              Career-Ops Wrapper                     │
├──────────┬──────────┬──────────┬───────────────────┤
│ evaluator│  pdf-gen │ scanner  │      batch        │
├──────────┴──────────┴──────────┴───────────────────┤
│                    src/                            │
├────────────────────────────────────────────────────┤
│              Go Dashboard TUI                      │
│                 (Bubble Tea)                       │
├────────────────────────────────────────────────────┤
│                modes/ (14 modes)                   │
├────────────────────────────────────────────────────┤
│              templates/ (CV + Portal config)       │
└────────────────────────────────────────────────────┘
```

## API Reference

### CareerEvaluator

```javascript
const { CareerEvaluator } = require('./src/evaluator');

const evaluator = new CareerEvaluator({
  profile: { name: 'Ming', target_roles: ['LLMOps'] },
  cv: 'Your CV text here'
});

const result = evaluator.evaluate({
  title: 'Senior LLMOps Engineer',
  company: 'Anthropic',
  description: '...'
});
```

### PDFGenerator

```javascript
const { PDFGenerator } = require('./src/pdf-gen');

const generator = new PDFGenerator();
await generator.generateCV({
  cv: cvText,
  jobDescription: jdText,
  outputName: 'my-cv'
});
```

### PortalScanner

```javascript
const { PortalScanner } = require('./src/scanner');

const scanner = new PortalScanner();
const jobs = await scanner.scanAll();
// or
const jobs = await scanner.scanCompany('anthropic');
```

### BatchProcessor

```javascript
const { BatchProcessor } = require('./src/batch');

const processor = new BatchProcessor({ concurrency: 5 });
const results = await processor.processBatch(jobs);
console.log(processor.generateReport(results));
```
