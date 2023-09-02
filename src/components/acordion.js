import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionComponent({ details, title }) {
    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
            sx={{ backgroundColor: 'transparent', boxShadow: '0', width: '100%' }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography
                    fontSize={14}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    fontSize={12}
                >
                    {details}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}