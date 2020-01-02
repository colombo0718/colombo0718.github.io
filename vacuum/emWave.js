var fs=require('fs');
var xn=2001,yn=1,zn=1,tn=1001
var dx=0.01,dt=0.01
var s=new Array(10,10),t=new Array()
var eo=new Array(), bo=new Array()
var e =new Array(), b =new Array()
var i,j,k,m
var pi=Math.PI
// set envionment
for(i=1;i<xn;i++){
  s[i]=-10.+(i-1)*dx
}
for(m=1;m<tn;m++){
  t[m]=(m-1)*dt
}
// initial condition
eo[2]=new Array; eo[3]=new Array;
bo[2]=new Array; bo[3]=new Array;
for(i=1;i<=xn;i++){
  if(Math.abs(s[i])<=1.){
    eo[2][i]=Math.cos(s[i]*pi)+1 
  }else{
    eo[2][i]=0
  }
  eo[3][i]=0
  bo[2][i]=0; bo[3][i]=0
}
fs.writeFile('./emWave.json',JSON.stringify(eo,null,4),function(){})

// start 
e[2]=new Array; e[3]=new Array;
b[2]=new Array; b[3]=new Array;
for(m=1;m<tn-100;m++){
  for(i=1+10;i<=xn-10;i++){
    e[2][i]=eo[2][i]+dt*(bo[3][i+1]-bo[3][i-1])/(2*dx)
    e[3][i]=eo[3][i]-dt*(bo[2][i+1]-bo[2][i-1])/(2*dx)
    b[2][i]=bo[2][i]-dt*(eo[3][i+1]-eo[3][i-1])/(2*dx)
    b[3][i]=bo[3][i]+dt*(eo[2][i+1]-eo[2][i-1])/(2*dx)
  }
  for(i=1;i<=xn;i++){
    eo[2][i]=e[2][i]
    eo[3][i]=e[3][i]
    bo[2][i]=b[2][i]
    bo[3][i]=b[3][i]
  }
  if(m==400){
    console.log(e[2][11],e[2][12],e[2][13])
    for(i=1;i<=xn;i+=10){
      console.log(i,e[2][i])
    }
  }
}

