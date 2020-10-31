
import logging
import multiprocessing
import time

logging.basicConfig(
    level=logging.DEBUG,
    format='%(processName)s: %(message)s'
)


def f(conn):
    conn.send(['test'])
    time.sleep(5)
    conn.close


if __name__ == "__main__":
    parent_conn, child_conn = multiprocessing.Pipe()
    p = multiprocessing.Process(target=f, args=(parent_conn, ))
    p.start()
    logging.debug(child_conn.recv())  # conn.send を待つ
