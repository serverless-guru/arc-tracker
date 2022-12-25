import arc from '@architect/functions'

let handler = (req) => {
  req.session.selectedProject = req.params.projectId
  return {
    session: req.session,
    location: '/dashboard'
  }
}

handler = arc.http.async(handler)
export { handler }