import * as React from 'react';
import './Moves.css';

export interface MoveDisplayProps {
    move : string
}
 
export interface MoveDisplayState {
    
}
 
class MoveDisplay extends React.Component<MoveDisplayProps, MoveDisplayState> {
    state = {   }
    render() { 
        let moveDets = this.props.move.split("_");
        //console.log(moveDets.length, this.props.move);
        let moveDisplay;
        if(moveDets.length !== 1){
            
            moveDisplay = moveDets[1] + " moved " + moveDets[2] + " on " + moveDets[0] + " board";

            return (
                <div className = "SingleMove">
                    <h1>{moveDisplay}</h1>
                </div>
            );
        }
         //{fonttyle: "italic"}, font-family: "sans-serif";
        return (
            <div className = "SingleMove" style = {{background : "rgb(243 56 0)", fontFamily : "sans-serif", fontStyle : "italic"}}>
                <h1>{this.props.move}</h1>
            </div>
          );
    }
}
 
export default MoveDisplay;