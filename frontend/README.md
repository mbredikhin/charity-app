# charity-app-frontend

Frontend for the charity web app

## Getting started

> [!TIP]
> You must use NodeJS >= 18

At first you need to add the address of local frontend to your hosts file in order to make it possible to use Yandex Maps API:

```bash
sudo su
echo "127.0.0.1 charity-app.local" >> /etc/hosts
```

```bash
npm install
npm run dev
```

After that dev version is available on address http://charity-app.local:5173/

## Production build

```
npm run build
```
