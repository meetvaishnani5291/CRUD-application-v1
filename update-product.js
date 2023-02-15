const formElement = {
  form: document.querySelector("form"),
  name: document.querySelector("#productName"),
  price: document.querySelector("#productPrice"),
  descripiton: document.querySelector("#productDescription"),
  image: document.querySelector("#productImage"),
};

const productForUpdate = JSON.parse(localStorage.getItem("product"));
const init = () => {
  formElement.name.value = productForUpdate.name;
  formElement.price.value = productForUpdate.price;
  formElement.descripiton.value = productForUpdate.descripiton;
  formElement.image.value = productForUpdate.image;
};
init();

const updateProduct = () => {
  if (
    formElement.name.value === productForUpdate.name &&
    formElement.descripiton.value === productForUpdate.descripiton &&
    formElement.price.value === productForUpdate.price &&
    formElement.image.value === productForUpdate.image
  ) {
    alert("Please made some change to update product");
  } else if (
    formElement.name.value === "" ||
    formElement.descripiton.value === "" ||
    formElement.price.value === "" ||
    formElement.image.value === ""
  ) {
    alert("All fields are mandatory");
  } else {
    const productList = JSON.parse(localStorage.getItem("productList"));
    productForUpdate.name = formElement.name.value;
    productForUpdate.price = formElement.price.value;
    productForUpdate.descripiton = formElement.descripiton.value;
    productForUpdate.image = formElement.image.value;

    let isValidated = true;

    for (let index = 0; index < productList.length; index++) {
      if (productList[index].id === productForUpdate.id) {
        productList[index] = productForUpdate;
      } else if (productList[index].name === productForUpdate.name) {
        isValidated = false;
        formElement.name.classList.add("is-invalid");
      }
    }
    if (isValidated) {
      localStorage.setItem("productList", JSON.stringify(productList));
      formElement.name.classList.remove("is-invalid");
      formElement.form.reset();
      alert("Product updated successfully.");
      window.location.replace("./index.html");
    }
  }
};

document
  .querySelector("#updateProduct")
  .addEventListener("click", updateProduct);
