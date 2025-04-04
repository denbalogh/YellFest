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
                <h1>YellFest</h1>
            </a>
            <p>Louder wins</p>
        </div>
        ${right || `<a href="/fights/new" class="cta-button">Start a fight</a>`}
    </header>
    `;
}
