const commissionService = require('../service/commission.service');

class CommissionController{
    async list(ctx,next) {
        
        const { employeeId } = ctx.user;
        //提成查询
        const result = await commissionService.getCommissionList(employeeId);
        ctx.body = result
    }
}

module.exports = new CommissionController();