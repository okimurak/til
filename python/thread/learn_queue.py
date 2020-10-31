import logging
import queue
import threading
import time


logging.basicConfig(
    level=logging.DEBUG,
    format='%(threadName)s: %(message)s'
)


def worker1(queue):
    logging.debug("start")
    queue.put(100)
    time.sleep(5)
    queue.put(200)
    logging.debug("end")


def worker2(queue):
    logging.debug("start")
    logging.debug(queue.get())
    logging.debug(queue.get())
    logging.debug("end")


def worker3(queue):
    logging.debug('start')
    while True:
        item = queue.get()
        if item is None:
            break
        logging.debug(item)
        queue.task_done()   # Queue の利用終了を mark
    logging.debug('end')


if __name__ == '__main__':

    queue = queue.Queue()
    for i in range(1000):
        queue.put(i)

    #t1 = threading.Thread(target=worker1, args=(queue,))
    #t2 = threading.Thread(target=worker2, args=(qu,))

    ts = []
    for _ in range(3):
        t = threading.Thread(target=worker3, args=(queue,))
        t.start()
        ts.append(t)

    # t1.start()
    # t2.start()

    queue.join()  # queue すべての task_done が来るのを待っ
    for _ in range(len(ts)):
        queue.put(None)

    [t.join() for t in ts]
