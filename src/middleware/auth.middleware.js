const userService = require('../service/user.service');

const errorTypes = require('../constants/error-types');
const md5Password = require('../utils/password-handle');
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config');

//登录验证
const verifyLogin = async(ctx,next) => {

    console.log("验证登录的middleware~");

    //获取用户名和密码
    const {name,password } = ctx.request.body;

    //验证用户名和密码是否为空
    if(!name || !password){
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_NULL);
        return ctx.app.emit('error',error,ctx);
    }

    //判断用户是否存在
    const result = await userService.getUserByName(name);
    const user = result[0];
    if(!user) {
        //console.log(user);
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error',error,ctx);
    }
    //判断密码和数据库中的是否一致
    if(md5Password(password) !== user.password){
        const error = new Error(errorTypes.PASSWORD_IS_ERROR)
        return ctx.app.emit('error',error,ctx);
    }
    ctx.user = user;
    await next();
}

//验证授权
const verifyAuth = async(ctx,next) => {
    console.log("验证授权的middleware~");
    // console.log(ctx.request.body);
    //1.获取token
    const authorization = ctx.headers.authorization;
    if(!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION);
        return ctx.app.emit('error',error,ctx);
    }

    const token = authorization.replace('Bearer ','');
    // console.log(token);
    //2.验证token
    try {
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms: ["RS256"]
        });
        ctx.user = result;
        // console.log(result);
        await next();
    } catch (error) {
        const err = new Error(errorTypes.UNAUTHORIZATION);
        ctx.app.emit('error',err,ctx);
    }

}


//验证登录账号是否和系统账号做映射
const verifyMap = async(ctx,next) => {
    console.log("验证用户映射的middleware~");
    const { id } = ctx.user;
    // console.log(id);
    const result = await userService.getUserById(id);
    //console.log(result);
    if(!result.employeeId) {
        const error = new Error(errorTypes.USER_MAP_EMPLOYEE_NOT);
        return ctx.app.emit('error',error,ctx);
    }
    else{
        // console.log(result.employeeId);
        ctx.user.employeeId = result.employeeId;

    }
    await next();
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyMap
}