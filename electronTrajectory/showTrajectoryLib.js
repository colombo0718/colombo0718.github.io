function makeArrow(start,vector,head){
  var path  = new Pre3d.Path(),
      end   = Pre3d.Math.addPoints3d(start,vector),
      leng  = Pre3d.Math.vecMag3d(vector),
      head  ,
      radio = Pre3d.Math.unitVector3d(vector),
      thita = Pre3d.Math.unitVector3d(Pre3d.Math.crossProduct(vector,{x:0,y:0,z:1})),
      phai  = Pre3d.Math.unitVector3d(Pre3d.Math.crossProduct(thita,vector));
  if (vector.x===0 && vector.y===0){ 
    thita= {x:1,y:0,z:0}; phai = {x:0,y:1,z:0};
  }
  if (head==undefined){head=leng/20}      
    
  mid=Pre3d.Math.addPoints3d(end,Pre3d.Math.mulPoint3d(radio,-head) );
  foot1=Pre3d.Math.addPoints3d(mid,Pre3d.Math.mulPoint3d(thita,head*2/5) );
  foot2=Pre3d.Math.addPoints3d(mid,Pre3d.Math.addPoints3d(
    Pre3d.Math.mulPoint3d(phai,0.866*head*2/5), 
    Pre3d.Math.mulPoint3d(thita,-0.5 *head*2/5) ) ); 
  foot3=Pre3d.Math.addPoints3d(mid,Pre3d.Math.addPoints3d(
    Pre3d.Math.mulPoint3d(phai,-0.866*head*2/5), 
    Pre3d.Math.mulPoint3d(thita,-0.5 *head*2/5) ) );
 
  path.points=[start,end,foot1,foot2,foot3]
  path.curves=[
    new Pre3d.Curve(1,1,null), new Pre3d.Curve(2,2,null),   
    new Pre3d.Curve(1,1,null), new Pre3d.Curve(3,3,null),    
    new Pre3d.Curve(1,1,null), new Pre3d.Curve(4,4,null)]
  path.starting_point=0;
  return path;
}

function makeCoordinate(xmin,xmax,ymin,ymax,zmin,zmax,head){
  var axis=new Array;
  axis[1] = makeArrow({x:xmin,y:0,z:0},{x:xmax-xmin,y:0,z:0},head)
  axis[2] = makeArrow({x:0,y:ymin,z:0},{x:0,y:ymax-ymin,z:0},head)
  axis[3] = makeArrow({x:0,y:0,z:zmin},{x:0,y:0,z:zmax-zmin},head)
  return axis 
}
function makeCartesianCoor(start,middle,end,head){
  var axis=new Array,
      s=start,m=middle,e=end;
//document.getElementById('code-detail').innerHTML=s.x+' '+s.y+' '+s.z    
  axis[1] = makeArrow({x:s.x, y:m.y, z:m.z},{x:e.x-s.x, y:m.y-m.y ,z:m.z-m.z},head)
  axis[2] = makeArrow({x:m.x, y:s.y, z:m.z},{x:m.x-m.x, y:e.y-s.y ,z:m.z-m.z},head)
  axis[3] = makeArrow({x:m.x, y:m.y, z:s.z},{x:m.x-m.x, y:m.y-m.y ,z:e.z-s.z},head) 
  return axis 
}

function makeBox(start,end){
  var box= new Pre3d.Path(),
      s=start,e=end
  box.points=[s,{x:e.x,y:s.y,z:s.z},{x:s.x,y:e.y,z:s.z},{x:s.x,y:s.y,z:e.z},
                {x:s.x,y:e.y,z:e.z},{x:e.x,y:s.y,z:e.z},{x:e.x,y:e.y,z:s.z},e]
  //document.getElementById('code-detail').innerHTML=
  box.curves=[
      new Pre3d.Curve(0,0,null),
      new Pre3d.Curve(1,1,null),
      new Pre3d.Curve(6,6,null),
      new Pre3d.Curve(2,2,null),
      new Pre3d.Curve(0,0,null),
     
      new Pre3d.Curve(3,3,null),
      new Pre3d.Curve(4,4,null),
      new Pre3d.Curve(7,7,null),
      new Pre3d.Curve(5,5,null),
      new Pre3d.Curve(3,3,null),
      
      new Pre3d.Curve(5,5,null),
      new Pre3d.Curve(1,1,null),
      new Pre3d.Curve(6,6,null),
      new Pre3d.Curve(7,7,null),
      new Pre3d.Curve(4,4,null),
      new Pre3d.Curve(2,2,null),      
  ]
  box.starting_point=0;  
  return box
}

