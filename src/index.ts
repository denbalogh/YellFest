import router from "./middlewares/router";
import App from "./App";
import logger from "./middlewares/logger";

const PORT = 3000;

const app = new App();

app.addMiddleware(logger);
app.addMiddleware(router);

app.start(PORT);
