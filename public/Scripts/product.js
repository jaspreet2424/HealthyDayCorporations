const displayAllProduct = (singleProduct) => {
  const pdName = document.getElementById('product_name');
  const pdImage = document.getElementById('product_image');
  const pdPrice = document.getElementById('product_price');
  const pdDescription = document.getElementById('product_description');

  pdName.innerText = singleProduct.productName;
  pdPrice.innerText = singleProduct.productPrice + "/-";
  pdDescription.innerText = singleProduct.productDescription;
  pdImage.src = singleProduct.productImage;
};

const fetchSingleProductFromBackend = async () => {
  try {
    const productId = new URLSearchParams(document.location.search).get(
      "product"
    );
    const query = `
            query GetSingleProduct($id : ID!){
                getSingleProduct(id : $id){
                    id
                    productName
                    productImage
                    productPrice
                    productDescription
                    nutritionalValues  {
                        protein
                        calories
                        fats
                    }
                }
            }
        `;

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: { id: productId },
      }),
    });

    const { data, errors } = await response.json();

    if (data && data.getSingleProduct) {
      console.log(data)
      displayAllProduct(data.getSingleProduct);
    } else {
      console.log(errors);
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.addEventListener("DOMContentLoaded", fetchSingleProductFromBackend);
