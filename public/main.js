function setup() {
  // Width enough for 5 levels (32 leaves)
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(51);

  // Fill tree with random nodes
  tree = new Tree();
  for (let i = 0; i < 15; i++) {
    tree.insertNode(floor(random(0, 100)), 'node');
  }
}

function draw() {

}

document.getElementsByClassName('btn')[0]
  .addEventListener('click', function(e) {

    let key = document.getElementsByClassName('key')[0].value;
    console.log(key);
    let val = document.getElementsByClassName('value')[0].value;
    console.log(val);
    tree.insertNode(key, val);
    e.preventDefault();
  });
