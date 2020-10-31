import logging
import threading
import time


logging.basicConfig(
    level=logging.DEBUG,
    format='%(threadName)s: %(message)s'
)

def worker1():
    logging.debug("start")
    time.sleep(1)
    logging.debug("end")


def worker2(x, y=10):
    logging.debug("start")
    logging.debug("x = {}, y = {}".format(x, y))
    time.sleep(2)
    logging.debug("end")

def worker3(d, lock):
    logging.debug("start")
    lock.acquire()
    i = d['x']
    time.sleep(5)
    d['x'] = i + 1
    logging.debug(d)
    lock.release()
    logging.debug("end")

def worker4(d, lock):
    logging.debug("start")
    with lock: # With でも書ける
        i = d['x'] # メモリ共有なので、スレッドならメソッドで変更できる
        time.sleep(5)
        d['x'] = i + 1
        logging.debug(d)
        with lock:         # RLock なら 2重ロックもできる
            d['x'] = i + 1
            logging.debug(d)
    logging.debug("end")

if __name__ == '__main__':
    t1 = threading.Thread(name="Thread 1 Chan", target=worker1)
    t1.setDaemon(True)
    t2 = threading.Thread(target=worker2, args=(100,), kwargs={'y': 200})

    t1.start()
    t2.start()
    print('started')
    t1.join() # Daemon 化したら join しないと Program が Exit する

    for _ in range(5):
        t = threading.Thread(target=worker1)
        t.setDaemon(True)
        t.start()

    for thread in threading.enumerate():
        if thread is threading.currentThread(): # メインスレッドの場合は join しない
            print(thread)
            continue
        thread.join()


    # Timer
    t3 = threading.Timer(3, worker1)
    t3.start()

    # Lock
    d = {'x': 0}
    # lock = threading.Lock()
    lock = threading.RLock()
    t4 = threading.Thread(target=worker3, args=(d, lock))
    t5 = threading.Thread(target=worker4, args=(d, lock))
    t4.start()
    t5.start()

    # Semaphore
    semaphore = threading.Semaphore(2)
    t6 = threading.Thread(target=worker3, args=(d, semaphore))
    t7 = threading.Thread(target=worker4, args=(d, semaphore))
    t8 = threading.Thread(target=worker4, args=(d, semaphore))
    t6.start()
    t7.start()
    t8.start()
