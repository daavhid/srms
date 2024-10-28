interface IscoreMap{
    [key: string]: any;
}
export const scoreMap:IscoreMap = {
    70:'A',
    60:'B',
    50:'C',
    45:'D',
    40:"E",
    0:"F",

}
export const scoreWeight:IscoreMap = {
    'A':5,
    'B':4,
    'C':3,
    'D':2,
    'E':1,
    'F':0
}

 export function mapResult(score:number){
    for(let i=score;i>=0;i--){
        if(scoreMap[i]){
            console.log(scoreMap[i],'this is the grade');
            return scoreMap[i]
        }
    }
    
}