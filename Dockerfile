FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalacja zależności systemowych
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    software-properties-common \
    libnss3 \
    libnspr4 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libx11-xcb1 \
    libxcursor1 \
    libgtk-3-0 \
    libgdk-pixbuf-2.0-0 \
    libatomic1 \
    libxslt1.1 \
    libvpx7 \
    libevent-2.1-7 \
    libopus0 \
    libgstreamer1.0-0 \
    libgstreamer-plugins-base1.0-0 \
    libharfbuzz0b \
    libenchant-2-2 \
    libsecret-1-0 \
    libhyphen0 \
    libflite1 \
    libgles2-mesa-dev \
    libx264-dev \
    && rm -rf /var/lib/apt/lists/*

# Node 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@11.7.0

# Katalog roboczy
WORKDIR /usr/src/app

# Kopiowanie zależności i instalacja Node
COPY package*.json ./
RUN npm ci

# Instalacja Playwright i przeglądarek raz przy buildzie
RUN npx playwright install --with-deps

# Kopiowanie całej aplikacji
COPY . .

# Port frontend
EXPOSE 3000

# Domyślna komenda
CMD ["npm", "run", "dev"]