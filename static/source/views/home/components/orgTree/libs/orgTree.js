/**
 * plugin: orgTree
 * author: joinFisher
 * require: jquery.js  ztree.js 
 */
/*! layer-v3.1.1 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */
 ;!function(e,t){"use strict";var i,n,a=e.layui&&layui.define,o={getPath:function(){var e=document.currentScript?document.currentScript.src:function(){for(var e,t=document.scripts,i=t.length-1,n=i;n>0;n--)if("interactive"===t[n].readyState){e=t[n].src;break}return e||t[i].src}();return e.substring(0,e.lastIndexOf("/")+1)}(),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"],getStyle:function(t,i){var n=t.currentStyle?t.currentStyle:e.getComputedStyle(t,null);return n[n.getPropertyValue?"getPropertyValue":"getAttribute"](i)},link:function(t,i,n){if(r.path){var a=document.getElementsByTagName("head")[0],s=document.createElement("link");"string"==typeof i&&(n=i);var l=(n||t).replace(/\.|\//g,""),f="layuicss-"+l,c=0;s.rel="stylesheet",s.href=r.path+t,s.id=f,document.getElementById(f)||a.appendChild(s),"function"==typeof i&&!function u(){return++c>80?e.console&&console.error("orgTree.css: Invalid"):void(1989===parseInt(o.getStyle(document.getElementById(f),"width"))?i():setTimeout(u,100))}()}}},r={v:"3.1.1",ie:function(){var t=navigator.userAgent.toLowerCase();return!!(e.ActiveXObject||"ActiveXObject"in e)&&((t.match(/msie\s(\d+)/)||[])[1]||"11")}(),index:e.layer&&e.layer.v?1e5:0,path:o.getPath,config:function(e,t){return e=e||{},r.cache=o.config=i.extend({},o.config,e),r.path=o.config.path||r.path,"string"==typeof e.extend&&(e.extend=[e.extend]),o.config.path&&r.ready(),e.extend?(a?layui.addcss("modules/layer/"+e.extend):o.link("theme/"+e.extend),this):this},ready:function(e){var t="layer",i="",n=(a?"modules/layer/":"")+"./default/orgTree.css?v="+r.v+i;return a?layui.addcss(n,e,t):o.link(n,e,t),this},alert:function(e,t,n){var a="function"==typeof t;return a&&(n=t),r.open(i.extend({content:e,yes:n},a?{}:t))},confirm:function(e,t,n,a){var s="function"==typeof t;return s&&(a=n,n=t),r.open(i.extend({content:e,btn:o.btn,yes:n,btn2:a},s?{}:t))},msg:function(e,n,a){var s="function"==typeof n,f=o.config.skin,c=(f?f+" "+f+"-msg":"")||"layui-layer-msg",u=l.anim.length-1;return s&&(a=n),r.open(i.extend({content:e,time:3e3,shade:!1,skin:c,title:!1,closeBtn:!1,btn:!1,resize:!1,end:a},s&&!o.config.skin?{skin:c+" layui-layer-hui",anim:u}:function(){return n=n||{},(n.icon===-1||n.icon===t&&!o.config.skin)&&(n.skin=c+" "+(n.skin||"layui-layer-hui")),n}()))},load:function(e,t){return r.open(i.extend({type:3,icon:e||0,resize:!1,shade:.01},t))},tips:function(e,t,n){return r.open(i.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:210},n))}},s=function(e){var t=this;t.index=++r.index,t.config=i.extend({},t.config,o.config,e),document.body?t.creat():setTimeout(function(){t.creat()},30)};s.pt=s.prototype;var l=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];l.anim=["layer-anim-00","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],s.pt.config={type:0,shade:.3,fixed:!0,move:l[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},s.pt.vessel=function(e,t){var n=this,a=n.index,r=n.config,s=r.zIndex+a,f="object"==typeof r.title,c=r.maxmin&&(1===r.type||2===r.type),u=r.title?'<div class="layui-layer-title" style="'+(f?r.title[1]:"")+'">'+(f?r.title[0]:r.title)+"</div>":"";return r.zIndex=s,t([r.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+a+'" times="'+a+'" style="'+("z-index:"+(s-1)+"; ")+'"></div>':"",'<div class="'+l[0]+(" layui-layer-"+o.type[r.type])+(0!=r.type&&2!=r.type||r.shade?"":" layui-layer-border")+" "+(r.skin||"")+'" id="'+l[0]+a+'" type="'+o.type[r.type]+'" times="'+a+'" showtime="'+r.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+s+"; width:"+r.area[0]+";height:"+r.area[1]+(r.fixed?"":";position:absolute;")+'">'+(e&&2!=r.type?"":u)+'<div id="'+(r.id||"")+'" class="layui-layer-content'+(0==r.type&&r.icon!==-1?" layui-layer-padding":"")+(3==r.type?" layui-layer-loading"+r.icon:"")+'">'+(0==r.type&&r.icon!==-1?'<i class="layui-layer-ico layui-layer-ico'+r.icon+'"></i>':"")+(1==r.type&&e?"":r.content||"")+'</div><span class="layui-layer-setwin">'+function(){var e=c?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return r.closeBtn&&(e+='<a class="layui-layer-ico '+l[7]+" "+l[7]+(r.title?r.closeBtn:4==r.type?"1":"2")+'" href="javascript:;"></a>'),e}()+"</span>"+(r.btn?function(){var e="";"string"==typeof r.btn&&(r.btn=[r.btn]);for(var t=0,i=r.btn.length;t<i;t++)e+='<a class="'+l[6]+t+'">'+r.btn[t]+"</a>";return'<div class="'+l[6]+" layui-layer-btn-"+(r.btnAlign||"")+'">'+e+"</div>"}():"")+(r.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],u,i('<div class="layui-layer-move"></div>')),n},s.pt.creat=function(){var e=this,t=e.config,a=e.index,s=t.content,f="object"==typeof s,c=i("body");if(!t.id||!i("#"+t.id)[0]){switch("string"==typeof t.area&&(t.area="auto"===t.area?["",""]:[t.area,""]),t.shift&&(t.anim=t.shift),6==r.ie&&(t.fixed=!1),t.type){case 0:t.btn="btn"in t?t.btn:o.btn[0],r.closeAll("dialog");break;case 2:var s=t.content=f?t.content:[t.content||"http://layer.layui.com","auto"];t.content='<iframe scrolling="'+(t.content[1]||"auto")+'" allowtransparency="true" id="'+l[4]+a+'" name="'+l[4]+a+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+t.content[0]+'"></iframe>';break;case 3:delete t.title,delete t.closeBtn,t.icon===-1&&0===t.icon,r.closeAll("loading");break;case 4:f||(t.content=[t.content,"body"]),t.follow=t.content[1],t.content=t.content[0]+'<i class="layui-layer-TipsG"></i>',delete t.title,t.tips="object"==typeof t.tips?t.tips:[t.tips,!0],t.tipsMore||r.closeAll("tips")}if(e.vessel(f,function(n,r,u){c.append(n[0]),f?function(){2==t.type||4==t.type?function(){i("body").append(n[1])}():function(){s.parents("."+l[0])[0]||(s.data("display",s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]),i("#"+l[0]+a).find("."+l[5]).before(r))}()}():c.append(n[1]),i(".layui-layer-move")[0]||c.append(o.moveElem=u),e.layero=i("#"+l[0]+a),t.scrollbar||l.html.css("overflow","hidden").attr("layer-full",a)}).auto(a),i("#layui-layer-shade"+e.index).css({"background-color":t.shade[1]||"#000",opacity:t.shade[0]||t.shade}),2==t.type&&6==r.ie&&e.layero.find("iframe").attr("src",s[0]),4==t.type?e.tips():e.offset(),t.fixed&&n.on("resize",function(){e.offset(),(/^\d+%$/.test(t.area[0])||/^\d+%$/.test(t.area[1]))&&e.auto(a),4==t.type&&e.tips()}),t.time<=0||setTimeout(function(){r.close(e.index)},t.time),e.move().callback(),l.anim[t.anim]){var u="layer-anim "+l.anim[t.anim];e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){i(this).removeClass(u)})}t.isOutAnim&&e.layero.data("isOutAnim",!0)}},s.pt.auto=function(e){var t=this,a=t.config,o=i("#"+l[0]+e);""===a.area[0]&&a.maxWidth>0&&(r.ie&&r.ie<8&&a.btn&&o.width(o.innerWidth()),o.outerWidth()>a.maxWidth&&o.width(a.maxWidth));var s=[o.innerWidth(),o.innerHeight()],f=o.find(l[1]).outerHeight()||0,c=o.find("."+l[6]).outerHeight()||0,u=function(e){e=o.find(e),e.height(s[1]-f-c-2*(0|parseFloat(e.css("padding-top"))))};switch(a.type){case 2:u("iframe");break;default:""===a.area[1]?a.maxHeight>0&&o.outerHeight()>a.maxHeight?(s[1]=a.maxHeight,u("."+l[5])):a.fixed&&s[1]>=n.height()&&(s[1]=n.height(),u("."+l[5])):u("."+l[5])}return t},s.pt.offset=function(){var e=this,t=e.config,i=e.layero,a=[i.outerWidth(),i.outerHeight()],o="object"==typeof t.offset;e.offsetTop=(n.height()-a[1])/2,e.offsetLeft=(n.width()-a[0])/2,o?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=n.width()-a[0]:"b"===t.offset?e.offsetTop=n.height()-a[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=n.width()-a[0]):"rb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=n.width()-a[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?n.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?n.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=n.scrollTop(),e.offsetLeft+=n.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=n.height()-(i.find(l[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},s.pt.tips=function(){var e=this,t=e.config,a=e.layero,o=[a.outerWidth(),a.outerHeight()],r=i(t.follow);r[0]||(r=i("body"));var s={width:r.outerWidth(),height:r.outerHeight(),top:r.offset().top,left:r.offset().left},f=a.find(".layui-layer-TipsG"),c=t.tips[0];t.tips[1]||f.remove(),s.autoLeft=function(){s.left+o[0]-n.width()>0?(s.tipLeft=s.left+s.width-o[0],f.css({right:12,left:"auto"})):s.tipLeft=s.left},s.where=[function(){s.autoLeft(),s.tipTop=s.top-o[1]-10,f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left+s.width+10,s.tipTop=s.top,f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",t.tips[1])},function(){s.autoLeft(),s.tipTop=s.top+s.height+10,f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left-o[0]-10,s.tipTop=s.top,f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",t.tips[1])}],s.where[c-1](),1===c?s.top-(n.scrollTop()+o[1]+16)<0&&s.where[2]():2===c?n.width()-(s.left+s.width+o[0]+16)>0||s.where[3]():3===c?s.top-n.scrollTop()+s.height+o[1]+16-n.height()>0&&s.where[0]():4===c&&o[0]+16-s.left>0&&s.where[1](),a.find("."+l[5]).css({"background-color":t.tips[1],"padding-right":t.closeBtn?"30px":""}),a.css({left:s.tipLeft-(t.fixed?n.scrollLeft():0),top:s.tipTop-(t.fixed?n.scrollTop():0)})},s.pt.move=function(){var e=this,t=e.config,a=i(document),s=e.layero,l=s.find(t.move),f=s.find(".layui-layer-resize"),c={};return t.move&&l.css("cursor","move"),l.on("mousedown",function(e){e.preventDefault(),t.move&&(c.moveStart=!0,c.offset=[e.clientX-parseFloat(s.css("left")),e.clientY-parseFloat(s.css("top"))],o.moveElem.css("cursor","move").show())}),f.on("mousedown",function(e){e.preventDefault(),c.resizeStart=!0,c.offset=[e.clientX,e.clientY],c.area=[s.outerWidth(),s.outerHeight()],o.moveElem.css("cursor","se-resize").show()}),a.on("mousemove",function(i){if(c.moveStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1],l="fixed"===s.css("position");if(i.preventDefault(),c.stX=l?0:n.scrollLeft(),c.stY=l?0:n.scrollTop(),!t.moveOut){var f=n.width()-s.outerWidth()+c.stX,u=n.height()-s.outerHeight()+c.stY;a<c.stX&&(a=c.stX),a>f&&(a=f),o<c.stY&&(o=c.stY),o>u&&(o=u)}s.css({left:a,top:o})}if(t.resize&&c.resizeStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1];i.preventDefault(),r.style(e.index,{width:c.area[0]+a,height:c.area[1]+o}),c.isResize=!0,t.resizing&&t.resizing(s)}}).on("mouseup",function(e){c.moveStart&&(delete c.moveStart,o.moveElem.hide(),t.moveEnd&&t.moveEnd(s)),c.resizeStart&&(delete c.resizeStart,o.moveElem.hide())}),e},s.pt.callback=function(){function e(){var e=a.cancel&&a.cancel(t.index,n);e===!1||r.close(t.index)}var t=this,n=t.layero,a=t.config;t.openLayer(),a.success&&(2==a.type?n.find("iframe").on("load",function(){a.success(n,t.index)}):a.success(n,t.index)),6==r.ie&&t.IE6(n),n.find("."+l[6]).children("a").on("click",function(){var e=i(this).index();if(0===e)a.yes?a.yes(t.index,n):a.btn1?a.btn1(t.index,n):r.close(t.index);else{var o=a["btn"+(e+1)]&&a["btn"+(e+1)](t.index,n);o===!1||r.close(t.index)}}),n.find("."+l[7]).on("click",e),a.shadeClose&&i("#layui-layer-shade"+t.index).on("click",function(){r.close(t.index)}),n.find(".layui-layer-min").on("click",function(){var e=a.min&&a.min(n);e===!1||r.min(t.index,a)}),n.find(".layui-layer-max").on("click",function(){i(this).hasClass("layui-layer-maxmin")?(r.restore(t.index),a.restore&&a.restore(n)):(r.full(t.index,a),setTimeout(function(){a.full&&a.full(n)},100))}),a.end&&(o.end[t.index]=a.end)},o.reselect=function(){i.each(i("select"),function(e,t){var n=i(this);n.parents("."+l[0])[0]||1==n.attr("layer")&&i("."+l[0]).length<1&&n.removeAttr("layer").show(),n=null})},s.pt.IE6=function(e){i("select").each(function(e,t){var n=i(this);n.parents("."+l[0])[0]||"none"===n.css("display")||n.attr({layer:"1"}).hide(),n=null})},s.pt.openLayer=function(){var e=this;r.zIndex=e.config.zIndex,r.setTop=function(e){var t=function(){r.zIndex++,e.css("z-index",r.zIndex+1)};return r.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",t),r.zIndex}},o.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},o.rescollbar=function(e){l.html.attr("layer-full")==e&&(l.html[0].style.removeProperty?l.html[0].style.removeProperty("overflow"):l.html[0].style.removeAttribute("overflow"),l.html.removeAttr("layer-full"))},e.layer=r,r.getChildFrame=function(e,t){return t=t||i("."+l[4]).attr("times"),i("#"+l[0]+t).find("iframe").contents().find(e)},r.getFrameIndex=function(e){return i("#"+e).parents("."+l[4]).attr("times")},r.iframeAuto=function(e){if(e){var t=r.getChildFrame("html",e).outerHeight(),n=i("#"+l[0]+e),a=n.find(l[1]).outerHeight()||0,o=n.find("."+l[6]).outerHeight()||0;n.css({height:t+a+o}),n.find("iframe").css({height:t})}},r.iframeSrc=function(e,t){i("#"+l[0]+e).find("iframe").attr("src",t)},r.style=function(e,t,n){var a=i("#"+l[0]+e),r=a.find(".layui-layer-content"),s=a.attr("type"),f=a.find(l[1]).outerHeight()||0,c=a.find("."+l[6]).outerHeight()||0;a.attr("minLeft");s!==o.type[3]&&s!==o.type[4]&&(n||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-f-c<=64&&(t.height=64+f+c)),a.css(t),c=a.find("."+l[6]).outerHeight(),s===o.type[2]?a.find("iframe").css({height:parseFloat(t.height)-f-c}):r.css({height:parseFloat(t.height)-f-c-parseFloat(r.css("padding-top"))-parseFloat(r.css("padding-bottom"))}))},r.min=function(e,t){var a=i("#"+l[0]+e),s=a.find(l[1]).outerHeight()||0,f=a.attr("minLeft")||181*o.minIndex+"px",c=a.css("position");o.record(a),o.minLeft[0]&&(f=o.minLeft[0],o.minLeft.shift()),a.attr("position",c),r.style(e,{width:180,height:s,left:f,top:n.height()-s,position:"fixed",overflow:"hidden"},!0),a.find(".layui-layer-min").hide(),"page"===a.attr("type")&&a.find(l[4]).hide(),o.rescollbar(e),a.attr("minLeft")||o.minIndex++,a.attr("minLeft",f)},r.restore=function(e){var t=i("#"+l[0]+e),n=t.attr("area").split(",");t.attr("type");r.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(l[4]).show(),o.rescollbar(e)},r.full=function(e){var t,a=i("#"+l[0]+e);o.record(a),l.html.attr("layer-full")||l.html.css("overflow","hidden").attr("layer-full",e),clearTimeout(t),t=setTimeout(function(){var t="fixed"===a.css("position");r.style(e,{top:t?0:n.scrollTop(),left:t?0:n.scrollLeft(),width:n.width(),height:n.height()},!0),a.find(".layui-layer-min").hide()},100)},r.title=function(e,t){var n=i("#"+l[0]+(t||r.index)).find(l[1]);n.html(e)},r.close=function(e){var t=i("#"+l[0]+e),n=t.attr("type"),a="layer-anim-close";if(t[0]){var s="layui-layer-wrap",f=function(){if(n===o.type[1]&&"object"===t.attr("conType")){t.children(":not(."+l[5]+")").remove();for(var a=t.find("."+s),r=0;r<2;r++)a.unwrap();a.css("display",a.data("display")).removeClass(s)}else{if(n===o.type[2])try{var f=i("#"+l[4]+e)[0];f.contentWindow.document.write(""),f.contentWindow.close(),t.find("."+l[5])[0].removeChild(f)}catch(c){}t[0].innerHTML="",t.remove()}"function"==typeof o.end[e]&&o.end[e](),delete o.end[e]};t.data("isOutAnim")&&t.addClass("layer-anim "+a),i("#layui-layer-moves, #layui-layer-shade"+e).remove(),6==r.ie&&o.reselect(),o.rescollbar(e),t.attr("minLeft")&&(o.minIndex--,o.minLeft.push(t.attr("minLeft"))),r.ie&&r.ie<10||!t.data("isOutAnim")?f():setTimeout(function(){f()},200)}},r.closeAll=function(e){i.each(i("."+l[0]),function(){var t=i(this),n=e?t.attr("type")===e:1;n&&r.close(t.attr("times")),n=null})};var f=r.cache||{},c=function(e){return f.skin?" "+f.skin+" "+f.skin+"-"+e:""};r.prompt=function(e,t){var a="";if(e=e||{},"function"==typeof e&&(t=e),e.area){var o=e.area;a='style="width: '+o[0]+"; height: "+o[1]+';"',delete e.area}var s,l=2==e.formType?'<textarea class="layui-layer-input"'+a+">"+(e.value||"")+"</textarea>":function(){return'<input type="'+(1==e.formType?"password":"text")+'" class="layui-layer-input" value="'+(e.value||"")+'">'}(),f=e.success;return delete e.success,r.open(i.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:l,skin:"layui-layer-prompt"+c("prompt"),maxWidth:n.width(),success:function(e){s=e.find(".layui-layer-input"),s.focus(),"function"==typeof f&&f(e)},resize:!1,yes:function(i){var n=s.val();""===n?s.focus():n.length>(e.maxlength||500)?r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(e.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",s,{tips:1}):t&&t(n,i,s)}},e))},r.tab=function(e){e=e||{};var t=e.tab||{},n="layui-this",a=e.success;return delete e.success,r.open(i.extend({type:1,skin:"layui-layer-tab"+c("tab"),resize:!1,title:function(){var e=t.length,i=1,a="";if(e>0)for(a='<span class="'+n+'">'+t[0].title+"</span>";i<e;i++)a+="<span>"+t[i].title+"</span>";return a}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=t.length,i=1,a="";if(e>0)for(a='<li class="layui-layer-tabli '+n+'">'+(t[0].content||"no content")+"</li>";i<e;i++)a+='<li class="layui-layer-tabli">'+(t[i].content||"no  content")+"</li>";return a}()+"</ul>",success:function(t){var o=t.find(".layui-layer-title").children(),r=t.find(".layui-layer-tabmain").children();o.on("mousedown",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0;var a=i(this),o=a.index();a.addClass(n).siblings().removeClass(n),r.eq(o).show().siblings().hide(),"function"==typeof e.change&&e.change(o)}),"function"==typeof a&&a(t)}},e))},r.photos=function(t,n,a){function o(e,t,i){var n=new Image;return n.src=e,n.complete?t(n):(n.onload=function(){n.onload=null,t(n)},void(n.onerror=function(e){n.onerror=null,i(e)}))}var s={};if(t=t||{},t.photos){var l=t.photos.constructor===Object,f=l?t.photos:{},u=f.data||[],d=f.start||0;s.imgIndex=(0|d)+1,t.img=t.img||"img";var y=t.success;if(delete t.success,l){if(0===u.length)return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var p=i(t.photos),h=function(){u=[],p.find(t.img).each(function(e){var t=i(this);t.attr("layer-index",e),u.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(h(),0===u.length)return;if(n||p.on("click",t.img,function(){var e=i(this),n=e.attr("layer-index");r.photos(i.extend(t,{photos:{start:n,data:u,tab:t.tab},full:t.full}),!0),h()}),!n)return}s.imgprev=function(e){s.imgIndex--,s.imgIndex<1&&(s.imgIndex=u.length),s.tabimg(e)},s.imgnext=function(e,t){s.imgIndex++,s.imgIndex>u.length&&(s.imgIndex=1,t)||s.tabimg(e)},s.keyup=function(e){if(!s.end){var t=e.keyCode;e.preventDefault(),37===t?s.imgprev(!0):39===t?s.imgnext(!0):27===t&&r.close(s.index)}},s.tabimg=function(e){if(!(u.length<=1))return f.start=s.imgIndex-1,r.close(s.index),r.photos(t,!0,e)},s.event=function(){s.bigimg.hover(function(){s.imgsee.show()},function(){s.imgsee.hide()}),s.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),s.imgprev()}),s.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),s.imgnext()}),i(document).on("keyup",s.keyup)},s.loadi=r.load(1,{shade:!("shade"in t)&&.9,scrollbar:!1}),o(u[d].src,function(n){r.close(s.loadi),s.index=r.open(i.extend({type:1,id:"layui-layer-photos",area:function(){var a=[n.width,n.height],o=[i(e).width()-100,i(e).height()-100];if(!t.full&&(a[0]>o[0]||a[1]>o[1])){var r=[a[0]/o[0],a[1]/o[1]];r[0]>r[1]?(a[0]=a[0]/r[0],a[1]=a[1]/r[0]):r[0]<r[1]&&(a[0]=a[0]/r[1],a[1]=a[1]/r[1])}return[a[0]+"px",a[1]+"px"]}(),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,isOutAnim:!1,skin:"layui-layer-photos"+c("photos"),content:'<div class="layui-layer-phimg"><img src="'+u[d].src+'" alt="'+(u[d].alt||"")+'" layer-pid="'+u[d].pid+'"><div class="layui-layer-imgsee">'+(u.length>1?'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>':"")+'<div class="layui-layer-imgbar" style="display:'+(a?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(u[d].alt||"")+"</a><em>"+s.imgIndex+"/"+u.length+"</em></span></div></div></div>",success:function(e,i){s.bigimg=e.find(".layui-layer-phimg"),s.imgsee=e.find(".layui-layer-imguide,.layui-layer-imgbar"),s.event(e),t.tab&&t.tab(u[d],e),"function"==typeof y&&y(e)},end:function(){s.end=!0,i(document).off("keyup",s.keyup)}},t))},function(){r.close(s.loadi),r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){u.length>1&&s.imgnext(!0,!0)}})})}},o.run=function(t){i=t,n=i(e),l.html=i("html"),r.open=function(e){var t=new s(e);return t.index}},e.layui&&layui.define?(r.ready(),layui.define("jquery",function(t){r.path=layui.cache.dir,o.run(layui.$),e.layer=r,t("layer",r)})):"function"==typeof define&&define.amd?define(["jquery"],function(){return o.run(e.jQuery),r}):function(){o.run(e.jQuery),r.ready()}()}(window);
/*tiny-pinyin 
* github: https://github.com/creeperyang/pinyin
* test-demo: https://creeperyang.github.io/pinyin/
*/
!function(N,A){"object"==typeof exports&&"object"==typeof module?module.exports=A():"function"==typeof define&&define.amd?define([],A):"object"==typeof exports?exports.Pinyin=A():N.Pinyin=A()}(this,function(){return function(N){function A(I){if(t[I])return t[I].exports;var U=t[I]={i:I,l:!1,exports:{}};return N[I].call(U.exports,U,U.exports,A),U.l=!0,U.exports}var t={};return A.m=N,A.c=t,A.i=function(N){return N},A.d=function(N,t,I){A.o(N,t)||Object.defineProperty(N,t,{configurable:!1,enumerable:!0,get:I})},A.n=function(N){var t=N&&N.__esModule?function(){return N.default}:function(){return N};return A.d(t,"a",t),t},A.o=function(N,A){return Object.prototype.hasOwnProperty.call(N,A)},A.p="",A(A.s=3)}([function(N,A,t){"use strict";function I(N){N&&("function"==typeof N&&(N=[N]),N.forEach&&N.forEach(function(N){"function"==typeof N&&N(o)}))}function U(N){return N||null===i?("object"===("undefined"==typeof Intl?"undefined":n(Intl))&&Intl.Collator?(f=new Intl.Collator(["zh-Hans-CN","zh-CN"]),i=1===Intl.Collator.supportedLocalesOf(["zh-CN"]).length):i=!1,i):i}function e(N){var A=o.UNIHANS,t=o.PINYINS,I=o.EXCEPTIONS,U={source:N};if(N in I)return U.type=E,U.target=I[N],U;var e=-1,r=void 0;if(N.charCodeAt(0)<256)return U.type=H,U.target=N,U;if((r=f.compare(N,G))<0)return U.type=u,U.target=N,U;if(0===r)U.type=E,e=0;else{if((r=f.compare(N,O))>0)return U.type=u,U.target=N,U;0===r&&(U.type=E,e=A.length-1)}if(U.type=E,e<0)for(var n=0,i=A.length-1;n<=i;){e=~~((n+i)/2);var S=A[e];if(0===(r=f.compare(N,S)))break;r>0?n=e+1:i=e-1}return r<0&&e--,U.target=t[e],U.target||(U.type=u,U.target=U.source),U}function r(N){if("string"!=typeof N)throw new Error("argument should be string.");if(!U())throw new Error("not support Intl or zh-CN language.");return N.split("").map(function(N){return e(N)})}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(N){return typeof N}:function(N){return N&&"function"==typeof Symbol&&N.constructor===Symbol&&N!==Symbol.prototype?"symbol":typeof N},o=t(2),G="阿",O="鿿",H=1,E=2,u=3,i=null,f=void 0;N.exports={isSupported:U,parse:r,patchDict:I,genToken:e,convertToPinyin:function(N,A,t){return r(N).map(function(N){return t&&N.type===E?N.target.toLowerCase():N.target}).join(A||"")}}},function(N,A,t){"use strict";A=N.exports=function(N){N.EXCEPTIONS={"嗲":"DIA","碡":"ZHOU","聒":"GUO","炔":"QUE","蚵":"KE","砉":"HUA","嬷":"MO","蹊":"XI","丬":"PAN","霰":"XIAN","豉":"CHI","饧":"XING","帧":"ZHEN","芎":"XIONG","谁":"SHUI","钶":"KE"},N.UNIHANS[91]="伕",N.UNIHANS[347]="仚",N.UNIHANS[393]="诌",N.UNIHANS[39]="婤",N.UNIHANS[50]="腠",N.UNIHANS[369]="攸",N.UNIHANS[123]="乯",N.UNIHANS[171]="刕",N.UNIHANS[102]="佝",N.UNIHANS[126]="犿",N.UNIHANS[176]="列",N.UNIHANS[178]="刢",N.UNIHANS[252]="娝",N.UNIHANS[330]="偸"},A.shouldPatch=function(N){return"function"==typeof N&&("FOU"===N("伕").target&&"XIA"===N("仚").target&&"ZHONG"===N("诌").target&&"CHONG"===N("婤").target&&"CONG"===N("腠").target&&"YONG"===N("攸").target&&"HOU"===N("乯").target&&"LENG"===N("刕").target&&"GONG"===N("佝").target&&"HUAI"===N("犿").target&&"LIAO"===N("列").target&&"LIN"===N("刢").target&&"E"===N("钶").target)}},function(N,A,t){"use strict";var I=["阿","哎","安","肮","凹","八","挀","扳","邦","勹","陂","奔","伻","屄","边","灬","憋","汃","冫","癶","峬","嚓","偲","参","仓","撡","冊","嵾","曽","叉","芆","辿","伥","抄","车","抻","阷","吃","充","抽","出","欻","揣","巛","刅","吹","旾","逴","呲","匆","凑","粗","汆","崔","邨","搓","咑","呆","丹","当","刀","嘚","扥","灯","氐","甸","刁","爹","丁","丟","东","吺","厾","耑","垖","吨","多","妸","诶","奀","鞥","儿","发","帆","匚","飞","分","丰","覅","仏","紑","夫","旮","侅","甘","冈","皋","戈","给","根","刯","工","勾","估","瓜","乖","关","光","归","丨","呙","哈","咍","佄","夯","茠","诃","黒","拫","亨","噷","叿","齁","乎","花","怀","欢","巟","灰","昏","吙","丌","加","戋","江","艽","阶","巾","坕","冂","丩","凥","姢","噘","军","咔","开","刊","忼","尻","匼","肎","劥","空","抠","扝","夸","蒯","宽","匡","亏","坤","扩","垃","来","兰","啷","捞","肋","勒","崚","哩","俩","奁","良","撩","毟","拎","伶","溜","囖","龙","瞜","噜","驴","娈","掠","抡","罗","呣","妈","埋","嫚","牤","猫","么","呅","门","甿","咪","宀","喵","乜","民","名","谬","摸","哞","毪","嗯","拏","腉","囡","囔","孬","疒","娞","恁","能","妮","拈","娘","鸟","捏","囜","宁","妞","农","羺","奴","女","奻","疟","黁","挪","喔","讴","妑","拍","眅","乓","抛","呸","喷","匉","丕","囨","剽","氕","姘","乒","钋","剖","仆","七","掐","千","呛","悄","癿","亲","靑","卭","丘","区","峑","缺","夋","呥","穣","娆","惹","人","扔","日","茸","厹","邚","挼","堧","婑","瞤","捼","仨","毢","三","桒","掻","閪","森","僧","杀","筛","山","伤","弰","奢","申","升","尸","収","书","刷","衰","闩","双","脽","吮","说","厶","忪","捜","苏","狻","夊","孙","唆","他","囼","坍","汤","夲","忑","熥","剔","天","旫","帖","厅","囲","偷","凸","湍","推","吞","乇","穵","歪","弯","尣","危","昷","翁","挝","乌","夕","虲","仙","乡","灱","些","心","星","凶","休","吁","吅","削","坃","丫","恹","央","幺","倻","一","囙","应","哟","佣","优","扜","囦","曰","晕","帀","災","兂","匨","傮","则","贼","怎","増","扎","捚","沾","张","佋","蜇","贞","争","之","中","州","朱","抓","拽","专","妆","隹","宒","卓","乲","宗","邹","租","钻","厜","尊","昨","兙"],U=["A","AI","AN","ANG","AO","BA","BAI","BAN","BANG","BAO","BEI","BEN","BENG","BI","BIAN","BIAO","BIE","BIN","BING","BO","BU","CA","CAI","CAN","CANG","CAO","CE","CEN","CENG","CHA","CHAI","CHAN","CHANG","CHAO","CHE","CHEN","CHENG","CHI","CHONG","CHOU","CHU","CHUA","CHUAI","CHUAN","CHUANG","CHUI","CHUN","CHUO","CI","CONG","COU","CU","CUAN","CUI","CUN","CUO","DA","DAI","DAN","DANG","DAO","DE","DEN","DENG","DI","DIAN","DIAO","DIE","DING","DIU","DONG","DOU","DU","DUAN","DUI","DUN","DUO","E","EI","EN","ENG","ER","FA","FAN","FANG","FEI","FEN","FENG","FIAO","FO","FOU","FU","GA","GAI","GAN","GANG","GAO","GE","GEI","GEN","GENG","GONG","GOU","GU","GUA","GUAI","GUAN","GUANG","GUI","GUN","GUO","HA","HAI","HAN","HANG","HAO","HE","HEI","HEN","HENG","HM","HONG","HOU","HU","HUA","HUAI","HUAN","HUANG","HUI","HUN","HUO","JI","JIA","JIAN","JIANG","JIAO","JIE","JIN","JING","JIONG","JIU","JU","JUAN","JUE","JUN","KA","KAI","KAN","KANG","KAO","KE","KEN","KENG","KONG","KOU","KU","KUA","KUAI","KUAN","KUANG","KUI","KUN","KUO","LA","LAI","LAN","LANG","LAO","LE","LEI","LENG","LI","LIA","LIAN","LIANG","LIAO","LIE","LIN","LING","LIU","LO","LONG","LOU","LU","LV","LUAN","LVE","LUN","LUO","M","MA","MAI","MAN","MANG","MAO","ME","MEI","MEN","MENG","MI","MIAN","MIAO","MIE","MIN","MING","MIU","MO","MOU","MU","N","NA","NAI","NAN","NANG","NAO","NE","NEI","NEN","NENG","NI","NIAN","NIANG","NIAO","NIE","NIN","NING","NIU","NONG","NOU","NU","NV","NUAN","NVE","NUN","NUO","O","OU","PA","PAI","PAN","PANG","PAO","PEI","PEN","PENG","PI","PIAN","PIAO","PIE","PIN","PING","PO","POU","PU","QI","QIA","QIAN","QIANG","QIAO","QIE","QIN","QING","QIONG","QIU","QU","QUAN","QUE","QUN","RAN","RANG","RAO","RE","REN","RENG","RI","RONG","ROU","RU","RUA","RUAN","RUI","RUN","RUO","SA","SAI","SAN","SANG","SAO","SE","SEN","SENG","SHA","SHAI","SHAN","SHANG","SHAO","SHE","SHEN","SHENG","SHI","SHOU","SHU","SHUA","SHUAI","SHUAN","SHUANG","SHUI","SHUN","SHUO","SI","SONG","SOU","SU","SUAN","SUI","SUN","SUO","TA","TAI","TAN","TANG","TAO","TE","TENG","TI","TIAN","TIAO","TIE","TING","TONG","TOU","TU","TUAN","TUI","TUN","TUO","WA","WAI","WAN","WANG","WEI","WEN","WENG","WO","WU","XI","XIA","XIAN","XIANG","XIAO","XIE","XIN","XING","XIONG","XIU","XU","XUAN","XUE","XUN","YA","YAN","YANG","YAO","YE","YI","YIN","YING","YO","YONG","YOU","YU","YUAN","YUE","YUN","ZA","ZAI","ZAN","ZANG","ZAO","ZE","ZEI","ZEN","ZENG","ZHA","ZHAI","ZHAN","ZHANG","ZHAO","ZHE","ZHEN","ZHENG","ZHI","ZHONG","ZHOU","ZHU","ZHUA","ZHUAI","ZHUAN","ZHUANG","ZHUI","ZHUN","ZHUO","ZI","ZONG","ZOU","ZU","ZUAN","ZUI","ZUN","ZUO",""],e={"曾":"ZENG","沈":"SHEN","嗲":"DIA","碡":"ZHOU","聒":"GUO","炔":"QUE","蚵":"KE","砉":"HUA","嬤":"MO","嬷":"MO","蹒":"PAN","蹊":"XI","丬":"PAN","霰":"XIAN","莘":"XIN","豉":"CHI","饧":"XING","筠":"JUN","长":"CHANG","帧":"ZHEN","峙":"SHI","郍":"NA","芎":"XIONG","谁":"SHUI"};N.exports={PINYINS:U,UNIHANS:I,EXCEPTIONS:e}},function(N,A,t){"use strict";var I=t(0),U=t(1);I.isSupported()&&U.shouldPatch(I.genToken)&&I.patchDict(U),N.exports=I}])});
/**
 * theme: 文件架构选择器组件
 * author: joinFisher
 * date: 2018-02-27
 * versions: 0.0.1
 *
 * 后期插件将更新支持： 
 * 1、只开启组织
 * 2、只开启人物
 * 需要后端接口支持
 * 
 */
/*
1、代码最前面的分号，可以防止多个文件压缩合并以为其他文件最后一行语句没加分号，而引起合并后的语法错误。

2、匿名函数(function(){})();：由于Javascript执行表达式是从圆括号里面到外面，所以可以用圆括号强制执行声明的函数。避免函数体内和外部的变量冲突。

3、$实参:$是jquery的简写，很多方法和类库也使用$,这里$接受jQuery对象，也是为了避免$变量冲突，保证插件可以正常运行。

4、window, document实参分别接受window, document对象，window, document对象都是全局环境下的，而在函数体内的window, document其实是局部变量，不是全局的window, document对象。这样做有个好处就是可以提高性能，减少作用域链的查询时间，如果你在函数体内需要多次调用window 或 document对象，这样把window 或 document对象当作参数传进去，这样做是非常有必要的。当然如果你的插件用不到这两个对象，那么就不用传递这两个参数了。

5、最后剩下一个undefined形参了，那么这个形参是干什么用的呢，看起来是有点多余。undefined在老一辈的浏览器是不被支持的，直接使用会报错，js框架要考虑到兼容性，因此增加一个形参undefined
*/
;(function($,window,document,undefined){

    var oTree =function(ele, options){
        this.$element = $(ele); //主元素
        this.defaults = {
            all: false,     //人物组织都开启
            area: null,     //弹窗框宽高
            search: true    //支持搜索
			
        };
        //将一个新的空对象做为$.extend的第一个参数，defaults和用户传递的参数对象紧随其后，
        //这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。
        this.settings = $.extend({}, this.defaults, options); 
    };
    var saveVal = []; //操作以保存的值， 数组形式
    var allJson;      //从后台获取原始组织架构数据，防止多次加载  
    var filterDataList;  //数据结构进行处理
    var orgZTree; //可以多方位操作ztree
    oTree.prototype = {
        dialog: function(){

            var contentsHTML, $wrapper, _this, $treeWrapper, allLoadData;

            _this = this;
            contentsHTML = '<div class="multiPickerDlg clearfix"><div class="multiPickerDlg_left"><div class="multiPickerDlg_left_cnt"><!--loading--><div class="ww_loading loading_left_wrap js_search_loading"><span class="ww_loadingIconSmall"></span><span class="ww_loading_text">正在搜索，请稍候…</span></div><!--jstree--><div id="partyTree" class="multiPickerDlg_left_cnt_list"><div class="ww_loading js_search_loading"><span class="ww_loadingIconSmall"></span><span class="ww_loading_text">正在搜索，请稍候…</span></div><div class="ztree_wrapper"><ul id="ztreeArea" class="ztree"></ul></div></div><div class="multiPickerDlg_left_mask js_left_mask"></div></div></div><div class="multiPickerDlg_right"><div class="multiPickerDlg_right_title">已选择的文件文件</div><div class="multiPickerDlg_right_cnt"><div class="js_right_col"><ul id="saveNode"></ul></div><div class="multiPickerDlg_right_no_result"><i></i>未选择文件</div></div></div></div>';

            // //获取全部组织架构包括人物
            // $.getJSON('./root-org.json').done(function(data){

              

            // });
			
			
			
			 allJson ={
                "msg":"操作成功",
                "code":"0",
                "info":[
                    {
                        "fileId":"3",
                        "fileName":"销售合同.txt",
                        "urlPath":null,
                        "fileSize":null,
                        "rootFileId":"1",
                        "parFileId":"1",
                        "type":"0",
                        "path":"/test",
                        "remark":null,
                        "enable":"1",
                        "userId":"1",
                        "version":null,
                        "createdTime":1535101941000,
                        "updateTime":1535539356000,
                        "fileRoleInfos":[
                            {
                                "role":"mod",
                                "name":"编辑"
                            },
                            {
                                "role":"upd",
                                "name":"上传"
                            },
                            {
                                "role":"qry",
                                "name":"查看"
                            },
                            {
                                "role":"del",
                                "name":"删除"
                            },
                            {
                                "role":"down",
                                "name":"下载"
                            }
                        ],
                        "parent":false
                    },
                    {
                        "fileId":"2",
                        "fileName":"售前资料夹",
                        "urlPath":null,
                        "fileSize":null,
                        "rootFileId":"1",
                        "parFileId":"1",
                        "type":"1",
                        "path":"/test",
                        "remark":null,
                        "enable":"1",
                        "userId":"1",
                        "version":null,
                        "createdTime":1535101895000,
                        "updateTime":1535101898000,
                        "fileRoleInfos":[
                            {
                                "role":"qry",
                                "name":"查看"
                            }
                        ],
                        "parent":true
                    }
                ]
                }; 
            var tmp  ={}
            tmp.data= allJson.info
			filterDataList = _this.filterDataSloveList(tmp);

			// 页面进入渲染
			_this.getValue();

			if(_this.settings.all){
				//全部开启
				allLoadData = _this.dataSolve(tmp);  //进行数据处理
			};

            _this.$element.on('click', '.js_show_party_selector', function(){
				
				
				
                if(!allJson || allJson == '') {
                    layer.msg('获取组织架构失败', {icon: 5});
                    return;
                }
                layer.confirm(contentsHTML, {
                    skin: 'org-skin',
                    title: '选择成员所在文件',
                    area: _this.settings.area , 
                    resize: false, //禁止弹出窗拉伸
                    btn: ['确认','取消'], //按钮
                    cancel: function(index, layero){  //右上角关闭按钮
                        var oldValue = _this.savedJson();
                        saveVal = oldValue;
                    }
                }, function(index){

                    _this.renderOut(saveVal);
                    layer.close(index);

                }, function(){

                    var oldValue = _this.savedJson();
                    saveVal = oldValue;

                });

                //第一个loading隐藏
                $('.ww_loading').css('display','none');

                $leftWrap = $('.multiPickerDlg_left_cnt');
                $treeWrapper = $('.multiPickerDlg').find('.multiPickerDlg_left_cnt_list');
                $zTreeWrap = $treeWrapper.find('#ztreeArea');


                //判断搜索是否开启
                if(_this.settings.search) {
                    _this.searchFuc(filterDataList);
                };

                if(_this.settings.all){
                    //全部开启
                    _this.loadAll($zTreeWrap, allLoadData);
                };

            });

        },
        filterDataSloveList: function(data) {

            var _this = this;

            var treeNode = _this.dataSolve(data);
            var filterResult = []; 
            function filterTree(fNode, dataNode) {
                dataNode.forEach(function(aDate){
                    fNode.push({
                        id: aDate.id,
                        name: aDate.name,
                        crumbs: aDate.crumbs
                    });
                    if(aDate.children) {
                        filterTree(fNode, aDate.children)
                    }
                });
            };
            filterTree(filterResult, treeNode);
            function unique(arr) {
                var ret = [];
                for (var i = 0, j = arr.length; i < j; i++) {
                    if (ret.indexOf(arr[i].id) === -1) {
                        ret.push(arr[i]);
                    };
                };
                return ret;
            }
            var nodeResult=unique(filterResult);

            return nodeResult;
        },
		

        loadAll: function(ele, data){

            var _this = this;
            var $ele = $(ele);
            orgZTree = $.fn.zTree.init($ele ,{
                view:{
                    dblClickExpand: false,
                    selectedMulti: false,
                    showLine: false,
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
                    addDiyDom: addDiyDom
                },
				data:{
						key: {
							isParent: "isParent"
						}
					},
                callback: {
					onExpand: function(event, treeId, treeNode){

                            //     orgZTree.addNodes(treeNode, {
                            //         id: '8',
                            //         name: 'test',
                            //         parentId:treeId ,
                            //         crumbs: '',
                                
                            // });


                            var param = {parFileId:treeNode.id,key:true};
                            var treeObj = $.fn.zTree.getZTreeObj("treeTerm");
                            var parentZNode = treeObj.getNodeByParam("id", treeNode.id, null);//获取指定父节点
                            var childNodes = treeObj.transformToArray(treeNode);//获取子节点集合
                            //因为子节点还包括组织，所以这里需要筛选一下
                            // console.log(childNodes);
                            var key = false;
                            for(var i in childNodes){
                                if(childNodes[i].id){//如果当前组织有终端 就不再加载
                                    key = true;
                                    break;
                                }                  
                            }
                            if(!key){//如果不存在  就加载(第一次加载)
                                $.ajax({
                                    method:'post',
                                    url: ip + 'mgmt/getTerm.do',
                                    data:param,
                                    success:function(res){
                                        
                                        if(data.termList){
                                            data = data.termList; 
                                        }else{
                                            data=[];
                                        }                                           
                                        for(var i in data){
                                            var orgCode = (data[i].orgCode).substring((data[i].orgCode).length - 7);                  
                                            orgCode = Number(orgCode);
                                            data[i].id = Number(data[i].udn);
                                            data[i].pId = orgCode;
                                        }
                                        treeObj.addNodes(parentZNode,data, false);    //添加节点                           
                                    }
                                })
                            }

                        

					},
                    onClick:function(event, treeId, treeNode, clickFlag){
                        

                        //文件夹不让选择
                        if(treeNode.type==1){
                            return false
                        }

                        //获取对应的id或者name值，只需treeNode.id 或者 treeNode.name 即可
                        //myZTree.expandNode(treeNode);
                        //myZTree.cancelSelectedNode(treeNode);
                        var curId = treeNode.id;
                        var curName = treeNode.name;
                        var curCrumbs = treeNode.crumbs;
                        var repIndex;  //获取重复数组的索引
                        

                        var aObj = $("#" + treeNode.tId + "_a");
                        var checkIcon = aObj.find('.jstree-custom-checked');
                        if(checkIcon.hasClass('selected')) {
                            checkIcon.removeClass('selected');
                        }else {
                            checkIcon.addClass('selected');
                        };


                        if(saveVal.length > 0) {
                            for(var i=0; i<saveVal.length; i++) {
                                if(saveVal[i].id == curId) {
                                    repIndex = i;
                                };
                            };
                        };
                        if(repIndex){ 
                        	//点击之后 当前项与已选择文件 有重复  
                            saveVal.splice(repIndex, 1);
                        }else{
                            if(repIndex == 0) {
                            	//因为 splice从1开始， 而索引是从0开始,所以第一个元素特殊处理
                                saveVal.splice(repIndex, 1);
                            }else {
                                saveVal.push({
                                    id: curId,
                                    name: curName,
                                    crumbs: curCrumbs
                                });
                            };
                        };

                        //以数组形式返回选种值    
                        _this.renderNode(saveVal);
                        _this.deleteNode(saveVal);

                    }
                }

            }, data);
			

            //ztree 鼠标经过添加&删除 效果
            function addHoverDom(treeId, treeNode) {
                var pObj = $('#' + treeNode.tId);
                pObj.children('.jstree-wholerow').addClass('jstree-wholerow-hover');
            };
            function removeHoverDom(treeId, treeNode) {
                $('.ztree .jstree-wholerow').removeClass('jstree-wholerow-hover');
            };

            //添加自定义div
            function addDiyDom(treeId, treeNode) {

                var aObj = $('#' + treeNode.tId + '_a');
                if ($('#diyBtn_'+treeNode.id).length>0) return;

                var selectedStr = '<div class="jstree-custom-checked"></div>';
                var hoverStr = '<div class="jstree-wholerow"></div>';

                var pObj = $('#'+ treeNode.tId);
                pObj.prepend(hoverStr);
                aObj.append(selectedStr);

                pObj.find('.jstree-wholerow').eq(0).bind('click', function(){

                        //获取对应的id或者name值，只需treeNode.id 或者 treeNode.name 即可
                        var curId = treeNode.id;
                        var curName = treeNode.name;
                        var curCrumbs = treeNode.crumbs;
                        var repIndex;  //获取重复数组的索引

                        var aObj = $("#" + treeNode.tId + "_a");
                        var checkIcon = aObj.find('.jstree-custom-checked');
                        if(checkIcon.hasClass('selected')) {
                            checkIcon.removeClass('selected');
                        }else {
                            checkIcon.addClass('selected');
                        };

                        if(saveVal.length > 0) {
                            for(var i=0; i<saveVal.length; i++) {
                                if(saveVal[i].id == curId) {
                                    repIndex = i;
                                };
                            };
                        };

                        if(repIndex){   
                            saveVal.splice(repIndex, 1);
                        }else{
                            if(repIndex == 0) {
                                saveVal.splice(repIndex, 1);
                            }else {
                                saveVal.push({
                                    id: curId,
                                    name: curName,
                                    crumbs: curCrumbs
                                });
                            };
                        };

                        //以数组形式返回选种值    
                        _this.renderNode(saveVal);
                        _this.deleteNode(saveVal);

                });

                for(var i=0; i<saveVal.length; i++) {
                    if (treeNode.id == saveVal[i].id) {
                        aObj.find('.jstree-custom-checked').addClass('selected');
                    }
                };
                
            };       

            //渲染已选中文件
            if(saveVal&&saveVal.length>0) {
                _this.renderNode(saveVal);
                _this.deleteNode(saveVal);
            };

        },
        searchFuc: function(data){

            var _this = this;
            $('.multiPickerDlg').addClass('multiPickerDlg_WithSearch');

            var sdom = '<div class="multiPickerDlg_search_wrapper">'
                     + '<div class="multiPickerDlg_search">'
                     + '<span class="ww_searchInput">'
                     + '<span class="ww_commonImg ww_commonImg_Search ww_searchInput_icon"href="javascript:;"></span>'
                     + '<span class="ww_commonImg ww_commonImg_ClearText ww_searchInput_delete" id="clearMemberSearchInput"></span>'
                     + '<input type="text"id="memberSearchInput"class="qui_inputText ww_inputText ww_searchInput_text" placeholder="搜索文件"></span>'
                     + '</div>'
                     + '<div id="searchResult"class="ww_searchResult"style="display: none">'
                     + '<div id="search_member_list_title"class="ww_searchResult_title ww_searchResult_title_First">搜索结果</div>'
                     + '<div class="search_member_none">无搜索结果...</div>'
                     + '<ul id="search_member_list"></ul>'
                     + '</div>'
                     + '</div>';
            $('.multiPickerDlg_left_cnt').prepend(sdom);
            
            var $input = $('#memberSearchInput');

            //聚焦失焦样式
            $input.focus(function(){
                $(this).addClass('onfocus');
            }).blur(function(){
                $(this).removeClass('onfocus');
            });
            
            $input.on('keydown', function(event){

                event.stopPropagation();

            }).on('keyup', function(event){

                var inputValue = $(this).val();
                inputValue = inputValue.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                var matcher = new RegExp(inputValue, "i");
                var filterTxt = $.grep(data, function(value) {
                    return matcher.test(value.name);
                });

                if(inputValue) {

                    $('#clearMemberSearchInput').show();
                    $('#searchResult').show();
                    $('#partyTree').hide(); 
                    $('#search_member_list').empty();

                    var resultList = '';
                    filterTxt.forEach(function(data){
                        resultList += '<li data-id="'+ data.id +'" data-name="'+ data.name +'" title="'+ data.crumbs +'"><i class="ww_commonImg ww_commonImg_TreeMenuThumb"></i>' + data.name +  '</li>'
                    });
                    //判断筛选之后有没有值
                    if(resultList){
                        $('.search_member_none').hide();
                    }else {
                        $('.search_member_none').show();
                    }
                    $('#search_member_list').append(resultList);

                    //清空
                    $('.ww_searchInput_delete').show();
                    $('.ww_searchInput_delete').on('click', function(){
                        $('#memberSearchInput').val(null);
                        $('#searchResult').hide();
                        $('#partyTree').show();
                        $('#search_member_list').empty();
                        $('.search_member_none').show();
                        $(this).hide();
                    });


                    $('#search_member_list li').on('click', function(){

                        var selectId = $(this).attr('data-id');
                        var selectName = $(this).attr('data-name');
                        var selectCrumbs = $(this).attr('title');
                        var repInx;  //获取重复数组的索引

                        if(saveVal.length > 0) {
                            for(var i=0; i<saveVal.length; i++) {
                                if(saveVal[i].name == selectName) {
                                    repInx = i;
                                };
                            };
                        };
                        if(repInx){
                            saveVal.splice(repInx, 1);
                        }else{
                            if(repInx == 0) {
                                saveVal.splice(repInx, 1);
                            }else {
                                saveVal.push({
                                    id: selectId,
                                    name: selectName,
                                    crumbs: selectCrumbs                                    
                                });
                            };
                        };

                        $('#searchResult').hide();
                        $('#partyTree').show();
                        $('#search_member_list').empty();
                        $('#memberSearchInput').val(null);
                        $('#clearMemberSearchInput').hide();

                        if(saveVal.length>0){
                            $('.multiPickerDlg_right_no_result').hide();
                        }else {
                            $('.multiPickerDlg_right_no_result').show();
                        };
                        //以数组形式返回选种值    
                        _this.renderNode(saveVal);
                        _this.deleteNode(saveVal);

                        //ztree进行操作，点击li之后 展开树
                        var selectedTreeNode = orgZTree.getNodeByParam("id", selectId);  

                        //处理ztree数 的选中图标
                        var aObj = $("#" + selectedTreeNode.tId + "_a");
                        var checkIcon = aObj.find('.jstree-custom-checked');
                        if(checkIcon.hasClass('selected')) {
                            checkIcon.removeClass('selected');
                        }else {
                            checkIcon.addClass('selected');
                        };

                        orgZTree.selectNode(selectedTreeNode, true);//指定选中ID的节点  
                        orgZTree.expandNode(selectedTreeNode, true, false);//指定选中ID节点展开  
                        //orgZTree.cancelSelectedNode();  ztree取消选中



                    });

                }else {

                    $('#searchResult').hide();
                    $('#partyTree').show();
                    $('#search_member_list').empty();
                    $('#clearMemberSearchInput').hide();
                    $('.search_member_none').show();
                };

            });


        },
        dataSolve: function(data) {

            var memberData = data.data;
            var zTreeNode = [];

            function fillNode(zNode, dataNode, presentName) {
                dataNode.forEach(function(aDate){
                    var thisNode = {
                        id: aDate.fileId,
                        name: aDate.fileName,
                        parentId: aDate.parFileId,
                        crumbs: aDate.path,
                        type:aDate.type,
                        children: []
                    };
                    var noChildNode = {
                        id: aDate.fileId,
                        name: aDate.fileName,
                        parentId: aDate.parFileId,
                        type:aDate.type,
                        crumbs: aDate.path,
                    };
                    if(aDate.type == 1){
                        zNode.unshift(thisNode);
                    }else {
                        zNode.push(noChildNode);
                    };
                    //fillNode(thisNode.children, aDate.children, thisNode.crumbs);
                });
            };
            fillNode(zTreeNode, memberData, '');

            return zTreeNode;

        },
        getValue: function(){
            var _this=this;
            var savedVal = $('#field-dept').val().split(';');
            var filterJson = [];
            for(var i=0; i<savedVal.length; i++) {
                (function(i){
                    filterDataList.forEach(function(item, index){
                        if(item.id == savedVal[i]) {
                            return filterJson.push(item);
                        };
                    });
                })(i);
            };

            saveVal = filterJson;
            _this.renderOut(saveVal);
            return saveVal;
        },
        outRepair: function(){
            var _this=this;
            $(document).on('click', '.js_disselect_party', function(){
                $(this).parent().remove();
                saveVal = _this.savedJson();
                if(saveVal.length>0) {
                    $('.js_show_party_selector').html('修改');
                }else {
                    $('.js_show_party_selector').html('添加');
                };

                //处理ztree数 的选中图标
                // var curId = $(this).siblings('.parydata').attr('data-id');
                // var selectedTreeNode = orgZTree.getNodeByParam('id', curId); 
                
                // var aObj = $('#' + selectedTreeNode.tId + "_a");
                // var checkIcon = aObj.find('.jstree-custom-checked');
                // checkIcon.removeClass('selected');

            });
        },
        savedJson: function(){
            var itemList = $('.js_party_select_result_list').children('div');
            var saveLength = itemList.length;
            var jsonList = [];
            var outInputVal = '';

            if(saveLength > 0) {
                itemList.each(function(index, ele){
                    jsonList.push({
                        name: $(ele).find('.parydata').attr('data-name'),
                        id: $(ele).find('.parydata').attr('data-id'),
                        crumbs: $(ele).find('.parydata').attr('data-crumbs')
                    });
                    outInputVal += $(ele).find('.parydata').attr('data-id') + ';';
                });
            };
            //渲染外部input的值
            $('#field-dept').val(outInputVal);
            //console.log($('#field-dept').val());
            return jsonList;
        },  
        renderOut: function(arr) {
            $('.js_party_select_result_list').html('');
            var wrap ='';
            var perVal = '';
            if(arr.length>0) {
                arr.map(function(ele, index){
                    perVal += ele.id+';';
                    wrap += '<div class="ww_groupSelBtn_item">'
                          + '<span class="ww_commonImg ww_commonImg_TreeMenuThumb"></span>'
                          + '<span class="ww_groupSelBtn_item_text">'
                          + ele.name
                          + '</span>'
                          + '<span class="ww_commonImg ww_commonImg_GroupDelSel js_disselect_party">x</span>'
                          + '<input type="hidden" class="parydata" name="partyid" data-name="'
                          + ele.name
                          + '" data-id="'
                          + ele.id
                          + '" data-crumbs="'
                          + ele.crumbs
                          + '" value="'
                          + ele.id
                          + '">'
                          + '</div>';
                });
                $('.js_show_party_selector').html('修改');
            }else {
                $('.js_show_party_selector').html('添加');
            };
            $('.js_party_select_result_list').append(wrap);
            //渲染外部input的值
            $('#field-dept').val(perVal);
            //console.log($('#field-dept').val())
        },
        renderNode: function(arr){
            var _this = this;
            var liHtml = '';
            $('#saveNode').html('');
            if(arr.length>0){
                $('.multiPickerDlg_right_no_result').hide();
            }else {
                $('.multiPickerDlg_right_no_result').show();
            }
            arr.map(function(item, index){
                liHtml = '<li title='+ item.crumbs +' data-name='+ item.name +' data-id='+ item.id +' class="ww_menuDialog_DualCols_colRight_cnt_item token-input-token js_list_item">'
                       + '<span class="ww_commonImg icon icon_folder_blue"></span>'
                       + '<span class="ww_treeMenu_item_text" title='+ item.crumbs +'>'+ item.name+'</span>'
                       + '<a href="javascript:" class="ww_menuDialog_DualCols_colRight_cnt_item_delete"><span class="ww_commonImg ww_commonImg_DeleteItem js_delete"></span></a>'
                       + '</li>';
                $('#saveNode').append(liHtml);
            });
        },
        deleteNode: function(arr) {
            var _this = this;
            var arrNode = arr;
            $('.js_list_item').on('click', function(){

                var curId = $(this).attr('data-id');  //获取当前ID

                for(var i=0; i<arrNode.length; i++){
                    if(arrNode[i].id == curId){
                        arrNode.splice(i, 1);
                    };
                };

                //删除选中树节点的选中图标
                var selectedTreeNode = orgZTree.getNodeByParam("id", curId); 
                var aObj = $("#" + selectedTreeNode.tId + "_a");
                var checkIcon = aObj.find('.jstree-custom-checked');
                checkIcon.removeClass('selected');

                //操作接下来的逻辑
                $(this).remove();
                saveVal = arrNode;
                if(saveVal.length>0){
                    $('.multiPickerDlg_right_no_result').hide();
                }else {
                    $('.multiPickerDlg_right_no_result').show();
                };
                return saveVal;
            });
        },
        init: function(){
            this.dialog();
            this.outRepair();
        }
    };

    $.fn.orgTree = function(opts){
        var ot = new oTree(this, opts); //接收两个参数，主元素 + 设置参数 this: 使用这个插件的容器  opts: 外部配置
        return ot.init();
    };

})(jQuery,window,document);

