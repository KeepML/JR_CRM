const Router = require('koa-router');

const userRouter = new Router({prefix: "/users"});

const {
    create
} = require('../controller/user.controller');
const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware');

/*
    1.注册用户前首先判断用户是否已经存在
    2.密码加密处理
    3.注册新用户
*/
userRouter.post('/',verifyUser,handlePassword,create);

module.exports = userRouter;