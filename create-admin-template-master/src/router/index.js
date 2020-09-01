import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'

/*
 * hidden: true 如果设置为true，则在边栏中将不会显示项目（默认值为false）
 * alwaysShow: true 如果设置为true，则始终显示根菜单, 如果未设置alwaysShow，当项目具有多个子路径时，它将变为嵌套模式，否则不会显示根菜单
 * redirect: noRedirect 如果设置为noRedirect，则不会在面包屑中重定向
 * name:'router-name'  必填，主要是用在keep-alive组件上
 * meta : {
    roles: ['admin','editor'] 控制页面角色（可以设置多个角色）
    title: 'title' 侧栏和面包屑中的名称显示（推荐设置）
    icon: 'svg-name' 图标显示在侧栏中。
    noCache: true 如果设置为true，则不会缓存页面（默认为false）
    breadcrumb: false 如果设置为false，则该项目将隐藏在面包屑中（默认值为true）
    activeMenu: '/example/list' 如果设置路径，侧栏将突出显示您设置的路径
  }
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    name: '404',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboardParent',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
