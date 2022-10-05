import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppDispatch } from '../../redux/store';
import { setFilterItemsByPrice } from '../../redux/catalog/slice';

function valuetext(value: number) {
  return `${value}$`;
}

export default function RangeSlider({ items }: any) {
  const [value, setValue] = React.useState<number[]>([100, 2000]);
  const dispatch = useAppDispatch();

  const filterItemsByPrice = () => {
    //state.filters = true
    let filterItems = items.filter(
      (item: any) =>
        Number(item.price.substring(0, item.price.length - 1)) >= Number(value[0]) &&
        Number(item.price.substring(0, item.price.length - 1)) <= Number(value[1]),
    );
    dispatch(setFilterItemsByPrice(filterItems));
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    filterItemsByPrice();
    // dispatch(setFilterItemsByPrice(newValue));
  };

  const handleChangeForInputs = (newValue: number | number[]) => {
    setValue(newValue as number[]);
    filterItemsByPrice();
    // dispatch(setFilterItemsByPrice(newValue));
  };

  return (
    <Box sx={{ width: 300 }}>
      <div className="filter__price-input_wrapper">
        <input
          onChange={(e) => handleChangeForInputs([Number(e.target.value), value[1]])}
          value={value[0]}
          type="text"
        />
        <input
          onChange={(e) => handleChangeForInputs([value[0], Number(e.target.value)])}
          value={value[1]}
          type="text"
        />
      </div>
      <Slider
        min={100}
        max={2000}
        defaultValue={[100, 2000]}
        step={10}
        getAriaLabel={() => 'Price'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
