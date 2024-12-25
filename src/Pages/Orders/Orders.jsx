import { useContext, useState } from "react";
import img1 from "../../assets/imgs/img1.jpeg";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);

  let dataToken = jwtDecode(token);
  //! or let {id}

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${dataToken.id}`,
        method: "GET",
      };

      let { data } = await axios.request(options);
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      {orders ? (
        <section className="p-6 bg-gray-50 rounded-lg shadow-md">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border mt-8  border-gray-800 rounded-lg overflow-hidden"
            >
              <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
                <div>
                  <h2 className="text-md font-medium text-gray-800">
                    Order Id :
                  </h2>
                  <span className="text-xl font-bold text-gray-800">
                    #{order.id}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {order.isPaid ? (
                    <span className="text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 px-3 py-1 rounded-full shadow">
                      paid
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full shadow">
                      Unpaid
                    </span>
                  )}

                  {order.isDelivered ? (
                    <span className="text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 px-3 py-1 rounded-full shadow">
                      Received
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full shadow">
                      Under Delivery
                    </span>
                  )}
                </div>
              </header>

              <div className="grid p-6 mt-3  gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.product.imageCover}
                      alt="Product"
                      className="w-full "
                    />
                    <div className="p-4">
                      <Link to={`/product/${product.product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                          {product.product.title}
                        </h3>
                      </Link>

                      <div className="flex justify-between gap-2 items-center text-gray-600">
                        <p>
                          <span className="font-bold text-gray-700">
                            Count:
                          </span>
                          {product.count}
                        </p>
                        <span className=" text-primary-900">
                          {product.price} L.E
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className=" text-lg my-4 mx-4">
                Your Total Order Price Is :
                <span className=" mx-1 font-bold text-primary-800">
                  {order.totalOrderPrice}
                </span>
                L.E
              </p>
            </div>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
