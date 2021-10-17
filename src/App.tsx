import './App.css';
import UltimateBoard from './components/ultimateBoard/UltimateBoard';

import React, { Component } from 'react';
import MovesTab from './components/MovesTab/MovesTab';

class App extends Component {
  
  addMove(square_x: number, square_y: number, board_x: number, board_y: number, player: string) {
    let code = "";
    code = player + " moves " + this.getCodeForMove(board_x, board_y).toUpperCase() +" board " + this.getCodeForMove(square_x, square_y).toUpperCase();
    code = this.getCodeForMove(board_x, board_y) + "_" + player + "_" + this.getCodeForMove(square_x, square_y);
    this.state.moves.push(code);
    //console.log("This is what addMove() is doing", this.state.moves);
  }
  state = { 
    boardState : [
      [      
            [["", "", ""], ["", "", ""], ["", "", ""]],
            [["", "", ""], ["", "", ""], ["", "", ""]],
            [["", "", ""], ["", "", ""], ["", "", ""]],
        ],
        [      
          [["", "", ""], ["", "", ""], ["", "", ""]],
          [["", "", ""], ["", "", ""], ["", "", ""]],
          [["", "", ""], ["", "", ""], ["", "", ""]],
      ],
      [      
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
        [["", "", ""], ["", "", ""], ["", "", ""]],
      ]
    ],
    boardWinners : [["", "", ""] , ["", "", ""] , ["", "", ""]],
    lastPlayed : "None",
    moves : ["May the games begin!"],
    activities : ["Tool", "Chess", "Rick and Morty", "Duet Music", "Question Time!", "Chess", "Dare / 5 Truths", "Rick and Morty", "Tafl"],
    boardToPlay : {x: -1, y: -1}
  }
  render() { 
    /*let dateActivitesLinks = [];
    for(let i = 0; i < this.state.activities.length ; i++){
      dateActivitesLinks.push(<ul><a href="#" className="closebtn" onMouseDown = {this.removeActivity(i)}>{this.state.activities[i]}</a></ul>);
    }*/
    return ( 
      <div id = "App">
        <UltimateBoard 
          boardState = {this.state.boardState}
          boardWinners = {this.state.boardWinners}
          makeMove = {this.makeMove}
        />
        <MovesTab
          movesListProp = {this.state.moves}
        />
      </div> 
    );
  }
  removeActivity(x : number): React.MouseEventHandler<HTMLAnchorElement> | undefined {
    //console.log("Remove activity : ", this.state.activities[x], "at: ", x);
    this.state.activities[x] = "";
    return undefined;
  }

  makeMove = (e : React.MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

    let x_tile = Math.floor(x/100) - 1;
    let y_tile = Math.floor(y/100) - 1;
    if(x_tile >= 0 && y_tile >= 0 && x_tile < 9 && y_tile < 9){  
      let board_x = Math.floor(x_tile/3);
      let board_y = Math.floor(y_tile/3);

      let x_square = x_tile - (3 * board_x);
      let y_square = y_tile - (3 * board_y);
      //console.log("x: ", x_square, ", y:", y_square, "At board: ", "x: ", board_x, ", y:", board_y);

      let player = (this.state.lastPlayed === "None")? "X" :((this.state.lastPlayed === "X")?"O":"X"); 
      //console.log("Should play: ", player);

      this.implementMove(y_square, x_square, board_y, board_x, player);

      this.checkForWins();
    }
//    console.log(this.state.boardState);
//    console.log(this.state.moves);
  }

  checkForWins(){

    let boardWinners = [...this.state.boardWinners];

    for(let i = 0; i < 3; i ++){
      for(let j = 0; j < 3; j++){

        let win = checkWinner(this.state.boardState[i][j]);

        if(win && this.state.boardWinners[i][j] !== win){

          console.log(`Won board!!${i} ${j}`);
          boardWinners[i][j] = win;
          alert("Play time!");
          this.dateActivites();
          
        }
      }
    }

    this.setState(boardWinners);

    let GameOverWinner = checkWinner(this.state.boardWinners);

    if(GameOverWinner){

      alert("Game OVER!!!" + GameOverWinner + " Wins");

    }

  }
  dateActivites() {
    //https://tools-unite.com/tools/random-picker-wheel?names=Spotify Playlist,Chess / Tafl,Duet Music,Question Time!,Show and Tell!,Dare / 5 Truths
    let link = "https://tools-unite.com/tools/random-picker-wheel?names=", activities = "", i = 0;
    for(i = 0; i < this.state.activities.length; i++){
      if(this.state.activities[i] !== ""){
        link += this.state.activities[i] + ",";
        activities += `${i + 1} - ` + this.state.activities[i] + "\n";
      }
    }
    link = link.slice(0, link.length - 1);
    activities += `${i} - Nothing\n`;
    window.open(link, '_blank');

    let activity_to_remove;
    while(!activity_to_remove){
      activity_to_remove = window.prompt("Select the activity: \n" + activities);
    } 

    let moveDets = this.state.moves[this.state.moves.length - 1].split("_");
    let otherPlayer = moveDets[1] === "X"? "O" : "X";

    if(this.state.activities[parseInt(activity_to_remove)-1] === "Tool"){
      
      window.open("https://www.youtube.com/watch?v=sRRfcBPLj8Y", '_blank');
      window.open("https://open.spotify.com/playlist/2ZStNuTDr469GCP3kjJGek?si=1463e64bdf5a4c94", '_blank');
      
    }

    if(this.state.activities[parseInt(activity_to_remove)-1] === "Question Time!"){
      
      window.open("https://docs.google.com/document/d/1CjfpH4ZckFsazsugOB-iqkJp2QfS4x0PdcjdvkQrklc/edit", '_blank');
      
    }

    

    alert("Last played: " + moveDets[1] + " moved " + moveDets[2] + " on " + moveDets[0] + " board\n\nNow: " + otherPlayer + " play on " + moveDets[0] + " board.");

    this.removeActivity(parseInt(activity_to_remove) - 1);
  }

