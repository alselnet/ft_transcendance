#!/bin/bash

/usr/local/bin/wait-for-it.sh -t 60 postgresdb:5432
echo "Database is ready"
env/bin/python3 manage.py makemigrations
env/bin/python3 manage.py migrate
env/bin/python3 manage.py createsuperuser --username=admin --email='' --no-input
env/bin/python3 manage.py shell -c "from django.contrib.auth.models import User; user = User.objects.get(username='admin'); user.set_password('admin'); user.save()"
env/bin/python3 manage.py runserver 0.0.0.0:8000