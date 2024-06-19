import React from "react";
import { getRandomEmoji } from "../../utils/emojis";
import Group from "./Group";
import useGetGroups from "../../hooks/useGetGroups";

const Groups = ({ type }) => {
  const { loading, groups } = useGetGroups();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {groups.map((group, idx) => (
        <Group
          key={group._id}
          group={group}
          emoji={getRandomEmoji()}
          lastIdx={idx === group.length - 1}
          type={type}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default React.memo(Groups);
