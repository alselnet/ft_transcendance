PYTHON := python3
PIP := pip3

all: runserver

database:
	@echo "Creating DB volume..."
	@mkdir -p ~/Postgres_volume
	@echo "Setting up DB container..."
	@docker-compose up -d

install:
	@echo "Installing requirements..."
	@sudo apt-get install pip
	@$(PIP) install -r webapp/requirements.txt

superuser:
	@echo "Please enter a valid username and password for the new superuser (email field can stay blank): "
	@$(PYTHON) webapp/backend/manage.py createsuperuser

migrate:
	@echo "Running database migrations..."
	@$(PYTHON) webapp/backend/manage.py makemigrations
	@$(PYTHON) webapp/backend/manage.py migrate

runserver: database migrate
	@echo "Launching server..."
	@$(PYTHON) webapp/backend/manage.py runserver
    
dbstop:
	@echo "Stopping DB container..."
	@docker-compose down
    
clean: dbstop
	@echo "Deleting database image..."
	@docker rmi -f ft_transcendance_postgresdb

prune: dbstop
	@echo "Deleting docker data..."
	@docker system prune -af --volumes

re: clean all

.PHONY: all database install migrate superuser runserver stop clean prune re