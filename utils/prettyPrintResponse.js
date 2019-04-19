const util = require('util');

module.exports = response => {
  console.log(util.inspect(response, {colors: true, depth: 4}));
}
