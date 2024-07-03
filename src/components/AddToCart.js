"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useRouter } from "next/navigation";

function AddToCart({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    let newQty = qty;
    if (increasePerClick) {
      const existItem = cartItems.find((x) => x.id === product.id);
      if (existItem) {
        if (existItem.qty + 1 <= product.countInStock)
          newQty = existItem.qty + 1;
        else return alert("no more product");
      }
    }
    dispatch(addToCart({ ...product, qty: newQty }));
    if (redirect) router.push("/cart");
  };

  // useEffect(() => {
  //   dispatch(hideLoading());
  // }, [dispatch]);
  return (
    <div>
      {product.countInStock > 0 && showQty && (
        <div className="mb-2 flex justify-between">
          <div>qty</div>
          <div>
            <select value={qty} onChange={(e) => setQty(e.target.value)}>
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>
      )}
      <div>
        {product.countInStock > 0 ? (
          <button onClick={addToCartHandler}>AddToCart</button>
        ) : (
          <button disabled>Out of stuck</button>
        )}
      </div>
    </div>
  );
}

export default AddToCart;
