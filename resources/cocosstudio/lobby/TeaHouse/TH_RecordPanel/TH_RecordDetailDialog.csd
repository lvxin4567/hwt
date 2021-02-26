<GameFile>
  <PropertyGroup Name="TH_RecordDetailDialog" Type="Layer" ID="650fc35b-2efb-40e4-bb16-61fa00c4e994" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="166" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="1766352262" Tag="808" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="-1833099137" Tag="802" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="40.0000" RightMargin="40.0000" TopMargin="43.5000" BottomMargin="16.5000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="480" Scale9Height="266" ctype="PanelObjectData">
            <Size X="1200.0000" Y="660.0000" />
            <Children>
              <AbstractNodeData Name="Title" ActionTag="533353822" Tag="803" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="476.0000" RightMargin="476.0000" TopMargin="-6.5050" BottomMargin="593.5050" ctype="SpriteObjectData">
                <Size X="248.0000" Y="73.0000" />
                <Children>
                  <AbstractNodeData Name="label" ActionTag="218920637" Tag="804" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.0000" RightMargin="55.0000" TopMargin="14.8500" BottomMargin="22.1500" LabelText="战绩详情" ctype="TextBMFontObjectData">
                    <Size X="138.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="124.0000" Y="40.1500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5500" />
                    <PreSize X="0.5565" Y="0.4932" />
                    <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.dialog_title.fnt" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="600.0000" Y="630.0050" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9546" />
                <PreSize X="0.2067" Y="0.1106" />
                <FileData Type="Normal" Path="common/bgs/dialogTitleBg.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="lb_gamename" ActionTag="-1194496411" Tag="580" IconVisible="False" LeftMargin="29.0000" RightMargin="771.0000" TopMargin="26.0000" BottomMargin="610.0000" IsCustomSize="True" FontSize="24" LabelText="仙桃千分必打（20楼）房号：888888" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="400.0000" Y="24.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="29.0000" Y="622.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="204" G="147" B="107" />
                <PrePosition X="0.0242" Y="0.9424" />
                <PreSize X="0.3333" Y="0.0364" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_copy_allrecord" ActionTag="1142518625" Tag="578" IconVisible="False" LeftMargin="872.9982" RightMargin="205.0018" TopMargin="19.4506" BottomMargin="591.5494" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="122.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="933.9982" Y="616.0494" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7783" Y="0.9334" />
                <PreSize X="0.1017" Y="0.0742" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="TH_newRecord_btn7.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <PressedFileData Type="PlistSubImage" Path="TH_newRecord_btn6.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <NormalFileData Type="PlistSubImage" Path="TH_newRecord_btn6.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_share_image" ActionTag="-1112347081" Tag="579" IconVisible="False" LeftMargin="1022.4382" RightMargin="55.5618" TopMargin="19.4539" BottomMargin="591.5461" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="122.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1083.4382" Y="616.0461" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9029" Y="0.9334" />
                <PreSize X="0.1017" Y="0.0742" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="btn_threco_shareImg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                <PressedFileData Type="PlistSubImage" Path="btn_threco_shareImg_deep.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                <NormalFileData Type="PlistSubImage" Path="btn_threco_shareImg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_close" ActionTag="1230912888" Tag="805" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="1154.5000" RightMargin="-10.5000" TopMargin="-22.0000" BottomMargin="624.0000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="56.0000" Y="58.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1182.5000" Y="653.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9854" Y="0.9894" />
                <PreSize X="0.0467" Y="0.0879" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="recordsum" ActionTag="-318208821" Tag="533" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="35.0000" RightMargin="35.0000" TopMargin="96.6400" BottomMargin="438.3600" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="1130.0000" Y="125.0000" />
                <Children>
                  <AbstractNodeData Name="player" ActionTag="1584547618" Tag="497" IconVisible="False" RightMargin="913.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="71" RightEage="71" TopEage="36" BottomEage="36" Scale9OriginX="71" Scale9OriginY="36" Scale9Width="75" Scale9Height="38" ctype="PanelObjectData">
                    <Size X="217.0000" Y="125.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="15836988" Tag="502" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="11.0000" RightMargin="152.0000" TopMargin="8.3173" BottomMargin="62.6827" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-872355648" Tag="506" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="38.0000" Y="89.6827" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1751" Y="0.7175" />
                        <PreSize X="0.2488" Y="0.4320" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uname" ActionTag="-1188817231" Tag="503" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="17.0000" TopMargin="9.0295" BottomMargin="93.9705" FontSize="22" LabelText="玩家名称六字" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="132.0000" Y="22.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="104.9705" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.8398" />
                        <PreSize X="0.6083" Y="0.1760" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uid" ActionTag="-347129778" Tag="504" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="29.0000" TopMargin="38.0000" BottomMargin="67.0000" FontSize="20" LabelText="ID:123456789" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="120.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="77.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.6160" />
                        <PreSize X="0.5530" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_upartner" ActionTag="1514683668" Tag="561" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="30.0000" RightMargin="1.0407" TopMargin="65.0000" BottomMargin="40.0000" IsCustomSize="True" FontSize="18" LabelText="88888888/啊啊啊啊啊" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="185.9593" Y="20.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_20" ActionTag="1456634582" Tag="301" IconVisible="False" LeftMargin="-19.5554" RightMargin="183.5146" TopMargin="-1.4295" BottomMargin="-0.5705" LeftEage="7" RightEage="7" TopEage="7" BottomEage="7" Scale9OriginX="7" Scale9OriginY="7" Scale9Width="8" Scale9Height="8" ctype="ImageViewObjectData">
                            <Size X="22.0000" Y="22.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="-8.5554" Y="10.4295" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="-0.0460" Y="0.5215" />
                            <PreSize X="0.1183" Y="1.1000" />
                            <FileData Type="Normal" Path="lobby/TeaHouse/TH_RecordPanel/rddTeam.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="122.9796" Y="50.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.5667" Y="0.4000" />
                        <PreSize X="0.8570" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_score" ActionTag="-1659646068" Tag="505" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="20.5000" RightMargin="20.5000" TopMargin="90.5941" BottomMargin="1.4059" FontSize="32" LabelText="+1234567889" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="176.0000" Y="33.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="108.5000" Y="17.9059" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.5000" Y="0.1432" />
                        <PreSize X="0.8111" Y="0.2640" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="0.1920" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="bg_threco_1.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="player1" ActionTag="1253646243" Tag="562" IconVisible="False" LeftMargin="227.0000" RightMargin="686.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="71" RightEage="71" TopEage="36" BottomEage="36" Scale9OriginX="71" Scale9OriginY="36" Scale9Width="75" Scale9Height="38" ctype="PanelObjectData">
                    <Size X="217.0000" Y="125.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="923247110" Tag="563" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="11.0000" RightMargin="152.0000" TopMargin="8.3173" BottomMargin="62.6827" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="1616910969" Tag="564" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="38.0000" Y="89.6827" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1751" Y="0.7175" />
                        <PreSize X="0.2488" Y="0.4320" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uname" ActionTag="-1446767632" Tag="565" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="17.0000" TopMargin="9.0295" BottomMargin="93.9705" FontSize="22" LabelText="玩家名称六字" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="132.0000" Y="22.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="104.9705" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.8398" />
                        <PreSize X="0.6083" Y="0.1760" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uid" ActionTag="1341640440" Tag="566" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="29.0000" TopMargin="38.0000" BottomMargin="67.0000" FontSize="20" LabelText="ID:123456789" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="120.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="77.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.6160" />
                        <PreSize X="0.5530" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_upartner" ActionTag="644387308" Tag="567" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="30.0000" RightMargin="0.4613" TopMargin="65.0000" BottomMargin="40.0000" IsCustomSize="True" FontSize="18" LabelText="归属:队长111111" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="186.5387" Y="20.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_20_0" ActionTag="1877682521" Tag="302" IconVisible="False" LeftMargin="-19.7398" RightMargin="184.2785" TopMargin="-1.0214" BottomMargin="-0.9786" LeftEage="7" RightEage="7" TopEage="7" BottomEage="7" Scale9OriginX="7" Scale9OriginY="7" Scale9Width="8" Scale9Height="8" ctype="ImageViewObjectData">
                            <Size X="22.0000" Y="22.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="-8.7398" Y="10.0214" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="-0.0469" Y="0.5011" />
                            <PreSize X="0.1179" Y="1.1000" />
                            <FileData Type="Normal" Path="lobby/TeaHouse/TH_RecordPanel/rddTeam.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="123.2694" Y="50.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.5681" Y="0.4000" />
                        <PreSize X="0.8596" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_score" ActionTag="1570141464" Tag="568" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="20.5000" RightMargin="20.5000" TopMargin="90.5941" BottomMargin="1.4059" FontSize="32" LabelText="+1234567889" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="176.0000" Y="33.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="108.5000" Y="17.9059" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.5000" Y="0.1432" />
                        <PreSize X="0.8111" Y="0.2640" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="227.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2009" />
                    <PreSize X="0.1920" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="bg_threco_1.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="player2" ActionTag="1477202788" Tag="569" IconVisible="False" LeftMargin="454.0000" RightMargin="459.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="71" RightEage="71" TopEage="36" BottomEage="36" Scale9OriginX="71" Scale9OriginY="36" Scale9Width="75" Scale9Height="38" ctype="PanelObjectData">
                    <Size X="217.0000" Y="125.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="1599169091" Tag="570" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="11.0000" RightMargin="152.0000" TopMargin="8.3173" BottomMargin="62.6827" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-1170518263" Tag="571" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="38.0000" Y="89.6827" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1751" Y="0.7175" />
                        <PreSize X="0.2488" Y="0.4320" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uname" ActionTag="-710809305" Tag="572" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="17.0000" TopMargin="9.0295" BottomMargin="93.9705" FontSize="22" LabelText="玩家名称六字" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="132.0000" Y="22.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="104.9705" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.8398" />
                        <PreSize X="0.6083" Y="0.1760" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uid" ActionTag="-1599013502" Tag="573" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="29.0000" TopMargin="38.0000" BottomMargin="67.0000" FontSize="20" LabelText="ID:123456789" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="120.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="77.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.6160" />
                        <PreSize X="0.5530" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_upartner" ActionTag="-1933116569" Tag="574" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="30.0000" RightMargin="2.2098" TopMargin="65.0000" BottomMargin="40.0000" IsCustomSize="True" FontSize="18" LabelText="归属:队长111111" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="184.7902" Y="20.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_20_0_0" ActionTag="-1703319070" Tag="303" IconVisible="False" LeftMargin="-20.2903" RightMargin="183.0805" TopMargin="-2.3898" BottomMargin="0.3898" LeftEage="7" RightEage="7" TopEage="7" BottomEage="7" Scale9OriginX="7" Scale9OriginY="7" Scale9Width="8" Scale9Height="8" ctype="ImageViewObjectData">
                            <Size X="22.0000" Y="22.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="-9.2903" Y="11.3898" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="-0.0503" Y="0.5695" />
                            <PreSize X="0.1191" Y="1.1000" />
                            <FileData Type="Normal" Path="lobby/TeaHouse/TH_RecordPanel/rddTeam.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="122.3951" Y="50.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.5640" Y="0.4000" />
                        <PreSize X="0.8516" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_score" ActionTag="-2087485772" Tag="575" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="20.5000" RightMargin="20.5000" TopMargin="90.5941" BottomMargin="1.4059" FontSize="32" LabelText="+1234567889" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="176.0000" Y="33.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="108.5000" Y="17.9059" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.5000" Y="0.1432" />
                        <PreSize X="0.8111" Y="0.2640" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="454.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4018" />
                    <PreSize X="0.1920" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="bg_threco_1.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="player3" ActionTag="-15870335" Tag="576" IconVisible="False" LeftMargin="681.0000" RightMargin="232.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="71" RightEage="71" TopEage="36" BottomEage="36" Scale9OriginX="71" Scale9OriginY="36" Scale9Width="75" Scale9Height="38" ctype="PanelObjectData">
                    <Size X="217.0000" Y="125.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="-53185220" Tag="577" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="11.0000" RightMargin="152.0000" TopMargin="8.3173" BottomMargin="62.6827" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="595419272" Tag="578" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="38.0000" Y="89.6827" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1751" Y="0.7175" />
                        <PreSize X="0.2488" Y="0.4320" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uname" ActionTag="1119025411" Tag="579" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="17.0000" TopMargin="9.0295" BottomMargin="93.9705" FontSize="22" LabelText="玩家名称六字" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="132.0000" Y="22.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="104.9705" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.8398" />
                        <PreSize X="0.6083" Y="0.1760" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uid" ActionTag="-2008726762" Tag="580" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="29.0000" TopMargin="38.0000" BottomMargin="67.0000" FontSize="20" LabelText="ID:123456789" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="120.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="77.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.6160" />
                        <PreSize X="0.5530" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_upartner" ActionTag="-159760763" Tag="581" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="29.9422" RightMargin="2.0316" TopMargin="66.4594" BottomMargin="38.5406" IsCustomSize="True" FontSize="18" LabelText="归属:队长111111" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="185.0262" Y="20.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_20_0_0_0" ActionTag="1316631796" Tag="304" IconVisible="False" LeftMargin="-18.8729" RightMargin="181.8991" TopMargin="-1.5150" BottomMargin="-0.4850" LeftEage="7" RightEage="7" TopEage="7" BottomEage="7" Scale9OriginX="7" Scale9OriginY="7" Scale9Width="8" Scale9Height="8" ctype="ImageViewObjectData">
                            <Size X="22.0000" Y="22.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="-7.8729" Y="10.5150" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="-0.0426" Y="0.5258" />
                            <PreSize X="0.1189" Y="1.1000" />
                            <FileData Type="Normal" Path="lobby/TeaHouse/TH_RecordPanel/rddTeam.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="122.4553" Y="48.5406" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.5643" Y="0.3883" />
                        <PreSize X="0.8527" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_score" ActionTag="-24248380" Tag="582" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="20.5000" RightMargin="20.5000" TopMargin="90.5941" BottomMargin="1.4059" FontSize="32" LabelText="+1234567889" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="176.0000" Y="33.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="108.5000" Y="17.9059" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.5000" Y="0.1432" />
                        <PreSize X="0.8111" Y="0.2640" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="681.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.6027" />
                    <PreSize X="0.1920" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="bg_threco_1.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="player4" ActionTag="70296510" Tag="583" IconVisible="False" LeftMargin="908.0000" RightMargin="5.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="71" RightEage="71" TopEage="36" BottomEage="36" Scale9OriginX="71" Scale9OriginY="36" Scale9Width="75" Scale9Height="38" ctype="PanelObjectData">
                    <Size X="217.0000" Y="125.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="1164416282" Tag="584" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="11.0000" RightMargin="152.0000" TopMargin="8.3173" BottomMargin="62.6827" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-1367719563" Tag="585" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="38.0000" Y="89.6827" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1751" Y="0.7175" />
                        <PreSize X="0.2488" Y="0.4320" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uname" ActionTag="-2129580900" Tag="586" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="17.0000" TopMargin="9.0295" BottomMargin="93.9705" FontSize="22" LabelText="玩家名称六字" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="132.0000" Y="22.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="104.9705" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.8398" />
                        <PreSize X="0.6083" Y="0.1760" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_uid" ActionTag="-1669794540" Tag="587" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="68.0000" RightMargin="29.0000" TopMargin="38.0000" BottomMargin="67.0000" FontSize="20" LabelText="ID:123456789" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="120.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="68.0000" Y="77.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.3134" Y="0.6160" />
                        <PreSize X="0.5530" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_upartner" ActionTag="-1181473544" Tag="588" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="30.0000" RightMargin="1.5856" TopMargin="65.0000" BottomMargin="40.0000" IsCustomSize="True" FontSize="18" LabelText="归属:队长111111" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="185.4144" Y="20.0000" />
                        <Children>
                          <AbstractNodeData Name="Image_20_0_0_0_0" ActionTag="-1286212314" Tag="305" IconVisible="False" LeftMargin="-19.6854" RightMargin="183.0999" TopMargin="-2.1675" BottomMargin="0.1675" LeftEage="7" RightEage="7" TopEage="7" BottomEage="7" Scale9OriginX="7" Scale9OriginY="7" Scale9Width="8" Scale9Height="8" ctype="ImageViewObjectData">
                            <Size X="22.0000" Y="22.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="-8.6854" Y="11.1675" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="-0.0468" Y="0.5584" />
                            <PreSize X="0.1187" Y="1.1000" />
                            <FileData Type="Normal" Path="lobby/TeaHouse/TH_RecordPanel/rddTeam.png" Plist="" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="30.0000" Y="50.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="181" G="129" B="79" />
                        <PrePosition X="0.1382" Y="0.4000" />
                        <PreSize X="0.8544" Y="0.1600" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="lb_score" ActionTag="928446784" Tag="589" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="BottomEdge" LeftMargin="20.5000" RightMargin="20.5000" TopMargin="90.5941" BottomMargin="1.4059" FontSize="32" LabelText="+1234567889" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="176.0000" Y="33.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="108.5000" Y="17.9059" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.5000" Y="0.1432" />
                        <PreSize X="0.8111" Y="0.2640" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position X="908.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8035" />
                    <PreSize X="0.1920" Y="1.0000" />
                    <FileData Type="PlistSubImage" Path="bg_threco_1.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="600.0000" Y="438.3600" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.6642" />
                <PreSize X="0.9417" Y="0.1894" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="memberlist" ActionTag="-281620131" Tag="806" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="35.0000" RightMargin="35.0000" TopMargin="218.6421" BottomMargin="24.3579" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="1130.0000" Y="417.0000" />
                <Children>
                  <AbstractNodeData Name="content" ActionTag="-951462587" Tag="807" IconVisible="False" PositionPercentXEnabled="True" TopMargin="12.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                    <Size X="1130.0000" Y="405.0000" />
                    <AnchorPoint ScaleX="0.5000" />
                    <Position X="565.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" />
                    <PreSize X="1.0000" Y="0.9712" />
                    <SingleColor A="255" R="255" G="150" B="100" />
                    <FirstColor A="255" R="255" G="150" B="100" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                    <InnerNodeSize Width="1130" Height="405" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="600.0000" Y="441.3579" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.6687" />
                <PreSize X="0.9417" Y="0.6318" />
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
            <PreSize X="0.9375" Y="0.9167" />
            <FileData Type="Normal" Path="common/bgs/Bg888548.png" Plist="" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="th_record_detail_cell" ActionTag="-536477060" Tag="16" IconVisible="False" LeftMargin="66.4633" RightMargin="99.5367" TopMargin="785.2562" BottomMargin="-191.2562" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="66" RightEage="66" TopEage="41" BottomEage="41" Scale9OriginX="66" Scale9OriginY="41" Scale9Width="68" Scale9Height="44" ctype="PanelObjectData">
            <Size X="1114.0000" Y="126.0000" />
            <Children>
              <AbstractNodeData Name="label_seq" ActionTag="-1096177063" Tag="92" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="11.1400" RightMargin="982.8600" TopMargin="8.1600" BottomMargin="93.8400" FontSize="24" LabelText="第100000局" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="120.0000" Y="24.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="11.1400" Y="105.8400" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="176" G="128" B="92" />
                <PrePosition X="0.0100" Y="0.8400" />
                <PreSize X="0.1077" Y="0.1905" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_28" ActionTag="-1153707908" Tag="555" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="715.0000" RightMargin="289.0000" TopMargin="9.1600" BottomMargin="94.8400" FontSize="22" LabelText="对局时间：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="110.0000" Y="22.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="770.0000" Y="105.8400" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="176" G="128" B="92" />
                <PrePosition X="0.6912" Y="0.8400" />
                <PreSize X="0.0987" Y="0.1746" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_time" ActionTag="1299751217" Tag="93" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="830.0000" RightMargin="-1.0000" TopMargin="9.1600" BottomMargin="94.8400" IsCustomSize="True" FontSize="22" LabelText="2018-03-04 666:666:666" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="285.0000" Y="22.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="830.0000" Y="105.8400" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="176" G="128" B="92" />
                <PrePosition X="0.7451" Y="0.8400" />
                <PreSize X="0.2558" Y="0.1746" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_record" ActionTag="311044630" Tag="95" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="871.7693" RightMargin="130.2307" TopMargin="61.6599" BottomMargin="15.3401" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="82" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="112.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="927.7693" Y="39.8401" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8328" Y="0.3162" />
                <PreSize X="0.1005" Y="0.3889" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="TH_newRecord_btn9.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <NormalFileData Type="PlistSubImage" Path="TH_newRecord_btn8.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_share" ActionTag="-1544418362" Tag="94" IconVisible="False" HorizontalEdge="RightEdge" LeftMargin="992.5818" RightMargin="9.4182" TopMargin="61.0476" BottomMargin="15.9524" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="82" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="112.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1048.5818" Y="40.4524" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9413" Y="0.3211" />
                <PreSize X="0.1005" Y="0.3889" />
                <TextColor A="255" R="65" G="65" B="70" />
                <PressedFileData Type="PlistSubImage" Path="TH_newRecord_btn3.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <NormalFileData Type="PlistSubImage" Path="TH_newRecord_btn2.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="layout_players" ActionTag="122808032" Tag="96" IconVisible="False" PositionPercentYEnabled="True" HorizontalEdge="LeftEdge" LeftMargin="10.0000" RightMargin="264.0000" TopMargin="60.7590" BottomMargin="11.2410" TouchEnable="True" ClipAble="False" BackColorAlpha="0" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="840.0000" Y="54.0000" />
                <Children>
                  <AbstractNodeData Name="layout_player0" ActionTag="1967983754" Tag="520" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="690.0000" TopMargin="-3.4776" BottomMargin="3.4776" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="150.0000" Y="54.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="317606801" Tag="556" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="1.9869" RightMargin="94.0131" TopMargin="-1.4904" BottomMargin="1.4904" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="21470273" Tag="557" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="1.9869" Y="28.4904" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0132" Y="0.5276" />
                        <PreSize X="0.3600" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uname" ActionTag="-1815998890" Tag="523" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="57.0001" RightMargin="-3.0001" TopMargin="-1.0000" BottomMargin="31.0000" FontSize="24" LabelText="小新小新" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="96.0000" Y="24.0000" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="57.0001" Y="55.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="215" G="163" B="128" />
                        <PrePosition X="0.3800" Y="1.0185" />
                        <PreSize X="0.6400" Y="0.4444" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uscore" ActionTag="1983008670" Tag="524" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="55.0000" RightMargin="-17.0000" TopMargin="24.0000" BottomMargin="2.0000" FontSize="28" LabelText="+2222222" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="112.0000" Y="28.0000" />
                        <AnchorPoint />
                        <Position X="55.0000" Y="2.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.3667" Y="0.0370" />
                        <PreSize X="0.7467" Y="0.5185" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position Y="30.4776" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.5644" />
                    <PreSize X="0.1786" Y="1.0000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="layout_player1" ActionTag="373864583" Tag="595" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="172.9560" RightMargin="517.0440" TopMargin="-3.4776" BottomMargin="3.4776" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="150.0000" Y="54.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="1591345829" Tag="596" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="1.9869" RightMargin="94.0131" TopMargin="-1.4904" BottomMargin="1.4904" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-412386833" Tag="597" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="1.9869" Y="28.4904" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0132" Y="0.5276" />
                        <PreSize X="0.3600" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uname" ActionTag="1175233501" Tag="598" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="57.0001" RightMargin="-3.0001" TopMargin="-1.0000" BottomMargin="31.0000" FontSize="24" LabelText="小新小新" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="96.0000" Y="24.0000" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="57.0001" Y="55.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="215" G="163" B="128" />
                        <PrePosition X="0.3800" Y="1.0185" />
                        <PreSize X="0.6400" Y="0.4444" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uscore" ActionTag="-1580477051" Tag="599" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="55.0000" RightMargin="-17.0000" TopMargin="24.0000" BottomMargin="2.0000" FontSize="28" LabelText="+2222222" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="112.0000" Y="28.0000" />
                        <AnchorPoint />
                        <Position X="55.0000" Y="2.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.3667" Y="0.0370" />
                        <PreSize X="0.7467" Y="0.5185" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="172.9560" Y="30.4776" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2059" Y="0.5644" />
                    <PreSize X="0.1786" Y="1.0000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="layout_player2" ActionTag="-2495499" Tag="600" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="345.9960" RightMargin="344.0040" TopMargin="-3.4776" BottomMargin="3.4776" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="150.0000" Y="54.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="-2028399705" Tag="601" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="1.9869" RightMargin="94.0131" TopMargin="-1.4904" BottomMargin="1.4904" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-247095900" Tag="602" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="1.9869" Y="28.4904" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0132" Y="0.5276" />
                        <PreSize X="0.3600" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uname" ActionTag="177417092" Tag="603" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="57.0001" RightMargin="-3.0001" TopMargin="-1.0000" BottomMargin="31.0000" FontSize="24" LabelText="小新小新" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="96.0000" Y="24.0000" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="57.0001" Y="55.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="215" G="163" B="128" />
                        <PrePosition X="0.3800" Y="1.0185" />
                        <PreSize X="0.6400" Y="0.4444" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uscore" ActionTag="-146921779" Tag="604" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="55.0000" RightMargin="-17.0000" TopMargin="24.0000" BottomMargin="2.0000" FontSize="28" LabelText="+2222222" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="112.0000" Y="28.0000" />
                        <AnchorPoint />
                        <Position X="55.0000" Y="2.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.3667" Y="0.0370" />
                        <PreSize X="0.7467" Y="0.5185" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="345.9960" Y="30.4776" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4119" Y="0.5644" />
                    <PreSize X="0.1786" Y="1.0000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="layout_player3" ActionTag="966271347" Tag="605" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="518.9520" RightMargin="171.0480" TopMargin="-3.4776" BottomMargin="3.4776" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="150.0000" Y="54.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="1447313468" Tag="606" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="1.9869" RightMargin="94.0131" TopMargin="-1.4904" BottomMargin="1.4904" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-1615831657" Tag="607" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="1.9869" Y="28.4904" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0132" Y="0.5276" />
                        <PreSize X="0.3600" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uname" ActionTag="1338899102" Tag="608" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="57.0001" RightMargin="-3.0001" TopMargin="-1.0000" BottomMargin="31.0000" FontSize="24" LabelText="小新小新" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="96.0000" Y="24.0000" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="57.0001" Y="55.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="215" G="163" B="128" />
                        <PrePosition X="0.3800" Y="1.0185" />
                        <PreSize X="0.6400" Y="0.4444" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uscore" ActionTag="-1679932490" Tag="609" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="55.0000" RightMargin="-17.0000" TopMargin="24.0000" BottomMargin="2.0000" FontSize="28" LabelText="+2222222" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="112.0000" Y="28.0000" />
                        <AnchorPoint />
                        <Position X="55.0000" Y="2.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.3667" Y="0.0370" />
                        <PreSize X="0.7467" Y="0.5185" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="518.9520" Y="30.4776" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.6178" Y="0.5644" />
                    <PreSize X="0.1786" Y="1.0000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="layout_player4" ActionTag="-1025663812" Tag="610" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="691.9920" RightMargin="-1.9920" TopMargin="-3.4776" BottomMargin="3.4776" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                    <Size X="150.0000" Y="54.0000" />
                    <Children>
                      <AbstractNodeData Name="headbg" ActionTag="353595541" Tag="611" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="1.9869" RightMargin="94.0131" TopMargin="-1.4904" BottomMargin="1.4904" LeftEage="17" RightEage="17" TopEage="17" BottomEage="17" Scale9OriginX="17" Scale9OriginY="17" Scale9Width="20" Scale9Height="20" ctype="ImageViewObjectData">
                        <Size X="54.0000" Y="54.0000" />
                        <Children>
                          <AbstractNodeData Name="head" ActionTag="-760676775" Tag="612" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="2.0000" RightMargin="2.0000" TopMargin="2.0000" BottomMargin="2.0000" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                            <Size X="50.0000" Y="50.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="27.0000" Y="27.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="0.9259" Y="0.9259" />
                            <FileData Type="PlistSubImage" Path="img_threco_head.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="1.9869" Y="28.4904" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0132" Y="0.5276" />
                        <PreSize X="0.3600" Y="1.0000" />
                        <FileData Type="PlistSubImage" Path="bg_threco_headbg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_RecordDetailDialog.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uname" ActionTag="85900059" Tag="613" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="57.0001" RightMargin="-3.0001" TopMargin="-1.0000" BottomMargin="31.0000" FontSize="24" LabelText="小新小新" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="96.0000" Y="24.0000" />
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="57.0001" Y="55.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="215" G="163" B="128" />
                        <PrePosition X="0.3800" Y="1.0185" />
                        <PreSize X="0.6400" Y="0.4444" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="label_uscore" ActionTag="1693091653" Tag="614" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="55.0000" RightMargin="-17.0000" TopMargin="24.0000" BottomMargin="2.0000" FontSize="28" LabelText="+2222222" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="112.0000" Y="28.0000" />
                        <AnchorPoint />
                        <Position X="55.0000" Y="2.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="73" B="37" />
                        <PrePosition X="0.3667" Y="0.0370" />
                        <PreSize X="0.7467" Y="0.5185" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="691.9920" Y="30.4776" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8238" Y="0.5644" />
                    <PreSize X="0.1786" Y="1.0000" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="430.0000" Y="38.2410" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3860" Y="0.3035" />
                <PreSize X="0.7540" Y="0.4286" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position X="66.4633" Y="-191.2562" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0519" Y="-0.2656" />
            <PreSize X="0.8703" Y="0.1750" />
            <FileData Type="PlistSubImage" Path="TH_newRecord_detailplaybg.png" Plist="lobby/TeaHouse/TH_RecordPanel/TH_newRecord_merge.plist" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="lySharePic" ActionTag="844857689" VisibleForFrame="False" Tag="712" RotationSkewX="270.0000" RotationSkewY="270.0000" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="540.0000" RightMargin="540.0000" TopMargin="260.0000" BottomMargin="260.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" LeftEage="237" RightEage="237" TopEage="422" BottomEage="422" Scale9OriginX="237" Scale9OriginY="422" Scale9Width="246" Scale9Height="436" ctype="PanelObjectData">
            <Size X="200.0000" Y="200.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.1563" Y="0.2778" />
            <FileData Type="Normal" Path="lobby/RecordPanel/shareBg.png" Plist="" />
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