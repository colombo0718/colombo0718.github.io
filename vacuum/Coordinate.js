// should include with pre3d.js

function makeArrow(p,v){
  var path  = new Pre3d.Path(),
      start = p,
      end   = Pre3d.Math.addPoints3d(p,v),
      leng  = Pre3d.Math.vecMag3d(v),
      radio = Pre3d.Math.unitVector3d(v),
      thita = Pre3d.Math.unitVector3d(Pre3d.Math.crossProduct(v,{x:0,y:0,z:1})),
      phai  = Pre3d.Math.unitVector3d(Pre3d.Math.crossProduct(thita,v));
  if (v.x===0 && v.y===0){ 
    thita= {x:1,y:0,z:0}; phai = {x:0,y:1,z:0};
  }

  mid=Pre3d.Math.addPoints3d(end,Pre3d.Math.mulPoint3d(radio,-leng/20) );
  foot1=Pre3d.Math.addPoints3d(mid,Pre3d.Math.mulPoint3d(thita,leng/50) );
  foot2=Pre3d.Math.addPoints3d(mid,Pre3d.Math.addPoints3d(
    Pre3d.Math.mulPoint3d(phai,0.866*leng/50), 
    Pre3d.Math.mulPoint3d(thita,-0.5 *leng/50) ) ); 
  foot3=Pre3d.Math.addPoints3d(mid,Pre3d.Math.addPoints3d(
    Pre3d.Math.mulPoint3d(phai,-0.866*leng/50), 
    Pre3d.Math.mulPoint3d(thita,-0.5 *leng/50) ) );
 
  path.points=[start,end,foot1,foot2,foot3]
  path.curves=[
    new Pre3d.Curve(1,1,1), new Pre3d.Curve(2,2,2),
    new Pre3d.Curve(1,1,1), new Pre3d.Curve(3,3,3),
    new Pre3d.Curve(1,1,1), new Pre3d.Curve(4,4,4)]
  path.starting_point=0;
  return path;
}


