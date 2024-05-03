PYTHON := python3
PIP := pip3

all: install migrate runserver

install:
	@echo "Installing requirements..."
	@$(PIP) install -r webapp/requirements.txt

migrate: install
	@echo "Running database migrations..."
	@$(PYTHON) webapp/backend/manage.py migrate

runserver: migrate
	@echo "Launching server..."
	@$(PYTHON) webapp/backend/manage.py runserver
    
.PHONY: all install migrate runserver