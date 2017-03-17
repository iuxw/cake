// 管理员登录检查请求过滤器
function isAdmin(req,res,next) {
    if (req.cookies.admin){
        next();
    }else {
        res.redirect('/adminLogin')
    }
}
var funObj = {
    isAdmin:isAdmin
};
module.exports = funObj;