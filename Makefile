#To start these commands necessary to run this => /make -j 1 start/
start: 1 2 3 4 5 6 7 8 9
1:
	echo "Running docker compose stop"
	docker-compose down
2:
	echo "Running webpack build"
	npm run build
3:
	echo "Running docker compose build"
	docker-compose -f docker-compose-dev.yml build
4:
	echo "Running docker compose start"
	docker-compose -f docker-compose-dev.yml up -d
5:
	echo "Docker delete image"
	docker rmi kondrashev/ratings:latest
6:
	echo "Docker authorization"
	docker login
7:
	echo "Docker rename image"
	docker tag ratings-server:latest kondrashev/ratings
8:
	echo "Docker push image"
	docker push kondrashev/ratings
9:
	echo "Running webpack watch"
	npm run client
