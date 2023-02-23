import Button from 'react-bootstrap/Button';

export const HomePage = () => {
    return (
        <>
        <h1>TCA Golf Companion App</h1><br/>

        <input type='text' placeholder="Player One"/>
        <Button variant="outline-primary">Enter</Button>
        
        <br/><br/>

        <input type='text' placeholder="Player Two"/>
        <Button variant="outline-primary">Enter</Button>

        <br/><br/>
        <Button href="./play" type='submit' variant="success">Play</Button>
        </>
            
    );
}