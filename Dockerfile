# Użyj oficjalnego obrazu Ubuntu 22.04 jako podstawy
FROM ubuntu:22.04

# Ustaw zmienne środowiskowe, aby uniknąć interaktywnych zapytań
ENV DEBIAN_FRONTEND=noninteractive

# Zainstaluj wymagane pakiety
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

# Zainstaluj Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Ustaw katalog roboczy
WORKDIR /usr/src/app

# Kopiuj plik package.json
COPY package.json ./

# Instalacja zależności
RUN npm install

# Instalacja najnowszej wersji npm
RUN npm install -g npm@latest

# Kopiuj resztę aplikacji
COPY . .

# Expose port 3000 dla aplikacji React
EXPOSE 3000

# Uruchom aplikację React w trybie deweloperskim
CMD ["sh"]


