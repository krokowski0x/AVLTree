class Node {

  constructor(key, value, x, y) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.height = 0;
    this.balanceFactor = 0;
    this.key = key;
    this.value = value;
    this.x = x;
    this.y = y;
    //this.drawn = false;
  }

  rotateLL(root) {
    let leftNode = this.left;
    let parent = this.parent;

    this.left = leftNode.right;
    if (this.left) this.left.parent = this;

    leftNode.right = this;
    leftNode.parent = parent;
    this.parent = leftNode;

    if (parent) {
      if (parent.left === this) {
        parent.left = leftNode;
      } else {
        parent.right = leftNode;
      }
    } else {
      root = leftNode;
    }

    if (leftNode.balanceFactor === 1) {
      this.balanceFactor = leftNode.balanceFactor = 0;
    } else {
      this.balanceFactor = 1;
      leftNode.balanceFactor = -1;
    }

    return leftNode;
  }

  rotateRR(root) {
    let rightNode = this.right;
    let parent = this.parent;

    this.right = rightNode.left;
    if (this.right) this.right.parent = this;

    rightNode.left = this;
    rightNode.parent = parent;
    this.parent = rightNode;

    if (parent) {
      if (parent.left === this) {
        parent.left = rightNode;
      } else {
        parent.right = rightNode;
      }
    } else {
      root = rightNode;
    }

    if (rightNode.balanceFactor === -1) {
      this.balanceFactor = rightNode.balanceFactor = 0;
    } else {
      this.balanceFactor = -1;
      rightNode.balanceFactor = 1;
    }

    return rightNode;
  }

  rotateRL(root) {
    let rightNode = this.right;
    let tempNode = rightNode.left;
    let parent = this.parent;

    rightNode.left = tempNode.right;
    if (rightNode.left)
      rightNode.left.parent = rightNode;

    this.right = tempNode.left;
    if (this.right)
      this.right.parent = this;

    tempNode.left = this;
    tempNode.right = rightNode;
    this.parent = rightNode.parent = tempNode;
    tempNode.parent = parent;

    if (parent)
      if (parent.left === this)
        parent.left = tempNode;
      else
        parent.right = tempNode;
    else
      root = tempNode;

    if (tempNode.balanceFactor === -1)
      this.balanceFactor = 1;
    else
      this.balanceFactor = 0;

    if (tempNode.balanceFactor === 1)
      rightNode.balanceFactor = -1;
    else
      rightNode.balanceFactor = 0;

    tempNode.balanceFactor = 0;
  }

  rotateLR(root) {
    let leftNode = this.left;
    let tempNode = leftNode.right;
    let parent = this.parent;

    leftNode.left = tempNode.right;
    if (leftNode.left)
      leftNode.left.parent = leftNode;

    this.right = tempNode.left;
    if (this.right)
      this.right.parent = this;

    tempNode.left = this;
    tempNode.right = leftNode;
    this.parent = leftNode.parent = tempNode;
    tempNode.parent = parent;

    if (parent)
      if (parent.left === this)
        parent.left = tempNode;
      else
        parent.right = tempNode;
    else
      root = tempNode;

    if (tempNode.balanceFactor === -1)
      this.balanceFactor = 1;
    else
      this.balanceFactor = 0;

    if (tempNode.balanceFactor === 1)
      leftNode.balanceFactor = -1;
    else
      leftNode.balanceFactor = 0;

    tempNode.balanceFactor = 0;
  }

  min() {
    let node = this;

    if (node)
      while (node.left)
        node = node.left;
    return node;
  }

  next() {
    let node = this;
    let parent = null;

    if (node) {
      if (node.right)
        return node.right.min();
      else {
        parent = node.parent;
        while (parent && (node === parent.right)) {
          node = parent;
          parent = parent.parent;
        }
        return parent;
      }
    }
    return node;
  }

  preOrderTraverse() {
    //if (!this.drawn)
      this.draw();
    if (this.left)
      this.left.preOrderTraverse();
    if (this.right)
      this.right.preOrderTraverse();
  }

  inOrderTraverse() {
    if (this.left)
      this.left.inOrderTraverse();
    //if (!this.drawn)
      this.draw();
    if (this.right)
      this.right.inOrderTraverse();
  }

  postOrderTraverse() {
    if (this.left)
      this.left.postOrderTraverse();
    if (this.right)
      this.right.postOrderTraverse();
    //if (!this.drawn)
      this.draw();
  }

  draw() {

    const radius = 15;
    stroke(100);

    // This keeps track of right levels (coords update on deletion)
    if (this.parent && this.height - 1 !== this.parent.height) {
      this.height--;
      this.y = this.parent.y + (height / 12);
      if (this === this.parent.right)
        this.x = this.parent.x + (width / pow(2, this.height+1));
      else
        this.x = this.parent.x - (width / pow(2, this.height+1));
    }

    // Exclude root (has no parent)
    if (this.height > 0)
      line(this.parent.x, this.parent.y + radius, this.x, this.y - radius);

    stroke(255);
    noFill();
    ellipse(this.x, this.y, 2*radius, 2*radius);

    fill(255);
    textAlign(CENTER);
    strokeWeight(0);
    textSize(12);
    text(this.key, this.x, this.y + 3);
    strokeWeight(1);
    //this.drawn = true;
  }
}
