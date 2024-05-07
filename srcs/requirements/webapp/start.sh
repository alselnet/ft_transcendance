#!/bin/bash

/usr/local/bin/wait-for-it.sh -t 60 postgresdb:5432
echo "Database is ready"
env/bin/python3 manage.py makemigrations
env/bin/python3 manage.py migrate
env/bin/python3 manage.py runserver 0.0.0.0:8000
