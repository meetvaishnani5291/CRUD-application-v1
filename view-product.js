const cardElement = {
  id: document.querySelector(".productId"),
  name: document.querySelector(".productName"),
  price: document.querySelector(".productPrice"),
  descripiton: document.querySelector(".productDescription"),
  image: document.querySelector(".productImage"),
};
const productForView = JSON.parse(localStorage.getItem("product"));

cardElement.id.innerHTML = "id : " + productForView.id;
cardElement.image.src = productForView.image;
cardElement.descripiton.innerHTML =
  "descripiton : " + productForView.descripiton;
cardElement.price.innerHTML = "price : " + productForView.price;
cardElement.name.innerHTML = "name : " + productForView.name;
