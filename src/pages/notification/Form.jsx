import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";

import ShowError from "../../common/ShowError";
import ButtonLoader from "../../common/ButtonLoader";
import {
  notificationList,
  pushNotification,
} from "../../toolkit/action/notificationAction";

const Form = ({ handleCloseModal, isOpen }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.notificationReducer);

  // validator
  const validator = new SimpleReactValidator();

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
      dispatch(
        pushNotification({
          payload: formInput,
          callback: () => {
            setFormInput({});
            dispatch(notificationList());
            handleCloseModal();
          },
        })
      );
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/* Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">Push Notification</span>
            <MdClose
              className="text-xl cursor-pointer"
              onClick={() => {
                setFormInput({});
                handleCloseModal();
              }}
            />
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            {/* Title */}
            <div className="grid gap-1">
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <input
                autoComplete="off"
                id="title"
                type="text"
                name="title"
                value={formInput?.title}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("title", formInput?.title, "required")}
              <ShowError data={errors.title} />
            </div>

            {/* Content*/}
            <div className="grid gap-1">
              <label htmlFor="content" className="text-sm">
                Description
              </label>
              <textarea
                autoComplete="off"
                id="content"
                rows={6}
                name="content"
                value={formInput?.content}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("content", formInput?.content, "required")}
              <ShowError data={errors.content} />
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
