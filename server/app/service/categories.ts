import { Service } from 'egg';
const fs = require('fs');

const categories = JSON.parse(fs.readFileSync('./app/data/categories.json').toString())

const mCategory: ICategoryList = [...categories]

export default class Test extends Service {
    /**
     * 查询分类数据并返回
     */
    public async getCategories() {
        return mCategory
    }

    /**
     * 添加新分类并将添加后的结果返回
     * @param newCategory - 要添加的新分类
     */
    public async addNewCategory(newCategory: ICategory) {
        mCategory.push(newCategory)
    }
}
