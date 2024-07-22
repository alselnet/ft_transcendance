FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install redis-server -y

EXPOSE 6380

CMD ["redis-server", "--protected-mode", "no", "--port", "6380"]