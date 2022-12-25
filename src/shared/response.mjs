export default function response (statusCode, body, cookie) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie
    },
    body: JSON.stringify(body)
  }
}