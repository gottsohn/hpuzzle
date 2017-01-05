	var MB = {bbmcon:false,bbmmenu:false};
	var imgpuzzle = false;
	var res = false;
	var sconfig ={rows:4,cols:4,numbers:true,animation:{shuffleRounds:3}};
	var settings = { 
    rows: 4,                    // number of rows [3 ... 9] 
    cols: 4,                    // number of columns [3 ... 9] 
    hole: 9,                   // initial hole position [1 ... rows*columns] 
    shuffle: false,             // initially show shuffled pieces [true|false] 
    numbers: true,              // initially show numbers on pieces [true|false] 
    language: 'en',             // language for gui elements [language code] 
 
    // display additional gui controls 
    control: { 
        shufflePieces: true,    // display 'Shuffle' button [true|false] 
        confirmShuffle: true,   // ask before shuffling [true|false] 
        toggleOriginal: true,   // display 'Original' button [true|false] 
        toggleNumbers: false,    // display 'Numbers' button [true|false] 
        counter: true,          // display moves counter [true|false] 
        timer: true,            // display timer (seconds) [true|false] 
        pauseTimer: true        // pause timer if 'Original' button is activated 
                                // [true|false] 
    }, 
 
    // perform actions when the puzzle is solved sucessfully 
    success: { 
        fadeOriginal: true,    // cross-fade original image [true|false] 
        callback: function (result){
			
			calcscore(result.seconds,result.moves);
			
			res = result;
			
			},    // callback a user-defined function [function] 
                                // the function is passed an object as its argument 
                   // which includes the fields 'moves' and 'seconds' 
        callbackTimeout: 500    // time in ms after which the callback is called 
    }, 
 
    // animation speeds and settings 
    animation: { 
        shuffleRounds: 3,       // number of shuffle rounds [1 ... ] 
        shuffleSpeed: 450,      // time in ms to perform a shuffle round 
        slidingSpeed: 200,      // time in ms for a single move 
        fadeOriginalSpeed: 600  // time in ms to cross-fade original image 
    }, 
 
    // additional style information not specified via css 
    style: { 
        gridSize: 2,            // space between two pieces in px 
        overlap: true,         // if true, adjacent piece borders will overlap 
					         // applies only if gridSize is set to 0 
        backgroundOpacity: 0.2  // opacity of the original image behind the pieces 
                                // [0 ... 1] (0 means no display) 
    } 
} 
var texts = { 
    shuffleLabel:           'Mix', 
    toggleOriginalLabel:    'Original', 
    toggleNumbersLabel:     'Numbers', 
    confirmShuffleMessage:  'Do you really want to Mix it Up?', 
    movesLabel:             'moves', 
    secondsLabel:           'seconds' 
} 
function cpz()
{
	imgpuzzle =	$("#pzimg").jqPuzzle(settings,texts);
}
var imgs = ["pz1.jpg","pz2.jpg","pz3.jpg","pz4.jpg","pz5.jpg","pz6.jpg","pz7.jpg","pz8.jpg","pz9.jpg","pz10.jpg","pz11.jpg","pz12.jpg"];
var isplaying=false;
function _$(id)
{
	return document.getElementById(id);	
}
var views=[];var dirs=[];
function chngv(dir,data)
{
	if(dir)
	{
		try
		{
			if(!isplaying)views.push($("#content").html());
			else {if(ext_int)ext_int.stop();}
		}
		catch (e0){}
		$("#content").html(data);
	}
	else
	{
		if(views.length==0)return;
		if(isplaying)
		{

			_alert("Quit current game and forfeit achievements?<P><input type='button' class='btn btn-danger' value='YES' onclick='popout();'/> <input type='button' class='btn btn-danger' value='CANCEL' onclick='_hide__pwin__();'/></p>","WARNING!!!");
		}
		else $("#content").html(views.pop());
	}	
}
function popout(){$("#content").html(views.pop());isplaying=false;if(ext_int)ext_int.stop(); _hide__pwin__();}
function selF()
{
		try
		{
			//webworks.ui.filePicker.open(pckf);
			alert(droid.imgpth+" img pth");
			pckf(droid.imgpth);
			_hide__pwin__();
		}
		catch (nw)
		{
			nw = nw?nw.toString():nw;
			_alert(nw,"Error selecting photo");
		}
}
function selectFile()
{
	alert(droid.imgpth);
	_alert("Picture may be distorted and may not fit the screen perfectly<P><input type='button' class='btn btn-danger' value='Continue' onclick='selF();'/></p>","WARNING!!!");
		
}
var upl_f=null;
function pckf(file)
{
		if(/\.jpg|\.png|\.gif|\.tiff|\.jpeg|\.bmp/i.test(file))
		{
			beging(file,1);			
		}
		else
		{
			_alert("Invalid picture selected<br/><Br/><i>"+file+"</i>","Picture Error");	
		}
}


