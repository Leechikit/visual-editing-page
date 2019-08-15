/* Minification failed. Returning unminified contents.
(22082,32-48): run-time error JS5017: Syntax error in regular expression: /([^\d\+-\s])/ig
 */
/*!
 * jquery-confirm v2.0.0 (http://craftpip.github.io/jquery-confirm/)
 * Author: Boniface Pereira
 * Website: www.craftpip.com
 * Contact: hey@craftpip.com
 *
 * Copyright 2013-2015 jquery-confirm
 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
 */
if(typeof jQuery==="undefined"){throw new Error("jquery-confirm requires jQuery")}var jconfirm,Jconfirm;(function(b){b.fn.confirm=function(c){if(typeof c==="undefined"){c={}}var d=b(this);d.on("click",function(f){f.preventDefault();if(d.attr("href")){c.confirm=function(){location.href=d.attr("href")}}b.confirm(c)});return d};b.confirm=function(c){return jconfirm(c)};b.alert=function(c){c.cancelButton=false;return jconfirm(c)};b.dialog=function(c){c.cancelButton=false;c.confirmButton=false;c.confirmKeys=[13];return jconfirm(c)};jconfirm=function(c){if(typeof c==="undefined"){c={}}if(jconfirm.defaults){b.extend(jconfirm.pluginDefaults,jconfirm.defaults)}var c=b.extend({},jconfirm.pluginDefaults,c);return new Jconfirm(c)};Jconfirm=function(c){b.extend(this,c);this._init()};Jconfirm.prototype={_init:function(){var c=this;this._rand=Math.round(Math.random()*99999);this._buildHTML();this._bindEvents();setTimeout(function(){c.open()},0)},animations:["anim-scale","anim-top","anim-bottom","anim-left","anim-right","anim-zoom","anim-opacity","anim-none","anim-rotate","anim-rotatex","anim-rotatey","anim-scalex","anim-scaley"],_buildHTML:function(){this.animation="anim-"+this.animation.toLowerCase();this.closeAnimation="anim-"+this.closeAnimation.toLowerCase();this.$el=b(this.template).appendTo(this.container).addClass(this.theme);this.$el.find(".jconfirm-box-container").addClass(this.columnClass);this.CSS={"-webkit-transition-duration":this.animationSpeed/1000+"s","transition-duration":this.animationSpeed/1000+"s","-webkit-transition-timing-function":"cubic-bezier(.38,1.28,.2, "+this.animationBounce+")","transition-timing-function":"cubic-bezier(.38,1.28,.2, "+this.animationBounce+")"};this.$el.find(".jconfirm-bg").css(this.CSS);this.$b=this.$el.find(".jconfirm-box").css(this.CSS).addClass(this.animation);this.$body=this.$b;if(this.rtl){this.$el.addClass("rtl")}this.$title=this.$el.find("div.title");this.setTitle();this.contentDiv=this.$el.find("div.content");this.$content=this.contentDiv;this.$btnc=this.$el.find(".buttons");if(this.confirmButton&&this.confirmButton.trim()!==""){this.$confirmButton=b('<button class="btn">'+this.confirmButton+"</button>").appendTo(this.$btnc).addClass(this.confirmButtonClass)}if(this.cancelButton&&this.cancelButton.trim()!==""){this.$cancelButton=b('<button class="btn">'+this.cancelButton+"</button>").appendTo(this.$btnc).addClass(this.cancelButtonClass)}if(!this.confirmButton&&!this.cancelButton){this.$btnc.remove()}if(!this.confirmButton&&!this.cancelButton&&this.closeIcon===null){this.$closeButton=this.$b.find(".closeIcon").show()}if(this.closeIcon===true){this.$closeButton=this.$b.find(".closeIcon").show()}this.setContent();if(this.autoClose){this._startCountDown()}},setTitle:function(c){this.title=(typeof c!=="undefined")?c:this.title;if(this.title&&this.$title){this.$title.html('<i class="'+this.icon+'"></i> '+this.title)}else{this.$title.remove()}},setContent:function(e){var f=this;this.content=(e)?e:this.content;var c=(e)?true:false;if(typeof this.content==="boolean"){if(!this.content){this.contentDiv.remove()}else{console.error("Invalid option for property content: passed TRUE")}}else{if(typeof this.content==="string"){if(this.content.substr(0,4).toLowerCase()==="url:"){this.contentDiv.html("");this.$btnc.find("button").prop("disabled",true);var d=this.content.substring(4,this.content.length);b.get(d).done(function(h){f.contentDiv.html(h)}).always(function(i,h,j){if(typeof f.contentLoaded==="function"){f.contentLoaded(i,h,j)}f.$btnc.find("button").prop("disabled",false);f.setDialogCenter()})}else{this.contentDiv.html(this.content)}}else{if(typeof this.content==="function"){this.contentDiv.html("");this.$btnc.find("button").attr("disabled","disabled");var g=this.content(this);if(typeof g!=="object"){console.error("The content function must return jquery promise.")}else{if(typeof g.always!=="function"){console.error("The object returned is not a jquery promise.")}else{g.always(function(i,h){f.$btnc.find("button").removeAttr("disabled");f.setDialogCenter()})}}}else{console.error("Invalid option for property content, passed: "+typeof this.content)}}}this.setDialogCenter(c)},_startCountDown:function(){var c=this.autoClose.split("|");if(/cancel/.test(c[0])&&this.type==="alert"){return false}else{if(/confirm|cancel/.test(c[0])){this.$cd=b('<span class="countdown">').appendTo(this["$"+c[0]+"Button"]);var d=this;d.$cd.parent().click();var e=c[1]/1000;this.interval=setInterval(function(){d.$cd.html(" ["+(e-=1)+"]");if(e===0){d.$cd.parent().trigger("click");clearInterval(d.interval)}},1000)}else{console.error("Invalid option "+c[0]+", must be confirm/cancel")}}},_bindEvents:function(){var d=this;var c=false;this.$el.find(".jconfirm-scrollpane").click(function(f){if(!c){if(d.backgroundDismiss){d.cancel();d.close()}else{d.$b.addClass("hilight");setTimeout(function(){d.$b.removeClass("hilight")},400)}}c=false});this.$el.find(".jconfirm-box").click(function(f){c=true});if(this.$confirmButton){this.$confirmButton.click(function(g){g.preventDefault();var f=d.confirm(d.$b);d.onAction("confirm");if(typeof f==="undefined"||f){d.close()}})}if(this.$cancelButton){this.$cancelButton.click(function(g){g.preventDefault();var f=d.cancel(d.$b);d.onAction("cancel");if(typeof f==="undefined"||f){d.close()}})}if(this.$closeButton){this.$closeButton.click(function(f){f.preventDefault();d.cancel();d.onAction("close");d.close()})}if(this.keyboardEnabled){setTimeout(function(){b(window).on("keyup."+this._rand,function(f){d.reactOnKey(f)})},500)}b(window).on("resize."+this._rand,function(){d.setDialogCenter(true)})},reactOnKey:function a(f){var c=b(".jconfirm");if(c.eq(c.length-1)[0]!==this.$el[0]){return false}var d=f.which;if(this.contentDiv.find(":input").is(":focus")&&/13|32/.test(d)){return false}if(b.inArray(d,this.cancelKeys)!==-1){if(!this.backgroundDismiss){this.$el.find(".jconfirm-bg").click();return false}if(this.$cancelButton){this.$cancelButton.click()}else{this.close()}}if(b.inArray(d,this.confirmKeys)!==-1){if(this.$confirmButton){this.$confirmButton.click()}}},setDialogCenter:function(d){var h=b(window).height();var g=this.$b.outerHeight();var c=(h-g)/2;var f=100;if(g>(h-f)){var e={"margin-top":f/2,"margin-bottom":f/2}}else{var e={"margin-top":c}}if(d){this.$b.animate(e,{duration:this.animationSpeed,queue:false})}else{this.$b.css(e)}},close:function(){var c=this;if(this.isClosed()){return false}if(typeof this.onClose==="function"){this.onClose()}b(window).unbind("resize."+this._rand);if(this.keyboardEnabled){b(window).unbind("keyup."+this._rand)}c.$el.find(".jconfirm-bg").removeClass("seen");this.$b.addClass(this.closeAnimation);var d=(this.closeAnimation=="anim-none")?0:this.animationSpeed;setTimeout(function(){c.$el.remove()},d+50);jconfirm.record.closed+=1;jconfirm.record.currentlyOpen-=1;if(jconfirm.record.currentlyOpen<1){b("body").removeClass("jconfirm-noscroll")}return true},open:function(){var d=this;if(this.isClosed()){return false}d.$el.find(".jconfirm-bg").addClass("seen");b("body").addClass("jconfirm-noscroll");this.$b.removeClass(this.animations.join(" "));this.$b.find("input[autofocus]:visible:first").focus();jconfirm.record.opened+=1;jconfirm.record.currentlyOpen+=1;if(typeof this.onOpen==="function"){this.onOpen()}var c="jconfirm-box"+this._rand;this.$b.attr("aria-labelledby",c).attr("tabindex",-1).focus();if(this.$title){this.$title.attr("id",c)}else{if(this.$content){this.$content.attr("id",c)}}return true},isClosed:function(){return this.$el.css("display")===""}};jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg"></div><div class="jconfirm-scrollpane"><div class="container"><div class="row"><div class="jconfirm-box-container span6 offset3"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="closeIcon"><span class="glyphicon glyphicon-remove"></span></div><div class="title"></div><div class="content"></div><div class="buttons"></div><div class="jquery-clear"></div></div></div></div></div></div></div>',title:"Hello",content:"Are you sure to continue?",contentLoaded:function(){},icon:"",confirmButton:"Okay",cancelButton:"Cancel",confirmButtonClass:"btn-default",cancelButtonClass:"btn-default",theme:"white",animation:"zoom",closeAnimation:"scale",animationSpeed:500,animationBounce:1.2,keyboardEnabled:false,rtl:false,confirmKeys:[13,32],cancelKeys:[27],container:"body",confirm:function(){},cancel:function(){},backgroundDismiss:true,autoClose:false,closeIcon:null,columnClass:"col-md-4 col-md-offset-4",onOpen:function(){},onClose:function(){},onAction:function(){}};jconfirm.record={opened:0,closed:0,currentlyOpen:0}})(jQuery);;
/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */


import "../Scripts/plugins/bootstrap-calendar/underscore-min.js"
import  "../Scripts/plugins/bootstrap-calendar/jstz.min.js" 
import        "../Scripts/plugins/bootstrap-calendar/language/zh-CN.js"
import         "../Scripts/plugins/bootstrap-calendar/calendar.js" 
import        "../Scripts/h3/FormList/CalendarMode.js"
// AMD support
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
    }
}

(function($) {
"use strict";

/*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

/**
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
$.fn.attr2 = function() {
    if ( ! hasProp ) {
        return this.attr.apply(this, arguments);
    }
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' ) {
        return val;
    }
    return this.attr.apply(this, arguments);
};

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
        log('ajaxSubmit: skipping submit process - no element selected');
        return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
        options = { success: options };
    }
    else if ( options === undefined ) {
        options = {};
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
        // clean url (don't include hash vaue)
        url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
        url:  url,
        success: $.ajaxSettings.success,
        type: method || $.ajaxSettings.type,
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
        return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSerialize callback');
        return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
        traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
        options.extraData = options.data;
        qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
        log('ajaxSubmit: submit aborted via beforeSubmit callback');
        return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
        return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
        q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else {
        options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
        callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
        callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            var fn = options.replaceTarget ? 'replaceWith' : 'html';
            $(options.target)[fn](data).each(oldSuccess, arguments);
        });
    }
    else if (options.success) {
        callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
        var context = options.context || this ;    // jQuery 1.4+ supports scope context
        for (var i=0, max=callbacks.length; i < max; i++) {
            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
        }
    };

    if (options.error) {
        var oldError = options.error;
        options.error = function(xhr, status, error) {
            var context = options.context || this;
            oldError.apply(context, [xhr, status, error, $form]);
        };
    }

     if (options.complete) {
        var oldComplete = options.complete;
        options.complete = function(xhr, status) {
            var context = options.context || this;
            oldComplete.apply(context, [xhr, status, $form]);
        };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
        // hack to fix Safari hang (thanks to Tim Molendijk for this)
        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
        if (options.closeKeepAlive) {
            $.get(options.closeKeepAlive, function() {
                jqxhr = fileUploadIframe(a);
            });
        }
        else {
            jqxhr = fileUploadIframe(a);
        }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
        jqxhr = fileUploadXhr(a);
    }
    else {
        jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++) {
        elements[k] = null;
    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
        var serialized = $.param(extraData, options.traditional).split('&');
        var len = serialized.length;
        var result = [];
        var i, part;
        for (i=0; i < len; i++) {
            // #252; undo param space replacement
            serialized[i] = serialized[i].replace(/\+/g,' ');
            part = serialized[i].split('=');
            // #278; use array instead of object storage, favoring array serializations
            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
        }
        return result;
    }

     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
        var formdata = new FormData();

        for (var i=0; i < a.length; i++) {
            formdata.append(a[i].name, a[i].value);
        }

        if (options.extraData) {
            var serializedData = deepSerialize(options.extraData);
            for (i=0; i < serializedData.length; i++) {
                if (serializedData[i]) {
                    formdata.append(serializedData[i][0], serializedData[i][1]);
                }
            }
        }

        options.data = null;

        var s = $.extend(true, {}, $.ajaxSettings, options, {
            contentType: false,
            processData: false,
            cache: false,
            type: method || 'POST'
        });

        if (options.uploadProgress) {
            // workaround because jqXHR does not expose upload property
            s.xhr = function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position; /*event.position is deprecated*/
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        options.uploadProgress(event, position, total, percent);
                    }, false);
                }
                return xhr;
            };
        }

        s.data = null;
        var beforeSend = s.beforeSend;
        s.beforeSend = function(xhr, o) {
            //Send FormData() provided by user
            if (options.formData) {
                o.data = options.formData;
            }
            else {
                o.data = formdata;
            }
            if(beforeSend) {
                beforeSend.call(this, xhr, o);
            }
        };
        return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
        var deferred = $.Deferred();

        // #341
        deferred.abort = function(status) {
            xhr.abort(status);
        };

        if (a) {
            // ensure that every serialized input is still enabled
            for (i=0; i < elements.length; i++) {
                el = $(elements[i]);
                if ( hasProp ) {
                    el.prop('disabled', false);
                }
                else {
                    el.removeAttr('disabled');
                }
            }
        }

        s = $.extend(true, {}, $.ajaxSettings, options);
        s.context = s.context || s;
        id = 'jqFormIO' + (new Date().getTime());
        if (s.iframeTarget) {
            $io = $(s.iframeTarget);
            n = $io.attr2('name');
            if (!n) {
                $io.attr2('name', id);
            }
            else {
                id = n;
            }
        }
        else {
            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
        }
        io = $io[0];


        xhr = { // mock object
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {},
            abort: function(status) {
                var e = (status === 'timeout' ? 'timeout' : 'aborted');
                log('aborting upload... ' + e);
                this.aborted = 1;

                try { // #214, #257
                    if (io.contentWindow.document.execCommand) {
                        io.contentWindow.document.execCommand('Stop');
                    }
                }
                catch(ignore) {}

                $io.attr('src', s.iframeSrc); // abort op in progress
                xhr.error = e;
                if (s.error) {
                    s.error.call(s.context, xhr, e, status);
                }
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, e]);
                }
                if (s.complete) {
                    s.complete.call(s.context, xhr, e);
                }
            }
        };

        g = s.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && 0 === $.active++) {
            $.event.trigger("ajaxStart");
        }
        if (g) {
            $.event.trigger("ajaxSend", [xhr, s]);
        }

        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
            if (s.global) {
                $.active--;
            }
            deferred.reject();
            return deferred;
        }
        if (xhr.aborted) {
            deferred.reject();
            return deferred;
        }

        // add submitting element to data if we know it
        sub = form.clk;
        if (sub) {
            n = sub.name;
            if (n && !sub.disabled) {
                s.extraData = s.extraData || {};
                s.extraData[n] = sub.value;
                if (sub.type == "image") {
                    s.extraData[n+'.x'] = form.clk_x;
                    s.extraData[n+'.y'] = form.clk_y;
                }
            }
        }

        var CLIENT_TIMEOUT_ABORT = 1;
        var SERVER_ABORT = 2;
                
        function getDoc(frame) {
            /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */
            
            var doc = null;
            
            // IE8 cascading access check
            try {
                if (frame.contentWindow) {
                    doc = frame.contentWindow.document;
                }
            } catch(err) {
                // IE8 access denied under ssl & missing protocol
                log('cannot get iframe.contentWindow document: ' + err);
            }

            if (doc) { // successful getting content
                return doc;
            }

            try { // simply checking may throw in ie8 under ssl or mismatched protocol
                doc = frame.contentDocument ? frame.contentDocument : frame.document;
            } catch(err) {
                // last attempt
                log('cannot get iframe.contentDocument: ' + err);
                doc = frame.document;
            }
            return doc;
        }

        // Rails CSRF hack (thanks to Yvan Barthelemy)
        var csrf_token = $('meta[name=csrf-token]').attr('content');
        var csrf_param = $('meta[name=csrf-param]').attr('content');
        if (csrf_param && csrf_token) {
            s.extraData = s.extraData || {};
            s.extraData[csrf_param] = csrf_token;
        }

        // take a breath so that pending repaints get some cpu time before the upload starts
        function doSubmit() {
            // make sure form attrs are set
            var t = $form.attr2('target'), 
                a = $form.attr2('action'), 
                mp = 'multipart/form-data',
                et = $form.attr('enctype') || $form.attr('encoding') || mp;

            // update form attrs in IE friendly way
            form.setAttribute('target',id);
            if (!method || /post/i.test(method) ) {
                form.setAttribute('method', 'POST');
            }
            if (a != s.url) {
                form.setAttribute('action', s.url);
            }

            // ie borks in some cases when setting encoding
            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
                $form.attr({
                    encoding: 'multipart/form-data',
                    enctype:  'multipart/form-data'
                });
            }

            // support timout
            if (s.timeout) {
                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
            }

            // look for server aborts
            function checkState() {
                try {
                    var state = getDoc(io).readyState;
                    log('state = ' + state);
                    if (state && state.toLowerCase() == 'uninitialized') {
                        setTimeout(checkState,50);
                    }
                }
                catch(e) {
                    log('Server abort: ' , e, ' (', e.name, ')');
                    cb(SERVER_ABORT);
                    if (timeoutHandle) {
                        clearTimeout(timeoutHandle);
                    }
                    timeoutHandle = undefined;
                }
            }

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (s.extraData) {
                    for (var n in s.extraData) {
                        if (s.extraData.hasOwnProperty(n)) {
                           // if using the $.param format that allows for multiple values with the same name
                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                               extraInputs.push(
                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                                   .appendTo(form)[0]);
                           } else {
                               extraInputs.push(
                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                                   .appendTo(form)[0]);
                           }
                        }
                    }
                }

                if (!s.iframeTarget) {
                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                }
                if (io.attachEvent) {
                    io.attachEvent('onload', cb);
                }
                else {
                    io.addEventListener('load', cb, false);
                }
                setTimeout(checkState,15);

                try {
                    form.submit();
                } catch(err) {
                    // just in case form has element with name/id of 'submit'
                    var submitFn = document.createElement('form').submit;
                    submitFn.apply(form);
                }
            }
            finally {
                // reset attrs and remove "extra" input elements
                form.setAttribute('action',a);
                form.setAttribute('enctype', et); // #380
                if(t) {
                    form.setAttribute('target', t);
                } else {
                    $form.removeAttr('target');
                }
                $(extraInputs).remove();
            }
        }

        if (s.forceSync) {
            doSubmit();
        }
        else {
            setTimeout(doSubmit, 10); // this lets dom updates render
        }

        var data, doc, domCheckCount = 50, callbackProcessed;

        function cb(e) {
            if (xhr.aborted || callbackProcessed) {
                return;
            }
            
            doc = getDoc(io);
            if(!doc) {
                log('cannot access response document');
                e = SERVER_ABORT;
            }
            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                xhr.abort('timeout');
                deferred.reject(xhr, 'timeout');
                return;
            }
            else if (e == SERVER_ABORT && xhr) {
                xhr.abort('server abort');
                deferred.reject(xhr, 'error', 'server abort');
                return;
            }

            if (!doc || doc.location.href == s.iframeSrc) {
                // response not received yet
                if (!timedOut) {
                    return;
                }
            }
            if (io.detachEvent) {
                io.detachEvent('onload', cb);
            }
            else {
                io.removeEventListener('load', cb, false);
            }

            var status = 'success', errMsg;
            try {
                if (timedOut) {
                    throw 'timeout';
                }

                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                log('isXml='+isXml);
                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                    if (--domCheckCount) {
                        // in some browsers (Opera) the iframe DOM is not always traversable when
                        // the onload callback fires, so we loop a bit to accommodate
                        log('requeing onLoad callback, DOM not available');
                        setTimeout(cb, 250);
                        return;
                    }
                    // let this fall through because server response could be an empty document
                    //log('Could not access iframe DOM after mutiple tries.');
                    //throw 'DOMException: not available';
                }

                //log('response detected');
                var docRoot = doc.body ? doc.body : doc.documentElement;
                xhr.responseText = docRoot ? docRoot.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                if (isXml) {
                    s.dataType = 'xml';
                }
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': s.dataType};
                    return headers[header.toLowerCase()];
                };
                // support for XHR 'status' & 'statusText' emulation :
                if (docRoot) {
                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                }

                var dt = (s.dataType || '').toLowerCase();
                var scr = /(json|script|text)/.test(dt);
                if (scr || s.textarea) {
                    // see if user embedded response in textarea
                    var ta = doc.getElementsByTagName('textarea')[0];
                    if (ta) {
                        xhr.responseText = ta.value;
                        // support for XHR 'status' & 'statusText' emulation :
                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                    }
                    else if (scr) {
                        // account for browsers injecting pre around json response
                        var pre = doc.getElementsByTagName('pre')[0];
                        var b = doc.getElementsByTagName('body')[0];
                        if (pre) {
                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                        }
                        else if (b) {
                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
                        }
                    }
                }
                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                    xhr.responseXML = toXml(xhr.responseText);
                }

                try {
                    data = httpData(xhr, dt, s);
                }
                catch (err) {
                    status = 'parsererror';
                    xhr.error = errMsg = (err || status);
                }
            }
            catch (err) {
                log('error caught: ',err);
                status = 'error';
                xhr.error = errMsg = (err || status);
            }

            if (xhr.aborted) {
                log('upload aborted');
                status = null;
            }

            if (xhr.status) { // we've set xhr.status
                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (status === 'success') {
                if (s.success) {
                    s.success.call(s.context, data, 'success', xhr);
                }
                deferred.resolve(xhr.responseText, 'success', xhr);
                if (g) {
                    $.event.trigger("ajaxSuccess", [xhr, s]);
                }
            }
            else if (status) {
                if (errMsg === undefined) {
                    errMsg = xhr.statusText;
                }
                if (s.error) {
                    s.error.call(s.context, xhr, status, errMsg);
                }
                deferred.reject(xhr, 'error', errMsg);
                if (g) {
                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }
            }

            if (g) {
                $.event.trigger("ajaxComplete", [xhr, s]);
            }

            if (g && ! --$.active) {
                $.event.trigger("ajaxStop");
            }

            if (s.complete) {
                s.complete.call(s.context, xhr, status);
            }

            callbackProcessed = true;
            if (s.timeout) {
                clearTimeout(timeoutHandle);
            }

            // clean up
            setTimeout(function() {
                if (!s.iframeTarget) {
                    $io.remove();
                }
                else { //adding else to clean up existing iframe response.
                    $io.attr('src', s.iframeSrc);
                }
                xhr.responseXML = null;
            }, 100);
        }

        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else {
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            }
            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
        };
        var parseJSON = $.parseJSON || function(s) {
            /*jslint evil:true */
            return window['eval']('(' + s + ')');
        };

        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

            var ct = xhr.getResponseHeader('content-type') || '',
                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;

            if (xml && data.documentElement.nodeName === 'parsererror') {
                if ($.error) {
                    $.error('parsererror');
                }
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === 'string') {
                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                    data = parseJSON(data);
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    $.globalEval(data);
                }
            }
            return data;
        };

        return deferred;
    }
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
        var o = { s: this.selector, c: this.context };
        if (!$.isReady && o.s) {
            log('DOM not ready, queuing ajaxForm');
            $(function() {
                $(o.s,o.c).ajaxForm(options);
            });
            return this;
        }
        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
        return this;
    }

    if ( options.delegation ) {
        $(document)
            .off('submit.form-plugin', this.selector, doAjaxSubmit)
            .off('click.form-plugin', this.selector, captureSubmittingElement)
            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
        return this;
    }

    return this.ajaxFormUnbind()
        .bind('submit.form-plugin', options, doAjaxSubmit)
        .bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
        e.preventDefault();
        $(e.target).ajaxSubmit(options); // #365
    }
}

function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
        // is this a child element of the submit el?  (ex: a span within a button)
        var t = $el.closest('[type=submit]');
        if (t.length === 0) {
            return;
        }
        target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
        if (e.offsetX !== undefined) {
            form.clk_x = e.offsetX;
            form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left;
            form.clk_y = e.pageY - offset.top;
        } else {
            form.clk_x = e.pageX - target.offsetLeft;
            form.clk_y = e.pageY - target.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var formId = this.attr('id');
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    var els2;

    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
        els = $(els).get();  // convert to standard array
    }

    // #386; account for inputs outside the form which use the 'form' attribute
    if ( formId ) {
        els2 = $(':input[form=' + formId + ']').get();
        if ( els2.length ) {
            els = (els || []).concat(els2);
        }
    }

    if (!els || !els.length) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n || el.disabled) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements) {
                elements.push(el);
            }
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file') {
            if (elements) {
                elements.push(el);
            }
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements) {
                elements.push(el);
            }
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) {
            return;
        }
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++) {
                a.push({name: n, value: v[i]});
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            a.push({name: this.name, value: v});
        }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array) {
            $.merge(val, v);
        }
        else {
            val.push(v);
        }
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
		else if (t == "file") {
			if (/MSIE/.test(navigator.userAgent)) {
				$(this).replaceWith($(this).clone(true));
			} else {
				$(this).val('');
			}
		}
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
                this.value = '';
            }
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
    if (b === undefined) {
        b = true;
    }
    return this.each(function() {
        this.disabled = !b;
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
    if (select === undefined) {
        select = true;
    }
    return this.each(function() {
        var t = this.type;
        if (t == 'checkbox' || t == 'radio') {
            this.checked = select;
        }
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').selected(false);
            }
            this.selected = select;
        }
    });
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
    if (!$.fn.ajaxSubmit.debug) {
        return;
    }
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
        window.opera.postError(msg);
    }
}

}));
;
//公用数据,数据类型
jQuery.extend({
    BizDataType: {
        /// 空值
        Unspecified: -1,
        /// 逻辑数组型
        BoolArray: 0,
        /// 逻辑型
        Bool: 1,
        /// 时间数组型
        DateTimeArray: 4,
        /// 日期型
        DateTime: 5,
        /// 双精度数组型
        DoubleArray: 6,
        /// 双精度数值型
        Double: 7,
        /// 整数数组型
        IntArray: 8,
        /// 整数
        Int: 9,
        /// 长整型数组型
        LongArray: 10,
        /// 长整数
        Long: 11,
        /// 字符串数组型
        StringArray: 12,
        /// 长文本
        String: 13,
        /// 短文本
        ShortString: 14,
        /// 签名
        // Sign : 15,
        /// 链接
        HyperLink: 16,
        /// 审批
        Comment: 17,
        /// 二进制流
        ByteArray: 20,
        ///图片类型
        Image: 23,
        /// 未指定类型的附件
        Attachment: 24,
        /// 时间段型
        TimeSpan: 25,
        /// 参与者（单人）
        SingleParticipant: 26,
        /// 参与者（多人）
        MultiParticipant: 27,
        /// Html
        Html: 30,
        /// 对象类型
        Object: 31,
        /// Xml
        Xml: 32,
        /// Guid  
        Guid: 33,
        /// Guid数组
        GuidArray: 34,
        /// Decimal
        Decimal: 35,
        /// Decimal数组
        DecimalArray: 36,
        /// 业务对象
        BizObject: 40,
        /// 业务对象数组
        BizObjectArray: 41,
        /// 业务结构
        BizStructure: 42,
        /// 业务结构数组
        BizStructureArray: 43,
        /// 关联查询
        Association: 50,
        //关联查询多表单
        AssociationArray: 51,
        ///地图
        Map: 55,
        //地址
        Address: 56,
        //公式型控件
        Formula:57
    }
});;
//公用数据

//系统保留字段的名称
var ReservedPropertiesName = {
    PropertyName_CreatedBy: "CreatedBy",
    PropertyName_CreatedTime: "CreatedTime",
    PropertyName_ModifiedTime: "ModifiedTime",
    PropertyName_OwnerId: "OwnerId",
    PropertyName_OwnerDeptId: "OwnerDeptId",
    PropertyName_Status: "Status",
    PropertyName_SeqNo: "SeqNo"
}
//组织机构类型
var OrganizationType = {
    User: 0,
    Dept: 1,
    All: 2
}

var ListViewDisplayMode = {
    List: 0,
    Calendar:1,
   Timeline:2
}
var FunctionNodeType = {
    /// </summary>
    AppPackage : 190,

    /// <summary>
    /// 应用模块(不能发起流程)
    /// </summary>
    FormModule : 200,

    /// <summary>
    /// 应用模块(可以发起流程)
    /// </summary>
    WorkflowModule : 210,

    /// <summary>
    /// 报表模块
    /// </summary>
    ReportModule : 220,

    /// <summary>
    /// 自定义列表模块（不含表单）
    /// </summary>
    CustomListModule : 300,
    /// <summary>
    /// 节点分组
    /// </summary>
    GroupModule: 230,

    SingletonModule:240
};
jQuery.extend({
    // 打开表单的接口
    //otherParam其他参数，json格式:{showInModal:是否显示在弹出框中,title:"",height:500,widht:500,OnShowCallback:function,OnHiddenCallback:function}
    /*{ 1.schemaCode SchemaCode表单编码参数
        2.objectId ,BizObjectID不传时打开新增时的表单
        3.params ,传递到表单的参数
        4.checkIsChange,是否检查修改
        5.showlist,兼容移动端是否显示列表 
        6.showInModal：是否弹出框中显示，如果为false，title height width OnShowCallback OnHiddenCallback 等属性不起作用
        7.title: 对话框标题
        8.height:对话框高度，格式 500 数值类型
        9.width: 对话框宽度，格式 500
        10.OnShowCallback 显示时事件 
        11.OnHiddenCallback 隐藏时显示
    }*/
    IShowForm: function () {
        //schemaCode, objectId, params, checkIsChange 其他参数使用JSON格式
        if (arguments.length < 1) {
            return;
        }
        var args = {
            schemaCode: "",
            objectId:"",
            params: "",
            checkIsChange: false,
            showInModal: false,
            title: "",
            height: 500,
            width: 820,
            onShowCallback: null,
            onHiddenCallback:null
        };

        for (var i = 0; i < arguments.length; i++) {
            var data = arguments[i];
            if (data == null) { continue; }
            if (typeof (data) == "string" || data.constructor == String
                || typeof (data) == "boolean" || data.constructor == Boolean
                || typeof (data) == "function" || data.constructor == Function
            ) { 
                if (i == 0) {
                    args.schemaCode = data;
                } else if (i == 1) {
                    args.objectId = data;
                } else if (i == 2) {
                    args.params = JSON.parse(data);
                } else if (i == 3) {
                    args.checkIsChange = data;
                }

            } else if (typeof (data) == "object" || data.constructor == Object) {
                if (i == 2 && !data.params && data.showInModal == undefined) {
                    args.params = data;
                } else {
                    args = $.extend({}, args, data);
                }
            }
        }

        if (args.showInModal) {
            $.IDialogModal.Show(args.schemaCode, args.objectId, args.title, args.height, args.width, args.params, args.onShowCallback, args.onHiddenCallback);
        }
        else {
            $.ISideModal.Show("/Form/DefaultSheet/" + args.schemaCode + "?SchemaCode=" + args.schemaCode + "&BizObjectId=" + args.objectId, "", null, null, args.checkIsChange, args.params);
        }  
    },
    // 获取参数值
    IGetParams: function (name) {
        //SideModal 侧滑框
        var sideModalValue = top.$.ISideModal.GetParamValue(name);
        if (sideModalValue) {
            return sideModalValue;
        }
        //弹出框表单参数
        var dialogArguments = localStorage.getItem('DialogArguments');
        if (dialogArguments) {
            var jsonData = JSON.parse(dialogArguments);
            return jsonData[name];
        }
        return null;
    },

    // 定位
    ILocation: function () {
        //$.IShowWarn("PC端不支持定位");
        //console.log("PC端不支持定位");
        //return null;
        var Address = "深圳市南山区科技南十路航天科技研究院";
        var Point = { lat: '21.345', lng: '114.454' };
        return {
            Address: Address,
            Point: Point
        };
    },

    // 下载附件
    IDownloadAttachments: function (attachmentIds) {
        var attachmentIdStr = attachmentIds.join(";");
        window.open("/Form/DownloadAttachments/?AttachmentIdStr=" + attachmentIdStr);
    },

    //显示提示框
    IShowPreLoader: function (title) {

    },
    //隐藏提示框
    IHidePreLoader: function () {

    },
    //扫描二维码
    IScanBarCode: function () { },
    //扫描条形码
    IScanQrCode: function () { },
    //扫描名片
    IScanCard: function () { },

    IOpenLink: function (url) {
        window.open(url);
    },


//显示钉钉个人资料页
IShowUserInfo: function (userId, corpId) {
   
},
//显示钉钉聊天页面
IShowChatPage: function (users, corpId) {
   
},
//拨打免费电话
IShowFreeCall: function () {
    
},
//图片类型钉消息
IPostImageDing: function (users, corpId, text, success, fail) {
   
},
//Link类型钉消息
IPostLinkDing: function (users, corpId, text, title, url, imageUrl, subText, success, fail) {
   
}

});;
/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * version: 1.10.1
 * https://github.com/wenzhixin/bootstrap-table/
 */

!function ($) {
    'use strict';

    // TOOLS DEFINITION
    // ======================

    var cachedWidth = null;

    // it only does '%s', and return '' when arguments are undefined
    var sprintf = function (str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };

    var getPropertyFromOther = function (list, from, to, value) {
        var result = '';
        $.each(list, function (i, item) {
            if (item[from] === value) {
                result = item[to];
                return false;
            }
            return true;
        });
        return result;
    };

    var getFieldIndex = function (columns, field) {
        var index = -1;

        $.each(columns, function (i, column) {
            try {
                if (column.field === field) {
                    index = i;
                    return false;
                }
            }

            catch (e) {
                var a = e;
            }
            return true;
        });
        return index;
    };

    // http://jsfiddle.net/wenyi/47nz7ez9/3/
    var setFieldIndex = function (columns) {
        var i, j, k,
            totalCol = 0,
            flag = [];

        for (i = 0; i < columns[0].length; i++) {
            totalCol += columns[0][i].colspan || 1;
        }

        for (i = 0; i < columns.length; i++) {
            flag[i] = [];
            for (j = 0; j < totalCol; j++) {
                flag[i][j] = false;
            }
        }

        for (i = 0; i < columns.length; i++) {
            for (j = 0; j < columns[i].length; j++) {
                var r = columns[i][j],
                    rowspan = r.rowspan || 1,
                    colspan = r.colspan || 1,
                    index = $.inArray(false, flag[i]);

                if (colspan === 1) {
                    r.fieldIndex = index;
                    // when field is undefined, use index instead
                    if (typeof r.field === 'undefined') {
                        r.field = index;
                    }
                }

                for (k = 0; k < rowspan; k++) {
                    flag[i + k][index] = true;
                }
                for (k = 0; k < colspan; k++) {
                    flag[i][index + k] = true;
                }
            }
        }
    };

    var getScrollBarWidth = function () {
        if (cachedWidth === null) {
            var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
                w1, w2;

            outer.append(inner);
            $('body').append(outer);

            w1 = inner[0].offsetWidth;
            outer.css('overflow', 'scroll');
            w2 = inner[0].offsetWidth;

            if (w1 === w2) {
                w2 = outer[0].clientWidth;
            }

            outer.remove();
            cachedWidth = w1 - w2;
        }
        return cachedWidth;
    };

    var calculateObjectValue = function (self, name, args, defaultValue) {
        var func = name;

        if (typeof name === 'string') {
            // support obj.func1.func2
            var names = name.split('.');

            if (names.length > 1) {
                func = window;
                $.each(names, function (i, f) {
                    func = func[f];
                });
            } else {
                func = window[name];
            }
        }
        if (typeof func === 'object') {
            return func;
        }
        if (typeof func === 'function') {
            return func.apply(self, args);
        }
        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
            return sprintf.apply(this, [name].concat(args));
        }
        return defaultValue;
    };

    var compareObjects = function (objectA, objectB, compareLength) {
        // Create arrays of property names
        var objectAProperties = Object.getOwnPropertyNames(objectA),
            objectBProperties = Object.getOwnPropertyNames(objectB),
            propName = '';

        if (compareLength) {
            // If number of properties is different, objects are not equivalent
            if (objectAProperties.length !== objectBProperties.length) {
                return false;
            }
        }

        for (var i = 0; i < objectAProperties.length; i++) {
            propName = objectAProperties[i];

            // If the property is not in the object B properties, continue with the next property
            if ($.inArray(propName, objectBProperties) > -1) {
                // If values of same property are not equal, objects are not equivalent
                if (objectA[propName] !== objectB[propName]) {
                    return false;
                }
            }
        }

        // If we made it this far, objects are considered equivalent
        return true;
    };

    var escapeHTML = function (text) {
        if (typeof text === 'string') {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .replace(/`/g, '&#x60;');
        }
        return text;
    };

    var getRealHeight = function ($el) {
        var height = 0;
        $el.children().each(function () {
            if (height < $(this).outerHeight(true)) {
                height = $(this).outerHeight(true);
            }
        });
        return height;
    };

    var getRealDataAttr = function (dataAttr) {
        for (var attr in dataAttr) {
            var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase();
            if (auxAttr !== attr) {
                dataAttr[auxAttr] = dataAttr[attr];
                delete dataAttr[attr];
            }
        }

        return dataAttr;
    };

    var getItemField = function (item, field, escape) {
        var value = item;

        if (typeof field !== 'string' || item.hasOwnProperty(field)) {
            return escape ? escapeHTML(item[field]) : item[field];
        }
        var props = field.split('.');
        for (var p in props) {
            value = value && value[props[p]];
        }
        return escape ? escapeHTML(value) : value;
    };

    var isIEBrowser = function () {
        return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
    };

    // BOOTSTRAP TABLE CLASS DEFINITION
    // ======================

    var BootstrapTable = function (el, options) {
        this.options = options;
        this.$el = $(el);
        this.$el_ = this.$el.clone();
        this.timeoutId_ = 0;
        this.timeoutFooter_ = 0;

        this.init();
    };

    BootstrapTable.DEFAULTS = {
        classes: 'table table-hover',
        locale: undefined,
        height: undefined,
        undefinedText: '-',
        sortName: undefined,
        sortOrder: 'asc',
        striped: false,
        columns: [[]],
        data: [],
        dataField: 'rows',
        method: 'get',
        url: undefined,
        ajax: undefined,
        cache: true,
        contentType: 'application/json',
        dataType: 'json',
        ajaxOptions: {},
        queryParams: function (params) {
            return params;
        },
        queryParamsType: 'limit', // undefined
        responseHandler: function (res) {
            return res;
        },
        pagination: false,
        onlyInfoPagination: false,
        sidePagination: 'client', // client or server
        totalRows: 0, // server side need to set
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: 'right', //right, left
        paginationVAlign: 'bottom', //bottom, top, both
        paginationDetailHAlign: 'left', //right, left
        paginationPreText: '&lsaquo;',
        paginationNextText: '&rsaquo;',
        search: false,
        searchOnEnterKey: false,
        strictSearch: false,
        searchAlign: 'right',
        selectItemName: 'btSelectItem',
        showHeader: true,
        showFooter: false,
        showColumns: false,
        showPaginationSwitch: false,
        showRefresh: false,
        showToggle: false,
        buttonsAlign: 'right',
        smartDisplay: true,
        escape: false,
        minimumCountColumns: 1,
        idField: undefined,
        uniqueId: undefined,
        cardView: false,
        detailView: false,
        detailFormatter: function (index, row) {
            return '';
        },
        trimOnSearch: true,
        clickToSelect: false,
        singleSelect: false,
        toolbar: undefined,
        toolbarAlign: 'left',
        checkboxHeader: true,
        sortable: true,
        silentSort: true,
        maintainSelected: false,
        searchTimeOut: 500,
        searchText: '',
        iconSize: undefined,
        iconsPrefix: 'glyphicon', // glyphicon of fa (font awesome)
        icons: {
            paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
            paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
            refresh: 'glyphicon-refresh icon-refresh',
            toggle: 'glyphicon-list-alt icon-list-alt',
            columns: 'glyphicon-th icon-th',
            detailOpen: 'glyphicon-plus icon-plus',
            detailClose: 'glyphicon-minus icon-minus'
        },

        rowStyle: function (row, index) {
            return {};
        },

        rowAttributes: function (row, index) {
            return {};
        },

        onAll: function (name, args) {
            return false;
        },
        onClickCell: function (field, value, row, $element) {
            return false;
        },
        onDblClickCell: function (field, value, row, $element) {
            return false;
        },
        onClickRow: function (item, $element) {
            return false;
        },
        onDblClickRow: function (item, $element) {
            return false;
        },
        onSort: function (name, order) {
            return false;
        },
        onCheck: function (row) {
            return false;
        },
        onUncheck: function (row) {
            return false;
        },
        onCheckAll: function (rows) {
            return false;
        },
        onUncheckAll: function (rows) {
            return false;
        },
        onCheckSome: function (rows) {
            return false;
        },
        onUncheckSome: function (rows) {
            return false;
        },
        onLoadSuccess: function (data) {
            return false;
        },
        onLoadError: function (status) {
            return false;
        },
        onColumnSwitch: function (field, checked) {
            return false;
        },
        onPageChange: function (number, size) {
            return false;
        },
        onSearch: function (text) {
            return false;
        },
        onToggle: function (cardView) {
            return false;
        },
        onPreBody: function (data) {
            return false;
        },
        onPostBody: function () {
            return false;
        },
        onPostHeader: function () {
            return false;
        },
        onExpandRow: function (index, row, $detail) {
            return false;
        },
        onCollapseRow: function (index, row) {
            return false;
        },
        onRefreshOptions: function (options) {
            return false;
        },
        onResetView: function () {
            return false;
        }
    };

    BootstrapTable.LOCALES = [];

    BootstrapTable.LOCALES['en-US'] = BootstrapTable.LOCALES['en'] = {
        formatLoadingMessage: function () {
            return 'Loading, please wait...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return sprintf('%s records per page', pageNumber);
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
        },
        formatDetailPagination: function (totalRows) {
            return sprintf('Showing %s rows', totalRows);
        },
        formatSearch: function () {
            return 'Search';
        },
        formatNoMatches: function () {
            return 'No matching records found';
        },
        formatPaginationSwitch: function () {
            return 'Hide/Show pagination';
        },
        formatRefresh: function () {
            return 'Refresh';
        },
        formatToggle: function () {
            return 'Toggle';
        },
        formatColumns: function () {
            return 'Columns';
        },
        formatAllRows: function () {
            return 'All';
        }
    };

    $.extend(BootstrapTable.DEFAULTS, BootstrapTable.LOCALES['en-US']);

    BootstrapTable.COLUMN_DEFAULTS = {
        radio: false,
        checkbox: false,
        checkboxEnabled: true,
        field: undefined,
        title: undefined,
        titleTooltip: undefined,
        'class': undefined,
        align: undefined, // left, right, center
        halign: undefined, // left, right, center
        falign: undefined, // left, right, center
        valign: undefined, // top, middle, bottom
        width: undefined,
        sortable: false,
        order: 'asc', // asc, desc
        visible: true,
        switchable: true,
        clickToSelect: true,
        formatter: undefined,
        footerFormatter: undefined,
        events: undefined,
        sorter: undefined,
        sortName: undefined,
        cellStyle: undefined,
        searchable: true,
        searchFormatter: true,
        cardVisible: true
    };

    BootstrapTable.EVENTS = {
        'all.bs.table': 'onAll',
        'click-cell.bs.table': 'onClickCell',
        'dbl-click-cell.bs.table': 'onDblClickCell',
        'click-row.bs.table': 'onClickRow',
        'dbl-click-row.bs.table': 'onDblClickRow',
        'sort.bs.table': 'onSort',
        'check.bs.table': 'onCheck',
        'uncheck.bs.table': 'onUncheck',
        'check-all.bs.table': 'onCheckAll',
        'uncheck-all.bs.table': 'onUncheckAll',
        'check-some.bs.table': 'onCheckSome',
        'uncheck-some.bs.table': 'onUncheckSome',
        'load-success.bs.table': 'onLoadSuccess',
        'load-error.bs.table': 'onLoadError',
        'column-switch.bs.table': 'onColumnSwitch',
        'page-change.bs.table': 'onPageChange',
        'search.bs.table': 'onSearch',
        'toggle.bs.table': 'onToggle',
        'pre-body.bs.table': 'onPreBody',
        'post-body.bs.table': 'onPostBody',
        'post-header.bs.table': 'onPostHeader',
        'expand-row.bs.table': 'onExpandRow',
        'collapse-row.bs.table': 'onCollapseRow',
        'refresh-options.bs.table': 'onRefreshOptions',
        'reset-view.bs.table': 'onResetView'
    };

    BootstrapTable.prototype.init = function () {
        this.initLocale();
        this.initContainer();
        this.initTable();
        this.initHeader();
        this.initData();
        this.initFooter();
        this.initToolbar();
        this.initPagination();
        this.initBody();
        this.initSearchText();
        this.initServer();
    };

    BootstrapTable.prototype.initLocale = function () {
        if (this.options.locale) {
            var parts = this.options.locale.split(/-|_/);
            parts[0].toLowerCase();
            parts[1] && parts[1].toUpperCase();
            if ($.fn.bootstrapTable.locales[this.options.locale]) {
                // locale as requested
                $.extend(this.options, $.fn.bootstrapTable.locales[this.options.locale]);
            } else if ($.fn.bootstrapTable.locales[parts.join('-')]) {
                // locale with sep set to - (in case original was specified with _)
                $.extend(this.options, $.fn.bootstrapTable.locales[parts.join('-')]);
            } else if ($.fn.bootstrapTable.locales[parts[0]]) {
                // short locale language code (i.e. 'en')
                $.extend(this.options, $.fn.bootstrapTable.locales[parts[0]]);
            }
        }
    };

    BootstrapTable.prototype.initContainer = function () {
        this.$container = $([
            '<div class="bootstrap-table">',
            '<div class="fixed-table-toolbar"></div>',
            this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
                '<div class="fixed-table-pagination" style="clear: both;"></div>' :
                '',
            '<div class="fixed-table-container">',
            '<div class="fixed-table-header"><table></table></div>',
            '<div class="fixed-table-body">',
            '<div class="fixed-table-loading">',
            this.options.formatLoadingMessage(),
            '</div>',
            '</div>',
            '<div class="fixed-table-footer"><table><tr></tr></table></div>',
            this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both' ?
                '<div class="fixed-table-pagination"></div>' :
                '',
            '</div>',
            '</div>'
        ].join(''));

        this.$container.insertAfter(this.$el);
        this.$tableContainer = this.$container.find('.fixed-table-container');
        this.$tableHeader = this.$container.find('.fixed-table-header');
        this.$tableBody = this.$container.find('.fixed-table-body');
        this.$tableLoading = this.$container.find('.fixed-table-loading');
        this.$tableFooter = this.$container.find('.fixed-table-footer');
        this.$toolbar = this.$container.find('.fixed-table-toolbar');
        this.$pagination = this.$container.find('.fixed-table-pagination');

        this.$tableBody.append(this.$el);
        this.$container.after('<div class="clearfix"></div>');

        this.$el.addClass(this.options.classes);
        if (this.options.striped) {
            this.$el.addClass('table-striped');
        }
        if ($.inArray('table-no-bordered', this.options.classes.split(' ')) !== -1) {
            this.$tableContainer.addClass('table-no-bordered');
        }
    };

    BootstrapTable.prototype.initTable = function () {
        var that = this,
            columns = [],
            data = [];

        this.$header = this.$el.find('>thead');
        if (!this.$header.length) {
            this.$header = $('<thead></thead>').appendTo(this.$el);
        }
        this.$header.find('tr').each(function () {
            var column = [];

            $(this).find('th').each(function () {
                column.push($.extend({}, {
                    title: $(this).html(),
                    'class': $(this).attr('class'),
                    titleTooltip: $(this).attr('title'),
                    rowspan: $(this).attr('rowspan') ? +$(this).attr('rowspan') : undefined,
                    colspan: $(this).attr('colspan') ? +$(this).attr('colspan') : undefined
                }, $(this).data()));
            });
            columns.push(column);
        });
        if (!$.isArray(this.options.columns[0])) {
            this.options.columns = [this.options.columns];
        }
        this.options.columns = $.extend(true, [], columns, this.options.columns);
        this.columns = [];

        setFieldIndex(this.options.columns);
        $.each(this.options.columns, function (i, columns) {
            $.each(columns, function (j, column) {
                column = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, column);

                if (typeof column.fieldIndex !== 'undefined') {
                    that.columns[column.fieldIndex] = column;
                }

                that.options.columns[i][j] = column;
            });
        });

        // if options.data is setting, do not process tbody data
        if (this.options.data.length) {
            return;
        }

        this.$el.find('>tbody>tr').each(function () {
            var row = {};

            // save tr's id, class and data-* attributes
            row._id = $(this).attr('id');
            row._class = $(this).attr('class');
            row._data = getRealDataAttr($(this).data());

            $(this).find('td').each(function (i) {
                var field = that.columns[i].field;

                row[field] = $(this).html();
                // save td's id, class and data-* attributes
                row['_' + field + '_id'] = $(this).attr('id');
                row['_' + field + '_class'] = $(this).attr('class');
                row['_' + field + '_rowspan'] = $(this).attr('rowspan');
                row['_' + field + '_title'] = $(this).attr('title');
                row['_' + field + '_data'] = getRealDataAttr($(this).data());
            });
            data.push(row);
        });
        this.options.data = data;
    };

    BootstrapTable.prototype.initHeader = function () {
        var that = this,
            visibleColumns = {},
            html = [];

        this.header = {
            fields: [],
            styles: [],
            classes: [],
            formatters: [],
            events: [],
            sorters: [],
            sortNames: [],
            cellStyles: [],
            searchables: []
        };

        $.each(this.options.columns, function (i, columns) {
            html.push('<tr>');

            if (i == 0 && !that.options.cardView && that.options.detailView) {
                html.push(sprintf('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>',
                    that.options.columns.length));
            }

            $.each(columns, function (j, column) {
                var text = '',
                    halign = '', // header align style
                    align = '', // body align style
                    style = '',
                    class_ = sprintf(' class="%s"', column['class']),
                    order = that.options.sortOrder || column.order,
                    unitWidth = 'px',
                    width = column.width;

                if (column.width !== undefined && (!that.options.cardView)) {
                    if (typeof column.width === 'string') {
                        if (column.width.indexOf('%') !== -1) {
                            unitWidth = '%';
                        }
                    }
                }
                if (column.width && typeof column.width === 'string') {
                    width = column.width.replace('%', '').replace('px', '');
                }

                halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
                align = sprintf('text-align: %s; ', column.align);
                style = sprintf('vertical-align: %s; ', column.valign);
                style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width ?
                    '36px' : (width ? width + unitWidth : undefined));

                if (typeof column.fieldIndex !== 'undefined') {
                    that.header.fields[column.fieldIndex] = column.field;
                    that.header.styles[column.fieldIndex] = align + style;
                    that.header.classes[column.fieldIndex] = class_;
                    that.header.formatters[column.fieldIndex] = column.formatter;
                    that.header.events[column.fieldIndex] = column.events;
                    that.header.sorters[column.fieldIndex] = column.sorter;
                    that.header.sortNames[column.fieldIndex] = column.sortName;
                    that.header.cellStyles[column.fieldIndex] = column.cellStyle;
                    that.header.searchables[column.fieldIndex] = column.searchable;

                    if (!column.visible) {
                        return;
                    }

                    if (that.options.cardView && (!column.cardVisible)) {
                        return;
                    }

                    visibleColumns[column.field] = column;
                }

                html.push('<th' + sprintf(' title="%s"', column.titleTooltip),
                    column.checkbox || column.radio ?
                        sprintf(' class="bs-checkbox %s"', column['class'] || '') :
                        class_,
                    sprintf(' style="%s"', halign + style),
                    sprintf(' rowspan="%s"', column.rowspan),
                    sprintf(' colspan="%s"', column.colspan),
                    sprintf(' data-field="%s"', column.field),
                    "tabindex='0'",
                    '>');

                html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ?
                    'sortable both' : ''));

                text = column.title;

                if (column.checkbox) {
                    if (!that.options.singleSelect && that.options.checkboxHeader) {
                        //text = '<input name="btSelectAll" type="checkbox" />';
                        var GID = $.IGuid();
                        text = '<input name="btSelectAll" id="' + GID + '" type="checkbox" style="display:none;" /><label for="' + GID + '"></label>';
                    }
                    that.header.stateField = column.field;
                }
                if (column.radio) {
                    text = '';
                    that.header.stateField = column.field;
                    that.options.singleSelect = true;
                }

                html.push(text);
                html.push('</div>');
                html.push('<div class="fht-cell"></div>');
                html.push('</div>');
                html.push('</th>');
            });
            html.push('</tr>');
        });

        this.$header.html(html.join(''));
        this.$header.find('th[data-field]').each(function (i) {
            $(this).data(visibleColumns[$(this).data('field')]);
        });
        this.$container.off('click', '.th-inner').on('click', '.th-inner', function (event) {
            var target = $(this);
            if (target.closest('.bootstrap-table')[0] !== that.$container[0])
                return false;

            if (that.options.sortable && target.parent().data().sortable) {
                that.onSort(event);
            }
        });

        this.$header.children().children().off('keypress').on('keypress', function (event) {
            if (that.options.sortable && $(this).data().sortable) {
                var code = event.keyCode || event.which;
                if (code == 13) { //Enter keycode
                    that.onSort(event);
                }
            }
        });

        if (!this.options.showHeader || this.options.cardView) {
            this.$header.hide();
            this.$tableHeader.hide();
            this.$tableLoading.css('top', 0);
        } else {
            this.$header.show();
            this.$tableHeader.show();
            this.$tableLoading.css('top', this.$header.outerHeight() + 1);
            // Assign the correct sortable arrow
            this.getCaret();
        }

        this.$selectAll = this.$header.find('[name="btSelectAll"]');
        this.$selectAll.off('click').on('click', function () {
            var checked = $(this).prop('checked');
            that[checked ? 'checkAll' : 'uncheckAll']();
            that.updateSelected();
        });
    };

    BootstrapTable.prototype.initFooter = function () {
        if (!this.options.showFooter || this.options.cardView) {
            this.$tableFooter.hide();
        } else {
            this.$tableFooter.show();
        }
    };

    /**
     * @param data
     * @param type: append / prepend
     */
    BootstrapTable.prototype.initData = function (data, type) {
        if (type === 'append') {
            this.data = this.data.concat(data);
        } else if (type === 'prepend') {
            this.data = [].concat(data).concat(this.data);
        } else {
            this.data = data || this.options.data;
        }

        // Fix #839 Records deleted when adding new row on filtered table
        if (type === 'append') {
            this.options.data = this.options.data.concat(data);
        } else if (type === 'prepend') {
            this.options.data = [].concat(data).concat(this.options.data);
        } else {
            this.options.data = this.data;
        }

        if (this.options.sidePagination === 'server') {
            return;
        }
        this.initSort();
    };

    BootstrapTable.prototype.initSort = function () {
        var that = this,
            name = this.options.sortName,
            order = this.options.sortOrder === 'desc' ? -1 : 1,
            index = $.inArray(this.options.sortName, this.header.fields);

        if (index !== -1) {
            this.data.sort(function (a, b) {
                if (that.header.sortNames[index]) {
                    name = that.header.sortNames[index];
                }
                var aa = getItemField(a, name, that.options.escape),
                    bb = getItemField(b, name, that.options.escape),
                    value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);

                if (value !== undefined) {
                    return order * value;
                }

                // Fix #161: undefined or null string sort bug.
                if (aa === undefined || aa === null) {
                    aa = '';
                }
                if (bb === undefined || bb === null) {
                    bb = '';
                }

                // IF both values are numeric, do a numeric comparison
                if ($.isNumeric(aa) && $.isNumeric(bb)) {
                    // Convert numerical values form string to float.
                    aa = parseFloat(aa);
                    bb = parseFloat(bb);
                    if (aa < bb) {
                        return order * -1;
                    }
                    return order;
                }

                if (aa === bb) {
                    return 0;
                }

                // If value is not a string, convert to string
                if (typeof aa !== 'string') {
                    aa = aa.toString();
                }

                if (aa.localeCompare(bb) === -1) {
                    return order * -1;
                }

                return order;
            });
        }
    };

    BootstrapTable.prototype.onSort = function (event) {
        var $this = event.type === "keypress" ? $(event.currentTarget) : $(event.currentTarget).parent(),
            $this_ = this.$header.find('th').eq($this.index());

        this.$header.add(this.$header_).find('span.order').remove();

        if (this.options.sortName === $this.data('field')) {
            this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.options.sortName = $this.data('field');
            this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
        }
        this.trigger('sort', this.options.sortName, this.options.sortOrder);

        $this.add($this_).data('order', this.options.sortOrder);

        // Assign the correct sortable arrow
        this.getCaret();

        if (this.options.sidePagination === 'server') {
            this.initServer(this.options.silentSort);
            return;
        }

        this.initSort();
        this.initBody();
    };

    BootstrapTable.prototype.initToolbar = function () {
        var that = this,
            html = [],
            timeoutId = 0,
            $keepOpen,
            $search,
            switchableCount = 0;

        if (this.$toolbar.find('.bars').children().length) {
            $('body').append($(this.options.toolbar));
        }
        this.$toolbar.html('');

        if (typeof this.options.toolbar === 'string' || typeof this.options.toolbar === 'object') {
            $(sprintf('<div class="bars pull-%s"></div>', this.options.toolbarAlign))
                .appendTo(this.$toolbar)
                .append($(this.options.toolbar));
        }

        // showColumns, showToggle, showRefresh
        html = [sprintf('<div class="columns columns-%s btn-group pull-%s">',
            this.options.buttonsAlign, this.options.buttonsAlign)];

        if (typeof this.options.icons === 'string') {
            this.options.icons = calculateObjectValue(null, this.options.icons);
        }

        if (this.options.showPaginationSwitch) {
            html.push(sprintf('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">',
                this.options.formatPaginationSwitch()),
                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown),
                '</button>');
        }

        if (this.options.showRefresh) {
            html.push(sprintf('<button class="btn btn-default' +
                sprintf(' btn-%s', this.options.iconSize) +
                '" type="button" name="refresh" title="%s">',
                this.options.formatRefresh()),
                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh),
                '</button>');
        }

        if (this.options.showToggle) {
            html.push(sprintf('<button class="btn btn-default' +
                sprintf(' btn-%s', this.options.iconSize) +
                '" type="button" name="toggle" title="%s">',
                this.options.formatToggle()),
                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle),
                '</button>');
        }

        if (this.options.showColumns) {
            html.push(sprintf('<div class="keep-open btn-group" title="%s">',
                this.options.formatColumns()),
                '<button type="button" class="btn btn-default' +
                sprintf(' btn-%s', this.options.iconSize) +
                ' dropdown-toggle" data-toggle="dropdown">',
                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns),
                ' <span class="caret"></span>',
                '</button>',
                '<ul class="dropdown-menu" role="menu">');

            $.each(this.columns, function (i, column) {
                if (column.radio || column.checkbox) {
                    return;
                }

                if (that.options.cardView && (!column.cardVisible)) {
                    return;
                }

                var checked = column.visible ? ' checked="checked"' : '';

                if (column.switchable) {
                    html.push(sprintf('<li>' +
                        '<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>' +
                        '</li>', column.field, i, checked, column.title));
                    switchableCount++;
                }
            });
            html.push('</ul>',
                '</div>');
        }

        html.push('</div>');

        // Fix #188: this.showToolbar is for extensions
        if (this.showToolbar || html.length > 2) {
            this.$toolbar.append(html.join(''));
        }

        if (this.options.showPaginationSwitch) {
            this.$toolbar.find('button[name="paginationSwitch"]')
                .off('click').on('click', $.proxy(this.togglePagination, this));
        }

        if (this.options.showRefresh) {
            this.$toolbar.find('button[name="refresh"]')
                .off('click').on('click', $.proxy(this.refresh, this));
        }

        if (this.options.showToggle) {
            this.$toolbar.find('button[name="toggle"]')
                .off('click').on('click', function () {
                    that.toggleView();
                });
        }

        if (this.options.showColumns) {
            $keepOpen = this.$toolbar.find('.keep-open');

            if (switchableCount <= this.options.minimumCountColumns) {
                $keepOpen.find('input').prop('disabled', true);
            }

            $keepOpen.find('li').off('click').on('click', function (event) {
                event.stopImmediatePropagation();
            });
            $keepOpen.find('input').off('click').on('click', function () {
                var $this = $(this);

                that.toggleColumn(getFieldIndex(that.columns,
                    $(this).data('field')), $this.prop('checked'), false);
                that.trigger('column-switch', $(this).data('field'), $this.prop('checked'));
            });
        }

        if (this.options.search) {
            html = [];
            html.push(
                '<div class="pull-' + this.options.searchAlign + ' search">',
                sprintf('<input class="form-control' +
                    sprintf(' input-%s', this.options.iconSize) +
                    '" type="text" placeholder="%s">',
                    this.options.formatSearch()),
                '</div>');

            this.$toolbar.append(html.join(''));
            $search = this.$toolbar.find('.search input');
            $search.off('keyup drop').on('keyup drop', function (event) {
                if (that.options.searchOnEnterKey) {
                    if (event.keyCode !== 13) {
                        return;
                    }
                }

                clearTimeout(timeoutId); // doesn't matter if it's 0
                timeoutId = setTimeout(function () {
                    that.onSearch(event);
                }, that.options.searchTimeOut);
            });

            if (isIEBrowser()) {
                $search.off('mouseup').on('mouseup', function (event) {
                    clearTimeout(timeoutId); // doesn't matter if it's 0
                    timeoutId = setTimeout(function () {
                        that.onSearch(event);
                    }, that.options.searchTimeOut);
                });
            }
        }
    };

    BootstrapTable.prototype.onSearch = function (event) {
        var text = $.trim($(event.currentTarget).val());

        // trim search input
        if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
            $(event.currentTarget).val(text);
        }

        if (text === this.searchText) {
            return;
        }
        this.searchText = text;
        this.options.searchText = text;

        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
        this.trigger('search', text);
    };

    BootstrapTable.prototype.initSearch = function () {
        var that = this;

        if (this.options.sidePagination !== 'server') {
            var s = this.searchText && this.searchText.toLowerCase();
            var f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns;

            // Check filter
            this.data = f ? $.grep(this.options.data, function (item, i) {
                for (var key in f) {
                    if ($.isArray(f[key])) {
                        if ($.inArray(item[key], f[key]) === -1) {
                            return false;
                        }
                    } else if (item[key] !== f[key]) {
                        return false;
                    }
                }
                return true;
            }) : this.options.data;

            this.data = s ? $.grep(this.data, function (item, i) {
                for (var key in item) {
                    key = $.isNumeric(key) ? parseInt(key, 10) : key;
                    var value = item[key],
                        column = that.columns[getFieldIndex(that.columns, key)],
                        j = $.inArray(key, that.header.fields);

                    // Fix #142: search use formatted data
                    if (column && column.searchFormatter) {
                        value = calculateObjectValue(column,
                            that.header.formatters[j], [value, item, i], value);
                    }

                    var index = $.inArray(key, that.header.fields);
                    if (index !== -1 && that.header.searchables[index] && (typeof value === 'string' || typeof value === 'number')) {
                        if (that.options.strictSearch) {
                            if ((value + '').toLowerCase() === s) {
                                return true;
                            }
                        } else {
                            if ((value + '').toLowerCase().indexOf(s) !== -1) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }) : this.data;
        }
    };

    BootstrapTable.prototype.initPagination = function () {
        if (!this.options.pagination) {
            this.$pagination.hide();
            return;
        } else {
            this.$pagination.show();
        }

        var that = this,
            html = [],
            $allSelected = false,
            i, from, to,
            $pageList,
            $first, $pre,
            $next, $last,
            $number,
            data = this.getData();

        if (this.options.sidePagination !== 'server') {
            this.options.totalRows = data.length;
        }

        this.totalPages = 0;
        if (this.options.totalRows) {
            if (this.options.pageSize === this.options.formatAllRows()) {
                this.options.pageSize = this.options.totalRows;
                $allSelected = true;
            } else if (this.options.pageSize === this.options.totalRows) {
                // Fix #667 Table with pagination,
                // multiple pages and a search that matches to one page throws exception
                var pageLst = typeof this.options.pageList === 'string' ?
                    this.options.pageList.replace('[', '').replace(']', '')
                        .replace(/ /g, '').toLowerCase().split(',') : this.options.pageList;
                if ($.inArray(this.options.formatAllRows().toLowerCase(), pageLst) > -1) {
                    $allSelected = true;
                }
            }

            this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1;

            this.options.totalPages = this.totalPages;
        }
        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
            this.options.pageNumber = this.totalPages;
        }

        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
        this.pageTo = this.options.pageNumber * this.options.pageSize;
        if (this.pageTo > this.options.totalRows) {
            this.pageTo = this.options.totalRows;
        }

        html.push(
            '<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">',
            '<span class="pagination-info">',
            this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows) :
                this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows),
            '</span>');

        if (!this.options.onlyInfoPagination) {
            html.push('<span class="page-list">');

            var pageNumber = [
                sprintf('<span class="btn-group %s">',
                    this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
                        'dropdown' : 'dropup'),
                '<button type="button" class="btn btn-default ' +
                sprintf(' btn-%s', this.options.iconSize) +
                ' dropdown-toggle" data-toggle="dropdown">',
                '<span class="page-size">',
                $allSelected ? this.options.formatAllRows() : this.options.pageSize,
                '</span>',
                ' <span class="caret"></span>',
                '</button>',
                '<ul class="dropdown-menu" role="menu">'
            ],
                pageList = this.options.pageList;

            if (typeof this.options.pageList === 'string') {
                var list = this.options.pageList.replace('[', '').replace(']', '')
                    .replace(/ /g, '').split(',');

                pageList = [];
                $.each(list, function (i, value) {
                    pageList.push(value.toUpperCase() === that.options.formatAllRows().toUpperCase() ?
                        that.options.formatAllRows() : +value);
                });
            }

            $.each(pageList, function (i, page) {
                if (!that.options.smartDisplay || i === 0 || pageList[i - 1] <= that.options.totalRows) {
                    var active;
                    if ($allSelected) {
                        active = page === that.options.formatAllRows() ? ' class="active"' : '';
                    } else {
                        active = page === that.options.pageSize ? ' class="active"' : '';
                    }
                    pageNumber.push(sprintf('<li%s><a href="javascript:void(0)">%s</a></li>', active, page));
                }
            });
            pageNumber.push('</ul></span>');

            html.push(this.options.formatRecordsPerPage(pageNumber.join('')));
            html.push('</span>');

            html.push('</div>',
                '<div class="pull-' + this.options.paginationHAlign + ' pagination">',
                '<ul class="pagination' + sprintf(' pagination-%s', this.options.iconSize) + '">',
                '<li class="page-pre"><a href="javascript:void(0)">' + this.options.paginationPreText + '</a></li>');

            if (this.totalPages < 5) {
                from = 1;
                to = this.totalPages;
            } else {
                from = this.options.pageNumber - 2;
                to = from + 4;
                if (from < 1) {
                    from = 1;
                    to = 5;
                }
                if (to > this.totalPages) {
                    to = this.totalPages;
                    from = to - 4;
                }
            }

            if (this.totalPages >= 6) {
                if (this.options.pageNumber >= 3) {
                    html.push('<li class="page-first' + (1 === this.options.pageNumber ? ' active' : '') + '">',
                        '<a href="javascript:void(0)">', 1, '</a>',
                        '</li>');

                    from++;
                }

                if (this.options.pageNumber >= 4) {
                    if (this.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
                        from--;
                    } else {
                        html.push('<li class="page-first-separator disabled">',
                            '<a href="javascript:void(0)">...</a>',
                            '</li>');
                    }

                    to--;
                }
            }

            if (this.totalPages >= 7) {
                if (this.options.pageNumber >= (this.totalPages - 2)) {
                    from--;
                }
            }

            if (this.totalPages == 6) {
                if (this.options.pageNumber >= (this.totalPages - 2)) {
                    to++;
                }
            } else if (this.totalPages >= 7) {
                if (this.totalPages == 7 || this.options.pageNumber >= (this.totalPages - 3)) {
                    to++;
                }
            }

            for (i = from; i <= to; i++) {
                html.push('<li class="page-number' + (i === this.options.pageNumber ? ' active' : '') + '">',
                    '<a href="javascript:void(0)">', i, '</a>',
                    '</li>');
            }

            if (this.totalPages >= 8) {
                if (this.options.pageNumber <= (this.totalPages - 4)) {
                    html.push('<li class="page-last-separator disabled">',
                        '<a href="javascript:void(0)">...</a>',
                        '</li>');
                }
            }

            if (this.totalPages >= 6) {
                if (this.options.pageNumber <= (this.totalPages - 3)) {
                    html.push('<li class="page-last' + (this.totalPages === this.options.pageNumber ? ' active' : '') + '">',
                        '<a href="javascript:void(0)">', this.totalPages, '</a>',
                        '</li>');
                }
            }

            html.push(
                '<li class="page-next"><a href="javascript:void(0)">' + this.options.paginationNextText + '</a></li>',
                '</ul>',
                '</div>');
        }
        this.$pagination.html(html.join(''));

        if (!this.options.onlyInfoPagination) {
            $pageList = this.$pagination.find('.page-list a');
            $first = this.$pagination.find('.page-first');
            $pre = this.$pagination.find('.page-pre');
            $next = this.$pagination.find('.page-next');
            $last = this.$pagination.find('.page-last');
            $number = this.$pagination.find('.page-number');

            if (this.options.smartDisplay) {
                if (this.totalPages <= 1) {
                    this.$pagination.find('div.pagination').hide();
                }
                if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
                    this.$pagination.find('span.page-list').hide();
                }

                // when data is empty, hide the pagination
                this.$pagination[this.getData().length ? 'show' : 'hide']();
            }
            if ($allSelected) {
                this.options.pageSize = this.options.formatAllRows();
            }
            $pageList.off('click').on('click', $.proxy(this.onPageListChange, this));
            $first.off('click').on('click', $.proxy(this.onPageFirst, this));
            $pre.off('click').on('click', $.proxy(this.onPagePre, this));
            $next.off('click').on('click', $.proxy(this.onPageNext, this));
            $last.off('click').on('click', $.proxy(this.onPageLast, this));
            $number.off('click').on('click', $.proxy(this.onPageNumber, this));
        }
    };

    BootstrapTable.prototype.updatePagination = function (event) {
        // Fix #171: IE disabled button can be clicked bug.
        if (event && $(event.currentTarget).hasClass('disabled')) {
            return;
        }

        if (!this.options.maintainSelected) {
            this.resetRows();
        }

        this.initPagination();
        if (this.options.sidePagination === 'server') {
            this.initServer();
        } else {
            this.initBody();
        }

        this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
    };

    BootstrapTable.prototype.onPageListChange = function (event) {
        var $this = $(event.currentTarget);

        $this.parent().addClass('active').siblings().removeClass('active');
        this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ?
            this.options.formatAllRows() : +$this.text();
        this.$toolbar.find('.page-size').text(this.options.pageSize);

        this.updatePagination(event);
    };

    BootstrapTable.prototype.onPageFirst = function (event) {
        this.options.pageNumber = 1;
        this.updatePagination(event);
    };

    BootstrapTable.prototype.onPagePre = function (event) {
        if ((this.options.pageNumber - 1) == 0) {
            this.options.pageNumber = this.options.totalPages;
        } else {
            this.options.pageNumber--;
        }
        this.updatePagination(event);
    };

    BootstrapTable.prototype.onPageNext = function (event) {
        if ((this.options.pageNumber + 1) > this.options.totalPages) {
            this.options.pageNumber = 1;
        } else {
            this.options.pageNumber++;
        }
        this.updatePagination(event);
    };

    BootstrapTable.prototype.onPageLast = function (event) {
        this.options.pageNumber = this.totalPages;
        this.updatePagination(event);
    };

    BootstrapTable.prototype.onPageNumber = function (event) {
        if (this.options.pageNumber === +$(event.currentTarget).text()) {
            return;
        }
        this.options.pageNumber = +$(event.currentTarget).text();
        this.updatePagination(event);
    };

    BootstrapTable.prototype.initBody = function (fixedScroll) {
        var that = this,
            html = [],
            data = this.getData();

        this.trigger('pre-body', data);

        this.$body = this.$el.find('>tbody');
        if (!this.$body.length) {
            this.$body = $('<tbody></tbody>').appendTo(this.$el);
        }

        //Fix #389 Bootstrap-table-flatJSON is not working

        if (!this.options.pagination || this.options.sidePagination === 'server') {
            this.pageFrom = 1;
            this.pageTo = data.length;
        }

        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
            var key,
                item = data[i],
                style = {},
                csses = [],
                data_ = '',
                attributes = {},
                htmlAttributes = [];

            style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

            if (style && style.css) {
                for (key in style.css) {
                    csses.push(key + ': ' + style.css[key]);
                }
            }

            attributes = calculateObjectValue(this.options,
                this.options.rowAttributes, [item, i], attributes);

            if (attributes) {
                for (key in attributes) {
                    htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
                }
            }

            if (item._data && !$.isEmptyObject(item._data)) {
                $.each(item._data, function (k, v) {
                    // ignore data-index
                    if (k === 'index') {
                        return;
                    }
                    data_ += sprintf(' data-%s="%s"', k, v);
                });
            }

            html.push('<tr',
                sprintf(' %s', htmlAttributes.join(' ')),
                sprintf(' id="%s"', $.isArray(item) ? undefined : item._id),
                sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)),
                sprintf(' data-index="%s"', i),
                sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]),
                sprintf('%s', data_),
                '>'
            );

            if (this.options.cardView) {
                html.push(sprintf('<td colspan="%s">', this.header.fields.length));
            }

            if (!this.options.cardView && this.options.detailView) {
                html.push('<td>',
                    '<a class="detail-icon" href="javascript:">',
                    sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen),
                    '</a>',
                    '</td>');
            }

            $.each(this.header.fields, function (j, field) {
                var text = '',
                    value = getItemField(item, field, that.options.escape),
                    type = '',
                    cellStyle = {},
                    id_ = '',
                    class_ = that.header.classes[j],
                    data_ = '',
                    rowspan_ = '',
                    title_ = '',
                    column = that.columns[getFieldIndex(that.columns, field)];

                if (!column || !column.visible) {
                    return;
                }

                style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));

                value = calculateObjectValue(column,
                    that.header.formatters[j], [value, item, i], value);

                // handle td's id and class
                if (item['_' + field + '_id']) {
                    id_ = sprintf(' id="%s"', item['_' + field + '_id']);
                }
                if (item['_' + field + '_class']) {
                    class_ = sprintf(' class="%s"', item['_' + field + '_class']);
                }
                if (item['_' + field + '_rowspan']) {
                    rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan']);
                }
                if (item['_' + field + '_title']) {
                    title_ = sprintf(' title="%s"', item['_' + field + '_title']);
                }
                cellStyle = calculateObjectValue(that.header,
                    that.header.cellStyles[j], [value, item, i], cellStyle);
                if (cellStyle.classes) {
                    class_ = sprintf(' class="%s"', cellStyle.classes);
                }
                if (cellStyle.css) {
                    var csses_ = [];
                    for (var key in cellStyle.css) {
                        csses_.push(key + ': ' + cellStyle.css[key]);
                    }
                    style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
                }

                if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
                    $.each(item['_' + field + '_data'], function (k, v) {
                        // ignore data-index
                        if (k === 'index') {
                            return;
                        }
                        data_ += sprintf(' data-%s="%s"', k, v);
                    });
                }

                if (column.checkbox || column.radio) {
                    type = column.checkbox ? 'checkbox' : type;
                    type = column.radio ? 'radio' : type;
                    var GID = $.IGuid();
                    text = [sprintf(that.options.cardView ?
                        '<div class="card-view %s">' : '<td class="bs-checkbox %s">', column['class'] || ''),
                    '<input id="' + GID + '" style="display:none;"' +
                    sprintf(' data-index="%s"', i) +
                    sprintf(' name="%s"', that.options.selectItemName) +
                    sprintf(' type="%s"', type) +
                    sprintf(' value="%s"', item[that.options.idField]) +
                    sprintf(' checked="%s"', value === true ||
                        (value && value.checked) ? 'checked' : undefined) +
                    sprintf(' disabled="%s"', !column.checkboxEnabled ||
                        (value && value.disabled) ? 'disabled' : undefined) +
                    ' /><label for="' + GID + '"></label>',
                    that.header.formatters[j] && typeof value === 'string' ? value : '',
                    that.options.cardView ? '</div>' : '</td>'
                    ].join('');

                    item[that.header.stateField] = value === true || (value && value.checked);
                } else {
                    value = typeof value === 'undefined' || value === null ?
                        that.options.undefinedText : value;

                    text = that.options.cardView ? ['<div class="card-view">',
                        that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style,
                            getPropertyFromOther(that.columns, 'field', 'title', field)) : '',
                        sprintf('<span class="value">%s</span>', value),
                        '</div>'
                    ].join('') : [sprintf('<td%s %s %s %s %s %s>', id_, class_, style, data_, rowspan_, title_),
                        value,
                        '</td>'
                    ].join('');

                    // Hide empty data on Card view when smartDisplay is set to true.
                    if (that.options.cardView && that.options.smartDisplay && value === '') {
                        // Should set a placeholder for event binding correct fieldIndex
                        text = '<div class="card-view"></div>';
                    }
                }

                html.push(text);
            });

            if (this.options.cardView) {
                html.push('</td>');
            }

            html.push('</tr>');
        }

        // show no records
        if (!html.length) {
            html.push('<tr class="no-records-found table-nodata">',
                sprintf('<td colspan="%s">%s</td>',
                    this.$header.find('th').length, this.options.formatNoMatches()),
                '</tr>');
        }

        this.$body.html(html.join(''));

        if (!fixedScroll) {
            this.scrollTo(0);
        }

        // click to select by column
        this.$body.find('> tr[data-index] > td').off('click dblclick').on('click dblclick', function (e) {
            var $td = $(this),
                $tr = $td.parent(),
                item = that.data[$tr.data('index')],
                index = $td[0].cellIndex,
                field = that.header.fields[that.options.detailView && !that.options.cardView ? index - 1 : index],
                column = that.columns[getFieldIndex(that.columns, field)],
                value = getItemField(item, field, that.options.escape);

            if ($td.find('.detail-icon').length) {
                return;
            }

            that.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $td);
            that.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $tr);

            // if click to select - then trigger the checkbox/radio click
            if (e.type === 'click' && that.options.clickToSelect && column.clickToSelect) {
                var $selectItem = $tr.find(sprintf('[name="%s"]', that.options.selectItemName));
                if ($selectItem.length) {
                    $selectItem[0].click(); // #144: .trigger('click') bug
                }
            }
        });

        this.$body.find('> tr[data-index] > td > .detail-icon').off('click').on('click', function () {
            var $this = $(this),
                $tr = $this.parent().parent(),
                index = $tr.data('index'),
                row = data[index]; // Fix #980 Detail view, when searching, returns wrong row

            // remove and update
            if ($tr.next().is('tr.detail-view')) {
                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailOpen));
                $tr.next().remove();
                that.trigger('collapse-row', index, row);
            } else {
                $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailClose));
                $tr.after(sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.find('td').length));
                var $element = $tr.next().find('td');
                var content = calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '');
                if ($element.length === 1) {
                    $element.append(content);
                }
                that.trigger('expand-row', index, row, $element);
            }
            that.resetView();
        });

        this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
        this.$selectItem.off('click').on('click', function (event) {
            event.stopImmediatePropagation();

            var $this = $(this),
                checked = $this.prop('checked'),
                row = that.data[$this.data('index')];

            if (that.options.maintainSelected && $(this).is(':radio')) {
                $.each(that.options.data, function (i, row) {
                    row[that.header.stateField] = false;
                });
            }

            row[that.header.stateField] = checked;

            if (that.options.singleSelect) {
                that.$selectItem.not(this).each(function () {
                    that.data[$(this).data('index')][that.header.stateField] = false;
                });
                that.$selectItem.filter(':checked').not(this).prop('checked', false);
            }

            that.updateSelected();
            that.trigger(checked ? 'check' : 'uncheck', row, $this);
        });

        $.each(this.header.events, function (i, events) {
            if (!events) {
                return;
            }
            // fix bug, if events is defined with namespace
            if (typeof events === 'string') {
                events = calculateObjectValue(null, events);
            }

            var field = that.header.fields[i],
                fieldIndex = $.inArray(field, that.getVisibleFields());

            if (that.options.detailView && !that.options.cardView) {
                fieldIndex += 1;
            }

            for (var key in events) {
                that.$body.find('>tr:not(.no-records-found)').each(function () {
                    var $tr = $(this),
                        $td = $tr.find(that.options.cardView ? '.card-view' : 'td').eq(fieldIndex),
                        index = key.indexOf(' '),
                        name = key.substring(0, index),
                        el = key.substring(index + 1),
                        func = events[key];

                    $td.find(el).off(name).on(name, function (e) {
                        var index = $tr.data('index'),
                            row = that.data[index],
                            value = row[field];

                        func.apply(this, [e, value, row, index]);
                    });
                });
            }
        });

        this.updateSelected();
        this.resetView();

        this.trigger('post-body');
    };

    BootstrapTable.prototype.initServer = function (silent, query) {
        var that = this,
            data = {},
            params = {
                searchText: this.searchText,
                sortName: this.options.sortName,
                sortOrder: this.options.sortOrder
            },
            request;

        if (this.options.pagination) {
            params.pageSize = this.options.pageSize === this.options.formatAllRows() ?
                this.options.totalRows : this.options.pageSize;
            params.pageNumber = this.options.pageNumber;
        }

        if (!this.options.url && !this.options.ajax) {
            return;
        }

        if (this.options.queryParamsType === 'limit') {
            params = {
                search: params.searchText,
                sort: params.sortName,
                order: params.sortOrder
            };
            if (this.options.pagination) {
                params.limit = this.options.pageSize === this.options.formatAllRows() ?
                    this.options.totalRows : this.options.pageSize;
                params.offset = this.options.pageSize === this.options.formatAllRows() ?
                    0 : this.options.pageSize * (this.options.pageNumber - 1);
            }
        }

        if (!($.isEmptyObject(this.filterColumnsPartial))) {
            params['filter'] = JSON.stringify(this.filterColumnsPartial, null);
        }

        data = calculateObjectValue(this.options, this.options.queryParams, [params], data);

        $.extend(data, query || {});

        // false to stop request
        if (data === false) {
            return;
        }

        if (!silent) {
            this.$tableLoading.show();
        }
        request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: this.options.url,
            data: this.options.contentType === 'application/json' && this.options.method === 'post' ?
                JSON.stringify(data) : data,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function (res) {
                if (!res.Successful) {
                    $.IShowError({ title: "", msg: "", detail: res.ErrorMessage });
                    return;
                }
                var handle = function (response) {
                    response = calculateObjectValue(that.options, that.options.responseHandler, [response], response);
                    that.load(response);
                    that.trigger('load-success', response);
                    if (!silent) that.$tableLoading.hide();
                };
                //����ж�ջ�Ļ�
                //Debugging = 0,
                //Exceptional = 1,
                //Finished = 2
                if (res.ReturnData && res.ReturnData.Response != null && res.ReturnData.Response.DebugTrack != null && res.ReturnData.Response.DebugTrack.DebugState == 0) {
                    top.$.IPushDebugTrack(res.ReturnData.Response, that, handle);
                }
                else {
                    if (res.ReturnData && res.ReturnData.Response) {
                        handle(res.ReturnData.Response);
                    } else if (res.Result) {
                        handle(res);
                    } else {
                        handle(res.ReturnData);
                    }
                }
            },
            error: function (res) {
                that.trigger('load-error', res.status, res);
                if (!silent) that.$tableLoading.hide();
            }
        });

        if (this.options.ajax) {
            calculateObjectValue(this, this.options.ajax, [request], null);
        } else {
            $.ajax(request);
        }
    };

    BootstrapTable.prototype.initSearchText = function () {
        if (this.options.search) {
            if (this.options.searchText !== '') {
                var $search = this.$toolbar.find('.search input');
                $search.val(this.options.searchText);
                this.onSearch({ currentTarget: $search });
            }
        }
    };

    BootstrapTable.prototype.getCaret = function () {
        var that = this;

        $.each(this.$header.find('th'), function (i, th) {
            $(th).find('.sortable').removeClass('desc asc').addClass($(th).data('field') === that.options.sortName ? that.options.sortOrder : 'both');
        });
    };

    BootstrapTable.prototype.updateSelected = function () {
        var checkAll = this.$selectItem.filter(':enabled').length &&
            this.$selectItem.filter(':enabled').length ===
            this.$selectItem.filter(':enabled').filter(':checked').length;

        this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);

        this.$selectItem.each(function () {
            $(this).closest('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
        });
    };

    BootstrapTable.prototype.updateRows = function () {
        var that = this;

        this.$selectItem.each(function () {
            that.data[$(this).data('index')][that.header.stateField] = $(this).prop('checked');
        });
    };

    BootstrapTable.prototype.resetRows = function () {
        var that = this;

        $.each(this.data, function (i, row) {
            that.$selectAll.prop('checked', false);
            that.$selectItem.prop('checked', false);
            if (that.header.stateField) {
                row[that.header.stateField] = false;
            }
        });
    };

    BootstrapTable.prototype.trigger = function (name) {
        var args = Array.prototype.slice.call(arguments, 1);

        name += '.bs.table';
        this.options[BootstrapTable.EVENTS[name]].apply(this.options, args);
        this.$el.trigger($.Event(name), args);

        this.options.onAll(name, args);
        this.$el.trigger($.Event('all.bs.table'), [name, args]);
    };

    BootstrapTable.prototype.resetHeader = function () {
        // fix #61: the hidden table reset header bug.
        // fix bug: get $el.css('width') error sometime (height = 500)
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = setTimeout($.proxy(this.fitHeader, this), this.$el.is(':hidden') ? 100 : 0);
    };

    BootstrapTable.prototype.fitHeader = function () {
        var that = this,
            fixedBody,
            scrollWidth,
            focused,
            focusedTemp;

        if (that.$el.is(':hidden')) {
            that.timeoutId_ = setTimeout($.proxy(that.fitHeader, that), 100);
            return;
        }
        fixedBody = this.$tableBody.get(0);

        scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth &&
            fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ?
            getScrollBarWidth() : 0;

        this.$el.css('margin-top', -this.$header.outerHeight());

        focused = $(':focus');
        if (focused.length > 0) {
            var $th = focused.parents('th');
            if ($th.length > 0) {
                var dataField = $th.attr('data-field');
                if (dataField !== undefined) {
                    var $headerTh = this.$header.find("[data-field='" + dataField + "']");
                    if ($headerTh.length > 0) {
                        $headerTh.find(":input").addClass("focus-temp");
                    }
                }
            }
        }

        this.$header_ = this.$header.clone(true, true);

        //��������ӱ��ȫѡ��Ч��clone�������������⣩
        this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
        this.$selectAll_.off('click').on('click', function () {
            var checked = $(this).prop('checked');
            that[checked ? 'checkAll' : 'uncheckAll']();
            that.updateSelected();
        });

        this.$tableHeader.css({
            'margin-right': scrollWidth
        }).find('table').css('width', this.$el.outerWidth())
            .html('').attr('class', this.$el.attr('class'))
            .append(this.$header_);


        focusedTemp = $('.focus-temp:visible:eq(0)');
        if (focusedTemp.length > 0) {
            focusedTemp.focus();
            this.$header.find('.focus-temp').removeClass('focus-temp');
        }

        // fix bug: $.data() is not working as expected after $.append()
        this.$header.find('th[data-field]').each(function (i) {
            that.$header_.find(sprintf('th[data-field="%s"]', $(this).data('field'))).data($(this).data());
        });

        var visibleFields = this.getVisibleFields();

        this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
            var $this = $(this),
                index = i;

            if (that.options.detailView && !that.options.cardView) {
                if (i === 0) {
                    that.$header_.find('th.detail').find('.fht-cell').width($this.innerWidth());
                }
                index = i - 1;
            }

            that.$header_.find(sprintf('th[data-field="%s"]', visibleFields[index]))
                .find('.fht-cell').width($this.innerWidth());
        });
        // horizontal scroll event
        // TODO: it's probably better improving the layout than binding to scroll event
        this.$tableBody.off('scroll').on('scroll', function () {
            that.$tableHeader.scrollLeft($(this).scrollLeft());

            if (that.options.showFooter && !that.options.cardView) {
                that.$tableFooter.scrollLeft($(this).scrollLeft());
            }
        });
        that.trigger('post-header');
    };

    BootstrapTable.prototype.resetFooter = function () {
        var that = this,
            data = that.getData(),
            html = [];

        if (!this.options.showFooter || this.options.cardView) { //do nothing
            return;
        }

        if (!this.options.cardView && this.options.detailView) {
            html.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>');
        }

        $.each(this.columns, function (i, column) {
            var falign = '', // footer align style
                style = '',
                class_ = sprintf(' class="%s"', column['class']);

            if (!column.visible) {
                return;
            }

            if (that.options.cardView && (!column.cardVisible)) {
                return;
            }

            falign = sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
            style = sprintf('vertical-align: %s; ', column.valign);

            html.push('<td', class_, sprintf(' style="%s"', falign + style), '>');
            html.push('<div class="th-inner">');

            html.push(calculateObjectValue(column, column.footerFormatter, [data], '&nbsp;') || '&nbsp;');

            html.push('</div>');
            html.push('<div class="fht-cell"></div>');
            html.push('</div>');
            html.push('</td>');
        });

        this.$tableFooter.find('tr').html(html.join(''));
        clearTimeout(this.timeoutFooter_);
        this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this),
            this.$el.is(':hidden') ? 100 : 0);
    };

    BootstrapTable.prototype.fitFooter = function () {
        var that = this,
            $footerTd,
            elWidth,
            scrollWidth;

        clearTimeout(this.timeoutFooter_);
        if (this.$el.is(':hidden')) {
            this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100);
            return;
        }

        elWidth = this.$el.css('width');
        scrollWidth = elWidth > this.$tableBody.width() ? getScrollBarWidth() : 0;

        this.$tableFooter.css({
            'margin-right': scrollWidth
        }).find('table').css('width', elWidth)
            .attr('class', this.$el.attr('class'));

        $footerTd = this.$tableFooter.find('td');

        this.$body.find('>tr:first-child:not(.no-records-found) > *').each(function (i) {
            var $this = $(this);

            $footerTd.eq(i).find('.fht-cell').width($this.innerWidth());
        });
    };

    BootstrapTable.prototype.toggleColumn = function (index, checked, needUpdate) {
        if (index === -1) {
            return;
        }
        this.columns[index].visible = checked;
        this.initHeader();
        this.initSearch();
        this.initPagination();
        this.initBody();

        if (this.options.showColumns) {
            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);

            if (needUpdate) {
                $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
            }

            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
                $items.filter(':checked').prop('disabled', true);
            }
        }
    };

    BootstrapTable.prototype.toggleRow = function (index, uniqueId, visible) {
        if (index === -1) {
            return;
        }

        this.$body.find(typeof index !== 'undefined' ?
            sprintf('tr[data-index="%s"]', index) :
            sprintf('tr[data-uniqueid="%s"]', uniqueId))
        [visible ? 'show' : 'hide']();
    };

    BootstrapTable.prototype.getVisibleFields = function () {
        var that = this,
            visibleFields = [];

        $.each(this.header.fields, function (j, field) {
            var column = that.columns[getFieldIndex(that.columns, field)];

            if (!column || !column.visible) {
                return;
            }
            visibleFields.push(field);
        });
        return visibleFields;
    };

    // PUBLIC FUNCTION DEFINITION
    // =======================

    BootstrapTable.prototype.resetView = function (params) {
        var padding = 0;

        if (params && params.height) {
            this.options.height = params.height;
        }

        this.$selectAll.prop('checked', this.$selectItem.length > 0 &&
            this.$selectItem.length === this.$selectItem.filter(':checked').length);

        if (this.options.height) {
            var toolbarHeight = getRealHeight(this.$toolbar),
                paginationHeight = getRealHeight(this.$pagination),
                height = this.options.height - toolbarHeight - paginationHeight;

            this.$tableContainer.css('height', height + 'px');
        }

        if (this.options.cardView) {
            // remove the element css
            this.$el.css('margin-top', '0');
            this.$tableContainer.css('padding-bottom', '0');
            return;
        }

        if (this.options.showHeader && this.options.height) {
            this.$tableHeader.show();
            this.resetHeader();
            padding += this.$header.outerHeight();
        } else {
            this.$tableHeader.hide();
            this.trigger('post-header');
        }

        if (this.options.showFooter) {
            this.resetFooter();
            if (this.options.height) {
                padding += this.$tableFooter.outerHeight() + 1;
            }
        }

        // Assign the correct sortable arrow
        this.getCaret();
        this.$tableContainer.css('padding-bottom', padding + 'px');
        this.trigger('reset-view');
    };

    BootstrapTable.prototype.getData = function (useCurrentPage) {
        return (this.searchText || !$.isEmptyObject(this.filterColumns) || !$.isEmptyObject(this.filterColumnsPartial)) ?
            (useCurrentPage ? this.data.slice(this.pageFrom - 1, this.pageTo) : this.data) :
            (useCurrentPage ? this.options.data.slice(this.pageFrom - 1, this.pageTo) : this.options.data);
    };

    BootstrapTable.prototype.load = function (data) {
        var fixedScroll = false;

        // #431: support pagination
        if (this.options.sidePagination === 'server') {
            if (data) {
                this.options.totalRows = data.total;
                fixedScroll = data.fixedScroll;
                data = data[this.options.dataField];
            }
        } else if (!$.isArray(data)) { // support fixedScroll
            if (data) {
                fixedScroll = data.fixedScroll;
                data = data.data;
            }
        }

        this.initData(data);
        this.initSearch();
        this.initPagination();
        this.initBody(fixedScroll);
    };

    BootstrapTable.prototype.append = function (data) {
        this.initData(data, 'append');
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.prepend = function (data) {
        this.initData(data, 'prepend');
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.remove = function (params) {
        var len = this.options.data.length,
            i, row;

        if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
            return;
        }

        for (i = len - 1; i >= 0; i--) {
            row = this.options.data[i];

            if (!row.hasOwnProperty(params.field)) {
                continue;
            }
            if ($.inArray(row[params.field], params.values) !== -1) {
                this.options.data.splice(i, 1);
            }
        }

        if (len === this.options.data.length) {
            return;
        }

        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.removeAll = function () {
        if (this.options.data.length > 0) {
            this.options.data.splice(0, this.options.data.length);
            this.initSearch();
            this.initPagination();
            this.initBody(true);
        }
    };

    BootstrapTable.prototype.getRowByUniqueId = function (id) {
        var uniqueId = this.options.uniqueId,
            len = this.options.data.length,
            dataRow = null,
            i, row, rowUniqueId;

        for (i = len - 1; i >= 0; i--) {
            row = this.options.data[i];

            if (row.hasOwnProperty(uniqueId)) { // uniqueId is a column
                rowUniqueId = row[uniqueId];
            } else if (row._data.hasOwnProperty(uniqueId)) { // uniqueId is a row data property
                rowUniqueId = row._data[uniqueId];
            } else {
                continue;
            }

            if (typeof rowUniqueId === 'string') {
                id = id.toString();
            } else if (typeof rowUniqueId === 'number') {
                if ((Number(rowUniqueId) === rowUniqueId) && (rowUniqueId % 1 === 0)) {
                    id = parseInt(id);
                } else if ((rowUniqueId === Number(rowUniqueId)) && (rowUniqueId !== 0)) {
                    id = parseFloat(id);
                }
            }

            if (rowUniqueId === id) {
                dataRow = row;
                break;
            }
        }

        return dataRow;
    };

    BootstrapTable.prototype.removeByUniqueId = function (id) {
        var len = this.options.data.length,
            row = this.getRowByUniqueId(id);

        if (row) {
            this.options.data.splice(this.options.data.indexOf(row), 1);
        }

        if (len === this.options.data.length) {
            return;
        }

        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };

    BootstrapTable.prototype.updateByUniqueId = function (params) {
        var rowId;

        if (!params.hasOwnProperty('id') || !params.hasOwnProperty('row')) {
            return;
        }

        rowId = $.inArray(this.getRowByUniqueId(params.id), this.options.data);

        if (rowId === -1) {
            return;
        }

        $.extend(this.data[rowId], params.row);
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.insertRow = function (params) {
        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
            return;
        }
        this.data.splice(params.index, 0, params.row);
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.updateRow = function (params) {
        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
            return;
        }
        $.extend(this.data[params.index], params.row);
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.showRow = function (params) {
        if (!params.hasOwnProperty('index') && !params.hasOwnProperty('uniqueId')) {
            return;
        }
        this.toggleRow(params.index, params.uniqueId, true);
    };

    BootstrapTable.prototype.hideRow = function (params) {
        if (!params.hasOwnProperty('index') && !params.hasOwnProperty('uniqueId')) {
            return;
        }
        this.toggleRow(params.index, params.uniqueId, false);
    };

    BootstrapTable.prototype.getRowsHidden = function (show) {
        var rows = $(this.$body[0]).children().filter(':hidden'),
            i = 0;
        if (show) {
            for (; i < rows.length; i++) {
                $(rows[i]).show();
            }
        }
        return rows;
    };

    BootstrapTable.prototype.mergeCells = function (options) {
        var row = options.index,
            col = $.inArray(options.field, this.getVisibleFields()),
            rowspan = options.rowspan || 1,
            colspan = options.colspan || 1,
            i, j,
            $tr = this.$body.find('>tr'),
            $td;

        if (this.options.detailView && !this.options.cardView) {
            col += 1;
        }

        $td = $tr.eq(row).find('>td').eq(col);

        if (row < 0 || col < 0 || row >= this.data.length) {
            return;
        }

        for (i = row; i < row + rowspan; i++) {
            for (j = col; j < col + colspan; j++) {
                $tr.eq(i).find('>td').eq(j).hide();
            }
        }

        $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
    };

    BootstrapTable.prototype.updateCell = function (params) {
        if (!params.hasOwnProperty('index') ||
            !params.hasOwnProperty('field') ||
            !params.hasOwnProperty('value')) {
            return;
        }
        this.data[params.index][params.field] = params.value;

        if (params.reinit === false) {
            return;
        }
        this.initSort();
        this.initBody(true);
    };

    BootstrapTable.prototype.getOptions = function () {
        return this.options;
    };

    BootstrapTable.prototype.getSelections = function () {
        var that = this;

        return $.grep(this.data, function (row) {
            return row[that.header.stateField];
        });
    };

    BootstrapTable.prototype.getAllSelections = function () {
        var that = this;

        return $.grep(this.options.data, function (row) {
            return row[that.header.stateField];
        });
    };

    BootstrapTable.prototype.checkAll = function () {
        this.checkAll_(true);
    };

    BootstrapTable.prototype.uncheckAll = function () {
        this.checkAll_(false);
    };

    BootstrapTable.prototype.checkInvert = function () {
        var that = this;
        var rows = that.$selectItem.filter(':enabled');
        var checked = rows.filter(':checked');
        rows.each(function () {
            $(this).prop('checked', !$(this).prop('checked'));
        });
        that.updateRows();
        that.updateSelected();
        that.trigger('uncheck-some', checked);
        checked = that.getSelections();
        that.trigger('check-some', checked);
    };

    BootstrapTable.prototype.checkAll_ = function (checked) {
        var rows;
        if (!checked) {
            rows = this.getSelections();
        }
        this.$selectAll.add(this.$selectAll_).prop('checked', checked);
        this.$selectItem.filter(':enabled').prop('checked', checked);
        this.updateRows();
        if (checked) {
            rows = this.getSelections();
        }
        this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
    };

    BootstrapTable.prototype.check = function (index) {
        this.check_(true, index);
    };

    BootstrapTable.prototype.uncheck = function (index) {
        this.check_(false, index);
    };

    BootstrapTable.prototype.check_ = function (checked, index) {
        var $el = this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
        this.data[index][this.header.stateField] = checked;
        this.updateSelected();
        this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el);
    };

    BootstrapTable.prototype.checkBy = function (obj) {
        this.checkBy_(true, obj);
    };

    BootstrapTable.prototype.uncheckBy = function (obj) {
        this.checkBy_(false, obj);
    };

    BootstrapTable.prototype.checkBy_ = function (checked, obj) {
        if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
            return;
        }

        var that = this,
            rows = [];
        $.each(this.options.data, function (index, row) {
            if (!row.hasOwnProperty(obj.field)) {
                return false;
            }
            if ($.inArray(row[obj.field], obj.values) !== -1) {
                var $el = that.$selectItem.filter(':enabled')
                    .filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
                row[that.header.stateField] = checked;
                rows.push(row);
                that.trigger(checked ? 'check' : 'uncheck', row, $el);
            }
        });
        this.updateSelected();
        this.trigger(checked ? 'check-some' : 'uncheck-some', rows);
    };

    BootstrapTable.prototype.destroy = function () {
        this.$el.insertBefore(this.$container);
        $(this.options.toolbar).insertBefore(this.$el);
        this.$container.next().remove();
        this.$container.remove();
        this.$el.html(this.$el_.html())
            .css('margin-top', '0')
            .attr('class', this.$el_.attr('class') || ''); // reset the class
    };

    BootstrapTable.prototype.showLoading = function () {
        this.$tableLoading.show();
    };

    BootstrapTable.prototype.hideLoading = function () {
        this.$tableLoading.hide();
    };

    BootstrapTable.prototype.togglePagination = function () {
        this.options.pagination = !this.options.pagination;
        var button = this.$toolbar.find('button[name="paginationSwitch"] i');
        if (this.options.pagination) {
            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown);
        } else {
            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp);
        }
        this.updatePagination();
    };

    BootstrapTable.prototype.refresh = function (params) {
        if (params && params.url) {
            this.options.url = params.url;
            this.options.pageNumber = 1;
        }
        this.initServer(params && params.silent, params && params.query);
    };

    BootstrapTable.prototype.resetWidth = function () {
        if (this.options.showHeader && this.options.height) {
            this.fitHeader();
        }
        if (this.options.showFooter) {
            this.fitFooter();
        }
    };

    BootstrapTable.prototype.showColumn = function (field) {
        this.toggleColumn(getFieldIndex(this.columns, field), true, true);
    };

    BootstrapTable.prototype.hideColumn = function (field) {
        this.toggleColumn(getFieldIndex(this.columns, field), false, true);
    };

    BootstrapTable.prototype.getHiddenColumns = function () {
        return $.grep(this.columns, function (column) {
            return !column.visible;
        });
    };

    BootstrapTable.prototype.filterBy = function (columns) {
        this.filterColumns = $.isEmptyObject(columns) ? {} : columns;
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
    };

    BootstrapTable.prototype.scrollTo = function (value) {
        if (typeof value === 'string') {
            value = value === 'bottom' ? this.$tableBody[0].scrollHeight : 0;
        }
        if (typeof value === 'number') {
            this.$tableBody.scrollTop(value);
        }
        if (typeof value === 'undefined') {
            return this.$tableBody.scrollTop();
        }
    };

    BootstrapTable.prototype.getScrollPosition = function () {
        return this.scrollTo();
    };

    BootstrapTable.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.options.totalPages) {
            this.options.pageNumber = page;
            this.updatePagination();
        }
    };

    BootstrapTable.prototype.prevPage = function () {
        if (this.options.pageNumber > 1) {
            this.options.pageNumber--;
            this.updatePagination();
        }
    };

    BootstrapTable.prototype.nextPage = function () {
        if (this.options.pageNumber < this.options.totalPages) {
            this.options.pageNumber++;
            this.updatePagination();
        }
    };

    BootstrapTable.prototype.toggleView = function () {
        this.options.cardView = !this.options.cardView;
        this.initHeader();
        // Fixed remove toolbar when click cardView button.
        //that.initToolbar();
        this.initBody();
        this.trigger('toggle', this.options.cardView);
    };

    BootstrapTable.prototype.refreshOptions = function (options) {
        //If the objects are equivalent then avoid the call of destroy / init methods
        if (compareObjects(this.options, options, true)) {
            return;
        }
        this.options = $.extend(this.options, options);
        this.trigger('refresh-options', this.options);
        this.destroy();
        this.init();
    };

    BootstrapTable.prototype.resetSearch = function (text) {
        var $search = this.$toolbar.find('.search input');
        $search.val(text || '');
        this.onSearch({ currentTarget: $search });
    };

    BootstrapTable.prototype.expandRow_ = function (expand, index) {
        var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', index));
        if ($tr.next().is('tr.detail-view') === (expand ? false : true)) {
            $tr.find('> td > .detail-icon').click();
        }
    };

    BootstrapTable.prototype.expandRow = function (index) {
        this.expandRow_(true, index);
    };

    BootstrapTable.prototype.collapseRow = function (index) {
        this.expandRow_(false, index);
    };

    BootstrapTable.prototype.expandAllRows = function (isSubTable) {
        if (isSubTable) {
            var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', 0)),
                that = this,
                detailIcon = null,
                executeInterval = false,
                idInterval = -1;

            if (!$tr.next().is('tr.detail-view')) {
                $tr.find('> td > .detail-icon').click();
                executeInterval = true;
            } else if (!$tr.next().next().is('tr.detail-view')) {
                $tr.next().find(".detail-icon").click();
                executeInterval = true;
            }

            if (executeInterval) {
                try {
                    idInterval = setInterval(function () {
                        detailIcon = that.$body.find("tr.detail-view").last().find(".detail-icon");
                        if (detailIcon.length > 0) {
                            detailIcon.click();
                        } else {
                            clearInterval(idInterval);
                        }
                    }, 1);
                } catch (ex) {
                    clearInterval(idInterval);
                }
            }
        } else {
            var trs = this.$body.children();
            for (var i = 0; i < trs.length; i++) {
                this.expandRow_(true, $(trs[i]).data("index"));
            }
        }
    };

    BootstrapTable.prototype.collapseAllRows = function (isSubTable) {
        if (isSubTable) {
            this.expandRow_(false, 0);
        } else {
            var trs = this.$body.children();
            for (var i = 0; i < trs.length; i++) {
                this.expandRow_(false, $(trs[i]).data("index"));
            }
        }
    };

    BootstrapTable.prototype.updateFormatText = function (name, text) {
        if (this.options[sprintf('format%s', name)]) {
            if (typeof text === 'string') {
                this.options[sprintf('format%s', name)] = function () {
                    return text;
                };
            } else if (typeof text === 'function') {
                this.options[sprintf('format%s', name)] = text;
            }
        }
        this.initToolbar();
        this.initPagination();
        this.initBody();
    };

    // BOOTSTRAP TABLE PLUGIN DEFINITION
    // =======================

    var allowedMethods = [
        'getOptions',
        'getSelections', 'getAllSelections', 'getData',
        'load', 'append', 'prepend', 'remove', 'removeAll',
        'insertRow', 'updateRow', 'updateCell', 'updateByUniqueId', 'removeByUniqueId',
        'getRowByUniqueId', 'showRow', 'hideRow', 'getRowsHidden',
        'mergeCells',
        'checkAll', 'uncheckAll', 'checkInvert',
        'check', 'uncheck',
        'checkBy', 'uncheckBy',
        'refresh',
        'resetView',
        'resetWidth',
        'destroy',
        'showLoading', 'hideLoading',
        'showColumn', 'hideColumn', 'getHiddenColumns',
        'filterBy',
        'scrollTo',
        'getScrollPosition',
        'selectPage', 'prevPage', 'nextPage',
        'togglePagination',
        'toggleView',
        'refreshOptions',
        'resetSearch',
        'expandRow', 'collapseRow', 'expandAllRows', 'collapseAllRows',
        'updateFormatText'
    ];

    $.fn.bootstrapTable = function (option) {
        var value,
            args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
            var $this = $(this),
                data = $this.data('bootstrap.table'),
                options = $.extend({}, BootstrapTable.DEFAULTS, $this.data(),
                    typeof option === 'object' && option);

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw new Error("Unknown method: " + option);
                }

                if (!data) {
                    return;
                }

                value = data[option].apply(data, args);

                if (option === 'destroy') {
                    $this.removeData('bootstrap.table');
                }
            }

            if (!data) {
                $this.data('bootstrap.table', (data = new BootstrapTable(this, options)));
            }
        });

        return typeof value === 'undefined' ? this : value;
    };

    $.fn.bootstrapTable.Constructor = BootstrapTable;
    $.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
    $.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
    $.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
    $.fn.bootstrapTable.methods = allowedMethods;
    $.fn.bootstrapTable.utils = {
        sprintf: sprintf,
        getFieldIndex: getFieldIndex,
        compareObjects: compareObjects,
        calculateObjectValue: calculateObjectValue
    };

    // BOOTSTRAP TABLE INIT
    // =======================

    $(function () {
        $('[data-toggle="table"]').bootstrapTable();
    });
}(jQuery);
;
/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            return '正在努力地加载数据中，请稍候……';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页显示 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            //return '没有找到匹配的记录';
            return "";
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        },
        formatExport: function () {
            return '导出数据';
        },
        formatClearFilters: function () {
            return '清空过滤';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);
;
/* jquery.nicescroll 3.6.8 InuYaksa*2015 MIT http://nicescroll.areaaperta.com */(function(f){"function"===typeof define&&define.amd?define(["jquery"],f):"object"===typeof exports?module.exports=f(require("jquery")):f(jQuery)})(function(f){var B=!1,F=!1,O=0,P=2E3,A=0,J=["webkit","ms","moz","o"],v=window.requestAnimationFrame||!1,w=window.cancelAnimationFrame||!1;if(!v)for(var Q in J){var G=J[Q];if(v=window[G+"RequestAnimationFrame"]){w=window[G+"CancelAnimationFrame"]||window[G+"CancelRequestAnimationFrame"];break}}var x=window.MutationObserver||window.WebKitMutationObserver||
!1,K={zindex:"auto",cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"6px",cursorborder:"1px solid #fff",cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:!1,hwacceleration:!0,usetransition:!0,boxzoom:!1,dblclickzoom:!0,gesturezoom:!0,grabcursorenabled:!0,autohidemode:!0,background:"",iframeautoresize:!0,cursorminheight:32,preservenativescrolling:!0,railoffset:!1,railhoffset:!1,bouncescroll:!0,spacebarenabled:!0,railpadding:{top:0,right:0,left:0,bottom:0},
disableoutline:!0,horizrailenabled:!0,railalign:"right",railvalign:"bottom",enabletranslate3d:!0,enablemousewheel:!0,enablekeyboard:!0,smoothscroll:!0,sensitiverail:!0,enablemouselockapi:!0,cursorfixedheight:!1,directionlockdeadzone:6,hidecursordelay:400,nativeparentscrolling:!0,enablescrollonselection:!0,overflowx:!0,overflowy:!0,cursordragspeed:.3,rtlmode:"auto",cursordragontouch:!1,oneaxismousemode:"auto",scriptpath:function(){var f=document.getElementsByTagName("script"),f=f.length?f[f.length-
1].src.split("?")[0]:"";return 0<f.split("/").length?f.split("/").slice(0,-1).join("/")+"/":""}(),preventmultitouchscrolling:!0,disablemutationobserver:!1},H=!1,R=function(){if(H)return H;var f=document.createElement("DIV"),c=f.style,k=navigator.userAgent,l=navigator.platform,d={haspointerlock:"pointerLockElement"in document||"webkitPointerLockElement"in document||"mozPointerLockElement"in document};d.isopera="opera"in window;d.isopera12=d.isopera&&"getUserMedia"in navigator;d.isoperamini="[object OperaMini]"===
Object.prototype.toString.call(window.operamini);d.isie="all"in document&&"attachEvent"in f&&!d.isopera;d.isieold=d.isie&&!("msInterpolationMode"in c);d.isie7=d.isie&&!d.isieold&&(!("documentMode"in document)||7==document.documentMode);d.isie8=d.isie&&"documentMode"in document&&8==document.documentMode;d.isie9=d.isie&&"performance"in window&&9==document.documentMode;d.isie10=d.isie&&"performance"in window&&10==document.documentMode;d.isie11="msRequestFullscreen"in f&&11<=document.documentMode;d.isieedge12=
navigator.userAgent.match(/Edge\/12\./); d.isieedge = "msOverflowStyle" in f; d.ismodernie = d.isie11 || d.isieedge; d.isie9mobile = /iemobile.9/i.test(k); d.isie9mobile && (d.isie9 = !1); d.isie7mobile = !d.isie9mobile && d.isie7 && /iemobile/i.test(k); d.ismozilla = "MozAppearance" in c; d.iswebkit = "WebkitAppearance" in c; d.ischrome = "chrome" in window; d.ischrome38 = d.ischrome && "touchAction" in c; d.ischrome22 = !d.ischrome38 && d.ischrome && d.haspointerlock; d.ischrome26 = !d.ischrome38 && d.ischrome && "transition" in c; d.cantouch = false;d.hasw3ctouch=(window.PointerEvent||!1)&&(0<navigator.MaxTouchPoints||0<navigator.msMaxTouchPoints);d.hasmstouch=!d.hasw3ctouch&&(window.MSPointerEvent||!1);d.ismac=/^mac$/i.test(l);d.isios=d.cantouch&&/iphone|ipad|ipod/i.test(l);d.isios4=d.isios&&!("seal"in Object);d.isios7=d.isios&&"webkitHidden"in document;d.isios8=d.isios&&"hidden"in document;d.isandroid=/android/i.test(k);d.haseventlistener="addEventListener"in f;d.trstyle=!1;d.hastransform=!1;
d.hastranslate3d=!1;d.transitionstyle=!1;d.hastransition=!1;d.transitionend=!1;l=["transform","msTransform","webkitTransform","MozTransform","OTransform"];for(k=0;k<l.length;k++)if(void 0!==c[l[k]]){d.trstyle=l[k];break}d.hastransform=!!d.trstyle;d.hastransform&&(c[d.trstyle]="translate3d(1px,2px,3px)",d.hastranslate3d=/translate3d/.test(c[d.trstyle]));d.transitionstyle=!1;d.prefixstyle="";d.transitionend=!1;for(var l="transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "),
q=" -webkit- -ms- -moz- -o- -o -khtml-".split(" "),t="transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "),k=0;k<l.length;k++)if(l[k]in c){d.transitionstyle=l[k];d.prefixstyle=q[k];d.transitionend=t[k];break}d.ischrome26&&(d.prefixstyle=q[1]);d.hastransition=d.transitionstyle;a:{k=["grab","-webkit-grab","-moz-grab"];if(d.ischrome&&!d.ischrome38||d.isie)k=[];for(l=0;l<k.length;l++)if(q=k[l],c.cursor=q,c.cursor==q){c=q;break a}c=
"url(//patriciaportfolio.googlecode.com/files/openhand.cur),n-resize"}d.cursorgrabvalue=c;d.hasmousecapture="setCapture"in f;d.hasMutationObserver=!1!==x;return H=d},S=function(h,c){function k(){var b=a.doc.css(e.trstyle);return b&&"matrix"==b.substr(0,6)?b.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):!1}function l(){var b=a.win;if("zIndex"in b)return b.zIndex();for(;0<b.length&&9!=b[0].nodeType;){var g=b.css("zIndex");if(!isNaN(g)&&0!=g)return parseInt(g);b=b.parent()}return!1}function d(b,
g,u){g=b.css(g);b=parseFloat(g);return isNaN(b)?(b=z[g]||0,u=3==b?u?a.win.outerHeight()-a.win.innerHeight():a.win.outerWidth()-a.win.innerWidth():1,a.isie8&&b&&(b+=1),u?b:0):b}function q(b,g,u,c){a._bind(b,g,function(a){a=a?a:window.event;var c={original:a,target:a.target||a.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==a.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){a.preventDefault?a.preventDefault():a.returnValue=!1;return!1},stopImmediatePropagation:function(){a.stopImmediatePropagation?
a.stopImmediatePropagation():a.cancelBubble=!0}};"mousewheel"==g?(a.wheelDeltaX&&(c.deltaX=-.025*a.wheelDeltaX),a.wheelDeltaY&&(c.deltaY=-.025*a.wheelDeltaY),c.deltaY||c.deltaX||(c.deltaY=-.025*a.wheelDelta)):c.deltaY=a.detail;return u.call(b,c)},c)}function t(b,g,c){var d,e;0==b.deltaMode?(d=-Math.floor(a.opt.mousescrollstep/54*b.deltaX),e=-Math.floor(a.opt.mousescrollstep/54*b.deltaY)):1==b.deltaMode&&(d=-Math.floor(b.deltaX*a.opt.mousescrollstep),e=-Math.floor(b.deltaY*a.opt.mousescrollstep));
g&&a.opt.oneaxismousemode&&0==d&&e&&(d=e,e=0,c&&(0>d?a.getScrollLeft()>=a.page.maxw:0>=a.getScrollLeft())&&(e=d,d=0));a.isrtlmode&&(d=-d);d&&(a.scrollmom&&a.scrollmom.stop(),a.lastdeltax+=d,a.debounced("mousewheelx",function(){var b=a.lastdeltax;a.lastdeltax=0;a.rail.drag||a.doScrollLeftBy(b)},15));if(e){if(a.opt.nativeparentscrolling&&c&&!a.ispage&&!a.zoomactive)if(0>e){if(a.getScrollTop()>=a.page.maxh)return!0}else if(0>=a.getScrollTop())return!0;a.scrollmom&&a.scrollmom.stop();a.lastdeltay+=e;
a.synched("mousewheely",function(){var b=a.lastdeltay;a.lastdeltay=0;a.rail.drag||a.doScrollBy(b)},15)}b.stopImmediatePropagation();return b.preventDefault()}var a=this;this.version="3.6.8";this.name="nicescroll";this.me=c;this.opt={doc:f("body"),win:!1};f.extend(this.opt,K);this.opt.snapbackspeed=80;if(h)for(var r in a.opt)void 0!==h[r]&&(a.opt[r]=h[r]);a.opt.disablemutationobserver&&(x=!1);this.iddoc=(this.doc=a.opt.doc)&&this.doc[0]?this.doc[0].id||"":"";this.ispage=/^BODY|HTML/.test(a.opt.win?
a.opt.win[0].nodeName:this.doc[0].nodeName);this.haswrapper=!1!==a.opt.win;this.win=a.opt.win||(this.ispage?f(window):this.doc);this.docscroll=this.ispage&&!this.haswrapper?f(window):this.win;this.body=f("body");this.iframe=this.isfixed=this.viewport=!1;this.isiframe="IFRAME"==this.doc[0].nodeName&&"IFRAME"==this.win[0].nodeName;this.istextarea="TEXTAREA"==this.win[0].nodeName;this.forcescreen=!1;this.canshowonmouseevent="scroll"!=a.opt.autohidemode;this.page=this.view=this.onzoomout=this.onzoomin=
this.onscrollcancel=this.onscrollend=this.onscrollstart=this.onclick=this.ongesturezoom=this.onkeypress=this.onmousewheel=this.onmousemove=this.onmouseup=this.onmousedown=!1;this.scroll={x:0,y:0};this.scrollratio={x:0,y:0};this.cursorheight=20;this.scrollvaluemax=0;if("auto"==this.opt.rtlmode){r=this.win[0]==window?this.body:this.win;var p=r.css("writing-mode")||r.css("-webkit-writing-mode")||r.css("-ms-writing-mode")||r.css("-moz-writing-mode");"horizontal-tb"==p||"lr-tb"==p||""==p?(this.isrtlmode=
"rtl"==r.css("direction"),this.isvertical=!1):(this.isrtlmode="vertical-rl"==p||"tb"==p||"tb-rl"==p||"rl-tb"==p,this.isvertical="vertical-rl"==p||"tb"==p||"tb-rl"==p)}else this.isrtlmode=!0===this.opt.rtlmode,this.isvertical=!1;this.observerbody=this.observerremover=this.observer=this.scrollmom=this.scrollrunning=!1;do this.id="ascrail"+P++;while(document.getElementById(this.id));this.hasmousefocus=this.hasfocus=this.zoomactive=this.zoom=this.selectiondrag=this.cursorfreezed=this.cursor=this.rail=
!1;this.visibility=!0;this.hidden=this.locked=this.railslocked=!1;this.cursoractive=!0;this.wheelprevented=!1;this.overflowx=a.opt.overflowx;this.overflowy=a.opt.overflowy;this.nativescrollingarea=!1;this.checkarea=0;this.events=[];this.saved={};this.delaylist={};this.synclist={};this.lastdeltay=this.lastdeltax=0;this.detected=R();var e=f.extend({},this.detected);this.ishwscroll=(this.canhwscroll=e.hastransform&&a.opt.hwacceleration)&&a.haswrapper;this.hasreversehr=this.isrtlmode?this.isvertical?
!(e.iswebkit||e.isie||e.isie11):!(e.iswebkit||e.isie&&!e.isie10&&!e.isie11):!1;this.istouchcapable=!1;e.cantouch||!e.hasw3ctouch&&!e.hasmstouch?!e.cantouch||e.isios||e.isandroid||!e.iswebkit&&!e.ismozilla||(this.istouchcapable=!0):this.istouchcapable=!0;a.opt.enablemouselockapi||(e.hasmousecapture=!1,e.haspointerlock=!1);this.debounced=function(b,g,c){a&&(a.delaylist[b]||(g.call(a),a.delaylist[b]={h:v(function(){a.delaylist[b].fn.call(a);a.delaylist[b]=!1},c)}),a.delaylist[b].fn=g)};var I=!1;this.synched=
function(b,g){a.synclist[b]=g;(function(){I||(v(function(){if(a){I=!1;for(var b in a.synclist){var g=a.synclist[b];g&&g.call(a);a.synclist[b]=!1}}}),I=!0)})();return b};this.unsynched=function(b){a.synclist[b]&&(a.synclist[b]=!1)};this.css=function(b,g){for(var c in g)a.saved.css.push([b,c,b.css(c)]),b.css(c,g[c])};this.scrollTop=function(b){return void 0===b?a.getScrollTop():a.setScrollTop(b)};this.scrollLeft=function(b){return void 0===b?a.getScrollLeft():a.setScrollLeft(b)};var D=function(a,g,
c,d,e,f,k){this.st=a;this.ed=g;this.spd=c;this.p1=d||0;this.p2=e||1;this.p3=f||0;this.p4=k||1;this.ts=(new Date).getTime();this.df=this.ed-this.st};D.prototype={B2:function(a){return 3*a*a*(1-a)},B3:function(a){return 3*a*(1-a)*(1-a)},B4:function(a){return(1-a)*(1-a)*(1-a)},getNow:function(){var a=1-((new Date).getTime()-this.ts)/this.spd,g=this.B2(a)+this.B3(a)+this.B4(a);return 0>a?this.ed:this.st+Math.round(this.df*g)},update:function(a,g){this.st=this.getNow();this.ed=a;this.spd=g;this.ts=(new Date).getTime();
this.df=this.ed-this.st;return this}};if(this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"};e.hastranslate3d&&e.isios&&this.doc.css("-webkit-backface-visibility","hidden");this.getScrollTop=function(b){if(!b){if(b=k())return 16==b.length?-b[13]:-b[5];if(a.timerscroll&&a.timerscroll.bz)return a.timerscroll.bz.getNow()}return a.doc.translate.y};this.getScrollLeft=function(b){if(!b){if(b=k())return 16==b.length?-b[12]:-b[4];if(a.timerscroll&&a.timerscroll.bh)return a.timerscroll.bh.getNow()}return a.doc.translate.x};
this.notifyScrollEvent=function(a){var g=document.createEvent("UIEvents");g.initUIEvent("scroll",!1,!0,window,1);g.niceevent=!0;a.dispatchEvent(g)};var y=this.isrtlmode?1:-1;e.hastranslate3d&&a.opt.enabletranslate3d?(this.setScrollTop=function(b,g){a.doc.translate.y=b;a.doc.translate.ty=-1*b+"px";a.doc.css(e.trstyle,"translate3d("+a.doc.translate.tx+","+a.doc.translate.ty+",0px)");g||a.notifyScrollEvent(a.win[0])},this.setScrollLeft=function(b,g){a.doc.translate.x=b;a.doc.translate.tx=b*y+"px";a.doc.css(e.trstyle,
"translate3d("+a.doc.translate.tx+","+a.doc.translate.ty+",0px)");g||a.notifyScrollEvent(a.win[0])}):(this.setScrollTop=function(b,g){a.doc.translate.y=b;a.doc.translate.ty=-1*b+"px";a.doc.css(e.trstyle,"translate("+a.doc.translate.tx+","+a.doc.translate.ty+")");g||a.notifyScrollEvent(a.win[0])},this.setScrollLeft=function(b,g){a.doc.translate.x=b;a.doc.translate.tx=b*y+"px";a.doc.css(e.trstyle,"translate("+a.doc.translate.tx+","+a.doc.translate.ty+")");g||a.notifyScrollEvent(a.win[0])})}else this.getScrollTop=
function(){return a.docscroll.scrollTop()},this.setScrollTop=function(b){return setTimeout(function(){a&&a.docscroll.scrollTop(b)},1)},this.getScrollLeft=function(){return a.hasreversehr?a.detected.ismozilla?a.page.maxw-Math.abs(a.docscroll.scrollLeft()):a.page.maxw-a.docscroll.scrollLeft():a.docscroll.scrollLeft()},this.setScrollLeft=function(b){return setTimeout(function(){if(a)return a.hasreversehr&&(b=a.detected.ismozilla?-(a.page.maxw-b):a.page.maxw-b),a.docscroll.scrollLeft(b)},1)};this.getTarget=
function(a){return a?a.target?a.target:a.srcElement?a.srcElement:!1:!1};this.hasParent=function(a,g){if(!a)return!1;for(var c=a.target||a.srcElement||a||!1;c&&c.id!=g;)c=c.parentNode||!1;return!1!==c};var z={thin:1,medium:3,thick:5};this.getDocumentScrollOffset=function(){return{top:window.pageYOffset||document.documentElement.scrollTop,left:window.pageXOffset||document.documentElement.scrollLeft}};this.getOffset=function(){if(a.isfixed){var b=a.win.offset(),g=a.getDocumentScrollOffset();b.top-=g.top;
b.left-=g.left;return b}b=a.win.offset();if(!a.viewport)return b;g=a.viewport.offset();return{top:b.top-g.top,left:b.left-g.left}};this.updateScrollBar=function(b){var g,c,e;if(a.ishwscroll)a.rail.css({height:a.win.innerHeight()-(a.opt.railpadding.top+a.opt.railpadding.bottom)}),a.railh&&a.railh.css({width:a.win.innerWidth()-(a.opt.railpadding.left+a.opt.railpadding.right)});else{var f=a.getOffset();g=f.top;c=f.left-(a.opt.railpadding.left+a.opt.railpadding.right);g+=d(a.win,"border-top-width",!0);
c+=a.rail.align?a.win.outerWidth()-d(a.win,"border-right-width")-a.rail.width:d(a.win,"border-left-width");if(e=a.opt.railoffset)e.top&&(g+=e.top),e.left&&(c+=e.left);a.railslocked||a.rail.css({top:g,left:c,height:(b?b.h:a.win.innerHeight())-(a.opt.railpadding.top+a.opt.railpadding.bottom)});a.zoom&&a.zoom.css({top:g+1,left:1==a.rail.align?c-20:c+a.rail.width+4});if(a.railh&&!a.railslocked){g=f.top;c=f.left;if(e=a.opt.railhoffset)e.top&&(g+=e.top),e.left&&(c+=e.left);b=a.railh.align?g+d(a.win,"border-top-width",
!0)+a.win.innerHeight()-a.railh.height:g+d(a.win,"border-top-width",!0);c+=d(a.win,"border-left-width");a.railh.css({top:b-(a.opt.railpadding.top+a.opt.railpadding.bottom),left:c,width:a.railh.width})}}};this.doRailClick=function(b,g,c){var d;a.railslocked||(a.cancelEvent(b),g?(g=c?a.doScrollLeft:a.doScrollTop,d=c?(b.pageX-a.railh.offset().left-a.cursorwidth/2)*a.scrollratio.x:(b.pageY-a.rail.offset().top-a.cursorheight/2)*a.scrollratio.y,g(d)):(g=c?a.doScrollLeftBy:a.doScrollBy,d=c?a.scroll.x:a.scroll.y,
b=c?b.pageX-a.railh.offset().left:b.pageY-a.rail.offset().top,c=c?a.view.w:a.view.h,g(d>=b?c:-c)))};a.hasanimationframe=v;a.hascancelanimationframe=w;a.hasanimationframe?a.hascancelanimationframe||(w=function(){a.cancelAnimationFrame=!0}):(v=function(a){return setTimeout(a,15-Math.floor(+new Date/1E3)%16)},w=clearTimeout);this.init=function(){a.saved.css=[];if(e.isie7mobile||e.isoperamini)return!0;e.hasmstouch&&a.css(a.ispage?f("html"):a.win,{_touchaction:"none"});var b=e.ismodernie||e.isie10?{"-ms-overflow-style":"none"}:
{"overflow-y":"hidden"};a.zindex="auto";a.zindex=a.ispage||"auto"!=a.opt.zindex?a.opt.zindex:l()||"auto";!a.ispage&&"auto"!=a.zindex&&a.zindex>A&&(A=a.zindex);a.isie&&0==a.zindex&&"auto"==a.opt.zindex&&(a.zindex="auto");if(!a.ispage||!e.cantouch&&!e.isieold&&!e.isie9mobile){var c=a.docscroll;a.ispage&&(c=a.haswrapper?a.win:a.doc);e.isie9mobile||a.css(c,b);a.ispage&&e.isie7&&("BODY"==a.doc[0].nodeName?a.css(f("html"),{"overflow-y":"hidden"}):"HTML"==a.doc[0].nodeName&&a.css(f("body"),b));!e.isios||
a.ispage||a.haswrapper||a.css(f("body"),{"-webkit-overflow-scrolling":"touch"});var d=f(document.createElement("div"));d.css({position:"relative",top:0,"float":"right",width:a.opt.cursorwidth,height:0,"background-color":a.opt.cursorcolor,border:a.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":a.opt.cursorborderradius,"-moz-border-radius":a.opt.cursorborderradius,"border-radius":a.opt.cursorborderradius});d.hborder=parseFloat(d.outerHeight()-d.innerHeight());d.addClass("nicescroll-cursors");
a.cursor=d;var m=f(document.createElement("div"));m.attr("id",a.id);m.addClass("nicescroll-rails nicescroll-rails-vr");var k,h,p=["left","right","top","bottom"],L;for(L in p)h=p[L],(k=a.opt.railpadding[h])?m.css("padding-"+h,k+"px"):a.opt.railpadding[h]=0;m.append(d);m.width=Math.max(parseFloat(a.opt.cursorwidth),d.outerWidth());m.css({width:m.width+"px",zIndex:a.zindex,background:a.opt.background,cursor:"default"});m.visibility=!0;m.scrollable=!0;m.align="left"==a.opt.railalign?0:1;a.rail=m;d=a.rail.drag=
!1;!a.opt.boxzoom||a.ispage||e.isieold||(d=document.createElement("div"),a.bind(d,"click",a.doZoom),a.bind(d,"mouseenter",function(){a.zoom.css("opacity",a.opt.cursoropacitymax)}),a.bind(d,"mouseleave",function(){a.zoom.css("opacity",a.opt.cursoropacitymin)}),a.zoom=f(d),a.zoom.css({cursor:"pointer",zIndex:a.zindex,backgroundImage:"url("+a.opt.scriptpath+"zoomico.png)",height:18,width:18,backgroundPosition:"0px 0px"}),a.opt.dblclickzoom&&a.bind(a.win,"dblclick",a.doZoom),e.cantouch&&a.opt.gesturezoom&&
(a.ongesturezoom=function(b){1.5<b.scale&&a.doZoomIn(b);.8>b.scale&&a.doZoomOut(b);return a.cancelEvent(b)},a.bind(a.win,"gestureend",a.ongesturezoom)));a.railh=!1;var n;a.opt.horizrailenabled&&(a.css(c,{overflowX:"hidden"}),d=f(document.createElement("div")),d.css({position:"absolute",top:0,height:a.opt.cursorwidth,width:0,backgroundColor:a.opt.cursorcolor,border:a.opt.cursorborder,backgroundClip:"padding-box","-webkit-border-radius":a.opt.cursorborderradius,"-moz-border-radius":a.opt.cursorborderradius,
"border-radius":a.opt.cursorborderradius}),e.isieold&&d.css("overflow","hidden"),d.wborder=parseFloat(d.outerWidth()-d.innerWidth()),d.addClass("nicescroll-cursors"),a.cursorh=d,n=f(document.createElement("div")),n.attr("id",a.id+"-hr"),n.addClass("nicescroll-rails nicescroll-rails-hr"),n.height=Math.max(parseFloat(a.opt.cursorwidth),d.outerHeight()),n.css({height:n.height+"px",zIndex:a.zindex,background:a.opt.background}),n.append(d),n.visibility=!0,n.scrollable=!0,n.align="top"==a.opt.railvalign?
0:1,a.railh=n,a.railh.drag=!1);a.ispage?(m.css({position:"fixed",top:0,height:"100%"}),m.align?m.css({right:0}):m.css({left:0}),a.body.append(m),a.railh&&(n.css({position:"fixed",left:0,width:"100%"}),n.align?n.css({bottom:0}):n.css({top:0}),a.body.append(n))):(a.ishwscroll?("static"==a.win.css("position")&&a.css(a.win,{position:"relative"}),c="HTML"==a.win[0].nodeName?a.body:a.win,f(c).scrollTop(0).scrollLeft(0),a.zoom&&(a.zoom.css({position:"absolute",top:1,right:0,"margin-right":m.width+4}),c.append(a.zoom)),
m.css({position:"absolute",top:0}),m.align?m.css({right:0}):m.css({left:0}),c.append(m),n&&(n.css({position:"absolute",left:0,bottom:0}),n.align?n.css({bottom:0}):n.css({top:0}),c.append(n))):(a.isfixed="fixed"==a.win.css("position"),c=a.isfixed?"fixed":"absolute",a.isfixed||(a.viewport=a.getViewport(a.win[0])),a.viewport&&(a.body=a.viewport,0==/fixed|absolute/.test(a.viewport.css("position"))&&a.css(a.viewport,{position:"relative"})),m.css({position:c}),a.zoom&&a.zoom.css({position:c}),a.updateScrollBar(),
a.body.append(m),a.zoom&&a.body.append(a.zoom),a.railh&&(n.css({position:c}),a.body.append(n))),e.isios&&a.css(a.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),e.isie&&a.opt.disableoutline&&a.win.attr("hideFocus","true"),e.iswebkit&&a.opt.disableoutline&&a.win.css("outline","none"));!1===a.opt.autohidemode?(a.autohidedom=!1,a.rail.css({opacity:a.opt.cursoropacitymax}),a.railh&&a.railh.css({opacity:a.opt.cursoropacitymax})):!0===a.opt.autohidemode||"leave"===a.opt.autohidemode?
(a.autohidedom=f().add(a.rail),e.isie8&&(a.autohidedom=a.autohidedom.add(a.cursor)),a.railh&&(a.autohidedom=a.autohidedom.add(a.railh)),a.railh&&e.isie8&&(a.autohidedom=a.autohidedom.add(a.cursorh))):"scroll"==a.opt.autohidemode?(a.autohidedom=f().add(a.rail),a.railh&&(a.autohidedom=a.autohidedom.add(a.railh))):"cursor"==a.opt.autohidemode?(a.autohidedom=f().add(a.cursor),a.railh&&(a.autohidedom=a.autohidedom.add(a.cursorh))):"hidden"==a.opt.autohidemode&&(a.autohidedom=!1,a.hide(),a.railslocked=
!1);if(e.isie9mobile)a.scrollmom=new M(a),a.onmangotouch=function(){var b=a.getScrollTop(),c=a.getScrollLeft();if(b==a.scrollmom.lastscrolly&&c==a.scrollmom.lastscrollx)return!0;var g=b-a.mangotouch.sy,d=c-a.mangotouch.sx;if(0!=Math.round(Math.sqrt(Math.pow(d,2)+Math.pow(g,2)))){var e=0>g?-1:1,f=0>d?-1:1,u=+new Date;a.mangotouch.lazy&&clearTimeout(a.mangotouch.lazy);80<u-a.mangotouch.tm||a.mangotouch.dry!=e||a.mangotouch.drx!=f?(a.scrollmom.stop(),a.scrollmom.reset(c,b),a.mangotouch.sy=b,a.mangotouch.ly=
b,a.mangotouch.sx=c,a.mangotouch.lx=c,a.mangotouch.dry=e,a.mangotouch.drx=f,a.mangotouch.tm=u):(a.scrollmom.stop(),a.scrollmom.update(a.mangotouch.sx-d,a.mangotouch.sy-g),a.mangotouch.tm=u,g=Math.max(Math.abs(a.mangotouch.ly-b),Math.abs(a.mangotouch.lx-c)),a.mangotouch.ly=b,a.mangotouch.lx=c,2<g&&(a.mangotouch.lazy=setTimeout(function(){a.mangotouch.lazy=!1;a.mangotouch.dry=0;a.mangotouch.drx=0;a.mangotouch.tm=0;a.scrollmom.doMomentum(30)},100)))}},m=a.getScrollTop(),n=a.getScrollLeft(),a.mangotouch=
{sy:m,ly:m,dry:0,sx:n,lx:n,drx:0,lazy:!1,tm:0},a.bind(a.docscroll,"scroll",a.onmangotouch);else{if(e.cantouch||a.istouchcapable||a.opt.touchbehavior||e.hasmstouch){a.scrollmom=new M(a);a.ontouchstart=function(b){if(b.pointerType&&2!=b.pointerType&&"touch"!=b.pointerType)return!1;a.hasmoving=!1;if(!a.railslocked){var c;if(e.hasmstouch)for(c=b.target?b.target:!1;c;){var g=f(c).getNiceScroll();if(0<g.length&&g[0].me==a.me)break;if(0<g.length)return!1;if("DIV"==c.nodeName&&c.id==a.id)break;c=c.parentNode?
c.parentNode:!1}a.cancelScroll();if((c=a.getTarget(b))&&/INPUT/i.test(c.nodeName)&&/range/i.test(c.type))return a.stopPropagation(b);!("clientX"in b)&&"changedTouches"in b&&(b.clientX=b.changedTouches[0].clientX,b.clientY=b.changedTouches[0].clientY);a.forcescreen&&(g=b,b={original:b.original?b.original:b},b.clientX=g.screenX,b.clientY=g.screenY);a.rail.drag={x:b.clientX,y:b.clientY,sx:a.scroll.x,sy:a.scroll.y,st:a.getScrollTop(),sl:a.getScrollLeft(),pt:2,dl:!1};if(a.ispage||!a.opt.directionlockdeadzone)a.rail.drag.dl=
"f";else{var g=f(window).width(),d=f(window).height(),d=Math.max(0,Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)-d),g=Math.max(0,Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)-g);a.rail.drag.ck=!a.rail.scrollable&&a.railh.scrollable?0<d?"v":!1:a.rail.scrollable&&!a.railh.scrollable?0<g?"h":!1:!1;a.rail.drag.ck||(a.rail.drag.dl="f")}a.opt.touchbehavior&&a.isiframe&&e.isie&&(g=a.win.position(),a.rail.drag.x+=g.left,a.rail.drag.y+=g.top);a.hasmoving=
!1;a.lastmouseup=!1;a.scrollmom.reset(b.clientX,b.clientY);if(!e.cantouch&&!this.istouchcapable&&!b.pointerType){if(!c||!/INPUT|SELECT|TEXTAREA/i.test(c.nodeName))return!a.ispage&&e.hasmousecapture&&c.setCapture(),a.opt.touchbehavior?(c.onclick&&!c._onclick&&(c._onclick=c.onclick,c.onclick=function(b){if(a.hasmoving)return!1;c._onclick.call(this,b)}),a.cancelEvent(b)):a.stopPropagation(b);/SUBMIT|CANCEL|BUTTON/i.test(f(c).attr("type"))&&(pc={tg:c,click:!1},a.preventclick=pc)}}};a.ontouchend=function(b){if(!a.rail.drag)return!0;
if(2==a.rail.drag.pt){if(b.pointerType&&2!=b.pointerType&&"touch"!=b.pointerType)return!1;a.scrollmom.doMomentum();a.rail.drag=!1;if(a.hasmoving&&(a.lastmouseup=!0,a.hideCursor(),e.hasmousecapture&&document.releaseCapture(),!e.cantouch))return a.cancelEvent(b)}else if(1==a.rail.drag.pt)return a.onmouseup(b)};var q=a.opt.touchbehavior&&a.isiframe&&!e.hasmousecapture;a.ontouchmove=function(b,c){if(!a.rail.drag||b.targetTouches&&a.opt.preventmultitouchscrolling&&1<b.targetTouches.length||b.pointerType&&
2!=b.pointerType&&"touch"!=b.pointerType)return!1;if(2==a.rail.drag.pt){if(e.cantouch&&e.isios&&void 0===b.original)return!0;a.hasmoving=!0;a.preventclick&&!a.preventclick.click&&(a.preventclick.click=a.preventclick.tg.onclick||!1,a.preventclick.tg.onclick=a.onpreventclick);b=f.extend({original:b},b);"changedTouches"in b&&(b.clientX=b.changedTouches[0].clientX,b.clientY=b.changedTouches[0].clientY);if(a.forcescreen){var g=b;b={original:b.original?b.original:b};b.clientX=g.screenX;b.clientY=g.screenY}var d,
g=d=0;q&&!c&&(d=a.win.position(),g=-d.left,d=-d.top);var u=b.clientY+d;d=u-a.rail.drag.y;var m=b.clientX+g,k=m-a.rail.drag.x,h=a.rail.drag.st-d;a.ishwscroll&&a.opt.bouncescroll?0>h?h=Math.round(h/2):h>a.page.maxh&&(h=a.page.maxh+Math.round((h-a.page.maxh)/2)):(0>h&&(u=h=0),h>a.page.maxh&&(h=a.page.maxh,u=0));var l;a.railh&&a.railh.scrollable&&(l=a.isrtlmode?k-a.rail.drag.sl:a.rail.drag.sl-k,a.ishwscroll&&a.opt.bouncescroll?0>l?l=Math.round(l/2):l>a.page.maxw&&(l=a.page.maxw+Math.round((l-a.page.maxw)/
2)):(0>l&&(m=l=0),l>a.page.maxw&&(l=a.page.maxw,m=0)));g=!1;if(a.rail.drag.dl)g=!0,"v"==a.rail.drag.dl?l=a.rail.drag.sl:"h"==a.rail.drag.dl&&(h=a.rail.drag.st);else{d=Math.abs(d);var k=Math.abs(k),C=a.opt.directionlockdeadzone;if("v"==a.rail.drag.ck){if(d>C&&k<=.3*d)return a.rail.drag=!1,!0;k>C&&(a.rail.drag.dl="f",f("body").scrollTop(f("body").scrollTop()))}else if("h"==a.rail.drag.ck){if(k>C&&d<=.3*k)return a.rail.drag=!1,!0;d>C&&(a.rail.drag.dl="f",f("body").scrollLeft(f("body").scrollLeft()))}}a.synched("touchmove",
function(){a.rail.drag&&2==a.rail.drag.pt&&(a.prepareTransition&&a.prepareTransition(0),a.rail.scrollable&&a.setScrollTop(h),a.scrollmom.update(m,u),a.railh&&a.railh.scrollable?(a.setScrollLeft(l),a.showCursor(h,l)):a.showCursor(h),e.isie10&&document.selection.clear())});e.ischrome&&a.istouchcapable&&(g=!1);if(g)return a.cancelEvent(b)}else if(1==a.rail.drag.pt)return a.onmousemove(b)}}a.onmousedown=function(b,c){if(!a.rail.drag||1==a.rail.drag.pt){if(a.railslocked)return a.cancelEvent(b);a.cancelScroll();
a.rail.drag={x:b.clientX,y:b.clientY,sx:a.scroll.x,sy:a.scroll.y,pt:1,hr:!!c};var g=a.getTarget(b);!a.ispage&&e.hasmousecapture&&g.setCapture();a.isiframe&&!e.hasmousecapture&&(a.saved.csspointerevents=a.doc.css("pointer-events"),a.css(a.doc,{"pointer-events":"none"}));a.hasmoving=!1;return a.cancelEvent(b)}};a.onmouseup=function(b){if(a.rail.drag){if(1!=a.rail.drag.pt)return!0;e.hasmousecapture&&document.releaseCapture();a.isiframe&&!e.hasmousecapture&&a.doc.css("pointer-events",a.saved.csspointerevents);
a.rail.drag=!1;a.hasmoving&&a.triggerScrollEnd();return a.cancelEvent(b)}};a.onmousemove=function(b){if(a.rail.drag){if(1==a.rail.drag.pt){if(e.ischrome&&0==b.which)return a.onmouseup(b);a.cursorfreezed=!0;a.hasmoving=!0;if(a.rail.drag.hr){a.scroll.x=a.rail.drag.sx+(b.clientX-a.rail.drag.x);0>a.scroll.x&&(a.scroll.x=0);var c=a.scrollvaluemaxw;a.scroll.x>c&&(a.scroll.x=c)}else a.scroll.y=a.rail.drag.sy+(b.clientY-a.rail.drag.y),0>a.scroll.y&&(a.scroll.y=0),c=a.scrollvaluemax,a.scroll.y>c&&(a.scroll.y=
c);a.synched("mousemove",function(){a.rail.drag&&1==a.rail.drag.pt&&(a.showCursor(),a.rail.drag.hr?a.hasreversehr?a.doScrollLeft(a.scrollvaluemaxw-Math.round(a.scroll.x*a.scrollratio.x),a.opt.cursordragspeed):a.doScrollLeft(Math.round(a.scroll.x*a.scrollratio.x),a.opt.cursordragspeed):a.doScrollTop(Math.round(a.scroll.y*a.scrollratio.y),a.opt.cursordragspeed))});return a.cancelEvent(b)}}else a.checkarea=0};if(e.cantouch||a.opt.touchbehavior)a.onpreventclick=function(b){if(a.preventclick)return a.preventclick.tg.onclick=
a.preventclick.click,a.preventclick=!1,a.cancelEvent(b)},a.bind(a.win,"mousedown",a.ontouchstart),a.onclick=e.isios?!1:function(b){return a.lastmouseup?(a.lastmouseup=!1,a.cancelEvent(b)):!0},a.opt.grabcursorenabled&&e.cursorgrabvalue&&(a.css(a.ispage?a.doc:a.win,{cursor:e.cursorgrabvalue}),a.css(a.rail,{cursor:e.cursorgrabvalue}));else{var r=function(b){if(a.selectiondrag){if(b){var c=a.win.outerHeight();b=b.pageY-a.selectiondrag.top;0<b&&b<c&&(b=0);b>=c&&(b-=c);a.selectiondrag.df=b}0!=a.selectiondrag.df&&
(a.doScrollBy(2*-Math.floor(a.selectiondrag.df/6)),a.debounced("doselectionscroll",function(){r()},50))}};a.hasTextSelected="getSelection"in document?function(){return 0<document.getSelection().rangeCount}:"selection"in document?function(){return"None"!=document.selection.type}:function(){return!1};a.onselectionstart=function(b){a.ispage||(a.selectiondrag=a.win.offset())};a.onselectionend=function(b){a.selectiondrag=!1};a.onselectiondrag=function(b){a.selectiondrag&&a.hasTextSelected()&&a.debounced("selectionscroll",
function(){r(b)},250)}}e.hasw3ctouch?(a.css(a.rail,{"touch-action":"none"}),a.css(a.cursor,{"touch-action":"none"}),a.bind(a.win,"pointerdown",a.ontouchstart),a.bind(document,"pointerup",a.ontouchend),a.bind(document,"pointermove",a.ontouchmove)):e.hasmstouch?(a.css(a.rail,{"-ms-touch-action":"none"}),a.css(a.cursor,{"-ms-touch-action":"none"}),a.bind(a.win,"MSPointerDown",a.ontouchstart),a.bind(document,"MSPointerUp",a.ontouchend),a.bind(document,"MSPointerMove",a.ontouchmove),a.bind(a.cursor,"MSGestureHold",
function(a){a.preventDefault()}),a.bind(a.cursor,"contextmenu",function(a){a.preventDefault()})):this.istouchcapable&&(a.bind(a.win,"touchstart",a.ontouchstart),a.bind(document,"touchend",a.ontouchend),a.bind(document,"touchcancel",a.ontouchend),a.bind(document,"touchmove",a.ontouchmove));if(a.opt.cursordragontouch||!e.cantouch&&!a.opt.touchbehavior)a.rail.css({cursor:"default"}),a.railh&&a.railh.css({cursor:"default"}),a.jqbind(a.rail,"mouseenter",function(){if(!a.ispage&&!a.win.is(":visible"))return!1;
a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.rail,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}),a.opt.sensitiverail&&(a.bind(a.rail,"click",function(b){a.doRailClick(b,!1,!1)}),a.bind(a.rail,"dblclick",function(b){a.doRailClick(b,!0,!1)}),a.bind(a.cursor,"click",function(b){a.cancelEvent(b)}),a.bind(a.cursor,"dblclick",function(b){a.cancelEvent(b)})),a.railh&&(a.jqbind(a.railh,"mouseenter",function(){if(!a.ispage&&!a.win.is(":visible"))return!1;a.canshowonmouseevent&&
a.showCursor();a.rail.active=!0}),a.jqbind(a.railh,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}),a.opt.sensitiverail&&(a.bind(a.railh,"click",function(b){a.doRailClick(b,!1,!0)}),a.bind(a.railh,"dblclick",function(b){a.doRailClick(b,!0,!0)}),a.bind(a.cursorh,"click",function(b){a.cancelEvent(b)}),a.bind(a.cursorh,"dblclick",function(b){a.cancelEvent(b)})));e.cantouch||a.opt.touchbehavior?(a.bind(e.hasmousecapture?a.win:document,"mouseup",a.ontouchend),a.bind(document,"mousemove",
a.ontouchmove),a.onclick&&a.bind(document,"click",a.onclick),a.opt.cursordragontouch?(a.bind(a.cursor,"mousedown",a.onmousedown),a.bind(a.cursor,"mouseup",a.onmouseup),a.cursorh&&a.bind(a.cursorh,"mousedown",function(b){a.onmousedown(b,!0)}),a.cursorh&&a.bind(a.cursorh,"mouseup",a.onmouseup)):(a.bind(a.rail,"mousedown",function(a){a.preventDefault()}),a.railh&&a.bind(a.railh,"mousedown",function(a){a.preventDefault()}))):(a.bind(e.hasmousecapture?a.win:document,"mouseup",a.onmouseup),a.bind(document,
"mousemove",a.onmousemove),a.onclick&&a.bind(document,"click",a.onclick),a.bind(a.cursor,"mousedown",a.onmousedown),a.bind(a.cursor,"mouseup",a.onmouseup),a.railh&&(a.bind(a.cursorh,"mousedown",function(b){a.onmousedown(b,!0)}),a.bind(a.cursorh,"mouseup",a.onmouseup)),!a.ispage&&a.opt.enablescrollonselection&&(a.bind(a.win[0],"mousedown",a.onselectionstart),a.bind(document,"mouseup",a.onselectionend),a.bind(a.cursor,"mouseup",a.onselectionend),a.cursorh&&a.bind(a.cursorh,"mouseup",a.onselectionend),
a.bind(document,"mousemove",a.onselectiondrag)),a.zoom&&(a.jqbind(a.zoom,"mouseenter",function(){a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.zoom,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()})));a.opt.enablemousewheel&&(a.isiframe||a.mousewheel(e.isie&&a.ispage?document:a.win,a.onmousewheel),a.mousewheel(a.rail,a.onmousewheel),a.railh&&a.mousewheel(a.railh,a.onmousewheelhr));a.ispage||e.cantouch||/HTML|^BODY/.test(a.win[0].nodeName)||(a.win.attr("tabindex")||
a.win.attr({tabindex:O++}),a.jqbind(a.win,"focus",function(b){B=a.getTarget(b).id||!0;a.hasfocus=!0;a.canshowonmouseevent&&a.noticeCursor()}),a.jqbind(a.win,"blur",function(b){B=!1;a.hasfocus=!1}),a.jqbind(a.win,"mouseenter",function(b){F=a.getTarget(b).id||!0;a.hasmousefocus=!0;a.canshowonmouseevent&&a.noticeCursor()}),a.jqbind(a.win,"mouseleave",function(){F=!1;a.hasmousefocus=!1;a.rail.drag||a.hideCursor()}))}a.onkeypress=function(b){if(a.railslocked&&0==a.page.maxh)return!0;b=b?b:window.e;var c=
a.getTarget(b);if(c&&/INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName)&&(!c.getAttribute("type")&&!c.type||!/submit|button|cancel/i.tp)||f(c).attr("contenteditable"))return!0;if(a.hasfocus||a.hasmousefocus&&!B||a.ispage&&!B&&!F){c=b.keyCode;if(a.railslocked&&27!=c)return a.cancelEvent(b);var g=b.ctrlKey||!1,d=b.shiftKey||!1,e=!1;switch(c){case 38:case 63233:a.doScrollBy(72);e=!0;break;case 40:case 63235:a.doScrollBy(-72);e=!0;break;case 37:case 63232:a.railh&&(g?a.doScrollLeft(0):a.doScrollLeftBy(72),
e=!0);break;case 39:case 63234:a.railh&&(g?a.doScrollLeft(a.page.maxw):a.doScrollLeftBy(-72),e=!0);break;case 33:case 63276:a.doScrollBy(a.view.h);e=!0;break;case 34:case 63277:a.doScrollBy(-a.view.h);e=!0;break;case 36:case 63273:a.railh&&g?a.doScrollPos(0,0):a.doScrollTo(0);e=!0;break;case 35:case 63275:a.railh&&g?a.doScrollPos(a.page.maxw,a.page.maxh):a.doScrollTo(a.page.maxh);e=!0;break;case 32:a.opt.spacebarenabled&&(d?a.doScrollBy(a.view.h):a.doScrollBy(-a.view.h),e=!0);break;case 27:a.zoomactive&&
(a.doZoom(),e=!0)}if(e)return a.cancelEvent(b)}};a.opt.enablekeyboard&&a.bind(document,e.isopera&&!e.isopera12?"keypress":"keydown",a.onkeypress);a.bind(document,"keydown",function(b){b.ctrlKey&&(a.wheelprevented=!0)});a.bind(document,"keyup",function(b){b.ctrlKey||(a.wheelprevented=!1)});a.bind(window,"blur",function(b){a.wheelprevented=!1});a.bind(window,"resize",a.lazyResize);a.bind(window,"orientationchange",a.lazyResize);a.bind(window,"load",a.lazyResize);if(e.ischrome&&!a.ispage&&!a.haswrapper){var t=
a.win.attr("style"),m=parseFloat(a.win.css("width"))+1;a.win.css("width",m);a.synched("chromefix",function(){a.win.attr("style",t)})}a.onAttributeChange=function(b){a.lazyResize(a.isieold?250:30)};a.isie11||!1===x||(a.observerbody=new x(function(b){b.forEach(function(b){if("attributes"==b.type)return f("body").hasClass("modal-open")&&f("body").hasClass("modal-dialog")&&!f.contains(f(".modal-dialog")[0],a.doc[0])?a.hide():a.show()});if(document.body.scrollHeight!=a.page.maxh)return a.lazyResize(30)}),
a.observerbody.observe(document.body,{childList:!0,subtree:!0,characterData:!1,attributes:!0,attributeFilter:["class"]}));a.ispage||a.haswrapper||(!1!==x?(a.observer=new x(function(b){b.forEach(a.onAttributeChange)}),a.observer.observe(a.win[0],{childList:!0,characterData:!1,attributes:!0,subtree:!1}),a.observerremover=new x(function(b){b.forEach(function(b){if(0<b.removedNodes.length)for(var c in b.removedNodes)if(a&&b.removedNodes[c]==a.win[0])return a.remove()})}),a.observerremover.observe(a.win[0].parentNode,
{childList:!0,characterData:!1,attributes:!1,subtree:!1})):(a.bind(a.win,e.isie&&!e.isie9?"propertychange":"DOMAttrModified",a.onAttributeChange),e.isie9&&a.win[0].attachEvent("onpropertychange",a.onAttributeChange),a.bind(a.win,"DOMNodeRemoved",function(b){b.target==a.win[0]&&a.remove()})));!a.ispage&&a.opt.boxzoom&&a.bind(window,"resize",a.resizeZoom);a.istextarea&&(a.bind(a.win,"keydown",a.lazyResize),a.bind(a.win,"mouseup",a.lazyResize));a.lazyResize(30)}if("IFRAME"==this.doc[0].nodeName){var N=
function(){a.iframexd=!1;var c;try{c="contentDocument"in this?this.contentDocument:this.contentWindow.document}catch(g){a.iframexd=!0,c=!1}if(a.iframexd)return"console"in window&&console.log("NiceScroll error: policy restriced iframe"),!0;a.forcescreen=!0;a.isiframe&&(a.iframe={doc:f(c),html:a.doc.contents().find("html")[0],body:a.doc.contents().find("body")[0]},a.getContentSize=function(){return{w:Math.max(a.iframe.html.scrollWidth,a.iframe.body.scrollWidth),h:Math.max(a.iframe.html.scrollHeight,
a.iframe.body.scrollHeight)}},a.docscroll=f(a.iframe.body));if(!e.isios&&a.opt.iframeautoresize&&!a.isiframe){a.win.scrollTop(0);a.doc.height("");var d=Math.max(c.getElementsByTagName("html")[0].scrollHeight,c.body.scrollHeight);a.doc.height(d)}a.lazyResize(30);e.isie7&&a.css(f(a.iframe.html),b);a.css(f(a.iframe.body),b);e.isios&&a.haswrapper&&a.css(f(c.body),{"-webkit-transform":"translate3d(0,0,0)"});"contentWindow"in this?a.bind(this.contentWindow,"scroll",a.onscroll):a.bind(c,"scroll",a.onscroll);
a.opt.enablemousewheel&&a.mousewheel(c,a.onmousewheel);a.opt.enablekeyboard&&a.bind(c,e.isopera?"keypress":"keydown",a.onkeypress);if(e.cantouch||a.opt.touchbehavior)a.bind(c,"mousedown",a.ontouchstart),a.bind(c,"mousemove",function(b){return a.ontouchmove(b,!0)}),a.opt.grabcursorenabled&&e.cursorgrabvalue&&a.css(f(c.body),{cursor:e.cursorgrabvalue});a.bind(c,"mouseup",a.ontouchend);a.zoom&&(a.opt.dblclickzoom&&a.bind(c,"dblclick",a.doZoom),a.ongesturezoom&&a.bind(c,"gestureend",a.ongesturezoom))};
this.doc[0].readyState&&"complete"==this.doc[0].readyState&&setTimeout(function(){N.call(a.doc[0],!1)},500);a.bind(this.doc,"load",N)}};this.showCursor=function(b,c){a.cursortimeout&&(clearTimeout(a.cursortimeout),a.cursortimeout=0);if(a.rail){a.autohidedom&&(a.autohidedom.stop().css({opacity:a.opt.cursoropacitymax}),a.cursoractive=!0);a.rail.drag&&1==a.rail.drag.pt||(void 0!==b&&!1!==b&&(a.scroll.y=Math.round(1*b/a.scrollratio.y)),void 0!==c&&(a.scroll.x=Math.round(1*c/a.scrollratio.x)));a.cursor.css({height:a.cursorheight,
top:a.scroll.y});if(a.cursorh){var d=a.hasreversehr?a.scrollvaluemaxw-a.scroll.x:a.scroll.x;!a.rail.align&&a.rail.visibility?a.cursorh.css({width:a.cursorwidth,left:d+a.rail.width}):a.cursorh.css({width:a.cursorwidth,left:d});a.cursoractive=!0}a.zoom&&a.zoom.stop().css({opacity:a.opt.cursoropacitymax})}};this.hideCursor=function(b){a.cursortimeout||!a.rail||!a.autohidedom||a.hasmousefocus&&"leave"==a.opt.autohidemode||(a.cursortimeout=setTimeout(function(){a.rail.active&&a.showonmouseevent||(a.autohidedom.stop().animate({opacity:a.opt.cursoropacitymin}),
a.zoom&&a.zoom.stop().animate({opacity:a.opt.cursoropacitymin}),a.cursoractive=!1);a.cursortimeout=0},b||a.opt.hidecursordelay))};this.noticeCursor=function(b,c,d){a.showCursor(c,d);a.rail.active||a.hideCursor(b)};this.getContentSize=a.ispage?function(){return{w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:a.haswrapper?function(){return{w:a.doc.outerWidth()+parseInt(a.win.css("paddingLeft"))+
parseInt(a.win.css("paddingRight")),h:a.doc.outerHeight()+parseInt(a.win.css("paddingTop"))+parseInt(a.win.css("paddingBottom"))}}:function(){return{w:a.docscroll[0].scrollWidth,h:a.docscroll[0].scrollHeight}};this.onResize=function(b,c){if(!a||!a.win)return!1;if(!a.haswrapper&&!a.ispage){if("none"==a.win.css("display"))return a.visibility&&a.hideRail().hideRailHr(),!1;a.hidden||a.visibility||a.showRail().showRailHr()}var d=a.page.maxh,e=a.page.maxw,f=a.view.h,k=a.view.w;a.view={w:a.ispage?a.win.width():
parseInt(a.win[0].clientWidth),h:a.ispage?a.win.height():parseInt(a.win[0].clientHeight)};a.page=c?c:a.getContentSize();a.page.maxh=Math.max(0,a.page.h-a.view.h);a.page.maxw=Math.max(0,a.page.w-a.view.w);if(a.page.maxh==d&&a.page.maxw==e&&a.view.w==k&&a.view.h==f){if(a.ispage)return a;d=a.win.offset();if(a.lastposition&&(e=a.lastposition,e.top==d.top&&e.left==d.left))return a;a.lastposition=d}0==a.page.maxh?(a.hideRail(),a.scrollvaluemax=0,a.scroll.y=0,a.scrollratio.y=0,a.cursorheight=0,a.setScrollTop(0),
a.rail&&(a.rail.scrollable=!1)):(a.page.maxh-=a.opt.railpadding.top+a.opt.railpadding.bottom,a.rail.scrollable=!0);0==a.page.maxw?(a.hideRailHr(),a.scrollvaluemaxw=0,a.scroll.x=0,a.scrollratio.x=0,a.cursorwidth=0,a.setScrollLeft(0),a.railh&&(a.railh.scrollable=!1)):(a.page.maxw-=a.opt.railpadding.left+a.opt.railpadding.right,a.railh&&(a.railh.scrollable=a.opt.horizrailenabled));a.railslocked=a.locked||0==a.page.maxh&&0==a.page.maxw;if(a.railslocked)return a.ispage||a.updateScrollBar(a.view),!1;a.hidden||
a.visibility?!a.railh||a.hidden||a.railh.visibility||a.showRailHr():a.showRail().showRailHr();a.istextarea&&a.win.css("resize")&&"none"!=a.win.css("resize")&&(a.view.h-=20);a.cursorheight=Math.min(a.view.h,Math.round(a.view.h/a.page.h*a.view.h));a.cursorheight=a.opt.cursorfixedheight?a.opt.cursorfixedheight:Math.max(a.opt.cursorminheight,a.cursorheight);a.cursorwidth=Math.min(a.view.w,Math.round(a.view.w/a.page.w*a.view.w));a.cursorwidth=a.opt.cursorfixedheight?a.opt.cursorfixedheight:Math.max(a.opt.cursorminheight,
a.cursorwidth);a.scrollvaluemax=a.view.h-a.cursorheight-a.cursor.hborder-(a.opt.railpadding.top+a.opt.railpadding.bottom);a.railh&&(a.railh.width=0<a.page.maxh?a.view.w-a.rail.width:a.view.w,a.scrollvaluemaxw=a.railh.width-a.cursorwidth-a.cursorh.wborder-(a.opt.railpadding.left+a.opt.railpadding.right));a.ispage||a.updateScrollBar(a.view);a.scrollratio={x:a.page.maxw/a.scrollvaluemaxw,y:a.page.maxh/a.scrollvaluemax};a.getScrollTop()>a.page.maxh?a.doScrollTop(a.page.maxh):(a.scroll.y=Math.round(a.getScrollTop()*
(1/a.scrollratio.y)),a.scroll.x=Math.round(a.getScrollLeft()*(1/a.scrollratio.x)),a.cursoractive&&a.noticeCursor());a.scroll.y&&0==a.getScrollTop()&&a.doScrollTo(Math.floor(a.scroll.y*a.scrollratio.y));return a};this.resize=a.onResize;this.hlazyresize=0;this.lazyResize=function(b){a.haswrapper||a.hide();a.hlazyresize&&clearTimeout(a.hlazyresize);a.hlazyresize=setTimeout(function(){a&&a.show().resize()},240);return a};this.jqbind=function(b,c,d){a.events.push({e:b,n:c,f:d,q:!0});f(b).bind(c,d)};this.mousewheel=
function(b,c,d){b="jquery"in b?b[0]:b;if("onwheel"in document.createElement("div"))a._bind(b,"wheel",c,d||!1);else{var e=void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll";q(b,e,c,d||!1);"DOMMouseScroll"==e&&q(b,"MozMousePixelScroll",c,d||!1)}};e.haseventlistener?(this.bind=function(b,c,d,e){a._bind("jquery"in b?b[0]:b,c,d,e||!1)},this._bind=function(b,c,d,e){a.events.push({e:b,n:c,f:d,b:e,q:!1});b.addEventListener(c,d,e||!1)},this.cancelEvent=function(a){if(!a)return!1;a=a.original?a.original:
a;a.cancelable&&a.preventDefault();a.stopPropagation();a.preventManipulation&&a.preventManipulation();return!1},this.stopPropagation=function(a){if(!a)return!1;a=a.original?a.original:a;a.stopPropagation();return!1},this._unbind=function(a,c,d,e){a.removeEventListener(c,d,e)}):(this.bind=function(b,c,d,e){var f="jquery"in b?b[0]:b;a._bind(f,c,function(b){(b=b||window.event||!1)&&b.srcElement&&(b.target=b.srcElement);"pageY"in b||(b.pageX=b.clientX+document.documentElement.scrollLeft,b.pageY=b.clientY+
document.documentElement.scrollTop);return!1===d.call(f,b)||!1===e?a.cancelEvent(b):!0})},this._bind=function(b,c,d,e){a.events.push({e:b,n:c,f:d,b:e,q:!1});b.attachEvent?b.attachEvent("on"+c,d):b["on"+c]=d},this.cancelEvent=function(a){a=window.event||!1;if(!a)return!1;a.cancelBubble=!0;a.cancel=!0;return a.returnValue=!1},this.stopPropagation=function(a){a=window.event||!1;if(!a)return!1;a.cancelBubble=!0;return!1},this._unbind=function(a,c,d,e){a.detachEvent?a.detachEvent("on"+c,d):a["on"+c]=!1});
this.unbindAll=function(){for(var b=0;b<a.events.length;b++){var c=a.events[b];c.q?c.e.unbind(c.n,c.f):a._unbind(c.e,c.n,c.f,c.b)}};this.showRail=function(){0==a.page.maxh||!a.ispage&&"none"==a.win.css("display")||(a.visibility=!0,a.rail.visibility=!0,a.rail.css("display","block"));return a};this.showRailHr=function(){if(!a.railh)return a;0==a.page.maxw||!a.ispage&&"none"==a.win.css("display")||(a.railh.visibility=!0,a.railh.css("display","block"));return a};this.hideRail=function(){a.visibility=
!1;a.rail.visibility=!1;a.rail.css("display","none");return a};this.hideRailHr=function(){if(!a.railh)return a;a.railh.visibility=!1;a.railh.css("display","none");return a};this.show=function(){a.hidden=!1;a.railslocked=!1;return a.showRail().showRailHr()};this.hide=function(){a.hidden=!0;a.railslocked=!0;return a.hideRail().hideRailHr()};this.toggle=function(){return a.hidden?a.show():a.hide()};this.remove=function(){a.stop();a.cursortimeout&&clearTimeout(a.cursortimeout);for(var b in a.delaylist)a.delaylist[b]&&
w(a.delaylist[b].h);a.doZoomOut();a.unbindAll();e.isie9&&a.win[0].detachEvent("onpropertychange",a.onAttributeChange);!1!==a.observer&&a.observer.disconnect();!1!==a.observerremover&&a.observerremover.disconnect();!1!==a.observerbody&&a.observerbody.disconnect();a.events=null;a.cursor&&a.cursor.remove();a.cursorh&&a.cursorh.remove();a.rail&&a.rail.remove();a.railh&&a.railh.remove();a.zoom&&a.zoom.remove();for(b=0;b<a.saved.css.length;b++){var c=a.saved.css[b];c[0].css(c[1],void 0===c[2]?"":c[2])}a.saved=
!1;a.me.data("__nicescroll","");var d=f.nicescroll;d.each(function(b){if(this&&this.id===a.id){delete d[b];for(var c=++b;c<d.length;c++,b++)d[b]=d[c];d.length--;d.length&&delete d[d.length]}});for(var k in a)a[k]=null,delete a[k];a=null};this.scrollstart=function(b){this.onscrollstart=b;return a};this.scrollend=function(b){this.onscrollend=b;return a};this.scrollcancel=function(b){this.onscrollcancel=b;return a};this.zoomin=function(b){this.onzoomin=b;return a};this.zoomout=function(b){this.onzoomout=
b;return a};this.isScrollable=function(a){a=a.target?a.target:a;if("OPTION"==a.nodeName)return!0;for(;a&&1==a.nodeType&&!/^BODY|HTML/.test(a.nodeName);){var c=f(a),c=c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"";if(/scroll|auto/.test(c))return a.clientHeight!=a.scrollHeight;a=a.parentNode?a.parentNode:!1}return!1};this.getViewport=function(a){for(a=a&&a.parentNode?a.parentNode:!1;a&&1==a.nodeType&&!/^BODY|HTML/.test(a.nodeName);){var c=f(a);if(/fixed|absolute/.test(c.css("position")))return c;
var d=c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"";if(/scroll|auto/.test(d)&&a.clientHeight!=a.scrollHeight||0<c.getNiceScroll().length)return c;a=a.parentNode?a.parentNode:!1}return!1};this.triggerScrollEnd=function(){if(a.onscrollend){var b=a.getScrollLeft(),c=a.getScrollTop();a.onscrollend.call(a,{type:"scrollend",current:{x:b,y:c},end:{x:b,y:c}})}};this.onmousewheel=function(b){if(!a.wheelprevented){if(a.railslocked)return a.debounced("checkunlock",a.resize,250),!0;if(a.rail.drag)return a.cancelEvent(b);
"auto"==a.opt.oneaxismousemode&&0!=b.deltaX&&(a.opt.oneaxismousemode=!1);if(a.opt.oneaxismousemode&&0==b.deltaX&&!a.rail.scrollable)return a.railh&&a.railh.scrollable?a.onmousewheelhr(b):!0;var c=+new Date,d=!1;a.opt.preservenativescrolling&&a.checkarea+600<c&&(a.nativescrollingarea=a.isScrollable(b),d=!0);a.checkarea=c;if(a.nativescrollingarea)return!0;if(b=t(b,!1,d))a.checkarea=0;return b}};this.onmousewheelhr=function(b){if(!a.wheelprevented){if(a.railslocked||!a.railh.scrollable)return!0;if(a.rail.drag)return a.cancelEvent(b);
var c=+new Date,d=!1;a.opt.preservenativescrolling&&a.checkarea+600<c&&(a.nativescrollingarea=a.isScrollable(b),d=!0);a.checkarea=c;return a.nativescrollingarea?!0:a.railslocked?a.cancelEvent(b):t(b,!0,d)}};this.stop=function(){a.cancelScroll();a.scrollmon&&a.scrollmon.stop();a.cursorfreezed=!1;a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y));a.noticeCursor();return a};this.getTransitionSpeed=function(b){b=Math.min(Math.round(10*a.opt.scrollspeed),Math.round(b/20*a.opt.scrollspeed));return 20<
b?b:0};a.opt.smoothscroll?a.ishwscroll&&e.hastransition&&a.opt.usetransition&&a.opt.smoothscroll?(this.prepareTransition=function(b,c){var d=c?20<b?b:0:a.getTransitionSpeed(b),f=d?e.prefixstyle+"transform "+d+"ms ease-out":"";a.lasttransitionstyle&&a.lasttransitionstyle==f||(a.lasttransitionstyle=f,a.doc.css(e.transitionstyle,f));return d},this.doScrollLeft=function(b,c){var d=a.scrollrunning?a.newscrolly:a.getScrollTop();a.doScrollPos(b,d,c)},this.doScrollTop=function(b,c){var d=a.scrollrunning?
a.newscrollx:a.getScrollLeft();a.doScrollPos(d,b,c)},this.doScrollPos=function(b,c,d){var f=a.getScrollTop(),k=a.getScrollLeft();(0>(a.newscrolly-f)*(c-f)||0>(a.newscrollx-k)*(b-k))&&a.cancelScroll();0==a.opt.bouncescroll&&(0>c?c=0:c>a.page.maxh&&(c=a.page.maxh),0>b?b=0:b>a.page.maxw&&(b=a.page.maxw));if(a.scrollrunning&&b==a.newscrollx&&c==a.newscrolly)return!1;a.newscrolly=c;a.newscrollx=b;a.newscrollspeed=d||!1;if(a.timer)return!1;a.timer=setTimeout(function(){var d=a.getScrollTop(),f=a.getScrollLeft(),
k=Math.round(Math.sqrt(Math.pow(b-f,2)+Math.pow(c-d,2))),k=a.newscrollspeed&&1<a.newscrollspeed?a.newscrollspeed:a.getTransitionSpeed(k);a.newscrollspeed&&1>=a.newscrollspeed&&(k*=a.newscrollspeed);a.prepareTransition(k,!0);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);0<k&&(!a.scrollrunning&&a.onscrollstart&&a.onscrollstart.call(a,{type:"scrollstart",current:{x:f,y:d},request:{x:b,y:c},end:{x:a.newscrollx,y:a.newscrolly},speed:k}),e.transitionend?a.scrollendtrapped||(a.scrollendtrapped=
!0,a.bind(a.doc,e.transitionend,a.onScrollTransitionEnd,!1)):(a.scrollendtrapped&&clearTimeout(a.scrollendtrapped),a.scrollendtrapped=setTimeout(a.onScrollTransitionEnd,k)),a.timerscroll={bz:new D(d,a.newscrolly,k,0,0,.58,1),bh:new D(f,a.newscrollx,k,0,0,.58,1)},a.cursorfreezed||(a.timerscroll.tm=setInterval(function(){a.showCursor(a.getScrollTop(),a.getScrollLeft())},60)));a.synched("doScroll-set",function(){a.timer=0;a.scrollendtrapped&&(a.scrollrunning=!0);a.setScrollTop(a.newscrolly);a.setScrollLeft(a.newscrollx);
if(!a.scrollendtrapped)a.onScrollTransitionEnd()})},50)},this.cancelScroll=function(){if(!a.scrollendtrapped)return!0;var b=a.getScrollTop(),c=a.getScrollLeft();a.scrollrunning=!1;e.transitionend||clearTimeout(e.transitionend);a.scrollendtrapped=!1;a._unbind(a.doc[0],e.transitionend,a.onScrollTransitionEnd);a.prepareTransition(0);a.setScrollTop(b);a.railh&&a.setScrollLeft(c);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);a.timerscroll=!1;a.cursorfreezed=!1;a.showCursor(b,c);return a},
this.onScrollTransitionEnd=function(){a.scrollendtrapped&&a._unbind(a.doc[0],e.transitionend,a.onScrollTransitionEnd);a.scrollendtrapped=!1;a.prepareTransition(0);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);a.timerscroll=!1;var b=a.getScrollTop(),c=a.getScrollLeft();a.setScrollTop(b);a.railh&&a.setScrollLeft(c);a.noticeCursor(!1,b,c);a.cursorfreezed=!1;0>b?b=0:b>a.page.maxh&&(b=a.page.maxh);0>c?c=0:c>a.page.maxw&&(c=a.page.maxw);if(b!=a.newscrolly||c!=a.newscrollx)return a.doScrollPos(c,
b,a.opt.snapbackspeed);a.onscrollend&&a.scrollrunning&&a.triggerScrollEnd();a.scrollrunning=!1}):(this.doScrollLeft=function(b,c){var d=a.scrollrunning?a.newscrolly:a.getScrollTop();a.doScrollPos(b,d,c)},this.doScrollTop=function(b,c){var d=a.scrollrunning?a.newscrollx:a.getScrollLeft();a.doScrollPos(d,b,c)},this.doScrollPos=function(b,c,d){function e(){if(a.cancelAnimationFrame)return!0;a.scrollrunning=!0;if(p=1-p)return a.timer=v(e)||1;var b=0,c,d,f=d=a.getScrollTop();if(a.dst.ay){f=a.bzscroll?
a.dst.py+a.bzscroll.getNow()*a.dst.ay:a.newscrolly;c=f-d;if(0>c&&f<a.newscrolly||0<c&&f>a.newscrolly)f=a.newscrolly;a.setScrollTop(f);f==a.newscrolly&&(b=1)}else b=1;d=c=a.getScrollLeft();if(a.dst.ax){d=a.bzscroll?a.dst.px+a.bzscroll.getNow()*a.dst.ax:a.newscrollx;c=d-c;if(0>c&&d<a.newscrollx||0<c&&d>a.newscrollx)d=a.newscrollx;a.setScrollLeft(d);d==a.newscrollx&&(b+=1)}else b+=1;2==b?(a.timer=0,a.cursorfreezed=!1,a.bzscroll=!1,a.scrollrunning=!1,0>f?f=0:f>a.page.maxh&&(f=Math.max(0,a.page.maxh)),
0>d?d=0:d>a.page.maxw&&(d=a.page.maxw),d!=a.newscrollx||f!=a.newscrolly?a.doScrollPos(d,f):a.onscrollend&&a.triggerScrollEnd()):a.timer=v(e)||1}c=void 0===c||!1===c?a.getScrollTop(!0):c;if(a.timer&&a.newscrolly==c&&a.newscrollx==b)return!0;a.timer&&w(a.timer);a.timer=0;var f=a.getScrollTop(),k=a.getScrollLeft();(0>(a.newscrolly-f)*(c-f)||0>(a.newscrollx-k)*(b-k))&&a.cancelScroll();a.newscrolly=c;a.newscrollx=b;a.bouncescroll&&a.rail.visibility||(0>a.newscrolly?a.newscrolly=0:a.newscrolly>a.page.maxh&&
(a.newscrolly=a.page.maxh));a.bouncescroll&&a.railh.visibility||(0>a.newscrollx?a.newscrollx=0:a.newscrollx>a.page.maxw&&(a.newscrollx=a.page.maxw));a.dst={};a.dst.x=b-k;a.dst.y=c-f;a.dst.px=k;a.dst.py=f;var h=Math.round(Math.sqrt(Math.pow(a.dst.x,2)+Math.pow(a.dst.y,2)));a.dst.ax=a.dst.x/h;a.dst.ay=a.dst.y/h;var l=0,n=h;0==a.dst.x?(l=f,n=c,a.dst.ay=1,a.dst.py=0):0==a.dst.y&&(l=k,n=b,a.dst.ax=1,a.dst.px=0);h=a.getTransitionSpeed(h);d&&1>=d&&(h*=d);a.bzscroll=0<h?a.bzscroll?a.bzscroll.update(n,h):
new D(l,n,h,0,1,0,1):!1;if(!a.timer){(f==a.page.maxh&&c>=a.page.maxh||k==a.page.maxw&&b>=a.page.maxw)&&a.checkContentSize();var p=1;a.cancelAnimationFrame=!1;a.timer=1;a.onscrollstart&&!a.scrollrunning&&a.onscrollstart.call(a,{type:"scrollstart",current:{x:k,y:f},request:{x:b,y:c},end:{x:a.newscrollx,y:a.newscrolly},speed:h});e();(f==a.page.maxh&&c>=f||k==a.page.maxw&&b>=k)&&a.checkContentSize();a.noticeCursor()}},this.cancelScroll=function(){a.timer&&w(a.timer);a.timer=0;a.bzscroll=!1;a.scrollrunning=
!1;return a}):(this.doScrollLeft=function(b,c){var d=a.getScrollTop();a.doScrollPos(b,d,c)},this.doScrollTop=function(b,c){var d=a.getScrollLeft();a.doScrollPos(d,b,c)},this.doScrollPos=function(b,c,d){var e=b>a.page.maxw?a.page.maxw:b;0>e&&(e=0);var f=c>a.page.maxh?a.page.maxh:c;0>f&&(f=0);a.synched("scroll",function(){a.setScrollTop(f);a.setScrollLeft(e)})},this.cancelScroll=function(){});this.doScrollBy=function(b,c){var d=0,d=c?Math.floor((a.scroll.y-b)*a.scrollratio.y):(a.timer?a.newscrolly:
a.getScrollTop(!0))-b;if(a.bouncescroll){var e=Math.round(a.view.h/2);d<-e?d=-e:d>a.page.maxh+e&&(d=a.page.maxh+e)}a.cursorfreezed=!1;e=a.getScrollTop(!0);if(0>d&&0>=e)return a.noticeCursor();if(d>a.page.maxh&&e>=a.page.maxh)return a.checkContentSize(),a.noticeCursor();a.doScrollTop(d)};this.doScrollLeftBy=function(b,c){var d=0,d=c?Math.floor((a.scroll.x-b)*a.scrollratio.x):(a.timer?a.newscrollx:a.getScrollLeft(!0))-b;if(a.bouncescroll){var e=Math.round(a.view.w/2);d<-e?d=-e:d>a.page.maxw+e&&(d=a.page.maxw+
e)}a.cursorfreezed=!1;e=a.getScrollLeft(!0);if(0>d&&0>=e||d>a.page.maxw&&e>=a.page.maxw)return a.noticeCursor();a.doScrollLeft(d)};this.doScrollTo=function(b,c){a.cursorfreezed=!1;a.doScrollTop(b)};this.checkContentSize=function(){var b=a.getContentSize();b.h==a.page.h&&b.w==a.page.w||a.resize(!1,b)};a.onscroll=function(b){a.rail.drag||a.cursorfreezed||a.synched("scroll",function(){a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y));a.railh&&(a.scroll.x=Math.round(a.getScrollLeft()*(1/a.scrollratio.x)));
a.noticeCursor()})};a.bind(a.docscroll,"scroll",a.onscroll);this.doZoomIn=function(b){if(!a.zoomactive){a.zoomactive=!0;a.zoomrestore={style:{}};var c="position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),d=a.win[0].style,k;for(k in c){var h=c[k];a.zoomrestore.style[h]=void 0!==d[h]?d[h]:""}a.zoomrestore.style.width=a.win.css("width");a.zoomrestore.style.height=a.win.css("height");a.zoomrestore.padding={w:a.win.outerWidth()-a.win.width(),h:a.win.outerHeight()-
a.win.height()};e.isios4&&(a.zoomrestore.scrollTop=f(window).scrollTop(),f(window).scrollTop(0));a.win.css({position:e.isios4?"absolute":"fixed",top:0,left:0,zIndex:A+100,margin:0});c=a.win.css("backgroundColor");(""==c||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c))&&a.win.css("backgroundColor","#fff");a.rail.css({zIndex:A+101});a.zoom.css({zIndex:A+102});a.zoom.css("backgroundPosition","0px -18px");a.resizeZoom();a.onzoomin&&a.onzoomin.call(a);return a.cancelEvent(b)}};this.doZoomOut=
function(b){if(a.zoomactive)return a.zoomactive=!1,a.win.css("margin",""),a.win.css(a.zoomrestore.style),e.isios4&&f(window).scrollTop(a.zoomrestore.scrollTop),a.rail.css({"z-index":a.zindex}),a.zoom.css({"z-index":a.zindex}),a.zoomrestore=!1,a.zoom.css("backgroundPosition","0px 0px"),a.onResize(),a.onzoomout&&a.onzoomout.call(a),a.cancelEvent(b)};this.doZoom=function(b){return a.zoomactive?a.doZoomOut(b):a.doZoomIn(b)};this.resizeZoom=function(){if(a.zoomactive){var b=a.getScrollTop();a.win.css({width:f(window).width()-
a.zoomrestore.padding.w+"px",height:f(window).height()-a.zoomrestore.padding.h+"px"});a.onResize();a.setScrollTop(Math.min(a.page.maxh,b))}};this.init();f.nicescroll.push(this)},M=function(f){var c=this;this.nc=f;this.steptime=this.lasttime=this.speedy=this.speedx=this.lasty=this.lastx=0;this.snapy=this.snapx=!1;this.demuly=this.demulx=0;this.lastscrolly=this.lastscrollx=-1;this.timer=this.chky=this.chkx=0;this.time=function(){return+new Date};this.reset=function(f,h){c.stop();var d=c.time();c.steptime=
0;c.lasttime=d;c.speedx=0;c.speedy=0;c.lastx=f;c.lasty=h;c.lastscrollx=-1;c.lastscrolly=-1};this.update=function(f,h){var d=c.time();c.steptime=d-c.lasttime;c.lasttime=d;var d=h-c.lasty,q=f-c.lastx,t=c.nc.getScrollTop(),a=c.nc.getScrollLeft(),t=t+d,a=a+q;c.snapx=0>a||a>c.nc.page.maxw;c.snapy=0>t||t>c.nc.page.maxh;c.speedx=q;c.speedy=d;c.lastx=f;c.lasty=h};this.stop=function(){c.nc.unsynched("domomentum2d");c.timer&&clearTimeout(c.timer);c.timer=0;c.lastscrollx=-1;c.lastscrolly=-1};this.doSnapy=function(f,
h){var d=!1;0>h?(h=0,d=!0):h>c.nc.page.maxh&&(h=c.nc.page.maxh,d=!0);0>f?(f=0,d=!0):f>c.nc.page.maxw&&(f=c.nc.page.maxw,d=!0);d?c.nc.doScrollPos(f,h,c.nc.opt.snapbackspeed):c.nc.triggerScrollEnd()};this.doMomentum=function(f){var h=c.time(),d=f?h+f:c.lasttime;f=c.nc.getScrollLeft();var q=c.nc.getScrollTop(),t=c.nc.page.maxh,a=c.nc.page.maxw;c.speedx=0<a?Math.min(60,c.speedx):0;c.speedy=0<t?Math.min(60,c.speedy):0;d=d&&60>=h-d;if(0>q||q>t||0>f||f>a)d=!1;f=c.speedx&&d?c.speedx:!1;if(c.speedy&&d&&c.speedy||
f){var r=Math.max(16,c.steptime);50<r&&(f=r/50,c.speedx*=f,c.speedy*=f,r=50);c.demulxy=0;c.lastscrollx=c.nc.getScrollLeft();c.chkx=c.lastscrollx;c.lastscrolly=c.nc.getScrollTop();c.chky=c.lastscrolly;var p=c.lastscrollx,e=c.lastscrolly,v=function(){var d=600<c.time()-h?.04:.02;c.speedx&&(p=Math.floor(c.lastscrollx-c.speedx*(1-c.demulxy)),c.lastscrollx=p,0>p||p>a)&&(d=.1);c.speedy&&(e=Math.floor(c.lastscrolly-c.speedy*(1-c.demulxy)),c.lastscrolly=e,0>e||e>t)&&(d=.1);c.demulxy=Math.min(1,c.demulxy+
d);c.nc.synched("domomentum2d",function(){c.speedx&&(c.nc.getScrollLeft(),c.chkx=p,c.nc.setScrollLeft(p));c.speedy&&(c.nc.getScrollTop(),c.chky=e,c.nc.setScrollTop(e));c.timer||(c.nc.hideCursor(),c.doSnapy(p,e))});1>c.demulxy?c.timer=setTimeout(v,r):(c.stop(),c.nc.hideCursor(),c.doSnapy(p,e))};v()}else c.doSnapy(c.nc.getScrollLeft(),c.nc.getScrollTop())}},y=f.fn.scrollTop;f.cssHooks.pageYOffset={get:function(h,c,k){return(c=f.data(h,"__nicescroll")||!1)&&c.ishwscroll?c.getScrollTop():y.call(h)},set:function(h,
c){var k=f.data(h,"__nicescroll")||!1;k&&k.ishwscroll?k.setScrollTop(parseInt(c)):y.call(h,c);return this}};f.fn.scrollTop=function(h){if(void 0===h){var c=this[0]?f.data(this[0],"__nicescroll")||!1:!1;return c&&c.ishwscroll?c.getScrollTop():y.call(this)}return this.each(function(){var c=f.data(this,"__nicescroll")||!1;c&&c.ishwscroll?c.setScrollTop(parseInt(h)):y.call(f(this),h)})};var z=f.fn.scrollLeft;f.cssHooks.pageXOffset={get:function(h,c,k){return(c=f.data(h,"__nicescroll")||!1)&&c.ishwscroll?
c.getScrollLeft():z.call(h)},set:function(h,c){var k=f.data(h,"__nicescroll")||!1;k&&k.ishwscroll?k.setScrollLeft(parseInt(c)):z.call(h,c);return this}};f.fn.scrollLeft=function(h){if(void 0===h){var c=this[0]?f.data(this[0],"__nicescroll")||!1:!1;return c&&c.ishwscroll?c.getScrollLeft():z.call(this)}return this.each(function(){var c=f.data(this,"__nicescroll")||!1;c&&c.ishwscroll?c.setScrollLeft(parseInt(h)):z.call(f(this),h)})};var E=function(h){var c=this;this.length=0;this.name="nicescrollarray";
this.each=function(d){f.each(c,d);return c};this.push=function(d){c[c.length]=d;c.length++};this.eq=function(d){return c[d]};if(h)for(var k=0;k<h.length;k++){var l=f.data(h[k],"__nicescroll")||!1;l&&(this[this.length]=l,this.length++)}return this};(function(f,c,k){for(var l=0;l<c.length;l++)k(f,c[l])})(E.prototype,"show hide toggle onResize resize remove stop doScrollPos".split(" "),function(f,c){f[c]=function(){var f=arguments;return this.each(function(){this[c].apply(this,f)})}});f.fn.getNiceScroll=
function(h){return void 0===h?new E(this):this[h]&&f.data(this[h],"__nicescroll")||!1};f.expr[":"].nicescroll=function(h){return void 0!==f.data(h,"__nicescroll")};f.fn.niceScroll=function(h,c){void 0!==c||"object"!=typeof h||"jquery"in h||(c=h,h=!1);c=f.extend({},c);var k=new E;void 0===c&&(c={});h&&(c.doc=f(h),c.win=f(this));var l=!("doc"in c);l||"win"in c||(c.win=f(this));this.each(function(){var d=f(this).data("__nicescroll")||!1;d||(c.doc=l?f(this):c.doc,d=new S(c,f(this)),f(this).data("__nicescroll",
d));k.push(d)});return 1==k.length?k[0]:k};window.NiceScroll={getjQuery:function(){return f}};f.nicescroll||(f.nicescroll=new E,f.nicescroll.options=K)});;
(function(b){b.gritter={};b.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1000,time:1000};b.gritter.add=function(f){try{return a.add(f||{})}catch(d){var c="Gritter Error: "+d;(typeof(console)!="undefined"&&console.error)?console.error(c,f):alert(c)}};b.gritter.remove=function(d,c){a.removeSpecific(d,c||{})};b.gritter.removeAll=function(c){a.stop(c||{})};var a={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(g){if(typeof(g)=="string"){g={text:g}}if(g.text===null){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var k=g.title,n=g.text,e=g.image||"",l=g.sticky||false,m=g.class_name||b.gritter.options.class_name,j=b.gritter.options.position,d=g.time||"";this._verifyWrapper();this._item_count++;var f=this._item_count,i=this._tpl_item;b(["before_open","after_open","before_close","after_close"]).each(function(p,q){a["_"+q+"_"+f]=(b.isFunction(g[q]))?g[q]:function(){}});this._custom_timer=0;if(d){this._custom_timer=d}var c=(e!="")?'<img src="'+e+'" class="gritter-image" />':"",h=(e!="")?"gritter-with-image":"gritter-without-image";if(k){k=this._str_replace("[[title]]",k,this._tpl_title)}else{k=""}i=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[k,n,this._tpl_close,c,this._item_count,h,m],i);if(this["_before_open_"+f]()===false){return false}b("#gritter-notice-wrapper").addClass(j).append(i);var o=b("#gritter-item-"+this._item_count);o.fadeIn(this.fade_in_speed,function(){a["_after_open_"+f](b(this))});if(!l){this._setFadeTimer(o,f)}b(o).bind("mouseenter mouseleave",function(p){if(p.type=="mouseenter"){if(!l){a._restoreItemIfFading(b(this),f)}}else{if(!l){a._setFadeTimer(b(this),f)}}a._hoverState(b(this),p.type)});b(o).find(".gritter-close").click(function(){a.removeSpecific(f,{},null,true);return false;});return f},_countRemoveWrapper:function(c,d,f){d.remove();this["_after_close_"+c](d,f);if(b(".gritter-item-wrapper").length==0){b("#gritter-notice-wrapper").remove()}},_fade:function(g,d,j,f){var j=j||{},i=(typeof(j.fade)!="undefined")?j.fade:true,c=j.speed||this.fade_out_speed,h=f;this["_before_close_"+d](g,h);if(f){g.unbind("mouseenter mouseleave")}if(i){g.animate({opacity:0},c,function(){g.animate({height:0},300,function(){a._countRemoveWrapper(d,g,h)})})}else{this._countRemoveWrapper(d,g)}},_hoverState:function(d,c){if(c=="mouseenter"){d.addClass("hover");d.find(".gritter-close").show()}else{d.removeClass("hover");d.find(".gritter-close").hide()}},removeSpecific:function(c,g,f,d){if(!f){var f=b("#gritter-item-"+c)}this._fade(f,c,g||{},d)},_restoreItemIfFading:function(d,c){clearTimeout(this["_int_id_"+c]);d.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in b.gritter.options){this[opt]=b.gritter.options[opt]}this._is_setup=1},_setFadeTimer:function(f,d){var c=(this._custom_timer)?this._custom_timer:this.time;this["_int_id_"+d]=setTimeout(function(){a._fade(f,d)},c)},stop:function(e){var c=(b.isFunction(e.before_close))?e.before_close:function(){};var f=(b.isFunction(e.after_close))?e.after_close:function(){};var d=b("#gritter-notice-wrapper");c(d);d.fadeOut(function(){b(this).remove();f()})},_str_replace:function(v,e,o,n){var k=0,h=0,t="",m="",g=0,q=0,l=[].concat(v),c=[].concat(e),u=o,d=c instanceof Array,p=u instanceof Array;u=[].concat(u);if(n){this.window[n]=0}for(k=0,g=u.length;k<g;k++){if(u[k]===""){continue}for(h=0,q=l.length;h<q;h++){t=u[k]+"";m=d?(c[h]!==undefined?c[h]:""):c[0];u[k]=(t).split(l[h]).join(m);if(n&&u[k]!==t){this.window[n]+=(t.length-u[k].length)/l[h].length}}}return p?u:u[0]},_verifyWrapper:function(){if(b("#gritter-notice-wrapper").length==0){b("body").append(this._tpl_wrap)}}}})(jQuery);
;
jQuery.extend({
    ListView: {
        Element: null,
        ViewContext: {},
        Actions: {},
        Headers: {},
        Properties: {},
        AjaxUrl: "/App/OnAction/",
        SheetUrl: "/Form/DefaultSheet/",

        ListViewDisplayMode: {
            /// 列表模式
            List: 0,
            /// 日历模式
            Calendar: 1,
            ///时间轴模式
            Timeline: 2
        },
        SortDirection: {
            /// <summary>
            /// 升序
            /// </summary>
            Ascending: 0,
            /// <summary>
            /// 降序
            /// </summary>
            Descending: 1,
            /// <summary>
            /// 未指定
            /// </summary>
            Unspecified: 2
        },
        BizObjectStatus:
        {
            /// 草稿，对于表单来说，用户点保存，表示是草稿状态；对于流程来说，审批完成前，都是草稿状态
            Draft: 0,
            /// 审批通过
            Effective: 1,
            /// 被取消
            Canceled: 3,
            /// 进行中
            Running: 2
        },
        Action_Create: "Create",
        SearchParamsJson: "searchParamsJson",
        ScopeType: "scopeType",
        ChildSchemaCode: "ChildSchemaCode",
        PagedByApplist: "PagedByApplist",
        ///流程表单的流程状态
        WorkflowState: null,
        Action_PrintQrCode: "PrintQrCode",
        ///是否能打印二维码
        CanPrintQrCode: false
    }
});

jQuery.extend($.ListView, {
    Init: function ($el, viewContext) {
        this.Element = $el;
        var that = this;
        var handle = function (viewContext) {
            if (!viewContext.Successful) {
                var errorMsg = "";
                for (var i = 0; i < viewContext.Errors.length; i++) {
                    errorMsg += viewContext.Errors[i] + "/n";
                }
                $.IShowError({ title: "提示", msg: "出错了", detail: errorMsg });
                return;
            }
            that.ViewContext = viewContext;
            that.Actions = that.ViewContext.Actions;
            that.Headers = that.ViewContext.Columns;
            that.QueryCode = that.ViewContext.SchemaCode;
            that.LoadScriptString(that.ViewContext.Javascript);
            that.InitQueryItems(that.ViewContext.QueryItems);
            that.InitActions(that.Actions);
            that.InitFilter();
            that.ShowChildSchemaCode = "";
            that.InitBody();
            var $divserch = $("#divSearch");
            $divserch.find("input").off('input').on('input', function () { keyType = 1; });
            $divserch.find("input[type!='checkbox']").change(function () { keyType = 1; });
            var $btnImport = $("#Import");
            if (!$.isEmptyObject($btnImport)) {
                $btnImport.unbind("click").bind("click", function () {
                    window.InitImport(mySchemaCode);
                })
            }
            var $btnExport = $("#Export");
            if (!$.isEmptyObject($btnExport)) {
                $btnExport.unbind("click").bind("click", function () {
                    window.InitExport(mySchemaCode);
                })
            }
        };

        if (viewContext.DebugTrack != null && viewContext.DebugTrack.DebugState == 0) {
            top.$.IPushDebugTrack(viewContext, that, handle);
        }
        else {
            handle(viewContext);
        }
    },

    //初始化过滤
    InitQueryItems: function (QueryItems) {
    },

    //初始化工具栏
    InitActions: function (Actions) {
        if (typeof (MobileCacheManager) != "undefined") {
            return;
        }
        var ActionPanelId = $.IGuid();
        this.$ActionPanel = $("<div>").attr("id", ActionPanelId).addClass("btn-toolbar").attr("role", "toolbar");
        var $BtnGroup = $("<div class='btn-group' role='group'>");
        var $MoreBtnGroup = $("<div class='btn-group more-button' role='group'>");
        var $MoreBtn = $("<button class='dropdown-toggle btn btn-default' data-toggle='dropdown'>更多操作</button>");
        var $MoreBtnUl = $("<ul class='dropdown-menu'>");
        if (!Actions) return;
        var actionNum = 0;
        var timeModeSupportActions = ["Create", "Import", "Export"];
        var currentMode = constName.ShowMode == "" ? this.ViewContext.DisplayMode : constName.ShowMode;
        for (var key in Actions) {
            //时间轴模式只显示"新增","导入","导出"
            if ($.inArray(key, timeModeSupportActions) == -1 && currentMode == $.ListView.ListViewDisplayMode.Timeline) {
                continue;
            }
            if (key == "PrintQrCode") { $.ListView.CanPrintQrCode = true; }

            //图标替换
            if (typeof (Actions[key].Icon) == "string") {
                if (Actions[key].Icon.trim() == "fa-qrcode") {
                    Actions[key].Icon = "icon-erweima"
                }
                else if (Actions[key].Icon.trim() == "fa-download") {
                    Actions[key].Icon = "icon-import2"
                }
                else if (Actions[key].Icon.trim() == "fa-upload") {
                    Actions[key].Icon = "icon-export2"
                }
                else if (Actions[key].Icon.trim() == "fa-times") {
                    Actions[key].Icon = "icon-remove2"
                }
                else if (Actions[key].Icon.trim() == "fa-plus") {
                    Actions[key].Icon = "icon-dian"
                } else if (Actions[key].Icon.trim() == "fa-print") {
                    Actions[key].Icon = "icon aufont icon-base-printer"
                }
            } else {
                Actions[key].Icon = "";
            }

            actionNum++;
            var $Button;
            if (actionNum > 5) {
                //添加更多按钮
                $MoreBtnUl.append('<li><a class="moreBtnA" id="' + key + '"><i class="fa ' + Actions[key].Icon + ' mr5"></i><span>' + $.htmlEncode(Actions[key].Text) + '</span></a></li>');
            } else {
                //直接显示的按钮
                $Button = $("<div>").addClass("btn btn-default")
                    .attr("id", key)
                    .append("<i class='fa " + Actions[key].Icon + " mr5'></i><span class='btnName'>" + "" + "</span>");
                $BtnGroup.append($Button);
                $Button.click(this, function (e) {
                    e.data.DoAction.apply(e.data, [$(this).attr("id")]);
                    e.stopPropagation();
                    $.HideAllPopup();
                    return false;
                });
            }
        }
        if (actionNum > 5) {
            $MoreBtnGroup.append($MoreBtn).append($MoreBtnUl);
            $BtnGroup.append($MoreBtnGroup);
        }
        $(this.Element).append(this.$ActionPanel.append($BtnGroup));
        $MoreBtnUl.on("click", "li>a", this, function (e) {
            var action = $(this).attr("id");
            if (action != "Import" && action != "Export") {
                e.data.DoAction.apply(e.data, [action]);
                e.stopPropagation();
                return false;
            }
        })
        $MoreBtn.click(function () {
            setTimeout(function () {
                if (!$(this).parent().hasClass('open')) {
                    var maxWidth = 0;
                    for (var i = 0; i < $('.moreBtnA').length; i++) {
                        if (maxWidth < $('.moreBtnA').eq(i).width()) {
                            maxWidth = $('.moreBtnA').eq(i).width();
                        }
                    }
                    if (maxWidth < 158) {
                        maxWidth = 148;
                    }
                    for (var i = 0; i < $('.moreBtnA').length; i++) {
                        $('.moreBtnA').eq(i).css('width', maxWidth + 10);
                    }
                }
            }, 300)
        });
        // 添加列表头部按钮多余字数提示
        $BtnGroup.children('.btn').hover(function () {
            var _btnTextLength = $(this).find('.btnName').text().replace(/[\u0391-\uFFE5]/g, "aa").length;
            if (_btnTextLength > 10) {
                $('.table-tip').text($(this).find('.btnName').text());
                $('.table-tip').css({
                    maxWidth: 148,
                    wordBreak: 'break-all',
                    left: $(this).offset().left,
                    top: $(this).offset().top - $('.table-tip').height() - 12,
                    bottom: 'inherit'
                })
                $('.table-tip').show();
            }
        }, function () {
            $('.table-tip').css({
                top: 'inherit'
            });
            $('.table-tip').text('');
            $('.table-tip').hide();
        });
    },

    InitFilter: function () {
        if (typeof (MobileCacheManager) != "undefined") {
            return;
        }
        $("#myfilter").hide();
        $("#divSearch").hide();
        $("#mychildschemacode").hide();
        this.$ActionPanel.append($("#myMode"));
        this.$ActionPanel.append($("#myfilter"));
        this.$ActionPanel.append($("#mychildschemacode"));

        if ($("#divSearch").length > 0) {
            $(this.Element).append($("#divSearch"));
            $(this.Element).append($("#myMore"));
            var $divserch = $("#divSearch").addClass("backgroundcolor");
            $("#divSearch").show();
            $("#myMore").show();
        }
        //模式切换
        $("#myMode").show();
        var DisplayMode = $("#toggleMode").val();
        //主表子表
        if (DisplayMode == ListViewDisplayMode.List) {
            if ($("#showchildschemacode").children("option").length > 1) {
                $("#mychildschemacode").show();
            }
        }
        //权限相关，我的，我部门的。。。
        if ($("#scopeType").children("option").length > 1) {
            $("#myfilter").show();
        }

        SetFilterToolTip();
        ////处理过滤条件filter-text
        //$("#ListView").find(".filter-text").off("mouseenter.filtertext").on("mouseenter.filtertext", function () {
        //    var clientWidth = this.clientWidth;
        //    var scrollWidth = this.scrollWidth;
        //    if (clientWidth < scrollWidth) {
        //        var $that = $(this);
        //        var tooltipText = this.innerText;
        //        var offset = $that.offset();
        //        $tableTip.text(tooltipText).css({
        //            left: offset.left + ($that.outerWidth() - $tableTip.outerWidth()) / 2 - $(window).scrollLeft() - 120,
        //            bottom: $(window).height() - offset.top + 6 + $(window).scrollTop() - 35
        //        }).toggle();
        //        return false;
        //    }
        //});

        //$("#ListView").find(".filter-text").off("mouseleave.filtertext").on("mouseleave.filtertext", function () {
        //    $tableTip && $tableTip.hide();
        //});
    },

    LoadScriptString: function (code) {
        if (code == null || code == "") return;
        var myScript = document.createElement("script");
        myScript.type = "text/javascript";
        try {
            myScript.appendChild(document.createTextNode(code));
        }
        catch (ex) {
            myScript.text = code;
        }
        document.body.appendChild(myScript);
    },

    // 统一初隐藏关联查询控件的列表区域
    ResetFilterComboboxListStyle: function () {
        var $myquerys = $(".mycomboboxlist");
        $(".mycomboboxlist").each(function () {
            var $this = $(this);
            $this.find("ul.drop-comboxlist").hide();
        })
    },

    //工具栏点击事件
    DoAction: function (ActionName) {
        var response = {};
        if ($.isFunction($.ListView.ActionPreDo)) {
            var preDoResult = $.ListView.ActionPreDo.apply(this, [ActionName, response]);
            if (preDoResult != void 0 && !preDoResult) {
                return;
            }
        }

        switch (ActionName) {
            case "Create":
                this.ResetFilterComboboxListStyle.apply();
                this.Create.apply(this, [response]);
                break;
            case "Remove":
                this.Remove.apply(this, [response]);
                break;
            case "PrintQrCode":
                this.PrintQrCode.apply(this, [response]);
                break;
            default:
                if (ActionName != void 0 && ActionName != "") {
                    var that = this;
                    var rows = this.GetSelected();
                    var ids = [];
                    if (rows && rows.length > 0) {
                        for (var i = 0, len = rows.length; i < len; i++) {
                            ids.push(rows[i].ObjectId);
                        }
                    }

                    var action = that.Actions[ActionName];
                    //批量打印操作
                    if (action && action.IsPrintAction) {
                        this.DiyMultiPrint.apply(this, [action.PrintTemplateCode, ids]);
                    }
                    else {
                        $('#' + ActionName).attr('disabled', 'true');
                        that.Post(ActionName,
                            $.extend({ QueryCode: that.QueryCode, ObjectIds: JSON.stringify(ids) }, response),
                            function (result) {
                                if (result.Successful) {
                                    that.RefreshView.apply(that);
                                    setTimeout(function () {
                                        $('#' + ActionName).removeAttr('disabled');
                                    },500)
                                  
                                }
                                else {
                                    //当有返回错误提示信息时，优先显示提示信息
                                    if (result.Errors.length > 0) {
                                        $.IShowError(result.Errors[0]);
                                    }
                                    else {
                                        $.IShowError("失败!");
                                    }
                                }

                                if (result.Message != null && result.Message.length > 0) {
                                    $.IShowTip(result.Message);
                                }
                            });
                    }
                }
                break;
        }
    },

    Create: function (response) {
        var sheetUrl = this.SheetUrl + "?SchemaCode=" + this.QueryCode;
        top.$.ISideModal.Show(sheetUrl, $.htmlEncode(this.ViewContext.DisplayName), response, null, null, null, self);
    },

    Remove: function (response) {
        var that = this;
        if (!this.ViewContext.Selectable) {
            $.IShowWarn("提示", "请联系管理员，开启批量选择");
            return;
        }
        var Rows = this.GetSelected();
        if (Rows.length == 0) {
            $.IShowWarn("提示", "没有选中任何行");
            return;
        }
        $.IConfirm("提示", "<span>选中" + Rows.length + "行数据,删除后将无法恢复,确定删除?</span>", function (isTrue) {
            if (isTrue) {
                var ids = Array();
                for (var i = 0; i < Rows.length; i++) {
                    ids.push(Rows[i].ObjectId);
                }

                //that.TimeOut = setTimeout(function () {
                //    that.ShowHappyLoading();
                //}, 1500);
                that.Post(
                    "Remove",
                    $.extend({ QueryCode: that.QueryCode, ObjectIds: JSON.stringify(ids) }, response),
                    function (result) {
                        //that.HideHappyLoading();
                        //that.TimeOut && window.clearTimeout(that.TimeOut);

                        if (result.Successful) {
                            that.RefreshView.apply(that);
                            var message = "";
                            if (result.ReturnData && result.ReturnData.FailCount > 0) {
                                message = "删除" + result.ReturnData.FailCount +"个表单失败：它们是流程表单或者被其他表单引用了！";
                                $.IShowWarn(message);
                            }
                        }
                        else {
                            if (result.Refresh) {
                                that.RefreshView.apply(that);
                            }
                            var message = "删除失败!";
                            if (result.Errors && result.Errors.length > 0) {
                                message = result.Errors[0];
                            }
                            $.IShowWarn(message);
                        }
                    });
            }
        });
    },

    ShowHappyLoading: function () {
        var random = Math.floor(Math.random() * 2);
        var infos = ["系统正在玩命儿执行您的旨意", "阿里云正在计算那些无法计算的价值"];
        $("#modal_loading .loading-info").text(infos[random]);
        var cls = ["cutie", "bugme", "wastelife"];
        random = Math.floor(Math.random() * 3);
        $("#modal_loading .loading-image").addClass(cls[random]);

        this.loadingModal = new $.IModal({
            Title: '配置向导',
            Height: '400px',
            Width: '400px',
            Type: 0,
            Class: 'modal_loading_dialog',
            ShowHeader: false,
            ShowFooter: false,
            Content: $('#modal_loading'),
            OnShowCallback: function () {
                var timeSpan = $("#modal_loading .loading-time>span");
                var time = 0;
                setInterval(function () {
                    timeSpan.text(++time);
                    if (time % 5 == 0) {
                        var $img = $("#modal_loading .loading-image");
                        for (var i = 0; i < cls.length; i++) {
                            if ($img.hasClass(cls[i])) {
                                $img.removeClass(cls[i]);
                                if (i == cls.length - 1) {
                                    i = -1;
                                }
                                $img.addClass(cls[i + 1]);
                                break;
                            }
                        }
                    }
                }, 1000);
            },
            OnHiddenCallback: function () { }
        });
    },
    HideHappyLoading: function () {
        if (this.loadingModal) {
            this.loadingModal.hide();
        }
    },

    PrintQrCode: function (response) {
        var that = this;
        if (!this.ViewContext.Selectable) {
            $.IShowWarn("提示", "请联系管理员，开启批量选择");
            return;
        }
        var Rows = this.GetSelected();
        if (Rows.length == 0) {
            $.IShowWarn("提示", "没有选中任何行");
            return;
        }
        if (Rows.length > 50) {
            $.IShowWarn("提示", "打印二维码个数请一次不要超过50个");
            return;
        }
        var ids = Array();
        for (var i = 0; i < Rows.length; i++) {
            ids.push(Rows[i].ObjectId);
        }
        var dataUrl = "/Form/OnAction";
        ////生成二维码页面内容
        var $contentContainer = $("<div></div>")
        var $newContent = $('<div class="container-fluid sheet_container" style="padding-left:20;padding-right:0;margin-top:15px;">');//新的容器
        $contentContainer.append($newContent);
        //
        var isTest = false;

        var paramData = { ActionName: "GetBizObjectsForQrCode", SchemaCode: that.QueryCode, ObjectIds: ids.join(";") }
        var row;
        var title = "";
        $.ajax({
            type: "POST",
            url: dataUrl,
            data: { PostData: JSON.stringify(paramData) },
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.Successful) {
                    if (data && data.ReturnData.Items.length > 0) {
                        title = data.ReturnData.Items[0].Title;
                        $.each(data.ReturnData.Items, function (index, item) {
                            var bizObjectId = item.ObjectId;
                            var schemaCode = item.SchemaCode;
                            var name = item.Name;
                            if (name == undefined || name == null) {
                                name = "";
                            }
                            var summary = item.Summary;
                            var hostAddress = item.HostAddress;
                            // isTest = item.IsTest;
                            var corpId = item.CorpId;
                            var agentId = item.AgentId;
                            var isISV = item.IsISV;
                            var suiteKey = item.SuiteKey;
                            var enableAssociation = item.EnableAssociation;
                            var sheetUrl = hostAddress + "/Mobile/?";
                            sheetUrl += 'CorpId=' + corpId + '&sc=' + schemaCode + '&bo=' + bizObjectId + '&mt=Task';
                            if (suiteKey) {
                                sheetUrl += '&IsIsv=1&sk=' + suiteKey;
                            } else {
                                sheetUrl += '&ai=' + agentId;
                            }
                            if (enableAssociation == "1") {
                                sheetUrl += '&ao=1';
                            }
                            //获取短链地址
                            $.ajax({
                                type: "POST",
                                url: "/Form/OnAction",
                                data: { PostData: JSON.stringify({ActionName:'GetShortUrl', OriginalUrl: sheetUrl}) },
                                dataType: "json",
                                async: false,
                                success: function (data) {
                                    sheetUrl = data.ReturnData.ShortUrl;
                                }
                            });

                            if ((index + 1) % 15 == 0) {
                                var pagebreak = $("<div style='page-break-after:always;'></div>");
                                $newContent.append(pagebreak);
                                var pageMargin = $('<div style="height:80px" class="noprint"></div>');
                                $newContent.append(pageMargin);
                            }

                            if (index == 0) {
                                var pageMargin = $('<div style="height:80px"></div>');
                                $newContent.append(pageMargin);
                            }
                            if (index % 3 == 0) {
                                row = $('<div class="row sheet-control form-group"></div>');
                                $newContent.append(row);
                            }

                            //name显示不超过30个字符
                            if (name == undefined) {
                                name = "";
                            }
                            if (name.length > 30) {
                                name = name.substr(0, 30);
                            }
                            row.append('<div class="col-sm-4 col-xs-4 col-md-4"><div class="row"><div class ="col-sm-4 col-xs-4 col-md-4" style="padding:5" ><p style="word-wrap:break-word;margin-left:10px;">' + name + '</p></div><div class ="col-sm-8 col-xs-8 col-md-8 qrCodeContainer" style="padding:5px;" data-url="' + sheetUrl + '" ></div></div>');
                        })
                    }

                    var printWindow = window.parent.open('/Form/Print/');

                    var userAgent = navigator.userAgent;
                    var isIE = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Edge") > -1
                        || (userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv") > -1);

                    printWindow.document.write('<link href="/Content/bootstrap.min.css" rel="stylesheet">');
                    printWindow.document.write('<link href="/Content/print.css" rel="stylesheet">');
                    printWindow.document.write('<script src="../../Scripts/jquery-1.10.2.min.js"></script>');
                    printWindow.document.write('<script src="../../Scripts/plugins/qrCode/jquery.qrcode.min.js"></script>');

                    if (isIE) {
                        printWindow.document.write('<link href="../../Scripts/Plugins/jquery-print-preview/css/print-preview.css" rel="stylesheet" />');
                        printWindow.document.write('<script src="../../Scripts/plugins/jquery-print-preview/jquery.print-preview.js"></script>');
                    }

                    printWindow.document.write($contentContainer.html());
                    printWindow.document.write('<title>' + title + '</title>');

                    if (isIE) {
                        printWindow.document.write('<script>$("div.qrCodeContainer").each(function(){var qrCodeUrl = $(this).attr("data-url");$(this).qrcode({width:150,height:150,text:qrCodeUrl});});setTimeout(function(){$.printPreview.loadPrintPreview();},100)</script>');
                    } else {
                        printWindow.document.write('<script>$("div.qrCodeContainer").each(function(){var qrCodeUrl = $(this).attr("data-url");$(this).qrcode({width:150,height:150,text:qrCodeUrl});});</script>');
                        printWindow.document.write('<script>setTimeout(function(){window.print();},50)</script>');
                        if (userAgent.indexOf('Firefox') > -1) {
                            printWindow.print();
                        }
                        //关闭打印页面（不管是点击“打印”还是“取消”，点击后2s自动关闭打印页面）
                        //需要注意页面关闭后打印是否继续？如果window关闭了仍然可以打印则可以将关闭页面时间缩短
                        var close = '<script>setTimeout("window.close()",100)</script>';
                        printWindow.document.write(close);
                    }

                    return;
                }
            },
            error: function (err) { }
        });
        return;
    },

    DiyMultiPrint: function (printTemplateCode, ids) {
        var that = this;
        if (!this.ViewContext.Selectable) {
            $.IShowWarn("提示", "请联系管理员，开启批量选择");
            return;
        }

        if (!printTemplateCode) {
            $.IShowWarn("提示", "打印模板编码错误");
            return;
        }

        if (!ids || ids.length == 0) {
            $.IShowWarn("提示", "没有选中任何行");
            return;
        }

        var schemaCode = this.QueryCode;
        var actionGuid = $.IGuid();
        $('.more-button').removeClass('open');
        $('.multiPrint-progress').remove();
        var multiProgressHtml = '<div class="multiPrint-progress"><p class="multiPrint-progress-title">正在读取，请稍等...</p><div id="multiProcess"><div class="progress-bar"><div class="progress-bar-outer"><div class="progress-bar-inner"></div></div></div><span class="multiPercent">40%</span></div></div>';
        $('body').append(multiProgressHtml);
        $('#multiProcess').find('.progress-bar-inner').css({
            width: '0%'
        });
        $('#multiProcess').find('.multiPercent').text('0%');
        this.InitBaseData.apply(this, [schemaCode, actionGuid, printTemplateCode, ids]);
    },

    InitBaseData: function (schemaCode, actionGuid, printTemplateCode, bizObjectIdArray) {
        var that = this;
        var datas = {};
        datas["ActionName"] = "Print";
        datas["SchemaCode"] = schemaCode;
        datas["ActionGuid"] = actionGuid;
        datas["PrintTemplateCode"] = printTemplateCode;
        datas["BizObjectIdArray"] = bizObjectIdArray;
        $.ajax({
            data: { PostData: JSON.stringify(datas) },
            datatype: 'json',
            type: 'POST',
            url: '/Print/OnAction',
            async: true,
            success: function (result) {
                var success = result.Successful;
                if (success) {
                    that.GetPrintProgress(schemaCode, actionGuid, printTemplateCode);
                }
                else {
                    that.multiErrorTip();
                    that.ClearAction(schemaCode, actionGuid, printTemplateCode);
                    $.IShowWarn("提示", "打印错误：" + result.ErrorMessage);
                    return;
                }
            },
            error: function (err) {
                that.multiErrorTip();
            }
        });
    },
    // 获取打印的进度
    GetPrintProgress: function(schemaCode,actionGuid,printTemplateCode) {
      var that = this;
      var datas = {};
      datas["ActionName"] = "GetPrintProgress";
      datas["SchemaCode"] = schemaCode;
      datas["ActionGuid"] = actionGuid;
      datas["PrintTemplateCode"] = printTemplateCode;
      $.ajax({
        data: { PostData: JSON.stringify(datas) },
        datatype: 'json',
        type: 'POST',
        url: '/Print/OnAction',
        async: true,
        success: function (result) {
          var success = result.Successful;
          if (success) {
            if (result.ReturnData.PrintState > 0) {
              var printProgress = result.ReturnData.PrintProcess;
              $('#multiProcess').find('.progress-bar-inner').css({
                width: printProgress + '%',
              });
              $('#multiProcess').find('.multiPercent').text(printProgress + '%');
              $('.multiPrint-progress-title').text('打印模版正在生成PDF…');
              setTimeout(function() {
                if (printProgress === 100) {
                  // var tempwindow = window.open();
                    var pdfUrl = result.ReturnData.OSSUrl;
                    pdfUrl = pdfUrl.replace('http', 'https');
                    that.PreviewPdf(pdfUrl + '&isDownLoad=' + result.ReturnData.IsDownload);
                  that.ClearAction(schemaCode, actionGuid, printTemplateCode);
                } else {
                  that.GetPrintProgress(schemaCode, actionGuid, printTemplateCode);
                }
              }, 1000);
            } else if (result.ReturnData.PrintState === -1) {
              that.multiErrorTip();
              that.ClearAction(schemaCode, actionGuid, printTemplateCode);
              return;
            } else {
              setTimeout(function() {
                that.GetPrintProgress(schemaCode, actionGuid, printTemplateCode);
              }, 1000);
            }
          } else {
              that.multiErrorTip();
              that.ClearAction(schemaCode, actionGuid, printTemplateCode);
              $.IShowWarn("提示", "打印错误：" + result.ErrorMessage);
              return;
          }
        },
        error: function(err){
            that.multiErrorTip();
        }
      });
    },
    multiErrorTip: function () {
        $('.multiPrint-progress').append('<span class="multiProgressClose"><i class="icon aufont icon-base-close"></i></span>');
        $('#multiProcess').find('.progress-bar-inner').css({
            background: '#F5222D',
        });
        $('#multiProcess').find('.multiPercent').css({
            color: '#F5222D',
        });
        $('.multiPrint-progress').find('.multiPrint-progress-title').text('打印模版生成PDF出错，请重新操作');
        $('.multiProgressClose').click(function () {
            $('.multiPrint-progress').remove();
        });
    },
    GetStream: function (schemaCode, actionGuid, printTemplateCode) {
        var that = this;
        var datas = {};
        datas["ActionName"] = "GetStream";
        datas["SchemaCode"] = schemaCode;
        datas["ActionGuid"] = actionGuid;
        datas["PrintTemplateCode"] = printTemplateCode;
        var form = $('form.export-hide-form');
        var input = form.find('input');
        if (!form.length) {
            form = $("<form class='export-hide-form'></form>"); //定义一个form表单
            form.attr("style", "display:none");
            form.attr("target", "");
            form.attr("method", "post");
            form.attr("action", "/Print/OnAction");
            var input = $("<input>");
            input.attr("type", "hidden");
            input.attr("name", "PostData");
            input.attr("value", JSON.stringify(datas));
            $("body").append(form);//将表单放置在web中
            form.append(input);
        } else {
            input.attr("value", JSON.stringify(datas));
        }
        form.submit();
        form.remove();
        $('#multiProcess').find('.progress-bar-inner').css({
            width: '100%',
        });
        $('#multiProcess').find('.multiPercent').text('100%').html('<i class="icon aufont icon-base-check-circle"></i>');
        $('#multiProcess').find('.progress-bar-inner').css({
            background: '#52C41A',
        });
        $('.multiPrint-progress').find('.multiPrint-progress-title').text('打印模版已生成PDF！');
        setTimeout(function () {
            $('.multiPrint-progress').remove();
        }, 4000);
    },
    // 预览pdf
    PreviewPdf: function(pdfUrl) {
      $('#multiProcess').find('.multiPercent').text('100%').html('<i class="icon aufont icon-base-check-circle"></i>');
      $('#multiProcess').find('.progress-bar-inner').css({
          background: '#52C41A',
      });
      $('.multiPrint-progress').find('.multiPrint-progress-title').text('打印模版已生成PDF！');
      setTimeout(function () {
          $('.multiPrint-progress').remove();
      }, 4000);
      var pdfHtml = '';
      pdfHtml += '<div id="previewPdfMain" style="display:none"><div class="lightbox-gms" id="lightboxGms"></div>';
      pdfHtml += '<div id="popGms" class="pop-gms">'
      pdfHtml += '<a href="javascript:;" class="close-previewPdf" id="closePreviewPdf"><i class="icon aufont icon-base-close"></i></a>';
      pdfHtml += '<iframe src="" frameborder="0" id="pdfContainer" class="pdfContainer-gms" name="pdfContainer"></iframe></div>';
      pdfHtml += '<a href="/Scripts/Plugins/pdfjs/web/viewer.html?file=' + pdfUrl + '" target="pdfContainer" id="previewPdfLink"></a></div>'
      $('body').append(pdfHtml);
      localStorage.removeItem('pdfUrlStore');
      localStorage.setItem('pdfUrlStore', pdfUrl);
      document.getElementById('previewPdfLink').click();
      $('#previewPdfMain').show();
      $('#closePreviewPdf').click(function () {
        $('#previewPdfMain').remove();
      });
      // 预览引导
      if (!localStorage.getItem("hasPreviewGuidePc")) {
          this.PreviewPdfGuide();
      }
    },
    ClearAction: function (schemaCode, actionGuid, printTemplateCode) {
      var datas = {};
      datas["ActionName"] = "ClearAction";
      datas["SchemaCode"] = schemaCode;
      datas["ActionGuid"] = actionGuid;
      datas["PrintTemplateCode"] = printTemplateCode;
      $.ajax({
          data: { PostData: JSON.stringify(datas) },
          datatype: 'json',
          type: 'POST',
          url: '/Print/OnAction',
          async: true,
          success: function (result) {
              
          }
      });
     },

    InitBody: function () { },

    GetSelected: function () {
        return [];
    },

    RefreshView: function () {
    },

    RefreshViewIncludeHeader: function () {
    },

    GetResetHeight: function () {
        try {
            var bodyHeight = $(window).height() - $(this.$Table.parent()).offset().top - 40;
            $(this.$Table.parent()).height(bodyHeight);
        } catch (e) { }
    },

    DebugLog: function (logs) {
        if (logs != null) {
            for (var i = 0; i < logs.length; i++) {
                console.log(logs[i]);
            }
        }
    },

    Post: function (action, data, callback, errorhandler) {
        var that = this;
        var paramData = $.extend({ Command: action, ActionName: "DoAction", QueryCode: this.QueryCode }, data);
        $.ajax({
            type: "POST",
            url: this.AjaxUrl,
            data: { PostData: JSON.stringify(paramData) },
            dataType: "json",
            success: function (res) {
                if (res.Successful) {
                    data = res.ReturnData.Response;
                    that.DebugLog(data.DebugLogs);
                    var handle = function (d) {
                        if ($.isFunction(callback)) {
                            callback.apply(this, [d]);
                        }
                    };

                    //Debugging = 0,
                    //Exceptional = 1,
                    //Finished = 2
                    if (data.DebugTrack != null && data.DebugTrack.DebugState == 0) {
                        $.IPushDebugTrack(data, that, handle);
                    }
                    else {
                        handle(data);
                    }
                } else {
                  $.IShowWarn("提示", res.ErrorMessage);
                  that.RefreshView.apply(that);
                }
            },
            error: errorhandler
        });
    },
    PreviewPdfGuide: function () {
        var pdfGuideHtml = '<div class="previewPdf-guide-modal" style="z-index:1000003">';
        pdfGuideHtml += '<div class="previewPdf-guide" id="previewPdfGuide"><div class="guide-one-tip">';
         pdfGuideHtml += '<p id="guideTipShow">1、这里可以<span>下载</span>和<span>打印</span></p></div>';
         pdfGuideHtml += '<img src="/Content/images/exportGuide/Combined-Shape@2x.png" class="guide-img"><div class="area-active guide-show guideShow"></div></div>';
         pdfGuideHtml += '<div class="guide-btn" id="guideBtn"><a class="next-btn nextStep" i="1">下一步</a><a class="next-btn out-btn nextStep" i="3">退出引导</a></div></div>';        
         $("body").append(pdfGuideHtml);
         $(document).on("click", '.nextStep', function () {
             var i = $(this).attr("i");
             if (i == 1) {
                 $('#previewPdfGuide').addClass('previewPdf-guide-two');
                 $('#guideTipShow').html('<p id="guideTipShow">1、这里可以<span>放大</span>和<span>缩小</span></p>');
                 $("#guideBtn").html('<a class="next-btn nextStep" i="2">下一步</a><a class="next-btn out-btn nextStep" i="3">退出引导</a>');
             } else if (i == 2){
                 $('#previewPdfGuide').addClass('previewPdf-guide-three');
                 $('#guideTipShow').html('<p>3、这里可以打开<span>侧栏</span>、<span>搜索</span>以及<span>切换页面</span></p>');
                 $("#guideBtn").html('<a class="next-btn nextStep" i="3">知道了</a>');
                 $("#guideBtn").css({
                     "textAlign": "center"
                 })
             } else if (i == 3) {
                 $('.previewPdf-guide-modal').remove();
             }
         })
         localStorage.setItem("hasPreviewGuidePc", true);
    },
});;

(function () {
    var ModImportFirstContentResult;
    var ModImportFirst;
    var ModImportSecondContentResult;
    var ModImportSecond;
    var ModImportThirdContentResult;
    var ModImportThird;
    var ModImportFourthContentResult;
    var ModImportFourth;
    var ImportFileType = ''; //文件后缀名
    var ImportGuid;
    var ImportInterval;

    var ModExportFirstContentResult;
    var ModExportFirst;
    var ModExportSecondContentResult;
    var ModExportSecond;
    var SelectListLen;
    var SelectListObject = [];
    var ExportDataType;

    var ImportExportProcess = 0;
    //上传文件时的配置
    var option = {
        success: HandelSuccess,
        error: HandelError,
        url: '/ExcelImport/OnAction',
        type: 'post',
        uploadProgress: function (event, position, total, percentComplete) {
            $('#process1 .progress-bar').addClass('progress-bar-ing');
            $('#process .progress-bar-inner').css('width', percentComplete + '%');
            $('#processtext1').html('<div style="padding-top:1.5px;">文件上传(' + percentComplete + '%)</div>');
            if (percentComplete == 100) {
                $('#process1 .progress-bar')
                    .removeClass('progress-bar-ing')
                    .addClass('progress-bar-ok');
                $('#processtext1').html('<div style="padding-top:1.5px;">文件上传(完成)</div>').css('color', 'rgba(0,0,0,.45)');
                $('#processtext1').prepend("<span class='ok'></span>");
            }
        }
    };
    var ExportGuid = '';
    var $topbody = $(top.document.body);

    //导入
    var mod1;
    var modselect2;
    var mod2;
    var mod3;
    var mod4;
    //导出
    var mod5;

    var modMini; //迷你modal
    var modFull; //全屏modal，只针对在线编辑
    var $tableTip = $('.table-tip'); //tip框
    var ImportListExcelRow; //在线修改时的错误对象
    var HasSeqNo = false;
    var IsUpdate = false;  //新增 or更新导入
    var IsWorkflow = true;//是否为流程表单
    var SchemaCode = '';   // 应用id
    var AppName = '';      // 应用name
    var importTitle = '';//导入方式name
    var importErrorClass = 'import-alert aufont icon-base-close-circle';
    var importMoadlClass = ' import-export-modal import-modal';
    var closeTipText = '关闭对话框';      //关闭按钮 hover 提示文字
    var nextTipText = '请先选择文件';       //下一步按钮 hover 提示文字
    var MatchField;   //默认匹配为数据标题
    var IsInform;
    var ImportErrorNum = 0;  //错误项个数，标识是否可以进行下一步，只计算下拉关联子段和关联字段
    var switchMode;//导入方式切换回调
    var importProcessFlag = false;//是否开始导入
    // TODO 导入、导出在终止、完成后要清楚缓存（包括页面关闭，刷新）
    /**
     * 导入
     */
    //导入入口
    var internetInterval;//断网判断
    var templateInterval;//模板校验
    var dataQuantityInterval;//数据量校验
    //防止快速上传文件
    var canUpLoad = true;
    function InitImport(Code) {
        if (modMini) {
            showImportError('系统正在导入或导出数据，请导入或导出完成后再点击');
            return false;
        }
        IsInform = false;
        ImportGuid = '';
        IsUpdate = false;
        SchemaCode = Code;
        ImportExportProcess = 0;
        ImportErrorNum = 0;
        closeTipText = '关闭对话框';
        nextTipText = '请先选择文件';
        importTitle = '新增导入';
        try {
            var index = window.document.title.indexOf('-') + 1;
            AppName = window.document.title.slice(index).trim();
            if (AppName.length > 15) {
                AppName = AppName.slice(0, 15) + '...';
            }
        } catch (e) { }

        var columnType = '0'; //0:导入;1:导出;
        var datas = {};
        datas['SchemaCode'] = Code;
        datas['ActionName'] = 'GetSchemaSeqNoAndName';
        datas['IsUpdate'] = 'true';
        datas = { PostData: JSON.stringify(datas) };
        $.ajax({
            data: datas,
            datatype: 'json',
            type: 'POST',
            url: '/ExcelImport/OnAction',
            async: true,
            success: function (result) {
                if (result.Successful) {
                    var data = result.ReturnData.Result;
                    HasSeqNo = data.HasSeqNo;
                    if (HasSeqNo) {
                        MatchField = 'SeqNo';
                    } else {
                        MatchField = 'Name';
                    }
                    IsWorkflow = data.IsWorkflow;
                    ModImportFirstContentResult = ModImportFirstContent(Code);
                    ModImportFirstBuild(Code);
                    //导入方式切换
                    switchMode = function (e) {
                        ImportOver();
                        nextTipText = '请先选择文件';
                        mod1.find('.myuploada span').html('选择文件');
                        var target = $(e.target);
                        var $importdownload = mod1.find('.importdownload');
                        var $upLoadForm = mod1.find('#upLoadForm');
                        ModImportFirstReInit();
                        mod1.find('.chooseimport').removeClass('choosed');
                        target.addClass('choosed');
                        mod1.find('.modal-header .modal-title .title').html(target.text());
                        if (target.attr('target') == '#updateImport') {
                            $importdownload.hide();
                            $upLoadForm.css('height', '28px');
                        } else {
                            $importdownload.show();
                            $upLoadForm.css('height', '0');
                        }
                        target.parent().nextAll('.choosedbody').each(function () {
                            $(this).addClass('hidebody');
                        });
                        $(target.attr('target')).removeClass('hidebody');
                        if (target.attr('target').indexOf('add') > 0) {
                            IsUpdate = false;
                            importTitle = '新增导入';
                            mod1.find('.notUpdate').css('display', 'block');
                            mod1.find('.selectMatch').css('display', 'none');
                            mod1.find('.chooseExcel').html('三、请选择要上传的Excel文件');
                        } else {
                            IsUpdate = true;
                            importTitle = '更新导入';
                            mod1.find('.notUpdate').css('display', 'none');
                            if (HasSeqNo) {
                                mod1.find('.selectMatch').css('display', 'block');
                                mod1.find('.chooseExcel').html('三、请选择要上传的Excel文件');

                            } else {
                                mod1.find('.chooseExcel').html('二、请选择要上传的Excel文件');
                            }
                        }
                        //删除已选择文件
                        var file = mod1.find('#fileNameUpload')[0];
                        var ie = navigator.appVersion.indexOf('MSIE') != -1;
                        if (ie) {
                            var file2 = file.cloneNode(false);
                            file2.onchange = file.onchange;
                            file.parentNode.replaceChild(file2, file);
                        } else {
                            $(file).val('');
                        }
                        mod1.find('#myfilename').html('');
                    }
                } else {
                    writeErrorMsg('GetSchemaSeqNoAndName 接口');
                    showImportError(result.ErrorMessage);
                }
            }
        });
        $(document).unbind('keydown.import').bind('keydown.import', function (e) {
            if (ImportGuid) {
                e = e || window.event;
                var currKey = 0;
                currKey = e.keyCode || e.which || e.charCode;
                if (currKey === 116) {
                    ImportOver();
                    window.location.reload();
                }
            }
        })
    }
    //上传文件 --支持IE浏览器
    function fileSelectedNew() {
        var file = null;
        var name = null;
        var size = 0;

        var unit = 'k';
        if (!(window.File && window.FileList && window.Blob)) {
            file = mod1.find('#fileNameUpload')[0];
            if ($.isEmptyObject(file)) {
                //showImportError('请选择文件');
                return false;
            }
            name = file.value;
            name = name.substring(name.lastIndexOf('\\') + 1, name.length);
        } else {
            file = mod1.find('#fileNameUpload')[0].files[0];
            if ($.isEmptyObject(file)) {
                //showImportError('请选择文件');
                return false;
            }
            name = file.name;
        }

        closeTipText = '关闭对话框将终止上传';
        nextTipText = '等待上传...';

        var arrays = name.split('.');
        ImportFileType = arrays[arrays.length - 1];
        if (ImportFileType != 'xls' && ImportFileType != 'xlsx') {
            showImportError('文件格式错误,请上传.xls或.xlsx文件');
            return false;
        }
        size = Math.ceil(file.size / 1024);  //kb

        if (size > 1024) {
            size = Math.ceil(size / 1024);
            unit = 'm';
        }
        if (name.length > 40) {
            var name1 = name.substring(0, 25);
            var name2 = name.substring(name.length - 10);
            name = name1 + ' ... ' + name2;
        }

        name += '&nbsp; &nbsp; &nbsp; &nbsp;' + size + unit;  //kb
        ImportGuid = $.IGuid();

        canUpLoad = false;
        mod1.find('#upLoadForm .myuploada').addClass('btn_disabled');
        var postDataJson = {
            ActionName: 'CheckDataRequired',
            SchemaCode: SchemaCode,
            FileType: ImportFileType,
            ImportGuid: ImportGuid,
            IsUpdate: IsUpdate,
            ImportOption: mod1.find('[name="state"]:checked').val(),
            Type: MatchField,
        };
        option['data'] = {};
        option['data']['PostData'] = JSON.stringify(postDataJson);
        // 上传文件
        mod1.find('.importbody .importdownload').css('padding-bottom', '0px');
        mod1.find('#myfilename').html(name);
        mod1.find('.myuploada span').html('更新文件');
        mod1.find('#process').removeClass('hideprocess');
        //滚动到最底部
        var addImportbody = document.getElementsByClassName('addImportbody')[0];
        addImportbody.scrollTop = addImportbody.scrollHeight - addImportbody.clientHeight;
        mod1.find('#upLoadForm').ajaxSubmit(option);
    }
    //上传成功后的回调函数 --两步 1、模板校验  2、数据量校验
    function HandelSuccess(JsonResult) {
        canUpLoad = true;
        mod1.find('#upLoadForm .myuploada').removeClass('btn_disabled');
        if (!ImportGuid) {
            return;
        }
        var state = JsonResult.Successful;
        var maxProcess = state ? 100 : getRandom(10, 90);
        $('#process2').find('.progress-bar-inner').width(0);
        $('#process3').find('.progress-bar-inner').width(0);
        CheckResultOne($('#process2'), state, maxProcess, $('#processtext2'));
        if (state) {
            // 进行数据量校验 ---- 确保进度条100% 再执行下一步
            setTimeout(function () {
                clearInterval(templateInterval);
                templateInterval = setInterval(function () {
                    if (!ImportGuid) {
                        clearInterval(templateInterval);
                        return;
                    }
                    var TemplateOK = $('#processtext2').text().indexOf('完成') > -1,
                        DataQuantityOK = $('#process3 .progress-bar-inner').width() > 0;
                    if (TemplateOK) {
                        clearInterval(templateInterval);
                        if (!DataQuantityOK) {
                            CheckExcelEmpty(SchemaCode);
                        }
                    }
                }, 100);
            }, maxProcess * 10);
        } else {
            closeTipText = '关闭对话框';
            showImportError(JsonResult.ErrorMessage);
        }
    }
    //上传失败后的回调函数
    function HandelError(error) {
        canUpLoad = true;
        mod1.find('#upLoadForm .myuploada').removeClass('btn_disabled');
        if (error.status == 0) {
            showImportError('上传失败，网络错误');
        } else {
            showImportError('文件可能已损坏，无法上传！');
        }
        var obj = $('#process1');
        obj
            .find('.progress-bar')
            .removeClass('progress-bar-ing')
            .addClass('progress-bar-error');
        $(obj.attr('target')).html('<div style="padding-top:1.5px;">文件上传(错误)</div>');
        $(obj.attr('target')).prepend("<span class='no'></span>");
    }
    //导入附件数据量校验
    function CheckExcelEmpty(schemaCode) {
        if (!ImportGuid) {
            return;
        }
        var postDataJson = {
            ActionName: 'CheckExcelEmpty',
            SchemaCode: schemaCode,
            ImportGuid: ImportGuid
        };
        $.ajax({
            data: { PostData: JSON.stringify(postDataJson) },
            url: '/ExcelImport/OnAction',
            type: 'post',
            success: function (data) {
                var state = data.Successful;
                var maxProcess = state ? 100 : getRandom(10, 90);
                CheckResultOne($('#process3'), state, maxProcess, $('#processtext3'));
                setTimeout(function () {
                    clearInterval(dataQuantityInterval);
                    dataQuantityInterval = setInterval(function () {
                        if (!ImportGuid) {
                            clearInterval(dataQuantityInterval);
                        }
                        if (state) {
                            var DataQuantityOK = false;
                            if ($('#processtext3').text().indexOf('完成') > -1) {
                                DataQuantityOK = true;
                            }
                            if (DataQuantityOK) { //解锁下一步按钮
                                clearInterval(dataQuantityInterval);
                                if (ImportGuid) {
                                    mod1.find(".modal-footer .btn_disabled").removeClass("btn_disabled").addClass("btn_ok");
                                }
                            }
                        } else {
                            clearInterval(dataQuantityInterval);
                            writeErrorMsg('CheckExcelEmpty 接口');
                            ImportGuid && showImportError(data.ErrorMessage);
                        }
                    }, 100);
                    closeTipText = '关闭对话框';
                }, maxProcess * 10);
            },
            error: function () {
                var maxProcess = getRandom(10, 90);
                var state = false;
                CheckResultOne($('#process3'), state, maxProcess, $('#processtext3'));
            }
        });
    }
    //导入第一步校验结果处理 --进度条
    function CheckResultOne(obj, state, maxProcess, textobj) {
        var value = 0;
        var that = this;
        var descDom = $($(obj).attr('target'));
        var desc = descDom.attr('title');
        var stateclass = state ? 'progress-bar-ok' : 'progress-bar-error';
        var stateicon = state ? 'ok' : 'no';
        $(obj).find('.progress-bar-inner').width(0);
        $(obj).find('.progress-bar')
            .removeClass('progress-bar-ok')
            .removeClass('progress-bar-error')
            .addClass('progress-bar-ing');
        clearInterval(ImportInterval);
        ImportInterval = setInterval(function () {
            if (!ImportGuid) {
                closeTipText = '关闭对话框';
                clearInterval(ImportInterval);
            }
            value += 2;
            if (value > 100) {
                clearInterval(ImportInterval);
            }
            $(obj).find('.progress-bar-inner').width(value + '%');
            $(descDom).html('<div style="padding-top:1.5px;">' + desc + '(' + value + '%)</div>');
            if (value >= maxProcess) {
                if (state) {
                    textobj.css('color', 'rgba(0,0,0,.45)');
                }
                clearInterval(ImportInterval);
                $(descDom).html('<div style="padding-top:1.5px;">' + desc + '(' + (state ? '完成' : '错误') + ')</div>');
                $(obj)
                    .find('.progress-bar')
                    .removeClass('progress-bar-ing')
                    .addClass(stateclass);
                $(descDom).prepend("<span class='" + stateicon + "'></span>");
            }
        }, 10);
    }
    //上传Excel  -- 步骤
    var ModImportFirstContent = function (schemacode) {
        var html = '';
        html += '<div class="row"  id="importfirst" style="margin-left:0;margin-right:0;">';
        ///头
        html += GetHeaderHtml(1);
        //体
        html += '<div class="importbody">';
        html += '<div class="introduction">';
        html += '<div class="introductionheader">';
        html += '一、选择导入模式';
        html += '</div>';
        html += '<div class="introductionbody" style="display:inline-block">';
        html += '<div class="choose">';
        html += '<div class="chooseimport choosed" target="#addImport">新增导入</div>';
        html += '<div class="choosesplit1"></div>';
        html += '<div class="chooseimport" target="#updateImport">更新导入</div>';
        html += '<div class="choosesplit2"></div>';
        html += '</div>';
        html += '<div class="choosedbody" id="addImport">';
        html += '<div class="choosedescription">将Excel中的数据追加为表单的新数据</div>';
        html += '<div class="arrowTips addUnfoldTips">查看提示&nbsp;<span class="aufont icon-base-down" style="font-size:12px;"></span></div>';
        html += '<div class="importtips add" style="display:none">';
        html += '<div>提示：</div>';
        html += '<div class="introdutionbodyitem">';
        html += '1. 导入文件只支持.xls和.xlsx格式';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '2. 将需要上传的数据放在第一个sheet中';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '3. 数据模版中只有可填写的字段，不包含流水号、创建人等系统自动生成的字段';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '4. 数据模版中可整列调整字段的左右顺序，可删减不需要的字段，但必填字段不能删除';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '5. 同时导入主子表数据，且一条主表数据有多条子表数据时';
        html += '<div>&nbsp;&nbsp;&nbsp;(1) 只需填写第一个子表数据行的主表数据</div>';
        html += '<div>&nbsp;&nbsp;&nbsp;(2) 注意：如果多条子表数据都填写了主表数据，系统会生成多条主表数据</div>';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '6. 关联表单、关联多选控件关联子表时，系统将按上传的excel中该子表的数据标题匹配系统中的数据，后台<div style="float:left;width:14px;height:1px;"></div>务必设置该子表的数据标题';
        html += '</div>';
        html += '<div class="introdutionbodyitem" style="margin-top:8px">';
        html += '<div class="arrowTips addFoldTips">收起提示&nbsp;<span class="aufont icon-base-up" style="font-size:12px;"></span></div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="choosedbody hidebody" id="updateImport">';
        html += '<div class="choosedescription">对已有的系统数据进行更新</div>';
        html += '<div class="arrowTips updateUnfoldTips">查看提示&nbsp;<span class="aufont icon-base-down" style="font-size:12px;"></span></div>';
        html += '<div class="importtips update" style="display:none">';
        html += '<div>提示：</div>';
        html += '<div class="introdutionbodyitem">';
        html += '1. 更新导入前请先导出需要更新的数据并完成修改';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '2. 更新导入只更新草稿和已结束的流程，不更新进行中的流程';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '3. 导入文件只支持.xls和.xlsx格式';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '4. 将需要上传的数据放在第一个sheet中';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '5. 上传的excel中可整列调整字段的左右顺序，可删减不需要的字段，但必填字段不能删除';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '6. 同时导入主子表数据，且一条主表数据有多条子表数据时';
        html += '<div>&nbsp;&nbsp;&nbsp;(1) 只需填写第一个子表数据行的主表数据</div>';
        html += '<div>&nbsp;&nbsp;&nbsp;(2) 注意：如果多条子表数据都填写了主表数据，系统会生成多条主表数据</div>';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html +=
            '7. 系统按匹配字段更新数据，匹配字段默认为数据标题，当表单中有流水号时，也可以选择流水号作为匹配<div style="float:left;width:14px;height:1px;"></div>字段' +
            '（要求上传的excel中有该流水号字段）';
        html += '</div>';
        html += '<div class="introdutionbodyitem">';
        html += '8. 关联表单、关联多选控件关联子表时，后台务必设置该子表的数据标题，且每条数据的数据标题都有值，<div style="float:left;width:14px;height:1px;"></div>否则更新导入会清空已选项';
        html += '</div>';
        html += '<div class="introdutionbodyitem" style="margin-top:8px">';
        html += '<div class="arrowTips updateFoldTips">收起提示&nbsp;<span class="aufont icon-base-up" style="font-size:12px;"></span></div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        //新增
        html += '<div class="introductionheader notUpdate">';
        html += '二、请选择导入后的数据状态';
        html += '</div>';
        html += '<div class="introductionbody notUpdate">';
        html += '<input type="radio" id="temporary" name="state" value="0"/>';
        html += '<label class="importstateheader" for="temporary">草稿</label>';
        html += '<span class="aufont icon-base-info-cirlce-o temporaryIcon" style="font-size:12px;"></span>';
        html += '<br/>';
        if (IsWorkflow) {
            html += '<input type="radio" id="workflow" name="state" value="2" checked=true />';
            html += '<label class="importstateheader" for="workflow">发起流程</label>';
            html += '<span class="aufont icon-base-info-cirlce-o workflowIcon" style="font-size:12px;"></span><br/>';
            html += '<div class="inform" style="margin-left:23px;">';
            html += '<input type="checkbox" id="inform">';
            html += '<label class="informlabel" for="inform">发送钉钉工作通知（勾选后流程参与人将收到审批消息）</label><br/>';
            html += '</div>';
            html += '<input type="radio" id="valid" name="state" value="1"/>';
        } else {
            html += '<input type="radio" id="valid" name="state" value="1" checked />';
        }
        html += '<label class="importstateheader" for="valid">生效</label>';
        html += '<span class="aufont icon-base-info-cirlce-o validIcon" style="font-size:12px;"></span>';
        html += '</div>';
        //更新
        html += '<div class="introductionheader selectMatch" style="display:none;">';
        html += '二、选择匹配字段';
        html += '</div>';
        html += '<div class="introductionbody selectMatch" style="display:none;">';
        html += '<div class="row"  id="importselectmatch" style="margin-left:0;margin-right:0;">';
        html += '<div class="selectmatchtip">将按照选择的字段匹配数据，如更新导入时根据所选匹配字段找到系统中已有数据，并对其进行更新。</div>';
        html += '<div class="select off">';
        html += '<div class="optiondefault">流水号</div>';
        html += '<span class="aufont icon-base-down arrow"></span>';
        html += '<div class="options off">';
        html += '<div class="option" value="SeqNo">流水号</div>';
        html += '<div class="option" value="Name">数据标题</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '<div class="introductionheader chooseExcel">';
        html += '三、请选择要上传的Excel文件';
        html += '</div>';
        html += '<div class="introductionbody">';
        html += '<form id="upLoadForm" method="post">                                                                                                                               ';
        html += '<div style="float:left" class="masBox-btn btn_okfile myuploada">';
        html += '<span style="color:rgba(0,0,0,.65)">选择文件</span>';
        html += '<input type="file" accept=".xls,.xlsx" name="fileName" class="myupload" id="fileNameUpload" value="浏览" style="float:left"  />';
        html += '</div>';
        html += '</form>';
        html += '<div class="importdownload">';
        html += '请';
        var url =
            '/ExcelExport/OnAction?PostData={"ActionName":"ExportAddingTemplate","SchemaCode":"' +
            schemacode +
            '"}';
        html +=
            '<a href="javascript:void(0);" downurl=' + url + ' style="color:#1890FF;cursor: pointer;margin-left:6px;margin-right:6px;" class="download"><span class="aufont icon-base-download"></span>下载数据模板</a>';
        html += '，并按照模版编辑需导入的数据';
        html += '</div>';
        html += '<div style="margin-top:16px;"><p id="myfilename"></p></div>';
        html += '</div>';
        html += '</div>';
        //进度条
        html += '<div id="process" class="hideprocess">';
        html += '<div id="process1" target="#processtext1"><div class="progress-bar"><div class="progress-bar-outer"><div class="progress-bar-inner"></div></div></div></div>';
        html += '<div id="process2" target="#processtext2"><div class="progress-bar"><div class="progress-bar-outer"><div class="progress-bar-inner"></div></div></div></div>';
        html += '<div id="process3" target="#processtext3"><div class="progress-bar"><div class="progress-bar-outer"><div class="progress-bar-inner"></div></div></div></div>';
        html += '<div id="processtext1" style="float:left;width:194px;" title="文件上传">文件上传</div>';
        html += '<div id="processtext2" style="float:left;width:194px;" title="模板校验"><div style="padding-top:1.5px;">模板校验</div></div>';
        html += '<div id="processtext3" style="float:left;width:194px;" title="数据量校验"><div style="padding-top:1.5px;">数据量校验</div></div>';
        html += '</div>';
        //进度条 END
        html += '</div>';
        html += '<div class="importupload">';
        html += '</div>';
        html += '</div>';
        return html;
    };
    function ModImportFirstBuild(Code) {
        if (ModImportFirst == null || $.isEmptyObject(ModImportFirst)) {
            ModImportFirst = $.IModal({
                Title:
                "<span class='title'>" + importTitle + "</span><span class='littletitle'>" +
                AppName +
                '</span>',
                OnShowCallback: function () {
                    canUpLoad = true;
                    mod1.find('#upLoadForm .myuploada.btn_disabled').removeClass('btn_disabled');

                    internetInterval = setInterval(function () {
                        if (!window.navigator.onLine && ImportGuid) {
                            showImportError('网络中断，请检查网络！');
                            if (mod3 && mod3.find('#importprocess').css('display') != 'none') {
                                mod3.find('.btn_ok').html('关闭').width(35).click(function () {
                                    ImportOver();
                                    clearInterval(internetInterval);
                                    ModImportThird.hide();
                                })
                            }
                            if (mod5 && mod5.find('#exportprocess')) {
                                mod5.find('.btn_ok').html('关闭').width(35).click(function () {
                                    ExportOver();
                                    clearInterval(internetInterval);
                                    ModExportSecond.hide();
                                })
                            }
                        }
                    }, 10000);
                    //新增查看提示
                    mod1.find('.addUnfoldTips').click(function () {
                        $(this).css('display', 'none');
                        mod1.find('.importtips.add').css('display', 'block');
                    })
                    //新增收起提示
                    mod1.find('.addFoldTips').click(function () {
                        mod1.find('.importtips.add').css('display', 'none');
                        mod1.find('.addUnfoldTips').css('display', 'block');
                    })
                    //更新查看提示
                    mod1.find('.updateUnfoldTips').click(function () {
                        $(this).css('display', 'none');
                        mod1.find('.importtips.update').css('display', 'block');
                    })
                    //更新收起提示
                    mod1.find('.updateFoldTips').click(function () {
                        mod1.find('.importtips.update').css('display', 'none');
                        mod1.find('.updateUnfoldTips').css('display', 'block');
                    })
                    //处理消息通知开关显示
                    mod1.find('label.importstateheader').click(function () {
                        var that = this;
                        mod1.find('input[name="state"]').each(function () {
                            $(this).prop('checked', false);
                            if ($(this).attr('id') == $(that).attr('for')) {
                                $(this).prop('checked', true)
                            }
                        });
                        if (IsWorkflow) {
                            if (mod1.find('#workflow').prop('checked')) {
                                mod1.find('.inform').show()
                            } else {
                                mod1.find('.inform').hide()
                            }
                        }
                    })
                    //是否通知消息
                    mod1.find('label.informlabel').click(function () {
                        IsInform = !IsInform;
                        console.log(IsInform)
                    })

                    //草稿关闭
                    mod1.find('.temporaryButton').click(function (e) {
                        e.stopPropagation()
                        $('.temporaryTips').css('display', 'none');
                        var validTips = document.getElementsByClassName('validTips')[0];
                        if (!validTips) {
                            if (IsWorkflow) {
                                if (!localStorage.getItem('workflowTips') && !localStorage.getItem('enterWorkflow')) {
                                    localStorage.setItem('workflowTips', true);
                                    var html = '<div class="workflowTips">';
                                    html += '<div style="color:rgba(0,0,0,.65);">导入数据后将发起流程，流程参与人需要对数据进行操作</div>';
                                    html += '<div class="statusButton workflowButton">我知道了</div>';
                                    html += '</div>';
                                    var $workflowTips = $(html);
                                    $('.introductionbody.notUpdate').append($workflowTips);
                                }
                            } else {
                                var html = '<div class="validTips">';
                                html += '<div style="color:rgba(0,0,0,.65);position:absolute;width:5%;">1.<br/>2.</div>';
                                html += '<div style="color:rgba(0,0,0,.65);position:absolute;right:16px;width:83%;">无需在系统点击提交，直接生效<br/>导入将执行数据填充规则、计算公式、业务规则、表单提交校验规则，表单提交校验不通过的数据将不导入</div>';
                                html += '<div class="statusButton validButton">我知道了</div>';
                                html += '</div>';
                                var $validTips = $(html);
                                $('.introductionbody.notUpdate').append($validTips);
                            }
                        }
                        //流程提示关闭
                        if (IsWorkflow) {
                            mod1.find('.workflowButton').click(function () {
                                e.stopPropagation()
                                var validTips = document.getElementsByClassName('validTips')[0];
                                mod1.find('.workflowTips').css('display', 'none');
                                if (!validTips && !localStorage.getItem('enterWorkflow')) {
                                    var html = '<div class="workflow validTips">';
                                    html += '<div style="color:rgba(0,0,0,.65);position:absolute;width:5%;">1.<br/>2.<br/>3.</div>';
                                    html += '<div style="color:rgba(0,0,0,.65);position:absolute;right:16px;width:83%;">无需在系统点击提交，直接生效<br/>导入将忽略审批流程<br/>导入将执行数据填充规则、计算公式、业务规则、表单提交校验规则，表单提交校验不通过的数据将不导入</div>';
                                    html += '<div class="statusButton validButton">我知道了</div>';
                                    var $validTips = $(html);
                                    $('.introductionbody.notUpdate').append($validTips);
                                }
                                //生效关闭
                                mod1.find('.validButton').click(function () {
                                    mod1.find('.validTips').css('display', 'none');
                                    mod1.find('.mask').css('display', 'none');
                                });
                            });
                        } else {
                            mod1.find('.validButton').click(function () {
                                mod1.find('.validTips').css('display', 'none');
                                mod1.find('.mask').css('display', 'none');
                            });
                        }
                    });
                    // 点击图标显示提示
                    mod1.find('.temporaryIcon').click(function (e) {
                        e.stopPropagation();
                        document.addEventListener('click', function () {
                            mod1.find('.temporaryTips').css('display', 'none');
                        });
                        mod1.find('.temporaryButton').text('关闭').width(44).click(function () {
                            mod1.find('.validTips').css('display', 'none');
                        });
                        mod1.find('.temporaryTips').css('display', 'block');
                        mod1.find('.workflowTips').css('display', 'none');
                        mod1.find('.validTips').css('display', 'none');
                    });

                    mod1.find('.workflowIcon').click(function (e) {
                        e.stopPropagation();
                        var workflowTips = document.getElementsByClassName('workflowTips')[0];
                        if (!workflowTips) {
                            var html = '<div class="workflowTips">';
                            html += '<div style="color:rgba(0,0,0,.65);">导入数据后将发起流程，流程参与人需要对数据进行操作</div>';
                            html += '<div class="statusButton workflowButton">我知道了</div>';
                        }
                        var $workflowTips = $(html);
                        $('.introductionbody.notUpdate').append($workflowTips);
                        document.addEventListener('click', function () {
                            mod1.find('.workflowTips').css('display', 'none');
                        });
                        mod1.find('.workflowButton').text('关闭').width(44).click(function () {
                            mod1.find('.workflowTips').css('display', 'none');
                        });
                        mod1.find('.workflowTips').css('display', 'block');
                        mod1.find('.temporaryTips').css('display', 'none');
                        mod1.find('.validTips').css('display', 'none');
                    });

                    mod1.find('.validIcon').click(function (e) {
                        e.stopPropagation();
                        document.addEventListener('click', function () {
                            mod1.find('.validTips').css('display', 'none');
                        });
                        mod1.find('.validTips').click(function (e) {
                            e.stopPropagation();
                        });
                        var validTips = document.getElementsByClassName('validTips')[0];
                        if (!validTips) {
                            if (IsWorkflow) {
                                var html = '<div class="workflow validTips">';
                                html += '<div style="color:rgba(0,0,0,.65);position:absolute;width:5%;">1.<br/>2.<br/>3.</div>';
                                html += '<div style="color:rgba(0,0,0,.65);position:absolute;right:16px;width:83%;">无需在系统点击提交，直接生效<br/>导入将忽略审批流程<br/>导入将执行数据填充规则、计算公式、业务规则、表单提交校验规则，表单提交校验不通过的数据将不导入</div>';
                            } else {
                                var html = '<div class="validTips">';
                                html += '<div style="color:rgba(0,0,0,.65);position:absolute;width:5%;">1.<br/>2.</div>';
                                html += '<div style="color:rgba(0,0,0,.65);position:absolute;right:16px;width:83%;">无需在系统点击提交，直接生效<br/>导入将执行数据填充规则、计算公式、业务规则、表单提交校验规则，表单提交校验不通过的数据将不导入</div>';
                            }
                            html += '<div class="statusButton validButton">我知道了</div>';
                            html += '</div>';
                            var $validTips = $(html);
                            $('.introductionbody.notUpdate').append($validTips);
                        }
                        mod1.find('.validButton').text('关闭').width(44).click(function () {
                            mod1.find('.validTips').css('display', 'none');
                        });
                        mod1.find('.validTips').css('display', 'block');
                        mod1.find('.temporaryTips').css('display', 'none');
                        mod1.find('.workflowTips').css('display', 'none');
                    });
                    mod1.find('.mask').click(function (e) {
                        e.stopPropagation();
                    });
                    mod1.find('.temporaryTips').click(function (e) {
                        e.stopPropagation();
                    });

                    mod1.find('.icon-guanbi').click(function () {
                        $tableTip.hide();
                        ImportOver();
                        clearInterval(internetInterval);
                    });
                    mod1.find('.myuploada').click(function (e) {
                        e.stopPropagation();
                        if (!canUpLoad) {
                            return;
                        }
                        //删除已选择文件
                        ModImportFirstReInit();
                        var file = mod1.find('#fileNameUpload')[0];
                        var ie = navigator.appVersion.indexOf('MSIE') != -1;
                        if (ie) {
                            var file2 = file.cloneNode(false);
                            file2.onchange = file.onchange;
                            file.parentNode.replaceChild(file2, file);
                        } else {
                            $(file).val('');
                        }
                        mod1.find('#myfilename').html('');

                        $(this).find('.myupload').click();
                    });
                    mod1.find('.myupload').bind('click', function (e) {
                        e.stopPropagation();
                    });
                    mod1.find('#fileNameUpload')
                        .unbind('change')
                        .bind('change', function () {
                            fileSelectedNew(Code);
                        }).html('');
                    $('.choose .chooseimport').click(function (e) {
                        //判断是否有文件
                        var file;
                        if (!(window.File && window.FileList && window.Blob)) {
                            file = mod1.find('#fileNameUpload')[0];
                            if ($.isEmptyObject(file)) {
                                switchMode(e);
                                return false;
                            }
                        } else {
                            file = mod1.find('#fileNameUpload')[0].files[0];
                            if ($.isEmptyObject(file)) {
                                switchMode(e);
                                return false;
                            }
                        }
                        if (!$(this).hasClass('choosed')) {
                            showImportConfirm.show({
                                title: '确定切换页面？',
                                message: '切换导入模式将终止本次导入',
                                callBack: function (result) {
                                    if (result) {
                                        switchMode(e);
                                    }
                                }
                            });
                        }
                        return false;
                    });
                    mod1.find(".optiondefault").click(function (e) {
                        e = e || event;
                        e.stopPropagation();
                        mod1.find(".arrow").removeClass("icon-base-down").addClass("icon-base-up");
                        mod1.find(".options").removeClass("off").addClass("on");
                        mod1.find(".select").removeClass("off").addClass("on");
                    });
                    mod1.find(".arrow").click(function (e) {
                        e = e || event;
                        e.stopPropagation();
                        if ($(this).hasClass('icon-base-down')) {
                            $(this).removeClass("icon-base-down").addClass("icon-base-up");
                            mod1.find(".options").removeClass("off").addClass("on");
                            mod1.find(".select").removeClass("off").addClass("on");
                        } else {
                            $(this).removeClass("icon-base-up").addClass("icon-base-down");
                            mod1.find(".options").removeClass("on").addClass("off");
                            mod1.find(".select").removeClass("on").addClass("off");
                        }
                    });
                    mod1.find(".option").click(function (e) {
                        e = e || event;
                        MatchField = $(this).attr('value');
                        ModImportFirstReInit();
                        mod1.find(".arrow").removeClass("icon-base-up").addClass("icon-base-down");
                        mod1.find(".options").removeClass("on").addClass("off");
                        mod1.find(".select").removeClass("on").addClass("off");
                        mod1.find(".optiondefault").html($(e.target).html());
                    });
                    $(document).click(function () {
                        mod1.find(".arrow").removeClass("icon-base-up").addClass("icon-base-down");
                        mod1.find(".options").removeClass("on").addClass("off");
                        mod1.find(".select").removeClass("on").addClass("off");
                    });
                },
                OnShowBeforeCallback: function () {
                    mod1 = this.Container;
                    var html = '<div class="temporaryTips"><div style="color:rgba(0,0,0,.65);position:absolute;width:5%;">1.<br/>2.</div>'
                    html += '<div style="color:rgba(0,0,0,.65);position:absolute;right:16px;width:83%;">需要在系统点击提交，方可生效<br/>导入将执行数据填充规则、计算公式</div><div class="statusButton temporaryButton">我知道了</div></div>'
                    var $temporaryTips = $(html);
                    $('.introductionbody.notUpdate').append($temporaryTips);
                    if (!localStorage.getItem('statusTips')) {
                        localStorage.setItem('statusTips', true);
                        var $mask = $('<div class="mask" style="position:absolute;top:0;width:100%;height:100%;background:transparent;"></div>');
                        $('.modal-dialog').append($mask);
                    } else {
                        mod1.find('.temporaryTips').css('display', 'none');
                        //先进入非流程再进入流程表单
                        if (IsWorkflow && !localStorage.getItem('enterWorkflow') && !localStorage.getItem('workflowTips')) {
                            localStorage.setItem('enterWorkflow', true)
                            var workflowTips = document.getElementsByClassName('workflowTips')[0];
                            if (!workflowTips) {
                                var html = '<div class="workflowTips">';
                                html += '<div style="color:rgba(0,0,0,.65);">导入数据后将发起流程，流程参与人需要对数据进行操作</div>';
                                html += '<div class="statusButton workflowButton">我知道了</div>';
                            }
                            var $workflowTips = $(html);
                            $('.introductionbody.notUpdate').append($workflowTips);
                            document.addEventListener('click', function () {
                                mod1.find('.workflowTips').css('display', 'none');
                            });
                            mod1.find('.workflowButton').click(function () {
                                mod1.find('.workflowTips').css('display', 'none');
                            });
                        }
                    }
                    mod1.find('.importbody').addClass('addImportbody');
                },
                OnHiddenCallback: function () {
                    var obj = mod1.find('#fileNameUpload')[0];
                    obj.outerHTML = obj.outerHTML;
                    mod1.find('#myfilename').html('');
                    mod1.find('#importorgworkflowinput').prop('checked', false);
                    ModImportFirst.destroy();
                },
                Height: $(top).height() - 150,
                Width: 800,
                ShowBack: true,
                HasIframe: false,
                Type: 1,
                Content: ModImportFirstContentResult,
                ShowInRootWindow: false,
                ToolButtons: [
                    {
                        Text: '取消',
                        Theme: 'btn_cancel',
                        CallBack: function () {
                            ImportOver();
                            clearInterval(internetInterval);
                            ModImportFirst.hide();
                        }
                    },
                    {
                        Text: '下一步',
                        Theme: 'btn_disabled',
                        CallBack: function () {
                            mod1.find('.importbody').removeClass('addImportbody');
                            status = mod1.find('[name="state"]:checked').val() == 1 ? true : false,
                                $tableTip.hide();
                            if (!this.Element.hasClass('btn_disabled')) {
                                ModImportFirst.hide();
                                //直接进入校验页面
                                ModImportSecondContentResult = ModImportSecondContent();
                                ModImportSecondBuild();
                                PerpareCheckDataCache(true);
                            }
                        }
                    }
                ],
                Class: importMoadlClass
            });
        } else {
            ModImportFirst.show();
        }
        initTipAndGuide();
    };
    //上传Excel重新格式化 -- 重新上传文件、切换导入模式
    function ModImportFirstReInit() {
        clearInterval(templateInterval);
        clearInterval(dataQuantityInterval);
        clearInterval(ImportInterval);
        ImportOver();
        mod1.find(".modal-footer .btn_ok").removeClass("btn_ok").addClass("btn_disabled");
        $('#process .progress-bar').each(function () {
            $(this).removeClass('progress-bar-ing')
                .removeClass('progress-bar-ok')
                .removeClass('progress-bar-error');
            $(this).find('.progress-bar-inner').width('0%');
        });
        mod1.find('#myfilename').html('');
        mod1.find('#process').addClass('hideprocess');
        $('#processtext1').html('<div style="padding-top:1.5px;">文件上传</div>');
        $('#processtext2').html('<div style="padding-top:1.5px;">模板校验</div>');
        $('#processtext3').html('<div style="padding-top:1.5px;">数据量校验</div>');
    };
    //校验数据  -- 步骤
    var ModImportSecondContent = function () {
        var html = '';
        html +=
            '<div class="row" id="importsecond" style="margin-left:0;margin-right:0;">';
        ///头
        html += GetHeaderHtml(2);
        ///体
        html += '<div class="importbody">';
        //进度条
        html += '<div class="check-progress">';
        html += '<div class="progress-bar progress-bar-ing"><div class="progress-bar-outer"><div class="progress-bar-inner bar-transition" style="width: 1%;"></div></div></div>';
        if (mod1.find('[name="state"]:checked').val() == 0) {//草稿不做必填校验
            html += '<div class="check-desc">正在对重复值、非法值进行校验...</div>';
        } else {
            html += '<div class="check-desc">正在对必填值、重复值、非法值进行校验...</div>';
        }
        html += '</div>'
        //校验成功 -- 只修改进度条内容
        //校验失败 -- 下载模板修改
        html += '<div class="import-error-download" style="display:none;">';
        html += '<span class="desc">文件中有</span>';
        html += '<span class="desc error-number"></span>';
        html += '<span class="desc">条错误数据，请</span>';
        html += '<a href="javascript: void(0);" class="error-report download" target="_blank" >';
        html += '<span class="aufont icon-base-download"></span>下载错误报告';
        html += '</a>';
        html += '<span class="desc">修改后<a id="reupload">重新上传</a>。</span>';
        html += '</div>';
        //校验失败 -- 在线修改(小于500条)
        html += '<div class="gtLimit" style="display:none;">需要修改的数据超过500条，为了降低在线操作过长导致的风险，请分批导入</div>';
        //校验失败 -- 在线修改(小于500条)
        html += '<div class="importerrorbody" style="display:none;">';
        html += '<div class="desc">文件中有<span class="desc error-number"></span>条错误数据，请在下表中修改，并点击 "下一步" 按钮继续导入</div>';
        html += '<div class="errortablecontainer">';

        // 新的表格
        html += '<div class="fixed-table-box row-col-fixed">';
        html += '<div class="fixed-table-header-wraper"></div>';  //表头
        html += '<div class="fixed-table_body-wraper"></div>';  //表内容
        html += '<div class="fixed-table_fixed fixed-table_fixed-left"></div>'; //固定列
        html += '<div class="fixed-table_action"><span class="aufont icon-base-fullscreen-o tool-tip" tooltip-title="全屏模式"></span></div>'
        html += '</div>';

        html += '<table class="importerrortable">';
        html += '</table>';
        html += '</div>';
        return html;
    };
    function ModImportSecondBuild() {
        if (ModImportSecond == null || $.isEmptyObject(ModImportSecond)) {
            ModImportSecond = $.IModal({
                Title: "<span class='title'>" + importTitle + "</span><span class='littletitle'>" + AppName + '</span>',
                OnShowCallback: function () {
                    mod2.find('.icon-guanbi').click(function () {
                        $tableTip.hide();
                        ImportOver();
                        clearInterval(internetInterval);
                    });
                },
                OnHiddenCallback: function () {
                    ModImportSecond.destroy();
                },
                Height: $(top).height() - 100,
                Width: 820,
                ShowBack: true,
                HasIframe: false,
                Type: 1,
                Content: ModImportSecondContentResult,
                ShowInRootWindow: false,
                OnShowBeforeCallback: function () {
                    mod2 = this.Container;
                },
                ToolButtons: [
                    {
                        Text: '取消',
                        Theme: 'btn_cancel',
                        CallBack: function () {
                            ImportOver();
                            clearInterval(internetInterval);
                            ModImportSecond.hide();
                        }
                    },
                    {
                        Text: '下一步',
                        Theme: 'btn_disabled',
                        CallBack: function () {
                            $tableTip.hide();
                            if (!this.Element.hasClass('btn_disabled')) {
                                var next = $(this.Element).attr('next');
                                var mergeData = $(this.Element).data().MergeData;
                                if (next != 'close') {  // next校验结果对应不同的步骤, 
                                    //下一步, 判断是否需要合并数据
                                    if (mergeData) {
                                        // 是否是全屏
                                        var isFullMode = $(this.Element).parents('.full-screen-container').length ? true : false;
                                        SecondMergeData(isFullMode);
                                    } else {
                                        ModImportSecond.hide();
                                        ModImportThirdContentResult = ModImportThirdContent();
                                        ModImportThirdBuild();
                                    }
                                } else {
                                    ImportOver();
                                    ModImportSecond.hide();
                                }
                            }
                        }
                    }
                ],
                Class: importMoadlClass
            });
            mod2 = ModImportSecond.Container;
        } else {
            ModImportSecond.show();
            $.MsgFilter.show();
        }
        closeTipText = '关闭对话框将终止校验';
        nextTipText = '正在校验...';
        initTipAndGuide();
    }
    function PerpareCheckDataCache(isFirst) {
        var datas = {};
        datas['ActionName'] = 'PerpareCheckDataCache';
        datas['SchemaCode'] = SchemaCode;
        datas['ImportGuid'] = ImportGuid;
        datas['Type'] = MatchField;
        datas['IsFirst'] = isFirst;
        datas = { PostData: JSON.stringify(datas) };
        $.ajax({
            data: datas,
            datatype: 'json',
            type: 'POST',
            url: '/ExcelImport/OnAction',
            async: true,
            success: function (result) {
                if (result.Successful) {
                    if (!result.ReturnData.State) {
                        PerpareCheckDataCache(false);
                    } else {
                        SecondDo();
                    }
                } else {
                    showImportError(result.ErrorMessage)
                }
            },
            error: function (error) {

            }
        });
    }
    function SecondDo(JsonResult) {
        var process = 0;
        var checkExcelResult = null;
        //请求校验数据
        var checkValidity = function (fromNum) {
            if (!ImportGuid) {
                return;
            }
            //通知后台进行数据校验，同时监听校验进度
            var datas = {};
            datas['ActionName'] = 'CheckExcelValidity';
            datas['SchemaCode'] = SchemaCode;
            datas['ImportGuid'] = ImportGuid;
            datas['Type'] = MatchField;
            datas['ImportOption'] = mod1.find('[name="state"]:checked').val();
            datas['FromNum'] = fromNum || 2;
            datas['Notify'] = IsInform;
            datas = { PostData: JSON.stringify(datas) };
            $.ajax({
                data: datas,
                datatype: 'json',
                type: 'POST',
                url: '/ExcelImport/OnAction',
                async: true,
                success: function (result) {
                    if (result.Successful) {
                        if (result.ReturnData.CheckAll) {
                            checkExcelResult = result.ReturnData;
                            handle();
                        } else if (ImportGuid) {
                            checkValidity(result.ReturnData.FromNum);
                        }
                    } else {
                        writeErrorMsg('CheckExcelValidity 接口');
                        ImportGuid && showImportError(result.ErrorMessage);
                    }
                },
                error: function (error) {
                    console.log(' ' + error);
                }
            });
        }
        checkValidity();
        //请求获取进度
        var processDatas = {};
        processDatas['ActionName'] = 'GetExcelValidPercent';
        processDatas['SchemaCode'] = SchemaCode;
        processDatas['ImportGuid'] = ImportGuid;
        processDatas = { PostData: JSON.stringify(processDatas) };
        var timeInterval = 100;
        var checkProcess = function () {
            if (!ImportGuid) {
                return;
            }
            $.ajax({
                data: processDatas,
                datatype: 'json',
                type: 'POST',
                url: '/ExcelImport/OnAction',
                async: true,
                success: function (result) {
                    if (result.Successful) {
                        process = result.ReturnData.Percent;
                        mod2.find('.progress-bar-inner').width(process + '%');
                        if (process < 100) {
                            if (timeInterval < 1500) {
                                timeInterval += 100;
                            }
                            setTimeout(function () { checkProcess(); }, timeInterval);
                        } else {
                            handle()
                        }
                    } else {
                        writeErrorMsg('GetExcelValidPercent 接口');
                        ImportGuid && showImportError(result.ErrorMessage);
                    }
                },
                error: function (error) {
                    showImportError('校验失败');
                }
            });
        };
        checkProcess();
        //防止数据校验完成后，进度条未完成，此时不能显示校验结果页面
        var flag = false, checkResult = false;
        var handle = function () {
            if (checkResult) return;
            if (!flag) {
                flag = true;
                return;
            }
            checkResult = true;
            SecondCheckResultHandle(checkExcelResult);
        }
    }
    //数据校验结果页面显示
    function SecondCheckResultHandle(Result) {
        closeTipText = '关闭对话框';
        mod2.find('.progress-bar').removeClass('progress-bar-ing').addClass('progress-bar-ok');
        //三种结果 1、下载错误报告  2、在线修改  3、校验通过
        var checkState = Result.State;
        if (checkState == 1) {
            var errorNum = Result.Count;
            var downLoadUrl = '/ExcelExport/OnAction' +
                '?PostData={ "ActionName": "ExportErrorReport", "SchemaCode":"' + SchemaCode +
                '", "ActionGuid": "' + ImportGuid + '"}';
            mod2.find('.check-progress').hide();
            mod2.find('.import-error-download .error-number').text(errorNum);
            mod2.find('.import-error-download a.download').attr('downurl', downLoadUrl);
            mod2.find('.import-error-download').show();
            mod2.find('.modal-footer .btn_cancel').hide();
            mod2.find('.modal-footer .btn_disabled').removeClass('btn_disabled').addClass('btn_ok').text('确定').attr('next', 'close');
            mod2.find('#reupload').click(function () {
                IsUpdate = false;
                importTitle = '新增导入';
                ModImportSecond.hide();
                ModImportFirstContentResult = ModImportFirstContent(SchemaCode);
                ModImportFirstBuild();
            })
        } else if (checkState == 2) {
            nextTipText = '请先修改错误项';
            mod2.find('.check-progress').hide();
            if (Result.ErrorCount > 500) { // 超过500条提示
                mod2.find('.gtLimit').css('display', 'block');
                mod2.find('.importbody').css({
                    height: '449px',
                    'padding-top': '53px',
                    'box-sizing': 'border-box'
                });
                ModImportSecond.SetFooter([
                    {
                        Text: '确定',
                        Theme: 'btn_ok',
                        CallBack: function () {
                            ModImportSecond.hide();
                            ImportOver();
                        }
                    }
                ]);
                return;
            } else { // 小于500条在线编辑
                var errorNum = Result.ListExcelRow.length;
            }
            mod2.find('.importerrorbody .error-number').text(errorNum);
            mod2.find('.importerrorbody').show();
            mod2.find('.modal-footer .btn_disabled').data('MergeData', true);
            BuildErrorTable(Result.ListExcelRow);
            var fixedTableAction = mod2.find('.fixed-table_action');
            var fixedTableHeaderHeight = fixedTableAction.parent().find('.fixed-table-header-wraper').height();
            var fixedTableActionSpan = fixedTableAction.find('span');
            fixedTableAction.height(fixedTableHeaderHeight);
            fixedTableAction.css('line-height', fixedTableHeaderHeight + 'px');
        } else if (checkState == 3) {
            var willImportSummary = Result.SchemaQuantity;
            var successHtml = '<div class="check-result">';
            successHtml += '<span class="icon aufont icon-base-check-circle"></span>';
            successHtml += '校验通过 !';
            successHtml += '</div>';
            //AppName
            for (var i = 0; i < willImportSummary.length; i++) {
                var summary = willImportSummary[i];
                successHtml += '<div class="check-details">';
                if (i == 0) {
                    successHtml += '将导入主表数据' + summary.Quantity + '条';
                } else {
                    successHtml += summary.SchemaName + '数据' + summary.Quantity + '条';
                }
                successHtml += '</div>';
            }
            mod2.find('.check-progress .check-desc').html(successHtml);
            mod2.find('.modal-footer .btn_disabled').removeClass('btn_disabled').addClass('btn_ok').attr('next', 'next');
        }
    }
    //初始化在线编辑table
    function BuildErrorTable(ListExcelRow) {
        ImportListExcelRow = ListExcelRow;
        var TotalErrorNumber = ListExcelRow.length;
        var $importsecond = mod2.find('#importsecond');
        var $maintable = $importsecond.find('.importerrortable');
        var $thead = $('<thead>');
        var $trfirst = $('<tr>');
        var $thnumber = $('<th fieldname="importNumber" data-target="0" style="min-width:40px;" rowspan="2">行号</th>');
        $trfirst.append($thnumber);
        var $therror = $('<th fieldname="importErrorFieldName" data-target="1" rowspan="2">错误详情</th>');
        $trfirst.append($therror);

        var haschild = false;  //是否是字表
        var loadchildfield = {}; //已近加载的子表字段

        //所有列， 渲染列的顺序以该数组的顺序为准
        //在渲染列时，循环该数组
        var errorTableCells = ListExcelRow[0].Keys;

        var subTabAndChildNum = {};
        for (var i = 0; i < errorTableCells.length; i++) {
            var fieldname = errorTableCells[i];
            if (fieldname.indexOf('.') > -1) {
                var parentfiled = fieldname.split('.')[0];
                if (subTabAndChildNum[parentfiled]) {
                    subTabAndChildNum[parentfiled] += 1;
                } else {
                    subTabAndChildNum[parentfiled] = 1;
                }
            }
        }

        var propertysummary = ListExcelRow[0].Cells;
        for (var i = 0; i < errorTableCells.length; i++) {
            var fieldname = errorTableCells[i];
            var fielddisplayname = propertysummary[fieldname].DisplayName;//字段名称
            var tbIndex = i + 2;
            if (fieldname.indexOf('.') > -1) {//有子表字段
                haschild = true;
                var parentfiled = fieldname.split('.')[0];
                if (!loadchildfield[parentfiled]) {
                    loadchildfield[parentfiled] = true;
                    var childcount = subTabAndChildNum[parentfiled];
                    var paretnFieldDisplayName = fielddisplayname.split('.')[0];
                    var $tempth = $(
                        '<th fieldname="' +
                        parentfiled +
                        '"data-target="' +
                        tbIndex +
                        '" colspan="' +
                        childcount +
                        '">' +
                        paretnFieldDisplayName +
                        '</th>'
                    );
                    $trfirst.append($tempth);
                }
                continue;
            }
            var $tempth = $(
                '<th fieldname="' +
                fieldname +
                '"data-target="' +
                tbIndex +
                '" rowspan="2">' +
                fielddisplayname +
                '</th>'
            );
            $trfirst.append($tempth);
        }
        $thead.append($trfirst);

        if (haschild) { //表头的第二行
            var $temptr = $('<tr>');
            for (var i = 0; i < errorTableCells.length; i++) {
                var fieldname = errorTableCells[i];
                var fielddisplayname = propertysummary[fieldname].DisplayName;
                if (fieldname.indexOf('.') > -1) {
                    var $thtemp = $(
                        '<th fieldname="' +
                        fieldname +
                        '">' +
                        fielddisplayname.split('.')[1] +
                        '</th>'
                    );
                    $temptr.append($thtemp);
                    continue;
                }
            }
            $thead.append($temptr);
        }
        var $tbody = $('<tbody>');
        //生成可编辑行
        for (var i = 0; i < ListExcelRow.length; i++) {
            var rowNum = i + 1;
            var errorRow = ListExcelRow[i];
            var rowId = $.IGuid();
            var $temptr = $('<tr class="maintr vertical-top" data-row="' + rowNum + '"  data-objectid="' + rowId + '">');

            //序号
            var $numbertd = $(
                '<td fieldname="importNumber" style="min-width:40px;" >' + rowNum + '</td>'
            );
            $temptr.append($numbertd);

            //该行错误详情
            var errors = errorRow.Errors;
            var $temptd = $('<td fieldname="importErrorFieldName" class="importfailtext"></td>');
            for (var errorkey in errors) {
                if ($.inArray(errorkey, errorTableCells) > -1) {
                    var anchor = '#error' + errorkey + 'row' + rowNum; //锚点 规则  'error' +  fieldname + 'row' + 行号
                    anchor = anchor.replace('.', '_') //子表处理
                    var errordes = errors[errorkey];
                    errordes.forEach(function (index, desc) {
                        //var errorHref = $('<a href=' + anchor + ' class="error-anchor"></a>').text(errordes);
                        var errorHref = $('<a href="javascript:void(0)" class="error-anchor" data-error-id=' + anchor + '></a>').text(errordes);
                        $temptd.append(errorHref);
                    });
                }
            }
            $temptr.append($temptd);
            //该行表单字段 -- 子表对应的 主表（除第一行）不需要渲染显示
            for (var k = 0; k < errorTableCells.length; k++) {
                var fieldname = errorTableCells[k];
                var propertysummary = errorRow.Cells[fieldname];
                var datatype = propertysummary['DataType'];
                var controlkey = propertysummary['ControlKey'];
                var boschemacode = propertysummary['BoschemaCode'];
                var fielddisplayname = propertysummary['DisplayName'];
                var required = propertysummary['Required'];
                var bovalue = propertysummary['Value'] || '';
                var botext = propertysummary['Text'] || '';
                var isError = errors[fieldname] ? true : false;  //该项是否有错

                var anchorId = fieldname.replace('.', '_');
                var anchor_target = 'error' + anchorId + 'row' + rowNum;
                var columnNum = k + 3;
                // rowNum 行  columnNum 列
                $temptd = $('<td id=' + anchor_target + '  fieldname="' + fieldname + '"></td>');
                var hasValue = bovalue && bovalue != 'null';
                var needInit = propertysummary.RenderEnable;

                // 人员单选  
                //data-uservisible="true" data-orgunitvisible="false"
                //根据类型加控件
                var $div = null;
                if (needInit) {
                    switch (controlkey) {
                        case 'user':  //单人
                            $div = $(
                                '<div class="sheet-control" data-uservisible="true" data-orgunitvisible="false"' +
                                ' data-controlkey="FormUser"></div>'
                            );
                            break;
                        case 'multiuser': //多人
                            $div = $(
                                '<div class="sheet-control" data-uservisible="true" data-orgunitvisible="false"' +
                                ' data-controlkey="FormMultiUser"></div>'
                            );
                            break;
                        case 'department': //单部门
                            $div = $(
                                '<div class="sheet-control" data-uservisible="false" data-orgunitvisible="true"' +
                                ' data-controlkey="FormUser"></div>'
                            );
                            break;
                        case 'multidepartment': //多部门
                            $div = $(
                                '<div class="sheet-control" data-uservisible="false" data-orgunitvisible="true"' +
                                'data-controlkey="FormMultiUser"></div>'
                            );
                            break;
                        case 'multiuserandmultidepartment':  //多人、部门
                            $div = $(
                                '<div class="sheet-control" data-ismultiple="true" data-uservisible="true" data-orgunitvisible="true"' +
                                'data-controlkey="FormMultiUser"></div>'
                            );
                            break;
                        case 'useranddepartment'://单人、部门
                            $div = $(
                                '<div class="sheet-control" data-uservisible="true" data-orgunitvisible="true"' +
                                'data-controlkey="FormUser"></div>'
                            );
                            break;
                        case 'formquery': //关联单选
                            $div = $(
                                '<div class="sheet-control FormQuery SheetQuery" data-controlkey="FormQuery" ' +
                                '" data-boschemacode="' + boschemacode + '" ></div>'
                            );
                            break;
                        case 'formmultiquery': //关联多选
                            $div = $(
                                '<div class="sheet-control FormQuery SheetQuery" data-controlkey="FormMultiQuery"' +
                                '" data-boschemacode="' + boschemacode + '"></div>'
                            );
                            break;
                        case 'formdropdownlist': //下拉框数据来源为表单子段时
                            var mappingfield = propertysummary['MappingFiled'];
                            if (boschemacode != '' && mappingfield != '') {
                                $div = $(
                                    '<div class="sheet-control SheetDropDownList" data-controlkey="FormDropDownList"' +
                                    '" data-datasource="Association" data-boschemacode="' + boschemacode +
                                    '" data-mappingfield="' + mappingfield + '"></div>'
                                );
                            }
                            break;
                        default:
                            break;
                    }
                    if ($div) {
                        $div.attr('data-DataField', fieldname);
                        $div.attr('data-defaultvalue', bovalue);
                        $div.attr('data-row', rowNum);
                        $div.attr('data-column', columnNum);
                        $div.attr('data-text', botext);
                    } else {
                        needInit = false;
                        $div = $(
                            '<div class="sheet-control" data-DataField="' +
                            fieldname +
                            '">' + (bovalue || botext) + '</div>'
                        );
                    }
                } else {
                    $div = $(
                        '<div class="sheet-control sheet-label" data-DataField="' +
                        fieldname +
                        '">' + (bovalue || botext) + '</div>'
                    );
                }
                if (required) {
                    $div.attr('data-required', 'true');
                }
                if (needInit) {
                    $div = MyCreateElement(fieldname, controlkey, $div);
                    // 计算必填有错误的
                    if (required && isError) {
                        $div.attr('data-required-error', true);
                    }
                }
                $temptd.append($div);
                // if (required && isError) {
                //     ++ImportErrorNum;
                // }

                if (isError) {
                    ++ImportErrorNum;
                    $div.addClass('has-error');
                    var errorString = '';
                    var thisErrors = errors[fieldname];
                    for (var errorIndex = 0; errorIndex < thisErrors.length; errorIndex++) {
                        try {
                            var rowError = thisErrors[errorIndex];
                            rowError = rowError.split('】')[1] || '';
                            if (rowError) {
                                rowError = rowError.substr(rowError.indexOf('列') + 1);
                                errorString += rowError + '；';
                            }
                        } catch (e) { }
                    }
                    $temptd.append($('<div class="error-des">' + errorString + '</div>'));
                }
                $temptr.append($temptd);
                $div.data('propertysummary', propertysummary);
                //$temptd.find('.icon-arrow-down-full').removeClass('icon-arrow-down-full'); //去掉下三角
            }
            $tbody.append($temptr);
        }

        $maintable.append($thead);
        $maintable.append($tbody);
        //没有必填且有错误的字段，可直接下一步
        if (!ImportErrorNum) {
            mod2.find('.btn_disabled').removeClass('btn_disabled').addClass('btn_ok');
        }
        InitImportFixTable($maintable);
        var guided = !localStorage.getItem('ImportGuide') ? false : true;
        if (!guided) {
            //初始化指引
            var InitImportGuide = function () {
                var guideMask = $('<div class="guide-mask"></div>');
                // 跳转指引
                var guide1 = $('<div class="guide guide-full-screen"></div>');
                var postion1 = $tbody.find('td .error-anchor:first').offset();
                var title1 = $('<div class="title">点击错误项可跳转到对应项进行修改</div>');
                var btn1 = $('<div class="action"><span class="button">我知道了</span></div>');
                var arrow1 = $('<div class="popper-arrow-down"></div>');
                arrow1.css('left', '30px');
                guide1.append(title1).append(btn1).append(arrow1);
                guide1.css({
                    left: postion1.left + 100,
                    top: postion1.top - 100
                });

                //全屏指引
                var guide2 = $('<div class="guide guide-anchor"></div>');
                var postion2 = mod2.find('.fixed-table_action span').offset();
                var title2 = $('<div class="title">点击全屏查看</div>');
                var btn2 = btn1.clone();
                var arrow2 = arrow1.clone();
                var offsetLeft = 50;
                arrow2.css('left', 50 + 'px');
                guide2.append(title2).append(btn2).append(arrow2);
                guide2.css({
                    left: postion2.left - 50,
                    top: postion2.top - 100
                })

                var guideContainer = $('<div class="import-guide-container">');
                guideContainer.append(guideMask).append(guide1).append(guide2);
                $('body').append(guideContainer);
                var iknow = 2;
                guideContainer.off('click.iknow').on('click.iknow', '.action', function () {
                    --iknow;
                    $(this).parents('.guide').remove();
                    if (iknow == 0) {
                        guideContainer.remove();
                    }
                });
            }
            InitImportGuide();
            localStorage.setItem('ImportGuide', 'true');
        }
    }
    //合并数据
    function SecondMergeData(isFullMode) {
        var postDataJson = {
            ActionName: 'MergeErrorData',
            SchemaCode: SchemaCode,
            ImportGuid: ImportGuid,
            RepairedData: JSON.stringify(ImportListExcelRow)
        };
        $.ajax({
            data: { PostData: JSON.stringify(postDataJson) },
            url: '/ExcelImport/OnAction',
            type: 'post',
            success: function (data) {
                if (data.Successful) {
                    if (isFullMode) {
                        //全屏先还原
                        modFull.find('.fixed-table_action span').click();
                    }
                    //先显示校验结果（即将导入的数据），再设置下一步
                    var willImportSummary = data.ReturnData.SchemaQuantity;
                    var successHtml = '<div class="check-result">';
                    successHtml += '<span class="icon aufont icon-base-check-circle"></span>';
                    successHtml += '校验通过 !';
                    successHtml += '</div>';
                    //AppName
                    for (var i = 0; i < willImportSummary.length; i++) {
                        var summary = willImportSummary[i];
                        successHtml += '<div class="check-details">';
                        if (i == 0) {
                            successHtml += '将导入主表数据' + summary.Quantity + '条';
                        } else {
                            successHtml += summary.SchemaName + '数据' + summary.Quantity + '条';
                        }
                        successHtml += '</div>';
                    }
                    mod2.find('.check-progress .check-desc').html(successHtml);
                    mod2.find('.importerrorbody').hide();
                    mod2.find('.check-progress').show();
                    ModImportSecond.SetFooter([
                        {
                            Text: '下一步',
                            Theme: 'btn_ok',
                            CallBack: function () {
                                ModImportSecond.hide();
                                ModImportThirdContentResult = ModImportThirdContent();
                                ModImportThirdBuild();
                            }
                        }
                    ]);
                } else {
                    ImportGuid && showImportError(data.ErrorMessage);
                }
            }
        });
    }
    //初始化表单控件
    function MyCreateElement(datafield, controlkey, $div) {
        var defaultvalue = $div.attr('data-defaultvalue');
        var text = $div.attr('data-text') || '';
        var required = $div.attr('data-required') == 'true' ? true : false;
        var rowNum = $div.attr('data-row');
        var columnNum = $div.attr('data-column');
        var changeNameSpace = 'change' + datafield + rowNum + columnNum;
        var randerControl = function ($tthis) {
            var width = $tthis.width();
            $tthis.find('.tempdiv').remove();
            var hasError = $div.hasClass('has-error');
            var defaultvalue;
            if (!hasError) {
                defaultvalue = $tthis.attr('data-defaultvalue');

                if (controlkey == 'formmultiquery') {
                    defaultvalue = defaultvalue.split(';');
                }
            }
            var isFullMode = $('.full-screen-container').length ? true : false;
            var currentModalContainer = isFullMode ? $('.full-screen-container') : mod2;
            var temp = $div.JControl();
            $div.width(width);
            temp.Required = false;
            if (required) {
                temp.Required = required;
            } else {
                //非必填且有错误，点击直接消除错误信息
                if (hasError) {
                    --ImportErrorNum;
                    $div.removeClass('has-error');
                    if (ImportErrorNum == 0) {
                        currentModalContainer.find('.btn_disabled').removeClass('btn_disabled').addClass('btn_ok');
                    }
                }
            }
            if (defaultvalue != null && defaultvalue != 'null') {
                temp.SetValue(defaultvalue);
            }
            temp.BindChange(changeNameSpace, function () {
                setTimeout(function () {
                    if ($div.hasClass('has-error')) {
                        --ImportErrorNum;
                        $div.removeClass('has-error');
                    }
                    ModifyImportDataHandle($tthis);
                }, 500);
            });
        }
        switch (controlkey) {
            case 'user':
            case 'multiuser':
            case 'department':
            case 'multidepartment':
            case 'useranddepartment':
            case 'multiuserandmultidepartment':
                {
                    var name = $div.attr('data-name');
                    var $tempdiv = $(
                        '<div class="tempdiv" style="min-width: 100px;">' +
                        '<div name="' + datafield +
                        '" class="form-control form-user-add" style="height: auto; overflow: auto; width: 100%; max-height: 100px;">' +
                        '<span class="SheetUser-Item label label-info" id="' + defaultvalue +
                        '">' + text + '</span>' +
                        '<input class="SheetUser-Input" style="width: 1.5px;">' +
                        '</div>' +
                        '<div class="SheetUser-SelectorPanel" data-formuserpanel="SelectorPanel">' +
                        '</div>'
                    );
                    $div.append($tempdiv);
                    $div.unbind('click').one('click', function () {
                        var $tthis = $(this);
                        randerControl($tthis);
                        setTimeout(function () {
                            $tthis.find('.form-control').click();
                        }, 200);
                    });
                }
                break;
            case 'formquery':
            case 'formmultiquery':
                {
                    var $tempdiv = $(
                        '<div class="tempdiv" style="position:relative;">' +
                        '<div class="form-control form-query-add" style="height:32px;" >' +
                        '<a href="javascript: void(0);" class="label label-info" style="position:relative;">' + text + '</a>' +
                        '</div>' +
                        '<a href="javascript: void(0);" class="form-query-addModel icon-newsvg"></a>' +
                        '</div>'
                    );
                    $div.append($tempdiv);
                    $div.unbind('click').one('click', function () {
                        console.log($(this));
                        var $tthis = $(this);
                        randerControl($tthis);
                        setTimeout(function () {
                            $tthis.find('.form-query-add').click();
                        }, 200);

                    });
                }
                break;
            case 'formdropdownlist':
                {
                    var $tempdiv = $(
                        '<div class="tempdiv icon-arrow-down-full" style="position:relative;">' +
                        '<span type="text" class="form-control myform-control mytext comboboxtext" style="width:100 %;">' +
                        (text || defaultvalue) +
                        '</span>' +
                        '</div>'
                    )

                    $div.append($tempdiv);
                    $div.unbind('click').one('click', function () {
                        var $tthis = $(this);
                        randerControl($tthis);
                        setTimeout(function () {
                            $tthis.find('.form-control').trigger('mousedown');
                        }, 200);
                    });
                }
                break;
            default:
                break;
        }
        return $div;
    }
    //初始化Table, 表头，序号固定
    function InitImportFixTable(oTable) {
        var fixTableBox = mod2.find('#importsecond .fixed-table-box');
        var colWidths = [];  //现有表宽
        var sumWidth = 0;
        var rowHeights = [];  //现有行高
        var sunHeight = 0;
        var $colgroup = $('<colgroup>');
        var dataLength = oTable.find('tbody tr').length;

        oTable.find('tbody tr').each(function () {
            var oHeight = $(this).outerHeight();
            rowHeights.push(oHeight);
            sunHeight += oHeight;
        });
        oTable.find('tbody tr:first td').each(function () {
            var oWidth = $(this).outerWidth();
            colWidths.push(oWidth);
            sumWidth += oWidth;
            $colgroup.append($('<col>').attr('width', oWidth));
        })

        //表头
        var headTableWrap = fixTableBox.find('.fixed-table-header-wraper');
        var headTable = $('<table class="fixed-table_header" id="tableHeaderAdjust" cellspacing="0" cellpadding="0" border="0">')
            .width(sumWidth);
        headTable.append($colgroup.clone()).append(oTable.find('thead'));
        headTableWrap.append(headTable);

        //右侧主题内容
        var tbodyTableWrap = fixTableBox.find('.fixed-table_body-wraper');
        var tbodyTable = $('<table class="fixed-table_body" cellspacing="0" cellpadding="0" border="0">')
        tbodyTable.addClass('importerrortable').append($colgroup.clone()).append(oTable.find('tbody'));
        tbodyTableWrap.append(tbodyTable);

        //左侧固定列
        var leftTableWrap = fixTableBox.find('.fixed-table_fixed-left');
        var leftHeadWrap = $('<div class="fixed-table_header-wraper"></div>');
        var leftBodyWrap = $('<div class="fixed-table_body-wraper"></div>');

        var leftHeadTable = $('<table class="fixed-table_header" cellspacing="0" cellpadding="0" border="0"></table>');
        var thead = $('<thead>');
        var tr = $('<tr>');
        var th = $('<th>行号</th>').width(colWidths[0]).height(headTable.height());
        thead.append(tr.append(th));
        leftHeadWrap.append(leftHeadTable.append(thead));

        var leftBodyTable = $('<table class="fixed-table_body" cellspacing="0" cellpadding="0" border="0"></table>');
        var tbody = $('<tbody>');
        //添加固定序号列
        for (var i = 0; i < dataLength; i++) {
            tr = $('<tr class="vertical-top">');
            tr.append($('<th>' + (i + 1) + '</th>').width(colWidths[0]).height(rowHeights[i]));
            tbody.append(tr);
        }
        leftBodyWrap.append(leftBodyTable.append(tbody));
        leftTableWrap.append(leftHeadWrap).append(leftBodyWrap);

        //设置滚动效果
        var tableContainerHeight = 380;  //整个table的高
        fixTableBox.height(tableContainerHeight);
        //设置wrap的高
        tbodyTableWrap.height(tableContainerHeight - headTable.height());
        leftTableWrap.height(tableContainerHeight - 10);
        leftBodyWrap.height(tableContainerHeight - headTable.height());
        //监听scroll事件
        tbodyTableWrap.off('scroll.body').on('scroll.body', function () {
            var left = $(this).scrollLeft();
            var top = $(this).scrollTop();
            headTableWrap.scrollLeft(left);
            leftBodyWrap.scrollTop(top);
        });
        //监听全屏事件
        var fullScreen = fixTableBox.find('.fixed-table_action span');
        var IsFullScreen = false;
        fullScreen.off('click.fullscreen').on('click.fullscreen', function (e) {
            $tableTip.hide();
            var modalFooter = $('.import-modal').find('.modal-footer');
            if (!IsFullScreen) {
                var FSContainer = $('<div class="import-modal full-screen-container"></div>');
                FSContainer.append(fixTableBox.parents('.importerrorbody'));
                FSContainer.append(modalFooter[0]);
                $('body').append(FSContainer);
                var fullTableBox = $('body').find('.full-screen-container .fixed-table-box');
                var fullTableBodyWraper = fullTableBox.find('.fixed-table_body-wraper');
                fullTableBox.height($('body').find('.full-screen-container').height() - 52);
                fullTableBox.find('.fixed-table_action span').attr('tooltip-title', '退出全屏');
                fullTableBodyWraper.height(fullTableBox.height() - 65);
                leftTableWrap.height(fullTableBox.height());
                $('body').find('.fade.in').css('background', 'rgba(0,0,0,.6)');
                FSContainer.find('.fixed-table_action span').removeClass('icon-base-fullscreen-o').addClass('icon-base-fullscreen-restore-o');
                FSContainer.find('.fixed-table_action').css('background', 'transparent');
                mod2.find('.modal-dialog').hide();
                modFull = FSContainer;
            } else {//全屏时
                var FSContainer = $('body').find('.full-screen-container');
                var fullTableBox = $('body').find('.full-screen-container .fixed-table-box');
                mod2.find('.modal-dialog').show();
                mod2.find('#importsecond').append(fixTableBox.parents('.importerrorbody'));
                mod2.find('.modal-dialog .modal-content').append(modalFooter[0]);
                fullTableBox.height(380);
                leftTableWrap.height(380);
                fullTableBox.find('.fixed-table_action span').attr('tooltip-title', '全屏模式');
                fullTableBox.find('.fixed-table_action').css('background', '#FAFAFA');
                fixTableBox.find('.fixed-table_body-wraper').height(315);
                fullScreen.removeClass('icon-base-fullscreen-restore-o').addClass('icon-base-fullscreen-o');
                FSContainer.remove();
                $('body').find('.fade.in').css('background', 'rgba(0,0,0,0)');
            }
            IsFullScreen = !IsFullScreen;

        });
    }
    //在线修改导入数据回调 --  target：控件dom对象
    function ModifyImportDataHandle(target) {
        var isFullMode = $(target).parents('.full-screen-container').length ? true : false;// 是否是全屏
        var currentModalContainer = isFullMode ? $(target).parents('.full-screen-container') : mod2;

        var data = $(target).data();
        var rowIndex = data.row;
        var propertysummary = data.propertysummary;
        var jcontrol = data.JControl;
        var val = jcontrol.GetValue();
        //将Value的值格式化后赋值给 propertysummary.Value, 保存时直接传入ImportListExcelRow对象

        //人员，部门单、多 都是对象，取key值   
        //关联单选是字符串，多选是数组
        //下拉框是字符串
        var formatVal = '';
        if (data.controlkey == 'FormQuery' || data.controlkey == 'FormDropDownList') {
            formatVal = val;
        } else if (data.controlkey == 'FormMultiQuery') {
            formatVal = val.join(';');
        } else {
            for (var valKey in val) {
                formatVal += ';' + valKey;
            }
            if (formatVal) {
                formatVal = formatVal.slice(1);
            }
        }
        propertysummary.Value = formatVal;
        //处理错误描述
        var errorDes = target.next('.error-des');
        errorDes.hide();
        if (data.required) {
            if ($.isEmptyObject(val) || val.length == 0) {
                //有必填项
                ++ImportErrorNum;
                $(target).addClass('has-error');
                currentModalContainer.find('.btn_ok').removeClass('btn_ok').addClass('btn_disabled');
                if (!errorDes.length) {
                    errorDes = $('<div class="error-des"></div>');
                    errorDes.insertAfter(target);
                }
                errorDes.text('该项必填！');
                errorDes.show();
                changeListHeight(rowIndex);
                return;
            }
        }
        changeListHeight(rowIndex);

        if (ImportErrorNum) { //页面有错误信息
            currentModalContainer.find('.btn_ok').removeClass('btn_ok').addClass('btn_disabled');
            return;
        } else {
            currentModalContainer.find('.btn_disabled').removeClass('btn_disabled').addClass('btn_ok');
        }
    }
    function changeListHeight(rowIndex) {
        var $maintrs = $(mod2.find('.fixed-table_body-wraper .maintr')[rowIndex - 1]);
        var $listtrs = $(mod2.find('.fixed-table_fixed.fixed-table_fixed-left .fixed-table_body tr')[rowIndex - 1]);

        if (!$maintrs.length) {
            //全屏模式
            var FSContainer = $('body').find('.full-screen-container');
            $maintrs = $(FSContainer.find('.fixed-table_body-wraper .maintr')[rowIndex - 1]);
            $listtrs = $(FSContainer.find('.fixed-table_fixed.fixed-table_fixed-left .fixed-table_body tr')[rowIndex - 1]);
        }

        if ($maintrs.find('.error-des:visible').length == 0) {
            $maintrs.removeClass('vertical-top');
            $listtrs.removeClass('vertical-top');
        } else if (!$maintrs.hasClass('vertical-top')) {
            $maintrs.addClass('vertical-top');
            $listtrs.addClass('vertical-top');
        }
        setTimeout(function () {
            var h = $maintrs.height();
            $listtrs.find('th').css('height', h + 'px');
        }, 100);
    }
    //导入数据 -- 步骤
    var ModImportThirdContent = function () {
        var html = '';
        html += '<div class="row" id="importthird" style="margin-left:0;margin-right:0;">';
        ///头
        html += GetHeaderHtml(3);
        html += '<div class="importbody body-import-state">';
        //直接显示导入进度
        html += '<div class="body-import-process" id="importprocess">';
        html += '<div class="progresswrapper">'
        html += '<div class="el-progress-circle" style="width:97px;height:97px;">';
        html += '<svg viewBox="0 0 100 100">';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#e5e9f2" stroke-width="4" fill="none" class="el-progress-circle__track"></path>';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" stroke="#1890FF" stroke-width="4" fill="none" class="el-progress-circle__path" style="stroke-dasharray: 224px, 299.08px; stroke-dashoffset: 224.31px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;"></path>';
        html += '</svg>';
        html += '</div>';
        html += '</div>';
        html += '<div class="importprocessnum">0%</div>';
        html += '<div class="importprocesstext">正在导入...</div>';
        html += '<div class="importprocesstext">注意：导入过程中请勿刷新或关闭页面，否则可能导致导入数据不完全</div>';
        html += '</div>';
        //导入错误页面
        html += '<div class="importbody body-import-error" style="display: none;">';
        html += '<div id="successtext" style="margin-top:33px;"></div>';
        html += '<div id="failtext" style="margin-top:33px;"></div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="modal-body-mini" style="display:none">body-mini</div>';
        return html;
    };
    function ModImportThirdBuild() {
        if (ModImportThird == null || $.isEmptyObject(ModImportThird)) {
            ModImportThird = $.IModal({
                Title: "<span class='title'>" + importTitle + "</span><span class='littletitle'>" + AppName + '</span>',
                OnShowBeforeCallback: function () {
                    mod3 = this.Container;
                    mod3.find('.btn_ok').width(102);
                },
                OnShowCallback: function () {
                    mod3.find('.icon-guanbi').click(function () {
                        if (importProcessFlag) {
                            if (ImportExportProcess != 0 && ImportExportProcess != 100) {
                                return false;
                            } else {
                                clearInterval(internetInterval);
                            }
                        }
                        $tableTip.hide();
                        ImportOver();
                    });

                    //新逻辑
                    importProcessFlag = true;
                    mod3.addClass('import-export-ing');
                    closeTipText = "正在导入...";
                    var postDataJson = {
                        ActionName: 'ImportData',
                        SchemaCode: SchemaCode,
                        ImportGuid: ImportGuid,
                        FromNum: 0
                    };
                    //调用导入接口
                    var importData = function (fromNum) {
                        postDataJson.FromNum = fromNum || 0;
                        $.ajax({
                            data: { PostData: JSON.stringify(postDataJson) },
                            url: '/ExcelImport/OnAction',
                            type: 'post',
                            success: function (data) {
                                if (data.Successful) {
                                    SetImportingPercent(data.ReturnData.Percent);
                                    if (data.ReturnData.CheckAll) {
                                        closeTipText = "关闭对话框";
                                        var hasFail = false;
                                        if (data.ReturnData.FailReport && data.ReturnData.FailReport.length) {
                                            for (var i = 0; i < data.ReturnData.FailReport.length; i++) {
                                                if (data.ReturnData.FailReport[i].Quantity > 0) {
                                                    hasFail = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (hasFail) {
                                            //有未导入数据
                                            mod3.find('.body-import-process').hide();
                                            var successtext = '';
                                            var failtext = '';
                                            for (var i = 0; i < data.ReturnData.FailReport.length; i++) {
                                                if (i == 0) {
                                                    failtext = '导入失败主表数据' + data.ReturnData.FailReport[i].Quantity + '条';
                                                } else {
                                                    failtext += '，&nbsp;' + data.ReturnData.FailReport[i].SchemaName + '数据' + data.ReturnData.FailReport[i].Quantity + '条';
                                                }
                                            }
                                            failtext += '，&nbsp;请<a href="javascript: void(0);" class="error-report download"><span class="aufont icon-base-download"></span>下载未导入数据</a>修改后重新上传。';
                                            mod3.find('#failtext').html(failtext);

                                            closeTipText = "关闭对话框";
                                            ModImportThird.SetFooter([
                                                {
                                                    Text: '确定',
                                                    Theme: 'btn_ok',
                                                    CallBack: function () {
                                                        ImportOver();
                                                        clearInterval(internetInterval);
                                                        ModImportThird.hide();
                                                    }
                                                }
                                            ]);
                                            mod3.find('.btn_ok').css('width', 65);
                                            var downLoadUrl = '/ExcelExport/OnAction' +
                                                '?PostData={ "ActionName": "ReExportWhenImportFaild", "SchemaCode":"' + SchemaCode +
                                                '", "ActionGuid": "' + ImportGuid + '"}';
                                            mod3.find('.body-import-error a.download').attr('downurl', downLoadUrl);
                                            modMini && modMini.find('.title').text('有未导入数据，点击查看详情');
                                            setTimeout(function () {
                                                modMini && modMini.find('.process-desc').text('100%');
                                            }, 0);


                                            mod3.find('.body-import-error').show();
                                        } else {
                                            var successReport = data.ReturnData.SuccessReport;
                                            ModImportFourthContentResult = ModImportFourthContent(successReport);
                                            if (!modMini) {
                                                ModImportThird.hide();
                                                ModImportFourthBuild();
                                            } else {
                                                modMini.find('.title').text('导入完成!');
                                                modMini && modMini.find('.progress-bar-inner').width('100%');
                                                modMini.find('.progress-bar-ing').removeClass('progress-bar-ing').addClass('progress-bar-ok');
                                                modMini.find('.process-desc').text('').addClass('aufont icon-base-check-circle');
                                            }
                                        }

                                        setTimeout(function () {
                                            $.ListView.RefreshView();
                                        }, 500);
                                    } else {
                                        importData(data.ReturnData.FromNum);
                                    }
                                } else {
                                    ImportGuid && showImportError(data.ErrorMessage);
                                }
                            },
                            error: function (data) {
                                mod3.find('.body-import-process').hide();
                                mod3.find('.body-import-error').show();
                                mod3.find('#failtext').text('导入出错，请重新导入数据');
                                mod3.removeClass('import-export-ing');
                                closeTipText = "关闭对话框";
                                ImportExportProcess = 100;
                                ModImportThird.SetFooter([
                                    {
                                        Text: '确定',
                                        Theme: 'btn_ok',
                                        CallBack: function () {
                                            ImportOver();
                                            clearInterval(internetInterval);
                                            ModImportThird.hide();
                                        }
                                    }
                                ]);
                                ImportGuid && showImportError('导入出错');
                            }
                        });
                    }
                    importData();
                },
                OnHiddenCallback: function () {
                    ModImportThird.destroy();
                },
                Height: 550,
                Width: 800,
                ShowBack: true,
                HasIframe: false,
                Type: 1,
                Content: ModImportThirdContentResult,
                ShowInRootWindow: false,
                ToolButtons: [
                    {
                        Text: '隐藏此窗口',
                        Theme: 'btn_ok',
                        CallBack: function () {
                            $.MsgFilter.remove();
                            mod3.hide();
                            addMiniModal(ImportExportProcess);
                        }
                    },
                ],
                Class: importMoadlClass
            });
        } else {
            ModImportThirdContent.show();
        }
        initTipAndGuide();
    }
    function SetImportingPercent(percent) {
        //修改为设置进度条
        ImportExportProcess = percent;
        mod3.find('.importprocessnum').html(ImportExportProcess + '%');
        mod3.find('.el-progress-circle__path').css('stroke-dasharray', (224 + 292 / 100 * ImportExportProcess) + 'px 299.08px');
        modMini && modMini.find('.progress-bar-inner').width(ImportExportProcess + '%');
        modMini && modMini.find('.process-desc').text(ImportExportProcess + '%');

        if (ImportExportProcess == 100) {
            importProcessFlag = false;
            if (modMini) {
                if (modMini.find('.title').text() != '有未导入数据，点击查看详情') {
                    modMini.find('.process-desc').text('');
                }
            }
        }
    };
    function GetImportingPercent(delay) {
        return;
        delay = delay || 1000;
        var postDataJson = {
            ActionName: 'GetImportingPercent',
            SchemaCode: SchemaCode,
            ImportGuid: ImportGuid
        };
        $.ajax({
            data: { PostData: JSON.stringify(postDataJson) },
            url: '/ExcelImport/OnAction',
            type: 'post',
            success: function (data) {
                if (data.Successful) {
                    //处理进度条
                    ImportExportProcess = data.ReturnData.Percent;
                    mod3.find('.importprocessnum').html(ImportExportProcess + '%');
                    mod3.find('.el-progress-circle__path').css('stroke-dasharray', (224 + 292 / 100 * ImportExportProcess) + 'px 299.08px');
                    modMini && modMini.find('.progress-bar-inner').width(ImportExportProcess + '%');
                    modMini && modMini.find('.process-desc').text(ImportExportProcess + '%');
                    if (data.ReturnData.Percent < 100) {
                        if (delay < 4000) {  //请求间隔逐步到4000
                            delay += 100;
                        }
                        if (data.ReturnData.Percent > 90) { //最后到2000
                            delay = 2000;
                        }
                        setTimeout(function () { GetImportingPercent(delay); }, delay);
                    } else if (data.ReturnData.Percent == 100) {
                        importProcessFlag = false;
                        if (modMini) {
                            if (modMini.find('.title').text() != '有未导入数据，点击查看详情') {
                                modMini.find('.process-desc').text('');
                            }
                        }
                    }
                }
            }
        });
    }
    function addMiniModal(process) {
        console.log('addMiniModal: ' + ImportExportProcess);
        if (modMini) {
            modMini.remove();
        }
        var html = '';
        html += '<div class="import-modal-mini" style="cursor:pointer;">';
        if (mod5) {
            html += '<div class="title">数据导出中...</div>';
        } else {
            html += '<div class="title">数据导入中...</div>';
        }
        html += '<div class="process">';
        html += '<div class="progress-bar progress-bar-ing">';
        html += '<div class="progress-bar-outer"><div class="progress-bar-inner bar-transition" style="width: ' + process + '%;"></div></div>';
        html += '</div>';
        html += '</div>';
        html += '<span class="process-desc">' + process + '%</span>';
        html += '</div>';
        modMini = $(html);
        $(document.body).append(modMini);
        modMini.off('click.showDetail').on('click.showDetail', function () {
            var complete = modMini.find('.progress-bar-ok').length;
            modMini.remove();
            modMini = undefined;
            $.MsgFilter.show();
            if (ModImportThird && !$.isEmptyObject(ModImportThird)) {
                //导入
                if (complete) {
                    ModImportThird.hide();
                    ModImportFourthBuild();
                } else {
                    mod3 && mod3.show();
                }
                closeTipText = '正在导入...';
            } else {
                //导出
                if (complete) {
                    mod5.find('#exportprocess').hide();
                    mod5.find('#exportsuccess').show();
                    ModExportSecond.SetFooter([
                        {
                            Text: '确定',
                            Theme: 'btn_ok',
                            CallBack: function () {
                                ExportOver();
                                clearInterval(internetInterval);
                                ModExportSecond.hide();
                            }
                        }
                    ])
                } else {
                    mod5.find('#exportprocess').show();
                    mod5.find('#exportsuccess').hide();
                }
                mod5.show();
                closeTipText = '正在导出...';
            }
        });
    }
    //完成
    var ModImportFourthContent = function (successReport) {
        var html = '';
        html += '<div class="row" id="importprocess" style="margin-left:0;margin-right:0;">';
        ///头
        html += GetHeaderHtml(4);
        html += '<div class="importbody">';
        html += '<div class="progresswrapper">'
        html += '<div class="el-progress-circle" style="width:97px;height:97px;">';
        html += '<svg viewBox="0 0 100 100">';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#52c41a" stroke-width="4" fill="none"></path>';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" stroke="#52c41a" stroke-width="4" fill="none"></path>';
        html += '</svg>';
        html += '</div>';
        html += '</div>';
        html += '<div class="importprocessnum">';
        html += '<span class="aufont icon-base-check" style="color: #52c41a; font-size: 30px;"></span>';
        html += '</div>';
        html += '<div class="importsuccessdes" style="color: rgba(0,0,0,.45);width:302px;height:88px;margin-left:165px;margin-top:40px">';

        var text = '';
        for (var i = 0; i < successReport.length; i++) {
            if (i == 0) {
                text = '已成功导入主表数据' + successReport[i].Quantity + '条';
            } else {
                text += '，&nbsp;' + successReport[i].SchemaName + '数据' + successReport[i].Quantity + '条';
            }
        }
        text += '！';

        html += text;
        html += '</div>';
        html += '</div>';
        return html;
    };
    function ModImportFourthBuild() {
        if (ModImportFourth == null || $.isEmptyObject(ModImportFourth)) {
            ModImportFourth = $.IModal({
                Title: "<span class='title'>" + importTitle + "</span><span class='littletitle'>" + AppName + '</span>',
                OnShowBeforeCallback: function () {
                    mod4 = this.Container;
                },
                OnShowCallback: function () {
                    mod4.find('.icon-guanbi').click(function () {
                        $tableTip.hide();
                        clearInterval(internetInterval);
                        ImportOver();
                    });
                },
                OnHiddenCallback: function () {
                    ModImportFourth.destroy();
                },
                Height: 550,
                Width: 800,
                ShowBack: true,
                HasIframe: false,
                Type: 1,
                Content: ModImportFourthContentResult,
                ShowInRootWindow: false,
                ToolButtons: [
                    {
                        Text: '完成',
                        Theme: 'btn_ok',
                        CallBack: function () {
                            ImportOver();
                            clearInterval(internetInterval);
                            ModImportFourth.hide();
                        }
                    }
                ],
                Class: importMoadlClass
            });
        } else {
            ModImportFourthContent.show();
        }
        initTipAndGuide();
    }
    //取消导入
    function ImportOver() {
        if (!ImportGuid) {
            return;
        }
        var cacheID = ImportGuid;
        writeClearCacheMsg(ImportGuid);

        var datas = {};
        datas['ActionName'] = 'ClearImportCache';
        datas['SchemaCode'] = SchemaCode;
        datas['ImportGuid'] = ImportGuid;
        datas = { PostData: JSON.stringify(datas) };
        ImportGuid = '';
        $.ajax({
            data: datas,
            datatype: 'json',
            type: 'POST',
            url: '/ExcelImport/OnAction',
            async: false,
            success: function (data) {
                writeClearCachOk(cacheID);
            }
        });
        $(document).unbind('keydown.import')
    }
    //表格列宽调整
    $(function () {
        function isNullOrUndefined(obj) {
            if (typeof (obj) == "undefined" || obj == null) {
                return true;
            }
            return false;
        }
        function registerTableDragEvent() {
            var dragTH; //记录拖拽的列
            var tableHeaderAdjust;
            var nextTH;
            var tbodyAdjust;
            var tableTH, tableNextTH;
            var tbodyTH, tbodyNextTH;
            //第一步按下
            $(document).on('mousedown', '#tableHeaderAdjust th', function (e) {
                e = e || window.event;
                if (e.offsetX > $(this).innerWidth() - 10) {
                    dragTH = $(this);
                    nextTH = $(this).next('th');
                    tableHeaderAdjust = $('#tableHeaderAdjust');
                    tbodyAdjust = $('.importerrortable');
                    var thIndex = dragTH.data('target');
                    tableTH = $('#tableHeaderAdjust colgroup').find('col').eq(thIndex);
                    tableNextTH = $('#tableHeaderAdjust colgroup').find('col').eq(thIndex + 1);
                    tbodyTH = $('.importerrortable colgroup').find('col').eq(thIndex);
                    tbodyNextTH = $('.importerrortable colgroup').find('col').eq(thIndex + 1);
                    dragTH.mouseDown = true;
                    dragTH.oldX = e.pageX || e.clientX;
                    dragTH.oldWidth = $(this).innerWidth();
                    tableHeaderAdjust.oldWidth = tableHeaderAdjust.innerWidth();
                    nextTH.oldWidth = nextTH.innerWidth();
                    tbodyAdjust.oldWidth = tbodyAdjust.innerWidth();
                    tableTH.oldWidth = tableTH.innerWidth();
                    tableNextTH.oldWidth = tableNextTH.innerWidth();
                    tbodyTH.oldWidth = tbodyTH.innerWidth();
                    tbodyNextTH.oldWidth = tbodyNextTH.innerWidth();
                }
            })

            //第二步 拖动
            $(document).on('mousemove', '#tableHeaderAdjust th', function (e) {
                //改鼠标样式
                if (e.offsetX > $(this).innerWidth() - 10) {
                    $(this).css({
                        cursor: "e-resize"
                    });
                } else {
                    $(this).css({
                        cursor: "default"
                    });
                }
                if (isNullOrUndefined(dragTH)) {
                    dragTH = $(this);
                }
                if (!isNullOrUndefined(dragTH.mouseDown) && dragTH.mouseDown == true) {
                    var difference = (e.pageX - dragTH.oldX) || (e.clientX - dragTH.oldX);
                    var newWidth = dragTH.oldWidth + difference; //新的宽度
                    var tableNewWidth = tableHeaderAdjust.oldWidth + difference; //表格新的宽度
                    var tbodyNewWidth = tbodyAdjust.oldWidth + difference;
                    var colNewWidth = tableTH.oldWidth + difference;
                    var bodyColNewWidth = tbodyTH.oldWidth + difference;
                    if (newWidth < 100 || newWidth == 100) {
                        return
                    }
                    dragTH.width(newWidth);
                    tableTH.attr('width', colNewWidth);
                    tbodyTH.attr('width', bodyColNewWidth);
                    if (difference > 0) {
                        tableHeaderAdjust.width(tableNewWidth);
                        tbodyAdjust.width(tbodyNewWidth);
                    } else {
                        tableHeaderAdjust.width(tableHeaderAdjust.oldWidth);
                        tbodyAdjust.width(tbodyAdjust.oldWidth);
                        nextTH.width(nextTH.oldWidth - difference);
                        tableNextTH.attr('width', tableNextTH.oldWidth - difference);
                        tbodyNextTH.attr('width', tbodyNextTH.oldWidth - difference);
                    }
                }
            })
            $(document).on('mouseleave', '#tableHeaderAdjust', function (e) {
                dragTH.mouseDown = false;
                isNullOrUndefined(undefined);
            })
            // 第三步，释放
            $(document).on('mouseup', '#tableHeaderAdjust', function (e) {
                dragTH.mouseDown = false;
            })
        }
        registerTableDragEvent();
    })


    /**
     * 导出入口
     */
    function InitExport(Code) {
        SelectListLen = null;
        SelectListObject = [];
        if (modMini && ExportGuid) {
            showImportError('系统正在导入或导出数据，请导入或导出完成后再点击');
            return false;
        }
        var listView = $.ListView.Element;
        var hasData = !listView.find('#rightBottomTableContainer .no-records-found').length;
        if (!hasData) {
            showImportError('没有可导出的数据');
            return false;
        }
        SelectListLen = $.ListView.GetSelected().length;
        for (var i = 0; i < SelectListLen; i++) {
            SelectListObject.push($.ListView.GetSelected()[i].ObjectId)
        }
        if (ExportGuid != '') {
            return;
        }
        ExportGuid = $.IGuid();
        SchemaCode = Code;
        ImportExportProcess = 0;
        var index = window.document.title.indexOf('-') + 1;
        AppName = window.document.title.slice(index).trim();
        if (AppName.length > 15) {
            AppName = AppName.slice(0, 15) + '...';
        }
        var columnType = '1'; //0:导入;1:导出;
        var datas = {};
        datas['ActionName'] = 'GetColumns';
        datas['SchemaCode'] = Code;
        datas = { PostData: JSON.stringify(datas) };
        $.ajax({
            data: datas,
            datatype: 'json',
            type: 'POST',
            url: '/ExcelExport/OnAction',
            async: true,
            success: function (data) {
                if (data.Successful) {
                    ModExportFirstContentResult = ModExportFirstContent();
                    ModExportFirstBuild(data.ReturnData['Columns']);
                    ExportTableBuild(Code,data.ReturnData['Columns']);
                } else {
                    showImportError(data.ErrorMessage);
                }
            }
        });
    }
    var ModExportFirstContent = function () {
        var html = '';
        html += '<div class="exportmodal" id="myexportmodal">';
        html += '<div class="exportbody">';
        if (SelectListLen > 0) {
            html += "<div class='export-data-type'> <div class='exportcheckallcontainer'><input type='radio' value='1' id='exportAllList' name='exportListType' class='exportListTypeW'/><label for='exportAllList' id='exportAllMark' style='float: left; margin-left: -9px;color:rgba(0,0,0,.65);'  class='importcolumnlabel importcolumnlabelall'>导出列表数据</label>";
            html += "<input type='radio' value='2' id='exportChooseList' name='exportListType' checked class='exportListTypeW'/><label for='exportChooseList' id='exportChooseMark'  style='float: left; margin-left: 30px;color:rgba(0,0,0,.65);'  class='importcolumnlabel importcolumnlabelall'>导出勾选数据</label></div></div>";
        } else {
            html += "<div class='export-data-type'> <div class='exportcheckallcontainer'><input type='radio' value='1' id='exportAllList' name='exportListType' checked /><label for='exportAllList' id='exportAllMark'  style='float: left; margin-left: -9px;color:rgba(0,0,0,.65);'  class='importcolumnlabel importcolumnlabelall'>导出列表数据</label></div></div>";
        }
        html += '<div class="exportbodytitle">';

        html += '请选择导出字段<span style="font-size:12px;color:rgba(0,0,0,.45)">（</span>';
        html += '<span class="aufont icon-base-check-square" style="font-size:12px;color:#D9D9D9;"></span>';
        html += '<span style="font-size:12px;color:rgba(0,0,0,.45)">为必须导出的字段</span>'
        html += '<span style="font-size:12px;color:rgba(0,0,0,.45)">）</span></div>';
        html += '<div class="exporttablecontainer">';
        html += "<div > <div class='exportcheckallcontainer'><input type='checkbox' value='' id='exportcolumncheckall' checked /><label for='exportcolumncheckall' style='float: left; margin-left: -9px;color:rgba(0,0,0,.65);'  class='importcolumnlabel importcolumnlabelall'><span class='aufont icon-base-check-square' style='width:16px;height:16px;'></span>&nbsp;&nbsp;全选</label></div></div>";
        html += '<table class="exporttable">';
        html += '<tbody>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    };
    function ModExportFirstBuild(columns) {
        if (ModExportFirst == null || $.isEmptyObject(ModExportFirst)) {
            ModExportFirst = $.IModal({
                Title: "<span class='title'>导出数据</span><span class='littletitle'>" + AppName + '</span>',
                OnShowBeforeCallback: function () {
                    mod5 = this.Container;
                },
                OnShowCallback: function () {
                    internetInterval = setInterval(function () {
                        if (!window.navigator.onLine) {
                            showImportError('网络中断，请检查网络！');
                            if (mod3 && mod3.find('#importprocess').css('display') != 'none') {
                                mod3.find('.btn_ok').html('关闭').width(35).click(function () {
                                    ImportOver();
                                    clearInterval(internetInterval);
                                    ModImportThird.hide();
                                })
                            }
                            if (mod5 && mod5.find('#exportprocess')) {
                                mod5.find('.btn_ok').html('关闭').width(35).click(function () {
                                    ExportOver();
                                    clearInterval(internetInterval);
                                    ModExportSecond.hide();
                                })
                            }
                        }
                    }, 10000);
                    //全选逻辑状态
                    var $exportcolumncheckall = mod5.find('#exportcolumncheckall');
                    var $exceptcheckallcheckboxes = mod5.find('.exporttable input[type=checkbox]');
                    $exportcolumncheckall.click(function () {
                        if ($(this).prop('checked')) {
                            mod5.find('.importcolumnlabelall span').removeClass('icon-base-minus-square').addClass('icon-base-check-square')
                        } else {
                            mod5.find('.importcolumnlabelall span').removeClass('icon-base-check-square').addClass('icon-base-minus-square')

                        }
                        $exceptcheckallcheckboxes.each(function () {
                            if (!$(this).prop('disabled')) {
                                $(this).prop('checked', $exportcolumncheckall.prop('checked'));
                                if ($exportcolumncheckall.prop('checked')) {
                                    $(this).parent().find('label>span').removeClass('icon-base-rectangle-o').addClass('icon-base-check-square').css('color', '#1890FF');
                                } else {
                                    $(this).parent().find('label>span').removeClass('icon-base-check-square').addClass('icon-base-rectangle-o').css('color', '#D9D9D9');
                                }
                            }
                        });
                    });
                    $exceptcheckallcheckboxes.click(function () {
                        if (!$(this).prop('checked')) {
                            $exportcolumncheckall.prop('checked', false);
                            mod5.find('.importcolumnlabelall span').removeClass('icon-base-check-square').addClass('icon-base-minus-square')
                            $(this).parent().find('label>span').removeClass('icon-base-check-square').addClass('icon-base-rectangle-o').css('color', '#D9D9D9');
                        } else if (mod5.find('.exporttable input[type=checkbox]:not(:checked)').length == 0) {
                            $exportcolumncheckall.prop('checked', true);
                            mod5.find('.importcolumnlabelall span').removeClass('icon-base-minus-square').addClass('icon-base-check-square')
                        }
                        if ($(this).prop('checked')) {
                            $(this).parent().find('label>span').removeClass('icon-base-rectangle-o').addClass('icon-base-check-square').css('color', '#1890FF');
                        }
                    });
                    //叉号关闭清缓存
                    mod5.find('.icon-guanbi').click(function () {
                        $tableTip.hide();
                        clearInterval(internetInterval);
                        ExportOver();
                    });
                    //字段值个数不超过十个字
                    var $labels = mod5.find('.exporttable .exportli label .text');

                    for (var i = 0; i < $labels.length; i++) {
                        var $label = $($labels[i]);
                        if ($label.text().length > 12) {
                            $label.text($label.text().slice(0, 12) + '...');
                        }
                    }
                },
                OnHiddenCallback: function () {
                    ModExportFirst.destroy();
                },
                Height: 544,
                Width: 800,
                ShowBack: true,
                HasIframe: false,
                Type: 1,
                Content: ModExportFirstContentResult,
                ShowInRootWindow: false,
                Class: ' import-export-modal export-modal ModExport',
                ToolButtons: [
                    {
                        Text: '导出',
                        Theme: 'btn_ok',
                        CallBack: function () {
                            var PropertyNames = '';
                            mod5
                                .find('#myexportmodal')
                                .find('.exporttable')
                                .find('tbody')
                                .find("[type='checkbox']")
                                .each(function () {
                                    var $this = $(this);
                                    if ($this.attr('id') == 'exportcolumncheckall') return;
                                    if ($this.prop('checked')) PropertyNames += $this.val() + ';';
                                });
                            if (PropertyNames == "") {
                                $.IShowWarn("提示", "请选择字段");
                                return false;
                            }
                            // 获取选择的导出数据类型
                            ExportDataType = $('input[name=exportListType]:checked').val();
                            ModExportFirst.hide();
                            if (!ModExportSecondContentResult) ModExportSecondContentResult = ModExportSecondContent();
                            ModExportSecondBuild(columns,PropertyNames);
                        }
                    }
                ]
            });
        } else {
            ModExportFirst.show();
        }
        closeTipText = '关闭对话框';
        initTipAndGuide();
    }
    var ModExportSecondContent = function () {
        var html = '';
        html += '<div class="row" id="exportsecond" style="margin-left:0;margin-right:0;">';
        ///体
        html += '<div class="exportbody body-export-process" id="exportprocess">';
        html += '<div class="progresswrapper">'
        html += '<div class="el-progress-circle" style="width:97px;height:97px;">';
        html += '<svg viewBox="0 0 100 100">';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#e5e9f2" stroke-width="4" fill="none" class="el-progress-circle__track"></path>';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" stroke="#1890FF" stroke-width="4" fill="none" class="el-progress-circle__path" style="stroke-dasharray: 224px, 299.08px; stroke-dashoffset: 224.31px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;"></path>';
        html += '</svg>';
        html += '</div>';
        html += '</div>';
        html += '<div class="exportprocessnum">0%</div>';
        html += '<div class="exportprocesstext">正在读取，请稍后...</div>';
        html += '</div>';
        html += '<div class="exporterror" style="display:none;margin-top:198px;text-align:center;">当前主表数据超2万条，请分批导出（单批导出主表数据量不超过2万条）</div>';
        //成功界面
        html += '<div id="exportsuccess" style="display:none;">';
        html += '<div class="progresswrapper">'
        html += '<div class="el-progress-circle" style="width:97px;height:97px;">';
        html += '<svg viewBox="0 0 100 100">';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#52c41a" stroke-width="4" fill="none"></path>';
        html += '<path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" stroke="#52c41a" stroke-width="4" fill="none"></path>';
        html += '</svg>';
        html += '</div>';
        html += '</div>';
        html += '<div class="importprocessnum" style="text-align:center;">';
        html += '<span class="aufont icon-base-check" style="color: #52c41a; font-size: 30px;"></span>';
        html += '</div>';
        html += '<div class="importsuccessdes">';
        //html += '已成功导出主数据100条， 子表1数据20条,子表2数据30条！';
        html += '</div>';
        html += '</div>';
        return html;
    };
    function ModExportSecondBuild(columns,PropertyNames) {
        if (ModExportSecond == null || $.isEmptyObject(ModExportSecond)) {
            ModExportSecond = $.IModal({
                Title: "<span class='title'>导出数据</span><span class='littletitle'>" + AppName + '</span>',
                OnShowCallback: function () {
                    Export(columns,PropertyNames);
                    mod5.find('.icon-guanbi').click(function () {
                        if (ImportExportProcess != 100 && ExportGuid) {
                            return false;
                        }
                        clearInterval(internetInterval);
                        $tableTip.hide();
                        ExportOver();
                    });
                },
                OnHiddenCallback: function () {
                    ModExportSecond.destroy();
                },
                Height: 544,
                Width: 800,
                ShowBack: true,
                HasIframe: false,
                Type: 1,
                Content: ModExportSecondContentResult,
                ShowInRootWindow: false,
                OnShowBeforeCallback: function () {
                    mod5 = this.Container;
                    mod5.find('.btn_ok').width(75);
                },
                ToolButtons: [
                    {
                        Text: '隐藏此窗口',
                        Theme: 'btn_ok',
                        CallBack: function () {
                            $.MsgFilter.remove();
                            mod5.hide();
                            if (mod5.find('.btn_ok').text() == '隐藏此窗口') {
                                addMiniModal(ImportExportProcess);
                            }
                        }
                    }
                ],
                Class: ' import-export-modal export-modal'
            });
        } else {
            ModExportSecond.show();
        }
        mod5.find('.btn_ok').hide();
        closeTipText = '';
        initTipAndGuide();
    };

    function ExportTableBuild(mySchemaCode, Columns) {
        //判断是否有做修改
        var checkhistory = localStorage.getItem(mySchemaCode);
        var historyList = "";
        var ischange = false;
        if (checkhistory != undefined && checkhistory != null) {
            historyList = JSON.parse(checkhistory);
            //记录属性的值 包括子表
            var historyProNum = 0;
            var responseProNum = 0;
            for (key in Columns) {
                responseProNum++;
            }
            for (key in historyList) {
                historyProNum++;
                var historyColumns = historyList[key];
                var responseColumns = Columns[key];
                //通过编码名和显示中文名  匹配的数量标识
                var marknum = 0;
                //如果 长度不一样 证明删除新增过字段 
                if (historyColumns == undefined || responseColumns == undefined || historyColumns.length != responseColumns.length) {
                    ischange = true;
                    break;
                }
                for (var i = 0; i < historyColumns.length; i++) {
                    for (var j = 0; j < responseColumns.length; j++) {
                        if (historyColumns[i].FieldName == responseColumns[j].FieldName && historyColumns[i].DisPlayName == responseColumns[j].DisPlayName) {
                            //如果编码跟记忆中编码 以及展示中文名相同时候 证明字段匹配到 标识加一
                            marknum++;
                            break;
                        }
                    }
                }
                //匹配行的数量不等于记忆中的数量 或者属性值数量不同(即子表数目不相同)
                if (!ischange && marknum != historyColumns.length) {
                    ischange = true;
                }
            }
            if (historyProNum != responseProNum) {
                ischange = true;
            }
        }
        if (ischange) {
            localStorage.removeItem(mySchemaCode);
        }
        if (ischange) {
            mod5.find(".modal-footer").prepend("<div class='exporttip'>提示：管理员修改了表单内容,部分字段需重新勾选</div>");
        }
        else if (SelectListLen > 0) {
            mod5.find(".modal-footer").prepend("<div class='exporttip'>提示：系统将导出列表中勾选的数据</div>");
        } else {
            mod5.find(".modal-footer").prepend("<div class='exporttip'>提示：系统将导出勾选字段数据</div>");
        }
        var $tabletbody = mod5
            .find('#myexportmodal')
            .find('.exporttable')
            .find('tbody');
        $tabletbody.html('');
        var html = '';
        var Schemas = [];
        for (var key in Columns) {//生成子表数组
            if (key != 'MainColumn') {
                Schemas.push(Columns[key]);
            }
        }
        var hasSpecialField = false;
        //主表字段显示
        html += '<div style="color: rgba(0,0,0,.85);margin-left:23px;float:left;width:90%;height:46px;line-height:46px;' +
            'border-bottom:1px solid rgba(0,0,0,.1)">&nbsp;&nbsp;&nbsp;&nbsp;' + AppName + '</div>';
        html += '<div><div>';
        BuildSchemaItems(mySchemaCode, Columns['MainColumn'], "MainColumn");
        //子表字段显示
        for (var i = 0; i < Schemas.length; i++) {//循环多个子表
            var SchemaName = Schemas[i][0].DisPlayName.split('.')[0];
            //取得子表编码
            var SchemaCode = Schemas[i][0].FieldName.split('.')[0];
            html += '<div style="color: rgba(0,0,0,.85);margin:8px 0 0 23px;float:left;width:90%;height:46px;line-height:46px;' +
                'border-bottom:1px solid rgba(0,0,0,.1)">&nbsp;&nbsp;&nbsp;&nbsp;' + SchemaName + '</div>';
            BuildSchemaItems(mySchemaCode, Schemas[i], SchemaCode);
        }
        $tabletbody.html(html);
        if (hasSpecialField) {
            mod5.find('#exportcolumncheckall').prop("checked", false);
            mod5.find('.exportcheckallcontainer .icon-base-check-square').removeClass('icon-base-check-square').addClass('icon-base-minus-square');
        }
        //加入导出预览 2018-10-04 
        var guidemark = window.localStorage.getItem("exportGuid")
        if (guidemark != "true") {
            //页面高度
            var pageheight = $(".modal-dialog").height();
            //与窗口顶部的距离
            var topheight = ($(top.window).height() - pageheight) / 2;
            var guidehtml = '<div class="guidemodel"id="guidemodel">';
            guidehtml += '<div class="guide-one" id="guide-one"><div class="guide-one-exportall" style="top:' + (topheight + 66) + 'px"><img src="/Content/images/exportAll.png"></div>';

            guidehtml += '<div class="guide-one-topMark" style="top: ' + (topheight + 118) + 'px;"><img src="/Content/images/topMark.png">';
            guidehtml += '<div class="guidecontent">1、选择这里,导出列表中<span style="color:#1890FF">所有数据</span></div></div>';
            guidehtml += '<div class="user-btn">';
            guidehtml += '<div class="guidebtn nextGuide" id="nextGuide">下一步</div>';
            guidehtml += '<div class="guidebtn exitGuide"  id="exitGuide">退出引导</div></div></div>';

            guidehtml += '<div class="guide-two" id="guide-two"><div class="guide-two-exportSelect" style="top:' + (topheight + 66) + 'px;"><img src="/Content/images/exportSelect.png"></div>';
            guidehtml += '<div class="guide-two-topMark" style="top:' + (topheight + 118) + 'px;"><img src="/Content/images/topMark.png">';
            guidehtml += '<div class="guidecontent">1、选择这里,导出列表中<span style="color:#1890FF">勾选的数据</span></div></div>';

            guidehtml += '<div class="user-btn">';
            guidehtml += '<div class="knowGuide" id="knowGuide">我知道了</div></div></div>';
            guidehtml += "</div>";
            $("body").append(guidehtml);
            //引导按钮事件
            $(document).on("click", "#nextGuide", function () {
                $("#guide-one").remove();
                $("#guide-two").css({ "display": "block" });
                window.localStorage.setItem("exportGuid", true);
            });
            $(document).on("click", "#exitGuide", function () {
                $("#guidemodel").remove();
                window.localStorage.setItem("exportGuid", true);
            });
            $(document).on("click", "#knowGuide", function () {
                $("#guidemodel").remove();
                window.localStorage.setItem("exportGuid", true);
            });
        }
        //导出字段排版
        function BuildSchemaItems(mySchemaCode, params, ColumnName) {
            console.log(params)
            //勾选记忆
            var checkhistory = localStorage.getItem(mySchemaCode);
            var historyList = "";
            if (checkhistory != undefined && checkhistory != null) {
                var checkObj = JSON.parse(checkhistory);
                historyList = checkObj[ColumnName];
            }
            for (var i = 0; i < params.length; i++) {
                var colObj = params[i];
                var mustCheck = colObj.IsMustBeChecked;
                var specialField = colObj.IsSpecialField;
                html += '<tr class="exportli"><td>';
                {
                    var disName = colObj.DisPlayName || '';
                    if (disName.length > 10) {
                        disName = disName.slice(0, 10);
                        disName += '...';
                    }
                    if (mustCheck) {
                        html +=
                            "<div><input class='defaultselectinput' checked disabled type='checkbox' value='" +
                            colObj.FieldName +
                            "' id='" +
                            colObj.FieldName +
                            '_export' +
                            "' /><label for='" +
                            colObj.FieldName +
                            '_export' +
                            "'  style='float: left;color: rgba(0,0,0,0.65);width:210px;cursor:no-drop;' class='importcolumnlabel 'title='必须导出的字段'>" +
                            "<span class='aufont icon-base-check-square' style='width:16px;height:16px;color:#D9D9D9;'></span><div class='text' style='display:inline-block;'>&nbsp;&nbsp;" + disName + '</div>' +
                            '</label></div>';
                    } else {
                        if (!hasSpecialField && specialField) {
                            hasSpecialField = true;
                        }
                        if (historyList == "" || historyList == undefined) {
                            html +=
                                "<div > <input " +
                                (specialField ? '' : 'checked') +
                                " type='checkbox' value='" +
                                colObj.FieldName +
                                "' id='" +
                                colObj.FieldName +
                                '_export' +
                                "' /><label for='" +
                                colObj.FieldName +
                                '_export' +
                                "'  style='float: left;color:rgba(0,0,0,0.65);width:210px;' class='importcolumnlabel'>" +
                                '<span class="aufont ' +
                                (specialField ? 'icon-base-rectangle-o' : 'icon-base-check-square') +
                                ' " ></span>' + '<div class="text">&nbsp;&nbsp;' + disName + '</div>' +
                                '</label></div>';
                        } else {
                            //当有历史记忆时候 选取历史记忆作为勾选项
                            var nocheck = true;
                            for (var j = 0; j < historyList.length; j++) {
                                if (historyList[j].FieldName == colObj.FieldName && historyList[j].DisPlayName == colObj.DisPlayName && historyList[j].isCheck == true) {
                                    nocheck = false;
                                }
                            }
                            html +=
                                "<div > <input " +
                                (nocheck ? '' : 'checked') +
                                " type='checkbox' value='" +
                                colObj.FieldName +
                                "' id='" +
                                colObj.FieldName +
                                '_export' +
                                "' /><label for='" +
                                colObj.FieldName +
                                '_export' +
                                "'  style='float: left;color:rgba(0,0,0,0.65);width:210px;' class='importcolumnlabel'>" +
                                '<span class="aufont ' +
                                (nocheck ? 'icon-base-rectangle-o' : 'icon-base-check-square') +
                                ' " ></span>' + '<div class="text">&nbsp;&nbsp;' + disName + '</div>' +
                                '</label></div>';
                        }
                        
                    }
                }
                html += '</td></tr>';
            }
        }
    }
    //导出数据 -- Excel
    function Export(columns,PropertyNames) {
        ExportGetObjectIdArray(columns,PropertyNames);
    }
    var ExportGetObjectIdArray = function (columns,PropertyNames) {
        var datas = {};
        var mysearchParamsJson = JSON.stringify($.AppFilter.getFiterJson());;
        var myscopeType = $.AppFilter.getScopeType();
        datas["ActionName"] = "ExportData";
        datas["SchemaCode"] = mySchemaCode;
        datas["SearchParamsJson"] = mysearchParamsJson;
        datas["PropertyNames"] = PropertyNames;
        datas["SortOrder"] = $.ListView.SortOrder;
        datas["SortName"] = $.ListView.SortName;
        datas["ScopeType"] = myscopeType;
        datas['ActionGuid'] = ExportGuid;
        datas['ExportDataType'] = ExportDataType;
        datas['ObjectIds'] = SelectListObject;
        $.ajax({
            data: { PostData: JSON.stringify(datas) },
            datatype: 'json',
            type: 'POST',
            url: '/ExcelExport/OnAction',
            async: true,
            success: function (result) {
                var success = result.Successful;
                if (success) {
                    GetExportProgress(columns,mySchemaCode,PropertyNames);
                    ImportExportProcess = 100; //叉号关闭弹窗
                    // if (result.ReturnData.TotalNum <= 100000) {
                    //   ExportGetVirtualObjectArray();
                    // } else{
                    //   ImportExportProcess = 100;//叉号关闭弹窗
                    //   mod5.find('#exportprocess').hide();
                    //   mod5.find('.exporterror').css('display','block');
                    //   ModExportSecond.SetFooter([
                    //     {
                    //         Text: '确定',
                    //         Theme: 'btn_ok',
                    //         CallBack: function () {
                    //           ModExportSecond.hide();
                    //             ExportOver();
                    //         }
                    //     }
                    //   ]);
                    // }
                } else {
                    ImportExportProcess = 100;
                    showImportError(result.ErrorMessage);
                    ModExportSecond.SetFooter([
                        {
                            Text: '确定',
                            Theme: 'btn_ok',
                            CallBack: function () {
                                ModExportSecond.hide();
                                ExportOver();
                            }
                        }
                    ]);
                }
            }
        });
    }
    // 获取导出进度
    var GetExportProgress = function (columns,mySchemaCode, propertyNames) {
        var datas = {};
        datas["ActionName"] = "GetExportProgress";
        datas["SchemaCode"] = mySchemaCode;
        datas['ActionGuid'] = ExportGuid;
        $.ajax({
            data: { PostData: JSON.stringify(datas) },
            datatype: 'json',
            type: 'POST',
            url: '/ExcelExport/OnAction',
            async: true,
            success: function (result) {
                var success = result.Successful;
                if (success) {
                    if (result.ReturnData.ExportState > 0) {
                        mod5.find('.btn_ok').show();
                        mod5.find('.exportprocesstext').text('正在导出...');
                        var process = result.ReturnData.ExportProgress;
                        ExportHandleProgress(process);
                        // 如果进度没到100,1秒后再次请求
                        if (process < 100) {
                            setTimeout(function () {
                                GetExportProgress(columns,mySchemaCode, propertyNames);
                            }, 1000);
                        } else {
                            // 下载文件
                            // ExportDownloadFile();
                            // 导出成功后  勾选记忆写在这里
                            var remarklist = {};  
                            var checklist = propertyNames.substring(0, propertyNames.length - 1).split(";");
                            for (key in columns) {        
                                var maincolumn = columns[key];
                                var columnList = new Array(maincolumn.length - 1);
                                for (var i = 0; i < maincolumn.length; i++) {
                                    var val = {};
                                    val["FieldName"] = maincolumn[i].FieldName;
                                    val["DisPlayName"] = maincolumn[i].DisPlayName;
                                    val["isCheck"] = false;
                                    for (var j = 0; j < checklist.length; j++) {
                                        if (maincolumn[i].FieldName == checklist[j]) {
                                            val["isCheck"] = true;
                                            break;
                                        }
                                    }
                                    columnList[i] = val;
                                }
                                remarklist[key] = columnList;
                            }
                           
                            localStorage.setItem(mySchemaCode, JSON.stringify(remarklist));
                            var exUrl = result.ReturnData.OSSUrl;
							// 处理edge浏览器excel下载名称乱码问题
                            var ua = navigator.userAgent;
                            if (ua.indexOf("Edge") > -1) {
                                exUrl = decodeURIComponent(exUrl);
                            }
                            exUrl = exUrl.replace("http", "https");
                            window.location.href = exUrl;
                            setTimeout(function () {
                                ExportHandleProgress(100);
                                ExportHandlerSuccess(result.ReturnData);
                            }, 200);
                        }
                    } else {
                        setTimeout(function () {
                            GetExportProgress(columns,mySchemaCode, propertyNames);
                        }, 1000);
                    }
                } else {
                    ImportExportProcess = 100;//叉号关闭弹窗
                    showImportError(result.ErrorMessage);
                    if (result.ReturnData.TotalNum > 20000) {
                        mod5.find('#exportprocess').hide();
                        mod5.find('.exporterror').css('display', 'block');
                    } else {
                        mod5.find('#exportprocess').hide();
                        mod5.find('.exporterror').text(result.ErrorMessage).css('display', 'block');
                    }
                }
            }
        });
    }
    var ExportHandleSpecialColumn = function () {
        var datas = {};
        datas["ActionName"] = "HandleSpecialColumn";
        datas["SchemaCode"] = mySchemaCode;
        datas['ActionGuid'] = ExportGuid;
        $.ajax({
            data: { PostData: JSON.stringify(datas) },
            datatype: 'json',
            type: 'POST',
            url: '/ExcelExport/OnAction',
            async: true,
            success: function (result) {
                var success = result.Successful;
                if (success) {
                    if (result.ReturnData.CurrentValue < result.ReturnData.TotalNum) {
                        ExportHandleSpecialColumn();
                    } else {
                        ExportHandleVirtualObject();
                    }
                } else {
                    showImportError(result.ErrorMessage);
                }
            }
        });
    }

    var ExportDownloadFile = function () {
        var datas = {};
        datas["ActionName"] = "DownloadFile";
        datas["SchemaCode"] = mySchemaCode;
        datas['ActionGuid'] = ExportGuid;
        var form = $('form.export-hide-form');
        var input = form.find('input');
        if (!form.length) {
            form = $("<form class='export-hide-form'></form>"); //定义一个form表单  
            form.attr("style", "display:none");
            form.attr("target", "");
            form.attr("method", "post");
            form.attr("action", "/ExcelExport/OnAction");
            var input = $("<input>");
            input.attr("type", "hidden");
            input.attr("name", "PostData");
            input.attr("value", JSON.stringify(datas));
            $("body").append(form);//将表单放置在web中  
            form.append(input);
        } else {
            input.attr("value", JSON.stringify(datas));
        }
        form.submit();
        form.remove();
        mod5.addClass('import-export-ing');
    }
    var ExportHandleProgress = function (exportprocess) {
        exportprocess = exportprocess >= 100 ? 100 : exportprocess;

        if (exportprocess >= 100) {
            closeTipText = "关闭对话框";
            mod5.addClass('import-export-ing');
        }
        ImportExportProcess = exportprocess;

        var settingProcess = function () {
            mod5.find('.exportprocessnum').html(exportprocess + '%');
            mod5.find('.el-progress-circle__path').css('stroke-dasharray', (224 + 292 / 100 * exportprocess) + 'px 299.08px');
            modMini && modMini.find('.progress-bar-inner').width(exportprocess + '%');
            modMini && modMini.find('.process-desc').text(exportprocess + '%');
            if (exportprocess >= 100) {
                closeTipText = '关闭对话框';
                exportprocess = 100;
                mod5.find('#exportprocess').hide();
                mod5.find('#exportsuccess').show();
                if (modMini) {
                    modMini.find('.title').text('导出完成!');
                    modMini.find('.progress-bar-ing').removeClass('progress-bar-ing').addClass('progress-bar-ok');
                    modMini.find('.process-desc').text('').addClass('aufont icon-base-check-circle');
                }
                mod5.find('.btn_ok').width(35).text('确定').click(function () {
                    if (modMini) {
                        modMini.remove();
                    }
                    ModExportSecond.hide();
                    clearInterval(internetInterval);
                    ExportOver();
                });
                mod5.find('.icon-guanbi').click(function () {
                    clearInterval(internetInterval);
                });
                return;
            }
        }

        settingProcess();
    }
    var ExportHandlerSuccess = function (childDetails) {
        var text = '已成功导出主数据' + childDetails.TotalNum + '条';
        for (var subTab in childDetails.ChildTableDetails) {
            text += '，&nbsp;' + subTab + '数据' + childDetails.ChildTableDetails[subTab] + '条';
        }
        text += '！';
        mod5.find('#exportsuccess .importsuccessdes').html(text);
    }
    //导出失败
    function ExportError(msg) {
        var $exportsecond = mod5.find('#exportsecond');
        $exportsecond.find('.checkerrorloading').hide();
        $exportsecond.find('.importsuccess').hide();
        $exportsecond.find('.importerrorbigtext').html(msg);
        $exportsecond.find('.importerrorbig').show();
    }
    function ExportOver() {
        var datas = {};
        datas['ActionName'] = 'ExportDataOver';
        datas['SchemaCode'] = mySchemaCode;
        datas['ActionGuid'] = ExportGuid;
        ExportGuid = '';
        datas = { PostData: JSON.stringify(datas) };
        $.ajax({
            data: datas,
            datatype: 'json',
            type: 'POST',
            url: '/ExcelExport/OnAction',
            async: true,
            success: function (data) { }
        });
    }
    //end导出

    /**
     * 公共方法
     */
    //获取导入公共头部
    function GetHeaderHtml(currentStep) {
        var html = '';
        var step = 1;
        var stepComplete = false;
        var currentClass = 'notthis';
        html += '<div class="importheader row">';
        if (step < currentStep) {
            stepComplete = true;
            currentClass += ' step-complete';
        } else if (step == currentStep) {
            currentClass = 'isthis';
        }
        html += '<div class="importheaderitem">';
        html += '<div class="importheaderitemnumber ' + currentClass + '">';
        html += '<span class="step ' + (stepComplete ? ' aufont icon-base-check ' : '') + '">'
            + (stepComplete ? '' : step) + '</span>';
        html += '</div>';
        html += '<div class="importheaderitemtext ' + currentClass + '">';
        html += '上传Excel';
        html += '</div>';
        html += '</div>';
        html += '<div class="importdivider ' + currentClass + '"></div>';

        // if (HasSeqNo && IsUpdate) {
        //     ++step;
        //     stepComplete = false;
        //     currentClass = 'notthis';
        //     if (step < currentStep) {
        //         stepComplete = true;
        //         currentClass += ' step-complete';
        //     } else if (step == currentStep) {
        //         currentClass = 'isthis';
        //     }
        //     html += '<div class="importheaderitem">';
        //     html += '<div class="importheaderitemnumber ' + currentClass + '">';
        //     html += '<span class="step ' + (stepComplete ? ' aufont icon-base-check ' : '') + '">'
        //         + (stepComplete ? '' : step) + '</span>';
        //     html += '</div>';
        //     html += '<div class="importheaderitemtext ' + currentClass + '">';
        //     html += '选择匹配字段';
        //     html += '</div>';
        //     html += '</div>';
        //     html += '<div class="importdivider ' + currentClass + '"></div>';
        // }

        ++step;
        stepComplete = false;
        currentClass = 'notthis';
        if (step < currentStep) {
            stepComplete = true;
            currentClass += ' step-complete';
        } else if (step == currentStep) {
            currentClass = 'isthis';
        }
        html += '<div class="importheaderitem">';
        html += '<div class="importheaderitemnumber ' + currentClass + '">';
        html += '<span class="step ' + (stepComplete ? ' aufont icon-base-check ' : '') + '">'
            + (stepComplete ? '' : step) + '</span>';
        html += '</div>';
        html += '<div class="importheaderitemtext ' + currentClass + '">';
        html += '校验数据';
        html += '</div>';
        html += '</div>';
        html += '<div class="importdivider ' + currentClass + '"></div>';

        ++step;
        stepComplete = false;
        currentClass = 'notthis';
        if (step < currentStep) {
            stepComplete = true;
            currentClass += ' step-complete';
        } else if (step == currentStep) {
            currentClass = 'isthis';
        }
        html += '<div class="importheaderitem">';
        html += '<div class="importheaderitemnumber ' + currentClass + '">';
        html += '<span class="step ' + (stepComplete ? ' aufont icon-base-check ' : '') + '">'
            + (stepComplete ? '' : step) + '</span>';
        html += '</div>';
        html += '<div class="importheaderitemtext ' + currentClass + '">';
        html += '导入数据';
        html += '</div>';
        html += '</div>';
        html += '<div class="importdivider ' + currentClass + '"></div>';

        ++step;
        stepComplete = false;
        currentClass = 'notthis';
        if (step < currentStep) {
            stepComplete = true;
            currentClass += ' step-complete';
        } else if (step == currentStep) {
            currentClass = 'isthis';
        }
        html += '<div class="importheaderitem">';
        html += '<div class="importheaderitemnumber ' + currentClass + '">';
        html += '<span class="step ' + (stepComplete ? ' aufont icon-base-check ' : '') + '">'
            + (stepComplete ? '' : step) + '</span>';
        html += '</div>';
        html += '<div class="importheaderitemtext ' + currentClass + '">完成</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="importheaderitemtext ' + currentClass + '">';

        html += '</div>';
        return html;
    }
    //获取随机数
    function getRandom(min, max) {
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min);
        return re;
    }
    //初始化下一步按钮、关闭按钮的Tips
    function initTipAndGuide() {
        $tableTip.length == 0 && ($tableTip = $('<div class="table-tip" style="display: none;"></div>').appendTo($("body")));
        $(document.body).off('mouseenter')
            .on('mouseenter', '.modal-header .close, .modal-footer .btn_disabled, .tool-tip',
            function (e) {
                var $that = $(this);
                var offset = $that.offset();
                var tooltipText = $that.attr('tooltip-title');

                if (tooltipText) {
                } else if (e.target.tagName == 'BUTTON') {
                    tooltipText = nextTipText;
                } else {
                    tooltipText = closeTipText;
                }
                if (tooltipText != "") {
                    $tableTip.text(tooltipText);
                    $tableTip.css('border', 'none');
                    var leftpx = offset.left + ($that.outerWidth() - $tableTip.outerWidth()) / 2 - $(window).scrollLeft();
                    var bottompx = e.target.tagName == 'BUTTON' ? $(window).height() - offset.top + 6 + $(window).scrollTop() : $(window).height() - offset.top - 55 + $(window).scrollTop();
                    $tableTip.text(tooltipText).css({
                        left: leftpx,
                        bottom: bottompx,
                        background: "rgba(0, 0, 0, .75)"
                    }).toggle();;
                }
            });
        $(document.body).off("mouseleave")
            .on("mouseleave", '.modal-header .close, .modal-footer button, .tool-tip',
            function () {
                $tableTip && $tableTip.hide();
            });
    }
    //导入alert框，临时方案
    var showImportError = function (msg, title) {
        msg = msg || '';
        if (!msg) return;
        if (msg.length < 35 && !title) {
            var options = {
                message: '<span style="font-family: initial;">' + msg + '</span>',
                type: "danger",
                fade_in_speed: 1000,
                ShowInRootWindow: false,
                cls: importErrorClass
            };
            $.H3WarningBox.show(options);
        } else {
            var that = this;
            title = title || '出错了！';
            this.$box = $('<div class="alert import-alert import-alert-box" role="alert"></div>');
            this.$boxContent = $('<div class="alert-box-content"></div>');
            this.$boxIcon = $('<div class="icon aufont icon-base-close-circle-o"></div>');
            this.$boxClose = $('<div class="close"><span class="aufont icon-base-close"></span></div>');
            this.$boxMsgWrap = $('<div class="message-wrap"></div>');
            this.$boxMsgTitle = $('<div class="title">' + title + '</div>');
            this.$boxMsg = $('<div class="content" style="font-family: initial;">' + msg + '</div>');

            this.$boxMsgWrap.append(this.$boxMsgTitle).append(this.$boxMsg);
            this.$boxContent.append(this.$boxMsgWrap);
            this.$box.append(this.$boxIcon).append(this.$boxClose).append(this.$boxContent);

            this.$box.off("mouseenter").on("mouseenter", function () {
                //停止淡出
                $(this).stop().css({
                    opacity: "",
                    height: ""
                });
                if (that.timeOut) {
                    clearTimeout(that.timeOut);
                }
                $(this).off("mouseleave").on("mouseleave", function () {
                    that.timeOut = setTimeout(function () { that._fadeout() }, option.fade_in_speed);
                });
            })

            //淡出并移除
            this._fadeout = function () {
                this.timeOut = this.$box.fadeOut(1000, function () {
                    that.$box.remove();
                })
            }

            this.$box.fadeIn(option.fade_in_speed, function () {
                that.timeOut = setTimeout(
                    function () { that._fadeout(); }, 3000
                )
            });

            this.$boxClose.off('click.close').on('click.close', function () {
                that._fadeout();
            });

            this.$box.appendTo($(top.document.body));
        }
    }
    //导入确认框，临时方案
    var showImportConfirm = {
        defaultOptions: {
            title: 'title',
            message: 'message',
            error_detail: '',
            type: 'danger',
            ShowInRootWindow: false,
            showFooter: true,
            callBack: undefined
        },
        show: function (options) {
            try {
                var options = $.extend({}, this.defaultOptions, options);
                this.popup.add(options);
            } catch (msg) { }
        },
        popup: {
            _modal:
            '<div class="modal fade import-confirm" tabindex="-1" role="dialog" data-backdrop="false"></div>',
            _modal_dialog: '<div class="modal-dialog " role="document"></div>',
            _modal_content: '<div class="modal-content"></div>',
            _modal_header: '<div class="modal-header"></div>',
            _modal_body: ' <div class="modal-body"></div></div>',
            _modal_icon: '<div class="icon aufont icon-base-exclamation-circle"></div>',
            _modal_message:
            '<div style="display: block;" class="message-wrap">' +
            '<span class="title"></span></br>' +
            '<span class="content"></span></div>',
            _modal_footer:
            '<div class="modal-footer"><div type="button" class="button btn btn-cancel">取消</div><div type="button" class="button btn btn-ok">确定</div></div>',
            add: function (option) {
                option.ShowInRootWindow = false;
                var that = this;
                $.H3Popup.IsShow = true;
                if (option && option.message) {
                    var $modal = $(this._modal);
                    var $Header = $(this._modal_header);
                    var dialogClassName = 'modal-dialog-' + option.type;
                    if (option.title) {
                        $Header.find('h4').html(option.title);
                    }
                    var $modaldialog = $(this._modal_dialog).addClass(dialogClassName);

                    var $message = $(this._modal_message);
                    $message.find('.title').html(option.title);
                    $message.find('.content').html(option.message);
                    var $modalbody = $(this._modal_body)
                        .append($(this._modal_icon))
                        .append($message);

                    var $modalfooter = $(this._modal_footer);
                    var $modalcontent = $(this._modal_content)
                        .append($modalbody);

                    if (option.showFooter) {
                        $modalcontent
                            .append($modalfooter);
                    }

                    $modaldialog.append($modalcontent);
                    if (option.ShowInRootWindow) {
                        $modal.append($modaldialog).appendTo($(top.window.document.body));
                    } else {
                        $modal.append($modaldialog).appendTo($('body'));
                    }
                    $modal.modal('show');
                    //高斯模糊处理
                    $.MsgFilter.show();
                    //确定按钮
                    $modalfooter.find('.btn-ok').click(function () {
                        $modal.modal('hide');
                        $(this).attr('disabled', 'disabled').text('处理中');
                        if ($.isFunction(option.callBack)) {
                            option.callBack.apply(that, [true]);
                        }
                    });

                    //取消操作
                    $modalfooter.find('.btn-cancel').click(function () {
                        $modal.modal('hide');
                        if ($.isFunction(option.callBack)) {
                            option.callBack.apply(that, [false]);
                        }
                    });

                    $modal.on('shown.bs.modal', function () {
                        //设置居中
                        var windowHeight = 0;
                        if (option.ShowInRootWindow) {
                            windowHeight = $(top.window).height();
                        } else {
                            windowHeight = $(window).height();
                        }
                        var topValue = windowHeight / 2 - $modalcontent.height();
                        $modalcontent.css('margin-top', topValue);
                    });

                    $modal.on('hidden.bs.modal', function () {
                        $.H3Popup.IsShow = false;
                        $modal.remove();
                        $.MsgFilter.remove();
                    });
                }
            }
        }
    };
    //代理所有的下载模板、错误报告按钮
    $('body').off('click.downloadreport')
        .on('click.downloadreport', '.import-export-modal a.download', function (e) {
            e.stopPropagation();
            //下载导入导出文件时，先做一些（参数、权限。。。）校验
            var target = $(e.target);
            if (target.hasClass("disabled")) {
                return;
            }
            var url = target.attr('downurl') || '';
            if (target.hasClass('error-report')) {
                target.addClass("disabled");
            }
            if (url) {
                var paramsIndex = url.indexOf('?');
                var action = url.slice(0, paramsIndex);
                var paramsStr = url.slice(paramsIndex + 1).split('=')[1];
                var params = {};
                try {
                    params = JSON.parse(paramsStr);
                } catch (e) {
                    paramsStr = paramsStr.replace(new RegExp('"', "gm"), '');
                    paramsStr = paramsStr.slice(1, params.length - 1);
                    paramsStr = paramsStr.split(',');
                    for (var i = 0; i < paramsStr.length; i++) {
                        var kv = paramsStr[i].split(':');
                        params[kv[0]] = params(kv[1]);
                    }
                }
                if (!params.ActionGuid) {
                    var ActionGuid = $.IGuid();
                    params.ActionGuid = ActionGuid;
                }
                // params.IsValidateAndProcessDate = false;
                params.ImportOption = mod1.find('[name="state"]:checked').val();
                var datas = { PostData: JSON.stringify(params) };
                $.ajax({
                    data: datas,
                    datatype: 'json',
                    type: 'POST',
                    url: action,
                    async: true,
                    success: function (result) {
                        if (result.Successful) {
                            var exUrl = result.ReturnData.OSSUrl;
							// 处理edge浏览器excel下载名称乱码问题
                            var ua = navigator.userAgent;
                            if (ua.indexOf("Edge") > -1) {
                                exUrl = decodeURIComponent(exUrl);
                            }
                            exUrl = exUrl.replace("http", "https");
                            window.location.href = exUrl;
                        } else {
                            showImportError(result.ErrorMessage);
                        }
                    },
                    error: function () {
                    }
                });

            }

            return false;
        });
    //代理所有在线编辑错误链接
    $('body').off('click.linkdetails').on('click.linkdetails', '.errortablecontainer [data-error-id]', function (e) {
        var targetId = $(this).data().errorId;
        var error = $(targetId);
        if (error.length) {
            var cellIndex = error[0].cellIndex;
            var container = $(this).closest('.fixed-table_body-wraper');

            var cols = $(this).closest('.fixed-table_body-wraper').find('colgroup col');
            var left = 20;
            for (var i = 0; i < cellIndex; i++) {
                var w = cols[i].getAttribute('width') - 0;
                left += w;
            }
            left -= container.width();
            left += error.width();
            if (left < 0) left = 0;
            container.closest('.fixed-table_body-wraper').scrollLeft(left);
        }
    })
    //代理所有的下拉菜单隐藏
    $('body').off('click.hiddenerrordrop').on('click.hiddenerrordrop', '.errortablecontainer', function (e) {
        var lastFormControl = $(e.target).closest('.SheetQuery');
        if (!lastFormControl.length) {
            $('.form-query-dropdown').hide();
        }
    })
    window.InitImport = InitImport;
    window.InitExport = InitExport;

    $(document).on('click', '.exportListTypeW', function () {
        var val = $(this).val();
        if (val == 1) {
            $('.modal-footer .exporttip').text('提示：系统将导出列表刷选后的数据');
        } else if (val == 2) {
            $('.modal-footer .exporttip').text('提示：系统将导出列表勾选的数据');
        }
    })
    /**
     * 测试方法，用于记录一些信息
     */

    //记录提示信息
    function writeErrorMsg(msg) {
        msg = msg || '--------';
        console.log(msg);
        var date = new Date();
        date = date.toLocaleString();
        console.log('出错了, ImportGuid:' + ImportGuid + ', time: ' + date);
    }
    function writeClearCacheMsg(id) {
        var date = new Date();
        date = date.toLocaleString();
        console.log('开始清除缓存, ImportGuid:' + id + ', time: ' + date);
    }
    function writeClearCachOk(id) {
        var date = new Date();
        date = date.toLocaleString();
        console.log('结束清除缓存, ImportGuid:' + id + ', time: ' + date);
    }
})();;
$.AppFilter = {};

$.AppFilter.init = function (downState) {
    var that = this;
    that.$Controlls = {};
    var throttledOnChangeHandler = $.Throttle(function () {
        $.ListView.RefreshView();
    }, window, 600);

    $(".mycombobox").each(function () {
        var $this = $(this);
        var propertyname = $(this).attr("id");
        var item = $this.FormComboBox({ IsQueryControl:true });
        if (QueryDefaultValues[propertyname]) {
            item.SetValue(QueryDefaultValues[propertyname][0])
        }
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    $(".mycombobox").removeClass("form-group");
    $(".mycomboboxlist").each(function () {
        var $this = $(this);
        var propertyname = $(this).attr("id");
        var item = $this.FormComboBoxList({ IsQueryControl: true });
        if (QueryDefaultValues[propertyname]) {
            item.SetValue(QueryDefaultValues[propertyname][0])
        }
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    $(".mycomboboxlist").removeClass("form-group");
    // 统一初始化datetimepicker
    $(".mydatetime").each(function () {
        var $this = $(this);
        var propertyname = $(this).attr("id");
        var displayFormat = $(this).attr("data-datetimemode");
        var item = $this.AppFilterDateTime({
            "begineValue": QueryDefaultValues[propertyname] ? QueryDefaultValues[propertyname][0] : null,
            "endValue": QueryDefaultValues[propertyname] ? QueryDefaultValues[propertyname][1] : null,
            "DisplayFormat": displayFormat
        });
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    // 统一初始化选人控件
    $(".myuserpicker").each(function () {
        var $this = $(this);
        var propertyname = $this.attr("id");
        var item = $this.AppFilterUser({
            defaultValue: QueryDefaultValues[propertyname] ? QueryDefaultValues[propertyname] : null
        });
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    $(".myuserpicker").removeClass("form-group");

    // 统一初始化关联查询控件
    var $myquerys = $(".mydropdown");
    $(".mydropdown").each(function () {
        var $this = $(this);
        var propertyname = $this.attr("id");
        var item = $this.FormMultiQuery({ IsQueryControl: true });
        //add by xc  
        var v = QueryDefaultValues[propertyname];
        if (v && v.length > 0) {
            item.SetValue(v[0], false);
        }
        //end
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    })
    $(".mydropdown").removeClass("form-group");

    // 统一初始化下拉多选
    $(".mymultiselect").each(function () {
        var propertyname = $(this).attr("id");
        var item = $(this).AppFilterMultiSelect({
            defaultValue: QueryDefaultValues[propertyname] ? QueryDefaultValues[propertyname] : null
        });
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    // 下拉搜索自动获取焦点
    $(".dropdown-toggle").on('click', function () {
        var that = this;
        setTimeout(function () {
            $(that).next().find("input.multiselect-search").focus();
        }, 200);
    });

    $(".FormAreaSelect").each(function () {
        var $this = $(this);
        var item = $this.FormAreaSelect({ IsQueryControl: true});
        var propertyname = $(this).attr("id");
        try {
            if (QueryDefaultValues[propertyname] && QueryDefaultValues[propertyname][0])
                item.SetValue(QueryDefaultValues[propertyname][0])
        }
        catch (e) {
            console.log("address default error");
        }
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    //统一初始化下拉框关联
    $(".FormDropDownList").each(function () {
        var myDropDownList = $(this).FormDropDownList({ IsQueryControl: true });
        var propertyname = $(this).attr("id");
        var v = QueryDefaultValues[propertyname];
        if (v && v.length > 0) {
            myDropDownList.SetValue(v[0]);
        }
        //end
        myDropDownList.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = myDropDownList;
    });
    $(".FormDropDownList").removeClass("form-group");
    //文本，关联下拉框
    $(".FormComboBoxList").each(function () {
        var item = $(this).FormComboBoxList({ IsQueryControl: true });
        var propertyname = $(this).attr("id");
        var v = QueryDefaultValues[propertyname];
        if (v && v.length > 0) {
            item.SetValue(v[0]);
        }
        //end
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    $(".FormComboBoxList").removeClass("form-group");
    //数字
    $(".mynum").each(function () {
        var $this = $(this);
        var propertyname = $(this).attr("id");
        var item = $this.AppFilterNum({
            defaultValue: QueryDefaultValues[propertyname] ? QueryDefaultValues[propertyname] : null
        });
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    //布尔
    $(".mybool").each(function () {
        var $this = $(this);
        var propertyname = $(this).attr("id");
        var item = $this.AppFilterBool({
            "defaultValue": QueryDefaultValues[propertyname] ? QueryDefaultValues[propertyname] : null,
            "propertyname":propertyname
        });
        item.OnChange = throttledOnChangeHandler;
        that.$Controlls[propertyname] = item;
    });
    //权限
    $("#scopeType").unbind("change").bind("change", function () {
        $.ListView.RefreshView();
    });
    //子表
    $("#showchildschemacode").unbind("change").bind("change", function () {
        ResetAppFilter();
        $.ListView.RefreshViewIncludeHeader();
    });

    //模式切换
    $("#toggleMode").unbind("change").bind("change", function () {
        var index = this.selectedIndex;
        var value = this.options[index].value;
        var url = window.location.href;
        if (getUrlParam('mode') != "") {
            var reg = new RegExp("(^|&)mode=([^&]*)(&|$)")
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                window.location.href = url.replace(r[0], "&mode=" + value)
            }
        } else {
            //最后一个是#，会有问题
            if (url.charAt(url.length - 1) == "#") {
                url = url.substr(0, url.length - 1);
            }
            window.location.href = url + "&mode=" + value
        }
    });

    // 查询条件展开or收起icon-shang2
    $("#toggleSearch").unbind("click").bind("click", function () {
        var $this = $(this);
        if ($this.find("i").hasClass("icon-arrow-up-double-b")) {
            $this.find("i").removeClass("icon-arrow-up-double-b").addClass("icon-arrow-down-double-b");
            $("#divSearch > div.form-group:gt(0)").hide("fast");
            that.downState = true;
        }
        else {
            $this.find("i").removeClass("icon-arrow-down-double-b").addClass("icon-arrow-up-double-b");
            $("#divSearch > div.form-group").show("fast");
            that.downState = false;
        }
        setTimeout(function () {
            $.ListView.GetResetHeight();
        }, 500)
    });
    // 查询条件多于2行时默认触发收起
    var seachRowCount = $("#divSearch > div.form-group").length;
    if (seachRowCount > 1) {
        $("#toggleSearch").show().trigger("click");
    }
    else { 
        $("#toggleSearch").hide();
        // 没有查询条件时，隐藏查询按钮
        if (seachRowCount === 0) {
            $("#Search").hide();
        }
    }
}

// 获取查询条件
// 返回 {"":[],...}
$.AppFilter.getFiterJson = function () {
    var that = this;
    var searchParams = {};
    for (var key in that.$Controlls) {
        var item = that.$Controlls[key];
        var v = item.GetValue();
        if ($.isArray(v)) {
            searchParams[key] = v;
        } else if (typeof v == "string") {
            if (v && v.length > 0) {
                v = v.split(';');
                var newV = [];
                for (var i = 0; i < v.length; i++) {
                    if (v[i] == undefined || v[i] == 'undefined') {
                        newV.push('');
                    } else if (v[i] != '') {
                        newV.push(v[i]);
                    }
                }
                searchParams[key] = newV;
            }
        } else {
            searchParams[key] = [];
        }
    }
    return searchParams;
};
$.AppFilter.getScopeType = function () {
    return $("#scopeType").val();
};
$.AppFilter.getChildSchemaCode = function () {
    return $("#showchildschemacode").val();
};
//列表多的控件
(function ($) {
    //----------------------------------------时间-------------------------------------------------
    var AppFilterDateTime = function (opt, Base) {
        var that = this;
        this.Options = $.extend({}, opt);
        this.base = $(Base);
        this.StartTime = null;
        this.EndTime = null;
        this.configurable = true;
        this.ConstValue = {
            startClass: "",
            endClass: ""
        }
        this.Init();
    };
    $.fn.AppFilterDateTime = function (opt) {
        return new AppFilterDateTime(opt, this);
    }
    AppFilterDateTime.prototype = {
        Init: function () {
            var that = this;
            if (that.Options.OnChange && $.isFunction(that.Options.OnChange)) {
                that.OnChange = that.Options.OnChange;
            }
            that.Render();
        },
        Render: function () {
            var that = this;
            var $this = this.base;
            var h = new Array();
            h.push('<div class="input-group-addon">从</div>');
            h.push('<input type="text" data-datetimemode="' + that.Options.DisplayFormat + '" class="form-control myform-control mydatetimepicker mytimestart" />');
            h.push('<div class="input-group-addon" style="border-width: 1px 0 1px 0;">至</div>');
            h.push('<input type="text" data-datetimemode="' + that.Options.DisplayFormat + '" class="form-control myform-control mydatetimepicker mytimeend" />');
            $this.html(h.join(""));
            var v = new Array();
            $this.find(".mydatetimepicker").each(function () {
                var $picker = $(this);
                var propertyname = $picker.parent().attr("id");
                var minView = 2;
                var startView = 2;
                var mode = $picker.attr("data-datetimemode");
                if (mode == "yyyy-mm-dd hh:ii") {
                    minView = 0;
                }
                if (mode == "hh:ii") {
                    startView = 0;
                    minView = 0;
                }
                if (mode == "yyyy-mm") {
                    startView = 3;
                    minView = 3;
                }

                $picker.datetimepicker({
                    language: 'zh-CN',
                    format: mode,
                    todayBtn: true,
                    autoclose: true,
                    startView: startView, // 选择器打开后首先显示的视图
                    minView: minView// 选择器能够提供的最精确的视图
                }).on("change", function () {
                    if (!that.configurable)
                        return;
                    if ($picker.hasClass("mytimestart")) {
                        that.StartTime = this.value
                    }
                    if ($picker.hasClass("mytimeend")) {
                        that.EndTime = this.value
                    }
                    that.OnChange();
                });
                if ($picker.hasClass("mytimestart") && that.Options.begineValue) {
                    $picker.val(that.Options.begineValue);
                    v.push(that.Options.begineValue);
                }
                else {
                    v.push(null);
                }
                if ($picker.hasClass("mytimeend") && that.Options.endValue) {
                    $picker.val(that.Options.endValue);
                    v.push(that.Options.endValue);
                } else {
                    v.push(null);
                }
            });
            that.StartTime = that.Options.begineValue;
            that.EndTime = that.Options.endValue;
            that.Value = v;
            var $btnGroup = $('<div class="input-group-btn">');
            var $btn = $('<button data-toggle="dropdown" class="btn btn-default dropdown-toggle"style="width: 15px;padding-left: 0px;padding-right:0px;height:30px;" type="button"><span class="caret"></span></button>');
            var $ul = $('<ul class="dropdown-menu pull-right">');
            $ul.append('<li data-type="1"><a href="#">当天</a></li>');
            $ul.append('<li data-type="6"><a href="#">昨天</a></li>');
            $ul.append('<li data-type="2"><a href="#">本周</a></li>');
            $ul.append('<li data-type="3"><a href="#">本月</a></li>');
            $ul.append('<li data-type="7"><a href="#">上月</a></li>');
            $ul.append('<li data-type="4"><a href="#">本季度</a></li>');
            $ul.append('<li data-type="5"><a href="#">本年度</a></li>');
            $ul.find("li").click(function () {
                var type = $(this).data("type");
                var myDate = new Date();
                switch (type + "")//1=当天；2=本周；3=本月；4=本季度；5=本年度；6=昨天；7=上月
                {
                    case "1":
                        beginvalue = myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + myDate.getDate();
                        endvalue = myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + myDate.getDate();
                        break;
                    case "2":
                        beginvalue = $.GetFirstAndLastdayweek()[0];
                        endvalue = $.GetFirstAndLastdayweek()[1];
                        break;
                    case "3":
                        beginvalue = myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + "01";
                        endvalue = $.GetFirstAndLastMonthDay(myDate.getFullYear(), (myDate.getMonth() - 0 + 1));
                        break;
                    case "4":
                        beginvalue = $.GetFirstAndLastDayQuarter()[0];
                        endvalue = $.GetFirstAndLastDayQuarter()[1];
                        break;

                    case "5":
                        beginvalue = myDate.getFullYear() + "-" + "01" + "-" + "01";
                        endvalue = myDate.getFullYear() + "-" + "12" + "-" + "31";
                        break;
                    case "6":
                        myDate = myDate.AddDays(-1);
                        beginvalue = myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + myDate.getDate();
                        endvalue = myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + myDate.getDate();
                        break;
                    case "7":
                        myDate = myDate.AddMonths(-1);
                        beginvalue = myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + "01";
                        endvalue = $.GetFirstAndLastMonthDay(myDate.getFullYear(), (myDate.getMonth() - 0 + 1));
                        break;
                }
                $this.find("input.mydatetimepicker:first").val(beginvalue);
                $this.find("input.mydatetimepicker:last").val(endvalue);
                that.StartTime = beginvalue;
                that.EndTime = endvalue;
                that.OnChange();
            });
            $btnGroup.append($btn).append($ul);
            $this.append($btnGroup);
        },
        GetValue: function () {
            return [this.StartTime, this.EndTime];
        },
        SetValue: function (v) {
            if ($.isArray(v) && v.length > 1) {
                this.configurable = false;
                this.base.find("input.mydatetimepicker:first").val(v[0]);
                this.base.find("input.mydatetimepicker:last").val(v[1]);
                this.StartTime = v[0];
                this.EndTime = v[1];
                this.OnChange();
                this.configurable = true;
            }
        },
        OnChange: function () {

        }
    }
   
    //----------------------------------------数字-------------------------------------------------
    var AppFilterNum = function (opt, Base) {
        var that = this;
        this.Options = $.extend({}, opt);
        this.base = $(Base);
        this.Value = null;
        this.configurable = true;
        this.Init();

    };
    $.fn.AppFilterNum = function (opt) {
        return new AppFilterNum(opt, this);
    }
    AppFilterNum.prototype = {
        Init: function () {
            var that = this;
            if (that.Options.OnChange && $.isFunction(that.Options.OnChange)) {
                that.OnChange = that.Options.OnChange;
            }
            that.Render();
        },
        Render: function () {
            var that = this;
            var $this = that.base;
            var h = new Array();
            h.push('<div class="input-group-addon">从</div>');
            var value1 = that.Options.defaultValue && that.Options.defaultValue.length > 0 ?(that.Options.defaultValue[0]+""):"";
            h.push(' <input type="text" class="form-control myform-control" value="' + value1 + '" />');
            h.push('<div class="input-group-addon" style="border-width: 1px 0 1px 0;">至</div>');
            var value2 = that.Options.defaultValue && that.Options.defaultValue.length > 1 ? (that.Options.defaultValue[1] + "") : "";
            h.push('<input type="text" class="form-control myform-control" value="' + value2 + '" />');
            $this.html(h.join(""));
            that.Value = [value1, value2];
            $this.find("input").unbind("change").bind("change", function () {
                if (!that.configurable)
                    return;
                var v = new Array();
                if ($.isNumeric($this.find("input:first").val())) {
                    v.push($this.find("input:first").val());
                }
                else {
                    v.push(null);
                }
                if ($.isNumeric($this.find("input:last").val())) {
                    v.push($this.find("input:last").val());
                }
                else {
                    v.push(null);
                }
                that.Value = v;
                that.OnChange();
            })
        },
        GetValue: function () {
            return this.Value;
        },
        SetValue: function (v) {
            if ($.isArray(v)) {
                if (v.length > 1) {
                    this.configurable = false;
                    var vv = new Array();
                    if ($.isNumeric(v[0])) {
                        this.base.find("input:first").val(v[0]);
                        vv.push(v[0]);
                    }
                    else {
                        vv.push(null);
                    }
                    if ($.isNumeric(v[1])) {
                        this.base.find("input:last").val(v[1]);
                    }
                    else {
                        vv.push(null);
                    }
                    this.Value = vv;
                    this.configurable = true;
                    this.OnChange();
                }
            }
        },
        OnChange: function () {

        }
    }
    //----------------------------------------布尔-------------------------------------------------
    var AppFilterBool = function (opt, Base) {
        var that = this;
        this.Options = $.extend({}, opt);
        this.base = $(Base);
        this.Value = null;
        this.configurable = true;
        this.Init();

    };
    $.fn.AppFilterBool = function (opt) {
        return new AppFilterBool(opt, this);
    }
    AppFilterBool.prototype = {
        Init: function () {
            var that = this;
            if (that.Options.OnChange && $.isFunction(that.Options.OnChange)) {
                that.OnChange = that.Options.OnChange;
            }
            that.Render();
        },
        Render: function () {
            var that = this;
            var $this = that.base;
            var h = new Array();
            var defaultValue = new Array();
            if (that.Options.defaultValue == "true") {
                h.push('<input id="' + that.Options.propertyname + 't" type="checkbox" value="true" checked="checked" />');
                defaultValue.push("true");
            }
            else {
                h.push(' <input id="' + that.Options.propertyname + 't" type="checkbox" value="true" />');
            }
            h.push('<label for="' + that.Options.propertyname + 't" class="checkbox-inline" style="margin:2px 10px 0 0">是</label>');
            if (that.Options.defaultValue == "false") {
                h.push('<input id="' + that.Options.propertyname + 'f" type="checkbox" value="false" checked="checked" />');
                defaultValue.push("false");
            }
            else {
                h.push(' <input id="' + that.Options.propertyname + 'f" type="checkbox" value="false" />');
            }
            h.push('<label for="' + that.Options.propertyname + 'f" class="checkbox-inline" style="margin:2px 10px 0 0">否</label>');
            that.Value = defaultValue;
            $this.html(h.join(""));
            $this.find("input").unbind("change").bind("change", function () {
                if (!that.configurable)
                    return;
                var v = [];
                $this.find("input:checked").each(function () {
                    v.push($(this).val());
                });
                that.Value = v;
                that.OnChange();
            })

        },
        GetValue: function () {
            return this.Value;
        },
        SetValue: function (v) {
            if ($.isArray(v)) {
                this.configurable = false;
                var vv = new Array();
                for (var i = 0; i < v.length; i++) {
                    if (v[i] == "false") {
                        this.base.find("input:last").prop("checked", true);
                        vv.push(v[i]);
                    }
                    if (v[i] == "true") {
                        this.base.find("input:first").prop("checked", true);
                        vv.push(v[i]);
                    }
                }
                this.Value = vv;
                this.OnChange();
                this.configurable = true;
            }
        },
        OnChange: function () {

        }
    }
    //----------------------------------------选人-------------------------------------------------
    var AppFilterUser = function (opt, Base) {
        var that = this;
        this.Options = $.extend({}, opt);
        this.configurable = true;
        this.base = $(Base).FormMultiUser({ IsQueryControl: true });
        this.Options.defaultValue ? this.base.SetValue(this.Options.defaultValue) : "";
        this.Value = null;
        this.Init();

    };
    $.fn.AppFilterUser = function (opt) {
        return new AppFilterUser(opt, this);
    }
    AppFilterUser.prototype = {
        Init: function () {
            var that = this;
            if (that.Options.OnChange && $.isFunction(that.Options.OnChange)) {
                that.OnChange = that.Options.OnChange;
            }
            this.base.OnChange = function () {
                if (!that.configurable)
                    return;
                that.OnChange();
            }
        },
        GetValue: function () {
            return this.base.GetUnitIDs();
        },
        SetValue: function (v) {
            if ($.isArray(v)) {
                this.configurable = false;
                this.base.SetValue(v);
                this.configurable = true;
                this.Value = v;
                this.OnChange();
            }
        },
        OnChange: function () {

        }
    }
}(jQuery));
(function (window) {
    var basicContext ={};
    var overflow = null;

    var ITEM      = 'item',
        SEPARATOR = 'separator',
        BUTTON='button',
        CHECKBOX = 'checkbox';
    var DIRECTION={
        UP:'up',
        DOWN:'down',
        LEFT:'left',
        RIGHT:'right'
    };

    basicContext.dom = function(elem) {
        if(elem){
            return document.querySelector('.basicContext ' + elem);
        }
        return document.querySelector('.basicContext');
    }

    basicContext.valid = function(item) {

        var emptyItem = (Object.keys(item).length===0 ? true : false);

        if (emptyItem===true)     item.type    = SEPARATOR;
        if (item.type==null)      item.type    = ITEM;
        if (item.class==null)     item.class   = '';
        if (item.visible!==false) item.visible = true;
        if (item.icon==null)      item.icon    = null;
        if (item.title==null)     item.title   = 'Undefined';

        // Add disabled class when item disabled
        if (item.disabled!==true) item.disabled = false;
        if (item.disabled===true) item.class += ' basicContext__item--disabled';

        // Item requires a function when
        // it's not a separator and not disabled
        if (item.fn==null && item.type!==SEPARATOR && item.disabled===false) {

            console.warn('Missing fn for item' +item.title);
            return false;

        }

        return true;

    }

    basicContext.buildItem = function(item, num) {

        var html = '',
            span = '',
            div = '';
        // Parse and validate item
        if (this.valid(item)===false) return '';

        // Skip when invisible
        if (item.visible===false) return '';

        // Give item a unique number
        item.num = num;

        // Generate span/icon-element
        var className = 'basicContext__icon ' + item.icon + ' ';

        if (item.type === BUTTON) {
            div = '<div class="' + item.icon+'" style="text-align: center;">确定</div >';
        }
        else if (item.type === CHECKBOX) {
            var id = $.IGuid();
            var checked = item.selected ? "checked" : "";
            div = "<div class='chk-box'><input type='checkbox' id='" + id + "' " + checked + "><label for='" + id + "'></label>" + item.title + "</div>";        
        }
        else if (item.icon!==null) span = "<span class='"+className+"'></span>";

        // Generate item
        if (item.type === ITEM) {
            html = "<tr class='basicContext__item " + item.class + "'><td class='basicContext__data' data-num='" + item.num + "'>" + span + item.title + "</td></tr>";

        } else if (item.type === SEPARATOR) {

            html = "<tr class='basicContext__item basicContext__item--separator'></tr>";
        }
        else if (item.type === CHECKBOX) {
            html = "<tr class='basicContext__item " + item.class + "'><td class='basicContext__data' data-num='" + item.num + "'>" + div + "</td></tr>";
        }
        else if (item.type === BUTTON) {
            html = "<tr class='basicContext__item " + item.class + "'><td class='basicContext__data' data-num='" + item.num + "'>" + div  + "</td></tr>";
        }
        return html;

    }

    basicContext.build = function(items,buttonItem) {

        var html = '';
        html+="<div class='basicContextContainer'>";
        html+="<div class='basicContext'>";
        //添加箭头框，模拟伪类:before
        html += "<div class='basicContext_before'></div>";
        html += "<div class='table_div'>";
        html += "<div style='max-height:360px;overflow:auto;'>";
        html+="<table>";
        html+="<tbody>";
        for(var i=0,len=items.length;i<len;i++){
            html+=this.buildItem(items[i], i);
        }
        html+="</tbody>";
        html += "</table>";
        html += "</div>";
       
        html += "</div>";
        //添加箭头框，模拟伪类:after
        html+="<div class='basicContext_after'></div>";
        html+="</div>";
        html+="</div>";
        return html;
    }

    basicContext.getNormalizedEvent = function(e) {
        var pos = {
            x : e.clientX,
            y : e.clientY
        };

        if (e.type==='touchend' && (pos.x==null || pos.y==null)) {

            // We need to capture clientX and clientY from original event
            // when the event 'touchend' does not return the touch position

            var touches = e.changedTouches;

            if (touches!=null&&touches.length>0) {
                pos.x = touches[0].clientX;
                pos.y = touches[0].clientY;
            }

        }

        // Position unknown
        if (pos.x==null || pos.x < 0) pos.x = 0;
        if (pos.y==null || pos.y < 0) pos.y = 0;

        return pos;

    }

    basicContext.getPosition = function(e, context,direction) {
        // Get the click position
        var normalizedEvent = this.getNormalizedEvent(e)

        // Set the initial position
        var x = normalizedEvent.x,
            y = normalizedEvent.y,
            rx=0,ry=0;
        // Get size of browser
        var browserSize = {
            width  : window.innerWidth,
            height : window.innerHeight
        };

        // Get size of context
        var contextSize = {
            width  : context.offsetWidth,
            height : context.offsetHeight
        };
        //if has dierction params
        if(direction){
            var r_direction="",r_left=0,r_top=0;//真实方位 箭头偏移的位置 top left
            var target=e.target;
            var pos=target.getBoundingClientRect();
            // calculate relative position of context
            if(direction==DIRECTION.UP){
                //向上显示
                x=pos.left+(pos.width/2);
                y=pos.top;

                //先判断y轴方向
                if((y-contextSize.height-5)<0){
                    //改为向下显示
                    ry=pos.bottom+5;
                    r_direction=DIRECTION.DOWN;
                    r_top=0;
                }else{
                    ry=y-contextSize.height-5;
                    r_direction=DIRECTION.UP;
                    r_top=contextSize.height;
                }
                //计算context的相对起始位置 x轴方向
                if((x+(contextSize.width/2))>browserSize.width){
                    //右对齐
                    rx=pos.right-contextSize.width;
                    r_left=contextSize.width-(pos.width/2)-3;
                }else if((x-contextSize.width/2)<0){
                    //左对齐
                    rx=pos.left;
                    r_left=pos.width/2-3;
                }else{
                    rx=x-contextSize.width/2;
                    r_left=contextSize.width/2-3;
                }

            }else if(direction==DIRECTION.DOWN){
                //向下显示
                x=pos.left+(pos.width/2);
                y=pos.bottom;
                //先判断y轴方向
                if((y+contextSize.height+5)>browserSize.height){
                    //改为向上显示
                    ry=pos.top-contextSize.height-5;
                    r_direction=DIRECTION.UP;
                    r_top=contextSize.height;
                }else{
                    ry=y+5;
                    r_direction=DIRECTION.DOWN;
                    r_top=0;
                }
                //计算context的相对起始位置 x轴方向
                if((x+(contextSize.width/2))>browserSize.width){
                    //右对齐
                    rx=pos.right-contextSize.width;
                    r_left=contextSize.width-(pos.width/2)-3;
                }else if((x-contextSize.width/2)<0){
                    //左对齐
                    rx=pos.left;
                    r_left=pos.width/2-3;
                }else{
                    rx=x-contextSize.width/2;
                    r_left=contextSize.width/2-3;
                }
            }else if(direction==DIRECTION.LEFT){
                x=pos.left;
                y=pos.top+pos.height/2;
                if((x-contextSize.width-5)<0){
                    //右侧显示
                    rx = pos.right + 5;
                    r_direction = "right";                    
                }else{
                    rx = x - contextSize.width - 5;
                    r_direction = "left";
                    r_left = contextSize.width;
                }
                //计算y轴方向的偏移
                if((y+contextSize.height/2)>browserSize.height){
                    //底部对齐
                    ry=pos.bottom-contextSize.height;
                }else if((y-contextSize.height)<0){
                    //顶部对齐
                    ry = y - contextSize.height / 2;
                }else{
                    ry=y-(contextSize.height/2);
                }
                r_top = contextSize.height / 2 - 6;
                //左侧显示
            }else if(direction==DIRECTION.RIGHT){
                //右侧显示
                x=pos.right;
                y=pos.top+pos.height/2;
                if(x+contextSize.width+5>browserSize.width){
                    //超出范围，左侧显示
                    rx=pos.left-contextSize.width-5;
                    r_direction="left";
                    r_left=contextSize.width;
                }else{
                    rx=x+5;
                    r_left=0;
                    r_direction="right";
                }
                //计算y轴方向的偏移
                if((y+contextSize.height/2)>browserSize.height){
                    //底部对齐
                    ry=pos.bottom-contextSize.height;
                    r_top=contextSize.height-pos.height/2-6;
                }else if((y-contextSize.height)<0){
                    //顶部对齐
                    ry=pos.top;
                    r_top=pos.height/2-6;
                }else{
                    ry=y-(contextSize.height/2);
                    r_top=contextSize.height/2-6;
                }
            }
            return { x: x, y: y, rx: rx, ry: ry, r_direction: r_direction, r_left: r_left, r_top: r_top};

        }else{

            // Fix position based on context and browser size
            if ((x + contextSize.width) > browserSize.width)   x = x - ((x + contextSize.width) - browserSize.width);
            if ((y + contextSize.height) > browserSize.height) y = y - ((y + contextSize.height) - browserSize.height);

            // Make context scrollable and start at the top of the browser
            // when context is higher than the browser
            if (contextSize.height > browserSize.height) {
                y = 0;
                context.classList.add('basicContext--scrollable');
            }

            // Calculate the relative position of the mouse to the context
            var rx = normalizedEvent.x - x,
                ry = normalizedEvent.y - y;

            return { x:x, y:y, rx:rx, ry:ry };
        }
    }

    basicContext.bind = function(item) {

        if (item.fn==null)        return false;
        if (item.visible===false) return false;
        if (item.disabled===true) return false;

        basicContext.dom("td[data-num='"+item.num+"']").onclick       = item.fn;
        //dom("td[data-num='"+item.num+"']").oncontextmenu = item.fn;

        return true;

    }

    basicContext.show = function(items, e, direction, fnClose, fnCallback) {

        // Build context
        var html = this.build(items);

        // Add context to the body
        document.body.insertAdjacentHTML('beforeend', html);

        // Save current overflow and block scrolling of site
        if (overflow==null) {
            overflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }

        // Cache the context
        var context = this.dom();

        // Calculate position
        var position = this.getPosition(e, context,direction);

        // Set position
        if(direction){
            context.style.left=position.rx+'px';
            context.style.top=position.ry+'px';
            context.style.opacity=1;

            //设置before、after的样式
            var r_direction=position.r_direction;
            var r_left=position.r_left;
            var r_top=position.r_top;
            var before=document.querySelector('.basicContext_before');
            var after=document.querySelector('.basicContext_after');
            if(r_direction==DIRECTION.RIGHT){
                //右侧显示，左侧箭头
                before.style.top=r_top +'px';
                after.style.top=r_top +'px';
                before.style.left='-11px';
                before.style.borderRightColor="rgba(245,245,245,1)";
                after.style.left='-12px';
                after.style.borderRightColor ="rgba(0,0,0,0.22)";
            }else if(r_direction==DIRECTION.LEFT){
                //左侧显示，右侧箭头
                before.style.top=r_top +'px';
                after.style.top=r_top +'px';
                before.style.left=r_left-1+'px';
                before.style.borderLeftColor="rgba(245,245,245,1)";
                after.style.left=r_left+'px';
                after.style.borderLeftColor ="rgba(0,0,0,0.22)";
            }else if(r_direction===DIRECTION.UP){
                //顶部显示，向下箭头
                before.style.left=r_left +'px';
                after.style.left=r_left +'px';
                before.style.top=r_top-1+'px';
                before.style.borderTopColor="rgba(245,245,245,1)";
                after.style.top=r_top+'px';
                after.style.borderTopColor ="rgba(0,0,0,0.22)";

            }else if(r_direction==DIRECTION.DOWN){
                //底部显示，向上箭头
                before.style.left=r_left +'px';
                after.style.left=r_left +'px';
                before.style.top=r_top-11+'px';
                before.style.borderBottomColor="#fff";
                after.style.top=r_top-12+'px';
                after.style.borderBottomColor="#888";
            }
        }else{
            context.style.left            = position.x +'px';
            context.style.top             = position.y +'px';
            context.style.transformOrigin = position.rx+'px ' +position.ry +'px';
            context.style.opacity = 1;
            //此处箭头暂隐藏
            document.querySelector('.basicContext_before').style.display = 'none';
            document.querySelector('.basicContext_after').style.display = 'none';
        }



        // Close fn fallback
        if (fnClose==null) fnClose = this.close;

        // Bind click on background
        context.parentElement.onclick       = fnClose;
        context.parentElement.oncontextmenu = fnClose;

        // Bind click on items
        items.forEach(this.bind);

        // Do not trigger default event or further propagation
        if (typeof e.preventDefault === 'function')  e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();

        // Call callback when a function
        if (typeof fnCallback === 'function') fnCallback();

        return true;

    }

    basicContext.visible = function() {

        var elem = this.dom();

        if (elem==null || elem.length===0) return false;
        else                               return true;

    }

    basicContext.close = function() {
        if (basicContext.visible()===false) return false;

        var container = document.querySelector('.basicContextContainer');

        container.parentElement.removeChild(container);

        // Reset overflow to its original value
        if (overflow!=null) {
            document.body.style.overflow = overflow;
            overflow = null;
        }

        return true;

    }

    window.basicContext = basicContext;
}(window));




;
(function ($) {
    'use strict';
    function transitionEnd() {
        var el = document.createElement('mm');
        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                };
            }
        }
        return false;
    }
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false;
        var $el = this;
        $(this).one('mmTransitionEnd', function () {
            called = true;
        });
        var callback = function () {
            if (!called) {
                $($el).trigger($transition.end);
            }
        };
        setTimeout(callback, duration);
        return this;
    };
    var $transition = transitionEnd();
    if (!!$transition) {
        $.event.special.mmTransitionEnd = {
            bindType: $transition.end,
            delegateType: $transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) {
                    return e.handleObj.handler.apply(this, arguments);
                }
            }
        };
    }
    var MetisMenu = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, MetisMenu.DEFAULTS, options);
        this.transitioning = null;
        if (this.options.toggle) { }
        //this.show();
        this.init();
    };
    MetisMenu.TRANSITION_DURATION = 350;
    MetisMenu.DEFAULTS = {
        toggle: true,
        doubleTapToGo: false,
        onlyforOrganization: false,
        AddChildNodes: function () { }
    };
    MetisMenu.prototype.init = function () {
        var $this = this;
        this.$element.find('li.active').has('ul').children('ul').addClass('collapse in');
        this.$element.find('li').not('.active').has('ul').children('ul').addClass('collapse');
        if (this.options.Ctrl) {
            this.$element.data("ctrl", this.options.Ctrl);
        }
        //add the 'doubleTapToGo' class to active items if needed
        if (this.options.doubleTapToGo) {
            this.$element.find('li.active').has('ul').children('a').addClass('doubleTapToGo');
        }
        this.$element.find('li').children('a').children('.fa-arrow,.icon-xiangyou').on('click.metisMenu', { ctrl: this.$element.data("ctrl") }, function (e) {
            var self = $(this);
            var self = self.parent();
            var UnitID = self.attr("id");
            if ($this.options.onlyforOrganization) {
                if (self.attr("HasChild") != "HasChild")
                    return;
            }
            var $parent = self.parent('li');
            var $list = $parent.children('ul');
            e.preventDefault();
            if ($parent.hasClass('active')) {
                $this.hide($list);
            } else {
                if ($this.options.onlyforOrganization) {
                    var selfarray = new Array();
                    selfarray.push(self);
                    $this.options.AddChildNodes.apply(this, selfarray);
                }
                if ($parent.has("ul").length == 0)
                    return;
                $list = $parent.children('ul');
                $this.show($list);
                if (e.data.ctrl) {
                    var units = e.data.ctrl.GetUnitIDs();
                    if (units && units.length > 0) {
                        for (var i = 0; i < units.length; i++) {
                            $list.find("input[type='checkbox'][id='c_" + units[i] + "']").prop("checked", true);
                        }
                    }
                }
            }
            //Do we need to enable the double tap
            if ($this.options.doubleTapToGo) {
                //if we hit a second time on the link and the href is valid, navigate to that url
                if ($this.doubleTapToGo(self) && self.attr('href') !== '#' && self.attr('href') !== '') {
                    e.stopPropagation();
                    document.location = self.attr('href');
                    return;
                }
            }
        });
    };
    MetisMenu.prototype.doubleTapToGo = function (elem) {
        var $this = this.$element;
        //if the class 'doubleTapToGo' exists, remove it and return
        if (elem.hasClass('doubleTapToGo')) {
            elem.removeClass('doubleTapToGo');
            return true;
        }
        //does not exists, add a new class and return false
        if (elem.parent().children('ul').length) {
            //first remove all other class
            $this.find('.doubleTapToGo').removeClass('doubleTapToGo');
            //add the class on the current element
            elem.addClass('doubleTapToGo');
            return false;
        }
    };
    MetisMenu.prototype.show = function (el) {
        var $this = $(el);
        var $parent = $this.parent('li');
        if (this.transitioning || $this.hasClass('in')) {
            return;
        }
        $parent.addClass('active');
        if (this.options.toggle) {
            this.hide($parent.siblings().children('ul.in'));
        }
        $this
            .removeClass('collapse')
            .addClass('collapsing')
            .height(0);
        this.transitioning = 1;
        var complete = function () {
            $this
                .removeClass('collapsing')
                .addClass('collapse in')
                .height('');
            this.transitioning = 0;
        };
        if (!$transition) {
            return complete.call(this);
        }
        if (!$.isEmptyObject($this[0])) {
            $this
                .one('mmTransitionEnd', $.proxy(complete, this))
                .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
                .height($this[0].scrollHeight);
        }
        else {
            $this
                .one('mmTransitionEnd', $.proxy(complete, this))
                .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
        }
    };
    MetisMenu.prototype.hide = function (el) {
        var $this = $(el);
        if (this.transitioning || !$this.hasClass('in')) {
            return;
        }
        $this.parent('li').removeClass('active');
        $this.height($this.height())[0].offsetHeight;
        $this
            .addClass('collapsing')
            .removeClass('collapse')
            .removeClass('in');
        this.transitioning = 1;
        var complete = function () {
            this.transitioning = 0;
            $this
                .removeClass('collapsing')
                .addClass('collapse');
        };
        if (!$transition) {
            return complete.call(this);
        }
        $this
            .height(0)
            .one('mmTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION);
    };
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('mm');
            var options = $.extend({}, MetisMenu.DEFAULTS, $this.data(), typeof option === 'object' && option);
            if (!data) {
                $this.data('mm', (data = new MetisMenu(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    }
    var old = $.fn.metisMenu;
    $.fn.metisMenu = Plugin;
    $.fn.metisMenu.Constructor = MetisMenu;
    $.fn.metisMenu.noConflict = function () {
        $.fn.metisMenu = old;
        return this;
    };
})(jQuery);
;
/**
               _ _____           _          _     _      
              | |  __ \         (_)        | |   | |     
      ___ ___ | | |__) |___  ___ _ ______ _| |__ | | ___ 
     / __/ _ \| |  _  // _ \/ __| |_  / _` | '_ \| |/ _ \
    | (_| (_) | | | \ \  __/\__ \ |/ / (_| | |_) | |  __/
     \___\___/|_|_|  \_\___||___/_/___\__,_|_.__/|_|\___|
	 
	v1.6 - jQuery plugin c_reated by Alvaro Prieto Lauroba
	
	Licences: MIT & GPL
	Feel free to use or modify this plugin as far as my full name is kept	
	
	If you are going to use this plug-in in production environments it is 
	strongly recommended to use its minified version: colResizable.min.js

*/

(function($){ 	
	
	var d = $(document); 		//window object
	var h = $("head");			//head object
	var drag = null;			//reference to the current grip that is being dragged
	var tables = {};			//object of the already processed tables (table.id as key)
	var	count = 0;				//internal count to create unique IDs when needed.	
	
	//common strings for packing
	var ID = "id";	
	var PX = "px";
	var SIGNATURE ="JColResizer";
    var FLEX = "JCLRFlex";
	
	//short-cuts
	var I = parseInt;
	var M = Math;
	var ie = navigator.userAgent.indexOf('Trident/4.0')>0;
	var S;
	try{S = sessionStorage;}catch(e){}	//Firefox crashes when executed as local file system
	
	//append required CSS rules  
    h.append("<style type='text/css'>  .JColResizer{table-layout:fixed;} .JColResizer > tbody > tr > td, .JColResizer > tbody > tr > th{overflow:hidden;padding-left:0!important; padding-right:0!important;}  .JCLRgrips{ height:0px; position:relative;} .JCLRgrip{margin-left:-5px; position:absolute; z-index:5; } .JCLRgrip .JColResizer{position:absolute;background-color:red;filter:alpha(opacity=1);opacity:0;width:10px;height:100%;cursor: e-resize;top:0px} .JCLRLastGrip{position:absolute; width:1px; } .JCLRgripDrag{ border-left:1px dotted black;	} .JCLRFlex{width:auto!important;} .JCLRgrip.JCLRdisabledGrip .JColResizer{cursor:default; display:none;}</style>");
       
	/**
	 * Function to allow column resizing for table objects. It is the starting point to apply the plugin.
	 * @param {DOM node} tb - reference to the DOM table object to be enhanced
	 * @param {Object} options	- some customization values
	 */
	var init = function( tb, options){	
		var t = $(tb);				    //the table object is wrapped
        t.opt = options;                //each table has its own options available at anytime
        t.mode = options.resizeMode;    //shortcuts
        t.dc = t.opt.disabledColumns;
		if(t.opt.disable) return destroy(t);				//the user is asking to destroy a previously colResized table
		var	id = t.id = t.attr(ID) || SIGNATURE+count++;	//its id is obtained, if null new one is generated		
		t.p = t.opt.postbackSafe; 							//short-cut to detect postback safe 		
		if(!t.is("table") || tables[id] && !t.opt.partialRefresh) return; 		//if the object is not a table or if it was already processed then it is ignored.
		if (t.opt.hoverCursor !== 'e-resize') h.append("<style type='text/css'>.JCLRgrip .JColResizer:hover{cursor:"+ t.opt.hoverCursor +"!important}</style>");  //if hoverCursor has been set, append the style
		t.addClass(SIGNATURE).attr(ID, id).before('<div class="JCLRgrips"/>');	//the grips container object is added. Signature class forces table rendering in fixed-layout mode to prevent column's min-width
		t.g = []; t.c = []; t.w = t.width(); t.gc = t.prev(); t.f=t.opt.fixed;	//t.c and t.g are arrays of columns and grips respectively				
		if(options.marginLeft) t.gc.css("marginLeft", options.marginLeft);  	//if the table contains margins, it must be specified
		if(options.marginRight) t.gc.css("marginRight", options.marginRight);  	//since there is no (direct) way to obtain margin values in its original units (%, em, ...)
		t.cs = I(ie? tb.cellSpacing || tb.currentStyle.borderSpacing :t.css('border-spacing'))||2;	//table cellspacing (not even jQuery is fully cross-browser)
		t.b  = I(ie? tb.border || tb.currentStyle.borderLeftWidth :t.css('border-left-width'))||1;	//outer border width (again cross-browser issues)
		// if(!(tb.style.width || tb.width)) t.width(t.width()); //I am not an IE fan at all, but it is a pity that only IE has the currentStyle attribute working as expected. For this reason I can not check easily if the table has an explicit width or if it is rendered as "auto"
		tables[id] = t; 	//the table object is stored using its id as key	
		createGrips(t);		//grips are created 
	
	};


	/**
	 * This function allows to remove any enhancements performed by this plugin on a previously processed table.
	 * @param {jQuery ref} t - table object
	 */
	var destroy = function(t){
		var id=t.attr(ID), t=tables[id];		//its table object is found
		if(!t||!t.is("table")) return;			//if none, then it wasn't processed	 
		t.removeClass(SIGNATURE+" "+FLEX).gc.remove();	//class and grips are removed
		delete tables[id];						//clean up data
	};


	/**
	 * Function to create all the grips associated with the table given by parameters 
	 * @param {jQuery ref} t - table object
	 */
	var createGrips = function(t){	
	
        var th = t.find(">thead>tr:first>th,>thead>tr:first>td"); //table headers are obtained
		if(!th.length) th = t.find(">tbody>tr:first>th,>tr:first>th,>tbody>tr:first>td, >tr:first>td");	 //but headers can also be included in different ways
		th = th.filter(":visible");					//filter invisible columns
		t.cg = t.find("col"); 						//a table can also contain a colgroup with col elements		
		t.ln = th.length;							//table length is stored	
		if(t.p && S && S[t.id])memento(t,th);		//if 'postbackSafe' is enabled and there is data for the current table, its coloumn layout is restored
		th.each(function(i){						//iterate through the table column headers			
			var c = $(this); 						//jquery wrap for the current column		
            var dc = t.dc.indexOf(i)!=-1;           //is this a disabled column?
			var g = $(t.gc.append('<div class="JCLRgrip"></div>')[0].lastChild); //add the visual node to be used as grip
            g.append(dc ? "": t.opt.gripInnerHtml).append('<div class="'+SIGNATURE+'"></div>');
            if(i == t.ln-1){                        //if the current grip is the las one 
                g.addClass("JCLRLastGrip");         //add a different css class to stlye it in a different way if needed
                if(t.f) g.html("");                 //if the table resizing mode is set to fixed, the last grip is removed since table with can not change
            }
            g.bind('touchstart mousedown', onGripMouseDown); //bind the mousedown event to start dragging 
            
            if (!dc){ 
                //if normal column bind the mousedown event to start dragging, if disabled then apply its css class
                g.removeClass('JCLRdisabledGrip').bind('touchstart mousedown', onGripMouseDown);      
            }else{
                g.addClass('JCLRdisabledGrip'); 
            }

			g.t = t; g.i = i; g.c = c;	c.w =c.width();		//some values are stored in the grip's node data as shortcut
			t.g.push(g); t.c.push(c);						//the current grip and column are added to its table object
			c.width(c.w).removeAttr("width");				//the width of the column is converted into pixel-based measurements
			g.data(SIGNATURE, {i:i, t:t.attr(ID), last: i == t.ln-1});	 //grip index and its table name are stored in the HTML 												
		}); 	
		t.cg.removeAttr("width");	//remove the width attribute from elements in the colgroup 

		t.find('td, th').not(th).not('table th, table td').each(function(){  
			$(this).removeAttr('width');	//the width attribute is removed from all table cells which are not nested in other tables and dont belong to the header
		});		
        if(!t.f){
            t.removeAttr('width').addClass(FLEX); //if not fixed, let the table grow as needed
        }
        syncGrips(t); 				//the grips are positioned according to the current table layout			
        //there is a small problem, some cells in the table could contain dimension values interfering with the 
        //width value set by this plugin. Those values are removed
		
	};
	
    
	/**
	 * Function to allow the persistence of columns dimensions after a browser postback. It is based in
	 * the HTML5 sessionStorage object, which can be emulated for older browsers using sessionstorage.js
	 * @param {jQuery ref} t - table object
	 * @param {jQuery ref} th - reference to the first row elements (only set in deserialization)
	 */
	var memento = function(t, th){ 
		var w,m=0,i=0,aux =[],tw;
		if(th){										//in deserialization mode (after a postback)
			t.cg.removeAttr("width");
			if(t.opt.flush){ S[t.id] =""; return;} 	//if flush is activated, stored data is removed
			w = S[t.id].split(";");					//column widths is obtained
			tw = w[t.ln+1];
            if(!t.f && tw){							//if not fixed and table width data available its size is restored
                t.width(tw*=1);
                if(t.opt.overflow) {				//if overfolw flag is set, restore table width also as table min-width
                    t.css('min-width', tw + PX);
                    t.w = tw;
                }
            }
			for(;i<t.ln;i++){						//for each column
				aux.push(100*w[i]/w[t.ln]+"%"); 	//width is stored in an array since it will be required again a couple of lines ahead
				th.eq(i).css("width", aux[i] ); 	//each column width in % is restored
			}			
			for(i=0;i<t.ln;i++)
				t.cg.eq(i).css("width", aux[i]);	//this code is required in order to create an inline CSS rule with higher precedence than an existing CSS class in the "col" elements
		}else{							//in serialization mode (after resizing a column)
			S[t.id] ="";				//clean up previous data
			for(;i < t.c.length; i++){	//iterate through columns
				w = t.c[i].width();		//width is obtained
				S[t.id] += w+";";		//width is appended to the sessionStorage object using ID as key
				m+=w;					//carriage is updated to obtain the full size used by columns
			}
			S[t.id]+=m;							//the last item of the serialized string is the table's active area (width), 
												//to be able to obtain % width value of each columns while deserializing
			if(!t.f) S[t.id] += ";"+t.width(); 	//if not fixed, table width is stored
		}	
	};
	
	
	/**
	 * Function that places each grip in the correct position according to the current table layout	 
	 * @param {jQuery ref} t - table object
	 */
	var syncGrips = function (t){	
        //t.gc.width(t.w);			//the grip's container width is updated		
        t.gc.width($(t[0]).width());
		for(var i=0; i<t.ln; i++){	//for each column
			var c = t.c[i]; 			
			t.g[i].css({			//height and position of the grip is updated according to the table layout
				left: c.offset().left - t.offset().left + c.outerWidth(false) + t.cs / 2 + PX,
				height: t.opt.headerOnly? t.c[0].outerHeight(false) : t.outerHeight(false)				
			});			
		} 	
	};
	
	
	
	/**
	* This function updates column's width according to the horizontal position increment of the grip being
	* dragged. The function can be called while dragging if liveDragging is enabled and also from the onGripDragOver
	* event handler to synchronize grip's position with their related columns.
	* @param {jQuery ref} t - table object
	* @param {number} i - index of the grip being dragged
	* @param {bool} isOver - to identify when the function is being called from the onGripDragOver event	
	*/
    var syncCols = function (t, i, isOver) {
        if ($(t[0]).width() != t.w) {
            t.w = $(t[0]).width();
            for (var kk = 0; kk < t.c.length; kk++) {
                $(t.c[i]).width($(t.c[i]).outerWidth());
            }
        }

		var inc = drag.x-drag.l, c = t.c[i], c2 = t.c[i+1]; 			
		var w = c.w + inc;	var w2= c2.w- inc;	//their new width is obtained					
		c.width( w + PX);			
		t.cg.eq(i).width( w + PX); 
        if(t.f){ //if fixed mode
            c2.width(w2 + PX);
            t.cg.eq(i+1).width( w2 + PX);
        }else if(t.opt.overflow) {				//if overflow is set, incriment min-width to force overflow
            t.css('min-width', t.w + inc);
        }
		if(isOver){
            c.w=w; 
            c2.w= t.f ? w2 : c2.w;
        }
	};

	
	/**
	* This function updates all columns width according to its real width. It must be taken into account that the 
	* sum of all columns can exceed the table width in some cases (if fixed is set to false and table has some kind 
	* of max-width).
	* @param {jQuery ref} t - table object	
	*/
	var applyBounds = function(t){
        var w = $.map(t.c, function(c){			//obtain real widths
            return c.width();
        });
        t.width(t.w = t.width()).removeClass(FLEX);	//prevent table width changes
        $.each(t.c, function(i,c){
            c.width(w[i]).w = w[i];				//set column widths applying bounds (table's max-width)
        });
		t.addClass(FLEX);						//allow table width changes
	};
	
	
	/**
	 * Event handler used while dragging a grip. It checks if the next grip's position is valid and updates it. 
	 * @param {event} e - mousemove event binded to the window object
	 */
	var onGripDrag = function(e){	
		if(!drag) return; 
        var t = drag.t;		//table object reference 
        var oe = e.originalEvent.touches;
        var ox = oe ? oe[0].pageX : e.pageX;    //original position (touch or mouse)
        var x =  ox - drag.ox + drag.l;	        //next position according to horizontal mouse position increment
		var mw = t.opt.minWidth, i = drag.i ;	//cell's min width
		var l = t.cs*1.5 + mw + t.b;
        var last = i == t.ln-1;                 			//check if it is the last column's grip (usually hidden)
        var min = i? t.g[i-1].position().left+t.cs+mw: l;	//min position according to the contiguous cells
		var max = t.f ? 	//fixed mode?
			i == t.ln-1? 
				t.w-l: 
				t.g[i+1].position().left-t.cs-mw:
			Infinity; 								//max position according to the contiguous cells 
		x = M.max(min, M.min(max, x));				//apply bounding		
		drag.x = x;	 drag.css("left",  x + PX); 	//apply position increment	
        if(last){									//if it is the last grip
            var c = t.c[drag.i];					//width of the last column is obtained
			drag.w = c.w + x- drag.l;         
        }              
		if(t.opt.liveDrag){ 			//if liveDrag is enabled
			if(last){
			    c.width(drag.w);
                if(!t.f && t.opt.overflow){			//if overflow is set, incriment min-width to force overflow
                   t.css('min-width', t.w + x - drag.l);
                }else {
                    t.w = t.width();
                }
			}else{
				syncCols(t,i); 			//columns are synchronized
			}
			syncGrips(t);
			var cb = t.opt.onDrag;							//check if there is an onDrag callback
			if (cb) { e.currentTarget = t[0]; cb(e); }		//if any, it is fired			
		}
		return false; 	//prevent text selection while dragging				
	};
	

	/**
	 * Event handler fired when the dragging is over, updating table layout
     * @param {event} e - grip's drag over event
	 */
	var onGripDragOver = function(e){	
		
		d.unbind('touchend.'+SIGNATURE+' mouseup.'+SIGNATURE).unbind('touchmove.'+SIGNATURE+' mousemove.'+SIGNATURE);
		$("head :last-child").remove(); 				//remove the dragging cursor style	
		if(!drag) return;
		drag.removeClass(drag.t.opt.draggingClass);		//remove the grip's dragging css-class
        if (!(drag.x - drag.l == 0)) {
            var t = drag.t;
            var cb = t.opt.onResize; 	    //get some values	
            var i = drag.i;                 //column index
            var last = i == t.ln-1;         //check if it is the last column's grip (usually hidden)
            var c = t.g[i].c;               //the column being dragged
            if(last){
                c.width(drag.w);
                c.w = drag.w;
            }else{
                syncCols(t, i, true);	//the columns are updated
            }
            if(!t.f) applyBounds(t);	//if not fixed mode, then apply bounds to obtain real width values
            syncGrips(t);				//the grips are updated
            if (cb) { e.currentTarget = t[0]; cb(e); }	//if there is a callback function, it is fired
            if(t.p && S) memento(t); 	//if postbackSafe is enabled and there is sessionStorage support, the new layout is serialized and stored
        }
		drag = null;   //since the grip's dragging is over									
	};	
	
	
	/**
	 * Event handler fired when the grip's dragging is about to start. Its main goal is to set up events 
	 * and store some values used while dragging.
     * @param {event} e - grip's mousedown event
	 */
	var onGripMouseDown = function(e){
		var o = $(this).data(SIGNATURE);			//retrieve grip's data
		var t = tables[o.t],  g = t.g[o.i];			//shortcuts for the table and grip objects
        var oe = e.originalEvent.touches;           //touch or mouse event?
        g.ox = oe? oe[0].pageX: e.pageX;            //the initial position is kept
		g.l = g.position().left;
        g.x = g.l;
        
		d.bind('touchmove.'+SIGNATURE+' mousemove.'+SIGNATURE, onGripDrag ).bind('touchend.'+SIGNATURE+' mouseup.'+SIGNATURE, onGripDragOver);	//mousemove and mouseup events are bound
		h.append("<style type='text/css'>*{cursor:"+ t.opt.dragCursor +"!important}</style>"); 	//change the mouse cursor
		g.addClass(t.opt.draggingClass); 	//add the dragging class (to allow some visual feedback)				
		drag = g;							//the current grip is stored as the current dragging object
		if(t.c[o.i].l) for(var i=0,c; i<t.ln; i++){ c=t.c[i]; c.l = false; c.w= c.width(); } 	//if the colum is locked (after browser resize), then c.w must be updated		
		return false; 	//prevent text selection
	};
    
    
	/**
	 * Event handler fired when the browser is resized. The main purpose of this function is to update
	 * table layout according to the browser's size synchronizing related grips 
	 */
	var onResize = function(){
		for(var t in tables){
            if( tables.hasOwnProperty( t ) ) {
                t = tables[t];
                var i, mw=0;
                t.removeClass(SIGNATURE);   //firefox doesn't like layout-fixed in some cases
                if (t.f) {                  //in fixed mode
                    t.w = t.width();        //its new width is kept
                    for(i=0; i<t.ln; i++) mw+= t.c[i].w;		
                    //cell rendering is not as trivial as it might seem, and it is slightly different for
                    //each browser. In the beginning i had a big switch for each browser, but since the code
                    //was extremely ugly now I use a different approach with several re-flows. This works 
                    //pretty well but it's a bit slower. For now, lets keep things simple...   
                    for(i=0; i<t.ln; i++) t.c[i].css("width", M.round(1000*t.c[i].w/mw)/10 + "%").l=true; 
                    //c.l locks the column, telling us that its c.w is outdated									
                }else{     //in non fixed-sized tables
                    applyBounds(t);         //apply the new bounds 
                    if(t.mode == 'flex' && t.p && S){   //if postbackSafe is enabled and there is sessionStorage support,
                        memento(t);                     //the new layout is serialized and stored for 'flex' tables
                    }
                }
                syncGrips(t.addClass(SIGNATURE));
            }
		} 
		
	};		


	//bind resize event, to update grips position 
	$(window).bind('resize.'+SIGNATURE, onResize); 


	/**
	 * The plugin is added to the jQuery library
	 * @param {Object} options -  an object that holds some basic customization values 
	 */
    $.fn.extend({  
        colResizable: function(options) {           
            var defaults = {
			
				//attributes:
                
                resizeMode: 'fit',                    //mode can be 'fit', 'flex' or 'overflow'
                draggingClass: 'JCLRgripDrag',	//css-class used when a grip is being dragged (for visual feedback purposes)
				gripInnerHtml: '',				//if it is required to use a custom grip it can be done using some custom HTML				
				liveDrag: false,				//enables table-layout updating while dragging	
				minWidth: 15, 					//minimum width value in pixels allowed for a column 
				headerOnly: false,				//specifies that the size of the the column resizing anchors will be bounded to the size of the first row 
				hoverCursor: "e-resize",  		//cursor to be used on grip hover
				dragCursor: "e-resize",  		//cursor to be used while dragging
				postbackSafe: false, 			//when it is enabled, table layout can persist after postback or page refresh. It requires browsers with sessionStorage support (it can be emulated with sessionStorage.js). 
				flush: false, 					//when postbakSafe is enabled, and it is required to prevent layout restoration after postback, 'flush' will remove its associated layout data 
				marginLeft: null,				//in case the table contains any margins, colResizable needs to know the values used, e.g. "10%", "15em", "5px" ...
				marginRight: null, 				//in case the table contains any margins, colResizable needs to know the values used, e.g. "10%", "15em", "5px" ...
				disable: false,					//disables all the enhancements performed in a previously colResized table	
				partialRefresh: false,			//can be used in combination with postbackSafe when the table is inside of an updatePanel,
                disabledColumns: [],            //column indexes to be excluded

				//events:
				onDrag: null, 					//callback function to be fired during the column resizing process if liveDrag is enabled
				onResize: null					//callback function fired when the dragging process is over
            }			
			var options =  $.extend(defaults, options);		
            
            //since now there are 3 different ways of resizing columns, I changed the external interface to make it clear
            //calling it 'resizeMode' but also to remove the "fixed" attribute which was confusing for many people
            options.fixed = true;
            options.overflow = false;
            switch(options.resizeMode){
                case 'flex': options.fixed = false; break;
                case 'overflow': options.fixed = false; options.overflow = true; break;
            }

            return this.each(function() {				
             	init( this, options);             
            });
        }
    });
})(jQuery);

;
/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.0.0
 */

(function ($) {
    'use strict';

    var initResizable = function (that) {
        //Deletes the plugin to re-create it
        that.$el.colResizable({disable: true});

        //Creates the plugin
        that.$el.colResizable({
            resizeMode: that.options.resizemode || "fit",
            disabledColumns: that.options.disabledColumns || [],
            liveDrag: that.options.liveDrag,
            fixed: that.options.fixed,
            headerOnly: that.options.headerOnly,
            minWidth: that.options.minWidth,
            hoverCursor: that.options.hoverCursor,
            dragCursor: that.options.dragCursor,
            onResize: that.onResize,
            onDrag: that.options.onResizableDrag
        });
    };

    $.extend($.fn.bootstrapTable.defaults, {
        resizable: false,
        liveDrag: false,
        fixed: true,
        headerOnly: false,
        minWidth: 15,
        hoverCursor: 'e-resize',
        dragCursor: 'e-resize',
        onResizableResize: function (e) {
            return false;
        },
        onResizableDrag: function (e) {
            return false;
        }
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _toggleView = BootstrapTable.prototype.toggleView,
        _resetView = BootstrapTable.prototype.resetView;

    BootstrapTable.prototype.toggleView = function () {
        _toggleView.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.resizable && this.options.cardView) {
            //Deletes the plugin
            $(this.$el).colResizable({disable: true});
        }
    };

    BootstrapTable.prototype.resetView = function () {
        var that = this;

        _resetView.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.resizable) {
            // because in fitHeader function, we use setTimeout(func, 100);
            setTimeout(function () {
                initResizable(that);
            }, 100);
        }
    };

    BootstrapTable.prototype.onResize = function (e) {
        var that = $(e.currentTarget);
        that.bootstrapTable('resetView');
        that.data('bootstrap.table').options.onResizableResize.apply(e);
    }
})(jQuery);
;
var version = "201812270001";

var constName = {
    QueryCode: "",
    ShowMode: "",
    LoadViewName: "LoadView",
    ResponseName: "Response",
    CommandName: "Command",
    QueryCodeName: "QueryCode",
    resultName: "result",
    SolutionStateName: "SolutionState",
    EngineCodeName: "EngineCode",
    TitleName: "Title",
    DisplayModeName: "DisplayMode",
    SchemaName: "Schema",
    QueryDefaultValuesName: "QueryDefaultValues",
    UnitSelectionRangesName: "UnitSelectionRanges",
    ChildSchemaCodesName: "ChildSchemaCodes",
    QueryItemsName: "QueryItems",
    GetListScopeTypesName: "GetListScopeTypes",
    VisibleCounterName: "visibleCounter",
    EngineCode: ""
};
var mySchemaCode;
var ChildSchemaCodes = "";
var PropertyName_ObjectId = "ObjectId";
var OwnerDeptId_Name = "OwnerDeptId" + "_Name";
var QueryDefaultValues = {}, UnitSelectionRanges = {};
var QueryItems;
var AdressCache;
constName.QueryCode = mySchemaCode = getUrlParam('id');
constName.ShowMode = getUrlParam('mode');
constName.EngineCode = "o3and2j65xolcv0ipmhht2lf1";
$.SheetRuntimeContentCache.Init(constName.EngineCode);
var ListCacheItem = $.SheetRuntimeContentCache.Get(constName.QueryCode, "list");
var timeStamp = -1;
var javascript;
if (ListCacheItem && ListCacheItem[$.SheetRuntimeContentCache.ListJavaScriptName]) {
    timeStamp = ListCacheItem[$.SheetRuntimeContentCache.TimeStampName] - 0;
    javascript = ListCacheItem[$.SheetRuntimeContentCache.ListJavaScriptName];
}
//加载插件js、css
function LoadControlJSCSS(ViewContext, callback, version) {
    var DisplayMode = ViewContext.ReturnData.DisplayMode;
    
    $("#toggleMode").val(1);

    var loadcss = [];
    var loadscript = [];
    
    callback(ViewContext);

}

//初始化数据
function InitData(ViewContext) {
    AppFilterInit(ViewContext.ReturnData);
    $.ListView.Init($("#ListView"), ViewContext.ReturnData.Response);
    $("#ListView").children(".btn-toolbar:first").find("select.form-control").DropDownList();
    var las = $("#ListView").find("div.btn-toolbar").find("span.drop-btn")
    las.each(function (index, el) {
        $(el).removeClass("drop-btn").addClass("fa fa-chevron-down")
    })


    var DisplayMode = 0;
    DisplayMode = ViewContext.ReturnData.DisplayMode;
   

    $tableTip = $(".table-tip");
    $tableTip.length == 0 && ($tableTip = $('<div class="table-tip" style="display: none;"></div>').appendTo($("body")));
    if (DisplayMode == ListViewDisplayMode.List) {
        //列表
        $("#ListView").off("mouseenter.list").on("mouseenter.list", '.table td', function () {
            if ($(this).find("table").length > 0) {
                return;
            }
            var $that = $(this);
            var rect = $that.get(0).getBoundingClientRect();
            //子表
            if ($that.hasClass("inner-table")) {
                if ($that.hasClass("no-tip")) return false;
                if ($that.width() > $that.closest('td:not(.inner-table)').width()) {
                    $tableTip.toggle();
                    var offset = $that.offset();
                    $tableTip.text($that.text().substr(0, 150)).css({
                        left: rect.left,
                        bottom: $(window).height() - rect.top + 6
                    });
                }
                return false;
            }

            var tooltipText = $that.find("div").attr("data-original-title") || "";
            if (tooltipText != "") {
                $tableTip.toggle();
                var maxWidth = 250;
                $tableTip.text(tooltipText);
                var left = rect.left + ($that.outerWidth() - maxWidth) / 2;
                left = $(window).width() - left < maxWidth ? $(window).width() - maxWidth : left;
                var positionStyle = {
                    left: left,
                };
                var bottom = rect.top - 6 > $tableTip.outerHeight() ? $(window).height() - rect.top + 6 : $(window).height() - rect.bottom - $tableTip.outerHeight() - 6;
                $tableTip.css({
                    left: left,
                    bottom: bottom,
                });
                return false;
            }

            $TextLabel.text($that.text());
            if ($TextLabel.width() > $that.width()) {
                $tableTip.toggle();
                var text = $that.text() || '';
                text = text.length > 400 ? text.substr(0, 397) + '...' : text.substr(0, 400);
                var maxWidth = 200;
                var maxHeight = 300;
                if (text.length <= 200) {
                    maxWidth = 250;
                } else if (text.length <= 300) {
                    maxWidth = 350;
                } else if (text.length <= 400) {
                    maxWidth = 400;
                }
                $tableTip.text(text).css({
                    "max-width": maxWidth + "px",
                    "max-height": maxHeight + "px",
                });
               
                var left = rect.left + ($that.outerWidth() - maxWidth) / 2;
                left = $(window).width() - left < maxWidth ? $(window).width() - maxWidth : left;
                var bottom = rect.top - 6 > $tableTip.outerHeight() ? $(window).height() - rect.top + 6 : $(window).height() - rect.bottom - $tableTip.outerHeight() - 6;
                $tableTip.css({
                    left: left,
                    bottom: bottom,
                });
            }
            return false;
        });
        $("#ListView").off("mouseleave.list").on("mouseleave.list", '.table td', function () {
            $tableTip && $tableTip.hide();
        });
    }
    var $TextLabel = $("<label style='opacity:0;position:fixed;z-index:-1;'>").hide().appendTo("body");
}

function AppFilterInit(data) {
     QueryItems = data["QueryItems"];

    if (QueryItems != null && QueryItems.length > 0) {
        if (QueryItems.length > 3) {
            $("#toggleSearch").show();
        }
        var $divSearch = $('<div class="form- horizontal myform- horizontal" id="divSearch" style="display:none"></div>');
        var newQueryItems = new Array();
        if (QueryItems) {
            for (var i = 0; i < QueryItems.length; i++) {
                var item = QueryItems[i];
                if (item.DataType == $.BizDataType.Formula) continue;
                var defaultDisplayChildCode = data["DefaultDisplayChildCode"];
                if (defaultDisplayChildCode == "") {
                    //当前显示的主表
                    if (item.PropertyName.indexOf(".") < 0) {
                        newQueryItems.push(item);
                    }
                } else {
                    //当前显示的子表
                    if (item.PropertyName.indexOf(".") < 0) {
                        newQueryItems.push(item);
                    } else {
                        if (item.PropertyName.split(".")[0] == defaultDisplayChildCode) {
                            newQueryItems.push(item);
                        }
                    }
                }
                //if (item.PropertyName.indexOf(".") <= 0 || (item.PropertyName.indexOf(".") > -1 && item.PropertyName.split(".")[0] == data["DefaultDisplayChildCode"])) {
                //    if (data["DefaultDisplayChildCode"] && item.DataType == $.BizDataType.AssociationArray)
                //        continue;
                //    newQeryItems.push(item);
                //}
            }
        }
        var $DivSearchDoms = GetDivSearchDoms(newQueryItems);
        if ($DivSearchDoms)
            $divSearch.append($DivSearchDoms);
        var $body = $("body");
        $body.append($divSearch);
    }
    //初始化搜索控件
    $.AppFilter.init();
    QueryItems = data[constName.QueryItemsName];

    if (QueryItems != null && QueryItems.length > 0) {
        if (QueryItems.length > 3) {
            $("#toggleSearch").show();
        }
        var $divSearch = $('<div class="form- horizontal myform- horizontal" id="divSearch" style="display:none"></div>');
        var newQueryItems = new Array();
        if (QueryItems) {
            for (var i = 0; i < QueryItems.length; i++) {
                var item = QueryItems[i];
                if (item.DataType == $.BizDataType.Formula) continue;
                var defaultDisplayChildCode = data["DefaultDisplayChildCode"];
                if (defaultDisplayChildCode == "") {
                    //当前显示的主表
                    if (item.PropertyName.indexOf(".") < 0) {
                        newQueryItems.push(item);
                    }
                } else {
                    //当前显示的子表
                    if (item.PropertyName.indexOf(".") < 0) {
                        newQueryItems.push(item);
                    } else {
                        if (item.PropertyName.split(".")[0] == defaultDisplayChildCode) {
                            newQueryItems.push(item);
                        }
                    }
                }
                //if (item.PropertyName.indexOf(".") <= 0 || (item.PropertyName.indexOf(".") > -1 && item.PropertyName.split(".")[0] == data["DefaultDisplayChildCode"])) {
                //    if (data["DefaultDisplayChildCode"] && item.DataType == $.BizDataType.AssociationArray)
                //        continue;
                //    newQeryItems.push(item);
                //}
            }
        }
        var $DivSearchDoms = GetDivSearchDoms(newQueryItems);
        if ($DivSearchDoms)
            $divSearch.append($DivSearchDoms);
        var $body = $("body");
        $body.append($divSearch);
    }
    //初始化搜索控件
    $.AppFilter.init();
}
function GetDivSearchDoms(newQueryItems) {
    var result = null;
    var searchSchemaCode = "D0008860000C4";

    if (newQueryItems != null && newQueryItems.length > 0) {
        if (newQueryItems.length > 3) {
            $("#toggleSearch").show();
        }
        var h = new Array();
        for (var i = 0; i < newQueryItems.length; i++) {
            if (i % 3 == 0) {
                h.push("<div class='form-group myform-group' style='margin-bottom:5px;'>");
            }
            var item = newQueryItems[i];
            var defaultValue = item.DefaultValue ? item.DefaultValue : "";
            h.push('<label for="' + item.PropertyName + '" class="col-xs-1 col-lg-1  col-md-1 control-label filter-text" style="">');
            if (item.IsBoReservedPropertiesOnly) {
                switch (item.PropertyName) {
                    case ReservedPropertiesName.PropertyName_CreatedBy:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_CreatedBy) {
                            h.push("创建人");
                        }
                        else {
                            h.push($.htmlEncode(item.DisplayName));
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_CreatedTime:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_CreatedTime) {
                            h.push("创建时间");
                        }
                        else {
                            h.push(item.DisplayName);
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_ModifiedTime:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_ModifiedTime) {
                            h.push("修改时间");
                        }
                        else {
                            h.push(item.DisplayName);
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerId:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_OwnerId) {
                            h.push("拥有者");
                        }
                        else {
                            h.push($.htmlEncode(item.DisplayName));
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerDeptId:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_OwnerDeptId) {
                            h.push("所属部门");
                        }
                        else {
                            h.push($.htmlEncode(item.DisplayName));
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_Status:
                        h.push("流程状态");
                        break;
                    default:
                        h.push($.htmlEncode(item.DisplayName));
                        break;
                }
            } else {
                h.push($.htmlEncode(item.DisplayName));
            }
            h.push('</label>');
            h.push('<div class="col-xs-3 col-lg-3 col-md-3 filter-content">');
            if (item.IsBoReservedPropertiesOnly && item.PropertyName != ReservedPropertiesName.PropertyName_SeqNo) {
                switch (item.PropertyName) {
                    case ReservedPropertiesName.PropertyName_CreatedBy:
                        h.push('<div class="myuserpicker " id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-width="100%" data-uservisible="true" data-orgunitvisible="false"></div>');
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerDeptId:
                        h.push('<div class="myuserpicker" id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-width="100%" data-uservisible="false" data-orgunitvisible="true"></div>');
                        break;
                    case ReservedPropertiesName.PropertyName_CreatedTime:
                        h.push('<div class="input-group mydatetime" data-datetimemode="yyyy/mm/dd" id="' + item.PropertyName + '">');
                        h.push('</div>');;
                        break;
                    case ReservedPropertiesName.PropertyName_ModifiedTime:
                        h.push('<div class="input-group mydatetime" data-datetimemode="yyyy/mm/dd"  id="' + item.PropertyName + '">');
                        h.push('</div>');
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerId:
                        h.push('<div class="myuserpicker" id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-width="100%" data-uservisible="true" data-orgunitvisible="false"></div>');
                        break;
                    case ReservedPropertiesName.PropertyName_Status:
                        h.push('<select id="' + item.PropertyName + '" multiple="multiple" class="mymultiselect">');
                        h.push('<option value="Draft">草稿</option>');
                        h.push('<option value="Running">进行中</option>');
                        h.push('<option value="Effective">已结束</option>');
                        h.push('<option value="Canceled">已取消</option>');
                        h.push('</select>');
                        break;
                    default:
                        continue;
                }
            } else {
                switch (item.DataType) {
                    case $.BizDataType.Address:
                        {
                            h.push('<div class=" myform-control FormAreaSelect" id="' + item.PropertyName + '" style="height:auto !important;"  data-controlkey="FormAreaSelect"  data-displayrule="" data-areamode="P-C-T" data-showdetailaddr="false" value="' + defaultValue + '" />')
                        }; break;
                    case $.BizDataType.ShortString:
                        // 复选框、单选框、下拉框
                        if (item.AssociationSchemaCode) {
                            var schemaCode = item.PropertyName.substr(0,item.PropertyName.indexOf(".")) || constName.QueryCode;
                            h.push('<div class="mycomboboxlist" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + schemaCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                        }
                        else if (item.DataDictItemName && item.DataDictItemName != "") {
                            if (item.itemValues != null) {
                                h.push('<select id="' + item.PropertyName + '" multiple="multiple" class="mymultiselect">');
                                h.push('<option value="--">--(空值)</option>');
                                for (var j = 0; j < item.itemValues.length; j++) {
                                    var dictItem = item.itemValues[j];
                                    h.push('<option value="' + dictItem + '">' + $.htmlEncode(dictItem) + '</option>');
                                }
                                h.push('</select>');
                            }
                        }
                        else if (item.OptionalValues != null) {
                            var OptionalValues = item.OptionalValues;
                            if (OptionalValues != null && OptionalValues.length > 0) {
                                h.push('<select id="' + item.PropertyName + '" multiple="multiple" class="mymultiselect">');
                                h.push('<option value="--">--(空值)</option>');
                                for (var k = 0; k < OptionalValues.length; k++) {
                                    var OptionalValue = OptionalValues[k]
                                    h.push('<option value="' + OptionalValue + '">' + $.htmlEncode(OptionalValue) + '</option>');
                                }
                                h.push(' </select>');
                            }
                            else {
                                h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                            }
                        }
                        else {
                            if (item.PropertyName == "SeqNo") {
                                h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="SeqNo" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                            }
                            else {
                                h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                            }
                        }
                        break;
                    case $.BizDataType.String:
                        h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                        break;
                    case $.BizDataType.Double:
                    case $.BizDataType.Int:
                    case $.BizDataType.Long:
                        h.push('<div class="input-group mynum" id="' + item.PropertyName + '">');
                        h.push('</div>');
                        break;
                    case $.BizDataType.DateTime:
                        h.push('<div class="input-group mydatetime" data-datetimemode="' + item.DisplayFormat + '" id="' + item.PropertyName + '">');
                        h.push('</div>');
                        break;
                    case $.BizDataType.SingleParticipant:
                        switch (item.OrganizationType) {
                            case OrganizationType.User:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-uservisible="true" data-orgunitvisible="false" data-width="100%"></div>');
                                break;
                            case OrganizationType.Dept:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-uservisible="false" data-orgunitvisible="true" data-width="100%"></div>');
                                break;
                            case OrganizationType.All:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-uservisible="true" data-orgunitvisible="true" data-width="100%"></div>');
                                break;
                            default:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-width="100%"></div>');
                                break;
                        }
                        break;
                    case $.BizDataType.Association:
                    case $.BizDataType.AssociationArray:
                        h.push('<span class="mydropdown" id="' + item.PropertyName + '" data-boschemacode="' + item.AssociationSchemaCode + '"></span>');
                        break;
                    case $.BizDataType.Bool:
                        h.push('<span id="' + item.PropertyName + '" class="mybool">');
                        h.push('</span>');
                        break;
                    default:
                        break;
                }
            }
            h.push("</div>");
            if (i == QueryItems.length - 1 || i % 3 == 2) {
                h.push("</div>");
            }
        }
        result = $(h.join(""));
    }
    return result;
    var result = null;
    var searchSchemaCode = mySchemaCode;

    if (newQueryItems != null && newQueryItems.length > 0) {
        if (newQueryItems.length > 3) {
            $("#toggleSearch").show();
        }
        var h = new Array();
        for (var i = 0; i < newQueryItems.length; i++) {
            if (i % 3 == 0) {
                h.push("<div class='form-group myform-group' style='margin-bottom:5px;'>");
            }
            var item = newQueryItems[i];
            var defaultValue = item.DefaultValue ? item.DefaultValue : "";
            h.push('<label for="' + item.PropertyName + '" class="col-xs-1 col-lg-1  col-md-1 control-label filter-text" style="">');
            if (item.IsBoReservedPropertiesOnly) {
                switch (item.PropertyName) {
                    case ReservedPropertiesName.PropertyName_CreatedBy:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_CreatedBy) {
                            h.push("创建人");
                        }
                        else {
                            h.push($.htmlEncode(item.DisplayName));
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_CreatedTime:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_CreatedTime) {
                            h.push("创建时间");
                        }
                        else {
                            h.push(item.DisplayName);
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_ModifiedTime:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_ModifiedTime) {
                            h.push("修改时间");
                        }
                        else {
                            h.push(item.DisplayName);
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerId:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_OwnerId) {
                            h.push("拥有者");
                        }
                        else {
                            h.push($.htmlEncode(item.DisplayName));
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerDeptId:
                        if (item.DisplayName == ReservedPropertiesName.PropertyName_OwnerDeptId) {
                            h.push("所属部门");
                        }
                        else {
                            h.push($.htmlEncode(item.DisplayName));
                        }
                        break;
                    case ReservedPropertiesName.PropertyName_Status:
                        h.push("流程状态");
                        break;
                    default:
                        h.push($.htmlEncode(item.DisplayName));
                        break;
                }
            } else {
                h.push($.htmlEncode(item.DisplayName));
            }
            h.push('</label>');
            h.push('<div class="col-xs-3 col-lg-3 col-md-3 filter-content">');
            if (item.IsBoReservedPropertiesOnly && item.PropertyName != ReservedPropertiesName.PropertyName_SeqNo) {
                switch (item.PropertyName) {
                    case ReservedPropertiesName.PropertyName_CreatedBy:
                        h.push('<div class="myuserpicker " id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-width="100%" data-uservisible="true" data-orgunitvisible="false"></div>');
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerDeptId:
                        h.push('<div class="myuserpicker" id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-width="100%" data-uservisible="false" data-orgunitvisible="true"></div>');
                        break;
                    case ReservedPropertiesName.PropertyName_CreatedTime:
                        h.push('<div class="input-group mydatetime" data-datetimemode="yyyy/mm/dd" id="' + item.PropertyName + '">');
                        h.push('</div>');;
                        break;
                    case ReservedPropertiesName.PropertyName_ModifiedTime:
                        h.push('<div class="input-group mydatetime" data-datetimemode="yyyy/mm/dd"  id="' + item.PropertyName + '">');
                        h.push('</div>');
                        break;
                    case ReservedPropertiesName.PropertyName_OwnerId:
                        h.push('<div class="myuserpicker" id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-width="100%" data-uservisible="true" data-orgunitvisible="false"></div>');
                        break;
                    case ReservedPropertiesName.PropertyName_Status:
                        h.push('<select id="' + item.PropertyName + '" multiple="multiple" class="mymultiselect">');
                        h.push('<option value="Draft">草稿</option>');
                        h.push('<option value="Running">进行中</option>');
                        h.push('<option value="Effective">已结束</option>');
                        h.push('<option value="Canceled">已取消</option>');
                        h.push('</select>');
                        break;
                    default:
                        continue;
                }
            } else {
                switch (item.DataType) {
                    case $.BizDataType.Address:
                        {
                            h.push('<div class=" myform-control FormAreaSelect" id="' + item.PropertyName + '" style="height:auto !important;"  data-controlkey="FormAreaSelect"  data-displayrule="" data-areamode="P-C-T" data-showdetailaddr="false" value="' + defaultValue + '" />')
                        }; break;
                    case $.BizDataType.ShortString:
                        // 复选框、单选框、下拉框
                        if (item.AssociationSchemaCode) {
                            h.push('<div class="mycomboboxlist" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                        }
                        else if (item.DataDictItemName && item.DataDictItemName != "") {
                            if (item.itemValues != null) {
                                h.push('<select id="' + item.PropertyName + '" multiple="multiple" class="mymultiselect">');
                                h.push('<option value="--">--(空值)</option>');
                                for (var j = 0; j < item.itemValues.length; j++) {
                                    var dictItem = item.itemValues[j];
                                    h.push('<option value="' + dictItem + '">' + $.htmlEncode(dictItem) + '</option>');
                                }
                                h.push('</select>');
                            }
                        }
                        else if (item.OptionalValues != null) {
                            var OptionalValues = item.OptionalValues;
                            if (OptionalValues != null && OptionalValues.length > 0) {
                                h.push('<select id="' + item.PropertyName + '" multiple="multiple" class="mymultiselect">');
                                h.push('<option value="--">--(空值)</option>');
                                for (var k = 0; k < OptionalValues.length; k++) {
                                    var OptionalValue = OptionalValues[k]
                                    h.push('<option value="' + OptionalValue + '">' + $.htmlEncode(OptionalValue) + '</option>');
                                }
                                h.push(' </select>');
                            }
                            else {
                                h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                            }
                        }
                        else {
                            if (item.PropertyName == "SeqNo") {
                                h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="SeqNo" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                            }
                            else {
                                h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                            }
                        }
                        break;
                    case $.BizDataType.String:
                        h.push('<div class="mycombobox" id="' + item.PropertyName + '" data-dataField="' + item.PropertyName + '" data-schemaCode="' + constName.QueryCode + '" data-width="100%" data-defalutvalue="' + defaultValue + '"> </div>');
                        break;
                    case $.BizDataType.Double:
                    case $.BizDataType.Int:
                    case $.BizDataType.Long:
                        h.push('<div class="input-group mynum" id="' + item.PropertyName + '">');
                        h.push('</div>');
                        break;
                    case $.BizDataType.DateTime:
                        h.push('<div class="input-group mydatetime" data-datetimemode="' + item.DisplayFormat + '" id="' + item.PropertyName + '">');
                        h.push('</div>');
                        break;
                    case $.BizDataType.SingleParticipant:
                        switch (item.OrganizationType) {
                            case OrganizationType.User:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-uservisible="true" data-orgunitvisible="false" data-width="100%"></div>');
                                break;
                            case OrganizationType.Dept:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-uservisible="false" data-orgunitvisible="true" data-width="100%"></div>');
                                break;
                            case OrganizationType.All:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-uservisible="true" data-orgunitvisible="true" data-width="100%"></div>');
                                break;
                            default:
                                h.push('<div class="myuserpicker" data-datafield="' + item.PropertyName + '"  id="' + item.PropertyName + '" data-displayname="' + item.DisplayName + '" data-unitselectionrange="' + item.UnitSelectRange + '" data-ismultiple="true" data-width="100%"></div>');
                                break;
                        }
                        break;
                    case $.BizDataType.Association:
                    case $.BizDataType.AssociationArray:
                        h.push('<span class="mydropdown" id="' + item.PropertyName + '" data-boschemacode="' + item.AssociationSchemaCode + '"></span>');
                        break;
                    case $.BizDataType.Bool:
                        h.push('<span id="' + item.PropertyName + '" class="mybool">');
                        h.push('</span>');
                        break;
                    default:
                        break;
                }
            }
            h.push("</div>");
            if (i == QueryItems.length - 1 || i % 3 == 2) {
                h.push("</div>");
            }
        }
        result = $(h.join(""));
    }
    return result;
}
function SetFilterToolTip() {
    $("#ListView").find(".filter-text").off("mouseenter.filtertext").on("mouseenter.filtertext", function () {
        var clientWidth = this.clientWidth;
        var scrollWidth = this.scrollWidth;
        if (clientWidth < scrollWidth) {
            var $that = $(this);
            var tooltipText = this.innerText;
            var offset = $that.offset();
            $tableTip.text(tooltipText).css({
                left: offset.left + ($that.outerWidth() - $tableTip.outerWidth()) / 2 - $(window).scrollLeft() - 120,
                bottom: $(window).height() - offset.top + 6 + $(window).scrollTop() - 35
            }).toggle();
            return false;
        }
    });

    $("#ListView").find(".filter-text").off("mouseleave.filtertext").on("mouseleave.filtertext", function () {
        $tableTip && $tableTip.hide();
    });


    //处理过滤条件filter-text
    $("#ListView").find(".filter-text").off("mouseenter.filtertext").on("mouseenter.filtertext", function () {
        var clientWidth = this.clientWidth;
        var scrollWidth = this.scrollWidth;
        if (clientWidth < scrollWidth) {
            var $that = $(this);
            var tooltipText = this.innerText;
            var offset = $that.offset();
            $tableTip.text(tooltipText).css({
                left: offset.left + ($that.outerWidth() - $tableTip.outerWidth()) / 2 - $(window).scrollLeft() - 120,
                bottom: $(window).height() - offset.top + 6 + $(window).scrollTop() - 35
            }).toggle();
            return false;
        }
    });

    $("#ListView").find(".filter-text").off("mouseleave.filtertext").on("mouseleave.filtertext", function () {
        $tableTip && $tableTip.hide();
    });
}

function ResetAppFilter() {
    var defaultDisplayChildCode = $.AppFilter.getChildSchemaCode();
    var $divSearch = $("#divSearch");
    var newQueryItems = new Array();
    if (QueryItems) {
        for (var i = 0; i < QueryItems.length; i++) {
            var item = QueryItems[i];
            if (item.DataType == $.BizDataType.Formula) continue;

            if (defaultDisplayChildCode == "") {
                //当前显示的主表
                if (item.PropertyName.indexOf(".") < 0) {
                    newQueryItems.push(item);
                } 
            } else {
                //当前显示的子表
                if (item.PropertyName.indexOf(".") < 0) {
                    newQueryItems.push(item);
                } else {
                    if (item.PropertyName.split(".")[0] == defaultDisplayChildCode) {
                        newQueryItems.push(item);
                    }
                }
            }
        }
    }
    $divSearch.children().remove();
    var $DivSearchDoms = GetDivSearchDoms(newQueryItems);
    if ($DivSearchDoms)
        $divSearch.append($DivSearchDoms);
    $("#toggleSearch").find("i").removeClass("icon-arrow-down-double-b").addClass("icon-arrow-up-double-b");
    $.AppFilter.init();
    setTimeout(function () {
        $.ListView.GetResetHeight();
    }, 500);
    SetFilterToolTip();
    var defaultDisplayChildCode = $.AppFilter.getChildSchemaCode();
    var $divSearch = $("#divSearch");
    var newQueryItems = new Array();
    if (QueryItems) {
        for (var i = 0; i < QueryItems.length; i++) {
            var item = QueryItems[i];
            if (item.DataType == $.BizDataType.Formula) continue;

            if (defaultDisplayChildCode == "") {
                //当前显示的主表
                if (item.PropertyName.indexOf(".") < 0) {
                    newQueryItems.push(item);
                } 
            } else {
                //当前显示的子表
                if (item.PropertyName.indexOf(".") < 0) {
                    newQueryItems.push(item);
                } else {
                    if (item.PropertyName.split(".")[0] == defaultDisplayChildCode) {
                        newQueryItems.push(item);
                    }
                }
            }
        }
    }
    $divSearch.children().remove();
    var $DivSearchDoms = GetDivSearchDoms(newQueryItems);
    if ($DivSearchDoms)
        $divSearch.append($DivSearchDoms);
    $("#toggleSearch").find("i").removeClass("icon-arrow-down-double-b").addClass("icon-arrow-up-double-b");
    $.AppFilter.init();
    setTimeout(function () {
        $.ListView.GetResetHeight();
    }, 500);
    SetFilterToolTip();
}

function getUrlParam(paramName) {
    var ParamValue = "";
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        ParamValue = unescape(r[2]);
    }
    return ParamValue;
    var ParamValue = "";
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        ParamValue = unescape(r[2]);
    }
    return ParamValue;
}

function GetNodeUrl(FunctionNode) {
    var url = FunctionNode.Url;
    switch (FunctionNode.NodeType) {
        case FunctionNodeType.FormModule:
        case FunctionNodeType.WorkflowModule:
        case FunctionNodeType.CustomListModule:
            url = "/SubApp/Index?id=" + FunctionNode.Code;
            break;
        case FunctionNodeType.ReportModule:
            url = "/Reporting/?id=" + FunctionNode.Code;
            break;
    }
    return url;
    var url = FunctionNode.Url;
    switch (FunctionNode.NodeType) {
        case FunctionNodeType.FormModule:
        case FunctionNodeType.WorkflowModule:
        case FunctionNodeType.CustomListModule:
            url = "/SubApp/Index?id=" + FunctionNode.Code;
            break;
        case FunctionNodeType.ReportModule:
            url = "/Reporting/?id=" + FunctionNode.Code;
            break;
    }
    return url;
};
(function ($) {
    // 所有的控件，都可以通过这个接口选择
    $.fn.JControl = function () {
        var jControl;
        var args = arguments;
        $(this).each(function () {
            var $control = $(this);

            //add by xc 若已经渲染过该控件，则不进行重新渲染 
            jControl = $control.data("JControl");
            if (!$.isEmptyObject(jControl)) {
                return true;
            }

            //数据项
            var datafield = $control.data($.ControlManager.DataFieldKey.toLocaleLowerCase());
            var controlkey = $control.data($.ControlManager.SheetControlKey.toLocaleLowerCase());
            if (!controlkey) {
                return jControl;
            }
            var dataitem = $.Controls.GetSheetDataItem(datafield, $control);

            if (args.length > 0) {
                dataitem = $.extend(dataitem, args[0]);
            }
            jControl = $.ControlManager.Run.call($control, controlkey, [dataitem]);
            //add by xc 保存JControl值，避免重复渲染同一个控件
            $control.data("JControl", jControl);
        });
        return jControl;
    };

    $.Controls = {};
    //控件属性
    $.Controls.GetDefaultOptions = function (controlKey) {
        var p = {};
        var options = FormControls[controlKey];
        if (options != null) {
            for (var key in options) {
                if (options[key].constructor == String
                    || options[key].constructor == Number
                    || options[key].constructor == Object) {
                    p[key] = options[key] || "";
                }
                else if (options[key].constructor == Array) {
                    for (var i = 0; i < options[key].length; ++i) {
                        p[options[key][i].Name] = options[key][i].DefaultValue == void 0 ? "" : options[key][i].DefaultValue;
                    }
                }
            }
        }
        return p;
    };

    // 读取表单数据
    $.Controls.GetSheetDataItem = function (datafield, $control) {
        if ($.SmartForm.ResponseContext == null) return null;
        // Error:
        if (datafield == "Comments") {
            //审批控件
            return $.IClone($.SmartForm.ResponseContext.Comments);
        }
        var DataItems = $.SmartForm.ResponseContext.ReturnData;
        if (datafield == void 0) return null;
        var dataitem = DataItems[datafield];

        if (dataitem == null && (datafield + "").indexOf(".") > -1) {
            var pDataField = datafield.split(".")[0];
            var pDataItem = DataItems[pDataField];
            var $trRow = $control.closest("tr");
            var ObjectId = $trRow.attr("data-ObjectId");
            //从已存到数据库地方取数据
            if (ObjectId) {
                if (pDataItem != void 0 && pDataItem != null) {
                    var rows = pDataItem.Value.R;
                    dataitem = $.IClone(pDataItem.Value.T[datafield]);
                    for (var i = 0; i < rows.length; i++) {
                        var rowData = rows[i];
                        if (rowData[pDataField + ".ObjectId"].Value == ObjectId) {
                            dataitem.Value = rowData[datafield].Value;
                            dataitem.Editable = rowData[datafield].Editable;
                            // 某单元格的可见属性自己控制
                            if (dataitem.Visible) {
                                dataitem.Visible = rowData[datafield].Visible;
                            }
                            break;
                        }
                    }
                }
            }
            else {
                ObjectId = $.IGuid();
                $trRow.attr("data-ObjectId", ObjectId);
            }

            if (dataitem == null && pDataItem) {
                dataitem = pDataItem.Value.T[datafield];
            }

            if (dataitem) {
                // 为区别子表里不同行的同一字段
                dataitem["ObjectId"] = ObjectId;
            }
        }

        return $.IClone(dataitem);
    };

})(jQuery);

(function ($) {
    //控件基类
    //1,完成界面初始化:设置组件id并存入组件管理器池,初始化参数
    //2,渲染的工作,细节交给子类实现
    //parm [element] 组件对应的dom element对象
    //parm [options] 组件的参数
    $.Controls.BaseControl = function (element, options, ResponseContext) {
        this.IsQueryControl = false; //标记控件是在表单中还是列表过滤中
        // 表单信息
        this.ResponseContext = ResponseContext;

        //外链表单  0/1
        this.IsExternalForm = ResponseContext && ResponseContext.IsExternalForm;

        //是否支持Html5
        this.IsSupportHtml5 = window.applicationCache != undefined;
        this.SchemaCode = ResponseContext == null ? "" : ResponseContext.SchemaCode;
        this.IsMobile = ResponseContext == null ? false : ResponseContext.IsMobile;
        //页面元素，可以通过$(this.Element)得到jquery对象
        this.Element = element;

        //是否发起模式
        this.Originate = $.IQuery("Mode").toLowerCase() == "originate";

        // 记录当前控件是否验证通过
        this.ValidateResult = true;
        //配置参数,包含属性和事件
        this.Options = options || {};

        //样式列表
        this.Css = {
            ControlTitle: "ControlTitle",
            ControlContent: "ControlContent"
        };

        this.ChangeEvents = {};

        //初始化参数
        this.Init();

        // 是否可见
        if (this.Visible == null) {
            this.Visible = true;
        }

        // 是否可编辑
        if (this.Editable == null) {
            this.Editable = true;
        }
        //渲染控件前函数
        this.PreRender();
        //渲染控件
        this.Render();
        //渲染后函数
        //this.Rendered();
        this.RenderDescription();
        //隐藏规则和计算规则可能会耗时较长，所以他们异步执行
        //这种情况导致的问题是，如果A的规则中配置了B，B的规则中配置了C。
        //在初始化A的时候需要给B绑定事件，但是B的初始化函数中由于InitHideRule和InitComputationRule函数执行时间较长没有返回，导致A的初始化函数中无法取到B对象无法绑定事件
        //隐藏规则
        this.InitHideRule();
        //计算规则
        this.InitComputationRule();
    };

    //基础属性
    $.Controls.BaseControl.prototype = {
        // 从页面读取参数,将页面上 data-***的设置读取到Options里面
        // 初始化参数，转为容易用的方式this.***
        // 循环所有默认属性事件,构造成 this.***的格式
        Init: function () {
            var that = this;
            var options = this.Options;
            for (var key in options) {
                var elementkey = key.toLowerCase();
                var $el = $(that.Element);
                var val = $el.data(elementkey);
                if (val != void 0) {
                    if (options[key] == null) {
                        options[key] = val;
                    } else if (options[key].constructor == Boolean) {
                        if (val.constructor == Boolean) {
                            options[key] = val;
                        } else {
                            val = val.toString().toLowerCase();
                            options[key] = val == "true" || val == "1";
                        }
                    } else if (options[key].constructor == Number) {
                        options[key] = parseInt(val);
                    } else if (key.toLocaleLowerCase() != "displayname" || options[key] == "" || options[key] == "CreatedBy.FullName") {
                        options[key] = val;
                    }
                }
            }

            for (var key in options) {
                this[key] = options[key];
            }
        },

        // 控件渲染前函数
        PreRender: function () {
            //PC
            var spanCss = "col-sm-2 col-xs-2";
            var inputCss = "col-sm-10 col-xs-10";
            var $el = $(this.Element);
            if ($el.parent().hasClass("col-sm-6")) {
                spanCss = "col-sm-4 col-xs-4";
                inputCss = "col-sm-8 col-xs-8";
            }
            //标题列模式
            if (this.TitleDirection == "Vertical") {
                spanCss = "col-sm-12";
                inputCss = "col-sm-12";
            }

            $el.addClass("form-group");
            //标题
            //this.$Title = $("<span></span>").text(this.DisplayName).addClass(spanCss).addClass(this.Css.ControlTitle);
            this.$Title = $("<span class='" + spanCss + " " + this.Css.ControlTitle + "'>" + $.htmlEncode(this.DisplayName) + "</span>");
            if (this.Editable && this.Required) {
                this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
            }
            var controlkey = $el.attr("data-controlkey");
            this.$InputBody = $("<div>");
            //添加样式    
            if (($.isEmptyObject(this.Options.DataField)
                || this.Options.DataField.indexOf('.') == -1
                || this.Options.DataField == "CreatedBy.FullName")
                && (this.DisplayName || this.DataField) && controlkey) {
                if (controlkey != "FormButton") {
                    $el.append(this.$Title);
                    if (controlkey == "FormCheckBoxList" && !this.isCheckbox) {
                        //this.$display = $("<sapn class='display'></span>");
                        //$el.append(this.$display);
                        $el.append("<span class='display'></span>");
                    }
                }
                this.$InputBody.addClass(inputCss);
            }

            $el.append(this.$InputBody);
            //对于可见的字段，添加是否打印属性
            if (this.Visible) {
                //如果字段没有设置是否可打印则默认可打印
                $el.attr("data-printable", this.Printable == void 0 ? true : this.Printable);
            }
            if (controlkey == "FormBoList") {
                $el.empty();
            }
        },

        // 控件渲染
        Render: function () { },
        //计算规则
        InitComputationRule: function () {
            if (!$(this.Element).hasClass('sheet-control')) {
                return;
            }
            //try {
            if (this.DataItem == null || this.DataItem.ComputationRule == null) { return; }
            var computationRule = this.DataItem.ComputationRule;//计算规则
            var computationRuleFields = this.DataItem.ComputationRuleFields;//计算规则使用的字段
            //原来是如果规则没有控件字段则直接执行，修改后只有新建表单时候执行
            //公式型控件每次加载页面都要执行计算
            if (this.ResponseContext.IsCreateMode ||
                this instanceof $.Controls.FormFormula) {
                this.SetComputationResult(computationRule, computationRuleFields);
            }
            var that = this;
            var eventName = "change.cr." + this.DataField;
            for (var fi = 0, flen = computationRuleFields.length; fi < flen; fi++) {
                var field = computationRuleFields[fi];
                if (field == 'CreatedBy') {
                    field += '.FullName';
                }
                // 子表字段
                if (field.indexOf(".") > -1) {//规则字段在子表
                    if (this.DataField.indexOf(".") > -1) {//配置规则的字段在子表
                        eventName = "change.cr." + this.ObjectId + "." + this.DataField;
                        //eidt by xc 不需要选择整列再筛选，直接找出对应的单元格，缩短时间
                        //这里要判断是否是在同一个子表
                        var childSchemaName1 = this.DataField.slice(0, this.DataField.indexOf("."));
                        var childSchemaName2 = field.slice(0, field.indexOf("."));
                        if (childSchemaName1 == childSchemaName2) {//同一个子表
                            var $ctrl = $(this.Element).closest("tr").find("div.sheet-control[data-controlkey][data-datafield='" + field + "']");
                            if ($ctrl && $ctrl.length > 0) {
                                var controlMgr = $ctrl.JControl();
                                if (!controlMgr) continue;
                                controlMgr.UnbindChange(eventName);
                                controlMgr.BindChange(eventName, function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                });
                                if (that.ResponseContext.IsCreateMode) {
                                    // 被绑定的值，已经有可能已经渲染
                                    controlMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                        } else {//跨子表
                            var $ctrl = $("div.sheet-control[data-controlkey][data-datafield='" + field + "']").not(".table_th");
                            for (var i = 0; i < $ctrl.length; i++) {
                                var controlMgr = $ctrl.JControl();
                                eventName = "change.cr." + controlMgr.ObjectId + "." + controlMgr.DataField;
                                if (!controlMgr) continue;
                                controlMgr.UnbindChange(eventName);
                                controlMgr.BindChange(eventName, function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                });
                                if (that.ResponseContext.IsCreateMode) {
                                    // 被绑定的值，已经有可能已经渲染
                                    controlMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                            eventName = "change.cr." + field.slice(0, field.indexOf(".")) + this.DataField.slice(this.DataField.indexOf("."));
                            var gridMgr = $("div.sheet-control[data-datafield='" + field.slice(0, field.indexOf(".")) + "']").JControl();
                            if (gridMgr) {
                                if (gridMgr.ChangeEvents[eventName] == undefined) {
                                    gridMgr.BindChange(eventName, function (args) {
                                        if (window[eventName]) {
                                            window.clearTimeout(window[eventName]);
                                            window[eventName] = null;
                                        }
                                        window[eventName] = setTimeout(function () {
                                            var targetCtrls = $("div.sheet-control[data-controlkey][data-datafield='" + that.DataField + "']").not(".table_th");
                                            for (var i = 0; i < targetCtrls.length; i++) {
                                                $(targetCtrls[i]).JControl().SetComputationResult(computationRule, computationRuleFields);
                                            }
                                        }, 600);
                                    });
                                }
                            }
                        }
                    } else {
                        eventName = "change.cr." + this.DataField;

                        // 子表删除行、添加行会触发子表Change，将field的事件绑定放到子表Change事件中
                        var gridMgr = $("div.sheet-control[data-datafield='" + field.slice(0, field.indexOf(".")) + "']").JControl();

                        // 给子表上对应的列绑定Change事件
                        var tdCtrl = $("div.sheet-control[data-controlkey][data-datafield='" + field + "']:not(.table_th)");
                        for (var i = 0; i < tdCtrl.length; i++) {
                            var controlMgr = $(tdCtrl[i]).JControl();
                            if (controlMgr) {
                                controlMgr.UnbindChange(eventName);
                                controlMgr.BindChange(eventName, function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                });
                                if (that.ResponseContext.IsCreateMode) {
                                    // 被绑定的值，已经有可能已经渲染
                                    controlMgr.ChangeEvents[eventName].apply($(tdCtrl[i]));
                                }
                            }
                        }
                        if (gridMgr) {
                            gridMgr.UnbindChange(eventName);
                            gridMgr.BindChange(eventName, function (args) {
                                // 子表删除行前触发change事件，要等待行删除后，才重新计算值，所以用setTimeout
                                // 连续添加行，最后一次新增或者删除行，才执行计算规则

                                if (window[eventName]) {
                                    window.clearTimeout(window[eventName]);
                                    window[eventName] = null;
                                }
                                window[eventName] = setTimeout(function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                }, 600);
                            });
                            if (that.ResponseContext.IsCreateMode) {
                                // 被绑定的值，已经有可能已经渲染
                                gridMgr.ChangeEvents[eventName].apply(this);
                            }
                        }
                    }
                } else {
                    eventName = "change.cr." + this.DataField;
                    var changeControl = $("div.sheet-control[data-datafield='" + field + "']").JControl();
                    if (!changeControl) {
                        continue;
                    }
                    changeControl.UnbindChange(eventName);
                    changeControl.BindChange(eventName, function () {
                        //这里不能调用SetComputationResult,如果子表字段规则配置了主表则在主表字段change的时候要更新同一列所有行的字段
                        var targetCtrls = $('div.sheet-control[data-controlkey][data-datafield="' + that.DataField + '"]:not(.table_th)');
                        targetCtrls.each(function () {
                            // Error :主表会自己调用自己
                            var targetCtrl = $(this).JControl();
                            if (targetCtrl != void 0) {
                                var ret = targetCtrl.GetComputationResult(computationRule, computationRuleFields);
                                targetCtrl.SetValue(ret);
                            }
                        });
                    });
                    if (that.ResponseContext.IsCreateMode) {
                        // 被绑定的值，已经有可能已经渲染
                        changeControl.ChangeEvents[eventName].apply(this);
                    }
                }
            }
        },
        SetComputationResult: function (computationRule, computationRuleFields) {
            //设置计算规则时候先判断控件是否是隐藏的，如果控件是隐藏的则不执行计算规则
            var ret = this.GetComputationResult(computationRule, computationRuleFields);
            this.SetValue(ret);
        },
        GetComputationResult: function (rule, fields) {
            if (rule == undefined || fields == undefined) {
                return;
            }
            var ruleTemp = rule;
            for (var j = 0, len = fields.length; j < len; j++) {
                //需要考虑字段是子表情况
                var ctrlField = fields[j];
                var val = [];
                if (ctrlField.indexOf('.') > -1) {
                    //子表外部聚合函数计算规则
                    if (this.DataField.indexOf(".") == -1) {
                        //如果是公式控件,其计算来源是子表要先初始化子表，因为公式控件的值不会保存
                        if ($(this.Element).attr("data-controlkey") == "FormFormula" && $.SmartForm.ResponseContext.IsCreateMode == false) {
                            //先初始化子表
                            var gridViewField = ctrlField.split(".")[0];
                            var gridView = $("div.sheet-control[data-controlkey][data-datafield='" + gridViewField + "']").JControl();
                        }
                        //配置字段在主表，规则字段在子表
                        var ctrls = $('div.sheet-control[data-controlkey][data-datafield="' + ctrlField + '"]:not(.table_th)');
                        var ctrlKey = ctrls.attr('data-controlkey');
                        //var ctrl = ctrls.JControl();
                        if (ctrls.length > 0) {
                            for (var childFieldIndex = 0, childFieldLen = ctrls.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                                var ctrl = $(ctrls[childFieldIndex]).JControl();
                                if (ctrl) {
                                    if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                                        val.push(ctrl.GetNum());
                                    } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                                        val.push(ctrl.GetValue());
                                    } else if (ctrlKey == 'FormTextBox') {
                                        var v = ctrl.GetValue();
                                        v = v.replace(/"/g, '\\"');
                                        val.push('"' + v + '"');
                                        //val.push('"' + ctrl.GetValue() + '"');
                                    } else if (ctrlKey == 'FormTextArea') {
                                        var v = ctrl.GetValue().replace(/[\r\n]/g, "");
                                        v = v.replace(/"/g, '\\"');
                                        val.push('"' + v + '"');
                                        //val.push('"' + ctrl.GetValue().replace(/[\r\n]/g, "") + '"');
                                    } else if (ctrlKey == 'Formuser') {
                                        var uid = ctrl.GetUnitIDs()[0];
                                        val.push('"' + (uid == undefined ? "" : uid) + '"');
                                    } else if (ctrlKey == 'FormMultiKey') {
                                        //不支持多人
                                        val.push('""');
                                    } else if (ctrlKey == 'FormFormula') {
                                        var ctrlVal = ctrl.GetValue();
                                        val.push('"' + ctrlVal + '"');
                                    } else {
                                        //其他类型控件，取值后判断是否是输入，不是数字则转成字符串
                                        var ctrlVal = ctrl.GetValue();
                                        if ($.isNumeric(ctrlVal)) {
                                            val.push(ctrlVal);
                                        } else {
                                            val.push('"' + ctrlVal + '"');
                                        }
                                    }
                                } else {
                                    val.push(ctrlKey == "FormNumber" ? 0 : "''");
                                }
                            }
                        } else {
                            // 当出现如 $.fn.COUNT({}) 这样的表达式时，将其替换成 $.fn.COUNT(),防止当子表中没有行时还返回 1 的错误结果
                            var tempRegex = new RegExp("\\$\\.fn\\.COUNT\\(\\{" + ctrlField.replace(".", "\\.") + "\\}\\)", "g");
                            ruleTemp = ruleTemp.replace(tempRegex, "$.fn.COUNT()");
                            val.push('""');
                        }
                    } else {//行内字段计算规则
                        //配置字段在子表，规则字段在子表
                        //eidt byxc 优化不需要选择整列再筛选，直接渠道对应的单元格
                        var childSchemaName1 = this.DataField.slice(0, this.DataField.indexOf("."));//当前子表
                        var childSchemaName2 = ctrlField.slice(0, ctrlField.indexOf("."));//规则字段子表
                        if (childSchemaName1 == childSchemaName2) {
                            //同一个子表，取与当前字段在同一行的字段
                            var ctrls = $(this.Element).closest("tr").find("div.sheet-control[data-controlkey][data-datafield='" + ctrlField + "']");
                            if (ctrls.length == 0) continue;
                            var ctrlKey = ctrls.attr('data-controlkey');
                            var ctrl = ctrls.JControl();
                            if (ctrl) {
                                if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                                    val.push(ctrl.GetNum());
                                } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                                    val.push(ctrl.GetValue());
                                } else if (ctrlKey == 'FormTextBox') {
                                    var v = ctrl.GetValue();
                                    v = v.replace(/"/g, '\\"');
                                    val.push('"' + v + '"');
                                    //val.push('"' + ctrl.GetValue() + '"');
                                } else if (ctrlKey == 'FormTextArea') {
                                    var v = ctrl.GetValue().replace(/[\r\n]/g, "");
                                    v = v.replace(/"/g, '\\"');
                                    val.push('"' + v + '"');
                                    //val.push('"' + ctrl.GetValue().replace(/[\r\n]/g, "") + '"');
                                } else if (ctrlKey == 'FormUser') {
                                    var uid = ctrl.GetUnitIDs()[0];
                                    val.push('"' + (uid == undefined ? "" : uid) + '"');
                                } else if (ctrlKey == 'FormMultiUser') {
                                    //不支持多人
                                    val.push('""');
                                } else if (ctrlKey == 'FormFormula') {
                                    var ctrlVal = ctrl.GetValue();
                                    val.push('"' + ctrlVal + '"');
                                } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                                    var ctrlVal = ctrl.GetValue();
                                    if (ctrlVal && ctrlVal.AttachmentIds) {
                                        val.push('"' + ctrlVal + '"');
                                    } else {
                                        val.push("''");
                                    }
                                } else {
                                    var ctrlVal = ctrl.GetValue();
                                    if ($.isNumeric(ctrlVal)) {
                                        val.push(ctrlVal);
                                    } else {
                                        val.push('"' + ctrlVal + '"');
                                    }
                                }
                            } else {
                                val.push(ctrlKey == "FormNumber" ? 0 : "''");
                            }
                        } else {
                            //跨子表
                            var ctrls = $("div.sheet-control[data-controlkey][data-datafield='" + ctrlField + "']").not('.table_th');
                            if (ctrls.length > 0) {
                                for (var i = 0; i < ctrls.length; i++) {
                                    var ctrlKey = $(ctrls[i]).attr("data-controlkey");
                                    var ctrl = $(ctrls[i]).JControl();
                                    if (ctrl) {
                                        if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                                            val.push(ctrl.GetNum());
                                        } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                                            val.push(ctrl.GetValue());
                                        } else if (ctrlKey == 'FormTextBox') {
                                            var v = ctrl.GetValue();
                                            v = v.replace(/"/g, '\\"');
                                            val.push('"' + v + '"');
                                            //val.push('"' + ctrl.GetValue() + '"');
                                        } else if (ctrlKey == 'FormTextArea') {
                                            var v = ctrl.GetValue().replace(/[\r\n]/g, "");
                                            v = v.replace(/"/g, '\\"');
                                            val.push('"' + v + '"');
                                            //val.push('"' + ctrl.GetValue().replace(/[\r\n]/g, "") + '"');
                                        } else if (ctrlKey == 'FormUser') {
                                            var uid = ctrl.GetUnitIDs()[0];
                                            val.push('"' + (uid == undefined ? "" : uid) + '"');
                                        } else if (ctrlKey == 'FormMultiUser') {
                                            //不支持多人
                                            val.push('""');
                                        } else if (ctrlKey == 'FormFormula') {
                                            var ctrlVal = ctrl.GetValue();
                                            val.push('"' + ctrlVal + '"');
                                        } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                                            var ctrlVal = ctrl.GetValue();
                                            if (ctrlVal && ctrlVal.AttachmentIds) {
                                                val.push('"' + ctrlVal + '"');
                                            } else {
                                                val.push("''");
                                            }
                                        } else {
                                            var ctrlVal = ctrl.GetValue();
                                            if ($.isNumeric(ctrlVal)) {
                                                val.push(ctrlVal);
                                            } else {
                                                val.push('"' + ctrlVal + '"');
                                            }
                                        }
                                    } else {
                                        val.push(ctrlKey == "FormNumber" ? 0 : "''");
                                    }
                                }
                            } else {
                                val.push('""');
                            }
                        }
                    }
                }
                else {
                    //非子表字段
                    var ctrl = $('div.sheet-control[data-datafield="' + ctrlField + '"]');
                    var ctrlKey = ctrl.attr('data-controlkey');
                    ctrl = ctrl.JControl();
                    if (ctrl) {
                        if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                            val.push(ctrl.GetNum());
                        } else if (ctrlKey == 'FormTextBox') {
                            var v = ctrl.GetValue();
                            v = v.replace(/"/g, '\\"');
                            val.push('"' + v + '"');
                            //val.push('"' + ctrl.GetValue() + '"');
                        } else if (ctrlKey == 'FormTextArea') {
                            var v = ctrl.GetValue().replace(/[\r\n]/g, "");
                            v = v.replace(/"/g, '\\"');
                            val.push('"' + v + '"');
                            //val.push('"' + ctrl.GetValue().replace(/[\r\n]/g, "") + '"');
                        } else if (ctrlKey == void 0) {
                            if (ctrlField == 'CreatedBy') {
                                val.push('"' + $.SmartForm.ResponseContext.Originator + '"');
                            } else if (ctrlField == 'CreatedTime') {
                                val.push('"' + $.SmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                            } else if (ctrlField == 'ModifiedTime') {
                                var modifiedTime = $.SmartForm.ResponseContext.ReturnData.ModifiedTime.Value;
                                val.push(modifiedTime == void 0 ? "''" : modifiedTime);
                            }
                        } else if (ctrlKey == 'FormLabel') {
                            if (ctrlField == 'CreatedTime') {
                                val.push('"' + $.SmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                            } else if (ctrlField == 'ModifiedTime') {
                                var modifiedTime = $.SmartForm.ResponseContext.ReturnData.ModifiedTime.Value;
                                val.push(modifiedTime == void 0 ? "''" : modifiedTime);
                            }
                        } else if (ctrlKey == 'OwnerId') {
                            val.push('"' + $.SmartForm.ResponseContext.ReturnData.OwnerId.Value[0].UnitId + '"');
                        } else if (ctrlKey == 'FormAreaSelect') {
                            val.push("'" + ctrl.GetValue() + "'");
                        } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                            val.push(ctrl.GetValue());
                        } else if (ctrlKey == 'FormUser') {
                            var uid = ctrl.GetUnitIDs()[0];
                            val.push('"' + (uid == undefined ? "" : uid) + '"');
                        } else if (ctrlKey == 'FormMultiUser') {
                            //不支持多人
                            val.push('""');
                        } else if (ctrlKey == 'FormFormula') {
                            var ctrlVal = ctrl.GetValue();
                            val.push('"' + ctrlVal + '"');
                        } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                            var ctrlVal = ctrl.GetValue();
                            if (ctrlVal && ctrlVal.AttachmentIds) {
                                val.push('"' + ctrlVal + '"');
                            } else {
                                val.push("''");
                            }
                        } else {
                            //其他类型控件，取值后判断是否是输入，不是数字则转成字符串
                            var ctrlVal = ctrl.GetValue();
                            if ($.isNumeric(ctrlVal)) {
                                val.push(ctrlVal);
                            } else {
                                val.push('"' + ctrlVal + '"');
                            }
                        }
                    } else {
                        if (ctrlField == 'CreatedTime') { //创建时间
                            val.push('"' + $.SmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                        } else if (ctrlField == 'ModifiedTime') { //修改时间
                            var modifiedTime = $.SmartForm.ResponseContext.ReturnData.ModifiedTime.Value;
                            val.push(modifiedTime == void 0 ? "''" : modifiedTime);
                        } else if (ctrlField == "CreatedBy") { //创建人
                            val.push('"' + $.SmartForm.ResponseContext.Originator + '"');
                        } else if (ctrlField == "OwnerId") { //拥有者
                            val.push('"' + $.SmartForm.ResponseContext.ReturnData.OwnerId.Value[0].UnitId + '"');
                        } else if (ctrlField == "OwnerDeptId") { //所属部门
                            val.push('"' + $.SmartForm.ResponseContext.ReturnData.OwnerDeptId.Value[0].UnitId + '"');
                        } else {
                            val.push("''");
                        }
                    }
                }
                var replaceField = '{' + ctrlField + '}';
                var reg = new RegExp(replaceField, 'g');
                ruleTemp = ruleTemp.replace(reg, val);
            }
            if (this.Type == 7) {
                //数值类型为了保证精度用逆波兰表达式计算
                var expression = this.CalculateFn(ruleTemp);
                expression = expression.replace(/\(/g, " ( ").replace(/\)/g, " ) ");
                var ret = this.CalcExpression(expression);
                return ret;
            } else {
                return new Function('return ' + ruleTemp)();
            }
        },
        // 计算隐藏规则表达式结果
        GetHideRuleResult: function (rule, fields) {
            //如果字段权限设置了不可见，则隐藏规则不生效
            if (this.Visible == false) {
                return true;
            }
            if (rule == null) {
                return false;
            }
            var ruleTemp = rule;
            for (var j = 0, len = fields.length; j < len; j++) {
                //需要考虑字段是子表情况
                var ctrlField = fields[j];
                var val = [];
                if (ctrlField.indexOf('.') > -1) {
                    //子表字段
                    var ctrls = [];
                    if (this.DataField.indexOf('.') > -1) {
                        //当前字段也是子表字段
                        ctrls = $($(this.Element).closest('tr')).find('div.sheet-control[data-datafield="' + ctrlField + '"]');
                    } else {
                        ctrls = $('div.sheet-control[data-controlkey][data-datafield="' + ctrlField + '"]:not(.table_th)');
                    }
                    var ctrlKey = ctrls.attr('data-controlkey');
                    for (var childFieldIndex = 0, childFieldLen = ctrls.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                        var jCtrl = $(ctrls[childFieldIndex]).JControl();
                        if (jCtrl) {
                            if (ctrlKey == 'FormNumber') {
                                val.push(jCtrl.GetNum());
                            } else if (ctrlKey == 'FormTextBox') {
                                var v = jCtrl.GetValue();
                                val.push(v == "" ? "''" : ("'" + v + "'"));
                            } else if (ctrlKey == 'FormTextArea') {
                                var v = jCtrl.GetValue() + "";
                                val.push('"' + v.replace(/[\r\n]/g, "") + '"');
                            } else if (ctrlKey == 'FormUser' || ctrlKey == 'FormMultiUser') {
                                var units = jCtrl.GetUnitIDs();
                                if (units != null && units != void 0 && units != '') {
                                    for (var i = 0; i < units.length; i++) {
                                        val.push('"' + units[i] + '"');
                                    }
                                } else { val.push('""'); }
                            } else if (ctrlKey == 'FormAreaSelect') {
                                var area = jCtrl.GetValue();
                                val.push(area == '' ? '""' : ("'" + area + "'"));
                            } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                                var attach = jCtrl.GetValue();
                                if (attach == void 0 || attach == "") {
                                    val.push("''");
                                } else {
                                    val.push(attach.AttachmentIds == '' ? "''" : ('"' + attach.AttachmentIds + '"'));
                                }
                            } else if (ctrlKey == 'FormCheckbox') {
                                var c = jCtrl.GetValue();
                                val.push(c);
                            } else if (ctrlKey == 'FormDropDownList') {
                                var dropDown = jCtrl.GetValue();
                                if (dropDown == void 0 || dropDown == "") {
                                    val.push("''");
                                } else {
                                    val.push('"' + dropDown + '"');
                                }
                            } else {
                                //其他类型控件，取值后判断是否是输入，不是数字则转成字符串
                                var ctrlVal = jCtrl.GetValue();
                                if ($.isNumeric(ctrlVal)) {
                                    val.push(ctrlVal);
                                } else {
                                    val.push((ctrlVal == void 0 || ctrlVal == '') ? '""' : ('"' + ctrlVal + '"'));
                                }
                            }
                        } else {
                            val.push('""');
                        }
                    }
                } else {
                    //非子表字段
                    var ctrl = $('div.sheet-control[data-datafield="' + ctrlField + '"]');
                    var ctrlKey = ctrl.attr('data-controlkey');
                    var jCtrl = ctrl.JControl();
                    if (ctrlKey == 'FormNumber') {
                        val.push(jCtrl == undefined ? 0 : jCtrl.GetNum());
                    } else if (ctrlKey == 'FormTextBox') {
                        var v = jCtrl == undefined ? "" : jCtrl.GetValue();
                        val.push(v == '' ? "''" : ('"' + v + '"'));
                    } else if (ctrlKey == 'FormTextArea') {
                        var v = jCtrl == undefined ? "" : jCtrl.GetValue();
                        val.push(v == '' ? "''" : ('"' + v.replace(/[\r\n]/g, "") + '"'));
                    } else if (ctrlKey == 'FormUser' || ctrlKey == 'FormMultiUser') {
                        var units = jCtrl == undefined ? "" : jCtrl.GetUnitIDs();
                        if (units != null && units != void 0 && units != "") {
                            for (var i = 0; i < units.length; i++) {
                                val.push('"' + units[i] + '"');
                            }
                        } else {
                            val.push('""');
                        }
                    } else if (ctrlKey == 'FormAreaSelect') {
                        var area = jCtrl == undefined ? "" : jCtrl.GetValue();
                        val.push(area == '' ? '""' : ("'" + area + "'"));
                    } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                        var attach = jCtrl == undefined ? "" : ctrl.JControl().GetValue();
                        if (attach == "") {
                            val.push("''");
                        } else {
                            val.push('"' + attach.AttachmentIds + '"');
                        }
                    } else if (ctrlKey == 'FormCheckbox') {
                        var c = jCtrl == undefined ? "" : jCtrl.GetValue();
                        val.push(c);
                    } else if (ctrlKey == 'FormDropDownList') {
                        var dropDown = jCtrl == undefined ? "" : jCtrl.GetValue();
                        val.push(dropDown == null ? '""' : ('"' + dropDown + '"'));
                    } else if (ctrlKey == 'FormLabel') {
                        if (ctrlField == 'CreatedTime') {
                            val.push('"' + $.SmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                        } else if (ctrlField == 'ModifiedTime') {
                            var modifiedTime = $.SmartForm.ResponseContext.ReturnData.ModifiedTime.Value;
                            val.push(modifiedTime == void 0 ? "''" : '"' + modifiedTime + '"');
                        }
                    } else {
                        //createdby
                        if (ctrlKey == void 0) {
                            if (ctrlField == 'CreatedBy')
                                val.push('"' + $.SmartForm.ResponseContext.Originator + '"');
                            else if (ctrlField == 'OwnerId') {
                                val.push('"' + $.SmartForm.ResponseContext.ReturnData.OwnerId.Value[0].UnitId + '"');
                            } else if (ctrlField == 'OwnerDeptId') {
                                val.push('"' + $.SmartForm.ResponseContext.ReturnData.OwnerDeptId.Value[0].UnitId + '"');
                            }
                        } else {
                            //其他类型控件，取值后判断是否是数字，不是数字则转成字符串
                            for (var childFieldIndex = 0, childFieldLen = ctrl.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                                var jCtrl = $(ctrl[childFieldIndex]).JControl();
                                var ctrlVal = jCtrl == undefined ? "" : jCtrl.GetValue();
                                if ($.isNumeric(ctrlVal)) {
                                    val.push(ctrlVal);
                                } else {
                                    if (ctrlVal) {
                                        val.push("'" + ctrlVal + "'");
                                    } else {
                                        val.push("''");
                                    }
                                }
                            }
                        }
                    }
                }
                val = val.length > 0 ? val : '""';
                var replaceField = '{' + ctrlField + '}';
                var reg = new RegExp(replaceField, 'g');
                ruleTemp = ruleTemp.replace(reg, val);
            }
            return ruleTemp;
        },
        SetHideResult: function (rule, fields, canHideColumn) {
            var ruleTemp = this.GetHideRuleResult(rule, fields);
            var fun = new Function('return ' + ruleTemp)();

            if (!fun) {
                this.SetVisible(true);
            } else {
                this.SetVisible(false);
                if (canHideColumn) {
                    this.HideColumn(true);
                }
            }
            this.HidePreHeaderTitle();
        },
        //只用于主表字段隐藏子表列使用
        //子表字段隐藏规则配置了主表字段，当条件满足时候隐藏子表列
        HideColumn: function (hide) {
            //Error 这里逻辑要重新整理
            if (!hide && !this.Visible) {
                return;
            }
            var dataField = this.DataField;
            var thatCtrl = $('div.sheet-control[data-controlkey][data-datafield="' + dataField + '"]');
            var table = thatCtrl.closest('.SheetGridView').find('.table-body table');
            if (table != void 0 && table.length > 0) {
                var th = table.find('div.sheet-control[data-datafield="' + dataField + '"][class*="table_th"]').parent();
                var td = $('div.sheet-control[data-controlkey][data-datafield="' + dataField + '"]:not(".table_th")').parent();
                if (!hide) {
                    //PC端
                    $(td).show();
                    $(th).show();
                    $(th).trigger('DomProChange.form', dataField);
                } else {
                    //PC端
                    $(td).hide();
                    $(th).hide();
                    $(th).trigger('DomProChange.form', [dataField, 'hide']);
                }
            }
        },
        InitHideRule: function () {
            //如果不在表单中不要执行
            if (!$(this.Element).hasClass('sheet-control')) {
                return;
            }
            //如果有新的规则则使用新的，否则判断是否有旧规则
            var that = this;
            if (this.DataItem != null && this.DataItem.DisplayRule) {
                var rule = this.DataItem.DisplayRule;//规则表达式
                var fields = this.DataItem.DisplayRuleFields;//规则中引用的字段

                //如果规则中没有子表字段且当前字段是子表字段则为true
                //1.先要确定当前控件是否是子表控件
                //2.判断规则中的控件是否都是主表控件
                var canHideColumn = (that.DataField.indexOf('.') > -1) && that.DataField != 'CreatedBy.FullName';
                if (canHideColumn) {
                    for (var i = 0; i < fields.length; i++) {
                        var field = fields[i];
                        if (field.indexOf('.') > -1) {
                            //规则中字段是子表字段，不隐藏该列
                            canHideColumn = false;
                            break;
                        }
                    }
                }
                //如果that是子表控件，且fields里面全是主表字段或者常量，则当子表控件不可见的时候隐藏该列
                if (fields.length == 0) {
                    //规则中没有字段，直接执行
                    that.SetHideResult(rule, fields, canHideColumn);
                    return;
                }

                //给规则中引用到的字段绑定change事件
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    if (field == 'CreatedBy') {
                        field += '.FullName';
                    }
                    var ctrl = $('div.sheet-control[data-datafield="' + field + '"]');
                    if (field.indexOf(".") > -1) {
                        if (this.DataField.indexOf(".") > -1) {
                            //规则中字段在子表,配置的字段在子表
                            var eventName = "change.hr." + this.ObjectId + "." + this.DataField;
                            var $ctrl = $(this.Element).closest("tr").find("div.sheet-control[data-controlkey][data-datafield='" + field + "']");
                            if ($ctrl && $ctrl.length > 0) {
                                var controlMgr = $ctrl.JControl();
                                controlMgr && controlMgr.BindChange(eventName, function () {
                                    that.SetHideResult(rule, fields);
                                });
                                if (that.ResponseContext.IsCreateMode || that.Value == null) {
                                    controlMgr && controlMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                        } else {
                            //规则中字段在子表,配置的字段在主表
                            //子表删除/添加行会触发子表Change，将field的事件绑定放到子表Change事件中
                            var eventName = "change.hr." + this.DataField;
                            var gridMgr = $("div.sheet-control[data-datafield='" + field.slice(0, field.indexOf(".")) + "']").JControl();
                            //给子表上对应列绑定Change事件
                            var tdCtrl = $("div.sheet-control[data-controlkey][data-datafield='" + field + "']:not('.table_th')");
                            for (var j = 0; j < tdCtrl.length; j++) {
                                var controlMgr = $(tdCtrl[j]).JControl();
                                if (controlMgr) {
                                    controlMgr.UnbindChange(eventName);
                                    controlMgr.BindChange(eventName, function () {
                                        that.SetHideResult(rule, fields);
                                    });
                                    if (that.ResponseContext.IsCreateMode || that.Value == null) {
                                        controlMgr.ChangeEvents[eventName].apply($(tdCtrl[j]));
                                    }
                                }
                            }
                            if (gridMgr) {
                                gridMgr.UnbindChange(eventName);
                                gridMgr.BindChange(eventName, function (args) {
                                    if (window[eventName]) {
                                        window.clearTimeout(window[eventName]);
                                        window[eventName] = null;
                                    }
                                    window[eventName] = setTimeout(function () {
                                        that.SetHideResult(rule, fields);
                                    }, 600);
                                });
                                if (that.ResponseContext.IsCreateMode || that.Value == null) {
                                    gridMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                        }
                    } else {
                        var ruleCtrl = ctrl.JControl();
                        if (ruleCtrl) {
                            ruleCtrl.BindChange('change.' + this.DataField, function () {
                                var ruleTemp = that.GetHideRuleResult(rule, fields);
                                var fun = new Function('return ' + ruleTemp)();
                                var thatCtrl = $('div.sheet-control[data-datafield="' + that.DataField + '"]:not(".table_th")');
                                for (var m = 0; m < thatCtrl.length; m++) {
                                    var jCtrl = $(thatCtrl[m]).JControl();
                                    jCtrl && jCtrl.SetVisible(!fun);
                                }
                                if (!fun) {
                                    if (canHideColumn) {
                                        that.HideColumn(false);
                                    }
                                } else {
                                    if (canHideColumn) {
                                        that.HideColumn(true);
                                    }
                                }
                                that.HidePreHeaderTitle();
                            });
                        }
                    }
                }
                var ruleTemp = that.GetHideRuleResult(rule, fields);
                var func = new Function('return ' + ruleTemp)();
                if (!func) {
                    that.SetVisible(true);
                    if (canHideColumn) {
                        that.HideColumn(false);
                    }
                } else {
                    that.SetVisible(false);
                    if (canHideColumn) {
                        that.HideColumn(true);
                    }
                }
            } else if (this.DisplayRule) {//兼容旧的规则
                if (this.DisplayRule.RuleDataField != void 0) {
                    //旧的
                    var $controls = $('div.sheet-control[data-datafield="' + this.DisplayRule.RuleDataField + '"]');
                    if (this.DataField.toString().indexOf('.') > -1) {
                        $controls = $(this.Element).closest('tr').find('div.sheet-control[data-datafield="' + this.DisplayRule.RuleDataField + '"]');
                    }
                    var ruleControl = $controls.JControl();
                    if (ruleControl) {
                        ruleControl.BindChange('OnChange.' + this.DataField, function () {
                            if (this.GetValue() + '' == that.DisplayRule.RuleValue) {
                                that.SetVisible(true);
                            } else {
                                that.SetVisible(false);
                            }
                        });
                        ruleControl.OnChange();
                    }
                }
            }
        },
        //如果控件设置了不可见，且控件后面没有可见控件，则隐藏控件前面的标题栏
        HidePreHeaderTitle: function () {
            var $headerDescribles, $headerTitles;
            if (this.ResponseContext.SheetView) {//移动端
                $headerDescribles = $(this.ResponseContext.SheetView).find(".page-header.page-describle");
                $headerTitles = $(this.ResponseContext.SheetView).find(".page-header").not(".page-describle");
            } else {//pc端
                $headerDescribles = $(".page-header.page-describle");
                $headerTitles = $(".page-header").not(".page-describle");
            }
            $headerTitles.css("display", "block");
            $headerDescribles.css("display", "block");
            $.SmartForm.HideEmptyHeader();
        },

        // 增加验证消息显示
        AddInvalidText: function ($el, invalidText) {
            $el = $el || $(this.Element);
            this.invalidText = invalidText;
            //单选框，复选框
            if ($el.length > 0 && $el[0].tagName.toLowerCase() === "label") {
                $el.closest(".radiolistwrap").css({
                    "border": "1px solid red ",
                    "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                });
            } else {
                if (($el.length > 0 && $el[0].tagName.toLowerCase() === "select") || $(this.Element).data("controlkey") == "FormDropDownList") {
                    //下拉框
                    $el.css({
                        "outline": "1px solid red ",
                        "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    }).siblings(".btn-group").css({
                        "outline": "1px solid red ",
                        "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    });
                    $el.prev("span").css({
                        "outline": "1px solid red ",
                        "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    });
                } else if ($el.find(".AreaSelectWrap").length > 0) {
                    //地址
                    $el.find(".AreaSelectWrap").css({
                        "border": "1px solid red",
                        "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    });
                }
                //其它
                else if ($el.attr("class") && $el.attr("class").indexOf("col-") > -1) {
                    $el.find(".form-control").css({
                        "border": "1px solid red",
                        "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    });
                } else {
                    $el.css({
                        "border": "1px solid red",
                        "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    });
                }
            }
            $el.addClass('invalid');//添加这个类的目的是判断控件是否校验过，并无样式


            if (invalidText != "必填" && invalidText.length > 0) {
                top.$.IShowWarn("抱歉，[" + this.DisplayName + "]选项" + invalidText);
            }

            //add by xc定位到相应位置
            var Offset = $el.offset();
            var Top = Offset.top - $(window).scrollTop();
            if (Top > $(window).height()) {
                $(window).scrollTop(Offset.top + $el.outerHeight() - $(window).height());
            } else if (Top < 0) {
                $(window).scrollTop(Offset.top - 40);
            }
            //子表内部定位
            var $par = $el.closest(".SheetGridView[data-controlkey='FormGridView']");
            if ($par.length > 0) {
                var $scroll = $par.find("div.table-scroll");
                var Left = Offset.left - $par.scrollLeft() - $par.width();
                if (Left > 5) {
                    $scroll.scrollLeft(Offset.left + $el.outerWidth() - $par.width() + 100);
                }
            }
        },

        // 移除验证显示信息
        RemoveInvalidText: function ($el) {
            $el = $el || $(this.Element);
            this.invalidText = "";
            $el.removeClass('invalid').css({ "border": "", "box-shadow": "" });
            //if (($el.length > 0 && $el[0].tagName.toLowerCase() === "select") || $(this.Element).data("controlkey") == "FormDropDownList") {
            //    $el.siblings(".btn-group").removeClass('invalid');
            //    $el.siblings(".btn-group").css({ "border": "", "outline": "", "box-shadow": "" });
            //    $el.prev("span").removeClass('invalid');
            //    $el.prev("span").css({ "outline": "", "box-shadow": "" });
            //}

            if ($el.length > 0 && $el[0].tagName.toLowerCase() === "label") {
                $el.closest(".radiolistwrap").css({ "border": "", "box-shadow": "" });
            } else {
                if ($el.length > 0 && $el[0].tagName.toLowerCase() === "select" || $(this.Element).data("controlkey") == "FormDropDownList") {
                    $el.css({ "outline": "", "box-shwdow": "" }).siblings(".btn-group").css({ "outline": "", "box-shadow": "" });
                    $el.prev("span").css({ "outline": "", "box-shadow": "" });
                } else if ($el.find(".AreaSelectWrap").length > 0) {
                    //地址
                    $el.find(".AreaSelect").css({ "border": "", "box-shadow": "" });
                } else if ($el.attr("class") && $el.attr("class").indexOf("col-") > -1) {
                    $el.find(".form-control").css({ "border": "", "box-shadow": "" });
                } else {
                    $el.css({ "border": "", "box-shadow": "" });
                }
            }
        },

        // 控件的保存函数
        SaveDataField: function () {
            return {
            };
        },

        // 获取值
        GetValue: function () {
            return this.$InputBody.val();
        },

        //设置值:复杂控件必须重写该接口
        SetValue: function (obj) {
            this.$InputBody.val(obj);
        },

        // 对应复杂控件，Value可能是ID或Code，但是Text是显示名称
        GetText: function () {
            return this.$InputBody.text();
        },

        //设置是否可编辑
        SetReadonly: function (flag) {
        },

        //设置是否可见
        SetVisible: function (flag) {
            var lastVisible = this.Visible || $(this.Element).css('visibility') == 'visible';
            var $el = $(this.Element);
            if (flag) {
                //Error:如果原来是隐藏的话，有可能控件就没渲染，需要渲染后在显示
                //如果权限控制了visible则不执行隐藏规则的结果
                //edit by xc
                if (this.DataField.indexOf(".") == -1 || this.DataField == 'CreatedBy.FullName') {
                    $el.show();
                } else {
                    $el.css("visibility", 'visible');
                }
                //end
                if (($el.attr('data-controlkey') == 'FormTextBox' || $el.attr('data-controlkey') == 'FormTextArea') && !this.Editable) {
                    $el.find('pre').css('border', 'none');
                }
                //如果控件有计算规则，要重新计算
                if (this.DataItem && this.DataItem.ComputationRule && lastVisible == false) {
                    var rule = this.DataItem.ComputationRule;
                    var fields = this.DataItem.ComputationRuleFields;
                    var ret = this.GetComputationResult(rule, fields);
                    this.SetValue(ret);
                }
                if (this.$Element && this.$Element.attr("data-controlkey") == "FormGridView") {
                    this.AdapteHeight();
                }
            } else {
                //先清除再隐藏
                if (($.SmartForm.IsLoaded || this.ResponseContext.IsCreateMode) && this.Editable) {
                    // 表单加载完，才隐藏清空值
                    this.ClearValue();
                }
                //edit by xc
                if (this.DataField.indexOf(".") == -1 || this.DataField == 'CreatedBy.FullName') {
                    $el.hide();
                } else {
                    $el.css("visibility", 'hidden');
                }
            }
        },

        //中缀表达式解析成后缀表达式
        //1）如果遇到操作数，我们就直接将其输出。
        //2）如果遇到操作符，则我们将其放入到栈中，遇到左括号时我们也将其放入栈中。
        //3）如果遇到一个右括号，则将栈元素弹出，将弹出的操作符输出直到遇到左括号为止。注意，左括号只弹出并不输出。
        //4）如果遇到任何其他的操作符，如（“+”， “*”，“（”）等，从栈中弹出元素直到遇到发现更低优先级的元素(或者栈为空)为止。弹出完这些元素后，才将遇到的操作符压入到栈中。有一点需要注意，只有在遇到" ) "的情况下我们才弹出" ( "，其他情况我们都不会弹出" ( "。
        //5）如果我们读到了输入的末尾，则将栈中所有元素依次弹出。
        ParseExpression: function (expression) {
            //输入的表达式每一个运算数和运算符之间都会是空格分割
            //先将表达式分割成数组并去掉空的
            var items = expression.split(" ");
            var temp = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i] != "") {
                    temp.push(items[i]);
                }
            }
            items = temp;
            var outItems = []; //输出队列
            var stack = new Stack(); //保存运算符的栈
            var reg = /\d/;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (reg.test(item)) {
                    //操作数直接输出
                    outItems.push(item);
                    continue;
                }
                if (item == "(") {
                    //左括号直接入栈
                    stack.push(item);
                } else if (item == ")") {
                    //右括号弹出栈中运算符，直到遇到左括号
                    while (stack.store.length > 0 && stack.store[stack.top - 1] != "(") {
                        outItems.push(stack.pop());
                    }
                    //弹出左括号
                    stack.pop();
                } else if (item == "+" || item == "-") {
                    //如果栈顶不是左括号则将栈中运算符出栈，最后再入栈
                    while (stack.store.length > 0 && stack.store[stack.top - 1] != "(") {
                        outItems.push(stack.pop());
                    }
                    stack.push(item);
                } else if (item == "*" || item == "/") {
                    //如果栈顶元素是左括号，直接入栈
                    //如果栈顶元素优先级比当前运算符高则先出栈再入栈
                    if (stack.store.length == 0 || stack.store[stack.top - 1] == "(") {
                        stack.push(item);
                    } else {
                        while (stack.store.length > 0 && (stack.store[stack.top - 1] == "*" || stack.store[stack.top - 1] == "/")) {
                            outItems.push(stack.pop());
                        }
                        stack.push(item);
                    }
                }
            }
            while (stack.store.length > 0) {
                outItems.push(stack.pop());
            }
            return outItems;
        },

        CalcExpression: function (expression) {
            var cal = new CalcEval();
            var stack = new Stack();
            var char = this.ParseExpression(expression);
            var p = 0;
            var s = 0;
            var str = "";
            var reg = /\d/;
            for (var i = 0; i < char.length; i++) {
                if (reg.test(char[i])) {
                    stack.push(char[i]);
                } else {
                    switch (char[i]) {
                        case "-":
                            p = stack.pop();
                            s = stack.pop();
                            str = s + "-" + p;
                            stack.push(cal.eval(str));
                            break;
                        case "+":
                            p = stack.pop();
                            s = stack.pop();
                            str = s + "+" + p;
                            stack.push(cal.eval(str));
                            break;
                        case "*":
                            p = stack.pop();
                            s = stack.pop();
                            str = s + "*" + p;
                            stack.push(cal.eval(str));
                            break;
                        case "/":
                            p = stack.pop();
                            s = stack.pop();
                            str = s + "/" + p;
                            stack.push(cal.eval(str));
                            break;
                        default:
                    }
                }
            }
            return stack.store[0];
        },
        //计算表达式

        //去掉规则中的函数:$.fn
        CalculateFn: function (rule) {
            var functionExpression = [];//方法表达式
            var functionValue = [];//方法计算值
            var startIndex = 0;
            while (rule.indexOf("$.fn.", startIndex) > -1) {
                var fnIndex = rule.indexOf("$.fn.", startIndex);
                var leftBracket = rule.indexOf("(", fnIndex + 1);//左括号位置
                var rightBracket = rule.indexOf(")", leftBracket + 1);//右括号位置
                leftBracket = rule.indexOf("(", leftBracket + 1);//下一个左括号位置
                while (leftBracket > -1 && rightBracket > leftBracket) {
                    rightBracket = rule.indexOf(")", rightBracket + 1);
                    leftBracket = rule.indexOf("(", leftBracket + 1);
                }
                //截取fnIndex到rightBracket之间的字符串为函数体
                //先把函数计算出来，再替换到表达式中
                var fn = rule.slice(fnIndex, rightBracket + 1);
                var val = new Function("return " + fn)();
                functionExpression.push(fn);
                functionValue.push(val);
                startIndex = rightBracket + 1;
            }

            for (var i = 0; i < functionExpression.length; i++) {
                rule = rule.replace(functionExpression[i], functionValue[i]);
            }
            return rule;
        },

        ClearValue: function () {
            //对于配置了隐藏规则的字段，字段隐藏的时候Visible是true，值会被清掉，如果该字段参与了其他字段的计算则会出现问题
            if (this.Visible && $(this.Element).is(':visible')) {
                this.SetValue("");
            }
        },

        // 设置为焦点
        SetFocus: function () {
            if (this.$InputBody) {
                if (this.$InputBody.is("div")) {
                    this.$InputBody.find("input,select").focus();
                } else {
                    this.$InputBody.focus();
                }
            }
        },

        //值改变事件
        OnChange: function () {
            if (this.ChangeEvents == null || $.isEmptyObject(this.ChangeEvents)) return;
            for (var key in this.ChangeEvents) {
                if ($.isFunction(this.ChangeEvents[key])) {
                    this.ChangeEvents[key].apply(this, [arguments]);
                }
            }
        },

        //绑定改变值事件
        BindChange: function (key, fn) {
            this.ChangeEvents[key] = fn;
        },

        ///解除绑定
        UnbindChange: function (key) {
            delete this.ChangeEvents[key];
        },

        //如果控件有添加描述信息，则渲染
        RenderDescription: function () {
            var that = this;
            var description = that.Description || that.Describe || "";
            if (description != "") {
                var $title = that.$Title;
                var $element = $(that.Element);
                var h_title = $title.height();

                var $icon = $("<i>i</i>");
                $icon.css({
                    "height": "12px",
                    "width": "12px",
                    "line-height": "12px",
                    "color": "#fff",
                    "background-color": "#2d7fff",
                    "margin-left": "4px",
                    "cursor": "pointer",
                    "position": "absolute",
                    "top": (h_title - 12) / 2,
                    "border": "1px solid #2d7fff",
                    "border-radius": "6px",
                    "display": "inline-block",
                    "font-style": "normal",
                    "font-size": "12px",
                    "font-weight": "bold",
                    "text-align": "center"
                });
                $icon.off("click").on("click", function () {
                    $(that.Element).find("div.description").toggle();
                });
                $title.append($icon);

                //描述信息容器
                var $description = $("<div class='description'>" + $.htmlEncode(description) + "</div>").hide();
                //描述信息的宽度
                var w_element = $element.width();
                var padding_right = parseInt(that.$InputBody.css("padding-right"));
                var w_description = w_element - padding_right;

                $description.css({
                    "color": "#666",
                    "background-color": "#f5f5f5",
                    "font-size": "14px",
                    "position": "relative",
                    "margin-top": $element.height() + 10,
                    "width": w_description,
                    "padding": "8px 12px",
                    "word-wrap": "break-word",
                    "word-break": "break-all"
                });

                //描述信息的箭头
                var $arrowUp = $("<i></i>");
                //计算箭头的位置
                var left_arrow = parseInt($icon.css("left")) + 1;

                $arrowUp.css({
                    "height": "0",
                    "width": "0",
                    "position": "absolute",
                    "top": "-8px",
                    "left": left_arrow + "px",
                    "border-right": "8px solid transparent",
                    "border-bottom": "8px solid #f5f5f5",
                    "border-left": "8px solid transparent"
                });

                $description.append($arrowUp);
                $element.append($description);
            }
        },

        //
        // Error : 这里需要去掉，统一从 $.SmartForm.PostForm 入口
        //异步取数
        //@url:地址
        //@type:类型，post、get
        //@dataParam:传入的json数据
        //@successCallBack:回调，可不传
        //@isAsync:是否异步，可不传
        //@errorCallBack:回调，可不传
        Ajax: function (url, type, dataParam, successCallBack, isAsync, errorCallBack) {
            console.log("Ajax 这个接口后续将移除，请关注!");
            if(!window.isExpAccount){
                url = window.zuul + url   //配置接口地址
            }
            var sharingKey = $.IQuery("SharingKey");
            var engineCode = $.IQuery("EngineCode");
            var data = $.extend({
                SharingKey: sharingKey, EngineCode: engineCode
            }, dataParam);

            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: "json",
                xhrFields:{
                    withCredentials: true
                },
                crossDomain:true,
                async: isAsync == null ? true : isAsync,
                success: function (data) {
                    if ($.isFunction(successCallBack))
                        successCallBack.apply(this, [data]);
                },
                error: function (data) {
                    if ($.isFunction(errorCallBack))
                        errorCallBack.apply(this, [data]);
                }
            });
        }
    }
    function Stack() {
        this.store = [];
        this.top = 0;
        this.push = function (ele) {
            this.store[this.top++] = ele;
        };
        this.pop = function () {
            var top = --this.top;
            if (top >= 0) {
                var val = this.store[top];
                this.store.splice(this.top, 1);
                return val;
            } else {
                return "";
            }
        };
    };
})(jQuery);;
// 控件管理器
(function ($) {
    //核心属性
    $.ControlManager = {
        //页面参数属性、事件的属性
        PreDataKey: "data-",
        //已经渲染过后的标示前缀
        SheetIDKey: "jcontrolid",
        //数据项属性
        DataFieldKey: "DataField",
        //控件名称
        SheetControlKey: "controlkey",

        // 控件数量
        ControlCount: 0,
        // 管理器
        Controls: {},
        // 管理器备份，在移动端多个表单间切换时使用
        Controls_bak: {},
        //表单自定义js脚本，在移动端多个表单间切换时使用
        CustomJSScript_bak: {},

        // ** $.fn.Sheet{control}
        // ** 会调用这个方法,并传入作用域(this)
        // ** control [control]  控件名
        // ** parm [args] 参数(数组):从后台加载出来的相关数据
        Run: function (control, args) {
            // 读取默认属性
            var p;

            // 当前的ID
            var currentSheetIDKey = 0;
            //如果只有一个的话，就会返回
            var isOneControl = 0;

            //循环页面上的控件
            this.each(function () {
                if (!$(this).attr("data-" + $.ControlManager.SheetIDKey)) {
                    //edit by xc
                    p = $.Controls.GetDefaultOptions(control);
                    //ERROR这里把开发者没有更改的数据，也传到浏览器了，没有更改的这一部分不传;
                    if (args.length > 0) {
                        // Error:DataItem 应该是没必要的
                        $.extend(p, { DataItem: args[0] });
                        // 后台属性覆盖
                        $.extend(p, args[0]);
                    }
                    //edit end

                    // 控件数量加1
                    $.ControlManager.ControlCount++;
                    // 添加控件属性
                    currentSheetIDKey = $.ControlManager.SheetIDKey + "-" + $.ControlManager.ControlCount.toString();
                    var datafield = $(this).attr("data-" + $.ControlManager.DataFieldKey.toLocaleLowerCase());
                    p[$.ControlManager.DataFieldKey] = $(this).attr("data-" + $.ControlManager.DataFieldKey.toLocaleLowerCase());
                    $(this).attr("data-" + $.ControlManager.SheetIDKey, currentSheetIDKey);
                    // new 控件
                    $.ControlManager.Controls[currentSheetIDKey] = new $.Controls[control](this, p, $.SmartForm.ResponseContext);
                }
                isOneControl++;
            });

            //如果是一个的话，返回当前控件管理器
            if (isOneControl == 1) {
                return $.ControlManager.Controls[$(this).attr("data-" + $.ControlManager.SheetIDKey)];
            }
        },

        ClearControls: function () {

            this.Controls = {};
            this.ControlCount = 0;
        },

        // 保存事件，获取所有控件的保存后返回的值
        SaveSheetData: function() {
            var SheetData = {};
            for (var control in this.Controls) {
                var controlManager = this.Controls[control];
                //过滤掉过滤条件中的控件
                var controlKey = $(controlManager.Element).attr("data-controlkey");
                if (controlKey == undefined) {
                    continue;
                }
                //关联属性控件有sourceType属性,其数据不保存到数据库
                var sourceType = $(controlManager.Element).attr("data-sourcetype");
                if (sourceType != undefined) {
                    continue;
                }
                //字表中的control不调用SaveDataField，由子表自己调用SaveDataField保存值
                if (!$.isFunction(controlManager.SaveDataField) || controlManager.DataField == void 0 || (controlManager.DataField + "").indexOf(".") != -1 || controlManager.DataField == "Comments") continue;
                $.extend(SheetData, controlManager.SaveDataField());
            }
            return SheetData;
        },

        // 获取控件Dom元素(JQuery对象)，参数可以是数据项名称，也可以是#id
        GetElement: function (datafiled, bizObjectId) {
            var element, $sheet;
            if ($.SmartForm.ResponseContext.IsMobile) {
                $sheet = $.SmartForm.ResponseContext.SheetView;
            }
            else {
                $sheet = $("#SheetContent");
            }
            if (datafiled.indexOf("#") == 0) {
                element = $(datafiled);
            }
            else {
                if (datafiled.indexOf('.') > -1) {
                    //如果是子表，创建的时候，得先处理子表的渲染
                    this.GetElement(datafiled.split('.')[0]).JControl();
                }
                if ($.isEmptyObject(bizObjectId)) {
                    element = $sheet.find("[" + this.PreDataKey + this.DataFieldKey.toLowerCase() + "='" + datafiled + "']:not(.table_th)");
                }
                else {
                    element = $sheet.find("[data-ObjectId='" + bizObjectId + "']").find("[" + this.PreDataKey + this.DataFieldKey.toLowerCase() + "='" + datafiled + "']:not(.table_th)");
                }
            }
            return element;
        },

        // 读取数据，参数可以是数据项名称，也可以是#id
        GetControlValue: function (datafiled) {
            var control = this.GetElement(datafiled);
            var vals = new Array();
            for (var i = 0; i < control.length; i++) {
                var manager = $(control[i]).JControl();
                if (manager) {
                    vals.push(manager.GetValue());
                }
            }
            return vals.length == 0 ? null : (vals.length == 1 ? vals[0] : vals);
        },

        // 设置数据项前端控件的值
        // 参数1：数据项名称，参数2：数据项的值
        SetControlValue: function (datafiled, val, BizObjectId) {
            var control = this.GetElement(datafiled, BizObjectId);
            for (var i = 0; i < control.length; i++) {
                var manager = $(control[i]).JControl();
                if (manager) {
                    manager.SetValue(val);
                }
            }

        },

        // 函数：控件校验
        Validate: function (ActionControl) {
            var flag = true;
            for (var control in this.Controls) {
                var controlManager = this.Controls[control];

                if (ActionControl != null && ActionControl.Action == $.SmartForm.Action_Save && !(controlManager instanceof $.Controls.FormAttachment) && !(controlManager instanceof $.Controls.FormPhoto)) {
                    //保存的时候，需要校验附件是上传完整
                    continue;
                }

                if (!$.isFunction(controlManager.Validate)) continue;
                if (controlManager.DataField == void 0) continue;
                //控件不可见不校验
                if (!$(controlManager.Element).is(":visible") || $(controlManager.Element).css('visibility') == 'hidden') continue;
                if (!controlManager.Validate(ActionControl.Action) && flag) {
                    flag = false;
                    if (ActionControl.doingWork != undefined) {
                        ActionControl.doingWork = false;
                    }

                    // 自动定位到验证失败的控件
                    if (controlManager.IsMobile) {
                        var $elment = $(controlManager.Element);
                        //edit by xc
                        //// 滚动高度为，当前元素相对页面顶部的top+元素自身height - 手机页口可视高度 - 底部操作按钮高度
                        //var $par = $elment.closest(".ionic-scroll.sheetcontent").children(".scroll");
                        //var bottomToolBarHeight = 50;
                        ////获取$par的translateY值
                        //var ty = $par.length > 0 ? -parseInt(getTranslateY($par[0])) : 0;
                        //var top = $elment.offset().top - $(window).height() + bottomToolBarHeight + $elment.height() + ty;
                        var top = $elment.position().top;
                        //end
                        H3Config.GlobalScrollDelegate.scrollTo(null, top, true);

                        $.IShowError("提示", "抱歉，[" + controlManager.DisplayName.replace(/(^\s*)|(\s*$)/g, "") + "]选项" + controlManager.invalidText);
                        $elment.find("input").focus();
                    }
                }
            }
            if (!flag) {
                $("#SheetContent").trigger("ValidateFail");//必填验证失败的提示框可能会撑高子表行高
            }
            return flag;
        }
    };

    //var getTranslateY = function (node) {
    //    var regRule = /translate(Y|\dd)?\(\s*(\w+\s*,)?\s*([^,]+)(\s*,[^)]+)?\s*\)/;
    //    var regRule2 = /matrix\(.*,\s*(\w+)\s*\)/;
    //    var transform = node.style.transform;
    //    var reg;
    //    if (!transform) {
    //        return null;
    //    }
    //    reg = regRule.exec(transform);
    //    if (null === reg) {
    //        reg = regRule2.exec(transform);
    //        return reg ? reg[1] : null;
    //    }
    //    return reg[3];
    //}


})(jQuery);;
// JS框架,JS框架加载所有JS部件，提供与后台通讯方法
// 属性定义
// 定义Form命名控件
jQuery.extend({
    SmartForm: {
        // 所有的请求入口
        AjaxUrl: "/Form/OnAction",
        BaseActionName: "DoAction",
        // 表单编码
        FormCode: "",
        // 加载参数值,会根据各种信息，构造出是流程表单加载还是Bo开发平台加载,替换原来
        RequestParameters: {},

        // 所有跟后台交互，都通过Action_****
        // 加载
        Action_Load: "Load",
        // 加载表单标示
        LOADKEY: "Load",
        // 所有事件集合
        Actions: [],
        // 保存表单标示
        Action_Save: "Save",
        // 删除表单标示
        Aciton_Remove: "Remove",
        // 打印表单
        Action_Print: "Print",
        // 取消流程
        Action_CancelInstance: "CancelInstance",
        // 驳回
        Action_Reject: "Reject",
        // 提交
        Action_Submit: "Submit",
        // 取回流程
        Action_RetrieveInstance: "RetrieveInstance",
        // 结束流程
        Action_FinishInstance: "FinishInstance",
        // 查看流程实例
        Action_ViewInstance: "ViewInstance",
        // 转发
        Action_Forward: "Forward",
        // 查看二维码
        Action_QrCode: "ViewQrCode",
        // 关闭
        Action_Close: "Close",
        //提交中
        IsPosting: false,

        //表单是否加载完
        IsLoaded: false,

        // 审批节点类型
        WorkItemType: {
            // 普通工作项
            Fill: 0,
            // 审批节点
            Approve: 2
        },

        //// 提交并添加
        //SubmitAndAdd: {
        //    Action: "SubmitAndAdd", Icon: "icon-ok", Text: "提交并添加", OnActionDone: function (data) {
        //        if (data.Successful) {
        //            if (window.parent.$.ListView != null && $.isFunction(window.parent.$.ListView.RefreshView)) {
        //                window.parent.$.ListView.RefreshView();
        //            }
        //            var href = window.location.href;
        //            href = href.replace("&mid=", "&mid=" + Math.round(Math.random() * 100, 0));
        //            window.location.href = href;
        //        } else {
        //            if (data.Errors != void 0 && data.Errors != null && data.Errors.length > 0) {
        //                $.IShowError('错误', data.Errors[0]);
        //            }
        //        }
        //        return false;
        //    }
        //},

        // 表单数据类型
        SmartFormDataType: {
            /// 未指定
            Unspecified: 0,
            /// 流程数据
            Workflow: 1,
            /// 业务对象
            BizObject: 2
        },

        // 表单状态
        SmartFormMode: {
            // 未指定
            Unspecified: -1,
            // 编辑模式
            Edit: 0,
            // 查看模式
            Readonly: 1,
            // 发起流程
            Create: 2,
            // 打印模式
            Print: 3
        },

        //  表单状态
        BizObjectStatus: {
            Draft: 0, //草稿
            Effective: 1, //审批通过或表单提交后
            Running: 2, //流程运行中
            Canceled: 3 //被取消
        }
    }
});

export {LoadControlJSCSS,InitData,AppFilterInit,GetDivSearchDoms,SetFilterToolTip,ResetAppFilter,getUrlParam,GetNodeUrl} 






/* =========================================================
 * bootstrap-datetimepicker.js
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Improvements by Andrew Rowls
 * Improvements by Sébastien Malot
 * Improvements by Yun Lai
 * Improvements by Kenneth Henderick
 * Improvements by CuGBabyBeaR
 * Improvements by Christian Vaas <auspex@auspex.eu>
 *
 * Project URL : http://www.malot.fr/bootstrap-datetimepicker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function (factory) {
    if (typeof define === 'function' && define.amd)
        define(['jquery'], factory);
    else if (typeof exports === 'object')
        factory(require('jquery'));
    else
        factory(jQuery);
}(function ($, undefined) {
    // Add ECMA262-5 Array methods if not supported natively (IE8)
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf = function (find, i) {
            if (i === undefined) i = 0;
            if (i < 0) i += this.length;
            if (i < 0) i = 0;
            for (var n = this.length; i < n; i++) {
                if (i in this && this[i] === find) {
                    return i;
                }
            }
            return -1;
        }
    }

    // Add timezone abbreviation support for ie6+, Chrome, Firefox
    function timeZoneAbbreviation() {
        var abbreviation, date, formattedStr, i, len, matchedStrings, ref, str;
        date = (new Date()).toString();
        formattedStr = ((ref = date.split('(')[1]) != null ? ref.slice(0, -1) : 0) || date.split(' ');
        if (formattedStr instanceof Array) {
            matchedStrings = [];
            for (var i = 0, len = formattedStr.length; i < len; i++) {
                str = formattedStr[i];
                if ((abbreviation = (ref = str.match(/\b[A-Z]+\b/)) !== null) ? ref[0] : 0) {
                    matchedStrings.push(abbreviation);
                }
            }
            formattedStr = matchedStrings.pop();
        }
        return formattedStr;
    }

    function UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments));
    }

    // Picker object
    var Datetimepicker = function (element, options) {
        var that = this;
        this.element = $(element);
        // add container for single page application
        // when page switch the datetimepicker div will be removed also.
        this.container = options.container || "body";//$($(this.element).closest("body")[0]);

        this.language = /*options.language || this.element.data('date-language') ||*/ 'en';
        this.formatType = /*options.formatType || this.element.data('format-type') ||*/ 'standard';
        this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || dates[this.language].format || DPGlobal.getDefaultFormat(this.formatType, 'input'), this.formatType);
        this.isInline = false;
        this.isVisible = false;
        this.isInput = this.element.is('input');

        this.component = this.element.is('.date') ? (/*this.bootcssVer === 3 ?*/ this.element.find('.input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-remove, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o').parent()/* : this.element.find('.add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar, .add-on .fa-calendar, .add-on .fa-clock-o').parent()*/) : false;
        this.componentReset = this.element.is('.date') ? (/*this.bootcssVer === 3 ?*/ this.element.find('.input-group-addon .glyphicon-remove, .input-group-addon .fa-times').parent() /*: this.element.find('.add-on .icon-remove, .add-on .fa-times').parent()*/) : false;
        this.hasInput = this.component && this.element.find('input').length;
        if (this.component && this.component.length === 0) {
            this.component = false;
        }
        this.linkField = options.linkField || this.element.data('link-field') || false;
        this.linkFormat = DPGlobal.parseFormat(options.linkFormat || this.element.data('link-format') || DPGlobal.getDefaultFormat(this.formatType, 'link'), this.formatType);
        this.minuteStep = options.minuteStep || this.element.data('minute-step') || 5;
        this.pickerPosition = options.pickerPosition || this.element.data('picker-position') || 'bottom-right';
        this.showMeridian = options.showMeridian || this.element.data('show-meridian') || false;
        this.initialDate = options.initialDate || new Date();
        this.zIndex = options.zIndex || this.element.data('z-index') || undefined;
        this.title = typeof options.title === 'undefined' ? false : options.title;
        this.timezone = options.timezone || timeZoneAbbreviation();

        // 修正位置
        this.fixTop = options.fixTop || 0;

        this._attachEvents();

        this.clickedOutside = function (e) {
            //日期控件下拉出现的情况下再次点击日期控件不会执行任何操作
            if (e.target == e.data.element[0]) {
                return;
            }
            // Clicked outside the datetimepicker, hide it
            if ($(e.target).closest('.datetimepicker').length === 0) {
                that.hide();
            }
        }

        this.formatViewType = 'datetime';
        if ('formatViewType' in options) {
            this.formatViewType = options.formatViewType;
        } else if ('formatViewType' in this.element.data()) {
            this.formatViewType = this.element.data('formatViewType');
        }

        this.minView = 0;
        if ('minView' in options) {
            this.minView = options.minView;
        } else if ('minView' in this.element.data()) {
            this.minView = this.element.data('min-view');
        }
        this.minView = DPGlobal.convertViewMode(this.minView);

        this.maxView = DPGlobal.modes.length - 1;
        if ('maxView' in options) {
            this.maxView = options.maxView;
        } else if ('maxView' in this.element.data()) {
            this.maxView = this.element.data('max-view');
        }
        this.maxView = DPGlobal.convertViewMode(this.maxView);

        this.wheelViewModeNavigation = false;

        this.wheelViewModeNavigationInverseDirection = false;


        this.startViewMode = 2;
        if ('startView' in options) {
            this.startViewMode = options.startView;
        } else if ('startView' in this.element.data()) {
            this.startViewMode = this.element.data('start-view');
        }
        this.startViewMode = DPGlobal.convertViewMode(this.startViewMode);
        //如果只是显示时间则要修改打开视图位选择时间的
        if (this.format.parts.length == 3 || this.format.parts.length == 2) {
            var partArr = this.format.parts;
            if (partArr[0] == 'hh' && partArr[1] == 'ii') {
                this.startViewMode = 1;
            }
        }
        this.viewMode = this.startViewMode;

        this.viewSelect = this.minView;
        if ('viewSelect' in options) {
            this.viewSelect = options.viewSelect;
        } else if ('viewSelect' in this.element.data()) {
            this.viewSelect = this.element.data('view-select');
        }
        this.viewSelect = DPGlobal.convertViewMode(this.viewSelect);

        this.forceParse = true;
        if ('forceParse' in options) {
            this.forceParse = options.forceParse;
        } else if ('dateForceParse' in this.element.data()) {
            this.forceParse = this.element.data('date-force-parse');
        }
        var template = DPGlobal.templateV3;
        //根据日期类型处理view
        var $tmp = $(template);
        if (this.startViewMode == 1) {
            //var $tmp = $(template).find('div.datetimepicker-hours span.back').remove();
            //template = $tmp[0].outerHTML;
            $tmp.find('div.datetimepicker-hours span.back').remove();
        }
        this.picker = $tmp
            .appendTo(this.isInline ? this.element : this.container) // 'body')
            .on({
                click: $.proxy(this.click, this),
                mousedown: $.proxy(this.mousedown, this)
            });


        if (this.isInline) {
            this.picker.addClass('datetimepicker-inline');
        } else {
            this.picker.addClass('datetimepicker-dropdown-' + this.pickerPosition + ' dropdown-menu');
        }

        $(document).on('mousedown touchend', this, this.clickedOutside);

        this.autoclose = true;//点击后自动关闭
        if ('autoclose' in options) {
            this.autoclose = options.autoclose;
        } else if ('dateAutoclose' in this.element.data()) {
            this.autoclose = this.element.data('date-autoclose');
        }

        this.keyboardNavigation = true;
        if ('keyboardNavigation' in options) {
            this.keyboardNavigation = options.keyboardNavigation;
        } else if ('dateKeyboardNavigation' in this.element.data()) {
            this.keyboardNavigation = this.element.data('date-keyboard-navigation');
        }

        this.todayBtn = true;
        this.clearBtn = true;
        this.todayHighlight = false;

        this.weekStart = 0;
        if (typeof options.weekStart !== 'undefined') {
            this.weekStart = options.weekStart;
        } else if (typeof this.element.data('date-weekstart') !== 'undefined') {
            this.weekStart = this.element.data('date-weekstart');
        } else if (typeof dates[this.language].weekStart !== 'undefined') {
            this.weekStart = dates[this.language].weekStart;
        }
        this.weekStart = this.weekStart % 7;
        this.weekEnd = ((this.weekStart + 6) % 7);
        this.onRenderDay = function (date) {
            var render = (options.onRenderDay || function () { return []; })(date);
            if (typeof render === 'string') {
                render = [render];
            }
            var res = ['day'];
            return res.concat((render ? render : []));
        };
        this.onRenderHour = function (date) {
            var render = (options.onRenderHour || function () { return []; })(date);
            var res = ['hour'];
            if (typeof render === 'string') {
                render = [render];
            }
            return res.concat((render ? render : []));
        };
        this.onRenderMinute = function (date) {
            var render = (options.onRenderMinute || function () { return []; })(date);
            var res = ['minute'];
            if (typeof render === 'string') {
                render = [render];
            }
            if (date < this.startDate || date > this.endDate) {
                res.push('disabled');
            } else if (Math.floor(this.date.getUTCMinutes() / this.minuteStep) === Math.floor(date.getUTCMinutes() / this.minuteStep)) {
                res.push('active');
            }
            return res.concat((render ? render : []));
        };
        this.onRenderYear = function (date) {
            var render = (options.onRenderYear || function () { return []; })(date);
            var res = ['year'];
            if (typeof render === 'string') {
                render = [render];
            }
            if (this.date.getUTCFullYear() === date.getUTCFullYear()) {
                res.push('active');
            }
            var currentYear = date.getUTCFullYear();
            var endYear = this.endDate.getUTCFullYear();
            if (date < this.startDate || currentYear > endYear) {
                res.push('disabled');
            }
            return res.concat((render ? render : []));
        }
        this.onRenderMonth = function (date) {
            var render = (options.onRenderMonth || function () { return []; })(date);
            var res = ['month'];
            if (typeof render === 'string') {
                render = [render];
            }
            return res.concat((render ? render : []));
        }
        this.startDate = new Date(-8639968443048000);
        this.endDate = new Date(8639968443048000);
        this.datesDisabled = [];
        this.daysOfWeekDisabled = [];
        this.setStartDate(options.startDate || this.element.data('date-startdate'));
        this.setEndDate(options.endDate || this.element.data('date-enddate'));
        this.setDatesDisabled(options.datesDisabled || this.element.data('date-dates-disabled'));
        this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data('date-days-of-week-disabled'));
        this.setMinutesDisabled(options.minutesDisabled || this.element.data('date-minute-disabled'));
        this.setHoursDisabled(options.hoursDisabled || this.element.data('date-hour-disabled'));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();

        if (this.isInline) {
            this.show();
        }
    };

    Datetimepicker.prototype = {
        constructor: Datetimepicker,

        _events: [],
        _attachEvents: function () {
            this._detachEvents();
            if (this.isInput) { // single input
                this._events = [
                    [this.element, {
                        focus: $.proxy(this.show, this),
                        keyup: $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }]
                ];
            }
            else if (this.component && this.hasInput) { // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.element.find('input'), {
                        focus: $.proxy(this.show, this),
                        keyup: $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
                if (this.componentReset) {
                    this._events.push([
                        this.componentReset,
                        { click: $.proxy(this.reset, this) }
                    ]);
                }
            }
            else if (this.element.is('div')) {  // inline datetimepicker
                this.isInline = true;
            }
            else {
                this._events = [
                    [this.element, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
            for (var i = 0, el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.on(ev);
            }
        },

        _detachEvents: function () {
            for (var i = 0, el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.off(ev);
            }
            this._events = [];
        },

        show: function (e) {
            //先隐藏其他的日期控件
            $(".datetimepicker").hide();
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            if (this.forceParse) {
                this.update();
            }
            this.place();
            $(window).on('resize', $.proxy(this.place, this));

            //绑定滚动事件
            var that = this;
            this.element.parents().each(function (index, obj) {
                $(obj).scroll(function () {
                    that.place();
                });
            })


            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            this.isVisible = true;
            this.element.trigger({
                type: 'show',
                date: this.date
            });
        },

        hide: function () {
            if (!this.isVisible) return;
            if (this.isInline) return;
            this.picker.hide();
            $(window).off('resize', this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off('mousedown', this.hide);
            }

            if (
                this.forceParse &&
                (
                    this.isInput && this.element.val() ||
                    this.hasInput && this.element.find('input').val()
                )
            )
                this.setValue();
            this.isVisible = false;
            this.element.trigger({
                type: 'hide',
                date: this.date
            });
        },

        remove: function () {
            this._detachEvents();
            $(document).off('mousedown', this.clickedOutside);
            this.picker.remove();
            delete this.picker;
            delete this.element.data().datetimepicker;
        },

        getDate: function () {
            var d = this.getUTCDate();
            //if (d === null) {
            //    return null;
            //}
            if (d == null) {
                //return null;
                return new Date();
            }
            return new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
        },

        getUTCDate: function () {
            return this.date;
        },

        getInitialDate: function () {
            return this.initialDate
        },

        setInitialDate: function (initialDate) {
            this.initialDate = initialDate;
        },

        setDate: function (d) {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)));
        },

        setUTCDate: function (d) {
            if (d >= this.startDate && d <= this.endDate) {
                this.date = d;
                this.setValue();
                this.viewDate = this.date;
                this.fill();
            } else {
                this.element.trigger({
                    type: 'outOfRange',
                    date: d,
                    startDate: this.startDate,
                    endDate: this.endDate
                });
            }
        },

        setFormat: function (format) {
            this.format = DPGlobal.parseFormat(format, this.formatType);
            var element;
            if (this.isInput) {
                element = this.element;
            } else if (this.component) {
                element = this.element.find('input');
            }
            if (element && element.val()) {
                this.setValue();
            }
        },

        setValue: function () {
            var formatted = this.getFormattedDate();
            if (!this.isInput) {
                if (this.component) {
                    this.element.find('input').val(formatted);
                }
                this.element.data('date', formatted);
            } else {
                this.element.val(formatted);
            }
            if (this.linkField) {
                $('#' + this.linkField).val(this.getFormattedDate(this.linkFormat));
            }
        },

        getFormattedDate: function (format) {
            format = format || this.format;
            return DPGlobal.formatDate(this.date, format, this.language, this.formatType, this.timezone);
        },

        setStartDate: function (startDate) {
            this.startDate = startDate || this.startDate;
            if (this.startDate.valueOf() !== 8639968443048000) {
                this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language, this.formatType, this.timezone);
            }
            this.update();
            this.updateNavArrows();
        },

        setEndDate: function (endDate) {
            this.endDate = endDate || this.endDate;
            if (this.endDate.valueOf() !== 8639968443048000) {
                this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language, this.formatType, this.timezone);
            }
            this.update();
            this.updateNavArrows();
        },

        setDatesDisabled: function (datesDisabled) {
            this.datesDisabled = datesDisabled || [];
            if (!$.isArray(this.datesDisabled)) {
                this.datesDisabled = this.datesDisabled.split(/,\s*/);
            }
            var mThis = this;
            this.datesDisabled = $.map(this.datesDisabled, function (d) {
                return DPGlobal.parseDate(d, mThis.format, mThis.language, mThis.formatType, mThis.timezone).toDateString();
            });
            this.update();
            this.updateNavArrows();
        },

        setTitle: function (selector, value) {
            return this.picker.find(selector)
                .find('th:eq(2)')
                .text(this.title === false ? value : this.title);
        },

        setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
            this.daysOfWeekDisabled = daysOfWeekDisabled || [];
            if (!$.isArray(this.daysOfWeekDisabled)) {
                this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/);
            }
            this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function (d) {
                return parseInt(d, 10);
            });
            this.update();
            this.updateNavArrows();
        },

        setMinutesDisabled: function (minutesDisabled) {
            this.minutesDisabled = minutesDisabled || [];
            if (!$.isArray(this.minutesDisabled)) {
                this.minutesDisabled = this.minutesDisabled.split(/,\s*/);
            }
            this.minutesDisabled = $.map(this.minutesDisabled, function (d) {
                return parseInt(d, 10);
            });
            this.update();
            this.updateNavArrows();
        },

        setHoursDisabled: function (hoursDisabled) {
            this.hoursDisabled = hoursDisabled || [];
            if (!$.isArray(this.hoursDisabled)) {
                this.hoursDisabled = this.hoursDisabled.split(/,\s*/);
            }
            this.hoursDisabled = $.map(this.hoursDisabled, function (d) {
                return parseInt(d, 10);
            });
            this.update();
            this.updateNavArrows();
        },

        place: function () {
            if (this.isInline) return;

            if (!this.zIndex) {
                var index_highest = 0;
                $('div').each(function () {
                    var index_current = parseInt($(this).css('zIndex'), 10);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                    }
                });
                this.zIndex = index_highest + 10;
            }

            var offset, top, left, containerOffset;
            if (this.container instanceof $) {
                containerOffset = this.container.offset();
            } else {
                containerOffset = $(this.container).offset();
            }
            if (this.component) {
                offset = this.component.offset();
                left = offset.left;
                if (this.pickerPosition === 'bottom-left' || this.pickerPosition === 'top-left') {
                    left += this.component.outerWidth() - this.picker.outerWidth();
                }
            } else {
                offset = this.element.offset();
                left = offset.left;
                if (this.pickerPosition === 'bottom-left' || this.pickerPosition === 'top-left') {
                    left += this.element.outerWidth() - this.picker.outerWidth();
                }
            }

            var bodyWidth = document.body.clientWidth || window.innerWidth;
            if (left + 220 > bodyWidth) {
                left = bodyWidth - 220;
            }

            if (this.pickerPosition === 'top-left' || this.pickerPosition === 'top-right') {
                top = offset.top - this.picker.outerHeight();
            } else {
                top = offset.top + (this.height ? this.height : 0);
            }

            top = top - containerOffset.top + this.fixTop;
            left = left - containerOffset.left;
            this.picker.css({
                top: top,
                left: left,
                zIndex: this.zIndex
            });
        },

        hour_minute: "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]",

        update: function () {
            var date, fromArgs = false;
            if (arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
                date = arguments[0];
                fromArgs = true;
            } else {
                date = (this.isInput ? this.element.val() : this.element.find('input').val()) || this.element.data('date') || this.initialDate;
                if (typeof date === 'string') {
                    date = date.replace(/^\s+|\s+$/g, '');
                }
            }

            if (!date) {
                date = new Date();
                fromArgs = false;
            }

            if (typeof date === "string") {
                if (new RegExp(this.hour_minute).test(date) || new RegExp(this.hour_minute + ":[0-5][0-9]").test(date)) {
                    var flag = false;
                    var partArr = this.format.parts;
                    if (partArr.length == 2 || partArr.length == 3) {
                        if (partArr[0].toLowerCase() == 'hh' && partArr[1].toLowerCase() == 'ii') {
                            flag = true;
                            var tmp = date.split(':');
                            var now = new Date();
                            date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), tmp[0], tmp[1], 0);
                        }
                    }
                    if (!flag)
                        date = this.getDate()
                }
            }

            this.date = DPGlobal.parseDate(date, this.format, this.language, this.formatType, this.timezone);

            if (fromArgs) this.setValue();

            if (this.date < this.startDate) {
                this.viewDate = new Date(this.startDate);
            } else if (this.date > this.endDate) {
                this.viewDate = new Date(this.endDate);
            } else {
                this.viewDate = new Date(this.date);
            }
            this.fill();
        },

        //渲染顶部星期
        fillDow: function () {
            var dowCnt = this.weekStart,
                html = '<tr class="weekdays">';
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">' + dates[this.language].daysMin[(dowCnt++) % 7] + '</th>';
            }
            html += '</tr>';
            html += '<tr>';
            for (var i = 0; i < 7; i++) {
                html += '<th></th>';
            }
            html += '</tr>';
            this.picker.find('.datetimepicker-days thead').append(html);
        },
        //渲染月
        fillMonths: function () {
            var html = '';
            var d = new Date(this.viewDate);
            for (var i = 0; i < 12; i++) {
                d.setUTCMonth(i);
                var classes = this.onRenderMonth(d);
                html += '<span class="' + classes.join(' ') + '">' + dates[this.language].monthsShort[i] + '</span>';
            }
            this.picker.find('.datetimepicker-months td').html(html);
        },
        //填充日期
        fill: function () {
            if (!this.date || !this.viewDate) {
                return;
            }
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                dayMonth = d.getUTCDate(),
                hours = d.getUTCHours(),
                startYear = this.startDate.getUTCFullYear(),
                startMonth = this.startDate.getUTCMonth(),
                endYear = this.endDate.getUTCFullYear(),
                endMonth = this.endDate.getUTCMonth() + 1,
                currentDate = (new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
                today = new Date();
            this.setTitle('.datetimepicker-days', year + '年' + dates[this.language].months[month]);
            if (this.formatViewType === 'time') {
                var formatted = this.getFormattedDate();
                this.setTitle('.datetimepicker-hours', formatted);
                this.setTitle('.datetimepicker-minutes', formatted);
            } else {
                if (this.startViewMode == 1) {
                    //如果是hh:ii不要显示时间
                    this.picker.find('div.datetimepicker-hours thead>tr>th,div.datetimepicker-minutes thead>tr>th').empty().css({ 'height': '10px', 'padding': 0 });
                } else {
                    this.setTitle('.datetimepicker-hours', year + '年' + dates[this.language].months[month] + dayMonth + '日');
                    this.setTitle('.datetimepicker-minutes', year + '年' + dates[this.language].months[month] + dayMonth + '日');
                }
            }
            this.picker.find('tfoot th.today').text(dates[this.language].today || dates['en'].today).toggle(this.todayBtn !== false);
            this.picker.find('tfoot th.clear').text(dates[this.language].clear || dates['en'].clear).toggle(this.clearBtn !== false);
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var classes;
            while (prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getUTCDay() === this.weekStart) {
                    html.push('<tr>');
                }
                classes = this.onRenderDay(prevMonth);
                if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() === year && prevMonth.getUTCMonth() < month)) {
                    classes.push('old');
                } else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() === year && prevMonth.getUTCMonth() > month)) {
                    classes.push('new');
                }
                // Compare internal UTC date with local today, not UTC today
                if (this.todayHighlight &&
                    prevMonth.getUTCFullYear() === today.getFullYear() &&
                    prevMonth.getUTCMonth() === today.getMonth() &&
                    prevMonth.getUTCDate() === today.getDate()) {
                    classes.push('today');
                }
                if (prevMonth.valueOf() === currentDate) {
                    classes.push('active');
                }
                if ((prevMonth.valueOf() + 86400000) <= this.startDate || prevMonth.valueOf() > this.endDate ||
                    $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1 ||
                    $.inArray(prevMonth.toDateString(), this.datesDisabled) !== -1) {
                    classes.push('disabled');
                }

                html.push('<td class="' + classes.join(' ') + '"><i>' + prevMonth.getUTCDate() + '</i></td>');
                if (prevMonth.getUTCDay() === this.weekEnd) {
                    html.push('</tr>');
                }

                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
            }
            html.push('<tr class="day-below"><td colspan="7"></td></tr>');
            this.picker.find('.datetimepicker-days tbody').empty().append(html.join(''));

            html = [];
            var txt = '', meridian = '', meridianOld = '';
            var hoursDisabled = this.hoursDisabled || [];
            d = new Date(this.viewDate)
            for (var i = 0; i < 24; i++) {
                d.setUTCHours(i);
                classes = this.onRenderHour(d);
                if (hoursDisabled.indexOf(i) !== -1) {
                    classes.push('disabled');
                }
                var actual = UTCDate(year, month, dayMonth, i);
                // We want the previous hour for the startDate
                if ((actual.valueOf() + 3600000) <= this.startDate || actual.valueOf() > this.endDate) {
                    classes.push('disabled');
                } else if (hours === i) {
                    classes.push('active');
                }
                if (this.showMeridian && dates[this.language].meridiem.length === 2) {
                    meridian = (i < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
                    if (meridian !== meridianOld) {
                        if (meridianOld !== '') {
                            html.push('</fieldset>');
                        }
                        html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + '</legend>');
                    }
                    meridianOld = meridian;
                    txt = (i % 12 ? i % 12 : 12);
                    if (i < 12) {
                        classes.push('hour_am');
                    } else {
                        classes.push('hour_pm');
                    }
                    html.push('<span class="' + classes.join(' ') + '">' + txt + '</span>');
                    if (i === 23) {
                        html.push('</fieldset>');
                    }
                } else {
                    txt = i + ':00';
                    html.push('<span class="' + classes.join(' ') + '">' + txt + '</span>');
                }
            }
            if (this.startViewMode == 1) {//时间模式
                html.push('<span class="no-title-hour-below"></span>');
                //时间模式要调整底部button居中
                this.picker.find('.datetimepicker-hours span.now').addClass('no-title-now');
                this.picker.find('.datetimepicker-hours span.clear').addClass('no-title-clear');

            } else {//日期模式
                html.push('<span class="hour-below"></span>');
                this.picker.find('.datetimepicker-hours span.now').removeClass('no-title-now');
                this.picker.find('.datetimepicker-hours span.clear').removeClass('no-title-clear');
            }
            //html.push('<span class="hour-below"></>');
            this.picker.find('.datetimepicker-hours td').html(html.join(''));

            html = [];
            txt = '';
            meridian = '';
            meridianOld = '';
            var minutesDisabled = this.minutesDisabled || [];
            d = new Date(this.viewDate);
            for (var i = 0; i < 60; i += this.minuteStep) {
                if (minutesDisabled.indexOf(i) !== -1) continue;
                d.setUTCMinutes(i);
                d.setUTCSeconds(0);
                classes = this.onRenderMinute(d);
                if (this.showMeridian && dates[this.language].meridiem.length === 2) {
                    meridian = (hours < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1]);
                    if (meridian !== meridianOld) {
                        if (meridianOld !== '') {
                            html.push('</fieldset>');
                        }
                        html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + '</legend>');
                    }
                    meridianOld = meridian;
                    txt = (hours % 12 ? hours % 12 : 12);
                    html.push('<span class="' + classes.join(' ') + '">' + txt + ':' + (i < 10 ? '0' + i : i) + '</span>');
                    if (i === 59) {
                        html.push('</fieldset>');
                    }
                } else {
                    txt = i + ':00';
                    html.push('<span class="' + classes.join(' ') + '">' + hours + ':' + (i < 10 ? '0' + i : i) + '</span>');
                }
            }
            if (this.startViewMode == 1) {
                html.push('<span class="no-title-minute-below"></span>');
            } else {
                html.push('<span class="minute-below"></span>');
            }
            this.picker.find('.datetimepicker-minutes td').html(html.join(''));

            var currentYear = this.date.getUTCFullYear();
            var months = this.setTitle('.datetimepicker-months', year)
                .end()
                .find('.month').removeClass('active');
            if (currentYear === year) {
                // getUTCMonths() returns 0 based, and we need to select the next one
                // To cater bootstrap 2 we don't need to select the next one
                months.eq(this.date.getUTCMonth()).addClass('active');
            }
            if (year < startYear || year > endYear) {
                months.addClass('disabled');
            }
            if (year === startYear) {
                months.slice(0, startMonth).addClass('disabled');
            }
            if (year === endYear) {
                months.slice(endMonth).addClass('disabled');
            }

            html = '';
            year = parseInt(year / 10, 10) * 10;
            var yearCont = this.setTitle('.datetimepicker-years', year + '-' + (year + 9))
                .end()
                .find('td');
            year -= 1;
            d = new Date(this.viewDate);
            for (var i = -1; i < 11; i++) {
                d.setUTCFullYear(year);
                classes = this.onRenderYear(d);
                if (i === -1 || i === 10) {
                    classes.push(old);
                }
                html += '<span class="' + classes.join(' ') + '">' + year + '</span>';
                year += 1;
            }
            yearCont.html(html);
            this.place();
        },

        updateNavArrows: function () {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                day = d.getUTCDate(),
                hour = d.getUTCHours();
            switch (this.viewMode) {
                case 0:
                //if (year <= this.startDate.getUTCFullYear()
                //  && month <= this.startDate.getUTCMonth()
                //  && day <= this.startDate.getUTCDate()
                //  && hour <= this.startDate.getUTCHours()) {
                //    this.picker.find('.prev').css({ visibility: 'hidden' });
                //    this.picker.find('.prevYear').css({ visibility: 'hidden' });
                //} else {
                //    this.picker.find('.prev').css({ visibility: 'visible' });
                //    this.picker.find('.prevYear').css({ visibility: 'visible' });
                //}
                //if (year >= this.endDate.getUTCFullYear()
                //  && month >= this.endDate.getUTCMonth()
                //  && day >= this.endDate.getUTCDate()
                //  && hour >= this.endDate.getUTCHours()) {
                //    this.picker.find('.next').css({ visibility: 'hidden' });
                //    this.picker.find('.nextYear').css({ visibility: 'hidden' });
                //} else {
                //    this.picker.find('.next').css({ visibility: 'visible' });
                //    this.picker.find('.nextYear').css({ visibility: 'visible' });
                //}
                //break;
                case 1:
                    //if (year <= this.startDate.getUTCFullYear()
                    //  && month <= this.startDate.getUTCMonth()
                    //  && day <= this.startDate.getUTCDate()) {
                    //    this.picker.find('.prev').css({ visibility: 'hidden' });
                    //    this.picker.find('.prevYear').css({ visibility: 'hidden' });
                    //} else {
                    //    this.picker.find('.prev').css({ visibility: 'visible' });
                    //    this.picker.find('.prevYear').css({ visibility: 'visible' });
                    //}
                    //if (year >= this.endDate.getUTCFullYear()
                    //  && month >= this.endDate.getUTCMonth()
                    //  && day >= this.endDate.getUTCDate()) {
                    //    this.picker.find('.next').css({ visibility: 'hidden' });
                    //    this.picker.find('.nextYear').css({ visibility: 'hidden' });
                    //} else {
                    //    this.picker.find('.next').css({ visibility: 'visible' });
                    //    this.picker.find('.nextYear').css({ visibility: 'visible' });
                    //}
                    this.picker.find('.prev').css({ visibility: 'hidden' });
                    this.picker.find('.prevYear').css({ visibility: 'hidden' });
                    this.picker.find('.next').css({ visibility: 'hidden' });
                    this.picker.find('.nextYear').css({ visibility: 'hidden' });
                    break;
                case 2:
                    if (year <= this.startDate.getUTCFullYear()
                        && month <= this.startDate.getUTCMonth()) {
                        this.picker.find('.prev').css({ visibility: 'hidden' });
                        this.picker.find('.prevYear').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.prev').css({ visibility: 'visible' });
                        this.picker.find('.prevYear').css({ visibility: 'visible' });
                    }
                    if (year >= this.endDate.getUTCFullYear()
                        && month >= this.endDate.getUTCMonth()) {
                        this.picker.find('.next').css({ visibility: 'hidden' });
                        this.picker.find('.nextYear').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.next').css({ visibility: 'visible' });
                        this.picker.find('.nextYear').css({ visibility: 'visible' });
                    }
                    break;
                case 3:
                case 4:
                    if (year <= this.startDate.getUTCFullYear()) {
                        this.picker.find('.prev').css({ visibility: 'hidden' });
                        this.picker.find('.prevYear').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.prev').css({ visibility: 'visible' });
                        this.picker.find('.prevYear').css({ visibility: 'visible' });
                    }
                    if (year >= this.endDate.getUTCFullYear()) {
                        this.picker.find('.next').css({ visibility: 'hidden' });
                        this.picker.find('.nextYear').css({ visibility: 'hidden' });
                    } else {
                        this.picker.find('.next').css({ visibility: 'visible' });
                        this.picker.find('.nextYear').css({ visibility: 'visible' });
                    }
                    break;
            }
        },


        click: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var target = $(e.target).closest('span, td, th, legend');
            if (target.is('.' + this.icontype)) {
                target = $(target).parent().closest('span, td, th, legend');
            }
            if (target.length === 1) {
                if (target.is('.disabled')) {
                    this.element.trigger({
                        type: 'outOfRange',
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                    return;
                }
                switch (target[0].nodeName.toLowerCase()) {
                    case 'th':
                        switch (target[0].className) {
                            case 'switch':
                                this.showMode(1);
                                break;
                            case 'prevYear':
                            case 'nextYear':
                                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prevYear' ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, dir);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, dir);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                                    default:
                                        break;
                                }
                                this.fill();
                                this.element.trigger({
                                    type: target[0].className + ':' + this.convertViewModeText(this.viewMode),
                                    date: this.viewDate,
                                    startDate: this.startDate,
                                    endDate: this.endDate
                                });
                                break;
                            case 'prev':
                            case 'next':
                                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, dir);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, dir);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                                }
                                this.fill();
                                this.element.trigger({
                                    type: target[0].className + ':' + this.convertViewModeText(this.viewMode),
                                    date: this.viewDate,
                                    startDate: this.startDate,
                                    endDate: this.endDate
                                });
                                break;
                            case 'clear':
                                this.reset();
                                if (this.autoclose) {
                                    this.hide();
                                }
                                break;
                            case 'today':
                                var date = new Date();
                                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);

                                // Respect startDate and endDate.
                                if (date < this.startDate) date = this.startDate;
                                else if (date > this.endDate) date = this.endDate;

                                this.viewMode = this.startViewMode;
                                this.showMode(0);
                                this._setDate(date);
                                this.fill();
                                if (this.autoclose) {
                                    this.hide();
                                }
                                break;
                        }
                        break;
                    case 'span':
                        if (!target.is('.disabled')) {
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth(),
                                day = this.viewDate.getUTCDate(),
                                hours = this.viewDate.getUTCHours(),
                                minutes = this.viewDate.getUTCMinutes(),
                                seconds = this.viewDate.getUTCSeconds();
                            if (target.is('.clear')) {
                                this.reset();
                                if (this.autoclose) {
                                    this.hide();
                                }
                                break;
                            } else if (target.is('.back')) {
                                this.showMode(1);
                                break;
                            } else if (target.is('.now')) {
                                var date = new Date();
                                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
                                if (date < this.startDate) date = this.startDate;
                                else if (date > this.endDate) date = this.endDate;

                                this.viewMode = this.startViewMode;
                                this.showMode(0);
                                this._setDate(date);
                                this.fill();
                                if (this.autoclose) {
                                    this.hide();
                                }
                                break;
                            } else if (target.is('.month')) {
                                this.viewDate.setUTCDate(1);
                                month = target.parent().find('span').index(target);
                                day = this.viewDate.getUTCDate();
                                this.viewDate.setUTCMonth(month);
                                this.element.trigger({
                                    type: 'changeMonth',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 3) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (target.is('.year')) {
                                this.viewDate.setUTCDate(1);
                                year = parseInt(target.text(), 10) || 0;
                                this.viewDate.setUTCFullYear(year);
                                this.element.trigger({
                                    type: 'changeYear',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 4) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (target.is('.hour')) {
                                hours = parseInt(target.text(), 10) || 0;
                                if (target.hasClass('hour_am') || target.hasClass('hour_pm')) {
                                    if (hours === 12 && target.hasClass('hour_am')) {
                                        hours = 0;
                                    } else if (hours !== 12 && target.hasClass('hour_pm')) {
                                        hours += 12;
                                    }
                                }
                                this.viewDate.setUTCHours(hours);
                                this.element.trigger({
                                    type: 'changeHour',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 1) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (target.is('.minute')) {
                                minutes = parseInt(target.text().substr(target.text().indexOf(':') + 1), 10) || 0;
                                this.viewDate.setUTCMinutes(minutes);
                                this.element.trigger({
                                    type: 'changeMinute',
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 0) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                                }
                            } else if (
                                target.is('.icon-date_left_2') ||
                                target.is('.icon-date_right_2') ||
                                target.is('.icon-date_left_1') ||
                                target.is('.icon-date_right_1')
                            ) {
                                target.parent().click();
                                return;
                            }
                            if (this.viewMode !== 0) {
                                var oldViewMode = this.viewMode;
                                this.showMode(-1);
                                this.fill();
                                if (oldViewMode === this.viewMode && this.autoclose) {
                                    this.hide();
                                }
                            } else {
                                this.fill();
                                if (this.autoclose) {
                                    this.hide();
                                }
                            }
                        }
                        break;
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')) {
                            var day = parseInt(target.text(), 10) || 1;
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth(),
                                hours = this.viewDate.getUTCHours(),
                                minutes = this.viewDate.getUTCMinutes(),
                                seconds = this.viewDate.getUTCSeconds();
                            if (target.is('.old')) {
                                if (month === 0) {
                                    month = 11;
                                    year -= 1;
                                } else {
                                    month -= 1;
                                }
                            } else if (target.is('.new')) {
                                if (month === 11) {
                                    month = 0;
                                    year += 1;
                                } else {
                                    month += 1;
                                }
                            }
                            this.viewDate.setUTCFullYear(year);
                            this.viewDate.setUTCMonth(month, day);
                            this.element.trigger({
                                type: 'changeDay',
                                date: this.viewDate
                            });
                            if (this.viewSelect >= 2) {
                                this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0));
                            }
                        }
                        //如果是日期格式则直接关闭弹窗
                        if (this.format.parts.length == 3) {
                            var partArr = this.format.parts;
                            if (partArr[0].toLowerCase() == 'yyyy' && partArr[1].toLowerCase() == 'mm' && partArr[2].toLowerCase() == 'dd') {
                                //this._setDate(UTCDate(year, month, day));
                                this.hide();
                                break;
                            }
                        }
                        var oldViewMode = this.viewMode;
                        this.showMode(-1);
                        this.fill();
                        if (oldViewMode === this.viewMode && this.autoclose) {
                            this.hide();
                        }
                        break;
                }
            }
        },

        _setDate: function (date, which) {
            if (!which || which === 'date')
                this.date = date;
            if (!which || which === 'view')
                this.viewDate = date;
            this.fill();
            this.setValue();
            var element;
            if (this.isInput) {
                element = this.element;
            } else if (this.component) {
                element = this.element.find('input');
            }
            if (element) {
                element.change();
            }
            this.element.trigger({
                type: 'changeDate',
                date: this.getDate()
            });
            if (date === null)
                this.date = this.viewDate;
        },

        moveMinute: function (date, dir) {
            if (!dir) return date;
            var new_date = new Date(date.valueOf());
            //dir = dir > 0 ? 1 : -1;
            new_date.setUTCMinutes(new_date.getUTCMinutes() + (dir * this.minuteStep));
            return new_date;
        },

        moveHour: function (date, dir) {
            if (!dir) return date;
            var new_date = new Date(date.valueOf());
            //dir = dir > 0 ? 1 : -1;
            new_date.setUTCHours(new_date.getUTCHours() + dir);
            return new_date;
        },

        moveDate: function (date, dir) {
            if (!dir) return date;
            var new_date = new Date(date.valueOf());
            //dir = dir > 0 ? 1 : -1;
            new_date.setUTCDate(new_date.getUTCDate() + dir);
            return new_date;
        },

        moveMonth: function (date, dir) {
            if (!dir) return date;
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month, test;
            dir = dir > 0 ? 1 : -1;
            if (mag === 1) {
                test = dir === -1
                    // If going back one month, make sure month is not current month
                    // (eg, Mar 31 -> Feb 31 === Feb 28, not Mar 02)
                    ? function () {
                        return new_date.getUTCMonth() === month;
                    }
                    // If going forward one month, make sure month is as expected
                    // (eg, Jan 31 -> Feb 31 === Feb 28, not Mar 02)
                    : function () {
                        return new_date.getUTCMonth() !== new_month;
                    };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                if (new_month < 0 || new_month > 11)
                    new_month = (new_month + 12) % 12;
            } else {
                // For magnitudes >1, move one month at a time...
                for (var i = 0; i < mag; i++)
                    // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                    new_date = this.moveMonth(new_date, dir);
                // ...then reset the day, keeping it in the new month
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function () {
                    return new_month !== new_date.getUTCMonth();
                };
            }
            // Common date-resetting loop -- if date is beyond end of month, make it
            // end of month
            while (test()) {
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },

        moveYear: function (date, dir) {
            return this.moveMonth(date, dir * 12);
        },

        dateWithinRange: function (date) {
            return date >= this.startDate && date <= this.endDate;
        },

        keydown: function (e) {
            //if (this.picker.is(':not(:visible)')) {
            //    if (e.keyCode === 27) // allow escape to hide and re-show picker
            //        this.show();
            //    return;
            //}
            //var dateChanged = false,
            //  dir, newDate, newViewDate;
            //switch (e.keyCode) {
            //    case 27: // escape
            //        this.hide();
            //        e.preventDefault();
            //        break;
            //    case 37: // left
            //    case 39: // right
            //        if (!this.keyboardNavigation) break;
            //        dir = e.keyCode === 37 ? -1 : 1;
            //        var viewMode = this.viewMode;
            //        if (e.ctrlKey) {
            //            viewMode += 2;
            //        } else if (e.shiftKey) {
            //            viewMode += 1;
            //        }
            //        if (viewMode === 4) {
            //            newDate = this.moveYear(this.date, dir);
            //            newViewDate = this.moveYear(this.viewDate, dir);
            //        } else if (viewMode === 3) {
            //            newDate = this.moveMonth(this.date, dir);
            //            newViewDate = this.moveMonth(this.viewDate, dir);
            //        } else if (viewMode === 2) {
            //            newDate = this.moveDate(this.date, dir);
            //            newViewDate = this.moveDate(this.viewDate, dir);
            //        } else if (viewMode === 1) {
            //            newDate = this.moveHour(this.date, dir);
            //            newViewDate = this.moveHour(this.viewDate, dir);
            //        } else if (viewMode === 0) {
            //            newDate = this.moveMinute(this.date, dir);
            //            newViewDate = this.moveMinute(this.viewDate, dir);
            //        }
            //        if (this.dateWithinRange(newDate)) {
            //            this.date = newDate;
            //            this.viewDate = newViewDate;
            //            this.setValue();
            //            this.update();
            //            e.preventDefault();
            //            dateChanged = true;
            //        }
            //        break;
            //    case 38: // up
            //    case 40: // down
            //        if (!this.keyboardNavigation) break;
            //        dir = e.keyCode === 38 ? -1 : 1;
            //        viewMode = this.viewMode;
            //        if (e.ctrlKey) {
            //            viewMode += 2;
            //        } else if (e.shiftKey) {
            //            viewMode += 1;
            //        }
            //        if (viewMode === 4) {
            //            newDate = this.moveYear(this.date, dir);
            //            newViewDate = this.moveYear(this.viewDate, dir);
            //        } else if (viewMode === 3) {
            //            newDate = this.moveMonth(this.date, dir);
            //            newViewDate = this.moveMonth(this.viewDate, dir);
            //        } else if (viewMode === 2) {
            //            newDate = this.moveDate(this.date, dir * 7);
            //            newViewDate = this.moveDate(this.viewDate, dir * 7);
            //        } else if (viewMode === 1) {
            //            if (this.showMeridian) {
            //                newDate = this.moveHour(this.date, dir * 6);
            //                newViewDate = this.moveHour(this.viewDate, dir * 6);
            //            } else {
            //                newDate = this.moveHour(this.date, dir * 4);
            //                newViewDate = this.moveHour(this.viewDate, dir * 4);
            //            }
            //        } else if (viewMode === 0) {
            //            newDate = this.moveMinute(this.date, dir * 4);
            //            newViewDate = this.moveMinute(this.viewDate, dir * 4);
            //        }
            //        if (this.dateWithinRange(newDate)) {
            //            this.date = newDate;
            //            this.viewDate = newViewDate;
            //            this.setValue();
            //            this.update();
            //            e.preventDefault();
            //            dateChanged = true;
            //        }
            //        break;
            //    case 13: // enter
            //        if (this.viewMode !== 0) {
            //            var oldViewMode = this.viewMode;
            //            this.showMode(-1);
            //            this.fill();
            //            if (oldViewMode === this.viewMode && this.autoclose) {
            //                this.hide();
            //            }
            //        } else {
            //            this.fill();
            //            if (this.autoclose) {
            //                this.hide();
            //            }
            //        }
            //        e.preventDefault();
            //        break;
            //    case 9: // tab
            //        this.hide();
            //        break;
            //}
            //if (dateChanged) {
            //    var element;
            //    if (this.isInput) {
            //        element = this.element;
            //    } else if (this.component) {
            //        element = this.element.find('input');
            //    }
            //    if (element) {
            //        element.change();
            //    }
            //    this.element.trigger({
            //        type: 'changeDate',
            //        date: this.getDate()
            //    });
            //}
        },

        showMode: function (dir) {
            if (dir) {
                var newViewMode = Math.max(0, Math.min(DPGlobal.modes.length - 1, this.viewMode + dir));
                if (newViewMode >= this.minView && newViewMode <= this.maxView) {
                    this.element.trigger({
                        type: 'changeMode',
                        date: this.viewDate,
                        oldViewMode: this.viewMode,
                        newViewMode: newViewMode
                    });

                    this.viewMode = newViewMode;
                }
            }
            /*
             vitalets: fixing bug of very special conditions:
             jquery 1.7.1 + webkit + show inline datetimepicker in bootstrap popover.
             Method show() does not set display css correctly and datetimepicker is not shown.
             Changed to .css('display', 'block') solve the problem.
             See https://github.com/vitalets/x-editable/issues/37

             In jquery 1.7.2+ everything works fine.
             */
            //this.picker.find('>div').hide().filter('.datetimepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
            this.picker.find('>div').hide().filter('.datetimepicker-' + DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
            this.updateNavArrows();
        },

        reset: function () {
            this._setDate(null, 'date');
        },

        convertViewModeText: function (viewMode) {
            switch (viewMode) {
                case 4:
                    return 'decade';
                case 3:
                    return 'year';
                case 2:
                    return 'month';
                case 1:
                    return 'day';
                case 0:
                    return 'hour';
            }
        }
    };

    var old = $.fn.datetimepicker;
    $.fn.datetimepicker = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;
        this.each(function () {
            var $this = $(this),
                data = $this.data('datetimepicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('datetimepicker', (data = new Datetimepicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))));
            }
            if (typeof option === 'string' && typeof data[option] === 'function') {
                internal_return = data[option].apply(data, args);
                if (internal_return !== undefined) {
                    return false;
                }
            }
        });
        if (internal_return !== undefined)
            return internal_return;
        else
            return this;
    };

    $.fn.datetimepicker.defaults = {
    };
    $.fn.datetimepicker.Constructor = Datetimepicker;
    var dates = $.fn.datetimepicker.dates = {
        en: {
            days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            //daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            daysMin: ['日', '一', '二', '三', '四', '五', '六', '日'],
            //months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            meridiem: ['上午', '下午'],
            suffix: [],
            today: '今天',
            clear: '清空'
        }
    };

    var DPGlobal = {
        modes: [
            {
                clsName: 'minutes',
                navFnc: 'Hours',
                navStep: 1
            },
            {
                clsName: 'hours',
                navFnc: 'Date',
                navStep: 1
            },
            {
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
            }
        ],
        isLeapYear: function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getDaysInMonth: function (year, month) {
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        getDefaultFormat: function (type, field) {
            if (type === 'standard') {
                if (field === 'input')
                    return 'yyyy-mm-dd hh:ii';
                else
                    return 'yyyy-mm-dd hh:ii:ss';
            } else if (type === 'php') {
                //if (field === 'input')
                //    return 'Y-m-d H:i';
                //else
                //    return 'Y-m-d H:i:s';
            } else {
                throw new Error('Invalid format type.');
            }
        },
        validParts: function (type) {
            if (type === 'standard') {
                return /t|hh?|HH?|p|P|z|Z|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            } else if (type === 'php') {
                return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            } else {
                throw new Error('Invalid format type.');
            }
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function (format, type) {
            // IE treats \0 as a string end in inputs (truncating the value),
            // so it's a bad format delimiter, anyway
            var separators = format.replace(this.validParts(type), '\0').split('\0'),
                parts = format.match(this.validParts(type));
            if (!separators || !separators.length || !parts || parts.length === 0) {
                throw new Error('Invalid date format.');
            }
            return { separators: separators, parts: parts };
        },
        parseDate: function (date, format, language, type, timezone) {
            if (date instanceof Date) {
                var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
                dateUTC.setMilliseconds(0);
                return dateUTC;
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
                format = this.parseFormat('yyyy-mm-dd', type);
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
                format = this.parseFormat('yyyy-mm-dd hh:ii', type);
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
                format = this.parseFormat('yyyy-mm-dd hh:ii:ss', type);
            }
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
                var part_re = /([-+]\d+)([dmwy])/,
                    parts = date.match(/([-+]\d+)([dmwy])/g),
                    part, dir;
                date = new Date();
                for (var i = 0; i < parts.length; i++) {
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    switch (part[2]) {
                        case 'd':
                            date.setUTCDate(date.getUTCDate() + dir);
                            break;
                        case 'm':
                            date = Datetimepicker.prototype.moveMonth.call(Datetimepicker.prototype, date, dir);
                            break;
                        case 'w':
                            date.setUTCDate(date.getUTCDate() + dir * 7);
                            break;
                        case 'y':
                            date = Datetimepicker.prototype.moveYear.call(Datetimepicker.prototype, date, dir);
                            break;
                    }
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0);
            }
            var parts = date && date.toString().match(this.nonpunctuation) || [],
                date = new Date(0, 0, 0, 0, 0, 0, 0),
                parsed = {},
                setters_order = ['hh', 'h', 'ii', 'i', 'ss', 's', 'yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'D', 'DD', 'd', 'dd', 'H', 'HH', 'p', 'P', 'z', 'Z'],
                setters_map = {
                    hh: function (d, v) {
                        return d.setUTCHours(v);
                    },
                    h: function (d, v) {
                        return d.setUTCHours(v);
                    },
                    HH: function (d, v) {
                        return d.setUTCHours(v === 12 ? 0 : v);
                    },
                    H: function (d, v) {
                        return d.setUTCHours(v === 12 ? 0 : v);
                    },
                    ii: function (d, v) {
                        return d.setUTCMinutes(v);
                    },
                    i: function (d, v) {
                        return d.setUTCMinutes(v);
                    },
                    ss: function (d, v) {
                        return d.setUTCSeconds(v);
                    },
                    s: function (d, v) {
                        return d.setUTCSeconds(v);
                    },
                    yyyy: function (d, v) {
                        return d.setUTCFullYear(v);
                    },
                    yy: function (d, v) {
                        return d.setUTCFullYear(2000 + v);
                    },
                    m: function (d, v) {
                        v -= 1;
                        while (v < 0) v += 12;
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() !== v)
                            if (isNaN(d.getUTCMonth()))
                                return d;
                            else
                                d.setUTCDate(d.getUTCDate() - 1);
                        return d;
                    },
                    d: function (d, v) {
                        return d.setUTCDate(v);
                    },
                    p: function (d, v) {
                        return d.setUTCHours(v === 1 ? d.getUTCHours() + 12 : d.getUTCHours());
                    },
                    z: function () {
                        return timezone
                    }
                },
                val, filtered, part;
            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
            setters_map['dd'] = setters_map['d'];
            setters_map['P'] = setters_map['p'];
            setters_map['Z'] = setters_map['z'];
            date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            if (parts.length === format.parts.length) {
                for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = format.parts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case 'MM':
                                filtered = $(dates[language].months).filter(function () {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m === p;
                                });
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(function () {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m.toLowerCase() === p.toLowerCase();
                                });
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                            case 'p':
                            case 'P':
                                val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
                                break;
                            case 'z':
                            case 'Z':
                                timezone;
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                for (var i = 0, s; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s]))
                        setters_map[s](date, parsed[s])
                }
            }
            return date;
        },
        formatDate: function (date, format, language, type, timezone) {
            if (date === null) {
                return '';
            }
            var val;
            if (type === 'standard') {
                val = {
                    t: date.getTime(),
                    // year
                    yy: date.getUTCFullYear().toString().substring(2),
                    yyyy: date.getUTCFullYear(),
                    // month
                    m: date.getUTCMonth() + 1,
                    M: dates[language].monthsShort[date.getUTCMonth()],
                    MM: dates[language].months[date.getUTCMonth()],
                    // day
                    d: date.getUTCDate(),
                    D: dates[language].daysShort[date.getUTCDay()],
                    DD: dates[language].days[date.getUTCDay()],
                    p: (dates[language].meridiem.length === 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
                    // hour
                    h: date.getUTCHours(),
                    // minute
                    i: date.getUTCMinutes(),
                    // second
                    s: date.getUTCSeconds(),
                    // timezone
                    z: timezone
                };

                if (dates[language].meridiem.length === 2) {
                    val.H = (val.h % 12 === 0 ? 12 : val.h % 12);
                }
                else {
                    val.H = val.h;
                }
                val.HH = (val.H < 10 ? '0' : '') + val.H;
                val.P = val.p.toUpperCase();
                val.Z = val.z;
                val.hh = (val.h < 10 ? '0' : '') + val.h;
                val.ii = (val.i < 10 ? '0' : '') + val.i;
                val.ss = (val.s < 10 ? '0' : '') + val.s;
                val.dd = (val.d < 10 ? '0' : '') + val.d;
                val.mm = (val.m < 10 ? '0' : '') + val.m;
            } else if (type === 'php') {
                // php format
                //val = {
                //    // year
                //    y: date.getUTCFullYear().toString().substring(2),
                //    Y: date.getUTCFullYear(),
                //    // month
                //    F: dates[language].months[date.getUTCMonth()],
                //    M: dates[language].monthsShort[date.getUTCMonth()],
                //    n: date.getUTCMonth() + 1,
                //    t: DPGlobal.getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth()),
                //    // day
                //    j: date.getUTCDate(),
                //    l: dates[language].days[date.getUTCDay()],
                //    D: dates[language].daysShort[date.getUTCDay()],
                //    w: date.getUTCDay(), // 0 -> 6
                //    N: (date.getUTCDay() === 0 ? 7 : date.getUTCDay()),       // 1 -> 7
                //    S: (date.getUTCDate() % 10 <= dates[language].suffix.length ? dates[language].suffix[date.getUTCDate() % 10 - 1] : ''),
                //    // hour
                //    a: (dates[language].meridiem.length === 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : ''),
                //    g: (date.getUTCHours() % 12 === 0 ? 12 : date.getUTCHours() % 12),
                //    G: date.getUTCHours(),
                //    // minute
                //    i: date.getUTCMinutes(),
                //    // second
                //    s: date.getUTCSeconds()
                //};
                //val.m = (val.n < 10 ? '0' : '') + val.n;
                //val.d = (val.j < 10 ? '0' : '') + val.j;
                //val.A = val.a.toString().toUpperCase();
                //val.h = (val.g < 10 ? '0' : '') + val.g;
                //val.H = (val.G < 10 ? '0' : '') + val.G;
                //val.i = (val.i < 10 ? '0' : '') + val.i;
                //val.s = (val.s < 10 ? '0' : '') + val.s;
            } else {
                throw new Error('Invalid format type.');
            }
            var date = [],
                seps = $.extend([], format.separators);
            for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                if (seps.length) {
                    date.push(seps.shift());
                }
                date.push(val[format.parts[i]]);
            }
            if (seps.length) {
                date.push(seps.shift());
            }
            return date.join('');
        },
        convertViewMode: function (viewMode) {
            switch (viewMode) {
                case 4:
                case 'decade':
                    viewMode = 4;
                    break;
                case 3:
                case 'year':
                    viewMode = 3;
                    break;
                case 2:
                case 'month':
                    viewMode = 2;
                    break;
                case 1:
                case 'day':
                    viewMode = 1;
                    break;
                case 0:
                case 'hour':
                    viewMode = 0;
                    break;
            }

            return viewMode;
        },
        headTemplateV3: '<thead>' +
        '<tr>' +
        '<th class="prevYear"><span class="icon-date_left_1"></span> </th>' +
        '<th class="prev"><span class="icon-date_left_2"></span> </th>' +
        '<th colspan="3" class="switch"></th>' +
        '<th class="next"><span class="icon-date_right_2"></span> </th>' +
        '<th class="nextYear"><span class="icon-date_right_1"></span> </th>' +
        '</tr>' +
        '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: function (viewMode) {
            var template = '';
            switch (viewMode) {
                case 4:
                case 'decade':
                    viewMode = 4;
                    break;
                case 3:
                case 'year':
                    viewMode = 3;
                    break;
                case 2:
                case 'month':
                    viewMode = 2;
                    break;
                case 1:
                case 'day':
                    template = '<tfoot>' +
                        '<tr><th colspan="3" class="today"></th><th></th><th colspan="3" class="clear"></th></tr>' +
                        '</tfoot>';
                    break;
                case 0:
                case 'hour':
                    template = '<tfoot>' +
                        '<tr>' +
                        '<th colspan="7">' +
                        '<span class="back">返回</span>' +
                        '<span class="now">当前时刻</span>' +
                        '<span class="clear">清空</span>' +
                        '</th>' +
                        '</tr>' +
                        '</tfoot>'
                    break;
                //case -1:
                //case 'minute':
                //    template = '<tfoot>' +
                //                 '<tr>' +
                //                     '<th colspan="7">' +
                //                         '<span class="back">返回</span>' +
                //                         '<span class="now">当前时刻</span>' +
                //                         '<span class="clear">清空</span>' +
                //                     '</th>' +
                //                 '</tr>' +
                //             '</tfoot>'
                //    break;
            }
            return template;
        }
    };
    //DPGlobal.template = '<div class="datetimepicker">' +
    //  '<div class="datetimepicker-minutes">' +
    //  '<table class=" table-condensed">' +
    //  DPGlobal.headTemplate +
    //  DPGlobal.contTemplate +
    //  DPGlobal.footTemplate(-1) +
    //  '</table>' +
    //  '</div>' +
    //  '<div class="datetimepicker-hours">' +
    //  '<table class=" table-condensed">' +
    //  DPGlobal.headTemplate +
    //  DPGlobal.contTemplate +
    //  DPGlobal.footTemplate(0) +
    //  '</table>' +
    //  '</div>' +
    //  '<div class="datetimepicker-days">' +
    //  '<table class=" table-condensed">' +
    //  DPGlobal.headTemplate +
    //  '<tbody></tbody>' +
    //  DPGlobal.footTemplate(1) +
    //  '</table>' +
    //  '</div>' +
    //  '<div class="datetimepicker-months">' +
    //  '<table class="table-condensed">' +
    //  DPGlobal.headTemplate +
    //  DPGlobal.contTemplate +
    //  DPGlobal.footTemplate(2) +
    //  '</table>' +
    //  '</div>' +
    //  '<div class="datetimepicker-years">' +
    //  '<table class="table-condensed">' +
    //  DPGlobal.headTemplate +
    //  DPGlobal.contTemplate +
    //  DPGlobal.footTemplate(3) +
    //  '</table>' +
    //  '</div>' +
    //  '</div>';
    DPGlobal.templateV3 = '<div class="datetimepicker">' +
        '<div class="datetimepicker-minutes">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplateV3 +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate(0) +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-hours">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplateV3 +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate(0) +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-days">' +
        '<table class=" table-condensed">' +
        DPGlobal.headTemplateV3 +
        '<tbody></tbody>' +
        DPGlobal.footTemplate(1) +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-months">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplateV3 +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate(2) +
        '</table>' +
        '</div>' +
        '<div class="datetimepicker-years">' +
        '<table class="table-condensed">' +
        DPGlobal.headTemplateV3 +
        DPGlobal.contTemplate +
        DPGlobal.footTemplate(3) +
        '</table>' +
        '</div>' +
        '</div>';
    $.fn.datetimepicker.DPGlobal = DPGlobal;

    /* DATETIMEPICKER NO CONFLICT
     * =================== */

    $.fn.datetimepicker.noConflict = function () {
        $.fn.datetimepicker = old;
        return this;
    };

    /* DATETIMEPICKER DATA-API
     * ================== */

    $(document).on('focus.datetimepicker.data-api click.datetimepicker.data-api', '[data-provide="datetimepicker"]', function (e) {
        var $this = $(this);
        if ($this.data('datetimepicker')) return;
        e.preventDefault();
        // component click requires us to explicitly show it
        $this.datetimepicker('show');
    });
    $(function () {
        $('[data-provide="datetimepicker-inline"]').datetimepicker();
    });
}));;
/**
 * Bootstrap Multiselect (https://github.com/davidstutz/bootstrap-multiselect)
 * 
 * Apache License, Version 2.0:
 * Copyright (c) 2012 - 2015 David Stutz
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a
 * copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 * 
 * BSD 3-Clause License:
 * Copyright (c) 2012 - 2015 David Stutz
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    - Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *    - Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 *    - Neither the name of David Stutz nor the names of its contributors may be
 *      used to endorse or promote products derived from this software without
 *      specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
//#endregion






