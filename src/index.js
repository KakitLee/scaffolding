import { BinaryTree } from './playground/btree';

const tree = {
  node: {
    id: 1,
    value: 1,
  },
  left: {
    node: {
      id: 2,
      value: 2,
    },
    left: {
      node: {
        id: 4,
        value: 4,
      },
    },
    right: {
      node: {
        id: 6,
        value: 6,
      },
    },
  },
  right: {
    node: {
      id: 3,
      value: 4,
    },
  },
};
const a = new BinaryTree(tree);
a.print();
