import { getNewAuthorName } from "../../db/author";
import Page from "../../Page";
import { ViewFuncAsync } from "../../types/view";
import container from "../../views/container";
import header from "../../views/header";
import main from "../../views/main";

const newFight: ViewFuncAsync = async (...args) => {
  const [, res] = args;

  const newUserName = await getNewAuthorName();

  const page = new Page();
  page.setTitle("YellFest - Creating new fight");
  page.addCss("/css/newFight.css");
  page.setBody(
    container([
      header("<h2>Creating new fight</h2>"),
      main(`
        <form action="/" method="POST">
            <h3>Author</h3>
            <div class="author">
                <label>
                    <p>Name</p>
                    <input name="name" placeholder="${newUserName}" maxlength=30 />
                </label>
                <label>
                    <p>Secret</p>
                    <input name="secret" maxlength=50 type="password" />
                </label>
            </div>
            <p>Name + Secret: Your YellFest Identity</p>
            <h3>Fight</h3>
            <label>
                <p class="required">Title</p>
                <input name="title" maxlength=100 required />
            </label>
            <label>
                <p class="required">Body</p>
                <textarea name="body" maxlength=2000 required ></textarea>
            </label>
            <button type="submit" class="cta-button">Post</button>
        </form>
      `),
    ]),
  );

  const html = page.render();

  res
    .writeHead(200, {
      "content-type": "text/html",
      "content-length": Buffer.byteLength(html),
    })
    .end(html);

  return true;
};

export default newFight;
