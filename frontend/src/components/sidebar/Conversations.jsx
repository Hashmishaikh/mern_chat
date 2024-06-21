import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversations();
  console.log("conversation", conversation);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversation?.map((conversationing,idx) => (
		<div key={conversationing?._id}>
        <Conversation
		  conversation={conversationing}
          profile={conversationing?.profilePic}
          name={conversationing?.fullName}
		  emoji={getRandomEmoji()}
		  lastIdx={idx === conversation.length - 1}
        />
		</div>
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
