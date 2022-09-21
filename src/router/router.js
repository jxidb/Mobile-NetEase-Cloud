import Home from '@/views/Home'
import Search from '@/views/Search'
import Layout from '@/views/Layout'

export default [
  { path: '/login', component: () => import('@/views/Login/index.vue') },

  { path: '/', redirect: '/layout' }, // 重定向到layout页面
  {
    path: '/layout',
    redirect: '/layout/home', // 马上重定向到layout二级home页面
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'search',
        component: Search,
        meta: {
          title: '搜索'
        }
      }
    ]
  },
  { path: '/play', component: () => import('@/views/Play') },
  { path: '/comment', component: () => import('@/views/Comment') },
  { path: '/ww', component: () => import('@/views/ww') }
]
