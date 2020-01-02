      program emWave
      implicit none 
      integer xn, yn, zn, tn 
      parameter(xn=2001,tn=3001)
      real*8 ds,dt
      parameter(ds=1d-2,dt=1d-3)
      real*8 s(xn),t(tn)
      real*8 e(xn,3), b(xn,3)
      real*8 eo(xn,3), bo(xn,3)
      integer i,j,k,m
      real*8 pi 
      parameter(pi=3.1415927d0)
      open(1,file='emWave_data.js',status='unknown')
c    set environment 
      do i=1,xn       
        s(i)=-10+(i-1)*1d-2
      end do
      do m=1,tn
        t(m)=(m-1)*1d-2
      end do 
c    initial condition 
      do i=1,xn
        if(abs(s(i))<=3.0)then
          eo(i,2)= dsin(s(i)*pi)*(dcos(s(i)*pi/3)+1d0)/2d0
          eo(i,3)= dcos(s(i)*pi)*(dcos(s(i)*pi/3)+1d0)/2d0
c          eo(i,2)= (dcos(s(i)*pi)+1d0)/2d0
c          eo(i,3)= (dcos(s(i)*pi)+1d0)/2d0
          bo(i,2)=-dcos(s(i)*pi)*(dcos(s(i)*pi/3)+1d0)/2d0
          bo(i,3)=dsin(s(i)*pi)*(dcos(s(i)*pi/3)+1d0)/2d0
        else 
          eo(i,2)=0d0
          bo(i,3)=0d0
        end if
c        eo(i,2)=0d0
c        eo(i,3)=0d0
        bo(i,2)=0d0
        bo(i,3)=0d0
      end do 
      
      write(1,*)'var s=['
      write(1,'("{x:",f8.3,", y:0., z:0.},")')(s(i),i=1,xn-1,10)
      write(1,'("{x:",f8.3,", y:0., z:0.}]")')s(xn)
      write(1,*)'var e=new Array()'
      write(1,*)'var b=new Array()'
c    start 
      do m=1,tn-100
        do i=1+10,xn-10
          b(i,2)=bo(i,2)+dt*(eo(i+1,3)-eo(i-1,3))/(2d0*ds)
          b(i,3)=bo(i,3)-dt*(eo(i+1,2)-eo(i-1,2))/(2d0*ds)
          e(i,2)=eo(i,2)-dt*(bo(i+1,3)-bo(i-1,3))/(2d0*ds)
          e(i,3)=eo(i,3)+dt*(bo(i+1,2)-bo(i-1,2))/(2d0*ds)
        end do 
c        if(m==2)then
        if(mod(m,20)==1)then
          write(1,*)'e[',m/20,']=['
          write(1,'("{x:",f8.3,",y:",f8.3,",z:",f8.3,"},")')
     |         (e(i,1),e(i,2),e(i,3),i=1,xn-1,10)
          write(1,'("{x:",f8.3,",y:",f8.3,",z:",f8.3,"}]")')
     |         e(xn,1),e(xn,2),e(xn,3)

          write(1,*)'b[',m/20,']=['
          write(1,'("{x:",f8.3,",y:",f8.3,",z:",f8.3,"},")')
     |         (b(i,1),b(i,2),b(i,3),i=1,xn-1,10)
          write(1,'("{x:",f8.3,",y:",f8.3,",z:",f8.3,"}]")')
     |         b(xn,1),b(xn,2),b(xn,3)

        end if
        do i=1,xn
          eo(i,2)=e(i,2)
          eo(i,3)=e(i,3)
          bo(i,2)=b(i,2)
          bo(i,3)=b(i,3)
        end do 
      end do 
c      write(1,'(1x,f8.3,1x,f8.3,1x,f8.3)')(s(i),e(i,2),b(i,3),i=1,xn,10)
c      write(1,*)'}'
      stop
      end 
