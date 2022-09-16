import { useRef, useCallback } from "react";

import ReactList from "react-list";

const List = ({ className = "", transformFn, itemsCount, loadMore }) => {
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (observer?.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, []);

  const renderItem = (index, key) => {
    if (index === itemsCount - 1) {
      return (
        <div key={key} ref={lastElementRef}>
          {transformFn(index)}
        </div>
      );
    } else {
      return <div key={key}>{transformFn(index)}</div>;
    }
  };
  return (
    <div className={`${className} tw-overflow-auto`}>
      <ReactList itemRenderer={renderItem} length={itemsCount} />
    </div>
  );
};

export default List;
