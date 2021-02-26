namespace common {

    export namespace RDom {

        const random = (len: number = 8) => {
            const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const betLen = alphabet.length;
            let out = []
            let i = 0;
            while (i < len) {
                let seed = +Math.random().toString().substr(2)
                out[i] = alphabet[seed % betLen]
                i++;
            }
            return out.join("");
        }
        export class boxMap {

            boxes: Array<vBox> = new Array<vBox>();
            ids: Array<String> = new Array<String>();




            searchByID(id: string) {
                let { boxes } = this;
                return boxes.filter(v => {
                    return v.cid && v.cid === id;
                }).pop();
            }

            push(box: vBox) {

                const ids = this.ids;

                if (box.cid === null) {
                    let r = random(12);

                    while (ids.indexOf(r) !== -1)
                        r = random(12);

                    box.cid = r;

                }

                if (this.searchByID(box.cid) == undefined) {
                    ids.push(box.cid);
                    this.boxes.push(box);
                }

            }


        }

    }
}