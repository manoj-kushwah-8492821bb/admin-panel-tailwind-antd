import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../../layouts";
import TopBar from "../../../common/TopBar";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <div>
      <TopBar
        title="Product Details"
        text="Back"
        action={() => navigate("/shopping/products")}
        icon={<BiArrowBack className="text-sm mr-1" />}
      />

      {/* product view */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="p-1">
          <h2 className="tracking-widest text-xs flex justify-between title-font font-medium text-gray-400 mb-1">
            <span> {state?.subcategoryId?.name}</span>
            <span className="uppercase text-color bg-gray-50 p-1 px-2 rounded-full">
              {state?.isPublish ? "Published" : "UnPublished"}
            </span>
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {state?.productName}
          </h1>
          <p className="leading-relaxed mb-3">{state?.productDesc}</p>

          {/* Price */}
          <div className="flex uppercase text-sm tracking-wide items-center mb-5 gap-3 ">
            <del className="text-gray-500">₹ {state?.productActualPrice}</del>
            <div>₹ {state?.productSalePrice}</div>
          </div>

          {/* Sizes */}
          <div className="flex items-center mb-3 gap-3 ">
            <h4 className="text-gray-900">Size : </h4>
            <div className="flex gap-2 uppercase tracking-wide">
              {state?.size?.map((item) => (
                <span
                  key={item}
                  className="text-xs py-0.5 px-3 bg-gray-50 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex items-center mb-3 gap-3 ">
            <h4 className="text-gray-900">Colors : </h4>
            <div className="flex gap-2 capitalize tracking-wide">
              {state?.color?.map((item) => (
                <span
                  key={item}
                  className="text-xs py-0.5 px-3 bg-gray-50 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-3 ">
            <h4 className="text-gray-900">Tags : </h4>
            <div className="flex gap-2 capitalize tracking-wide">
              {state?.tags?.map((item) => (
                <span
                  key={item}
                  className="text-xs py-0.5 px-3 bg-gray-50 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout(ViewProduct);
