type Props = {};

const Category = (props: Props) => {
  return (
    <div className="w-[300px] max-w-[300px] rounded my-0 mx-4 shadow-[0_2px_7px_0_rgba(0,0,0,0.05)]">
      <div className="title">
        <h2 className="font-bold uppercase py-[10px] px-5 text-sm">Danh mục</h2>
      </div>
      <div className="list-cat px-4">
        <div className="cate-item cursor-pointer text-sm py-2 flex items-center justify-between border-b border-b-[#f1f1f1]">
          <div className="name">Khang báo nợ</div>
          <div className="amount">12</div>
        </div>
        <div className="cate-item cursor-pointer text-sm py-2 flex items-center justify-between border-b border-b-[#f1f1f1]">
          <div className="name">Khang báo nợ</div>
          <div className="amount">12</div>
        </div>
        <div className="cate-item cursor-pointer text-sm py-2 flex items-center justify-between border-b border-b-[#f1f1f1]">
          <div className="name">Khang báo nợ</div>
          <div className="amount">12</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
