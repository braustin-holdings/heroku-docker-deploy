# Heroku Deploy - GitHub Action

This takes in an existing Docker image and deploys that to Heroku. 

This skips all the heroku build process and makes it easier to control the build process from GitHub Actions.

## How to use it

```yml
name: '' # set whatever name you want to your github job
on: {} # set the events you would like to trigger this job
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Build Your Docker Image at Github

      - name: Tag, Push and Deploy to Heroku # set whatever name you want to this step
        id: heroku
        uses: :braustin-holdings/heroku-docker-deploy@v3.2.0 # use the latest version of the action
        with:
          email: ${{ secrets.HEROKU_EMAIL }} # your heroku email
          api_key: ${{ secrets.HEROKU_API_KEY }} # your heroku api key
          app_name: ${{ secrets.HEROKU_APP_NAME }} # your application name
          docker_image: "PATH_TO_DOCKER_IMAGE"
          process_type: 'web' # Specify the process type you want to build and release
```

|   Variables    |                           Description                           | Required |
|:--------------:|:---------------------------------------------------------------:|:--------:|
|     email      |                      Heroku Email Account                       | ✅       |
|    api_key     |                         Heroku API Key                          | ✅       |
|    app_name    |                         Heroku App Name                         | ✅       |
| docker_image   |            The url for the image you want to publish            | ✅       |
|  process_type  | A space separated list of process you want to build and release | ✅       |
