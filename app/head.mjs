import { getLinkTag } from '@enhance/arc-plugin-styles/get-styles'

export default function Head() {
  const title = `Tracker`
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      ${getLinkTag()}
      <link rel="icon" href="/_public/favicon.svg">
      <link rel="stylesheet" href="/_public/dragula/dragula.min.css">
      <link rel="stylesheet" href="/_public/bootstrap/css/bootstrap.min.css">
      <script src="/_public/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/_public/dragula/dragula.min.js"></script>
    </head>
  `
}