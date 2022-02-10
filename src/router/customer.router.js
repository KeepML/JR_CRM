const Router = require('koa-router');

const customerRouter = new Router({prefix: '/cust'});

const {
    list,
    detail,
    nonReturnAmountList,
    updateStatus
} = require('../controller/customer.controller');

const {
    verifyAuth,
    verifyMap
} = require('../middleware/auth.middleware');

//客户信息查询
customerRouter.get('/',verifyAuth,verifyMap,list);
//未收款查询
customerRouter.get('/non',verifyAuth,verifyMap,nonReturnAmountList);
//客户详情查询
customerRouter.get('/:custId',verifyAuth,verifyMap,detail);

//更新客户使用状态
customerRouter.post('/:custId',verifyAuth,verifyMap,updateStatus);

module.exports = customerRouter;
