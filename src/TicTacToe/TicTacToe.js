import React, { useState } from "react";

import './TicTacToe.css';


function TicTacToe() {
    const [turn, setTurn] = useState('X');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState('');
    const [scoreless, setScoreless] = useState('');
    let [countX, setCountX] = useState(0);
    let [countO, setCountO] = useState(0);
    let [highlighted, setHighlighted] = useState('');




    const checkForWinner = (squares) => {

        let combos = {

            across: [
                ['0', '1', '2'],
                ['3', '4', '5'],
                ['6', '7', '8']
            ],

            down: [
                ['0', '3', '6'],
                ['1', '4', '7'],
                ['2', '5', '8']
            ],

            diagnol: [
                ['0', '4', '8'],
                ['2', '4', '6']
            ]
        };




        for (let combo in combos) {
            combos[combo].forEach((pattern) => {


                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) {


                }

                else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {

                    setWinner(squares[pattern[0]]);

                    if (squares[pattern[0]] === 'X') {
                        setCountX(Number(countX) + 1);
                    } else {
                        setCountO(Number(countO) + 1)
                    };

                    setHighlighted(Cell({ pattern }));
                }




            }

            )
        };


        checkForScoreless(squares);

    };


    const handleClick = (num) => {
        let squares = [...cells];

        if (winner !== '') {

            return;

        } else {

            if (cells[num] !== "") {
                alert("This box has been used");
                return;
            }

            if (turn === 'X') {
                squares[num] = 'X';
                setTurn('O');
            } else if (turn === 'O') {
                squares[num] = 'O';
                setTurn('X');
            }

            setCells(squares);
            checkForWinner(squares);
            checkForScoreless(squares);

        }
    }

    const checkForScoreless = (e) => {
        if (e.indexOf('') === -1) {
            setScoreless('The game is scoreless');
            return;
        }

    }

    const handleRestart = () => {
        setWinner('');
        setCells(Array(9).fill(''));
        setTurn('X');
        setHighlighted('');
        setScoreless('');


    }


    const Cell = ({ num }) => {

        return <td

            style={{ backgroundColor: highlighted ? '#B91646' : '#105652' }}
            onClick={() => { handleClick(num) }}>
            {cells[num]}
        </td>

    }



    return (
        <div className='container'>
            Turn : {turn}
            <table className="main">
                <tbody>
                    <tr>
                        <Cell id="0" num={0} />
                        <Cell id="1" num={1} />
                        <Cell id="2" num={2} />
                    </tr>

                    <tr>
                        <Cell id="3" num={3} />
                        <Cell id="4" num={4} />
                        <Cell id="5" num={5} />
                    </tr>

                    <tr>
                        <Cell id="6" num={6} />
                        <Cell id="7" num={7} />
                        <Cell id="8" num={8} />

                    </tr>
                </tbody>
            </table>
            <div className="points">
                <div>
                    <div>Points</div>
                    <div>
                        X : {countX}  <span> </span><span> </span> O : {countO}
                    </div>
                    <button onClick={() => {
                        handleRestart();
                        setCountX(0);
                        setCountO(0);
                    }}>Reset Game</button>
                    <span> </span>
                    <button onClick={() => {
                        handleRestart();
                    }}>Play Again</button>



                </div>
            </div>
            {scoreless && (
                <>

                    <p>{scoreless}</p>
                </>
            )}
            {winner && (
                <>

                    <p>{winner} is the winner!</p>
                </>
            )}

        </div>

    );
}

export default TicTacToe;
