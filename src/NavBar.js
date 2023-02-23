import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export const NavBar = () => {
    return (
        <ul>
            <li>
                <Button href="./" variant="primary">Home</Button>
            </li>
            <li>
                <Button href="./Play" variant="primary">Play</Button>
            </li>
            <li>
                <Button href="./Results" variant="primary">Results</Button>
            </li>
        </ul>
    )
}