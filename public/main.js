let previousKey = false; // Helper for finding a node
let toggleValues = false; // Helper for toggle button
let maxpath = 0;  // Helpers for getting tree/node height
let maxH = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Put canvas under the document
  background(51);

  // Fill tree with random nodes
  tree = new Tree();
  for (let i = 0; i < 15; i++) {
    try {
      tree.insertNode(floor(random(0, 100)), 'node');
    } catch (e) {
      location.reload();
    }
  }
}

function draw() {}  // Required bo p5, bu not used here

// Event handlers
document.getElementsByClassName('onoffswitch-label')[0]
  .addEventListener('click', function(e) {
    toggleValues = !toggleValues;
    clear();
    background(51);
    tree.preOrder(toggleValues);
  });

document.getElementsByClassName('insertBtn')[0]
  .addEventListener('click', function(e) {

    e.preventDefault();

    let key = document.getElementsByClassName('key')[0].value;
    let val = document.getElementsByClassName('value')[0].value;
    if (typeof key === 'Number')
      tree.insertNode(key, val);

    // Clear input fields
    document.getElementsByClassName('key')[0].value = '';
    document.getElementsByClassName('value')[0].value = '';
  });

document.getElementsByClassName('removeBtn')[0]
  .addEventListener('click', function(e) {
    e.preventDefault();

    let key = parseInt(document.getElementsByClassName('key')[1].value);
    tree.removeNode(key);

    // Clear input field
    document.getElementsByClassName('key')[1].value = '';
  });

document.getElementsByClassName('findBtn')[0]
  .addEventListener('click', function(e) {
    e.preventDefault();

    // Clear previous highlights
    if (previousKey) {
      clear();
      background(51);
      tree.preOrder();
    }

    let key = parseInt(document.getElementsByClassName('key')[2].value);
    let node = tree.find(key);

    // Highlight a node
    strokeWeight(4);
    stroke('#49E845');
    noFill();
    ellipse(node.x, node.y, 40, 40);

    // Clear input field
    document.getElementsByClassName('key')[2].value = '';
    previousKey = true;
  });

  document.getElementsByClassName('traverseBtn')[0]
    .addEventListener('click', function(e) {

      e.preventDefault();
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
