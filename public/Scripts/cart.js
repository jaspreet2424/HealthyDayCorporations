let cartArray;

const renderCartItems = (cartArr) => {
  const cartContainer = document.getElementById("cart_container");

  cartArr.map((item) => {
    const eachContainer = document.createElement("div");
    eachContainer.classList.add('each_cart_item');

    eachContainer.innerHTML = `
            <div class="cart_image_container">
              <img
                src="${item.productImage}"
                alt="Failed to Load Image"
                class="cart_item_image"
              />
            </div>
            <div class="cart_item_description">
              <p>${item.productName}</p>
              <p>Product Price INR-${item.productPrice}/-</p>
              <div class="quantity_container">
                <p>Quantity :</p>
                <button class="quantity_buttons">-</button>
                <input type="text" min="1" value="1" class="quantity_input" />
                <button class="quantity_buttons">+</button>
              </div>
              <div class="remove_button_container">
                <button class="remove_item_button" title="Remove Item">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
        `;

    cartContainer.append(eachContainer);
  });
};

const fetchCartDetailsFromBackend = async () => {
  try {
    const query = `
            query ShowCartItems{
                showCartItems{
                    id
                    productName
                    productPrice
                    productImage
                }
            }
        `;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NmZlMmE1Yzc0YWJjNTU3ZWNlMTk4YTAiLCJVc2VyRW1haWwiOiJzaW5naGphc3ByZWV0MjQyNUBnbWFpbC5jb20iLCJpYXQiOjE3MjkyMzQxODJ9.gpkBwcZaCnjdoq3sD1E2O8WUDb3Xz-5zBEzDBIMJW_A";

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        query,
      }),
    });

    const { data, errors } = await response.json();

    if (data && data.showCartItems) {
      cartArray = data.showCartItems || [];
      renderCartItems(cartArray);
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.addEventListener("DOMContentLoaded", fetchCartDetailsFromBackend);
