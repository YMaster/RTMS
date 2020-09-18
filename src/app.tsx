import React, { Suspense } from 'react'
import routesEntries, { routesList } from '@/modules/routes'
import PageLoading from '@/pages/loading'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

const App = () => {
  return <Suspense fallback={<PageLoading />}>
    <Router>
      <Switch>
        {routesList.map((route, index) => {
          return <Route
            key={index}
            path={route.path}
            component={route.component}
          />
        })}
        <Route path="*">
          <Redirect to={routesEntries.home.path} />
        </Route>
      </Switch>
    </Router>
  </Suspense>
}

export default App