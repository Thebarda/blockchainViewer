import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: '/',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};
