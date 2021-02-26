namespace kaayou {

    export class pop {


        //普通弹窗显示动画
        static showAni(s: { cNode: cc.Node, mNode?: cc.Node, action?: Function }) {
            if (!s) {
                console.log("showAni return 1");
                return;
            }
            if (!s.cNode) {
                console.log("showAni return 2");
                return;
            }
            //清理动画
            if (s.cNode) { s.cNode.stopAllActions(); }
            if (s.mNode) { s.mNode.stopAllActions(); }

            s.mNode = s.mNode || null;
            s.action = s.action || null;
            s.cNode.setScale(1);
            s.cNode.opacity = 0;
            let nSq = cc.sequence(
                // cc.delayTime(0.08),
                cc.callFunc(function () {
                    s.cNode.setScale(0);
                    s.cNode.opacity = 255;
                }),
                cc.scaleTo(0.1, 1.1),
                cc.scaleTo(0.1, 1),
                cc.callFunc(function () {
                    if (s.action) {
                        s.action();
                    }
                })
            )
            s.cNode.runAction(nSq);

            if (s.mNode) {
                s.mNode.opacity = 0;
                // let maskSq = cc.sequence(
                //     cc.delayTime(0.07),
                //     cc.fadeTo(0.2, 190),
                // )
                s.mNode.runAction(cc.fadeTo(0.2, 190));
            }
        }


        //普通弹窗隐藏动画
        //mNode:通常是遮罩
        static hideAni(h: { cNode: cc.Node, mNode?: cc.Node, rnode?: cc.Node, action?: Function }) {
            if (!h) { return }
            if (!h.cNode) { return; }
            h.mNode = h.mNode || null;
            h.rnode = h.rnode || null;
            h.action = h.action || null;
            //清理动画
            if (h.cNode) { h.cNode.stopAllActions(); }
            if (h.mNode) { h.mNode.stopAllActions(); }

            h.cNode.runAction(cc.sequence(cc.scaleTo(0.2, 0), cc.callFunc(function () {
                if (!h.mNode) {
                    if (h.rnode) {
                        h.rnode.setVisible(false);
                    }
                    if (h.action) {
                        h.action();
                    }
                }
            })));

            if (h.mNode) {
                h.mNode.runAction(cc.sequence(cc.fadeTo(0.3, 0), cc.callFunc(function () {
                    if (h.rnode) {
                        h.rnode.setVisible(false);
                    }
                    if (h.action) {
                        h.action();
                    }
                })));
            }
        }


        //全屏界面（蓝色）显示的动画  t：上  b：下面   
        static ShowMainAnim(s: { tNode: cc.Node, bNode: cc.Node, mNode?: cc.Node, action?: Function }) {
            if (!s) { console.log('s不存在'); return; }
            if (!s.tNode) { console.log('st不存在'); return; }
            if (!s.bNode) { console.log('sb不存在'); return; }
            s.mNode = s.mNode || null;
            s.action = s.action || null;
            s.tNode.setPositionY(720);
            // s.tNode.opacity = 255;
            s.bNode.setPositionY(0);
            // s.bNode.opacity = 255;
            let winSize = cc.winSize;
            let tSize = s.tNode.getContentSize();
            let bSize = s.bNode.getContentSize();
            //清理动画
            if (s.tNode) { s.tNode.stopAllActions(); }
            if (s.bNode) { s.bNode.stopAllActions(); }
            if (s.mNode) { s.mNode.stopAllActions(); }

            let tnSq = cc.sequence(
                // cc.delayTime(0.08),
                cc.moveTo(0.1, cc.p(0, winSize.height - tSize.height)),
                // cc.moveTo(0.1, cc.p(0, 657)),
                cc.callFunc(function () {
                    s.tNode.setPositionY(winSize.height - tSize.height);
                    s.tNode.opacity = 255;
                }),
            )

            let bnSq = cc.sequence(
                // cc.callFunc(function () {
                //     s.bNode.setPositionY(-619);
                //     s.bNode.opacity = 255;
                // }),
                cc.moveTo(0.1, cc.p(winSize.width/2, (winSize.height - tSize.height)/2)),
                cc.callFunc(function () {
                    s.bNode.setPositionY((winSize.height - tSize.height)/2);
                    // s.bNode.opacity = 255;
                    // if (s.action) {
                    //     s.action();
                    // }
                    if (s.action) {
                        s.action();
                    }
                }),
            )
            s.tNode.runAction(tnSq);
            s.bNode.runAction(bnSq);

            // if (s.mNode) {
            //     s.mNode.opacity = 0;
            //     let maskSq = cc.sequence(
            //         cc.delayTime(0.07),
            //         cc.fadeTo(0.1, 255),
            //         // cc.fadeIn(1,255),
            //     )
            //     s.mNode.runAction(maskSq);
            // }
        }


    }
}




