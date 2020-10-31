import socket
import http.server
import socketserver


def start_http_server():
    with socketserver.TCPServer(('127.0.0.1', 8080), http.server.SimpleHTTPRequestHandler) as httpd:
        httpd.serve_forever()


def start_tcp_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 50007))
        s.listen(1)
        while True:
            conn, addr = s.accept()
            with conn:
                while True:
                    data = conn.recv(1024)
                    if not data:
                        break
                    print('data: {}, addr: {}'.format(data, addr))
                    conn.sendall(b'Received: ' + data)


def start_udp_server():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.bind(('127.0.0.1', 50007))
        while True:
            data, addr = s.recvfrom(1024)
            print('data: {}, addr: {}'.format(data, addr))


if __name__ == "__main__":
    start_udp_server()
