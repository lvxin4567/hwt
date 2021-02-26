<GameFile>
  <PropertyGroup Name="TH_ProportionInfoDialog" Type="Layer" ID="f4cb999b-8703-4479-b103-ef37c759bd19" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="1976" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="947111086" Tag="1994" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="219415591" Tag="1977" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="200.0000" RightMargin="200.0000" TopMargin="91.0000" BottomMargin="64.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="480" Scale9Height="266" ctype="PanelObjectData">
            <Size X="880.0000" Y="565.0000" />
            <Children>
              <AbstractNodeData Name="Title" ActionTag="557729818" Tag="715" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="316.0000" RightMargin="316.0000" TopMargin="-6.5050" BottomMargin="498.5050" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="1709068890" Tag="716" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="124.0000" RightMargin="124.0000" TopMargin="14.8500" BottomMargin="22.1500" LabelText="成员经验" ctype="TextBMFontObjectData">
                    <Size X="0.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="124.0000" Y="40.1500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.0000" Y="0.4932" />
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
              <AbstractNodeData Name="btn_close" ActionTag="1965218235" Tag="1978" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="834.5000" RightMargin="-10.5000" TopMargin="-22.0000" BottomMargin="529.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
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
              <AbstractNodeData Name="memberlist" ActionTag="650454778" Tag="1980" IconVisible="False" LeftMargin="15.0000" RightMargin="15.0000" TopMargin="80.0000" BottomMargin="35.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="850.0000" Y="450.0000" />
                <Children>
                  <AbstractNodeData Name="content" ActionTag="-1075399280" Tag="1981" IconVisible="False" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
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
          <AbstractNodeData Name="tea_call_info_item" ActionTag="-911809902" Tag="2003" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="219.3521" RightMargin="210.6479" TopMargin="761.9360" BottomMargin="-121.9360" TouchEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Enable="True" LeftEage="94" RightEage="94" TopEage="30" BottomEage="30" Scale9OriginX="-94" Scale9OriginY="-30" Scale9Width="188" Scale9Height="60" ctype="PanelObjectData">
            <Size X="850.0000" Y="80.0000" />
            <Children>
              <AbstractNodeData Name="Panel_5" ActionTag="644369806" Tag="2004" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftMargin="-0.8350" RightMargin="0.8350" TopMargin="0.8350" BottomMargin="-0.8350" TouchEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Enable="True" LeftEage="353" RightEage="353" TopEage="26" BottomEage="26" Scale9OriginX="353" Scale9OriginY="26" Scale9Width="113" Scale9Height="26" ctype="PanelObjectData">
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
              <AbstractNodeData Name="HeadBg" ActionTag="-551872127" Tag="2005" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0000" RightMargin="769.0000" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                <Size X="68.0000" Y="68.0000" />
                <Children>
                  <AbstractNodeData Name="img_head" ActionTag="1201572780" Tag="2006" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
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
              <AbstractNodeData Name="label_name" ActionTag="-1754958617" Tag="2007" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="90.0000" RightMargin="580.0000" TopMargin="7.0000" BottomMargin="43.0000" IsCustomSize="True" FontSize="24" LabelText="玩家名称六字   " VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
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
              <AbstractNodeData Name="label_id" ActionTag="131054215" Tag="2008" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="90.0000" RightMargin="580.0000" TopMargin="42.0000" BottomMargin="8.0000" IsCustomSize="True" FontSize="24" LabelText="ID:1234567" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
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
              <AbstractNodeData Name="label_youxiao" ActionTag="1353244999" Tag="2010" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="261.0550" RightMargin="484.9450" TopMargin="11.0000" BottomMargin="43.0000" FontSize="26" LabelText="经验总额" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="104.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="313.0550" Y="56.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.3683" Y="0.7000" />
                <PreSize X="0.1224" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="lbSuper" ActionTag="-1300014181" Tag="2012" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="261.0550" RightMargin="484.9450" TopMargin="43.0000" BottomMargin="11.0000" FontSize="26" LabelText="00000000" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="104.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="313.0550" Y="24.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.3683" Y="0.3000" />
                <PreSize X="0.1224" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_youxiao_0" ActionTag="-873159048" Tag="2020" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="425.3500" RightMargin="372.6500" TopMargin="11.0000" BottomMargin="43.0000" FontSize="26" LabelText="局数" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="52.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="451.3500" Y="56.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.5310" Y="0.7000" />
                <PreSize X="0.0612" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="lbSuper_0" ActionTag="-1603098277" Tag="2021" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="399.0100" RightMargin="346.9900" TopMargin="43.0000" BottomMargin="11.0000" FontSize="26" LabelText="00000000" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="104.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="451.0100" Y="24.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.5306" Y="0.3000" />
                <PreSize X="0.1224" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_youxiao_0_0" ActionTag="-16036929" Tag="716" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="524.7250" RightMargin="221.2750" TopMargin="11.0000" BottomMargin="43.0000" FontSize="26" LabelText="队长等级" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="104.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="576.7250" Y="56.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.6785" Y="0.7000" />
                <PreSize X="0.1224" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="lab_plevel" ActionTag="855175373" Tag="717" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="530.1200" RightMargin="228.8800" TopMargin="43.0000" BottomMargin="11.0000" FontSize="26" LabelText="1111111" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="91.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="575.6200" Y="24.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.6772" Y="0.3000" />
                <PreSize X="0.1071" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_youxiao_0_0_0" ActionTag="2053441008" Tag="718" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="655.8050" RightMargin="38.1950" TopMargin="11.0000" BottomMargin="43.0000" FontSize="26" LabelText="上级队长信息" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="156.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="733.8050" Y="56.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.8633" Y="0.7000" />
                <PreSize X="0.1835" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="lab_uplevel" ActionTag="634031339" Tag="719" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="648.8800" RightMargin="32.1200" TopMargin="43.0000" BottomMargin="11.0000" FontSize="26" LabelText="id:1234567890" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="169.0000" Y="26.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="733.3800" Y="24.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.8628" Y="0.3000" />
                <PreSize X="0.1988" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="644.3521" Y="-81.9360" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5034" Y="-0.1138" />
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