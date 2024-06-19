import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import useCreateGroup from "../../hooks/useCreateGroup";
import Groups from "./Groups";

const Sidebar = () => {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [groupName, setGroupname] = useState("");
  const { loading, createGroup } = useCreateGroup();

  const handleCreateGroup = async () => {
    await createGroup(groupName);
    setIsCreateGroupOpen(false);
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          {isCreateGroupOpen && (
            <input
              type="text"
              placeholder="Enter Group Name"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setGroupname(e.target.value)}
            />
          )}
          <Groups type={isCreateGroupOpen ? "group" : "normal"} />
          <Conversations type={isCreateGroupOpen ? "group" : "normal"} />
          <div className="flex mt-auto justify-between">
            <LogoutButton />
            {/* create group btn */}
            {isCreateGroupOpen || (
              <IoMdPersonAdd
                className="w-6 h-6 text-white cursor-pointer"
                onClick={() => setIsCreateGroupOpen(true)}
              />
            )}

            {isCreateGroupOpen && (
              <div className="flex gap-2">
                <MdCancel
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setIsCreateGroupOpen(false)}
                />
                <FaUserCheck
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleCreateGroup}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Sidebar;
