// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Home = () => {
  return (
    <div>
        <Accordion>
            <AccordionSummary 
            expandIcon={<ArrowDownwardIcon />}
            >
                <Typography variant="h6">1-Management des activités de test </Typography>
            </AccordionSummary>
            <AccordionDetails className='detail'>
                <Link to="/1.1"><Typography variant="body1">1.1-Le processus de test </Typography></Link>
            </AccordionDetails>
            <AccordionDetails className='detail'>
                <Typography variant="body1">1.2 Le contexte du test </Typography>
            </AccordionDetails>
            <AccordionDetails className='detail'>
                <Typography variant="body1">1.3 Test basé sur les risques </Typography>
            </AccordionDetails>
            <AccordionDetails className='detail'>
                <Typography variant="body1">1.4 La stratégie de test du projet</Typography>
            </AccordionDetails>
            <AccordionDetails className='detail'>
                <Typography variant="body1">1.5 Améliorer le processus de test </Typography>
            </AccordionDetails>
            <AccordionDetails className='detail'>
                <Link to="/1.6">
                    <Typography variant="body1">1.6 Outils de test</Typography>
                </Link>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary 
            expandIcon={<ArrowDownwardIcon />}
            >
                <Link to="/1.6">
                    <Typography variant="h6">Quiz Outils de gestion du test 1.6</Typography>
                </Link>
            </AccordionSummary>
        </Accordion>
        <Accordion>
            <AccordionSummary 
            expandIcon={<ArrowDownwardIcon />}
            >
                    <Typography variant="h6">2.Management du produit</Typography>
            </AccordionSummary>
            <AccordionDetails className='detail'>
                <Link to="/2.1">
                    <Typography variant="body1">2.1 les métriques de test</Typography>
                </Link>
            </AccordionDetails>
            <AccordionDetails className='detail'>
                <Link to={"/2.3"}>
                    <Typography variant="body1">2.3- Gestion des défauts</Typography>
                </Link>
            </AccordionDetails>
        </Accordion>
        
    </div>
    
)
}

export default Home
