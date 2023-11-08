import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../../layouts";
import TopBar from "../../../common/TopBar";
import Button from "../../../common/Button";
import { useDispatch } from "react-redux";
import { IMAGE_URL } from "../../../utils/endpoints";
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
        action={() => navigate("/merchants/list")}
        icon={<BiArrowBack className="text-sm mr-1" />}
      />
      {/* product view */}
      <div className="w-full bg-white my-3 rounded shadow-md  mx-auto overflow-auto">
        {/* Shop Banner */}
        <img
          src={`${IMAGE_URL}${state.image}`}
          alt=""
          className="w-full object-cover max-h-80"
        />
        <div className="p-3">
          <div className="flex justify-between">
            <h1 className="title-font  text-lg font-medium text-gray-900">
              {state?.businessName}
            </h1>
            <span className="flex text-sm text-gray-400 tracking-wide items-center mb-5 gap-3 ">
              {state.businessTimeFrom ? state.businessTimeFrom : "--:--"} To{" "}
              {state.businessTimeTo ? state.businessTimeTo : "--:--"}
            </span>
          </div>

          <p className="leading-relaxed text-sm mb-3">{state?.about}</p>

          {/* Price */}

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
