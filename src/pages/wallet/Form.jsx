import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import ShowError from "../../common/ShowError";
import SimpleReactValidator from "simple-react-validator";
import { userList } from "../../toolkit/action/userAction";
import { sendMoney, txn_list } from "../../toolkit/action/authAction";

const Form = (props) => {
  const dispatch = useDispatch();
  const { active, title } = props;
  const [errors, setErrors] = useState({});
  const [formInput, setFormInput] = useState({});
  const { users } = useSelector((state) => state.userReducer);
  const { responseStatus } = useSelector((state) => state.authReducer);

  // validator
  const validator = new SimpleReactValidator({
    validators: {
      number: {
        message: "The :attribute must be a number.",
        rule: function (val, params, validator) {
          return (
            validator.helpers.testRegex(val, /^\d+(\.\d+)?$/) &&
            params.indexOf(val) === -1
          );
        },
      },
    },
  });

  // handle change
  const handleChange = (event) => {
    setErrors({ ...errors, [event.target.name]: "" });
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validator.allValid()) {
      const payload = {
        type: active,
        title,
        ...formInput,
        username: formInput?.username?.value,
      };
      dispatch(
        sendMoney({
          payload,
          callback: () => {
            setFormInput({
              amount: "",
              remarks: "",
              username: {},
            });
            dispatch(txn_list());
          },
        })
      );
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  const options = users.map((item) => {
    return {
      value: item._id,
      label: `${item.firstName} ${item.lastName} (${item.phone})`,
    };
  });

  // useffect
  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  return (
    <div className="bg-white my-3 shadow-md p-4 rounded">
      <form onSubmit={handleSubmit} className="text-sm sm:w-1/2 grid gap-3">
        {/* amount */}
        <div className="grid gap-1">
          <label htmlFor="username">Username</label>
          <Select
            options={options}
            name="username"
            value={formInput?.username}
            onChange={(event) =>
              handleChange({ target: { name: "username", value: event } })
            }
          />
          {/* <select
            id="username"
            name="username"
            value={formInput?.username}
            onChange={handleChange}
            className="block w-full px-3 appearance-none py-1.5 bg-transparent outline-none border rounded-md"
          >
            <option>Select User</option>
            {users.map((item) => {
              return (
                <option value={item._id}>
                  {`${item.firstName} ${item.lastName} (${item.phone})`}
                </option>
              );
            })}
          </select> */}
          {validator.message("username", formInput?.username, "required")}
          <ShowError data={errors?.username} />
          {users.map(
            (item) =>
              item._id === formInput?.username?.value && (
                <div>
                  <span className="text-purple-600 font-semibold tracking-wider">
                    Balance
                  </span>
                  : {item.wallet[title]}
                </div>
              )
          )}
        </div>

        {/* amount */}
        <div className="grid gap-1">
          <label htmlFor="amount" className="capitalize">
            {active} Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formInput?.amount}
            onChange={handleChange}
            className="block w-full px-3 py-1.5 bg-transparent outline-none border rounded-md"
          />
          {validator.message("amount", formInput?.amount, "required|number")}
          <ShowError data={errors?.amount} />
        </div>

        {/* remarks */}
        <div className="grid gap-1">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            rows={6}
            type="text"
            id="remarks"
            name="remarks"
            value={formInput?.remarks}
            onChange={handleChange}
            className="block w-full px-3 py-1.5 bg-transparent outline-none border rounded-md"
          />
          {validator.message("remarks", formInput?.remarks, "required")}
          <ShowError data={errors?.remarks} />
        </div>

        {(responseStatus === 3 || responseStatus === 0) && (
          <div className="grid gap-1">
            <label htmlFor="otp" className="capitalize">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formInput?.otp}
              onChange={handleChange}
              className="block w-full px-3 py-1.5 bg-transparent outline-none border rounded-md"
            />
            {validator.message("otp", formInput?.otp, "required|number")}
            <ShowError data={errors?.otp} />
          </div>
        )}

        {/* buttons */}
        <div className="grid grid-cols-3 mt-1 gap-5">
          <button
            type="submit"
            className="w-full px-5 py-2 text-sm font-medium tracking-wide text-white capitalize  bg-color duration-300 flex items-center justify-center transform  rounded-md bg-button focus:outline-none "
          >
            {active}
          </button>
          {/* <button
            onClick={() => setFormInput({})}
            className="w-full px-5 py-2 text-sm font-medium tracking-wide text-color border border-color capitalize  bg-white duration-300 flex items-center justify-center transform  rounded-md bg-button focus:outline-none "
          >
            Clear
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Form;
