const table = document.querySelector("tbody");

const displayProducts = () => {
  let productList = JSON.parse(localStorage.getItem("productList"));
  table.innerHTML = "";
  productList.forEach((product, index) => {
    table.innerHTML += `<tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.descripiton}</td>
        <td>
            <i id="e${index}" class="material-icons">edit</i>
            <i id="d${index}" class="material-icons">delete</i>
            <i id="v${index}" class="material-icons">visibility</i>
        </td>
      </tr>`;
    document.getElementById(`e${index}`).addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(product));
      location.replace("./update-product.html");
    });
    console.log(document.getElementById(`e${index}`));
    document.querySelector(`#v${index}`).addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(product));
      location.replace("./view-product.html");
    });
    document.querySelector(`#d${index}`).addEventListener("click", () => {
      console.log("delete btn clicked");
      productList.splice(index, 1);
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
