package com.godsonukpere.hpuzzle;
import java.lang.reflect.Method;
import java.util.Timer;
import java.util.TimerTask;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Message;
import android.provider.MediaStore;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.pm.ActivityInfo;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.SoundEffectConstants;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;

@SuppressLint("JavascriptInterface")
public class MainActivity extends Activity {

	private AdView mAdView;
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	 super.onCreate(savedInstanceState);
    	 setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
         setContentView(R.layout.sp);

 	        Timer t = new Timer();
 	        t.schedule(new TimerTask() {
 				
 				@Override
 				public void run() {
 					MainActivity.this.runOnUiThread(new Runnable() {
 						
 						@Override
 						public void run() {
 						loadapp();
 						}
 					});
 					
 				}
 			}, 4000);
    }
    boolean ismain=false;
    WebView wv=null;
        
    protected void onPause() {
  	  if(mAdView!=null)
          mAdView.pause();
          super.onPause();
      }

      @Override
      protected void onResume() {	    	
          super.onResume();
          if(mAdView!=null)
          mAdView.resume();
      }
      
	@SuppressLint("NewApi")
	public void loadapp()
    {
   	
   	
		setContentView(R.layout.activity_main);
		mAdView = (AdView) findViewById(R.id.adView);
        mAdView.loadAd(new AdRequest.Builder().build());
		ismain=true;
		loadmusic();
    	wv=(WebView)findViewById(R.id.webView1);     	
        
        wv.playSoundEffect(SoundEffectConstants.CLICK);
        wv.requestFocus(View.FOCUS_DOWN);	    
	    wv.getSettings().setDomStorageEnabled(true);
	    wv.getSettings().setJavaScriptEnabled(true);
	    wv.getSettings().setBlockNetworkImage(false);
	    wv.getSettings().setAppCacheEnabled(true);
     	wv.getSettings().setBlockNetworkLoads(false);
     	wv.getSettings().setAllowFileAccess(true);
        wv.getSettings().setDatabaseEnabled(true);
        wv.getSettings().setAllowContentAccess(true);
        wv.getSettings().setLoadsImagesAutomatically(true);
        
	    if (Build.VERSION.SDK_INT >= 16) {  
  		    Class<?> clazz = wv.getSettings().getClass();
  		    Method method;
 			try {
 				method = clazz.getMethod("setAllowUniversalAccessFromFileURLs", boolean.class);
 				if (method != null) {
 	 		        try {
 						method.invoke(wv.getSettings(), true);
 					} catch (Exception e) {

 					}
 	 		    }
 			} catch (SecurityException e) {
 			
 			} catch (NoSuchMethodException e) {

 			}
  		    
  		}

	    wv.setWebViewClient(new WebViewClient(){
	    	@Override
	    	public void onTooManyRedirects(WebView view, Message cancelMsg,
	    			Message continueMsg) {
	    		
	    		super.onTooManyRedirects(view, cancelMsg, continueMsg);
	    	}
	    	@Override
	    	public void onReceivedError(WebView view, int errorCode,
	    			String description, String failingUrl) {
	    		
	    		super.onReceivedError(view, errorCode, description, failingUrl);
	    	}
	    	@Override
	    	public void onPageStarted(WebView view, String url, Bitmap favicon) {
	    		
	    		super.onPageStarted(view, url, favicon);
	    	}
	    	@Override
	    	public void onPageFinished(WebView view, String url) {
	    		super.onPageFinished(view, url);
	    	}
	        public boolean shouldOverrideUrlLoading(WebView view, String url) {
	             	Intent browserIntent = new Intent(Intent.ACTION_VIEW,Uri.parse(url));
	        		startActivity(browserIntent);
	                return true;
	        }
	    });

	    wv.loadUrl("file:///android_asset/www/index.html");
	    wv.addJavascriptInterface(new JavaScriptInterface(this,mp),"droid");
	  
        wv.setOnTouchListener(new View.OnTouchListener() {
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                    case MotionEvent.ACTION_UP:
                        if (!v.hasFocus()) {
                            v.requestFocus();
                        }
                        break;
                }
                return false;
            }
        });
	    Toast.makeText(getApplicationContext(), "Please wait...", Toast.LENGTH_SHORT).show();
    }
   public boolean onKeyDown(int keyCode, KeyEvent event) {
       if (keyCode == KeyEvent.KEYCODE_BACK) {
           if(wv!=null)wv.loadUrl("javascript:dbk();");
           return true;
       }        
       return super.onKeyDown(keyCode, event);
   }
   public MediaPlayer mp=null;
   public void pickpicture()
	{
		Intent intent = new Intent(Intent.ACTION_PICK);
		intent.setType("image/*");
		startActivityForResult(intent, SELECT_PICTURE);
	}
   private static final int SELECT_PICTURE = 1;
 
   protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	     super.onActivityResult(requestCode, resultCode, data);
	      
	     if (requestCode == SELECT_PICTURE && resultCode == RESULT_OK && null != data) {
	         Uri selectedImage = data.getData();
	         String[] filePathColumn = { MediaStore.Images.Media.DATA };
	 
	         Cursor cursor = getContentResolver().query(selectedImage,
	                 filePathColumn, null, null, null);
	         cursor.moveToFirst();
	 
	         int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
	         String picturePath = cursor.getString(columnIndex);
	         cursor.close();
	         if(wv!=null)wv.loadUrl("javascript:beging('"+picturePath+"',1)");
	         // String picturePath contains the path of selected Image
	     }
	}
	public void loadmusic()
	{
		try{
		mp =  MediaPlayer.create(this, R.raw.couldyou);mp.prepare();
		mp.setLooping(true);
		mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
			public void onCompletion(MediaPlayer mp) {
				mp.start();
			}
			});
		}catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	@Override
	protected void onDestroy() {
		killMusic();
		if(mAdView!=null)
	        mAdView.destroy();

		
		super.onDestroy();
	}
	
	private void killMusic()
	{
		try{
			if(mp!=null)
			{
				mp.stop();
				mp.release();
				mp=null;
			}
		}
		catch (Exception e) {
	
		}
	}
   @Override
   public boolean onMenuItemSelected(int featureId, MenuItem item) {
   	if(item.getTitle().equals("Exit"))
   	{
   		killMusic();
   		finish();
	}
  // 	if(item.getTitle().toString().equals("Pick Date"))pickd();
   	if(item.getTitle().equals(getString(R.string.pickp)))
   	{
   		 if(wv!=null)pickpicture();
   	}
	if(item.getTitle().equals(getString(R.string.updscore)))
   	{
   		 if(wv!=null)wv.loadUrl("javascript:updscore();");
   	}
	if(item.getTitle().equals(getString(R.string.menu_rate)))
	{
		try {
		    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + getPackageName())));
		} catch (android.content.ActivityNotFoundException anfe) {
		    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("http://play.google.com/store/apps/details?id=" + getPackageName())));
		}
	}
	if(item.getTitle().equals(getString(R.string.scorebd)))
   	{
   		 if(wv!=null)wv.loadUrl("javascript:onlscore();");
   	}
	if(item.getTitle().equals(getString(R.string.menu_settings)))
   	{
   		 if(wv!=null)wv.loadUrl("javascript:viewSettings();");
   	}
   	if(item.getTitle().equals("About"))
   	{
   		Builder dg = new AlertDialog.Builder(this);
   		dg.setIcon(R.drawable.ic_launcher);
   		dg.setTitle("Huzzle Puzzle");
   		dg.setMessage("A pretty mediocre game, don't judge it. I developed it in my sleep.\n\n-__________________-");
   		dg.setCancelable(true);
   		dg.setPositiveButton("Close", new OnClickListener() {
				
				@Override
				public void onClick(DialogInterface dialog, int which) {
					dialog.cancel();					
				}
			});
   		dg.show();
   		
   	 //if(wv!=null)wv.loadUrl("javascript:about();");
   	}
   	return super.onMenuItemSelected(featureId, item);
   }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
}
