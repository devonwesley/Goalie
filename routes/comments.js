import express from 'express'
const router = express.Router()
import {
  createCommentCallback,
  getCommentsCallback,
  updateCommentCallback
} from './request_callbacks/comments'

router.get('/:issue_number', getCommentsCallback)
router.post('/create_comment', createCommentCallback)
router.put('/update_comment', updateCommentCallback)

module.exports = router
