const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
// const userRouter = require('../router/user.router');
// const authRouter = require('../router/auth.rooter');
const useRouters = require('../router');
const errorHandle = require('../app/error-handle');

const cors = require('koa2-cors');

const app = new Koa();



//================================================================================
//跨越设置
app.use(cors({
    origin: function(ctx) {
        if(ctx.url === '/login'){
            return "*";//允许来着所有域名的请求
        }
        // if(ctx.url === '/sales'){
        //     return "http://192.168.3.43:3000";//允许来着所有域名的请求
        // }
         return 'http://192.168.3.234:3000';//只允许该URL域名请求
        // return 'http://192.168.0.105:3000';//只允许该URL域名请求

    },
    exposeHeaders:['WWW-Authenticate','Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET','POST','DELETE'],
    allowHeaders: ['Content-Type','Authorization','Accept']
}))

//============================================================================


//body解析中间件
app.use(bodyParser());

// //用户注册路由
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());

// //用户登录路由
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());



//通用路由
app.useRoutes = useRouters;
app.useRoutes();


app.on('error',errorHandle)

module.exports = app;
