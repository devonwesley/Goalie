const requestPromise = require('request-promise')
import { readConfig } from '../../config/config'
import { insertGoal, findAllGoals } from '../../database/goal_queries'

const config = readConfig().GITHUB_URLS

const options = (method, url, access_token) => ({
  method,
  url,
  headers: {
    'user-agent': 'node.js',
    'authorization': `Token ${access_token}`
  }
})

const goalDetailsCallback = (request, response) => {
  const { github_access_token } = request.session
  const url = `${GUILDCRAFTS_GOALS_URL}/${request.body.number}`

  requestPromise(options('GET', url, github_access_token))
    .then(goal => response.json(goal.body))
}

const getLabelsCallback = (request, response) => {
  const { github_access_token } = request.session
  const url = config.LABELS_URL

  requestPromise(options('GET', url, github_access_token))
    .then(labels =>{
      const goalLabels = JSON.parse(labels)
      const activeLabels = [
        'apprentice',
        'core',
        'draft',
        'foundational',
        'practice',
        'production',
        'prototype'
      ]

      const filteredLabels = goalLabels
        .filter(label => activeLabels.includes(label.name))

      response.json(JSON.stringify(filteredLabels))
    })
}

const getAllMilestonesCallback = (request, response) => {
  const {github_access_token} = request.session
  const url = config.MILESTONES_URL

  requestPromise(options('GET', url, github_access_token))
    .then(milestones => response.json(milestones))
}

const getGoalsCallback = (request, response) => {
  const {page_number} = request.query
  const {github_access_token} = request.session
  const url = `${config.GUILDCRAFTS_GOALS_URL}?page=${page_number}`

  requestPromise(options('GET', url, github_access_token))
    .then(goals => response.json(goals))
}

const seedDatabaseCallback = (request, response) => {
  const {github_access_token} = request.session
  const url = config.GUILDCRAFTS_GOALS_URL

  requestPromise(options('GET', url, github_access_token))
    .then(goals => {
      const parsedGoals = JSON.parse(goals)
      const modifiedGoals = parsedGoals
        .map(goal => {
          const labelIds = goal.labels.map(label => label.id)

          return insertGoal({
            id: goal.id,
            title: goal.title,
            number: goal.number,
            label_ids: labelIds,
            level_id: goal.milestone ? goal.milestone.title : '',
            github_handle: goal.user.login,
            body: ''
          })
        })

        Promise.all(modifiedGoals)
          .then(() => response.json('Success!!! DATABASE populated!!!'))
          .catch(error => response.json(error))
      })
}

export {
  goalDetailsCallback,
  getLabelsCallback,
  getAllMilestonesCallback,
  getGoalsCallback,
  seedDatabaseCallback
}
