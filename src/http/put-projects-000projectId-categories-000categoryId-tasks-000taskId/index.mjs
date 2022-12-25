import arc from '@architect/functions'
import response from '@architect/shared/response.mjs'
import requireLogin from '@architect/shared/require-login.mjs'

let handler = async (req) => {

  let { title, description, dueDate, priority } = req.body

  if(dueDate) {
    dueDate = new Date(dueDate).toISOString()
  }

  const projectId = req.params.projectId
  const categoryId = req.params.categoryId

  if(!req.session.tasks) {
    req.session.tasks = []
  }

  if (!title) {
    return response(400, {
      message: 'bad input',
    })
  }

  const id = req.params.taskId
  const data = await arc.tables() 

  const keys = {
    PK: `CATEGORY#${categoryId}`,
    SK: `TASK#${id}`,
  }

  const task = {
    ...keys,
    id,
    categoryId,
    projectId,
    title,
    description,
    dueDate,
    priority: priority || 1,
  }

  req.session.tasks = [...req.session.tasks, task]
  
  await data.tracker.put(task)
  return {
    location: '/dashboard',
    session: req.session
  }
}

handler = arc.http.async(requireLogin, handler)
export { handler }