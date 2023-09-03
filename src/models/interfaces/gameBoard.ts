export default interface IGameBoard {

    boardSize: number   // the number of cells on one side of the board. so (boardSize * boardSize) = #cellsOnBoard     
    leterTiles: React.FC|null
    bonusCookie: React.FC|null
    
}