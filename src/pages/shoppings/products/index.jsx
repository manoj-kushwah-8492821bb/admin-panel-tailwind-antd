import Layout from "../../../layouts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  publishProduct,
} from "../../../toolkit/action/shoppingAction";
import { IMAGE_URL } from "../../../utils/endpoints";
import Toggle from "../../../common/Toggle";
import TopBar from "../../../common/TopBar";
import Pagination from "../../../common/Pagination";
import Options from "../../../common/Options";
import { useNavigate } from "react-router-dom";
import Searchbox from "../../../common/Searchbox";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userDateList, setData] = useState();
  const { productsList, fetchLoad } = useSelector(
    (state) => state.shoppingReducer
  );

  const handlePublish = (payload) => {
    dispatch(
      publishProduct({ payload, callback: () => dispatch(fetchProducts()) })
    );
  };

  // sort unction
  const handleSort = () => {
    const sortedWords = productsList
      .filter((item) => item?.name)
      .slice()
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      });

    productsList.filter((item) => item?.name === null);
    setData(sortedWords);
  };

  const reverseHandleSort = () => {
    const sortedWords = productsList
      .filter((item) => item.name)
      .slice()
      .sort((a, b) => {
        return b.name.localeCompare(a.name, undefined, {
          sensitivity: "base",
        });
      });

    productsList.filter((item) => item?.name === null);
    setData(sortedWords);
  };
  //...................... filter
  const filteredData =
    searchValue.length === 0
      ? userDateList
        ? userDateList
        : productsList
      : productsList.filter((item) =>
          `${item.name} `
            .toLocaleLowerCase()
            .includes(searchValue?.toLocaleLowerCase())
        );

  //..................... Pagination Logic
  const perPageItems = 10;
  const totalItems = filteredData?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  //.................... useEffect
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <TopBar title="Products" />
      {/*................. Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <Searchbox
          title="name"
          value={searchValue}
          handleChange={(event) => setSearchValue(event?.target?.value)}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead className="bg-gray-100 title-font tracking-wider text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl">Image</th>
                <td className="p-4 title-font tracking-wider font-medium text-sm  text-gray-900  bg-gray-100 flex-row items-center flex ">
                  <span className="title-font tracking-wider font-medium text-sm mr-3">
                    Name
                  </span>
                  <BsArrowUp
                    className="cursor-pointer"
                    onClick={() => {
                      reverseHandleSort();
                    }}
                  />
                  <BsArrowDown
                    className="cursor-poinsubCategoriester"
                    onClick={() => {
                      handleSort();
                    }}
                  />
                </td>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Publish</th>
                <th className="px-4 py-3 rounded-tr ">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredData.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm">
                    <td className="px-4 py-3">
                      {item.productImage.length > 0 ? (
                        <div className="flex items-center">
                          {item.productImage.slice(0, 3).map((image) => {
                            return (
                              <img
                                className="object-cover w-6 h-6 -mx-1 border rounded-full border-blue-500 shrink-0"
                                src={`${IMAGE_URL}/${image}`}
                                alt=""
                              />
                            );
                          })}
                          {item.productImage.length > 3 && (
                            <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              {item.productImage.length - 3}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center">---</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.productName.slice(0, 20)}
                      {item.productName.length > 20 && "..."}
                    </td>
                    <td className="px-4 py-3">
                      {item.productDesc.slice(0, 20)}{" "}
                      {item.productDesc.length > 20 && "..."}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div>Price : {item.productActualPrice}</div>
                        <div>Sale Price : {item.productSalePrice}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Toggle
                        id={item._id}
                        handleChange={(event) =>
                          handlePublish({
                            productId: item._id,
                            isPublish: event.target.checked ? "1" : "0",
                          })
                        }
                        value={item.isPublish}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Options
                        handleView={() =>
                          navigate("/shopping/product/view", { state: item })
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            handlePrev={handlePrev}
            from={trimStart}
            to={trimEnd}
            total={totalItems}
            handleForw={handleForw}
            fetchLoad={fetchLoad}
          />
        </div>
      </div>
    </>
  );
};

export default Layout(Products);
