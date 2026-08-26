import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


export default function AccordionCustom() {
  const id = React.useId();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls={`${id}-panel1-content`}
        id={`${id}-panel1-header`}
      >
        <Typography component="span">ACCORDION</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography>
          2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>)

}