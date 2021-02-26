declare namespace lobby {
    class AreaImgRadio extends kaayou.Block {
        radioBg: ccui.ImageView;
        radioStr: ccui.ImageView;
        value: string;
        _isInit: boolean;
        initWithNodeNoClone(node: ccui.Widget): void;
        doInitAndShow(i: number, call: Function): void;
        ShowAnim(i: any, call: any): void;
        onClick(): void;
        _lock: boolean;
        setLock(b: any): void;
        onChange(e: kaayou.CustomEvent): void;
        jump(): void;
        stop(): void;
    }
    class AreaDistrictRadio extends kaayou.Block {
        radio: ccui.CheckBox;
        label: ccui.Text;
        value: string;
        initWithNode(node: ccui.Widget): void;
        onClick(): void;
        setInfo(name: string, value: string): void;
        onChange(e: kaayou.CustomEvent): void;
    }
    class AreaDistrictLayer extends kaayou.Block {
        _districtLayout: ccui.ScrollView;
        initWithNodeNoClone(node: ccui.Widget): void;
        _areaDistrictRadios: Array<AreaDistrictRadio>;
        initUI(): void;
        areaCode: string;
        onChange(e: kaayou.CustomEvent): void;
        Show(data: {
            districts: Array<{
                name: string;
                code: string;
            }>;
            adcode: string;
        }): void;
        Hide(): void;
    }
    class AreaSelectionPanelMgr {
        static __INS__: AreaSelectionPanelMgr;
        static getInstance(_zOrder?: number): AreaSelectionPanelMgr;
        __selfPanel: AreaSelectionPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): AreaSelectionPanel;
    }
    class AreaSelectionPanel extends kaayou.ModelLayer {
        constructor();
        adcodeServer: string;
        btnClose: ccui.Button;
        btnCloseDistrict: ccui.Button;
        btnHeBei: ccui.Layout;
        btnHeNan: ccui.Layout;
        btnHuBei: ccui.Layout;
        btnAnHui: ccui.Layout;
        btnOk: ccui.Button;
        cityButtonList: common.RadioGroupWithImg;
        cityButtonLayout: ccui.Layout;
        cityCode: string;
        cityName: string;
        districtLayout: ccui.Layout;
        noGamePanel: ccui.Layout;
        selectedCityCode: string;
        selectedCityKey: string;
        spCloudLeft: ccui.ImageView;
        spCloudRight: ccui.ImageView;
        topbarMgr: lobby.TopBarMgr;
        onAreaClick(data: {
            citykey: string;
        }): void;
        onCityRefresh(data: {
            name: string;
            code: string;
        }): void;
        onProvinceClick(data: any): void;
        getCityAdcode(adcode: any): any;
        Hide(): void;
        _areaImgRadios: Array<AreaImgRadio>;
        initUI(): void;
        Show(): void;
        closeTimeOut: boolean;
        doEnter(): void;
    }
}
