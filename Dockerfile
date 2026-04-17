FROM node:24-bookworm-slim

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends wget ca-certificates gnupg \
  && wget -q https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb \
  && dpkg -i /tmp/packages-microsoft-prod.deb \
  && rm /tmp/packages-microsoft-prod.deb \
  && apt-get update \
  && apt-get install -y --no-install-recommends powershell \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY . .

ENV PORT=10000
ENV PROJECTM_BIND_HOST=0.0.0.0
ENV PROJECTM_DATA_DIR=/var/lib/projectm

RUN mkdir -p "${PROJECTM_DATA_DIR}"

EXPOSE 10000

CMD ["pwsh", "-NoLogo", "-NoProfile", "-File", "/app/server.ps1"]
