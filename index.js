import Tree from './Tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const randomArray = (size) => {
  return (
    Array(size)
      //  way to ensure that map() iterates over every element in the array.
      .fill(0)
      // fill it up with random numbers < 100
      .map(() => Math.floor(Math.random() * 100))
  );
};

const tree = new Tree(randomArray(10));

// Insert some elements into the tree
tree.insert(8);
tree.insert(10);
tree.insert(11);
tree.insert(55);
tree.insert(9);
console.log('Tree print after insert');
prettyPrint(tree.root);

// Delete some elements from the tree
tree.deleteItem(9);
tree.deleteItem(11);
tree.deleteItem(55);
console.log('Tree print after delete');
prettyPrint(tree.root);

// Find an element in the tree
console.log(tree.find(8));

// Print out all elements in different orders
console.log('Level Order : ', tree.levelOrder());
console.log('In Order : ', tree.inOrder());
console.log('Pre Order : ', tree.preOrder());
console.log('Post Order : ', tree.postOrder());

// Check the height and depth of the tree
console.log('Height of tree : ', tree.height());
console.log('Depth of tree : ', tree.depth(10));

// Check if the tree is balanced
console.log('Is the tree balanced? ', tree.isBalanced());
prettyPrint(tree.root);

// Unbalance the tree by adding several numbers > 100
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

// Check if the tree is unbalanced
console.log('Is the tree balanced? ', tree.isBalanced());

// Balance the tree
tree.rebalance();

// Check if the tree is balanced
console.log('Is the tree balanced? ', tree.isBalanced()); // true
prettyPrint(tree.root);
