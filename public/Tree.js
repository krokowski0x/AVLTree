class Tree {

  constructor() {
    this.root = null;
    this.height = 0;
  }

  compare (a, b) { return a > b ? 1 : a < b ? -1 : 0 }

  get root() { return this.root }

  get treeHeight() { return this.height }

  insertNode(key, data) {

  }

  removeNode(key) {

  }

  find(key) {

  }

  preOrder() { this.root.preOrderTraverse() }

  inOrder() { this.root.inOrderTraverse() }
  
  postOrder() { this.root.postOrderTraverse() }

}
