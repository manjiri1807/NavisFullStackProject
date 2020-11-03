JEST    := node_modules/.bin/jest
NODEMON := node_modules/.bin/nodemon
WEBPACK := node_modules/.bin/webpack

clean: clean-deps clean-dist clean-jest

clean-deps: clean-lockfile clean-node_modules

clean-dist:
	rm -rf ./web-server/dist

clean-jest:
	JEST_ACTIVE=true $(JEST) --clearCache

clean-lockfile:
	rm package-lock.json; rm pnpm-lock.yaml

clean-node_modules:
	rm -rf node_modules

deps:
	pnpm i

dev:
	REDUX_DEVTOOLS=true VERSION=dev $(WEBPACK) --config ./webpack.config.js --watch --progress

storybook:
	npm run storybook

jest:
	JEST_ACTIVE=true $(JEST) --colors

jest-watch:
	JEST_ACTIVE=true $(JEST) --colors --watch apps/ shared/

jest-update-storyshots:
	JEST_ACTIVE=true $(JEST) --colors -u

server:
	$(NODEMON) ./web-server/server.js
