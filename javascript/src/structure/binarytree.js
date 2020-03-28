'use strict';

class BinaryTreeNode {
  constructor(value){
    this.value = value;

    this.left  = null;
    this.right = null;
  }
}

class BinaryTree{
  constructor(){
    this.root = null;
  }

  add(node){
    if(!this.root){
      this.root = node;
      return;
    }

    let current = this.root;
    let direction = node.value < current.value ? 'left' : 'right';

    while(current[direction]){
      current = current[direction];
      direction = node.value < current.value ? 'left' : 'right';
    }

    current[direction] = node;
  }
}