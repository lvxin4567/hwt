declare namespace ccs {

  class armatureDataManager {
    removeArmatureFileInfo(configFilePath: string);

    /**
     * Adds armature data
     * @param {string} id The id of the armature data
     * @param {ccs.ArmatureData} armatureData
     */
    addArmatureData(id: string, armatureData: any, configFilePath);
    /**
     * Gets armatureData by id
     * @param {String} id
     * @return {ccs.ArmatureData}
     */
    getArmatureData(id: string);

    /**
     * Removes armature data from armature data manager.
     * @param {string} id
     */
    removeArmatureData(id: string);

    /**
     * Adds animation data to armature data manager.
     * @param {String} id
     * @param {ccs.AnimationData} animationData
     */
    addAnimationData(id: string, animationData: any, configFilePath: string);

    /**
     * Gets animationData by id
     * @param {String} id
     * @return {ccs.AnimationData}
     */
    getAnimationData(id: string);

    /**
     * Removes animation data
     * @param {string} id
     */
    removeAnimationData(id: string);
    /**
     * Adds texture data to Armature data manager.
     * @param {String} id
     * @param {ccs.TextureData} textureData
     */
    addTextureData(id: string, textureData: any, configFilePath: string);
    /**
     * Gets textureData by id
     * @param {String} id
     * @return {ccs.TextureData}
     */
    getTextureData(id: string);

    /**
     * Removes texture data by id
     * @param {string} id
     */
    removeTextureData(id: string)

    /**
     * Adds ArmatureFileInfo, it is managed by CCArmatureDataManager.
     * @param {String} imagePath
     * @param {String} plistPath
     * @param {String} configFilePath
     * @example
     * //example1
     * ccs.armatureDataManager.addArmatureFileInfo("res/test.json");
     * //example2
     * ccs.armatureDataManager.addArmatureFileInfo("res/test.png","res/test.plist","res/test.json");
     */
    static addArmatureFileInfo(imagePath: string, plistPath?: string, configFilePath?: string);
    /**
     * Adds ArmatureFileInfo, it is managed by CCArmatureDataManager.
     * @param {String} imagePath
     * @param {String} plistPath
     * @param {String} configFilePath
     * @param {Function} selector
     * @param {Object} target
     */
    addArmatureFileInfoAsync( /*imagePath, plistPath, configFilePath, selector, target*/)

    /**
     * Add sprite frame to CCSpriteFrameCache, it will save display name and it's relative image name
     * @param {String} plistPath
     * @param {String} imagePath
     * @param {String} configFilePath
     */
    addSpriteFrameFromFile(plistPath: string, imagePath: string, configFilePath: string)

    /**
     * Returns whether or not need auto load sprite file
     * @returns {boolean}
     */
    isAutoLoadSpriteFile()

    /**
     * Returns armature Data of Armature data manager.
     * @return {Object}
     */
    getArmatureDatas()

    /**
     * Returns animation data of Armature data manager.
     * @return {Object}
     */
    getAnimationDatas()

    /**
     * Returns texture data of Armature data manager.
     * @return {Object}
     */
    getTextureDatas()
    /**
     * Adds RelativeData of Armature data manager.
     * @param {String} configFilePath
     */
    addRelativeData(configFilePath: string)
    /**
     * Gets RelativeData of Armature data manager.
     * @param {String} configFilePath
     * @returns {ccs.RelativeData}
     */
    getRelativeData(configFilePath: string)

    /**
     * Clear data
     */
    clear()

  }


}