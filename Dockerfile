FROM node:12-slim

RUN echo "deb http://ftp.sg.debian.org/debian sid main " > /etc/apt/sources.list && \
  apt-get update && \
  apt-get install -y --no-install-recommends dumb-init=1.2.2-1.1 && \
  rm /etc/apt/sources.list && \
  apt-get clean

COPY '.' '/project'
WORKDIR /project
RUN yarn clean && \
    yarn install --frozen-lockfile && \
    yarn build && \
    yarn cache clean && \
    rm -rf /var/lib/apt/lists/*

RUN rm -rf ../__tests__  && \
    rm -rf ../src  && \
    rm -rf ../scripts

WORKDIR /project/build

ENV NODE_ENV=production

# Add dumb-init to make stopping of container fast.
# Reference at https://engineeringblog.yelp.com/2016/01/dumb-init-an-init-for-docker.html, http://jkamenik.github.io/blog/2017/10/21/docker-details---dumb-init/
CMD ["dumb-init", "node", "index.js"]
