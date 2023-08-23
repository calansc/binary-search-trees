class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  //accepts array when initialized
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    //takes a sorted array, turns it into balanced binary tree of node objects
    //sort and remove duplicates(
    let sorted = this.sortArray(array);
    if (sorted.length === 0) return null;
    let start = 0;
    let end = sorted.length;
    //Base case
    if (start > end) {
      return null;
    }
    // let start = 0;
    // let end = array.length;
    let mid = Math.floor((start + end) / 2);
    //Set middle element to root
    let root = new Node(array[mid]);
    //Recursively construct left/right subtree, make it left/right child of root
    root.left = this.buildTree(sorted.slice(0, mid));
    root.right = this.buildTree(sorted.slice(mid + 1));
    return root;
  }
  sortArray(array) {
    let sortedArray = array.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] === sortedArray[i + 1]) {
        sortedArray.splice(i, 1);
      }
    }
    return sortedArray;
  }
  insert() {}
  delete() {}
  find() {}
  levelOrder() {}
  inorder() {}
  preorder() {}
  postorder() {}
  height() {}
  depth() {}
  isBalanced() {}
  rebalance() {}
}

let root = null;

//console.log's tree in a structured format
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
