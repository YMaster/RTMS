import { lazy } from 'react'

interface IRouteItem {
  component: React.LazyExoticComponent<any>
  path: string
  name: string
}
// type routeKeys = keyof IRouteItem

const routesEntries = {
  home: {
    component: lazy(() => import('@/pages/home')),
    path: '/homepage',
    name: '首页'
  },
  user: {
    component: lazy(() => import('@/pages/user')),
    path: '/userpage',
    name: '用户'
  },
  calc: {
    component: lazy(() => import('@/pages/calc')),
    path: '/calcpage',
    name: '计算'
  }
}

export const routesList: IRouteItem[] = Object.entries(routesEntries).map((item) => item[1]).flat()
export default routesEntries