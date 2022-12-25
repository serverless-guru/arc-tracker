import arc from '@architect/functions'
import { hashPassword, generateSalt } from '@architect/shared/encrypt.mjs'

let handler = async (req) => {

  const { email, password, confirmPassword } = req.body
  req.session = {}
  const errors = []

  if (!email) {
    errors.push('Email is required')
  }

  if (!password) {
    errors.push('Password is required')
  }

  if(!confirmPassword) {
    errors.push('Confirm password is required')
  }

  if (password !== confirmPassword) {
    errors.push('Passwords do not match')
  }

  const data = await arc.tables() 

  const keys = {
    PK: `USER#${email}`,
    SK: `USER#${email}`,
  }
  
  let user = await data.tracker.get(keys)

  if (user) {
    errors.push('Email already exists')
  }

  if (errors.length) {
    req.session.errors = errors
    req.session.email = email
    req.session.password = password
    req.session.confirmPassword = confirmPassword
    return {
      location: '/account/signup',
      session: req.session
    }
  }

  const salt = generateSalt()
  user = {
    ...keys,
    email,
    password: hashPassword(password, salt),
    salt,
  }

  await data.tracker.put(user)
  return {
    location: '/dashboard',
    session: { email }
  }
}

handler = arc.http.async(handler)
export { handler }