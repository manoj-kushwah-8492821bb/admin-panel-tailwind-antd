import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import TopBar from "../../common/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { merchantList } from "../../toolkit/action/userAction";
import Pagination from "../../common/Pagination";
import { IMAGE_URL } from "../../utils/endpoints";
import Loader from "../../common/Loader";

const Merchants = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { merchants, fetchLoad } = useSelector((state) => state.userReducer);

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = merchants?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useffect
  useEffect(() => {
    dispatch(merchantList(`?status=accept`));
  }, [dispatch]);

  return (
    <div>
      <TopBar title="Merchants" />
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y w-full text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  User
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Business
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  About
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Shop Time
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Address
                </th>
              </tr>
            </thead>
            {fetchLoad ? (
              <td colSpan={6} className="py-6">
                <Loader />
              </td>
            ) : (
              <tbody className="divide-y">
                {merchants?.slice(trimStart, trimEnd).map((item) => {
                  return (
                    <tr key={item._id} className="text-xs ">
                      <td className="px-4 py-3">
                        <div>
                          {item.userId.firstName} {item.userId.lastName}
                        </div>
                        <a
                          href={`tel:+91${item.userId.phone}`}
                          target="_blank"
                          className="text-color underline">
                          +91{item.userId.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            alt={item._id}
                            src={
                              item.image
                                ? `${IMAGE_URL}${item.image}`
                                : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                            }
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div>{item.businessName}</div>
                            <a
                              href={`https://wa.me/91${item.waNumber}`}
                              target="_blank"
                              className="text-color underline">
                              WA : +91{item.waNumber}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {item.about.slice(0, 20)}
                        {item.about.length > 20 && "..."}
                      </td>
                      <td className="px-4 py-3">
                        {item.businessTimeFrom} - {item.businessTimeTo}
                      </td>
                      <td className="px-4 py-3">
                        {item.storeAddress}, {item.city}, {item.state}{" "}
                        {item.postalCode}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          <Pagination
            handlePrev={handlePrev}
            from={trimStart}
            to={trimEnd}
            total={totalItems}
            handleForw={handleForw}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout(Merchants);
