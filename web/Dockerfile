# ---- DEV IMAGE ----

# Latest LTS (major: 16)
# ( add `-slim` at the end for )
# ( smaller image size         )
FROM node:16.13.0 AS dev

#! ----- process.env definitions START -----
#  NB: Runtime env variables should use
#      REACT_APP_ prefix
ARG FRONTEND_API_HTTP_ENDPOINT
ENV REACT_APP_FRONTEND_API_HTTP_ENDPOINT $FRONTEND_API_HTTP_ENDPOINT
ARG FRONTEND_API_WS_ENDPOINT
ENV REACT_APP_FRONTEND_API_WS_ENDPOINT $FRONTEND_API_WS_ENDPOINT
#! ----- process.env definitions END -----

ENV NODE_ENV develop

#       ,- app ,- debugger port
EXPOSE 4000 9229

# This is where our app lives
RUN mkdir /app
WORKDIR /app

# Use root user to avoid permission
# issues with the bind mounts in
# docker compose (non-privileged: node)
USER root

# Install packages before bundling
# to take advantage of cached layers
COPY --chown=node:node package.json package-lock.json codegen.ts tsconfig.json ./
RUN npm install && npm cache clean --force



# NB: Notice that no application is bundled!
# This has to be done in `docker-compose.yaml` as a bind mount
ENTRYPOINT npm run watch graphql_codegen & npm start
