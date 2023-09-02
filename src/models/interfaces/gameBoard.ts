export default interface IGameBoard {

    magicNumber: number     // board dimensions will be (magicNumber*2 by magicNumber*2), ie, if mN=9, then board is 18 x 18 = 324 squares
    leterTile: React.FC|null
    bonusCookie: React.FC|null
}