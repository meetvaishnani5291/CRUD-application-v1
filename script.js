const table = document.querySelector("tbody");

const formElement = {
  name: document.querySelector("#productName"),
  price: document.querySelector("#productPrice"),
  descripiton: document.querySelector("#productDescription"),
  image: document.querySelector("#productImage"),
};
const displayProducts = () => {
  let productList = JSON.parse(localStorage.getItem("productList"));
  console.log("hh");
  table.innerHTML = "";
  productList.forEach((product) => {
    table.innerHTML += `<tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.descripiton}</td>
        <td>
            <i class="material-icons">edit</i>
            <i class="material-icons">delete</i>
            <i class="material-icons">visibility</i>
        </td>
      </tr>`;
  });
};

const addProduct = () => {
  let productList = JSON.parse(localStorage.getItem("productList"));
  productList.push({
    id: Date.now(),
    name: formElement.name.value,
    price: formElement.price.value,
    descripiton: formElement.descripiton.value,
    image: formElement.image.value,
  });
  displayProducts();
};
const updateLocalStorage = () => {};

document.querySelector("#addProduct").addEventListener("click", addProduct);

const init = function () {
  if (!localStorage.getItem("productList")) {
    localStorage.setItem("productList", JSON.stringify([]));
  }
};
init();
