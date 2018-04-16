const postCss = require('postCss');
const plugin = require('postcss-hash-classname');
const fs = require('fs');

let count = 0;

module.exports = {
  process: function(src) {
    count++;
    let opts = { hashType: 'md5', digestType: 'base32' };
    opts.maxLength = 6;
    opts.type = '.json';
    opts.outputName = `../coverage/jsonFile_test_${count}`;
    let processor = postCss([plugin(opts)]);
    processor.process(src).css;
    let jsonMap = fs.readFileSync(
      `../coverage/jsonFile_test_${count}.json`,
      'UTF-8'
    );
    return `module.exports =${jsonMap}`;
  }
};
