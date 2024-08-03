PYTHON := python3
PIP := pip3
DOCKER_COMPOSE := docker compose
VOLUMES_PATH := /Users/sawsan/Tasnim/

all: up

up:
	@echo "Creating DB volume..."
	@mkdir -p $(VOLUMES_PATH)Postgres_volume
	@mkdir -p $(VOLUMES_PATH)Static_volume
	@mkdir -p $(VOLUMES_PATH)Media_volume/avatars
	@chmod -R 777 $(VOLUMES_PATH)Postgres_volume
	@chmod -R 777 $(VOLUMES_PATH)Static_volume
	@chmod -R 777 $(VOLUMES_PATH)Media_volume/avatars
	@cp ./srcs/requirements/ft_transcendance/ft_transcendance/users/avatars/* $(VOLUMES_PATH)Media_volume/

	@echo "Bundling frontend files..."
	@cd srcs/requirements/ft_transcendance/ft_transcendance/assets/src && npm run build
	@cp ./srcs/requirements/ft_transcendance/ft_transcendance/assets/src/app/images/favicon.ico ./srcs/requirements/NGINX/html/images/.
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
	@docker rmi srcs-redis

prune:
	@echo "Deleting docker data..."
	@docker system prune -af

wipe: stop prune
	@echo "Deleting docker volume..."
	@docker volume rm srcs_DB srcs_MEDIA
	@docker volume prune -f

show:
	@docker ps
	@docker volume ls -q
	@docker image ls -q

re: clean all

.PHONY: all up stop clean fclean prune wipe show logs re
