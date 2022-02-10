const userService = require('../service/user.service');

class UserController {

    async create (ctx,next){
        //获取用户请求参数
        const user = ctx.request.body;
        console.log(user);
        //数据操作
        const result = await userService.create(user);

        //返回数据
        ctx.body = result;
    }
}

module.exports = new UserController();