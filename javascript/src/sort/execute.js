const measureElapsetime = require('./measureTime');
const bubbleSort = require('./bubblesort');
const quickSort = require('./quicksort');
const margeSort = require('./margesort');

const dataNum = 10000;

measureElapsetime(bubbleSort, dataNum, 'BubbleSort');
measureElapsetime(quickSort, dataNum, 'QuickSort');
measureElapsetime(margeSort, dataNum, 'MargeSort');
