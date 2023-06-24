import {getInput} from "@actions/core"

type Actions = 'push' | 'release' | 'tag';

export const authenticationScript = (username: string, password: string) =>
    `echo ${password} | docker login --username=${username} registry.heroku.com --password-stdin`;

export const herokuActionSetup = (appName: string) => {
    return (action: Actions) => {
        const HEROKU_API_KEY = getInput('api_key');
        const dockerImage = getInput('docker_image');
        const processType = getInput('process_type');
        if (action === "tag") {
            return `docker tag ${dockerImage} registry.heroku.com/${appName}/${processType}`
        } else if (action === "push") {
            return `docker push registry.heroku.com/${appName}/${processType}`
        }

        return `HEROKU_API_KEY=${HEROKU_API_KEY} heroku container:${action} ${processType} --app ${appName}`
    }
}
