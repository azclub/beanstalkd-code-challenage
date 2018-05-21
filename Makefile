seed:
	docker exec -it aftership_worker_1 npm run seed
mongo: 
	docker exec -it aftership_mongodb_1 mongo
start: 
	docker-compose up
clean: 
	docker-compose down
update:
	docker build -t helenyfung/aftership_worker . && docker push helenyfung/aftership_worker