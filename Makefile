include .env

.PHONY: all

build:
	docker build -t hugo-gpt .

run:
	export $(cat .env | xargs)
	docker stop hugo-gpt || true && docker rm hugo-gpt || true
	docker run --name hugo-gpt --rm -e OPENAI_API_KEY=${OPENAI_API_KEY} -p 3000:3000 hugo-gpt

logs:
	docker logs -f hugo-gpt

push:
	docker tag hugo-gpt:latest ${DOCKER_USER}/hugo-gpt:${DOCKER_TAG}
	docker push ${DOCKER_USER}/hugo-gpt:${DOCKER_TAG}