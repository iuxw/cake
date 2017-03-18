// 导入express模块
var express = require("express");
var db = require("../db/db.js");
const filter = require('../extensions/filter.js');

// 生成路由
var router = express.Router();

function getPage(req, res, title, alone) {
    var user = req.cookies.user;
    var lists = 0;
    if (user) {
        db.User.find({phone: user}).exec(function (err, data) {
            lists = data[0].carts.length;
            user = '****' + user.substr(4);
            res.render(alone, {
                title,
                alone,
                user,
                lists
            })
        })
    } else {
        res.render(alone, {
            title,
            alone,
            lists
        })
    }
}
// 网站首页路由
router.get('/', (req, res) => {
    getPage(req, res, '首页', 'index');
})
router.get('/cart', (req, res) => {
    var user = req.cookies.user;
    var lists = 0;
    if (user) {
        db.User.find({phone: user}).populate({path: "carts"}).exec(function (err, data) {
            lists = data[0].carts.length;
            user = '****' + user.substr(4);
            res.render('cart', {
                title: '购物车',
                alone: 'cart',
                user,
                lists,
                indents: data[0].carts.reverse()
            })
        })
    } else {
        res.render('cart', {
            title: '购物车',
            alone: 'cart',
            lists
        })
    }
})
router.get('/order', (req, res) => {
    var user = req.cookies.user;
    var lists = 0;
    if (user) {
        db.User.find({phone: user}).exec(function (err, data) {
            lists = data[0].carts.length;
            user = '****' + user.substr(4);
            db.Order.find({user: req.cookies.user}).exec(function (err, orders) {
                if (!err) {
                    res.render('order', {
                        title: '我的订单',
                        alone: 'order',
                        user,
                        lists,
                        orders: orders.reverse()
                    })
                }
            })
        })
    } else {
        res.render('order', {
            title: '我的订单',
            alone: 'order',
            lists
        })
    }
})
router.get('/list', (req, res) => {
    var index=req.query.index;
    var user = req.cookies.user;
    var lists = 0;
    if (user) {
        db.User.find({phone: user}).exec(function (err, data) {
            lists = data[0].carts.length;
            user = '****' + user.substr(4);
            res.render('list', {
                title:'蛋糕列表',
                alone:'list',
                user,
                lists,
                index
            })
        })
    } else {
        res.render('list', {
            title:'蛋糕列表',
            alone:'list',
            lists,
            index
        })
    }
})
router.get('/detail', (req, res) => {
    getPage(req, res, '蛋糕详情', 'detail');
});
router.get('/address', (req, res) => {
    var user = req.cookies.user;
    var lists = 0;
    if (user) {
        db.User.find({phone: user}).exec(function (err, data) {
            res.render('address', {
                title: '地址管理',
                alone: 'address',
                user: '****' + user.substr(4),
                lists: data[0].carts.length,
                address: data[0].address,
                contact: data[0].contact
            })
        })
    } else {
        res.render('cart', {
            title: '购物车',
            alone: 'cart',
            lists
        })
    }
})
router.get('/pay', (req, res) => {
    var orderNumber = req.cookies.orderNumber;
    db.Order.find({orderNumber: orderNumber}).exec(function (err, data) {
        if (!err) {
            res.render('pay', {
                title: '支付',
                alone: 'pay',
                order: data[0]
            })
        }
    })
})
//管理页
router.get('/admin',filter.isAdmin,(req, res) => {
    var admin=req.cookies.admin;
    db.Order.find().exec(function (err, data) {
        orders = data.filter(function (ele) {
            return ele.status == '待发货' || ele.status == '待收货' || ele.status == '已完成';
        });
        res.render('admin', {
            title: '生日蛋糕购买网站后台管理',
            alone: 'admin',
            orders:orders.reverse(),
            admin
        })
    })
})
router.get('/adminLogin',(req, res) => {
    res.render('adminLogin', {
        title: '管理员登录',
        alone: 'adminLogin'
    })
})
module.exports = router;
