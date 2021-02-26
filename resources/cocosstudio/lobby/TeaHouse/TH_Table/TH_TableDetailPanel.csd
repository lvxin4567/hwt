<GameFile>
  <PropertyGroup Name="TH_TableDetailPanel" Type="Layer" ID="7dcaf2d8-e2fa-4940-bc17-816cd14dbd8c" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="80" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-1251491074" Tag="106" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="-64176238" Tag="102" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="196.0000" RightMargin="196.0000" TopMargin="86.0000" BottomMargin="86.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="300" Scale9Height="186" ctype="PanelObjectData">
            <Size X="888.0000" Y="548.0000" />
            <Children>
              <AbstractNodeData Name="tableTile" ActionTag="-208618964" Tag="107" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="320.0000" RightMargin="320.0000" TopMargin="-8.0939" BottomMargin="483.0939" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="519.5939" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9482" />
                <PreSize X="0.2793" Y="0.1332" />
                <FileData Type="PlistSubImage" Path="detailbg.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_close" ActionTag="-1246134318" Tag="105" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="852.0000" RightMargin="-20.0000" TopMargin="-20.0000" BottomMargin="510.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="880.0000" Y="539.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9910" Y="0.9836" />
                <PreSize X="0.0631" Y="0.1058" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="pro" ActionTag="-745970402" Tag="104" IconVisible="False" LeftMargin="25.8314" RightMargin="563.1686" TopMargin="464.1302" BottomMargin="51.8698" IsCustomSize="True" FontSize="26" LabelText="当前进度" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="299.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="175.3314" Y="67.8698" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="203" G="165" B="111" />
                <PrePosition X="0.1974" Y="0.1238" />
                <PreSize X="0.3367" Y="0.0584" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_join" ActionTag="697461813" Tag="131" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="330.0000" RightMargin="330.0000" TopMargin="435.5302" BottomMargin="31.4698" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="325997760" Tag="1509" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="42.0000" RightMargin="42.0000" TopMargin="18.9500" BottomMargin="27.0500" LabelText="加入游戏" ctype="TextBMFontObjectData">
                    <Size X="144.0000" Y="35.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.6316" Y="0.4321" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="71.9698" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.1313" />
                <PreSize X="0.2568" Y="0.1478" />
                <FontResource Type="Default" Path="" Plist="" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_green.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_dissmiss" ActionTag="1004837989" Tag="129" IconVisible="False" LeftMargin="634.0764" RightMargin="25.9236" TopMargin="435.5300" BottomMargin="31.4700" TouchEnable="True" FontSize="37" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="1921490680" Tag="1510" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="41.5000" RightMargin="41.5000" TopMargin="17.4500" BottomMargin="25.5500" LabelText="解散牌局" ctype="TextBMFontObjectData">
                    <Size X="145.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.6360" Y="0.4691" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.red_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="748.0764" Y="71.9700" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8424" Y="0.1313" />
                <PreSize X="0.2568" Y="0.1478" />
                <FontResource Type="Default" Path="" Plist="" />
                <TextColor A="255" R="255" G="255" B="255" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_red_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_red_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_red.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="layout_players" ActionTag="-1951454589" Tag="107" IconVisible="False" LeftMargin="9.9801" RightMargin="15.0199" TopMargin="84.5349" BottomMargin="132.4651" TouchEnable="True" ClipAble="True" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="863.0000" Y="331.0000" />
                <Children>
                  <AbstractNodeData Name="tea_cell_detail_mode" ActionTag="-810259339" Tag="108" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.5000" RightMargin="10.5000" TopMargin="12.2786" BottomMargin="238.7214" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="275" RightEage="275" TopEage="26" BottomEage="26" Scale9OriginX="275" Scale9OriginY="26" Scale9Width="286" Scale9Height="28" ctype="PanelObjectData">
                    <Size X="842.0000" Y="80.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="-811345049" Tag="106" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0903" RightMargin="760.9097" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                        <Size X="68.0000" Y="68.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="310519160" Tag="107" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0285" BottomMargin="1.9715" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                            <Size X="64.0000" Y="64.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="34.0000" Y="33.9715" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.4996" />
                            <PreSize X="0.9412" Y="0.9412" />
                            <FileData Type="PlistSubImage" Path="thb_head.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="47.0903" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0559" Y="0.5000" />
                        <PreSize X="0.0808" Y="0.8500" />
                        <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_name" ActionTag="-754202425" Tag="109" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="83.4911" RightMargin="601.9321" TopMargin="25.0000" BottomMargin="25.0000" IsCustomSize="True" FontSize="26" LabelText="玩家名字六字" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="156.5768" Y="30.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="83.4911" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.0992" Y="0.5000" />
                        <PreSize X="0.1860" Y="0.3750" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Online" ActionTag="2019546333" Tag="459" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1790" RightMargin="531.8257" TopMargin="27.0000" BottomMargin="27.0000" IsCustomSize="True" FontSize="26" LabelText="在线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="57.9953" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1790" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="35" G="152" B="20" />
                        <PrePosition X="0.2995" Y="0.5000" />
                        <PreSize X="0.0689" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Offline" ActionTag="-902837109" Tag="460" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1454" RightMargin="489.8546" TopMargin="27.5681" BottomMargin="26.4319" IsCustomSize="True" FontSize="26" LabelText="离线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1454" Y="39.4319" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="136" G="136" B="136" />
                        <PrePosition X="0.2995" Y="0.4929" />
                        <PreSize X="0.1188" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_id" ActionTag="955492693" Tag="110" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="295.4018" TopMargin="12.1600" BottomMargin="41.8400" IsCustomSize="True" FontSize="26" LabelText="Text Label" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="227.0816" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="54.8400" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.6855" />
                        <PreSize X="0.2697" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_ip" ActionTag="-2065844705" Tag="111" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="272.4834" TopMargin="43.9040" BottomMargin="10.0960" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="250.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="23.0960" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.2887" />
                        <PreSize X="0.2969" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_partnerId" ActionTag="-176438834" Tag="179" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="579.8210" RightMargin="115.8351" TopMargin="10.0001" BottomMargin="9.9999" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="146.3439" Y="60.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="579.8210" Y="39.9999" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.6886" Y="0.5000" />
                        <PreSize X="0.1738" Y="0.7500" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="btn_kick" ActionTag="-1083802858" Tag="213" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="711.9999" RightMargin="8.0001" TopMargin="15.7473" BottomMargin="15.2527" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="122.0000" Y="49.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="772.9999" Y="39.7527" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.9181" Y="0.4969" />
                        <PreSize X="0.1449" Y="0.6125" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                        <PressedFileData Type="PlistSubImage" Path="TH_tableDetail_btn2.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <NormalFileData Type="PlistSubImage" Path="TH_tableDetail_btn1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="431.5000" Y="278.7214" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.8421" />
                    <PreSize X="0.9757" Y="0.2417" />
                    <FileData Type="PlistSubImage" Path="cellBg1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="tea_cell_detail_mode_0" ActionTag="1686697089" Tag="214" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.5000" RightMargin="10.5000" TopMargin="101.8445" BottomMargin="149.1555" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="275" RightEage="275" TopEage="26" BottomEage="26" Scale9OriginX="275" Scale9OriginY="26" Scale9Width="286" Scale9Height="28" ctype="PanelObjectData">
                    <Size X="842.0000" Y="80.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="-1298318115" Tag="215" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0903" RightMargin="760.9097" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                        <Size X="68.0000" Y="68.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="195839397" Tag="216" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0285" BottomMargin="1.9715" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                            <Size X="64.0000" Y="64.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="34.0000" Y="33.9715" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.4996" />
                            <PreSize X="0.9412" Y="0.9412" />
                            <FileData Type="PlistSubImage" Path="thb_head.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="47.0903" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0559" Y="0.5000" />
                        <PreSize X="0.0808" Y="0.8500" />
                        <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_name" ActionTag="-1932664569" Tag="217" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="83.4911" RightMargin="601.9321" TopMargin="25.0000" BottomMargin="25.0000" IsCustomSize="True" FontSize="26" LabelText="玩家名字六字" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="156.5768" Y="30.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="83.4911" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.0992" Y="0.5000" />
                        <PreSize X="0.1860" Y="0.3750" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Online" ActionTag="-1315519738" Tag="218" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1790" RightMargin="531.8257" TopMargin="27.0000" BottomMargin="27.0000" IsCustomSize="True" FontSize="26" LabelText="在线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="57.9953" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1790" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="35" G="152" B="20" />
                        <PrePosition X="0.2995" Y="0.5000" />
                        <PreSize X="0.0689" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Offline" ActionTag="549287509" Tag="219" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1454" RightMargin="489.8546" TopMargin="27.5681" BottomMargin="26.4319" IsCustomSize="True" FontSize="26" LabelText="离线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1454" Y="39.4319" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="136" G="136" B="136" />
                        <PrePosition X="0.2995" Y="0.4929" />
                        <PreSize X="0.1188" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_id" ActionTag="1708187788" Tag="220" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="295.4018" TopMargin="12.1600" BottomMargin="41.8400" IsCustomSize="True" FontSize="26" LabelText="Text Label" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="227.0816" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="54.8400" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.6855" />
                        <PreSize X="0.2697" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_ip" ActionTag="1134008969" Tag="221" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="272.4834" TopMargin="43.9040" BottomMargin="10.0960" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="250.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="23.0960" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.2887" />
                        <PreSize X="0.2969" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_partnerId" ActionTag="-1508976620" Tag="222" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="579.8210" RightMargin="115.8351" TopMargin="10.0001" BottomMargin="9.9999" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="146.3439" Y="60.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="579.8210" Y="39.9999" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.6886" Y="0.5000" />
                        <PreSize X="0.1738" Y="0.7500" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="btn_kick" ActionTag="-1260153800" Tag="223" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="711.9999" RightMargin="8.0001" TopMargin="15.7473" BottomMargin="15.2527" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="122.0000" Y="49.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="772.9999" Y="39.7527" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.9181" Y="0.4969" />
                        <PreSize X="0.1449" Y="0.6125" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                        <PressedFileData Type="PlistSubImage" Path="TH_tableDetail_btn2.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <NormalFileData Type="PlistSubImage" Path="TH_tableDetail_btn1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="431.5000" Y="189.1555" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5715" />
                    <PreSize X="0.9757" Y="0.2417" />
                    <FileData Type="PlistSubImage" Path="cellBg1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="tea_cell_detail_mode_1" ActionTag="173350907" Tag="224" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.5000" RightMargin="10.5000" TopMargin="191.4095" BottomMargin="59.5905" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="275" RightEage="275" TopEage="26" BottomEage="26" Scale9OriginX="275" Scale9OriginY="26" Scale9Width="286" Scale9Height="28" ctype="PanelObjectData">
                    <Size X="842.0000" Y="80.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="1111339119" Tag="225" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0903" RightMargin="760.9097" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                        <Size X="68.0000" Y="68.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="-1704893867" Tag="226" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0285" BottomMargin="1.9715" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                            <Size X="64.0000" Y="64.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="34.0000" Y="33.9715" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.4996" />
                            <PreSize X="0.9412" Y="0.9412" />
                            <FileData Type="PlistSubImage" Path="thb_head.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="47.0903" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0559" Y="0.5000" />
                        <PreSize X="0.0808" Y="0.8500" />
                        <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_name" ActionTag="881494353" Tag="227" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="83.4911" RightMargin="601.9321" TopMargin="25.0000" BottomMargin="25.0000" IsCustomSize="True" FontSize="26" LabelText="玩家名字六字" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="156.5768" Y="30.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="83.4911" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.0992" Y="0.5000" />
                        <PreSize X="0.1860" Y="0.3750" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Online" ActionTag="2079715315" Tag="228" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1790" RightMargin="531.8257" TopMargin="27.0000" BottomMargin="27.0000" IsCustomSize="True" FontSize="26" LabelText="在线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="57.9953" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1790" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="35" G="152" B="20" />
                        <PrePosition X="0.2995" Y="0.5000" />
                        <PreSize X="0.0689" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Offline" ActionTag="122847117" Tag="229" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1454" RightMargin="489.8546" TopMargin="27.5681" BottomMargin="26.4319" IsCustomSize="True" FontSize="26" LabelText="离线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1454" Y="39.4319" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="136" G="136" B="136" />
                        <PrePosition X="0.2995" Y="0.4929" />
                        <PreSize X="0.1188" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_id" ActionTag="-1329921007" Tag="230" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="295.4018" TopMargin="12.1600" BottomMargin="41.8400" IsCustomSize="True" FontSize="26" LabelText="Text Label" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="227.0816" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="54.8400" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.6855" />
                        <PreSize X="0.2697" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_ip" ActionTag="1787179040" Tag="231" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="272.4834" TopMargin="43.9040" BottomMargin="10.0960" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="250.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="23.0960" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.2887" />
                        <PreSize X="0.2969" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_partnerId" ActionTag="-269497648" Tag="232" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="579.8210" RightMargin="115.8351" TopMargin="10.0001" BottomMargin="9.9999" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="146.3439" Y="60.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="579.8210" Y="39.9999" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.6886" Y="0.5000" />
                        <PreSize X="0.1738" Y="0.7500" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="btn_kick" ActionTag="-1271424154" Tag="233" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="711.9999" RightMargin="8.0001" TopMargin="15.7473" BottomMargin="15.2527" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="122.0000" Y="49.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="772.9999" Y="39.7527" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.9181" Y="0.4969" />
                        <PreSize X="0.1449" Y="0.6125" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                        <PressedFileData Type="PlistSubImage" Path="TH_tableDetail_btn2.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <NormalFileData Type="PlistSubImage" Path="TH_tableDetail_btn1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="431.5000" Y="99.5905" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.3009" />
                    <PreSize X="0.9757" Y="0.2417" />
                    <FileData Type="PlistSubImage" Path="cellBg1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="tea_cell_detail_mode_2" ActionTag="866047980" Tag="234" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.5000" RightMargin="10.5000" TopMargin="280.9752" BottomMargin="-29.9752" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="275" RightEage="275" TopEage="26" BottomEage="26" Scale9OriginX="275" Scale9OriginY="26" Scale9Width="286" Scale9Height="28" ctype="PanelObjectData">
                    <Size X="842.0000" Y="80.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="1450546974" Tag="235" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0903" RightMargin="760.9097" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                        <Size X="68.0000" Y="68.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="-601069661" Tag="236" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0285" BottomMargin="1.9715" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                            <Size X="64.0000" Y="64.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="34.0000" Y="33.9715" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.4996" />
                            <PreSize X="0.9412" Y="0.9412" />
                            <FileData Type="PlistSubImage" Path="thb_head.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="47.0903" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0559" Y="0.5000" />
                        <PreSize X="0.0808" Y="0.8500" />
                        <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_name" ActionTag="263642379" Tag="237" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="83.4911" RightMargin="601.9321" TopMargin="25.0000" BottomMargin="25.0000" IsCustomSize="True" FontSize="26" LabelText="玩家名字六字" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="156.5768" Y="30.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="83.4911" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.0992" Y="0.5000" />
                        <PreSize X="0.1860" Y="0.3750" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Online" ActionTag="-731461470" Tag="238" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1790" RightMargin="531.8257" TopMargin="27.0000" BottomMargin="27.0000" IsCustomSize="True" FontSize="26" LabelText="在线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="57.9953" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1790" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="35" G="152" B="20" />
                        <PrePosition X="0.2995" Y="0.5000" />
                        <PreSize X="0.0689" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Offline" ActionTag="-1869791487" Tag="239" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1454" RightMargin="489.8546" TopMargin="27.5681" BottomMargin="26.4319" IsCustomSize="True" FontSize="26" LabelText="离线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1454" Y="39.4319" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="136" G="136" B="136" />
                        <PrePosition X="0.2995" Y="0.4929" />
                        <PreSize X="0.1188" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_id" ActionTag="1873263603" Tag="240" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="295.4018" TopMargin="12.1600" BottomMargin="41.8400" IsCustomSize="True" FontSize="26" LabelText="Text Label" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="227.0816" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="54.8400" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.6855" />
                        <PreSize X="0.2697" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_ip" ActionTag="-210248507" Tag="241" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="272.4834" TopMargin="43.9040" BottomMargin="10.0960" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="250.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="23.0960" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.2887" />
                        <PreSize X="0.2969" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_partnerId" ActionTag="1850133273" Tag="242" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="579.8210" RightMargin="115.8351" TopMargin="10.0001" BottomMargin="9.9999" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="146.3439" Y="60.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="579.8210" Y="39.9999" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.6886" Y="0.5000" />
                        <PreSize X="0.1738" Y="0.7500" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="btn_kick" ActionTag="-1088997694" Tag="243" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="711.9999" RightMargin="8.0001" TopMargin="15.7473" BottomMargin="15.2527" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="122.0000" Y="49.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="772.9999" Y="39.7527" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.9181" Y="0.4969" />
                        <PreSize X="0.1449" Y="0.6125" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                        <PressedFileData Type="PlistSubImage" Path="TH_tableDetail_btn2.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <NormalFileData Type="PlistSubImage" Path="TH_tableDetail_btn1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="431.5000" Y="10.0248" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.0303" />
                    <PreSize X="0.9757" Y="0.2417" />
                    <FileData Type="PlistSubImage" Path="cellBg1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="tea_cell_detail_mode_3" ActionTag="958517541" Tag="244" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.5000" RightMargin="10.5000" TopMargin="370.5410" BottomMargin="-119.5410" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="275" RightEage="275" TopEage="26" BottomEage="26" Scale9OriginX="275" Scale9OriginY="26" Scale9Width="286" Scale9Height="28" ctype="PanelObjectData">
                    <Size X="842.0000" Y="80.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="-2025113590" Tag="245" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.0903" RightMargin="760.9097" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                        <Size X="68.0000" Y="68.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="-1609614851" Tag="246" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0285" BottomMargin="1.9715" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                            <Size X="64.0000" Y="64.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="34.0000" Y="33.9715" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.4996" />
                            <PreSize X="0.9412" Y="0.9412" />
                            <FileData Type="PlistSubImage" Path="thb_head.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="47.0903" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0559" Y="0.5000" />
                        <PreSize X="0.0808" Y="0.8500" />
                        <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_name" ActionTag="-1277373888" Tag="247" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="83.4911" RightMargin="601.9321" TopMargin="25.0000" BottomMargin="25.0000" IsCustomSize="True" FontSize="26" LabelText="玩家名字六字" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="156.5768" Y="30.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="83.4911" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.0992" Y="0.5000" />
                        <PreSize X="0.1860" Y="0.3750" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Online" ActionTag="1083268710" Tag="248" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1790" RightMargin="531.8257" TopMargin="27.0000" BottomMargin="27.0000" IsCustomSize="True" FontSize="26" LabelText="在线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="57.9953" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1790" Y="40.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="35" G="152" B="20" />
                        <PrePosition X="0.2995" Y="0.5000" />
                        <PreSize X="0.0689" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Offline" ActionTag="1945132871" Tag="249" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="252.1454" RightMargin="489.8546" TopMargin="27.5681" BottomMargin="26.4319" IsCustomSize="True" FontSize="26" LabelText="离线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="252.1454" Y="39.4319" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="136" G="136" B="136" />
                        <PrePosition X="0.2995" Y="0.4929" />
                        <PreSize X="0.1188" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_id" ActionTag="2033932831" Tag="250" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="295.4018" TopMargin="12.1600" BottomMargin="41.8400" IsCustomSize="True" FontSize="26" LabelText="Text Label" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="227.0816" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="54.8400" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.6855" />
                        <PreSize X="0.2697" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_ip" ActionTag="-621481454" Tag="251" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="319.5166" RightMargin="272.4834" TopMargin="43.9040" BottomMargin="10.0960" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="250.0000" Y="26.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="319.5166" Y="23.0960" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.3795" Y="0.2887" />
                        <PreSize X="0.2969" Y="0.3250" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_partnerId" ActionTag="844633047" Tag="252" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="579.8210" RightMargin="115.8351" TopMargin="10.0001" BottomMargin="9.9999" IsCustomSize="True" FontSize="26" LabelText="IP" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="146.3439" Y="60.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="579.8210" Y="39.9999" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.6886" Y="0.5000" />
                        <PreSize X="0.1738" Y="0.7500" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="btn_kick" ActionTag="1704358910" Tag="253" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="711.9999" RightMargin="8.0001" TopMargin="15.7473" BottomMargin="15.2527" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="122.0000" Y="49.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="772.9999" Y="39.7527" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.9181" Y="0.4969" />
                        <PreSize X="0.1449" Y="0.6125" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                        <PressedFileData Type="PlistSubImage" Path="TH_tableDetail_btn2.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <NormalFileData Type="PlistSubImage" Path="TH_tableDetail_btn1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="431.5000" Y="-79.5410" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="-0.2403" />
                    <PreSize X="0.9757" Y="0.2417" />
                    <FileData Type="PlistSubImage" Path="cellBg1.png" Plist="lobby/TeaHouse/TH_Table/tableDetail.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="441.4801" Y="297.9651" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4972" Y="0.5437" />
                <PreSize X="0.9718" Y="0.6040" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="863" Height="331" />
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
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>