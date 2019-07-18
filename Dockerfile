FROM beevelop/ionic:v4.4.0

RUN apt-get update && apt-get install -y build-essential gcc make
RUN apt-get install -y -q python-software-properties software-properties-common

# RUN mkdir /src
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/
RUN npm i

COPY . /app

LABEL maintainer="Nucleo <dev@nucleo.house>"
