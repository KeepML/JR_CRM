const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');

const md5Password = require('../utils/password-handle');

//注册用户时验证用户信息是否合法
const verifyUser = async (ctx,next) => {
    //获取请求的用户名和密码
    const { name,password } = ctx.request.body;
    //判断用户名和密码不能为空
    if(!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_NULL);
       return ctx.app.emit('error',error,ctx);
    }

    //判断用户名是否被注册过
    const result = await userService.getUserByName(name);
    if(result.length) {
        const error = new Error(errorTypes.NAME_ALREADY_EXISTS);
        return ctx.app.emit('error',error,ctx);
    }
    await next();
}

//密码加密并返回新密码
const handlePassword = async(ctx,next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = md5Password(password);
    await next();
}


module.exports = {
    verifyUser,
    handlePassword
}