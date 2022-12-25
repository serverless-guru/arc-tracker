export default function Index({ html, state }) {

  const { store } = state;
  const { message = "", session } = store

  if (!session.email)
    return html`<p>${message}</p>
      <p>Not logged in, please <a href="account/login">login</a> to continue.</p>`;

  return html`
    <nav-menu></nav-menu>
    <board-columns></board-columns>
  `
}
