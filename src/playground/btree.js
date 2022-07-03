class Node {
  constructor({ id, value }) {
    this.id = id;
    this.value = value;
  }
}

class BinaryTree {
  constructor({ node, left, right }) {
    this.node = new Node(node);
    if (left) {
      this.left = new BinaryTree(left);
    }
    if (right) {
      this.right = new BinaryTree(right);
    }
  }

  print() {
    console.log(JSON.stringify(this));
  }
}

export { BinaryTree };
