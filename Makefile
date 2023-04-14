include .env

.PHONY: all

build:
	docker build -t hugo-gpt .

run:
	export $(cat .env | xargs)
	docker stop hugo-gpt || true && docker rm hugo-gpt || true
	docker stop nginx-proxy || true && docker rm nginx-proxy || true
	docker stop nginx-proxy-acme || true && docker rm nginx-proxy-acme || true
	
	docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume certs:/etc/nginx/certs \
    --volume vhost:/etc/nginx/vhost.d \
    --volume html:/usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    --network gpt \
    nginxproxy/nginx-proxy

	docker run --detach \
    --name nginx-proxy-acme \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    --volume acme:/etc/acme.sh \
    --env "DEFAULT_EMAIL=qw6866223@163.com" \
    --network gpt \
    nginxproxy/acme-companion

	docker run --detach \
	--name hugo-gpt \
	--rm \
	-e OPENAI_API_KEY=${OPENAI_API_KEY} \
	-e OPENAI_API_HOST=${OPENAI_API_HOST} \
	-e VIRTUAL_HOST=hugogpt.com \
	-e VIRTUAL_PORT=3000 \
	-e LETSENCRYPT_HOST=hugogpt.com \
	--network gpt \
	hugo-gpt

logs:
	docker logs -f hugo-gpt

push:
	docker tag hugo-gpt:latest ${DOCKER_USER}/hugo-gpt:${DOCKER_TAG}
	docker push ${DOCKER_USER}/hugo-gpt:${DOCKER_TAG}

gpsuh:
	git add -A
	git commit -m "update + $(datetime)"
	git push