import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import Image from "next/image";

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeToCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  console.log(itemsPrice, cartItems);
  return (
    <div className="fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-gray-700 overflow-scroll">
      {loading ? (
        <div>Loading,...</div>
      ) : cartItems.length === 0 ? (
        <div>Empty</div>
      ) : (
        <div className="p-2 flex flex-col items-center border-b boredr-b-gray-600">
          <div>Subtotal</div>
          <div className="font-bold text-orange-700">${itemsPrice}</div>
          <Link
            href="/cart"
            className="w-full text-center p-1 rounded-2xl borfer-2"
          >
            Cart
          </Link>
        </div>
      )}
      {cartItems.map((item) => {
        return (
          <div
            key={item.id}
            className="flex flex-col items-center m-1 border-b border-b-gray-600"
          >
            <Link href={`/product/${item.id}`} className="">
              <Image
                src={item.image}
                alt={item.name}
                className="p-1"
                height={50}
                width={50}
              ></Image>
            </Link>
            <select
              value={item.qty}
              onChange={(e) => addToCartHandler(item, Number(e.target.value))}
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button
              className="default-button  mt-2"
              onClick={() => removeToCartHandler(item.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
