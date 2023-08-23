class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  //accepts unsorted array when initialized
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    //sorts array, removes dupes, returns root node of balanced search tree
    let sorted = this.sortArray(array);
    if (sorted.length === 0) return null;
    let start = 0;
    let end = sorted.length;
    //Base case
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);
    //Recursively construct left/right subtree
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
  insert(newNodeValue) {
    let node = new Node(newNodeValue);
    // if BST is empty, return new root node
    if (this.root == null) {
      this.root = node;
      return;
    }
    // Recur down tree
    let prev = null;
    let step = this.root;
    while (step != null) {
      if (newNodeValue === step.value) {
        console.log(newNodeValue + " exists in tree already!");
        return null;
      }
      if (newNodeValue < step.value) {
        prev = step;
        step = step.left;
      } else if (newNodeValue > step.value) {
        prev = step;
        step = step.right;
      }
    }
    if (prev.value > newNodeValue) prev.left = node;
    else prev.right = node;
  }
  delete(nodeValue) {
    if (this.root === null) {
      return this.root;
    }
    // let prev = null;
    // let step = this.root;
    // Recursive calls for ancestors of node to be deleted
    if (nodeValue < this.root.value) {
      // prev = step;
      // step = step.left;
      this.root.left = this.delete(nodeValue);
      return this.root;
    } else if (nodeValue > this.root.value) {
      // prev = step;
      // step = step.right;
      this.root.right = this.delete(nodeValue);
      return this.root;
    }
    // Reach here when root is node to delete
    if (this.root.left === null) {
      let temp = this.root.right;
      delete this.root;
      return temp;
    } else if (this.root.right === null) {
      let temp = this.root.left;
      delete this.root;
      return temp;
    }
    // If both children exist
    else {
      let succParent = this.root;
      // Find successor
      let succ = this.root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
      // Delete successor
      if (succParent !== this.root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }
      // Copy successor data to root
      this.root.value = succ.value;
      // Delete successor and return root
      console.log(succ);
      delete succ;
      console.log(succ);
      return this.root;
    }
  }
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
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = new Tree(array1);
prettyPrint(bst.root);
bst.insert(6);
prettyPrint(bst.root);
bst.delete(8);
prettyPrint(bst.root);
bst.delete(1);
prettyPrint(bst.root);
