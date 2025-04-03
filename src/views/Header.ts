export default function Header(right: string) {
  this.right = right;
}

Header.prototype.render = function () {
  return `
        <header>
            <div>
                <a href="/">
                    <h1>YellFest</h1>
                </a>
                <p>Louder wins</p>
            </div>
            ${this.right}
        </header>
    `;
};
