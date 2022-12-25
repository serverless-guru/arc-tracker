export async function get(req) {
  return {
    json: {
      session: req.session
    }
  }
}