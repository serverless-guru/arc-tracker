import arc from '@architect/functions'

let handler = () => {
  return {
    session: {},
    location: '/'
  }
}

handler = arc.http.async(handler)
export { handler }