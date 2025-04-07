import { getNewAuthorName } from "../../db/author";
import Page from "../../Page";
import { ViewFundAsync } from "../../types/view";
import container from "../../views/container";
import header from "../../views/header";
import newFightForm from "../../views/newFightForm";

const newFight: ViewFundAsync = async (...args) => {
  const [, res] = args;

  const newUserName = await getNewAuthorName();

  const page = new Page();
  page.setTitle("YellFest - Creating new fight");
  page.addCss("/css/new.css");
  page.setBody(
    container([
      header("<h2>Creating new fight</h2>"),
      newFightForm(newUserName),
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
