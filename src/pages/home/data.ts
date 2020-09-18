import { observable } from 'mobx'
import { routesList } from '@/modules/routes'
import { getRoutePath } from '@/api/utils'

// console.log(routesList.filter((route) => route.path !== getRoutePath()), getRoutePath())

class HomePageData {
  @observable title: string = 'homepage'
  @observable pathList = routesList.filter((route) => route.path !== getRoutePath())
}

export default new HomePageData()
