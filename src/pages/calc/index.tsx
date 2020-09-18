import React from 'react'
import { PageWrapper } from '@/global'
import Button from '@/components/Button'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import data from './data'

let logCount = 0

@observer
class Calc extends React.PureComponent {
  private increment = () => {
    data.increment()
  }
  private decrement = () => {
    data.decrement()
  }
  render() {
    console.log(logCount++)
    return <PageWrapper>
      {data.pathList.map((route) => {
        return <div key={route.path}>
          <Link to={route.path}>{route.name}</Link>
        </div>
      })}
      <p></p>
      <div>{data.count}</div>
      <div>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </div>
    </PageWrapper>
  }
}

export default Calc
