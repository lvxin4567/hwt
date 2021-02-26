namespace kaayou {
    export class SoundManager {
        static __INS__: SoundManager = null;
        static getInstance() {
            if (SoundManager.__INS__ == null) {
                SoundManager.__INS__ = new SoundManager();
                SoundManager.__INS__.init();
            }
            return SoundManager.__INS__;
        }
        init() { }

        //播放背景音乐
        playBgm(url: string, loop: boolean = true) {
            if ('false' === cc.sys.localStorage.getItem('tog_music')) {
                return;
            }
            if (!url) {
                console.log("不存在音乐:" + url);
                return;
            }
            cc.audioEngine.playMusic(url, loop);
        }

        //bofang yinxiao
        playSound(url: string, loop: boolean = false) {
            if ('false' === cc.sys.localStorage.getItem('tog_effect')) {
                return;
            }
            if (!url) {
                console.log("不存在音效:" + url);
                return;
            }
            cc.audioEngine.playEffect(url, loop);
        }

        //是否设置静音,使用云娃的时候会用到
        setMute(b: boolean) {
            if (b) {
                cc.audioEngine.setMusicVolume(0);
                cc.audioEngine.setEffectsVolume(0);
            } else {
                cc.audioEngine.setMusicVolume(0.5);
                cc.audioEngine.setEffectsVolume(0.5);
            }
        }

        /**
         * 
         * @param isRelease 是否释放声音数据，默认为false
         */
        stopMusic(isRelease: boolean = false) {
            cc.audioEngine.stopMusic(isRelease);
        }

        pauseMusic() {
            cc.audioEngine.pauseMusic();
        }

        resumeMusic() {
            cc.audioEngine.resumeMusic();
        }
        defaultSound: { [key: string]: string } = null;
        public setDefaultSound(a: { [key: string]: string }) {
            this.defaultSound = lodash.extend({}, this.defaultSound, a)
        }
        public setBtnClickSounds() {
            let soundres = this.defaultSound['ClickBtn'];
            soundres && this.playSound(soundres);
        }
        public setCloceSounds() {
            let soundres = this.defaultSound['ClickBtnClose'];
            soundres && this.playSound(soundres);
        }
        public setSwitchSounds() {
            let soundres = this.defaultSound['ClickBtnSwitch'];
            soundres && this.playSound(soundres);
        }
        //         cc.audioEngine.playMusic(  url , loop ); 
        // @param {String} url 声音路径
        // @param {Boolean} loop 是否循环播放

        // 停止背景音乐
        // cc.audioEngine.stopMusic (releaseData);
        // * @param {Boolean} releaseData 是否释放声音数据，默认为false

        // 暂停背景音乐
        // cc.audioEngine.pauseMusic();

        // 恢复背景音乐
        // cc.audioEngine.resumeMusic  ();

        // 重新播放背景音乐
        // cc.audioEngine.rewindMusic();

        // 获取背景音乐音量
        // cc.audioEngine.getMusicVolume ();
        // * @return {Number}  值在 0 到 1.0 之间 

        // 设置背景音乐音量
        // cc.audioEngine.setMusicVolume  (volume);
        // * @param {Number} volume 取值范围 0.0~1.0 . 

        // 获取背景音乐是否在播放中
        // cc.audioEngine.isMusicPlaying  ();
        // * @return {Boolean} 正在播放返回true，否则返回false


        // 播放音效(与音乐基本雷同)
        // cc.audioEngine.playEffect(  url , loop ) ;
        // * @param {String} url 音效文件路径
        // * @param {Boolean} loop 是否循环播放，默认值为false
        // * @return {Number|null} 返回音效ID  audioID

        // cc.audioEngine.getEffectsVolume();//获取音效音量
        // cc.audioEngine.setEffectsVolume(volume);//设置音效音量
        // cc.audioEngine.pauseEffect(audioID);//暂停对应的音效
        // cc.audioEngine.pauseAllEffects  ();//暂停所有音效
        // cc.audioEngine. resumeEffect  (audioID);//恢复对应的音效
        // cc.audioEngine. resumeAllEffects  ();//恢复所有音效
        // cc.audioEngine. stopEffect  (audioID);//停止对应的音效
        // cc.audioEngine.  unloadEffect  (url);//卸载内存缓冲区中的音效数据


        // 停止播放所有音乐和音效文件
        // cc.audioEngine.end();




    }

    export function MakeResultMessageHead( head : string ) : string {
        return "ws::Msg::" + head;
    }
}