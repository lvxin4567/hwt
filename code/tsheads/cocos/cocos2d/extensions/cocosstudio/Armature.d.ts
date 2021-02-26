
/// <reference path="../../cocos2d-lib.d.ts" />

declare namespace ccs {

    class Armature extends cc.Node {
        animation;


        /**
 * Create a armature node.
 * Constructor of ccs.Armature
 * @param {String} name
 * @param {ccs.Bone} parentBone
 * @example
 * var armature = new ccs.Armature();
 */
        ctor(name: string, parentBone: any);

        /**
         * Initializes a CCArmature with the specified name and CCBone
         * @param {String} [name]
         * @param {ccs.Bone} [parentBone]
         * @return {Boolean}
         */
        // init(name:string, parentBone:ccs.Bone) :boolean

        visit(parent: any);

        addChild(child, localZOrder, tag)

        /**
         * create a bone with name
         * @param {String} boneName
         * @return {ccs.Bone}
         */
        createBone(boneName: string)

        /**
         * Add a Bone to this Armature
         * @param {ccs.Bone} bone  The Bone you want to add to Armature
         * @param {String} parentName The parent Bone's name you want to add to. If it's  null, then set Armature to its parent
         */
        addBone(bone: any, parentName: string)

        /**
         * Remove a bone with the specified name. If recursion it will also remove child Bone recursively.
         * @param {ccs.Bone} bone The bone you want to remove
         * @param {Boolean} recursion Determine whether remove the bone's child  recursion.
         */
        removeBone(bone: any, recursion: boolean)

        /**
         * Gets a bone with the specified name
         * @param {String} name The bone's name you want to get
         * @return {ccs.Bone}
         */
        getBone(name: string);

        /**
         * Change a bone's parent with the specified parent name.
         * @param {ccs.Bone} bone The bone you want to change parent
         * @param {String} parentName The new parent's name
         */
        changeBoneParent(bone: any, parentName: string);

        /**
         * Get CCArmature's bone dictionary
         * @return {Object} Armature's bone dictionary
         */
        getBoneDic();

        /**
         * Set contentSize and Calculate anchor point.
         */
        updateOffsetPoint()

        getOffsetPoints()

        /**
         * Sets animation to this Armature
         * @param {ccs.ArmatureAnimation} animation
         */
        setAnimation(animation: any);

        /**
         * Gets the animation of this Armature.
         * @return {ccs.ArmatureAnimation}
         */
        getAnimation()
        /**
         * armatureTransformDirty getter
         * @returns {Boolean}
         */
        getArmatureTransformDirty();

        /**
         * The update callback of ccs.Armature, it updates animation's state and updates bone's state.
         * @override
         * @param {Number} dt
         */
        update(dt: number)

        /**
         * The callback when ccs.Armature enter stage.
         * @override
         */
        onEnter()

        /**
         * The callback when ccs.Armature exit stage.
         * @override
         */
        onExit()

        /**
         * This boundingBox will calculate all bones' boundingBox every time
         * @returns {cc.Rect}
         */
        getBoundingBox()

        /**
         * when bone  contain the point ,then return it.
         * @param {Number} x
         * @param {Number} y
         * @returns {ccs.Bone}
         */
        getBoneAtPoint(x: number, y: number)

        /**
         * Sets parent bone of this Armature
         * @param {ccs.Bone} parentBone
         */
        setParentBone(parentBone: any)

        /**
         * Return parent bone of ccs.Armature.
         * @returns {ccs.Bone}
         */
        getParentBone()

        /**
         * draw contour
         */
        drawContour()

        setBody(body: any)

        getShapeList()

        getBody()
        /**
         * Sets the blendFunc to ccs.Armature
         * @param {cc.BlendFunc|Number} blendFunc
         * @param {Number} [dst]
         */
        setBlendFunc(blendFunc: any, dst: number);

        /**
         * Returns the blendFunc of ccs.Armature
         * @returns {cc.BlendFunc}
         */
        getBlendFunc()

        /**
         * set collider filter
         * @param {ccs.ColliderFilter} filter
         */
        setColliderFilter(filter)

        /**
         * Returns the armatureData of ccs.Armature
         * @return {ccs.ArmatureData}
         */
        getArmatureData()

        /**
         * Sets armatureData to this Armature
         * @param {ccs.ArmatureData} armatureData
         */
        setArmatureData(armatureData)
        getBatchNode()
        setBatchNode(batchNode: any)
        /**
         * version getter
         * @returns {Number}
         */
        getVersion()

        /**
         * version setter
         * @param {Number} version
         */
        setVersion(version: number)

        _createRenderCmd()


        static create(name: string, parentBone: any);

    }




}

