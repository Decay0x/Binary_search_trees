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

tree.insert(8);
tree.insert(10);
tree.insert(11);
tree.insert(55);
tree.insert(9);
console.log('Tree print after insert');
prettyPrint(tree.root);
tree.deleteItem(9);
tree.deleteItem(11);
tree.deleteItem(55);
console.log('Tree print after delete');
prettyPrint(tree.root);
console.log(tree.find(8));
console.log(tree.levelOrder());
