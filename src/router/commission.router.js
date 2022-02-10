const Router = require('koa-router');
const {
    list
} = require('../controller/commission.controller');
const commissionRouter = new Router({prefix: "/commission"});

const {
    verifyAuth,
    verifyMap
} = require('../middleware/auth.middleware')


//提成信息查询
commissionRouter.get('/',verifyAuth,verifyMap,list);

module.exports = commissionRouter;