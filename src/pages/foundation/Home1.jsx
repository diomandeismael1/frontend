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
            <AccordionDetails className='detail'>
                <Link to="/1.1"><Typography variant="body1">1.1-Le processus de test </Typography></Link>
            </AccordionDetails>
        </Accordion>
        
    </div>
    
)
}

export default Home1
