PYTHON := python3
PIP := pip3
DOCKER_COMPOSE := docker-compose
VOLUMES_PATH := /home/jules/

all: up

up:
	@echo "Creating DB volume..."
	@mkdir -p $(VOLUMES_PATH)Postgres_volume
	@mkdir -p $(VOLUMES_PATH)Static_volume
	@chmod -R 777 $(VOLUMES_PATH)Postgres_volume
	@chmod -R 777 $(VOLUMES_PATH)Static_volume
	@echo "Bundling frontend files..."
	@cd srcs/requirements/ft_transcendance/ft_transcendance/assets/src && npm run build
	@echo "Launching docker compose..."
	@$(DOCKER_COMPOSE) -f srcs/docker-compose.yml up --build

superuser:
	@echo "Please enter a valid username and password for the new superuser (email field can stay blank): "
	@$(PYTHON) srcs/requirements/ft_transcendance/ft_transcendance/manage.py createsuperuser

stop:
	@echo "Stopping containers..."
	@$(DOCKER_COMPOSE) -f srcs/docker-compose.yml down
    
clean: stop
	@echo "Deleting database image..."
	@docker rmi srcs-postgresdb
	@docker rmi srcs-webapp
	@docker rmi srcs-nginx

prune:
	@echo "Deleting docker data..."
	@docker system prune -af

wipedb: stop prune
	@echo "Deleting docker volume..."
	@docker volume rm srcs_DB
	@docker volume prune -f

show:
	@docker ps
	@docker volume ls -q
	@docker image ls -q

re: prune all

.PHONY: all up stop clean fclean prune wipedb show logs re
