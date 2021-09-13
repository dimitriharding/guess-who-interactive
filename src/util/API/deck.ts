import { apiRequest } from '../util'
import { Decks } from '../../types/supabase'

export const createDeck = (data: Decks) =>
  apiRequest('deck-create', 'POST', data)

export const getDeck = (deckId) => apiRequest(`desk/${deckId}`)
