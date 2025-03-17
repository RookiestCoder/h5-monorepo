import router from './index';

router.beforeEach((to, from, next) => {
  //路由守卫、登陆校验
  console.log('to====', to);
  console.log('from====', from);
  console.log('next====', next);
  next();
});
