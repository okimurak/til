
import logging
import multiprocessing
import time

logging.basicConfig(
    level=logging.DEBUG,
    format='%(processName)s: %(message)s'
)


def worker1(l, d, n):
    l.reverse()
    d['x'] += 1
    n.y += 1


if __name__ == "__main__":
    with multiprocessing.Manager() as manager:
        l = manager.list()
        d = manager.dict()
        n = manager.Namespace()

        l.append(1)
        l.append(2)
        l.append(3)
        d['x'] = 0
        n.y = 0
        
        p1 = multiprocessing.Process(target=worker1, args=(l, d, n)) # Python っぽく書きやすいけど速度は遅い
        p2 = multiprocessing.Process(target=worker1, args=(l, d, n))
        p1.start()
        p2.start()
        p1.join()
        p2.join()

        logging.debug(l)
        logging.debug(d)
        logging.debug(n)


