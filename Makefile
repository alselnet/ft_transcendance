PYTHON := python3
PIP := pip3

all: up

up:
	@echo "Creating DB volume..."
	@mkdir -p ~/Postgres_volume
	@echo "Launching docker-compose..."
	@docker-compose -f srcs/docker-compose.yml up -d --build

superuser:
	@echo "Please enter a valid username and password for the new superuser (email field can stay blank): "
	@$(PYTHON) srcs/requirements/webapp/backend/manage.py createsuperuser

runserver:
	@echo "Launching server..."
	@$(PYTHON) srcs/requirements/webapp/backend/manage.py runserver

stop:
	@echo "Stopping containers..."
	@docker-compose -f srcs/docker-compose.yml down
    
clean: stop
	@echo "Deleting database image..."
	@docker stop $(docker ps -aq)
	@docker rm $(docker ps -aq)
	@docker rmi $(docker images -q)

prune: stop
	@echo "Deleting docker data..."
	@docker system prune -af

wipedb: stop
	@echo "Deleting docker volume..."
	@docker volume prune -f

show:
	@docker ps
	@docker volume ls -q
	@docker image ls -q

logs:
	@docker logs postgresdb
	@docker logs webapp

re: clean all

.PHONY: all up stop clean prune wipedb show logs re