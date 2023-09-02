import React from 'react'
import TokenBlue1 from '../tokens/bonusCookies/blue/tokenBlue1';
import TokenBlue10 from '../tokens/bonusCookies/blue/tokenBlue10';
import TokenBlue3 from '../tokens/bonusCookies/blue/tokenBlue3';
import TokenBlue5 from '../tokens/bonusCookies/blue/tokenBlue5';
import TokenBlueArrows from '../tokens/bonusCookies/blue/tokenBlueArrows';
import TokenBlueSpinner from '../tokens/bonusCookies/blue/tokenBlueSpinner';
import TokenGold1 from '../tokens/bonusCookies/gold/tokenGold1';
import TokenGold10 from '../tokens/bonusCookies/gold/tokenGold10';
import TokenGold3 from '../tokens/bonusCookies/gold/tokenGold3';
import TokenGold5 from '../tokens/bonusCookies/gold/tokenGold5';
import TokenGoldArrows from '../tokens/bonusCookies/gold/tokenGoldArrows';
import TokenGoldSpinner from '../tokens/bonusCookies/gold/tokenGoldSpinner';
import TokenRed1 from '../tokens/bonusCookies/red/tokenRed1';
import TokenRed10 from '../tokens/bonusCookies/red/tokenRed10';
import TokenRed3 from '../tokens/bonusCookies/red/tokenRed3';
import TokenRed5 from '../tokens/bonusCookies/red/tokenRed5';
import TokenRedArrows from '../tokens/bonusCookies/red/tokenRedArrows';
import TokenRedSpinner from '../tokens/bonusCookies/red/tokenRedSpinner';



export default function RandomToken() {

    

    const redTokens: { [key: number]: React.FC } = {
        1: TokenRed1,
        2: TokenRed3,
        3: TokenRed5,
        4: TokenRed10,
        5: TokenRedArrows,
        6: TokenRedSpinner,
    }

    const blueTokens: { [key: number]: React.FC } = {
        1: TokenBlue1,
        2: TokenBlue3,
        3: TokenBlue5,
        4: TokenBlue10,
        5: TokenBlueArrows,
        6: TokenBlueSpinner,
    }

    const goldTokens: { [key: number]: React.FC } = {
        1: TokenGold1,
        2: TokenGold3,
        3: TokenGold5,
        4: TokenGold10,
        5: TokenGoldArrows,
        6: TokenGoldSpinner,
    }

    const randomGroupNumb = Math.floor(Math.random() * 3) + 1;

    const randomCompNumb = Math.floor(Math.random() * 6) + 1;
    
    let RandomComp = redTokens[randomCompNumb] as React.FC

    switch (randomGroupNumb) {
        case 1:
            RandomComp = redTokens[randomCompNumb] as React.FC
            break            
        case 2:
            RandomComp = goldTokens[randomCompNumb] as React.FC
            break
        case 3:
            RandomComp = blueTokens[randomCompNumb] as React.FC
            break
    }

  return (
    <RandomComp/>
  )
}
