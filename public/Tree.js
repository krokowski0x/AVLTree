class Tree {

  constructor() {
    this.root = null;
    this.height = 0;
    this.nodes = 0;
  }

  compare (a, b) { return a > b ? 1 : a < b ? -1 : 0 }

  insertNode(key, data) {

    // Make sure key is not a string
    key = parseInt(key);

    // Don't insert if it's a duplicate
    if (this.find(key))
      return 0;

    // Phase 1 - regular BST insertion
    let newNode = new Node(key, data);
    let parent = this.root;

    // When there's no root
    if (!parent) {
      this.root = newNode;
      // this.root.x = width / 2;
      // this.root.y = 30;
      this.nodes++;
      this.height++;
      return this.root;
    }

    // Until newNode is not attached
    while (!newNode.parent) {
      // Go left or right, update coords and attach to parent
      if (this.compare(key, parent.key) === -1) {
        if (!parent.left) {
          parent.left = newNode;
          // newNode.x = parent.x - (width / pow(2, newNode.height+2));
          // newNode.y = parent.y + (height / 12);
          newNode.parent = parent;
        }
        newNode.height++;
        parent = parent.left;
    } else {
        if (!parent.right) {
          parent.right = newNode;
          // newNode.x = parent.x + (width / pow(2, newNode.height+2));
          // newNode.y = parent.y + (height / 12);
          newNode.parent = parent;
        }
        newNode.height++;
        parent = parent.right;
      }
    }

    // Phase 2 - Rebalancing tree
    if (newNode.parent.parent) {
      let gParent = newNode.parent.parent;
      let balance = gParent.getBalance();

      // Left Left Case
      if (balance > 1 && key < gParent.left.key)
        this.root = gParent.rotateLL(this.root);

      // Right Right Case
      else if (balance < -1 && key > gParent.right.key)
        this.root = gParent.rotateRR(this.root);

      // Left Right Case
      else if (balance > 1 && key > gParent.left.key)
        this.root = gParent.rotateLR(this.root);

      // Right Left Case
      else if (balance < -1 && key < gParent.right.key)
        this.root = gParent.rotateRL(this.root);
    }
    // Keep track of number of nodes
    this.nodes++;
    // Re-render tree
    clear();
    background(51);
    // Keep track of tree height
    maxpath = 0;
    this.preOrder();
    this.height = maxpath;
    updateInfo();
    return newNode;
  }

  removeNode(key) {
    let node = this.find(key);
    let y = null; // Acts as node
    let z = null; // Acts as new node child

    // If node has one or no children
    if (node) {
      if (!node.left || !node.right)
        y = node;
      else
        y = node.next();

      // Append new child
      if (y.left)
        z = y.left;
      else
        z = y.right;

      // Swap these nodes
      if (z)
        z.parent = y.parent;

      if (!y.parent)
        this.root = z;
      else if (y === y.parent.left)
        y.parent.left = z;
      else
        y.parent.right = z;

      if (y !== node)
        node.key = y.key;

      while (y) {
        let balance = y.getBalance();
        // Left Left Case
        if (balance > 1 && y.left.getBalance() >= 0)
          this.root = y.rotateLL(this.root);

        // Right Right Case
        else if (balance < -1 && y.right.getBalance() <= 0)
          this.root = y.rotateRR(this.root);

        // Left Right Case
        else if (balance > 1 && y.left.getBalance() < 0)
          this.root = y.rotateLR(this.root);

        // Right Left Case
        else if (balance < -1 && y.right.getBalance() > 0)
          this.root = y.rotateRL(this.root);
        y = y.parent;
      }
    } else {
      return 0;
    }

    // Keep track of number of nodes
    this.nodes--;
    // Re-render tree
    clear();
    background(51);
    // Keep track of tree height
    maxpath = 0;
    this.preOrder();
    this.height = maxpath;
    updateInfo();
    return node;
  }

  find(nodeKey) {
    // Start in the root
    let childNode = this.root;

    while (childNode && nodeKey !== childNode.key) {
      if (this.compare(nodeKey, childNode.key) < 0)
        childNode = childNode.left;
      else
        childNode = childNode.right;
    }

    return childNode;
  }

  preOrder(toggleValues) { this.root.preOrderTraverse(toggleValues) }

  inOrder() { this.root.inOrderTraverse() }

  postOrder() { this.root.postOrderTraverse() }

}