var _alert = function (msg,hd)
{
	if(hd&&hd.length>0)
	$("#func #sinfo #fn").text(hd); 
	$("#func #sinfo #infomsg").html(msg);
	__pwin__("#msg","sinfo");
	return false;
}
function _er(str)
{	
	alert(str);
	$("#res").text(str);	
}
function updscore()
{
	calcscore(0,0);
}
function resetscore()
{
	//if(confirm("Confirm your score being reset to 0 (zero)?"))
	//{
		__csettings__.score=0;
		updSettings("score",0);
		alert("Your total score has been reset");	
	//}
	return false;
}
function cmenu()
{
/*	var item1=new blackberry.ui.menu.MenuItem(false,1,"New Game",newg);
	var item11=new blackberry.ui.menu.MenuItem(false,2,"Online Scoreboard",onlscore);	
	var item12=new blackberry.ui.menu.MenuItem(false,3,"Settings",viewSettings);
	var item2=new blackberry.ui.menu.MenuItem(false,2,"Update score",updscore);
	var item13=new blackberry.ui.menu.MenuItem(false,3,"About",about);
    var sep2=new blackberry.ui.menu.MenuItem(true,4);    
   	blackberry.ui.menu.addMenuItem(item1); 
   	blackberry.ui.menu.addMenuItem(item11); 
  	blackberry.ui.menu.addMenuItem(item2); 
	blackberry.ui.menu.addMenuItem(item12);	
	blackberry.ui.menu.addMenuItem(item13);	
	blackberry.ui.menu.addMenuItem(sep2);		*/
}

	var isPwin = false;
	function __pwin__(href,ch)
	{
		isPwin = true;
		$("#msgtxt").html($("#func #"+ch).html());
		var mask_div = document.createElement("div");
		var window_div = document.createElement("div");		
		mask_div.className = "mask";
		window_div.className = "window";
		
		document.body.appendChild(window_div);

		var maskHeight = $(window).height();

		var maskWidth = $(window).width();

		var winH = $(document).height();
		$(href).css('left', "10%");
		$(href).css('top', "15px");
		document.body.appendChild(mask_div);
		$(href+" .clpwin").click(function(e) {
           _hide__pwin__();});
		$(mask_div).css("display","block");		
		$(mask_div).click(function (){
			_hide__pwin__();});
		$(href).css("display","block"); 
		$(mask_div).css({height:winH});
		sct = $("body").scrollTop();
		prev_h_div = href;
	}
	var prev_h_div=null;
	function _hide__pwin__()
	{
		try
		{
			isPwin = false;
			closeCurrent=false;	
			$("#func #q #ttx").html("");
			$(".mask").css("display","none");
			$("#msg").css("display","none");		
		}
		catch(e)
		{
			
		}
	}
	
	
