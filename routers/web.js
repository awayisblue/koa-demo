/**
 * Created by awayisblue on 2017/3/12.
 */
 var os = require('os');
var path = require('path');
var fs = require('co-fs');
var parse = require('co-busboy');
var saveTo = require('save-to');
const router = require('koa-router')();
const render = require('../lib/render')

router.get('/', function *(next) {
    this.body = yield render('index')
});
router.post('/upload', function *(next) {
      // parse the multipart body
  var parts = parse(this, {
    autoFields: true // saves the fields to parts.field(s)
  });

  // create a temporary folder to store files
  var tmpdir = path.join(os.tmpdir(), uid());

  // make the temporary directory
  yield fs.mkdir(tmpdir);

  // list of all the files
  var files = [];
  var file;

  // yield each part as a stream
  var part;
  while ((part = yield parts)) {
    // filename for this part
    files.push(file = path.join(tmpdir, part.filename));
    // save the file
    yield saveTo(part, file);
  }

  // return all the filenames as an array
  // after all the files have finished downloading
  this.body = files;
});
function uid() {
  return Math.random().toString(36).slice(2);
}
module.exports = router