import React, { memo } from "react";
import { FiEdit } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { AiFillEye, AiOutlineTeam } from "react-icons/ai";

const Options = (props) => {
  const {
    handleEdit,
    handleDelete,
    handleView,
    handleWallet,
    handleViewTeam,
    handleRank,
  } = props;

  return (
    <div className="rounded z-50 text-base items-center  right-20 text-color gap-3 flex ">
      {/* Update */}
      {handleEdit && (
        <span title="Update" onClick={handleEdit} className="cursor-pointer">
          <FiEdit />
        </span>
      )}

      {/* View */}
      {handleView && (
        <span
          title="View"
          onClick={handleView}
          className="cursor-pointer text-xl"
        >
          <AiFillEye />
        </span>
      )}

      {/* View Team */}
      {handleViewTeam && (
        <span
          title="Teams"
          onClick={handleViewTeam}
          className="cursor-pointer text-lg"
        >
          <AiOutlineTeam />
        </span>
      )}

      {/* Delete */}
      {handleDelete && (
        <span
          title="Delete"
          onClick={handleDelete}
          className="cursor-pointer text-lg"
        >
          <BiTrashAlt />
        </span>
      )}

      {/* update Wallet */}
      {handleWallet && (
        <span
          title="Wallet"
          onClick={handleWallet}
          className="cursor-pointer text-lg"
        >
          <FaWallet />
        </span>
      )}

      {/* Rank Update */}
      {handleRank && (
        <span
          title="Update Rank"
          onClick={handleRank}
          className="cursor-pointer text-lg"
        >
          <BsCheck2Circle />
        </span>
      )}
    </div>
  );
};

export default memo(Options);
