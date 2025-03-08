# charity-app-backend

A REST API backend for the charity website.

## Prerequisites

Docker must be installed on your system.

## Getting started

Copy the .env.example file to .env.local:

```bash
cp .env.example .env.local
```

Build an image and run it:

```bash
make build
make run
```

Run database migrations and seed data:

```bash
make migrate-up
make seed
```

The API is available at http://localhost:8000/

Test users' credentials:

| Username        | Password |
| --------------- | -------- |
| user-1@site.com | password |
| user-2@site.com | password |

## API Reference

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/42366834-298e3baa-9f04-4a40-8d37-597928539d3e?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D42366834-298e3baa-9f04-4a40-8d37-597928539d3e%26entityType%3Dcollection%26workspaceId%3Ddeb5e808-774b-4d51-8e9b-4bcbd2fe0281)
