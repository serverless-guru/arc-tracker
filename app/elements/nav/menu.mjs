export default function Menu({ html }) {

  return html`
    <div class="container">
      <div class="row">
        <div class="col-md-12 ">
          <nav class="navbar navbar-light bg-light">
            <button
              class="d-none btn btn-secondary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTracker"
              aria-controls="offcanvasTracker"
            >
              Start
            </button>

            <nav-create></nav-create>
            <nav-select-project></nav-select-project>
            <nav-settings></nav-settings>

          </nav>

          <div
            class="offcanvas offcanvas-start"
            tabindex="-1"
            id="offcanvasTracker"
            aria-labelledby="offcanvasTrackerLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasTrackerLabel">
                Tracker
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <div>
                Here you can manage you projects, account and preferences.
              </div>

              <nav-select-project></nav-select-project>
              <nav-create></nav-create>
              <nav-settings></nav-settings>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
