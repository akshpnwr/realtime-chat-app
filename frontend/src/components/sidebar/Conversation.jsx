import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji, type }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const { groupParticipants, setGroupParticipants } = useConversation();

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setGroupParticipants([...groupParticipants, conversation._id]);
    } else {
      setGroupParticipants(
        groupParticipants.filter((id) => id !== conversation._id)
      );
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-blue-400" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        {type === "group" && (
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            onChange={handleCheckBox}
          />
        )}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
