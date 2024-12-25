import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";
import BrandCard from "../../Components/BrandCard/BrandCard";

export default function Brands() {
  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isError, error, isFetched, isLoading } = useQuery({
    queryKey: "getBrands",
    queryFn: getAllBrands,
  });
  // console.log(data?.data?.data);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h2>Fe error {error}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.data?.map((brand) => {
          return (
            <>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {brand.name}
                  </h3>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
