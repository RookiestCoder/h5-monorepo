#!/usr/bin/env node

const { cli } = require('../lib');

cli({
  source: process.cwd(),
  componentRootDir: 'src/components'
});
