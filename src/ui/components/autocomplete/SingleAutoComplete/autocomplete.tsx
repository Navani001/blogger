
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export function SingleAutocomplete({title="Search..",autocompleteelement,value,setvalue,onclick=()=>{console.log(null)}}:any) {
    console.log(autocompleteelement)
  return (
    <Autocomplete
    options={autocompleteelement}
    getOptionLabel={(option:any) => option['title']}
    renderOption={(props, option, { selected }) => (
        <li
        
       
          {...props}
          key={option.id}
          style={
            option.isAddOption
              ? {
                  color: '#2196f3',
                  borderTop: '1px solid #E5E8EB',
                 
                }
              : { display: 'flex', width: '100%', height: '90%' }
          }
          onClick={()=>onclick(option['url'])}
        >
        {option.title}
        </li>
      )}
      sx={{ width: 300, '& .MuiOutlinedInput-root':{
        padding:"5px",
        borderRadius:"10px",
        backgroundColor:"white"
      },'& .MuiAutocomplete-endAdornment': {
        display: 'none',
      }, }}
      renderInput={(params) => <TextField {...params} placeholder={title} />}
    />
  );
}