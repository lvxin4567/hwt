
namespace common {
    const EARTH_RADIUS = 6378.137;

    export class GPSLayer extends kaayou.Layer {

        _curMod: mod.friendBaseMod<mod.IFriendGame_User_Info> = null;
        closeBtn: ccui.Button = null;
        safeDis: number = 100;
        nameText: Array<ccui.Text> = [];
        disText: Array<Array<ccui.Text>> = [];
        ctx = null;

        greenColor = cc.color(37, 142, 12);
        redColor = cc.color(255, 0, 0);
        grayColor = cc.color(103, 103, 103);


        playerNode: cc.Node = null;
        playerNodeArr: Array<cc.Node> = [];
        constructor(ccs: string, curMod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info> = null) {
            super();
            this.initWithccs(ccs);
            this._curMod = curMod;
            this.safeDis = this.getSafeDistance();
            this.setVisible(false);
        }

        initUI() {
            let self = this;
            this.closeBtn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close")
            this.closeBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(SoundRes["Click_btn_close"]);
                self.setVisible(false);
            }, this);
            this.playerNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "playerNode")
            for (let i = 0; i < 4; i++) {
                this.playerNodeArr[i] = this.playerNode.children[i];
                this.nameText[i] = this.playerNodeArr[i].getChildByName<ccui.Text>("nameText");
                this.nameText[i].string = '';
                this.nameText[i].ignoreContentAdaptWithSize(true);
            }
            for (let i = 0; i < 4; i++) {
                this.disText[i] = [];
                for (let j = i + 1; j < 4; j++) {
                    this.disText[i][j] = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "disText_" + i + '_' + j);
                    this.disText[i][j].string = '';
                    this.disText[i][j].ignoreContentAdaptWithSize(true);
                }
            }
            this.ctx = new cc.DrawNode();
            this.playerNode.addChild(this.ctx, -1);
            this.ctx.setLineWidth(3);
        }

        cleanUp(){
            this.ctx.clear();//清除线
            //清楚玩家头像
            for(let i = 0 ; i < 4 ;i++){
                let headImg = this.playerNodeArr[i].getChildByName<ccui.ImageView>('headImg');
                this.playerNodeArr[i].setVisible(true);
                NetImage.setPlayerHead(headImg , "");
                let sp = <cc.Sprite>headImg.getChildByName("headImgSp");
                sp.initWithSpriteFrameName("gps_icon.png");
                this.nameText[i].string = "";
            }
            //清除distext
            for (let i = 0; i < 4; i++) {
                for (let j = i + 1; j < 4; j++) {
                    this.disText[i][j].string = '';
                }
            }
        }

        getSafeDistance() {
            if (this._curMod && this._curMod.getTableInfo() && this._curMod.getTableInfo().distancelimit > 0) {
                return this._curMod.getTableInfo().distancelimit;
            } else if (common.mod.Config.AppConfig.gps) {
                return common.mod.Config.AppConfig.gps.distance;
            } else {
                return 100;
            }
        }

        setInfo(data: { Players: Array<mod.IGame_User_Info>, maxPlayer: number }) {
            this.cleanUp();
            let maxPlayer = data.maxPlayer;

            //动态设置人数
            if (maxPlayer == 3) {
                this.playerNodeArr[2].setVisible(false);
            } else if (maxPlayer == 2) {
                this.playerNodeArr[1].setVisible(false);
                this.playerNodeArr[3].setVisible(false);
            }
            let playerInfo = data.Players;
            for (let i = 0; i < playerInfo.length; i++) {
                let longitude1 = 0;
                let latitude1 = 0;
                let ip1 = ''

                //动态设置人数
                if (maxPlayer == 3 && i == 2) {
                    continue;
                } else if (maxPlayer == 2 && (i == 1 || i == 3)) {
                    continue;
                }

                if (playerInfo[i]) {
                    if (playerInfo[i].longitude && playerInfo[i].latitude) {
                        longitude1 = Number(playerInfo[i].longitude);//经度
                        latitude1 = Number(playerInfo[i].latitude); //纬度
                    }
                    if (playerInfo[i].ip) ip1 = playerInfo[i].ip;
                }
                let headImg = this.playerNodeArr[i].getChildByName<ccui.ImageView>('headImg');

                if (playerInfo[i]) {
                    NetImage.setPlayerHead(headImg , playerInfo[i].imgurl , playerInfo[i].sex );
                    let tempnickname = kaayou.Identify.nickNameSubFive(playerInfo[i].name);
                    this.nameText[i].string = tempnickname;

                } 
                // else {
                //     this.playerNodeArr[i].getChildByName<ccui.ImageView>('headImg').loadTexture("icon.png" , ccui.Widget.PLIST_TEXTURE);
                //     this.nameText[i].string = "";
                // }

                for (let j = i + 1; j < playerInfo.length; j++) {
                    let longitude2 = 0;
                    let latitude2 = 0;
                    let ip2 = ''
                    //动态设置人数
                    if (maxPlayer == 3 && j == 2) {
                        continue;
                    } else if (maxPlayer == 2 && (j == 1 || j == 3)) {
                        continue;
                    }

                    if (!playerInfo[j] || !playerInfo[i]) {
                        this.disText[i][j].setVisible(false);
                    } else {
                        this.disText[i][j].setVisible(true);
                    }
                    if (playerInfo[j]) {
                        if (playerInfo[j].longitude && playerInfo[j].latitude) {
                            longitude2 = Number(playerInfo[j].longitude);
                            latitude2 = Number(playerInfo[j].latitude);
                        }
                        if (playerInfo[j].ip) ip2 = playerInfo[j].ip;
                    }
                    if ((longitude1 == 0 && latitude1 == 0) || (longitude2 == 0 && latitude2 == 0)) {
                        this.showDistance(i, j, 0, 0, ip1 == ip2);
                    } else {
                        let dis = this.getDistance(longitude1, latitude1, longitude2, latitude2);
                        this.showDistance(i, j, dis, 1, ip1 == ip2);
                    }
                }
            }
        }

        showDistance(from: number, to: number, dis: number, type: number, sameIp: boolean) {
            let disLabelNode = this.disText[from][to];
            let startPos = this.playerNodeArr[from].getPosition();
            let endPos = this.playerNodeArr[to].getPosition();
            if (type == 1) {
                if (dis >= 1000) {
                    disLabelNode.string = Math.floor(dis / 1000).toString() + 'km';
                } else {
                    disLabelNode.string = dis.toString() + 'm';
                }

                if (dis < this.safeDis) {
                    disLabelNode.setTextColor(this.redColor);
                    this.ctx.setDrawColor(this.redColor);
                } else {
                    disLabelNode.color = this.greenColor;
                    this.ctx.setDrawColor(this.greenColor);
                }
            } else {
                disLabelNode.string = '无法获取';
                disLabelNode.setTextColor(this.grayColor);
                this.ctx.setDrawColor(this.grayColor);
            }
            if (sameIp) {
                disLabelNode.string += '(ip相同)'
            }
            this.ctx.drawSegment(startPos, endPos);
            disLabelNode.rotation = - (Math.atan((startPos.y - endPos.y) / (startPos.x - endPos.x)) * 180 / Math.PI);
            if (disLabelNode.getName() == 'disText_0_2') {
                disLabelNode.rotation = 270;
            }

        }

        getDistance(longitude1, latitude1, longitude2, latitude2) {
            var radLat1 = this.Rad(latitude1);
            var radLat2 = this.Rad(latitude2);
            let a = radLat1 - radLat2;
            let b = this.Rad(longitude1) - this.Rad(longitude2);

            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));

            s = s * EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000 * 1000;//米
            return Math.floor(s);
        }

        Rad(d) {
            return d * Math.PI / 180;
        }

        Show(data: { Players: Array<mod.IGame_User_Info>, maxPlayer: number }) {
            this.safeDis = this.getSafeDistance();
            console.log("安全距离: ", this.safeDis);

            this.setInfo(data);
            this.setVisible(true);
        }
    }
}