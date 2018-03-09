function setup() {
  createCanvas(800,800);
  background(51);
  tree = new Tree();
  for (let i = 0; i < 15; i++) {
    tree.insertNode(floor(random(0, 100)), 'node');
  }
  tree.preOrder();
}

function draw() {

}
