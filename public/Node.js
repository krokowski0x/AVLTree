class Node {

  constructor(key, value) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.height = 0;
    this.balanceFactor = 0;
    this.key = key;
    this.value = value;
  }

  rotateRight() {

  }

  rotateLeft() {

  }

  preOrderTraverse() {

    console.log(this.value);

    if (this.left)
      this.left.preOrderTraverse();

    if (this.right)
      this.right.preOrderTraverse();
  }

  inOrderTraverse() {

    if (this.left)
      this.left.inOrderTraverse();

    console.log(this.value);

    if (this.right)
      this.right.inOrderTraverse();
  }

  postOrderTraverse() {

    if (this.left)
      this.left.postOrderTraverse();

    if (this.right)
      this.right.postOrderTraverse();

    console.log(this.value);
  }
}
