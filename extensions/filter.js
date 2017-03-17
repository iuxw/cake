// 登录检查请求过滤器
function isLogin(req, res, next) {
    if( req.cookies.name ){
        next();
    }else{
        // console.log('请登陆');
        res.redirect("/user/login")
    }   
}

function first() {

}

var filter = {
  isLogin: isLogin,
  first: first
}

module.exports = filter;