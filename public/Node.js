class Node {

  constructor(key, value, x, y) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.height = 0;
    this.distance = 2;
    this.balanceFactor = 0;
    this.key = key;
    this.value = value;
    this.x = x;
    this.y = y;
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

  preOrderTraverse() {

    console.log(this);
    fill(255);
    noStroke();
    //line(this.parent.x, this.parent.y, this.x, this.y);
    textAlign(CENTER);
    textSize(14);
    text(this.key, this.x, this.y + 5);
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 30, 30);

    if (this.left)
      this.left.preOrderTraverse();

    if (this.right)
      this.right.preOrderTraverse();

  }

  inOrderTraverse() {

    if (this.left)
      this.left.inOrderTraverse();

    console.log(this);

    if (this.right)
      this.right.inOrderTraverse();
  }

  postOrderTraverse() {

    if (this.left)
      this.left.postOrderTraverse();

    if (this.right)
      this.right.postOrderTraverse();

    console.log(this);
  }
}
