const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const itemRouter = require('./routes/item.router');
const orderItemRouter = require('./routes/orderItem.router');
const orderCustomerRouter = require('./routes/orderCustomer.router');
const optionRouter = require('./routes/option.router');

app.use(express.json());
app.use(cookieParser());
app.use('/', [itemRouter, orderItemRouter, orderCustomerRouter, optionRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다.');
});
