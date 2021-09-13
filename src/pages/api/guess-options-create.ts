import type { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from './_require-auth'
import { createGuessOptions } from './_db'

export default requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body
    const { data, error } = await createGuessOptions(body)
    if (data) {
      return res.status(200).json(data)
    }
    if (error) {
      return res.status(500).json(error)
    }
  }
)
