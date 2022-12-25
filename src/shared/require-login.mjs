export default async function requireLogin (req) {
  if (!req.session.email) {
    return {
      location: `/account/login`
    }
  }
}