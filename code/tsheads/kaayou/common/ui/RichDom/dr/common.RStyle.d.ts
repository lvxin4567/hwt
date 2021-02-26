declare namespace common {
    namespace RDom {
        const parseCss: (source: string) => CSS;
        const makeCss: (sheets: Array<CSS>) => any;
        const conbineStyle: (node: vBox, sheet: any) => {};
        const parseCssAttr: (str: any) => any;
        const CSSInHTMLNode: (node: HTMLNode) => any;
    }
}
