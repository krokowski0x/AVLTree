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

  rotateRight() {
    let leftNode = this.left;

    this.left = leftNode.right;
    if (this.left) this.left.parent = this;

    leftNode.right = this;
    leftNode.parent = this.parent;
    this.parent = leftNode;

    if (leftNode.parent) {
      if (leftNode.parent.left === this) {
        leftNode.parent.left = leftNode;
      } else {
        leftNode.parent.right = leftNode;
      }
    } else {
      this.root = leftNode;
    }

    if (leftNode.balanceFactor === 1) {
      this.balanceFactor = leftNode.balanceFactor = 0;
    } else {
      this.balanceFactor = 1;
      leftNode.balanceFactor = -1;
    }

    return leftNode;
  }

  rotateLeft() {
    let rightNode = this.right;

    this.right = rightNode.left;
    if (this.right) this.right.parent = this;

    rightNode.left = this;
    rightNode.parent = this.parent;
    this.parent = rightNode;

    if (rightNode.parent) {
      if (rightNode.parent.left === this) {
        rightNode.parent.left = rightNode;
      } else {
        rightNode.parent.right = rightNode;
      }
    } else {
      this.root = rightNode;
    }

    if (rightNode.balanceFactor === -1) {
      this.balanceFactor = rightNode.balanceFactor = 0;
    } else {
      this.balanceFactor = -1;
      rightNode.balanceFactor = 1;
    }

    return rightNode;
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
    if (!this.drawn)
      this.draw();
    if (this.right)
      this.right.inOrderTraverse();
  }

  postOrderTraverse() {
    if (this.left)
      this.left.postOrderTraverse();
    if (this.right)
      this.right.postOrderTraverse();
    if (!this.drawn)
      this.draw();
  }

  draw() {

    const radius = 15;
    stroke(100);

    if (this.parent && this.height - 1 !== this.parent.height) {
      this.height--;
      this.y = this.parent.y + (height / 12);
      if (this === this.parent.right)
        this.x = this.parent.x + (width / pow(2, this.height+1));
      else
        this.x = this.parent.x - (width / pow(2, this.height+1));
    }

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
