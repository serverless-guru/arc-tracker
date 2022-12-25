import arc from "@architect/functions";
import { hashPassword } from '@architect/shared/encrypt.mjs'

let handler = async (req) => {
  const { email, password } = req.body;
  req.session.email = email;
  req.session.password = password;

  const errors = []

  if (!email) {
    errors.push('Email is required')
  }

  if (!password) {
    errors.push('Password is required')
  }

  if (errors.length) {
    req.session.errors = errors
    return {
      location: '/account/login',
      session: req.session
    }
  }
  
  const data = await arc.tables() 

  const keys = {
    PK: `USER#${email}`,
    SK: `USER#${email}`,
  }
  let user = await data.tracker.get(keys)
  if (!user) {
    req.session.errors = ['Email not found']
    return {
      location: '/account/login',
      session: req.session
    }
  }

  const { salt, password: hash } = user
  if (hash !== hashPassword(password, salt)) {
    req.session.errors = ['Password is incorrect']
    return {
      location: '/account/login',
      session: req.session
    }
  }

  const session = { email };
  return {
    location: "/dashboard",
    session,
  };
};

handler = arc.http.async(handler);
export { handler };
