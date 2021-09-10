import type { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from './_require-auth'
import { createImages } from './_db'

export default requireAuth(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { images } = req.body
    const { data, error } = await createImages(images)
    if (data) {
      return res.status(200).json(data)
    }
    if (error) {
      return res.status(500).json(error)
    }
  }
)
