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
const passport = require('koa-passport')
router.get('/', function *(next) {
    let s = this.session
    if(!s.cnt)s.cnt = 1
    else
        s.cnt +=1
    console.log(s)
    this.body = yield render('index')
});
router.get('/login',function*(next){

        if(this.isAuthenticated()){
            this.redirect('/')
        }else{
            this.body = yield render('login')
        }

})
router.post('/login',function *(next){
    let ctx = this
    yield passport.authenticate('local', function(err, user, info, status) {
        if (user === false) {
            ctx.body = { success: false }
            ctx.throw(401)
        } else {
            ctx.login(user)
            return ctx.redirect('back')
        }
    })(ctx, next)
})
router.get('/logout',function *(next){
    this.logout()
    this.redirect('/login')
})
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