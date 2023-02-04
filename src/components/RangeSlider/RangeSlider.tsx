/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppDispatch } from '../../redux/store';
import { setFilterItemsByPrice } from '../../redux/catalog/catalogSlice';
import { useEffect } from 'react';

function valuetext(value: number) {
  return `${value}$`;
}

export default function RangeSlider({ items, location, value, setValue }: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilterItemsByPrice(items));
  }, [items]);

  useEffect(() => {
    let filterItems = items.filter(
      (item: any) =>
        Number(item.price.substring(0, item.price.length - 2).replace(/[^0-9]/g, '')) >=
          Number(value[0]) &&
        Number(item.price.substring(0, item.price.length - 2).replace(/[^0-9]/g, '')) <=
          Number(value[1]),
    );
    dispatch(setFilterItemsByPrice(filterItems));
  }, [value]);

  useEffect(() => {
    return () => {
      setValue([0, 4000]);
    };
  }, [location]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeForInputs = (newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 280 }}>
      <h3>Price Range:</h3>
      <div className="filter__price-input_wrapper">
        <input
          className="filter__price-input"
          onChange={(e) => handleChangeForInputs([Number(e.currentTarget.value), value[1]])}
          value={'$' + value[0]}
          type="text"
        />
        <span>-</span>
        <input
          className="filter__price-input"
          onChange={(e) => handleChangeForInputs([value[0], Number(e.currentTarget.value)])}
          value={'$' + value[1]}
          type="text"
        />
      </div>
      <Slider
        className="MuiSlider-thumbSizeSmall"
        min={0}
        max={4000}
        defaultValue={[0, 4000]}
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
