const customerService = require('../service/customer.service');

class CustomerController {

    async list(ctx,next) {
        //获取用户信息
        const { employeeId } = ctx.user;
        //根据用户获取客户数据
        const result = await customerService.getListByUserId(employeeId);
        ctx.body = result;
    }

    async detail(ctx,next) {
         //获取用户信息
         const { employeeId } = ctx.user;
         const custId = ctx.params.custId;
         //获取客户详情数据
         const result = await customerService.getCustomerInfoById(employeeId,custId);
         ctx.body = result;
    }
    
    async nonReturnAmountList(ctx,next) {
        // console.log(ctx.user);
        const { employeeId } = ctx.user;
        //未收款查询
        const result = await customerService.getNonReturnAmountList(employeeId);
        ctx.body = result;
    }

    //更新客户状态
    async updateStatus(ctx,next) {
        //获取数据
        const {custStauts, statusDesc}= ctx.request.body;
        let objStauts = {
            UseStatus: custStauts ? custStauts: '',
            UseModule: statusDesc ? statusDesc :''
        };
        // console.log(objStauts);
        const custId = ctx.params.custId;
       
        //判断客户状态是否已登记
        let result = await customerService.custStatusIsExist(custId);
        if(result.length > 0) { //更新客户状态
            result = await customerService.updateStatusBycustId(custId,objStauts);
        }else{//插入客户状态
            result = await customerService.insertStauts(custId,objStauts)
        }
        ctx.body = result;
    }
}

module.exports = new CustomerController();