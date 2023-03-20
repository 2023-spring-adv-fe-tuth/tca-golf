
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'


const hardcodedGameResults = [
    {
        winner: "Tom"
        , players: ["Tom", "Taylor"]
        , score: 33
    }
    , {
        winner: "Taylor"
        , players: ["Jack", "Taylor"]
        , score: 23
    }
    , {
        winner: "Taylor"
        , players: ["Tom", "Taylor", "Jack"]
        , score: 53
    }
    , {
        winner: "X"
        , players: ["X", "Joe"]
        , score: 11
    }
    , {
        winner: "X"
        , players: ["X", "Joe"]
        , score: 31
    }
    , {
        winner: "Joe"
        , players: ["X", "Joe"]
        , score: 14
    }
    , {
        winner: "Jack"
        , players: ["X", "Joe", "Jack"]
        , score: 55
    }
];

    const getPreviousPlayers = (grs) => {

        const allPreviousPlayers = grs.flatMap(x => x.players);

        return [
            ...new Set(allPreviousPlayers)
        ].sort();
    };


    const calculateLeaderboard = (results) => {

        const gameResultsGroupedByPlayer = getPreviousPlayers(results).reduce(
            (acc, x) => acc.set(
                x
                , results.filter(y => y.players.includes(x))
            )
            , new Map()
        );

        return [...gameResultsGroupedByPlayer]
            // First object with names game counts and wins...
            .map(x => ({
                name: x[0]
                , totalGames: x[1].length
                , wins: x[1].filter(y => y.winner === x[0]).length
            }))
            /// Now use wins and total games to get avg and losses
            .map(x => ({
                name: x.name
                , wins: x.wins
                , losses: x.totalGames - x.wins
                , avg: x.wins / x.totalGames
            }))
            .sort(
                (a, b) => (a.avg * 1000 + a.wins + a.losses) > (b.avg * 1000 + b.wins + b.losses) ? -1 : 1
            )
            .map(x => ({
                ...x
                , avg: x.avg.toFixed(3)
            }))
            ;
    };
    
    const gameList = () => {
        
        const sortedGameResults = calculateLeaderboard(hardcodedGameResults).map((game) => <li><br/>Player: {game.name} <br/> Avg: {game.avg} <br/> Wins: {game.wins} <br/></li>)
        return (
            sortedGameResults
        )
    }


    






export const HomePage = () => {


    return (
        <>
            <h1>TCA Golf Companion App</h1><br />

            <div class="row, mx-5">
                <input class="col-4" type='text' placeholder="Enter Player Name" />
                <Button variant="primary" size="sm">Enter</Button>
            </div>


            <br /><br />
            <Button
                href="./play"
                type='submit'
                variant="success"
                size="lg">
                Play!
            </Button>

            <Card className="mt-3">
                <Card.Header>
                    Leaderboard
                </Card.Header>
                <Card.Body>
                    <ul style={{ listStyleType: "none" }}>{gameList()}</ul>
                </Card.Body>
            </Card>
        </>

    );
}