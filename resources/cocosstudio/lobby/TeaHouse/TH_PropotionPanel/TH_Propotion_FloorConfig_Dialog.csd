<GameFile>
  <PropertyGroup Name="TH_Propotion_FloorConfig_Dialog" Type="Layer" ID="842a157c-1d51-4f4d-94db-daaf5b23cbfb" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="1658" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-1099659854" Tag="1669" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="-262420147" Tag="1659" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="106.0000" RightMargin="106.0000" TopMargin="22.2640" BottomMargin="9.7360" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="760" Scale9Height="406" ctype="PanelObjectData">
            <Size X="1068.0000" Y="688.0000" />
            <Children>
              <AbstractNodeData Name="Close" ActionTag="260726193" Tag="1660" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="1022.5000" RightMargin="-10.5000" TopMargin="-22.0000" BottomMargin="652.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1050.5000" Y="681.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9836" Y="0.9898" />
                <PreSize X="0.0524" Y="0.0843" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Title" ActionTag="24452374" Tag="1661" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="410.0000" RightMargin="410.0000" TopMargin="-6.5050" BottomMargin="621.5050" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="-1541571379" Tag="1662" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="37.5000" RightMargin="37.5000" TopMargin="14.8500" BottomMargin="22.1500" LabelText="低分局设置" ctype="TextBMFontObjectData">
                    <Size X="173.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="124.0000" Y="40.1500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.6976" Y="0.4932" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.dialog_title.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="534.0000" Y="658.0050" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9564" />
                <PreSize X="0.2322" Y="0.1061" />
                <FileData Type="Normal" Path="common/bgs/dialogTitleBg.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_1" ActionTag="1059636330" Tag="1083" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="215.0000" RightMargin="215.0000" TopMargin="74.9886" BottomMargin="591.0114" FontSize="22" LabelText="低分局不包含在大赢家统计内，但总战绩和总人次仍然统计在内。" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="638.0000" Y="22.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="534.0000" Y="602.0114" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="185" G="125" B="85" />
                <PrePosition X="0.5000" Y="0.8750" />
                <PreSize X="0.5974" Y="0.0320" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="container" ActionTag="-1033405704" Tag="1664" IconVisible="False" PositionPercentXEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="16.4472" RightMargin="16.4473" TopMargin="111.8400" BottomMargin="32.0000" LeftEage="373" RightEage="373" TopEage="165" BottomEage="165" Scale9OriginX="373" Scale9OriginY="165" Scale9Width="386" Scale9Height="172" ctype="ImageViewObjectData">
                <Size X="1035.1056" Y="544.1600" />
                <Children>
                  <AbstractNodeData Name="PartnerMemberScrollView" ActionTag="-963196588" Tag="1665" IconVisible="False" PositionPercentXEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" TopMargin="1.1600" BottomMargin="83.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                    <Size X="1035.1056" Y="460.0000" />
                    <AnchorPoint />
                    <Position Y="83.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.1525" />
                    <PreSize X="1.0000" Y="0.8453" />
                    <SingleColor A="255" R="255" G="150" B="100" />
                    <FirstColor A="255" R="255" G="150" B="100" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                    <InnerNodeSize Width="1035" Height="460" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="noPartner_text" ActionTag="-360022937" Tag="1939" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="10.9228" RightMargin="10.9227" TopMargin="259.5800" BottomMargin="259.5800" IsCustomSize="True" FontSize="22" LabelText="您还未配置楼层规则，请在配置规则之后之后再设置" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="1013.2600" Y="25.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="517.5528" Y="272.0800" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="185" G="125" B="85" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.9789" Y="0.0459" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="534.0000" Y="32.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.0465" />
                <PreSize X="0.9692" Y="0.7909" />
                <FileData Type="PlistSubImage" Path="TH_anti_dialog_bg_inner.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_dialog.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_invalid_round" ActionTag="1889271295" Tag="1011" IconVisible="False" LeftMargin="767.0000" RightMargin="145.0000" TopMargin="626.0000" BottomMargin="38.0000" FontSize="24" LabelText="昨日低分局数:" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="156.0000" Y="24.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="845.0000" Y="50.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="181" G="155" B="102" />
                <PrePosition X="0.7912" Y="0.0727" />
                <PreSize X="0.1461" Y="0.0349" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="txt_invalid_round" ActionTag="1847107024" Tag="1012" IconVisible="False" LeftMargin="925.0000" RightMargin="35.0000" TopMargin="626.0000" BottomMargin="38.0000" FontSize="24" LabelText="222222222" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="108.0000" Y="24.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="925.0000" Y="50.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="190" G="83" B="36" />
                <PrePosition X="0.8661" Y="0.0727" />
                <PreSize X="0.1011" Y="0.0349" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="submit" ActionTag="-788530828" Tag="1667" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="420.0000" RightMargin="420.0000" TopMargin="583.4993" BottomMargin="23.5007" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="text" ActionTag="1615653048" Tag="1668" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="78.5000" RightMargin="78.5000" TopMargin="18.5000" BottomMargin="27.5000" LabelText="确   定" ctype="TextBMFontObjectData">
                    <Size X="71.0000" Y="35.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5556" />
                    <PreSize X="0.3114" Y="0.4321" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="534.0000" Y="64.0007" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.0930" />
                <PreSize X="0.2135" Y="0.1177" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_green.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="353.7360" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4913" />
            <PreSize X="0.8344" Y="0.9556" />
            <FileData Type="PlistSubImage" Path="TH_anti_dialog_bg.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_dialog.plist" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="tea_call_partner_config" ActionTag="-794987257" Tag="1952" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="126.9800" RightMargin="118.0200" TopMargin="844.6800" BottomMargin="-244.6800" TouchEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Enable="True" LeftEage="94" RightEage="94" TopEage="30" BottomEage="30" Scale9OriginX="-94" Scale9OriginY="-30" Scale9Width="188" Scale9Height="60" ctype="PanelObjectData">
            <Size X="1035.0000" Y="120.0000" />
            <Children>
              <AbstractNodeData Name="Panel_5" ActionTag="-1478537467" Tag="1953" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftMargin="-0.8350" RightMargin="0.8350" TopMargin="0.8350" BottomMargin="-0.8350" TouchEnable="True" ClipAble="False" ColorAngle="90.0000" Scale9Enable="True" LeftEage="353" RightEage="353" TopEage="26" BottomEage="26" Scale9OriginX="353" Scale9OriginY="26" Scale9Width="294" Scale9Height="68" ctype="PanelObjectData">
                <Size X="1035.0000" Y="120.0000" />
                <Children>
                  <AbstractNodeData Name="img_floor" ActionTag="-349814978" Tag="1954" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="32.0000" RightMargin="931.0000" TopMargin="45.0000" BottomMargin="45.0000" LeftEage="23" RightEage="23" TopEage="9" BottomEage="9" Scale9OriginX="23" Scale9OriginY="9" Scale9Width="26" Scale9Height="12" ctype="ImageViewObjectData">
                    <Size X="72.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="68.0000" Y="60.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0657" Y="0.5000" />
                    <PreSize X="0.0696" Y="0.2500" />
                    <FileData Type="PlistSubImage" Path="TH_Dela_Floor_font1.png" Plist="lobby/TeaHouse/TH_PropotionPanel/THS_dela_panel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_225" ActionTag="-1824483524" Tag="1956" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="165.0000" RightMargin="814.0000" TopMargin="46.5000" BottomMargin="46.5000" LeftEage="18" RightEage="18" TopEage="9" BottomEage="9" Scale9OriginX="18" Scale9OriginY="9" Scale9Width="20" Scale9Height="9" ctype="ImageViewObjectData">
                    <Size X="56.0000" Y="27.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="165.0000" Y="60.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1594" Y="0.5000" />
                    <PreSize X="0.0541" Y="0.2250" />
                    <FileData Type="PlistSubImage" Path="aisLabel3.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_Setting.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="input_lower" ActionTag="676980357" Tag="1957" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="242.0000" RightMargin="675.0000" TopMargin="42.6896" BottomMargin="42.6896" FontSize="26" IsCustomSize="True" LabelText="" PlaceHolderText="点击输入" MaxLengthText="10" ctype="TextFieldObjectData">
                    <Size X="118.0000" Y="34.6209" />
                    <Children>
                      <AbstractNodeData Name="Image_6" ActionTag="-1761595176" Tag="1958" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="-8.5000" RightMargin="-8.5000" TopMargin="-6.4206" BottomMargin="-2.9585" LeftEage="61" RightEage="61" TopEage="14" BottomEage="14" Scale9OriginX="61" Scale9OriginY="14" Scale9Width="63" Scale9Height="16" ctype="ImageViewObjectData">
                        <Size X="135.0000" Y="44.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="59.0000" Y="19.0415" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5500" />
                        <PreSize X="1.1441" Y="1.2709" />
                        <FileData Type="PlistSubImage" Path="TH_anti_dialog_input_small.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_dialog.plist" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="242.0000" Y="60.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="185" G="125" B="85" />
                    <PrePosition X="0.2338" Y="0.5000" />
                    <PreSize X="0.1140" Y="0.2885" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_225_0" ActionTag="669161512" Tag="928" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="377.0015" RightMargin="514.9985" TopMargin="46.0000" BottomMargin="46.0000" LeftEage="18" RightEage="18" TopEage="9" BottomEage="9" Scale9OriginX="18" Scale9OriginY="9" Scale9Width="107" Scale9Height="10" ctype="ImageViewObjectData">
                    <Size X="143.0000" Y="28.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="377.0015" Y="60.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3643" Y="0.5000" />
                    <PreSize X="0.1382" Y="0.2333" />
                    <FileData Type="PlistSubImage" Path="aisLabel4.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_Setting.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="-0.8350" Y="-0.8350" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.0008" Y="-0.0070" />
                <PreSize X="1.0000" Y="1.0000" />
                <FileData Type="PlistSubImage" Path="th_propotion_item_bg.png" Plist="lobby/TeaHouse/TH_PropotionPanel/TH_ProportionPanel.plist" />
                <SingleColor A="255" R="227" G="217" B="198" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="644.4800" Y="-184.6800" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5035" Y="-0.2565" />
            <PreSize X="0.8086" Y="0.1667" />
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