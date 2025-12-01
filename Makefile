.PHONY: up down

# Levanta el contenedor y lo construye si hace falta
up:
	docker-compose up --build

# Detiene y elimina los contenedores
down:
	docker-compose down

