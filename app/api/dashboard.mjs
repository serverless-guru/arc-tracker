import arc from '@architect/functions'

export async function get(req) {

  const { email } = req.session

  const data = await arc.tables()   
  const { Items } = await data.tracker.query({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `USER#${email}`,
      ':sk': 'PROJECT#'
    },
    ProjectionExpression: 'code,title',
  })
  
  return {
    json: {
      session: req.session,
      projects: Items
    }
  }
}