/**
 * Created by Administrator on 2017/3/9 0009.
 */
var db = require("../db/db.js");
const express = require('express');
const router = express.Router();

router.post('/api/login', function (req, res) {
    user = req.body;
    db.User.find({phone: user.phone, password: user.password}).exec(function (err, data) {
        if (!err) {
            if (data.length > 0) {
                res.status(200).json({code: "success", message: '登陆成功'})
            } else {
                res.status(200).json({code: "error", message: '账号密码错误'})
            }
        }
    })
});
router.post('/api/register', function (req, res) {
    user = req.body;
    delete user.password1;
    user.createTime = new Date().getTime();
    db.User.find({phone: user.phone}).exec(function (err, data) {
        if (!err) {
            if (data.length > 0) {
                console.log(data);
                res.status(200).json({code: "error", message: '该手机号已被注册！'})
            } else {
                new db.User(user).save(function (err, data) {
                    if (!err) {
                        res.status(200).json({code: "success", message: '注册成功'})
                    } else {
                        res.status(200).json({code: "error", message: '注册失败，请重试！'})
                    }
                })
            }
        }
    })

});
router.post('/api/cart', function (req, res) {
    var user = req.cookies.user;
    if (user) {
        var cart = req.body;
        cart.createTime = new Date().getTime();
        new db.Cart(cart).save(function (err, data) {
            if (!err) {
                var cartId = data._id;
                db.User.find({phone: user}).exec(function (err, userObj) {
                    userObj[0].carts.push(cartId);
                    userObj[0].save(function (err) {
                        res.status(200).json({code: "success", message: "添加成功！"});
                    })
                })
            } else {
                res.status(200).json({code: "error", message: "添加失败！"});
            }
        })
    } else {
        res.status(200).json({code: "error", message: "请先登录！"});
    }
});
router.post('/api/del', function (req, res) {
    var user = req.cookies.user;
    db.User.findByIdAndRemove(req.body.id, function (err) {
        if (!err) {
            console.log('删除成功');
        }
    })
    db.User.find({phone: user}).exec(function (err, data) {
        data[0].carts = data[0].carts.filter(function (ele, array) {
            return ele != req.body.id;
        });
        data[0].save(function (
            err) {
            console.log('删除成功');
            res.status(200).json({code: "success", message: "删除成功！"});
        })

    })
})
router.post('/api/order', function (req, res) {
    var order = req.body;
    order.user = req.cookies.user;
    db.User.find({phone: order.user}).exec(function (err, data) {
        if (data[0].address && data[0].contact) {
            order.status = '待支付';
            order.address = data[0].address;
            order.contact = data[0].contact;
            new db.Order(order).save(function (err, data) {
                if (!err) {
                    res.status(200).json({code: 'success', message: '下单成功，请支付'})
                } else {
                    res.status(200).json({code: 'error', message: '下单失败，请重新购买'})
                }
            })
        } else {
            res.status(200).json({code: 'base', message: '请填写收货地址'})
        }
    })
})
router.post('/api/payOver', function (req, res) {
    db.Order.find({orderNumber: req.body.orderNumber}).exec(function (err, data) {
        console.log(data);
        data[0].status = '待发货';
        data[0].payTime = new Date().getTime();
        data[0].save(function (err) {
            if (!err) {
                res.status(200).json({code: 'success'})
            }
        })
    })
})
router.post('/api/address', function (req, res) {
    var user = req.cookies.user;
    db.User.find({phone: user}).exec(function (err, data) {
        if (!err) {
            data[0].address = req.body.address;
            data[0].contact = req.body.contact;
            data[0].save(function (err) {
                if (!err) {
                    res.status(200).json({code: 'success', message: '保存成功'})
                }
            })
        }
    })
})
router.post('/api/admin', function (req, res) {
    console.log(req.body.oldpassword);
    db.Admin.find({adminName: req.body.adminName, password: req.body.oldpassword}).exec(function (err, data) {
        console.log(data);
        if (!err) {
            if (data[0]) {
                data[0].password = req.body.password;
                data[0].save(function (err) {
                    if (!err) {
                        res.status(200).json({code: 'success', message: '修改管理密码成功！'});
                    }
                })
            } else {
                res.status(200).json({code: 'error', message: '原始密码或账号错误'});
            }
        }
    })
})
router.post('/api/admin/login',function (req,res) {
    db.Admin.find({adminName:req.body.adminName,password:req.body.password}).exec(function (err,data) {
        if(!err){
            if(data.length>0){
                res.status(200).json({code:'success',message:'管理员登录成功'})
            }else {
                res.status(200).json({code:'error',message:'用户名密码错误'})
            }
        }
    })
})
//管理员修改订单
router.post('/api/admin/changeOrder',function (req,res) {
    db.Order.findByIdAndUpdate(req.body.id,{status:'待收货'},function (err) {
        if(!err){
            res.status(200).json({code:'success',message:'发货完成！'})
        }
    })
})
//用户修改订单
router.post('/api/user/changeOrder',function (req,res) {
    db.Order.findByIdAndUpdate(req.body.id,{status:'已完成'},function (err) {
        if(!err){
            res.status(200).json({code:'success',message:'已确认收货！'})
        }
    })
})
module.exports = router;
