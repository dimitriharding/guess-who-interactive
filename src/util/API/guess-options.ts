import { apiRequest } from '../util'
import { Guess_options } from '../../types/supabase'

export const createGuessOptions = (data) => {
  return apiRequest('guess-options-create', 'POST', data)
}
