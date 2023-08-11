class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  //accepts array when initialized
  constructor() {}
  root() {
    //root attribute uses return value of buildTree
  }
}

function buildTree(array) {
  //takes array, turns it into balanced binary tree of node objects
  //sort and remove duplicates
  let mid = Math.floor((start + end) / 2);
  let root = new Node(arr[mid]);
}
function sortArray(array) {
  //sort array
  return sortedArray;
}

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
