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
  // insertI(newNodeValue) {
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
  inorder() {}
  // preorder: root, left, right
  preorder(callBackFunc, root = this.root, arrayOfValues = []) {
    if (root == null) return;
    arrayOfValues.push(root.value);
    // console.log(arrayOfValues);
    if (callBackFunc) callBackFunc(root.value);
    if (root.left) this.preorder(callBackFunc, root.left, arrayOfValues);
    if (root.right) this.preorder(callBackFunc, root.right, arrayOfValues);
    if (!callBackFunc) return arrayOfValues;
  }
  // postorder: left, right, root
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

function double(num) {
  return console.log(num * 2);
}

let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = new Tree(array1);
// prettyPrint(bst.root);
bst.insert(6);
prettyPrint(bst.root);
// bst.delete(1);
// bst.delete(6345);
// bst.delete(8);
// prettyPrint(bst.root);
// console.log(bst.find(9));
// console.log(bst.find(4));
// console.log(bst.find(6));
// prettyPrint(bst.root);
console.log("Breadth: " + bst.levelOrder());
console.log("Inorder: " + bst.inorder());
console.log("Preorder: " + bst.preorder());
console.log("Postorder: " + bst.postorder());
