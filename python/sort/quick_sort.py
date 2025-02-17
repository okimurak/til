import math

def sort(array: list, start=0, end=None) -> list:
    if end is None:
        end = len(array) - 1

    if(end <= start):
        return

    def select_pivot(array: list, start: int, end: int) -> int:
        x = array[start]
        y = array[math.floor((start + end) / 2.0)]
        z = array[end]

        if x > y :
            # return y if y < z else (x if z < x else z)
            if y < z:
                return y
            elif z < x:
                return x
            else:
                return z

        else :
            # return y if z < y else (x if x < z else z)
            if z < y:
                return y
            elif x < z:
                return x
            else:
                return z

    pivot = select_pivot(array, start, end)

    left_index = start
    right_index = end

    while(True):
        while(array[left_index] < pivot):
            left_index += 1
        while(array[right_index] > pivot):
            right_index -= 1
        
        if left_index >= right_index:
            break
        
        array[left_index], array[right_index] = array[right_index], array[left_index]
        left_index += 1
        right_index -= 1

    sort(array, start, left_index - 1)
    sort(array, right_index + 1, end)

    return array
