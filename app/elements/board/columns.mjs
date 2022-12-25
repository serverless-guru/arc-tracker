export default function Columns({ html, state }) {
  return html`
    <style>
      .main {
        height: 100vh;
      }
      .dragula-container {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 8px;
        height: 100vh;
      }
    </style>
    <div class="container main">
      <div id="board" class="row col-md-12">
      </div>
    </div>
    <script>
      addEventListener('select-project', async (event) => {
        const project = JSON.parse(atob(event.detail))
        await getCategories(project)
      })

      if(sessionStorage.getItem('project')) {
        (async function() {
          const project = JSON.parse(atob(sessionStorage.getItem('project')))
          await getCategories(project)
        }())
      }

      async function getCategories(project) {
        const result = await fetch('/projects/' + project.code + '/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const { categories } = await result.json()
        const board = document.getElementById('board')
        board.innerHTML = ''
        categories.forEach(category => {
          const main = document.createElement('div')
          main.classList.add('col-md-3')
          const column = document.createElement('div')
          column.classList.add('dragula-container')
          const header = document.createElement('div')
          header.innerText = category.title
          const addCatBtn = document.createElement('div')
          addCatBtn.setAttribute('id', category.id)
          addCatBtn.classList.add('btn')
          addCatBtn.classList.add('btn-primary')
          addCatBtn.innerText = 'Add Task'
          addCatBtn.addEventListener('click', async (event) => {
            if(!event.target.id) return
            const project = JSON.parse(atob(sessionStorage.getItem('project')))
            await fetch('/projects/' + project.code + '/categories/' + category.id + '/select', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            window.location.href = '/form/task'
          })

          board.appendChild(main)
          main.appendChild(header)
          main.appendChild(addCatBtn)
          main.appendChild(column);
          (async function() {
            await getTasks(project, category, column)
          }())
        })
        const drake = dragula({
          isContainer: function (el) {
            return el.classList.contains('dragula-container');
          }
        });
      }

      async function getTasks(project, category, column) {
        const result = await fetch('/projects/' + project.code + '/categories/' + category.id + '/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const { tasks } = await result.json()
        tasks.forEach(task => {
          const card = document.createElement('div')
          card.classList.add('card')
          card.classList.add('mb-2')
          card.setAttribute('id', task.id)
          const cardBody = document.createElement('div')
          cardBody.classList.add('card-body')
          const cardTitle = document.createElement('h5')
          cardTitle.classList.add('card-title')
          cardTitle.innerText = task.title
          const cardText = document.createElement('p')
          cardText.classList.add('card-text')
          cardText.innerText = task.description
          const cardFooter = document.createElement('div')
          cardFooter.classList.add('card-footer')

          const cardFooterBtnDelete = document.createElement('div')
          cardFooterBtnDelete.classList.add('btn')
          cardFooterBtnDelete.classList.add('btn-danger')
          cardFooterBtnDelete.setAttribute('id', task.id)
          cardFooterBtnDelete.innerText = 'Delete'
          cardFooterBtnDelete.addEventListener('click', async (event) => {
            if(!event.target.id) return
            const project = JSON.parse(atob(sessionStorage.getItem('project')))
            const link = '/projects/' + project.code + '/categories/' + category.id + '/tasks/' + task.id
            console.log(link)
            await fetch(link, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            const card = document.getElementById(task.id)
            card.parentNode.removeChild(card)
          })
          column.appendChild(card)
          card.appendChild(cardBody)
          cardBody.appendChild(cardTitle)
          cardBody.appendChild(cardText)
          card.appendChild(cardFooter)
          cardFooter.appendChild(cardFooterBtnDelete)
        })
      }
    </script>
  `
}