let previousKey = false;
let toggleValues = false;

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

// Event handlers
document.getElementsByClassName('insertBtn')[0]
  .addEventListener('click', function(e) {

    e.preventDefault();

    let key = document.getElementsByClassName('key1')[0].value;
    let val = document.getElementsByClassName('value')[0].value;
    tree.insertNode(key, val);

    document.getElementsByClassName('key1')[0].value = '';
    document.getElementsByClassName('value')[0].value = '';
  });

document.getElementsByClassName('removeBtn')[0]
  .addEventListener('click', function(e) {
    e.preventDefault();

    let key = parseInt(document.getElementsByClassName('key2')[0].value);
    tree.removeNode(key);

    document.getElementsByClassName('key2')[0].value = '';
  });

document.getElementsByClassName('findBtn')[0]
  .addEventListener('click', function(e) {
    e.preventDefault();

    if (previousKey) {
      clear();
      background(51);
      tree.preOrder();
    }

    let key = parseInt(document.getElementsByClassName('key3')[0].value);
    let node = tree.find(key);
    strokeWeight(3);
    stroke('green');
    noFill();
    ellipse(node.x, node.y, 40, 40);

    document.getElementsByClassName('key3')[0].value = '';
    previousKey = true;
  });

document.getElementsByClassName('onoffswitch-label')[0]
  .addEventListener('click', function(e) {
    toggleValues = !toggleValues;
    clear();
    background(51);
    tree.preOrder(toggleValues);
  });

function updateInfo() {
  let info = document.getElementsByClassName('tree-data')[0];
  info.innerHTML = `
    <tr>
      <th>Root:</th>
      <th>${tree.root.key} // ${tree.root.value}</th>
    </tr>
    <tr>
      <th>Tree height:</th>
      <th>${tree.height}</th>
    </tr>
    <tr>
      <th>Number of nodes:</th>
      <th>${tree.nodes}</th>
    </tr>
  `;
}
