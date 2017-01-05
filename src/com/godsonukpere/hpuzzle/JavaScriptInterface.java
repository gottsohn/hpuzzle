package com.godsonukpere.hpuzzle;

import android.app.Activity;
import android.media.MediaPlayer;

public class JavaScriptInterface{
	
	public JavaScriptInterface(Activity c,MediaPlayer m)
	{
		mc=c;
		mp=m;
	}
	MediaPlayer mp=null;
	Activity mc=null;
	public void playmusic()
	{
		try{
		if(mp!=null)
		mp.start();
		}
		catch(Exception e0){}
	}
	public void setItem(String id,String vl)
	{
		Vars.savedb(id, vl,mc.getApplicationContext());
	}
	public void clearDB()
	{
		Vars.clearDB(mc.getApplicationContext());
	}
	public String getItem(String id)
	{
		String _json="";
		_json=Vars.getdb(mc.getApplicationContext(), id);
		return _json;
	}
	public void deleteItem(String id)
	{
		Vars.deletePostFromDB(id, mc);
	}
	public void stopmusic()
	{
		try{
			if(mp!=null)
			mp.stop();
		}
		catch (Exception e) {
		}
	}
	
	public String phoneModel()
	{
		return android.os.Build.MODEL;
	}
	public String phoneVersion()
	{
		return android.os.Build.VERSION.RELEASE;
	}
	public String phoneDevice()
	{
		return android.os.Build.DEVICE;
	}
	public void Log(String s)
	{
		android.util.Log.d("HPUZZLE_LOG", s);
	}
	
	public void closeprog(){mc.finish();}	
	
}
