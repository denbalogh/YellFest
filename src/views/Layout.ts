export default function Layout() {
  this.title = "YellFest - yell at each other to your heart's content";
  this.css = ["/css/global.css"];
  this.js = [];
  this.content = "";
}

Layout.prototype.setTitle = function (title: string) {
  this.title = title;
};

Layout.prototype.addCss = function (css: string) {
  this.css.push(css);
};

Layout.prototype.addJs = function (js: string) {
  this.js.push(js);
};

Layout.prototype.setContent = function (content: string) {
  this.content = content;
};

Layout.prototype.render = function (): string {
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${this.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${this.css.map((css) => `<link rel="stylesheet" type="text/css" href="${css}">`).join(" ")}
            ${this.js.map((js) => `<script type="text/javascript" src="${js}"></script>`).join(" ")}
        </head>
        <body>
            <div class="container">${this.content}</div>
        </body>
    </html>
    `;
};
