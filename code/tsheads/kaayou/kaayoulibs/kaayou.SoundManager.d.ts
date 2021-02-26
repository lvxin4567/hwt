declare namespace kaayou {
    class SoundManager {
        static __INS__: SoundManager;
        static getInstance(): SoundManager;
        init(): void;
        playBgm(url: string, loop?: boolean): void;
        playSound(url: string, loop?: boolean): void;
        setMute(b: boolean): void;
        /**
         *
         * @param isRelease 是否释放声音数据，默认为false
         */
        stopMusic(isRelease?: boolean): void;
        pauseMusic(): void;
        resumeMusic(): void;
        defaultSound: {
            [key: string]: string;
        };
        setDefaultSound(a: {
            [key: string]: string;
        }): void;
        setBtnClickSounds(): void;
        setCloceSounds(): void;
        setSwitchSounds(): void;
    }
    function MakeResultMessageHead(head: string): string;
}
