import { Service } from 'egg';
const csv = require('csvtojson')
const { resolve } = require('path')

let categories: ICategoryList = []

csv({ checkType: true })
    .fromFile(resolve(__dirname, '../data/categories.csv'))
    .then(json => {
        categories = json
    })

export default class Test extends Service {
    /**
     * 查询分类数据并返回
     */
    public async getCategories() {
        return categories
    }

    /**
     * 添加新分类并将添加后的结果返回
     * @param newCategory - 要添加的新分类
     */
    public async addNewCategory(newCategory: ICategory) {
        categories.push(newCategory)
    }
}
