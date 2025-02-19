build:
	docker compose build

run:
	docker compose up

migrate-up:
	docker compose exec -it app npm run db:migrate up

migrate-down:
	docker compose exec -it app npm run db:migrate down

seed:
	docker compose exec -it app npm run db:seed

stop:
	docker compose stop