import React from 'react';
import TicTacToeBoard from '../TicTacToeBoard.tsx/TicTacToeBoard';
import './UltimateBoard.css';

export interface UltimateBoardProps {
    boardState : string[][][][],
    boardWinners : string[][],
    makeMove : any
}
 
export interface UltimateBoardState {}

class UltimateBoard extends React.Component<UltimateBoardProps, UltimateBoardState> {
    state = {  }
    
    render() {
        let boards = [];
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                let id_src = `board${i}_${j}`;
                if(this.props.boardWinners[i]){
                    if(this.props.boardWinners[i][j] !== "" ){
                        //Someone's won the board
                        boards.push(<TicTacToeBoard boardWon = {this.props.boardWinners[i][j]} key = {id_src} id = {id_src}/>);
                    }
                    else{
                         //Someone's still playing on the board
                        boards.push(<TicTacToeBoard boardPosition = {this.props.boardState[i][j]} key = {id_src} id = {id_src} />);
                    }
                }
                else{
                    boards.push(<TicTacToeBoard boardPosition = {this.props.boardState[i][j]} key = {id_src} id = {id_src} />);
                }
            }
        }
        return (
            <div id = "UltimateBoard" className = "Ultimate_Board_playing" onMouseDown = {this.props.makeMove}>
                {boards}
            </div>
          );
    }
    
}
 
export default UltimateBoard;