<GameFile>
  <PropertyGroup Name="TH_ChangeFloorBlock" Type="Layer" ID="39eab845-79ea-4a81-83bc-674f9f59bb0e" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="347" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="AddButton" ActionTag="-1731149350" VisibleForFrame="False" Tag="344" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="RightEdge" LeftMargin="1208.0000" RightMargin="10.0000" TopMargin="298.0000" BottomMargin="298.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="32" Scale9Height="102" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="62.0000" Y="124.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1239.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.9680" Y="0.5000" />
            <PreSize X="0.0484" Y="0.1722" />
            <TextColor A="255" R="65" G="65" B="70" />
            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
            <PressedFileData Type="PlistSubImage" Path="thmMenuAddDeep.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
            <NormalFileData Type="PlistSubImage" Path="thmMenuAdd.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="floor_group" ActionTag="-1414873376" Tag="55" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="25.6000" RightMargin="1206.2120" TopMargin="260.0000" BottomMargin="260.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="0" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="48.1880" Y="200.0000" />
            <Children>
              <AbstractNodeData Name="floor_group1" ActionTag="-1499041255" Tag="134" IconVisible="False" PositionPercentYEnabled="True" RightMargin="0.1880" TopMargin="24.0000" BottomMargin="24.0000" ctype="SpriteObjectData">
                <Size X="48.0000" Y="152.0000" />
                <Children>
                  <AbstractNodeData Name="btn_down" ActionTag="-1854671906" Tag="349" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="-5.0000" RightMargin="-5.0000" TopMargin="122.5000" BottomMargin="-29.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="28" Scale9Height="37" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="58.0000" Y="59.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="24.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" />
                    <PreSize X="1.2083" Y="0.3882" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="PlistSubImage" Path="down_gray.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                    <PressedFileData Type="PlistSubImage" Path="down_deep.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                    <NormalFileData Type="PlistSubImage" Path="down.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_up" ActionTag="74243356" Tag="350" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="-5.0000" RightMargin="-5.0000" TopMargin="-29.5000" BottomMargin="122.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="28" Scale9Height="37" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="58.0000" Y="59.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="24.0000" Y="152.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="1.0000" />
                    <PreSize X="1.2083" Y="0.3882" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="PlistSubImage" Path="up_gray.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                    <PressedFileData Type="PlistSubImage" Path="up_deep.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                    <NormalFileData Type="PlistSubImage" Path="up.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="floornum" ActionTag="-1537779119" Tag="66" IconVisible="False" LeftMargin="4.6339" RightMargin="2.5171" TopMargin="23.7224" BottomMargin="35.5879" IsCustomSize="True" FontSize="28" LabelText="" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="40.8491" Y="92.6897" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="25.0584" Y="81.9327" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="239" G="238" B="222" />
                    <PrePosition X="0.5220" Y="0.5390" />
                    <PreSize X="0.8510" Y="0.6098" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="24.0000" Y="100.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4980" Y="0.5000" />
                <PreSize X="0.9961" Y="0.7600" />
                <FileData Type="PlistSubImage" Path="bg.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/upDownFloor.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleY="0.5000" />
            <Position X="25.6000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0200" Y="0.5000" />
            <PreSize X="0.0376" Y="0.2778" />
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