var	ext_h=0,ext_ph=20,ext_pw=20,_ht=320,_wt=480;
window.addEventListener("orientationchange", setOrientation, false);	
function setOrientation() 
{
try
{
	_ht = $(window).height();
	_wt = $(window).width();
	if(window.screen.height<300)
	{
		_ht=window.screen.availHeight;
		_wt=window.screen.width;
	}
	//$("#home #img").width(_wt-10);
	ext_h=_ht-40;
	ext_ph=Math.round(_ht/5);
	ext_pw=Math.round(_wt/5);
	xyfix();
	//$("#content").height(Math.ceil(1.43*_ht));
}
catch(e0){alert(e0);}
}
var fscore = {time:null,moves:null,box:null,fullscore:0};
var ext_int=null;
function calcscore(time,moves)
{
	var box = settings.cols * settings.rows;
	var fullscore=0;	
	__csettings__.score=Math.ceil(__csettings__.score);
	try{fullscore=moves*box*50/time;fullscore=Math.ceil(fullscore);}catch(e0){}
	if(!fullscore)fullscore=0;
	if(!__csettings__.score)__csettings__.score=0;
	if(!settings.numbers){if(fullscore>0)fullscore=fullscore+100;}
	$("#func #score .score").text(fullscore);
	__csettings__.score=fullscore + __csettings__.score; 
	$("#func #score .tscore").text(__csettings__.score);
	fscore.fullscore=__csettings__.score;
	__pwin__("#msg","score");	
	$("#msg input#user.txt").val(__csettings__.user);	
	updSettings("score",__csettings__.score);
	/*try{userProfile.setPersonalMessage("I just scored "+fullscore+" points, raising my total to "+__csettings__.score+" points.");}	
	catch(e0){}
	try{profileBox.addItem("I just scored "+fullscore+" points.","local:///img/c.png");}
	catch(e0){}
	try{profileBox.addItem("I now have a total of "+__csettings__.score+" points.","local:///img/b.png");}
	catch(e0){}*/
}
function submscore()
{
	var score = fscore.fullscore;
	var device='2.3.5';
	var model = "droidOS";
	var version = "1.0.0.0";
	$("#msg #infomsg").text("Sending your score please wait...");
	try
	{
		device=droid.phoneDevice();
    	model=droid.phoneModel();
		version=droid.phoneVersion();
	}
	catch(e0){};
	device=device?device:'2.3.5';model=model?model:"droidOS";
	var user = $("#msg input.txt").val();
	
	updSettings("user",user);
	
		$.post(PTH,{score:score,user:user,"pin":device,"model":model,"version":version,isDroid:1},function(data){
		$("#msg #infomsg").html(data);
		}).error(function(e){
				$("#msg #infomsg").text(e.status+":Error sending score");
		});
	
	return false;
}
function xyfix()
{
	//$(".pickprev img").width(ext_pw);
}
function reqbbm()
{
	$("#func #q #fn").html("Connect with BBM<Br/><span style='text-align:left;font-size:xx-small;'>To be able to share scores with BBM Contacts, set your PM, invite your BBM Contacts to download, and much more.</span>");
	$("#func #q #positive").html("Connect");
	$("#func #q #positive").attr("onclick","bbmUtil.requestPermissionAndRegister();_hide__pwin__();");
	$("#func #q #negative").html("Do not Connect");
	$("#func #q #negative").attr("onclick","_hide__pwin__()");
	__pwin__("#msg","q");
}
function invitefriends()
{
	//alert(_ht+ " " + _wt);
	try
	{
		bbmUtil.init();
		bbmUtil.inviteToDownload();
	}
	catch (e0){_alert("Connect with BBM Coming in next version.<P align='center'>CHEERS</P>","BBM CONNECTION");}
}
var pzfunc={shuffunc:function(){},tggfunc:function(){}};
function viewSettings()
{
	var rows = $("#func #settings select.rows");
	var opt="";
	for(var i=3;i<=9;i++)
	{
		var sel = settings.rows==i?"selected":"";
		opt+= "<option label='"+i+"' "+sel+" value='"+i+"'>"+i+"</option>";
	}
	rows.html(opt);	
	opt="";
	var cols = $("#func #settings select.cols");
	for(var i=3;i<=9;i++)
	{
		var sel = settings.cols==i?"selected":"";
		opt+= "<option label='"+i+"' "+sel+" value='"+i+"'>"+i+"</option>";
	}
	cols.html(opt);	
	opt="";

	var shuffle = $("#func #settings .shuffle");
	
	for(var i=1;i<=5;i++)
	{
		var sel = settings.animation.shuffleRounds==i?"selected":"";
		opt+= "<option label='"+i+"' "+sel+" value='"+i+"'>"+i+"</option>";
	}
	shuffle.html(opt);
	opt="";	
	__pwin__("#msg","settings");	
	$("#msg .num").get(0).checked=settings.numbers;
	$("#msg .music").get(0).checked=__csettings__.bgm;
}
function bgm()
{
	try
	{
		droid.playmusic();
	}
	catch(e0){alert(e0);}
}

