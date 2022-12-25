import arc from '@architect/functions'
import response from '@architect/shared/response.mjs'
import requireLogin from '@architect/shared/require-login.mjs'

let handler = async (req) => {

  const categoryId = req.params.categoryId
  const projectId = req.params.projectId

  const data = await arc.tables()   
  const { Items } = await data.tracker.query({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `CATEGORY#${categoryId}`,
      ':sk': 'TASK#'
    }
  })
  const tasks = Items.map(item => {
    return {
      id: item.SK.split('#')[1],
      title: item.title,
      description: item.description,
      dueDate: item.dueDate,
      priority: item.priority,
      categoryId,
      projectId
    }
  })
  return response (200, { tasks })
}

handler = arc.http.async(requireLogin, handler)
export { handler }