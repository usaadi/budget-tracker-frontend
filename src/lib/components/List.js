import ReactList from "react-list";

const List = ({ className = "", data, transformFn }) => {
  const renderItem = (index, key) => {
    return transformFn(index, key);
  };
  return (
    <div className={`${className} tw-overflow-auto`}>
      <ReactList itemRenderer={renderItem} length={data.length} />
    </div>
  );
};

export default List;
