// Middleware for requiring authentication and getting user
const requireAuth = (fn) => async (req, res) => {
  // Respond with error if no x-api-key header
  if (!req.headers['x-api-key']) {
    return res.status(401).send({
      status: 'error',
      message: 'You must be authorized to view this data',
    })
  }

  // Get api key
  const apiKey = req.headers['x-api-key']

  if (process.env.API_KEY === apiKey) {
    return fn(req, res)
  } else {
    console.log('_require-auth error')

    res.status(401).send({
      status: 'error',
      code: 'auth/invalid-api-key',
      message: 'You must be authorized to view this data',
    })
  }
}

export default requireAuth
