SHELL = /bin/bash

docker-up:
	docker-compose -f provision/docker-compose.yml -p temporal-sandbox up -d

docker-down:
	docker-compose -f provision/docker-compose.yml -p temporal-sandbox down -v

client-up:
	node build/src/client.js

worker-up:
	node build/src/worker.js