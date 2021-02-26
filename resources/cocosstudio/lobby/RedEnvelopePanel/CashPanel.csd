<GameFile>
  <PropertyGroup Name="CashPanel" Type="Layer" ID="a7b2bccf-adf3-4cd9-9f62-5ceb4516903e" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="14" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="maskbg" ActionTag="522484226" Tag="17" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="178" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
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
          <AbstractNodeData Name="contentPanel" ActionTag="151903384" Tag="15" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="330.0000" RightMargin="330.0000" TopMargin="145.0000" BottomMargin="145.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Enable="True" LeftEage="204" RightEage="204" TopEage="141" BottomEage="141" Scale9OriginX="204" Scale9OriginY="141" Scale9Width="218" Scale9Height="159" ctype="PanelObjectData">
            <Size X="620.0000" Y="430.0000" />
            <Children>
              <AbstractNodeData Name="talert_title_bg" ActionTag="-319323923" Tag="16" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="125.0000" RightMargin="125.0000" TopMargin="-3.0000" BottomMargin="369.0000" ctype="SpriteObjectData">
                <Size X="370.0000" Y="64.0000" />
                <Children>
                  <AbstractNodeData Name="titleLabel" ActionTag="-2064476212" Tag="154" IconVisible="False" LeftMargin="113.9507" RightMargin="113.0493" TopMargin="-9.0000" BottomMargin="13.0000" LabelText="放弃提现" ctype="TextBMFontObjectData">
                    <Size X="143.0000" Y="60.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="185.4507" Y="43.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5012" Y="0.6719" />
                    <PreSize X="0.3865" Y="0.9375" />
                    <LabelBMFontFile_CNB Type="Normal" Path="" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="310.0000" Y="401.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.9326" />
                <PreSize X="0.5968" Y="0.1488" />
                <FileData Type="Normal" Path="common/bgs/talert_title_bg.png" Plist="" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_close" ActionTag="1748727632" Tag="19" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" LeftMargin="571.5000" RightMargin="-18.5000" TopMargin="-24.5000" BottomMargin="385.5000" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="37" Scale9Height="47" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="67.0000" Y="69.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="605.0000" Y="420.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9758" Y="0.9767" />
                <PreSize X="0.1081" Y="0.1605" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="PlistSubImage" Path="RedEnvelope_btn_close_deep.png" Plist="lobby/RedEnvelopePanel/RedEnvelope.plist" />
                <PressedFileData Type="PlistSubImage" Path="RedEnvelope_btn_close_deep.png" Plist="lobby/RedEnvelopePanel/RedEnvelope.plist" />
                <NormalFileData Type="PlistSubImage" Path="RedEnvelope_btn_close.png" Plist="lobby/RedEnvelopePanel/RedEnvelope.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_1" ActionTag="-1331000124" Tag="64" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="135.0000" RightMargin="345.0000" TopMargin="181.0000" BottomMargin="221.0000" FontSize="28" LabelText="您确定放弃" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="140.0000" Y="28.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="135.0000" Y="235.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="136" G="84" B="51" />
                <PrePosition X="0.2177" Y="0.5465" />
                <PreSize X="0.2258" Y="0.0651" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_num" ActionTag="-162835957" Tag="65" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="280.0000" RightMargin="268.0000" TopMargin="177.0000" BottomMargin="217.0000" FontSize="36" LabelText="0.30" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="72.0000" Y="36.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="280.0000" Y="235.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="227" G="65" B="15" />
                <PrePosition X="0.4516" Y="0.5465" />
                <PreSize X="0.1161" Y="0.0837" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_2" ActionTag="-1503494976" Tag="66" IconVisible="False" VerticalEdge="TopEdge" LeftMargin="355.0000" RightMargin="139.0000" TopMargin="181.0000" BottomMargin="221.0000" FontSize="28" LabelText="元提现嘛?" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="126.0000" Y="28.0000" />
                <AnchorPoint ScaleY="0.5000" />
                <Position X="355.0000" Y="235.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="136" G="84" B="51" />
                <PrePosition X="0.5726" Y="0.5465" />
                <PreSize X="0.2032" Y="0.0651" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_3" ActionTag="-73387571" Tag="25" IconVisible="False" PositionPercentXEnabled="True" VerticalEdge="TopEdge" LeftMargin="175.0000" RightMargin="175.0000" TopMargin="231.0000" BottomMargin="181.0000" FontSize="18" LabelText="注:确认放弃后,将不再有提现机会" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="270.0000" Y="18.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="310.0000" Y="190.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="177" G="141" B="101" />
                <PrePosition X="0.5000" Y="0.4419" />
                <PreSize X="0.4355" Y="0.0419" />
                <FontResource Type="Default" Path="" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="btnPanel" ActionTag="1575152668" Tag="20" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="BottomEdge" LeftMargin="75.0000" RightMargin="75.0000" TopMargin="317.2147" BottomMargin="30.9990" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="470.0000" Y="81.7863" />
                <Children>
                  <AbstractNodeData Name="btn_cancel" ActionTag="1638367212" Tag="21" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="-14.0000" RightMargin="256.0000" TopMargin="-0.6068" BottomMargin="-0.6068" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="61" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="228.0000" Y="83.0000" />
                    <Children>
                      <AbstractNodeData Name="label" ActionTag="1057750861" Tag="243" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="69.0000" RightMargin="69.0000" TopMargin="-0.9500" BottomMargin="23.9500" LabelText="取 消" ctype="TextBMFontObjectData">
                        <Size X="90.0000" Y="60.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="114.0000" Y="53.9500" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.6500" />
                        <PreSize X="0.3947" Y="0.7229" />
                        <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.yellow_font.fnt" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="100.0000" Y="40.8932" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2128" Y="0.5000" />
                    <PreSize X="0.4851" Y="1.0148" />
                    <FontResource Type="Default" Path="" Plist="" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <PressedFileData Type="PlistSubImage" Path="common.btn_yellow_228x83_deep.png" Plist="common/bnts/common.btngroup.plist" />
                    <NormalFileData Type="PlistSubImage" Path="common.btn_yellow_228x83.png" Plist="common/bnts/common.btngroup.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_sure" ActionTag="-1625154669" Tag="22" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="256.0000" RightMargin="-14.0000" TopMargin="-0.6068" BottomMargin="-0.6068" TouchEnable="True" FontSize="37" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="198" Scale9Height="61" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="228.0000" Y="83.0000" />
                    <Children>
                      <AbstractNodeData Name="label" ActionTag="818813661" Tag="242" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="67.5000" RightMargin="67.5000" TopMargin="-0.9500" BottomMargin="23.9500" LabelText="确 定" ctype="TextBMFontObjectData">
                        <Size X="93.0000" Y="60.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="114.0000" Y="53.9500" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.6500" />
                        <PreSize X="0.4079" Y="0.7229" />
                        <LabelBMFontFile_CNB Type="Normal" Path="common/Fonts/common.blue_font.fnt" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="370.0000" Y="40.8932" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7872" Y="0.5000" />
                    <PreSize X="0.4851" Y="1.0148" />
                    <FontResource Type="Default" Path="" Plist="" />
                    <TextColor A="255" R="255" G="255" B="255" />
                    <PressedFileData Type="PlistSubImage" Path="common.btn_blue_228x83_deep.png" Plist="common/bnts/common.btngroup.plist" />
                    <NormalFileData Type="PlistSubImage" Path="common.btn_blue_228x83.png" Plist="common/bnts/common.btngroup.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="btn_cash" ActionTag="-910323466" Tag="68" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="91.0000" RightMargin="91.0000" TopMargin="-0.6068" BottomMargin="-0.6068" TouchEnable="True" FontSize="37" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="258" Scale9Height="61" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="288.0000" Y="83.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="235.0000" Y="40.8932" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.6128" Y="1.0148" />
                    <FontResource Type="Default" Path="" Plist="" />
                    <TextColor A="255" R="255" G="255" B="255" />
                    <DisabledFileData Type="PlistSubImage" Path="RedEnvelope_btn_cash_wx_deep.png" Plist="lobby/RedEnvelopePanel/RedEnvelope.plist" />
                    <PressedFileData Type="PlistSubImage" Path="RedEnvelope_btn_cash_wx_deep.png" Plist="lobby/RedEnvelopePanel/RedEnvelope.plist" />
                    <NormalFileData Type="PlistSubImage" Path="RedEnvelope_btn_cash_wx.png" Plist="lobby/RedEnvelopePanel/RedEnvelope.plist" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="75.0000" Y="30.9990" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1210" Y="0.0721" />
                <PreSize X="0.7581" Y="0.1902" />
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
            <PreSize X="0.4844" Y="0.5972" />
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