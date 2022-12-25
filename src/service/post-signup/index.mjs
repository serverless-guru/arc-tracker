const response = require('@architect/shared/response')

export async function handler (req) {
  const { email, password, confirmPassword } = req.body
  if(!email || !password || !confirmPassword || password !== confirmPassword) {
    return response(400, {
      message: 'bad input'
    })
  }
  return response(200, {
    message: 'success'
  })
}