function productsSliderFunction() {
    const slide_button = document.querySelectorAll(".slide_button");
    const productSlider = document.querySelector(".products_container");
    const eachCard = document.querySelector(".each_product_container");
    const cardWidth = eachCard.offsetWidth;
  
    slide_button.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("right_slide")) {
          productSlider.scrollLeft += cardWidth;
        } else {
          productSlider.scrollLeft += -cardWidth;
        }
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", productsSliderFunction);