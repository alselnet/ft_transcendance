all: webapp

webapp:
	@echo "Building env...."
	@python3 -m venv env
	@. env/bin/activate
	@echo "installing requirements..."
	@pip3 install -r webapp/requirements.txt
	@echo "lanching server..."
	@python3 webapp/backend/manage.py migrate
	@python3 webapp/backend/manage.py runserver

clean:
	@echo "deleting env..."
	@rm -rf env/
fclean: clean

re: clean all

show:
	docker ps
	docker volume ls -q
	docker container ls -q

logs:
	docker logs wordpress
	docker logs mariadb
	docker logs nginx

.PHONY: up clean stop re fclean show logs webapp