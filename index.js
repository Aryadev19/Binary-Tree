class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let temp = this.root;
    while (true) {
      if (value === temp.value) return undefined;
      if (value < temp.value) {
        if (!temp.left) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        if (!temp.right) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
    }
  }

  find(value) {
    if (!this.root) return undefined;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) temp = temp.left;
      else if (value > temp.value) temp = temp.right;
      else return temp;
    }
    return `${value} not found!`;
  }
}

function BFS(root) {
  if (root === null) return [];
  let queue = [root];
  let results = [];
  while (queue.length) {
    const temp = queue.shift();
    results.push(temp.value);
    if (temp.left) queue.push(temp.left);
    if (temp.right) queue.push(temp.right);
  }
  return results;
}

function DFS(root) {
  if (root === null) return [];
  const stack = [root];
  const results = [];
  while (stack.length > 0) {
    const current = stack.pop();
    results.push(current.value);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return results;
}

function preOrder(root) {
  if (root === null) return [];
  let left = preOrder(root.left);
  let right = preOrder(root.right);
  return [root.value, ...left, ...right];
}

function inOrder(root) {
  if (root === null) return [];
  let left = inOrder(root.left);
  let right = inOrder(root.right);
  return [...left, root.value, ...right];
}

function postOrder(root) {
  if (root === null) return [];
  let left = postOrder(root.left);
  let right = postOrder(root.right);
  return [...left, ...right, root.value];
}

//Iterative
function includes(root, target) {
  if (root === null) return false;
  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    if (current.value === target) return true;
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return false;
}

//Recursive
function contains(root, target) {
  if (root === null) return false;
  if (root.value === target) return true;
  let left = contains(root.left, target);
  let right = contains(root.right, target);
  return left || right;
}

function treeSum(root) {
  if (root === null) return 0;
  return root.value + treeSum(root.left) + treeSum(root.right);
}

const treeMinValue = (root) => {
  if (root === null) return Infinity;
  return Math.min(
    root.value,
    treeMinValue(root.left),
    treeMinValue(root.right)
  );
};

const maxPathSum = (root) => {
  if (root === null) return 0;
  let leftSum = root.value + maxPathSum(root.left);
  let rightSum = root.value + maxPathSum(root.right);
  return Math.max(leftSum, rightSum);
};

const leafSum = (root) => {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return root.value;
  return leafSum(root.left) + leafSum(root.right);
};

const deleteNode = (root, value) => {
  if (contains(root, value)) return removeNode(root, value);
  return `${value} is not present inside the tree`;
};

const removeNode = (root, value) => {
  // If the current node's value is equal to the value to be removed
  if (value === root.value) {
    // If the current node is a leaf node with no children, return null to remove it from the tree
    if (!root.left && !root.right) {
      return null;
    } else {
      // If the current node has a left child, find the maximum value in the left subtree (the successor)
      if (root.left) {
        const leftMax = findMax(root.left);
        // Replace the current node's value with the successor
        root.value = leftMax;
        // Recursively remove the successor node from the tree
        root.left = removeNode(root.left, leftMax);
      } else {
        // If the current node has a right child, find the minimum value in the right subtree (the predecessor)
        const rightMin = findMin(root.right);
        // Replace the current node's value with the predecessor
        root.value = rightMin;
        // Recursively remove the predecessor node from the tree
        root.right = removeNode(root.right, rightMin);
      }
    }
    // If the value to be removed is less than the current node's value, recursively call removeNode on the left subtree
  } else if (value < root.value) {
    if (root.left) root.left = removeNode(root.left, value);
    // If the value to be removed is greater than the current node's value, recursively call removeNode on the right subtree
  } else if (value > root.value) {
    if (root.right) root.right = removeNode(root.right, value);
  }
  return root;
};
// Find the maximum value in a subtree rooted at a given node
const findMax = function (node) {
  // If the current node has no right child, it is the maximum value in the subtree
  if (!node.right) return node.value;
  // Recursively search the right subtree for the maximum value
  return findMax(node.right);
};

// Find the minimum value in a subtree rooted at a given node
const findMin = function (node) {
  // If the current node has no left child, it is the minimum value in the subtree
  if (!node.left) return node.value;
  // Recursively search the left subtree for the minimum value
  return findMin(node.left);
};

const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(2);
tree.insert(7);
tree.insert(1);
tree.insert(8);
tree.insert(6);
tree.insert(4);

/**
 *          5
 *        2   7
 *      1  4 6  8
 *
 *   preorder = [5,2,1,4,7,6,8]
 *   inorder = [1,2,4,5,6,7,8]
 *   postorder = [1,4,2,6,8,7,5]
 *
 */
