# charity-app-frontend

Frontend for the charity web app

## Getting started

Copy the .env.example file to .env.local:

```bash
cp .env.example .env.local
```

Install dependencies and run dev server:

```
npm install
npm run dev
```

The dev server is available at http://localhost:8001/

## How to use maps feature?

In order to use maps, you need to set these environment variables in .env.local:

```
VITE_MAPS_ENABLED=true
VITE_YMAPS_API_KEY=*Your Yandex Maps API key*
VITE_APP_URL=*Hostname which your API key is linked to*
```

Also, add this mapping from your local frontend hostname to localhost in your hosts file:

```
sudo su
echo "127.0.0.1 *Hostname from VITE_APP_URL*" >> /etc/hosts
```

This mapping allows you to serve the app on the hostname that your API key is linked to with maps feature enabled.

## Production build

```
npm run build
```
