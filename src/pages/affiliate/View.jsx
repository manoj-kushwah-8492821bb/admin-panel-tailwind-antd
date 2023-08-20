import React from "react";
import Layout from "../../layouts";
import Button from "../../common/Button";
import { BiArrowBack } from "react-icons/bi";
import { CustomCard } from "../../common/Classes";
import { IMAGE_URL } from "../../utils/endpoints";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <div>
      {/* top */}
      <div className="flex mb-5 justify-between">
        <div>Affiliate Details</div>
        <Button
          icon={<BiArrowBack />}
          action={() => navigate("/affiliate")}
          text="Back"
        />
      </div>

      {/* section */}
      <div className={`${CustomCard}`}>
        <div class="">
          <img
            class="lg:h-60 mb-3 md:h-40 w-full object-cover object-center"
            src={`${IMAGE_URL}${state.image}`}
            alt={state.name}
          />
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
            {state.link}
          </h2>
          <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
            {state.name}
          </h1>
          <p class="leading-relaxed mb-3">{state.description}</p>
          <div class="flex items-center flex-wrap ">
            <a
              href={state.link}
              target="_blank"
              class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Try Now
              <svg
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout(View);
