namespace common {

    export namespace RDom {

        export class BBonding implements BondingBox {

            constructor() {
                this.inbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                }
                this.outbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                }
            }

            inbox: BOX = null
            outbox: BOX = null
            width: number = 0
            height: number = 0
            offsetLeft: number = 0
            offsetRight: number = 0
            offsetTop: number = 0
            offsetBottom: number = 0

            setPosition(x: number, y: number) {
                let { outbox, inbox } = this;
                outbox.AA.x = x + inbox.AA.x;
                outbox.AA.y = y + inbox.AA.y;
                outbox.BB.x = outbox.AA.x + this.width;
                outbox.BB.y = outbox.AA.y + this.height;
            }

            init() {
                this.inbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                }
                this.outbox = {
                    AA: { x: 0, y: 0 },
                    BB: { x: 0, y: 0 }
                }
                this.width = 0
                this.height = 0
                this.offsetLeft = 0
                this.offsetRight = 0
                this.offsetTop = 0
                this.offsetBottom = 0
            }

            moveBox(x = this.inbox.AA.x, y = this.inbox.AA.y) {
                let { inbox: { AA, BB } } = this;
                AA.x = x;
                AA.y = y;
                BB.x = AA.x + this.width;
                BB.y = AA.y + this.height;
            }

            margin(top = 0, right = 0, bottom = 0, left = 0) {
                this.offsetLeft = left
                this.offsetRight = right
                this.offsetTop = top
                this.offsetBottom = bottom;
                let { inbox } = this;
                inbox.AA.x = left;
                inbox.AA.y = top;
                inbox.BB.x = left + this.width;
                inbox.BB.y = top + this.height;
            }

            resize(width: number, height: number) {
                let { inbox: { AA }, inbox } = this;
                inbox.BB.x = AA.x + width;
                inbox.BB.y = AA.y + height;
                this.width = width;
                this.height = height;
            }

        }


        export class bNode implements vBox {

            constructor(o: boxNode = {}) {
                let { children, parent = null } = o;
                this.children = children || this.children;
                this.parent = parent;
                this._bondingbox = new BBonding;
            }

            cid = null
            prevNode = null
            nextNode = null
            children: Array<vBox> = []
            $style = {}
            parent = null
            //没强制设置宽度则默认为父容器的最大宽度
            expand = true;
            public HNode: HTMLNode
            public _bondingbox: BondingBox = null
            layout = layout.row

            bindNode(node: HTMLNode) {
                this.HNode = node;
            }

            resize(width, height) {
                this._bondingbox.resize(width, height)
            }

            //扫描子元素
            updateBondingBox() {
                let childs = this.children;
                this._bondingbox.init();

                childs.forEach(v => {
                    this.updateNode(v)
                });
            }

            updateNode(node: vBox) {

                let nodeBox = node._bondingbox;
                let selfBox = this._bondingbox;
                let index = this.children.indexOf(node);
                let prev = this.children[index - 1] || null;
                // let next = this.children[index+1]||null;

                if (prev) {

                    prev.nextNode = node;
                    node.prevNode = prev;

                    let layType = prev.layout;
                    let mx, my;

                    //最后的元素为列元素
                    if (layout.col === layType) {

                        const { inbox: { AA, BB }, width, height, offsetLeft, offsetRight, offsetBottom, offsetTop } = prev._bondingbox;


                        //行模式 只计算x轴相关
                        if (layout.col === node.layout) {
                            //位移到最后子节点的后面
                            nodeBox.moveBox(BB.x + offsetRight + nodeBox.offsetLeft, nodeBox.offsetTop);
                            //计算父级宽度 取最大
                            mx = Math.max(selfBox.width, nodeBox.inbox.AA.x + nodeBox.offsetRight + nodeBox.width);
                            my = Math.max(nodeBox.height + offsetTop + offsetBottom, nodeBox.height);
                        } else if (layout.row === node.layout) {
                            //位移到最后子节点的下面
                            nodeBox.moveBox(nodeBox.offsetLeft, BB.y + offsetBottom + nodeBox.offsetTop);
                            my = nodeBox.offsetBottom + nodeBox.inbox.BB.y;
                            //计算父级高度，递增
                            mx = Math.max(nodeBox.width + nodeBox.offsetLeft + nodeBox.offsetRight, selfBox.width);
                        }

                        this.resize(mx, my);

                        //最后的元素为行元素   
                    } else if (layout.row === layType) {

                        const { inbox: { AA, BB }, height, offsetBottom } = prev._bondingbox;
                        const marginX = nodeBox.offsetLeft + nodeBox.offsetRight
                        let mx, my;

                        //无论如何都会变成0+margin为AA 这里主要计算本身元素的宽度，
                        nodeBox.moveBox(nodeBox.offsetLeft, BB.y + offsetBottom + nodeBox.offsetTop);
                        my = nodeBox.inbox.BB.y + offsetBottom;
                        mx = Math.max(selfBox.width, marginX + nodeBox.width);

                        //列元素 填充高度
                        if (layout.row === node.layout) {
                            //没有设置宽度
                            if (node.expand)
                                node.resize(mx - marginX, nodeBox.height)
                        }

                        this.resize(mx, my);
                    }


                    //第一个节点
                } else {
                    let { width, height, offsetLeft, offsetRight, offsetTop, offsetBottom } = nodeBox;
                    let mx = offsetLeft + offsetRight + width;
                    let my = offsetTop + height + offsetBottom;
                    this.resize(mx, my);
                }

            }


            addNode(node: vBox) {

                let nodeBox = node._bondingbox;
                let selfBox = this._bondingbox;
                let last_child = this.children[this.children.length - 1];

                if (last_child) {

                    last_child.nextNode = node;
                    node.prevNode = last_child;

                    let layType = last_child.layout;

                    //最后的元素为列元素
                    if (layout.col === layType) {

                        const { inbox: { BB }, offsetRight, offsetBottom } = last_child._bondingbox;
                        let mx, my;

                        //行模式 只计算x轴相关
                        if (layout.col === node.layout) {
                            //位移到最后子节点的后面
                            nodeBox.moveBox(BB.x + offsetRight + nodeBox.offsetLeft);
                            mx = nodeBox.inbox.AA.x + nodeBox.offsetRight;
                            //计算父级宽度 取最大
                            mx = Math.max(selfBox.width, mx);
                            my = nodeBox.height;
                        } else if (layout.row === node.layout) {
                            //位移到最后子节点的下面
                            nodeBox.moveBox(nodeBox.offsetLeft, BB.y + nodeBox.offsetTop);
                            my = nodeBox.offsetBottom + nodeBox.inbox.BB.y;
                            //计算父级高度，递增
                            mx = Math.max(nodeBox.width + nodeBox.offsetLeft + nodeBox.offsetRight, selfBox.width);
                        }


                        this.resize(mx, my);

                        //最后的元素为行元素   
                    } else if (layout.row === layType) {

                        const { inbox: { BB }, offsetBottom } = last_child._bondingbox;
                        const marginX = nodeBox.offsetLeft + nodeBox.offsetRight
                        let mx, my;

                        //无论如何都会变成0+margin为AA 这里主要计算本身元素的宽度，
                        nodeBox.moveBox(nodeBox.offsetLeft, BB.y + offsetBottom + nodeBox.offsetTop);
                        my = nodeBox.inbox.BB.y + offsetBottom;
                        mx = Math.max(selfBox.width, marginX + nodeBox.width);

                        //列元素 填充高度
                        if (layout.row === node.layout) {
                            //没有设置宽度
                            if (node.expand)
                                node.resize(mx - marginX, nodeBox.height)
                        }

                        this.resize(mx, my);
                    }


                    //第一个节点
                } else {
                    let { width, height, offsetLeft, offsetRight, offsetTop, offsetBottom } = nodeBox;
                    let mx = offsetLeft + offsetRight + width;
                    let my = offsetTop + height + offsetBottom;
                    this.resize(mx, my);
                }
                //增加node节点
                node.parent = this;
                if (this.children.indexOf(node) == -1)
                    this.children.push(node);

            }


        }

    }
}