import img from '../img/404.png';
import { Button } from '@mui/material';

import './styles/pages.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {

    return (<section id='notFoundPage' className="notFound page d-flex justify-content-center align-items-center flex-column">
        <img src={img} alt="404 Not Found" />
        <div> 
            <Link to='/'>
                <Button variant='contained'>Go Home Page</Button>
            </Link>

            <Button variant='outlined' onClick={() => window.location.reload()}>Reload Page </Button>
        </div>

    </section>);
}

export default NotFoundPage;