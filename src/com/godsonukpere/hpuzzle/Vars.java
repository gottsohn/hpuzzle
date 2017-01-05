package com.godsonukpere.hpuzzle;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

public class Vars {

	public static String getdb(Context context,String id)
    {
    	SharedPreferences AF = context.getSharedPreferences(MYPREFS,Activity.MODE_PRIVATE);
    	String idstr = AF.getString(id,"");
    	
		return idstr;
    }
   private static String MYPREFS = "hpLS001";
   public static void savedb(String id,String JSON,Context context)
    {
	   try
	   {
			SharedPreferences mySharedPreferences = context.getSharedPreferences(MYPREFS,Activity.MODE_PRIVATE);	
			SharedPreferences.Editor editor = mySharedPreferences.edit();
			editor.putString(id, JSON);
			editor.commit();
			
	   }
	   catch(Exception e){}		    			
    }
	public static void deletePostFromDB(final String id,final Context context)
	{
		try
		{
			SharedPreferences mySharedPreferences = context.getSharedPreferences(MYPREFS,Activity.MODE_PRIVATE);	
			mySharedPreferences.edit().remove(id).commit();
		}
		catch (Exception e) {
		
		}
	}
	public static void clearDB(Context context)
	{
		SharedPreferences mySharedPreferences = context.getSharedPreferences(MYPREFS,Activity.MODE_PRIVATE);	
		mySharedPreferences.edit().clear().commit();
	}
}
