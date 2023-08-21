import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../../layouts";
import TopBar from "../../../common/TopBar";
import Button from "../../../common/Button";
import { useDispatch } from "react-redux";
import { merchantSatusUpdate } from "../../../toolkit/action/userAction";

const ViewMerchant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleStatusUpdate = (payload) => {
    dispatch(
      merchantSatusUpdate({
        payload,
        callback: () => navigate("/merchants/request-list"),
      })
    );
  };
  return (
    <div>
      {" "}
      <TopBar
        title="Merchant Details"
        text="Back"
        action={() => navigate("/merchants/request-list")}
        icon={<BiArrowBack className="text-sm mr-1" />}
      />
      {/* product view */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="p-1">
          <h4 className="">Business Information :</h4>
          <h1 className="title-font mt-3 text-lg font-medium text-gray-900">
            {state?.businessName}
          </h1>
          <p className="leading-relaxed text-sm mb-3">{state?.about}</p>

          {/* Price */}
          <div className="flex uppercase text-sm tracking-wide items-center mb-5 gap-3 ">
            Time : {state.businessTimeFrom} - {state.businessTimeTo}
          </div>

          {state.status === "pending" && (
            <div className="flex gap-2">
              <Button
                text="Accept"
                action={() =>
                  handleStatusUpdate({
                    status: "accept",
                    userId: state.userId._id,
                  })
                }
              />
              <button className="bg-gray-200 text-sm uppercase flex items-center gap-0.5 p-1.5 px-3 rounded">
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout(ViewMerchant);
