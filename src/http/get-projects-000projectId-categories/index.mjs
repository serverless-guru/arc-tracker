import arc from '@architect/functions'
import response from '@architect/shared/response.mjs'
import requireLogin from '@architect/shared/require-login.mjs'

let handler = async (req) => {

  let projectId = req.params.projectId

  const data = await arc.tables()   
  const { Items } = await data.tracker.query({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `PROJECT#${projectId}`,
      ':sk': 'CATEGORY#'
    }
  })

  const categories = Items.map(item => {
    return {
      id: item.id,
      projectId: item.projectId,
      title: item.title,
      orderNo: item.orderNo
    }
  })
  categories.sort((a, b) => a.orderNo - b.orderNo)
  return response (200, { categories })
}

handler = arc.http.async(requireLogin, handler)
export { handler }