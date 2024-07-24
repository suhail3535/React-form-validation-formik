// src/components/RetreatItem.js
import React from 'react';

const RetreatItemCard = ({retreat}) => {
  return (
    <div  className="hover:bg-slate-100 cursor-pointer rounded overflow-hidden shadow-lg m-4">
      <img className="w-[100%] h-48 m-auto" src={retreat.image} alt={retreat.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{retreat.title}</div>
        <p className="text-gray-700 text-base">{retreat.description}</p>
        <p className="text-gray-700">Date: {retreat.date}</p>
        <p className="text-gray-700">Location: {retreat.location}</p>
        <p className="text-gray-700">Price: ${retreat.price}</p>
      </div>
    </div>
  );
};

export default RetreatItemCard;
