import express from 'express'
const router = express.Router()
import {
  goalDetailsCallback,
  getLabelsCallback,
  getAllMilestonesCallback
} from './request_callbacks/goals'

router.get('/goal_details', goalDetailsCallback)
router.get('/all_labels', getLabelsCallback)
router.get('/all_milestones', getAllMilestonesCallback)

module.exports = router
