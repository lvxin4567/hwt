<GameFile>
  <PropertyGroup Name="Battery" Type="Layer" ID="06dc797d-d018-4417-a4a1-07b531cb1828" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="1698" ctype="GameLayerObjectData">
        <Size X="29.0000" Y="16.0000" />
        <Children>
          <AbstractNodeData Name="battery_bg" ActionTag="-220435072" Tag="1699" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" ctype="SpriteObjectData">
            <Size X="29.0000" Y="16.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="14.5000" Y="8.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="PlistSubImage" Path="battery_normal_bg.png" Plist="common/Battery/Battery.plist" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="battery_bar" ActionTag="-1184482837" Tag="1700" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="3.5000" RightMargin="5.5000" TopMargin="4.0000" BottomMargin="4.0000" ProgressInfo="100" ctype="LoadingBarObjectData">
            <Size X="20.0000" Y="8.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="13.5000" Y="8.0000" />
            <Scale ScaleX="1.1500" ScaleY="1.5000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4655" Y="0.5000" />
            <PreSize X="0.6897" Y="0.5000" />
            <ImageFileData Type="PlistSubImage" Path="battery_normal.png" Plist="common/Battery/Battery.plist" />
          </AbstractNodeData>
          <AbstractNodeData Name="battery_charge" ActionTag="751685928" Tag="1701" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="11.0000" RightMargin="11.0000" TopMargin="4.0000" BottomMargin="4.0000" ctype="SpriteObjectData">
            <Size X="7.0000" Y="8.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="14.5000" Y="8.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.2414" Y="0.5000" />
            <FileData Type="PlistSubImage" Path="battery_charge.png" Plist="common/Battery/Battery.plist" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>