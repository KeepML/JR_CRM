const app = require('./app');
const {APP_PORT} = require('./app/config');


app.listen(8090,() => {
    console.log(`服务器在端口${APP_PORT}启动成功~`);
});