import arc from '@architect/functions'
import requireLogin from '@architect/shared/require-login.mjs'

let handler = async (req) => {

  const categoryId = req.params.categoryId
  const id = req.params.taskId

  if(!req.session.tasks) {
    req.session.tasks = []
  }

  const data = await arc.tables() 

  const keys = {
    PK: `CATEGORY#${categoryId}`,
    SK: `TASK#${id}`,
  }

  await data.tracker.delete(keys)

  req.session.tasks = req.session.tasks.filter(task => task.id !== id)

  return {
    session: req.session
  }
  
}

handler = arc.http.async(requireLogin, handler)
export { handler }