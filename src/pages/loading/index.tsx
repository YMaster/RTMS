import './index.scss'
import React from 'react'
import { PageWrapper } from '@/global'

const LoadingPage = () => {
  return <PageWrapper>
    <div className="loading_wrapper">
      <div id="loading">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div className="object" id="object_one"></div>
            <div className="object" id="object_two" style={{ left: 20 }}></div>
            <div className="object" id="object_three" style={{ left: 40 }}></div>
            <div className="object" id="object_four" style={{ left: 60 }}></div>
            <div className="object" id="object_five" style={{ left: 80 }}></div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
}

export default LoadingPage
