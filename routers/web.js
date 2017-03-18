/**
 * Created by awayisblue on 2017/3/12.
 */
const os = require('os');
const path = require('path');
const fs = require('co-fs');
const parse = require('co-busboy');
const saveTo = require('save-to');
const router = require('koa-router')();
const render = require('../lib/render')
const passport = require('koa-passport')
const User = require ('../models/User')
const bcrypt = require('bcryptjs');
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
            console.log('isAuthenticated')
            this.redirect('/')
        }else{
            console.log(' !isAuthenticated')
            this.body = yield render('login')
        }

})
router.post('/login',function *(next){
    let ctx = this
    yield passport.authenticate('local', function(err, user, info, status) {
        if (!user) {
            ctx.body = { success: false }
            ctx.throw(401)
        } else {
            ctx.login(user)
            console.log('loginuser',user)
            return ctx.redirect('back')
        }
    })(ctx, next)
})
router.get('/logout',function *(next){
    this.logout()
    this.redirect('/login')
})

router.get('/register',function *(next){
    this.body = yield render('register')
})

router.post('/register',function *(next){
    // console.log(this.request.body)
    this.checkBody('email').isEmail('email format not correct')
    this.checkBody('password').notEmpty().len(3,20)
    let body = this.request.body

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(body.password, salt);
    let ctx = this
    yield User.sync().then(function () {
        // Table created
        return User.create({
            email: body.email,
            password: hash
        });
    }).then(function(){
        ctx.body = 'ok'
    }).catch(()=>{
        ctx.body = '用户已存在'
        // ctx.throw(401)
    });

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