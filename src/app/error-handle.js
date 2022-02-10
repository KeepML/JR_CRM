const errorTypes = require('../constants/error-types');

const errorHandle = (error,ctx) => {
    let status,message;

    switch(error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_NULL:
            status = 400;//Bad Request
            message = "用户名或密码不能为空~";
            break;
        case errorTypes.NAME_ALREADY_EXISTS:
            status = 409; //conflict(冲突)
            message = "用户名已存在~";
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400;
            message = "用户名不存在";
            break;
        case errorTypes.PASSWORD_IS_ERROR:
            status = 400;
            message = "密码是错误的~";
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401;
            message = "无效的token~";
            break;
        case errorTypes.USER_MAP_EMPLOYEE_NOT:
            status = 400;
            message = "登录账号没有和系统账号做映射~";
            break;
        default:
            status = 404;
            message = "NOT FOUND";
    }
    ctx.status = status;
    ctx.body = message;
}


module.exports = errorHandle;