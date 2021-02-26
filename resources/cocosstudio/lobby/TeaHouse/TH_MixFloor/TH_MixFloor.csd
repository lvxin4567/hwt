<GameFile>
  <PropertyGroup Name="TH_MixFloor" Type="Layer" ID="7fa5f81f-549b-4fe3-b2b2-c3c32a79c0f3" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="108" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-1217493343" Tag="117" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TopMargin="1.0000" BottomMargin="-1.0000" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="359.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4986" />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="contentPanel" ActionTag="483275956" Tag="239" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="196.0000" RightMargin="196.0000" TopMargin="86.0000" BottomMargin="86.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="233" RightEage="233" TopEage="96" BottomEage="96" Scale9OriginX="233" Scale9OriginY="96" Scale9Width="242" Scale9Height="276" ctype="PanelObjectData">
            <Size X="888.0000" Y="548.0000" />
            <Children>
              <AbstractNodeData Name="Title" ActionTag="727389226" Tag="240" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="320.0000" RightMargin="320.0000" TopMargin="-3.6200" BottomMargin="478.6200" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="515.1200" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9400" />
                <PreSize X="0.2793" Y="0.1332" />
                <FileData Type="PlistSubImage" Path="thmTitle.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="Panel_1" ActionTag="-832904774" Tag="60" IconVisible="False" LeftMargin="64.7036" RightMargin="393.8276" TopMargin="64.2000" BottomMargin="422.0892" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="429.4688" Y="61.7108" />
                <Children>
                  <AbstractNodeData Name="Sprite_6" ActionTag="-1263809006" Tag="242" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="13.3285" RightMargin="306.1403" TopMargin="17.3554" BottomMargin="17.3554" ctype="SpriteObjectData">
                    <Size X="110.0000" Y="27.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="68.3285" Y="30.8554" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1591" Y="0.5000" />
                    <PreSize X="0.2561" Y="0.4375" />
                    <FileData Type="PlistSubImage" Path="thmSwitch.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="mixFloor_switch" ActionTag="-1181231775" Tag="59" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="157.8163" RightMargin="156.6525" TopMargin="8.3554" BottomMargin="8.3554" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="115.0000" Y="45.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="215.3163" Y="30.8554" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5014" Y="0.5000" />
                    <PreSize X="0.2678" Y="0.7292" />
                    <NormalBackFileData Type="PlistSubImage" Path="TH_OFF.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                    <PressedBackFileData Type="PlistSubImage" Path="TH_OFF.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                    <DisableBackFileData Type="PlistSubImage" Path="TH_OFF.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                    <NodeNormalFileData Type="PlistSubImage" Path="TH_on.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                    <NodeDisableFileData Type="PlistSubImage" Path="TH_on.png" Plist="lobby/TeaHouse/TH_MemberPanel/TH_TeaHouseMemberPlane.plist" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="64.7036" Y="422.0892" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0729" Y="0.7702" />
                <PreSize X="0.4836" Y="0.1126" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="Panel_2" ActionTag="-1557537022" Tag="61" IconVisible="False" LeftMargin="65.7010" RightMargin="23.4828" TopMargin="121.5233" BottomMargin="357.2525" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="798.8162" Y="69.2241" />
                <Children>
                  <AbstractNodeData Name="Image_1" ActionTag="1683768473" Tag="62" IconVisible="False" LeftMargin="9.9756" RightMargin="676.8406" TopMargin="19.1541" BottomMargin="22.0700" LeftEage="36" RightEage="36" TopEage="8" BottomEage="8" Scale9OriginX="36" Scale9OriginY="8" Scale9Width="40" Scale9Height="12" ctype="ImageViewObjectData">
                    <Size X="112.0000" Y="28.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="65.9756" Y="36.0700" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0826" Y="0.5211" />
                    <PreSize X="0.1402" Y="0.4045" />
                    <FileData Type="PlistSubImage" Path="Th_mixFloorType.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="mixTypeBlock" ActionTag="1735905070" Tag="63" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="157.0035" RightMargin="91.8127" TopMargin="9.6120" BottomMargin="9.6120" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="550.0000" Y="50.0000" />
                    <Children>
                      <AbstractNodeData Name="DefaultTable1" ActionTag="999642362" Tag="64" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="-3.9999" RightMargin="515.9999" TopMargin="6.0000" BottomMargin="6.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                        <Size X="38.0000" Y="38.0000" />
                        <Children>
                          <AbstractNodeData Name="Text" ActionTag="-312026309" Tag="65" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="44.9996" RightMargin="-181.3439" TopMargin="5.0000" BottomMargin="5.0000" IsCustomSize="True" FontSize="28" LabelText="手动加桌模式" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="174.3443" Y="28.0000" />
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="44.9996" Y="19.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="147" G="105" B="45" />
                            <PrePosition X="1.1842" Y="0.5000" />
                            <PreSize X="4.5880" Y="0.7368" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="-3.9999" Y="25.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="-0.0073" Y="0.5000" />
                        <PreSize X="0.0691" Y="0.7600" />
                        <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                        <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                        <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="DefaultTable2" ActionTag="943259092" Tag="66" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="228.9992" RightMargin="283.0008" TopMargin="6.0000" BottomMargin="6.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                        <Size X="38.0000" Y="38.0000" />
                        <Children>
                          <AbstractNodeData Name="Text" ActionTag="1984917993" Tag="67" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="39.9988" RightMargin="-174.4968" TopMargin="5.0000" BottomMargin="5.0000" IsCustomSize="True" FontSize="28" LabelText="自动加桌模式" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="172.4980" Y="28.0000" />
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="39.9988" Y="19.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="147" G="105" B="45" />
                            <PrePosition X="1.0526" Y="0.5000" />
                            <PreSize X="4.5394" Y="0.7368" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="228.9992" Y="25.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.4164" Y="0.5000" />
                        <PreSize X="0.0691" Y="0.7600" />
                        <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                        <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                        <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="DefaultTable3" ActionTag="-897780159" Tag="68" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="228.5442" RightMargin="283.4558" TopMargin="4.8500" BottomMargin="7.1500" TouchEnable="True" ctype="CheckBoxObjectData">
                        <Size X="38.0000" Y="38.0000" />
                        <Children>
                          <AbstractNodeData Name="Text" ActionTag="1297621577" Tag="69" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="45.9990" RightMargin="-160.2856" TopMargin="5.0000" BottomMargin="5.0000" IsCustomSize="True" FontSize="28" LabelText="防作弊模式" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="152.2866" Y="28.0000" />
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="45.9990" Y="19.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="147" G="105" B="45" />
                            <PrePosition X="1.2105" Y="0.5000" />
                            <PreSize X="4.0075" Y="0.7368" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="228.5442" Y="26.1500" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.4155" Y="0.5230" />
                        <PreSize X="0.0691" Y="0.7600" />
                        <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                        <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                        <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="157.0035" Y="34.6120" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1965" Y="0.5000" />
                    <PreSize X="0.6885" Y="0.7223" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleY="0.5000" />
                <Position X="65.7010" Y="391.8646" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0740" Y="0.7151" />
                <PreSize X="0.8996" Y="0.1263" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="mixTypeLayout" ActionTag="-420441598" Tag="117" IconVisible="False" LeftMargin="5.0485" RightMargin="0.1634" TopMargin="301.7881" BottomMargin="5.0487" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="882.7881" Y="241.1632" />
                <Children>
                  <AbstractNodeData Name="mix_hand_layout" ActionTag="-1955288811" VisibleForFrame="False" Tag="118" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" VerticalEdge="TopEdge" BottomMargin="165.3415" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="882.7881" Y="75.8217" />
                    <Children>
                      <AbstractNodeData Name="TableButton" ActionTag="-200691211" Tag="248" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="34.0830" RightMargin="818.7051" TopMargin="19.2040" BottomMargin="24.6177" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="1" Scale9Height="10" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="30.0000" Y="32.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="49.0830" Y="40.6177" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0556" Y="0.5357" />
                        <PreSize X="0.0340" Y="0.4220" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                        <PressedFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                        <NormalFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Sprite_11_0" ActionTag="-2036561437" Tag="261" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="72.9457" RightMargin="698.8424" TopMargin="21.9770" BottomMargin="26.8447" ctype="SpriteObjectData">
                        <Size X="111.0000" Y="27.0000" />
                        <Children>
                          <AbstractNodeData Name="TableBlock" ActionTag="-2085897057" Tag="262" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="142.0034" RightMargin="-581.0034" TopMargin="-10.8189" BottomMargin="-12.1811" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                            <Size X="550.0000" Y="50.0000" />
                            <Children>
                              <AbstractNodeData Name="DefaultTable1" ActionTag="1992797341" Tag="263" IconVisible="False" PositionPercentYEnabled="True" RightMargin="512.0000" TopMargin="6.0000" BottomMargin="6.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text_20" ActionTag="-1261516908" Tag="264" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.0000" RightMargin="-59.0000" TopMargin="5.0000" BottomMargin="5.0000" FontSize="28" LabelText="1桌" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="42.0000" Y="28.0000" />
                                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                    <Position X="76.0000" Y="19.0000" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="2.0000" Y="0.5000" />
                                    <PreSize X="1.1053" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position Y="25.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition Y="0.5000" />
                                <PreSize X="0.0691" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="DefaultTable2" ActionTag="1954057365" Tag="265" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="200.0000" RightMargin="312.0000" TopMargin="6.0000" BottomMargin="6.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text_20" ActionTag="-1728793472" Tag="266" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.0000" RightMargin="-59.0000" TopMargin="5.0000" BottomMargin="5.0000" FontSize="28" LabelText="2桌" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="42.0000" Y="28.0000" />
                                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                    <Position X="76.0000" Y="19.0000" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="2.0000" Y="0.5000" />
                                    <PreSize X="1.1053" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="200.0000" Y="25.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.3636" Y="0.5000" />
                                <PreSize X="0.0691" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="DefaultTable3" ActionTag="-1455565255" Tag="267" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="400.0000" RightMargin="112.0000" TopMargin="6.0000" BottomMargin="6.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text_20" ActionTag="-379353357" Tag="268" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.0000" RightMargin="-59.0000" TopMargin="5.0000" BottomMargin="5.0000" FontSize="28" LabelText="3桌" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="42.0000" Y="28.0000" />
                                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                    <Position X="76.0000" Y="19.0000" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="2.0000" Y="0.5000" />
                                    <PreSize X="1.1053" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="400.0000" Y="25.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.7273" Y="0.5000" />
                                <PreSize X="0.0691" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleY="1.0000" />
                            <Position X="142.0034" Y="37.8189" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="1.2793" Y="1.4007" />
                            <PreSize X="4.9550" Y="1.8519" />
                            <SingleColor A="255" R="150" G="200" B="255" />
                            <FirstColor A="255" R="150" G="200" B="255" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="128.4457" Y="40.3447" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1455" Y="0.5321" />
                        <PreSize X="0.1257" Y="0.3561" />
                        <FileData Type="PlistSubImage" Path="thmDefault.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                        <BlendFunc Src="1" Dst="771" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position Y="165.3415" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.6856" />
                    <PreSize X="1.0000" Y="0.3144" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="mix_Automatic_layout" ActionTag="-529151655" VisibleForFrame="False" Tag="70" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="882.7881" Y="241.1632" />
                    <Children>
                      <AbstractNodeData Name="emptyTablePosLayout" ActionTag="-393612105" Tag="478" IconVisible="False" LeftMargin="34.0577" RightMargin="408.2369" TopMargin="-11.1001" BottomMargin="183.0392" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="440.4935" Y="69.2241" />
                        <Children>
                          <AbstractNodeData Name="emptyTablePos_Tips" ActionTag="-471807112" Tag="479" IconVisible="False" LeftMargin="-2.8417" RightMargin="413.3352" TopMargin="19.4907" BottomMargin="17.7334" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="1" Scale9Height="10" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="30.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="12.1583" Y="33.7334" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.0276" Y="0.4873" />
                            <PreSize X="0.0681" Y="0.4623" />
                            <TextColor A="255" R="65" G="65" B="70" />
                            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                            <PressedFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                            <NormalFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_1" ActionTag="-400210385" Tag="480" IconVisible="False" LeftMargin="38.9755" RightMargin="289.5180" TopMargin="21.1542" BottomMargin="20.0699" LeftEage="36" RightEage="36" TopEage="8" BottomEage="8" Scale9OriginX="36" Scale9OriginY="8" Scale9Width="40" Scale9Height="12" ctype="ImageViewObjectData">
                            <Size X="112.0000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="94.9755" Y="34.0699" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2156" Y="0.4922" />
                            <PreSize X="0.2543" Y="0.4045" />
                            <FileData Type="PlistSubImage" Path="TH_MIX_emptypos.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="emptyTablePosBlock" ActionTag="1412767928" Tag="481" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="164.0296" RightMargin="-5.3101" TopMargin="13.1217" BottomMargin="6.1024" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                            <Size X="281.7740" Y="50.0000" />
                            <Children>
                              <AbstractNodeData Name="DefaultTable1" ActionTag="-1959880761" Tag="482" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="15.9590" RightMargin="227.8150" TopMargin="5.0000" BottomMargin="7.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text" ActionTag="1112719200" Tag="483" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="61.5676" RightMargin="-83.9520" TopMargin="4.1222" BottomMargin="5.8778" IsCustomSize="True" FontSize="28" LabelText="在前" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="60.3844" Y="28.0000" />
                                    <AnchorPoint ScaleY="0.5000" />
                                    <Position X="61.5676" Y="19.8778" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="1.6202" Y="0.5231" />
                                    <PreSize X="1.5891" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="15.9590" Y="26.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.0566" Y="0.5200" />
                                <PreSize X="0.1349" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="DefaultTable2" ActionTag="-1468613121" Tag="484" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="166.1662" RightMargin="77.6078" TopMargin="2.4850" BottomMargin="9.5150" TouchEnable="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text" ActionTag="2097016181" Tag="485" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.2034" RightMargin="-109.7253" TopMargin="5.0000" BottomMargin="5.0000" IsCustomSize="True" FontSize="28" LabelText="在后" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="87.5219" Y="28.0000" />
                                    <AnchorPoint ScaleY="0.5000" />
                                    <Position X="60.2034" Y="19.0000" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="1.5843" Y="0.5000" />
                                    <PreSize X="2.3032" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="166.1662" Y="28.5150" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.5897" Y="0.5703" />
                                <PreSize X="0.1349" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="164.0296" Y="31.1024" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.3724" Y="0.4493" />
                            <PreSize X="0.6397" Y="0.7223" />
                            <SingleColor A="255" R="150" G="200" B="255" />
                            <FirstColor A="255" R="150" G="200" B="255" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="34.0577" Y="217.6512" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0386" Y="0.9025" />
                        <PreSize X="0.4990" Y="0.2870" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="emptyMaxTableLaout" ActionTag="-654952041" Tag="486" IconVisible="False" LeftMargin="33.0602" RightMargin="409.2344" TopMargin="62.8866" BottomMargin="109.0526" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="440.4935" Y="69.2241" />
                        <Children>
                          <AbstractNodeData Name="emptyMaxTablePos_Tips" ActionTag="693955766" Tag="487" IconVisible="False" LeftMargin="-2.8417" RightMargin="413.3352" TopMargin="19.4907" BottomMargin="17.7334" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="1" Scale9Height="10" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="30.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="12.1583" Y="33.7334" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.0276" Y="0.4873" />
                            <PreSize X="0.0681" Y="0.4623" />
                            <TextColor A="255" R="65" G="65" B="70" />
                            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                            <PressedFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                            <NormalFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_1" ActionTag="979643282" Tag="488" IconVisible="False" LeftMargin="36.9839" RightMargin="263.5096" TopMargin="20.4478" BottomMargin="20.7763" LeftEage="36" RightEage="36" TopEage="8" BottomEage="8" Scale9OriginX="36" Scale9OriginY="8" Scale9Width="68" Scale9Height="12" ctype="ImageViewObjectData">
                            <Size X="140.0000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="106.9839" Y="34.7763" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2429" Y="0.5024" />
                            <PreSize X="0.3178" Y="0.4045" />
                            <FileData Type="PlistSubImage" Path="TH_MIX_maxemptynum.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="emptyMaxTableBlock" ActionTag="307626123" Tag="489" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="203.5868" RightMargin="-44.8673" TopMargin="11.7095" BottomMargin="7.5146" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                            <Size X="281.7740" Y="50.0000" />
                            <Children>
                              <AbstractNodeData Name="DefaultTable1" ActionTag="1476464010" Tag="490" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="15.9590" RightMargin="227.8150" TopMargin="5.0000" BottomMargin="7.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text" ActionTag="-1460043852" Tag="491" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="61.5676" RightMargin="-83.9520" TopMargin="4.1222" BottomMargin="5.8778" IsCustomSize="True" FontSize="28" LabelText="1桌" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="60.3844" Y="28.0000" />
                                    <AnchorPoint ScaleY="0.5000" />
                                    <Position X="61.5676" Y="19.8778" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="1.6202" Y="0.5231" />
                                    <PreSize X="1.5891" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="15.9590" Y="26.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.0566" Y="0.5200" />
                                <PreSize X="0.1349" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="DefaultTable2" ActionTag="852383171" Tag="492" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="166.1662" RightMargin="77.6078" TopMargin="2.4850" BottomMargin="9.5150" TouchEnable="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text" ActionTag="-1823736907" Tag="493" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.2034" RightMargin="-109.7253" TopMargin="5.0000" BottomMargin="5.0000" IsCustomSize="True" FontSize="28" LabelText="2桌" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="87.5219" Y="28.0000" />
                                    <AnchorPoint ScaleY="0.5000" />
                                    <Position X="60.2034" Y="19.0000" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="1.5843" Y="0.5000" />
                                    <PreSize X="2.3032" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="166.1662" Y="28.5150" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.5897" Y="0.5703" />
                                <PreSize X="0.1349" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="203.5868" Y="32.5146" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.4622" Y="0.4697" />
                            <PreSize X="0.6397" Y="0.7223" />
                            <SingleColor A="255" R="150" G="200" B="255" />
                            <FirstColor A="255" R="150" G="200" B="255" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="33.0602" Y="143.6646" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0374" Y="0.5957" />
                        <PreSize X="0.4990" Y="0.2870" />
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
                  <AbstractNodeData Name="mix_Cheat_layout" ActionTag="-1076559420" Tag="71" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" VerticalEdge="TopEdge" LeftMargin="0.8784" RightMargin="-0.8784" TopMargin="-11.0000" BottomMargin="4.2233" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="882.7881" Y="247.9399" />
                    <Children>
                      <AbstractNodeData Name="znTips" ActionTag="96345197" Tag="73" IconVisible="False" LeftMargin="34.5449" RightMargin="818.2432" TopMargin="19.9796" BottomMargin="195.9603" TouchEnable="True" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="12" ctype="ImageViewObjectData">
                        <Size X="30.0000" Y="32.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="49.5449" Y="211.9603" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0561" Y="0.8549" />
                        <PreSize X="0.0340" Y="0.1291" />
                        <FileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Image_2" ActionTag="1934016546" Tag="72" IconVisible="False" LeftMargin="71.4651" RightMargin="699.3230" TopMargin="21.3898" BottomMargin="197.5501" LeftEage="36" RightEage="36" TopEage="9" BottomEage="9" Scale9OriginX="36" Scale9OriginY="9" Scale9Width="40" Scale9Height="11" ctype="ImageViewObjectData">
                        <Size X="112.0000" Y="29.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="127.4651" Y="212.0501" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1444" Y="0.8552" />
                        <PreSize X="0.1269" Y="0.1170" />
                        <FileData Type="PlistSubImage" Path="TH_MIX_AIchoose.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="setZNumsLayout" ActionTag="-1387886886" Tag="316" IconVisible="False" LeftMargin="457.9438" RightMargin="21.4157" TopMargin="-9.2968" BottomMargin="171.6092" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="403.4286" Y="85.6275" />
                        <Children>
                          <AbstractNodeData Name="znNumTips" ActionTag="-687640319" Tag="317" IconVisible="False" LeftMargin="27.8014" RightMargin="345.6272" TopMargin="28.8244" BottomMargin="24.8031" TouchEnable="True" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="12" ctype="ImageViewObjectData">
                            <Size X="30.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="42.8014" Y="40.8031" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.1061" Y="0.4765" />
                            <PreSize X="0.0744" Y="0.3737" />
                            <FileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_5" ActionTag="-385616361" Tag="318" IconVisible="False" LeftMargin="63.3225" RightMargin="228.1061" TopMargin="29.9113" BottomMargin="26.7162" LeftEage="36" RightEage="36" TopEage="9" BottomEage="9" Scale9OriginX="36" Scale9OriginY="9" Scale9Width="40" Scale9Height="11" ctype="ImageViewObjectData">
                            <Size X="112.0000" Y="29.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="119.3225" Y="41.2162" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2958" Y="0.4813" />
                            <PreSize X="0.2776" Y="0.3387" />
                            <FileData Type="PlistSubImage" Path="TH_mix_setNums.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_6" ActionTag="1613435409" Tag="319" IconVisible="False" LeftMargin="183.7076" RightMargin="9.6165" TopMargin="12.0484" BottomMargin="12.1661" Scale9Enable="True" LeftEage="105" RightEage="105" TopEage="19" BottomEage="19" Scale9OriginX="105" Scale9OriginY="19" Scale9Width="110" Scale9Height="22" ctype="ImageViewObjectData">
                            <Size X="210.1045" Y="61.4130" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="288.7599" Y="42.8726" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.7158" Y="0.5007" />
                            <PreSize X="0.5208" Y="0.7172" />
                            <FileData Type="PlistSubImage" Path="TH_anti_dialog_input_large.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_dialog.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="inputSetLayout" ActionTag="-1038747451" Tag="320" IconVisible="False" LeftMargin="199.4500" RightMargin="19.7890" TopMargin="15.2399" BottomMargin="14.7057" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                            <Size X="184.1896" Y="55.6819" />
                            <AnchorPoint />
                            <Position X="199.4500" Y="14.7057" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.4944" Y="0.1717" />
                            <PreSize X="0.4566" Y="0.6503" />
                            <SingleColor A="255" R="150" G="200" B="255" />
                            <FirstColor A="255" R="150" G="200" B="255" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                        <Position X="659.6581" Y="257.2367" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.7472" Y="1.0375" />
                        <PreSize X="0.4570" Y="0.3454" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="filteraikatietosuodatin_layout" ActionTag="309817656" Tag="74" IconVisible="False" LeftMargin="219.4869" RightMargin="412.4534" TopMargin="8.2303" BottomMargin="185.7096" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="250.8478" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="DefaultTable3_0" ActionTag="499341977" Tag="75" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="-2.4111" RightMargin="215.2589" TopMargin="6.6014" BottomMargin="9.3986" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                            <Size X="38.0000" Y="38.0000" />
                            <Children>
                              <AbstractNodeData Name="Text_20" ActionTag="-1993353115" Tag="76" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.0000" RightMargin="-52.0000" TopMargin="5.0000" BottomMargin="5.0000" FontSize="28" LabelText="开" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                <Size X="28.0000" Y="28.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="76.0000" Y="19.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="147" G="105" B="45" />
                                <PrePosition X="2.0000" Y="0.5000" />
                                <PreSize X="0.7368" Y="0.7368" />
                                <OutlineColor A="255" R="255" G="0" B="0" />
                                <ShadowColor A="255" R="110" G="110" B="110" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="-2.4111" Y="28.3986" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="-0.0096" Y="0.5259" />
                            <PreSize X="0.1515" Y="0.7037" />
                            <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                            <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                            <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="DefaultTable3_0_0" ActionTag="-391527800" Tag="77" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="147.0509" RightMargin="65.7969" TopMargin="6.6014" BottomMargin="9.3986" TouchEnable="True" ctype="CheckBoxObjectData">
                            <Size X="38.0000" Y="38.0000" />
                            <Children>
                              <AbstractNodeData Name="Text_20" ActionTag="406793483" Tag="78" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.0000" RightMargin="-52.0000" TopMargin="5.0000" BottomMargin="5.0000" FontSize="28" LabelText="关" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                <Size X="28.0000" Y="28.0000" />
                                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                                <Position X="76.0000" Y="19.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="147" G="105" B="45" />
                                <PrePosition X="2.0000" Y="0.5000" />
                                <PreSize X="0.7368" Y="0.7368" />
                                <OutlineColor A="255" R="255" G="0" B="0" />
                                <ShadowColor A="255" R="110" G="110" B="110" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="147.0509" Y="28.3986" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5862" Y="0.5259" />
                            <PreSize X="0.1515" Y="0.7037" />
                            <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                            <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                            <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="219.4869" Y="185.7096" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.2486" Y="0.7490" />
                        <PreSize X="0.2842" Y="0.2178" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="superFzb_Panel" ActionTag="2043472609" Tag="351" IconVisible="False" LeftMargin="36.9477" RightMargin="405.3469" TopMargin="63.7934" BottomMargin="114.9223" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="440.4935" Y="69.2241" />
                        <Children>
                          <AbstractNodeData Name="superFzb_Tips" ActionTag="1229864885" Tag="360" IconVisible="False" LeftMargin="-2.8417" RightMargin="413.3352" TopMargin="19.4907" BottomMargin="17.7334" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="1" Scale9Height="10" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="30.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="12.1583" Y="33.7334" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.0276" Y="0.4873" />
                            <PreSize X="0.0681" Y="0.4623" />
                            <TextColor A="255" R="65" G="65" B="70" />
                            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                            <PressedFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                            <NormalFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_1" ActionTag="-1281426624" Tag="352" IconVisible="False" LeftMargin="33.9757" RightMargin="266.5178" TopMargin="21.1541" BottomMargin="20.0700" LeftEage="36" RightEage="36" TopEage="8" BottomEage="8" Scale9OriginX="36" Scale9OriginY="8" Scale9Width="68" Scale9Height="12" ctype="ImageViewObjectData">
                            <Size X="140.0000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="103.9757" Y="34.0700" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2360" Y="0.4922" />
                            <PreSize X="0.3178" Y="0.4045" />
                            <FileData Type="PlistSubImage" Path="Superfzb_font.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="superFzbBlock" ActionTag="658537329" Tag="353" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="164.0296" RightMargin="-5.3101" TopMargin="13.1217" BottomMargin="6.1024" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                            <Size X="281.7740" Y="50.0000" />
                            <Children>
                              <AbstractNodeData Name="DefaultTable1" ActionTag="1266415667" Tag="354" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="15.9590" RightMargin="227.8150" TopMargin="5.0000" BottomMargin="7.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text" ActionTag="-1961277433" Tag="355" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="61.5676" RightMargin="-57.4605" TopMargin="4.1222" BottomMargin="5.8778" IsCustomSize="True" FontSize="28" LabelText="开" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="33.8929" Y="28.0000" />
                                    <AnchorPoint ScaleY="0.5000" />
                                    <Position X="61.5676" Y="19.8778" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="1.6202" Y="0.5231" />
                                    <PreSize X="0.8919" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="15.9590" Y="26.0000" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.0566" Y="0.5200" />
                                <PreSize X="0.1349" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                              <AbstractNodeData Name="DefaultTable2" ActionTag="-1160257774" Tag="356" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="166.1662" RightMargin="77.6078" TopMargin="2.4850" BottomMargin="9.5150" TouchEnable="True" ctype="CheckBoxObjectData">
                                <Size X="38.0000" Y="38.0000" />
                                <Children>
                                  <AbstractNodeData Name="Text" ActionTag="1210705735" Tag="357" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="60.2034" RightMargin="-60.0538" TopMargin="5.0000" BottomMargin="5.0000" IsCustomSize="True" FontSize="28" LabelText="关" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                                    <Size X="37.8504" Y="28.0000" />
                                    <AnchorPoint ScaleY="0.5000" />
                                    <Position X="60.2034" Y="19.0000" />
                                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                    <CColor A="255" R="147" G="105" B="45" />
                                    <PrePosition X="1.5843" Y="0.5000" />
                                    <PreSize X="0.9961" Y="0.7368" />
                                    <OutlineColor A="255" R="255" G="0" B="0" />
                                    <ShadowColor A="255" R="110" G="110" B="110" />
                                  </AbstractNodeData>
                                </Children>
                                <AnchorPoint ScaleY="0.5000" />
                                <Position X="166.1662" Y="28.5150" />
                                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                                <CColor A="255" R="255" G="255" B="255" />
                                <PrePosition X="0.5897" Y="0.5703" />
                                <PreSize X="0.1349" Y="0.7600" />
                                <NormalBackFileData Type="PlistSubImage" Path="dom.radio_bg.png" Plist="common/RichDom/RichDom.plist" />
                                <PressedBackFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                                <NodeNormalFileData Type="PlistSubImage" Path="dom.radio_mask.png" Plist="common/RichDom/RichDom.plist" />
                              </AbstractNodeData>
                            </Children>
                            <AnchorPoint ScaleY="0.5000" />
                            <Position X="164.0296" Y="31.1024" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.3724" Y="0.4493" />
                            <PreSize X="0.6397" Y="0.7223" />
                            <SingleColor A="255" R="150" G="200" B="255" />
                            <FirstColor A="255" R="150" G="200" B="255" />
                            <EndColor A="255" R="255" G="255" B="255" />
                            <ColorVector ScaleY="1.0000" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="36.9477" Y="149.5344" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0419" Y="0.6031" />
                        <PreSize X="0.4990" Y="0.2792" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="waitNum_layout" ActionTag="-1390531165" Tag="629" IconVisible="False" LeftMargin="482.7006" RightMargin="29.9667" TopMargin="59.9376" BottomMargin="116.6301" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                        <Size X="370.1208" Y="71.3721" />
                        <Children>
                          <AbstractNodeData Name="img_WaitTips" ActionTag="1544396170" Tag="630" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="3.6755" RightMargin="336.4453" TopMargin="23.6615" BottomMargin="15.7106" TouchEnable="True" LeftEage="9" RightEage="9" TopEage="10" BottomEage="10" Scale9OriginX="9" Scale9OriginY="10" Scale9Width="12" Scale9Height="12" ctype="ImageViewObjectData">
                            <Size X="30.0000" Y="32.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="18.6755" Y="31.7106" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.0505" Y="0.4443" />
                            <PreSize X="0.0811" Y="0.4484" />
                            <FileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="Image_7" ActionTag="-1630229179" Tag="401" IconVisible="False" LeftMargin="37.9561" RightMargin="220.1647" TopMargin="24.0955" BottomMargin="19.2766" LeftEage="36" RightEage="36" TopEage="9" BottomEage="9" Scale9OriginX="36" Scale9OriginY="9" Scale9Width="40" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="112.0000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="93.9561" Y="33.2766" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.2539" Y="0.4662" />
                            <PreSize X="0.3026" Y="0.3923" />
                            <FileData Type="PlistSubImage" Path="TH_mix_waitNum.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="btn_waitNum" ActionTag="607500321" Tag="632" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="166.3058" RightMargin="81.8150" TopMargin="15.3970" BottomMargin="6.9751" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                            <Size X="122.0000" Y="49.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="227.3058" Y="31.4751" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.6141" Y="0.4410" />
                            <PreSize X="0.3296" Y="0.6865" />
                            <TextColor A="255" R="65" G="65" B="70" />
                            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                            <PressedFileData Type="PlistSubImage" Path="aisSettingDeep.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_Scope.plist" />
                            <NormalFileData Type="PlistSubImage" Path="aisSetting.png" Plist="lobby/TeaHouse/TH_AntiIndulgence/TH_AntiIndulgence_Scope.plist" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="482.7006" Y="152.3162" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5468" Y="0.6143" />
                        <PreSize X="0.4193" Y="0.2879" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="0.8784" Y="4.2233" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0010" Y="0.0175" />
                    <PreSize X="1.0000" Y="1.0281" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="5.0485" Y="5.0487" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0057" Y="0.0092" />
                <PreSize X="0.9941" Y="0.4401" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="Panel_3" ActionTag="1040630368" Tag="100" IconVisible="False" LeftMargin="5.7852" RightMargin="1.1110" TopMargin="176.3156" BottomMargin="245.9148" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="881.1038" Y="125.7696" />
                <Children>
                  <AbstractNodeData Name="EditButton" ActionTag="2053726283" Tag="247" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="31.6985" RightMargin="819.4053" TopMargin="16.7504" BottomMargin="77.0192" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="1" Scale9Height="10" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="30.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="46.6985" Y="93.0192" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0530" Y="0.7396" />
                    <PreSize X="0.0340" Y="0.2544" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                    <PressedFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                    <NormalFileData Type="PlistSubImage" Path="thmHint.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Sprite_11" ActionTag="1033080173" Tag="249" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="69.9978" RightMargin="699.1060" TopMargin="18.7504" BottomMargin="79.0192" ctype="SpriteObjectData">
                    <Size X="112.0000" Y="28.0000" />
                    <Children>
                      <AbstractNodeData Name="FloorScrollView" ActionTag="1737428122" Tag="356" IconVisible="False" LeftMargin="140.0000" RightMargin="-666.0000" TopMargin="-9.0004" BottomMargin="-62.9996" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                        <Size X="638.0000" Y="100.0000" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="140.0000" Y="37.0004" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="1.2500" Y="1.3214" />
                        <PreSize X="5.6964" Y="3.5714" />
                        <SingleColor A="255" R="255" G="150" B="100" />
                        <FirstColor A="255" R="255" G="150" B="100" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                        <InnerNodeSize Width="638" Height="300" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="125.9978" Y="93.0192" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1430" Y="0.7396" />
                    <PreSize X="0.1271" Y="0.2226" />
                    <FileData Type="PlistSubImage" Path="TH_MIX_mixfloor.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Hint" ActionTag="1649160150" VisibleForFrame="False" Tag="269" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="207.3719" RightMargin="185.6885" TopMargin="11.6979" BottomMargin="-77.9282" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="0" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="488.0434" Y="191.9999" />
                    <Children>
                      <AbstractNodeData Name="HintBg" ActionTag="-1217284541" Tag="270" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="0.0217" RightMargin="0.0217" TopMargin="-0.0001" BottomMargin="-0.0001" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="161" Scale9OriginY="63" Scale9Width="166" Scale9Height="66" ctype="PanelObjectData">
                        <Size X="488.0000" Y="192.0000" />
                        <Children>
                          <AbstractNodeData Name="HintFloor" ActionTag="1641638989" Tag="187" IconVisible="False" LeftMargin="10.0000" RightMargin="18.0000" TopMargin="17.0000" BottomMargin="15.0000" IsCustomSize="True" FontSize="20" LabelText="1、一个楼层被添加到混排大厅后，将不再独立楼层显示，即成员不可再切换到该楼层，而是全部在大厅混排显示；&#xA;&#xA;2、本版本混排大厅暂不支持5人以上游戏玩法；" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="460.0000" Y="160.0000" />
                            <AnchorPoint ScaleY="1.0000" />
                            <Position X="10.0000" Y="175.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.0205" Y="0.9115" />
                            <PreSize X="0.9426" Y="0.8333" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="HintTable" ActionTag="-865263441" VisibleForFrame="False" Tag="188" IconVisible="False" LeftMargin="10.0000" RightMargin="18.0000" TopMargin="17.0000" BottomMargin="15.0000" IsCustomSize="True" FontSize="20" LabelText="1、默认桌数是指：一个楼层游戏玩法在大厅中初次显示的桌子数量；" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="460.0000" Y="160.0000" />
                            <AnchorPoint ScaleY="1.0000" />
                            <Position X="10.0000" Y="175.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.0205" Y="0.9115" />
                            <PreSize X="0.9426" Y="0.8333" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="244.0217" Y="95.9999" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="0.9999" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="thmBubble.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="451.3936" Y="18.0717" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5123" Y="0.1437" />
                    <PreSize X="0.5539" Y="1.5266" />
                    <SingleColor A="255" R="0" G="0" B="0" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="zNTipsPanel" ActionTag="-2039444422" VisibleForFrame="False" Tag="101" IconVisible="False" LeftMargin="206.4599" RightMargin="105.0593" TopMargin="127.5738" BottomMargin="-78.6094" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="-161" Scale9OriginY="-63" Scale9Width="322" Scale9Height="126" ctype="PanelObjectData">
                    <Size X="569.5846" Y="76.8052" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="1009555118" Tag="102" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" HorizontalEdge="LeftEdge" TopMargin="2.0308" BottomMargin="-2.0308" Scale9Enable="True" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="161" Scale9OriginY="63" Scale9Width="166" Scale9Height="66" ctype="ImageViewObjectData">
                        <Size X="569.5846" Y="76.8052" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="284.7923" Y="36.3718" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.4736" />
                        <PreSize X="1.0000" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="thmBubble.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Text_1" ActionTag="1812296745" Tag="103" IconVisible="False" LeftMargin="27.8036" RightMargin="4.7050" TopMargin="15.3538" BottomMargin="11.2924" IsCustomSize="True" FontSize="22" LabelText="智能筛选：根据游戏大数据分析，隔离作弊嫌疑玩家；" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="537.0761" Y="50.1590" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="296.3416" Y="36.3719" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="249" B="240" />
                        <PrePosition X="0.5203" Y="0.4736" />
                        <PreSize X="0.9429" Y="0.6531" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="206.4599" Y="-78.6094" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2343" Y="-0.6250" />
                    <PreSize X="0.6464" Y="0.6107" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="zNSuperTipsPanel" ActionTag="1136634453" VisibleForFrame="False" Tag="341" IconVisible="False" LeftMargin="222.4599" RightMargin="89.0593" TopMargin="163.5738" BottomMargin="-132.6094" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="-161" Scale9OriginY="-63" Scale9Width="322" Scale9Height="126" ctype="PanelObjectData">
                    <Size X="569.5846" Y="94.8052" />
                    <Children>
                      <AbstractNodeData Name="Image_3" ActionTag="-111444183" Tag="342" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" Scale9Enable="True" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="161" Scale9OriginY="63" Scale9Width="166" Scale9Height="66" ctype="ImageViewObjectData">
                        <Size X="569.5846" Y="94.8052" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="284.7923" Y="47.4026" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.0000" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="thmBubble.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Text_1" ActionTag="1773205649" Tag="343" IconVisible="False" LeftMargin="21.8036" RightMargin="10.7050" TopMargin="11.3538" BottomMargin="13.2924" IsCustomSize="True" FontSize="22" LabelText="开启后房间/大厅内均会全程隐藏玩家信息（大厅圈主/管理员可见），匹配中桌子会显示在大厅" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="537.0761" Y="70.1590" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="290.3416" Y="48.3719" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="249" B="240" />
                        <PrePosition X="0.5097" Y="0.5102" />
                        <PreSize X="0.9429" Y="0.7400" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="222.4599" Y="-132.6094" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2525" Y="-1.0544" />
                    <PreSize X="0.6464" Y="0.7538" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="autoTipsLayout" ActionTag="1066248054" VisibleForFrame="False" Tag="427" IconVisible="False" LeftMargin="211.4598" RightMargin="34.2910" TopMargin="105.7794" BottomMargin="-136.9790" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="635.3530" Y="156.9692" />
                    <Children>
                      <AbstractNodeData Name="Image_4" ActionTag="949733676" Tag="428" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" Scale9Enable="True" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="161" Scale9OriginY="63" Scale9Width="166" Scale9Height="66" ctype="ImageViewObjectData">
                        <Size X="635.3530" Y="156.9692" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="317.6765" Y="78.4846" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.0000" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="thmBubble.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="tipsText" ActionTag="1105050893" Tag="429" IconVisible="False" LeftMargin="16.9667" RightMargin="17.8237" TopMargin="14.8458" BottomMargin="16.8548" IsCustomSize="True" FontSize="22" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="600.5626" Y="125.2686" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="16.9667" Y="142.1234" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="249" B="240" />
                        <PrePosition X="0.0267" Y="0.9054" />
                        <PreSize X="0.9452" Y="0.7980" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="211.4598" Y="-136.9790" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2400" Y="-1.0891" />
                    <PreSize X="0.7211" Y="1.2481" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="waitTipsLayout" ActionTag="-1872670014" VisibleForFrame="False" Tag="634" IconVisible="False" LeftMargin="139.0452" RightMargin="106.7056" TopMargin="93.7241" BottomMargin="-52.9568" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="635.3530" Y="85.0023" />
                    <Children>
                      <AbstractNodeData Name="Image_4" ActionTag="-1578636975" Tag="635" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" Scale9Enable="True" LeftEage="161" RightEage="161" TopEage="63" BottomEage="63" Scale9OriginX="161" Scale9OriginY="63" Scale9Width="166" Scale9Height="66" ctype="ImageViewObjectData">
                        <Size X="635.3530" Y="85.0023" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="317.6765" Y="42.5011" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5000" />
                        <PreSize X="1.0000" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="thmBubble.png" Plist="lobby/TeaHouse/TH_ChangeFloorPanel/TH_Mix.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="tipsText" ActionTag="-1918106934" Tag="636" IconVisible="False" LeftMargin="15.8059" RightMargin="18.9845" TopMargin="12.5246" BottomMargin="8.3456" IsCustomSize="True" FontSize="23" LabelText="说明：同时匹配的玩家人数达到设置数值时才会开始入桌匹配" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="600.5626" Y="64.1321" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="15.8059" Y="72.4777" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="249" B="240" />
                        <PrePosition X="0.0249" Y="0.8527" />
                        <PreSize X="0.9452" Y="0.7545" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="139.0452" Y="-52.9568" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1578" Y="-0.4211" />
                    <PreSize X="0.7211" Y="0.6759" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleY="1.0000" />
                <Position X="5.7852" Y="371.6844" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0065" Y="0.6783" />
                <PreSize X="0.9922" Y="0.2295" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="SaveButton" ActionTag="-1735835946" Tag="271" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="330.0000" RightMargin="330.0000" TopMargin="441.7400" BottomMargin="25.2600" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="228.0000" Y="81.0000" />
                <Children>
                  <AbstractNodeData Name="BitmapFontLabel_4" ActionTag="-115256820" Tag="272" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="41.0000" RightMargin="41.0000" TopMargin="17.4500" BottomMargin="25.5500" LabelText="保存设置" ctype="TextBMFontObjectData">
                    <Size X="146.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="114.0000" Y="44.5500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.6404" Y="0.4691" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="65.7600" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.1200" />
                <PreSize X="0.2568" Y="0.1478" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_green_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_green.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="MixCloseButton" ActionTag="1388488860" Tag="241" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="852.0000" RightMargin="-20.0000" TopMargin="-20.0000" BottomMargin="510.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
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
          <AbstractNodeData Name="FloorCheckBox" ActionTag="1787513712" Tag="363" IconVisible="False" LeftMargin="436.2400" RightMargin="720.8329" TopMargin="958.6566" BottomMargin="-288.6566" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="122.9271" Y="50.0000" />
            <Children>
              <AbstractNodeData Name="cb" ActionTag="1090416248" Tag="251" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="3.0000" RightMargin="81.9271" TopMargin="7.5000" BottomMargin="4.5000" ctype="CheckBoxObjectData">
                <Size X="38.0000" Y="38.0000" />
                <Children>
                  <AbstractNodeData Name="FloorText" ActionTag="-1636261545" Tag="252" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="48.0016" RightMargin="-95.7340" TopMargin="2.5000" BottomMargin="2.5000" IsCustomSize="True" FontSize="28" LabelText="10楼" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="85.7324" Y="33.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="48.0016" Y="19.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="102" G="44" B="2" />
                    <PrePosition X="1.2632" Y="0.5000" />
                    <PreSize X="2.2561" Y="0.8684" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleY="0.5000" />
                <Position X="3.0000" Y="23.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0244" Y="0.4700" />
                <PreSize X="0.3091" Y="0.7600" />
                <NormalBackFileData Type="PlistSubImage" Path="dom.checkbox_rect_bg.png" Plist="common/RichDom/RichDom.plist" />
                <PressedBackFileData Type="PlistSubImage" Path="dom.checkbox_rect_bg.png" Plist="common/RichDom/RichDom.plist" />
                <NodeNormalFileData Type="PlistSubImage" Path="dom.checkbox_rect_mask.png" Plist="common/RichDom/RichDom.plist" />
                <NodeDisableFileData Type="PlistSubImage" Path="dom.checkbox_rect_mask.png" Plist="common/RichDom/RichDom.plist" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position X="436.2400" Y="-288.6566" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.3408" Y="-0.4009" />
            <PreSize X="0.0960" Y="0.0694" />
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