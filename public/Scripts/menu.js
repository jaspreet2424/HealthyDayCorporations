/*Global State Variables */

const localState = {
  productsArray: [],
  queryProductsData: [],
};

/* Service Classes start*/
class BackendServices {
  static async fetchProductsFromServer() {
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
        localState.productsArray = data.getAllProducts || [];
        return localState.productsArray;
      } else {
        console.log("errors ", errors);
      }
    } catch (error) {
      console.log("Catch errors ", error);
    }
  }

  static async filterSearchProduct(filterquery) {
    try {
      const query = `
          query GetQueryFilterProducts($filterquery : String!) {
              getQueryFilterProducts(filterquery : $filterquery) {
                  id
                  productName
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
          variables: { filterquery },
        }),
      });

      const { data, errors } = await response.json();

      if (data) {
        localState.queryProductsData = data.getQueryFilterProducts || [];
        return localState.queryProductsData;
      } else {
        console.log("errors ", errors);
      }
    } catch (error) {
      console.log("Catch errors ", error);
    }
  }
}
/* Service Classes end*/

const addtoCart = (item) => {
  console.log(item);
};

/* Frontend Event and DOM manipulation logics */

const handleSearchQuery = () => {
  const searchInput = document.getElementById("search_input");

  searchInput.addEventListener("input", async function (event) {
    const searchResults = document.getElementById("srcnt");
    const query = event.target.value;

    if (query.length > 0) {
      const productsData = await BackendServices.filterSearchProduct(query);

      if (productsData.length > 0) {
        document.getElementById("nrfbox").style.display = "none";
        searchResults.innerHTML = "";

        productsData.forEach((item) => {
          const eachResult = document.createElement("a");
          eachResult.href = `./product.html?product=${item.id}`;
          eachResult.classList.add("erData");
          eachResult.innerHTML = `
            <p">${item.productName}</p>
          `;

          searchResults.append(eachResult);
        });
      } else {
        document.getElementById("nrfbox").style.display = "block";
        searchResults.innerHTML = "";
      }
    } else {
      document.getElementById("nrfbox").style.display = "block";
      searchResults.innerHTML = "";
    }
  });
};

const displayAllProduct = async () => {
  let prdArray = await BackendServices.fetchProductsFromServer();

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
                          <a href="./product.html?product=${
                            item.id
                          }">Read More</a>
                          <button class="add_to_cart_button" onclick='addtoCart(${JSON.stringify(
                            item
                          )})'>
                            <i class="fa-solid fa-shopping-cart" id="cart_icon"></i>
                          </button>
                        </div>
                    </div>
            </div>
        `;
    productsDisplayContainer.append(eachContainer);
  });
};

const searchInput = document.getElementById("search_input");

searchInput.addEventListener("focus", function () {
  setTimeout(() => {
    document.getElementById("search_result_cont").style.display = "block";
  }, 200);
});

searchInput.addEventListener("blur", function () {
  setTimeout(() => {
    document.getElementById("search_result_cont").style.display = "none";
  }, 300);
});

document.addEventListener("DOMContentLoaded", displayAllProduct);
document.addEventListener("DOMContentLoaded", handleSearchQuery);
