namespace common {
    export namespace RDom {

        const htmlparser2 = require("htmlparser2");
        const css = require("css");
        //解决转换的问题
        export const parseCss = function (source: string): CSS { return css.parse(source) };


        export const makeCss = (sheets: Array<CSS>): any => {

            let lookup = remake(sheets);

            return walker((path, source) => source[path], lookup);


            function walker(fn, table) {

                return wrapper;

                function wrapper(...args) {
                    if (args.length === 0) return undefined;
                    return args.reduce((s, v) => {
                        if (/undefined|null/.test(s))
                            return undefined;
                        return fn.call(this, v, s);
                    }, table)
                }

            }

        }


        const solvePath = (node: HTMLNode, out = null) => {

            if (node.parent === null ||
                lodash.eq(node.attribs, undefined) && lodash.eq(out, undefined))
                return out;

            out = out || [];

            if (node.attribs && node.attribs.class)
                _solvePath(node.attribs.class, out);

            return solvePath(node.parent, out);

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

        }

        /**
         * 
         * @param arr 
         * @param sheet 
         * @param base 本身的样式表，不继承
         */
        const scanCss = (arr, sheet, base: Array<string>) => {

            let out = {}

            arr.forEach(v => {

                let last: string = lodash.last(v);

                if (base.indexOf(last) !== -1) {

                    let query = sheet(...v)

                    if (query !== undefined)
                        lodash.extend(out, query.$style);

                }


                let queryAg = v.slice(0, v.length - 1)
                if (queryAg.length > 0) {
                    let queryPrev = sheet(queryAg);

                    if (queryPrev !== undefined)
                        if (queryPrev.$style)
                            lodash.extend(out, lodash.pick(queryPrev.$style, ["font-size","color","hover-color"]));
                }

            })

            return out;

        }



        export const conbineStyle = (node: vBox, sheet) => {

            let { HNode } = node;
            let attr: any = HNode.attribs || { style: {}, class: null };
            let out = {}
            let base: any = (attr.class && attr.class.split(/\s+/).map(v => "." + v)) || [];

            let klass = solvePath(HNode);
            let css = scanCss(klass, sheet, base);

            lodash.extend(out, css, attr.style);

            return out;
        }

        //font-size , color , 
        export const parseCssAttr = (str) => {
            let cssReg = /([\w\-]+)\:([\w\-]+)/g
            return str.match(cssReg).reduce((out, v) => {
                v = v.split(":")
                out[v[0]] = v[1]
            }, {})
        }

        export const CSSInHTMLNode = (node: HTMLNode) => {

            return makeCss(map2findCss(node));

            function map2findCss(node: HTMLNode, out = []) {

                if (node.type === "style") {
                    out.push(node.children[0].data);
                    return out;
                }

                if (node.children)
                    node.children.forEach(v => {
                        map2findCss(v, out)
                    })

                return out;

            }
        }

        //重新建立结构，方便索引
        function remake(styles) {

            let out = {}
            styles.map(v => parseCss(v)).forEach(v => {
                _remake(v.stylesheet, out)
            })

            return out;

            function _remake(sheet, css: object = {}) {

                let oper = [">"];

                lodash.forEach(sheet.rules, function (v) {
                    let { declarations, selectors } = v;
                    let selector: Array<string> = lodash.head<string>(selectors).split(/\s+/);
                    let temp;

                    selector.reduce((a, c) => {

                        if (oper.indexOf(c) === -1)
                            if (lodash.eq(temp, undefined))
                                temp = css[c] = css[c] || {};
                            else
                                temp = temp[c] = temp[c] || {}

                        applyCss(temp, declarations, a, lodash.last(selector) === c);

                        return c;

                    }, lodash.head(selector));

                })


                function format(decla) {
                    let out = {}
                    decla.forEach(v => {
                        let { property, value } = v;
                        out[property] = value
                    });
                    return out;
                }

                function applyCss(tcss, attrs, prev: string = null, isLast: boolean = false) {

                    if (oper.indexOf(prev) !== -1) {
                        tcss.onlyChild = true;
                    }

                    if (isLast) {
                        tcss.$style = format(attrs)
                    }

                }

            }

        }


    }
}