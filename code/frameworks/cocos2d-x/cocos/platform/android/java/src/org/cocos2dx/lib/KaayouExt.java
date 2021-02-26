package org.cocos2dx.lib;

import android.util.Log;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class KaayouExt {
    static Map<String, String> DoUrlMap = new HashMap<String, String>() {{
        put("apiyxdq.kaayou.com", "");
        put("dqgm.kaayou.cn", "");
        put("apiyxxyy.heeyou.cn", "");
        put("gmxyy.heeyou.cn", "");
    }};

    static Map<String, String> DoIpMap = new HashMap<String, String>() {{
        put("uploads", "dqgm.kaayou.cn");
        put("api", "apiyxdq.kaayou.com");
    }};

    //lwdebug190606正式包都改为 false
    static public boolean debugFile = false;
    static public boolean debugDns = false;

    static public HttpURLConnection doHttpURLConnectionDns(String linkURL) {

        HttpURLConnection urlConnection;
        String newHost = null;
        try {
            URL url;
            url = new URL(linkURL);

            if (debugDns) {
                do {
                    String myHost = url.getHost();
                    String OldIP = DoUrlMap.get(myHost);
                    if (OldIP == null) {
                        break;
                    }
                    //0:开发线；1：测试线；2：镜像线&正式线
                    if (OldIP.isEmpty()) {
                        Integer Line = Cocos2dxHelper.getIntegerForKey("APK::LineID", 0);
                        if (Line == 0) {
                            OldIP = Cocos2dxHelper.getStringForKey("APK::LineKfxIP", "192.168.1.156");
                        } else if (Line == 1) {
                            OldIP = Cocos2dxHelper.getStringForKey("APK::LineCsxIP", "192.168.1.156");
                        } else if (Line == 2) {
                            OldIP = Cocos2dxHelper.getStringForKey("APK::LineJxxIP", "");
                        }
                        if (OldIP.isEmpty()) {
                            break;
                        }
                        DoUrlMap.put(myHost, OldIP);
                    }

                    linkURL = linkURL.replaceFirst(myHost, OldIP);
                    url = new URL(linkURL);
                    Log.i("dns", "修改后:" + linkURL + "host:" + myHost);
                    newHost = myHost;
                } while (false);
            }
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Accept-Encoding", "identity");
            if (newHost != null && !newHost.isEmpty()) {
                urlConnection.setRequestProperty("Host", newHost);
            }
            urlConnection.setDoInput(true);


        } catch (Exception e) {
            Log.e("URLConnection exception", e.toString());
            return null;
        }

        return urlConnection;

    }

    static public class DnsEXTuh {
        public DnsEXTuh(String url, String host) {
            this.url = url;
            this.hosts = host;
        }

        String url;
        String hosts;
    }
    static public boolean isIP(String addr)
    {
        if(addr.length() < 7 || addr.length() > 15 || "".equals(addr))
        {
            return false;
        }
        /**
         * 判断IP格式和范围
         */
        String rexp = "([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}";

        Pattern pat = Pattern.compile(rexp);

        Matcher mat = pat.matcher(addr);

        boolean ipAddress = mat.find();

        return ipAddress;
    }

    static public DnsEXTuh doGetHttpURLDns(String linkURL) {

        try {
            URL url;
            url = new URL(linkURL);
            String myHost = url.getHost();

            if (debugDns) {
                do {
                    String OldIP = DoUrlMap.get(myHost);
                    if (OldIP == null) {
                        break;
                    }
                    //0:开发线；1：测试线；2：镜像线&正式线
                    if (OldIP.isEmpty()) {
                        Integer Line = Cocos2dxHelper.getIntegerForKey("APK::LineID", 0);
                        if (Line == 0) {
                            OldIP = Cocos2dxHelper.getStringForKey("APK::LineKfxIP", "192.168.1.156");
                        } else if (Line == 1) {
                            OldIP = Cocos2dxHelper.getStringForKey("APK::LineCsxIP", "192.168.1.156");
                        } else if (Line == 2) {
                            OldIP = Cocos2dxHelper.getStringForKey("APK::LineJxxIP", "");
                        }
                        if (OldIP.isEmpty()) {
                            break;
                        }
                        DoUrlMap.put(myHost, OldIP);
                    }
                    String sUrl = linkURL.replaceFirst(myHost, OldIP);
                    Log.i("dns2", "修改后:" + sUrl + "host:" + myHost);
                    return new DnsEXTuh(sUrl, myHost);
                } while (false);


                if(isIP(myHost)){
                    do{
                        try{
                            String[] aitArr = url.getPath().replaceFirst("/", "").split("/");
                            if(aitArr.length < 1){
                                break;
                            }
                            String __inteface = aitArr[0];
                            String OldHost = DoIpMap.get(__inteface);
                            if(OldHost != null){
                                myHost = OldHost;
                                break;
                            }
                        }catch (Exception e){

                        }
                        for (Map.Entry<String, String> entry : DoUrlMap.entrySet()) {
                            if( entry.getValue().equals(myHost)){
                                myHost = entry.getKey();
                                break;
                            }
                        }
                    }while (false);

                }
                return new DnsEXTuh( linkURL , myHost);
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }
}