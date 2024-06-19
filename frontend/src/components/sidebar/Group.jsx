import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { FaUserGroup } from "react-icons/fa6";

const Group = ({ group, lastIdx, emoji, type }) => {
  const { selectedConversation, setSelectedConversation, setIsGroupChat } =
    useConversation();
  const isSelected = selectedConversation?._id === group._id;
  //   const { onlineUsers } = useSocketContext();
  //   const isOnline = onlineUsers.includes(group._id);
  //   const { groupParticipants, setGroupParticipants } = useConversation();

  //   const handleCheckBox = (e) => {
  //     if (e.target.checked) {
  //       setGroupParticipants([...groupParticipants, group._id]);
  //     } else {
  //       setGroupParticipants(
  //         groupParticipants.filter((id) => id !== conversation._id)
  //       );
  //     }
  //   };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-blue-400" : ""
        }`}
        onClick={() => {
          setIsGroupChat(true);
          setSelectedConversation(group);
        }}
      >
        {type === "group" && (
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            // onChange={handleCheckBox}
          />
        )}
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            {/* <img src={conversation.profilePic} alt="user avatar" /> */}
            <FaUserGroup className="w-10 h-10" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{group.name}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Group;
