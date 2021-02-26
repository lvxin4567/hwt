<GameFile>
  <PropertyGroup Name="TH_RemoveMember" Type="Layer" ID="af504240-020d-4b0e-95aa-86a3aea9db41" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="283" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="mask_bg" ActionTag="-1692429823" Tag="284" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="contentPanel" ActionTag="1389099410" Tag="285" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="286.0000" RightMargin="286.0000" TopMargin="126.0000" BottomMargin="126.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="0" ComboBoxIndex="1" ColorAngle="90.0000" LeftEage="233" RightEage="233" TopEage="154" BottomEage="154" Scale9OriginX="233" Scale9OriginY="154" Scale9Width="242" Scale9Height="160" ctype="PanelObjectData">
            <Size X="708.0000" Y="468.0000" />
            <Children>
              <AbstractNodeData Name="dialog_title_1" ActionTag="-1430367534" Tag="286" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="230.0000" RightMargin="230.0000" TopMargin="-2.0000" BottomMargin="397.0000" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="354.0000" Y="433.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9263" />
                <PreSize X="0.3503" Y="0.1560" />
                <FileData Type="Normal" Path="common/bgs/talert_title_bg.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_7" ActionTag="-131186546" Tag="296" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="178.1100" RightMargin="178.1100" TopMargin="119.8292" BottomMargin="293.6129" IsCustomSize="True" FontSize="28" LabelText="是否移除该成员？" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="351.7800" Y="54.5579" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="354.0000" Y="320.8918" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.5000" Y="0.6857" />
                <PreSize X="0.4969" Y="0.1166" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="black_check" ActionTag="1261521629" Tag="288" IconVisible="False" LeftMargin="245.3956" RightMargin="420.6044" TopMargin="204.5114" BottomMargin="221.4886" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="42.0000" Y="42.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="266.3956" Y="242.4886" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3763" Y="0.5181" />
                <PreSize X="0.0593" Y="0.0897" />
                <NormalBackFileData Type="PlistSubImage" Path="TH_img-check-off.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                <PressedBackFileData Type="PlistSubImage" Path="TH_img-check-off.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                <DisableBackFileData Type="PlistSubImage" Path="TH_img-check-off.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                <NodeNormalFileData Type="PlistSubImage" Path="TH_img-check-on.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                <NodeDisableFileData Type="PlistSubImage" Path="TH_img-check-on.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_3" ActionTag="1816173781" Tag="290" IconVisible="False" LeftMargin="289.5119" RightMargin="268.3686" TopMargin="214.3055" BottomMargin="233.6945" IsCustomSize="True" FontSize="20" LabelText="同时加入黑名单" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="150.1195" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="364.5717" Y="243.6945" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.5149" Y="0.5207" />
                <PreSize X="0.2120" Y="0.0427" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_3_0" ActionTag="136717490" Tag="291" IconVisible="False" LeftMargin="141.5338" RightMargin="170.4526" TopMargin="274.4673" BottomMargin="173.5327" IsCustomSize="True" FontSize="20" LabelText="(注:加入黑名单不再收到该玩家任何信息)" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="396.0135" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="339.5406" Y="183.5327" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="73" B="37" />
                <PrePosition X="0.4796" Y="0.3922" />
                <PreSize X="0.5593" Y="0.0427" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_sure" ActionTag="475269289" Tag="292" IconVisible="False" LeftMargin="70.9647" RightMargin="409.0353" TopMargin="326.1582" BottomMargin="60.8418" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="869196040" Tag="1098" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="71.5000" RightMargin="71.5000" TopMargin="17.4500" BottomMargin="25.5500" LabelText="确  定" ctype="TextBMFontObjectData">
                    <Size X="85.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.3728" Y="0.4691" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="184.9647" Y="101.3418" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2612" Y="0.2165" />
                <PreSize X="0.3220" Y="0.1731" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_green.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_cancel" ActionTag="-758150297" Tag="293" IconVisible="False" LeftMargin="388.2185" RightMargin="91.7815" TopMargin="326.2855" BottomMargin="60.7145" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="1084446901" Tag="1097" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="70.5000" RightMargin="70.5000" TopMargin="17.4500" BottomMargin="25.5500" LabelText="取  消" ctype="TextBMFontObjectData">
                    <Size X="87.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.3816" Y="0.4691" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.blue_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="502.2185" Y="101.2145" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7093" Y="0.2163" />
                <PreSize X="0.3220" Y="0.1731" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_blue_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_blue_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_blue.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.5531" Y="0.6500" />
            <FileData Type="Normal" Path="common/bgs/alert_bg.png" Plist="" />
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