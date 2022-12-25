import arc from '@architect/functions'
import response from '@architect/shared/response.mjs'
import requireLogin from '@architect/shared/require-login.mjs'

let handler = async (req) => {

  const { email } = req.session

  if (!email) {
    return response(400, {
      message: 'bad input',
    })
  }

  const data = await arc.tables()   
  const { Items } = await data.tracker.query({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `USER#${email}`,
      ':sk': 'PROJECT#'
    }
  })
  return response (201, { projects: Items })
}

handler = arc.http.async(requireLogin, handler)
export { handler }