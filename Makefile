PYTHON := python3
PIP := pip3

all: database install migrate runserver

database:
	@echo "Setting up DB container..."
	@docker build -t postgres ./DB/
	@docker run --name postgresDB -p 5432:5432 -e POSTGRES_DB=transcenDB -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -d postgres

install:
	@echo "Installing requirements..."
	@sudo apt-get install pip
	@$(PIP) install -r webapp/requirements.txt

migrate: install
	@echo "Running database migrations..."
	@$(PYTHON) webapp/backend/manage.py makemigrations
	@$(PYTHON) webapp/backend/manage.py migrate

runserver: migrate
	@echo "Launching server..."
	@$(PYTHON) webapp/backend/manage.py runserver
    
stop:
	@docker stop postgresDB
    
clean: stop
	@docker rm postgresDB

fclean: stop
	@docker system prune -af

re: fclean all

.PHONY: all database install migrate runserver stop clean fclean re