"use strict";!function(){function t(t,i){return null!=t?t:i}function i(t){this.garden=t,this.reset()}function e(t){this.nodes=[],this.container=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.nightMode=!1,this.started=!1,1!==n&&(this.canvas.style.transform="scale("+1/n+")",this.canvas.style.transformOrigin="0 0"),this.canvas.id="nodegarden",this.resize(),this.container.appendChild(this.canvas)}function s(){a.nightMode=!a.nightMode,a.nightMode?document.body.classList.add("nightmode"):document.body.classList.remove("nightmode")}i.prototype.reset=function(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=i.x,s=i.y,n=i.vx,h=i.vy,o=i.m;this.x=t(e,Math.random()*this.garden.width),this.y=t(s,Math.random()*this.garden.height),this.vx=t(n,1*Math.random()-.5),this.vy=t(h,1*Math.random()-.5),this.m=t(o,2*Math.random()+1),this.pos=Math.random()>=.5},i.prototype.addForce=function(t,i){this.vx+=t*i.x/this.m,this.vy+=t*i.y/this.m},i.prototype.distanceTo=function(t){var i=t.x-this.x,e=t.y-this.y,s=Math.sqrt(Math.pow(i,2)+Math.pow(e,2));return{x:i,y:e,total:s}},i.prototype.collideTo=function(t){t.vx=t.m*t.vx/(this.m+t.m)+this.m*this.vx/(this.m+t.m),t.vy=t.m*t.vy/(this.m+t.m)+this.m*this.vy/(this.m+t.m),this.reset()};var n=window.devicePixelRatio;e.prototype.start=function(){this.playing||(this.playing=!0,this.render(!0))},e.prototype.stop=function(){this.playing&&(this.playing=!1)},e.prototype.resize=function(){this.width=window.innerWidth*n,this.height=window.innerHeight*n,this.area=this.width*this.height,this.nodes.length=Math.sqrt(this.area)/25|0,this.canvas.width=this.width,this.canvas.height=this.height;for(var t=0,e=this.nodes.length;e>t;t++)this.nodes[t]||(this.nodes[t]=new i(this))},e.prototype.render=function(t){var i,e,s,n,h,o,a,r,d,c=this;if(this.playing){for(t&&requestAnimationFrame(function(){c.render(!0)}),this.ctx.clearRect(0,0,this.width,this.height),a=0,d=this.nodes.length-1;d>a;a++)for(r=a+1;d+1>r;r++){if(h=this.nodes[a],o=this.nodes[r],i=h.distanceTo(o),i.total<=h.m/2+o.m/2){if(h.m<=o.m){h.collideTo(o);continue}if(o.m<=h.m){o.collideTo(h);continue}}e={x:i.x/i.total,y:i.y/i.total},s=3*(h.m*o.m)/Math.pow(i.total,2);var m=100*s;if(!(.05>m)){var l=h.pos===o.pos?-1:1;this.ctx.beginPath(),1===l?this.ctx.strokeStyle="rgba(191,63,31,"+(1>m?m:1)+")":this.ctx.strokeStyle="rgba(31,63,191,"+(1>m?m:1)+")",this.ctx.moveTo(h.x,h.y),this.ctx.lineTo(o.x,o.y),this.ctx.stroke(),h.addForce(l*s,e),o.addForce(l*-s,e)}}for(this.nightMode?this.ctx.fillStyle="#ffffff":this.ctx.fillStyle="#000000",a=0,d=this.nodes.length;d>a;a++)n=this.nodes[a],this.ctx.beginPath(),this.ctx.arc(n.x,n.y,n.m,0,2*Math.PI),this.ctx.fill(),n.x+=n.vx,n.y+=n.vy,(n.x>this.width+25||n.x<-25||n.y>this.height+25||n.y<-25)&&n.reset()}};var h=document.getElementById("container"),o=document.getElementsByClassName("moon")[0],a=new e(h),r=new Date;a.start(),(r.getHours()>18||r.getHours()<6)&&s();var d=-1;h.addEventListener("click",function(t){d++,d>a.nodes.length-1&&(d=0),a.nodes[d].reset({x:t.pageX,y:t.pageY,vx:0,vy:0})}),o.addEventListener("click",s),window.addEventListener("resize",function(){a.resize()})}();
