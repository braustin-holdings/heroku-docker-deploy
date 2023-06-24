import { getInput, info, setFailed } from "@actions/core";
import { promisify } from "util";
import { exec } from "child_process";

import { herokuActionSetup } from "./lib/scripts";
import herokuLogin from "./lib/login";

const herokuAction = herokuActionSetup(getInput('app_name'));

herokuLogin()
    .then(async () => {
       const { stdout } = await promisify(exec)(herokuAction('tag'));

       info('Your Docker image was tagged at the Heroku Container Registry. 🏗');
       info(`stdout: ${stdout}`);
     })
  .then(async () => {
      info('Pushing your image to Heroku Container Registry.');
    const { stdout } = await promisify(exec)(herokuAction('push'));

    info('Your Docker image was pushed to Heroku Container Registry. 🏗');
    info(`stdout: ${stdout}`);
  })
  .then(async () => {
    await promisify(exec)(herokuAction('release'));

    info('Your Application was deployed successfully. 🚀');
  })
  .catch(error => {
    setFailed(`Something went wrong building your image. [Error]: ${(error as Error).message}`);
  })
