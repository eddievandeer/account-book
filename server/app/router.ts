import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/getAccountList', controller.home.getAccountList);
  router.get('/getCategories', controller.home.getCategories);
  router.post('/addNewAccount', controller.home.addNewAccount);
};
