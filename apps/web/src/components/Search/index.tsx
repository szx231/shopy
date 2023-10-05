import { Input } from '@mantine/core';
import { filtersChangeValue } from 'store/Filters';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const Search = ({ findProducts }: { findProducts: () => void }) => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.Filters);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(filtersChangeValue({ key: 'searchValue', value }));
  };

  return (
    <Input
      onKeyPress={(e) => e.key === 'Enter' && findProducts()}
      onChange={handleChange}
      value={searchValue}
      width="100%"
      icon={<img src="../images/search.svg" alt="Search" />}
      placeholder="Type to search..."
    />
  );
};
