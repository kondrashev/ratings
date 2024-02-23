#To start these commands necessary to run this => /sudo make -j 1 start/
start: 1 2 3
1:
	echo "Stop docker-compose"
	sudo docker-compose down
2:
	echo "Delete the image from docker hub"
	sudo docker-compose rmi kondrashev/ratings:latest
3:
	echo "Reload container's server from ec2"
	sudo docker-compose up -d
