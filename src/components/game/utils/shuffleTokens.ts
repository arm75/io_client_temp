export default function shuffleTokens(tokenArray:Array<string>) {

    // Fisher-Yates shuffle algorithm...
    function shuffleArray(array:Array<string>) {
        for (let i:number = array.length - 1; i > 0; i--) {
            
            const j:number = Math.floor(Math.random() * (i + 1));
            
            [array[i], array[j]] = [array[j], array[i]] 
        }
        return array
    }

    const returnArray = shuffleArray(tokenArray)

  return returnArray
}
