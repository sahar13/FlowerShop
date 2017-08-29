//your code goes heree
$( document ).ready(function() {
  //create global variables that will be used to update cart prices
  subtotal = 0;
  total = 0;
  taxes = 0;
  tax = 0.13;

  $(".shop-list .shop-product").on("click", function(){
    //add classes to indicate item has been added to cart
    $(this).find(".shop-buy").addClass("in-cart").text('In Cart');

    //extract data that new elements in the cart and glance sections will need
    var title = $(this).find(".shop-name").text();
    var imgClass = $(this).find(".shop-img").attr("class").split(" ")[1];
    var imgSrc = $(this).find(".shop-img").attr("src");
    var price = $(this).find(".shop-price").text();


    //create cart wrapper elements, add classes/text/css and use extracted data from variables above when necessary
    var cartListItem = $(document.createElement("li")).addClass("cart-list-product");
    var counterWrap = $(document.createElement("div")).addClass("cart-list-counter");

    //create cart counter elements, add classes/text/css and use extracted data from variables above when necessary
    var plus = $(document.createElement("span")).addClass("fa fa-plus");
    var counter = $(document.createElement("span")).addClass("cart-list-product-counter-quantity").text("1");
    var minus = $(document.createElement("span")).addClass("fa fa-minus");
    //create cart item elements, add classes/text/css and use extracted data from variables above when necessary
    var cartImg = $(document.createElement("img")).addClass(imgClass+" cart-list-img").attr("src",imgSrc);
    var cartTitle = $(document.createElement("span")).addClass("cart-list-name").text(title);
    var cartPrice = $(document.createElement("span")).addClass("cart-list-price").text(price);
    var basePrice = $(document.createElement("span")).addClass("base-price").text(price).css("display","none");
    //create cart discard button element, add classes/text/css and use extracted data from variables above when necessary
    var cartDiscard = $(document.createElement("span")).addClass("cart-list-discard discard-from-cart fa fa-lg fa-trash");

    //append counter elements to counter wrapper
    counterWrap.append(plus).append(counter).append(minus);
    //append counter, cart item and discard button elements to cart li element
    cartListItem.append(counterWrap).append(cartImg).append(cartTitle).append(cartPrice).append(basePrice).append(cartDiscard);
    //prepend entire cart li element to cart ul
    $(".cart-list").prepend(cartListItem);

    //update subtotal with extracted price
    subtotal = subtotal + parseFloat(price.split(" ")[1]);
    //update taxes by multiplying global variable tax with updated subtotal
    taxes = parseFloat(tax*subtotal);
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });
  //create on click function to increase counter
  $(".cart-list").on("click", ".fa.fa-plus", function(){
    //get current counter value
    var counter = $(this).next().text();
    //increase counter by 1
    counter++;
    //add increased value to next element
    $(this).next().text(counter);

    //get base price value and convert to number
    var getPrice = parseFloat($(this).closest("div").parent().find(".base-price").text().replace("$ ",""))
    //calculate final price using base price and counter
    var finalPrice = (getPrice*counter)
    //add final price to cart
    $(this).closest("div").parent().find(".cart-list-price").text("$ "+(finalPrice).toFixed(2));

    //update subtotal and taxes for when counter increases
    subtotal = subtotal + getPrice;
    taxes = subtotal*tax;
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  //create on click function to decrease counter
  $(".cart-list").on("click", ".fa.fa-minus", function(){
    //get current counter value
    var counter = $(this).prev().text();
    //if counter is 1, return the same value
    if (counter==1)
      return;
    //else if decrease counter by 1
    counter--;
    //add decreased value to previous element
    $(this).prev().text(counter);

    //get base price value and convert to number
    var getPrice = parseFloat($(this).closest("div").parent().find(".base-price").text().replace("$ ",""))
    //calculate final price using base price and counter
    var finalPrice = (getPrice*counter)
    //add final price to cart
    $(this).closest("div").parent().find(".cart-list-price").text("$ "+(finalPrice).toFixed(2));

    //update subtotal and taxes for when counter decreases
    subtotal = subtotal - getPrice;
    taxes = subtotal*tax;
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  //create on click function to remove cart item
  $(".cart-list").on("click", ".cart-list-discard.discard-from-cart.fa.fa-lg.fa-trash", function(){
    $(this).parent().remove();
    var getPrice = parseFloat($(this).parent().find(".cart-list-price").text().split(" ")[1]);

    //update subtotal and taxes for when item is removed
    subtotal = subtotal - getPrice;
    taxes = subtotal*tax;
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  //function called on throughout script tp update prices
  function updateTotal(subtotal, taxes){
    $(".subtotal-number").text("$ "+ subtotal.toFixed(2));
    $(".tax-number").text("$ "+ taxes.toFixed(2));
    $(".total-number").text("$ "+ (subtotal+taxes).toFixed(2));
  }

});
