// import React, { useState, useEffect } from "react";
// import RetreatItemCard from "./RetreatItemCard";
// import Loading from "./LoadingIndicator";
// import Pagination from "./Pagination";

// const RetreatList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8); // Number of items per page
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
//         );
//         const data = await response.json();
//         setProducts(data);
//         setFilteredProducts(data); // Initialize filteredProducts with all products
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     const filtered = products.filter((product) =>
//       product.title.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       <div className="sm:w-[95%] m-auto flex flex-col sm:flex-row justify-between mt-4">
//         <div className="flex flex-col sm:flex-row">
//           <select className="cursor-pointer bg-indigo-900 rounded-sm m-4 text-white px-5 py-2">
//             <option value="date">Sort by Date</option>
//             <option value="as">As</option>
//             <option value="ds">Ds</option>
//           </select>
//           <select className="cursor-pointer bg-indigo-900 rounded-sm m-4 text-white px-5 py-2">
//             <option value="date">Filter by type</option>
//             {products.map((product) => (
//               <option key={product.id} value={product.type}>
//                 {product.type}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Search input */}
//         <div className="flex mt-4 sm:mt-0">
//           <input
//             className="cursor-pointer bg-indigo-900 rounded-sm w-[93%] m-auto text-white px-5 py-1.5"
//             placeholder="Search Result by Title"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {currentItems.map((product) => (
//               <RetreatItemCard key={product.id} item={product} />
//             ))}
//           </div>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
//             onPageChange={paginate}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default RetreatList;
import React, { useState, useEffect } from "react";
import RetreatItemCard from "./RetreatItemCard";
import Loading from "./LoadingIndicator";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer";

const RetreatList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState(""); // To handle sorting (date, type, etc.)
  const [filterBy, setFilterBy] = useState(""); // To handle filtering (location, type, etc.)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats";
        if (filterBy) {
          apiUrl += `?${filterBy}`;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterBy]); // Fetch data again when filterBy changes

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset pagination to first page when search query changes
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    let sortedProducts = [...filteredProducts];

    switch (sortValue) {
      case "date":
        sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "type":
        sortedProducts.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
    setCurrentPage(1); // Reset pagination to first page when sorting changes
  };

  return (
    <div>
      <div className="sm:w-[95%] m-auto flex flex-col sm:flex-row justify-between mt-4">
        <div className="flex flex-col sm:flex-row">
          <select
            className="  bg-gray-300 cursor-pointer text-black sm:bg-blue-950 rounded-sm m-4 sm:text-white px-5 py-2"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="">Sort by...</option>
            <option value="date">Date</option>
            <option value="type">Type</option>
          </select>
          <select
            className=" bg-gray-300 text-black cursor-pointer sm:bg-blue-950 rounded-sm m-4 sm:text-white px-5 py-2"
            onChange={(e) => setFilterBy(e.target.value)}
            value={filterBy}
          >
            <option value="">Filter by...</option>
            
            <option value="location=Pune">Pune</option>
            <option value="location=Goa">Goa</option>
            <option value="location=Mumbai">Mumbai</option>
            <option value="location=Delhi">Delhi</option>
            <option value="location=Kerala">Kerala</option>
            <option value="condition=Weight Loss">Weight Loss</option>
            <option value="condition=General Fitness">General Fitness</option>
            <option value="condition=Mental Wellness">Mental Wellness</option>
            <option value="condition=Stress Relief">Stress Relief</option>
            <option value="condition=Detox">Detox</option>

          </select>
        </div>
        {/* Search input */}
        <div className="flex mt-4 sm:mt-0">
          <input
            className=" text-black bg-gray-300 cursor-pointer sm:bg-blue-950 sm:border-none rounded-sm w-[93%] m-auto sm:text-white px-5 py-1.5"
            placeholder="Search Result by Title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentItems.map((product) => (
              <RetreatItemCard key={product.id} item={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={paginate}
          />
        </>
      )}
    </div>
  );
};

export default RetreatList;
