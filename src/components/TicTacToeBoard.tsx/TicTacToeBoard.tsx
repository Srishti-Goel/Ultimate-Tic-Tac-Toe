import React from 'react';
import Tile from '../Tile/Tile';
import './TicTacToeBoard.css';

export interface TicTacToeBoardProps {
    boardPosition? : string[][],
    boardWon?: string,
    id : string
}
 
export interface TicTacToeBoardState {
    
}
 
class TicTacToeBoard extends React.Component<TicTacToeBoardProps, TicTacToeBoardState> {
    state = {   }
    render() { 
        if(this.props.boardPosition){
            let board = [];
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    //console.log("Board at ", this.props.id, "position ", i, j, "got", this.props.boardPosition[i][j]);
                    board.push(<Tile playerOccupied = {this.props.boardPosition[i][j]} id = {this.props.id + `tile_${i}_${j}`} key = {`${i}_${j}`}/>);
                }
            }
            return (
                <div className = "Board_playing" id = {"TicTacToeBoard" + this.props.id} >
                    {board}
                </div> 
            );  
        }
        else if(this.props.boardWon){
            let img_src = "", className = "";
            if(this.props.boardWon === "X"){img_src = "assets/images/cross.png"; className = "Board_won_X";}
            else{img_src = "assets/images/circle2.png"; className = "Board_won_O";}
            return(
                <div className = {className} id = {"TicTacToeBoard" + this.props.id}>
                    <img src = {img_src} alt = "Occupied" height = "200px" width = "200px"></img>
                </div>
            );
        }
        return (
            <div className = "Board_error" id = {"TicTacToeBoard" + this.props.id}>
                Error occured here       
            </div> 
        );
    }
}
 
export default TicTacToeBoard;