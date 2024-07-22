FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install redis-server -y
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 648ACFD622F3D138
EXPOSE 6380

CMD ["redis-server", "--protected-mode", "no", "--port", "6380"]