//-----------------------------------------
function makeParticle(position,radius,style){
  var outline = new Pre3d.Path(),
      p=position,
      r=radius 
  function Add(a,b){return Pre3d.Math.addPoints3d(a,b)}
  
  if(style=='cross'){      
    outline.points=[
      p,
      Add(p,{x:1,y:0,z:0}),Add(p,{x:-1,y:0,z:0}),
      Add(p,{x:0,y:1,z:0}),Add(p,{x:0,y:-1,z:0}),
      Add(p,{x:0,y:0,z:1}),Add(p,{x:0,y:0,z:-1})
    ]
    outline.curves=[
      new Pre3d.Curve(1,1,null), new Pre3d.Curve(0,0,null),
      new Pre3d.Curve(2,2,null), new Pre3d.Curve(0,0,null),  
      new Pre3d.Curve(3,3,null), new Pre3d.Curve(0,0,null),
      new Pre3d.Curve(4,4,null), new Pre3d.Curve(0,0,null),
      new Pre3d.Curve(5,5,null), new Pre3d.Curve(0,0,null), 
      new Pre3d.Curve(6,6,null), new Pre3d.Curve(0,0,null)
    ]
    outline.starting_point=0;
  }else if(style=='diamond'){
  }else{
  }  
  return outline
}
//------------------------------------------------
function makeTrajectory(tjData){
  var tj=new Pre3d.Path();
  tj.points=tjData
  for(i=1;i<tjData.length;i++){
    tj.curves[i-1]=new Pre3d.Curve(i,i,null);
  }
  tj.starting_point = 0;
  return tj
}
//-----------------------------------------------
function  mouseEvents(canvas,react){
    var m={target:'',c:false,dx:0,dy:0}
       ,x1=0,y1=0,x0=0,y0=0;  
    canvas.addEventListener('mousedown',function(e){m.c=true})
    canvas.addEventListener('mousemove',function(e){
        //if(c)return
        m.target=e.target.id
        x1  =e.pageX, y1  =e.pageY;
        m.dx=x1-x0  , m.dy=y1-y0  ;
        x0  =e.pageX, y0  =e.pageY;
        //document.getElementById('detail_content').innerHTML=m.target+''+e.target.id
        react(m);
    })
    //canvas.addEventListener('mouseover',function(e){})
    canvas.addEventListener('mouseup',  function(e){m.c=false})
    canvas.addEventListener('mouseout', function(e){m.c=false})
    canvas.addEventListener('wheel',    function(e){react(e)}) 
  } 

//--------------------------------------------------
    function makeDialog(id,start,end,title){
      var unit=Math.floor(Math.min(window.innerHeight/4
                                  ,window.innerWidth/6))
      div=document.createElement('div')
      div.id='dialog-'+id
      div.width=(end[0]-start[0])*unit-7
      div.height=(end[1]-start[1])*unit
      document.body.appendChild(div)
      
      $('#'+div.id).dialog(
      {title:(title==undefined? id: title),
       width:(end[0]-start[0])*unit-7, 
       height:(end[1]-start[1])*unit,
       position:[start[0]*unit,start[1]*unit],
       //resizable:false,
       //draggable:false,
      });
      return div
    }
    function makeCanvasDialog(id,start,end,title){
      var div=makeDialog(id,start,end,title)
      var cnv=document.createElement('canvas')
      cnv.style.position = "absolute";
      cnv.id     = 'canvas-'+id;
      cnv.width  = div.width-40;
      cnv.height = div.height-50;
      //document.body.appendChild(cnv)
      div.appendChild(cnv)
      return cnv
    } 
    function makeCodeDialog(id,start,end,title){
      var div=makeDialog(id,start,end,title)
      var cod=document.createElement('code')
      cod.id='code-'+id
      cod.style.fontSize=14
      div.appendChild(cod) 
    }
//--------------------------------------------------
    function showDetail(fi){    
      document.getElementById('code-detail').innerHTML=
      'time: '+t_s_gm[fi][0]+'<br>'+
      '|v| : '+t_s_gm[fi][1]+'<br>'+
      'gamma:'+t_s_gm[fi][2]+'<br>'+
      '<br>'+      
      'Position<br>'+
      'x: '+position[fi].x+'<br>'+
      'y: '+position[fi].y+'<br>'+
      'z: '+position[fi].z+'<br>'+
      '<br>'+      
      'Velocity<br>'+
      'Vx: '+velocity[fi].x+'<br>'+
      'Vy: '+velocity[fi].y+'<br>'+
      'Vz: '+velocity[fi].z+'<br>'+    
      '<br>'+      
      'Electric field<br>'+
      'Ex: '+electric[fi].x+'<br>'+
      'Ey: '+electric[fi].y+'<br>'+
      'Ez: '+electric[fi].z+'<br>'+
      '<br>'+      
      'Magnetic field<br>'+
      'Bx: '+magnetic[fi].x+'<br>'+
      'By: '+magnetic[fi].y+'<br>'+
      'Bz: '+magnetic[fi].z+'<br>' 
    }