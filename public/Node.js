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
	}

	getHeight() {
		if (this.height > maxH) maxH = this.height;
		if (this.left) this.left.getHeight();
		if (this.right) this.right.getHeight();
	}

	getBalance() {
		let lh = this.height;
		let rh = this.height;
		if (this.left) {
			this.left.getHeight();
			lh = maxH;
			maxH = 0;
		}
		if (this.right) {
			this.right.getHeight();
			rh = maxH;
			maxH = 0;
		}
		return lh - rh;
	}

	rotateLL(root) {
		let leftNode = this.left;
		let parent = this.parent;

		this.height++;
		leftNode.height--;
		leftNode.left.height--;

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

		return root;
	}

	rotateRR(root) {
		let rightNode = this.right;
		let parent = this.parent;

		this.height++;
		rightNode.height--;
		rightNode.right.height--;

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

		return root;
	}

	rotateRL(root) {
		let rightNode = this.right;
		let tempNode = rightNode.left;
		let parent = this.parent;

		this.height++;
		tempNode.height -= 2;

		rightNode.left = tempNode.right;
		if (rightNode.left) rightNode.left.parent = rightNode;

		this.right = tempNode.left;
		if (this.right) this.right.parent = this;

		tempNode.left = this;
		tempNode.right = rightNode;
		this.parent = rightNode.parent = tempNode;
		tempNode.parent = parent;

		if (parent)
			if (parent.left === this) parent.left = tempNode;
			else parent.right = tempNode;
		else root = tempNode;

		return root;
	}

	rotateLR(root) {
		let leftNode = this.left;
		let tempNode = leftNode.right;
		let parent = this.parent;

		this.height++;
		tempNode.height -= 2;

		leftNode.right = tempNode.left;
		if (leftNode.right) leftNode.right.parent = leftNode;

		this.left = tempNode.right;
		if (this.left) this.left.parent = this;

		tempNode.right = this;
		tempNode.left = leftNode;
		this.parent = leftNode.parent = tempNode;
		tempNode.parent = parent;

		if (parent)
			if (parent.left === this) parent.left = tempNode;
			else parent.right = tempNode;
		else root = tempNode;

		return root;
	}

	// Min value node
	min() {
		let node = this;

		if (node) while (node.left) node = node.left;
		return node;
	}

	// Node successor
	next() {
		let node = this;
		let parent = null;

		if (node) {
			if (node.right) return node.right.min();
			else {
				parent = node.parent;
				while (parent && node === parent.right) {
					node = parent;
					parent = parent.parent;
				}
				return parent;
			}
		}
		return node;
	}

	assignCoords() {
		this.y = this.parent.y + height / 12;
		if (this === this.parent.right)
			this.x = this.parent.x + width / pow(2, this.height + 1);
		else this.x = this.parent.x - width / pow(2, this.height + 1);
	}

	preOrderTraverse(toggleValues) {
		// Update tree height
		if (this.height > maxpath) maxpath = this.height;

		this.draw(toggleValues);

		if (this.left) {
			this.left.height = this.height + 1;
			this.left.preOrderTraverse(toggleValues);
		}
		if (this.right) {
			this.right.height = this.height + 1;
			this.right.preOrderTraverse(toggleValues);
		}
	}

	inOrderTraverse() {
		if (this.left) this.left.inOrderTraverse();
		this.draw();
		if (this.right) this.right.inOrderTraverse();
	}

	postOrderTraverse() {
		if (this.left) this.left.postOrderTraverse();
		if (this.right) this.right.postOrderTraverse();
		this.draw();
	}

	draw(toggleValues) {
		const radius = 20;
		stroke(100);

		// Coords update on deletion (keeps track of right levels)
		if (this.parent && this.height - 1 !== this.parent.height) {
			this.height--;
			this.assignCoords();
		}

		// Coords update on rotation
		if (this.parent) this.assignCoords();

		if (!this.parent) {
			this.x = width / 2;
			this.y = 30;
		}

		// Exclude root (has no parent)
		if (this.height > 0)
			line(this.parent.x, this.parent.y + radius, this.x, this.y - radius);

		stroke(255);
		strokeWeight(3);
		noFill();
		ellipse(this.x, this.y, 2 * radius, 2 * radius);

		fill(255);
		textAlign(CENTER);
		textStyle(BOLD);
		strokeWeight(0);
		textSize(16);
		text(this.key, this.x, this.y + 4);
		if (toggleValues) {
			if (this.parent && this.parent.right === this)
				text(`${this.value} : ${this.getBalance()}`, this.x + 60, this.y + 4);
			else
				text(`${this.value} : ${this.getBalance()}`, this.x - 60, this.y + 4);
		}
		strokeWeight(1);
	}
}
