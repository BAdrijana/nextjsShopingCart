"use client";
import "@smastrom/react-rating";
import { Rating } from "@smastrom/react-rating";
import React from "react";
// type ProductRateProps = { rate: number; count: number };

function ProductRate({ rate, count }) {
  return (
    <div className="flex">
      <Rating style={{ maxWidth: 100 }} value={rate} readOnly />
      {count} reviews
    </div>
  );
}

export default ProductRate;
