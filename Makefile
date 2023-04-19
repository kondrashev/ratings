build:
	docker build -t image .
run:
	docker run -d -p 80:80 --rm --name container image
stop:
	docker stop container
clear:
	docker system prune -a