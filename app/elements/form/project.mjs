export default function ({html}) {
  return html`
    <div class="card">
      <div class="card-header">
        Project
      </div>
      <div class="card-body">
        <form action="/projects" method="post">
          <div class="form-group">
            <label for="code">Code</label>
            <input type="text" class="form-control" name="code" id="code"/>
          </div>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" id="title"/>
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