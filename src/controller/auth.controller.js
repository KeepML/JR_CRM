const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

class AuthController {
    async login(ctx,next) {
        //console.log(ctx.user);
        const { id,name } = ctx.user;
      
        //颁发token
        const token = jwt.sign({id,name},PRIVATE_KEY,{
            expiresIn: 60 * 60 * 24,//有效时间24小时
            algorithm: 'RS256' //算法
        })
       // console.log(token);
        ctx.body = { id,name,token };
    }

    async success(ctx,next) {
        ctx.body = "授权成功~";
    }
}

module.exports = new AuthController();