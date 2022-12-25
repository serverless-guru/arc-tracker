export async function getProjects () {
  const res = await fetch('/projects', {
    headers: { 'accept': 'application/json' },
    method: 'get'
  })

  const { projects } = await res.json()

  return projects.map(({ code, name }) => { return { code, name } })
}