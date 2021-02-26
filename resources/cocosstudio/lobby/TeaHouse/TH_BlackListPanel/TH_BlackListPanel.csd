<GameFile>
  <PropertyGroup Name="TH_BlackListPanel" Type="Layer" ID="abed4928-50fa-4af8-b455-ec2df9919311" Version="3.10.0.0" />
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
              <AbstractNodeData Name="btn_close" ActionTag="-2084451372" Tag="141" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="842.5000" RightMargin="-10.5000" TopMargin="-22.0000" BottomMargin="512.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
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
              <AbstractNodeData Name="talert_title_bg_1" ActionTag="612474145" Tag="110" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="320.0000" RightMargin="320.0000" TopMargin="-6.5050" BottomMargin="481.5050" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="518.0050" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9453" />
                <PreSize X="0.2793" Y="0.1332" />
                <FileData Type="PlistSubImage" Path="black_title.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="pageGroup" ActionTag="-231754910" VisibleForFrame="False" Tag="348" IconVisible="False" LeftMargin="54.9301" RightMargin="-76.9301" TopMargin="21.3465" BottomMargin="40.6535" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="910.0000" Y="486.0000" />
                <Children>
                  <AbstractNodeData Name="page_add" ActionTag="-73015542" Tag="229" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="-4.2699" RightMargin="3.7929" TopMargin="2.5642" BottomMargin="-2.8144" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="910.4770" Y="486.2502" />
                    <Children>
                      <AbstractNodeData Name="label" ActionTag="1714812289" Tag="231" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="65.2385" RightMargin="65.2385" TopMargin="30.4999" BottomMargin="425.7503" FontSize="30" LabelText="玩家被列入黑名单后，将不再收到该玩家的任何申请信息．" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="780.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="455.2385" Y="440.7503" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="118" G="64" B="28" />
                        <PrePosition X="0.5000" Y="0.9064" />
                        <PreSize X="0.8567" Y="0.0617" />
                        <FontResource Type="Default" Path="" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="btn_add" ActionTag="1331324165" Tag="246" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="528.0684" RightMargin="154.4086" TopMargin="106.7085" BottomMargin="298.5417" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="228.0000" Y="81.0000" />
                        <Children>
                          <AbstractNodeData Name="Text_3" ActionTag="1464905276" Tag="247" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" TopMargin="15.0000" BottomMargin="15.0000" IsCustomSize="True" FontSize="34" LabelText="加入黑名单" HorizontalAlignmentType="HT_Center" OutlineSize="3" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="228.0000" Y="51.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="114.0000" Y="40.5000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="0.6296" />
                            <FontResource Type="Default" Path="" Plist="" />
                            <OutlineColor A="255" R="11" G="89" B="164" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="642.0684" Y="339.0417" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.7052" Y="0.6973" />
                        <PreSize X="0.2504" Y="0.1666" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <DisabledFileData Type="PlistSubImage" Path="common_btn_blue_deep.png" Plist="common/bnts/common_new_btns.plist" />
                        <PressedFileData Type="PlistSubImage" Path="common_btn_blue_deep.png" Plist="common/bnts/common_new_btns.plist" />
                        <NormalFileData Type="PlistSubImage" Path="common_btn_blue.png" Plist="common/bnts/common_new_btns.plist" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="editbox_add" ActionTag="-803725112" Tag="245" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="151.2968" RightMargin="388.5670" TopMargin="122.4713" BottomMargin="323.7789" TouchEnable="True" FontSize="32" IsCustomSize="True" LabelText="" PlaceHolderText="请输入用户id" MaxLengthText="10" ctype="TextFieldObjectData">
                        <Size X="370.6132" Y="40.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="336.6034" Y="343.7789" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="127" G="127" B="127" />
                        <PrePosition X="0.3697" Y="0.7070" />
                        <PreSize X="0.4071" Y="0.0823" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="-4.2699" Y="-2.8144" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="-0.0047" Y="-0.0058" />
                    <PreSize X="1.0005" Y="1.0005" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="509.9301" Y="283.6535" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5742" Y="0.5176" />
                <PreSize X="1.0248" Y="0.8869" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="page_list" ActionTag="-1368308824" Tag="32" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="444.0000" RightMargin="444.0000" TopMargin="274.0000" BottomMargin="274.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="0.0000" Y="0.0000" />
                <Children>
                  <AbstractNodeData Name="sv_list" ActionTag="411136637" Tag="34" IconVisible="False" LeftMargin="-409.5000" RightMargin="-409.5000" TopMargin="-176.5000" BottomMargin="-176.5000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                    <Size X="819.0000" Y="353.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.0000" Y="0.0000" />
                    <SingleColor A="255" R="255" G="150" B="100" />
                    <FirstColor A="255" R="255" G="150" B="100" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                    <InnerNodeSize Width="850" Height="353" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="444.0000" Y="274.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0000" Y="0.0000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_search" ActionTag="1842323637" Tag="250" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="649.4000" RightMargin="116.6000" TopMargin="464.8200" BottomMargin="34.1800" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="122.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="710.4000" Y="58.6800" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8000" Y="0.1071" />
                <PreSize X="0.1374" Y="0.0894" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="thb_btn_search_deep_thmb.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <PressedFileData Type="PlistSubImage" Path="thb_btn_search_deep_thmb.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <NormalFileData Type="PlistSubImage" Path="thb_btn_search_thmb.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="editbox_bg_1_0" ActionTag="740543726" Tag="248" IconVisible="False" LeftMargin="180.9270" RightMargin="263.0730" TopMargin="464.3159" BottomMargin="33.6841" ctype="SpriteObjectData">
                <Size X="444.0000" Y="50.0000" />
                <Children>
                  <AbstractNodeData Name="NameInput" ActionTag="1111912820" Tag="58" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="20.0000" RightMargin="24.0000" TopMargin="-15.0000" BottomMargin="-15.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="400.0000" Y="80.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="20.0000" Y="25.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0450" Y="0.5000" />
                    <PreSize X="0.9009" Y="1.6000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="edx_Tel" ActionTag="-26083945" VisibleForFrame="False" Tag="249" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="10.0000" RightMargin="124.7595" TopMargin="10.0000" BottomMargin="10.0000" TouchEnable="True" FontSize="25" IsCustomSize="True" LabelText="" PlaceHolderText="请输入用户id" MaxLengthText="10" ctype="TextFieldObjectData">
                    <Size X="309.2405" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="164.6203" Y="25.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="72" G="93" B="101" />
                    <PrePosition X="0.3708" Y="0.5000" />
                    <PreSize X="0.6965" Y="0.6000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="402.9270" Y="58.6841" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4537" Y="0.1071" />
                <PreSize X="0.5000" Y="0.0912" />
                <FileData Type="PlistSubImage" Path="thb_search_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <BlendFunc Src="1" Dst="771" />
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
          <AbstractNodeData Name="tea_cell_black_mode" ActionTag="-545781776" Tag="272" IconVisible="False" LeftMargin="51.0400" RightMargin="409.9600" TopMargin="839.4415" BottomMargin="-199.4415" TouchEnable="True" ClipAble="False" BackColorAlpha="66" ColorAngle="90.0000" Scale9Enable="True" LeftEage="94" RightEage="94" TopEage="30" BottomEage="30" Scale9OriginX="94" Scale9OriginY="30" Scale9Width="648" Scale9Height="20" ctype="PanelObjectData">
            <Size X="819.0000" Y="80.0000" />
            <Children>
              <AbstractNodeData Name="bg-head" ActionTag="-937657583" Tag="274" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="17.0000" RightMargin="734.0000" TopMargin="6.0000" BottomMargin="6.0000" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="28" Scale9Height="28" ctype="ImageViewObjectData">
                <Size X="68.0000" Y="68.0000" />
                <Children>
                  <AbstractNodeData Name="sp_head" ActionTag="1798114264" Tag="172" IconVisible="False" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="21" RightEage="21" TopEage="21" BottomEage="21" Scale9OriginX="21" Scale9OriginY="21" Scale9Width="22" Scale9Height="22" ctype="ImageViewObjectData">
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
                <Position X="51.0000" Y="40.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0623" Y="0.5000" />
                <PreSize X="0.0830" Y="0.8500" />
                <FileData Type="PlistSubImage" Path="thb_head_bg.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_name" ActionTag="967052377" Tag="275" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="96.9561" RightMargin="482.0439" TopMargin="7.2880" BottomMargin="46.7120" IsCustomSize="True" FontSize="26" LabelText="玩家名称" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="240.0000" Y="26.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="96.9561" Y="59.7120" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="118" G="64" B="28" />
                <PrePosition X="0.1184" Y="0.7464" />
                <PreSize X="0.2930" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_id" ActionTag="-944506102" Tag="278" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="97.4617" RightMargin="481.5383" TopMargin="43.1220" BottomMargin="10.8780" IsCustomSize="True" FontSize="26" LabelText="ID:0123456" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="240.0000" Y="26.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="97.4617" Y="23.8780" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="118" G="64" B="28" />
                <PrePosition X="0.1190" Y="0.2985" />
                <PreSize X="0.2930" Y="0.3250" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_time" ActionTag="-1751348382" Tag="279" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="BottomEdge" LeftMargin="267.3489" RightMargin="217.5471" TopMargin="22.6092" BottomMargin="22.3908" IsCustomSize="True" FontSize="26" LabelText="加入:2018/00/00" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="334.1040" Y="35.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="267.3489" Y="39.8908" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="118" G="64" B="28" />
                <PrePosition X="0.3264" Y="0.4986" />
                <PreSize X="0.4079" Y="0.4375" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_remove" ActionTag="291650780" Tag="280" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="RightEdge" LeftMargin="664.0000" RightMargin="33.0000" TopMargin="15.5000" BottomMargin="15.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="122.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="725.0000" Y="40.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8852" Y="0.5000" />
                <PreSize X="0.1490" Y="0.6125" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="thb_btn_remove_deep.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <PressedFileData Type="PlistSubImage" Path="thb_btn_remove_deep.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
                <NormalFileData Type="PlistSubImage" Path="thb_btn_remove.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
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
            <FileData Type="PlistSubImage" Path="cellBg1.png" Plist="lobby/TeaHouse/TH_BlackListPanel/TeaHouse_new_BlackList.plist" />
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