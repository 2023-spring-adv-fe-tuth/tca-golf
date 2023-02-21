import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <ul>
            <li>
                <button><Link to="/">Home</Link></button>
            </li>
            <li>
                <button><Link to="/Play">Play</Link></button>
            </li>
            <li>
                <button><Link to="/Results">Results</Link></button>
            </li>
        </ul>
    )
}