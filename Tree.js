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
  inOrder(callback, node = this.root, list = []) {
    if (node === null) return; // base case if the current node is null return
    this.inOrder(callback, node.left, list);
    callback ? callback(node) : list.push(node.data); // run the current node through the callback if it exists otherwise just push them in the array container
    this.inOrder(callback, node.right, list);

    return list;
  }
  preOrder(callback, node = this.root, list = []) {
    if (node === null) return; // base case if the current node is null return
    callback ? callback(node) : list.push(node.data); // run the current node through the callback if it exists otherwise just push them in the array container
    this.preOrder(callback, node.left, list);
    this.preOrder(callback, node.right, list);
    return list;
  }
  postOrder(callback, node = this.root, list = []) {
    if (node === null) return; // base case for the null node
    this.postOrder(callback, node.right, list);
    this.postOrder(callback, node.left, list);
    callback ? callback(node) : list.push(node.data);

    return list;
  }
  height(node = this.root) {
    if (node === null) return 0; // base case exit if the node is null;

    const left = this.height(node.left);
    const right = this.height(node.right);

    return Math.max(left, right) + 1;
  }
  depth(value, node = this.root) {
    if (node === null) return -1; // value not found
    if (node.data === value) return 0;
    if (value < node.data) return this.depth(value, node.left) + 1;
    if (value > node.data) return this.depth(value, node.right) + 1;
  }
  isBalanced(node = this.root) {
    if (node === null) return true; // base case

    const left = this.height(node.left);
    const right = this.height(node.right);

    if (Math.abs(left - right) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance() {
    const currentTree = this.inOrder();

    this.root = this.buildTree(currentTree);
  }
}
