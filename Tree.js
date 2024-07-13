import Node from './Node.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // sort the array
    array = [...new Set(array)].sort((a, b) => a - b);
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }
  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    value > root.data
      ? (root.right = this.insert(value, root.right))
      : (root.left = this.insert(value, root.left));
    return root;
  }
  deleteItem(value, root = this.root) {
    if (root === null) return root; // Base case: if the current node is null, return null

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left); // Value is less than the current node, delete from the left subtree
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right); // Value is greater than the current node, delete from the right subtree
    } else {
      if (root.left === null) {
        return root.right; // Node has no left child, return the right child
      } else if (root.right === null) {
        return root.left; // Node has no right child, return the left child
      }

      // Node has two children
      let minNode = root.right; // Find the node with the minimum value in the right subtree
      while (minNode.left !== null) {
        minNode = minNode.left;
      }
      root.data = minNode.data; // Copy the minimum value to the node to be deleted
      root.right = this.deleteItem(minNode.data, root.right); // Delete the minimum node from the right subtree
    }

    return root;
  }
  find(value, root = this.root) {
    if (value === null) return null; // Edge case: value to be found is null
    if (root === null) return null; // Edge case: current node is null

    if (root.data !== value) {
      // Recursive search
      return root.data < value
        ? this.find(value, root.right) // Search in the right subtree
        : this.find(value, root.left); // Search in the left subtree
    }
    return root; // Found the value, return the current node
  }
  levelOrder(callback) {
    if (this.root === null) return;
    const queue = [this.root];
    const levelOrderList = [];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback ? callback(currentNode) : levelOrderList.push(currentNode.data);

      const enqueueList = [currentNode?.left, currentNode?.right].filter(
        (value) => value
      );
      queue.push(...enqueueList);
    }
    return levelOrderList;
  }
  intOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
  height(node) {}
  depth(node) {}
  isBalanced() {}
  rebalance() {}
}
