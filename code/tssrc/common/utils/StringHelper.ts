namespace kaayou {
    export class StringHelper {
        public static padLeft(word,char,wordLength){
            return new Array(wordLength-(word+'').length+1).join(char)+word;
        }
        
        public static toStar(word) {
            //比如word有6个字，那么就构造一个7个元素的空数组，然后用*隔开
            let wordLength=word.length;
            return new Array(wordLength + 1).join('*');
        }
    }
}