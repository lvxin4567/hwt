declare namespace kaayou {
    class linear {
        static CubicBezier(p0: any, p1: any, p2: any, p3: any): (offset: any) => any;
        static easeOutCubic(): (offset: any) => any;
        static easeInCubic(): (offset: any) => any;
        static easeInOutQuad(): (offset: any) => any;
        static easeOutQuad(): (offset: any) => any;
        static easeInQuad(): (offset: any) => any;
        static easeInOutSine(): (offset: any) => any;
        static easeOutSine(): (offset: any) => any;
        static easeInSine(): (offset: any) => any;
        static Ease(): (offset: any) => any;
        static EaseIn(): (offset: any) => any;
        static EaseOut(): (offset: any) => any;
        static EaseInOut(): (offset: any) => any;
        static Linear(): (offset: any) => any;
    }
}
