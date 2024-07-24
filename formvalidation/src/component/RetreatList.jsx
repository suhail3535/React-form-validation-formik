import React, { useState, useEffect } from "react";
import RetreatItem from "./RetreatItemCard";
import RetreatItemCard from "./RetreatItemCard";

const RetreatList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
        );

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="sm:w-[95%] m-auto flex flex-col sm:flex-row justify-between mt-4">
        <div className="flex flex-col sm:flex-row">
          <select className=" cursor-pointer bg-indigo-900 rounded-sm m-4 text-white px-5 py-2">
            <option value="date">Sort by Date</option>
            {products.map((product) => (
         <option value="type">{product.date}</option>
        ))}
          </select>
          <select className=" cursor-pointer bg-indigo-900 rounded-sm m-4 text-white px-5 py-2">
            <option value="date">Filter by type</option>
            {products.map((product) => (
         <option value="type">{product.type}</option>
        ))}
            
          </select>
        </div>

        {/* Search input */}
        <div className="flex mt-4 sm:mt-0">
          <input
            className=" cursor-pointer bg-indigo-900 rounded-sm w-[93%] m-auto text-white px-5 py-1.5"
            placeholder="Search Result by Title"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {/* Displaying products */}
        {products.map((product) => (
          <RetreatItemCard key={product.id} retreat={product} />
        ))}
      </div>
    </div>
  );
};

export default RetreatList;
