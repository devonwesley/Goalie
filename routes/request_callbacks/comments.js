import requestPromise from 'request-promise'
import qs from 'querystring'
import {readConfig} from '../../config/config'
import moment from 'moment'

const config = readConfig().GITHUB_URLS

const createCommentCallback = (request, response) => {
  const {github_access_token} = request.session
  const {issueNumber, comment} = request.body
  const options = {
    method: 'POST',
    url: `${config.GUILDCRAFTS_GOALS_URL}/${issueNumber}/comments`,
    headers: {
      'user-agent': 'node.js',
      'authorization': `Token ${github_access_token}`
    },
    body: comment
  }

  requestPromise(options).then(comment => response.json(comment.body))
}

const getCommentsCallback = (request, response) => {
  const {github_access_token} = request.session
  const {number} = request.params

  const options = {
    method: 'GET',
    url: `${config.GUILDCRAFTS_GOALS_URL}/${number}/comments`,
    headers: {
      'user-agent': 'node.js',
      'authorization': `Token ${github_access_token}`
    }
  }

  requestPromise(options).then(comments => {
    const parsedComments = JSON.parse(comments)

    const modifiedComments = parsedComments.map(comment =>
      Object.assign({}, comment, {from_now: moment(comment.created_at).fromNow()})
    )

    response.json(JSON.stringify(modifiedComments))
  })
}

const updateCommentCallback = (request, response) => {
  const {github_access_token} = request.session
  const {issueNumber, comment, commentId} = request.body
  const options = {
    method: 'POST',
    url: `${config.GUILDCRAFTS_GOALS_URL}/${issueNumber}/comments/${commentId}`,
    headers: {
      'user-agent': 'node.js',
      'authorization': `Token ${github_access_token}`
    },
    body: comment
  }

  requestPromise(options).then(comment => response.json(comment.body))
}

export {createCommentCallback, getCommentsCallback, updateCommentCallback}
