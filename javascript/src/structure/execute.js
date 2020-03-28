const measureElapsetime = require('./measureTime');
const bubleSort = require('./bublesort');
const quickSort = require('./quicksort');
const margeSort = require('./margesort');

const dataNum = 10000;

measureElapsetime(bubleSort, dataNum, 'BubleSort');
measureElapsetime(quickSort, dataNum, 'QuickSort');
measureElapsetime(margeSort, dataNum, 'margeSort');
