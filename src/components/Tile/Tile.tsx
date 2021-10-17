import * as React from 'react';
import './Tile.css';

export interface TileProps {
    playerOccupied?:string
    id: string
}
 
export interface TileState {
    
}
 
class Tile extends React.Component<TileProps, TileState> {
    state = {  }
    render() { 
        if(this.props.playerOccupied){
            let img_src, className;
            if(this.props.playerOccupied === "X"){img_src = "assets/images/cross.png"; className = "tile_X";}
            else{img_src = "assets/images/circle4.png"; className = "tile_O";}
            return (
                <div className = {className} id = {this.props.id}> 
                    <img src = {img_src} alt = "Occupied" height = "70px" width = "70px"></img>
                </div>
            );
        }
        else{
            return(<div className = "tile" id = {this.props.id}>{this.props.playerOccupied}</div>);
        }
    }
}
 
export default Tile;