
import logging
import multiprocessing
import time

logging.basicConfig(
    level=logging.DEBUG,
    format='%(processName)s: %(message)s'
)


def worker1(i):
    logging.debug("start")
    time.sleep(5)
    logging.debug("end")
    return i


if __name__ == "__main__":
    # t1 = multiprocessing.Process(target=worker1, args=(i, ))
    with multiprocessing.Pool(5) as p:
        #r = p.map(worker1, [100, 200]) # mapだとすべてのプロセスが完了するまで待つ
        r = p.map_async(worker1, [100, 200]) # map_async だと　呼び出し元は r.get()まで実行できる
        logging.debug('executed')
        # logging.debug(r)
        logging.debug(r.get()) # map_async の結果を待つ

        #p1 = p.apply_async(worker1, (100, )) # これらが map で書ける（楽）
        #p2 = p.apply_async(worker1, (100, ))
        #logging.debug('executed')
        #logging.debug(p1.get())
        #logging.debug(p2.get())
