export default class {
  title = "YellFest - yell at each other to your heart's content";
  css: string[] = ["/css/global.css"];
  js: string[] = [];
  body = "";

  setTitle(title: string) {
    this.title = title;
  }

  addCss(css: string) {
    this.css.push(css);
  }

  addJs(js: string) {
    this.js.push(js);
  }

  setBody(body: string) {
    this.body = body;
  }

  render() {
    const css = this.css.map(
      (css) => `<link rel="stylesheet" type="text/css" href="${css}">`,
    );
    const js = this.js.map(
      (js) => `<script type="text/javascript" src="${js}"></script>`,
    );

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${this.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/png" href="/images/favicon/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />
            <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
            <meta name="apple-mobile-web-app-title" content="YellFest" />
            <link rel="manifest" href="/site.webmanifest" />
            ${css.join(" ")}
            ${js.join(" ")}
        </head>
        <body>
            ${this.body}
        </body>
    </html>
    `;
  }
}
