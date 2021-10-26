import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  /**
   * @summary 获取全部账单列表
   * @description 为了节省时间也为了方便调试，使用json文件而非数据库存储数据
   * @router GET /getAccountList
   */
  public async getAccountList() {
    const { ctx } = this;
    ctx.body = await ctx.service.account.getAccounts();
  }

  /**
   * @summary 获取全部分类列表
   * @description 为了节省时间也为了方便调试，使用json文件而非数据库存储数据
   * @router GET /getCategories
   */
  public async getCategories() {
    const { ctx } = this;
    ctx.body = await ctx.service.categories.getCategories();
  }

  /**
   * @summary 添加新账单并将添加后的结果返回
   * @description 向帐单列表添加账单，并返回新的账单列表信息
   * @router POST /getAccountList
   */
  public async addNewAccount() {
    const { ctx } = this;
    const newAccount = ctx.request.body

    await ctx.service.account.addNewAccount(newAccount)

    ctx.body = await ctx.service.account.getAccounts();
  }
}
