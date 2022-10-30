# ---- DEV IMAGE ----

# Latest LTS (major: 16)
# ( add `-slim` at the end for )
# ( smaller image size         )
FROM node:16.13.0 as dev


#! ----- process.env definitions START -----
# (NB: remember to enable them in
# config/webpack.base.config.js)

# Separate hosts by ";"                    ,-- web-app
ENV ACCESS_CONTROL_ALLOW_ORIGIN=http://localhost:31000

#! ----- process.env definitions END -----

ENV NODE_ENV develop
ENV PATH=/app/node_modules/.bin:$PATH

#       ,- app ,- debugger port
EXPOSE 3000 9229

# This is where our app lives
RUN mkdir /app && chown -R node:node /app
WORKDIR /app

# Use root user to avoid permission
# issues with the bind mounts in
# docker compose (non-privileged: node)
USER root

# Install packages before bundling
# to take advantage of cached layers
COPY --chown=node:node \
    package.json package-lock.json tsconfig.json ./
RUN npm install && npm cache clean --force

# NB: Notice that no application is bundled!
# This has to be done in `docker-compose.yaml` as a bind mount

# Restart on file changes
CMD ts-node-dev --respawn --transpile-only --inspect=0.0.0.0:9229 src/server.ts