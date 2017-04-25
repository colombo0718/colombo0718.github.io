var np=90,i
var pi=Math.PI
var t=[] // t:thita 
for(i=0; i<=np; i++)
 {t[i]=(i*2*pi/np)-(pi/2.)}
var b=[] // b=Cso/Cao
// --[ variable name ]--
// f:fast     s:slow   a:alfven
// p:phase    g:group
// r:radious  t:thita  xy:cartesian
// p:+        n:-
//-------------------------------------------
var fp=[], fg=[] 
var sp=[], sg_p=[], sg_n=[]
var ap_p=[], ap_n=[], ag_p=[], ag_n=[]
var mp, mg
//================================================
function fgd()
{
  var vv
  b=mhd_wave.beta.value
  mp=0,mg=0
  for(i=0; i<=np; i++)
  { 
  vv=new get_vel(t[i],b)
  fp[i]=vv.fp   ; fg[i]=vv.fg
  if(fp[i][0]>mp){mp=fp[i][0]}
  if(fg[i][0]>mg){mg=fg[i][0]}
  sp[i]=vv.sp
  if(vv.sg[1]>0){sg_p[i]=vv.sg}
  else          {sg_n[i]=vv.sg}
  ap_p[i]=vv.ap_p; ap_n[i]=vv.ap_n
  }
    ag_p=[[0,1],[0,1]]
    ag_n=[[0,-1],[0,-1]]
//--phase velocity plots-------------------------------
  var y=true
  $.plot($("#phase_ph"),[
    {data:fp,label:"fast mode",lines:{show:y}
     ,points:{show:y},color:"rgb(150,150,255)"}
   ,{data:sp,label:"slow mode",lines:{show:y}
     ,points:{show:y},color:"rgb(150,255,150)"}
   ,{data:ap_p,label:"Alfven mode",lines:{show:y}
     ,points:{show:y},color:"rgb(255,150,150)"}
   ,{data:ap_n,lines:{show:y}
     ,points:{show:y},color:"rgb(255,150,150)"}
  ],{xaxis:{max:mp,min:-mp},yaxis:{max:mp,min:-mp,tickformatter:"rgb(255,0,0)"}});
//--group velocity plots--------------------------------
  $.plot($("#group_ph"),[ 
    {data:fg,label:"fast mode",lines:{show:y}
     ,points:{show:y,symbol:"diamond"},color:"rgb(150,150,255)"}
   ,{data:sg_p,label:"slow mode",lines:{show:y} 
     ,points:{show:y,symbol:"diamond"},color:"rgb(150,255,150)"}
   ,{data:sg_n,lines:{show:y} 
     ,points:{show:y,symbol:"diamond"},color:"rgb(150,255,150)"}
   ,{data:ag_p,label:"Alfven mode",lines:{show:y}
     ,points:{show:y,symbol:"diamond"},color:"rgb(255,150,150)"} 
   ,{data:ag_n,lines:{show:y}
     ,points:{show:y,symbol:"diamond"},color:"rgb(255,150,150)"}
  ],{xaxis:{max:mg,min:-mg},yaxis:{max:mg,min:-mg}});
}
//===========================================
function get_vel(t,b)
{
  sin=Math.sin(t); sin2=Math.sin(2*t)
  cos=Math.cos(t); cos2=Math.cos(2*t)
  lsq=Math.sqrt((1+b*b)*(1+b*b)-4*b*b*cos*cos)
//-fast mode-----------------------------------
  fpr=Math.sqrt(0.5*((1+b*b)+lsq))
  this.fp=[fpr*sin, fpr*cos]

  fgr=fpr
  fgt=b*b*sin*cos/(fpr*lsq)
  if(fpr*lsq==0.)
   {fgt=Math.sqrt(b*b*cos2/(4*fpr*fpr+lsq))}
  this.fg=[fgr*sin+fgt*cos, fgr*cos-fgt*sin]
//-slow mode------------------------------------  
  spr=Math.sqrt(0.5*((1+b*b)-lsq))
  this.sp=[spr*sin, spr*cos]

  sgr=spr
  sgt=-b*b*sin*cos/(spr*lsq)
  if(spr*lsq==0.)
   {sgt=Math.sqrt(b*b*cos2/(4*spr*spr-lsq))}
  this.sg=[sgr*sin+sgt*cos, sgr*cos-sgt*sin]

//-Alfven mode-------------------------------------  
  apr_p=cos
  this.ap_p=[apr_p*sin,apr_p*cos]
  apr_n=-cos
  this.ap_n=[apr_n*sin,apr_n*cos]
}

