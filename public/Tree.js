class Tree {

  constructor() {
    this.root = null;
    this.height = 0;
  }

  compare (a, b) { return a > b ? 1 : a < b ? -1 : 0 }

  // get root() { return this.root }
  //
  // get treeHeight() { return this.height }
  //
  // set root(r) { this.root = r }
  //
  // set treeHeight(h) { this.height = h }

  insertNode(key, data) {
    let newNode = new Node(key, data);

    // Phase 1 - regular PST insertion
    let parent = this.root;

    // When there's no root
    if (!parent) {
      this.root = newNode;
      this.root.x = width / 2;
      this.root.y = 30;
      this.height++;
      return this.root;
    }

    // Until newNode is not attached
    while (!newNode.parent) {
      if (this.compare(key, parent.key) === -1) {
        if (!parent.left) {
          parent.left = newNode;
          newNode.x = parent.x - (width / pow(2, newNode.distance));
          newNode.y = parent.y + (height / 12);
          newNode.parent = parent;
        }
        newNode.distance++;
        parent = parent.left;
    } else {
        if (!parent.right) {
          parent.right = newNode;
          newNode.x = parent.x + (width / pow(2, newNode.distance));
          newNode.y = parent.y + (height / 12);
          newNode.parent = parent;
        }
        newNode.distance++;
        parent = parent.right;
      }
    }

    // Phase 2 - Rebalancing tree
    // if (parent.balanceFactor)
    //   parent.balanceFactor = 0;
    //
    // if (parent.left === newNode)
    //   parent.balanceFactor = 1;
    // else
    //   parent.balanceFactor = -1;


  }

  removeNode(key) {

  }

  find(nodeKey) {
    let childNode = this.root;

    while (childNode && nodeKey !== childNode.key) {
      if (this.compare(nodeKey, childNode.key) < 0)
        childNode = childNode.left;
      else
        childNode = childNode.right;
    }

    return childNode;
  }

  preOrder() { this.root.preOrderTraverse() }

  inOrder() { this.root.inOrderTraverse() }

  postOrder() { this.root.postOrderTraverse() }

}
