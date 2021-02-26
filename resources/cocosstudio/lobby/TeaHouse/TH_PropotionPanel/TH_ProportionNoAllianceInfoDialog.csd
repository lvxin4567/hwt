<GameFile>
  <PropertyGroup Name="TH_ProportionNoAllianceInfoDialog" Type="Layer" ID="2964deb5-aa18-4272-bc0c-26f66ee63bf7" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="748" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="484593757" Tag="821" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="contentPanel" ActionTag="-309762714" Tag="816" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="200.0000" RightMargin="200.0000" TopMargin="91.0000" BottomMargin="64.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="480" Scale9Height="266" ctype="PanelObjectData">
            <Size X="880.0000" Y="565.0000" />
            <Children>
              <AbstractNodeData Name="Title" ActionTag="-1597570196" Tag="802" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="316.0000" RightMargin="316.0000" TopMargin="-6.5050" BottomMargin="498.5050" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="-1070579166" Tag="803" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="90.5000" RightMargin="90.5000" TopMargin="14.8500" BottomMargin="22.1500" LabelText="明细" ctype="TextBMFontObjectData">
                    <Size X="67.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="124.0000" Y="40.1500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.2702" Y="0.4932" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.dialog_title.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="440.0000" Y="535.0050" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9469" />
                <PreSize X="0.2818" Y="0.1292" />
                <FileData Type="Normal" Path="common/bgs/dialogTitleBg.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_close" ActionTag="1718482481" Tag="817" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="834.5000" RightMargin="-10.5000" TopMargin="-22.0000" BottomMargin="529.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="862.5000" Y="558.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9801" Y="0.9876" />
                <PreSize X="0.0636" Y="0.1027" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="memberlist" ActionTag="1520830110" Tag="819" IconVisible="False" LeftMargin="15.0000" RightMargin="15.0000" TopMargin="80.0000" BottomMargin="35.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="850.0000" Y="450.0000" />
                <Children>
                  <AbstractNodeData Name="content" ActionTag="1063309398" Tag="820" IconVisible="False" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                    <Size X="850.0000" Y="450.0000" />
                    <AnchorPoint ScaleX="0.5000" />
                    <Position X="425.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" />
                    <PreSize X="1.0000" Y="1.0000" />
                    <SingleColor A="255" R="255" G="150" B="100" />
                    <FirstColor A="255" R="255" G="150" B="100" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                    <InnerNodeSize Width="850" Height="450" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="440.0000" Y="485.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.8584" />
                <PreSize X="0.9659" Y="0.7965" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="346.5000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4812" />
            <PreSize X="0.6875" Y="0.7847" />
            <FileData Type="Normal" Path="common/bgs/Bg888548.png" Plist="" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="tea_call_info_item" ActionTag="-807354364" Tag="806" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="222.5920" RightMargin="207.4080" TopMargin="851.1440" BottomMargin="-211.1440" TouchEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Enable="True" LeftEage="94" RightEage="94" TopEage="30" BottomEage="30" Scale9OriginX="-94" Scale9OriginY="-30" Scale9Width="188" Scale9Height="60" ctype="PanelObjectData">
            <Size X="850.0000" Y="80.0000" />
            <Children>
              <AbstractNodeData Name="Panel_5" ActionTag="1964328462" Tag="807" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftMargin="-0.8350" RightMargin="0.8350" TopMargin="0.8350" BottomMargin="-0.8350" TouchEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Enable="True" LeftEage="353" RightEage="353" TopEage="26" BottomEage="26" Scale9OriginX="353" Scale9OriginY="26" Scale9Width="113" Scale9Height="26" ctype="PanelObjectData">
                <Size X="850.0000" Y="80.0000" />
                <AnchorPoint />
                <Position X="-0.8350" Y="-0.8350" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.0010" Y="-0.0104" />
                <PreSize X="1.0000" Y="1.0000" />
                <FileData Type="PlistSubImage" Path="TH_mem_bg-cell.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberCells.plist" />
                <SingleColor A="255" R="227" G="217" B="198" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="HeadBg" ActionTag="-1638307839" Tag="808" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0000" RightMargin="769.0000" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                <Size X="68.0000" Y="68.0000" />
                <Children>
                  <AbstractNodeData Name="img_head" ActionTag="1645628267" Tag="809" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                    <Size X="64.0000" Y="64.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="34.0000" Y="34.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.9412" Y="0.9412" />
                    <FileData Type="PlistSubImage" Path="thb_head.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleY="0.5000" />
                <Position X="13.0000" Y="40.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0153" Y="0.5000" />
                <PreSize X="0.0800" Y="0.8500" />
                <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_name" ActionTag="-1032496215" Tag="810" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="90.0000" RightMargin="580.0000" TopMargin="7.0000" BottomMargin="43.0000" IsCustomSize="True" FontSize="24" LabelText="玩家名称六字   " VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="180.0000" Y="30.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="90.0000" Y="58.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.1059" Y="0.7250" />
                <PreSize X="0.2118" Y="0.3750" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_id" ActionTag="-1679758560" Tag="811" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="90.0000" RightMargin="580.0000" TopMargin="42.0000" BottomMargin="8.0000" IsCustomSize="True" FontSize="24" LabelText="ID:1234567" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="180.0000" Y="30.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="90.0000" Y="23.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.1059" Y="0.2875" />
                <PreSize X="0.2118" Y="0.3750" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_youxiao" ActionTag="230774507" Tag="812" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="316.0500" RightMargin="429.9500" TopMargin="11.0000" BottomMargin="43.0000" FontSize="26" LabelText="数值变动" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="104.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="368.0500" Y="56.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.4330" Y="0.7000" />
                <PreSize X="0.1224" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="lbChange" ActionTag="1560160052" Tag="813" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="244.5500" RightMargin="358.4500" TopMargin="43.0000" BottomMargin="11.0000" IsCustomSize="True" FontSize="26" LabelText="0000000000000000000" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="247.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="368.0500" Y="24.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.4330" Y="0.3000" />
                <PreSize X="0.2906" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_youxiao_0" ActionTag="-342375090" Tag="814" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="596.5500" RightMargin="149.4500" TopMargin="11.0000" BottomMargin="43.0000" FontSize="26" LabelText="大赢家数" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="104.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="648.5500" Y="56.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.7630" Y="0.7000" />
                <PreSize X="0.1224" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="lbBigWin" ActionTag="-1150145997" Tag="815" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="538.0500" RightMargin="90.9500" TopMargin="43.0000" BottomMargin="11.0000" IsCustomSize="True" FontSize="26" LabelText="2222222222222222" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="221.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="648.5500" Y="24.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.7630" Y="0.3000" />
                <PreSize X="0.2600" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleY="0.5000" />
            <Position X="222.5920" Y="-171.1440" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1739" Y="-0.2377" />
            <PreSize X="0.6641" Y="0.1111" />
            <SingleColor A="255" R="227" G="217" B="198" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>