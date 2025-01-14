import { SxProps } from '@mui/material';

export const changeVarient: SxProps = {
    '& .MuiAutocomplete-option': {
     backgroundColor:"red !important",
      paddingTop: 0,
      paddingBottom: 0,
    },
  };

  
export const changeBackground: SxProps = {
    '& .MuiFilledInput-root': {
      'backgroundColor': 'white !important',
      'border': '1px solid red',
      'borderRadius': '8px',
      '&::before': {
        borderBottom: 'none !important',
      },
      '&::after': {
        borderBottom: 'none !important',
      },
      '&:hover:not(.Mui-disabled)::before': {
        borderBottom: 'none !important',
      },
      '&.Mui-disabled::before': {
        borderBottom: 'none !important',
      },
      '&:hover': {
        backgroundColor: 'white !important',
      },
      '&.Mui-focused': {
        borderColor: 'grey',
        backgroundColor: 'white !important',
        boxShadow: 'none',
      },
    },
    '& .Mui-focused': {
      color: 'red',
    },
  };
  export const changeBackground2: SxProps = {
    '& .MuiFilledInput-root': {
      'backgroundColor': '#E6EAEB !important',
      'border': '1px solid #E6EAEB',
      'borderRadius': '8px',
      '&::before': {
        borderBottom: 'none !important',
      },
      '&::after': {
        borderBottom: 'none !important',
      },
      '&:hover:not(.Mui-disabled)::before': {
        borderBottom: 'none !important',
      },
      '&.Mui-disabled::before': {
        borderBottom: 'none !important',
      },
      '&:hover': {
        backgroundColor: 'black !important',
      },
      '&.Mui-focused': {
        borderColor: 'black',
        backgroundColor: 'black !important',
        boxShadow: 'none',
      },
    },
    '& .Mui-focused': {
      color: 'black',
    },
  };
export const helperTextStyle: SxProps = {
  'backgroundColor': 'white',
  'height': '50px',
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  },
  "& .MuiPaper-elevation":{
    marginTop: '10px',
  },'& .MuiAutocomplete-paper': {
    marginTop: '10px',
  },  "& .MuiOutlinedInput-root": {
    padding: "7px", // Set padding here
  },
 
  
  '& .MuiTypography-root': {
    marginBottom: '16px',
  },
  '& .MuiChip-root': {
    borderRadius: '5px',
    fontSize: '10px',
    height: '23px',
    backgroundColor: '#e5e7eb',
  },

  '& .MuiChip-deleteIcon': {
    color: 'black',
    fontSize: '12px',
  },

  '& .MuiAutocomplete-listbox': {
  scrollbarWidth: "none !important",
  '&::-webkit-scrollbar': {
    display: 'none',
    width: '0px'
  },
  'msOverflowStyle': 'none', // For Internet Explorer and Edge
},
  '& .MuiInputBase-root': {
    'backgroundColor': 'white !important',
    '&:hover': {
      backgroundColor: 'white !important',
    },
  },
  '& .MuiAutocomplete-popupIndicator': {
    display: 'none',
  },
  '& .MuiFilledInput-root': {
    'backgroundColor': 'white !important',
    'border': '1px solid black',
    'borderRadius': '8px',
    '&::before': {
      borderBottom: 'none !important',
    },
    '&::after': {
      borderBottom: 'none !important',
    },
    '&:hover:not(.Mui-disabled)::before': {
      borderBottom: 'none !important',
    },
    '&.Mui-disabled::before': {
      borderBottom: 'none !important',
    },
    '&:hover': {
      backgroundColor: 'white !important',
    },
    '&.Mui-focused': {
      borderColor: 'grey',
      backgroundColor: 'white !important',
      boxShadow: 'none',
    },
  },

  '& .MuiFilledInput-input': {
    color: 'black',
    backgroundColor: 'white !important',
    paddingBottom: '5px',
  },

  '& .MuiFormHelperText-root': {
    marginLeft: 0,
  },

  '& .Mui-focused': {
    color: 'grey',
  },
};
export const requiredLabelStyle: React.CSSProperties = {
  color: 'red',
  padding: '0',
  margin: '5px',
};
