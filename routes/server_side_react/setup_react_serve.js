import React from 'react'
import {renderToString} from 'react-dom/server'
import template from './template'
import requestPromise from 'request-promise'
import {RouterContext} from 'react-router'
import DataWrapper from '../../browser/data_wrapper'
import {readConfig} from '../../config/config'
// import goals from '../../mock_data/github.json'
import moment from 'moment'

const config = readConfig().GITHUB_URLS

const requestOptions = github_access_token => ({
  method: 'GET',
  url: config.GUILDCRAFTS_GOALS_URL,
  headers: {
    'user-agent': 'node.js',
    'authorization': `Token ${github_access_token}`
  }
})

const templateOptions = (renderProps, goals) => ({
  title: 'Goals',
  body: renderToString(
    <DataWrapper goals={JSON.parse(goals)}>
      <RouterContext {...renderProps}/>
    </DataWrapper>
  ),
  initialState: goals
})

const clientRequest = (request, reponse, next) => (error, redirectLocation, renderProps) => {
  switch (request.url) {
    case '/goals':
      const {github_access_token} = request.session

      requestPromise(requestOptions(github_access_token))
        .then(goals => {
          const parsedGoals = JSON.parse(goals)

          const modifiedGoals = parsedGoals.map(goal =>
            Object.assign({}, goal, {from_now: moment(goal.created_at).fromNow()})
          )

          reponse.status(200).send(
            template(templateOptions(renderProps, JSON.stringify(modifiedGoals)))
          )
        })
      break;
    case redirectLocation:
      reponse.redirect(302, redirectLocation.pathname + redirectLocation.search)
    default:
      next
  }
}

export default clientRequest
