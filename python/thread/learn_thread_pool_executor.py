from concurrent.futures import ThreadPoolExecutor
import logging
import time

logging.basicConfig(
    level=logging.DEBUG,
    format='%(threadName)s: %(message)s'
)

def worker(i):
    logging.debug("start")
    time.sleep(1)
    print(i)
    logging.debug("end")


MAX_WORKERS=2

tpe = ThreadPoolExecutor(max_workers=MAX_WORKERS)

for i in range(MAX_WORKERS):
    tpe.submit(worker(i))
