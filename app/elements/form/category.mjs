export default function ({html, state}) {
  const { store } = state;
  const { selectedProject = '' } = store.session
  return html`
    <div class="card">
      <div class="card-header">
        Category
      </div>
      <div class="card-body">
        <form action="/projects/${selectedProject}/categories" method="post">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" />
          </div>
          <p></p>
          <div class="form-group text-right">
            <a href="/dashboard" type="button" id="cancel" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>

  `
}