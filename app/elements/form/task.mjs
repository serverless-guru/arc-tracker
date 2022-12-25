export default function ({html, state}) {
  const { store } = state;
  const { projectId, categoryId } = store.session;
  return html`
    <div class="card">
      <div class="card-header">
        Task
      </div>
      <div class="card-body">
        <form action="/projects/${projectId}/categories/${categoryId}/tasks" method="post">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" class="form-control" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input type="date" class="form-control" name="dueDate" />
          </div>
          <div class="form-group">
            <label for="priority">Priority</label>
            <select class="form-control" name="priority">
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
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