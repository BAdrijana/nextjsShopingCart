import { data } from "../../../utils/data";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "../../../components/AddToCart";
import ProductRate from "../../../components/ProductRate";

export default function ProductDetailPage({ params: { id } }) {
  const product = data.products.find((x) => x.id === +id);

  if (!product) {
    return <div>Product not found {id}</div>;
  } else
    return (
      <div>
        <div className="py-5">
          <Link href="/">Back to Products </Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              size="100vw"
              style={{
                width: "auto",
                height: "100%",
              }}
            />
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>
                {" "}
                <ProductRate rate={product.rating} count={product.numReviews} />
              </li>
              <li>
                <hr className="my-3" />
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <AddToCart product={product} redirect={true} />
          </div>
        </div>
      </div>
    );
}
