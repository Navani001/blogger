import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  autocomplete,
  changeBackground,
  changeBackground2,
  changeVarient,
  helperTextStyle,
  requiredLabelStyle,
} from './style';

import { padding, SxProps, Theme } from '@mui/system';
import { Box, Checkbox, InputAdornment } from '@mui/material';

const filter = createFilterOptions();
export function SelectInputField({ varient = 'checked', startIcon = false, value,setValue,error = false, disabled = false ,autocompleteelement}: any) {

React.useEffect(()=>{
console.log(value)

},[value])
  return (
    <Autocomplete
      isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
      multiple
      limitTags={2}
      disabled={disabled}
      disableCloseOnSelect
      sx={autocomplete}
      filterOptions={(options: any, params: any) => {
        const filtered = filter(options, params);
        const selectedValues = value.map((val: any) => val.title);
        const reordered = [
          ...filtered.filter((option: any) => selectedValues.includes(option.name)), // Selected options
          ...filtered.filter((option: any) => !selectedValues.includes(option.name)), // Non-selected options
        ];

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option: any) => inputValue === option.name);

        if (inputValue !== '' && !isExisting) {
          reordered.push({
            inputValue,
            title: 'Add ' + inputValue,
            isAddOption: true,
          });
        }
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
      getOptionLabel={(option) => option.name}
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
              {option.name}
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
              {option.name}
              <Checkbox
                sx={{ borderRadius: 3 }}
                style={{ marginRight: 8 }}
                checked={selected}
                icon={<img />}
              
              />
            </Box>
          ) : (
            option.name
          )}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={
            {
              ...helperTextStyle,
              ...(error ? changeBackground : {}),
              ...(disabled ? changeBackground2 : {}),
              ...changeVarient,
              '& .MuiAutocomplete-option': {
                backgroundColor: 'red !important',
                paddingTop: 0,
                paddingBottom: 0,
              },
              '& .MuiAutocomplete-popper': {
                marginTop: '10px !important', // Force margin with !important
              },

              '& .MuiPaper-root': {
                backgroundColor: 'white',
                marginTop: '10px !im',
                border: '2px solid #E3E3E3',
                borderRadius: '10px',
              },
              '& .MuiAutocomplete-listbox': {
                'padding': '8px 0',
                'color': 'black',
                '& .MuiAutocomplete-option': {
                  padding: '8px 16px',
                },
              },
              '& .MuiAutocomplete-paper': {
                marginTop: '10px', // Add margin-top here
              },
              '& .MuiFilledInput-input': {
                color: 'black',
                paddingBottom: '5px',
              },
            } as SxProps<Theme>
          }
        
          label={
            startIcon ? (
              <span style={{ color: 'grey', fontSize: '12px', marginLeft: '37px' }}>
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

