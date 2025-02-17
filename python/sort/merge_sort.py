import math

def sort(array: list) -> list:

    if len(array) < 2:
        return array
    middleIndex = math.floor(len(array)/ 2.0)

    left = array[:middleIndex]
    right = array[middleIndex:]

    def merge(left: list, right: list) -> list:
        result = []
        left_index = 0
        right_index = 0

        while left_index < len(left) and right_index < len(right):
            if left[left_index] < right[right_index]:
                result.append(left[left_index])
                left_index += 1
            else:
                result.append(right[right_index])
                right_index += 1

        if left_index < len(left):
            result += left[left_index:]
        if right_index < len(right):
            result += right[right_index:]
        return result

    return merge(sort(left), sort(right))
