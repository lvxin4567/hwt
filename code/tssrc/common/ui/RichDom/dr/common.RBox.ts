namespace common {


    export namespace RDom {




        const htmlparser2 = require("htmlparser2");
        const css = require("css");



        const pasrseHTML = (source): HTMLNode => {
            return htmlparser2.parseDOM(source)
        }

        const isTextTag = (node: HTMLNode) => {
            let { children, type } = node;
            let types = ["span", "label"]
            if (children.length === 1)
                return children[0].type === "text"
        }

        const isEmptyTag = (node: HTMLNode): boolean => {
            let { children, type, attribs } = node;
            let types = ["div", "p", "label", "span", "b", "strong"];

            if (isTextTag(node) && attribs === undefined)
                return (node.children[0].data.trim()).length === 0

            if (children.length === 0 && (types.indexOf(type) !== -1) && attribs === undefined)
                return true;

            return false;
        }

        const isCSSTag = (node: HTMLNode) => {
            let { type } = node;
            if (type === "style")
                return true;
            return false;
        }


        const perpareNode = (node: HTMLNode, sheet, extra, parent: vBox = new bNode) => {

            //取根节点
            if (node.children)
                node.children.forEach(v => {

                    if ((v.type === "text" || isCSSTag(v) || isEmptyTag(v)) == false) {
                        let kid = new bNode;
                        kid.HNode = v;
                        parent.addNode(kid);
                        lodash.extend(kid.$style, conbineStyle(kid, sheet));
                        perpareNode(v, sheet, extra, kid)
                    }

                });

            return parent;
        }

        const getChildNode = (node: vBox, out = []): Array<vBox> => {

            node.children.forEach(v => {
                getChildNode(v, out);
            })

            if (node.children.length == 0)
                out.push(node);

            return out;

        }


        const mergeChild = (nodes: Array<vBox>, extra: any) => {

            const defaultStyle = extra.$default;
            const root = getTop(nodes[0])

            nodes.forEach(v => {
                mergeInnerBox(v);
            })

            mergeOutBox(root)

            function getTop(node: vBox) {
                if (node.parent)
                    return getTop(node.parent)

                return node;
            }

            function mergeInnerBox(node: vBox) {

                if (node.parent) {
                    const style = lodash.extend({}, defaultStyle, node.parent.$style);

                    if (style.display === "inline-block")
                        node.parent.layout = layout.col;
                    else if (style.display === "block")
                        node.parent.layout = layout.row;

                    node.parent.updateBondingBox();
                    node.parent._bondingbox.margin(
                        parseInt(style["margin-top"]) ^ 0,
                        parseInt(style["margin-right"]) ^ 0,
                        parseInt(style["margin-bottom"]) ^ 0,
                        parseInt(style["margin-left"]) ^ 0
                    );

                    mergeInnerBox(node.parent);
                }
            }


            //由于默认root 所以从0开始
            function mergeOutBox(node: vBox) {
                const { outbox } = node._bondingbox;
                node.children.forEach(v => {
                    let { x, y } = outbox.AA;
                    v._bondingbox.setPosition(x, y);
                    mergeOutBox(v);
                })

            }

        }


        /**
         * 
         * @param source HTML文本
         * @param sheet 样式表对象
         * @param extra 组件说明
         * examples{
         *  
         *      checkbox:{width , height , text}
         *      number:{widht , height ...,text}
         *  
         * }
         * 
         * text需要一个单独计算的方法
         */
        //宽高从哪拿？？？？？
        //1 通过TYPE从extra拿到大小，然后拿文本宽度高度计算出整个组件大小
        //2 只认样式表，如果没样式表默认为宽高为0,建立NET结构之后反推


        export const combine = (source: string, extra): Array<vBox> => {

            let html: HTMLNode = pasrseHTML(`<root>${source}</root>`)[0];
            let csses = CSSInHTMLNode(html);
            //渲染出全部节点的样式
            let root = perpareNode(html, csses, extra);
            let defaultStyle = extra.$default || {};

            let child: Array<vBox> = getChildNode(root);

            child.forEach(v => {

                let _attr: any = v.HNode.attribs || {};
                _attr = lodash.extend({ type: v.HNode.name }, _attr)

                const type = _attr.type;
                const style = lodash.extend({}, defaultStyle, v.$style)
                const size = lodash.extend({}, extra[type], style);

                v._bondingbox.resize(parseInt(size.width) ^ 0, parseInt(size.height) ^ 0);

                v._bondingbox.margin(
                    parseInt(style["margin-top"]) ^ 0,
                    parseInt(style["margin-right"]) ^ 0,
                    parseInt(style["margin-bottom"]) ^ 0,
                    parseInt(style["margin-left"]) ^ 0
                );



                if (style.display === "inline-block")
                    v.layout = layout.col;
                else if (style.display === "block")
                    v.layout = layout.row;

                v.parent.updateBondingBox()

            })

            mergeChild(child, extra);
            let q = queryClassSelector(child);

            return root.children;
        }

        export const queryClassSelector = (all: Array<vBox>) => {

            let mp = new boxMap;
            let table = {}
            let lookup = {}
            let queryLookup = {}

            const getAllNode = (node: vBox, out = []): Array<vBox> => {

                //最顶
                if (node.HNode !== undefined && (node.parent !== null && node.parent.HNode !== undefined))
                    return getAllNode(node.parent);

                applyKid(node);

                return out;

                function applyKid(node) {
                    if (node.HNode)
                        out.push(node)
                    node.children.forEach(v => {
                        applyKid(v)
                    })
                }

            }

            const findAllClass = (node: vBox) => {
                let attr: any = node.HNode.attribs || {};

                if (attr.class === undefined)
                    return null

                return klass(node);

                function klass(node: vBox, out = []) {

                    if (node.HNode === undefined)
                        return out.reverse();

                    let _a: any = node.HNode.attribs || {};

                    if (_a.class !== undefined)
                        out.push(_a.class);


                    if (node.parent)
                        return klass(node.parent, out)

                    return out.reverse();
                }

            }


            const buidMap = (path: Array<String>, scopes: Array<any>) => {

                if (path.length === 0) {
                    return scopes;
                }

                let ps = path.shift();
                let ways = oneWay(ps);

                return buidMap(path, ways)

                function oneWay(str: String) {
                    let cut = str.split(/\s+/);
                    let out = []
                    scopes.forEach(scope => {
                        cut.forEach(v => {
                            scope[v] = scope[v] || {}
                            out.push(scope[v])
                        })
                    })

                    return out;
                }

            }

            const GetParents = (nodes: Array<vBox>): Array<vBox> => {
                let out: Array<vBox> = [];
                nodes.forEach(v => {
                    let p = papa(v);
                    if (out.indexOf(p) == -1)
                        out.push(p);
                })

                return out;

                function papa(node: vBox) {
                    if (node.HNode !== undefined && (node.parent !== null && node.parent.HNode !== undefined))
                        return papa(node.parent)
                    return node;
                }
            }

            const query = (cmd: String): Array<Object> => {
                let out = [];
                let cut = cmd.split(/\s+/);

                return out;
            }

            GetParents(all).forEach(node => {
                getAllNode(node).forEach(ns => {
                    mp.push(ns);
                    let kls = findAllClass(ns).map(v => `.${v}`);

                    let tmp = []
                    kls.shift()
                        .split(/\s+/)
                        .forEach(start => {
                            table[start] = (table[start] || {});
                            tmp.push(table[start])
                        });

                    let res = buidMap(kls, tmp)
                    res.forEach(v => {
                        v.item = v.item || [];
                        if (ns.cid !== undefined && lookup[ns.cid] === undefined) {
                            v.item.push(ns.cid)
                            lookup[ns.cid] = true;
                        }
                    })
                });
            })


            //查询从后向前
            //类似坏匹配



            return function (cmd: String) {

                // let path  = query.split(/\s+/);
                // let res = table[path[0]];
                let res: any = query(cmd);

                return res.item.map(v => mp.searchByID(v)) || null;
            }

        }

    }
}