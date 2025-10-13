// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Home1 = () => {
  return (
    <div>
        <Accordion>
            <AccordionSummary 
            expandIcon={<ArrowDownwardIcon />}
            >
                <Typography variant="h6">1. Fondamentaux des tests</Typography>
            </AccordionSummary>
        </Accordion>
        
    </div>
    
)
}

export default Home1
