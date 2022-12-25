import arc from '@architect/functions'
import response from '@architect/shared/response.mjs'
import requireLogin from '@architect/shared/require-login.mjs'

let handler = async (req) => {

  const { code, title } = req.body
  const { email } = req.session

  if (!code) {
    return response(400, {
      message: 'bad input',
    })
  }

  const data = await arc.tables() 

  const keys = {
    PK: `USER#${email}`,
    SK: `PROJECT#${code}`,
  }
  
  let project = await data.tracker.get(keys)
  if (project) {
    return response(400, {
      message: 'project already exists',
    })
  }

  project = {
    ...keys,
    code,
    title
  }

  await data.tracker.put(project)
  return {
    location: '/dashboard',
    session: req.session
  }
}

handler = arc.http.async(requireLogin, handler)
export { handler }