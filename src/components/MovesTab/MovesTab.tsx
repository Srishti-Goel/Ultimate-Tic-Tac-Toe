import * as React from 'react';
import './Moves.css';
import MoveDisplay from './MoveDisplay';

export interface MovesTabProps {
    movesListProp : string[]
}
 
export interface MovesTabState {
    
}
 
class MovesTab extends React.Component<MovesTabProps, MovesTabState> {
    state = { }
    render() { 
        let movesList: JSX.Element[] = [];
        let l = 0;
        this.props.movesListProp.forEach(a =>{
            movesList.push(<div key = {l}><MoveDisplay move = {a}/><br></br></div>);
            l++;
        })
        //console.log(movesList);
        return (
            <div id = "MovesTab">
                {movesList}
            </div>
        );
    }
}
 
export default MovesTab;