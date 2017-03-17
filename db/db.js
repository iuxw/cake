// 加载模块
const mongoose = require("mongoose");
// 用es6中的Promise来取代 mongoose里集成的已经过时的
// promise
mongoose.Promise = Promise;
// 连接数据库
mongoose.connect("mongodb://localhost/cake");
const db = mongoose.connection;
// 是否打开数据库成功
db.on("open", () => {
    console.log("打开数据库成功！");
});

// students集合
const User = mongoose.model("user", {
    phone: String,
    password: String,
    createTime: Number,
    carts:[{
        type:"ObjectId",
        ref:"cart"
    }],
    address:String,
    contact:String
});
const Cart = mongoose.model("cart", {
    name: String,
    size:String,
    number:Number,
    price:Number,
    createTime:Number
});
const Order = mongoose.model("order", {
    name: String,
    size:String,
    number:Number,
    price:Number,
    orderNumber:Number,
    user:String,
    status:String,
    payTime:Number,
    address:String,
    contact:String
});
const Admin=mongoose.model("admin",{
    adminName:String,
    password:String
})

// 导出一个构造方法
module.exports.User = User;
module.exports.Cart = Cart;
module.exports.Order = Order;
module.exports.Admin = Admin;