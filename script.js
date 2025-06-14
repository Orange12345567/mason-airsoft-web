
const app = document.getElementById('app');

let isAdmin = false;
let points = 0;
let proposedDates = [];
let products = [];
let cart = [];

function renderLogin() {
  app.innerHTML = \`
    <button onclick="adminLogin()">Admin Login</button>
    <p><a href="#" onclick="loadUserApp()">Not an admin? Click here!</a></p>
  \`;
}

function adminLogin() {
  const pwd = prompt("Enter admin password:");
  if (pwd === "Charcoal11!") {
    isAdmin = true;
    loadApp();
  } else {
    alert("Incorrect password!");
  }
}

function loadUserApp() {
  isAdmin = false;
  loadApp();
}

function loadApp() {
  app.innerHTML = \`
    <h2>\${isAdmin ? "Admin" : "User"} Portal</h2>
    <h3>Calendar</h3>
    <input type="date" id="dateInput">
    <button onclick="proposeDate()">Propose Date</button>
    <ul id="datesList"></ul>

    <h3>Shop</h3>
    <p>You have \${points} points</p>
    <div id="shopArea"></div>

    \${isAdmin ? \`
      <h4>Add New Product</h4>
      <input type="text" id="prodName" placeholder="Product Name"><br>
      <input type="text" id="prodImg" placeholder="Image URL"><br>
      <button onclick="addProduct()">Add Product</button>
    \` : ''}
  \`;

  renderDates();
  renderShop();
}

function proposeDate() {
  const dateVal = document.getElementById('dateInput').value;
  if (dateVal) {
    proposedDates.push({ date: dateVal, status: 'Pending' });
    renderDates();
  }
}

function renderDates() {
  const list = document.getElementById('datesList');
  if (!list) return;
  list.innerHTML = '';
  proposedDates.forEach((entry, i) => {
    list.innerHTML += \`
      <li>
        \${entry.date} - \${entry.status}
        \${isAdmin && entry.status === 'Pending' ? \`
          <button onclick="respondDate(\${i}, 'Accepted')">Accept</button>
          <button onclick="respondDate(\${i}, 'Denied')">Deny</button>
        \` : ''}
      </li>
    \`;
  });
}

function respondDate(i, action) {
  proposedDates[i].status = action;
  if (action === 'Accepted' && !isAdmin) points += 10;
  renderDates();
  loadApp();
}

function addProduct() {
  const name = document.getElementById('prodName').value;
  const img = document.getElementById('prodImg').value;
  if (name && img) {
    products.push({ name, img });
    renderShop();
  }
}

function renderShop() {
  const shop = document.getElementById('shopArea');
  if (!shop) return;
  shop.innerHTML = '';
  products.forEach((p, i) => {
    shop.innerHTML += \`
      <div>
        <img src="\${p.img}" width="100"><br>
        <strong>\${p.name}</strong><br>
        <button onclick="addToCart(\${i})">Add to Cart</button>
      </div>
    \`;
  });
  if (!isAdmin && cart.length > 0) {
    shop.innerHTML += '<h4>Cart (given at next match):</h4><ul>' + cart.map(i => '<li>' + products[i].name + '</li>').join('') + '</ul>';
  }
}

function addToCart(i) {
  cart.push(i);
  renderShop();
}

renderLogin();
