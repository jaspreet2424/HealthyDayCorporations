/* Backend-Frontend Connectivity Logics */

const displayAllProduct = (productsArray) => {
  const productContainer = document.getElementById("products_container");

  productsArray.map((item) => {
    const eachContainer = document.createElement("div");
    eachContainer.classList.add("each_product_container");

    eachContainer.innerHTML = `
      <div class="each_product">
        <div class="img_container">
          <img
            src="${item.productImage}"
            alt="Failed to load image" class="product_img" />
        </div>
        <div class="card_body">
          <div class="desc_body">
            <p>${item.productName}</p>
            <p>INR-${item.productPrice}</p>
          </div>
          <div class="link_body">
            <a href="./product.html?product=${item.id}">read more</a>
            <button class="add_to_cart_button">
              <i class="fa-solid fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    productContainer.append(eachContainer);
  });
};

const fetchDataFromBackend = async () => {
  try {
    const query = `
        query GetAllProducts {
            getAllProducts {
                id
                productName
                productPrice
                productImage
            }
        }
    `;

    const response = await fetch("http://127.0.0.1:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    const { data, errors } = await response.json();

    if (data) {
      let productsArray = data.getAllProducts || [];
      displayAllProduct(productsArray);
    } else {
      console.log("errors ", errors);
    }
  } catch (error) {
    console.log("Catch errors ", error);
  }
};
document.addEventListener("DOMContentLoaded", fetchDataFromBackend);

/* Frontend Events and other Logics */

const slide_button = document.querySelectorAll(".slide_button");

slide_button.forEach((btn) => {
  btn.addEventListener("click", function () {
    const productSlider = document.querySelector(".products_container");
    const eachCard = document.querySelector(".each_product_container");
    const cardWidth = eachCard.offsetWidth;

    if (btn.classList.contains("right_slide")) {
      console.log("right");
      productSlider.scrollLeft += cardWidth;
    } else {
      console.log("left");
      productSlider.scrollLeft += -cardWidth;
    }
  });
});