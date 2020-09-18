import React from 'react'
import { PageWrapper } from '@/global'
import { Link } from 'react-router-dom'
import data from './data'

class Homepage extends React.PureComponent {

  render() {
    return <PageWrapper>
      {data.pathList.map((route) => {
        return <div key={route.path}>
          <Link to={route.path}>{route.name}</Link>
        </div>
      })}
      <p>{data.title}</p>
    </PageWrapper>
  }
}

export default Homepage
