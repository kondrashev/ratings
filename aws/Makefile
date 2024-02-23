#To start these commands necessary to run this => /sudo make -j 1 start/
start: 1 2
1:
	echo "Pull the image from docker hub"
	sudo docker pull kondrashev/ratings:latest
2:
	echo "Reload container's server from ec2"
	sudo docker-compose up -d --build
