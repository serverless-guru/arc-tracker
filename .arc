@aws
runtime nodejs16.x

@app
tracker

@shared

@tables
tracker
  PK *String
  SK **String

@static
prune true

@plugins
enhance/arc-plugin-enhance

@http
post /login
post /signup
get /logout

post /projects
get /projects
get /projects/:projectId/select


post /projects/:projectId/categories
get /projects/:projectId/categories

post /projects/:projectId/categories/:categoryId/tasks
get /projects/:projectId/categories/:categoryId/tasks
get /projects/:projectId/categories/:categoryId/select
put /projects/:projectId/categories/:categoryId/tasks/:taskId
delete /projects/:projectId/categories/:categoryId/tasks/:taskId
