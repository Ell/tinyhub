docker-build:
	docker build . -t tinyhub:latest

docker-dev:
	docker run --rm -it -p 9229:9229 -p 8787:8787 -v .:/opt/app -v /opt/app/node_modules tinyhub:latest
