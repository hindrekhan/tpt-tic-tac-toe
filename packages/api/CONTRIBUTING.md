# Contribution

...

## Development

You need to have [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) installed to run this project locally.

```bash
# git clone project locally

# install required packages (node modules)
yarn

# start project with hot reload
yarn start

# run jest tests
yarn test
# run tests in watch mode
yarn test-watch

# start application with node js debugger enabled
# after that you can for example connect into it with your Editor (phpstorm/webstorm> Attach to Node.js/Chrome)
yarn start-debugger

# run linter (ESLint + prettier)
yarn lint

# run prettier (it will be also done automatically in git hook before commit)
yarn prettier
```

## Docker

Project will be deployed as docker image in production that is build by CI. You can test build locally.

```bash
# build docker image
docker build -t js-app-test .

# run docker image
docker run --rm -p 3000:3000 js-app-test

# open browser http://localhost:3000/
```
