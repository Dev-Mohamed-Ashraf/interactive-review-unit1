"""Local dev server with caching disabled (so edits show up on reload).

    python tools/serve.py            → http://127.0.0.1:8765
    python tools/serve.py 9000 --lan → share on the local Wi-Fi (iPad/phone/board)
"""
import http.server
import os
import socket
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCache(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp'}

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, *args):
        pass


def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')  # Arabic folder names on Windows consoles
    except (AttributeError, ValueError):
        pass
    port = int(next((a for a in sys.argv[1:] if a.isdigit()), 8765))
    host = '0.0.0.0' if '--lan' in sys.argv else '127.0.0.1'
    if host == '0.0.0.0':
        try:
            ip = socket.gethostbyname(socket.gethostname())
            print(f'Open on the iPad / phone / board:  http://{ip}:{port}')
        except OSError:
            pass
    print(f'Serving {ROOT} on http://127.0.0.1:{port}')
    http.server.ThreadingHTTPServer((host, port), NoCache).serve_forever()


if __name__ == '__main__':
    main()
