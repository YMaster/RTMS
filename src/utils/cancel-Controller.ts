import { Canceler } from "axios"

class CancelController {
  list: Canceler[] = []
  cancelAll() {
    this.list.forEach((cancel) => cancel())
    this.clear()
  }
  clear() {
    this.list = []
  }
  remove(cancel?: Canceler) {
    for(let i = this.list.length - 1; i >= 0; i--) {
      if (this.list[i] === cancel) {
        this.list.splice(i, 1)
        break
      }
    }
  }
  add(cancel: Canceler) {
    this.list.push(cancel)
  }
}


export default CancelController