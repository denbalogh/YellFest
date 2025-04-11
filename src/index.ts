import router from "./middlewares/router";
import App from "./App";
import logger from "./middlewares/logger";
import path from "node:path";
import staticFolder from "./middlewares/static";
import { createTablesIfDontExist } from "./db/setup";

const PORT = parseInt(process.env.APP_PORT as string);

// Setup database
createTablesIfDontExist();

const app = new App();

// Log requests when in dev mode
if (process.env.NODE_ENV === "dev") {
  app.addMiddleware(logger);
}

const staticFolderPath = path.join(import.meta.dirname, "..", "public");
app.addMiddleware(staticFolder(staticFolderPath));

app.addMiddleware(router);

app.start(PORT);
