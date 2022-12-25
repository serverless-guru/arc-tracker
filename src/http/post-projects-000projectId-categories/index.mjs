import arc from '@architect/functions'
import response from '@architect/shared/response.mjs'
import requireLogin from '@architect/shared/require-login.mjs'
import { randomUUID } from 'crypto'

let handler = async (req) => {

  const { title } = req.body
  const projectId = req.params.projectId

  if (!title) {
    return response(400, {
      message: 'bad input',
    })
  }

  const id = randomUUID()
  const data = await arc.tables() 

  const { Items } = await data.tracker.query({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `PROJECT#${projectId}`,
      ':sk': 'CATEGORY#'
    }
  })

  const keys = {
    PK: `PROJECT#${projectId}`,
    SK: `CATEGORY#${id}`,
  }
  
  let category = await data.tracker.get(keys)
  if (category) {
    return response(400, {
      message: 'project already exists',
    })
  }

  category = {
    ...keys,
    id,
    title,
    orderNo: Items.length + 1,
  }

  await data.tracker.put(category)
  return {
    location: '/dashboard',
    session: req.session
  }
}

handler = arc.http.async(requireLogin, handler)
export { handler }