import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ShowError from "../../common/ShowError";
import ButtonLoader from "../../common/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {
  createAreas,
  fetchAreas,
  updateAreas,
} from "../../toolkit/action/shoppingAction";

const Form = ({ handleCloseModal, isOpen, editData }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.serviceReducer);

  // validator
  const validator = new SimpleReactValidator({
    className: "text-danger",
    validators: {
      number: {
        message: "The :attribute must be a number.",
        rule: function (val, params, validator) {
          return (
            validator.helpers.testRegex(val, /^\d+$/) &&
            params.indexOf(val) === -1
          );
        },
      },
    },
  });

  // handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });
    setFormInput({ ...formInput, [name]: value });
  };

  // handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validator.allValid()) {
      if (editData) {
        dispatch(
          updateAreas({
            payload: { pinCodeId: editData._id, ...formInput },
            callback: () => {
              setFormInput({});
              setErrors({});
              handleCloseModal();
              dispatch(fetchAreas());
            },
          })
        );
      } else {
        dispatch(
          createAreas({
            payload: formInput,
            callback: () => {
              setFormInput({});
              setErrors({});
              handleCloseModal();
              dispatch(fetchAreas());
            },
          })
        );
      }
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  useEffect(() => {
    if (editData) {
      console.log(editData);
      const { pinCode, deliveryCharge } = editData;
      setFormInput({ pinCode, deliveryCharge });
    }
  }, [editData]);

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/* Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">
              {editData ? "Update" : "Add"} Service Area
            </span>
            <MdClose
              className="text-xl cursor-pointer"
              onClick={() => {
                setErrors({});
                setFormInput({});
                handleCloseModal();
              }}
            />
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            {/*  Title */}
            <div className="grid gap-1">
              <label htmlFor="pinCode" className="text-sm">
                Pin Code
              </label>
              <input
                autoComplete="off"
                id="pinCode"
                type="text"
                placeholder="Enter postal code"
                name="pinCode"
                value={formInput?.pinCode}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message(
                "pinCode",
                formInput?.pinCode,
                "required|number|min:4|max:6"
              )}
              <ShowError data={errors.pinCode} />
            </div>

            {/*  Delivery Charge */}
            <div className="grid gap-1">
              <label htmlFor="deliveryCharge" className="text-sm">
                Delivery Charge
              </label>
              <input
                autoComplete="off"
                id="deliveryCharge"
                type="text"
                placeholder="Enter Delivery Charge"
                name="deliveryCharge"
                value={formInput?.deliveryCharge}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message(
                "deliveryCharge",
                formInput?.deliveryCharge,
                "required|number"
              )}
              <ShowError data={errors.deliveryCharge} />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-color justify-center flex items-center cursor-pointer tracking-wider py-2 px-4 mt-2 rounded text-white"
            >
              {loading ? <ButtonLoader /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Form;
