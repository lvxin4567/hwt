<GameFile>
  <PropertyGroup Name="TH_MessageBox" Type="Layer" ID="1fbe2135-1be8-48cd-8d3a-ae4d8404943b" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="108" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-1217493343" Tag="117" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="1664355676" Tag="109" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="196.0000" RightMargin="196.0000" TopMargin="99.5000" BottomMargin="72.5000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="480" Scale9Height="266" ctype="PanelObjectData">
            <Size X="888.0000" Y="548.0000" />
            <Children>
              <AbstractNodeData Name="CloseButton" ActionTag="-2084451372" Tag="141" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="842.5000" RightMargin="-10.5000" TopMargin="-22.0000" BottomMargin="512.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="870.5000" Y="541.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9803" Y="0.9872" />
                <PreSize X="0.0631" Y="0.1058" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Title" ActionTag="612474145" Tag="110" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="320.0000" RightMargin="320.0000" TopMargin="-6.5050" BottomMargin="481.5050" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="518.0050" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9453" />
                <PreSize X="0.2793" Y="0.1332" />
                <FileData Type="PlistSubImage" Path="tmbTitle.png" Plist="lobby/TeaHouse/TH_MessageBox/MessageBox.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="ScrollView" ActionTag="411136637" Tag="34" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="25.0000" RightMargin="25.0000" TopMargin="81.3660" BottomMargin="21.6340" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="838.0000" Y="445.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="244.1340" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.4455" />
                <PreSize X="0.9437" Y="0.8120" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="850" Height="445" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="346.5000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4812" />
            <PreSize X="0.6938" Y="0.7611" />
            <FileData Type="PlistSubImage" Path="Bg888548.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="MessageBoxRow" ActionTag="1925737222" Tag="88" IconVisible="False" LeftMargin="51.0400" RightMargin="409.9600" TopMargin="839.4415" BottomMargin="-199.4415" TouchEnable="True" ClipAble="False" BackColorAlpha="66" ColorAngle="90.0000" Scale9Enable="True" LeftEage="30" RightEage="30" TopEage="30" BottomEage="30" Scale9OriginX="30" Scale9OriginY="30" Scale9Width="776" Scale9Height="1" ctype="PanelObjectData">
            <Size X="819.0000" Y="80.0000" />
            <Children>
              <AbstractNodeData Name="Message" ActionTag="-1785856069" Tag="89" IconVisible="False" PositionPercentYEnabled="True" PercentHeightEnable="True" PercentHeightEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="10.0000" RightMargin="209.0000" IsCustomSize="True" FontSize="22" LabelText="Text LabelText LabelText LabelText LabelText LabelText LabelText LabelText Label" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="600.0000" Y="80.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="10.0000" Y="40.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="0" G="167" B="12" />
                <PrePosition X="0.0122" Y="0.5000" />
                <PreSize X="0.7326" Y="1.0000" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Time" ActionTag="1546790005" Tag="90" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="RightEdge" LeftMargin="659.0000" RightMargin="10.0000" TopMargin="10.0000" BottomMargin="10.0000" IsCustomSize="True" FontSize="22" LabelText="2019-10-16&#xA;11:34:00" HorizontalAlignmentType="HT_Right" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="150.0000" Y="60.0000" />
                <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                <Position X="809.0000" Y="40.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="0" G="167" B="12" />
                <PrePosition X="0.9878" Y="0.5000" />
                <PreSize X="0.1832" Y="0.7500" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleY="0.5000" />
            <Position X="51.0400" Y="-159.4415" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0399" Y="-0.2214" />
            <PreSize X="0.6398" Y="0.1111" />
            <FileData Type="PlistSubImage" Path="tmbBg.png" Plist="lobby/TeaHouse/TH_MessageBox/MessageBox.plist" />
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