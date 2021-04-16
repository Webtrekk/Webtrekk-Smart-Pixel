# MAPP E2E testsuite

E2E test service for Smartpixel and SPA plugins.

## Commands

Start / stop the service locally: `make start_server` `make stop_server`

Start / stop the service in Docker: `make docker_start` `make docker_stop`

Start the service in Docker with server debug info: `docker_start_debug`

Start the server with interactive CLI mode locally: `make debug_server_start` You can quit by pressing CTRL + C twice, however the DB will still be running.

Start / stop the database: `make db_start`  `make db_stop` 

iex into Docker session: `make docker_iex`

