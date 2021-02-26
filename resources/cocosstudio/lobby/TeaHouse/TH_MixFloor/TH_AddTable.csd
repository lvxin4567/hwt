<GameFile>
  <PropertyGroup Name="TH_AddTable" Type="Layer" ID="8323527e-9e0d-4fd8-94a7-338278c127c6" Version="3.10.0.0" />
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
          <AbstractNodeData Name="contentPanel" ActionTag="483275956" Tag="239" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="196.0000" RightMargin="196.0000" TopMargin="86.0000" BottomMargin="86.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="233" RightEage="233" TopEage="96" BottomEage="96" Scale9OriginX="233" Scale9OriginY="96" Scale9Width="242" Scale9Height="276" ctype="PanelObjectData">
            <Size X="888.0000" Y="548.0000" />
            <Children>
              <AbstractNodeData Name="Title" ActionTag="727389226" Tag="240" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="421.0000" RightMargin="421.0000" TopMargin="9.8800" BottomMargin="492.1200" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="515.1200" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9400" />
                <PreSize X="0.0518" Y="0.0839" />
                <FileData Type="PlistSubImage" Path="thmTitleAdd.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="CloseButton" ActionTag="1388488860" Tag="241" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="852.0000" RightMargin="-20.0000" TopMargin="-20.0000" BottomMargin="510.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="880.0000" Y="539.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9910" Y="0.9836" />
                <PreSize X="0.0631" Y="0.1058" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_4" ActionTag="-1967007582" Tag="243" IconVisible="False" LeftMargin="107.3831" RightMargin="76.6169" TopMargin="79.7899" BottomMargin="446.2101" FontSize="22" LabelText="提示：选择楼层游戏点击加桌/减桌，即可在大厅增加/减少一个可用桌。" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="704.0000" Y="22.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="459.3831" Y="457.2101" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="211" G="182" B="159" />
                <PrePosition X="0.5173" Y="0.8343" />
                <PreSize X="0.7928" Y="0.0401" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="ScrollView" ActionTag="-1670404594" Tag="242" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentHeightEnable="True" PercentHeightEnabled="True" LeftMargin="26.6400" RightMargin="18.3600" TopMargin="137.0000" BottomMargin="109.6000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="843.0000" Y="301.4000" />
                <AnchorPoint ScaleY="1.0000" />
                <Position X="26.6400" Y="411.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0300" Y="0.7500" />
                <PreSize X="0.9493" Y="0.5500" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="843" Height="520" />
              </AbstractNodeData>
              <AbstractNodeData Name="SaveButton" ActionTag="-353217410" Tag="240" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="330.0000" RightMargin="330.0000" TopMargin="452.7000" BottomMargin="14.3000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="BitmapFontLabel_2" ActionTag="-347330565" Tag="241" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="78.5000" RightMargin="78.5000" TopMargin="17.4500" BottomMargin="25.5500" LabelText="确定" ctype="TextBMFontObjectData">
                    <Size X="71.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.3114" Y="0.4691" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="54.8000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.1000" />
                <PreSize X="0.2568" Y="0.1478" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_green.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.6938" Y="0.7611" />
            <FileData Type="Normal" Path="common/bgs/alert_bg.png" Plist="" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="AddTableRow" ActionTag="1437304952" Tag="244" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="1770.7903" RightMargin="-1330.7903" TopMargin="222.1280" BottomMargin="397.8720" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="270" RightEage="270" TopEage="25" BottomEage="25" Scale9OriginX="-270" Scale9OriginY="-25" Scale9Width="540" Scale9Height="50" ctype="PanelObjectData">
            <Size X="840.0000" Y="100.0000" />
            <Children>
              <AbstractNodeData Name="Floor" ActionTag="-1521206547" Tag="245" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="50.0000" RightMargin="720.0000" TopMargin="31.0700" BottomMargin="33.9300" IsCustomSize="True" FontSize="28" LabelText="1楼" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="70.0000" Y="35.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="50.0000" Y="51.4300" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="147" G="105" B="45" />
                <PrePosition X="0.0595" Y="0.5143" />
                <PreSize X="0.0833" Y="0.3500" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="GameImageBg" ActionTag="-8217785" Tag="246" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="116.0000" RightMargin="656.0000" TopMargin="13.7900" BottomMargin="18.2100" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                <Size X="68.0000" Y="68.0000" />
                <Children>
                  <AbstractNodeData Name="GameImage" ActionTag="400624176" Tag="247" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" TouchEnable="True" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
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
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="150.0000" Y="52.2100" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1786" Y="0.5221" />
                <PreSize X="0.0810" Y="0.6800" />
                <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="GameName" ActionTag="1823334105" Tag="248" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="218.4840" RightMargin="453.5160" TopMargin="8.1600" BottomMargin="56.8400" IsCustomSize="True" FontSize="26" LabelText="仙桃晃晃" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="168.0000" Y="35.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="218.4840" Y="74.3400" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.2601" Y="0.7434" />
                <PreSize X="0.2000" Y="0.3500" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="CustomizeName" ActionTag="295266355" Tag="249" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="218.4840" RightMargin="453.5160" TopMargin="51.7500" BottomMargin="13.2500" IsCustomSize="True" FontSize="22" LabelText="自定义的名称" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="168.0000" Y="35.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="218.4840" Y="30.7500" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="215" G="163" B="128" />
                <PrePosition X="0.2601" Y="0.3075" />
                <PreSize X="0.2000" Y="0.3500" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="AddButton" ActionTag="657195069" Tag="250" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="523.0000" RightMargin="187.0000" TopMargin="22.5000" BottomMargin="22.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="100" Scale9Height="33" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="130.0000" Y="55.0000" />
                <Children>
                  <AbstractNodeData Name="AddCircle" ActionTag="-1677395397" VisibleForFrame="False" Tag="251" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="117.0000" RightMargin="-13.0000" TopMargin="-13.0000" BottomMargin="42.0000" LeftEage="8" RightEage="8" TopEage="8" BottomEage="8" Scale9OriginX="8" Scale9OriginY="8" Scale9Width="10" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="26.0000" Y="26.0000" />
                    <Children>
                      <AbstractNodeData Name="AddNumber" ActionTag="-1104734802" Tag="252" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-12.0000" RightMargin="-12.0000" TopMargin="3.0000" BottomMargin="3.0000" IsCustomSize="True" FontSize="14" LabelText="+10" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="50.0000" Y="20.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="13.0000" Y="13.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="66" B="1" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.9231" Y="0.7692" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="130.0000" Y="55.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="1.0000" Y="1.0000" />
                    <PreSize X="0.2000" Y="0.4727" />
                    <FileData Type="PlistSubImage" Path="thmCircle.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="588.0000" Y="50.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7000" Y="0.5000" />
                <PreSize X="0.1548" Y="0.5500" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="thmAddDeep.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                <NormalFileData Type="PlistSubImage" Path="thmAdd.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="RemoveButton" ActionTag="-1155964698" Tag="253" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="691.0000" RightMargin="19.0000" TopMargin="22.5000" BottomMargin="22.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="100" Scale9Height="33" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="130.0000" Y="55.0000" />
                <Children>
                  <AbstractNodeData Name="RemoveCircle" ActionTag="1204096114" VisibleForFrame="False" Tag="254" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="117.0000" RightMargin="-13.0000" TopMargin="-13.0000" BottomMargin="42.0000" LeftEage="8" RightEage="8" TopEage="8" BottomEage="8" Scale9OriginX="8" Scale9OriginY="8" Scale9Width="10" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="26.0000" Y="26.0000" />
                    <Children>
                      <AbstractNodeData Name="RemoveNumber" ActionTag="695942280" Tag="255" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-12.0000" RightMargin="-12.0000" TopMargin="3.0000" BottomMargin="3.0000" IsCustomSize="True" FontSize="14" LabelText="-10" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="50.0000" Y="20.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="13.0000" Y="13.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="66" B="1" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.9231" Y="0.7692" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="130.0000" Y="55.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="1.0000" Y="1.0000" />
                    <PreSize X="0.2000" Y="0.4727" />
                    <FileData Type="PlistSubImage" Path="thmCircle.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="756.0000" Y="50.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9000" Y="0.5000" />
                <PreSize X="0.1548" Y="0.5500" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="thmDeleteDeep.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                <NormalFileData Type="PlistSubImage" Path="thmDelete.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position X="1770.7903" Y="397.8720" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="1.3834" Y="0.5526" />
            <PreSize X="0.6563" Y="0.1389" />
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