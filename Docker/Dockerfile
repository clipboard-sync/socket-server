FROM node:lts-stretch-slim
RUN apt-get update \
    && apt-get install -y git --no-install-recommends \
    && git clone https://github.com/clipboard-sync/socket-server.git /opt/socket-server \
    && cd /opt/socket-server \
    && npm i \
    && apt-get remove -y --auto-remove git \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && apt-get autoremove -y \
    && apt-get clean
EXPOSE 3000
ENTRYPOINT [ "node", "/opt/socket-server/index.js" ]