PYTHON := python3
PIP := pip3

all: up

up:
	@echo "Creating DB volume..."
	@mkdir -p /Users/jeremycointre/Coding/Postgres_volume
	@mkdir -p /Users/jeremycointre/Coding/Static_volume
	@chmod -R 777 /Users/jeremycointre/Coding/Postgres_volume
	@chmod -R 777 /Users/jeremycointre/Coding/Static_volume
	@echo "Launching docker-compose..."
	@docker-compose -f srcs/docker-compose.yml up --build

superuser:
	@echo "Please enter a valid username and password for the new superuser (email field can stay blank): "
	@$(PYTHON) srcs/requirements/ft_transcendance/ft_transcendance/manage.py createsuperuser

stop:
	@echo "Stopping containers..."
	@docker-compose -f srcs/docker-compose.yml down
    
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
