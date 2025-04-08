/**
 *
 * @param right - element on the right side of the header
 * @returns
 */
export default function header(right = "") {
  return `
    <header>
        <div>
            <a href="/">
                <img src="/images/logo_200x200.png" alt="Red logo for YellFest featuring a bold megaphone icon, symbolizing loud, anonymous arguments" />
                <h1>YellFest</h1>
            </a>
            <p>Louder wins</p>
        </div>
        ${right || `<a href="/fights/new" class="cta-button">Start a fight</a>`}
    </header>
    `;
}
