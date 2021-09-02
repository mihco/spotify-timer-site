function sum(list) {
    let sum = 0
    for(let i = 0; i < list.length; i++) {
        sum += list[i]
    }
    return sum
}

const getAllSubsets = 
        theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
            subsets.map(set => [value,...set])
        ),
        [[]]
        );

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

export function songChooser(playlist, time, range=0) {
    let subsets = getAllSubsets(playlist)
    let validPlaylists = []
    for(let i = 0; i < subsets.length; i++) {
        let subSum = sum(subsets[i])
        if(subSum >= (time - range) && subSum <= time) {
            validPlaylists.push(subsets[i])
        }
    }
    return shuffle(shuffle(validPlaylists)[0])

}