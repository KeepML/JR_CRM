const connection = require('../app/database');

class UserService {
    async create(user) {
        const { name,password } = user;
        const statement = `insert into users(name,password) values(?,?);`;

       const result = await connection.execute(statement,[name,password]);
       return result[0];
    }

    async getUserByName(name) {
        const statement = `select * from users where name = ?;`;
        const result = await connection.execute(statement,[name]);
       // console.log(result[0]);
        return result[0];
    }

    //根据登录ID获取系统员工ID
    async getUserById(userId) {
        const statement = `select employeeId from users where id = ?;`;
        const [result] = await connection.execute(statement,[userId]);
        // console.log(result[0]);
        return result[0];
    }
}

module.exports = new UserService();