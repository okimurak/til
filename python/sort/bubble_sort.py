
def sort(array: list) -> list:
    result = array.copy()
    for i in reversed(range(0, len(result))):
        for j in range(0, i):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
    return result
