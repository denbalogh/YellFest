import router from "./middlewares/router";
import App from "./App";
import logger from "./middlewares/logger";
import path from "node:path";
import staticFolder from "./middlewares/static";
import { createTables } from "./db/setup";

const PORT = 3000;

// Create tables in DB, if don't exist
createTables();

const app = new App();

app.addMiddleware(logger);

const staticFolderPath = path.join(__dirname, "..", "public");
app.addMiddleware(staticFolder(staticFolderPath));

app.addMiddleware(router);

app.start(PORT);
