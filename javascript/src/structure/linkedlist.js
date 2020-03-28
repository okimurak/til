'use strict';

class LinkedListNode {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  push(value){
    const node = new LinkedListNode(value);

    if(!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;
    while(current.next){
      current = current.next;
    }

    current.next = node;
  }

  unshift(value){
    const node = new LiksListNode(value);
    node.next = this.head;
    this.head = node;
  }

  toString(){
    const array = [];

    let current = this.head;
    while(current) {
      array.push(current.value);
      current = current.next;
    }

    return array.toString();
  }
}

module.exports = LinkedList;