function stopbgm()
{
	try
	{
		droid.stopmusic();
	}
	catch(e0){alert(e0);}
}

var ply=null;
function saveSettings()
{
	sconfig.rows=$("#msg .rows").val();
	sconfig.cols=$("#msg .cols").val();	
	sconfig.numbers=$("#msg .num").get(0).checked;
	sconfig.animation.shuffleRounds=$("#msg .shuffle").val();
	__csettings__.bgm=$("#msg .music").get(0).checked;
	var str= fx4db(JSON.stringify(sconfig));
	__csettings__.setting=str;
	setsettings();
	if(__csettings__.bgm)bgm();else stopbgm();
	updSettings("bgm",__csettings__.bgm);
	updSettings("setting",__csettings__.setting);
	
	_hide__pwin__();
}
function fx4db(str)
{
	str=str.toString();
	while(str.indexOf('"')>-1)str=str.replace('"',"-----");
	return str;
}
function unfx4db(str)
{
	str=str.toString();
	while(str.indexOf('----')>-1)str=str.replace("-----",'"');
	return str;
}
function about()
{var version;
	try
	{version = 1.0;}
	catch(e0){version="1.0";}
	_alert("<img src='img/icon.png' style='float:left;margin:5px;'/> "+' A pretty mediocre game, don&lsquo;t judge it. I developed it in my sleep.<br/><Br/>Huzzle Puzzle&copy;2013',"Huzzle Puzzle ");	
}
function setsettings()
{
	settings.rows = sconfig.rows;
	settings.cols = sconfig.cols;
	settings.numbers = sconfig.numbers;
	settings.animation.shuffleRounds=sconfig.animation.shuffleRounds;
}
var PTH = "http://api.godson.com.ng/hpuzzle/index.php";//"/projects/4/godson/hpuzzle/";//
function onlscore()
{
	
		__pwin__("#msg","ld");
		$.post(PTH,function(data){
		_hide__pwin__();
		chngv(true,data);	
		})
		.error(function(e){
				_alert("Error accessing the online scoreboard","Code:"+e.status);
		});
}
var tgv=false;
function shuff()
{
	$("#content .mndiv input.btn.shuffle").val("Mix it Up");
}
function tggl()
{
	if(tgv)
	{
		tgv=false;	
		$("#content .mndiv input.btn.prev").val("Preview original");
	}
	else
	{
		tgv=true;
		$("#content .mndiv input.btn.prev").val("Back");
	}	
}

