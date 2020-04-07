var fs      = require("node-fs"),
    extend  = require('node.extend');

var defaultOptions  = {
  recursive: true,  // whether to merge recursively
  overwrite: false,  // whether to overwrite existing files
  silent: true, //whether to console.log every entry
  deleteFiles: false // if file is located in dir 2, but not in dir 1, it is deleted.
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
        if(options.silent == false) {
        _results.push(console.log('Skipping directory ' + f2 + '/' + file));
        }
      }
    } else {
      // normal file
      if (options.overwrite || !fs.existsSync(f2 + "/" + file)) {
        // file doesn't exist or we can overwrite
        fs.mkdirSync((f2 + "/" + file).split("/").slice(0, -1).join("/"), 0x1ed, true);
        fs.writeFileSync(f2 + "/" + file, fs.readFileSync("" + f1 + "/" + file));
        if(options.silent == false) {
        _results.push(console.log("Merged " + f2 + "/" + file));
        } else
      if (options.deleteFiles) {
        if(!fs.existsSync(f1 + "/" + fs.readdirSync(f2.split('//').join('/'))[_i])) {
        fs.unlinkSync((f2.split('//').join('/') + "/" + fs.readdirSync(f2.split('//').join('/'))[_i]).split('//').join('/'))
        if(options.silent == false) {
        _results.push(console.log("Overwrote & Deleted" + (f2.split('//').join('/') + "/" + fs.readdirSync(f2.split('//').join('/'))[_i]).split('//').join('/')))
        }}
      }
      } else {
        // file already exists
        if(options.silent == false) {
        _results.push(console.log("File exists " + f2 + "/" + file));
        }
      }
    }
  }
  return _results;
};

exports.mergeTo = mergeTo;