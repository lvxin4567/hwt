/// <reference path="./protos/teaHouse.protos/house.proto.ts" />
namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export interface Data_HouseItem {
        hid: number,
        hname: string,
        ownername: string,
        ownerurl: string,
        hcreate?: boolean,
        hjoin?: boolean,
        hmems: number,
        id: number,
        ishidhide: boolean,  //隐藏亲友圈ID
        jointime: number,
        ownergender: number,
        ownerid: number,
        role: number,
        onlinecur: number,
        onlinetable: number,
        hfloorgameurl: Array<string>,
        hfloorids: Array<number>,
    };

    export interface Data_HouseItem_cell extends Data_HouseItem {
        iscur: boolean,
        ismine: boolean
    }

    //茶楼管理权限表
    export enum HouseRoleTable {
        NULL = 0,
        VIEW_MEMBER = 1,         //查看成员列表
        VIEW_MANAGER = 2,        //查看茶楼管理
        VIEW_RECORD = 4,         //查看战绩
        VIEW_MEMBER_APPLY = 8,   //查看申请列表
        EDIT_HOUSE_EXIT = 0x10, //退出茶楼
        VIEW_HOUSE_SET = 0x20, //查看茶楼信息
        VIEW_STAT_MEMBER = 0x40, //查看开局统计
        VIEW_STAT_RECORD_MINE = 0x80, //查看我的战绩统计
        VIEW_STAT_RECORD_TEA = 0x100,//查看茶楼圈子战绩统计
        VIEW_STAT_RECORD_TEA_WIN = 0x200,//查看茶楼大赢家战绩
        VIEW_STAT_RECORD_TEA_PLAY = 0x400,//查看茶楼对局战绩
        VIEW_STAT_RECORD_TEA_CARD = 0x800,//查看茶楼经营状况
        VIEW_FLOOR_RULE = 0x1000,//查看楼层玩法
        EDIT_FLOOR_RULE = 0x2000,//修改楼层玩法
        EDIT_HOUSE_SET = 0x4000,//修改茶楼信息
        VIEW_MEMBER_REMARk = 0x8000, //查看人员备注
        EDIT_MEMBER_REMARk = 0x10000, //修改人员备注
        EDIT_HOUSE_DELETE = 0x20000,//解散茶楼
        EDIT_MEMBER_REMOVE = 0x40000,//删除茶楼人员
        EDIT_MEMBER_SETMANAGER = 0x80000,//设置茶楼管理员
        EDIT_HOUSE_FREEZE = 0x100000,//冻结茶楼
        VIEW_HOUSE_TABLE = 0x200000,//显示茶楼桌子
        JOIN_HOUSE_TABLE = 0x400000,//加入茶楼桌子
        DISMISS_TEA_TABLE = 0x800000,//圈主显示的解散牌桌
        VIEW_STAT_RECORD_MEMBER = 0x1000000//成员战绩
    }

    export enum HouseMemberRole {
        Rejected = -1,
        OWNER = 0,
        ADMIN = 1,
        MEMBER,
        APLLY,
        BLACK,
        CAPTAIN = 5,//队长
        MERGE,  //合圈圈主
        CPADMIN, //裁判员
        VICECAPTAIN //副队长
    }

    enum PERMISSION_TYPE {
        NONE = 0,//无权限
        DEFAULT = 1,//身份权限
        UNESCALATION = 2,//没赋予权限
        ESCALATION = 3,//赋予权限
        DISABLE = 4
    }

    export interface Data_HouseInfo {
        uright: string;
        admin_game_on: boolean;  //gm后台比赛场开关
        apply_switch: boolean;   //是否接受入圈申请开关
        area: string;//地区id
        card_pool: boolean;//卡池
        disablejuniorv: boolean;//是否禁止上级调下级比赛分，true禁止/false不禁止
        fgameHeadImg: string;  //当前楼层的游戏头像
        fid: number;  //当前的茶楼楼层id
        fkind: number;   //当前楼层的类型
        fname: string;   //当前楼层名字
        frule: any;   //当前楼层的游戏规则
        game_on: boolean;    //比赛场开关
        /**@description 亲友圈编号*/
        hid: number;
        hischecked: boolean;          //茶楼是否审核
        hisfrozen: boolean;           //茶楼是否冻结
        hismemexit: boolean; //允许退圈
        hmaxtable: number;  //茶楼最大的桌子数
        hname: string;     //当前茶楼名称
        isactivity: boolean;    //活动状态   有开始的为true
        isdeductconfig: boolean; //防沉迷是否配置了扣除相关
        iseffectconfig: boolean; //防沉迷是否配置了生效相关
        isgamepause: boolean;    //防沉迷达到下限暂停游戏
        isheadhide: boolean; //圈隐私头像开关
        ishidhide: boolean;  //隐藏亲友圈ID，true隐藏
        ismembersend: boolean;   //防沉迷玩家赠送开关
        isonlinehide: boolean;   //隐藏亲友圈桌数人数，true隐藏
        ispartner: boolean;//是否队长
        ispartnerhide: boolean;  //防沉迷队长可见,true可见
        ispartnermodi: boolean;  //防沉迷队长可调
        isvitamin: boolean;//比赛开关（总）
        isvitaminhide: boolean;  //防沉迷管理员可见true可见
        isvitaminmodi: boolean;  //防沉迷管理员可调
        luck_times: number;//可抽奖次数
        record_time_interval: number;//战绩筛选时段
        reward_balanced: boolean; //防沉迷奖励均衡
        packageName: string; //当前楼层大名
        private_gps: boolean;//圈隐私隐藏玩家地址
        uid: number;//玩家编号
        urole: number;    //玩家角色类型
        vitamin: number;//比赛分
        vitamin_admin: boolean;//是否裁判
        vice_partner: boolean;//是否副队长
        is_limit_game :boolean;//是否禁止娱乐
        hismemhide: boolean;          //是否隐藏玩家列表
        //hismemred: boolean;   //当前茶楼是否有成员申请加入
        is_cur_user_team_off_work :boolean
        isHaveFloor: boolean;  //当前是否有楼层
        hnotify: string;     //茶楼公告
        createOrChange: boolean;  //是修改楼层还是创建楼层作区分 true是创建false是修改玩法
        hfloorids: Array<number>;  //当前茶楼楼层数组
        floorsMap: FloorHashMap;
        fgameStatus: number;      //当前楼层的玩法状态。。。玩法可能会下线啥的。
        changFid: number;         //圈主修改楼层的id,
        teahouserule: number;
        onlinecur: number;           //当前在线人数
        vitamin_pool: number;         //总比赛分
        only_quick: boolean;        //是否只允许快速加入
        ipa: boolean;                 //队长是否能允许入圈
        urefhid: 0;
        house_table_join_type: number     //混楼模式类型
        mix_active: boolean               //混排开关   只是单纯的看这个茶楼有木有开混排开打   不是这个楼层的
        isCurFloorMix: boolean            //当前是不是在混排楼层里面
        dialogactive: boolean             // 茶楼弹窗是否激活
        dialog: string   // 茶楼弹窗
        auto_pay_partner: boolean          //队长自动划扣开关
        tblshowcount: number                //防作弊显示多少张桌子   0就是所有满桌子都显示  
        isaisuper: boolean                  //是否开启了超级防作弊
        empty_table_back: boolean           //是否空桌子在后面
        empty_table_max: number          //最大空桌数
        create_table_type:number          //开桌方式   0人满开桌   1另开新桌
        partnerkick: boolean               //队长能否踢人
        table_sort_type: number             //自动加桌模式下排序方式，
        superiorid: number                     //上级合伙人id
        floors_color: Array<string>            //楼层颜色
        __selectFloorTable: Array<number>           //玩家在混排选择桌子的标志
        fangka_tips_min_num: number            //亲友圈圈主低房卡提示
        hm_switch: {                            //设置新增字段   微信禁用，上下级队长权限
            BanWeChat: number,
            CapSetDep: number,
            IsRecShowParent:number,
        },
        distance: number,                    //距离
        new_table_sort_type:number           //自动加桌子排序方式
        rank_open:boolean                    // 排行榜是否开启
    };


    //分层设置
    export interface HouseDaleFloorSetItem {
        bigscore: number,   //特殊局
        hid: number,
        fid: number,
        score: number
    }


    export namespace mod {
        const defaultHouseInfo: Data_HouseInfo = {
            uright: "",
            admin_game_on: false,
            apply_switch: false,
            area: "",
            card_pool: false,
            disablejuniorv: false, //是否禁止上级调下级比赛分，true禁止/false不禁止
            fid: 0,  //当前的茶楼楼层id
            fkind: 0,   //当前楼层的类型
            fname: "",   //当前楼层名字
            frule: null,   //当前楼层的游戏规则
            game_on: false,
            hid: 0,      //当前茶楼id
            hname: "",     //当前茶楼名称
            isdeductconfig: false, //防沉迷是否配置了扣除相关
            iseffectconfig: false, //防沉迷是否配置了生效相关
            isgamepause: false,
            isheadhide: false,
            ishidhide: false,
            ismembersend: false,
            isonlinehide: false,
            ispartner: false,
            ispartnerhide: false,
            ispartnermodi: false,
            isvitamin: false,
            isvitaminhide: false,
            isvitaminmodi: false,
            is_cur_user_team_off_work :false,
            luck_times: 0,
            packageName: "", //当前楼层大名
            private_gps: false,
            record_time_interval: 24,
            reward_balanced: false,
            uid: 0,
            vitamin: 0,
            vitamin_admin: false,
            vice_partner: false,
            is_limit_game :false,
            urole: 0,// ;    //玩家角色类型
            fgameHeadImg: "",  //当前楼层的游戏头像
            hischecked: true,          //茶楼是否审核
            hisfrozen: true,           //茶楼是否冻结
            hismemhide: true,          //是否隐藏玩家列表
            //hismemred: false,   //当前茶楼是否有成员申请加入
            hmaxtable: 0,           //茶楼最大的桌子数
            isHaveFloor: false,  //当前是否有楼层
            hnotify: "",     //茶楼公告
            createOrChange: false,  //是修改楼层还是创建楼层作区分 true是创建false是修改玩法
            hfloorids: null,  //当前茶楼楼层数组
            floorsMap: {},
            fgameStatus: 0,      //当前楼层的玩法状态。。。玩法可能会下线啥的。
            changFid: 0,      //圈主修改楼层的id
            teahouserule: 0,
            onlinecur: 0,
            vitamin_pool: 0,
            isactivity: false,
            only_quick: false,
            ipa: false,
            urefhid: 0,
            house_table_join_type: 0,
            mix_active: false,
            isCurFloorMix: false,
            dialog: "",
            dialogactive: false,
            auto_pay_partner: false,
            hismemexit: false,
            tblshowcount: 0,
            isaisuper: false,
            empty_table_back: false,
            empty_table_max: 1,
            create_table_type:0,
            partnerkick: false,
            table_sort_type: 0,
            superiorid: 0,
            floors_color: [],
            __selectFloorTable: [],
            fangka_tips_min_num: 0,
            hm_switch: {
                BanWeChat: 0,
                CapSetDep: 0,//
                IsRecShowParent:0
            },
            distance: 0,
            new_table_sort_type:0,
            rank_open:false,
        };

        export let __teaHouseRole: number = HouseRoleTable.NULL;
        export let __teaHouseInfo: Data_HouseInfo = null;
        export let __needEnterFloor: boolean = true;
        export let __houseRolePower: { [role: number]: roleAuthPowerList };
        export let __TeaBg = {
            "teaBg": 0
        };    //如果没有设置过桌子背景颜色就是这样的；

        export function _isCPAdmin() {
            if (!__teaHouseInfo) { return false; }
            if (__teaHouseInfo.vitamin_admin) __teaHouseInfo.urole = HouseMemberRole.CPADMIN;
            return (__teaHouseInfo.vitamin_admin);
        }

        export function _isInCurHouse(hid: number) {
            return (__teaHouseInfo && __teaHouseInfo.hid == hid)
        }

        export function _isManager() {
            if (!__teaHouseInfo) { return false; }
            return (__teaHouseInfo.urole == HouseMemberRole.ADMIN);
        }

        export function _isMaster() {
            if (!__teaHouseInfo) { return false; }
            return (__teaHouseInfo.urole == HouseMemberRole.OWNER);
        }

        export function _isPartner() {
            if (!__teaHouseInfo) { return false; }
            if (__teaHouseInfo.ispartner) __teaHouseInfo.urole = HouseMemberRole.CAPTAIN;
            return (__teaHouseInfo.urole == HouseMemberRole.CAPTAIN);
        }

        export function _isViceCaptain() {
            if (!__teaHouseInfo) { return false; }
            if (__teaHouseInfo.vice_partner) __teaHouseInfo.urole = HouseMemberRole.VICECAPTAIN;
            return (__teaHouseInfo.urole == HouseMemberRole.VICECAPTAIN);
        }

        export function _updateHouseRole() {
            let rule = HouseRoleTable.NULL;
            //成员基本权限
            rule |= HouseRoleTable.VIEW_RECORD;//查看战绩
            rule |= HouseRoleTable.VIEW_STAT_RECORD_MINE; //查看我的战绩统计
            rule |= __teaHouseInfo.hismemhide ? 0 : HouseRoleTable.VIEW_MEMBER;//查看玩家列表
            rule |= HouseRoleTable.VIEW_MANAGER;//查看茶楼管理 显示管理面板
            rule |= HouseRoleTable.VIEW_HOUSE_SET;//查看茶楼信息
            rule |= HouseRoleTable.EDIT_HOUSE_EXIT;//退出茶楼
            rule |= HouseRoleTable.VIEW_FLOOR_RULE;//查看楼层玩法
            rule |= HouseRoleTable.VIEW_HOUSE_TABLE;//显示茶楼桌子
            rule |= __teaHouseInfo.hisfrozen ? 0 : HouseRoleTable.JOIN_HOUSE_TABLE;//加入茶楼桌子

            if (!_isViceCaptain() && !_isPartner() && !_isCPAdmin() && !_isManager() && !_isMaster()) { return rule; }
            //副队长权限
            //200618圈主管理员队长副队长都可以查看修改人员备注
            rule |= HouseRoleTable.VIEW_MEMBER_REMARk; //查看人员备注
            rule |= HouseRoleTable.EDIT_MEMBER_REMARk;  //修改人员备注
            rule |= HouseRoleTable.VIEW_MEMBER;//查看玩家列表     //9-29  增加副队长可以看成员列表
            //201019副队长可处理入圈审核
            rule |= HouseRoleTable.VIEW_MEMBER_APPLY;  //查看成员申请列表
            //201019成员战绩队长副队长可看
            rule |= HouseRoleTable.VIEW_STAT_RECORD_MEMBER;//查看成员战绩
            //201019圈子战绩队长副队长可看
            rule |= HouseRoleTable.VIEW_STAT_RECORD_TEA; //查看亲友圈战绩
            if (!_isPartner() && !_isCPAdmin() && !_isManager() && !_isMaster()) { return rule; }
            //队长权限
            if (!_isCPAdmin() && !_isManager() && !_isMaster()) { return rule; }
            //管理员权限
            rule |= HouseRoleTable.DISMISS_TEA_TABLE;    //解散桌子
            rule |= HouseRoleTable.EDIT_HOUSE_SET; //修改茶楼信息
            rule |= HouseRoleTable.VIEW_STAT_RECORD_TEA_WIN; //查看茶楼大赢家战绩
            rule |= HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY;//查看茶楼对局战绩


            rule |= HouseRoleTable.VIEW_STAT_MEMBER; //查看开局统计

            //lw200224队长不能移除名下玩家
            rule |= HouseRoleTable.EDIT_MEMBER_REMOVE; //删除亲友圈人员

            if (!_isCPAdmin() && !_isMaster()) { return rule; }
            //开局统计功能，裁判也要能看
            rule &= ~HouseRoleTable.VIEW_MEMBER_APPLY;  //裁判看不到成员申请列表
            rule &= ~HouseRoleTable.EDIT_HOUSE_SET; //裁判看不到黑名单
            rule |= HouseRoleTable.VIEW_STAT_RECORD_TEA_CARD;//裁判可以看到经营状况
            rule &= ~HouseRoleTable.DISMISS_TEA_TABLE;    //裁判不能解散桌子
            rule &= ~HouseRoleTable.VIEW_MEMBER;    //裁判不能查看玩家列表
            if (!_isMaster()) { return rule; }

            //楼主权限
            rule |= HouseRoleTable.EDIT_HOUSE_FREEZE; //冻结茶楼
            rule |= HouseRoleTable.EDIT_MEMBER_SETMANAGER; //设置茶楼管理员
            rule |= HouseRoleTable.EDIT_HOUSE_DELETE; //解散茶楼
            rule &= ~HouseRoleTable.EDIT_HOUSE_EXIT; //取消退出茶楼权限 只能删除茶楼
            rule |= HouseRoleTable.EDIT_FLOOR_RULE; //修改楼层玩法            
            rule |= HouseRoleTable.VIEW_MEMBER_APPLY;  //圈主可以看到成员申请列表
            rule |= HouseRoleTable.EDIT_HOUSE_SET; //圈主可以看到黑名单
            rule |= HouseRoleTable.DISMISS_TEA_TABLE;    //圈主可以解散桌子
            rule |= HouseRoleTable.VIEW_MEMBER;    //圈主可以查看玩家列表
            return rule;
        }

        export class House {
            static __INS__: tea.mod.House = null;
            static getInstance(): tea.mod.House {
                if (House.__INS__ == null) {
                    House.__INS__ = new House();
                    House.__INS__.initMod();
                }
                return House.__INS__;
            }
            @doBindEvent
            initMod() { }
            __teaList: Array<Data_HouseItem> = null;
            //获取茶楼列表 
            //  'mod::TeaHouse::Member::Get F rien dQList'
            @BindEvent("tea", "mod::TeaHouse::doGetList")
            async doGetFriendQList() {
                kaayou.emit('common', "ui::Loading::Show");
                let req: proto_memberhouselist = { hcreate: true, hjoin: true };
                let info: proto_memberhouselist_res = await kaayou.sendMessage('lobby', houseMsgHead.memberhouselist, req, kaayou.MakeResultMessageHead(houseMsgHead.memberhouselist));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: info.msg || "获取茶楼列表失败！" })
                    return;
                }

                this.__teaList = [];
                info.items = info.items || [];
                for (var x in info.items) {
                    let tempItem: Data_HouseItem_cell = {
                        hid: info.items[x].hid,
                        hname: info.items[x].hname,
                        ownername: info.items[x].ownername,
                        ownerurl: info.items[x].ownerurl,
                        hcreate: req.hcreate,
                        hjoin: req.hjoin,
                        hmems: info.items[x].hmems,
                        id: info.items[x].id,
                        ishidhide: info.items[x].ishidhide,
                        jointime: info.items[x].jointime,
                        ownergender: info.items[x].ownergender,
                        ownerid: info.items[x].ownerid,
                        role: info.items[x].role,
                        iscur: false,
                        ismine: false,
                        onlinetable: info.items[x].onlinetable,
                        onlinecur: info.items[x].onlinecur,
                        hfloorgameurl: info.items[x].hfloorgameurl,
                        hfloorids: info.items[x].hfloorids,
                    }
                    this.__teaList.push(tempItem);
                }
                kaayou.emit("lobby", "showBtnQuickTea", { teaList: this.__teaList });
                kaayou.emit("tea", "mod::TeaHouse::RefreshList");
            }
            @BindEvent("tea", "mod::TeaHouse::RefreshList")
            doRefreshTeaHouseList() {
                if (!!!this.__teaList || !!!kaayou.DataSet.get("user::info") || kaayou.DataSet.get("user::info").length == 0) {
                    return;
                }
                let uid = Number(JSON.parse(kaayou.DataSet.get("user::info")).uid);
                lodash.forEach(this.__teaList, function (v, x) {
                    v.iscur = (__teaHouseInfo && __teaHouseInfo.hid == v.hid),
                        v.ismine = uid == v.ownerid
                });
                //可能有3个地方接受
                //亲友圈大厅
                //亲友圈管理界面
                //大厅亲友圈view界面
                kaayou.emit('tea', 'ui::TeaHouse::UpdateList', this.__teaList);
                //   @BindEvent("tea", 'ui::TeaHouse::UpdateMine')  
                // let mineArray = lodash.intersectionBy(this.__teaList, [{ 'ownerid': uid }], 'ownerid');
                let mineArray = [];
                let intrantArray = [];
                this.__teaList.forEach(v => {
                    if (v.ownerid == uid) {
                        mineArray.push(v);
                    } else {
                        intrantArray.push(v)
                    }
                });
                kaayou.emit('tea', 'ui::TeaHouse::UpdateMine', { list: mineArray, update: true });
                // @BindEvent("tea", 'ui::Manager::UpdateIntrant')
                // let intrantArray = lodash.differenceBy(this.__teaList, [{ 'ownerid': uid }], 'ownerid');
                kaayou.emit('tea', 'ui::TeaHouse::UpdateIntrant', { list: intrantArray, update: true });

            }


            //创建亲友圈  创建成功之后给UI层发送成功的信息。。。刷新左侧的亲友圈列表
            @BindEvent("tea", "mod::TeaHouse::Create")
            async doCreateTeaHouse(data: { hname: string, hnotify: string }) {

                kaayou.emit("common", "ui::Loading::Show");
                let info: proto_housecreate_res = await kaayou.sendMessage('lobby', houseMsgHead.housecreate, data, kaayou.MakeResultMessageHead(houseMsgHead.housecreate));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "创建亲友圈失败！" })
                } else {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "创建成功" });
                    kaayou.emit('tea', 'ui::Create::Hide');
                    //lw200910创建后直接入圈
                    //kaayou.emit("tea", "mod::TeaHouse::doGetList");
                    kaayou.emit("tea", "mod::TeaHouse::Enter", {
                        hid: info.hid, call: function () {
                            kaayou.emit("tea", 'ui::Show::Hide');
                        }
                    });
                }
            }

            //加入亲友圈
            @BindEvent("tea", "mod::TeaHouse::JoinHouse")
            async doJoinTeaHouse(data: { hid: number, invite_uid: number }) {
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housememberjoin = {
                    hid: lodash.toInteger(data.hid),
                    invite_uid: lodash.toInteger(data.invite_uid)
                }

                let info = await kaayou.sendMessage("lobby", houseMsgHead.housememberjoin, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housememberjoin));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    if (info.errcode == 120) {
                        kaayou.emit("tea", "mod::TeaHouse::Enter", data);
                        return;
                    }
                    kaayou.emit("tea", 'ui::Join::Clear');
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "加入亲友圈失败！" })
                } else {
                    // kaayou.emit('ui::TeaHouse::CreateSuccess');
                    kaayou.emit("tea", 'ui::Join::Hide');

                    kaayou.emit("tea", "mod::TeaHouse::Enter", { hid: lodash.toInteger(data.hid) })
                    setTimeout(() => {
                        kaayou.emit("tea", "mod::TeaHouse::doGetList");
                    }, 10);
                }
            }

            //进入茶楼 检测合法  然后进入
            @BindEvent("tea", "mod::TeaHouse::Enter")
            async enterTeahouse(data: { hid: number, call?: Function }) {
                //设置权限为 0
                __teaHouseRole = HouseRoleTable.NULL;
                kaayou.emit("tea", "mod::TeaHouse::UpdateHouseRule", data);
                //更新权限
                __teaHouseInfo = lodash.extend({}, defaultHouseInfo);
                //更新楼层进入状态
                __needEnterFloor = true;

                kaayou.emit("tea", 'ui::TeaHouse::Clean');
                //走到这个地方就去清除客户端的魔窗数据
                kaayou.PlatformMgr.getInstance().mw.tellClientToClear();
                kaayou.emit("tea", "mod::TeaHouse::getTeaHouseInfo", data);
            }

            //获取茶楼信息 保存茶楼基本信息。。。调用进入茶楼的接口。。。
            @BindEvent("tea", "mod::TeaHouse::getTeaHouseInfo")
            async doGetHouseBaseInfo(data: { hid: number, call?: Function }) {
                //获取茶楼基本信息
                kaayou.emit("common", "ui::Loading::Show", { msg: "获取亲友圈信息", time: 3 });
                let sdata: IBASE_HOUSEREQ = {
                    hid: data.hid
                }
                let info: proto_housebaseinfo_res = await kaayou.sendMessage('lobby', houseMsgHead.housebaseinfo, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housebaseinfo));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    if (info.errcode == 302) {     //亲友圈被封
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: info.msg || "该亲友圈已封！", btns: [{
                                name: "确定",
                                action: function () {
                                    kaayou.emit("tea", 'ui::TeaHouse::Quit');
                                }
                            }]
                        })
                        return;
                    }
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "获取茶楼信息失败！" })
                    return;
                }

                var infoStr: any = kaayou.DataSet.get('user::info');
                if (!infoStr) {
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    return;
                }
                var info1 = JSON.parse(infoStr);
                if (data.hid == info1.hid) {   //说明进去的是从setuid这个地方过来的数据。 需要清除掉这个信息；
                    info1.hid = 0;
                    let userinfoJson = JSON.stringify(info1);
                    kaayou.DataSet.set("user::info", userinfoJson);
                }

                __teaHouseInfo = lodash.extend({}, defaultHouseInfo, __teaHouseInfo || {}, info);
                __teaHouseInfo.uid = JSON.parse(kaayou.DataSet.get("user::info")).uid;
                __teaHouseRole = HouseRoleTable.NULL;
                __teaHouseRole = _updateHouseRole();
                __teaHouseInfo.teahouserule = __teaHouseRole;
                __teaHouseInfo.__selectFloorTable = [];
                let selectIndex = cc.sys.localStorage.getItem(data.hid + "TH_select_Table" + __teaHouseInfo.uid)
                if (!!selectIndex) {
                    if (!lodash.isArray(JSON.parse(selectIndex))) {
                        __teaHouseInfo.__selectFloorTable = [Number(selectIndex)]
                    }else{
                        __teaHouseInfo.__selectFloorTable = JSON.parse(selectIndex);
                    }
                }else{
                    __teaHouseInfo.__selectFloorTable = [-1];
                }
                kaayou.TimeHelper.splitTime(__teaHouseInfo.record_time_interval);
                kaayou.emit("tea", "ui::Toast::Show", { msg: info.msg || "获取茶楼信息失败！" })
                kaayou.emit("tea", "ui::teaHouse::updateBg");  //更新亲友圈颜色

                //进入茶楼
                kaayou.UIManager.getInstance().runScene('teahouse');
                data.call && data.call();
                this.promissionInstance().update(__teaHouseInfo.uright);
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                __teaHouseInfo.fid = 0;
                this.freshenSomeLocalInfo(__teaHouseInfo);
                kaayou.emit('tea', 'ui::TeahousePmd::Show', { PmdArray: [__teaHouseInfo.hnotify], type: 0 })
                //没有楼层
                if (lodash.isEmpty(__teaHouseInfo.hfloorids)) {
                    kaayou.emit("tea", "ui::Floor::Update", { hasrole: !!(__teaHouseRole & HouseRoleTable.EDIT_FLOOR_RULE), data: null });
                } else {
                    let clickFid = kaayou.DataSet.get("clickFid");
                    if (clickFid && clickFid.length > 0 && __teaHouseInfo.hfloorids.indexOf(Number(clickFid)) > -1) {
                        __teaHouseInfo.fid = Number(clickFid);
                        kaayou.DataSet.set("clickFid", "")
                    } else {
                        __teaHouseInfo.fid = __teaHouseInfo.hfloorids.indexOf(info.ufloor) > -1 ? info.ufloor : __teaHouseInfo.hfloorids[0];
                    }
                    //拉取楼层列表
                    kaayou.emit('tea', 'mod::TeaHouse::GetFloorList')
                    //显示是否有开始的活动
                    kaayou.emit("tea", "ui::TopMenuBlock::setActivityStatus", { status: __teaHouseInfo.isactivity });
                    //lw200410如果抽奖次数大于0，则显示红点
                    kaayou.emit("tea", "ui::TopMenuBlock::setLuckStatus", { status: __teaHouseInfo.luck_times > 0 });
                    //lm200224增加需更新的楼层提示
                    if (info.updnfids.length > 0) {
                        info.updnfids = lodash.sortBy(info.updnfids);
                        let updateFloor = ""
                        info.updnfids.forEach(f => {
                            updateFloor += f + "楼";
                        });
                        kaayou.emit("common", "ui::Dialog::Show", { msg: "当前亲友圈(" + updateFloor + ")玩法有更新，可在楼层管理-设置中重新保存" });
                    }
                }
                //获取是否显示红点
                kaayou.emit("tea", "mod::Member::GetApplyCount");






                //进入亲友的时候如果是队长。那么就去获取自己的邀请码
                if (__teaHouseInfo.urole == HouseMemberRole.CAPTAIN) {
                    this.doGetPartnerInviteCode(data.hid);
                } else {
                    kaayou.emit("tea", "ui::TeaHouse::PartnerInvite", { invitCode: 0 })
                }
            }

            //权限对象
            private PERMISSION: any = {};

            promissionInstance() {
                let hid = __teaHouseInfo && __teaHouseInfo.hid;

                if (!hid)
                    return null


                if (!this.PERMISSION[hid])
                    this.PERMISSION[hid] = this.PermissionsInstance();

                return this.PERMISSION[hid];

            }
            //刷新一些保存在手机的数据   前三常入圈   亲友圈弹窗公告记得每日弹一次
            freshenSomeLocalInfo(houseInfo: Data_HouseInfo) {
                var userInfo: any = kaayou.DataSet.get('user::info');
                userInfo = JSON.parse(userInfo) || null;
                if (userInfo && userInfo.uid) {
                    let lastThreeTeahouse = cc.sys.localStorage.getItem("LAST3TEAHOUSE::" + userInfo.uid);
                    let arr = JSON.parse(lastThreeTeahouse);
                    if (arr == undefined) arr = [];
                    let th = { id: houseInfo.hid, name: houseInfo.hname };
                    arr.unshift(th);
                    if (arr.length > 3) arr.splice(3, arr.length - 3);
                    let s = JSON.stringify(arr);
                    cc.sys.localStorage.setItem("LAST3TEAHOUSE::" + userInfo.uid, s);
                    // kaayou.emit("tea","ui::CardTipsPanel::Show");
                   
                }
                let todayStr = Date.format("yyyy-MM-dd")
                let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
                let yesDayTime = (todayTime - 24 * 60 * 60) * 1000;
                let yesStr = new Date(yesDayTime).format("yyyy-MM-dd")
                let popToStr = "pN" + userInfo.uid + houseInfo.hid + todayStr;
                let popYesStr = "pN" + userInfo.uid + houseInfo.hid + yesStr;
                cc.sys.localStorage.removeItem(popYesStr)
                console.log(cc.sys.localStorage.getItem(popToStr))
                if (tea.mod._isMaster()) {
                    cc.sys.localStorage.removeItem(cc.sys.localStorage.getItem("cardMinNumTip" + tea.mod.__teaHouseInfo.hid+yesStr))
                    if (userInfo.card <= houseInfo.fangka_tips_min_num && houseInfo.fangka_tips_min_num > 0 && (!!!cc.sys.localStorage.getItem("cardMinNumTip" + tea.mod.__teaHouseInfo.hid+todayStr) || cc.sys.localStorage.getItem("cardMinNumTip" + tea.mod.__teaHouseInfo.hid + todayStr) == "0")) {
                        kaayou.emit("tea", "ui::CardTipsPanel::Show");
                    }
                }



                if (houseInfo.dialogactive) {   //如果开启了亲友圈弹窗公告。今日未弹出则弹出。已经弹出过一次则不处理
                    if (!!!cc.sys.localStorage.getItem(popToStr) || cc.sys.localStorage.getItem(popToStr) == "0") {
                        cc.sys.localStorage.setItem(popToStr, "1");
                        console.log("需要去弹弹窗公告")
                        let options = {
                            title: "公告",
                            msg: houseInfo.dialog,
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green',
                                    action: function () {
                                    }
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    }
                }
            }



            @BindEvent("tea", 'mod::TeaHouse::doUpdateTeaHouseRole')
            doUpdateTeaHouseRule() {
                let oldAuth = __teaHouseRole;
                __teaHouseRole = _updateHouseRole();
                __teaHouseInfo.teahouserule = __teaHouseRole;
                if (oldAuth != __teaHouseRole) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                }
            }

            @BindEvent("tea", "mod::TeaHouse::GetHousePartnerInvitecode")
            async doGetPartnerInviteCode(hid: number) {
                kaayou.emit('common', "ui::Loading::Show");
                let sdata: IBASE_HOUSEREQ = {
                    hid: hid
                }
                let info: proto_housepartnergetcode_res = await kaayou.sendMessage('lobby', houseMsgHead.housepartnergetcode, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housepartnergetcode));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    kaayou.emit("tea", "ui::TeaHouse::PartnerInvite", { invitCode: 0 })
                    return;
                }
                kaayou.emit("tea", "ui::TeaHouse::PartnerInvite", { invitCode: info.code })
            }

            // 退出茶楼楼层
            @BindEvent("tea", "mod::TeaHouse::Quit")
            async doQuitTeaHouse() {
                // kaayou.emit("ui::Loading::Show");
                kaayou.emit('common', "ui::Loading::Show");
                if (lodash.isEmpty(__teaHouseInfo)) {
                    kaayou.emit("tea", 'ui::TeaHouse::Quit');
                    kaayou.emit('common', "ui::Loading::Hide");
                    return;
                }
                let req: proto_housememberout = { hid: __teaHouseInfo.hid, fid: __teaHouseInfo.fid || 0 };

                kaayou.sendMessage("lobby", houseMsgHead.housememberout, req, kaayou.MakeResultMessageHead(houseMsgHead.housememberout)).then(function (info) {
                    if (info.errcode) {
                        kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "退出楼层失败！" });
                        kaayou.emit('common', "ui::Loading::Hide");
                        return;
                    }
                    __teaHouseInfo = null;
                    kaayou.emit('common', "ui::Loading::Hide");
                    kaayou.emit("tea", 'ui::TeaHouse::Quit');
                });


                // kaayou.emit("tea", 'c');

                //todo 退出楼层成功。
                // kaayou.emit("ui::TeaHouse::Hide");
            }

            //退出亲友圈
            @BindEvent("tea", "mod::TeaHouse::Exit")
            async doExitTeaHouse(data: { hid: number } = null) {
                kaayou.emit('common', "ui::Loading::Show");
                let req: IBASE_HOUSEREQ = {
                    hid: lodash.isEmpty(data) ? __teaHouseInfo.hid : (data.hid || 0)
                }
                if (!req.hid) { return; }
                let info = await kaayou.sendMessage('lobby', houseMsgHead.housememberexit, req, kaayou.MakeResultMessageHead(houseMsgHead.housememberexit));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", "mod::TeaHouse::doGetList");
                kaayou.emit('common', "ui::Toast::Show", { msg: "退出亲友圈" + req.hid + "成功！" })
                if (!_isInCurHouse(req.hid)) { return; }
                kaayou.emit("tea", "mod::TeaHouse::Quit");
            }

            //解散亲友圈
            @BindEvent("tea", "mod::TeaHouse::Dismiss")
            async doDismissTeaHouse(data: { hid: number } = null) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: IBASE_HOUSEREQ = {
                    hid: lodash.isEmpty(data) ? __teaHouseInfo.hid : (data.hid || 0)
                }
                let info = await kaayou.sendMessage('lobby', houseMsgHead.housedelete, req, kaayou.MakeResultMessageHead(houseMsgHead.housedelete));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", "ui::Member::Hide");
                kaayou.emit('common', "ui::Toast::Show", { msg: "解散亲友圈" + req.hid + "成功！" })
                if (_isInCurHouse(req.hid)) { return; }
                kaayou.emit("tea", "mod::TeaHouse::doGetList");
            }

            //绑定亲友圈解散推送消息
            @BindEvent('lobby', 'ws::Msg::housedelete_ntf')
            doDismissTeaHouseNtf(data: { hid: number }) {
                // cc.log("收到推送消息：亲友圈解散" + data.hid + cc.director.getScene().name);
                //更新亲友圈列表
                //可能有3个地方接受
                //亲友圈大厅
                //亲友圈管理界面
                //大厅亲友圈view界面

                //lw190812在大厅界面也需要收这个消息，处理快捷入口
                kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈 " + data.hid + " 已被解散" });
                var userInfo: any = kaayou.DataSet.get('user::info');
                userInfo = JSON.parse(userInfo) || null;
                if (userInfo && userInfo.uid) {
                    let lastThreeTeahouse = cc.sys.localStorage.getItem("LAST3TEAHOUSE::" + userInfo.uid);
                    let arr = JSON.parse(lastThreeTeahouse);
                    if (arr == undefined) arr = [];
                    let newArr = [];
                    for (let index = 0; index < arr.length; index++) {
                        let localModel = arr[index];
                        if (localModel.hid != data.hid) {
                            newArr.push(localModel);
                        }
                    }
                    let s = JSON.stringify(newArr);
                    cc.sys.localStorage.setItem("LAST3TEAHOUSE::" + userInfo.uid, s);
                }
                kaayou.emit("tea", "mod::TeaHouse::doGetList");

                if (!_isInCurHouse(data.hid)) { return; }
                __teaHouseInfo = null;
                kaayou.emit("tea", "mod::TeaHouse::Quit");
            }

            //设置隐藏成员列表
            @BindEvent('tea', 'mod::TeaHouse::SetMemberHide')
            async SetMemberHide(data: SetHouseOptionMemberHide) {
                kaayou.emit("common", "ui::Loading::Show", { time: 3 });
                let req: SetHouseOptionMemberHide = {
                    hid: __teaHouseInfo.hid,
                    ismemhide: !__teaHouseInfo.hismemhide
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionismemhide, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionismemhide));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                let tips: string = null;
                if (req.ismemhide) {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "隐藏成员列表！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不隐藏成员列表！！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置隐藏亲友圈号
            @BindEvent('tea', 'mod::TeaHouse::SetHIDHide')
            async SetHIDHide(data: SetHouseOptionMemberHide) {
                kaayou.emit("common", "ui::Loading::Show", { time: 3 });
                let req: proto_houseoptionishidhide = {
                    hid: __teaHouseInfo.hid,
                    ishidhide: !__teaHouseInfo.ishidhide
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionishidhide, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionishidhide));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                let tips: string = null;
                if (req.ishidhide) {
                    tips = "设置成功，本亲友圈隐藏了亲友圈号！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不再隐藏亲友圈号！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置隐藏大厅头像
            @BindEvent('tea', 'mod::TeaHouse::SetHeadImageHide')
            async SetHeadImageHide(data: SetHouseOptionMemberHide) {
                kaayou.emit("common", "ui::Loading::Show", { time: 3 });
                let req: proto_houseoptionisheadhide = {
                    hid: __teaHouseInfo.hid,
                    isheadhide: !__teaHouseInfo.isheadhide
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionisheadhide, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionisheadhide));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                let tips: string = null;
                if (req.isheadhide) {
                    tips = "设置成功，本亲友圈隐藏了大厅头像！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不再隐藏大厅头像！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置隐藏亲友圈桌数和人数
            @BindEvent('tea', 'mod::TeaHouse::SetTableHide')
            async SetTableHide(data) {
                kaayou.emit("common", "ui::Loading::Show", { time: 3 });
                let req: proto_houseoptionisonlinehide = {
                    hid: __teaHouseInfo.hid,
                    isonlinehide: !__teaHouseInfo.isonlinehide
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionisonlinehide, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionisonlinehide));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                let tips: string = null;
                if (req.isonlinehide) {
                    tips = "设置成功，本亲友圈隐藏了桌数和人数！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不再隐藏桌数和人数！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置隐藏亲友圈玩家地址
            @BindEvent('tea', 'mod::TeaHouse::SetAddressHide')
            async SetAddressHide(data) {
                kaayou.emit("common", "ui::Loading::Show", { time: 3 });
                let req = {
                    hid: __teaHouseInfo.hid,
                    privategps: !__teaHouseInfo.private_gps
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseprivategpsset, req, kaayou.MakeResultMessageHead(houseMsgHead.houseprivategpsset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
               
            }

            //设置比赛场开关
            @BindEvent('tea', 'mod::TeaHouse::SetMatchSwitch')
            async SetMatchSwitch(data) {
                kaayou.emit("common", "ui::Loading::Show", { time: 3 });
                let req: proto_housegameswitch = {
                    hid: __teaHouseInfo.hid,
                    on: !__teaHouseInfo.game_on
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housegameswitch, req, houseMsgHead.housegameswitch);
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                let tips: string = null;
                if (req.on) {
                    tips = "设置成功，本亲友圈开启了比赛场！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "关闭了比赛场！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置审核模式开关
            @BindEvent("tea", 'mod::TeaHouse::SetMemCheck')
            async doSetMemCheck(data?: { ischecked: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: SetHouseOptionCheck = {
                    hid: __teaHouseInfo.hid,
                    ischecked: !__teaHouseInfo.hischecked
                }
                if (data) {
                    req = {
                        hid: __teaHouseInfo.hid,
                        ischecked: data.ischecked
                    }
                }

                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionismembercheck, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionismembercheck));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
            }

            //设置队长是否允许进圈开关
            @BindEvent("tea", 'mod::TeaHouse::SetPartnerMemCheck')
            async doSetPartnerMemCheck(data?: { ipa: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: SetHouseOptionCheck = {
                    hid: __teaHouseInfo.hid,
                    ischecked: !__teaHouseInfo.ipa,
                }

                if (data) {
                    req = {
                        hid: __teaHouseInfo.hid,
                        ischecked: data.ipa,
                    }
                }

                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionisparntercheck, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionisparntercheck));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                let tips = "";
                __teaHouseInfo.ipa = req.ischecked;
                if (req.ischecked) {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "允许队长审核成员申请！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不允许队长审核成员！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置是否拒绝申请开关
            @BindEvent("tea", 'mod::TeaHouse::SetRefuseMemberJoin')
            async doSetRefuseMemberJoin(data?: { apply_switch: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: proto_houseapplyswitch = {
                    hid: __teaHouseInfo.hid,
                    switch: !__teaHouseInfo.apply_switch,
                }
                if (data) {
                    req = {
                        hid: __teaHouseInfo.hid,
                        switch: data.apply_switch,
                    }
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseapplyswitch, req, kaayou.MakeResultMessageHead(houseMsgHead.houseapplyswitch));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                let tips = "";
                __teaHouseInfo.apply_switch = req.switch;
                if (!req.switch) {//true为拒绝申请
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "接受入圈申请！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不接受入圈申请！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //设置是否允许自由退圈
            @BindEvent("tea", 'mod::TeaHouse::SetExitTeahouseCheck')
            async doSetExitTeahouseCheck(data?: { ismemexit: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: proto_houseoptionismemberexit = {
                    hid: __teaHouseInfo.hid,
                    ismemexit: !__teaHouseInfo.hismemexit,
                }

                if (data) {
                    req = {
                        hid: __teaHouseInfo.hid,
                        ismemexit: data.ismemexit,
                    }
                }

                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionismemberexit, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionismemberexit));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                let tips = "";
                __teaHouseInfo.hismemexit = req.ismemexit;
                if (req.ismemexit) {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不允许成员自由退圈！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "允许成员自由退圈！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //绑定设置是否隐藏成员列表推送消息
            @BindEvent('lobby', 'ws::Msg::houseoptionismemberhide_ntf')
            doSetOptionMemberHideNtf(data: SetHouseOptionMemberHide) {
                if (!_isInCurHouse(data.hid)) { return; }
                __teaHouseInfo.hismemhide = data.ismemhide;
                let tips: string = null;
                if (data.ismemhide) {
                    tips = "圈主隐藏了成员列表！";
                }
                else {
                    tips = "圈主公开了成员列表！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);//角色没变但是需要去刷新界面 
            }

            //绑定设置是否隐藏亲友圈号推送消息
            @BindEvent('lobby', 'ws::Msg::houseoptionishidhide_ntf')
            doSetOptionHIDHideNtf(data: proto_houseoptionishidhide) {
                kaayou.emit("tea", 'ui::TeaHouse::HideHID', data);
                if (!_isInCurHouse(data.hid)) {
                    return;
                }
                __teaHouseInfo.ishidhide = data.ishidhide;
                let tips: string = null;
                if (data.ishidhide) {
                    tips = "圈主隐藏了亲友圈号！";
                }
                else {
                    tips = "圈主公开了亲友圈号！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
            }

            //绑定设置是否隐藏大厅头像推送消息
            @BindEvent('lobby', 'ws::Msg::houseoptionisheadhide_ntf')
            doSetOptionHeadImageHideNtf(data: proto_houseoptionisheadhide) {
                if (!_isInCurHouse(data.hid)) {
                    return;
                }
                __teaHouseInfo.isheadhide = data.isheadhide;
                // kaayou.emit("tea", 'ui::TeaHouse::HideHeadImage', data);
                let tips: string = null;
                if (data.isheadhide) {
                    tips = "圈主隐藏了大厅头像！";
                }
                else {
                    tips = "圈主公开了大厅头像！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit("tea", 'mod::Table::GetUpdateList');
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
            }

            //绑定设置是否隐藏亲友圈桌数和人数推送消息
            @BindEvent('lobby', 'ws::Msg::houseoptionisonlinehide_ntf')
            doSetOptionHideTableCountNtf(data) {
                kaayou.emit("tea", 'ui::TeaHouse::HideOnlineCount', data);
                if (!_isInCurHouse(data.hid)) {
                    return;
                }
                __teaHouseInfo.isonlinehide = data.isonlinehide;
                let tips: string = null;
                if (data.ishidhide) {
                    tips = "圈主隐藏了亲友圈桌数和人数！";
                }
                else {
                    tips = "圈主公开了亲友圈桌数和人数！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
            }

            //绑定设置是否开启比赛场推送消息
            @BindEvent('lobby', 'ws::Msg::housegameswitch_ntf')
            doSetMatchSwitchNtf(data) {
                if (!_isInCurHouse(data.hid)) {
                    return;
                }
                __teaHouseInfo.game_on = data.game_on;
                __teaHouseInfo.admin_game_on = data.admin_game_on;
                __teaHouseInfo.isvitamin = data.isvitamin;
                kaayou.emit("tea", 'ui::TeaHouse::UpdateMatchSwitch', data);
                let tips: string = null;
                if (data.game_on) {
                    tips = "圈主开启了比赛场！";
                }
                else {
                    tips = "圈主关闭了比赛场！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
            }

            //绑定设置审核模式开关推送消息
            @BindEvent("lobby", 'ws::Msg::houseoptionismembercheck_ntf')
            doSetOptionCheckNtf(data: SetHouseOptionCheck) {
                cc.log("收到推送消息：审核模式开关变更" + data.ischecked);
                if (!_isInCurHouse(data.hid)) { return; }
                __teaHouseInfo.hischecked = data.ischecked;
                let tips: string = null;
                if (__teaHouseInfo.hischecked) {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "需要审核！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不需要审核！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                // kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
            }

            //绑定设置队长审核模式开关推送消息
            @BindEvent("lobby", 'ws::Msg::houseoptionisparntercheck_ntf')
            doSetPartnerOptionCheckNtf(data: SetHouseOptionCheck) {
                cc.log("收到推送消息：审核模式开关变更" + data.ischecked);
                if (!_isInCurHouse(data.hid)) { return; }
                __teaHouseInfo.ipa = data.ischecked;
                let tips: string = null;
                if (__teaHouseInfo.ipa) {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "允许队长审核成员申请！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不允许审核成员！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit("tea", "ui::ApplyCell::UpdateInfo");
            }


            //是否冻结亲友圈
            @BindEvent("tea", "mod::TeaHouse::SetOptionFrozen")
            async doSetOptionFrozen(data?: { hisfrozen: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: SetHouseOptionFrozen = {
                    hid: __teaHouseInfo.hid,
                    isfrozen: !__teaHouseInfo.hisfrozen
                }

                if (data) {
                    req = {
                        hid: __teaHouseInfo.hid,
                        isfrozen: data.hisfrozen
                    }
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionisfrozen, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionisfrozen));
                kaayou.emit("common", "ui::Loading::Hide");

                if (info.errcode) {
                    kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
            }

            //绑定设置是否冻结亲友圈推送消息
            @BindEvent("lobby", 'ws::Msg::houseoptionisfrozen_ntf')
            doSetOptionFrozenNtf(data: SetHouseOptionFrozen) {
                cc.log("收到推送消息：是否冻结变更" + data.isfrozen);
                if (!__teaHouseInfo || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                __teaHouseInfo.hisfrozen = data.isfrozen;

                let strtip: string = "";
                if (data.isfrozen == false) {
                    strtip = "设置成功";
                }
                else if (data.isfrozen == true) {
                    strtip = "本亲友圈维护中，请联系亲友圈管理员";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: strtip });
                kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
            }

            //修改亲友圈名称和公告
            @BindEvent("tea", 'mod::TeaHouse::ModifyBaseNN')
            async doModifyBaseNN(data: ModifyHouseBaseNN) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housebasennmodify, data, kaayou.MakeResultMessageHead(houseMsgHead.housebasennmodify));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                __teaHouseInfo.hname = data.hname;
                __teaHouseInfo.hnotify = data.hnotify;
                kaayou.emit("common", 'ui::Toast::Show', { msg: "修改成功！" });
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
                kaayou.emit('tea', 'ui::TeahousePmd::Show', { PmdArray: [data.hnotify], type: 0 })
            }

            //启用和修改亲友圈弹窗公告
            @BindEvent("tea", 'mod::TeaHouse::ModifyPopNotice')
            async doModifyPopNotice(data: proto_housedialogedit) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housedialogedit, data, kaayou.MakeResultMessageHead(houseMsgHead.housedialogedit));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "修改成功！" });
                kaayou.emit('tea', 'ui::TeaHouse::UpdateInfo', __teaHouseInfo);
            }

            @BindEvent("lobby", "ws::Msg::housebasennmodify_ntf")
            async doGetHousebasennmodify_ntf(data: { hid: number, hname: string, hnotify: string, hdialog: string, hdialogactive: boolean }) {
                if (!__teaHouseInfo || !__teaHouseInfo.hid || data.hid != __teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit('tea', 'ui::TeahousePmd::Show', { PmdArray: [data.hnotify], type: 0 });
                __teaHouseInfo.dialog = data.hdialog;
                __teaHouseInfo.dialogactive = data.hdialogactive;
                __teaHouseInfo.hnotify = data.hnotify;
            }

            @BindEvent("tea", "mod::teahouse::getOnline")
            async doGetHidOnline() {
                if (!__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                let sdata: IBASE_HOUSEREQ = { hid: __teaHouseInfo.hid }
                let info: proto_housememberonline_res = await kaayou.sendMessage("lobby", houseMsgHead.housememberonline, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housememberonline))
                if (info.errcode) {
                    return;
                }
                //刷新实时人数；
                kaayou.emit("tea", "ui::Teahouse::UpdateOnline", info);
            }

            //判断是不是加盟商  只有加盟商才有资格创建亲友圈
            @BindEvent("tea", "ui::teahouse::housepartner")
            async doCheckHousepartner() {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housepartner, {}, kaayou.MakeResultMessageHead(houseMsgHead.housepartner))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    if (info.errcode == "123") {
                        //  当用户不是加盟商，需要弹出申请加盟商权限的界面；
                        kaayou.emit("tea", "ui::Partner::Show", { csNum: info.msg });
                    } else {
                        kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "获取加盟商信息失败！" })
                    }
                    return;
                }
                //当验证加盟商成功之后，就可以走下面的创建亲友圈的老流程了。
                kaayou.emit('tea', 'ui::Create::Show', {
                    onSucceed: function (name: string) {
                        if (lodash.isEmpty(name)) { return false; }
                    }
                });
            }

            //获取混排设置
            @BindEvent("tea", "mod::TeaHouse::GetMixInfo")
            async getMixInfo() {
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: IBASE_HOUSEREQ = { hid: tea.mod.__teaHouseInfo.hid }
                let info: HouseMixFloorInfo = await kaayou.sendMessage("lobby", houseMsgHead.housemixfloorinfo, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housemixfloorinfo));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", "ui::TeaHouse::ShowMixSetting", info);
            }

            @BindEvent("tea", "mod::TeaHouse::EditMix")
            async editMix(data: proto_housemixflooreditor) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housemixflooreditor, data, kaayou.MakeResultMessageHead(houseMsgHead.housemixflooreditor));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "保存成功！" });
                kaayou.emit("tea", "ui::MixFloor::Hide");
            }

            //这个方法没用
            @BindEvent("tea", "mod::TeaHouse::SetEffective")
            async setEffective(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", "housevalidroundscoreset", data, "ws::Msg::housevalidroundscoreset");
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作成功！" });
            }

            //设置防作弊需要显示多少张满桌子
            @BindEvent("tea", "mod::TeaHouse::housesettblshowcount")
            async setFzbFullTableCount(data: { count: number }) {
                if (!data || !__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housesettblshowcount = { hid: __teaHouseInfo.hid, count: data.count }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housesettblshowcount, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housesettblshowcount));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                __teaHouseInfo.tblshowcount = data.count;
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作成功！" });
            }

            //时段筛选设置
            @BindEvent("tea", "mod::TeaHouse::SetRecordTimeInterval")
            async setRecordTimeInterval(data) {
                if (!data || !__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.setrecordtimeintervalreq, data, kaayou.MakeResultMessageHead(houseMsgHead.setrecordtimeintervalreq));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                __teaHouseInfo.record_time_interval = data.timeinterval;
                kaayou.TimeHelper.splitTime(__teaHouseInfo.record_time_interval);
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作成功！" });
            }

            @BindEvent("lobby", 'ws::Msg::housecardpoolchange_ntf')
            onHouseCardPoolChange(data) {
                if (!!!__teaHouseInfo) return;
                if (data.hid == tea.mod.__teaHouseInfo.hid) {
                    tea.mod.__teaHouseInfo.card_pool = data.pool_state;
                    kaayou.emit("tea", "ui::TeaHouse::RefreshCardPool");
                }
            }

            @BindEvent("lobby", 'ws::Msg::housemixfloor_ntf')
            onHouseMixFloor(data) {
                if (!!!__teaHouseInfo) return;
                __needEnterFloor = true;
                kaayou.emit("tea", "mod::TeaHouse::GetFloorList");
                // kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: __teaHouseInfo.fid });
            }

            //混排模式变化推送
            @BindEvent("lobby", 'ws::Msg::housemixflooreditor_ntf')
            onHouseMixFloorEdit(data: proto_housemixflooreditor) {
                if (!!!__teaHouseInfo) return;
                if (__teaHouseInfo.hid != data.hid) return;
                __teaHouseInfo.mix_active = data.mix_active;
                __teaHouseInfo.house_table_join_type = data.house_table_join_type;
                __teaHouseInfo.isaisuper = data.ai_super;
                __teaHouseInfo.empty_table_back = data.empty_table_back;
                __teaHouseInfo.empty_table_max = data.empty_table_max;
                __teaHouseInfo.table_sort_type = data.table_sort_type;
                __teaHouseInfo.create_table_type = data.create_table_type;
                __teaHouseInfo.new_table_sort_type = data.new_table_sort_type;
                __needEnterFloor = true;
                kaayou.emit("tea", "mod::TeaHouse::GetFloorList");
                // kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: __teaHouseInfo.fid });
            }

            @BindEvent("lobby", 'ws::Msg::houseidchange_ntf')
            onhouseidchange_ntf(data) {
                if (!!!__teaHouseInfo) return;
                this.doGetFriendQList();
                if (!!tea.mod.__teaHouseInfo && data.oldhId == tea.mod.__teaHouseInfo.hid) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈圈号由【" + data.oldhId + "】" + "修改为【" + data.newhid + "】" });
                    this.enterTeahouse({ hid: data.newhid })

                }
            }

            //茶楼楼层分层列表
            @BindEvent("tea", "mod::TeaHouse::GetHouseDaleSetting")
            async doDaleHouseSettingList() {
                if (!!!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: IBASE_HOUSEREQ = {
                    hid: lodash.toInteger(__teaHouseInfo.hid)
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housevalidroundscoreget, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housevalidroundscoreget));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取信息失败！" })
                    return;
                }

                if (!info) {
                    return;
                }
                kaayou.emit("tea", "ui::Dale::updateFloorDaleList", { items: info.items, invalidround: info.invalidround })

            }

            //茶楼楼层分层列表提交
            @BindEvent("tea", "mod::TeaHouse::GetHouseDaleSettingScroe")
            async doDaleHouseSetting(data) {
                if (!!!data || !!!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housevalidroundscoreset, { hid: lodash.toInteger(__teaHouseInfo.hid), items: data }, kaayou.MakeResultMessageHead(houseMsgHead.housevalidroundscoreset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取信息失败！" })
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "分成设置成功~~~" })
                kaayou.emit("tea", "ui::propotionFloorConfigDialog::Hide");
            }

            //设置是否只允许使用快速加入
            @BindEvent("tea", "mod::Tahouse::SetHouseTableJoinStyle")
            async doHouseTableJoinSet(data: { only_quick: boolean }) {
                if (!!!data || !!!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housejointableset = {
                    hid: lodash.toInteger(__teaHouseInfo.hid),
                    only_quick: data.only_quick
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housejointableset, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housejointableset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "设置失败！" })
                    return;
                }
                // if (!data.only_quick) {
                kaayou.emit("common", 'ui::Toast::Show', { msg: "设置成功" })
                // }
            }

            //邀请入圈搜索
            @BindEvent("tea", "mod::teahouse::sendInviteSearch")
            async sendInviteSearch(data: proto_searchuser) {
                if (!!!data || !!!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info: proto_searchuser_res = await kaayou.sendMessage("lobby", houseMsgHead.housesearchuser, data, kaayou.MakeResultMessageHead(houseMsgHead.housesearchuser));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "搜索玩家失败！" });
                    return;
                }
                // kaayou.emit("common", 'ui::Toast::Show', { msg: "邀请发送成功" });

                kaayou.emit("tea", 'ui::SendInvitePanel::ShowSearchInfo', info);
            }



            //邀请入圈
            @BindEvent("tea", "mod::teahouse::sendInvite")
            async sendInvite(data: proto_searchuser) {
                if (!!!data || !!!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housemtadduser, data, kaayou.MakeResultMessageHead(houseMsgHead.housemtadduser));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "邀请失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "邀请成功!" });
                kaayou.emit("tea", 'ui::SendInvitePanel::Hide');
                kaayou.emit('tea', 'ui::Member::RefreshMemberList');

            }

            //回复邀请入圈
            @BindEvent("tea", "mod::teahouse::answerInviteJoinTeaHouse")
            async answerInvite(data: proto_housejoininviteack) {
                kaayou.sendMessage('lobby', houseMsgHead.housejoininviteack, data, kaayou.MakeResultMessageHead(houseMsgHead.housejoininviteack))
            }

            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMsgHead.housejointablechange_ntf))
            onHouseJoinTableStyleSetChange(data: proto_housejointableset) {
                if (!!!__teaHouseInfo) return;
                if (data.hid != tea.mod.__teaHouseInfo.hid) return;
                __teaHouseInfo.only_quick = data.only_quick;
                if (data.only_quick) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "当前亲友圈只允许使用快速开始入桌！！！" })
                }
            }

            //设置亲友圈队长是否可以踢人
            @BindEvent("tea", "mod::teahouse::partnerKickMem")
            async partnerKickMem(data?: { partnerkick: boolean }) {
                if (!!!__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                let req: proto_houseoptionpartnerkick = {
                    hid: __teaHouseInfo.hid,
                    partnerkick: !__teaHouseInfo.partnerkick
                }

                if (data) {
                    req = {
                        hid: __teaHouseInfo.hid,
                        partnerkick: data.partnerkick,
                    }
                }

                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.houseoptionpartnerkick, req, kaayou.MakeResultMessageHead(houseMsgHead.houseoptionpartnerkick));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
            }

            //获取距离设置
            @BindEvent("tea", "mod::teahouse::getDistance")
            async getDistance() {
                if (!!!__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                let data: IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housetabledistancelimitget, data, kaayou.MakeResultMessageHead(houseMsgHead.housetabledistancelimitget));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "查询亲友圈距离失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::DistancePanel::Show', info);
            }

            //设置距离设置
            @BindEvent("tea", "mod::teahouse::setDistance")
            async setDistance(data: proto_housetabledistancelimitset) {
                if (!!!__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housetabledistancelimitset, data, kaayou.MakeResultMessageHead(houseMsgHead.housetabledistancelimitset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "保存亲友圈距离失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "设置成功" });
                kaayou.emit("tea", 'ui::DistancePanel::Hide');
            }

            //设置茶楼桌子背景
            @BindEvent("tea", "mod::TeaHouse::houseTableBgSet")
            async houseTableBgSet(data) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housefloorcolorset = {
                    hid: __teaHouseInfo.hid,
                    floors_color: data.bgArr,
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.housefloorcolorset, sdata, kaayou.MakeResultMessageHead(houseMsgHead.housefloorcolorset))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "桌子背景设置失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "桌子背景设置成功" });
            }

            //设置房卡
            @BindEvent("tea", "mod::TeaHouse::houseLowCardSet")
            async houseLowCardSet(data: { num: number }) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_setfangkatipsminnumreq = {
                    hid: __teaHouseInfo.hid,
                    minnum: data.num,
                }
                let info = await kaayou.sendMessage("lobby", houseMsgHead.setfangkatipsminnumreq, sdata, kaayou.MakeResultMessageHead(houseMsgHead.setfangkatipsminnumreq))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "设置失败！" });
                    return;
                }
                __teaHouseInfo.fangka_tips_min_num=data.num;
                kaayou.emit("common", "ui::Toast::Show", { msg: "设置成功" });
            }

            //设置开关
            @BindEvent("tea", "mod::TeaHouse::houseHmsetswitch")
            async houseHmsetswitch(data) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMsgHead.hmsetswitch, data, kaayou.MakeResultMessageHead(houseMsgHead.hmsetswitch))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "设置失败！" });
                    return;
                }
                if (data.switch.hasOwnProperty("BanWeChat")) {
                    tea.mod.__teaHouseInfo.hm_switch.BanWeChat = data.switch.BanWeChat;
                }

                if (data.switch.hasOwnProperty("IsRecShowParent")) {
                    tea.mod.__teaHouseInfo.hm_switch.IsRecShowParent = data.switch.IsRecShowParent;
                }

                if (data.switch.hasOwnProperty("CapSetDep")) {
                    tea.mod.__teaHouseInfo.hm_switch.CapSetDep = data.switch.CapSetDep;
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "设置成功" });
            }


            @BindEvent("tea", "ui::TeaHouse::cycdismisstip")
            async cycdismisstip(data) {

                let {game_num,param} = data;

                let info = await kaayou.sendMessage("lobby", "thdismissroomdet", {game_num}, kaayou.MakeResultMessageHead("thdismissroomdet"))
                if(info.errcode){
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "获取记录失败！" });
                    return;
                }
          
                kaayou.emit("teaRC","ui::circletip::onShow",lodash.extend({},lodash.pick(info,[ "dismiss_time","dismiss_type","dismiss_det"]),param));
            }


            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMsgHead.housejoininvitentf))
            onReceiveInviteJoinTeahouse(data: proto_housejoininvitesend) {
                kaayou.emit("tea", 'ui::ReceiveInvitePanel::Show', data);
            }

            //队长可踢通知
            @BindEvent('lobby', kaayou.MakeResultMessageHead(houseMsgHead.houseoptionispartnerkick_ntf))
            houseoptionispartnerkick_ntf(data: proto_houseoptionpartnerkick) {
                if (!_isInCurHouse(data.hid)) { return; }
                __teaHouseInfo.partnerkick = data.partnerkick;
                let tips: string = null;
                if (data.partnerkick) {
                    tips = "圈主打开了队长可踢！";
                }
                else {
                    tips = "圈主关闭了队长可踢！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                //如果玩家就在这个成员列表界面还是去刷一下移除按钮  实时变化
                kaayou.emit("tea", "ui::house:partnerKickStatus");
            }

            //退圈需要审核通知
            @BindEvent('lobby', kaayou.MakeResultMessageHead(houseMsgHead.houseoptionismemberexitcheck_ntf))
            houseoptionismemberexitcheck_ntf(data) {
                if (!_isInCurHouse(data.hid)) { return; }
                __teaHouseInfo.hismemexit = data.ischecked;
                let tips: string = null;
                if (data.ischecked) {
                    tips = "圈主打开了退圈审核！";
                }
                else {
                    tips = "圈主关闭了退圈审核！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit("tea", "ui::ApplyCell::UpdateInfo");
            }

            //亲友圈被封
            @BindEvent("lobby", "ws::Msg::houseblankchange_ntf")
            userHouseBank(data) {
                console.log(data);
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.reason || "该亲友圈已封！", btns: [{
                        name: "确定",
                        action: function () {
                            __teaHouseInfo = null;
                            kaayou.emit("tea", 'ui::TeaHouse::Quit');
                        }
                    }]
                })
            }

            //圈主修改了战绩时段筛选
            @BindEvent("lobby", "ws::Msg::setrecordtimeintervalrsp")
            onRecordTimeIntervalChange(data) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                tea.mod.__teaHouseInfo.record_time_interval = data.timeinterval;
                kaayou.TimeHelper.splitTime(__teaHouseInfo.record_time_interval);
                kaayou.emit("tea", "ui::RecordPanel::RecordTimeIntervalChange");
            }

            //成为队长旗下成员
            @BindEvent("lobby", "ws::Msg::housepartnergen_ntf")
            onTeamMemberChange(data) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                kaayou.emit('tea', 'ui::Member::RefreshMemberList');
            }

            //楼层颜色
            @BindEvent("lobby", "ws::Msg::housefloorcolorset_ntf")
            onUpdateTableBg(data: proto_housefloorcolorset_ntf) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                tea.mod.__teaHouseInfo.floors_color = data.floors_color;
                kaayou.emit("tea", 'mod::Table::GetUpdateList');
            }

            //禁用微信和   队长设置下级队长权限
            @BindEvent("lobby", "ws::Msg::hmsetswitch_ntf")
            onhmsetswitch_ntf(data) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                console.log(data);
                if (data.switch.hasOwnProperty("BanWeChat")) {
                    tea.mod.__teaHouseInfo.hm_switch.BanWeChat = data.switch.BanWeChat;
                }

                if (data.switch.hasOwnProperty("IsRecShowParent")) {
                    tea.mod.__teaHouseInfo.hm_switch.IsRecShowParent = data.switch.IsRecShowParent;
                }


                if (data.switch.hasOwnProperty("CapSetDep")) {
                    tea.mod.__teaHouseInfo.hm_switch.CapSetDep = data.switch.CapSetDep;
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                }

            }


            //禁用微信和   队长设置下级队长权限
            @BindEvent("lobby", "ws::Msg::housetabledistancelimitsetntf")
            housetabledistancelimitsetntf(data) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                tea.mod.__teaHouseInfo.distance = data.distance;
                //需要去更新设置界面的那个输入框的距离数字；
                kaayou.emit("tea", "ui::TeaHouse::UpdateSetCell", { type: "DistanceSet" });
            }

            //
            @BindEvent("lobby", "ws::Msg::houseprivategpsset_ntf")
            houseprivategpsset_ntf(data) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                tea.mod.__teaHouseInfo.private_gps = data.privategps;
                
                let tips: string = null;
                if (data.private_gps) {
                    tips = "设置成功，本亲友圈隐藏了玩家地址！";
                }
                else {
                    tips = "设置成功，亲友圈" + __teaHouseInfo.hid + "不再隐藏玩家地址！";
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: tips });
                kaayou.emit("tea","ui::TeaHouse::UpdateInfo",tea.mod.__teaHouseInfo);
            }



            @BindEvent("lobby", "ws::Msg::hmupdateuserright_ntf")
            TeaHouseRightUpdate(data) {

                let right;

                try {
                    right = JSON.parse(data.update_right)
                } catch (e) {
                    return;
                }
                let ins = this.promissionInstance();
                if (!!ins) ins.update(right);
            }


            static PERMISSION_TYPE = PERMISSION_TYPE
            static getPromissionInstance() {
                return tea.mod.House.getInstance().promissionInstance()
            }

            static ParsePromissionString(str, out?) {


                out = out || {}

                let temp;
                try {
                    temp = JSON.parse(str);
                } catch (e) {
                    temp = null;
                }


                if (typeof str === "object")
                    temp = str;

                if (temp === null)
                    return null;


                let key;

                for (key in temp)
                    if (typeof temp[key] !== "object")
                        return true;

                for (key in temp) {
                    let res = tea.mod.House.ParsePromissionString(temp[key], out);
                    if (res === true)
                        out[key] = temp[key];
                }

                return out;
            }

            private PermissionsInstance(config = "") {

                let configobj;
                let cache = {}
                let exec = false;
                let _watch = {};
                let attachAll = [];

                if (config)
                    init(config);


                return {

                    query: function (str) {

                        if (cache[str])
                            return cache[str].minor_status;

                        //先搜索key
                        for (let key in configobj) {
                            let temp = configobj[key];
                            if (temp.minor_key === str || temp.minor_name === str) {
                                cache[str] = temp;
                                return temp.minor_status;
                            }

                        }

                        return null;

                    },
                    watch: function (key, fn) {

                        let temp = info(key)

                        if (temp !== null) {
                            let skey = temp.minor_key;
                            _watch[skey] = _watch[skey] || [];
                            _watch[skey].push(fn);
                        }

                    },
                    attachUpdate(fn) {

                        if (typeof fn !== "function")
                            return;

                        //只允许一个相同函数监听
                        let idx = attachAll.indexOf(fn);
                        if (idx == -1) {
                            attachAll.push(fn);
                        }
                    },
                    detachUpdate(fn) {
                        let idx = attachAll.indexOf(fn);
                        if (idx !== -1) {
                            attachAll.splice(idx, 1);
                        }
                    },
                    removeWatch: function (key) {
                        let temp = info(key)

                        if (temp !== null) {
                            let skey = temp.minor_key;
                            if (_watch[skey]) {
                                _watch[skey].splice(0, _watch[skey].length)
                            }
                        }
                    },
                    attachWatch: function (key, fn) {
                        let temp = info(key)

                        if (temp !== null) {
                            let skey = temp.minor_key;
                            _watch[skey] = _watch[skey] || [];

                            let idx = _watch[skey].indexOf(fn)
                            if (idx == -1)
                                _watch[skey].push(fn);

                        }
                    },
                    detachWatch: function (key, fn) {
                        let temp = info(key)

                        if (temp !== null) {
                            let skey = temp.minor_key;
                            if (_watch[skey]) {
                                let idx = _watch[skey].indexOf(fn)
                                if (idx !== -1)
                                    _watch[skey].splice(idx, 1);
                            }
                        }
                    },
                    update: function (config, clean = false) {

                        if (exec === false || clean == true) {
                            init(config);
                            return;
                        }

                        let upInfo = recursive(config);
                        let all = {}
                        for (let key in upInfo) {

                            let temp = upInfo[key];
                            let t2 = info(key);

                            if (t2 !== null) {
                                let ttkey = t2.minor_key
                                let t1 = upInfo[ttkey];
                                let t2o
                                t1 = pick(t1, ["minor_key", "minor_name", "minor_status"]);
                                t2o = pick(t2, ["minor_key", "minor_name", "minor_status"]);

                                if (!eq(t1, t2o)) {

                                    let diff = different(t2, t1)
                                    all[ttkey] = diff;

                                    for (let key in diff) {
                                        t2[key] = diff[key].new;
                                    }

                                    if (_watch[ttkey])
                                        _watch[ttkey].forEach((v) => {
                                            v(diff)
                                        })
                                }

                            } else {
                                configobj[key] = temp[key];
                                all[key] = temp[key];
                            }

                        }

                        for (let key in all) {
                            attachAll.forEach(v => {
                                v(all)
                            })
                            break;
                        }


                        cache = {};
                    }
                }

                function init(str) {
                    exec = true;
                    configobj = recursive(str)
                }

                function info(keyorname) {

                    for (let key in configobj) {
                        let temp = configobj[key];
                        if (temp.minor_key === keyorname || temp.minor_name === keyorname)
                            return temp
                    }

                    return null;

                }

                function recursive(str, out?) {

                    out = out || {}

                    let temp;
                    try {
                        temp = JSON.parse(str);
                    } catch (e) {
                        temp = null;
                    }


                    if (typeof str === "object")
                        temp = str;

                    if (temp === null)
                        return null;


                    let key;

                    for (key in temp)
                        if (typeof temp[key] !== "object")
                            return true;

                    for (key in temp) {
                        let res = recursive(temp[key], out);
                        if (res === true)
                            out[key] = temp[key];
                    }

                    return out;
                }

                function pick(o, keys: Array<string>) {
                    return keys.reduce((out, v) => {
                        out[v] = o[v];
                        return out
                    }, {})
                }

                function eq(x, y) {

                    if (x === y)
                        return true;

                    if (!(x instanceof Object) || !(y instanceof Object))
                        return false;

                    if (x.constructor !== y.constructor)
                        return false;

                    for (var p in x) {
                        if (x.hasOwnProperty(p)) {
                            if (!y.hasOwnProperty(p)) {
                                return false;
                            }

                            if (x[p] === y[p])
                                continue;

                            if (typeof (x[p]) !== "object")
                                return false;

                            if (!eq(x[p], y[p]))
                                return false;

                        }
                    }

                    for (p in y)
                        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                            return false;

                    return true;
                }

                function different(t1, t2) {
                    let out = {}
                    Object.keys(t1).forEach(v => {
                        let tm1 = t1[v];
                        let tm2 = t2[v]
                        if (tm1 !== tm2) {
                            out[v] = { old: tm1, new: tm2 }
                        }
                    })
                    return out;
                }



            }
        }
    }
    tea.mod.House.getInstance();
}