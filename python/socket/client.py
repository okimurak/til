import socket


def start_tcp_client():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect(('127.0.0.1', 50007))
        s.sendall(b'Hello TCP')
        data = s.recv(1024)
        print(repr(data))


def start_udp_client():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.sendto(b'Hello UDP', ('127.0.0.1', 50007))


if __name__ == "__main__":
    start_udp_client()
