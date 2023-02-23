import Button from 'react-bootstrap/Button';

export const NavBar = () => {
    return (
        <ul>
            <li>
                <Button href="./" variant="primary">Home</Button>
            </li>
            <li>
                <Button href="./Results" variant="primary">Results</Button>
            </li>
        </ul>
    )
}