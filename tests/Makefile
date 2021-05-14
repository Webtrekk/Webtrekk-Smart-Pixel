.PHONY: start_server stop_server debug_server_start docker_start docker_stop docker_start_debug run_phoenix_inside_docker docker_iex prepare_coverage

start_server:
	bash ./admin/runner.sh start_server

stop_server:
	bash ./admin/runner.sh stop_server

debug_server_start:
	bash ./admin/runner.sh debug_server_start

docker_start:
	cd ./admin && docker-compose up -d && cd .. && bash ./admin/runner.sh log_info

docker_stop:
	cd ./admin && docker-compose down

docker_start_debug:
	cd ./admin && docker-compose up

run_phoenix_inside_docker:
	bash ./admin/runner.sh run_phoenix_inside_docker

docker_iex:
	docker exec -it phoenix bash -c "chmod +x /app/admin/runner.sh && /app/admin/runner.sh iex_in_docker"

prepare_coverage:
	bash ./admin/runner.sh prepare_coverage