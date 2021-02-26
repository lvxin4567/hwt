declare namespace common {
    namespace RDom {
        class BBonding implements BondingBox {
            constructor();
            inbox: BOX;
            outbox: BOX;
            width: number;
            height: number;
            offsetLeft: number;
            offsetRight: number;
            offsetTop: number;
            offsetBottom: number;
            setPosition(x: number, y: number): void;
            init(): void;
            moveBox(x?: number, y?: number): void;
            margin(top?: number, right?: number, bottom?: number, left?: number): void;
            resize(width: number, height: number): void;
        }
        class bNode implements vBox {
            constructor(o?: boxNode);
            cid: any;
            prevNode: any;
            nextNode: any;
            children: Array<vBox>;
            $style: {};
            parent: any;
            expand: boolean;
            HNode: HTMLNode;
            _bondingbox: BondingBox;
            layout: layout;
            bindNode(node: HTMLNode): void;
            resize(width: any, height: any): void;
            updateBondingBox(): void;
            updateNode(node: vBox): void;
            addNode(node: vBox): void;
        }
    }
}
