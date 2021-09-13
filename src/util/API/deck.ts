import { apiRequest } from '../util'
import { Decks } from '../../types/supabase'

export const createDeck = (data: Decks) => {
  return apiRequest('deck-create', 'POST', data)
}
