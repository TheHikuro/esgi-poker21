export const getCardValues = (cardId) => {
    const matchesFilter = (new RegExp('^(([1-9])|([0,J,Q,K])|(A))[C,D,H,S]$')).exec(cardId);
    let cardValues = [];

    //2 3 4 5 6 7 8 9
    if(matchesFilter[2]){
        cardValues.push(parseInt(matchesFilter[2]));
    }
    
    //0 J Q K => 10
    else if(matchesFilter[3]){
        cardValues.push(10);
    }

    //A => 1 | 11
    else if(matchesFilter[4]){
        cardValues.push(1,11);
    }

    return cardValues;
}