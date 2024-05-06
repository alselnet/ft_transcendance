FROM debian:latest

RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 -y
RUN apt-get install python3-venv -y
RUN apt-get install pip -y

RUN mkdir home/backend
COPY backend home/backend_webapp/
COPY requirements.txt home/backend_webapp/
WORKDIR home/backend_webapp/

RUN python3 -m venv env
ENV PATH="/home/backend_webapp/env/bin:$PATH"
RUN env/bin/pip install --no-cache-dir -r requirements.txt

RUN env/bin/python3 manage.py makemigrations
RUN env/bin/python3 manage.py migrate

EXPOSE 8000