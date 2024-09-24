#To start these commands necessary to run this => /make -j 1 start/
start: 1 2 3
1:
	echo "Running docker compose build"
	docker compose build
2:
	echo "Docker rename image"
	docker tag ratings-server:latest kondrashev/ratings
3:
	echo "Docker push image"
	docker push kondrashev/ratings
