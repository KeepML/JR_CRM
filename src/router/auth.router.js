const Router = require('koa-router');

const authRouter = new Router();

const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware');

const {
    login,
    success
} = require('../controller/auth.controller');

//用户登录
authRouter.post('/login',verifyLogin,login);

//用户登录测试验证
authRouter.get('/test',verifyAuth,success);

module.exports = authRouter;