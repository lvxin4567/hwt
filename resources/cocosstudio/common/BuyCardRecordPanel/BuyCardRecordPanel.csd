<GameFile>
  <PropertyGroup Name="BuyCardRecordPanel" Type="Layer" ID="ae41ab60-0edf-4f2b-87db-0cb55a46ca66" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="26" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-321412007" Alpha="127" Tag="28" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="255" G="255" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="contentPanel" ActionTag="-1426089020" Tag="516" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="246.0000" RightMargin="246.0000" TopMargin="136.0000" BottomMargin="136.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="260" RightEage="260" TopEage="147" BottomEage="147" Scale9OriginX="260" Scale9OriginY="147" Scale9Width="268" Scale9Height="154" ctype="PanelObjectData">
            <Size X="788.0000" Y="448.0000" />
            <Children>
              <AbstractNodeData Name="ScrollView" ActionTag="1564245341" Tag="365" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="29.0000" RightMargin="29.0000" TopMargin="31.0000" BottomMargin="193.0000" TouchEnable="True" ClipAble="True" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Horizontal" ctype="ScrollViewObjectData">
                <Size X="730.0000" Y="224.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="394.0000" Y="305.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.6808" />
                <PreSize X="0.9264" Y="0.5000" />
                <SingleColor A="255" R="0" G="0" B="0" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="788" Height="224" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_5" ActionTag="21843677" Tag="574" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="295.0000" RightMargin="295.0000" TopMargin="277.0000" BottomMargin="149.0000" FontSize="22" LabelText="兑换成功后下局生效" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="198.0000" Y="22.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="394.0000" Y="160.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="203" G="165" B="111" />
                <PrePosition X="0.5000" Y="0.3571" />
                <PreSize X="0.2513" Y="0.0491" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="checkIp_TipPanel" ActionTag="-1528410665" Tag="112" IconVisible="False" LeftMargin="338.0000" RightMargin="94.0000" TopMargin="132.0000" BottomMargin="196.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="356.0000" Y="120.0000" />
                <Children>
                  <AbstractNodeData Name="checkIp_Tip" ActionTag="563479224" Tag="113" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="164.0000" RightMargin="164.0000" TopMargin="141.1700" BottomMargin="-49.1700" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="9" RightEage="9" TopEage="11" BottomEage="11" Scale9OriginX="9" Scale9OriginY="11" Scale9Width="10" Scale9Height="6" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="28.0000" Y="28.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="178.0000" Y="-35.1700" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="-0.2931" />
                    <PreSize X="0.0787" Y="0.2333" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                    <PressedFileData Type="PlistSubImage" Path="dom.question_tag.png" Plist="common/RichDom/RichDom.plist" />
                    <NormalFileData Type="PlistSubImage" Path="dom.question_tag.png" Plist="common/RichDom/RichDom.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="checkIp_Tip_image" ActionTag="450375422" Tag="114" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.0000" RightMargin="7.0000" TopMargin="42.6000" BottomMargin="-12.6000" LeftEage="142" RightEage="142" TopEage="52" BottomEage="52" Scale9OriginX="142" Scale9OriginY="52" Scale9Width="147" Scale9Height="54" ctype="ImageViewObjectData">
                    <Size X="342.0000" Y="90.0000" />
                    <Children>
                      <AbstractNodeData Name="Text_1" ActionTag="-286470583" Tag="115" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="15.0000" RightMargin="15.0000" TopMargin="19.6000" BottomMargin="30.4000" IsCustomSize="True" FontSize="20" LabelText="记牌器功能最终解释权归斗棋所有" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                        <Size X="312.0000" Y="40.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="171.0000" Y="50.4000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5600" />
                        <PreSize X="0.9123" Y="0.4444" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="178.0000" Y="32.4000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.2700" />
                    <PreSize X="0.9607" Y="0.7500" />
                    <FileData Type="PlistSubImage" Path="dom.bubble_bg.png" Plist="common/RichDom/RichDom.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="338.0000" Y="196.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4289" Y="0.4375" />
                <PreSize X="0.4518" Y="0.2679" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_lefttime" ActionTag="-1862676080" Tag="576" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="245.5000" RightMargin="245.5000" TopMargin="305.0000" BottomMargin="121.0000" FontSize="22" LabelText="到期时间：2020/11/14 19::40" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="297.0000" Y="22.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="394.0000" Y="132.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="221" G="117" B="32" />
                <PrePosition X="0.5000" Y="0.2946" />
                <PreSize X="0.3769" Y="0.0491" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Button_comfirm" ActionTag="1382251338" Tag="577" IconVisible="False" LeftMargin="116.0000" RightMargin="444.0000" TopMargin="337.5000" BottomMargin="29.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="-1488559299" Tag="593" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="78.5000" RightMargin="78.5000" TopMargin="18.9500" BottomMargin="27.0500" LabelText="确定" ctype="TextBMFontObjectData">
                    <Size X="71.0000" Y="35.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.3114" Y="0.4321" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="230.0000" Y="70.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2919" Y="0.1563" />
                <PreSize X="0.2893" Y="0.1808" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_green.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Button_cancel" ActionTag="-706650551" Tag="578" IconVisible="False" LeftMargin="444.0000" RightMargin="116.0000" TopMargin="337.5000" BottomMargin="29.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="-1137696233" Tag="594" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="77.5000" RightMargin="77.5000" TopMargin="18.9500" BottomMargin="27.0500" LabelText="取消" ctype="TextBMFontObjectData">
                    <Size X="73.0000" Y="35.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.3202" Y="0.4321" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.yellow_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="558.0000" Y="70.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7081" Y="0.1563" />
                <PreSize X="0.2893" Y="0.1808" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_yellow_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_yellow.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.6156" Y="0.6222" />
            <FileData Type="PlistSubImage" Path="BuyCardRecordPanel.img_bigbg.png" Plist="common/BuyCardRecordPanel/BuyCardRecordPanel.plist" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="Panel_cell" ActionTag="689604942" Tag="366" IconVisible="False" LeftMargin="-392.0000" RightMargin="1488.0000" TopMargin="248.0000" BottomMargin="248.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="60" RightEage="60" TopEage="73" BottomEage="73" Scale9OriginX="60" Scale9OriginY="73" Scale9Width="64" Scale9Height="78" ctype="PanelObjectData">
            <Size X="184.0000" Y="224.0000" />
            <Children>
              <AbstractNodeData Name="btn_buy" ActionTag="-1089531594" Tag="438" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="184.0000" Y="224.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="92.0000" Y="112.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="1.0000" Y="1.0000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_pic" ActionTag="1730070062" Tag="357" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="38.5000" RightMargin="38.5000" TopMargin="42.5400" BottomMargin="60.4600" LeftEage="35" RightEage="35" TopEage="39" BottomEage="39" Scale9OriginX="35" Scale9OriginY="39" Scale9Width="37" Scale9Height="43" ctype="ImageViewObjectData">
                <Size X="107.0000" Y="121.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="92.0000" Y="120.9600" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5400" />
                <PreSize X="0.5815" Y="0.5402" />
                <FileData Type="PlistSubImage" Path="BuyCardRecordPanel.img_pic.png" Plist="common/BuyCardRecordPanel/BuyCardRecordPanel.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="fnt_date" ActionTag="382723990" Tag="358" IconVisible="False" LeftMargin="22.0000" RightMargin="122.0000" TopMargin="4.0000" BottomMargin="188.0000" LabelText="1天" ctype="TextBMFontObjectData">
                <Size X="40.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="42.0000" Y="204.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2283" Y="0.9107" />
                <PreSize X="0.2174" Y="0.1429" />
                <LabelBMFontFile_CNB Type="Normal" Path="common/BuyCardRecordPanel/BuyCardRecordPanel.font.dataNum.fnt" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_zhuanshi" ActionTag="-2021060752" Tag="359" IconVisible="False" LeftMargin="43.5000" RightMargin="103.5000" TopMargin="182.5000" BottomMargin="8.5000" LeftEage="12" RightEage="12" TopEage="10" BottomEage="10" Scale9OriginX="12" Scale9OriginY="10" Scale9Width="13" Scale9Height="13" ctype="ImageViewObjectData">
                <Size X="37.0000" Y="33.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="62.0000" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3370" Y="0.1116" />
                <PreSize X="0.2011" Y="0.1473" />
                <FileData Type="PlistSubImage" Path="BuyCardRecordPanel.img_pic2.png" Plist="common/BuyCardRecordPanel/BuyCardRecordPanel.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="fnt_zhuanshi" ActionTag="-1542244324" Tag="360" IconVisible="False" LeftMargin="90.0000" RightMargin="48.0000" TopMargin="183.0000" BottomMargin="9.0000" LabelText="X3" ctype="TextBMFontObjectData">
                <Size X="46.0000" Y="32.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="90.0000" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4891" Y="0.1116" />
                <PreSize X="0.2500" Y="0.1429" />
                <LabelBMFontFile_CNB Type="Normal" Path="common/BuyCardRecordPanel/BuyCardRecordPanel.font.zhuanshiNum.fnt" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_choose" Visible="False" ActionTag="235260576" Tag="361" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="-4.0000" BottomMargin="-4.0000" LeftEage="63" RightEage="63" TopEage="76" BottomEage="76" Scale9OriginX="63" Scale9OriginY="76" Scale9Width="66" Scale9Height="80" ctype="ImageViewObjectData">
                <Size X="192.0000" Y="232.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="92.0000" Y="112.0000" />
                <Scale ScaleX="1.0500" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="1.0435" Y="1.0357" />
                <FileData Type="PlistSubImage" Path="BuyCardRecordPanel.img_choose.png" Plist="common/BuyCardRecordPanel/BuyCardRecordPanel.plist" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="-300.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="-0.2344" Y="0.5000" />
            <PreSize X="0.1437" Y="0.3111" />
            <FileData Type="PlistSubImage" Path="BuyCardRecordPanel.img_cellbg.png" Plist="common/BuyCardRecordPanel/BuyCardRecordPanel.plist" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>