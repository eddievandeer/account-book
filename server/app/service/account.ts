import { Service } from 'egg';
const csv = require('csvtojson')
const { resolve } = require('path')

let bills: IAccountList = []

csv({ checkType: true })
    .fromFile(resolve(__dirname, '../data/bill.csv'))
    .then(json => {
        bills = json
    })

export default class Test extends Service {
    /**
     * 查询数据并返回排序后的结果
     */
    public async getAccounts() {
        return bills.sort((a: IAccount, b: IAccount) => {
            return b.time - a.time
        })
    }
    
    /**
     * 添加新账单并将添加后的结果返回
     * @param newAccount - 要添加的新账单
     */
    public async addNewAccount(newAccount: IAccount) {
        bills.push(newAccount)
    }
}
