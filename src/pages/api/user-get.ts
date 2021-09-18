import type { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from './_require-auth'
import { createAnonUser } from './_db'

export default requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body
    const { data, error } = await createAnonUser(userId)
    if (data) {
      return res.status(200).json(data)
    }
    if (error) {
      return res.status(500).json(error)
    }
  }
)
