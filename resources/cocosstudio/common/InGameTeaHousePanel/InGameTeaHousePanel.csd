<GameFile>
  <PropertyGroup Name="InGameTeaHousePanel" Type="Layer" ID="9b18b304-fb09-4fde-9206-8fe48ef90365" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="135" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-1732286805" Tag="146" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="1298486982" Tag="136" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="166.0000" RightMargin="166.0000" TopMargin="61.0000" BottomMargin="61.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="300" Scale9Height="186" ctype="PanelObjectData">
            <Size X="948.0000" Y="598.0000" />
            <Children>
              <AbstractNodeData Name="tea_apply_cell" ActionTag="-328509925" Tag="266" IconVisible="False" LeftMargin="-1345.7449" RightMargin="1423.7449" TopMargin="8.0000" BottomMargin="500.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="129" RightEage="129" TopEage="29" BottomEage="29" Scale9OriginX="129" Scale9OriginY="29" Scale9Width="134" Scale9Height="32" ctype="PanelObjectData">
                <Size X="870.0000" Y="90.0000" />
                <Children>
                  <AbstractNodeData Name="img_head" ActionTag="2026790802" Tag="521" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="15.0000" RightMargin="795.0000" TopMargin="15.0000" BottomMargin="15.0000" LeftEage="19" RightEage="19" TopEage="19" BottomEage="19" Scale9OriginX="19" Scale9OriginY="19" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                    <Size X="60.0000" Y="60.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="45.0000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0517" Y="0.5000" />
                    <PreSize X="0.0690" Y="0.6667" />
                    <FileData Type="PlistSubImage" Path="ctpBigHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="checkbox_online" ActionTag="1037006594" Tag="524" IconVisible="False" LeftMargin="64.8809" RightMargin="789.1191" TopMargin="64.0764" BottomMargin="9.9236" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="16.0000" Y="16.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="72.8809" Y="17.9236" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0838" Y="0.1992" />
                    <PreSize X="0.0184" Y="0.1778" />
                    <NormalBackFileData Type="PlistSubImage" Path="ctpOffline.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <PressedBackFileData Type="PlistSubImage" Path="ctpOffline.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <DisableBackFileData Type="PlistSubImage" Path="ctpOffline.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NodeNormalFileData Type="PlistSubImage" Path="ctpOnline.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NodeDisableFileData Type="PlistSubImage" Path="ctpOnline.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_uid" ActionTag="-1273525731" Tag="518" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="234.9000" RightMargin="485.1000" TopMargin="16.0000" BottomMargin="44.0000" IsCustomSize="True" FontSize="24" LabelText="ID:00000000" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="30.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="234.9000" Y="59.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="186" G="119" B="74" />
                    <PrePosition X="0.2700" Y="0.6556" />
                    <PreSize X="0.1724" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_typeout" ActionTag="1119850528" Tag="61" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="365.0000" RightMargin="365.0000" TopMargin="16.0000" BottomMargin="44.0000" IsCustomSize="True" FontSize="24" LabelText="退出申请" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="140.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="435.0000" Y="59.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="217" G="69" B="39" />
                    <PrePosition X="0.5000" Y="0.6556" />
                    <PreSize X="0.1609" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_typejoin" ActionTag="1024090688" Tag="62" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="365.0000" RightMargin="365.0000" TopMargin="16.0000" BottomMargin="44.0000" IsCustomSize="True" FontSize="24" LabelText="加入申请" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="140.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="435.0000" Y="59.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="40" G="135" B="40" />
                    <PrePosition X="0.5000" Y="0.6556" />
                    <PreSize X="0.1609" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_time" ActionTag="-33985894" Tag="519" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="234.9000" RightMargin="335.1000" TopMargin="44.0000" BottomMargin="16.0000" IsCustomSize="True" FontSize="24" LabelText="申请:2012-00-00 99:99" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="300.0000" Y="30.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="234.9000" Y="31.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="186" G="119" B="74" />
                    <PrePosition X="0.2700" Y="0.3444" />
                    <PreSize X="0.3448" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_uname" ActionTag="-2140018418" Tag="520" IconVisible="False" HorizontalEdge="LeftEdge" LeftMargin="86.0000" RightMargin="652.0000" TopMargin="31.8203" BottomMargin="34.1797" FontSize="24" LabelText="这里能写五 " ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="132.0000" Y="24.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="86.0000" Y="46.1797" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="186" G="119" B="74" />
                    <PrePosition X="0.0989" Y="0.5131" />
                    <PreSize X="0.1517" Y="0.2667" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_agree" ActionTag="-752498829" Tag="522" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="RightEdge" LeftMargin="576.0000" RightMargin="172.0000" TopMargin="20.5000" BottomMargin="20.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="122.0000" Y="49.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="637.0000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7322" Y="0.5000" />
                    <PreSize X="0.1402" Y="0.5444" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <PressedFileData Type="PlistSubImage" Path="ctpAgreeDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NormalFileData Type="PlistSubImage" Path="ctpAgree.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_reject" ActionTag="63662475" Tag="523" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="RightEdge" LeftMargin="726.0000" RightMargin="22.0000" TopMargin="20.5000" BottomMargin="20.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="122.0000" Y="49.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="787.0000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9046" Y="0.5000" />
                    <PreSize X="0.1402" Y="0.5444" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <PressedFileData Type="PlistSubImage" Path="ctpRefuseDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NormalFileData Type="PlistSubImage" Path="ctpRefuse.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="-1345.7449" Y="500.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-1.4196" Y="0.8361" />
                <PreSize X="0.9177" Y="0.1505" />
                <FileData Type="PlistSubImage" Path="ctpRowBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="tea_table_cell" ActionTag="-78244275" Tag="19" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="-998.7880" RightMargin="1524.7880" TopMargin="208.0000" BottomMargin="300.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="129" RightEage="129" TopEage="29" BottomEage="29" Scale9OriginX="129" Scale9OriginY="29" Scale9Width="134" Scale9Height="32" ctype="PanelObjectData">
                <Size X="422.0000" Y="90.0000" />
                <Children>
                  <AbstractNodeData Name="NumberBg" ActionTag="-419951477" Tag="22" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="384.0000" LeftEage="12" RightEage="12" TopEage="29" BottomEage="29" Scale9OriginX="12" Scale9OriginY="29" Scale9Width="14" Scale9Height="32" ctype="ImageViewObjectData">
                    <Size X="38.0000" Y="90.0000" />
                    <Children>
                      <AbstractNodeData Name="label_seq" ActionTag="194058481" Tag="23" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-6.0000" RightMargin="-6.0000" TopMargin="30.0000" BottomMargin="30.0000" IsCustomSize="True" FontSize="22" LabelText="99" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="50.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="19.0000" Y="45.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.3158" Y="0.3333" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.5000" />
                    <PreSize X="0.0900" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="ctpRowNumberBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_gameing" ActionTag="-1636022568" VisibleForFrame="False" Tag="24" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="287.6000" RightMargin="34.4000" TopMargin="-1.5000" BottomMargin="61.5000" IsCustomSize="True" FontSize="20" LabelText="游戏中" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="337.6000" Y="76.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="218" G="76" B="40" />
                    <PrePosition X="0.8000" Y="0.8500" />
                    <PreSize X="0.2370" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="NotStart" ActionTag="-153535090" Tag="25" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="287.6000" RightMargin="34.4000" TopMargin="-1.5000" BottomMargin="61.5000" IsCustomSize="True" FontSize="20" LabelText="未开始" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="337.6000" Y="76.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="102" G="102" B="102" />
                    <PrePosition X="0.8000" Y="0.8500" />
                    <PreSize X="0.2370" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_rule" ActionTag="1453297641" Tag="115" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="50.0000" RightMargin="222.0000" TopMargin="-1.5000" BottomMargin="61.5000" IsCustomSize="True" FontSize="20" LabelText="游戏名称" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="125.0000" Y="76.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="0" B="0" />
                    <PrePosition X="0.2962" Y="0.8500" />
                    <PreSize X="0.3555" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_num" ActionTag="1840440571" Tag="116" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="152.8800" RightMargin="119.1200" TopMargin="-1.5000" BottomMargin="61.5000" IsCustomSize="True" FontSize="20" LabelText="房号:123456" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="227.8800" Y="76.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="0" B="0" />
                    <PrePosition X="0.5400" Y="0.8500" />
                    <PreSize X="0.3555" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="layout_player_group" ActionTag="-1197976953" Tag="38" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="52.0224" RightMargin="52.0224" TopMargin="25.0000" BottomMargin="19.0533" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="317.9552" Y="45.9467" />
                    <Children>
                      <AbstractNodeData Name="layout_player0" ActionTag="-306475049" Tag="583" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" RightMargin="273.9552" BottomMargin="1.9467" ClipAble="False" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="44.0000" Y="44.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="1242848358" Tag="26" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="14" RightEage="14" TopEage="14" BottomEage="14" Scale9OriginX="14" Scale9OriginY="14" Scale9Width="16" Scale9Height="16" ctype="ImageViewObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="PlistSubImage" Path="ctpSmallHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="label_uname" ActionTag="154847723" Tag="27" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-28.0000" RightMargin="-28.0000" TopMargin="40.0000" BottomMargin="-26.0000" IsCustomSize="True" FontSize="18" LabelText="两字" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="100.0000" Y="30.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="-11.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="185" G="125" B="85" />
                            <PrePosition X="0.5000" Y="-0.2500" />
                            <PreSize X="2.2727" Y="0.6818" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="btn_sit" ActionTag="2027383498" Tag="28" IconVisible="False" PositionPercentYEnabled="True" FontSize="20" ButtonText="坐下" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="14" Scale9Height="22" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <TextColor A="255" R="254" G="254" B="254" />
                            <PressedFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <NormalFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position Y="23.9467" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition Y="0.5212" />
                        <PreSize X="0.1384" Y="0.9576" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="layout_player1" ActionTag="-1427607665" Tag="593" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="70.0000" RightMargin="203.9552" BottomMargin="1.9467" ClipAble="False" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="44.0000" Y="44.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" ActionTag="1392474418" Tag="594" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="14" RightEage="14" TopEage="14" BottomEage="14" Scale9OriginX="14" Scale9OriginY="14" Scale9Width="16" Scale9Height="16" ctype="ImageViewObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="PlistSubImage" Path="ctpSmallHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="label_uname" ActionTag="-457664058" Tag="595" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-28.0000" RightMargin="-28.0000" TopMargin="40.0000" BottomMargin="-26.0000" IsCustomSize="True" FontSize="18" LabelText="两字" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="100.0000" Y="30.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="-11.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="185" G="125" B="85" />
                            <PrePosition X="0.5000" Y="-0.2500" />
                            <PreSize X="2.2727" Y="0.6818" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="btn_sit" ActionTag="942836526" Tag="596" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" FontSize="20" ButtonText="坐下" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="14" Scale9Height="22" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <TextColor A="255" R="254" G="254" B="254" />
                            <PressedFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <NormalFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="70.0000" Y="23.9467" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.2202" Y="0.5212" />
                        <PreSize X="0.1384" Y="0.9576" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="layout_player2" ActionTag="-1213736483" Tag="597" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="140.0000" RightMargin="133.9552" BottomMargin="1.9467" ClipAble="False" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="44.0000" Y="44.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" CanEdit="False" ActionTag="866014303" Tag="598" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="14" RightEage="14" TopEage="14" BottomEage="14" Scale9OriginX="14" Scale9OriginY="14" Scale9Width="16" Scale9Height="16" ctype="ImageViewObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="PlistSubImage" Path="ctpSmallHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="label_uname" CanEdit="False" ActionTag="2062093632" Tag="599" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-28.0000" RightMargin="-28.0000" TopMargin="40.0000" BottomMargin="-26.0000" IsCustomSize="True" FontSize="18" LabelText="两字" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="100.0000" Y="30.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="-11.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="185" G="125" B="85" />
                            <PrePosition X="0.5000" Y="-0.2500" />
                            <PreSize X="2.2727" Y="0.6818" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="btn_sit" ActionTag="1644381105" Tag="600" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" FontSize="20" ButtonText="坐下" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="14" Scale9Height="22" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <TextColor A="255" R="254" G="254" B="254" />
                            <PressedFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <NormalFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="140.0000" Y="23.9467" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.4403" Y="0.5212" />
                        <PreSize X="0.1384" Y="0.9576" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="layout_player3" ActionTag="1476342589" Tag="589" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="210.0000" RightMargin="63.9552" TopMargin="-0.0007" BottomMargin="1.9474" ClipAble="False" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="44.0000" Y="44.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" CanEdit="False" ActionTag="10930809" Tag="590" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="14" RightEage="14" TopEage="14" BottomEage="14" Scale9OriginX="14" Scale9OriginY="14" Scale9Width="16" Scale9Height="16" ctype="ImageViewObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="PlistSubImage" Path="ctpSmallHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="label_uname" CanEdit="False" ActionTag="284510024" Tag="591" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-28.0000" RightMargin="-28.0000" TopMargin="40.0000" BottomMargin="-26.0000" IsCustomSize="True" FontSize="18" LabelText="两字" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="100.0000" Y="30.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="-11.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="185" G="125" B="85" />
                            <PrePosition X="0.5000" Y="-0.2500" />
                            <PreSize X="2.2727" Y="0.6818" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="btn_sit" ActionTag="1340801380" Tag="592" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" FontSize="20" ButtonText="坐下" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="14" Scale9Height="22" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <TextColor A="255" R="254" G="254" B="254" />
                            <PressedFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <NormalFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="210.0000" Y="23.9474" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.6605" Y="0.5212" />
                        <PreSize X="0.1384" Y="0.9576" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="layout_player4" ActionTag="320606968" Tag="467" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="280.0000" RightMargin="-6.0448" TopMargin="-0.0007" BottomMargin="1.9474" ClipAble="False" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="44.0000" Y="44.0000" />
                        <Children>
                          <AbstractNodeData Name="img_head" CanEdit="False" ActionTag="733628410" Tag="468" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="14" RightEage="14" TopEage="14" BottomEage="14" Scale9OriginX="14" Scale9OriginY="14" Scale9Width="16" Scale9Height="16" ctype="ImageViewObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="PlistSubImage" Path="ctpSmallHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="label_uname" CanEdit="False" ActionTag="2065129853" Tag="469" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-28.0000" RightMargin="-28.0000" TopMargin="40.0000" BottomMargin="-26.0000" IsCustomSize="True" FontSize="18" LabelText="两字" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="100.0000" Y="30.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="-11.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="185" G="125" B="85" />
                            <PrePosition X="0.5000" Y="-0.2500" />
                            <PreSize X="2.2727" Y="0.6818" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="btn_sit" ActionTag="-1747558671" Tag="470" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" FontSize="20" ButtonText="坐下" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="14" Scale9Height="22" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="44.0000" Y="44.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="22.0000" Y="22.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <TextColor A="255" R="254" G="254" B="254" />
                            <PressedFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <NormalFileData Type="PlistSubImage" Path="ctpNoHead.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="280.0000" Y="23.9474" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.8806" Y="0.5212" />
                        <PreSize X="0.1384" Y="0.9576" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" />
                    <Position X="211.0000" Y="19.0533" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.2117" />
                    <PreSize X="0.7534" Y="0.5105" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_dis" ActionTag="1324063612" Tag="117" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="388.0000" BottomMargin="54.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="5" RightEage="5" TopEage="5" BottomEage="5" Scale9OriginX="5" Scale9OriginY="5" Scale9Width="24" Scale9Height="26" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="34.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="405.0000" Y="72.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9597" Y="0.8000" />
                    <PreSize X="0.0806" Y="0.4000" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="PlistSubImage" Path="ctpDisDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <PressedFileData Type="PlistSubImage" Path="ctpDisDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NormalFileData Type="PlistSubImage" Path="ctpDis.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="-787.7880" Y="300.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.8310" Y="0.5017" />
                <PreSize X="0.4451" Y="0.1505" />
                <FileData Type="PlistSubImage" Path="ctpRowBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="tea_invite_cell" ActionTag="694661399" Tag="983" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="-1002.2007" RightMargin="1528.2007" TopMargin="408.0000" BottomMargin="100.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="129" RightEage="129" TopEage="29" BottomEage="29" Scale9OriginX="129" Scale9OriginY="29" Scale9Width="134" Scale9Height="32" ctype="PanelObjectData">
                <Size X="422.0000" Y="90.0000" />
                <Children>
                  <AbstractNodeData Name="img_head" ActionTag="110404832" Tag="984" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="12.2000" RightMargin="349.8000" TopMargin="15.0000" BottomMargin="15.0000" LeftEage="19" RightEage="19" TopEage="19" BottomEage="19" Scale9OriginX="19" Scale9OriginY="19" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
                    <Size X="60.0000" Y="60.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="42.2000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1000" Y="0.5000" />
                    <PreSize X="0.1422" Y="0.6667" />
                    <FileData Type="PlistSubImage" Path="ctpBigHeadBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_uname" ActionTag="525895620" Tag="985" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="84.4000" RightMargin="137.6000" TopMargin="12.0000" BottomMargin="48.0000" IsCustomSize="True" FontSize="24" LabelText="玩家昵称六字" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="200.0000" Y="30.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="84.4000" Y="63.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="185" G="125" B="85" />
                    <PrePosition X="0.2000" Y="0.7000" />
                    <PreSize X="0.4739" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="label_online" ActionTag="-2012585995" Tag="986" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="84.4000" RightMargin="137.6000" TopMargin="48.0000" BottomMargin="12.0000" IsCustomSize="True" FontSize="24" LabelText="在线" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="200.0000" Y="30.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="84.4000" Y="27.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="40" G="135" B="40" />
                    <PrePosition X="0.2000" Y="0.3000" />
                    <PreSize X="0.4739" Y="0.3333" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_invite" ActionTag="2143290524" Tag="987" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="RightEdge" LeftMargin="280.0000" RightMargin="20.0000" TopMargin="20.5000" BottomMargin="20.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="122.0000" Y="49.0000" />
                    <Children>
                      <AbstractNodeData Name="label_invite_detail" ActionTag="-1290596129" Tag="53" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="80.0000" RightMargin="2.0000" TopMargin="14.5000" BottomMargin="14.5000" FontSize="20" LabelText=" 00 " HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="40.0000" Y="20.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="100.0000" Y="24.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.8197" Y="0.5000" />
                        <PreSize X="0.3279" Y="0.4082" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="341.0000" Y="45.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8081" Y="0.5000" />
                    <PreSize X="0.2891" Y="0.5444" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <PressedFileData Type="PlistSubImage" Path="ctpInviteDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NormalFileData Type="PlistSubImage" Path="ctpInvite.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="-791.2007" Y="100.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.8346" Y="0.1672" />
                <PreSize X="0.4451" Y="0.1505" />
                <FileData Type="PlistSubImage" Path="ctpRowBg.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="layout_title" ActionTag="591370833" Tag="990" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="250.0000" RightMargin="250.0000" TopMargin="-5.0000" BottomMargin="530.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="448.0000" Y="73.0000" />
                <Children>
                  <AbstractNodeData Name="check_apply" ActionTag="-377264616" Tag="993" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="224.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="224.0000" Y="73.0000" />
                    <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                    <Position X="224.0000" Y="36.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5000" Y="1.0000" />
                    <NormalBackFileData Type="PlistSubImage" Path="ctpTitleLeft.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <PressedBackFileData Type="PlistSubImage" Path="ctpTitleLeftDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NodeNormalFileData Type="PlistSubImage" Path="ctpTitleLeftDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="check_table" ActionTag="-173540810" Tag="994" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="224.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="224.0000" Y="73.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="224.0000" Y="36.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5000" Y="1.0000" />
                    <NormalBackFileData Type="PlistSubImage" Path="ctpTitleRight.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <PressedBackFileData Type="PlistSubImage" Path="ctpTitleRightDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <NodeNormalFileData Type="PlistSubImage" Path="ctpTitleRightDeep.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="img_table" ActionTag="-1448848485" Tag="200" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="100.0000" RightMargin="100.0000" LeftEage="81" RightEage="81" TopEage="24" BottomEage="24" Scale9OriginX="81" Scale9OriginY="24" Scale9Width="86" Scale9Height="25" ctype="ImageViewObjectData">
                    <Size X="248.0000" Y="73.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="224.0000" Y="36.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5536" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="ctpTitle.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="474.0000" Y="530.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.8863" />
                <PreSize X="0.4726" Y="0.1221" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_close" ActionTag="1092439972" Tag="139" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="912.0000" RightMargin="-20.0000" TopMargin="-20.0000" BottomMargin="560.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="940.0000" Y="589.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9916" Y="0.9849" />
                <PreSize X="0.0591" Y="0.0970" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="HouseID" ActionTag="1934386499" Tag="979" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="30.0000" RightMargin="718.0000" TopMargin="50.0000" BottomMargin="518.0000" IsCustomSize="True" FontSize="22" LabelText="亲友圈：666666" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="200.0000" Y="30.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="130.0000" Y="533.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="206" G="163" B="108" />
                <PrePosition X="0.1371" Y="0.8913" />
                <PreSize X="0.2110" Y="0.0502" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="layout_pageGroup" ActionTag="1108217761" Tag="525" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="18.0000" RightMargin="18.0000" TopMargin="85.0000" BottomMargin="15.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="135" RightEage="135" TopEage="132" BottomEage="132" Scale9OriginX="135" Scale9OriginY="132" Scale9Width="394" Scale9Height="184" ctype="PanelObjectData">
                <Size X="912.0000" Y="498.0000" />
                <Children>
                  <AbstractNodeData Name="page_apl" ActionTag="-477079165" Tag="526" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="10.0000" RightMargin="10.0000" TopMargin="10.0000" BottomMargin="33.0000" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="PanelObjectData">
                    <Size X="892.0000" Y="455.0000" />
                    <Children>
                      <AbstractNodeData Name="scr_apply" ActionTag="1415339894" Tag="527" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="10.0000" RightMargin="10.0000" TopMargin="10.0000" BottomMargin="10.0000" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                        <Size X="872.0000" Y="435.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="446.0000" Y="227.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="0.9776" Y="0.9560" />
                        <SingleColor A="255" R="245" G="232" B="208" />
                        <FirstColor A="255" R="255" G="150" B="100" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                        <InnerNodeSize Width="6739" Height="490" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="10.0000" Y="33.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0110" Y="0.0663" />
                    <PreSize X="0.9781" Y="0.9137" />
                    <FileData Type="PlistSubImage" Path="ctpBg2.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="page_mem_table" ActionTag="-2132618580" Tag="528" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="135" RightEage="135" TopEage="132" BottomEage="132" Scale9OriginX="-135" Scale9OriginY="-132" Scale9Width="270" Scale9Height="264" ctype="PanelObjectData">
                    <Size X="912.0000" Y="498.0000" />
                    <Children>
                      <AbstractNodeData Name="LeftPanel" ActionTag="1410453069" Tag="980" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="10.0000" RightMargin="462.0000" TopMargin="10.0000" BottomMargin="33.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="10" Scale9Height="10" ctype="PanelObjectData">
                        <Size X="440.0000" Y="455.0000" />
                        <Children>
                          <AbstractNodeData Name="scr_member" ActionTag="-872295563" Tag="531" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="9.0000" RightMargin="9.0000" TopMargin="7.5000" BottomMargin="7.5000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                            <Size X="422.0000" Y="440.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="220.0000" Y="227.5000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9591" Y="0.9670" />
                            <SingleColor A="255" R="245" G="232" B="208" />
                            <FirstColor A="255" R="255" G="150" B="100" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                            <InnerNodeSize Width="440" Height="450" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="10.0000" Y="260.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0110" Y="0.5231" />
                        <PreSize X="0.4825" Y="0.9137" />
                        <FileData Type="PlistSubImage" Path="ctpBg2.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="RightPanel" ActionTag="-2027276932" Tag="982" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="462.0000" RightMargin="10.0000" TopMargin="10.0000" BottomMargin="33.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="10" Scale9Height="10" ctype="PanelObjectData">
                        <Size X="440.0000" Y="455.0000" />
                        <Children>
                          <AbstractNodeData Name="scr_tables" ActionTag="-1773517174" Tag="532" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="9.0000" RightMargin="9.0000" TopMargin="7.5000" BottomMargin="7.5000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                            <Size X="422.0000" Y="440.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="220.0000" Y="227.5000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9591" Y="0.9670" />
                            <SingleColor A="255" R="245" G="232" B="208" />
                            <FirstColor A="255" R="255" G="150" B="100" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                            <InnerNodeSize Width="430" Height="440" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="462.0000" Y="260.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5066" Y="0.5231" />
                        <PreSize X="0.4825" Y="0.9137" />
                        <FileData Type="PlistSubImage" Path="ctpBg2.png" Plist="common/InGameTeaHousePanel/ChangeTablePanel.plist" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="1.0000" Y="1.0000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="474.0000" Y="15.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.0251" />
                <PreSize X="0.9620" Y="0.8328" />
                <FileData Type="Normal" Path="common/bgs/alert_bg_big_neidi.png" Plist="" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.7406" Y="0.8306" />
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