<GameFile>
  <PropertyGroup Name="SuggestionFeedbackPanel" Type="Layer" ID="e6eba6b1-e808-4e35-8b58-abe5b0666b9d" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="296" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="-2141401615" Tag="313" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="298957558" Tag="298" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="-204" Scale9OriginY="-141" Scale9Width="408" Scale9Height="282" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <Children>
              <AbstractNodeData Name="Bg" ActionTag="1263512570" Tag="299" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="280.0000" RightMargin="280.0000" TopMargin="130.0000" BottomMargin="130.0000" Scale9Enable="True" LeftEage="293" RightEage="293" TopEage="180" BottomEage="180" Scale9OriginX="293" Scale9OriginY="180" Scale9Width="302" Scale9Height="188" ctype="ImageViewObjectData">
                <Size X="720.0000" Y="460.0000" />
                <Children>
                  <AbstractNodeData Name="Title" ActionTag="-540950045" Tag="300" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="236.0000" RightMargin="236.0000" TopMargin="-6.5050" BottomMargin="393.5050" ctype="SpriteObjectData">
                    <Size X="248.0000" Y="73.0000" />
                    <Children>
                      <AbstractNodeData Name="label" ActionTag="419074727" Tag="301" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.0000" RightMargin="55.0000" TopMargin="14.8500" BottomMargin="22.1500" LabelText="你提我改" ctype="TextBMFontObjectData">
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
                    <Position X="360.0000" Y="430.0050" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.9348" />
                    <PreSize X="0.3444" Y="0.1587" />
                    <FileData Type="Normal" Path="common/bgs/dialogTitleBg.png" Plist="" />
                    <BlendFunc Src="1" Dst="771" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="suggestion_container" ActionTag="-1976053791" Tag="315" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="20.0000" RightMargin="20.0000" TopMargin="70.9243" BottomMargin="119.0757" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="0" ItemMargin="10" DirectionType="Vertical" HorizontalType="Align_HorizontalCenter" ctype="ListViewObjectData">
                    <Size X="680.0000" Y="270.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                    <Position X="360.0000" Y="389.0757" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.8458" />
                    <PreSize X="0.9444" Y="0.5870" />
                    <SingleColor A="255" R="150" G="150" B="255" />
                    <FirstColor A="255" R="150" G="150" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_close" ActionTag="1515960809" Tag="420" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="684.0000" RightMargin="-20.0000" TopMargin="-20.0000" BottomMargin="422.0000" TouchEnable="True" FontSize="37" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="56.0000" Y="58.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="712.0000" Y="451.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9889" Y="0.9804" />
                    <PreSize X="0.0778" Y="0.1261" />
                    <FontResource Type="Default" Path="" Plist="" />
                    <TextColor A="255" R="255" G="255" B="255" />
                    <PressedFileData Type="PlistSubImage" Path="common_btn_close_deep.png" Plist="common/bnts/common_new_btns.plist" />
                    <NormalFileData Type="PlistSubImage" Path="common_btn_close.png" Plist="common/bnts/common_new_btns.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="submit" ActionTag="-881854499" Tag="311" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="246.0000" RightMargin="246.0000" TopMargin="355.5000" BottomMargin="23.5000" TouchEnable="True" FontSize="37" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="59" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="228.0000" Y="81.0000" />
                    <Children>
                      <AbstractNodeData Name="label" ActionTag="-2135606464" Tag="312" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="79.0000" RightMargin="79.0000" TopMargin="18.9500" BottomMargin="27.0500" LabelText="返回" ctype="TextBMFontObjectData">
                        <Size X="70.0000" Y="35.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="114.0000" Y="44.5500" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.5500" />
                        <PreSize X="0.3070" Y="0.4321" />
                        <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.green_font.fnt" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="360.0000" Y="64.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.1391" />
                    <PreSize X="0.3167" Y="0.1761" />
                    <FontResource Type="Default" Path="" Plist="" />
                    <TextColor A="255" R="255" G="255" B="255" />
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
                <PreSize X="0.5625" Y="0.6389" />
                <FileData Type="Normal" Path="common/bgs/bg888548_1.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="feedback_item" ActionTag="1012160347" Tag="297" IconVisible="False" LeftMargin="-771.5789" RightMargin="1391.5789" TopMargin="413.2479" BottomMargin="206.7521" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="PanelObjectData">
            <Size X="660.0000" Y="100.0000" />
            <Children>
              <AbstractNodeData Name="container" ActionTag="-204585008" Tag="101" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="660.0000" Y="100.0000" />
                <Children>
                  <AbstractNodeData Name="Image_4" ActionTag="-2259853" Tag="409" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="13.9692" RightMargin="578.0308" TopMargin="16.0000" BottomMargin="16.0000" LeftEage="22" RightEage="22" TopEage="22" BottomEage="22" Scale9OriginX="22" Scale9OriginY="22" Scale9Width="24" Scale9Height="24" ctype="ImageViewObjectData">
                    <Size X="68.0000" Y="68.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="47.9692" Y="50.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0727" Y="0.5000" />
                    <PreSize X="0.1030" Y="0.6800" />
                    <FileData Type="PlistSubImage" Path="lobby_SuggestionPanel_iconbtn4.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="sugg_content" ActionTag="-1073940090" Tag="410" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="91.6100" RightMargin="160.3900" TopMargin="9.4493" BottomMargin="42.5507" IsCustomSize="True" FontSize="24" LabelText="Text Label中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="408.0000" Y="48.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="91.6100" Y="66.5507" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="217" G="123" B="85" />
                    <PrePosition X="0.1388" Y="0.6655" />
                    <PreSize X="0.6182" Y="0.4800" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="sugg_time" ActionTag="-1915292506" Tag="411" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="347.7222" RightMargin="162.2778" TopMargin="62.8655" BottomMargin="13.1345" IsCustomSize="True" FontSize="20" LabelText="1999-99-99" HorizontalAlignmentType="HT_Right" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                    <Position X="497.7222" Y="25.1345" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="211" G="162" B="129" />
                    <PrePosition X="0.7541" Y="0.2513" />
                    <PreSize X="0.2273" Y="0.2400" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_back" ActionTag="826843782" VisibleForFrame="False" Tag="413" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="521.0000" RightMargin="17.0000" TopMargin="25.5000" BottomMargin="25.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="122.0000" Y="49.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="582.0000" Y="50.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8818" Y="0.5000" />
                    <PreSize X="0.1848" Y="0.4900" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <PressedFileData Type="PlistSubImage" Path="lobby_SuggestionPanel_btn2_deep.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                    <NormalFileData Type="PlistSubImage" Path="lobby_SuggestionPanel_btn2.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_detail" ActionTag="1017897278" Tag="412" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="521.0212" RightMargin="16.9788" TopMargin="25.5000" BottomMargin="25.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="92" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="122.0000" Y="49.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="582.0212" Y="50.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8819" Y="0.5000" />
                    <PreSize X="0.1848" Y="0.4900" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <PressedFileData Type="PlistSubImage" Path="lobby_SuggestionPanel_btn1_deep.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                    <NormalFileData Type="PlistSubImage" Path="lobby_SuggestionPanel_btn1.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="330.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" />
                <PreSize X="1.0000" Y="1.0000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="detailcontainer" ActionTag="1700787235" VisibleForFrame="False" Tag="414" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TopMargin="-50.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="660.0000" Y="150.0000" />
                <Children>
                  <AbstractNodeData Name="content" ActionTag="-1755873319" Tag="415" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="15.0000" RightMargin="15.0000" TopMargin="6.0000" BottomMargin="16.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="33" RightEage="33" TopEage="41" BottomEage="41" Scale9OriginX="33" Scale9OriginY="41" Scale9Width="34" Scale9Height="45" ctype="PanelObjectData">
                    <Size X="630.0000" Y="128.0000" />
                    <Children>
                      <AbstractNodeData Name="Image_6" ActionTag="1544630469" Tag="418" IconVisible="False" LeftMargin="19.6964" RightMargin="560.3036" TopMargin="16.3527" BottomMargin="61.6473" LeftEage="16" RightEage="16" TopEage="16" BottomEage="16" Scale9OriginX="16" Scale9OriginY="16" Scale9Width="18" Scale9Height="18" ctype="ImageViewObjectData">
                        <Size X="50.0000" Y="50.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="44.6964" Y="86.6473" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0709" Y="0.6769" />
                        <PreSize X="0.0794" Y="0.3906" />
                        <FileData Type="PlistSubImage" Path="lobby_SuggestionPanel_iconbtn3.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="feed_container" ActionTag="-1480479489" Tag="121" IconVisible="False" LeftMargin="90.0000" RightMargin="20.0000" TopMargin="10.0000" BottomMargin="46.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                        <Size X="520.0000" Y="72.0000" />
                        <Children>
                          <AbstractNodeData Name="feedback" ActionTag="45516359" Tag="416" IconVisible="False" VerticalEdge="TopEdge" IsCustomSize="True" FontSize="24" LabelText="中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="520.0000" Y="72.0000" />
                            <AnchorPoint />
                            <Position />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="185" G="125" B="85" />
                            <PrePosition />
                            <PreSize X="1.0000" Y="1.0000" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint ScaleY="1.0000" />
                        <Position X="90.0000" Y="118.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1429" Y="0.9219" />
                        <PreSize X="0.8254" Y="0.5625" />
                        <SingleColor A="255" R="255" G="150" B="100" />
                        <FirstColor A="255" R="255" G="150" B="100" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                        <InnerNodeSize Width="520" Height="72" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="Text_6" ActionTag="285899853" Tag="419" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="321.8921" RightMargin="8.1079" TopMargin="103.0944" BottomMargin="4.9056" FontSize="20" LabelText="感谢您的反馈，斗棋有你更精彩！" HorizontalAlignmentType="HT_Right" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="300.0000" Y="20.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="471.8921" Y="14.9056" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="185" G="125" B="85" />
                        <PrePosition X="0.7490" Y="0.1165" />
                        <PreSize X="0.4762" Y="0.1563" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="330.0000" Y="80.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5333" />
                    <PreSize X="0.9545" Y="0.8533" />
                    <FileData Type="PlistSubImage" Path="lobby_SuggestionPanel_bg1.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" />
                <Position X="330.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" />
                <PreSize X="1.0000" Y="1.5000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position X="-441.5789" Y="306.7521" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="-0.3450" Y="0.4260" />
            <PreSize X="0.5156" Y="0.1389" />
            <FileData Type="PlistSubImage" Path="lobby_SuggestionPanel_bg3.png" Plist="lobby/SuggestionPanel/SuggestionPanel.plist" />
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