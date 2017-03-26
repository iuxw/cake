const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cake");
const db = mongoose.connection;
db.on("open", () => {
    console.log("打开数据库成功！");
});
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