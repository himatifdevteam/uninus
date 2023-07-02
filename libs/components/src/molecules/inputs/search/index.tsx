import { FC, ReactElement } from 'react';
import { SearchProps } from './types';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchInput: FC<SearchProps> = ({
  onChange,
  value,
}): ReactElement => {
  return (
    <div className="px-8 lg:px-1 items-center w-full hidden md:block">
      <div className=" flex items-center  rounded-md bg-neutral-100 border h-9 px-4  md:w-64 lg:w-72 justify-between">
        <input
          type="text"
          placeholder="Cari"
          value={value}
          onChange={onChange}
          className="bg-neutral-100 w-full outline-none text-sm "
        />
        <AiOutlineSearch className="text-[18px]  text-neutral-900 transition-colors ease-in-out duration-300 cursor-pointer" />
      </div>
    </div>
  );
};
export default SearchInput;
