const connection = require('../app/database');


class CommissionService {
    async getCommissionList(userId) {
        const statement = `
        select a.Id,c.CustomerName,b.GatherDate,b.GatherMonth,d.UserName,e.SoftwareTypeName,
        c.ContractAmount,c.ReturnAmount,b.Amount as currentAmount,(c.ContractAmount-c.ReturnAmount)
        as NonReturnAmount,a.CommissionType,f.CommissionDesc,CommissionWage
        from commissionrecord as a 
        left JOIN gatherrecord as b on b.Id = a.Gather_Id
        left JOIN contracts as c on c.Id = b.Contract_Id
        left JOIN employees as d on d.Id = a.CommissionPersonId
        left join softwaretype as e on e.id = c.SoftwareType_Id
        left join commissionmode as f on f.id = a.CommissionMode_Id
        WHERE a.CommissionPersonId ${ userId==6 ? '>' :'='} ?
        ORDER BY b.GatherDate DESC
        `;
        const [result] = await connection.execute(statement,[userId]);
        return result;
    }
}

module.exports = new CommissionService();