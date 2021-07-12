import React from "react";
import st from "./shortList.module.scss";

type shortListProps = {
  title: string;
  content: string;
};

const ShortList: React.FC<shortListProps> = ({ title, content }) => {
  if (content) {
    return (
      <div className={st.shortList}>
        <div className={st.listTitle}>{title}</div>
        <div className={st.listContent}>{content}</div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ShortList;
