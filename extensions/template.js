const template = require('art-template');

// art-template配置 设置缓存
template.config("Cache", false);

template.helper("formatTime", function (val) {
    if (!val) {
        return "";
    }
    var time = new Date(val);
    //2016-10-09 09:10
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;

    return (year + "-" + month + "-" + day + " " + hour + ":" + minute);
});
template.helper("formatStatus", function (val) {
    switch (val) {
        case '待支付':
            return '立即支付';
        case '待发货':
            return '提醒发货';
        case '待收货':
            return '确认收货';
    }
});
template.helper("formatadStatus", function (val) {
    switch (val) {
        case '待发货':
            return '发货';
        case '待收货':
            return '提醒收货';
    }
})
// 提供内容
module.exports = template;