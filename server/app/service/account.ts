import { Service } from 'egg';
const fs = require('fs');

const bills = JSON.parse(fs.readFileSync('./app/data/bill.json').toString());

const mAccount: IAccountList = [...bills]

export default class Test extends Service {
    /**
     * 查询数据并返回排序后的结果
     */
    public async getAccounts() {
        return mAccount.sort((a: IAccount, b: IAccount) => {
            return b.time - a.time
        })
    }
    
    /**
     * 添加新账单并将添加后的结果返回
     * @param newAccount - 要添加的新账单
     */
    public async addNewAccount(newAccount: IAccount) {
        mAccount.push(newAccount)
    }
}
