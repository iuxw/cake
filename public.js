/**
 * Created by Administrator on 2017/3/17 0017.
 */
//检测登录
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