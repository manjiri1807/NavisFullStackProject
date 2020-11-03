# Getting Started

## Setup
1. Use [nvm](https://github.com/creationix/nvm) to install node.js v12.16.3
    - If you don't have nvm installed:
      - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash`
    - Once nvm is installed:
      - `nvm install 12.16.3`
      - `nvm alias default node`
2. Install [pnpm](https://github.com/pnpm/pnpm#install) if you don't already have it
    - `curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | node`
3. `cd` to `client/` (the directory this file is in)
4. Install dependencies by running `make deps`

## Running
1. Run the webpack dev server with `make dev`
2. In a new terminal, start the node server with `make server` to serve the bundled assets

### Other commands
- `make jest` will run the test suite
    - `make jest-watch` to run in watch mode
    - `make jest-update-storyshots` will update snapshots
- `make storybook` will run storybook
- `make clean` will clear dependencies and jest cache
