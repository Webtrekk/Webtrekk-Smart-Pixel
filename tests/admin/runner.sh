#!/bin/bash

SCRIPT=$(readlink -f "$0")
ADMINPATH=$(dirname "$SCRIPT")
ROOTPATH=${ADMINPATH%/tests/admin}
SERVERPATH=$ROOTPATH/tests/server
APPSPATH=$ROOTPATH/tests/apps
PACKAGEPATH=$ROOTPATH/packages

function log {
	tput setaf 5; echo $1
	tput sgr0
}

function start_server {

    cd $SERVERPATH &&
    [[ -f ./priv/cert/selfsigned_key.pem ]] || mix phx.gen.cert &&
    PORT=4000 MIX_ENV=dev elixir --erl "-detached" -S mix phx.server &&
    log_info
}

function run_phoenix_inside_docker {
    cd ./server &&
    [[ -f ./priv/cert/selfsigned_key.pem ]] || mix phx.gen.cert &&
    MIX_ENV=docker elixir --sname mappe2e --cookie mappify -S mix phx.server
}

function stop_server {
    pkill beam.smp
}
function debug_server_start {
    cd $SERVERPATH &&
    [[ -f ./priv/cert/selfsigned_key.pem ]] || mix phx.gen.cert &&
    MIX_ENV=dev iex -S mix phx.server
}

function log_info {
    log "Server URLS:"
    log "https://localhost:4001/"
    log "Request logger: https://localhost:4001/requests"
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
    cd /app/server && iex --sname console --remsh mappe2e@$HOSTNAME --cookie mappify
}

function prepare_coverage {
    log "Create symbolic link from Vue Plugin src to E2E vue app..."
    ln -s -f $PACKAGEPATH/vue/ $APPSPATH/vue3/plugin/
}


for arg; do
  tput setaf 2; echo "Invoking function $arg..."
  tput sgr0
  $arg
done