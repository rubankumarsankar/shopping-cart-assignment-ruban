const ShoppingCart = require("./shoppingCart");

(async () => {
  const cart = new ShoppingCart();

  await cart.addProduct("cheerios", 2);
  await cart.addProduct("cornflakes", 1);
  await cart.addProduct("frosties", 1);
//   await cart.addProduct("shreddies", 1);
//   await cart.addProduct("weetabix", 1);

  console.log(cart.getCartState());
})();
