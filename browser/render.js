import React from 'react'
import {render} from 'react-dom'
import Routes from './routes'
import {Router, browserHistory} from 'react-router'
import DataWrapper from './data_wrapper'

const goals = window.__APP_INITIAL_STATE__

render(
  <Router history={browserHistory}>
    <DataWrapper goals={goals}>
      {Routes}
    </DataWrapper>
  </Router>,
  document.getElementById('root')
)
