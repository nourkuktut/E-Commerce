import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getAllCategoriees() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isError, error, isLoading, isFetched } = useQuery({
    queryKey: "getCategories",
    queryFn: getAllCategoriees,
  });
  // console.log(data?.data?.data);

  if (isLoading) {
    <Loading />;
  }
  if (isError) {
    <h2>FE error {error}</h2>;
  }
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.data?.data.map((category) => {
          return (
            <>
              <div className=" text-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="h-80">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover mt-4"
                  />
                </div>
                <div className="p-4 text-center bg-gradient-to-r from-blue-500 to-purple-600">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
