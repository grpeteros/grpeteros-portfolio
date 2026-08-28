import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function BasicTextFields(props: any) {



  return (
    <div>
      <Typography component="h2">
        Text Input
      </Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="bg-white p-5 border border-radius-xs"

         style={{ borderRadius: '5px' }}
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(event) => props.setOutlinedValue(event.target.value)} />
        <TextField id="filled-basic" label="Filled" variant="filled" onChange={(event) => props.setFilledValue(event.target.value)} />
        <TextField id="standard-basic" label="Standard" variant="standard" onChange={(event) => props.setStandardValue(event.target.value)} />
      </Box>
    </div>


  );
}