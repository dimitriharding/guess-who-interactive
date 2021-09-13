import type { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from '../_require-auth'
import { getDeckInfo } from '../_db'

export default requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { deskId } = req.query
    const { data, error } = await getDeckInfo(deskId)
    if (data) {
      return res.status(200).json(data)
    }
    if (error) {
      return res.status(500).json(error)
    }
  }
)
