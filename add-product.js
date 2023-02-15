const formElement = {
  form: document.querySelector("form"),
  name: document.querySelector("#productName"),
  price: document.querySelector("#productPrice"),
  descripiton: document.querySelector("#productDescription"),
  image: document.querySelector("#productImage"),
};

const addProduct = () => {
  formElement.name.classList.remove("is-invalid");
  const productList = JSON.parse(localStorage.getItem("productList"));
  const newProduct = {
    id: Date.now(),
    name: formElement.name.value,
    price: formElement.price.value,
    descripiton: formElement.descripiton.value,
    image: formElement.image.value,
  };
  if (!validateInput(newProduct)) return;

  productList.push(newProduct);
  localStorage.setItem("productList", JSON.stringify(productList));
  formElement.form.reset();
  alert("Product added successfully.");
  window.location.replace("./index.html");
};

document.querySelector("#addProduct").addEventListener("click", addProduct);

const validateInput = (newProduct) => {
  const productList = JSON.parse(localStorage.getItem("productList"));
  let isValidated = true;
  if (
    newProduct.name === "" ||
    newProduct.price === "" ||
    newProduct.descripiton === "" ||
    newProduct.image === ""
  ) {
    isValidated = false;
    alert("All field are mandatory.");
  }

  if (
    productList.findIndex((product) => {
      return product.name === newProduct.name;
    }) !== -1
  ) {
    formElement.name.classList.add("is-invalid");
    isValidated = false;
  }
  //   if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(newProduct.image)) {
  //     formElement.image.classList.add("is-invalid");
  //     isValidated = false;
  //   }
  return isValidated;
};