  implementMove(square_x : number, square_y : number, board_x : number, board_y : number, player : string){
    if(this.state.lastPlayed === "None"){ // Game starts
      if(player === "X"){
        if(this.state.boardWinners[board_x]){
          if(this.state.boardWinners[board_x][board_y] !== ""){
            //this.squareFilled();
            return 0;
          }
          else{
            if( this.checkMoveOnBoard(square_x, square_y, board_x, board_y) ){
              this.state.boardState[board_x][board_y][square_x][square_y] = player;
              this.state.lastPlayed = player;
              this.addMove(square_x, square_y, board_x, board_y, player);
              return 1;
            }
            //this.squareFilled();
            return 0;        
          }
        }
        else{
          if(this.checkMoveOnBoard(square_x, square_y, board_x, board_y)){
            this.state.boardState[board_x][board_y][square_x][square_y] = player;
            this.state.lastPlayed = player;
            this.addMove(square_x, square_y, board_x, board_y, player);
            return 1;
          }
          //this.squareFilled();
          return 0;
        }
      }
      else{
        //this.otherPlayerPlay();
        return 0;
      }
    }
    if(this.state.lastPlayed === player){
      //this.otherPlayerPlay();
      return 0;
    }
    //Correct player playing!!
    let check = this.checkMoveOnBoard(square_x, square_y, board_x, board_y);
    //console.log("Movability check: ", check);

    if(check){
      this.state.boardState[board_x][board_y][square_x][square_y] = player;
      this.state.lastPlayed = player;
      this.addMove(square_x, square_y, board_x, board_y, player);
      return 1;
    }
    //this.squareFilled();
    return 0;
    
  }

  squareFilled(){
    alert("Can't move there");
  }
  otherPlayerPlay(){
    alert("Let the other guy play!");
  }

  checkMoveOnBoard(square_x : number, square_y : number, board_x : number, board_y : number){
    let board = this.state.boardState[board_x][board_y];
    let allow = true;
    if(board[square_x][square_y] !== ""){
      return false;
    }
    //console.log("length: ", this.state.moves.length, "MoveToMake", this.state.moves[this.state.moves.length - 1].split("_")[2], "Move: ", this.getCodeForMove(board_x, board_y));
    if(this.state.moves.length > 1){
      /*if(this.state.moves[this.state.moves.length - 1].split("_")[2] !== this.getCodeForMove(board_x, board_y)){
        allow = false;
      }*/
    }
    if(!allow){alert("Invalid move.\n\nMove on: " + this.state.moves[this.state.moves.length - 1].split("_")[2] + " board!");}
    return allow;
  }

  getCodeForMove(x : number, y : number){
    let code = "";
    switch(x){
      case 0: {code = code + "N"; break;}
      case 2: {code = code + "S"; break;}
     }

     switch(y){
      case 0: {code = code + "W"; break;}
      case 2: {code = code + "E"; break;}
     }

     if(code === ""){
       code = "C";
     }

     return code;
  }
  
  getMoveForCode(code : string){
    switch(code){
      case "N":{return {x: 0, y : 1};}
      case "NE":{return {x: 0, y : 2};}
      case "NW":{return {x: 0, y : 0};}
      case "E":{return {x: 1, y : 2};}
      case "W":{return {x: 1, y : 0};}
      case "C":{return {x: 1, y : 1};}
      case "S":{return {x: 2, y : 1};}
      case "SE":{return {x: 2, y : 2};}
      case "SW":{return {x: 2, y : 0};}
    }
  }

}

function checkWinner(board : string[][]){
  const winningLines = [
    [{x : 0, y : 0}, {x : 0, y : 1}, {x : 0, y : 2}],
    [{x : 1, y : 0}, {x : 1, y : 1}, {x : 1, y : 2}],
    [{x : 2, y : 0}, {x : 2, y : 1}, {x : 2, y : 2}],
    [{x : 0, y : 0}, {x : 1, y : 0}, {x : 2, y : 0}],
    [{x : 0, y : 1}, {x : 1, y : 1}, {x : 2, y : 1}],
    [{x : 0, y : 2}, {x : 1, y : 2}, {x : 2, y : 2}],
    [{x : 0, y : 0}, {x : 1, y : 1}, {x : 2, y : 2}],
    [{x : 0, y : 2}, {x : 1, y : 1}, {x : 2, y : 0}]
  ];
  let winner = "";
   winningLines.forEach(ele =>{
    //console.log(ele[0], board[ele[0].x][ele[0].y], board[ele[1].x][ele[1].y], board[ele[2].x][ele[2].y]);
    
    if(board[ele[0].x][ele[0].y] && board[ele[0].x][ele[0].y] === board[ele[1].x][ele[1].y] && board[ele[0].x][ele[0].y] === board[ele[2].x][ele[2].y]){
      winner = board[ele[2].x][ele[2].y];
    }
  });
  if(winner){
    return winner;
  }
  return null;
}

export default App;
