import logging
import threading
import time


logging.basicConfig(
    level=logging.DEBUG,
    format='%(threadName)s: %(message)s'
)


def worker1(condition):
    with condition:
        condition.wait()  # condition.notifyAll() を待つ
        logging.debug('start')
        time.sleep(3)
        logging.debug('end')


def worker2(condition):
    with condition:
        condition.wait()  # condition.notifyAll() を待つ
        logging.debug('start')
        time.sleep(3)
        logging.debug('end')


def worker3(condition):
    with condition:
        logging.debug('start')
        time.sleep(5)
        logging.debug('end')
        condition.notifyAll()


if __name__ == "__main__":
    condition = threading.Condition()
    t1 = threading.Thread(target=worker1, args=(condition, ))
    t2 = threading.Thread(target=worker2, args=(condition, ))
    t3 = threading.Thread(target=worker3, args=(condition, ))

    t1.start()
    t2.start()
    t3.start()
    # t3 が終了後、先に処理を開始した(t1 or t2) Thread が Lock を取る
    # t3 -> t2 -> t1 という順番になる
