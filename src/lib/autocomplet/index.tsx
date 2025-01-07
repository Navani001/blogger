import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  changeBackground,
  changeBackground2,
  changeVarient,
  helperTextStyle,
  requiredLabelStyle,
} from './style';

import { padding, SxProps, Theme } from '@mui/system';
import { Box, Checkbox, InputAdornment } from '@mui/material';

const filter = createFilterOptions();
export function SelectInputField({ islabel=true,varient = 'checked',multiple=true, onclick=()=>{console.log(null)},startIcon = false, value,setValue,error = false,searchfield="name", disabled = false ,autocompleteelement}: any) {

React.useEffect(()=>{
console.log(value)

},[value])
  return (
    <Autocomplete
      isOptionEqualToValue={(option: any, value: any) => option[searchfield] === value.name}
      multiple={multiple}
      limitTags={1}
      disabled={disabled}
      disableCloseOnSelect
      sx={{
        '& .MuiFilledInput-root,':{
          padding:'10px 0 10px 0',
        },
      }}
      filterOptions={(options: any, params: any) => {
        const filtered = filter(options, params);
        const selectedValues = value.map((val: any) => val.title);
        const reordered = [
          ...filtered.filter((option: any) => selectedValues.includes(option[searchfield])), // Selected options
          ...filtered.filter((option: any) => !selectedValues.includes(option[searchfield])), // Non-selected options
        ];

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option: any) => inputValue === option[searchfield]);

        // if (inputValue !== '' && !isExisting) {
        //   reordered.push({
        //     inputValue,
        //     title: 'Add ' + inputValue,
        //     isAddOption: true,
        //   });
        // }
        // const top10 = reordered.slice(0, 7);
        // console.log(top10);
        return reordered;
      }}
      id='fixed-tags-demo'
      value={value}
      onChange={(event, newValue: any) => {
        setValue(newValue);
      }}
      options={autocompleteelement}
      getOptionLabel={(option) => option[searchfield]}
      renderOption={(props, option, { selected }) => (
        <li
        
          {...props}
          style={
            option.isAddOption
              ? {
                  color: '#2196f3',
                  borderTop: '1px solid #E5E8EB',
                 
                }
              : { display: 'flex', width: '100%', height: '100%' }
          }
        >
          {varient === 'checked' ? (
            <>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {option[searchfield]}
            </>
          ) : varient === 'checked_end' ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '35px',
              }}
            >
              {option[searchfield]}
              <Checkbox
                sx={{ borderRadius: 3 }}
                style={{ marginRight: 8 }}
                checked={selected}
                icon={<img />}
              
              />
            </Box>
          ) : (
            <Box onClick={()=>onclick(option["url"])} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {option[searchfield]}
            </Box>
          )}
        </li>
      )}
      className="w-full "
      renderInput={(params) => (
        <TextField
          {...params}
          sx={
            {
              ...helperTextStyle,
              ...(error ? changeBackground : {}),
              ...(disabled ? changeBackground2 : {}),
              ...changeVarient,
              '& .MuiFilledInput-input': {
                padding:'0'
              },
              
            } as SxProps<Theme>
          }
        
          label={
            islabel ? (
              <span style={{ color: 'grey', fontSize: '12px' }}>
                Required
                <span style={requiredLabelStyle}>*</span>
              </span>
            ) : (
              <span style={{ color: 'grey', fontSize: '12px' }}>
                Required
                <span style={requiredLabelStyle}>*</span>
              </span>
            )
          }
          placeholder='Favorites'
          variant='filled'
        />
      )}
    />
  );
}

