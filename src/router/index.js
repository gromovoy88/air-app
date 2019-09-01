import Vue from 'vue';
import Router from 'vue-router';
import DashboardMain from '@/components/DashboardMain';
import DashboardDetailed from '@/components/DashboardDetailed';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DashboardMain',
      component: DashboardMain,
      props: route => ({ lat: route.query.lat, lon: route.query.lon }),
    },
    {
      path: '/more',
      name: 'DashboardDetailed',
      component: DashboardDetailed,
      props: route => ({ lat: route.query.lat, lon: route.query.lon }),
    },
  ],
});
