(()=>{"use strict";function e(e=0){return e*Math.PI/180}function t(e,t,i,s){s.save(),s.font=`1px ${t}`;const r=s.measureText(e).width;return s.restore(),i/r}function i(e={x:0,y:0},t={},i=1){const s=t.getBoundingClientRect();return{x:(e.x-s.left)*i,y:(e.y-s.top)*i}}function s(e){return"object"==typeof e&&!Array.isArray(e)&&null!==e}function r(e){return"number"==typeof e&&!Number.isNaN(e)}function n({val:e,isValid:t,errorMessage:i,defaultValue:s,action:r=null}){if(t)return r?r():e;if(void 0===e)return s;throw new Error(i)}function a(e){return e&&e.complete&&0!==e.naturalWidth&&0!==e.naturalHeight}function o(e){return Math.sin(e*Math.PI/2)}const l=-90,h=Object.freeze({left:"left",right:"right",center:"center"}),u=Object.freeze({wheel:{borderColor:"#000",borderWidth:1,debug:!1,image:null,isInteractive:!0,itemBackgroundColors:["#fff"],itemLabelAlign:h.right,itemLabelBaselineOffset:0,itemLabelColors:["#000"],itemLabelFont:"sans-serif",itemLabelFontSizeMax:500,itemLabelRadius:.85,itemLabelRadiusMax:.2,itemLabelRotation:0,itemLabelStrokeColor:"#fff",itemLabelStrokeWidth:0,items:[],lineColor:"#000",lineWidth:1,pixelRatio:0,radius:.95,rotation:0,rotationResistance:-35,rotationSpeedMax:300,offset:{w:0,h:0},onCurrentIndexChange:null,onRest:null,onSpin:null,overlayImage:null,pointerAngle:0},item:{backgroundColor:null,image:null,imageOpacity:1,imageRadius:.5,imageRotation:0,imageScale:1,label:"",labelColor:null,value:null,weight:1}}),d=Object.freeze({pointerLineColor:"#ff00ff",labelOutlineColor:"#ff00ff",labelRadiusColor:"#00ff00",dragEventHue:200});class m{constructor(e,t={}){if(!s(e))throw new Error("wheel must be an instance of Wheel");if(!s(t)&&null!==t)throw new Error("props must be an Object or null");this._wheel=e;for(const e of Object.keys(u.item))this["_"+e]=u.item[e];t?this.init(t):this.init(u.item)}init(e={}){this.backgroundColor=e.backgroundColor,this.image=e.image,this.imageOpacity=e.imageOpacity,this.imageRadius=e.imageRadius,this.imageRotation=e.imageRotation,this.imageScale=e.imageScale,this.label=e.label,this.labelColor=e.labelColor,this.value=e.value,this.weight=e.weight}get backgroundColor(){return this._backgroundColor}set backgroundColor(e){this._backgroundColor="string"==typeof e?e:u.item.backgroundColor,this._wheel.refresh()}get image(){return this._image}set image(e){let t;"string"==typeof e?(t=new Image,t.src=e,t.onload=e=>this._wheel.refresh()):t=u.item.image,this._image=t,this._wheel.refresh()}get imageOpacity(){return this._imageOpacity}set imageOpacity(e){this._imageOpacity="number"==typeof e?e:u.item.imageOpacity,this._wheel.refresh()}get imageRadius(){return this._imageRadius}set imageRadius(e){this._imageRadius="number"==typeof e?e:u.item.imageRadius,this._wheel.refresh()}get imageRotation(){return this._imageRotation}set imageRotation(e){this._imageRotation="number"==typeof e?e:u.item.imageRotation,this._wheel.refresh()}get imageScale(){return this._imageScale}set imageScale(e){this._imageScale="number"==typeof e?e:u.item.imageScale,this._wheel.refresh()}get label(){return this._label}set label(e){this._label="string"==typeof e?e:u.item.label,this._wheel.refresh()}get labelColor(){return this._labelColor}set labelColor(e){this._labelColor="string"==typeof e?e:u.item.labelColor,this._wheel.refresh()}get value(){return this._value}set value(e){this._value=void 0!==e?e:u.item.value}get weight(){return this._weight}set weight(e){this._weight="number"==typeof e?e:u.item.weight}getIndex(){const e=this._wheel.items.findIndex((e=>e===this));if(-1===e)throw new Error("Item not found in parent Wheel");return e}getCenterAngle(){const e=this._wheel.getItemAngles()[this.getIndex()];return e.start+(e.end-e.start)/2}getStartAngle(){return this._wheel.getItemAngles()[this.getIndex()].start}getEndAngle(){return this._wheel.getItemAngles()[this.getIndex()].end}getRandomAngle(){return function(e=0,t=0,i=14){return parseFloat((Math.random()*(t-e)+e).toFixed(i))}(this.getStartAngle(),this.getEndAngle())}}class g{constructor(e,t={}){if(!(e instanceof Element))throw new Error("container must be an instance of Element");if(!s(t)&&null!==t)throw new Error("props must be an Object or null");this._frameRequestId=null,this._rotationSpeed=0,this._rotationDirection=1,this._spinToTimeEnd=null,this._lastSpinFrameTime=null,this._isCursorOverWheel=!1,this.add(e);for(const e of Object.keys(u.wheel))this["_"+e]=u.wheel[e];t?this.init(t):this.init(u.wheel)}init(e={}){this._isInitialising=!0,this.borderColor=e.borderColor,this.borderWidth=e.borderWidth,this.debug=e.debug,this.image=e.image,this.isInteractive=e.isInteractive,this.itemBackgroundColors=e.itemBackgroundColors,this.itemLabelAlign=e.itemLabelAlign,this.itemLabelBaselineOffset=e.itemLabelBaselineOffset,this.itemLabelColors=e.itemLabelColors,this.itemLabelFont=e.itemLabelFont,this.itemLabelFontSizeMax=e.itemLabelFontSizeMax,this.itemLabelRadius=e.itemLabelRadius,this.itemLabelRadiusMax=e.itemLabelRadiusMax,this.itemLabelRotation=e.itemLabelRotation,this.itemLabelStrokeColor=e.itemLabelStrokeColor,this.itemLabelStrokeWidth=e.itemLabelStrokeWidth,this.items=e.items,this.lineColor=e.lineColor,this.lineWidth=e.lineWidth,this.pixelRatio=e.pixelRatio,this.rotationSpeedMax=e.rotationSpeedMax,this.radius=e.radius,this.rotation=e.rotation,this.rotationResistance=e.rotationResistance,this.offset=e.offset,this.onCurrentIndexChange=e.onCurrentIndexChange,this.onRest=e.onRest,this.onSpin=e.onSpin,this.overlayImage=e.overlayImage,this.pointerAngle=e.pointerAngle}add(e){this._canvasContainer=e,this.canvas=document.createElement("canvas"),this._context=this.canvas.getContext("2d"),this._canvasContainer.append(this.canvas),function(e={}){!function(e={}){const t=e.canvas;e._handler_onPointerMoveRefreshCursor=(t={})=>{const i={x:t.clientX,y:t.clientY};e._isCursorOverWheel=e.wheelHitTest(i),e.refreshCursor()},e._handler_onMouseMoveRefreshCursor=(t={})=>{const i={x:t.clientX,y:t.clientY};e._isCursorOverWheel=e.wheelHitTest(i),e.refreshCursor()},e._handler_onPointerDown=(i={})=>{const s={x:i.clientX,y:i.clientY};function r(t={}){t.preventDefault(),e.dragMove({x:t.clientX,y:t.clientY})}function n(i={}){i.preventDefault(),t.releasePointerCapture(i.pointerId),t.removeEventListener("pointermove",r),t.removeEventListener("pointerup",n),t.removeEventListener("pointercancel",n),t.removeEventListener("pointerout",n),e.dragEnd()}e.isInteractive&&e.wheelHitTest(s)&&(i.preventDefault(),e.dragStart(s),t.setPointerCapture(i.pointerId),t.addEventListener("pointermove",r),t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("pointerout",n))},e._handler_onMouseDown=(t={})=>{const i={x:t.clientX,y:t.clientY};function s(t={}){t.preventDefault(),e.dragMove({x:t.clientX,y:t.clientY})}e.isInteractive&&e.wheelHitTest(i)&&(e.dragStart(i),document.addEventListener("mousemove",s),document.addEventListener("mouseup",(function t(i={}){i.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",t),e.dragEnd()})))},e._handler_onTouchStart=(i={})=>{const s={x:i.targetTouches[0].clientX,y:i.targetTouches[0].clientY};function r(t={}){t.preventDefault(),e.dragMove({x:t.targetTouches[0].clientX,y:t.targetTouches[0].clientY})}function n(i={}){i.preventDefault(),t.removeEventListener("touchmove",r),t.removeEventListener("touchend",n),t.removeEventListener("touchcancel",n),e.dragEnd()}e.isInteractive&&e.wheelHitTest(s)&&(i.preventDefault(),e.dragStart(s),t.addEventListener("touchmove",r),t.addEventListener("touchend",n),t.addEventListener("touchcancel",n))},"PointerEvent"in window?(t.addEventListener("pointerdown",e._handler_onPointerDown),t.addEventListener("pointermove",e._handler_onPointerMoveRefreshCursor)):(t.addEventListener("touchstart",e._handler_onTouchStart),t.addEventListener("mousedown",e._handler_onMouseDown),t.addEventListener("mousemove",e._handler_onMouseMoveRefreshCursor))}(e),e._handler_onResize=t=>e.resize(t),window.addEventListener("resize",e._handler_onResize);const t=()=>{e._mediaQueryList=window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),e._mediaQueryList.addEventListener("change",e._handler_onDevicePixelRatioChange,{once:!0})};e._handler_onDevicePixelRatioChange=()=>{e.resize(),t()},t()}(this),!1===this._isInitialising&&this.resize()}remove(){null!==this.canvas&&(window.cancelAnimationFrame(this._frameRequestId),function(e={}){const t=e.canvas;"PointerEvent"in window?(t.removeEventListener("pointerdown",e._handler_onPointerDown),t.removeEventListener("pointermove",e._handler_onPointerMoveRefreshCursor)):(t.removeEventListener("touchstart",e._handler_onTouchStart),t.removeEventListener("mousedown",e._handler_onMouseDown),t.removeEventListener("mousemove",e._handler_onMouseMoveRefreshCursor)),window.removeEventListener("resize",e._handler_onResize),e._mediaQueryList.removeEventListener("change",e._handler_onDevicePixelRatioChange)}(this),this._canvasContainer.removeChild(this.canvas),this._canvasContainer=null,this.canvas=null,this._context=null)}resize(){this.canvas.style.width=this._canvasContainer.clientWidth+"px",this.canvas.style.height=this._canvasContainer.clientHeight+"px";const[e,i]=[this._canvasContainer.clientWidth*this.getActualPixelRatio(),this._canvasContainer.clientHeight*this.getActualPixelRatio()];this.canvas.width=e,this.canvas.height=i;const s=Math.min(e,i),r=s-s*this.offset.w,n=s-s*this.offset.h,a=Math.min(e/r,i/n);this._size=Math.max(r*a,n*a),this._center={x:e/2+e*this.offset.w,y:i/2+i*this.offset.h},this._actualRadius=this._size/2*this.radius,this.itemLabelFontSize=this.itemLabelFontSizeMax*(this._size/500),this.labelMaxWidth=this._actualRadius*(this.itemLabelRadius-this.itemLabelRadiusMax);for(const e of this._items)this.itemLabelFontSize=Math.min(this.itemLabelFontSize,t(e.label,this.itemLabelFont,this.labelMaxWidth,this._context));this.refresh()}draw(t=0){this._frameRequestId=null;const i=this._context;i.clearRect(0,0,this.canvas.width,this.canvas.height),this.animateRotation(t);const s=this.getItemAngles(this._rotation),r=this.getScaledNumber(this._borderWidth);i.textBaseline="middle",i.textAlign=this.itemLabelAlign,i.font=this.itemLabelFontSize+"px "+this.itemLabelFont,i.save();for(const[t,i]of s.entries()){const s=new Path2D;s.moveTo(this._center.x,this._center.y),s.arc(this._center.x,this._center.y,this._actualRadius-r/2,e(i.start+l),e(i.end+l)),this._items[t].path=s}this.drawItemBackgrounds(i,s),this.drawItemImages(i,s),this.drawItemLines(i,s),this.drawItemLabels(i,s),this.drawBorder(i),this.drawImage(i,this._image,!1),this.drawImage(i,this._overlayImage,!0),this.drawPointerLine(i),this.drawDragEvents(i),this._isInitialising=!1}drawItemBackgrounds(e,t=[]){for(const[i,s]of t.entries()){const t=this._items[i];e.fillStyle=t.backgroundColor??this._itemBackgroundColors[i%this._itemBackgroundColors.length],e.fill(t.path)}}drawItemImages(t,i=[]){for(const[s,r]of i.entries()){const i=this._items[s];if(!a(i.image))continue;t.save(),t.clip(i.path);const n=r.start+(r.end-r.start)/2;t.translate(this._center.x+Math.cos(e(n+l))*(this._actualRadius*i.imageRadius),this._center.y+Math.sin(e(n+l))*(this._actualRadius*i.imageRadius)),t.rotate(e(n+i.imageRotation)),t.globalAlpha=i.imageOpacity;const o=this._size/500*i.image.width*i.imageScale,h=this._size/500*i.image.height*i.imageScale,u=-o/2,d=-h/2;t.drawImage(i.image,u,d,o,h),t.restore()}}drawImage(t,i,s=!1){if(!a(i))return;t.translate(this._center.x,this._center.y),s||t.rotate(e(this._rotation));const r=s?this._size:this._size*this.radius,n=-r/2;t.drawImage(i,n,n,r,r),t.resetTransform()}drawPointerLine(t){this.debug&&(t.translate(this._center.x,this._center.y),t.rotate(e(this._pointerAngle+l)),t.beginPath(),t.moveTo(0,0),t.lineTo(2*this._actualRadius,0),t.strokeStyle=d.pointerLineColor,t.lineWidth=this.getScaledNumber(2),t.stroke(),t.resetTransform())}drawBorder(e){if(this._borderWidth<=0)return;const t=this.getScaledNumber(this._borderWidth),i=this._borderColor||"transparent";if(e.beginPath(),e.strokeStyle=i,e.lineWidth=t,e.arc(this._center.x,this._center.y,this._actualRadius-t/2,0,2*Math.PI),e.stroke(),this.debug){const t=this.getScaledNumber(1);e.beginPath(),e.strokeStyle=e.strokeStyle=d.labelRadiusColor,e.lineWidth=t,e.arc(this._center.x,this._center.y,this._actualRadius*this.itemLabelRadius,0,2*Math.PI),e.stroke(),e.beginPath(),e.strokeStyle=e.strokeStyle=d.labelRadiusColor,e.lineWidth=t,e.arc(this._center.x,this._center.y,this._actualRadius*this.itemLabelRadiusMax,0,2*Math.PI),e.stroke()}}drawItemLines(t,i=[]){if(this._lineWidth<=0)return;const s=this.getScaledNumber(this._lineWidth),r=this.getScaledNumber(this._borderWidth);t.translate(this._center.x,this._center.y);for(const n of i)t.rotate(e(n.start+l)),t.beginPath(),t.moveTo(0,0),t.lineTo(this._actualRadius-r,0),t.strokeStyle=this.lineColor,t.lineWidth=s,t.stroke(),t.rotate(-e(n.start+l));t.resetTransform()}drawItemLabels(t,i=[]){const s=this.itemLabelFontSize*-this.itemLabelBaselineOffset,r=this.getScaledNumber(1),n=this.getScaledNumber(2*this._itemLabelStrokeWidth);for(const[a,o]of i.entries()){const i=this._items[a],h=i.labelColor||this._itemLabelColors[a%this._itemLabelColors.length]||"transparent";if(""===i.label.trim()||"transparent"===h)continue;t.save(),t.clip(i.path);const u=o.start+(o.end-o.start)/2;t.translate(this._center.x+Math.cos(e(u+l))*(this._actualRadius*this.itemLabelRadius),this._center.y+Math.sin(e(u+l))*(this._actualRadius*this.itemLabelRadius)),t.rotate(e(u+l)),t.rotate(e(this.itemLabelRotation)),this.debug&&(t.beginPath(),t.moveTo(0,0),t.lineTo(-this.labelMaxWidth,0),t.strokeStyle=d.labelOutlineColor,t.lineWidth=r,t.stroke(),t.strokeRect(0,-this.itemLabelFontSize/2,-this.labelMaxWidth,this.itemLabelFontSize)),this._itemLabelStrokeWidth>0&&(t.lineWidth=n,t.strokeStyle=this._itemLabelStrokeColor,t.lineJoin="round",t.strokeText(i.label,0,s)),t.fillStyle=h,t.fillText(i.label,0,s),t.restore()}}drawDragEvents(e){if(!this.debug||!this.dragEvents?.length)return;const t=[...this.dragEvents].reverse(),i=this.getScaledNumber(.5),s=this.getScaledNumber(4);for(const[r,n]of t.entries()){const t=r/this.dragEvents.length*100;e.beginPath(),e.arc(n.x,n.y,s,0,2*Math.PI),e.fillStyle=`hsl(${d.dragEventHue},100%,${t}%)`,e.strokeStyle="#000",e.lineWidth=i,e.fill(),e.stroke()}}animateRotation(e=0){if(null!==this._spinToTimeEnd){if(e>=this._spinToTimeEnd)return this.rotation=this._spinToEndRotation,this._spinToTimeEnd=null,void this.raiseEvent_onRest();const t=this._spinToTimeEnd-this._spinToTimeStart;let i=(e-this._spinToTimeStart)/t;i=i<0?0:i;const s=this._spinToEndRotation-this._spinToStartRotation;return this.rotation=this._spinToStartRotation+s*this._spinToEasingFunction(i),void this.refresh()}if(null!==this._lastSpinFrameTime){const t=e-this._lastSpinFrameTime;return t>0&&(this.rotation+=t/1e3*this._rotationSpeed%360,this._rotationSpeed=this.getRotationSpeedPlusDrag(t),0===this._rotationSpeed?(this.raiseEvent_onRest(),this._lastSpinFrameTime=null):this._lastSpinFrameTime=e),void this.refresh()}}getRotationSpeedPlusDrag(e=0){const t=this._rotationSpeed+this.rotationResistance*(e/1e3)*this._rotationDirection;return 1===this._rotationDirection&&t<0||-1===this._rotationDirection&&t>=0?0:t}spin(e=0){if(!r(e))throw new Error("rotationSpeed must be a number");this.dragEvents=[],this.beginSpin(e,"spin")}spinTo(e=0,t=0,i=null){if(!r(e))throw new Error("Error: rotation must be a number");if(!r(t))throw new Error("Error: duration must be a number");this.stop(),this.dragEvents=[],this.animate(e,t,i),this.raiseEvent_onSpin({method:"spinto",targetRotation:e,duration:t})}spinToItem(e=0,t=0,i=!0,s=1,r=1,n=null){this.stop(),this.dragEvents=[];const a=i?this.items[e].getCenterAngle():this.items[e].getRandomAngle();let o=function(e=0,t=0,i=1){let s=(e%360+t)%360;return s=function(e=0){return Number(e.toFixed(9))}(s),s=(1===i?360-s:360+s)%360,s*=i,e+s}(this.rotation,a-this._pointerAngle,r);o+=360*s*r,this.animate(o,t,n),this.raiseEvent_onSpin({method:"spintoitem",targetItemIndex:e,targetRotation:o,duration:t})}animate(e,t,i){this._spinToStartRotation=this.rotation,this._spinToEndRotation=e,this._spinToTimeStart=performance.now(),this._spinToTimeEnd=this._spinToTimeStart+t,this._spinToEasingFunction=i||o,this.refresh()}stop(){this._spinToTimeEnd=null,this._rotationSpeed=0,this._lastSpinFrameTime=null}getScaledNumber(e){return e/500*this._size}getActualPixelRatio(){return 0!==this._pixelRatio?this._pixelRatio:window.devicePixelRatio}wheelHitTest(e={x:0,y:0}){return function(e={x:0,y:0},t,i,s){return(e.x-t)**2+(e.y-i)**2<=s**2}(i(e,this.canvas,this.getActualPixelRatio()),this._center.x,this._center.y,this._actualRadius)}refreshCursor(){if(this.isInteractive){if(this.isDragging)return void(this.canvas.style.cursor="grabbing");if(this._isCursorOverWheel)return void(this.canvas.style.cursor="grab")}this.canvas.style.cursor=""}getAngleFromCenter(e={x:0,y:0}){return(function(e,t,i,s){const r=e-i,n=t-s;let a=Math.atan2(-n,-r);return a*=180/Math.PI,a<0&&(a+=360),a}(this._center.x,this._center.y,e.x,e.y)+90)%360}getCurrentIndex(){return this._currentIndex}refreshCurrentIndex(e=[]){0===this._items.length&&(this._currentIndex=-1);for(const[r,n]of e.entries())if(t=this._pointerAngle,(i=n.start%360)<(s=n.end%360)?i<=t&&t<s:i<=t||t<s){if(this._currentIndex===r)break;this._currentIndex=r,this._isInitialising||this.raiseEvent_onCurrentIndexChange();break}var t,i,s}getItemAngles(e=0){let t=0;for(const e of this.items)t+=e.weight;const i=360/t;let s,r=e;const n=[];for(const e of this._items)s=e.weight*i,n.push({start:r,end:r+s}),r+=s;return this._items.length>1&&(n[n.length-1].end=n[0].start+360),n}refresh(){null===this._frameRequestId&&(this._frameRequestId=window.requestAnimationFrame((e=>this.draw(e))))}limitSpeed(e=0,t=0){const i=Math.min(e,t);return Math.max(i,-t)}beginSpin(e=0,t=""){this.stop(),this._rotationSpeed=this.limitSpeed(e,this._rotationSpeedMax),this._lastSpinFrameTime=performance.now(),this._rotationDirection=this._rotationSpeed>=0?1:-1,0!==this._rotationSpeed&&this.raiseEvent_onSpin({method:t,rotationSpeed:this._rotationSpeed,rotationResistance:this._rotationResistance}),this.refresh()}refreshAriaLabel(){this.canvas.setAttribute("role","img");const e=this.items.length>=2?` The wheel has ${this.items.length} slices.`:"";this.canvas.setAttribute("aria-label","An image of a spinning prize wheel."+e)}get borderColor(){return this._borderColor}set borderColor(e){this._borderColor=n({val:e,isValid:"string"==typeof e,errorMessage:"Wheel.borderColor must be a string",defaultValue:u.wheel.borderColor}),this.refresh()}get borderWidth(){return this._borderWidth}set borderWidth(e){this._borderWidth=n({val:e,isValid:r(e),errorMessage:"Wheel.borderWidth must be a number",defaultValue:u.wheel.borderWidth}),this.refresh()}get debug(){return this._debug}set debug(e){this._debug=n({val:e,isValid:"boolean"==typeof e,errorMessage:"Wheel.debug must be a boolean",defaultValue:u.wheel.debug}),this.refresh()}get image(){return this._image?.src??null}set image(e){this._image=n({val:e,isValid:"string"==typeof e||null===e,errorMessage:"Wheel.image must be a url (string) or null",defaultValue:u.wheel.image,action:()=>{if(null===e)return null;const t=new Image;return t.src=e,t.onload=e=>this.refresh(),t}}),this.refresh()}get isInteractive(){return this._isInteractive}set isInteractive(e){this._isInteractive=n({val:e,isValid:"boolean"==typeof e,errorMessage:"Wheel.isInteractive must be a boolean",defaultValue:u.wheel.isInteractive}),this.refreshCursor()}get itemBackgroundColors(){return this._itemBackgroundColors}set itemBackgroundColors(e){this._itemBackgroundColors=n({val:e,isValid:Array.isArray(e),errorMessage:"Wheel.itemBackgroundColors must be an array",defaultValue:u.wheel.itemBackgroundColors}),this.refresh()}get itemLabelAlign(){return this._itemLabelAlign}set itemLabelAlign(e){this._itemLabelAlign=n({val:e,isValid:"string"==typeof e,errorMessage:"Wheel.itemLabelAlign must be a string",defaultValue:u.wheel.itemLabelAlign}),this.refresh()}get itemLabelBaselineOffset(){return this._itemLabelBaselineOffset}set itemLabelBaselineOffset(e){this._itemLabelBaselineOffset=n({val:e,isValid:r(e),errorMessage:"Wheel.itemLabelBaselineOffset must be a number",defaultValue:u.wheel.itemLabelBaselineOffset}),this.resize()}get itemLabelColors(){return this._itemLabelColors}set itemLabelColors(e){this._itemLabelColors=n({val:e,isValid:Array.isArray(e),errorMessage:"Wheel.itemLabelColors must be an array",defaultValue:u.wheel.itemLabelColors}),this.refresh()}get itemLabelFont(){return this._itemLabelFont}set itemLabelFont(e){this._itemLabelFont=n({val:e,isValid:"string"==typeof e,errorMessage:"Wheel.itemLabelFont must be a string",defaultValue:u.wheel.itemLabelFont}),this.resize()}get itemLabelFontSizeMax(){return this._itemLabelFontSizeMax}set itemLabelFontSizeMax(e){this._itemLabelFontSizeMax=n({val:e,isValid:r(e),errorMessage:"Wheel.itemLabelFontSizeMax must be a number",defaultValue:u.wheel.itemLabelFontSizeMax}),this.resize()}get itemLabelRadius(){return this._itemLabelRadius}set itemLabelRadius(e){this._itemLabelRadius=n({val:e,isValid:r(e),errorMessage:"Wheel.itemLabelRadius must be a number",defaultValue:u.wheel.itemLabelRadius}),this.resize()}get itemLabelRadiusMax(){return this._itemLabelRadiusMax}set itemLabelRadiusMax(e){this._itemLabelRadiusMax=n({val:e,isValid:r(e),errorMessage:"Wheel.itemLabelRadiusMax must be a number",defaultValue:u.wheel.itemLabelRadiusMax}),this.resize()}get itemLabelRotation(){return this._itemLabelRotation}set itemLabelRotation(e){this._itemLabelRotation=n({val:e,isValid:r(e),errorMessage:"Wheel.itemLabelRotation must be a number",defaultValue:u.wheel.itemLabelRotation}),this.refresh()}get itemLabelStrokeColor(){return this._itemLabelStrokeColor}set itemLabelStrokeColor(e){this._itemLabelStrokeColor=n({val:e,isValid:"string"==typeof e,errorMessage:"Wheel.itemLabelStrokeColor must be a string",defaultValue:u.wheel.itemLabelStrokeColor}),this.refresh()}get itemLabelStrokeWidth(){return this._itemLabelStrokeWidth}set itemLabelStrokeWidth(e){this._itemLabelStrokeWidth=n({val:e,isValid:r(e),errorMessage:"Wheel.itemLabelStrokeWidth must be a number",defaultValue:u.wheel.itemLabelStrokeWidth}),this.refresh()}get items(){return this._items}set items(e){this._items=n({val:e,isValid:Array.isArray(e),errorMessage:"Wheel.items must be an array of Items",defaultValue:u.wheel.items,action:()=>{const t=[];for(const i of e)t.push(new m(this,{backgroundColor:i.backgroundColor,image:i.image,imageRadius:i.imageRadius,imageRotation:i.imageRotation,imageScale:i.imageScale,label:i.label,labelColor:i.labelColor,value:i.value,weight:i.weight}));return t}}),this.refreshAriaLabel(),this.refreshCurrentIndex(this.getItemAngles(this._rotation)),this.resize()}get lineColor(){return this._lineColor}set lineColor(e){this._lineColor=n({val:e,isValid:"string"==typeof e,errorMessage:"Wheel.lineColor must be a string",defaultValue:u.wheel.lineColor}),this.refresh()}get lineWidth(){return this._lineWidth}set lineWidth(e){this._lineWidth=n({val:e,isValid:r(e),errorMessage:"Wheel.lineWidth must be a number",defaultValue:u.wheel.lineWidth}),this.refresh()}get offset(){return this._offset}set offset(e){this._offset=n({val:e,isValid:s(e),errorMessage:"Wheel.offset must be an object",defaultValue:u.wheel.offset}),this.resize()}get onCurrentIndexChange(){return this._onCurrentIndexChange}set onCurrentIndexChange(e){this._onCurrentIndexChange=n({val:e,isValid:"function"==typeof e||null===e,errorMessage:"Wheel.onCurrentIndexChange must be a function or null",defaultValue:u.wheel.onCurrentIndexChange})}get onRest(){return this._onRest}set onRest(e){this._onRest=n({val:e,isValid:"function"==typeof e||null===e,errorMessage:"Wheel.onRest must be a function or null",defaultValue:u.wheel.onRest})}get onSpin(){return this._onSpin}set onSpin(e){this._onSpin=n({val:e,isValid:"function"==typeof e||null===e,errorMessage:"Wheel.onSpin must be a function or null",defaultValue:u.wheel.onSpin})}get overlayImage(){return this._overlayImage?.src??null}set overlayImage(e){this._overlayImage=n({val:e,isValid:"string"==typeof e||null===e,errorMessage:"Wheel.overlayImage must be a url (string) or null",defaultValue:u.wheel.overlayImage,action:()=>{if(null===e)return null;const t=new Image;return t.src=e,t.onload=e=>this.refresh(),t}}),this.refresh()}get pixelRatio(){return this._pixelRatio}set pixelRatio(e){this._pixelRatio=n({val:e,isValid:r(e),errorMessage:"Wheel.pixelRatio must be a number",defaultValue:u.wheel.pixelRatio}),this.dragEvents=[],this.resize()}get pointerAngle(){return this._pointerAngle}set pointerAngle(e){this._pointerAngle=n({val:e,isValid:r(e)&&e>=0,errorMessage:"Wheel.pointerAngle must be a number between 0 and 360",defaultValue:u.wheel.pointerAngle,action:()=>e%360}),this.debug&&this.refresh()}get radius(){return this._radius}set radius(e){this._radius=n({val:e,isValid:r(e),errorMessage:"Wheel.radius must be a number",defaultValue:u.wheel.radius}),this.resize()}get rotation(){return this._rotation}set rotation(e){this._rotation=n({val:e,isValid:r(e),errorMessage:"Wheel.rotation must be a number",defaultValue:u.wheel.rotation}),this.refreshCurrentIndex(this.getItemAngles(this._rotation)),this.refresh()}get rotationResistance(){return this._rotationResistance}set rotationResistance(e){this._rotationResistance=n({val:e,isValid:r(e),errorMessage:"Wheel.rotationResistance must be a number",defaultValue:u.wheel.rotationResistance})}get rotationSpeed(){return this._rotationSpeed}get rotationSpeedMax(){return this._rotationSpeedMax}set rotationSpeedMax(e){this._rotationSpeedMax=n({val:e,isValid:r(e)&&e>=0,errorMessage:"Wheel.rotationSpeedMax must be a number >= 0",defaultValue:u.wheel.rotationSpeedMax})}dragStart(e={x:0,y:0}){const t=i(e,this.canvas,this.getActualPixelRatio());this.isDragging=!0,this.stop(),this.dragEvents=[{distance:0,x:t.x,y:t.y,now:performance.now()}],this.refreshCursor()}dragMove(e={x:0,y:0}){const t=i(e,this.canvas,this.getActualPixelRatio()),s=this.getAngleFromCenter(t),r=this.dragEvents[0],n=function(e=0,t=0){const i=function(e=0,t=0){const i=e+t;let s;return s=i>0?i%360:360+i%360,360===s&&(s=0),s}(e,180-t);return 180-i}(this.getAngleFromCenter(r),s);this.dragEvents.unshift({distance:n,x:t.x,y:t.y,now:performance.now()}),this.debug&&this.dragEvents.length>=40&&this.dragEvents.pop(),this.rotation+=n}dragEnd(){this.isDragging=!1;let e=0;const t=performance.now();for(const[i,s]of this.dragEvents.entries()){if(this.isDragEventTooOld(t,s)){this.dragEvents.length=i,this.debug&&this.refresh();break}e+=s.distance}this.refreshCursor(),0!==e&&this.beginSpin(4*e,"interact")}isDragEventTooOld(e=0,t={}){return e-t.now>250}raiseEvent_onCurrentIndexChange(e={}){this.onCurrentIndexChange?.({type:"currentIndexChange",currentIndex:this._currentIndex,...e})}raiseEvent_onRest(e={}){this.onRest?.({type:"rest",currentIndex:this._currentIndex,rotation:this._rotation,...e})}raiseEvent_onSpin(e={}){this.onSpin?.({type:"spin",...e})}}document.addEventListener("DOMContentLoaded",(function(){var e,t,i=document.querySelector(".wheel-container"),s=["#FF5733","#33FF57","#3357FF","#F033FF","#FF33F6"];document.getElementById("wheelForm").addEventListener("submit",(function(r){var n;r.preventDefault(),n=document.getElementById("itemNames").value.split("\n").filter(Boolean),t=n.map((function(e,t){return{label:e.trim(),backgroundColor:s[t%s.length],defaultColor:s[t%s.length]}})),i.innerHTML="",e=new g(i,{items:t}),console.log("Wheel initialized",e)})),document.getElementById("spinButton").addEventListener("click",(function(){if(e){var i=700+200*Math.random();e.spin(i,1e4),setTimeout((function(){var i=e.getCurrentIndex(),s=document.getElementById("winnerDisplay");void 0!==i&&t&&i<t.length?(t.forEach((function(e,t){e.backgroundColor=t===i?"#FFFF00":e.defaultColor})),e.init({items:t}),s.textContent="The winner is: ".concat(t[i].label,"!"),s.style.display="block"):console.error("Winner element not found or items are not properly defined")}),1e4)}else alert("Please create the wheel first by submitting the form.")}))}))})();