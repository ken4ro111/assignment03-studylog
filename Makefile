.PHONY: build deploy all test

build:
	npm run build

deploy:
	firebase deploy

all: build deploy

test:
	npm run test