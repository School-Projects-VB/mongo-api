SHELL := /bin/bash

run:
	npm start

test:
	curl -i 'http://localhost:3000/users' -H "Accept: application/json" 

.PHONY: start, test