"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <div>
      <h1 className="text-lg mb-4">Shopping Cart</h1>
      {loading ? (
        <div> Loading... </div>
      ) : cartItems.length === 0 ? (
        <div>
          cart is Empty <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md: gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <th className="p-5 text-left">Product</th>
                <th className="p-5 text-right">Quantity</th>
                <th className="p-5 text-right">Price</th>
                <th className="p-5 ">Action</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td>
                      <Link
                        className="flex items-center"
                        href={`product/${item.id}`}
                      />
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="p-1"
                      />
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      ${item.price}
                      <button
                        className="default-btn"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="cart p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}): $
                    {itemsPrice}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/shipping")}
                    className="primart-btn w-full"
                  >
                    proceed to checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
