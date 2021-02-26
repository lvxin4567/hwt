// declare namespace spine {

//     export class Animation { }
//     export class Bone { }
//     export class BoneData { }
//     export class Event { }
//     export class EventData { }
//     export class IkConstraint { }
//     export class PathConstraint { }
//     export class PathConstraintData { }
//     export class Assets {
//         loaded();

//     }
//     export class SharedAssetManager {
//         queueAsset(clientId, textureLoader, path): boolean;
//         loadText(clientId, path);
//         loadJson(clientId, path);
//         loadTexture(clientId, textureLoader, path)
//         get(clientId, path): any;
//     }
//     export class Skeleton { }
//     export class SkeletonBounds { }
//     export class SkeletonClipping { }
//     export class SkeletonData { }
//     export class SkeletonJson { }
//     export class Skin { }
//     export class Slot { }
//     export class SlotData { }
//     export class Texture { }
//     export class TextureAtlas { }
//     export class TextureAtlasReader { }
//     export class TransformConstraint { }
//     export class TransformConstraintData { }
//     export class Triangulator { }
//     export class IntSet { }
//     export class Color { }
//     export class AnimationStateData{}
// }



declare namespace sp {

    export namespace spine {
    
        export class Animation { }
        export class Bone { }
        export class BoneData { }
        export class Event { }
        export class EventData { }
        export class IkConstraint { }
        export class PathConstraint { }
        export class PathConstraintData { }
        export class Assets {
            loaded();
        }
        export class SharedAssetManager {
            queueAsset(clientId, textureLoader, path): boolean;
            loadText(clientId, path);
            loadJson(clientId, path);
            loadTexture(clientId, textureLoader, path)
            get(clientId, path): any;
        }
        export class Skeleton { }
        export class SkeletonBounds { }
        export class SkeletonClipping { }
        export class SkeletonData { }
        export class SkeletonJson { }
        export class Skin { }
        export class Slot { }
        export class SlotData { }
        export class Texture { }
        export class TextureAtlas { }
        export class TextureAtlasReader { }
        export class TransformConstraint { }
        export class TransformConstraintData { }
        export class Triangulator { }
        export class IntSet { }
        export class Color { }
        export class AnimationStateData { }
    }


    export enum ANIMATION_EVENT_TYPE {
        START,
        INTERRUPT,
        END,
        DISPOSE,
        COMPLETE,
        EVENT
    }

    class Skeleton extends cc.Node {
        _skeleton: any
        _rootBone: any;
        _timeScale: number;
        _debugSlots: boolean;
        _debugBones: boolean;
        _premultipliedAlpha: boolean;
        _ownsSkeletonData: any;
        _atlas: any;
        ctor(skeletonDataFile: string, atlasFile: string, scale: number);
        onEnter();
        onExit();
        setDebugSolots(enable: boolean);
        setDebugBones(enable: boolean);
        setDebugSlotsEnabled(enable: boolean);
        getDebugSlotsEnabled(): boolean;
        setDebugBonesEnabled(enable: boolean);
        getDebugBonesEnabled(): boolean;
        setTimeScale(scale: number);
        getTimeScale(): number;
        initWithArgs(skeletonDataFile: string, atlasFile: string, scale: number);
        getBoundingBox(): cc.Rect;
        updateWorldTransform();
        setToSetupPose();
        setBonesToSetupPose();
        setSlotsToSetupPose();
        findBone(boneName: string): spine.Bone;
        findSlot(slotName:string):spine.Slot;
        setSkin(skinName);
        setSkeletonData(skeletonData:spine.SkeletonData, ownsSkeletonData:spine.SkeletonData);
    }
    export function TrackEntryListeners(...agrs);

    export class SkeletonAnimation extends Skeleton{
        _state: any;
        _ownsAnimationStateData: boolean;
        _listener: any;
        setAnimationStateData(stateData: spine.AnimationStateData);
        setAnimationListener(target: any, callback: Function);
        setAnimation(trackIndex: number, name: string, loop: boolean);
        addAnimation(trackIndex: number, name: string, loop: boolean, delay: number);
        findAnimation(name: string);
        getCurrent(trackIndex:number);
        clearTracks();
        clearTrack(trackIndex:number);
        getState();
        setCompleteListener(listener:Function);
        static createWithJsonFile(skeletonDataFile: string | spine.SkeletonData, atlasFile: string, scale: number): SkeletonAnimation;
    }
}