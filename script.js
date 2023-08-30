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
  // insertIterative(newNodeValue) {
  //   let node = new Node(newNodeValue);
  //   // if BST is empty, return new root node
  //   if (this.root === null) {
  //     this.root = node;
  //     return;
  //   }
  //   // Iterate down tree
  //   let prev = null;
  //   let step = this.root;
  //   while (step != null) {
  //     if (newNodeValue === step.value) {
  //       console.log(newNodeValue + " exists in tree already!");
  //       return null;
  //     }
  //     if (newNodeValue < step.value) {
  //       prev = step;
  //       step = step.left;
  //     } else if (newNodeValue > step.value) {
  //       prev = step;
  //       step = step.right;
  //     }
  //   }
  //   if (prev.value > newNodeValue) prev.left = node;
  //   else prev.right = node;
  // }
  // Recursive insert
  insert(newNodeValue, root = this.root) {
    let node = new Node(newNodeValue);
    if (root === null) {
      root = node;
      return root;
    }
    // Recur down tree
    if (newNodeValue < root.value) {
      root.left = this.insert(newNodeValue, root.left);
    } else if (newNodeValue > root.value) {
      root.right = this.insert(newNodeValue, root.right);
    }
    return root;
  }
  delete(nodeValue, root = this.root) {
    if (root === null) {
      return root;
    }
    // Recursive call to get to node to be deleted
    if (nodeValue < root.value) {
      root.left = this.delete(nodeValue, root.left);
      return root;
    } else if (nodeValue > root.value) {
      root.right = this.delete(nodeValue, root.right);
      return root;
    }
    // If one or both children are empty
    if (root.left === null) {
      let temp = root.right;
      delete root.value;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root.value;
      return temp;
    }
    // If both children exist
    else {
      let successorParent = root;
      let successor = root.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      if (successorParent !== root) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
      root.value = successor.value;
      delete successor.value;
      return root;
    }
  }
  find(nodeValue, root = this.root) {
    if (nodeValue === root.value) return root;
    let temp;
    if (nodeValue < root.value) {
      // console.log("going left");
      temp = this.find(nodeValue, root.left);
      return temp;
    } else if (nodeValue > root.value) {
      // console.log("going right");
      temp = this.find(nodeValue, root.right);
      return temp;
    }
  }
  // Breadth First Traversal
  levelOrder(callBackFunc) {
    // Try iteration/recursion.
    let arrayOfValues = [];
    let queue = [];
    let root = this.root;
    queue.push(root);

    // base care for recursion
    // if ((queue.length = 1)) {
    //   return queue[0].value;
    // }

    while (queue.length > 0) {
      if (queue[0].left !== null) {
        let tempLeft = queue[0].left;
        queue.push(tempLeft);
      }
      if (queue[0].right !== null) {
        let tempRight = queue[0].right;
        queue.push(tempRight);
      }
      arrayOfValues.push(queue[0].value);
      if (callBackFunc) callBackFunc(queue[0].value);
      queue.splice(0, 1);
    }
    // console.log(queue);
    // console.log("AoV: " + arrayOfValues);
    if (!callBackFunc) return arrayOfValues;
  }

  // Depth First Traversal
  // inorder: left, root, right
  inorder(callBackFunc, root = this.root, arrayOfValues = []) {
    if (root == null) return;
    if (root.left) this.inorder(callBackFunc, root.left, arrayOfValues);
    arrayOfValues.push(root.value);
    if (callBackFunc) callBackFunc(root.value);
    if (root.right) this.inorder(callBackFunc, root.right, arrayOfValues);
    if (!callBackFunc) return arrayOfValues;
  }
  // preorder: root, left, right
  preorder(callBackFunc, root = this.root, arrayOfValues = []) {
    if (root == null) return;
    arrayOfValues.push(root.value);
    if (callBackFunc) callBackFunc(root.value);
    if (root.left) this.preorder(callBackFunc, root.left, arrayOfValues);
    if (root.right) this.preorder(callBackFunc, root.right, arrayOfValues);
    if (!callBackFunc) return arrayOfValues;
  }
  // postorder: left, right, root
  postorder(callBackFunc, root = this.root, arrayOfValues = []) {
    if (root == null) return;
    if (root.left) this.postorder(callBackFunc, root.left, arrayOfValues);
    if (root.right) this.postorder(callBackFunc, root.right, arrayOfValues);
    arrayOfValues.push(root.value);
    if (callBackFunc) callBackFunc(root.value);
    if (!callBackFunc) return arrayOfValues;
  }
  // edges in longest path from given node to leaf node
  // finds height of tree. Height from give node?
  height(node = this.root) {
    if (node === null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  // edges in longest path from given node to root node
  depth(node, root = this.root, counter = 0) {
    if (root == null) return counter - 1;
    if (root.value > node) {
      counter = this.depth(node, root.left, counter);
      return counter + 1;
    } else if (root.value < node) {
      counter = this.depth(node, root.right, counter);
      return counter + 1;
    }
    return counter;
  }

  // A balanced tree has a height difference between left subtree and
  // right subtree of less than one
  isBalanced(root = this.root) {
    if (root === null) return true;
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    // console.log(leftHeight, rightHeight);
    if (
      leftHeight - rightHeight === 0 ||
      leftHeight - rightHeight === -1 ||
      leftHeight - rightHeight === 1
    ) {
      return true;
    } else return false;
  }

  // Rebalance an unbalanced tree. Use traversal method to provide new
  // array to buildTree
  rebalance() {
    let sortedArray = this.inorder();
    this.root = this.buildTree(sortedArray);
    return this.root;
  }
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

function double(num) {
  return console.log(num * 2);
}

function treeDriver() {
  let count = Math.round(10 * Math.random() + 10);
  // console.log(count);
  let array = [];
  for (let i = 0; i < count; i++) {
    array.push(Math.round(100 * Math.random()));
  }
  // console.log(array);
  let bst = new Tree(array);
  // prettyPrint(bst.root);
  console.log(bst.isBalanced());
  let count2 = Math.round(5 * Math.random() + 5);
  for (let i = 0; i < count2; i++) {
    bst.insert(Math.round(1000 * Math.random()));
  }
  console.log(bst.isBalanced());
  bst.rebalance();
  console.log(bst.isBalanced());
  console.log("Breadth/Level: " + bst.levelOrder());
  console.log("Inorder: " + bst.inorder());
  console.log("Preorder: " + bst.preorder());
  console.log("Postorder: " + bst.postorder());
  prettyPrint(bst.root);
}
treeDriver();
// let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let bst = new Tree(array1);
// prettyPrint(bst.root);
// console.log(bst.isBalanced());
// bst.insert(43);
// bst.insert(74);
// bst.insert(77);
// console.log(bst.isBalanced());
// bst.rebalance();
// console.log(bst.isBalanced());
// prettyPrint(bst.root);
// bst.delete(1);
// bst.delete(4);
// bst.delete(3);
// prettyPrint(bst.root);
// prettyPrint(bst.root);
// console.log(bst.find(9));
// console.log(bst.find(4));
// console.log(bst.find(6));
// prettyPrint(bst.root);
// console.log("Breadth: " + bst.levelOrder());
// console.log("Inorder: " + bst.inorder());
// console.log("Preorder: " + bst.preorder());
// console.log("Postorder: " + bst.postorder());
// console.log("4: " + bst.depth(4));
// console.log("3: " + bst.depth(3));
// console.log("8: " + bst.depth(8));
// console.log("9: " + bst.depth(9));
// console.log("6345: " + bst.depth(6345));
// console.log(bst.height());
// bst.rebalance();
// console.log(bst.rebalance());
// prettyPrint(bst.root);
