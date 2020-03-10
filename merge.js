var fs      = require("node-fs"),
    extend  = require('node.extend');

var defaultOptions  = {
  recursive: true,  // whether to merge recursively
  overwrite: false  // whether to overwrite existing files
};

var mergeTo = function(f1, f2, options) {
  // store the options
  options = extend({}, defaultOptions, options);

  var file, files, stats, _i, _len, _results;
  files = fs.readdirSync(f1);
  _results = [];

  // loop through and copy the files
  for (_i = 0, _len = files.length; _i < _len; _i++) {
    file = files[_i];
    stats = fs.lstatSync(f1 + "/" + file);

    if (stats.isDirectory()) {
      // file is a directory

      if(options.recursive){
        // recursive - merge the directory
        _results.push(mergeTo(f1 + "/" + file, f2 + "/" + file, options));
      }else{
        // not recursive - skip the directory
        _results.push(console.log('Skipping directory ' + f2 + '/' + file));
      }
    } else {
      // normal file
      if (options.overwrite || !fs.existsSync(f2 + "/" + file)) {
        // file doesn't exist or we can overwrite
        fs.mkdirSync((f2 + "/" + file).split("/").slice(0, -1).join("/"), 0x1ed, true);
        fs.writeFileSync(f2 + "/" + file, fs.readFileSync("" + f1 + "/" + file));
        _results.push(console.log("Merged " + f2 + "/" + file));
      } else {
        // file already exists
        _results.push(console.log("File exists " + f2 + "/" + file));
      }
    }
  }
  return _results;
};

exports.mergeTo = mergeTo;