FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 -y
RUN apt-get install python3-venv -y
RUN apt-get install pip -y

RUN apt-get install -y netcat-openbsd libjpeg-dev zlib1g-dev
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN mkdir home/ft_transcendance
COPY ft_transcendance home/ft_transcendance/
COPY requirements.txt home/ft_transcendance/
COPY start.sh home/ft_transcendance/

COPY ft_transcendance/users/avatars /home/ft_transcendance/avatars

WORKDIR /home/ft_transcendance/

RUN python3 -m venv env
ENV PATH="/home/ft_transcendance/env/bin:$PATH"
RUN env/bin/pip install --no-cache-dir -r requirements.txt

CMD ["sh", "start.sh"]
