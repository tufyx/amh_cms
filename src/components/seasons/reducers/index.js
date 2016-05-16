import { combineReducers } from 'redux'
import seasons from './seasons'

const seasonsReducer = combineReducers({
  data: seasons
})

export default seasonsReducer