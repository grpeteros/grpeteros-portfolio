import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function BasicTextFields(props: any) {



  return (
    <div className={`w-99/100`}>
      <Typography component="h2">
        {props.noLabel !== true ? props.label : ''}
      </Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1 } }}
        noValidate
        autoComplete="off"
        className={`bg-white border border-radius-xs ${props.className} w-99/100`}

         style={{ borderRadius: '5px' }}
      >
        {props.outlined && (
          <TextField 
          className={`${props.className} w-99/100`}
          id="outlined-basic" label={props.label} variant="outlined" onChange={(event) => props.setOutlinedValue(event.target.value)} />
        )}
        {props.filled && (
          <TextField id="filled-basic" label={props.label} variant="filled" onChange={(event) => props.setFilledValue(event.target.value)} />
        )}
        {props.standard && (
          <TextField id="standard-basic" label={props.label} variant="standard" onChange={(event) => props.setStandardValue(event.target.value)} />
        )}
      </Box>
    </div>


  );
}