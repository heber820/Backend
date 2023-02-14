import { cartsModel } from "../models/carts.model.js";
import fs from "fs";

export class CartManager {
  async getCarts() {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  async addCart(objCart) {
    try {
      const newCart = await cartsModel.create(objCart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(idCart) {
    try {
      const read = await this.getCarts();
      const cart = read.find((c) => c.id === idCart);
      if (cart) {
        console.log(cart);
        return cart;
      } else {
        return "Cart not found";
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
