import arc from '@architect/functions'

let handler = (req) => {
  req.session.projectId = req.params.projectId
  req.session.categoryId = req.params.categoryId
  return {
    session: req.session,
  }
}

handler = arc.http.async(handler)
export { handler }