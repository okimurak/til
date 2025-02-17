
import bubble_sort, merge_sort, quick_sort

import time, random

def measureElapseTime(func, data_num: int, target_name: str) -> None:
    # Init sample data
    array = []
    for i in range(data_num):
        array.append(random.randrange(data_num))

    start = time.time()
    result = func.sort(array)
    end = time.time()

    print(f"{target_name} times : {end - start}")
    #print(f"Sorted list = {result}")

if __name__ == "__main__":
    data_num = 10000
    measureElapseTime(bubble_sort, data_num, "BubbleSort")
    measureElapseTime(quick_sort, data_num, "QuickSort")
    measureElapseTime(merge_sort, data_num, "MergeSort")
