declare namespace common {
    namespace RDom {
        interface BOX {
            AA: Position;
            BB: Position;
        }
        interface Position {
            x: number;
            y: number;
        }
        interface BondingBox {
            inbox: BOX;
            outbox: BOX;
            width: number;
            height: number;
            offsetLeft: number;
            offsetRight: number;
            offsetTop: number;
            offsetBottom: number;
            setPosition: Function;
            margin: Function;
            resize: Function;
            moveBox: Function;
            init: Function;
        }
        interface Stylesheet {
        }
        interface CSS extends Stylesheet {
        }
        interface boxNode {
            parent?: vBox;
            children?: Array<vBox>;
            _bondingbox?: BondingBox;
        }
        interface HTMLNode {
            data?: string;
            attribs: any;
            children: Array<HTMLNode>;
            name?: string;
            next?: HTMLNode;
            parent?: HTMLNode;
            prev?: HTMLNode;
            type?: string;
        }
        enum layout {
            row = "row",
            col = "col",
            abs = "abs"
        }
        interface vBox extends boxNode {
            prevNode?: vBox;
            nextNode?: vBox;
            cid: string;
            layout?: layout;
            expand?: boolean;
            HNode: HTMLNode;
            $style: Object;
            bindNode: Function;
            addNode: Function;
            resize: Function;
            updateBondingBox: Function;
        }
        interface vMap {
            boxes: Array<vBox>;
            ids: Array<String>;
            searchByID(id: String): vBox;
            push: Function;
        }
    }
}
