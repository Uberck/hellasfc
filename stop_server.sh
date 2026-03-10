#!/bin/bash
set -euo pipefail

PIDFILE=/tmp/serve_pid
stopped=0

# Stop via pidfile
if [ -f "$PIDFILE" ]; then
  PID=$(cat "$PIDFILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    kill -TERM "$PID" 2>/dev/null || kill -9 "$PID" 2>/dev/null || true
    echo "Stopped PID $PID"
    stopped=1
  else
    echo "Pidfile present but PID $PID not running"
  fi
  rm -f "$PIDFILE"
fi

# Kill any process YOU own listening on TCP/8080
LISTENERS=$(lsof -tiTCP:8080 -sTCP:LISTEN -n -P 2>/dev/null || true)
if [ -n "$LISTENERS" ]; then
  echo "Killing listeners on :8080 -> $LISTENERS"
  kill -TERM $LISTENERS 2>/dev/null || kill -9 $LISTENERS 2>/dev/null || true
  stopped=1
fi

# Extra fallback (only affects your own processes)
pkill -f 'python.*serve.py' || true
pkill -f 'python.*http.server' || true

if [ "$stopped" -eq 1 ]; then
  echo "Stop completed"
else
  echo "No server found"
fi