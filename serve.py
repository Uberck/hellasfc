#!/usr/bin/python3
"""Small HTTP server wrapper that binds to 0.0.0.0 and suppresses noisy client-disconnect errors.

Usage:
    python3 serve.py [port]

This avoids the OSError: [Errno 57] Socket is not connected traceback when remote clients abort connections.
"""
import os
import sys
import errno
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

# Prefer the system Python which is already allowed by the macOS firewall.
# If this script is invoked with a different interpreter (e.g. Homebrew Python),
# re-exec the system Python to ensure incoming connections are handled by
# the allowed binary. If re-exec fails, continue with the current interpreter.
_SYSTEM_PY = "/usr/bin/python3"
try:
        if os.path.exists(_SYSTEM_PY) and os.path.realpath(sys.executable) != os.path.realpath(_SYSTEM_PY):
                os.execv(_SYSTEM_PY, [_SYSTEM_PY] + sys.argv)
except Exception:
        pass


class QuietHTTPServer(ThreadingHTTPServer):
    def handle_error(self, request, client_address):
        """Suppress common client-abort socket errors to keep the console clean."""
        etype, evalue, etb = sys.exc_info()
        if isinstance(evalue, OSError):
            # common socket errors when clients disconnect early
            if getattr(evalue, "errno", None) in (errno.ENOTCONN, errno.EPIPE, errno.ECONNRESET):
                return
        # fallback to default behavior
        super().handle_error(request, client_address)


def main(argv):
    port = 8080
    if len(argv) > 1:
        try:
            port = int(argv[1])
        except Exception:
            pass

    addr = ("0.0.0.0", port)
    print(f"Serving {'.'} on http://0.0.0.0:{port}/ — bind=0.0.0.0")
    server = QuietHTTPServer(addr, SimpleHTTPRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down")
        server.server_close()


if __name__ == "__main__":
    main(sys.argv)