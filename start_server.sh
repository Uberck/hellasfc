#!/bin/bash
# Start the dev server in background and record its PID.
# Wait until the process is actually listening on the port before
# creating the pidfile to avoid stale pidfile/start races.
set -euo pipefail
PORT=8080
LOG=serve_debug.log
PY=/usr/bin/python3

nohup "$PY" -m http.server "$PORT" > "$LOG" 2>&1 &
PID=$!
TMPPID=/tmp/serve_pid.tmp
echo "$PID" > "$TMPPID"

# Wait up to 5 seconds for the server to bind
for i in {1..10}; do
	if lsof -iTCP:$PORT -sTCP:LISTEN -P -n >/dev/null 2>&1; then
		mv "$TMPPID" /tmp/serve_pid
		echo "Started, PID=$PID"
		exit 0
	fi
	sleep 0.5
done

echo "Server did not start within timeout. See $LOG for details."
tail -n 50 "$LOG" || true
rm -f "$TMPPID"
exit 1
