import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message, senderId, shouldShake }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation, isGroupChat, users } = useConversation();
  const fromMe = authUser._id === senderId;

  let profilePic = "";
  if (isGroupChat && !fromMe) {
    profilePic = users.find((user) => user._id === senderId).profilePic;
  } else {
    profilePic = fromMe
      ? authUser.profilePic
      : selectedConversation?.profilePic;
  }

  return (
    <div
      className={`chat ${fromMe ? "chat-end" : "chat-start"} ${
        shouldShake ? "shake" : ""
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${
          fromMe ? "bg-blue-500" : "bg-gray-500"
        }  pb-2`}
      >
        {message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:42
      </div>
    </div>
  );
};

export default Message;
