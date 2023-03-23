import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';


export const PlayPage = () => {

    const nav = useNavigate();

    return (
        <Form>
            <Row>
                <Col>
                    <Row>
                        <h1 className="player-One-Form">Player 1</h1>
                        <Form.Group as={Row} className="mb-3" controlId="playerOneHoleOne">
                            
                            <Col>
                                <Form.Control type="number" placeholder="Hole 1" min="-6" max="60"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="playerOneHoleTwo">
                            
                            <Col>
                                <Form.Control type="number" placeholder="Hole 2" min="-6" max="60"/>
                            </Col>
                        </Form.Group>

                    </Row>
                </Col>



                <Col>
                    <Row>

                        <h1 className="player-Two-Form">Player 2</h1>
                        <Form.Group as={Row} className="mb-3" controlId="playerTwoHoleOne">
                            
                            <Col>
                                <Form.Control type="number" placeholder="Hole 1" min="-6" max="60"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="playerTwoHoleTwo">
                            
                            <Col>
                                <Form.Control type="number" placeholder="Hole 2" min="-6" max="60"/>
                            </Col>
                        </Form.Group>

                    </Row>
                </Col>

            </Row>
            <Button 
                type='submit' 
                variant='outline-success'
                onClick={() =>nav("/results")}>
                    Submit Scores
                </Button>
        </Form>
    );
}