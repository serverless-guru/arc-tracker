const response = require('@architect/shared/response')

export async function handler (req) {
  const { email, password } = req.body
  if(!email || !password) {
    return response(400, {
      message: 'bad input'
    })
  }
  const isLoggedIn = true;
  return {
    session: {isLoggedIn},
    location: '/dashboard'
  }
}