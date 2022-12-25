export default function Signup({ html, state }) {
  const { store } = state;
  const { errors = [], email, password, confirmPassword } = store.session;
  return html`
    <div class="card">
      <div class="card-header">Sign up to create your boards</div>
      <div class="card-body">
        <form action="/signup" method="post">
          <div
            class="form-group">
            <label for="email">Email</label>
            <input required type="email" class="form-control" name="email" id="email" value=${email} />
            <p
              class="help-block ${errors.indexOf('Email already exists') > -1 ? 'text-danger' : ''}"
            >
              ${errors.find((error) => error === 'Email already exists' ? error : '')}
            </p>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              required
              type="password"
              class="form-control"
              name="password"
              id="password"
              value=${password}
            />
            <p
              class="help-block ${errors.indexOf('Passwords do not match') > -1 ? 'text-danger' : ''}"
            >
              ${errors.find((error) => error === 'Passwords do not match' ? error : '')}
            </p>
          </div>
          <div class="form-group">
            <label for="password">Confirm Password</label>
            <input
              required
              type="password"
              class="form-control"
              name="confirmPassword"
              id="confirmPassword"
              value=${confirmPassword}
            />
            <p
              class="help-block ${errors.indexOf('Passwords do not match') > -1 ? 'text-danger' : ''}"
            >
              ${errors.find((error) => error === 'Passwords do not match' ? error : '')}
            </p>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary form-control">
              Sign Up
            </button>
          </div>
        </form>
        <p>Already have an account? <a href="/account/login">Login</a></p>
      </div>
    </div>
  `;
}
