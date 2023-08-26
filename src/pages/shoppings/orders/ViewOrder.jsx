import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../../layouts";
import TopBar from "../../../common/TopBar";
import Button from "../../../common/Button";
import {
  createOrder,
  updateOrder,
} from "../../../toolkit/action/shoppingAction";
import ButtonLoader from "../../../common/ButtonLoader";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [reason, setReason] = useState("");
  const [isCancel, setIsCancel] = useState(false);
  const { loading } = useSelector((state) => state.shoppingReducer);

  //.................. handle status
  const handleStatus = async (status) => {
    const payload = {
      orderId: state?._id,
      status,
      actionBy: "Admin",
      reason,
    };
    const result = await dispatch(updateOrder(payload));
    if (result.payload.ResponseStatus == 1) {
      navigate("/shopping/orders");
    }
  };

  // .................. handle create in shiprocket
  const handleCreate = () => dispatch(createOrder({ orderId: state._id }));

  return (
    <div>
      <TopBar
        title="Order Details"
        text="Back"
        action={() => navigate("/shopping/orders")}
        icon={<BiArrowBack className="text-sm mr-1" />}
      />

      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        {/*................. Product Details */}
        <div className="py-2.5">
          <h3 className=" font-semibold tracking-wider">Product Details :</h3>
          <div className="py-4 grid sm:grid-cols-2 gap-3 text-gray-800 border-gray-300 rounded-md">
            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Quantity : </span>
              <span className="">{state?.quantity} Items</span>
            </p>
            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Size : </span>
              <span className="">{state?.size}</span>
            </p>
            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Total Price : </span>
              <span className="">₹ {state?.totalPrice}</span>
            </p>
            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">
                Payment Method :{" "}
              </span>
              <span className="">{state?.paymentMethod}</span>
            </p>
            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Order Date : </span>
              <span className="">
                {moment(state?.orderDate).format("Do MMMM YYYY, h:mm:ss a")}
              </span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">
                Expected Delivery Date :{" "}
              </span>
              <span className="">
                {moment(state?.deliveryDate).format("Do MMMM YYYY, h:mm:ss a")}
              </span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Color : </span>
              <span className="">{state?.color}</span>
            </p>
          </div>
        </div>
        <hr />
        {/*....................... Shipping Address */}
        <div className="py-2.5">
          <h3 className=" font-semibold tracking-wider">Shipping Address :</h3>
          <div className="py-4 grid sm:grid-cols-2 gap-3 text-gray-800 border-gray-300 rounded-md">
            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">City : </span>
              <span className="">{state?.shippingAddress?.city}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">State : </span>
              <span className="">{state?.shippingAddress?.state}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Postal Code : </span>
              <span className="">{state?.shippingAddress?.postalCode}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Area : </span>
              <span className="">{state?.shippingAddress?.area}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">House No : </span>
              <span className="">{state?.shippingAddress?.houseNo}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Full Name : </span>
              <span className="">{state?.shippingAddress?.fullName}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Phone : </span>
              <span className="">{state?.shippingAddress?.phone}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">
                Alternate Phone :{" "}
              </span>
              <span className="">{state?.shippingAddress?.alternatePhone}</span>
            </p>

            <p className="bg-gray-100 p-2.5 rounded gap-2 flex flex-wrap">
              <span className="text-color font-semibold">Address Type : </span>
              <span className="">{state?.shippingAddress?.addressType}</span>
            </p>
          </div>

          {/*....................... reason if he wants to cancel */}
          {isCancel ? (
            <>
              <div className="grid gap-1">
                <label htmlFor="reason" className="text-sm">
                  Please tell us reason why you want to cancel
                </label>
                <textarea
                  autoComplete="off"
                  id="reason"
                  name="reason"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell us"
                  className="rounded max-w-sm py-1.5 px-2 outline-none border placeholder:text-sm"
                />
              </div>{" "}
              <div className=" flex gap-2 mt-5">
                <Button action={() => handleStatus("rejected")} text="Submit" />
                <button
                  type="button"
                  onClick={() => setIsCancel(false)}
                  className="rounded py-1 px-3 bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className=" flex gap-2 mt-5">
              <Button
                action={() =>
                  state.status == "canceled requested" &&
                  handleStatus("canceled")
                }
                text={
                  state.status == "canceled requested" ? "Accept" : state.status
                }
              />
              {state?.shipRocketRes?.awb_code === null &&
                state.status === "order placed" && (
                  <button
                    type="button"
                    onClick={() => handleCreate()}
                    className="rounded py-1 px-3 bg-orange-700 text-white"
                  >
                    {loading ? <ButtonLoader /> : "Create Order In Shiprocket"}
                  </button>
                )}
              {state.status == "canceled requested" && (
                <button
                  type="button"
                  onClick={() => setIsCancel(true)}
                  className="rounded py-1 px-3 bg-slate-200"
                >
                  Reject
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout(ViewOrder);
