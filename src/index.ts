import router from "./middlewares/router";
import App from "./App";
import logger from "./middlewares/logger";
import path from "node:path";
import staticFolder from "./middlewares/static";

const PORT = 3000;

const app = new App();

app.addMiddleware(logger);

const staticFolderPath = path.join(__dirname, "..", "public");
app.addMiddleware(staticFolder(staticFolderPath));

app.addMiddleware(router);

app.start(PORT);
