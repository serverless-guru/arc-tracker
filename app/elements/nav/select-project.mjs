export default function SelectProject({ html, state }) {
  const { store, } = state
  const { projects } = store
  const projectsList = projects.map((project) => `
    <li><a class="dropdown-item" onclick="selectProject('${Buffer.from(JSON.stringify(project), 'binary').toString('base64')}')">${project.title}</a></li>
  `)
  return html`
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        id="dropdownMenuButton"
        name="dropdownMenuButton"
      >
        Select project
      </button>
      <ul class="dropdown-menu">
        ${projectsList.join('')}
      </ul>
    </div>
    <script>
      if(sessionStorage.getItem('project')) { 
        const title = JSON.parse(atob(sessionStorage.getItem('project'))).title
        document.getElementById('dropdownMenuButton').innerHTML = title
        selectProject(sessionStorage.getItem('project'))
      }
      addEventListener('select-project', async (event) => {
        const project = JSON.parse(atob(event.detail))
        const elements = document.getElementsByName('dropdownMenuButton')
        elements.forEach((element) => element.innerHTML = project.title)
        sessionStorage.setItem('project', event.detail)
        await fetch('/projects/' + project.code + '/select', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      })
      function selectProject(project) {
        const event = new CustomEvent('select-project', { detail: project })
        dispatchEvent(event);
      }
    </script>
  `
}