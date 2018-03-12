class Tree {

  constructor() {
    this.root = null;
    this.height = 0;
    this.nodes = [];
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
    // Don't insert if it's duplicate
    if (this.nodes.includes(key))
      return 0;
    // Keep track of nodes in an array
    this.nodes.push(parseInt(key));
    this.nodes.sort((a,b) => this.compare(a, b));

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
      // Go left or right, update coords and attach to parent
      if (this.compare(key, parent.key) === -1) {
        if (!parent.left) {
          parent.left = newNode;
          newNode.x = parent.x - (width / pow(2, newNode.height+2));
          newNode.y = parent.y + (height / 12);
          newNode.parent = parent;
        }
        newNode.height++;
        parent = parent.left;
    } else {
        if (!parent.right) {
          parent.right = newNode;
          newNode.x = parent.x + (width / pow(2, newNode.height+2));
          newNode.y = parent.y + (height / 12);
          newNode.parent = parent;
        }
        newNode.height++;
        parent = parent.right;
      }
    }
    //
    // // Phase 2 - Rebalancing tree
    // if (parent.balanceFactor)
    //   parent.balanceFactor = 0;
    // else {
    //   if (parent.left === newNode)
    //     parent.balanceFactor = 1;
    //   else
    //     parent.balanceFactor = -1;
    //
    //   let gParent = parent.parent;
    //   let t =false;
    //
    //   while (gParent) {
    //     if (gParent.balanceFactor) {
    //       t = true;
    //       break;
    //     }
    //
    //     if (gParent.left === parent)
    //       gParent.balanceFactor = 1;
    //     else
    //       gParent.balanceFactor = -1;
    //
    //     parent = gParent;
    //     gParent = gParent.parent;
    //   }
    //
    //   if (t) {
    //     if (gParent.balanceFactor === 1) {
    //       if (gParent.right === parent)
    //         gParent.balanceFactor = 0;
    //       else if (gParent.balanceFactor === -1)
    //         gParent.rotateLR(this.root);
    //       else
    //         gParent.rotateLL(this.root);
    //     }
    //     else {
    //       if (gParent.left === parent)
    //         gParent.balanceFactor = 0;
    //       else if (gParent.balanceFactor === 1)
    //         gParent.rotateRL(this.root);
    //       else
    //         gParent.rotateRR(this.root);
    //     }
    //   }
    // }

    clear();
    background(51);
    this.preOrder();
  }

  // Current node successor
  minValueNode() {
    var current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  removeNode(key) {
    let node = this.find(key);
    let y = null; // Act as node
    let z = null; // Act as new node child

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

      // Couldn't just delete object in ES6
      delete y.key;
      delete y.value;
    }

    // Keep track of nodes in an array
    this.nodes.splice(this.nodes.indexOf(key), 1);
    clear();
    background(51);
    this.preOrder();
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
