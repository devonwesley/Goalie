import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'

const Routes = <Route path="/goals" component={App}>
    <IndexRoute component={App}/>
  </Route>

export default Routes
