# Local dev server

Quick commands for running the project locally and managing the dev server.

- Start (background):

```bash
./start_server.sh
```

- Stop:

```bash
./stop_server.sh
```

- Tail logs:

```bash
tail -f serve_debug.log
```

- Show firewall allow-list:

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --listapps
```

- Restore original firewall allow-list (if needed):

```bash
sudo /tmp/firewall_restore.sh
```

Notes
- `serve.py` is configured to prefer the system Python (`/usr/bin/python3`) so the macOS Application Firewall entry for that interpreter is sufficient.
- `start_server.sh` waits for the server to bind before writing `/tmp/serve_pid`.
- `stop_server.sh` will use the pidfile if present, otherwise it kills listeners on port `8080`.