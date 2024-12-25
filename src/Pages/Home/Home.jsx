import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import axios from "axios";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  const [products, setproducts] = useState(null);

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    //* بدلا من data.data can use({data:{data}})

    let { data } = await axios.request(options);
    setproducts(data.data);
  }
  // updating phanes
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <HomeSlider />
      <CategorySlider />
      {!products ? (
        <Loading></Loading>
      ) : (
        <section className="my-12">
          <h2 className="mb-3 text-xl text-gray-800 font-semibold">
            Shop All Products
          </h2>
          <div className=" grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-x-3">
            {products.map((product) => (
              <Card productInfo={product} key={product.id} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
