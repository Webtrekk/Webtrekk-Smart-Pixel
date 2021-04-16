#!/bin/bash

SCRIPT=$(readlink -f "$0")
ADMINPATH=$(dirname "$SCRIPT")
SERVERPATH=$ADMINPATH/../server

function log {
	tput setaf 5; echo $1
	tput sgr0
}

function start_server {
    cd $ADMINPATH && docker top admin_db_1 || db_start &&
    cd $SERVERPATH &&
    PORT=4000 MIX_ENV=dev elixir --erl "-detached" -S mix phx.server &&
    log_info
}

function stop_server {
    pkill beam.smp && db_stop
}

function debug_server_start {
    cd $ADMINPATH && docker top admin_db_1 || db_start
    cd $SERVERPATH && iex -S mix phx.server
}

function db_start {
    cd $ADMINPATH && docker-compose up -d &&
    cd $SERVERPATH &&
    sleep 2 &&
    [[ -f ./priv/cert/selfsigned_key.pem ]] || mix phx.gen.cert &&
    mix ecto.create &&
    mix ecto.migrate
}

function db_stop {
    cd $ADMINPATH && docker-compose down
}

function log_info {
    log "Server URLS:"
    log "Request logger: https://localhost:4001/apps/requests"
    log "Vue3: https://localhost:4001/apps/vue3"
    log "Fixture Service:"
    log "https://localhost:4001/api/fixture "
    log "https://localhost:4001/api/fixture/:key "
    log "https://localhost:4001/api/fixture/api/fixture/:key/:prop"
    log "https://localhost:4001/api/fixture/api/fixture/:key/:prop/:value"
    log "Trackserver: https://localhost:4001/123123123123123/wt"
    log "Server Dashboard: https://localhost:4001/dashboard"


}


for arg; do
  tput setaf 2; echo "Invoking function $arg..."
  tput sgr0
  $arg
done