function beging(i,loc)
{
	var pimg = i;
	//loc==0?"pz/"+imgs[i]:"http://api.godson.com.ng/huzzle_puzzle/"+loc;
	var img = document.createElement("img");
	__pwin__("#msg","ld");
	var div = "<div class='mndiv' align='center'><table><tr><td><input type='button' value='Click here to begin' onclick='pzfunc.shuffunc();shuff();' class='btn btn-danger shuffle'/></td><!--Td><input type='button' value='Preview Original' onclick='pzfunc.tggfunc();tggl();' class='btn btn-info prev'  /></Td--><Td><I class='icon icon-time'></I> <b id='ctime' >0</b></td><td><i class='icon icon-fullscreen'></i> <B id='cmoves'>0</B></td></tr></table></div><div id='cpuzzle' align='center'><img src='"+pimg+"' style='max-width:"+(_wt-10)+"px !important;max-height:"+(_ht-120)+"px !important;width:98%;' id='pzimg' class='jqPuzzle'/><div>";
	img.onload = function()
	{
		_hide__pwin__();
		chngv(true,div);
		cpz();
		isplaying=true;
	}
	img.src=pimg;
	
}
function newg()
{
	var imgstr = "<div class='pcd' align='center'>";
	for(var i in imgs)
	{//width='"+ext_pw+"'
		imgstr += "<a href='#'><div class='pickprev' onclick='beging(\"pz/"+imgs[i]+"\",0)' ><img  src='pz/"+imgs[i]+"'/></div></a>";
		imgstr+=(i+1)%3==0?"":"";	
	}
	imgstr+="</div>";
	$("#func #newg #cont").html(imgstr);	
	chngv(true,$("#func #newg").html());
	return false;
}
/*window.onkeyup =function(e)
{
	if(e.keyCode==27)
	{
	//	dbk();
		e.preventDefault();	
	}
}*/
	window.addEventListener("resize", setOrientation, false);
	function dbk()
	{
		if(isPwin){_hide__pwin__();}
		else{chngv(null,null);}		
	}
	function dbfuncs()
	{	
		__gSetting__("setting",fx4db(__csettings__.setting));
		__gSetting__("user",__csettings__.user);
		__gSetting__("score",__csettings__.score);
		__gSetting__("bgm",__csettings__.bgm);
		__cSettings__();
	}
	var __sfwver__=false;
	var lstb=["setting","user","score","bgm"];
	window.onload = function()
	{
		setOrientation();	
		try
		{
			for(var kl=0;kl<imgs.length;kl++)
			{
				var img = document.createElement("img");
				img.src="pz/"+imgs[kl];
			}
		}catch(e0){}
		try{dbfuncs();}catch(e0){alert(e0);}		
	}

	
	
	
	function errorDB(e)
	{
		e=e?e.toString():"";
		alert("Unable to connect to LocalDB\n"+e);
	}
	function successDB()
	{

	}
	function __gSetting__(v1,v2)
	{
		var gsv = droid.getItem(v1);
		if(!gsv||gsv.length<1)droid.setItem(v1,v2);
		//if(!window.localStorage.getItem(v1))window.localStorage.setItem(v1,v2);
	}
	var __csettings__ = {setting:fx4db(JSON.stringify(sconfig)),user:"Player-"+Math.round(Math.random(0,100000)*100000),score:0,bgm:true};
	function __cSettings__()
	{
		try
		{
			for(var i in lstb)
			{
				var v1 = lstb[i];
				var v2 = droid.getItem(v1);
				//var v2 = window.localStorage.getItem(v1);
				if(!v2)alert("DB Error");
				//try{alert(v1 + ":getting:" + v2);droid.Log(v1 + ":getting:" + v2);}catch(e0){}
				v2=v2==="true"?true:v2;v2=v2==="false"?false:v2;
				__csettings__[v1]=v2!==null&&v2!==""?v2:__csettings__[v1];
				if(v1=="setting")
				{
					sconfig=JSON.parse(unfx4db(__csettings__.setting));
					setsettings();
				}
				if(v1=="bgm")
				{
					if(v2===true)bgm();
				}

			}
		}catch(e0){errorDB(e0);}

	}
	function doExit()
	{
		
	}
	function updSettings (v1,v2)
	{
		try{
			droid.setItem(v1,v2);
		//window.localStorage.setItem(v1,v2);
		//alert(v1 + ":saving:" + v2);
		//droid.Log(v1 + ":saving:" + v2);
		}
		catch(e0){errorDB(e0);}
	}
		
		