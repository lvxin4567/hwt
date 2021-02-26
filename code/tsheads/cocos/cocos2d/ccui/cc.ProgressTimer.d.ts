
declare namespace cc {

    class ProgressTimer extends cc.Node {

        ctor(sprite);

        onEnter();

        cleanup();

        /**
         *    Midpoint is used to modify the progress start position.
         *    If you're using radials type then the midpoint changes the center point
         *    If you're using bar type the the midpoint changes the bar growth
         *        it expands from the center but clamps to the sprites edge so:
         *        you want a left to right then set the midpoint all the way to cc.p(0,y)
         *        you want a right to left then set the midpoint all the way to cc.p(1,y)
         *        you want a bottom to top then set the midpoint all the way to cc.p(x,0)
         *        you want a top to bottom then set the midpoint all the way to cc.p(x,1)
         *  @return {cc.Point}
         */
        getMidpoint();

        /**
         * Midpoint setter
         * @param {cc.Point} mpoint
         */
        setMidpoint(mpoint);

        /**
         *    This allows the bar type to move the component at a specific rate
         *    Set the component to 0 to make sure it stays at 100%.
         *    For example you want a left to right bar but not have the height stay 100%
         *    Set the rate to be cc.p(0,1); and set the midpoint to = cc.p(0,.5f);
         *  @return {cc.Point}
         */
        getBarChangeRate();

        /**
         * @param {cc.Point} barChangeRate
         */
        setBarChangeRate(barChangeRate: cc.Point);

        /**
         *  Change the percentage to change progress
         * @return {cc.ProgressTimer.TYPE_RADIAL|cc.ProgressTimer.TYPE_BAR}
         */
        getType();

        /**
         * Percentages are from 0 to 100
         * @return {Number}
         */
        getPercentage(): number;

        /**
         * The image to show the progress percentage, retain
         * @return {cc.Sprite}
         */
        getSprite(): cc.Sprite;

        /**
         * from 0-100
         * @param {Number} percentage
         */
        setPercentage(percentage: number);
        /**
         * only use for jsbinding
         * @param bValue
         */
        setOpacityModifyRGB(bValue);
        /**
         * only use for jsbinding
         * @returns {boolean}
         */
        isOpacityModifyRGB(): boolean;
        /**
         * return if reverse direction
         * @returns {boolean}
         */
        isReverseDirection(): boolean;

        /**
         * set color of sprite
         * @param {cc.Color} color
         */
        setColor(color: cc.Color);

        /**
         *  set opacity of sprite
         * @param {Number} opacity
         */
        setOpacity(opacity: number);

        /**
         * return color of sprite
         * @return {cc.Color}
         */
        getColor(): cc.Color;

        /**
         * return Opacity of sprite
         * @return {Number}
         */
        getOpacity(): number;

        /**
         * set reverse cc.ProgressTimer
         * @function
         * @param {Boolean} reverse
         */
        setReverseProgress(reverse): boolean;

        /**
         * set sprite for cc.ProgressTimer
         * @function
         * @param {cc.Sprite} sprite
         */
        setSprite(sprite: cc.Sprite);




        /**
         * set Progress type of cc.ProgressTimer
         * @function
         * @param {cc.ProgressTimer.TYPE_RADIAL|cc.ProgressTimer.TYPE_BAR} type
         */
        setType(type: number);

        /**
         * Reverse Progress setter
         * @function
         * @param {Boolean} reverse
         */
        setReverseDirection(reverse: boolean);

        /**
         * Initializes a progress timer with the sprite as the shape the timer goes through
         * @function
         * @param {cc.Sprite} sprite
         * @return {Boolean}
         */
        initWithSprite(sprite: cc.Sprite);


        static create(sprite: cc.Sprite): cc.ProgressTimer;

        /**
         * @constant
         * @type Number
         */
        static TEXTURE_COORDS_COUNT: number;

        /**
         * @constant
         * @type Number
         */
        static TEXTURE_COORDS: number;

        /**
         * Radial Counter-Clockwise
         * @type Number
         * @constant
         */
        static TYPE_RADIAL: number;

        /**
         * Bar
         * @type Number
         * @constant
         */
        static TYPE_BAR: number;


    }
}

