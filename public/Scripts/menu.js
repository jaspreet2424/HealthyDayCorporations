let originalProductsArray;
let productsArray ;


const addtoCart = (item) => {
  console.log(item);
};

const displayAllProduct = (prdArray) => {
  const productsDisplayContainer = document.getElementById(
    "products_display_container"
  );

  prdArray.map((item) => {
    const eachContainer = document.createElement("div");

    eachContainer.classList.add("each_product_card");

    eachContainer.innerHTML += `
             <div class="inner_card">
                    <div class="img_container">
                        <img
                          src="${item.productImage}"
                          alt="Failed to load Image" class="product_img" />
                    </div>

                    <div class="card_body">
                        <div class="desc_body">
                          <p class="item_name">${item.productName}</p>
                          <p class="item_price">INR-${item.productPrice}</p>
                        </div>
                        <div class="link_body">
                          <a href="./product.html?product=${item.id}">Read More</a>
                          <button class="add_to_cart_button" onclick='addtoCart(${JSON.stringify(item)})'>
                            <i class="fa-solid fa-shopping-cart" id="cart_icon"></i>
                          </button>
                        </div>
                    </div>
            </div>
        `;
    productsDisplayContainer.append(eachContainer);
  });
};

const fetchProductsFromServer = async () => {
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
      originalProductsArray = data.getAllProducts || [];
      productsArray = data.getAllProducts || [];
      displayAllProduct(originalProductsArray);
    } else {
      console.log("errors ", errors);
    }
  } catch (error) {
    console.log("Catch errors ", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchProductsFromServer);