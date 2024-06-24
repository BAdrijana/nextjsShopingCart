import Link from "next/link";
import Image from "next/image";
import React from "react";
import ProductRate from "./ProductRate";
import AddToCart from "./AddToCart";

function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.id}`}>
        <Image
          src={`${product.image}`}
          width={300}
          height={300}
          alt={product.name}
          className="rounded object-cover h-96 w-full p-3"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.id}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <ProductRate rate={product.rating} count={product.numReviews} />
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>

        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
}

export default ProductItem;
