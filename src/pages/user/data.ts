import { observable } from 'mobx'
import { routesList } from '@/modules/routes'
import { getRoutePath } from '@/api/utils'

class UserPageData {
  @observable title: string = 'userpage'
  @observable pathList = routesList.filter((route) => route.path !== getRoutePath())
}

export default new UserPageData()
