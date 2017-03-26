const express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  template = require('./extensions/template.js'),
  app = express();
app.use(express.static('www'));
app.engine(".html", template.__express);
app.set("view engine", "html");
//app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require("./routers/index.js"));
app.use(require("./routers/api.js"));
app.listen(3000, () => {
  console.log('服务器正常起动');
});
