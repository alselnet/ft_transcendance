FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 -y
RUN apt-get install python3-venv -y
RUN apt-get install pip -y

RUN apt-get install netcat-openbsd -y
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN mkdir home/backend
COPY backend home/backend_webapp/
COPY requirements.txt home/backend_webapp/
COPY start.sh home/backend_webapp/
WORKDIR home/backend_webapp/

RUN python3 -m venv env
ENV PATH="/home/backend_webapp/env/bin:$PATH"
RUN env/bin/pip install --no-cache-dir -r requirements.txt

CMD ["sh", "start.sh"]
