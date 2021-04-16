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

function run_phoenix_inside_docker {
    cd $SERVERPATH &&
    sleep 2 &&
    [[ -f ./priv/cert/selfsigned_key.pem ]] || mix phx.gen.cert &&
    mix ecto.create &&
    mix ecto.migrate
    cd $SERVERPATH &&
#    MIX_ENV=docker exec mix phx.server
    MIX_ENV=docker elixir --sname mappe2e --cookie mappify -S mix phx.server
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

function iex_in_docker {
    cd $SERVERPATH && iex --sname console --remsh mappe2e@$HOSTNAME --cookie mappify
}


for arg; do
  tput setaf 2; echo "Invoking function $arg..."
  tput sgr0
  $arg
done