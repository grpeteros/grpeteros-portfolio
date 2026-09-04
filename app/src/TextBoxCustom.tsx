import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function BasicTextFields(props: any) {



  return (
    <div>
      <Typography component="h2">
        {props.label}
      </Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="bg-white border border-radius-xs"

         style={{ borderRadius: '5px' }}
      >
        {props.outlined && (
          <TextField id="outlined-basic" label={props.label} variant="outlined" onChange={(event) => props.setOutlinedValue(event.target.value)} />
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