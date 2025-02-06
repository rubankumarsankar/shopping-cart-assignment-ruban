const axios = require("axios");

const PRICE_API_BASE = "http://localhost:3001/products/";

class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  // Fetch product price from API
  async fetchPrice(productName) {
    try {
      const response = await axios.get(`${PRICE_API_BASE}${productName}`);
      return response.data.price;
    } catch (error) {
      throw new Error(`Failed to fetch price for ${productName}`);
    }
  }

  // Add a product to the cart
  async addProduct(productName, quantity) {
    const price = await this.fetchPrice(productName);
    const existingItem = this.cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ name: productName, quantity, price });
    }
  }

  // Get cart totals
  getCartState() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = parseFloat((subtotal * 0.125).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));

    return {
      items: this.cart,
      subtotal,
      tax,
      total,
    };
  }
}

module.exports = ShoppingCart;
