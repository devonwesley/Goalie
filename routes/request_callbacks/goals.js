const requestPromise = require('request-promise')
import {readConfig} from '../../config/config'

const config = readConfig().GITHUB_URLS

const goalDetailsCallback = (request, response) => {
  const {github_access_token} = request.session
  const {number} = request.body
  const options = {
    method: 'GET',
    url: `${GUILDCRAFTS_GOALS_URL}/${number}`,
    headers: {
      'user-agent': 'node.js',
      'authorization': `Token ${github_access_token}`
    }
  }

  requestPromise(options).then(goal => response.json(goal.body))
}

const getLabelsCallback = (request, response) => {
  const {github_access_token} = request.session
  const options = {
    method: 'GET',
    url: `https://api.github.com/repos/GuildCrafts/web-development-js/labels`,
    headers: {
      'user-agent': 'node.js',
      'authorization': `Token ${github_access_token}`
    }
  }

  requestPromise(options).then(labels =>{
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

    const filterLabels = goalLabels.filter(label => activeLabels.includes(label.name))

    response.json(JSON.stringify(filterLabels))
  })
}

const getAllMilestonesCallback = (request, response) => {
  const {github_access_token} = request.session
  const options = {
    method: 'GET',
    url: `https://api.github.com/repos/GuildCrafts/web-development-js/milestones`,
    headers: {
      'user-agent': 'node.js',
      'authorization': `Token ${github_access_token}`
    }
  }

  requestPromise(options).then(milestones => {
    console.log(milestones)

    response.json(milestones)
  })
}

export {goalDetailsCallback, getLabelsCallback, getAllMilestonesCallback}
