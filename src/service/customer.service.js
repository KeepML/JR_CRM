const connection = require('../app/database');

class CustomerService {
    async getListByUserId(id) {
        const statement = `
        select a.id,a.ContractCode,a.ContractDate,a.CustomerName,a.Area,c.SoftwareTypeName,
        a.ContractAmount,a.ReturnAmount,d.UserName as salesMan,e.UserName as TrainEnginerr,
        (a.ContractAmount - a.ReturnAmount) as NonReturnAmount,
        JSON_OBJECT('UseStatus',f.UseStatus,'UseModule',f.UseModule,'LastVisitDate',f.LastVisitDate) as customerUseStauts
        from contracts as a
        left join softwaretype as c on c.id = a.SoftwareType_Id
        left join employees as d on d.id = a.SalesMan_Id
        left join employees as e on e.id = a.TrainEngineer_Id
        left join customerstatus as f on f.ContractId = a.id
        where a.SalesMan_Id ${ id==6 ? '>' :'='} ? or TrainEngineer_Id ${ id==6 ? '>' :'='} ?
        ORDER BY a.ContractDate DESC 
        `;
        try {
            const [result] = await connection.execute(statement,[id,id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getCustomerInfoById(employeeId,custId) {
        const statement = `
        select a.id,a.ContractCode,a.ContractDate,a.CustomerName,a.Area,c.SoftwareTypeName,
        a.ContractAmount,a.ReturnAmount,d.UserName as salesMan,e.UserName as TrainEnginerr,
        (a.ContractAmount - a.ReturnAmount) as NonReturnAmount,(select JSON_ARRAYAGG(JSON_OBJECT(
        'gatherDate',b.GatherDate,'GatherMonth',b.GatherMonth,'GatherAmount',b.Amount)) 
        from gatherrecord as b where b.Contract_Id = a.id) as gathers,
        JSON_OBJECT('UseStatus',f.UseStatus,'UseModule',f.UseModule,'LastVisitDate',f.LastVisitDate) as customerUseStauts
        from contracts as a
        left join softwaretype as c on c.id = a.SoftwareType_Id
        left join employees as d on d.id = a.SalesMan_Id
        left join employees as e on e.id = a.TrainEngineer_Id
        left join customerstatus as f on f.ContractId = a.id
        where (a.SalesMan_Id = ? or TrainEngineer_Id = ?) and a.id=?
        GROUP BY a.id
        `;

        const [result] = await connection.execute(statement,[employeeId,employeeId,custId]);
        return result;
    }

    async getNonReturnAmountList(employeeId) {
        const statement = `
        select a.id,a.ContractCode,a.ContractDate,a.CustomerName,a.Area,c.SoftwareTypeName,
        a.ContractAmount,a.ReturnAmount,d.UserName as salesMan,e.UserName as TrainEnginerr,
        (a.ContractAmount - a.ReturnAmount) as NonReturnAmount,
        JSON_OBJECT('UseStatus',f.UseStatus,'UseModule',f.UseModule,'LastVisitDate',f.LastVisitDate) as customerUseStauts
        from contracts as a
        left join softwaretype as c on c.id = a.SoftwareType_Id
        left join employees as d on d.id = a.SalesMan_Id
        left join employees as e on e.id = a.TrainEngineer_Id
        left join customerstatus as f on f.ContractId = a.id
        where (a.SalesMan_Id ${ employeeId==6 ? '>' :'='} ? or TrainEngineer_Id ${ employeeId==6 ? '>' :'='} ?) and (a.ContractAmount - a.ReturnAmount) >0
        ORDER BY a.ContractDate ASC
        `;
        const [result] = await connection.execute(statement,[employeeId,employeeId]);
        // console.log(result);
        return result;

    }

    //更新当前客户状态
    async updateStatusBycustId(custId,custStatus){
        const {UseStatus,UseModule} = custStatus;
        const statement = `
        update customerstatus set UseStatus=?,UseModule=? where ContractId=?
        `;
        const [result] = await connection.execute(statement,[UseStatus,UseModule,custId]);
        return result;
    }

    //插入当前客户状态
    async insertStauts(custId,custStatus) {
        const {UseStatus,UseModule,LastVisitDate} = custStatus;
        const statement = `
            insert into customerstatus(ContractId,UseStatus,UseModule) values(?,?,?); 
        `;
        const [result] = await connection.execute(statement,[custId,UseStatus,UseModule]);
        return result;
    }

    async custStatusIsExist(custId) {
        const statement = `select Id from customerstatus where ContractId = ?;`;
        const [result] = await connection.execute(statement,[custId]);
        return result;
    }
}

module.exports = new CustomerService();