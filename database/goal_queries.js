import knex from '../config/database/knex'
import { findAll } from './utilities'

const insertGoal = attributes =>
  knex.table('goals').insert(attributes)

const findAllGoals = () => findAll('goals')

export { insertGoal, findAllGoals }
