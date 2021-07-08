#!/bin/bash
echo "Init cypress, starting Xvfb server on port 99..."
pkill Xvfb
rm /tmp/.X99-lock
Xvfb -screen 0 1920x1080x24 :99
tail -F /dev/null

