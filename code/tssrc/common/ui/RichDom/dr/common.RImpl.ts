namespace common {
    export namespace RDom {

        export interface BOX {
            AA: Position
            BB: Position
        }

        export interface Position {
            x: number
            y: number
        }

        export interface BondingBox {
            inbox: BOX
            outbox: BOX
            width: number
            height: number
            offsetLeft: number
            offsetRight: number
            offsetTop: number
            offsetBottom: number
            setPosition: Function
            margin: Function
            resize: Function
            moveBox: Function
            init: Function
        }
        export interface Stylesheet {

        }

        export interface CSS extends Stylesheet {

        }

        export interface boxNode {
            parent?: vBox,
            children?: Array<vBox>,
            _bondingbox?: BondingBox
        }

        export interface HTMLNode {
            data?: string
            attribs: any
            children: Array<HTMLNode>
            name?: string
            next?: HTMLNode
            parent?: HTMLNode
            prev?: HTMLNode
            type?: string
        }

        export enum layout { row = "row", col = "col", abs = "abs" }

        export interface vBox extends boxNode {
            prevNode?: vBox
            nextNode?: vBox
            cid: string
            layout?: layout
            expand?: boolean
            HNode: HTMLNode
            $style: Object
            bindNode: Function
            addNode: Function
            resize: Function
            updateBondingBox: Function
        }

        export interface vMap {
            boxes: Array<vBox>
            ids: Array<String>
            searchByID(id: String): vBox
            push: Function
        }

    }
}