export default function Login({ html, state }) {
  const { store } = state;
  const { errors = [], email, password } = store.session || {};

  return html`
    <div class="card">
      <div class="card-header">
        Login to access your boards
      </div>
      <div class="card-body">
        <form action="/login" method="post">
          <div class="form-group">
            <label for="email">Email</label>
            <input required type="email" class="form-control" name="email" value=${email} />
            <p
              class="help-block ${errors.indexOf('Email is required') > -1 || errors.indexOf('Email not found')  > -1 ? 'text-danger' : ''}"
            >

              ${errors.find((error) => error === 'Email is required' ? error : '')}
              ${errors.find((error) => error === 'Email not found' ? error : '')}
            </p>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input required type="password" class="form-control" name="password" value="password" />
            <p
              class="help-block ${errors.indexOf('Password is incorrect') > -1 ? 'text-danger' : ''}"
            >
              ${errors.find((error) => error === 'Password is incorrect' ? error : '')}
            </p>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary form-control">Login</button>
          </div>
        </form>
        <p> Don't have an account? <a href="/account/signup">Sign Up</a></p>
      </div>
    </div>
  `
}