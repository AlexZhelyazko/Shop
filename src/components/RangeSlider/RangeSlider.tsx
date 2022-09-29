import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}$`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeForInputs = (newValue: number | number[]) => {
    setValue(newValue as number[]);
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
        getAriaLabel={() => 'Price'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
