#!/bin/bash
[[ -d ../../server/priv/apps/requests ]] || mkdir ../../server/priv/apps/requests
cp -f ./public/build/bundle.js ../../server/priv/apps/requests/bundle.js
cp -f ./public/build/bundle.css ../../server/priv/apps/requests/bundle.css
cp -f ./public/build/bundle.js.map ../../server/priv/apps/requests/bundle.js.map
cp -f ./public/prod.html ../../server/priv/apps/requests/index.html


