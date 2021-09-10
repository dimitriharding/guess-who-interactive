import { apiRequest } from '../util'

export const createAnonUser = (userId) => {
  return apiRequest('user-create', 'POST', { userId })
}
