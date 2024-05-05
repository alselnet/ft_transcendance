PYTHON := python3
PIP := pip3

all: database install migrate runserver

database:
	@echo "Creating DB volume..."
	@mkdir -p ~/Postgres_volume
	@echo "Setting up DB container..."
	@docker-compose up -d

install:
	@echo "Installing requirements..."
	@sudo apt-get install pip
	@$(PIP) install -r webapp/requirements.txt

migrate: install
	@echo "Running database migrations..."
	@$(PYTHON) webapp/backend/manage.py makemigrations
	@$(PYTHON) webapp/backend/manage.py migrate
	@$(PYTHON) webapp/backend/manage.py createsuperuser --noinput \
		--username=admin \
		--email=""

runserver: migrate
	@echo "Launching server..."
	@$(PYTHON) webapp/backend/manage.py runserver
    
stop:
	@echo "Stopping DB container..."
	@docker-compose down
    
clean: stop
	@echo "Deleting database image..."
	@docker rmi transcendocker-postgresdb

prune: stop
	@echo "Deleting docker data..."
	@docker system prune -af

re: fclean all

.PHONY: all database install migrate runserver stop clean prune re