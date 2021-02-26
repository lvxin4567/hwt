/*
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    const htmlparser2 = require('htmlparser2');
    const cssparse = require('css');

    const boxStyle = {
        display: "block",
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        position: null,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: 16
    };
    //转驼峰
    function transformStrToHump(str) {
        var re = /-(\w)/g;
        return str.replace(re, function ($0, $1) {
            return $1.toUpperCase();
        });
    }


    function parseCss(styles) {
        styles = lodash.trim(styles || '');
        if (!styles) return {};
        return styles
            .split(';')
            .reduce(function (obj, str) {
                var n = str.indexOf(':');
                if (n < 1 || n === str.length - 1) return obj;
                let skey = lodash.trim(str.slice(0, n));
                skey = transformStrToHump(skey);
                obj[skey] = lodash.trim(str.slice(n + 1));
                return obj;
            }, {});
    }

    function _solvePath(klass, out) {

        if (out.length === 0)
            return klass.split(/\s+/).forEach(v => {
                out.push(["." + v]);
            });
        let temp = []
        klass.split(/\s+/).forEach(function (v) {

            lodash.forEach(out, (path) => {
                temp.push([].concat("." + v, path))
            })
        })
        lodash.forEach(temp, v => {
            out.push(v);
        })

    }

    function getSheetPath(node, out = undefined, start = undefined) {

        //最上节点
        if (node.parent === null ||
            //如果一开始都没class的 不处理
            lodash.eq(node.attribs, undefined) && lodash.eq(out, undefined) ||
            !lodash.eq(start, undefined) && lodash.eq(start.attribs, undefined) ||
            !lodash.eq(start, undefined) && !lodash.eq(start.attribs, undefined) && lodash.eq(start.attribs.class, undefined))
            return out || [];

        out = out || [];
        start = start || node

        if (lodash.eq(node.attribs, undefined) === false)
            if (!lodash.eq(node.attribs.class, undefined))
                _solvePath(node.attribs.class, out)

        return getSheetPath(node.parent, out, start);

    }


    function getSheetCss(node, sheet): { [key: string]: any } {
        let paths = this.getSheetPath(node);
        let out = {}
        lodash.forEach(paths, v => {
          let css = sheet.apply(this, v) || {};
          lodash.forEach(css.$style || {}, (v, k) => {
            out[transformStrToHump(k)] = v;
          })
        })
        return out;
      }


    export class RLayout extends kaayou.Block {

        _content: string = "";
        private _rect: cc.Rect = null;
        public setContent(content: string) {
            this._content = content;
            this.doParse();
        }


        protected doParse() {
            this._rect = this.getBoundingBox();

        }

        private isNessaryNode(node) {
            let isNotEmptyText = dnode => !lodash.isEmpty(dnode.data) && !lodash.isEmpty(lodash.trim(dnode.data));
            switch (node && node.type) {
                case "checkbox":
                case "radio":
                case "number":
                case "label":
                case "tag":
                case "tip":
                case "richlabel":
                case "p":
                //先增加root。。。
                case "root":
                    return true;
                case "text":
                    return isNotEmptyText(node);
            }
            return false;
        }

        //计算相对盒子 以给定节点为起始
        protected updateAABBBox(node, root, sheet) {

            if (node.children !== undefined && node.children instanceof Array) {
                lodash.forEach(node.children, (n) => {
                    this.updateAABBBox(n, root, sheet)
                })
            }

            // this.updateAABBBox(node,root, true)
            if (!this.isNessaryNode(node))
                return;

            //N叉的最深节点
            let AA = cc.p(0, 0);
            let BB = cc.p(0, 0);
            let at = node._attr = node._attr || {};
            at.inbox = at.inbox || { AA, BB };

            let that = this;
            let rootRect = that._rect;
            let $styleSheets = (node) => parseCss(node.attribs && node.attribs.style || null);
            let css = lodash.extend({}, boxStyle, getSheetCss(node, sheet), $styleSheets(node));
            let attr = node.attribs || { text: "" };
            //如果不换行，marginbottom不做计算
            //外围盒子需做计算
            let { marginLeft, marginTop, marginRight, marginBottom, position, left, top, display } = css;
            let fontSize = parseInt(this.getParentInheritor(node, "fontSize", root) || this.getInheritorSheet(node, "font-size", sheet));
            let lineHeight = this.getParentInheritor(node, "lineHeight", root) || inheritorStyle.lineHeight;

            if (lodash.eq(display, "none"))
                return;


            handleBlock(node, function (ds) {
                display = ds;
            })

            css.fontSize = fontSize || 40
            if (lodash.eq(lineHeight, null) === false)
                css.lineHeight = parseInt(lineHeight);

            let leftBox = this.getPreNodeBox(node, sheet);
            let { width = 0, height = 0 } = getComponentSize(node.type, node, lodash.extend(css, inheritorStringStyle), attr);
            if (css.width !== 0)
                width = parseInt(css.width);
            if (css.height !== 0)
                height = parseInt(css.height);
            //absolute不计入父级宽高计算
            if (lodash.eq(position, "absolute")) {
                AA.addSelf(new cc.Vec2(parseInt(left) + parseInt(marginLeft), parseInt(top) + parseInt(marginTop)));
                BB.addSelf(new cc.Vec2(AA.x, AA.y).add(new cc.Vec2(width, height)));
                return node;
            }




            // if(lodash.eq(position,"relative")){
            //   AA.add(new cc.Vec2(leftBox.clientLeft + left + marginLeft,leftBox.clientTop + top + marginTop));
            //   BB.add((new cc.Vec2(AA.x,AA.y)).add(width,height));
            // }

            //先不做换行,所有inline-block都是一行
            //优先处理inline-block
            if (lodash.eq(display, "inline-block")) {
                // let w = that._rect.width;
                // let h = that._rect.height;

                if (lodash.eq(leftBox, null)) {
                    AA.addSelf(new cc.Vec2(parseInt(marginLeft), parseInt(marginTop)));
                } else {
                    let { clientRight } = leftBox;
                    AA.addSelf(new cc.Vec2(AA.x + clientRight + parseInt(marginLeft), AA.y + parseInt(marginTop)));
                }

                BB.addSelf(new cc.Vec2(AA.x, AA.y).add(new cc.Vec2(width, height)));

            }

            if (lodash.eq(display, "block")) {

                let pw = rootRect.width;
                //占整行
                if (lodash.eq(leftBox, null)) {
                    AA.addSelf(new cc.Vec2(parseInt(marginLeft), parseInt(marginTop)));
                    BB.addSelf((new cc.Vec2(AA.x, AA.y)).add(new cc.Vec2(pw, height)));
                } else {
                    let { clientBottom } = leftBox;
                    AA.addSelf(new cc.Vec2(AA.x + parseInt(marginLeft), clientBottom + parseInt(marginTop)));
                    BB.addSelf((new cc.Vec2(AA.x, AA.y)).add(new cc.Vec2(pw, height)));
                }


            }

            // if(lodash.eq(display,"block")){

            // }

            return node;

            // function getComponentSize(type, node, ...args) {
            //   switch (type) {
            //     case "checkbox":
            //       return that.measureCheckBox(...args);
            //     case "radio":
            //       return that.measureRadio(...args)
            //     case "number":
            //       return that.measureNumberBox(...args);
            //     case "label":
            //       let text = node.children[0]
            //       return that.measureText(text.data.trim(), ...args);
            //     case "text":
            //       return that.measureText(node.data.trim(), ...args);
            //     case "richlabel":
            //       return that.measureRichLabel(node.attribs.text.trim(), ...args);
            //     case "tip":
            //       return that.measureTip(...args)
            //     case "tag":
            //       return parseTag(node)
            //   }
            //   return { width: 0, height: 0 }

            //   function parseTag(node) {
            //     switch (node.name) {
            //       case "label":
            //         return getComponentSize(node.name, node, ...args);
            //       case "input":
            //         return getComponentSize(node.attribs.type, node, ...args);
            //     }
            //     return { wdith: 0, height: 0 };
            //   }

            // }




            // function handleBlock(node, call) {
            //   switch (node && node.type) {
            //     case "a":
            //     case "text":
            //     case "label":
            //     case "richlabel":
            //       return call("inline-block")
            //     case "tag":
            //       return handleBlock({ type: node.name }, call);
            //   }
            // }

        }

        //预解析，添加一个root节点，如果没有root节点会很麻烦
        protected preparser(domstr: string) {

            var dom = htmlparser2.parseDOM(domstr),
                // Generic root element
                root = htmlparser2.parseDOM('<root></root>')[0];

            root.type = 'root';
            // console.log(dom);
            // console.log(htmlparser2.parseDOM(domstr)[0])
            // console.log(this.measureCheckBox({},{text:"hao123"}));
            // let td = htmlparser2.parseDOM(domstr)[0];
            // console.log();

            this.updateDom(dom, root);
            // 先做显示隐藏，后续做
            // this.initEmitHandle(root);
            // this.updateHandledNode(root);
            this.updateAABBBox(root, root, this.makeCSS(root));
            this.mergeBox(root)
            // var root = htmlparser2.parseDOM(domstr);

            return root;
        }


        //更新节点树
        protected updateDom(arr, parent) {
            //序列化一下
            if (!Array.isArray(arr)) arr = [arr];

            //设置子节点
            if (parent) {
                parent.children = arr;
            } else {
                parent = null;
            }

            // 更新所有子节点的父节点
            for (var i = 0; i < arr.length; i++) {
                var node = arr[i];

                // 删除旧的父节点
                var oldParent = node.parent || node.root,
                    oldSiblings = oldParent && oldParent.children;
                if (oldSiblings && oldSiblings !== arr) {
                    oldSiblings.splice(oldSiblings.indexOf(node), 1);
                    if (node.prev) {
                        node.prev.next = node.next;
                    }
                    if (node.next) {
                        node.next.prev = node.prev;
                    }
                }

                if (parent) {
                    node.prev = arr[i - 1] || null;
                    node.next = arr[i + 1] || null;
                } else {
                    node.prev = node.next = null;
                }

                if (parent && parent.type === 'root') {
                    node.root = parent;
                    node.parent = node.root;
                } else {
                    node.root = null;
                    node.parent = parent;
                }
            }

            return parent;
        };


    }
}*/