SHELL = /bin/bash

docker-up:
	docker-compose -f provision/docker-compose.yml -p temporal-sandbox up -d

client-up:
	node build/src/client.js

worker-up:
	node build/src/worker.js