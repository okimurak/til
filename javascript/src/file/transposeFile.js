// https://leetcode.com/problems/transpose-file/description/

import { readFileSync, writeFileSync } from 'node:fs';

const inputFilePath = "input.txt";
const outputFilePath = "output.txt";

const inputText = readFileSync(inputFilePath, "utf-8");

const inputTextArray = inputText.split('\n');// 改行で分割
inputTextArray.pop(); // 末尾を削除
const tempArray = new Array(new Array());


for(let i = 0; i < inputTextArray.length; i++){
  const valueArray = inputTextArray[i].split(' ');
  for(let j = 0; j < valueArray.length; j++){
    if(tempArray[j] === undefined) {
      tempArray[j] = new Array();
    }
    tempArray[j][i] = valueArray[j];
  }
}


const outputArray = new Array();

for(let i = 0; i < tempArray.length; i++){
  outputArray.push(tempArray[i].join(' '));
}

const outputText = outputArray.join('\n');
writeFileSync(outputFilePath, outputText);
