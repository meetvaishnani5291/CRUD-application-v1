const table = document.querySelector("tbody");

const headerElement = {
  name: document.querySelector("#name"),
  price: document.querySelector("#price"),
  descripiton: document.querySelector("#description"),
  id: document.querySelector("#id"),
};
const arrowElement = {
  name: document.querySelector("#arrowName"),
  price: document.querySelector("#arrowPrice"),
  id: document.querySelector("#arrowId"),
};

const statusOfSorting = {
  sortBy: "none",
  order: -1,
};

const filterProduct = function (productList) {
  const inputString = document.querySelector(".filterInput").value.toString();
  if (inputString.length === 0) {
    return;
  }
  return productList.filter((product) => {
    return product.id.toString().startsWith(inputString);
  });
};
const sortProduct = (productList) => {
  arrowElement.name.classList.add("hide");
  arrowElement.price.classList.add("hide");
  arrowElement.id.classList.add("hide");
  let currentArrowElement;
  switch (statusOfSorting.sortBy) {
    case "none":
      break;
    case "name":
      productList.sort(
        (a, b) => statusOfSorting.order * a.name.localeCompare(b.name)
      );
      currentArrowElement = arrowElement.name;
      currentArrowElement.classList.remove("hide");
      break;
    case "id":
      productList.sort((a, b) => statusOfSorting.order * (a.id - b.id));
      currentArrowElement = arrowElement.id;
      currentArrowElement.classList.remove("hide");
      break;
    case "price":
      productList.sort((a, b) => statusOfSorting.order * (a.price - b.price));
      currentArrowElement = arrowElement.price;
      currentArrowElement.classList.remove("hide");
      break;
  }
  if (!currentArrowElement) return;
  if (statusOfSorting.order === -1)
    currentArrowElement.classList.add("rotateArrow");
  else currentArrowElement.classList.remove("rotateArrow");
};

const displayProducts = () => {
  let productList = JSON.parse(localStorage.getItem("productList"));
  productList = filterProduct(productList) ?? productList;
  sortProduct(productList);
  table.innerHTML = "";
  productList.forEach((product, index) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML += `<tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.descripiton}</td>
        <td>
            <i id="e${index}" class="material-icons btnCursor">edit</i>
            <i id="d${index}" class="material-icons btnCursor">delete</i>
            <i id="v${index}" class="material-icons btnCursor">visibility</i>
        </td>
      </tr>`;
    table.appendChild(tableRow);
    document.getElementById(`e${index}`).addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(product));
      location.replace("./update-product.html");
    });
    document.querySelector(`#v${index}`).addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(product));
      location.replace("./view-product.html");
    });
    document.querySelector(`#d${index}`).addEventListener("click", () => {
      var result = confirm("Are you sure to delete?");
      if (result) {
        productList.splice(index, 1);
      }
      localStorage.setItem("productList", JSON.stringify(productList));
      displayProducts();
    });
  });
};

(function () {
  if (!localStorage.getItem("productList")) {
    localStorage.setItem("productList", JSON.stringify([]));
  }
  displayProducts();
})();
const sortHandler = function () {
  if (statusOfSorting.sortBy !== this.toString()) {
    statusOfSorting.sortBy = this.toString();
    statusOfSorting.order = 1;
  } else {
    statusOfSorting.order *= -1;
  }
  displayProducts();
};

headerElement.name.addEventListener("click", sortHandler.bind("name"));
headerElement.id.addEventListener("click", sortHandler.bind("id"));
headerElement.price.addEventListener("click", sortHandler.bind("price"));

// filter input field event
document
  .querySelector(".filterInput")
  .addEventListener("keyup", displayProducts);
