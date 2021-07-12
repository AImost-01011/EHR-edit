import React, { useState, useEffect } from "react";
import st from "./longList.module.scss";

type longListProps = {
  headTitle: string;
  bodyTitle: string[];
  bodyContent: string[];
};

const LongList: React.FC<longListProps> = ({
  headTitle,
  bodyTitle,
  bodyContent,
}) => {
  const [isOpen, setIsOpen] = useState(st.listBodyActive);
  const [childList, setChildList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let mapChildren = bodyContent.map((el, i) => {
      const t = i % bodyTitle.length;

      if (el !== "") {
        return (
          <div className={isOpen} key={i}>
            <div className={st.bodyLeft}>{bodyTitle[t]}</div>
            <div className={st.bodyRight}>{el}</div>
          </div>
        );
      } else {
        return null;
      }
    });

    setChildList([...mapChildren]);
  }, [isOpen]);

  const longClick = () => {
    if (isOpen === st.listBodyActive) setIsOpen(st.listBody);
    else setIsOpen(st.listBodyActive);
  };

  return (
    <div className={st.longList}>
      <div className={st.listHead} onClick={longClick}>
        <div className={st.headLeft}>{headTitle}</div>
        <div className={st.headRight}>
          {bodyContent.length ? "あり" : "なし"}
        </div>
      </div>

      {childList}
    </div>
  );
};

export default LongList;
