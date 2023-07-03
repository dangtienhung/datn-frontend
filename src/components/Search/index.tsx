import { GoSearch } from 'react-icons/go';
import { Input } from '..';

type Props = {};

const Search = (props: Props) => {
  return (
    <div className="flex gap-2 pl-1 pr-4 items-center w-[500px] h-8 rounded-[30px] bg-[#fbfbfb]">
      <GoSearch className="text-lg text-[#ADAEAE]" />
      <Input type="search" placeholder="Tìm kiếm sản phẩm..." />
    </div>
  );
};

export default Search;
