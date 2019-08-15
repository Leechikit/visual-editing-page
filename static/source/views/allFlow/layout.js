// ​var SolutionState, MessageTemplate, lefttreeclick, $TextLabel
var SolutionState ,MessageTemplate,lefttreeclick,$TextLabel
if (function(n, t) {
	function gt(n) {
		var t = n.length,
			r = i.type(n);
		return i.isWindow(n) ? !1 : 1 === n.nodeType && t ? !0 : "array" === r || "function" !== r && (0 === t || "number" == typeof t && t > 0 && t - 1 in n)
	}
	function te(n) {
		var t = ni[n] = {};
		return i.each(n.match(s) || [], function(n, i) {
			t[i] = !0
		}), t
	}
	function ur(n, r, u, f) {
		if (i.acceptData(n)) {
			var h, o, c = i.expando,
				l = n.nodeType,
				s = l ? i.cache : n,
				e = l ? n[c] : n[c] && c;
			if (e && s[e] && (f || s[e].data) || u !== t || "string" != typeof r) return e || (e = l ? n[c] = b.pop() || i.guid++ : c), s[e] || (s[e] = l ? {} : {
				toJSON: i.noop
			}), ("object" == typeof r || "function" == typeof r) && (f ? s[e] = i.extend(s[e], r) : s[e].data = i.extend(s[e].data, r)), o = s[e], f || (o.data || (o.data = {}), o = o.data), u !== t && (o[i.camelCase(r)] = u), "string" == typeof r ? (h = o[r], null == h && (h = o[i.camelCase(r)])) : h = o, h
		}
	}
	function fr(n, t, r) {
		if (i.acceptData(n)) {
			var e, o, s = n.nodeType,
				u = s ? i.cache : n,
				f = s ? n[i.expando] : i.expando;
			if (u[f]) {
				if (t && (e = r ? u[f] : u[f].data)) {
					for (i.isArray(t) ? t = t.concat(i.map(t, i.camelCase)) : (t in e) ? t = [t] : (t = i.camelCase(t), t = (t in e) ? [t] : t.split(" ")), o = t.length; o--;) delete e[t[o]];
					if (r ? !ti(e) : !i.isEmptyObject(e)) return
				}(r || (delete u[f].data, ti(u[f]))) && (s ? i.cleanData([n], !0) : i.support.deleteExpando || u != u.window ? delete u[f] : u[f] = null)
			}
		}
	}
	function er(n, r, u) {
		if (u === t && 1 === n.nodeType) {
			var f = "data-" + r.replace(rr, "-$1").toLowerCase();
			if (u = n.getAttribute(f), "string" == typeof u) {
				try {
					u = "true" === u ? !0 : "false" === u ? !1 : "null" === u ? null : +u + "" === u ? +u : ir.test(u) ? i.parseJSON(u) : u
				} catch (e) {}
				i.data(n, r, u)
			} else u = t
		}
		return u
	}
	function ti(n) {
		var t;
		for (t in n) if (("data" !== t || !i.isEmptyObject(n[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function ct() {
		return !0
	}
	function g() {
		return !1
	}
	function cr() {
		try {
			return r.activeElement
		} catch (n) {}
	}
	function ar(n, t) {
		do n = n[t];
		while (n && 1 !== n.nodeType);
		return n
	}
	function fi(n, t, r) {
		if (i.isFunction(t)) return i.grep(n, function(n, i) {
			return !!t.call(n, i, n) !== r
		});
		if (t.nodeType) return i.grep(n, function(n) {
			return n === t !== r
		});
		if ("string" == typeof t) {
			if (oe.test(t)) return i.filter(t, n, r);
			t = i.filter(t, n)
		}
		return i.grep(n, function(n) {
			return i.inArray(n, t) >= 0 !== r
		})
	}
	function vr(n) {
		var i = yr.split("|"),
			t = n.createDocumentFragment();
		if (t.createElement) while (i.length) t.createElement(i.pop());
		return t
	}
	function gr(n, t) {
		return i.nodeName(n, "table") && i.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
	}
	function nu(n) {
		return n.type = (null !== i.find.attr(n, "type")) + "/" + n.type, n
	}
	function tu(n) {
		var t = ye.exec(n.type);
		return t ? n.type = t[1] : n.removeAttribute("type"), n
	}
	function hi(n, t) {
		for (var u, r = 0; null != (u = n[r]); r++) i._data(u, "globalEval", !t || i._data(t[r], "globalEval"))
	}
	function iu(n, t) {
		if (1 === t.nodeType && i.hasData(n)) {
			var u, f, o, s = i._data(n),
				r = i._data(t, s),
				e = s.events;
			if (e) {
				delete r.handle;
				r.events = {};
				for (u in e) for (f = 0, o = e[u].length; o > f; f++) i.event.add(t, u, e[u][f])
			}
			r.data && (r.data = i.extend({}, r.data))
		}
	}
	function be(n, t) {
		var r, f, u;
		if (1 === t.nodeType) {
			if (r = t.nodeName.toLowerCase(), !i.support.noCloneEvent && t[i.expando]) {
				u = i._data(t);
				for (f in u.events) i.removeEvent(t, f, u.handle);
				t.removeAttribute(i.expando)
			}
			"script" === r && t.text !== n.text ? (nu(t).text = n.text, tu(t)) : "object" === r ? (t.parentNode && (t.outerHTML = n.outerHTML), i.support.html5Clone && n.innerHTML && !i.trim(t.innerHTML) && (t.innerHTML = n.innerHTML)) : "input" === r && oi.test(n.type) ? (t.defaultChecked = t.checked = n.checked, t.value !== n.value && (t.value = n.value)) : "option" === r ? t.defaultSelected = t.selected = n.defaultSelected : ("input" === r || "textarea" === r) && (t.defaultValue = n.defaultValue)
		}
	}
	function u(n, r) {
		var s, e, h = 0,
			f = typeof n.getElementsByTagName !== o ? n.getElementsByTagName(r || "*") : typeof n.querySelectorAll !== o ? n.querySelectorAll(r || "*") : t;
		if (!f) for (f = [], s = n.childNodes || n; null != (e = s[h]); h++)!r || i.nodeName(e, r) ? f.push(e) : i.merge(f, u(e, r));
		return r === t || r && i.nodeName(n, r) ? i.merge([n], f) : f
	}
	function ke(n) {
		oi.test(n.type) && (n.defaultChecked = n.checked)
	}
	function ou(n, t) {
		if (t in n) return t;
		for (var r = t.charAt(0).toUpperCase() + t.slice(1), u = t, i = eu.length; i--;) if (t = eu[i] + r, t in n) return t;
		return u
	}
	function ut(n, t) {
		return n = t || n, "none" === i.css(n, "display") || !i.contains(n.ownerDocument, n)
	}
	function su(n, t) {
		for (var f, r, o, e = [], u = 0, s = n.length; s > u; u++) r = n[u], r.style && (e[u] = i._data(r, "olddisplay"), f = r.style.display, t ? (e[u] || "none" !== f || (r.style.display = ""), "" === r.style.display && ut(r) && (e[u] = i._data(r, "olddisplay", au(r.nodeName)))) : e[u] || (o = ut(r), (f && "none" !== f || !o) && i._data(r, "olddisplay", o ? f : i.css(r, "display"))));
		for (u = 0; s > u; u++) r = n[u], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? e[u] || "" : "none"));
		return n
	}
	function hu(n, t, i) {
		var r = to.exec(t);
		return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
	}
	function cu(n, t, r, u, f) {
		for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > e; e += 2)"margin" === r && (o += i.css(n, r + p[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + p[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + p[e] + "Width", !0, f))) : (o += i.css(n, "padding" + p[e], !0, f), "padding" !== r && (o += i.css(n, "border" + p[e] + "Width", !0, f)));
		return o
	}
	function lu(n, t, r) {
		var e = !0,
			u = "width" === t ? n.offsetWidth : n.offsetHeight,
			f = v(n),
			o = i.support.boxSizing && "border-box" === i.css(n, "boxSizing", !1, f);
		if (0 >= u || null == u) {
			if (u = y(n, t, f), (0 > u || null == u) && (u = n.style[t]), lt.test(u)) return u;
			e = o && (i.support.boxSizingReliable || u === n.style[t]);
			u = parseFloat(u) || 0
		}
		return u + cu(n, t, r || (o ? "border" : "content"), e, f) + "px"
	}
	function au(n) {
		var u = r,
			t = uu[n];
		return t || (t = vu(n, u), "none" !== t && t || (rt = (rt || i("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(u.documentElement), u = (rt[0].contentWindow || rt[0].contentDocument).document, u.write("<!doctype html><html><body>"), u.close(), t = vu(n, u), rt.detach()), uu[n] = t), t
	}
	function vu(n, t) {
		var r = i(t.createElement(n)).appendTo(t.body),
			u = i.css(r[0], "display");
		return r.remove(), u
	}
	function li(n, t, r, u) {
		var f;
		if (i.isArray(t)) i.each(t, function(t, i) {
			r || fo.test(n) ? u(n, i) : li(n + "[" + ("object" == typeof i ? t : "") + "]", i, r, u)
		});
		else if (r || "object" !== i.type(t)) u(n, t);
		else for (f in t) li(n + "[" + f + "]", t[f], r, u)
	}
	function gu(n) {
		return function(t, r) {
			"string" != typeof t && (r = t, t = "*");
			var u, f = 0,
				e = t.toLowerCase().match(s) || [];
			if (i.isFunction(r)) while (u = e[f++])"+" === u[0] ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
		}
	}
	function nf(n, r, u, f) {
		function o(h) {
			var c;
			return e[h] = !0, i.each(n[h] || [], function(n, i) {
				var h = i(r, u, f);
				return "string" != typeof h || s || e[h] ? s ? !(c = h) : t : (r.dataTypes.unshift(h), o(h), !1)
			}), c
		}
		var e = {},
			s = n === yi;
		return o(r.dataTypes[0]) || !e["*"] && o("*")
	}
	function pi(n, r) {
		var f, u, e = i.ajaxSettings.flatOptions || {};
		for (u in r) r[u] !== t && ((e[u] ? n : f || (f = {}))[u] = r[u]);
		return f && i.extend(!0, n, f), n
	}
	function ao(n, i, r) {
		for (var s, o, f, e, h = n.contents, u = n.dataTypes;
		"*" === u[0];) u.shift(), o === t && (o = n.mimeType || i.getResponseHeader("Content-Type"));
		if (o) for (e in h) if (h[e] && h[e].test(o)) {
			u.unshift(e);
			break
		}
		if (u[0] in r) f = u[0];
		else {
			for (e in r) {
				if (!u[0] || n.converters[e + " " + u[0]]) {
					f = e;
					break
				}
				s || (s = e)
			}
			f = f || s
		}
		return f ? (f !== u[0] && u.unshift(f), r[f]) : t
	}
	function vo(n, t, i, r) {
		var h, u, f, s, e, o = {},
			c = n.dataTypes.slice();
		if (c[1]) for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
		for (u = c.shift(); u;) if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift()) if ("*" === u) u = e;
		else if ("*" !== e && e !== u) {
			if (f = o[e + " " + u] || o["* " + u], !f) for (h in o) if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
				f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
				break
			}
			if (f !== !0) if (f && n.throws) t = f(t);
			else try {
				t = f(t)
			} catch (l) {
				return {
					state: "parsererror",
					error: f ? l : "No conversion from " + e + " to " + u
				}
			}
		}
		return {
			state: "success",
			data: t
		}
	}
	function rf() {
		try {
			return new n.XMLHttpRequest
		} catch (t) {}
	}
	function yo() {
		try {
			return new n.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function ff() {
		return setTimeout(function() {
			it = t
		}), it = i.now()
	}
	function ef(n, t, i) {
		for (var u, f = (ft[t] || []).concat(ft["*"]), r = 0, e = f.length; e > r; r++) if (u = f[r].call(i, t, n)) return u
	}
	function of(n, t, r) {
		var h, e, o = 0,
			l = pt.length,
			f = i.Deferred().always(function() {
				delete c.elem
			}),
			c = function() {
				if (e) return !1;
				for (var s = it || ff(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, o = u.tweens.length; o > r; r++) u.tweens[r].run(i);
				return f.notifyWith(n, [u, i, t]), 1 > i && o ? t : (f.resolveWith(n, [u]), !1)
			},
			u = f.promise({
				elem: n,
				props: i.extend({}, t),
				opts: i.extend(!0, {
					specialEasing: {}
				}, r),
				originalProperties: t,
				originalOptions: r,
				startTime: it || ff(),
				duration: r.duration,
				tweens: [],
				createTween: function(t, r) {
					var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
					return u.tweens.push(f), f
				},
				stop: function(t) {
					var i = 0,
						r = t ? u.tweens.length : 0;
					if (e) return this;
					for (e = !0; r > i; i++) u.tweens[i].run(1);
					return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this
				}
			}),
			s = u.props;
		for (bo(s, u.opts.specialEasing); l > o; o++) if (h = pt[o].call(u, n, s, u.opts)) return h;
		return i.map(s, ef, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
			elem: n,
			anim: u,
			queue: u.opts.queue
		})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
	}
	function bo(n, t) {
		var r, f, e, u, o;
		for (r in n) if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
			u = o.expand(u);
			delete n[f];
			for (r in u) r in n || (n[r] = u[r], t[r] = e)
		} else t[f] = e
	}
	function ko(n, t, r) {
		var u, a, v, c, e, y, s = this,
			l = {},
			o = n.style,
			h = n.nodeType && ut(n),
			f = i._data(n, "fxshow");
		r.queue || (e = i._queueHooks(n, "fx"), null == e.unqueued && (e.unqueued = 0, y = e.empty.fire, e.empty.fire = function() {
			e.unqueued || y()
		}), e.unqueued++, s.always(function() {
			s.always(function() {
				e.unqueued--;
				i.queue(n, "fx").length || e.empty.fire()
			})
		}));
		1 === n.nodeType && ("height" in t || "width" in t) && (r.overflow = [o.overflow, o.overflowX, o.overflowY], "inline" === i.css(n, "display") && "none" === i.css(n, "float") && (i.support.inlineBlockNeedsLayout && "inline" !== au(n.nodeName) ? o.zoom = 1 : o.display = "inline-block"));
		r.overflow && (o.overflow = "hidden", i.support.shrinkWrapBlocks || s.always(function() {
			o.overflow = r.overflow[0];
			o.overflowX = r.overflow[1];
			o.overflowY = r.overflow[2]
		}));
		for (u in t) if (a = t[u], po.exec(a)) {
			if (delete t[u], v = v || "toggle" === a, a === (h ? "hide" : "show")) continue;
			l[u] = f && f[u] || i.style(n, u)
		}
		if (!i.isEmptyObject(l)) {
			f ? "hidden" in f && (h = f.hidden) : f = i._data(n, "fxshow", {});
			v && (f.hidden = !h);
			h ? i(n).show() : s.done(function() {
				i(n).hide()
			});
			s.done(function() {
				var t;
				i._removeData(n, "fxshow");
				for (t in l) i.style(n, t, l[t])
			});
			for (u in l) c = ef(h ? f[u] : 0, u, s), u in f || (f[u] = c.start, h && (c.end = c.start, c.start = "width" === u || "height" === u ? 1 : 0))
		}
	}
	function f(n, t, i, r, u) {
		return new f.prototype.init(n, t, i, r, u)
	}
	function wt(n, t) {
		var r, i = {
			height: n
		},
			u = 0;
		for (t = t ? 1 : 0; 4 > u; u += 2 - t) r = p[u], i["margin" + r] = i["padding" + r] = n;
		return t && (i.opacity = i.width = n), i
	}
	function sf(n) {
		return i.isWindow(n) ? n : 9 === n.nodeType ? n.defaultView || n.parentWindow : !1
	}
	var et, bi, o = typeof t,
		hf = n.location,
		r = n.document,
		ki = r.documentElement,
		cf = n.jQuery,
		lf = n.$,
		ot = {},
		b = [],
		bt = "1.10.2",
		di = b.concat,
		kt = b.push,
		l = b.slice,
		gi = b.indexOf,
		af = ot.toString,
		k = ot.hasOwnProperty,
		dt = bt.trim,
		i = function(n, t) {
			return new i.fn.init(n, t, bi)
		},
		st = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		s = /\S+/g,
		vf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		yf = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		nr = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		pf = /^[\],:{}\s]*$/,
		wf = /(?:^|:|,)(?:\s*\[)+/g,
		bf = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		kf = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		df = /^-ms-/,
		gf = /-([\da-z])/gi,
		ne = function(n, t) {
			return t.toUpperCase()
		},
		h = function(n) {
			(r.addEventListener || "load" === n.type || "complete" === r.readyState) && (tr(), i.ready())
		},
		tr = function() {
			r.addEventListener ? (r.removeEventListener("DOMContentLoaded", h, !1), n.removeEventListener("load", h, !1)) : (r.detachEvent("onreadystatechange", h), n.detachEvent("onload", h))
		},
		ni, ir, rr, wi, at, nt, tt, tf, vt;
	i.fn = i.prototype = {
		jquery: bt,
		constructor: i,
		init: function(n, u, f) {
			var e, o;
			if (!n) return this;
			if ("string" == typeof n) {
				if (e = "<" === n.charAt(0) && ">" === n.charAt(n.length - 1) && n.length >= 3 ? [null, n, null] : yf.exec(n), !e || !e[1] && u) return !u || u.jquery ? (u || f).find(n) : this.constructor(u).find(n);
				if (e[1]) {
					if (u = u instanceof i ? u[0] : u, i.merge(this, i.parseHTML(e[1], u && u.nodeType ? u.ownerDocument || u : r, !0)), nr.test(e[1]) && i.isPlainObject(u)) for (e in u) i.isFunction(this[e]) ? this[e](u[e]) : this.attr(e, u[e]);
					return this
				}
				if (o = r.getElementById(e[2]), o && o.parentNode) {
					if (o.id !== e[2]) return f.find(n);
					this.length = 1;
					this[0] = o
				}
				return this.context = r, this.selector = n, this
			}
			return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? f.ready(n) : (n.selector !== t && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
		},
		selector: "",
		length: 0,
		toArray: function() {
			return l.call(this)
		},
		get: function(n) {
			return null == n ? this.toArray() : 0 > n ? this[this.length + n] : this[n]
		},
		pushStack: function(n) {
			var t = i.merge(this.constructor(), n);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(n, t) {
			return i.each(this, n, t)
		},
		ready: function(n) {
			return i.ready.promise().done(n), this
		},
		slice: function() {
			return this.pushStack(l.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(n) {
			var i = this.length,
				t = +n + (0 > n ? i : 0);
			return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
		},
		map: function(n) {
			return this.pushStack(i.map(this, function(t, i) {
				return n.call(t, i, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: kt,
		sort: [].sort,
		splice: [].splice
	};
	i.fn.init.prototype = i.fn;
	i.extend = i.fn.extend = function() {
		var u, o, r, e, s, h, n = arguments[0] || {},
			f = 1,
			l = arguments.length,
			c = !1;
		for ("boolean" == typeof n && (c = n, n = arguments[1] || {}, f = 2), "object" == typeof n || i.isFunction(n) || (n = {}), l === f && (n = this, --f); l > f; f++) if (null != (s = arguments[f])) for (e in s) u = n[e], r = s[e], n !== r && (c && r && (i.isPlainObject(r) || (o = i.isArray(r))) ? (o ? (o = !1, h = u && i.isArray(u) ? u : []) : h = u && i.isPlainObject(u) ? u : {}, n[e] = i.extend(c, h, r)) : r !== t && (n[e] = r));
		return n
	};
	i.extend({
		expando: "jQuery" + (bt + Math.random()).replace(/\D/g, ""),
		noConflict: function(t) {
			return n.$ === i && (n.$ = lf), t && n.jQuery === i && (n.jQuery = cf), i
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(n) {
			n ? i.readyWait++ : i.ready(!0)
		},
		ready: function(n) {
			if (n === !0 ? !--i.readyWait : !i.isReady) {
				if (!r.body) return setTimeout(i.ready);
				i.isReady = !0;
				n !== !0 && --i.readyWait > 0 || (et.resolveWith(r, [i]), i.fn.trigger && i(r).trigger("ready").off("ready"))
			}
		},
		isFunction: function(n) {
			return "function" === i.type(n)
		},
		isArray: Array.isArray ||
		function(n) {
			return "array" === i.type(n)
		},
		isWindow: function(n) {
			return null != n && n == n.window
		},
		isNumeric: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n)
		},
		type: function(n) {
			return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? ot[af.call(n)] || "object" : typeof n
		},
		isPlainObject: function(n) {
			var r;
			if (!n || "object" !== i.type(n) || n.nodeType || i.isWindow(n)) return !1;
			try {
				if (n.constructor && !k.call(n, "constructor") && !k.call(n.constructor.prototype, "isPrototypeOf")) return !1
			} catch (u) {
				return !1
			}
			if (i.support.ownLast) for (r in n) return k.call(n, r);
			for (r in n);
			return r === t || k.call(n, r)
		},
		isEmptyObject: function(n) {
			var t;
			for (t in n) return !1;
			return !0
		},
		error: function(n) {
			throw Error(n);
		},
		parseHTML: function(n, t, u) {
			if (!n || "string" != typeof n) return null;
			"boolean" == typeof t && (u = t, t = !1);
			t = t || r;
			var f = nr.exec(n),
				e = !u && [];
			return f ? [t.createElement(f[1])] : (f = i.buildFragment([n], t, e), e && i(e).remove(), i.merge([], f.childNodes))
		},
		parseJSON: function(r) {
			return n.JSON && n.JSON.parse ? n.JSON.parse(r) : null === r ? r : "string" == typeof r && (r = i.trim(r), r && pf.test(r.replace(bf, "@").replace(kf, "]").replace(wf, ""))) ? Function("return " + r)() : (i.error("Invalid JSON: " + r), t)
		},
		parseXML: function(r) {
			var u, f;
			if (!r || "string" != typeof r) return null;
			try {
				n.DOMParser ? (f = new DOMParser, u = f.parseFromString(r, "text/xml")) : (u = new ActiveXObject("Microsoft.XMLDOM"), u.async = "false", u.loadXML(r))
			} catch (e) {
				u = t
			}
			return u && u.documentElement && !u.getElementsByTagName("parsererror").length || i.error("Invalid XML: " + r), u
		},
		noop: function() {},
		globalEval: function(t) {
			t && i.trim(t) && (n.execScript ||
			function(t) {
				n.eval.call(n, t)
			})(t)
		},
		camelCase: function(n) {
			return n.replace(df, "ms-").replace(gf, ne)
		},
		nodeName: function(n, t) {
			return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(n, t, i) {
			var u, r = 0,
				f = n.length,
				e = gt(n);
			if (i) {
				if (e) {
					for (; f > r; r++) if (u = t.apply(n[r], i), u === !1) break
				} else for (r in n) if (u = t.apply(n[r], i), u === !1) break
			} else if (e) {
				for (; f > r; r++) if (u = t.call(n[r], r, n[r]), u === !1) break
			} else for (r in n) if (u = t.call(n[r], r, n[r]), u === !1) break;
			return n
		},
		trim: dt && !dt.call("﻿ ") ?
		function(n) {
			return null == n ? "" : dt.call(n)
		} : function(n) {
			return null == n ? "" : (n + "").replace(vf, "")
		},
		makeArray: function(n, t) {
			var r = t || [];
			return null != n && (gt(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : kt.call(r, n)), r
		},
		inArray: function(n, t, i) {
			var r;
			if (t) {
				if (gi) return gi.call(t, n, i);
				for (r = t.length, i = i ? 0 > i ? Math.max(0, r + i) : i : 0; r > i; i++) if (i in t && t[i] === n) return i
			}
			return -1
		},
		merge: function(n, i) {
			var f = i.length,
				u = n.length,
				r = 0;
			if ("number" == typeof f) for (; f > r; r++) n[u++] = i[r];
			else while (i[r] !== t) n[u++] = i[r++];
			return n.length = u, n
		},
		grep: function(n, t, i) {
			var u, f = [],
				r = 0,
				e = n.length;
			for (i = !! i; e > r; r++) u = !! t(n[r], r), i !== u && f.push(n[r]);
			return f
		},
		map: function(n, t, i) {
			var u, r = 0,
				e = n.length,
				o = gt(n),
				f = [];
			if (o) for (; e > r; r++) u = t(n[r], r, i), null != u && (f[f.length] = u);
			else for (r in n) u = t(n[r], r, i), null != u && (f[f.length] = u);
			return di.apply([], f)
		},
		guid: 1,
		proxy: function(n, r) {
			var f, u, e;
			return "string" == typeof r && (e = n[r], r = n, n = e), i.isFunction(n) ? (f = l.call(arguments, 2), u = function() {
				return n.apply(r || this, f.concat(l.call(arguments)))
			}, u.guid = n.guid = n.guid || i.guid++, u) : t
		},
		access: function(n, r, u, f, e, o, s) {
			var h = 0,
				l = n.length,
				c = null == u;
			if ("object" === i.type(u)) {
				e = !0;
				for (h in u) i.access(n, r, h, u[h], !0, o, s)
			} else if (f !== t && (e = !0, i.isFunction(f) || (s = !0), c && (s ? (r.call(n, f), r = null) : (c = r, r = function(n, t, r) {
				return c.call(i(n), r)
			})), r)) for (; l > h; h++) r(n[h], u, s ? f : f.call(n[h], h, r(n[h], u)));
			return e ? n : c ? r.call(n) : l ? r(n[0], u) : o
		},
		now: function() {
			return (new Date).getTime()
		},
		swap: function(n, t, i, r) {
			var f, u, e = {};
			for (u in t) e[u] = n.style[u], n.style[u] = t[u];
			f = i.apply(n, r || []);
			for (u in t) n.style[u] = e[u];
			return f
		}
	});
	i.ready.promise = function(t) {
		if (!et) if (et = i.Deferred(), "complete" === r.readyState) setTimeout(i.ready);
		else if (r.addEventListener) r.addEventListener("DOMContentLoaded", h, !1), n.addEventListener("load", h, !1);
		else {
			r.attachEvent("onreadystatechange", h);
			n.attachEvent("onload", h);
			var u = !1;
			try {
				u = null == n.frameElement && r.documentElement
			} catch (e) {}
			u && u.doScroll &&
			function f() {
				if (!i.isReady) {
					try {
						u.doScroll("left")
					} catch (n) {
						return setTimeout(f, 50)
					}
					tr();
					i.ready()
				}
			}()
		}
		return et.promise(t)
	};
	i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(n, t) {
		ot["[object " + t + "]"] = t.toLowerCase()
	});
	bi = i(r), function(n, t) {
		function u(n, t, i, r) {
			var p, u, f, l, w, a, k, c, g, d;
			if ((t ? t.ownerDocument || t : y) !== s && nt(t), t = t || s, i = i || [], !n || "string" != typeof n) return i;
			if (1 !== (l = t.nodeType) && 9 !== l) return [];
			if (v && !r) {
				if (p = or.exec(n)) if (f = p[1]) {
					if (9 === l) {
						if (u = t.getElementById(f), !u || !u.parentNode) return i;
						if (u.id === f) return i.push(u), i
					} else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && ot(t, u) && u.id === f) return i.push(u), i
				} else {
					if (p[2]) return b.apply(i, t.getElementsByTagName(n)), i;
					if ((f = p[3]) && e.getElementsByClassName && t.getElementsByClassName) return b.apply(i, t.getElementsByClassName(f)), i
				}
				if (e.qsa && (!h || !h.test(n))) {
					if (c = k = o, g = t, d = 9 === l && n, 1 === l && "object" !== t.nodeName.toLowerCase()) {
						for (a = pt(n), (k = t.getAttribute("id")) ? c = k.replace(cr, "\\$&") : t.setAttribute("id", c), c = "[id='" + c + "'] ", w = a.length; w--;) a[w] = c + wt(a[w]);
						g = ti.test(n) && t.parentNode || t;
						d = a.join(",")
					}
					if (d) try {
						return b.apply(i, g.querySelectorAll(d)), i
					} catch (tt) {} finally {
						k || t.removeAttribute("id")
					}
				}
			}
			return pr(n.replace(vt, "$1"), t, i, r)
		}
		function ri() {
			function n(i, u) {
				return t.push(i += " ") > r.cacheLength && delete n[t.shift()], n[i] = u
			}
			var t = [];
			return n
		}
		function c(n) {
			return n[o] = !0, n
		}
		function l(n) {
			var t = s.createElement("div");
			try {
				return !!n(t)
			} catch (i) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t);
				t = null
			}
		}
		function ui(n, t) {
			for (var u = n.split("|"), i = n.length; i--;) r.attrHandle[u[i]] = t
		}
		function bi(n, t) {
			var i = t && n,
				r = i && 1 === n.nodeType && 1 === t.nodeType && (~t.sourceIndex || vi) - (~n.sourceIndex || vi);
			if (r) return r;
			if (i) while (i = i.nextSibling) if (i === t) return -1;
			return n ? 1 : -1
		}
		function lr(n) {
			return function(t) {
				var i = t.nodeName.toLowerCase();
				return "input" === i && t.type === n
			}
		}
		function ar(n) {
			return function(t) {
				var i = t.nodeName.toLowerCase();
				return ("input" === i || "button" === i) && t.type === n
			}
		}
		function rt(n) {
			return c(function(t) {
				return t = +t, c(function(i, r) {
					for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
				})
			})
		}
		function ki() {}
		function pt(n, t) {
			var e, f, s, o, i, h, c, l = li[n + " "];
			if (l) return t ? 0 : l.slice(0);
			for (i = n, h = [], c = r.preFilter; i;) {
				(!e || (f = ir.exec(i))) && (f && (i = i.slice(f[0].length) || i), h.push(s = []));
				e = !1;
				(f = rr.exec(i)) && (e = f.shift(), s.push({
					value: e,
					type: f[0].replace(vt, " ")
				}), i = i.slice(e.length));
				for (o in r.filter)(f = yt[o].exec(i)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
					value: e,
					type: o,
					matches: f
				}), i = i.slice(e.length));
				if (!e) break
			}
			return t ? i.length : i ? u.error(n) : li(n, h).slice(0)
		}
		function wt(n) {
			for (var t = 0, r = n.length, i = ""; r > t; t++) i += n[t].value;
			return i
		}
		function fi(n, t, i) {
			var r = t.dir,
				u = i && "parentNode" === r,
				f = di++;
			return t.first ?
			function(t, i, f) {
				while (t = t[r]) if (1 === t.nodeType || u) return n(t, i, f)
			} : function(t, i, e) {
				var h, s, c, l = p + " " + f;
				if (e) {
					while (t = t[r]) if ((1 === t.nodeType || u) && n(t, i, e)) return !0
				} else while (t = t[r]) if (1 === t.nodeType || u) if (c = t[o] || (t[o] = {}), (s = c[r]) && s[0] === l) {
					if ((h = s[1]) === !0 || h === ht) return h === !0
				} else if (s = c[r] = [l], s[1] = n(t, i, e) || ht, s[1] === !0) return !0
			}
		}
		function ei(n) {
			return n.length > 1 ?
			function(t, i, r) {
				for (var u = n.length; u--;) if (!n[u](t, i, r)) return !1;
				return !0
			} : n[0]
		}
		function bt(n, t, i, r, u) {
			for (var e, o = [], f = 0, s = n.length, h = null != t; s > f; f++)(e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
			return o
		}
		function oi(n, t, i, r, u, f) {
			return r && !r[o] && (r = oi(r)), u && !u[o] && (u = oi(u, f)), c(function(f, e, o, s) {
				var l, c, a, p = [],
					y = [],
					w = e.length,
					k = f || yr(t || "*", o.nodeType ? [o] : o, []),
					v = !n || !f && t ? k : bt(k, p, n, o, s),
					h = i ? u || (f ? n : w || r) ? [] : e : v;
				if (i && i(v, h, o, s), r) for (l = bt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
				if (f) {
					if (u || n) {
						if (u) {
							for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
							u(null, h = [], l, s)
						}
						for (c = h.length; c--;)(a = h[c]) && (l = u ? it.call(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
					}
				} else h = bt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : b.apply(e, h)
			})
		}
		function si(n) {
			for (var s, u, i, e = n.length, h = r.relative[n[0].type], c = h || r.relative[" "], t = h ? 1 : 0, l = fi(function(n) {
				return n === s
			}, c, !0), a = fi(function(n) {
				return it.call(s, n) > -1
			}, c, !0), f = [function(n, t, i) {
				return !h && (i || t !== lt) || ((s = t).nodeType ? l(n, t, i) : a(n, t, i))
			}]; e > t; t++) if (u = r.relative[n[t].type]) f = [fi(ei(f), u)];
			else {
				if (u = r.filter[n[t].type].apply(null, n[t].matches), u[o]) {
					for (i = ++t; e > i; i++) if (r.relative[n[i].type]) break;
					return oi(t > 1 && ei(f), t > 1 && wt(n.slice(0, t - 1).concat({
						value: " " === n[t - 2].type ? "*" : ""
					})).replace(vt, "$1"), u, i > t && si(n.slice(t, i)), e > i && si(n = n.slice(i)), e > i && wt(n))
				}
				f.push(u)
			}
			return ei(f)
		}
		function vr(n, t) {
			var f = 0,
				i = t.length > 0,
				e = n.length > 0,
				o = function(o, h, c, l, a) {
					var y, g, k, w = [],
						d = 0,
						v = "0",
						nt = o && [],
						tt = null != a,
						it = lt,
						ut = o || e && r.find.TAG("*", a && h.parentNode || h),
						rt = p += null == it ? 1 : Math.random() || .1;
					for (tt && (lt = h !== s && h, ht = f); null != (y = ut[v]); v++) {
						if (e && y) {
							for (g = 0; k = n[g++];) if (k(y, h, c)) {
								l.push(y);
								break
							}
							tt && (p = rt, ht = ++f)
						}
						i && ((y = !k && y) && d--, o && nt.push(y))
					}
					if (d += v, i && v !== d) {
						for (g = 0; k = t[g++];) k(nt, w, h, c);
						if (o) {
							if (d > 0) while (v--) nt[v] || w[v] || (w[v] = nr.call(l));
							w = bt(w)
						}
						b.apply(l, w);
						tt && !o && w.length > 0 && d + t.length > 1 && u.uniqueSort(l)
					}
					return tt && (p = rt, lt = it), nt
				};
			return i ? c(o) : o
		}
		function yr(n, t, i) {
			for (var r = 0, f = t.length; f > r; r++) u(n, t[r], i);
			return i
		}
		function pr(n, t, i, u) {
			var s, f, o, c, l, h = pt(n);
			if (!u && 1 === h.length) {
				if (f = h[0] = h[0].slice(0), f.length > 2 && "ID" === (o = f[0]).type && e.getById && 9 === t.nodeType && v && r.relative[f[1].type]) {
					if (t = (r.find.ID(o.matches[0].replace(k, d), t) || [])[0], !t) return i;
					n = n.slice(f.shift().value.length)
				}
				for (s = yt.needsContext.test(n) ? 0 : f.length; s--;) {
					if (o = f[s], r.relative[c = o.type]) break;
					if ((l = r.find[c]) && (u = l(o.matches[0].replace(k, d), ti.test(f[0].type) && t.parentNode || t))) {
						if (f.splice(s, 1), n = u.length && wt(f), !n) return b.apply(i, u), i;
						break
					}
				}
			}
			return kt(n, h)(u, t, !v, i, ti.test(n)), i
		}
		var ut, e, ht, r, ct, hi, kt, lt, g, nt, s, a, v, h, tt, at, ot, o = "sizzle" + -new Date,
			y = n.document,
			p = 0,
			di = 0,
			ci = ri(),
			li = ri(),
			ai = ri(),
			ft = !1,
			dt = function(n, t) {
				return n === t ? (ft = !0, 0) : 0
			},
			st = typeof t,
			vi = -2147483648,
			gi = {}.hasOwnProperty,
			w = [],
			nr = w.pop,
			tr = w.push,
			b = w.push,
			yi = w.slice,
			it = w.indexOf ||
		function(n) {
			for (var t = 0, i = this.length; i > t; t++) if (this[t] === n) return t;
			return -1
		}, gt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", f = "[\\x20\\t\\r\\n\\f]", et = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", pi = et.replace("w", "w#"), wi = "\\[" + f + "*(" + et + ")" + f + "*(?:([*^$|!~]?=)" + f + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + pi + ")|)|)" + f + "*\\]", ni = ":(" + et + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + wi.replace(3, 8) + ")*)|.*)\\)|)", vt = RegExp("^" + f + "+|((?:^|[^\\\\])(?:\\\\.)*)" + f + "+$", "g"), ir = RegExp("^" + f + "*," + f + "*"), rr = RegExp("^" + f + "*([>+~]|" + f + ")" + f + "*"), ti = RegExp(f + "*[+~]"), ur = RegExp("=" + f + "*([^\\]'\"]*)" + f + "*\\]", "g"), fr = RegExp(ni), er = RegExp("^" + pi + "$"), yt = {
			ID: RegExp("^#(" + et + ")"),
			CLASS: RegExp("^\\.(" + et + ")"),
			TAG: RegExp("^(" + et.replace("w", "w*") + ")"),
			ATTR: RegExp("^" + wi),
			PSEUDO: RegExp("^" + ni),
			CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + f + "*(even|odd|(([+-]|)(\\d*)n|)" + f + "*(?:([+-]|)" + f + "*(\\d+)|))" + f + "*\\)|)", "i"),
			bool: RegExp("^(?:" + gt + ")$", "i"),
			needsContext: RegExp("^" + f + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + f + "*((?:-\\d)?\\d*)" + f + "*\\)|)(?=[^-]|$)", "i")
		}, ii = /^[^{]+\{\s*\[native \w/, or = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, sr = /^(?:input|select|textarea|button)$/i, hr = /^h\d$/i, cr = /'|\\/g, k = RegExp("\\\\([\\da-f]{1,6}" + f + "?|(" + f + ")|.)", "ig"), d = function(n, t, i) {
			var r = "0x" + t - 65536;
			return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
		};
		try {
			b.apply(w = yi.call(y.childNodes), y.childNodes);
			w[y.childNodes.length].nodeType
		} catch (wr) {
			b = {
				apply: w.length ?
				function(n, t) {
					tr.apply(n, yi.call(t))
				} : function(n, t) {
					for (var i = n.length, r = 0; n[i++] = t[r++];);
					n.length = i - 1
				}
			}
		}
		hi = u.isXML = function(n) {
			var t = n && (n.ownerDocument || n).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		};
		e = u.support = {};
		nt = u.setDocument = function(n) {
			var i = n ? n.ownerDocument || n : y,
				u = i.defaultView;
			return i !== s && 9 === i.nodeType && i.documentElement ? (s = i, a = i.documentElement, v = !hi(i), u && u.attachEvent && u !== u.top && u.attachEvent("onbeforeunload", function() {
				nt()
			}), e.attributes = l(function(n) {
				return n.className = "i", !n.getAttribute("className")
			}), e.getElementsByTagName = l(function(n) {
				return n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length
			}), e.getElementsByClassName = l(function(n) {
				return n.innerHTML = "<div class='a'><\/div><div class='a i'><\/div>", n.firstChild.className = "i", 2 === n.getElementsByClassName("i").length
			}), e.getById = l(function(n) {
				return a.appendChild(n).id = o, !i.getElementsByName || !i.getElementsByName(o).length
			}), e.getById ? (r.find.ID = function(n, t) {
				if (typeof t.getElementById !== st && v) {
					var i = t.getElementById(n);
					return i && i.parentNode ? [i] : []
				}
			}, r.filter.ID = function(n) {
				var t = n.replace(k, d);
				return function(n) {
					return n.getAttribute("id") === t
				}
			}) : (delete r.find.ID, r.filter.ID = function(n) {
				var t = n.replace(k, d);
				return function(n) {
					var i = typeof n.getAttributeNode !== st && n.getAttributeNode("id");
					return i && i.value === t
				}
			}), r.find.TAG = e.getElementsByTagName ?
			function(n, i) {
				return typeof i.getElementsByTagName !== st ? i.getElementsByTagName(n) : t
			} : function(n, t) {
				var i, r = [],
					f = 0,
					u = t.getElementsByTagName(n);
				if ("*" === n) {
					while (i = u[f++]) 1 === i.nodeType && r.push(i);
					return r
				}
				return u
			}, r.find.CLASS = e.getElementsByClassName &&
			function(n, i) {
				return typeof i.getElementsByClassName !== st && v ? i.getElementsByClassName(n) : t
			}, tt = [], h = [], (e.qsa = ii.test(i.querySelectorAll)) && (l(function(n) {
				n.innerHTML = "<select><option selected=''><\/option><\/select>";
				n.querySelectorAll("[selected]").length || h.push("\\[" + f + "*(?:value|" + gt + ")");
				n.querySelectorAll(":checked").length || h.push(":checked")
			}), l(function(n) {
				var t = i.createElement("input");
				t.setAttribute("type", "hidden");
				n.appendChild(t).setAttribute("t", "");
				n.querySelectorAll("[t^='']").length && h.push("[*^$]=" + f + "*(?:''|\"\")");
				n.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled");
				n.querySelectorAll("*,:x");
				h.push(",.*:")
			})), (e.matchesSelector = ii.test(at = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && l(function(n) {
				e.disconnectedMatch = at.call(n, "div");
				at.call(n, "[s!='']:x");
				tt.push("!=", ni)
			}), h = h.length && RegExp(h.join("|")), tt = tt.length && RegExp(tt.join("|")), ot = ii.test(a.contains) || a.compareDocumentPosition ?
			function(n, t) {
				var r = 9 === n.nodeType ? n.documentElement : n,
					i = t && t.parentNode;
				return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
			} : function(n, t) {
				if (t) while (t = t.parentNode) if (t === n) return !0;
				return !1
			}, dt = a.compareDocumentPosition ?
			function(n, t) {
				if (n === t) return ft = !0, 0;
				var r = t.compareDocumentPosition && n.compareDocumentPosition && n.compareDocumentPosition(t);
				return r ? 1 & r || !e.sortDetached && t.compareDocumentPosition(n) === r ? n === i || ot(y, n) ? -1 : t === i || ot(y, t) ? 1 : g ? it.call(g, n) - it.call(g, t) : 0 : 4 & r ? -1 : 1 : n.compareDocumentPosition ? -1 : 1
			} : function(n, t) {
				var r, u = 0,
					o = n.parentNode,
					s = t.parentNode,
					f = [n],
					e = [t];
				if (n === t) return ft = !0, 0;
				if (!o || !s) return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : g ? it.call(g, n) - it.call(g, t) : 0;
				if (o === s) return bi(n, t);
				for (r = n; r = r.parentNode;) f.unshift(r);
				for (r = t; r = r.parentNode;) e.unshift(r);
				while (f[u] === e[u]) u++;
				return u ? bi(f[u], e[u]) : f[u] === y ? -1 : e[u] === y ? 1 : 0
			}, i) : s
		};
		u.matches = function(n, t) {
			return u(n, null, null, t)
		};
		u.matchesSelector = function(n, t) {
			if ((n.ownerDocument || n) !== s && nt(n), t = t.replace(ur, "='$1']"), !(!e.matchesSelector || !v || tt && tt.test(t) || h && h.test(t))) try {
				var i = at.call(n, t);
				if (i || e.disconnectedMatch || n.document && 11 !== n.document.nodeType) return i
			} catch (r) {}
			return u(t, s, null, [n]).length > 0
		};
		u.contains = function(n, t) {
			return (n.ownerDocument || n) !== s && nt(n), ot(n, t)
		};
		u.attr = function(n, i) {
			(n.ownerDocument || n) !== s && nt(n);
			var f = r.attrHandle[i.toLowerCase()],
				u = f && gi.call(r.attrHandle, i.toLowerCase()) ? f(n, i, !v) : t;
			return u === t ? e.attributes || !v ? n.getAttribute(i) : (u = n.getAttributeNode(i)) && u.specified ? u.value : null : u
		};
		u.error = function(n) {
			throw Error("Syntax error, unrecognized expression: " + n);
		};
		u.uniqueSort = function(n) {
			var r, u = [],
				t = 0,
				i = 0;
			if (ft = !e.detectDuplicates, g = !e.sortStable && n.slice(0), n.sort(dt), ft) {
				while (r = n[i++]) r === n[i] && (t = u.push(i));
				while (t--) n.splice(u[t], 1)
			}
			return n
		};
		ct = u.getText = function(n) {
			var r, i = "",
				u = 0,
				t = n.nodeType;
			if (t) {
				if (1 === t || 9 === t || 11 === t) {
					if ("string" == typeof n.textContent) return n.textContent;
					for (n = n.firstChild; n; n = n.nextSibling) i += ct(n)
				} else if (3 === t || 4 === t) return n.nodeValue
			} else for (; r = n[u]; u++) i += ct(r);
			return i
		};
		r = u.selectors = {
			cacheLength: 50,
			createPseudo: c,
			match: yt,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(n) {
					return n[1] = n[1].replace(k, d), n[3] = (n[4] || n[5] || "").replace(k, d), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4)
				},
				CHILD: function(n) {
					return n[1] = n[1].toLowerCase(), "nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] = +(n[7] + n[8] || "odd" === n[3])) : n[3] && u.error(n[0]), n
				},
				PSEUDO: function(n) {
					var r, i = !n[5] && n[2];
					return yt.CHILD.test(n[0]) ? null : (n[3] && n[4] !== t ? n[2] = n[4] : i && fr.test(i) && (r = pt(i, !0)) && (r = i.indexOf(")", i.length - r) - i.length) && (n[0] = n[0].slice(0, r), n[2] = i.slice(0, r)), n.slice(0, 3))
				}
			},
			filter: {
				TAG: function(n) {
					var t = n.replace(k, d).toLowerCase();
					return "*" === n ?
					function() {
						return !0
					} : function(n) {
						return n.nodeName && n.nodeName.toLowerCase() === t
					}
				},
				CLASS: function(n) {
					var t = ci[n + " "];
					return t || (t = RegExp("(^|" + f + ")" + n + "(" + f + "|$)")) && ci(n, function(n) {
						return t.test("string" == typeof n.className && n.className || typeof n.getAttribute !== st && n.getAttribute("class") || "")
					})
				},
				ATTR: function(n, t, i) {
					return function(r) {
						var f = u.attr(r, n);
						return null == f ? "!=" === t : t ? (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f + " ").indexOf(i) > -1 : "|=" === t ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
					}
				},
				CHILD: function(n, t, i, r, u) {
					var s = "nth" !== n.slice(0, 3),
						e = "last" !== n.slice(-4),
						f = "of-type" === t;
					return 1 === r && 0 === u ?
					function(n) {
						return !!n.parentNode
					} : function(t, i, h) {
						var a, k, c, l, v, w, b = s !== e ? "nextSibling" : "previousSibling",
							y = t.parentNode,
							g = f && t.nodeName.toLowerCase(),
							d = !h && !f;
						if (y) {
							if (s) {
								while (b) {
									for (c = t; c = c[b];) if (f ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
									w = b = "only" === n && !w && "nextSibling"
								}
								return !0
							}
							if (w = [e ? y.firstChild : y.lastChild], e && d) {
								for (k = y[o] || (y[o] = {}), a = k[n] || [], v = a[0] === p && a[1], l = a[0] === p && a[2], c = v && y.childNodes[v]; c = ++v && c && c[b] || (l = v = 0) || w.pop();) if (1 === c.nodeType && ++l && c === t) {
									k[n] = [p, v, l];
									break
								}
							} else if (d && (a = (t[o] || (t[o] = {}))[n]) && a[0] === p) l = a[1];
							else while (c = ++v && c && c[b] || (l = v = 0) || w.pop()) if ((f ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++l && (d && ((c[o] || (c[o] = {}))[n] = [p, l]), c === t)) break;
							return l -= u, l === r || 0 == l % r && l / r >= 0
						}
					}
				},
				PSEUDO: function(n, t) {
					var f, i = r.pseudos[n] || r.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
					return i[o] ? i(t) : i.length > 1 ? (f = [n, n, "", t], r.setFilters.hasOwnProperty(n.toLowerCase()) ? c(function(n, r) {
						for (var u, f = i(n, t), e = f.length; e--;) u = it.call(n, f[e]), n[u] = !(r[u] = f[e])
					}) : function(n) {
						return i(n, 0, f)
					}) : i
				}
			},
			pseudos: {
				not: c(function(n) {
					var i = [],
						r = [],
						t = kt(n.replace(vt, "$1"));
					return t[o] ? c(function(n, i, r, u) {
						for (var e, o = t(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(i[f] = e))
					}) : function(n, u, f) {
						return i[0] = n, t(i, null, f, r), !r.pop()
					}
				}),
				has: c(function(n) {
					return function(t) {
						return u(n, t).length > 0
					}
				}),
				contains: c(function(n) {
					return function(t) {
						return (t.textContent || t.innerText || ct(t)).indexOf(n) > -1
					}
				}),
				lang: c(function(n) {
					return er.test(n || "") || u.error("unsupported lang: " + n), n = n.replace(k, d).toLowerCase(), function(t) {
						var i;
						do
						if (i = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-");
						while ((t = t.parentNode) && 1 === t.nodeType);
						return !1
					}
				}),
				target: function(t) {
					var i = n.location && n.location.hash;
					return i && i.slice(1) === t.id
				},
				root: function(n) {
					return n === a
				},
				focus: function(n) {
					return n === s.activeElement && (!s.hasFocus || s.hasFocus()) && !! (n.type || n.href || ~n.tabIndex)
				},
				enabled: function(n) {
					return n.disabled === !1
				},
				disabled: function(n) {
					return n.disabled === !0
				},
				checked: function(n) {
					var t = n.nodeName.toLowerCase();
					return "input" === t && !! n.checked || "option" === t && !! n.selected
				},
				selected: function(n) {
					return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
				},
				empty: function(n) {
					for (n = n.firstChild; n; n = n.nextSibling) if (n.nodeName > "@" || 3 === n.nodeType || 4 === n.nodeType) return !1;
					return !0
				},
				parent: function(n) {
					return !r.pseudos.empty(n)
				},
				header: function(n) {
					return hr.test(n.nodeName)
				},
				input: function(n) {
					return sr.test(n.nodeName)
				},
				button: function(n) {
					var t = n.nodeName.toLowerCase();
					return "input" === t && "button" === n.type || "button" === t
				},
				text: function(n) {
					var t;
					return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || t.toLowerCase() === n.type)
				},
				first: rt(function() {
					return [0]
				}),
				last: rt(function(n, t) {
					return [t - 1]
				}),
				eq: rt(function(n, t, i) {
					return [0 > i ? i + t : i]
				}),
				even: rt(function(n, t) {
					for (var i = 0; t > i; i += 2) n.push(i);
					return n
				}),
				odd: rt(function(n, t) {
					for (var i = 1; t > i; i += 2) n.push(i);
					return n
				}),
				lt: rt(function(n, t, i) {
					for (var r = 0 > i ? i + t : i; --r >= 0;) n.push(r);
					return n
				}),
				gt: rt(function(n, t, i) {
					for (var r = 0 > i ? i + t : i; t > ++r;) n.push(r);
					return n
				})
			}
		};
		r.pseudos.nth = r.pseudos.eq;
		for (ut in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) r.pseudos[ut] = lr(ut);
		for (ut in {
			submit: !0,
			reset: !0
		}) r.pseudos[ut] = ar(ut);
		ki.prototype = r.filters = r.pseudos;
		r.setFilters = new ki;
		kt = u.compile = function(n, t) {
			var r, u = [],
				f = [],
				i = ai[n + " "];
			if (!i) {
				for (t || (t = pt(n)), r = t.length; r--;) i = si(t[r]), i[o] ? u.push(i) : f.push(i);
				i = ai(n, vr(f, u))
			}
			return i
		};
		e.sortStable = o.split("").sort(dt).join("") === o;
		e.detectDuplicates = ft;
		nt();
		e.sortDetached = l(function(n) {
			return 1 & n.compareDocumentPosition(s.createElement("div"))
		});
		l(function(n) {
			return n.innerHTML = "<a href='#'><\/a>", "#" === n.firstChild.getAttribute("href")
		}) || ui("type|href|height|width", function(n, i, r) {
			return r ? t : n.getAttribute(i, "type" === i.toLowerCase() ? 1 : 2)
		});
		e.attributes && l(function(n) {
			return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value")
		}) || ui("value", function(n, i, r) {
			return r || "input" !== n.nodeName.toLowerCase() ? t : n.defaultValue
		});
		l(function(n) {
			return null == n.getAttribute("disabled")
		}) || ui(gt, function(n, i, r) {
			var u;
			return r ? t : (u = n.getAttributeNode(i)) && u.specified ? u.value : n[i] === !0 ? i.toLowerCase() : null
		});
		i.find = u;
		i.expr = u.selectors;
		i.expr[":"] = i.expr.pseudos;
		i.unique = u.uniqueSort;
		i.text = u.getText;
		i.isXMLDoc = u.isXML;
		i.contains = u.contains
	}(n);
	ni = {};
	i.Callbacks = function(n) {
		n = "string" == typeof n ? ni[n] || te(n) : i.extend({}, n);
		var s, f, c, e, o, l, r = [],
			u = !n.once && [],
			a = function(t) {
				for (f = n.memory && t, c = !0, o = l || 0, l = 0, e = r.length, s = !0; r && e > o; o++) if (r[o].apply(t[0], t[1]) === !1 && n.stopOnFalse) {
					f = !1;
					break
				}
				s = !1;
				r && (u ? u.length && a(u.shift()) : f ? r = [] : h.disable())
			},
			h = {
				add: function() {
					if (r) {
						var t = r.length;
						(function u(t) {
							i.each(t, function(t, f) {
								var e = i.type(f);
								"function" === e ? n.unique && h.has(f) || r.push(f) : f && f.length && "string" !== e && u(f)
							})
						})(arguments);
						s ? e = r.length : f && (l = t, a(f))
					}
					return this
				},
				remove: function() {
					return r && i.each(arguments, function(n, t) {
						for (var u;
						(u = i.inArray(t, r, u)) > -1;) r.splice(u, 1), s && (e >= u && e--, o >= u && o--)
					}), this
				},
				has: function(n) {
					return n ? i.inArray(n, r) > -1 : !(!r || !r.length)
				},
				empty: function() {
					return r = [], e = 0, this
				},
				disable: function() {
					return r = u = f = t, this
				},
				disabled: function() {
					return !r
				},
				lock: function() {
					return u = t, f || h.disable(), this
				},
				locked: function() {
					return !u
				},
				fireWith: function(n, t) {
					return !r || c && !u || (t = t || [], t = [n, t.slice ? t.slice() : t], s ? u.push(t) : a(t)), this
				},
				fire: function() {
					return h.fireWith(this, arguments), this
				},
				fired: function() {
					return !!c
				}
			};
		return h
	};
	i.extend({
		Deferred: function(n) {
			var u = [
				["resolve", "done", i.Callbacks("once memory"), "resolved"],
				["reject", "fail", i.Callbacks("once memory"), "rejected"],
				["notify", "progress", i.Callbacks("memory")]
			],
				f = "pending",
				r = {
					state: function() {
						return f
					},
					always: function() {
						return t.done(arguments).fail(arguments), this
					},
					then: function() {
						var n = arguments;
						return i.Deferred(function(f) {
							i.each(u, function(u, e) {
								var s = e[0],
									o = i.isFunction(n[u]) && n[u];
								t[e[1]](function() {
									var n = o && o.apply(this, arguments);
									n && i.isFunction(n.promise) ? n.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[s + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
								})
							});
							n = null
						}).promise()
					},
					promise: function(n) {
						return null != n ? i.extend(n, r) : r
					}
				},
				t = {};
			return r.pipe = r.then, i.each(u, function(n, i) {
				var e = i[2],
					o = i[3];
				r[i[1]] = e.add;
				o && e.add(function() {
					f = o
				}, u[1 ^ n][2].disable, u[2][2].lock);
				t[i[0]] = function() {
					return t[i[0] + "With"](this === t ? r : this, arguments), this
				};
				t[i[0] + "With"] = e.fireWith
			}), r.promise(t), n && n.call(t, t), t
		},
		when: function(n) {
			var t = 0,
				u = l.call(arguments),
				r = u.length,
				e = 1 !== r || n && i.isFunction(n.promise) ? r : 0,
				f = 1 === e ? n : i.Deferred(),
				h = function(n, t, i) {
					return function(r) {
						t[n] = this;
						i[n] = arguments.length > 1 ? l.call(arguments) : r;
						i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
					}
				},
				o, c, s;
			if (r > 1) for (o = Array(r), c = Array(r), s = Array(r); r > t; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().done(h(t, s, u)).fail(f.reject).progress(h(t, c, o)) : --e;
			return e || f.resolveWith(s, u), f.promise()
		}
	});
	i.support = function(t) {
		var a, e, f, h, c, l, v, y, s, u = r.createElement("div");
		if (u.setAttribute("className", "t"), u.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>", a = u.getElementsByTagName("*") || [], e = u.getElementsByTagName("a")[0], !e || !e.style || !a.length) return t;
		h = r.createElement("select");
		l = h.appendChild(r.createElement("option"));
		f = u.getElementsByTagName("input")[0];
		e.style.cssText = "top:1px;float:left;opacity:.5";
		t.getSetAttribute = "t" !== u.className;
		t.leadingWhitespace = 3 === u.firstChild.nodeType;
		t.tbody = !u.getElementsByTagName("tbody").length;
		t.htmlSerialize = !! u.getElementsByTagName("link").length;
		t.style = /top/.test(e.getAttribute("style"));
		t.hrefNormalized = "/a" === e.getAttribute("href");
		t.opacity = /^0.5/.test(e.style.opacity);
		t.cssFloat = !! e.style.cssFloat;
		t.checkOn = !! f.value;
		t.optSelected = l.selected;
		t.enctype = !! r.createElement("form").enctype;
		t.html5Clone = "<:nav><\/:nav>" !== r.createElement("nav").cloneNode(!0).outerHTML;
		t.inlineBlockNeedsLayout = !1;
		t.shrinkWrapBlocks = !1;
		t.pixelPosition = !1;
		t.deleteExpando = !0;
		t.noCloneEvent = !0;
		t.reliableMarginRight = !0;
		t.boxSizingReliable = !0;
		f.checked = !0;
		t.noCloneChecked = f.cloneNode(!0).checked;
		h.disabled = !0;
		t.optDisabled = !l.disabled;
		try {
			delete u.test
		} catch (p) {
			t.deleteExpando = !1
		}
		f = r.createElement("input");
		f.setAttribute("value", "");
		t.input = "" === f.getAttribute("value");
		f.value = "t";
		f.setAttribute("type", "radio");
		t.radioValue = "t" === f.value;
		f.setAttribute("checked", "t");
		f.setAttribute("name", "t");
		c = r.createDocumentFragment();
		c.appendChild(f);
		t.appendChecked = f.checked;
		t.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
		u.attachEvent && (u.attachEvent("onclick", function() {
			t.noCloneEvent = !1
		}), u.cloneNode(!0).click());
		for (s in {
			submit: !0,
			change: !0,
			focusin: !0
		}) u.setAttribute(v = "on" + s, "t"), t[s + "Bubbles"] = v in n || u.attributes[v].expando === !1;
		u.style.backgroundClip = "content-box";
		u.cloneNode(!0).style.backgroundClip = "";
		t.clearCloneStyle = "content-box" === u.style.backgroundClip;
		for (s in i(t)) break;
		return t.ownLast = "0" !== s, i(function() {
			var h, e, f, c = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				s = r.getElementsByTagName("body")[0];
			s && (h = r.createElement("div"), h.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(h).appendChild(u), u.innerHTML = "<table><tr><td><\/td><td>t<\/td><\/tr><\/table>", f = u.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", y = 0 === f[0].offsetHeight, f[0].style.display = "", f[1].style.display = "none", t.reliableHiddenOffsets = y && 0 === f[0].offsetHeight, u.innerHTML = "", u.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", i.swap(s, null != s.style.zoom ? {
				zoom: 1
			} : {}, function() {
				t.boxSizing = 4 === u.offsetWidth
			}), n.getComputedStyle && (t.pixelPosition = "1%" !== (n.getComputedStyle(u, null) || {}).top, t.boxSizingReliable = "4px" === (n.getComputedStyle(u, null) || {
				width: "4px"
			}).width, e = u.appendChild(r.createElement("div")), e.style.cssText = u.style.cssText = c, e.style.marginRight = e.style.width = "0", u.style.width = "1px", t.reliableMarginRight = !parseFloat((n.getComputedStyle(e, null) || {}).marginRight)), typeof u.style.zoom !== o && (u.innerHTML = "", u.style.cssText = c + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === u.offsetWidth, u.style.display = "block", u.innerHTML = "<div><\/div>", u.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== u.offsetWidth, t.inlineBlockNeedsLayout && (s.style.zoom = 1)), s.removeChild(h), h = u = f = e = null)
		}), a = h = c = l = e = f = null, t
	}({});
	ir = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;
	rr = /([A-Z])/g;
	i.extend({
		cache: {},
		noData: {
			applet: !0,
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(n) {
			return n = n.nodeType ? i.cache[n[i.expando]] : n[i.expando], !! n && !ti(n)
		},
		data: function(n, t, i) {
			return ur(n, t, i)
		},
		removeData: function(n, t) {
			return fr(n, t)
		},
		_data: function(n, t, i) {
			return ur(n, t, i, !0)
		},
		_removeData: function(n, t) {
			return fr(n, t, !0)
		},
		acceptData: function(n) {
			if (n.nodeType && 1 !== n.nodeType && 9 !== n.nodeType) return !1;
			var t = n.nodeName && i.noData[n.nodeName.toLowerCase()];
			return !t || t !== !0 && n.getAttribute("classid") === t
		}
	});
	i.fn.extend({
		data: function(n, r) {
			var e, f, o = null,
				s = 0,
				u = this[0];
			if (n === t) {
				if (this.length && (o = i.data(u), 1 === u.nodeType && !i._data(u, "parsedAttrs"))) {
					for (e = u.attributes; e.length > s; s++) f = e[s].name, 0 === f.indexOf("data-") && (f = i.camelCase(f.slice(5)), er(u, f, o[f]));
					i._data(u, "parsedAttrs", !0)
				}
				return o
			}
			return "object" == typeof n ? this.each(function() {
				i.data(this, n)
			}) : arguments.length > 1 ? this.each(function() {
				i.data(this, n, r)
			}) : u ? er(u, n, i.data(u, n)) : null
		},
		removeData: function(n) {
			return this.each(function() {
				i.removeData(this, n)
			})
		}
	});
	i.extend({
		queue: function(n, r, u) {
			var f;
			return n ? (r = (r || "fx") + "queue", f = i._data(n, r), u && (!f || i.isArray(u) ? f = i._data(n, r, i.makeArray(u)) : f.push(u)), f || []) : t
		},
		dequeue: function(n, t) {
			t = t || "fx";
			var r = i.queue(n, t),
				e = r.length,
				u = r.shift(),
				f = i._queueHooks(n, t),
				o = function() {
					i.dequeue(n, t)
				};
			"inprogress" === u && (u = r.shift(), e--);
			u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
			!e && f && f.empty.fire()
		},
		_queueHooks: function(n, t) {
			var r = t + "queueHooks";
			return i._data(n, r) || i._data(n, r, {
				empty: i.Callbacks("once memory").add(function() {
					i._removeData(n, t + "queue");
					i._removeData(n, r)
				})
			})
		}
	});
	i.fn.extend({
		queue: function(n, r) {
			var u = 2;
			return "string" != typeof n && (r = n, n = "fx", u--), u > arguments.length ? i.queue(this[0], n) : r === t ? this : this.each(function() {
				var t = i.queue(this, n, r);
				i._queueHooks(this, n);
				"fx" === n && "inprogress" !== t[0] && i.dequeue(this, n)
			})
		},
		dequeue: function(n) {
			return this.each(function() {
				i.dequeue(this, n)
			})
		},
		delay: function(n, t) {
			return n = i.fx ? i.fx.speeds[n] || n : n, t = t || "fx", this.queue(t, function(t, i) {
				var r = setTimeout(t, n);
				i.stop = function() {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function(n) {
			return this.queue(n || "fx", [])
		},
		promise: function(n, r) {
			var u, e = 1,
				o = i.Deferred(),
				f = this,
				s = this.length,
				h = function() {
					--e || o.resolveWith(f, [f])
				};
			for ("string" != typeof n && (r = n, n = t), n = n || "fx"; s--;) u = i._data(f[s], n + "queueHooks"), u && u.empty && (e++, u.empty.add(h));
			return h(), o.promise(r)
		}
	});
	var d, or, ii = /[\t\r\n\f]/g,
		ie = /\r/g,
		re = /^(?:input|select|textarea|button|object)$/i,
		ue = /^(?:a|area)$/i,
		ri = /^(?:checked|selected)$/i,
		a = i.support.getSetAttribute,
		ht = i.support.input;
	i.fn.extend({
		attr: function(n, t) {
			return i.access(this, i.attr, n, t, arguments.length > 1)
		},
		removeAttr: function(n) {
			return this.each(function() {
				i.removeAttr(this, n)
			})
		},
		prop: function(n, t) {
			return i.access(this, i.prop, n, t, arguments.length > 1)
		},
		removeProp: function(n) {
			return n = i.propFix[n] || n, this.each(function() {
				try {
					this[n] = t;
					delete this[n]
				} catch (i) {}
			})
		},
		addClass: function(n) {
			var e, t, r, u, o, f = 0,
				h = this.length,
				c = "string" == typeof n && n;
			if (i.isFunction(n)) return this.each(function(t) {
				i(this).addClass(n.call(this, t, this.className))
			});
			if (c) for (e = (n || "").match(s) || []; h > f; f++) if (t = this[f], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(ii, " ") : " ")) {
				for (o = 0; u = e[o++];) 0 > r.indexOf(" " + u + " ") && (r += u + " ");
				t.className = i.trim(r)
			}
			return this
		},
		removeClass: function(n) {
			var e, t, r, u, o, f = 0,
				h = this.length,
				c = 0 === arguments.length || "string" == typeof n && n;
			if (i.isFunction(n)) return this.each(function(t) {
				i(this).removeClass(n.call(this, t, this.className))
			});
			if (c) for (e = (n || "").match(s) || []; h > f; f++) if (t = this[f], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(ii, " ") : "")) {
				for (o = 0; u = e[o++];) while (r.indexOf(" " + u + " ") >= 0) r = r.replace(" " + u + " ", " ");
				t.className = n ? i.trim(r) : ""
			}
			return this
		},
		toggleClass: function(n, t) {
			var r = typeof n;
			return "boolean" == typeof t && "string" === r ? t ? this.addClass(n) : this.removeClass(n) : i.isFunction(n) ? this.each(function(r) {
				i(this).toggleClass(n.call(this, r, this.className, t), t)
			}) : this.each(function() {
				if ("string" === r) for (var t, f = 0, u = i(this), e = n.match(s) || []; t = e[f++];) u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
				else(r === o || "boolean" === r) && (this.className && i._data(this, "__className__", this.className), this.className = this.className || n === !1 ? "" : i._data(this, "__className__") || "")
			})
		},
		hasClass: function(n) {
			for (var i = " " + n + " ", t = 0, r = this.length; r > t; t++) if (1 === this[t].nodeType && (" " + this[t].className + " ").replace(ii, " ").indexOf(i) >= 0) return !0;
			return !1
		},
		val: function(n) {
			var u, r, e, f = this[0];
			return arguments.length ? (e = i.isFunction(n), this.each(function(u) {
				var f;
				1 === this.nodeType && (f = e ? n.call(this, u, i(this).val()) : n, null == f ? f = "" : "number" == typeof f ? f += "" : i.isArray(f) && (f = i.map(f, function(n) {
					return null == n ? "" : n + ""
				})), r = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, f, "value") !== t || (this.value = f))
			})) : f ? (r = i.valHooks[f.type] || i.valHooks[f.nodeName.toLowerCase()], r && "get" in r && (u = r.get(f, "value")) !== t ? u : (u = f.value, "string" == typeof u ? u.replace(ie, "") : null == u ? "" : u)) : void 0
		}
	});
	i.extend({
		valHooks: {
			option: {
				get: function(n) {
					var t = i.find.attr(n, "value");
					return null != t ? t : n.text
				}
			},
			select: {
				get: function(n) {
					for (var e, t, o = n.options, r = n.selectedIndex, u = "select-one" === n.type || 0 > r, s = u ? null : [], h = u ? r + 1 : o.length, f = 0 > r ? h : u ? r : 0; h > f; f++) if (t = o[f], !(!t.selected && f !== r || (i.support.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || t.parentNode.disabled && i.nodeName(t.parentNode, "optgroup"))) {
						if (e = i(t).val(), u) return e;
						s.push(e)
					}
					return s
				},
				set: function(n, t) {
					for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;) r = f[o], (r.selected = i.inArray(i(r).val(), e) >= 0) && (u = !0);
					return u || (n.selectedIndex = -1), e
				}
			}
		},
		attr: function(n, r, u) {
			var f, e, s = n.nodeType;
			if (n && 3 !== s && 8 !== s && 2 !== s) return typeof n.getAttribute === o ? i.prop(n, r, u) : (1 === s && i.isXMLDoc(n) || (r = r.toLowerCase(), f = i.attrHooks[r] || (i.expr.match.bool.test(r) ? or : d)), u === t ? f && "get" in f && null !== (e = f.get(n, r)) ? e : (e = i.find.attr(n, r), null == e ? t : e) : null !== u ? f && "set" in f && (e = f.set(n, u, r)) !== t ? e : (n.setAttribute(r, u + ""), u) : (i.removeAttr(n, r), t))
		},
		removeAttr: function(n, t) {
			var r, u, e = 0,
				f = t && t.match(s);
			if (f && 1 === n.nodeType) while (r = f[e++]) u = i.propFix[r] || r, i.expr.match.bool.test(r) ? ht && a || !ri.test(r) ? n[u] = !1 : n[i.camelCase("default-" + r)] = n[u] = !1 : i.attr(n, r, ""), n.removeAttribute(a ? r : u)
		},
		attrHooks: {
			type: {
				set: function(n, t) {
					if (!i.support.radioValue && "radio" === t && i.nodeName(n, "input")) {
						var r = n.value;
						return n.setAttribute("type", t), r && (n.value = r), t
					}
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(n, r, u) {
			var e, f, s, o = n.nodeType;
			if (n && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !i.isXMLDoc(n), s && (r = i.propFix[r] || r, f = i.propHooks[r]), u !== t ? f && "set" in f && (e = f.set(n, u, r)) !== t ? e : n[r] = u : f && "get" in f && null !== (e = f.get(n, r)) ? e : n[r]
		},
		propHooks: {
			tabIndex: {
				get: function(n) {
					var t = i.find.attr(n, "tabindex");
					return t ? parseInt(t, 10) : re.test(n.nodeName) || ue.test(n.nodeName) && n.href ? 0 : -1
				}
			}
		}
	});
	or = {
		set: function(n, t, r) {
			return t === !1 ? i.removeAttr(n, r) : ht && a || !ri.test(r) ? n.setAttribute(!a && i.propFix[r] || r, r) : n[i.camelCase("default-" + r)] = n[r] = !0, r
		}
	};
	i.each(i.expr.match.bool.source.match(/\w+/g), function(n, r) {
		var u = i.expr.attrHandle[r] || i.find.attr;
		i.expr.attrHandle[r] = ht && a || !ri.test(r) ?
		function(n, r, f) {
			var e = i.expr.attrHandle[r],
				o = f ? t : (i.expr.attrHandle[r] = t) != u(n, r, f) ? r.toLowerCase() : null;
			return i.expr.attrHandle[r] = e, o
		} : function(n, r, u) {
			return u ? t : n[i.camelCase("default-" + r)] ? r.toLowerCase() : null
		}
	});
	ht && a || (i.attrHooks.value = {
		set: function(n, r, u) {
			return i.nodeName(n, "input") ? (n.defaultValue = r, t) : d && d.set(n, r, u)
		}
	});
	a || (d = {
		set: function(n, i, r) {
			var u = n.getAttributeNode(r);
			return u || n.setAttributeNode(u = n.ownerDocument.createAttribute(r)), u.value = i += "", "value" === r || i === n.getAttribute(r) ? i : t
		}
	}, i.expr.attrHandle.id = i.expr.attrHandle.name = i.expr.attrHandle.coords = function(n, i, r) {
		var u;
		return r ? t : (u = n.getAttributeNode(i)) && "" !== u.value ? u.value : null
	}, i.valHooks.button = {
		get: function(n, i) {
			var r = n.getAttributeNode(i);
			return r && r.specified ? r.value : t
		},
		set: d.set
	}, i.attrHooks.contenteditable = {
		set: function(n, t, i) {
			d.set(n, "" === t ? !1 : t, i)
		}
	}, i.each(["width", "height"], function(n, r) {
		i.attrHooks[r] = {
			set: function(n, i) {
				return "" === i ? (n.setAttribute(r, "auto"), i) : t
			}
		}
	}));
	i.support.hrefNormalized || i.each(["href", "src"], function(n, t) {
		i.propHooks[t] = {
			get: function(n) {
				return n.getAttribute(t, 4)
			}
		}
	});
	i.support.style || (i.attrHooks.style = {
		get: function(n) {
			return n.style.cssText || t
		},
		set: function(n, t) {
			return n.style.cssText = t + ""
		}
	});
	i.support.optSelected || (i.propHooks.selected = {
		get: function(n) {
			var t = n.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	});
	i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		i.propFix[this.toLowerCase()] = this
	});
	i.support.enctype || (i.propFix.enctype = "encoding");
	i.each(["radio", "checkbox"], function() {
		i.valHooks[this] = {
			set: function(n, r) {
				return i.isArray(r) ? n.checked = i.inArray(i(n).val(), r) >= 0 : t
			}
		};
		i.support.checkOn || (i.valHooks[this].get = function(n) {
			return null === n.getAttribute("value") ? "on" : n.value
		})
	});
	var ui = /^(?:input|select|textarea)$/i,
		fe = /^key/,
		ee = /^(?:mouse|contextmenu)|click/,
		sr = /^(?:focusinfocus|focusoutblur)$/,
		hr = /^([^.]*)(?:\.(.+)|)$/;
	i.event = {
		global: {},
		add: function(n, r, u, f, e) {
			var b, p, k, w, c, l, a, v, h, d, g, y = i._data(n);
			if (y) {
				for (u.handler && (w = u, u = w.handler, e = w.selector), u.guid || (u.guid = i.guid++), (p = y.events) || (p = y.events = {}), (l = y.handle) || (l = y.handle = function(n) {
					return typeof i === o || n && i.event.triggered === n.type ? t : i.event.dispatch.apply(l.elem, arguments)
				}, l.elem = n), r = (r || "").match(s) || [""], k = r.length; k--;) b = hr.exec(r[k]) || [], h = g = b[1], d = (b[2] || "").split(".").sort(), h && (c = i.event.special[h] || {}, h = (e ? c.delegateType : c.bindType) || h, c = i.event.special[h] || {}, a = i.extend({
					type: h,
					origType: g,
					data: f,
					handler: u,
					guid: u.guid,
					selector: e,
					needsContext: e && i.expr.match.needsContext.test(e),
					namespace: d.join(".")
				}, w), (v = p[h]) || (v = p[h] = [], v.delegateCount = 0, c.setup && c.setup.call(n, f, d, l) !== !1 || (n.addEventListener ? n.addEventListener(h, l, !1) : n.attachEvent && n.attachEvent("on" + h, l))), c.add && (c.add.call(n, a), a.handler.guid || (a.handler.guid = u.guid)), e ? v.splice(v.delegateCount++, 0, a) : v.push(a), i.event.global[h] = !0);
				n = null
			}
		},
		remove: function(n, t, r, u, f) {
			var y, o, h, b, p, a, c, l, e, w, k, v = i.hasData(n) && i._data(n);
			if (v && (a = v.events)) {
				for (t = (t || "").match(s) || [""], p = t.length; p--;) if (h = hr.exec(t[p]) || [], e = k = h[1], w = (h[2] || "").split(".").sort(), e) {
					for (c = i.event.special[e] || {}, e = (u ? c.delegateType : c.bindType) || e, l = a[e] || [], h = h[2] && RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"), b = y = l.length; y--;) o = l[y], !f && k !== o.origType || r && r.guid !== o.guid || h && !h.test(o.namespace) || u && u !== o.selector && ("**" !== u || !o.selector) || (l.splice(y, 1), o.selector && l.delegateCount--, c.remove && c.remove.call(n, o));
					b && !l.length && (c.teardown && c.teardown.call(n, w, v.handle) !== !1 || i.removeEvent(n, e, v.handle), delete a[e])
				} else for (e in a) i.event.remove(n, e + t[p], r, u, !0);
				i.isEmptyObject(a) && (delete v.handle, i._removeData(n, "events"))
			}
		},
		trigger: function(u, f, e, o) {
			var a, v, s, w, l, c, b, p = [e || r],
				h = k.call(u, "type") ? u.type : u,
				y = k.call(u, "namespace") ? u.namespace.split(".") : [];
			if (s = c = e = e || r, 3 !== e.nodeType && 8 !== e.nodeType && !sr.test(h + i.event.triggered) && (h.indexOf(".") >= 0 && (y = h.split("."), h = y.shift(), y.sort()), v = 0 > h.indexOf(":") && "on" + h, u = u[i.expando] ? u : new i.Event(h, "object" == typeof u && u), u.isTrigger = o ? 2 : 3, u.namespace = y.join("."), u.namespace_re = u.namespace ? RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, u.result = t, u.target || (u.target = e), f = null == f ? [u] : i.makeArray(f, [u]), l = i.event.special[h] || {}, o || !l.trigger || l.trigger.apply(e, f) !== !1)) {
				if (!o && !l.noBubble && !i.isWindow(e)) {
					for (w = l.delegateType || h, sr.test(w + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
					c === (e.ownerDocument || r) && p.push(c.defaultView || c.parentWindow || n)
				}
				for (b = 0;
				(s = p[b++]) && !u.isPropagationStopped();) u.type = b > 1 ? w : l.bindType || h, a = (i._data(s, "events") || {})[u.type] && i._data(s, "handle"), a && a.apply(s, f), a = v && s[v], a && i.acceptData(s) && a.apply && a.apply(s, f) === !1 && u.preventDefault();
				if (u.type = h, !o && !u.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), f) === !1) && i.acceptData(e) && v && e[h] && !i.isWindow(e)) {
					c = e[v];
					c && (e[v] = null);
					i.event.triggered = h;
					try {
						e[h]()
					} catch (d) {}
					i.event.triggered = t;
					c && (e[v] = c)
				}
				return u.result
			}
		},
		dispatch: function(n) {
			n = i.event.fix(n);
			var o, e, r, u, s, h = [],
				c = l.call(arguments),
				a = (i._data(this, "events") || {})[n.type] || [],
				f = i.event.special[n.type] || {};
			if (c[0] = n, n.delegateTarget = this, !f.preDispatch || f.preDispatch.call(this, n) !== !1) {
				for (h = i.event.handlers.call(this, n, a), o = 0;
				(u = h[o++]) && !n.isPropagationStopped();) for (n.currentTarget = u.elem, s = 0;
				(r = u.handlers[s++]) && !n.isImmediatePropagationStopped();)(!n.namespace_re || n.namespace_re.test(r.namespace)) && (n.handleObj = r, n.data = r.data, e = ((i.event.special[r.origType] || {}).handle || r.handler).apply(u.elem, c), e !== t && (n.result = e) === !1 && (n.preventDefault(), n.stopPropagation()));
				return f.postDispatch && f.postDispatch.call(this, n), n.result
			}
		},
		handlers: function(n, r) {
			var e, o, f, s, c = [],
				h = r.delegateCount,
				u = n.target;
			if (h && u.nodeType && (!n.button || "click" !== n.type)) for (; u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== n.type)) {
				for (f = [], s = 0; h > s; s++) o = r[s], e = o.selector + " ", f[e] === t && (f[e] = o.needsContext ? i(e, this).index(u) >= 0 : i.find(e, this, null, [u]).length), f[e] && f.push(o);
				f.length && c.push({
					elem: u,
					handlers: f
				})
			}
			return r.length > h && c.push({
				elem: this,
				handlers: r.slice(h)
			}), c
		},
		fix: function(n) {
			if (n[i.expando]) return n;
			var e, o, s, u = n.type,
				f = n,
				t = this.fixHooks[u];
			for (t || (this.fixHooks[u] = t = ee.test(u) ? this.mouseHooks : fe.test(u) ? this.keyHooks : {}), s = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(f), e = s.length; e--;) o = s[e], n[o] = f[o];
			return n.target || (n.target = f.srcElement || r), 3 === n.target.nodeType && (n.target = n.target.parentNode), n.metaKey = !! n.metaKey, t.filter ? t.filter(n, f) : n
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(n, t) {
				return null == n.which && (n.which = null != t.charCode ? t.charCode : t.keyCode), n
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(n, i) {
				var u, o, f, e = i.button,
					s = i.fromElement;
				return null == n.pageX && null != i.clientX && (o = n.target.ownerDocument || r, f = o.documentElement, u = o.body, n.pageX = i.clientX + (f && f.scrollLeft || u && u.scrollLeft || 0) - (f && f.clientLeft || u && u.clientLeft || 0), n.pageY = i.clientY + (f && f.scrollTop || u && u.scrollTop || 0) - (f && f.clientTop || u && u.clientTop || 0)), !n.relatedTarget && s && (n.relatedTarget = s === n.target ? i.toElement : s), n.which || e === t || (n.which = 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0), n
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== cr() && this.focus) try {
						return this.focus(), !1
					} catch (n) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === cr() && this.blur ? (this.blur(), !1) : t
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					return i.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
				},
				_default: function(n) {
					return i.nodeName(n.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(n) {
					n.result !== t && (n.originalEvent.returnValue = n.result)
				}
			}
		},
		simulate: function(n, t, r, u) {
			var f = i.extend(new i.Event, r, {
				type: n,
				isSimulated: !0,
				originalEvent: {}
			});
			u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f);
			f.isDefaultPrevented() && r.preventDefault()
		}
	};
	i.removeEvent = r.removeEventListener ?
	function(n, t, i) {
		n.removeEventListener && n.removeEventListener(t, i, !1)
	} : function(n, t, i) {
		var r = "on" + t;
		n.detachEvent && (typeof n[r] === o && (n[r] = null), n.detachEvent(r, i))
	};
	i.Event = function(n, r) {
		return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || n.returnValue === !1 || n.getPreventDefault && n.getPreventDefault() ? ct : g) : this.type = n, r && i.extend(this, r), this.timeStamp = n && n.timeStamp || i.now(), this[i.expando] = !0, t) : new i.Event(n, r)
	};
	i.Event.prototype = {
		isDefaultPrevented: g,
		isPropagationStopped: g,
		isImmediatePropagationStopped: g,
		preventDefault: function() {
			var n = this.originalEvent;
			this.isDefaultPrevented = ct;
			n && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
		},
		stopPropagation: function() {
			var n = this.originalEvent;
			this.isPropagationStopped = ct;
			n && (n.stopPropagation && n.stopPropagation(), n.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = ct;
			this.stopPropagation()
		}
	};
	i.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(n, t) {
		i.event.special[n] = {
			delegateType: t,
			bindType: t,
			handle: function(n) {
				var u, f = this,
					r = n.relatedTarget,
					e = n.handleObj;
				return (!r || r !== f && !i.contains(f, r)) && (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
			}
		}
	});
	i.support.submitBubbles || (i.event.special.submit = {
		setup: function() {
			return i.nodeName(this, "form") ? !1 : (i.event.add(this, "click._submit keypress._submit", function(n) {
				var u = n.target,
					r = i.nodeName(u, "input") || i.nodeName(u, "button") ? u.form : t;
				r && !i._data(r, "submitBubbles") && (i.event.add(r, "submit._submit", function(n) {
					n._submit_bubble = !0
				}), i._data(r, "submitBubbles", !0))
			}), t)
		},
		postDispatch: function(n) {
			n._submit_bubble && (delete n._submit_bubble, this.parentNode && !n.isTrigger && i.event.simulate("submit", this.parentNode, n, !0))
		},
		teardown: function() {
			return i.nodeName(this, "form") ? !1 : (i.event.remove(this, "._submit"), t)
		}
	});
	i.support.changeBubbles || (i.event.special.change = {
		setup: function() {
			return ui.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (i.event.add(this, "propertychange._change", function(n) {
				"checked" === n.originalEvent.propertyName && (this._just_changed = !0)
			}), i.event.add(this, "click._change", function(n) {
				this._just_changed && !n.isTrigger && (this._just_changed = !1);
				i.event.simulate("change", this, n, !0)
			})), !1) : (i.event.add(this, "beforeactivate._change", function(n) {
				var t = n.target;
				ui.test(t.nodeName) && !i._data(t, "changeBubbles") && (i.event.add(t, "change._change", function(n) {
					!this.parentNode || n.isSimulated || n.isTrigger || i.event.simulate("change", this.parentNode, n, !0)
				}), i._data(t, "changeBubbles", !0))
			}), t)
		},
		handle: function(n) {
			var i = n.target;
			return this !== i || n.isSimulated || n.isTrigger || "radio" !== i.type && "checkbox" !== i.type ? n.handleObj.handler.apply(this, arguments) : t
		},
		teardown: function() {
			return i.event.remove(this, "._change"), !ui.test(this.nodeName)
		}
	});
	i.support.focusinBubbles || i.each({
		focus: "focusin",
		blur: "focusout"
	}, function(n, t) {
		var u = 0,
			f = function(n) {
				i.event.simulate(t, n.target, i.event.fix(n), !0)
			};
		i.event.special[t] = {
			setup: function() {
				0 == u++ && r.addEventListener(n, f, !0)
			},
			teardown: function() {
				0 == --u && r.removeEventListener(n, f, !0)
			}
		}
	});
	i.fn.extend({
		on: function(n, r, u, f, e) {
			var s, o;
			if ("object" == typeof n) {
				"string" != typeof r && (u = u || r, r = t);
				for (s in n) this.on(s, r, u, n[s], e);
				return this
			}
			if (null == u && null == f ? (f = r, u = r = t) : null == f && ("string" == typeof r ? (f = u, u = t) : (f = u, u = r, r = t)), f === !1) f = g;
			else if (!f) return this;
			return 1 === e && (o = f, f = function(n) {
				return i().off(n), o.apply(this, arguments)
			}, f.guid = o.guid || (o.guid = i.guid++)), this.each(function() {
				i.event.add(this, n, f, u, r)
			})
		},
		one: function(n, t, i, r) {
			return this.on(n, t, i, r, 1)
		},
		off: function(n, r, u) {
			var f, e;
			if (n && n.preventDefault && n.handleObj) return f = n.handleObj, i(n.delegateTarget).off(f.namespace ? f.origType + "." + f.namespace : f.origType, f.selector, f.handler), this;
			if ("object" == typeof n) {
				for (e in n) this.off(e, r, n[e]);
				return this
			}
			return (r === !1 || "function" == typeof r) && (u = r, r = t), u === !1 && (u = g), this.each(function() {
				i.event.remove(this, n, u, r)
			})
		},
		trigger: function(n, t) {
			return this.each(function() {
				i.event.trigger(n, t, this)
			})
		},
		triggerHandler: function(n, r) {
			var u = this[0];
			return u ? i.event.trigger(n, r, u, !0) : t
		}
	});
	var oe = /^.[^:#\[\.,]*$/,
		se = /^(?:parents|prev(?:Until|All))/,
		lr = i.expr.match.needsContext,
		he = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	i.fn.extend({
		find: function(n) {
			var t, r = [],
				u = this,
				f = u.length;
			if ("string" != typeof n) return this.pushStack(i(n).filter(function() {
				for (t = 0; f > t; t++) if (i.contains(u[t], this)) return !0
			}));
			for (t = 0; f > t; t++) i.find(n, u[t], r);
			return r = this.pushStack(f > 1 ? i.unique(r) : r), r.selector = this.selector ? this.selector + " " + n : n, r
		},
		has: function(n) {
			var t, r = i(n, this),
				u = r.length;
			return this.filter(function() {
				for (t = 0; u > t; t++) if (i.contains(this, r[t])) return !0
			})
		},
		not: function(n) {
			return this.pushStack(fi(this, n || [], !0))
		},
		filter: function(n) {
			return this.pushStack(fi(this, n || [], !1))
		},
		is: function(n) {
			return !!fi(this, "string" == typeof n && lr.test(n) ? i(n) : n || [], !1).length
		},
		closest: function(n, t) {
			for (var r, f = 0, o = this.length, u = [], e = lr.test(n) || "string" != typeof n ? i(n, t || this.context) : 0; o > f; f++) for (r = this[f]; r && r !== t; r = r.parentNode) if (11 > r.nodeType && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
				r = u.push(r);
				break
			}
			return this.pushStack(u.length > 1 ? i.unique(u) : u)
		},
		index: function(n) {
			return n ? "string" == typeof n ? i.inArray(this[0], i(n)) : i.inArray(n.jquery ? n[0] : n, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(n, t) {
			var r = "string" == typeof n ? i(n, t) : i.makeArray(n && n.nodeType ? [n] : n),
				u = i.merge(this.get(), r);
			return this.pushStack(i.unique(u))
		},
		addBack: function(n) {
			return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
		}
	});
	i.each({
		parent: function(n) {
			var t = n.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(n) {
			return i.dir(n, "parentNode")
		},
		parentsUntil: function(n, t, r) {
			return i.dir(n, "parentNode", r)
		},
		next: function(n) {
			return ar(n, "nextSibling")
		},
		prev: function(n) {
			return ar(n, "previousSibling")
		},
		nextAll: function(n) {
			return i.dir(n, "nextSibling")
		},
		prevAll: function(n) {
			return i.dir(n, "previousSibling")
		},
		nextUntil: function(n, t, r) {
			return i.dir(n, "nextSibling", r)
		},
		prevUntil: function(n, t, r) {
			return i.dir(n, "previousSibling", r)
		},
		siblings: function(n) {
			return i.sibling((n.parentNode || {}).firstChild, n)
		},
		children: function(n) {
			return i.sibling(n.firstChild)
		},
		contents: function(n) {
			return i.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : i.merge([], n.childNodes)
		}
	}, function(n, t) {
		i.fn[n] = function(r, u) {
			var f = i.map(this, t, r);
			return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), this.length > 1 && (he[n] || (f = i.unique(f)), se.test(n) && (f = f.reverse())), this.pushStack(f)
		}
	});
	i.extend({
		filter: function(n, t, r) {
			var u = t[0];
			return r && (n = ":not(" + n + ")"), 1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function(n) {
				return 1 === n.nodeType
			}))
		},
		dir: function(n, r, u) {
			for (var e = [], f = n[r]; f && 9 !== f.nodeType && (u === t || 1 !== f.nodeType || !i(f).is(u));) 1 === f.nodeType && e.push(f), f = f[r];
			return e
		},
		sibling: function(n, t) {
			for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
			return i
		}
	});
	var yr = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		ce = / jQuery\d+="(?:null|\d+)"/g,
		pr = RegExp("<(?:" + yr + ")[\\s/>]", "i"),
		ei = /^\s+/,
		wr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		br = /<([\w:]+)/,
		kr = /<tbody/i,
		le = /<|&#?\w+;/,
		ae = /<(?:script|style|link)/i,
		oi = /^(?:checkbox|radio)$/i,
		ve = /checked\s*(?:[^=]|=\s*.checked.)/i,
		dr = /^$|\/(?:java|ecma)script/i,
		ye = /^true\/(.*)/,
		pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		e = {
			option: [1, "<select multiple='multiple'>", "<\/select>"],
			legend: [1, "<fieldset>", "<\/fieldset>"],
			area: [1, "<map>", "<\/map>"],
			param: [1, "<object>", "<\/object>"],
			thead: [1, "<table>", "<\/table>"],
			tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
			col: [2, "<table><tbody><\/tbody><colgroup>", "<\/colgroup><\/table>"],
			td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
			_default: i.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "<\/div>"]
		},
		we = vr(r),
		si = we.appendChild(r.createElement("div"));
	e.optgroup = e.option;
	e.tbody = e.tfoot = e.colgroup = e.caption = e.thead;
	e.th = e.td;
	i.fn.extend({
		text: function(n) {
			return i.access(this, function(n) {
				return n === t ? i.text(this) : this.empty().append((this[0] && this[0].ownerDocument || r).createTextNode(n))
			}, null, n, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(n) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = gr(this, n);
					t.appendChild(n)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(n) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = gr(this, n);
					t.insertBefore(n, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(n) {
				this.parentNode && this.parentNode.insertBefore(n, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(n) {
				this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
			})
		},
		remove: function(n, t) {
			for (var r, e = n ? i.filter(n, this) : this, f = 0; null != (r = e[f]); f++) t || 1 !== r.nodeType || i.cleanData(u(r)), r.parentNode && (t && i.contains(r.ownerDocument, r) && hi(u(r, "script")), r.parentNode.removeChild(r));
			return this
		},
		empty: function() {
			for (var n, t = 0; null != (n = this[t]); t++) {
				for (1 === n.nodeType && i.cleanData(u(n, !1)); n.firstChild;) n.removeChild(n.firstChild);
				n.options && i.nodeName(n, "select") && (n.options.length = 0)
			}
			return this
		},
		clone: function(n, t) {
			return n = null == n ? !1 : n, t = null == t ? n : t, this.map(function() {
				return i.clone(this, n, t)
			})
		},
		html: function(n) {
			return i.access(this, function(n) {
				var r = this[0] || {},
					f = 0,
					o = this.length;
				if (n === t) return 1 === r.nodeType ? r.innerHTML.replace(ce, "") : t;
				if (!("string" != typeof n || ae.test(n) || !i.support.htmlSerialize && pr.test(n) || !i.support.leadingWhitespace && ei.test(n) || e[(br.exec(n) || ["", ""])[1].toLowerCase()])) {
					n = n.replace(wr, "<$1><\/$2>");
					try {
						for (; o > f; f++) r = this[f] || {}, 1 === r.nodeType && (i.cleanData(u(r, !1)), r.innerHTML = n);
						r = 0
					} catch (s) {}
				}
				r && this.empty().append(n)
			}, null, n, arguments.length)
		},
		replaceWith: function() {
			var t = i.map(this, function(n) {
				return [n.nextSibling, n.parentNode]
			}),
				n = 0;
			return this.domManip(arguments, function(r) {
				var u = t[n++],
					f = t[n++];
				f && (u && u.parentNode !== f && (u = this.nextSibling), i(this).remove(), f.insertBefore(r, u))
			}, !0), n ? this : this.remove()
		},
		detach: function(n) {
			return this.remove(n, !0)
		},
		domManip: function(n, t, r) {
			n = di.apply([], n);
			var h, f, c, o, v, s, e = 0,
				l = this.length,
				p = this,
				w = l - 1,
				a = n[0],
				y = i.isFunction(a);
			if (y || !(1 >= l || "string" != typeof a || i.support.checkClone) && ve.test(a)) return this.each(function(i) {
				var u = p.eq(i);
				y && (n[0] = a.call(this, i, u.html()));
				u.domManip(n, t, r)
			});
			if (l && (s = i.buildFragment(n, this[0].ownerDocument, !1, !r && this), h = s.firstChild, 1 === s.childNodes.length && (s = h), h)) {
				for (o = i.map(u(s, "script"), nu), c = o.length; l > e; e++) f = s, e !== w && (f = i.clone(f, !0, !0), c && i.merge(o, u(f, "script"))), t.call(this[e], f, e);
				if (c) for (v = o[o.length - 1].ownerDocument, i.map(o, tu), e = 0; c > e; e++) f = o[e], dr.test(f.type || "") && !i._data(f, "globalEval") && i.contains(v, f) && (f.src ? i._evalUrl(f.src) : i.globalEval((f.text || f.textContent || f.innerHTML || "").replace(pe, "")));
				s = h = null
			}
			return this
		}
	});
	i.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(n, t) {
		i.fn[n] = function(n) {
			for (var u, r = 0, f = [], e = i(n), o = e.length - 1; o >= r; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), kt.apply(f, u.get());
			return this.pushStack(f)
		}
	});
	i.extend({
		clone: function(n, t, r) {
			var f, h, o, e, s, c = i.contains(n.ownerDocument, n);
			if (i.support.html5Clone || i.isXMLDoc(n) || !pr.test("<" + n.nodeName + ">") ? o = n.cloneNode(!0) : (si.innerHTML = n.outerHTML, si.removeChild(o = si.firstChild)), !(i.support.noCloneEvent && i.support.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n))) for (f = u(o), s = u(n), e = 0; null != (h = s[e]); ++e) f[e] && be(h, f[e]);
			if (t) if (r) for (s = s || u(n), f = f || u(o), e = 0; null != (h = s[e]); e++) iu(h, f[e]);
			else iu(n, o);
			return f = u(o, "script"), f.length > 0 && hi(f, !c && u(n, "script")), f = s = h = null, o
		},
		buildFragment: function(n, t, r, f) {
			for (var h, o, w, s, y, p, l, b = n.length, a = vr(t), c = [], v = 0; b > v; v++) if (o = n[v], o || 0 === o) if ("object" === i.type(o)) i.merge(c, o.nodeType ? [o] : o);
			else if (le.test(o)) {
				for (s = s || a.appendChild(t.createElement("div")), y = (br.exec(o) || ["", ""])[1].toLowerCase(), l = e[y] || e._default, s.innerHTML = l[1] + o.replace(wr, "<$1><\/$2>") + l[2], h = l[0]; h--;) s = s.lastChild;
				if (!i.support.leadingWhitespace && ei.test(o) && c.push(t.createTextNode(ei.exec(o)[0])), !i.support.tbody) for (o = "table" !== y || kr.test(o) ? "<table>" !== l[1] || kr.test(o) ? 0 : s : s.firstChild, h = o && o.childNodes.length; h--;) i.nodeName(p = o.childNodes[h], "tbody") && !p.childNodes.length && o.removeChild(p);
				for (i.merge(c, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
				s = a.lastChild
			} else c.push(t.createTextNode(o));
			for (s && a.removeChild(s), i.support.appendChecked || i.grep(u(c, "input"), ke), v = 0; o = c[v++];) if ((!f || -1 === i.inArray(o, f)) && (w = i.contains(o.ownerDocument, o), s = u(a.appendChild(o), "script"), w && hi(s), r)) for (h = 0; o = s[h++];) dr.test(o.type || "") && r.push(o);
			return s = null, a
		},
		cleanData: function(n, t) {
			for (var r, f, u, e, c = 0, s = i.expando, h = i.cache, l = i.support.deleteExpando, a = i.event.special; null != (r = n[c]); c++) if ((t || i.acceptData(r)) && (u = r[s], e = u && h[u])) {
				if (e.events) for (f in e.events) a[f] ? i.event.remove(r, f) : i.removeEvent(r, f, e.handle);
				h[u] && (delete h[u], l ? delete r[s] : typeof r.removeAttribute !== o ? r.removeAttribute(s) : r[s] = null, b.push(u))
			}
		},
		_evalUrl: function(n) {
			return i.ajax({
				url: n,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				throws: !0
			})
		}
	});
	i.fn.extend({
		wrapAll: function(n) {
			if (i.isFunction(n)) return this.each(function(t) {
				i(this).wrapAll(n.call(this, t))
			});
			if (this[0]) {
				var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]);
				t.map(function() {
					for (var n = this; n.firstChild && 1 === n.firstChild.nodeType;) n = n.firstChild;
					return n
				}).append(this)
			}
			return this
		},
		wrapInner: function(n) {
			return i.isFunction(n) ? this.each(function(t) {
				i(this).wrapInner(n.call(this, t))
			}) : this.each(function() {
				var t = i(this),
					r = t.contents();
				r.length ? r.wrapAll(n) : t.append(n)
			})
		},
		wrap: function(n) {
			var t = i.isFunction(n);
			return this.each(function(r) {
				i(this).wrapAll(t ? n.call(this, r) : n)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	var rt, v, y, ci = /alpha\([^)]*\)/i,
		de = /opacity\s*=\s*([^)]*)/,
		ge = /^(top|right|bottom|left)$/,
		no = /^(none|table(?!-c[ea]).+)/,
		ru = /^margin/,
		to = RegExp("^(" + st + ")(.*)$", "i"),
		lt = RegExp("^(" + st + ")(?!px)[a-z%]+$", "i"),
		io = RegExp("^([+-])=(" + st + ")", "i"),
		uu = {
			BODY: "block"
		},
		ro = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		fu = {
			letterSpacing: 0,
			fontWeight: 400
		},
		p = ["Top", "Right", "Bottom", "Left"],
		eu = ["Webkit", "O", "Moz", "ms"];
	i.fn.extend({
		css: function(n, r) {
			return i.access(this, function(n, r, u) {
				var e, o, s = {},
					f = 0;
				if (i.isArray(r)) {
					for (o = v(n), e = r.length; e > f; f++) s[r[f]] = i.css(n, r[f], !1, o);
					return s
				}
				return u !== t ? i.style(n, r, u) : i.css(n, r)
			}, n, r, arguments.length > 1)
		},
		show: function() {
			return su(this, !0)
		},
		hide: function() {
			return su(this)
		},
		toggle: function(n) {
			return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function() {
				ut(this) ? i(this).show() : i(this).hide()
			})
		}
	});
	i.extend({
		cssHooks: {
			opacity: {
				get: function(n, t) {
					if (t) {
						var i = y(n, "opacity");
						return "" === i ? "1" : i
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: i.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(n, r, u, f) {
			if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
				var o, s, e, h = i.camelCase(r),
					c = n.style;
				if (r = i.cssProps[h] || (i.cssProps[h] = ou(c, h)), e = i.cssHooks[r] || i.cssHooks[h], u === t) return e && "get" in e && (o = e.get(n, !1, f)) !== t ? o : c[r];
				if (s = typeof u, "string" === s && (o = io.exec(u)) && (u = (o[1] + 1) * o[2] + parseFloat(i.css(n, r)), s = "number"), !(null == u || "number" === s && isNaN(u) || ("number" !== s || i.cssNumber[h] || (u += "px"), i.support.clearCloneStyle || "" !== u || 0 !== r.indexOf("background") || (c[r] = "inherit"), e && "set" in e && (u = e.set(n, u, f)) === t))) try {
					c[r] = u
				} catch (l) {}
			}
		},
		css: function(n, r, u, f) {
			var h, e, o, s = i.camelCase(r);
			return r = i.cssProps[s] || (i.cssProps[s] = ou(n.style, s)), o = i.cssHooks[r] || i.cssHooks[s], o && "get" in o && (e = o.get(n, !0, u)), e === t && (e = y(n, r, f)), "normal" === e && r in fu && (e = fu[r]), "" === u || u ? (h = parseFloat(e), u === !0 || i.isNumeric(h) ? h || 0 : e) : e
		}
	});
	n.getComputedStyle ? (v = function(t) {
		return n.getComputedStyle(t, null)
	}, y = function(n, r, u) {
		var s, h, c, o = u || v(n),
			e = o ? o.getPropertyValue(r) || o[r] : t,
			f = n.style;
		return o && ("" !== e || i.contains(n.ownerDocument, n) || (e = i.style(n, r)), lt.test(e) && ru.test(r) && (s = f.width, h = f.minWidth, c = f.maxWidth, f.minWidth = f.maxWidth = f.width = e, e = o.width, f.width = s, f.minWidth = h, f.maxWidth = c)), e
	}) : r.documentElement.currentStyle && (v = function(n) {
		return n.currentStyle
	}, y = function(n, i, r) {
		var s, e, o, h = r || v(n),
			u = h ? h[i] : t,
			f = n.style;
		return null == u && f && f[i] && (u = f[i]), lt.test(u) && !ge.test(i) && (s = f.left, e = n.runtimeStyle, o = e && e.left, o && (e.left = n.currentStyle.left), f.left = "fontSize" === i ? "1em" : u, u = f.pixelLeft + "px", f.left = s, o && (e.left = o)), "" === u ? "auto" : u
	});
	i.each(["height", "width"], function(n, r) {
		i.cssHooks[r] = {
			get: function(n, u, f) {
				return u ? 0 === n.offsetWidth && no.test(i.css(n, "display")) ? i.swap(n, ro, function() {
					return lu(n, r, f)
				}) : lu(n, r, f) : t
			},
			set: function(n, t, u) {
				var f = u && v(n);
				return hu(n, t, u ? cu(n, r, u, i.support.boxSizing && "border-box" === i.css(n, "boxSizing", !1, f), f) : 0)
			}
		}
	});
	i.support.opacity || (i.cssHooks.opacity = {
		get: function(n, t) {
			return de.test((t && n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(n, t) {
			var r = n.style,
				u = n.currentStyle,
				e = i.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				f = u && u.filter || r.filter || "";
			r.zoom = 1;
			(t >= 1 || "" === t) && "" === i.trim(f.replace(ci, "")) && r.removeAttribute && (r.removeAttribute("filter"), "" === t || u && !u.filter) || (r.filter = ci.test(f) ? f.replace(ci, e) : f + " " + e)
		}
	});
	i(function() {
		i.support.reliableMarginRight || (i.cssHooks.marginRight = {
			get: function(n, r) {
				return r ? i.swap(n, {
					display: "inline-block"
				}, y, [n, "marginRight"]) : t
			}
		});
		!i.support.pixelPosition && i.fn.position && i.each(["top", "left"], function(n, r) {
			i.cssHooks[r] = {
				get: function(n, u) {
					return u ? (u = y(n, r), lt.test(u) ? i(n).position()[r] + "px" : u) : t
				}
			}
		})
	});
	i.expr && i.expr.filters && (i.expr.filters.hidden = function(n) {
		return 0 >= n.offsetWidth && 0 >= n.offsetHeight || !i.support.reliableHiddenOffsets && "none" === (n.style && n.style.display || i.css(n, "display"))
	}, i.expr.filters.visible = function(n) {
		return !i.expr.filters.hidden(n)
	});
	i.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(n, t) {
		i.cssHooks[n + t] = {
			expand: function(i) {
				for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++) f[n + p[r] + t] = u[r] || u[r - 2] || u[0];
				return f
			}
		};
		ru.test(n) || (i.cssHooks[n + t].set = hu)
	});
	var uo = /%20/g,
		fo = /\[\]$/,
		yu = /\r?\n/g,
		eo = /^(?:submit|button|image|reset|file)$/i,
		oo = /^(?:input|select|textarea|keygen)/i;
	i.fn.extend({
		serialize: function() {
			return i.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var n = i.prop(this, "elements");
				return n ? i.makeArray(n) : this
			}).filter(function() {
				var n = this.type;
				return this.name && !i(this).is(":disabled") && oo.test(this.nodeName) && !eo.test(n) && (this.checked || !oi.test(n))
			}).map(function(n, t) {
				var r = i(this).val();
				return null == r ? null : i.isArray(r) ? i.map(r, function(n) {
					return {
						name: t.name,
						value: n.replace(yu, "\r\n")
					}
				}) : {
					name: t.name,
					value: r.replace(yu, "\r\n")
				}
			}).get()
		}
	});
	i.param = function(n, r) {
		var u, f = [],
			e = function(n, t) {
				t = i.isFunction(t) ? t() : null == t ? "" : t;
				f[f.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
			};
		if (r === t && (r = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function() {
			e(this.name, this.value)
		});
		else for (u in n) li(u, n[u], r, e);
		return f.join("&").replace(uo, "+")
	};
	i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, t) {
		i.fn[t] = function(n, i) {
			return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
		}
	});
	i.fn.extend({
		hover: function(n, t) {
			return this.mouseenter(n).mouseleave(t || n)
		},
		bind: function(n, t, i) {
			return this.on(n, null, t, i)
		},
		unbind: function(n, t) {
			return this.off(n, null, t)
		},
		delegate: function(n, t, i, r) {
			return this.on(t, n, i, r)
		},
		undelegate: function(n, t, i) {
			return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
		}
	});
	var w, c, ai = i.now(),
		vi = /\?/,
		so = /#.*$/,
		pu = /([?&])_=[^&]*/,
		ho = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		co = /^(?:GET|HEAD)$/,
		lo = /^\/\//,
		wu = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		bu = i.fn.load,
		ku = {},
		yi = {},
		du = "*/".concat("*");
	try {
		c = hf.href
	} catch (go) {
		c = r.createElement("a");
		c.href = "";
		c = c.href
	}
	w = wu.exec(c.toLowerCase()) || [];
	i.fn.load = function(n, r, u) {
		if ("string" != typeof n && bu) return bu.apply(this, arguments);
		var f, s, h, e = this,
			o = n.indexOf(" ");
		return o >= 0 && (f = n.slice(o, n.length), n = n.slice(0, o)), i.isFunction(r) ? (u = r, r = t) : r && "object" == typeof r && (h = "POST"), e.length > 0 && i.ajax({
			url: n,
			type: h,
			dataType: "html",
			data: r
		}).done(function(n) {
			s = arguments;
			e.html(f ? i("<div>").append(i.parseHTML(n)).find(f) : n)
		}).complete(u &&
		function(n, t) {
			e.each(u, s || [n.responseText, t, n])
		}), this
	};
	i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
		i.fn[t] = function(n) {
			return this.on(t, n)
		}
	});
	i.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: c,
			type: "GET",
			isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(w[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": du,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": i.parseJSON,
				"text xml": i.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(n, t) {
			return t ? pi(pi(n, i.ajaxSettings), t) : pi(i.ajaxSettings, n)
		},
		ajaxPrefilter: gu(ku),
		ajaxTransport: gu(yi),
		ajax: function(n, r) {
			function k(n, r, s, c) {
				var a, rt, k, p, w, l = r;
				2 !== o && (o = 2, g && clearTimeout(g), y = t, d = c || "", f.readyState = n > 0 ? 4 : 0, a = n >= 200 && 300 > n || 304 === n, s && (p = ao(u, f, s)), p = vo(u, p, f, a), a ? (u.ifModified && (w = f.getResponseHeader("Last-Modified"), w && (i.lastModified[e] = w), w = f.getResponseHeader("etag"), w && (i.etag[e] = w)), 204 === n || "HEAD" === u.type ? l = "nocontent" : 304 === n ? l = "notmodified" : (l = p.state, rt = p.data, k = p.error, a = !k)) : (k = l, (n || !l) && (l = "error", 0 > n && (n = 0))), f.status = n, f.statusText = (r || l) + "", a ? tt.resolveWith(h, [rt, l, f]) : tt.rejectWith(h, [f, l, k]), f.statusCode(b), b = t, v && nt.trigger(a ? "ajaxSuccess" : "ajaxError", [f, u, a ? rt : k]), it.fireWith(h, [f, l]), v && (nt.trigger("ajaxComplete", [f, u]), --i.active || i.event.trigger("ajaxStop")))
			}
			"object" == typeof n && (r = n, n = t);
			r = r || {};
			var l, a, e, d, g, v, y, p, u = i.ajaxSetup({}, r),
				h = u.context || u,
				nt = u.context && (h.nodeType || h.jquery) ? i(h) : i.event,
				tt = i.Deferred(),
				it = i.Callbacks("once memory"),
				b = u.statusCode || {},
				rt = {},
				ut = {},
				o = 0,
				ft = "canceled",
				f = {
					readyState: 0,
					getResponseHeader: function(n) {
						var t;
						if (2 === o) {
							if (!p) for (p = {}; t = ho.exec(d);) p[t[1].toLowerCase()] = t[2];
							t = p[n.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === o ? d : null
					},
					setRequestHeader: function(n, t) {
						var i = n.toLowerCase();
						return o || (n = ut[i] = ut[i] || n, rt[n] = t), this
					},
					overrideMimeType: function(n) {
						return o || (u.mimeType = n), this
					},
					statusCode: function(n) {
						var t;
						if (n) if (2 > o) for (t in n) b[t] = [b[t], n[t]];
						else f.always(n[f.status]);
						return this
					},
					abort: function(n) {
						var t = n || ft;
						return y && y.abort(t), k(0, t), this
					}
				};
			if (tt.promise(f).complete = it.add, f.success = f.done, f.error = f.fail, u.url = ((n || u.url || c) + "").replace(so, "").replace(lo, w[1] + "//"), u.type = r.method || r.type || u.method || u.type, u.dataTypes = i.trim(u.dataType || "*").toLowerCase().match(s) || [""], null == u.crossDomain && (l = wu.exec(u.url.toLowerCase()), u.crossDomain = !(!l || l[1] === w[1] && l[2] === w[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (w[3] || ("http:" === w[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = i.param(u.data, u.traditional)), nf(ku, u, r, f), 2 === o) return f;
			v = u.global;
			v && 0 == i.active++ && i.event.trigger("ajaxStart");
			u.type = u.type.toUpperCase();
			u.hasContent = !co.test(u.type);
			e = u.url;
			u.hasContent || (u.data && (e = u.url += (vi.test(e) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = pu.test(e) ? e.replace(pu, "$1_=" + ai++) : e + (vi.test(e) ? "&" : "?") + "_=" + ai++));
			u.ifModified && (i.lastModified[e] && f.setRequestHeader("If-Modified-Since", i.lastModified[e]), i.etag[e] && f.setRequestHeader("If-None-Match", i.etag[e]));
			(u.data && u.hasContent && u.contentType !== !1 || r.contentType) && f.setRequestHeader("Content-Type", u.contentType);
			f.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + du + "; q=0.01" : "") : u.accepts["*"]);
			for (a in u.headers) f.setRequestHeader(a, u.headers[a]);
			if (u.beforeSend && (u.beforeSend.call(h, f, u) === !1 || 2 === o)) return f.abort();
			ft = "abort";
			for (a in {
				success: 1,
				error: 1,
				complete: 1
			}) f[a](u[a]);
			if (y = nf(yi, u, r, f)) {
				f.readyState = 1;
				v && nt.trigger("ajaxSend", [f, u]);
				u.async && u.timeout > 0 && (g = setTimeout(function() {
					f.abort("timeout")
				}, u.timeout));
				try {
					o = 1;
					y.send(rt, k)
				} catch (et) {
					if (!(2 > o)) throw et;
					k(-1, et)
				}
			} else k(-1, "No Transport");
			return f
		},
		getJSON: function(n, t, r) {
			return i.get(n, t, r, "json")
		},
		getScript: function(n, r) {
			return i.get(n, t, r, "script")
		}
	});
	i.each(["get", "post"], function(n, r) {
		i[r] = function(n, u, f, e) {
			return i.isFunction(u) && (e = e || f, f = u, u = t), i.ajax({
				url: n,
				type: r,
				dataType: e,
				data: u,
				success: f
			})
		}
	});
	i.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(n) {
				return i.globalEval(n), n
			}
		}
	});
	i.ajaxPrefilter("script", function(n) {
		n.cache === t && (n.cache = !1);
		n.crossDomain && (n.type = "GET", n.global = !1)
	});
	i.ajaxTransport("script", function(n) {
		if (n.crossDomain) {
			var u, f = r.head || i("head")[0] || r.documentElement;
			return {
				send: function(t, i) {
					u = r.createElement("script");
					u.async = !0;
					n.scriptCharset && (u.charset = n.scriptCharset);
					u.src = n.url;
					u.onload = u.onreadystatechange = function(n, t) {
						(t || !u.readyState || /loaded|complete/.test(u.readyState)) && (u.onload = u.onreadystatechange = null, u.parentNode && u.parentNode.removeChild(u), u = null, t || i(200, "success"))
					};
					f.insertBefore(u, f.firstChild)
				},
				abort: function() {
					u && u.onload(t, !0)
				}
			}
		}
	});
	wi = [];
	at = /(=)\?(?=&|$)|\?\?/;
	i.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var n = wi.pop() || i.expando + "_" + ai++;
			return this[n] = !0, n
		}
	});
	i.ajaxPrefilter("json jsonp", function(r, u, f) {
		var e, s, o, h = r.jsonp !== !1 && (at.test(r.url) ? "url" : "string" == typeof r.data && !(r.contentType || "").indexOf("application/x-www-form-urlencoded") && at.test(r.data) && "data");
		return h || "jsonp" === r.dataTypes[0] ? (e = r.jsonpCallback = i.isFunction(r.jsonpCallback) ? r.jsonpCallback() : r.jsonpCallback, h ? r[h] = r[h].replace(at, "$1" + e) : r.jsonp !== !1 && (r.url += (vi.test(r.url) ? "&" : "?") + r.jsonp + "=" + e), r.converters["script json"] = function() {
			return o || i.error(e + " was not called"), o[0]
		}, r.dataTypes[0] = "json", s = n[e], n[e] = function() {
			o = arguments
		}, f.always(function() {
			n[e] = s;
			r[e] && (r.jsonpCallback = u.jsonpCallback, wi.push(e));
			o && i.isFunction(s) && s(o[0]);
			o = s = t
		}), "script") : t
	});
	tf = 0;
	vt = n.ActiveXObject &&
	function() {
		var n;
		for (n in nt) nt[n](t, !0)
	};
	i.ajaxSettings.xhr = n.ActiveXObject ?
	function() {
		return !this.isLocal && rf() || yo()
	} : rf;
	tt = i.ajaxSettings.xhr();
	i.support.cors = !! tt && "withCredentials" in tt;
	tt = i.support.ajax = !! tt;
	tt && i.ajaxTransport(function(r) {
		if (!r.crossDomain || i.support.cors) {
			var u;
			return {
				send: function(f, e) {
					var h, s, o = r.xhr();
					if (r.username ? o.open(r.type, r.url, r.async, r.username, r.password) : o.open(r.type, r.url, r.async), r.xhrFields) for (s in r.xhrFields) o[s] = r.xhrFields[s];
					r.mimeType && o.overrideMimeType && o.overrideMimeType(r.mimeType);
					r.crossDomain || f["X-Requested-With"] || (f["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in f) o.setRequestHeader(s, f[s])
					} catch (c) {}
					o.send(r.hasContent && r.data || null);
					u = function(n, f) {
						var s, a, l, c;
						try {
							if (u && (f || 4 === o.readyState)) if (u = t, h && (o.onreadystatechange = i.noop, vt && delete nt[h]), f) 4 !== o.readyState && o.abort();
							else {
								c = {};
								s = o.status;
								a = o.getAllResponseHeaders();
								"string" == typeof o.responseText && (c.text = o.responseText);
								try {
									l = o.statusText
								} catch (y) {
									l = ""
								}
								s || !r.isLocal || r.crossDomain ? 1223 === s && (s = 204) : s = c.text ? 200 : 404
							}
						} catch (v) {
							f || e(-1, v)
						}
						c && e(s, l, c, a)
					};
					r.async ? 4 === o.readyState ? setTimeout(u) : (h = ++tf, vt && (nt || (nt = {}, i(n).unload(vt)), nt[h] = u), o.onreadystatechange = u) : u()
				},
				abort: function() {
					u && u(t, !0)
				}
			}
		}
	});
	var it, yt, po = /^(?:toggle|show|hide)$/,
		uf = RegExp("^(?:([+-])=|)(" + st + ")([a-z%]*)$", "i"),
		wo = /queueHooks$/,
		pt = [ko],
		ft = {
			"*": [function(n, t) {
				var f = this.createTween(n, t),
					s = f.cur(),
					r = uf.exec(t),
					e = r && r[3] || (i.cssNumber[n] ? "" : "px"),
					u = (i.cssNumber[n] || "px" !== e && +s) && uf.exec(i.css(f.elem, n)),
					o = 1,
					h = 20;
				if (u && u[3] !== e) {
					e = e || u[3];
					r = r || [];
					u = +s || 1;
					do o = o || ".5", u /= o, i.style(f.elem, n, u + e);
					while (o !== (o = f.cur() / s) && 1 !== o && --h)
				}
				return r && (u = f.start = +u || +s || 0, f.unit = e, f.end = r[1] ? u + (r[1] + 1) * r[2] : +r[2]), f
			}]
		};
	i.Animation = i.extend(of, {
		tweener: function(n, t) {
			i.isFunction(n) ? (t = n, n = ["*"]) : n = n.split(" ");
			for (var r, u = 0, f = n.length; f > u; u++) r = n[u], ft[r] = ft[r] || [], ft[r].unshift(t)
		},
		prefilter: function(n, t) {
			t ? pt.unshift(n) : pt.push(n)
		}
	});
	i.Tween = f;
	f.prototype = {
		constructor: f,
		init: function(n, t, r, u, f, e) {
			this.elem = n;
			this.prop = r;
			this.easing = f || "swing";
			this.options = t;
			this.start = this.now = this.cur();
			this.end = u;
			this.unit = e || (i.cssNumber[r] ? "" : "px")
		},
		cur: function() {
			var n = f.propHooks[this.prop];
			return n && n.get ? n.get(this) : f.propHooks._default.get(this)
		},
		run: function(n) {
			var r, t = f.propHooks[this.prop];
			return this.pos = r = this.options.duration ? i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : n, this.now = (this.end - this.start) * r + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), t && t.set ? t.set(this) : f.propHooks._default.set(this), this
		}
	};
	f.prototype.init.prototype = f.prototype;
	f.propHooks = {
		_default: {
			get: function(n) {
				var t;
				return null == n.elem[n.prop] || n.elem.style && null != n.elem.style[n.prop] ? (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0) : n.elem[n.prop]
			},
			set: function(n) {
				i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.style && (null != n.elem.style[i.cssProps[n.prop]] || i.cssHooks[n.prop]) ? i.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
			}
		}
	};
	f.propHooks.scrollTop = f.propHooks.scrollLeft = {
		set: function(n) {
			n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
		}
	};
	i.each(["toggle", "show", "hide"], function(n, t) {
		var r = i.fn[t];
		i.fn[t] = function(n, i, u) {
			return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(wt(t, !0), n, i, u)
		}
	});
	i.fn.extend({
		fadeTo: function(n, t, i, r) {
			return this.filter(ut).css("opacity", 0).show().end().animate({
				opacity: t
			}, n, i, r)
		},
		animate: function(n, t, r, u) {
			var o = i.isEmptyObject(n),
				e = i.speed(t, r, u),
				f = function() {
					var t = of(this, i.extend({}, n), e);
					(o || i._data(this, "finish")) && t.stop(!0)
				};
			return f.finish = f, o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f)
		},
		stop: function(n, r, u) {
			var f = function(n) {
					var t = n.stop;
					delete n.stop;
					t(u)
				};
			return "string" != typeof n && (u = r, r = n, n = t), r && n !== !1 && this.queue(n || "fx", []), this.each(function() {
				var o = !0,
					t = null != n && n + "queueHooks",
					e = i.timers,
					r = i._data(this);
				if (t) r[t] && r[t].stop && f(r[t]);
				else for (t in r) r[t] && r[t].stop && wo.test(t) && f(r[t]);
				for (t = e.length; t--;) e[t].elem !== this || null != n && e[t].queue !== n || (e[t].anim.stop(u), o = !1, e.splice(t, 1));
				(o || !u) && i.dequeue(this, n)
			})
		},
		finish: function(n) {
			return n !== !1 && (n = n || "fx"), this.each(function() {
				var t, f = i._data(this),
					r = f[n + "queue"],
					e = f[n + "queueHooks"],
					u = i.timers,
					o = r ? r.length : 0;
				for (f.finish = !0, i.queue(this, n, []), e && e.stop && e.stop.call(this, !0), t = u.length; t--;) u[t].elem === this && u[t].queue === n && (u[t].anim.stop(!0), u.splice(t, 1));
				for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
				delete f.finish
			})
		}
	});
	i.each({
		slideDown: wt("show"),
		slideUp: wt("hide"),
		slideToggle: wt("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(n, t) {
		i.fn[n] = function(n, i, r) {
			return this.animate(t, n, i, r)
		}
	});
	i.speed = function(n, t, r) {
		var u = n && "object" == typeof n ? i.extend({}, n) : {
			complete: r || !r && t || i.isFunction(n) && n,
			duration: n,
			easing: r && t || t && !i.isFunction(t) && t
		};
		return u.duration = i.fx.off ? 0 : "number" == typeof u.duration ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default, (null == u.queue || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
			i.isFunction(u.old) && u.old.call(this);
			u.queue && i.dequeue(this, u.queue)
		}, u
	};
	i.easing = {
		linear: function(n) {
			return n
		},
		swing: function(n) {
			return .5 - Math.cos(n * Math.PI) / 2
		}
	};
	i.timers = [];
	i.fx = f.prototype.init;
	i.fx.tick = function() {
		var u, n = i.timers,
			r = 0;
		for (it = i.now(); n.length > r; r++) u = n[r], u() || n[r] !== u || n.splice(r--, 1);
		n.length || i.fx.stop();
		it = t
	};
	i.fx.timer = function(n) {
		n() && i.timers.push(n) && i.fx.start()
	};
	i.fx.interval = 13;
	i.fx.start = function() {
		yt || (yt = setInterval(i.fx.tick, i.fx.interval))
	};
	i.fx.stop = function() {
		clearInterval(yt);
		yt = null
	};
	i.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	i.fx.step = {};
	i.expr && i.expr.filters && (i.expr.filters.animated = function(n) {
		return i.grep(i.timers, function(t) {
			return n === t.elem
		}).length
	});
	i.fn.offset = function(n) {
		if (arguments.length) return n === t ? this : this.each(function(t) {
			i.offset.setOffset(this, n, t)
		});
		var r, e, f = {
			top: 0,
			left: 0
		},
			u = this[0],
			s = u && u.ownerDocument;
		if (s) return r = s.documentElement, i.contains(r, u) ? (typeof u.getBoundingClientRect !== o && (f = u.getBoundingClientRect()), e = sf(s), {
			top: f.top + (e.pageYOffset || r.scrollTop) - (r.clientTop || 0),
			left: f.left + (e.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
		}) : f
	};
	i.offset = {
		setOffset: function(n, t, r) {
			var f = i.css(n, "position");
			"static" === f && (n.style.position = "relative");
			var e = i(n),
				o = e.offset(),
				l = i.css(n, "top"),
				a = i.css(n, "left"),
				v = ("absolute" === f || "fixed" === f) && i.inArray("auto", [l, a]) > -1,
				u = {},
				s = {},
				h, c;
			v ? (s = e.position(), h = s.top, c = s.left) : (h = parseFloat(l) || 0, c = parseFloat(a) || 0);
			i.isFunction(t) && (t = t.call(n, r, o));
			null != t.top && (u.top = t.top - o.top + h);
			null != t.left && (u.left = t.left - o.left + c);
			"using" in t ? t.using.call(n, u) : e.css(u)
		}
	};
	i.fn.extend({
		position: function() {
			if (this[0]) {
				var n, r, t = {
					top: 0,
					left: 0
				},
					u = this[0];
				return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0), t.left += i.css(n[0], "borderLeftWidth", !0)), {
					top: r.top - t.top - i.css(u, "marginTop", !0),
					left: r.left - t.left - i.css(u, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var n = this.offsetParent || ki; n && !i.nodeName(n, "html") && "static" === i.css(n, "position");) n = n.offsetParent;
				return n || ki
			})
		}
	});
	i.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(n, r) {
		var u = /Y/.test(r);
		i.fn[n] = function(f) {
			return i.access(this, function(n, f, e) {
				var o = sf(n);
				return e === t ? o ? r in o ? o[r] : o.document.documentElement[f] : n[f] : (o ? o.scrollTo(u ? i(o).scrollLeft() : e, u ? e : i(o).scrollTop()) : n[f] = e, t)
			}, n, f, arguments.length, null)
		}
	});
	i.each({
		Height: "height",
		Width: "width"
	}, function(n, r) {
		i.each({
			padding: "inner" + n,
			content: r,
			"": "outer" + n
		}, function(u, f) {
			i.fn[f] = function(f, e) {
				var o = arguments.length && (u || "boolean" != typeof f),
					s = u || (f === !0 || e === !0 ? "margin" : "border");
				return i.access(this, function(r, u, f) {
					var e;
					return i.isWindow(r) ? r.document.documentElement["client" + n] : 9 === r.nodeType ? (e = r.documentElement, Math.max(r.body["scroll" + n], e["scroll" + n], r.body["offset" + n], e["offset" + n], e["client" + n])) : f === t ? i.css(r, u, s) : i.style(r, u, f, s)
				}, r, o ? f : t, o, null)
			}
		})
	});
	i.fn.size = function() {
		return this.length
	};
	i.fn.andSelf = i.fn.addBack;
	"object" == typeof module && module && "object" == typeof module.exports ? module.exports = i : (n.jQuery = n.$ = i, "function" == typeof define && define.amd && define("jquery", [], function() {
		return i
	}))
}(window), function(n) {
	var t, i;
	n.fn.powerFloat = function(r) {
		return n(this).each(function() {
			var u = n.extend({}, i, r || {}),
				e = function(n, i) {
					t.target && t.target.css("display") !== "none" && t.targetHide();
					t.s = n;
					t.trigger = i
				},
				f;
			switch (u.eventType) {
			case "hover":
				n(this).hover(function() {
					t.timerHold && (t.flagDisplay = !0);
					var i = parseInt(u.showDelay, 10);
					e(u, n(this));
					i ? (f && clearTimeout(f), f = setTimeout(function() {
						t.targetGet.call(t)
					}, i)) : t.targetGet()
				}, function() {
					f && clearTimeout(f);
					t.timerHold && clearTimeout(t.timerHold);
					t.flagDisplay = !1;
					t.targetHold()
				});
				u.hoverFollow && n(this).mousemove(function(n) {
					return t.cacheData.left = n.pageX, t.cacheData.top = n.pageY, t.targetGet.call(t), !1
				});
				break;
			case "click":
				n(this).click(function(i) {
					t.display && t.trigger && i.target === t.trigger.get(0) ? (t.flagDisplay = !1, t.displayDetect()) : (e(u, n(this)), t.targetGet(), n(document).data("mouseupBind") || n(document).bind("mouseup", function(i) {
						var f = !1,
							r;
						return t.trigger && (r = t.target.attr("id"), r || (r = "R_" + Math.random(), t.target.attr("id", r)), n(i.target).parents().each(function() {
							n(this).attr("id") === r && (f = !0)
						}), u.eventType === "click" && t.display && i.target != t.trigger.get(0) && !f && (t.flagDisplay = !1, t.displayDetect())), !1
					}).data("mouseupBind", !0))
				});
				break;
			case "focus":
				n(this).focus(function() {
					var i = n(this);
					setTimeout(function() {
						e(u, i);
						t.targetGet()
					}, 200)
				}).blur(function() {
					t.flagDisplay = !1;
					setTimeout(function() {
						t.displayDetect()
					}, 190)
				});
				break;
			default:
				e(u, n(this));
				t.targetGet();
				n(document).unbind("mouseup").data("mouseupBind", !1)
			}
		})
	};
	t = {
		targetGet: function() {
			var f, i, u, o, s, c, h, r, e;
			if (!this.trigger) return this;
			f = this.trigger.attr(this.s.targetAttr);
			i = typeof this.s.target == "function" ? this.s.target.call(this.trigger) : this.s.target;
			switch (this.s.targetMode) {
			case "common":
				if (i ? (e = typeof i, e === "object" ? i.size() && (t.target = i.eq(0)) : e === "string" && n(i).size() && (t.target = n(i).eq(0))) : f && n("#" + f).size() && (t.target = n("#" + f)), t.target) t.targetShow();
				else return this;
				break;
			case "ajax":
				if (u = i || f, this.targetProtect = !1, !u) return;
				t.cacheData[u] || t.loading();
				o = new Image;
				o.onload = function() {
					var i = o.width,
						r = o.height,
						f = n(window).width(),
						e = n(window).height(),
						s = i / r,
						c = f / e,
						h;
					s > c ? i > f / 2 && (i = f / 2, r = i / s) : r > e / 2 && (r = e / 2, i = r * s);
					h = '<img class="float_ajax_image" src="' + u + '" width="' + i + '" height = "' + r + '" />';
					t.cacheData[u] = !0;
					t.target = n(h);
					t.targetShow()
				};
				o.onerror = function() {
					/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(u) ? (t.target = n('<div class="float_ajax_error">图片加载失败。<\/div>'), t.targetShow()) : n.ajax({
						url: u,
						success: function(i) {
							typeof i == "string" && (t.cacheData[u] = !0, t.target = n('<div class="float_ajax_data">' + i + "<\/div>"), t.targetShow())
						},
						error: function() {
							t.target = n('<div class="float_ajax_error">数据没有加载成功。<\/div>');
							t.targetShow()
						}
					})
				};
				o.src = u;
				break;
			case "list":
				s = '<ul class="float_list_ul">';
				n.isArray(i) && (c = i.length) ? n.each(i, function(n, t) {
					var i = "",
						r = "",
						u, f;
					n === 0 && (r = ' class="float_list_li_first"');
					n === c - 1 && (r = ' class="float_list_li_last"');
					typeof t == "object" && (u = t.text.toString()) ? i = (f = t.href || "javascript:") ? '<a href="' + f + '" class="float_list_a">' + u + "<\/a>" : u : typeof t == "string" && t && (i = t);
					i && (s += "<li" + r + ">" + i + "<\/li>")
				}) : s += '<li class="float_list_null">列表无数据。<\/li>';
				s += "<\/ul>";
				t.target = n(s);
				this.targetProtect = !1;
				t.targetShow();
				break;
			case "remind":
				h = i || f;
				this.targetProtect = !1;
				typeof h == "string" && (t.target = n("<span>" + h + "<\/span>"), t.targetShow());
				break;
			default:
				r = i || f;
				e = typeof r;
				r && (e === "string" ? (/^.[^:#\[\.,]*$/.test(r) ? n(r).size() ? (t.target = n(r).eq(0), this.targetProtect = !0) : n("#" + r).size() ? (t.target = n("#" + r).eq(0), this.targetProtect = !0) : (t.target = n("<div>" + r + "<\/div>"), this.targetProtect = !1) : (t.target = n("<div>" + r + "<\/div>"), this.targetProtect = !1), t.targetShow()) : e === "object" && !n.isArray(r) && r.size() && (t.target = r.eq(0), this.targetProtect = !0, t.targetShow()))
			}
			return this
		},
		container: function() {
			var i = this.s.container,
				r = this.s.targetMode || "mode";
			return this.s.sharpAngle = r === "ajax" || r === "remind" ? !0 : !1, this.s.reverseSharp && (this.s.sharpAngle = !this.s.sharpAngle), r !== "common" && (i === null && (i = "plugin"), i === "plugin" && (n("#floatBox_" + r).size() || n('<div id="floatBox_' + r + '" class="float_' + r + '_box"><\/div>').appendTo(n("body")).hide(), i = n("#floatBox_" + r)), i && typeof i != "string" && i.size() && (this.targetProtect && t.target.show().css("position", "static"), t.target = i.empty().append(t.target))), this
		},
		setWidth: function() {
			var n = this.s.width;
			return n === "auto" ? this.target.get(0).style.width && this.target.css("width", "auto") : n === "inherit" ? this.target.width(this.trigger.width()) : this.target.css("width", n), this
		},
		position: function() {
			var tt, it, rt, u;
			if (!this.trigger || !this.target) return this;
			var d, s = 0,
				o = 0,
				c = 0,
				y = 0,
				i, r, v, p, w, b, l = this.target.data("height"),
				h = this.target.data("width"),
				ut = n(window).scrollTop(),
				f = parseInt(this.s.offsets.x, 10) || 0,
				e = parseInt(this.s.offsets.y, 10) || 0,
				k = this.cacheData;
			l || (l = this.target.outerHeight(), this.s.hoverFollow && this.target.data("height", l));
			h || (h = this.target.outerWidth(), this.s.hoverFollow && this.target.data("width", h));
			d = this.trigger.get(0).getBoundingClientRect();
			s = this.trigger.outerHeight();
			o = this.trigger.outerWidth();
			i = d.left;
			r = d.top;
			tt = function() {
				i < 0 ? i = 0 : i + s > n(window).width() && (i = n(window).width() - o)
			};
			it = function() {
				r < 0 ? r = 0 : r + s > n(document).height() && (r = n(document).height() - s)
			};
			this.s.hoverFollow && k.left && k.top && (this.s.hoverFollow === "x" ? (i = k.left, tt()) : this.s.hoverFollow === "y" ? (r = k.top, it()) : (i = k.left, r = k.top, tt(), it()));
			var a = this.s.position,
				ft = !1,
				g;
			n.each(["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"], function(n, t) {
				if (t === a) {
					ft = !0;
					return
				}
			});
			ft || (a = "4-1");
			var et = function(n) {
					var t = "bottom";
					switch (n) {
					case "1-4":
					case "5-7":
					case "2-3":
						t = "top";
						break;
					case "2-1":
					case "6-8":
					case "3-4":
						t = "right";
						break;
					case "1-2":
					case "8-6":
					case "4-3":
						t = "left";
						break;
					case "4-1":
					case "7-5":
					case "3-2":
						t = "bottom"
					}
					return t
				},
				ot = function(n) {
					return n === "5-7" || n === "6-8" || n === "8-6" || n === "7-5" ? !0 : !1
				},
				nt = function(u) {
					var c = 0,
						a = 0,
						v = t.s.sharpAngle && t.corner ? !0 : !1;
					if (u === "right") {
						if (a = i + o + h + f, v && (a += t.corner.width()), a > n(window).width()) return !1
					} else if (u === "bottom") {
						if (c = r + s + l + e, v && (c += t.corner.height()), c > ut + n(window).height()) return !1
					} else if (u === "top") {
						if (c = l + e, v && (c += t.corner.height()), c > r - ut) return !1
					} else if (u === "left" && (a = h + f, v && (a += t.corner.width()), a > i)) return !1;
					return !0
				};
			if (g = et(a), this.s.sharpAngle && this.createSharp(g), this.s.edgeAdjust && (nt(g) ?
			function() {
				if (!ot(a)) {
					var n = {
						top: {
							right: "2-3",
							left: "1-4"
						},
						right: {
							top: "2-1",
							bottom: "3-4"
						},
						bottom: {
							right: "3-2",
							left: "4-1"
						},
						left: {
							top: "1-2",
							bottom: "4-3"
						}
					}[g],
						t;
					if (n) for (t in n) nt(t) || (a = n[t])
				}
			}() : function() {
				var i;
				if (ot(a)) i = {
					"5-7": "7-5",
					"7-5": "5-7",
					"6-8": "8-6",
					"8-6": "6-8"
				}, a = i[a];
				else {
					var t = {
						top: {
							left: "3-2",
							right: "4-1"
						},
						right: {
							bottom: "1-2",
							top: "4-3"
						},
						bottom: {
							left: "2-3",
							right: "1-4"
						},
						left: {
							bottom: "2-1",
							top: "3-4"
						}
					}[g],
						n = [];
					for (name in t) n.push(name);
					a = nt(n[0]) || !nt(n[1]) ? t[n[0]] : t[n[1]]
				}
			}()), rt = et(a), u = a.split("-")[0], this.s.sharpAngle && (this.createSharp(rt), c = this.corner.width(), y = this.corner.height()), this.s.hoverFollow) this.s.hoverFollow === "x" ? (v = i + f, v = u === "1" || u === "8" || u === "4" ? i - (h - o) / 2 + f : i - (h - o) + f, u === "1" || u === "5" || u === "2" ? (p = r - e - l - y, b = r - y - e - 1) : (p = r + s + e + y, b = r + s + e + 1), w = d.left - (c - o) / 2) : this.s.hoverFollow === "y" ? (p = u === "1" || u === "5" || u === "2" ? r - (l - s) / 2 + e : r - (l - s) + e, u === "1" || u === "8" || u === "4" ? (v = i - h - f - c, w = i - c - f - 1) : (v = i + o - f + c, w = i + o + f + 1), b = d.top - (y - s) / 2) : (v = i + f, p = r + e);
			else switch (rt) {
			case "top":
				p = r - e - l - y;
				v = u == "1" ? i - f : u === "5" ? i - (h - o) / 2 - f : i - (h - o) - f;
				b = r - y - e - 1;
				w = i - (c - o) / 2;
				break;
			case "right":
				v = i + o + f + c;
				p = u == "2" ? r + e : u === "6" ? r - (l - s) / 2 + e : r - (l - s) + e;
				w = i + o + f + 1;
				b = r - (y - s) / 2;
				break;
			case "bottom":
				p = r + s + e + y;
				v = u == "4" ? i + f : u === "7" ? i - (h - o) / 2 + f : i - (h - o) + f;
				b = r + s + e + 1;
				w = i - (c - o) / 2;
				break;
			case "left":
				v = i - h - f - c;
				p = u == "2" ? r - e : u === "6" ? r - (h - o) / 2 - e : r - (l - s) - e;
				w = v + c;
				b = r - (h - c) / 2
			}
			return y && c && this.corner && this.corner.css({
				left: w,
				top: b,
				zIndex: this.s.zIndex + 1
			}), this.target.css({
				position: "fixed",
				left: v,
				top: p,
				zIndex: this.s.zIndex
			}), this
		},
		createSharp: function(t) {
			var i, r, f = "",
				e = "",
				o = {
					left: "right",
					right: "left",
					bottom: "top",
					top: "bottom"
				}[t] || "top",
				u;
			return this.target && (i = this.target.css("background-color"), parseInt(this.target.css("border-" + o + "-width")) > 0 && (r = this.target.css("border-" + o + "-color")), f = r && r !== "transparent" ? 'style="color:' + r + ';"' : 'style="display:none;"', e = i && i !== "transparent" ? 'style="color:' + i + ';"' : 'style="display:none;"'), u = '<div id="floatCorner_' + t + '" class="float_corner float_corner_' + t + '"><span class="corner corner_1" ' + f + '>◆<\/span><span class="corner corner_2" ' + e + ">◆<\/span><\/div>", t == "bottom" && (u = '<div id="floatCorner_' + t + '" class="float_corner float_corner_' + t + '"><div class="corner h3_corner"><\/div><\/div>'), n("#floatCorner_" + t).size() || n("body").append(n(u)), this.corner = n("#floatCorner_" + t), this
		},
		targetHold: function() {
			if (this.s.hoverHold) {
				var n = parseInt(this.s.hideDelay, 10) || 200;
				this.target && this.target.hover(function() {
					t.flagDisplay = !0
				}, function() {
					t.timerHold && clearTimeout(t.timerHold);
					t.flagDisplay = !1;
					t.targetHold()
				});
				t.timerHold = setTimeout(function() {
					t.displayDetect.call(t)
				}, n)
			} else this.displayDetect();
			return this
		},
		loading: function() {
			return this.target = n('<div class="float_loading"><\/div>'), this.targetShow(), this.target.removeData("width").removeData("height"), this
		},
		displayDetect: function() {
			return !this.flagDisplay && this.display && (this.targetHide(), this.timerHold = null), this
		},
		targetShow: function() {
			return t.cornerClear(), this.display = !0, this.container().setWidth().position(), this.target.show(), n.isFunction(this.s.showCall) && this.s.showCall.call(this.trigger, this.target), this
		},
		targetHide: function() {
			return this.display = !1, this.targetClear(), this.cornerClear(), n.isFunction(this.s.hideCall) && this.s.hideCall.call(this.trigger), this.target = null, this.trigger = null, this.s = {}, this.targetProtect = !1, this
		},
		targetClear: function() {
			this.target && (this.target.data("width") && this.target.removeData("width").removeData("height"), this.targetProtect && this.target.children().hide().appendTo(n("body")), this.target.unbind().hide())
		},
		cornerClear: function() {
			this.corner && this.corner.remove()
		},
		target: null,
		trigger: null,
		s: {},
		cacheData: {},
		targetProtect: !1
	};
	n.powerFloat = {};
	n.powerFloat.hide = function() {
		t.targetHide()
	};
	i = {
		width: "auto",
		offsets: {
			x: 0,
			y: 0
		},
		zIndex: 9999,
		eventType: "hover",
		showDelay: 0,
		hideDelay: 0,
		hoverHold: !0,
		hoverFollow: !1,
		targetMode: "common",
		target: null,
		targetAttr: "rel",
		container: null,
		reverseSharp: !1,
		position: "4-1",
		edgeAdjust: !0,
		showCall: n.noop,
		hideCall: n.noop
	}
}(jQuery), !jQuery) throw new Error("Bootstrap requires jQuery"); +
function(n) {
	"use strict";

	function t() {
		var i = document.createElement("bootstrap"),
			t = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			},
			n;
		for (n in t) if (void 0 !== i.style[n]) return {
			end: t[n]
		}
	}
	n.fn.emulateTransitionEnd = function(t) {
		var i = !1,
			u = this,
			r;
		n(this).one(n.support.transition.end, function() {
			i = !0
		});
		return r = function() {
			i || n(u).trigger(n.support.transition.end)
		}, setTimeout(r, t), this
	};
	n(function() {
		n.support.transition = t()
	})
}(window.jQuery); +
function(n) {
	"use strict";
	var i = '[data-dismiss="alert"]',
		t = function(t) {
			n(t).on("click", i, this.close)
		},
		r;
	t.prototype.close = function(t) {
		function f() {
			i.trigger("closed.bs.alert").remove()
		}
		var u = n(this),
			r = u.attr("data-target"),
			i;
		r || (r = u.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
		i = n(r);
		t && t.preventDefault();
		i.length || (i = u.hasClass("alert") ? u : u.parent());
		i.trigger(t = n.Event("close.bs.alert"));
		t.isDefaultPrevented() || (i.removeClass("in"), n.support.transition && i.hasClass("fade") ? i.one(n.support.transition.end, f).emulateTransitionEnd(150) : f())
	};
	r = n.fn.alert;
	n.fn.alert = function(i) {
		return this.each(function() {
			var r = n(this),
				u = r.data("bs.alert");
			u || r.data("bs.alert", u = new t(this));
			"string" == typeof i && u[i].call(r)
		})
	};
	n.fn.alert.Constructor = t;
	n.fn.alert.noConflict = function() {
		return n.fn.alert = r, this
	};
	n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(i, r) {
			this.$element = n(i);
			this.options = n.extend({}, t.DEFAULTS, r)
		},
		i;
	t.DEFAULTS = {
		loadingText: "loading..."
	};
	t.prototype.setState = function(n) {
		var i = "disabled",
			t = this.$element,
			r = t.is("input") ? "val" : "html",
			u = t.data();
		n += "Text";
		u.resetText || t.data("resetText", t[r]());
		t[r](u[n] || this.options[n]);
		setTimeout(function() {
			"loadingText" == n ? t.addClass(i).attr(i, i) : t.removeClass(i).removeAttr(i)
		}, 0)
	};
	t.prototype.toggle = function() {
		var n = this.$element.closest('[data-toggle="buttons"]'),
			t;
		n.length && (t = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change"), "radio" === t.prop("type") && n.find(".active").removeClass("active"));
		this.$element.toggleClass("active")
	};
	i = n.fn.button;
	n.fn.button = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.button"),
				f = "object" == typeof i && i;
			r || u.data("bs.button", r = new t(this, f));
			"toggle" == i ? r.toggle() : i && r.setState(i)
		})
	};
	n.fn.button.Constructor = t;
	n.fn.button.noConflict = function() {
		return n.fn.button = i, this
	};
	n(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(t) {
		var i = n(t.target);
		i.hasClass("btn") || (i = i.closest(".btn"));
		i.button("toggle");
		t.preventDefault()
	})
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(t, i) {
			this.$element = n(t);
			this.$indicators = this.$element.find(".carousel-indicators");
			this.options = i;
			this.paused = this.sliding = this.interval = this.$active = this.$items = null;
			"hover" == this.options.pause && this.$element.on("mouseenter", n.proxy(this.pause, this)).on("mouseleave", n.proxy(this.cycle, this))
		},
		i;
	t.DEFAULTS = {
		interval: 5e3,
		pause: "hover",
		wrap: !0
	};
	t.prototype.cycle = function(t) {
		return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
	};
	t.prototype.getActiveIndex = function() {
		return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
	};
	t.prototype.to = function(t) {
		var r = this,
			i = this.getActiveIndex();
		if (!(t > this.$items.length - 1) && !(0 > t)) return this.sliding ? this.$element.one("slid", function() {
			r.to(t)
		}) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", n(this.$items[t]))
	};
	t.prototype.pause = function(t) {
		return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition.end && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	};
	t.prototype.next = function() {
		if (!this.sliding) return this.slide("next")
	};
	t.prototype.prev = function() {
		if (!this.sliding) return this.slide("prev")
	};
	t.prototype.slide = function(t, i) {
		var u = this.$element.find(".item.active"),
			r = i || u[t](),
			s = this.interval,
			f = "next" == t ? "left" : "right",
			h = "next" == t ? "first" : "last",
			o = this,
			e;
		if (!r.length) {
			if (!this.options.wrap) return;
			r = this.$element.find(".item")[h]()
		}
		if (this.sliding = !0, s && this.pause(), e = n.Event("slide.bs.carousel", {
			relatedTarget: r[0],
			direction: f
		}), !r.hasClass("active")) {
			if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
				var t = n(o.$indicators.children()[o.getActiveIndex()]);
				t && t.addClass("active")
			})), n.support.transition && this.$element.hasClass("slide")) {
				if (this.$element.trigger(e), e.isDefaultPrevented()) return;
				r.addClass(t);
				r[0].offsetWidth;
				u.addClass(f);
				r.addClass(f);
				u.one(n.support.transition.end, function() {
					r.removeClass([t, f].join(" ")).addClass("active");
					u.removeClass(["active", f].join(" "));
					o.sliding = !1;
					setTimeout(function() {
						o.$element.trigger("slid")
					}, 0)
				}).emulateTransitionEnd(600)
			} else {
				if (this.$element.trigger(e), e.isDefaultPrevented()) return;
				u.removeClass("active");
				r.addClass("active");
				this.sliding = !1;
				this.$element.trigger("slid")
			}
			return s && this.cycle(), this
		}
	};
	i = n.fn.carousel;
	n.fn.carousel = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.carousel"),
				f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
				e = "string" == typeof i ? i : f.slide;
			r || u.data("bs.carousel", r = new t(this, f));
			"number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
		})
	};
	n.fn.carousel.Constructor = t;
	n.fn.carousel.noConflict = function() {
		return n.fn.carousel = i, this
	};
	n(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
		var f, i = n(this),
			r = n(i.attr("data-target") || (f = i.attr("href")) && f.replace(/.*(?=#[^\s]+$)/, "")),
			e = n.extend({}, r.data(), i.data()),
			u = i.attr("data-slide-to");
		u && (e.interval = !1);
		r.carousel(e);
		(u = i.attr("data-slide-to")) && r.data("bs.carousel").to(u);
		t.preventDefault()
	});
	n(window).on("load", function() {
		n('[data-ride="carousel"]').each(function() {
			var t = n(this);
			t.carousel(t.data())
		})
	})
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(i, r) {
			this.$element = n(i);
			this.options = n.extend({}, t.DEFAULTS, r);
			this.transitioning = null;
			this.options.parent && (this.$parent = n(this.options.parent));
			this.options.toggle && this.toggle()
		},
		i;
	t.DEFAULTS = {
		toggle: !0
	};
	t.prototype.dimension = function() {
		var n = this.$element.hasClass("width");
		return n ? "width" : "height"
	};
	t.prototype.show = function() {
		var u, t, r, i, f, e;
		if (!this.transitioning && !this.$element.hasClass("in") && (u = n.Event("show.bs.collapse"), this.$element.trigger(u), !u.isDefaultPrevented())) {
			if (t = this.$parent && this.$parent.find("> .panel > .in"), t && t.length) {
				if (r = t.data("bs.collapse"), r && r.transitioning) return;
				t.collapse("hide");
				r || t.data("bs.collapse", null)
			}
			if (i = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1, f = function() {
				this.$element.removeClass("collapsing").addClass("in")[i]("auto");
				this.transitioning = 0;
				this.$element.trigger("shown.bs.collapse")
			}, !n.support.transition) return f.call(this);
			e = n.camelCase(["scroll", i].join("-"));
			this.$element.one(n.support.transition.end, n.proxy(f, this)).emulateTransitionEnd(350)[i](this.$element[0][e])
		}
	};
	t.prototype.hide = function() {
		var i, t, r;
		if (!this.transitioning && this.$element.hasClass("in") && (i = n.Event("hide.bs.collapse"), this.$element.trigger(i), !i.isDefaultPrevented())) return t = this.dimension(), this.$element[t](this.$element[t]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1, r = function() {
			this.transitioning = 0;
			this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
		}, n.support.transition ? (this.$element[t](0).one(n.support.transition.end, n.proxy(r, this)).emulateTransitionEnd(350), void 0) : r.call(this)
	};
	t.prototype.toggle = function() {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	};
	i = n.fn.collapse;
	n.fn.collapse = function(i) {
		return this.each(function() {
			var r = n(this),
				u = r.data("bs.collapse"),
				f = n.extend({}, t.DEFAULTS, r.data(), "object" == typeof i && i);
			u || r.data("bs.collapse", u = new t(this, f));
			"string" == typeof i && u[i]()
		})
	};
	n.fn.collapse.Constructor = t;
	n.fn.collapse.noConflict = function() {
		return n.fn.collapse = i, this
	};
	n(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
		var e, i = n(this),
			s = i.attr("data-target") || t.preventDefault() || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""),
			r = n(s),
			u = r.data("bs.collapse"),
			h = u ? "toggle" : i.data(),
			f = i.attr("data-parent"),
			o = f && n(f);
		u && u.transitioning || (o && o.find('[data-toggle=collapse][data-parent="' + f + '"]').not(i).addClass("collapsed"), i[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
		r.collapse(h)
	})
}(window.jQuery); +
function(n) {
	"use strict";

	function r() {
		n(e).remove();
		n(i).each(function(t) {
			var i = u(n(this));
			i.hasClass("open") && (i.trigger(t = n.Event("hide.bs.dropdown")), t.isDefaultPrevented() || i.removeClass("open").trigger("hidden.bs.dropdown"))
		})
	}
	function u(t) {
		var i = t.attr("data-target"),
			r;
		return i || (i = t.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
	}
	var e = ".dropdown-backdrop",
		i = "[data-toggle=dropdown]",
		t = function(t) {
			n(t).on("click.bs.dropdown", this.toggle)
		},
		f;
	t.prototype.toggle = function(t) {
		var f = n(this),
			i, e;
		if (!f.is(".disabled, :disabled")) {
			if (i = u(f), e = i.hasClass("open"), r(), !e) {
				if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n('<div class="dropdown-backdrop"/>').insertAfter(n(this)).on("click", r), i.trigger(t = n.Event("show.bs.dropdown")), t.isDefaultPrevented()) return;
				i.toggleClass("open").trigger("shown.bs.dropdown");
				f.focus()
			}
			return !1
		}
	};
	t.prototype.keydown = function(t) {
		var e, o, s, f, r;
		if (/(38|40|27)/.test(t.keyCode) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
			if (o = u(e), s = o.hasClass("open"), !s || s && 27 == t.keyCode) return 27 == t.which && o.find(i).focus(), e.click();
			f = n("[role=menu] li:not(.divider):visible a", o);
			f.length && (r = f.index(f.filter(":focus")), 38 == t.keyCode && r > 0 && r--, 40 == t.keyCode && r < f.length - 1 && r++, ~r || (r = 0), f.eq(r).focus())
		}
	};
	f = n.fn.dropdown;
	n.fn.dropdown = function(i) {
		return this.each(function() {
			var r = n(this),
				u = r.data("dropdown");
			u || r.data("dropdown", u = new t(this));
			"string" == typeof i && u[i].call(r)
		})
	};
	n.fn.dropdown.Constructor = t;
	n.fn.dropdown.noConflict = function() {
		return n.fn.dropdown = f, this
	};
	n(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function(n) {
		n.stopPropagation()
	}).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu]", t.prototype.keydown)
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(t, i) {
			this.options = i;
			this.$element = n(t);
			this.$backdrop = this.isShown = null;
			this.options.remote && this.$element.load(this.options.remote)
		},
		i;
	t.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	};
	t.prototype.toggle = function(n) {
		return this[this.isShown ? "hide" : "show"](n)
	};
	t.prototype.show = function(t) {
		var i = this,
			r = n.Event("show.bs.modal", {
				relatedTarget: t
			});
		this.$element.trigger(r);
		this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.backdrop(function() {
			var u = n.support.transition && i.$element.hasClass("fade"),
				r;
			i.$element.parent().length || i.$element.appendTo(document.body);
			i.$element.show();
			u && i.$element[0].offsetWidth;
			i.$element.addClass("in").attr("aria-hidden", !1);
			i.enforceFocus();
			r = n.Event("shown.bs.modal", {
				relatedTarget: t
			});
			u ? i.$element.find(".modal-dialog").one(n.support.transition.end, function() {
				i.$element.focus().trigger(r)
			}).emulateTransitionEnd(300) : i.$element.focus().trigger(r)
		}))
	};
	t.prototype.hide = function(t) {
		t && t.preventDefault();
		t = n.Event("hide.bs.modal");
		this.$element.trigger(t);
		this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one(n.support.transition.end, n.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
	};
	t.prototype.enforceFocus = function() {
		n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function(n) {
			this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.focus()
		}, this))
	};
	t.prototype.escape = function() {
		this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", n.proxy(function(n) {
			27 == n.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
	};
	t.prototype.hideModal = function() {
		var n = this;
		this.$element.hide();
		this.backdrop(function() {
			n.removeBackdrop();
			n.$element.trigger("hidden.bs.modal")
		})
	};
	t.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null
	};
	t.prototype.backdrop = function(t) {
		var r = this.$element.hasClass("fade") ? "fade" : "",
			i;
		if (this.isShown && this.options.backdrop) {
			if (i = n.support.transition && r, this.$backdrop = n('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", n.proxy(function(n) {
				n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
			}, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
			i ? this.$backdrop.one(n.support.transition.end, t).emulateTransitionEnd(150) : t()
		} else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(n.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t()
	};
	i = n.fn.modal;
	n.fn.modal = function(i, r) {
		return this.each(function() {
			var f = n(this),
				u = f.data("bs.modal"),
				e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
			u || f.data("bs.modal", u = new t(this, e));
			"string" == typeof i ? u[i](r) : e.show && u.show(r)
		})
	};
	n.fn.modal.Constructor = t;
	n.fn.modal.noConflict = function() {
		return n.fn.modal = i, this
	};
	n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
		var i = n(this),
			r = i.attr("href"),
			u = n(i.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
			f = u.data("modal") ? "toggle" : n.extend({
				remote: !/#/.test(r) && r
			}, u.data(), i.data());
		t.preventDefault();
		u.modal(f, this).one("hide", function() {
			i.is(":visible") && i.focus()
		})
	});
	n(document).on("show.bs.modal", ".modal", function() {
		n(document.body).addClass("modal-open")
	}).on("hidden.bs.modal", ".modal", function() {
		n(document.body).removeClass("modal-open")
	})
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(n, t) {
			this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
			this.init("tooltip", n, t)
		},
		i;
	t.DEFAULTS = {
		animation: !0,
		placement: "top",
		selector: !1,
		template: '<div class="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
		trigger: "hover focus",
		title: "",
		delay: 0,
		html: !1,
		container: !1
	};
	t.prototype.init = function(t, i, r) {
		var f, e, u, o, s;
		for (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), f = this.options.trigger.split(" "), e = f.length; e--;) if (u = f[e], "click" == u) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
		else "manual" != u && (o = "hover" == u ? "mouseenter" : "focus", s = "hover" == u ? "mouseleave" : "blur", this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
		this.options.selector ? this._options = n.extend({}, this.options, {
			trigger: "manual",
			selector: ""
		}) : this.fixTitle()
	};
	t.prototype.getDefaults = function() {
		return t.DEFAULTS
	};
	t.prototype.getOptions = function(t) {
		return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
			show: t.delay,
			hide: t.delay
		}), t
	};
	t.prototype.getDelegateOptions = function() {
		var t = {},
			i = this.getDefaults();
		return this._options && n.each(this._options, function(n, r) {
			i[n] != r && (t[n] = r)
		}), t
	};
	t.prototype.enter = function(t) {
		var i = t instanceof this.constructor ? t : n(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
		return clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? (i.timeout = setTimeout(function() {
			"in" == i.hoverState && i.show()
		}, i.options.delay.show), void 0) : i.show()
	};
	t.prototype.leave = function(t) {
		var i = t instanceof this.constructor ? t : n(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
		return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? (i.timeout = setTimeout(function() {
			"out" == i.hoverState && i.hide()
		}, i.options.delay.hide), void 0) : i.hide()
	};
	t.prototype.show = function() {
		var o = n.Event("show.bs." + this.type),
			i, l;
		if (this.hasContent() && this.enabled) {
			if (this.$element.trigger(o), o.isDefaultPrevented()) return;
			i = this.tip();
			this.setContent();
			this.options.animation && i.addClass("fade");
			var t = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
				s = /\s?auto?\s?/i,
				h = s.test(t);
			h && (t = t.replace(s, "") || "top");
			i.detach().css({
				top: 0,
				left: 0,
				display: "block"
			}).addClass(t);
			this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
			var r = this.getPosition(),
				u = i[0].offsetWidth,
				f = i[0].offsetHeight;
			if (h) {
				var e = this.$element.parent(),
					a = t,
					c = document.documentElement.scrollTop || document.body.scrollTop,
					v = "body" == this.options.container ? window.innerWidth : e.outerWidth(),
					y = "body" == this.options.container ? window.innerHeight : e.outerHeight(),
					p = "body" == this.options.container ? 0 : e.offset().left;
				t = "bottom" == t && r.top + r.height + f - c > y ? "top" : "top" == t && r.top - c - f < 0 ? "bottom" : "right" == t && r.right + u > v ? "left" : "left" == t && r.left - u < p ? "right" : t;
				i.removeClass(a).addClass(t)
			}
			l = this.getCalculatedOffset(t, r, u, f);
			this.applyPlacement(l, t);
			this.$element.trigger("shown.bs." + this.type)
		}
	};
	t.prototype.applyPlacement = function(n, t) {
		var h, i = this.tip(),
			c = i[0].offsetWidth,
			f = i[0].offsetHeight,
			e = parseInt(i.css("margin-top"), 10),
			o = parseInt(i.css("margin-left"), 10),
			u, r, s;
		isNaN(e) && (e = 0);
		isNaN(o) && (o = 0);
		n.top = n.top + e;
		n.left = n.left + o;
		i.offset(n).addClass("in");
		u = i[0].offsetWidth;
		r = i[0].offsetHeight;
		("top" == t && r != f && (h = !0, n.top = n.top + f - r), /bottom|top/.test(t)) ? (s = 0, n.left < 0 && (s = -2 * n.left, n.left = 0, i.offset(n), u = i[0].offsetWidth, r = i[0].offsetHeight), this.replaceArrow(s - c + u, u, "left")) : this.replaceArrow(r - f, r, "top");
		h && i.offset(n)
	};
	t.prototype.replaceArrow = function(n, t, i) {
		this.arrow().css(i, n ? 50 * (1 - n / t) + "%" : "")
	};
	t.prototype.setContent = function() {
		var n = this.tip(),
			t = this.getTitle();
		n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
		n.removeClass("fade in top bottom left right")
	};
	t.prototype.hide = function() {
		function i() {
			"in" != u.hoverState && t.detach()
		}
		var u = this,
			t = this.tip(),
			r = n.Event("hide.bs." + this.type);
		return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (t.removeClass("in"), n.support.transition && this.$tip.hasClass("fade") ? t.one(n.support.transition.end, i).emulateTransitionEnd(150) : i(), this.$element.trigger("hidden.bs." + this.type), this)
	};
	t.prototype.fixTitle = function() {
		var n = this.$element;
		(n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
	};
	t.prototype.hasContent = function() {
		return this.getTitle()
	};
	t.prototype.getPosition = function() {
		var t = this.$element[0];
		return n.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
			width: t.offsetWidth,
			height: t.offsetHeight
		}, this.$element.offset())
	};
	t.prototype.getCalculatedOffset = function(n, t, i, r) {
		return "bottom" == n ? {
			top: t.top + t.height,
			left: t.left + t.width / 2 - i / 2
		} : "top" == n ? {
			top: t.top - r,
			left: t.left + t.width / 2 - i / 2
		} : "left" == n ? {
			top: t.top + t.height / 2 - r / 2,
			left: t.left - i
		} : {
			top: t.top + t.height / 2 - r / 2,
			left: t.left + t.width
		}
	};
	t.prototype.getTitle = function() {
		var t = this.$element,
			n = this.options;
		return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
	};
	t.prototype.tip = function() {
		return this.$tip = this.$tip || n(this.options.template)
	};
	t.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	};
	t.prototype.validate = function() {
		this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
	};
	t.prototype.enable = function() {
		this.enabled = !0
	};
	t.prototype.disable = function() {
		this.enabled = !1
	};
	t.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	};
	t.prototype.toggle = function(t) {
		var i = t ? n(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
		i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
	};
	t.prototype.destroy = function() {
		this.hide().$element.off("." + this.type).removeData("bs." + this.type)
	};
	i = n.fn.tooltip;
	n.fn.tooltip = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.tooltip"),
				f = "object" == typeof i && i;
			r || u.data("bs.tooltip", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	};
	n.fn.tooltip.Constructor = t;
	n.fn.tooltip.noConflict = function() {
		return n.fn.tooltip = i, this
	}
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(n, t) {
			this.init("popover", n, t)
		},
		i;
	if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
	t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
		placement: "right",
		trigger: "click",
		content: "",
		template: '<div class="popover"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
	});
	t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
	t.prototype.constructor = t;
	t.prototype.getDefaults = function() {
		return t.DEFAULTS
	};
	t.prototype.setContent = function() {
		var n = this.tip(),
			t = this.getTitle(),
			i = this.getContent();
		n.find(".popover-title")[this.options.html ? "html" : "text"](t);
		n.find(".popover-content")[this.options.html ? "html" : "text"](i);
		n.removeClass("fade top bottom left right in");
		n.find(".popover-title").html() || n.find(".popover-title").hide()
	};
	t.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	};
	t.prototype.getContent = function() {
		var t = this.$element,
			n = this.options;
		return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
	};
	t.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	};
	t.prototype.tip = function() {
		return this.$tip || (this.$tip = n(this.options.template)), this.$tip
	};
	i = n.fn.popover;
	n.fn.popover = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.popover"),
				f = "object" == typeof i && i;
			r || u.data("bs.popover", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	};
	n.fn.popover.Constructor = t;
	n.fn.popover.noConflict = function() {
		return n.fn.popover = i, this
	}
}(window.jQuery); +
function(n) {
	"use strict";

	function t(i, r) {
		var u, f = n.proxy(this.process, this);
		this.$element = n(i).is("body") ? n(window) : n(i);
		this.$body = n("body");
		this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f);
		this.options = n.extend({}, t.DEFAULTS, r);
		this.selector = (this.options.target || (u = n(i).attr("href")) && u.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
		this.offsets = n([]);
		this.targets = n([]);
		this.activeTarget = null;
		this.refresh();
		this.process()
	}
	t.DEFAULTS = {
		offset: 10
	};
	t.prototype.refresh = function() {
		var i = this.$element[0] == window ? "offset" : "position",
			t;
		this.offsets = n([]);
		this.targets = n([]);
		t = this;
		this.$body.find(this.selector).map(function() {
			var f = n(this),
				r = f.data("target") || f.attr("href"),
				u = /^#\w/.test(r) && n(r);
			return u && u.length && [
				[u[i]().top + (!n.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), r]
			] || null
		}).sort(function(n, t) {
			return n[0] - t[0]
		}).each(function() {
			t.offsets.push(this[0]);
			t.targets.push(this[1])
		})
	};
	t.prototype.process = function() {
		var n, i = this.$scrollElement.scrollTop() + this.options.offset,
			f = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
			e = f - this.$scrollElement.height(),
			t = this.offsets,
			r = this.targets,
			u = this.activeTarget;
		if (i >= e) return u != (n = r.last()[0]) && this.activate(n);
		for (n = t.length; n--;) u != r[n] && i >= t[n] && (!t[n + 1] || i <= t[n + 1]) && this.activate(r[n])
	};
	t.prototype.activate = function(t) {
		this.activeTarget = t;
		n(this.selector).parents(".active").removeClass("active");
		var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
			i = n(r).parents("li").addClass("active");
		i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
		i.trigger("activate")
	};
	var i = n.fn.scrollspy;
	n.fn.scrollspy = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.scrollspy"),
				f = "object" == typeof i && i;
			r || u.data("bs.scrollspy", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	};
	n.fn.scrollspy.Constructor = t;
	n.fn.scrollspy.noConflict = function() {
		return n.fn.scrollspy = i, this
	};
	n(window).on("load", function() {
		n('[data-spy="scroll"]').each(function() {
			var t = n(this);
			t.scrollspy(t.data())
		})
	})
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(t) {
			this.element = n(t)
		},
		i;
	t.prototype.show = function() {
		var t = this.element,
			e = t.closest("ul:not(.dropdown-menu)"),
			i = t.attr("data-target"),
			r, u, f;
		(i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), t.parent("li").hasClass("active")) || (r = e.find(".active:last a")[0], u = n.Event("show.bs.tab", {
			relatedTarget: r
		}), (t.trigger(u), u.isDefaultPrevented()) || (f = n(i), this.activate(t.parent("li"), e), this.activate(f, f.parent(), function() {
			t.trigger({
				type: "shown.bs.tab",
				relatedTarget: r
			})
		})))
	};
	t.prototype.activate = function(t, i, r) {
		function f() {
			u.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
			t.addClass("active");
			e ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade");
			t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active");
			r && r()
		}
		var u = i.find("> .active"),
			e = r && n.support.transition && u.hasClass("fade");
		e ? u.one(n.support.transition.end, f).emulateTransitionEnd(150) : f();
		u.removeClass("in")
	};
	i = n.fn.tab;
	n.fn.tab = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.tab");
			r || u.data("bs.tab", r = new t(this));
			"string" == typeof i && r[i]()
		})
	};
	n.fn.tab.Constructor = t;
	n.fn.tab.noConflict = function() {
		return n.fn.tab = i, this
	};
	n(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
		t.preventDefault();
		n(this).tab("show")
	})
}(window.jQuery); +
function(n) {
	"use strict";
	var t = function(i, r) {
			this.options = n.extend({}, t.DEFAULTS, r);
			this.$window = n(window).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
			this.$element = n(i);
			this.affixed = this.unpin = null;
			this.checkPosition()
		},
		i;
	t.RESET = "affix affix-top affix-bottom";
	t.DEFAULTS = {
		offset: 0
	};
	t.prototype.checkPositionWithEventLoop = function() {
		setTimeout(n.proxy(this.checkPosition, this), 1)
	};
	t.prototype.checkPosition = function() {
		var i;
		if (this.$element.is(":visible")) {
			var s = n(document).height(),
				e = this.$window.scrollTop(),
				o = this.$element.offset(),
				r = this.options.offset,
				f = r.top,
				u = r.bottom;
			"object" != typeof r && (u = f = r);
			"function" == typeof f && (f = r.top());
			"function" == typeof u && (u = r.bottom());
			i = null != this.unpin && e + this.unpin <= o.top ? !1 : null != u && o.top + this.$element.height() >= s - u ? "bottom" : null != f && f >= e ? "top" : !1;
			this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? o.top - e : null, this.$element.removeClass(t.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({
				top: document.body.offsetHeight - u - this.$element.height()
			}))
		}
	};
	i = n.fn.affix;
	n.fn.affix = function(i) {
		return this.each(function() {
			var u = n(this),
				r = u.data("bs.affix"),
				f = "object" == typeof i && i;
			r || u.data("bs.affix", r = new t(this, f));
			"string" == typeof i && r[i]()
		})
	};
	n.fn.affix.Constructor = t;
	n.fn.affix.noConflict = function() {
		return n.fn.affix = i, this
	};
	n(window).on("load", function() {
		n('[data-spy="affix"]').each(function() {
			var i = n(this),
				t = i.data();
			t.offset = t.offset || {};
			t.offsetBottom && (t.offset.bottom = t.offsetBottom);
			t.offsetTop && (t.offset.top = t.offsetTop);
			i.affix(t)
		})
	})
}(window.jQuery), function(n) {
	
	Array.prototype.distinct = function() {
		for (var t = [], i = {}, n = 0, r = this.length; n < r; n++) i[typeof this[n] + this[n]] || (t.push(this[n]), i[typeof this[n] + this[n]] = "new");
		return t
	};
	Date.prototype.AddMinutes = function(n) {
		if (isNaN(n)) return this;
		var i = new Date,
			t = this.getTime(),
			r = n * 6e4;
		return t = t + r, i.setTime(t), i
	};
	Date.prototype.AddHours = function(n) {
		if (isNaN(n)) return this;
		var i = new Date,
			t = this.getTime(),
			r = n * 36e5;
		return t = t + r, i.setTime(t), i
	};
	Date.prototype.AddDays = function(n) {
		if (isNaN(n)) return this;
		var i = new Date,
			t = this.getTime(),
			r = n * 864e5;
		return t = t + r, i.setTime(t), i
	};
	Date.prototype.AddMonths = function(n) {
		if (isNaN(n)) return this;
		var t = new Date,
			i = this.getTime(),
			u = t.getMonth() + 1,
			f = t.getFullYear(),
			r = this.GetMonthDays(f, u),
			r = 30,
			e = n * 864e5 * r;
		return i = i + e, t.setTime(i), t
	};
	Date.prototype.AddYears = function(n) {
		if (isNaN(n)) return this;
		var t = new Date,
			i = this.getTime(),
			r = t.getFullYear(),
			u = this.IsLeap(r) ? 366 : 365,
			f = n * 144e4 * u;
		return i = i + f, t.setTime(i), t
	};
	Date.prototype.IsLeap = function(n) {
		return isLeap = !1, n / 4 == 0 && (n / 100 == 0 ? n / 400 == 0 && (isLeap = !0) : isLeap = !0), isLeap
	};
	Date.prototype.GetMonthDays = function(n, t) {
		var i = 30;
		switch (t) {
		case 1:
			i = 31;
			break;
		case 2:
			i = this.IsLeap(n) ? 29 : 28;
			break;
		case 3:
			i = 31;
			break;
		case 4:
			i = 30;
			break;
		case 5:
			i = 31;
			break;
		case 6:
			i = 30;
			break;
		case 7:
			i = 31;
			break;
		case 8:
			i = 31;
			break;
		case 9:
			i = 30;
			break;
		case 10:
			i = 31;
			break;
		case 11:
			i = 30;
			break;
		case 12:
			i = 31
		}
		return i
	};
	Function.prototype.Inherit = function(t, i) {
		if (typeof t != "function") return this;
		this.Base = t.prototype;
		this.Base.constructor = t;
		var r = function() {};
		r.prototype = t.prototype;
		this.prototype = new r;
		this.prototype.constructor = this;
		i && n.extend(this.prototype, i)
	};
	Date.prototype.Format = function(n) {
		var i = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			S: this.getMilliseconds()
		},
			t;
		/(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
		return n
	}, function() {}.name || Object.defineProperty(Function.prototype, "name", {
		configurable: !0,
		get: function() {
			var n = (this.toString().match(/function (.+?)\(/) || [, ""])[1];
			return Object.defineProperty(this, "name", {
				value: n
			}), n
		}
	});
	n.fn.FloatBox = function(t) {
		var r = {
			width: 200,
			height: 250,
			offsetLeft: 20,
			offsetHeight: 30,
			base_x: "innerright",
			base_y: "bottom",
			target: null,
			source: this,
			shownCallback: null,
			hiddenCallback: null,
			actions: [],
			baseDom: null,
			documentClickVisible: !0,
			topbox: !1
		},
			i;
		return t = n.extend({}, r, t), i = t.target, {
			opt: t,
			getAbsPosition: function(n) {
				var i = 0,
					t;
				if (window.parent != window && (window.screenLeft != void 0 ? i = window.screenLeft : window.screenX != void 0 && (i = window.screenX)), t = {
					x: 0,
					y: 0
				}, document.documentElement.getBoundingClientRect) t.x = n.getBoundingClientRect().left, t.y = n.getBoundingClientRect().top, t.x += i + document.documentElement.scrollLeft - document.documentElement.clientLeft, t.y += document.body.scrollTop | document.documentElement.scrollTop + document.documentElement.scrollTop - document.documentElement.clientTop;
				else {
					while (n != document.body) t.x += n.offsetLeft, t.y += n.offsetTop, n = n.offsetParent;
					t.x += i + document.body.clientLeft - document.body.scrollLeft;
					t.y += document.body.scrollTop | document.documentElement.scrollTop + document.body.clientTop - document.body.scrollTop
				}
				return t
			},
			show: function() {
				var r = null,
					e = null,
					u = this.getAbsPosition(t.source.get(0)),
					o, f;
				t.baseDom ? (t.base_x == "innerright" ? (f = this.getAbsPosition(n(t.baseDom).get(0)), o = n(t.baseDom).outerWidth(), r = f.x + o) : t.base_x == "innerleft" || t.base_x == "right" ? r = 1e3 : t.base_x == "left" && (f = this.getAbsPosition(t.baseDom), r = f.x), e = n(window).height()) : (r = n(window).width(), e = n(window).height());
				var s = 0,
					h = 0,
					c = n(t.source).height();
				s = u.y + c + t.offsetHeight + t.height > e ? u.y - t.height - t.offsetHeight : t.base_y == "top" ? u.y + t.offsetHeight : u.y + c + t.offsetHeight;
				h = u.x + t.width > r ? r - t.width : u.x + t.width;
				i.css({
					position: "absolute",
					top: s,
					left: h,
					width: t.width + "px",
					height: t.height + "px",
					border: "1px solid #ddd",
					"box-shadow": "0 0 8px #ddd",
					"z-index": 10002,
					"background-color": "#fff",
					"overflow-y": "auto"
				});
				i.show();
				t.shownCallback && t.shownCallback();
				document.onclick = function(i) {
					var u, r, f, e;
					n.ReportDesigner.FloatPanels.length != 0 && (n("div#field-edit-panel").is(":visible") || (u = n.ReportDesigner.FloatPanels[n.ReportDesigner.FloatPanels.length - 1], n.ReportDesigner.FloatPanels.length - 2 >= 0 && n.ReportDesigner.FloatPanels[n.ReportDesigner.FloatPanels.length - 1].opt.target.attr("id") && n.ReportDesigner.FloatPanels[n.ReportDesigner.FloatPanels.length - 1].opt.target.attr("id") == n.ReportDesigner.FloatPanels[n.ReportDesigner.FloatPanels.length - 2].opt.target.attr("id") && (n.ReportDesigner.FloatPanels.pop(), n.ReportDesigner.FloatPanels.pop(), n.ReportDesigner.FloatPanels.push(u)), r = u.opt.target, n(r).is(":visible")) && (f = i.pageX == 0 ? Math.abs(i.offsetX) : i.pageX, e = i.pageY == 0 ? Math.abs(i.offsetY) : i.pageY, (e > n(r).position().top + n(r).height() + 30 || e < n(r).position().top - 30 || f > n(r).position().left + n(r).width() || f < n(r).position().left - 30) && (t.documentClickVisible ? u.hide() : u.onlyhide())))
				}
			},
			hide: function() {
				this.opt.hiddenCallback && this.opt.hiddenCallback();
				n(this.opt.target).hide();
				n.ReportDesigner.FloatPanels.pop()
			},
			onlyhide: function() {
				n(this.opt.target).hide();
				n.ReportDesigner.FloatPanels.pop()
			}
		}
	};
	var t = function(t, i) {
			var r = this;
			this.Options = n.extend({}, t);
			this.base = n(i);
			this.Value = null;
			this.configurable = !0;
			this.Init()
		};
	n.fn.AppFilterMultiSelect = function(n) {
		return new t(n, this)
	};
	t.prototype = {
		Init: function() {
			var t = this;
			t.Options.OnChange && n.isFunction(t.Options.OnChange) && (t.OnChange = t.Options.OnChange);
			t.Render()
		},
		Render: function() {
			var t = this,
				i = t.base,
				r;
			i.multiselect({
				enableFiltering: !0,
				filterPlaceholder: "搜索",
				buttonText: function(t) {
					if (t.length === 0) return "";
					var i = [];
					return t.each(function() {
						n(this).attr("label") !== void 0 ? i.push(n(this).attr("label")) : i.push(n(this).html())
					}), i.join(";") + ""
				},
				onChange: function() {
					if (t.configurable) {
						var n = [],
							i = t.base.val();
						i && (n = i);
						t.Value = n;
						t.OnChange()
					}
				},
				onDropdownShow: function() {
					n("div[data-FormMultiUserPanel='SelectorPanel'],div[data-FormUserPanel='SelectorPanel'],div[data-formmultiuserpanel='searchdiv']").hide();
					n(".form-query-dropdown").hide()
				},
				selectedClass: "multiselect-selected",
				nonSelectedText: ""
			});
			r = i.attr("id");
			t.Options.defaultValue && (this.configurable = !1, i.multiselect("select", t.Options.defaultValue), this.configurable = !0, this.Value = t.Options.defaultValue);
			i.parent().find("b.caret").removeClass("caret").addClass("icon-arrow-down-full");
			i.next().find("ul.multiselect-container").off("scroll.list").on("scroll.list", function() {
				var t = n(this).scrollTop();
				n(this).find("li.filter").css({
					top: t + "px"
				})
			})
		},
		GetValue: function() {
			return this.Value
		},
		SetValue: function(n) {
			this.configurable = !1;
			this.base.multiselect("select", n);
			this.OnChange();
			this.configurable = !0
		},
		OnChange: function() {}
	}
}(jQuery), function(n) {
	var t = function(t, i) {
			this.opt = t;
			this.base = n(i);
			this.schemaCode = t.schemaCode;
			this.Init()
		};
	n.fn.NewOrCheckList = function(n) {
		return new t(n, this)
	};
	t.prototype = {
		Init: function() {
			var t = this;
			n(this.base[0]).off("click").on("click", function(i) {
				var u = n(i.target),
					f, r;
				return u.hasClass("chakanliebiao") ? (r = "/App/?id=" + t.schemaCode, window.open(r), i.stopPropagation(), !1) : u.hasClass("xinzengshuju") ? (r = "/Form/DefaultSheet?SchemaCode=" + t.schemaCode, n.ISideModal.Show(r), i.stopPropagation(), !1) : (f = u.find(".box-recent-operate").find(".xinzengshuju").length > 0, f && (r = "/Form/DefaultSheet?SchemaCode=" + t.schemaCode, n.ISideModal.Show(r)), i.stopPropagation(), !1)
			});
			n(this.base[0]).off("mouseenter").on("mouseenter", function() {
				n(this).find(".box-recent-operate").show()
			});
			n(this.base[0]).off("mouseleave").on("mouseleave", function() {
				n(this).find(".box-recent-operate").hide()
			})
		}
	}
}(jQuery), function(n) {
	n.H3Popup = {};
	n.H3Popup.IsShow = !1;
	n.H3Popup.options = {
		title: "",
		message: "",
		error_detail: "",
		type: "danger",
		ShowInRootWindow: !1,
		MessageTip1: "查看错误详情",
		MessageTip2: "错误详情",
		showCancel: !0,
		callBack: undefined
	};
	n.H3Popup.show = function(i) {
		try {
			var i = n.extend({}, n.H3Popup.options, i);
			t.add(i)
		} catch (r) {}
	};
	var t = {
		_modal: '<div class="modal fade jconfirm"  tabindex= "-1" role= "dialog"  data-backdrop="false" ><\/div>',
		_modal_dialog: '<div class="modal-dialog " role="document"><\/div>',
		_modal_content: ' <div class="modal-content"><\/div>',
		_modal_header: ' <div class="modal-header modal-header-h3base "><button type="button" class="close" data-dismiss="modal"><span class="icon-guanbi" aria-hidden="true" style= "color:#FFFFFF" ><\/span><\/button> <h4 class="modal-title">提示<\/h4> <\/div>',
		_modal_body: ' <div class="modal-body" style="padding-top:55px;"><\/div>',
		_modal_message: '<span style="display: block;" class="messagesummary"><\/span>',
		_modal_errordetail: ' <div><div class="" style="text-align:center;margin-top:20px;margin-bottom:20px;">  <a class="has-error"><span class="messagetip1"><\/span><i class="fa icon-chevron-down-outline"><\/i><\/a><\/div>  <div class="modal-errordetail">  <div class="modal-errorcode messagetip2"><\/div>   <div class="modal-errordetails">  <\/div>  <\/div><\/div>',
		_modal_footer: '<div class="modal-footer"><div type="button" class="button btn btn-ok">确定<\/div><div type="button" class="button btn btn-cancel" >取消<\/div><\/div>',
		add: function(t) {
			var o, f, h, r, u, e;
			if (t.ShowInRootWindow = !0, o = this, n.H3Popup.IsShow = !0, t && t.message) {
				var i = n(this._modal),
					s = n(this._modal_header),
					c = "modal-dialog-" + t.type,
					l = "modal-header-" + t.type;
				t.title && s.find("h4").html(t.title);
				f = n(this._modal_dialog).addClass(c);
				s.addClass(l);
				h = n(this._modal_body).append(n(this._modal_message).html(t.message));
				r = n(this._modal_errordetail);
				r.find(".modal-errordetails").html(t.error_detail);
				h.append(r);
				r.find(".messagetip1").text(t.MessageTip1);
				r.find(".messagetip2").html(t.MessageTip2 + ":");
				r.find("a.has-error").off("click.errordetail").on("click.errordetail", function() {
					r.find("div.modal-errordetail").toggle();
					var t = n(this).find("i");
					t.hasClass("icon-chevron-up-outline") ? t.removeClass("icon-chevron-up-outline").addClass("icon-chevron-down-outline") : t.removeClass("icon-chevron-down-outline").addClass("icon-chevron-up-outline")
				});
				t.error_detail || n(r.find("a.has-error")).hide();
				u = n(this._modal_footer);
				t.showCancel || u.find(".btn-cancel").hide();
				e = n(this._modal_content).append(s).append(h).append(u);
				f.append(e);
				t.ShowInRootWindow ? i.append(f).appendTo(n(top.window.document.body)) : i.append(f).appendTo(n("body"));
				i.modal("show");
				n.MsgFilter.show();
				u.find(".btn-ok").click(function() {
					i.modal("hide");
					n(this).attr("disabled", "disabled").text("处理中");
					n.isFunction(t.callBack) && t.callBack.apply(o, [!0])
				});
				u.find(".btn-cancel").click(function() {
					i.modal("hide");
					n.isFunction(t.callBack) && t.callBack.apply(o, [!1])
				});
				i.on("shown.bs.modal", function() {
					var i = 0,
						r;
					i = t.ShowInRootWindow ? n(top.window).height() : n(window).height();
					r = i / 2 - e.height();
					e.css("margin-top", r)
				});
				i.on("hidden.bs.modal", function() {
					n.H3Popup.IsShow = !1;
					i.remove();
					n.MsgFilter.remove()
				})
			}
		}
	}
}(jQuery), function(n) {
	n.H3WarningBox = {};
	n.H3WarningBox.options = {
		message: "",
		type: "danger",
		fade_in_speed: 1e3,
		ShowInRootWindow: !1
	};
	n.H3WarningBox.BoxArray = [];
	var t = {};
	t._box = '<div class="alert" role= "alert" style="z-index:999999" ><\/div>';
	t.add = function(t) {
		var i = this,
			u, r, f, e;
		if (this.$box = n(this._box), u = n.IGuid(), this.$box.attr("id", u), t && t.message && this.$box.html(t.message), this.$box.addClass("alert-" + t.type), t.cls && this.$box.addClass(t.cls), r = n("<span class='icon-close hide' style='position:absolute;font-size:16px;float:right;right:8px;top:16px;'><\/span>"), r.click(function(t) {
			i.$box.remove();
			t.stopPropagation();
			t.preventDefault();
			n(window).off("unload.warningbox")
		}), this.$box.append(r), f = t.ShowInRootWindow ? top.window.innerWidth : window.innerWidth, e = this.$box.outerWidth(), t.ShowInRootWindow) {
			this.$box.appendTo(n(top.document.body));
			n(window).off("unload.warningbox").on("unload.warningbox", function() {
				i.$box.remove()
			})
		} else this.$box.appendTo(n("body"));
		this.$box.on("mouseenter", function() {
			console.log("mouseenter");
			n(this).stop().css({
				opacity: "",
				height: ""
			});
			i.timeOut && clearTimeout(i.timeOut);
			r.removeClass("hide")
		}).on("mouseleave", function() {
			console.log("mouseleave");
			r.addClass("hide");
			i.timeOut = setTimeout(function() {
				i._fadeout()
			}, 1e3)
		});
		return this.timeOut, this.$box.fadeIn(t.fade_in_speed, function() {
			i.timeOut = setTimeout(function() {
				i._fadeout()
			}, 3e3)
		}), this
	};
	t.clear = function() {
		this.$box && (this.$box.remove(), n(window).off("unload.warningbox"))
	};
	t._fadeout = function() {
		var t = this;
		n.each(top.$.H3WarningBox.BoxArray, function(n, i) {
			//i == t && delete i
		});
		this.timeOut = this.$box.fadeOut(1e3, function() {
			t.$box.remove();
			n(window).off("unload.warningbox")
		})
	};
	n.H3WarningBox.show = function(i) {
		var r, u, i, f;
		try {
			if (top.$.H3WarningBox.BoxArray.length > 0) {
				for (r = 0; r < top.$.H3WarningBox.BoxArray.length; r++) console.log(r), u = top.$.H3WarningBox.BoxArray[r], u && u.clear();
				top.$.H3WarningBox.BoxArray.splice(0, top.$.H3WarningBox.BoxArray.length)
			}
			i = n.extend({}, n.H3Popup.options, i);
			f = t.add(i);
			top.$.H3WarningBox.BoxArray.push(f)
		} catch (e) {}
	}
}(jQuery), function(n) {
	n.GetRequest = function() {
		var t = location.search,
			i = {},
			r, n;
		if (t.indexOf("?") != -1) for (r = t.substr(1), strs = r.split("&"), n = 0; n < strs.length; n++) i[strs[n].split("=")[0]] = unescape(strs[n].split("=")[1]);
		return i
	}
}(jQuery), function(n) {
	n.MsgFilter = {};
	n.MsgFilter.count = 0;
	n.MsgFilter.show = function() {
		this.count == 0 && (n("body header").addClass("msg-filter"), n("body section > div").addClass("msg-filter"), n("body").find("iframe.filter").addClass("msg-filter"));
		++this.count
	};
	n.MsgFilter.remove = function() {
		this.count == 1 ? (n("body header").removeClass("msg-filter"), n("body section > div").removeClass("msg-filter"), n("body").find("iframe.filter").removeClass("msg-filter"), this.count = 0) : this.count > 0 && --this.count
	}
}(jQuery), function(n) {
	n.HideAllPopup = function() {
		n("div[data-FormMultiUserPanel='SelectorPanel'],div[data-FormUserPanel='SelectorPanel'],div[data-formmultiuserpanel='searchdiv']").hide();
		n("ul.drop-list.drop-list_s").hide();
		n(document).find("#ListView .fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		n('[data-provide="datetimepicker"]').each(function() {
			var t = n(this);
			t.data("datetimepicker") || t.datetimepicker("hide")
		});
		n(".form-query-dropdown").hide()
	}
}(jQuery);
jQuery.extend({
	SheetRuntimeContentCache: {},
	IGuid: function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
			var t = Math.random() * 16 | 0,
				i = n == "x" ? t : t & 3 | 8;
			return i.toString(16)
		})
	},
	isJsonLike: function(n) {
		var t = n.match(/^\[|^\{(?!\{)/);
		return t && {
			"[": /]$/,
			"{": /}$/
		}[t[0]].test(n)
	},
	IQuery: function(n) {
		var i = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i"),
			t = decodeURI(window.location.search.substr(1)).match(i);
		return t != null ? decodeURI(t[2]) : ""
	},
	IShowSuccess: function() {
		var t, n, r, i;
		arguments && (arguments.length == 2 ? (t = arguments[0], n = arguments[1]) : arguments.length == 1 && (typeof arguments[0] == "string" ? n = arguments[0] : typeof arguments[0] == "object" && (i = arguments[0], t = i.title, n = i.msg, r = i.detail)), ($.isEmptyObject(t) || t == "") && (t = "提示"), ($.isEmptyObject(n) || n == "") && (n = t || ""), r ? $.H3Popup.show({
			title: t,
			message: n,
			error_detail: r,
			type: "success",
			ShowInRootWindow: !0
		}) : $.H3WarningBox.show({
			message: n,
			type: "success",
			ShowInRootWindow: !0
		}))
	},
	IShowError: function() {
		var t, n, r, i;
		arguments && (arguments.length == 2 ? (t = arguments[0], n = arguments[1]) : arguments.length == 1 && (typeof arguments[0] == "string" ? n = arguments[0] : typeof arguments[0] == "object" && (i = arguments[0], t = i.title, n = i.msg, r = i.detail)), ($.isEmptyObject(t) || t == "") && (t = "提示"), ($.isEmptyObject(n) || n == "") && (n = t || ""), r ? $.H3Popup.show({
			title: t,
			message: n,
			error_detail: r,
			type: "danger",
			ShowInRootWindow: !0
		}) : n.length > 25 ? $.H3Popup.show({
			title: t,
			message: n.substring(0, 20) + "...",
			error_detail: n,
			type: "danger",
			ShowInRootWindow: !0,
			MessageTip1: "查看错误详情",
			MessageTip2: "错误详情"
		}) : $.H3WarningBox.show({
			message: n,
			type: "danger",
			ShowInRootWindow: !0
		}))
	},
	IShowWarn: function() {
		var t, n, r, i;
		arguments && (arguments.length == 2 ? (t = arguments[0], n = arguments[1]) : arguments.length == 1 && (typeof arguments[0] == "string" ? n = arguments[0] : typeof arguments[0] == "object" && (i = arguments[0], t = i.title, n = i.msg, r = i.detail)), ($.isEmptyObject(t) || t == "") && (t = "提示"), ($.isEmptyObject(n) || n == "") && (n = t || ""), r ? $.H3Popup.show({
			title: t,
			message: n,
			error_detail: r,
			type: "warning",
			ShowInRootWindow: !0
		}) : n.length > 25 ? $.H3Popup.show({
			title: t,
			message: n.substring(0, 20) + "...",
			error_detail: n,
			type: "warning",
			ShowInRootWindow: !0,
			MessageTip1: "查看警示详情",
			MessageTip2: "警示详情"
		}) : $.H3WarningBox.show({
			message: n,
			type: "warning",
			ShowInRootWindow: !0
		}))
	},
	IShowTip: function() {
		var t, n, r, i;
		arguments && (arguments.length == 2 ? (t = arguments[0], n = arguments[1]) : arguments.length == 1 && (typeof arguments[0] == "string" ? n = arguments[0] : typeof arguments[0] == "object" && (i = arguments[0], t = i.title, n = i.msg, r = i.detail)), ($.isEmptyObject(t) || t == "") && (t = "提示"), ($.isEmptyObject(n) || n == "") && (n = t || ""), r ? $.H3Popup.show({
			title: t,
			message: n,
			error_detail: r,
			type: "remind",
			ShowInRootWindow: !0
		}) : n.length > 68 ? $.H3Popup.show({
			title: t,
			message: n.substring(0, 68) + "...",
			error_detail: n,
			type: "warning",
			ShowInRootWindow: !0,
			MessageTip1: "查看提示详情",
			MessageTip2: "提示详情",
			showCancel: !1
		}) : $.H3WarningBox.show({
			message: n,
			type: "remind",
			ShowInRootWindow: !0
		}))
	},
	IConfirm: function(n, t, i) {
		var r = this;
		return top.$.H3Popup.show({
			title: $.isEmptyObject(n) ? "提示" : n,
			message: $.isEmptyObject(t) ? n : t,
			type: "remind",
			ShowInRootWindow: !0,
			callBack: i
		}), !1
	},
	IModal: function(n) {
		var t = {};
		return n = $.extend({}, {
			Title: "",
			Content: "",
			ToolButtons: [],
			OnShowCallback: null,
			OnHiddenCallback: null,
			ShowHeader: !0,
			ShowFooter: !0,
			Type: 0,
			Height: "auto",
			Width: "80%",
			Firstload: null,
			Params: {},
			ShowInRootWindow: !1,
			ObjectId: null,
			Class: ""
		}, n), t.ActionObjects = [], t.Target = n.Content, t.IsUrl = n.Type == 2, t.ShowModal = function(t, i, r) {
			var s, u, e, f, o;
			localStorage.setItem("DialogArguments", JSON.stringify(n.Params));
			this.ContainerId = $.IGuid();
			this.Container = $("<div class='modalcontainer " + n.Class + "' id='" + this.ContainerId + "'>");
			s = window;
			u = this;
			this.IsShow = !1;
			this.ID = n.ObjectId != null ? n.ObjectId : $.IGuid();
			e = $("body");
			n.ShowInRootWindow && (e = $($(top.document).find("body")[0]));
			this.Modal = n.ShowInRootWindow ? $('<div class="modal fade" id="' + this.ID + '"  role="dialog" data-backdrop="false" ><\/div>').css("overflow", "hidden") : $('<div class="modal fade" id="' + this.ID + '"  role="dialog" data-backdrop="false" ><\/div>').css("overflow", "hidden");
			e.append(this.Container);
			this.Container.append(this.Modal);
			f = $('<div class="modal-dialog" style=""><\/div>').css("width", n.Width).css("height", n.Height - -26);
			this.ModalContent = $('<div class="modal-content" style="border-radius:0px;width:100%;height:98%;"><\/div>');
			this.ModalHeader = $('<div class="modal-header modal-header-form"><div type="button" class="close" data-dismiss="modal" style="margin-top:-2px;margin-right: 10px;"><span aria-hidden="true" class="icon-guanbi" style="font-size:16px;"><\/span><\/div><\/div>');
			this.ModalTitle = $('<h4 class="modal-title modal-title-form" id="myModalLabel"><\/h4>');
			this.Content = $('<div class="modal-body" ><\/div>').css("background-color", "#fff").css("width", "100%").css("height", n.Height.constructor.name == "Number" ? n.Height - 85 : "100%");
			this.ModalFooter = $('<div class="modal-footer modal-footer-form "><\/div>').css({
				"background-color": "#fff",
				height: "52px"
			});
			this.Modal.append(f);
			f.append(this.ModalContent);
			n.ShowHeader && (this.ModalContent.append(this.ModalHeader), this.ModalHeader.append(this.ModalTitle));
			this.ModalContent.append(this.Content);
			n.ShowFooter && (this.ModalContent.append(this.ModalFooter), this.SetFooter(r));
			this.FooterHeiht = 100;
			this.SetTile(n.Title);
			this.SetBody(n.Content);
			typeof n.Firstload == "function" && n.Firstload();
			this.Modal.on("show.bs.modal", function() {
				$.MsgFilter.show()
			});
			this.Modal.on("hide.bs.modal", function() {
				$.MsgFilter.remove()
			});
			this.show();
			o = !1;
			window.parent != window && $(window.parent.document).find(".modal").each(function() {
				if (!o) {
					var n = $(this).find("iframe");
					$.isEmptyObject(n) || n[0] && ($.isEmptyObject($(n[0].contentDocument).find("#" + u.ID)) || (u.ParentModal = $(this), $(this).find(".modal-header").attr("style", "background-color: #000;opacity: 0.5;border-bottom:none;"), $(this).find(".modal-body").css("box-shadow", "0 5px 15px rgba(0,0,0,.5)"), o = !0))
				}
			});
			this.Modal.on("shown.bs.modal", this, function() {
				var e = 0,
					r = ((n.ShowInRootWindow ? $(top).outerHeight() : $(window.document.body).outerHeight() > window.innerHeight ? window.innerHeight : $(window.document.body).outerHeight()) - f.height()) / 2,
					t = (+r) / 1e3,
					i = u.Modal.find(".modal-dialog");
				i.css("transition", "margin ease-in-out " + t + "s");
				i.css("-moz-transition", "margin ease-in-out " + t + "s");
				i.css("-webkit-transition", "margin ease-in-out " + t + "s");
				i.css("-o-transition", "margin ease-in-out " + t + "s");
				r > 0 && (e = r + "px");
				f.css("margin-top", e);
				typeof n.OnShowCallback == "function" && n.OnShowCallback.apply(u)
			});
			this.Modal.on("hidden.bs.modal", this, function(t) {
				t.data.IsShow = !1;
				localStorage.setItem("DialogArguments", "");
				typeof n.OnHiddenCallback == "function" && n.OnHiddenCallback.apply(u)
			})
		}, t.SetTile = function(n) {
			this.ModalTitle.html(n || " ")
		}, t.SetBody = function(t) {
			var i, r, u;
			this.IsUrl ? (this.Modal.find(".modal-dialog").css("height", n.Height).css("width", n.Width).css("margin", "0 auto 0 auto"), n.ShowFooter || this.Content.css("margin", "0px").css("padding", "0px"), i = 0, n.ShowFooter && (i += 61), n.ShowHeader && (i += 50), n.Height.constructor == Number && (r = n.Height - i - 5, this.Content.css("height", r)), u = $("<iframe height='100%' width='100%'>").attr("frameborder", 0).attr("src", t).attr("id", "iframe_" + this.ID), this.Content.append(u)) : ($(t).show(), n.type == 0 ? this.Content.append($(t)) : n.type == 1, this.Content.html(t))
		}, t.SetFooter = function(n) {
			var t, i;
			if (this.ModalFooter.html(""), n) for (this.FooterHeiht = 120, t = 0; t < n.length; t++) i = n[t], this.AddAction(i)
		}, t.AddAction = function(n) {
			var t = $('<button type="button" class="masBox-btn ' + n.Theme + '">' + n.Text + "<\/button>");
			n.position && n.position == "left" && t.css("float", "left").removeClass("masBox-btn");
			$.extend(n, {
				ModalManager: this,
				Element: t
			});
			n.CallBack && t.unbind("click").bind("click", n, function(n) {
				n.data.CallBack.apply(n.data)
			});
			this.ActionObjects.push(n);
			this.ModalFooter.append(t)
		}, t.TrrigeFrameFun = function(n) {
			var t = window.frames["iframe_" + this.ID];
			t != null && ($.isFunction(t.BoxCall) ? t.BoxCall.apply(this, [n]) : $.isFunction(t.contentWindow.BoxCall) && t.contentWindow.BoxCall.apply(this, [n]))
		}, t.show = function(t) {
			var r, i;
			this.IsShow || (this.IsShow = !0, r = this, typeof n.OnShowBeforeCallback == "function" && n.OnShowBeforeCallback.apply(this), this.Modal.modal("show"), n.ShowInRootWindow, this.IsUrl && (i = t || this.Content.find("iframe").attr("src"), this.Content.find("iframe").attr("src", i)), this.ParentModal && this.ParentModal.find(".modal-header").attr("style", "background-color: #000;opacity: 0.5;border-bottom:none;"))
		}, t.destroy = function() {
			this.Container.remove();
			for (var n in this) delete this[n]
		}, t.hide = function() {
			this.IsShow && (this.IsShow = !1, $(this.Modal).closest("modal-header").attr("style", ""), this.Modal.modal("hide"), n.ShowInRootWindow, this.ParentModal && this.ParentModal.find(".modal-header").attr("style", ""))
		}, t.SetButtonLoading = function() {
			for (var n = 0; n < this.ActionObjects.length; n++) this.ActionObjects[n].Element.attr("data-loading-text", "loading"), this.ActionObjects[n].Element.button("loading")
		}, t.ResetButton = function() {
			for (var n = 0; n < this.ActionObjects.length; n++) this.ActionObjects[n].Element.button("reset")
		}, t.ShowModal(n.title, n.Content, n.ToolButtons), t.GetRootWindow = function(n) {
			if (n.parent == n) return n;
			n = n.parent;
			n = GetRootWindow(n)
		}, t.openModal = function() {
			var i = $(top.document.body),
				t = "topMadal",
				n = $("#" + t);
			n.length == 0 && (n = $("<div class='modal fade' role='dialog' id='" + t + "' ><\/div>"), n.appendTo(i));
			n.load("model.html", function() {
				n.modal({
					backdrop: !1
				})
			})
		}, t.closeModal = function() {
			var n = $(top.document.body);
			n.find("#topMadal").on("hidden.bs.modal", function() {})
		}, t
	},
	IToolTipBox: function(n, t) {
		var i = {},
			r;
		return (t = $.extend({}, {
			ToolButtons: [],
			trigger: "click",
			container: "body",
			align: "bottom",
			shownCallback: null,
			hiddenCallback: null,
			html: !0,
			title: "",
			content: ""
		}, t), i.ActionObjects = [], i.Target = n, r = n.data("h3.itoolbox"), r) ? r : (i.ShowToolTip = function() {
			var i = this,
				n;
			this.IsShow = !1;
			this.ID = $.IGuid();
			thisTemplate = '<div class="popover" id="' + this.ID + '" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><div class="popover-footer"><\/div><\/div>';
			this.Target.popover({
				trigger: t.trigger,
				container: t.container,
				placement: t.align,
				html: t.html,
				title: t.title,
				content: t.content,
				template: i.Template
			});
			n = this.Target.data("bs.popover");
			this.popoverData = n;
			n && (this.$Tip = n.tip(), this.TipTitle = this.$Tip.find("h3.popover-title"), this.TipFooter = this.$Tip.find("div.popover-footer"), this.TipContent = this.$Tip.find("div.popover-content"));
			this.Target.on("hidden.bs.popover", this, function(n) {
				return n.data.IsShow = !1, typeof t.hiddenCallback == "function" && t.hiddenCallback(i), !1
			});
			this.Target.on("shown.bs.popover", this, function() {
				return typeof t.shownCallback == "function" && t.shownCallback(i), !1
			});
			this.SetFooter(t.ToolButtons);
			this.Target.data("h3.itoolbox", this);
			this.show()
		}, i.SetTile = function(n) {
			this.TipTitle.html(n || " ");
			this.TipTitle.show()
		}, i.SetFooter = function(n) {
			var t, i;
			if (this.TipFooter.html(""), n) for (this.FooterHeiht = 120, t = 0; t < n.length; t++) i = n[t], this.AddAction(i)
		}, i.AddAction = function(n) {
			var t = $('<button type="button" class="masBox-btn ' + n.Theme + '">' + n.Text + "<\/button>");
			n.position && n.position == "left" && t.css("float", "left").removeClass("masBox-btn");
			$.extend(n, {
				TipManager: this,
				Element: t
			});
			n.CallBack && t.unbind("click").bind("click", n, function(n) {
				n.data.CallBack.apply(n.data)
			});
			this.ActionObjects.push(n);
			this.TipFooter.append(t)
		}, i.show = function() {
			this.IsShow || (this.IsShow = !0, this.Target.popover("show"))
		}, i.destroy = function() {
			i.Target.popover("destroy");
			this.Target.data("h3.itoolbox", null)
		}, i.hide = function() {
			i.Target.popover("hide")
		}, i.SetButtonLoading = function() {
			for (var n = 0; n < this.ActionObjects.length; n++) this.ActionObjects[n].Element.attr("data-loading-text", "loading"), this.ActionObjects[n].Element.button("loading")
		}, i.ResetButton = function() {
			for (var n = 0; n < this.ActionObjects.length; n++) this.ActionObjects[n].Element.button("reset")
		}, i.ShowToolTip(t.title, t.Content, t.ToolButtons), i)
	},
	IClone: function(n) {
		if (n != null) {
			var t;
			return t = n.constructor == Object || n.constructor == Array ? new n.constructor : new n.constructor(n.valueOf()), jQuery.extend(!0, t, n), t
		}
	},
	IFormatNumber: function(n, t, i) {
		var r;
		return !isNaN(parseFloat(n)) && isFinite(n) ? (n = Number(n), n = (typeof t != "undefined" ? n.toFixed(t) : n).toString(), r = n.split("."), r[0] = r[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + (i || ",")), r.join(".")) : NaN
	},
	IQuery: function(n) {
		var i = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i"),
			t = decodeURI(window.location.search.substr(1)).match(i);
		return t != null ? decodeURI(t[2]) : ""
	},
	IDialogModal: {
		ModalIdArray: [],
		DialogModalArray: [],
		currentWindow: window,
		Show: function(n, t, i, r, u, f, e, o) {
			this.SheetData = null;
			this.ExecuteHideFunction = !0;
			var s = this,
				h = "/Form/DefaultSheet/" + n + "?SchemaCode=" + n + "&ShowInModal=true";
			t && (h = h + "&BizObjectId=" + t);
			this.iModal = new $.IModal({
				Content: h,
				OnShowCallback: e,
				OnHiddenCallback: null,
				Title: i || "",
				ShowHeader: !0,
				ShowFooter: !1,
				Type: 2,
				Height: r || 500,
				Width: u || 820,
				Params: f
			});
			this.iModal.show();
			this.iModal.Modal.on("hide.bs.modal.dialog", function() {
				s.ShowPreModalNav();
				s.ExecuteHideFunction && s.SheetData != null && typeof o == "function" && o.apply(s, [s.SheetData]);
				$(document.body).removeClass("modal-open");
				localStorage.setItem("DialogArguments", "")
			});
			this.HidePreModalNav();
			this.ID = this.iModal.ContainerId;
			top.$.IDialogModal.ModalIdArray.push(this.ID);
			top.$.IDialogModal.DialogModalArray.push(this.iModal);
			this.iModal.Container.find("div.close").off("click.close").on("click.close", function() {
				s.Close()
			})
		},
		CloseAllModal: function() {
			for (var n = top.$.IDialogModal.DialogModalArray.length - 1; n >= 0; n--) this.Close(top.$.IDialogModal.DialogModalArray[n].ContainerId);
			top.$.IDialogModal.DialogModalArray = []
		},
		Close: function(n) {
			var u = this,
				i, t, r;
			if (this.ShowPreModalNav(), n) {
				if (this.currentWindow == undefined && (this.currentWindow = top), $(this.currentWindow.document).unbind("click.Close_" + n), top.$.IDialogModal.ModalIdArray.splice(n, 1), top.$.IDialogModal.DialogModalArray && top.$.IDialogModal.DialogModalArray.length > 0) for (i = top.$.IDialogModal.DialogModalArray.length - 1; i >= 0; i--) if (t = top.$.IDialogModal.DialogModalArray[i], r = t.ContainerId, t.hide(), t.Container && (t.Container.find("iframe").remove(), t.Container.remove()),  n == r) break
			} else this.CloseLastModal()
		},
		CloseLastModal: function(n) {
			if (top.$.IDialogModal.DialogModalArray.length > 0) {
				var t = top.$.IDialogModal.DialogModalArray[top.$.IDialogModal.DialogModalArray.length - 1];
				t && this.Close(t.ContainerId, n)
			}
		},
		HidePreModalNav: function() {
			this.currentWindow != top && $(this.currentWindow.document.body).find("ul.navbar-nav").hide()
		},
		ShowPreModalNav: function() {
			$(this.currentWindow.document.body).find("ul.navbar-nav").show()
		}
	},
	ISideModal: {
		ModalIdArray: [],
		CallBackArray: {},
		ModalBody: {},
		IsChanged: !1,
		CustomParams: {},
		CheckIsChange: !0,
		Show: function(n, t, i, r, u, f, e) {
			var h = this,
				y, o, s, l, a;
			if (!this.IsChanged) {
				this.CheckIsChange = u == void 0 ? !0 : u;
				this.oldWindow = e || self;
				this.currentWindow = window;
				this.currentbody = $("body");
				var c = -1,
					v = "70%",
					p = self;
				this.currentWindow != top ? (y = top.$("#" + top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1]), c = this.IsAnnounceShow() ? 80 : 50, v = "100%") : (c = this.IsAnnounceShow() ? 83 : 53, this.CloseAllModal());
				o = null;
				s = $.IGuid();
				o = $("<div><\/div>");
				o.css("left", "auto");
				o.css("width", v);
				o.css("z-index", "1040");
				o.css("position", "fixed");
				o.css("top", c + "px");
				o.css("bottom", "-1px");
				o.css("padding", "0");
				o.css("background-color", "#fff");
				o.css("background-clip", "padding-box");
				o.css("box-shadow", "0 2px 27px 0 rgba(0,0,0,0.30");
				t || (t = "&nbsp;&nbsp;");
				l = $('<div class="panel" style="margin-bottom:0px;"><div class="panel-heading"><span id="tile_' + s + '">' + t + "<span><\/div><\/div>");
				l.children("div.panel-heading").append('<button type="button" class="close" data-dismiss="modal"><i aria-hidden="true" class="fa fa-times"><\/i><\/button>');
				o.append(l.hide());
				o.appendTo(this.currentbody);
				n += n.indexOf("?") > -1 ? "&SideModal=true&mid=" + s : "?SideModal=true&mid=" + s;
				a = $("<iframe name='frame_" + s + "'>").css("margin", "0").css("margin-left", "-1px").css("padding", "0").css("height", "100%").css("width", "100%").attr("frameborder", 0).attr("src", n).addClass("filter");
				o.append(a);
				o.css("right", this.currentbody.width() * -1);
				o.children("div.panel:first").find("button.close").click(this, function(n) {
					n.data.AutoClose.apply(n.data, [s])
				});
				o.attr("id", s);
				o.animate({
					right: 0
				}, function() {
					h.currentbody.css("overflow-y", "hidden");
					h.currentbody.addClass("modal-back")
				});
				$.inArray(s, top.$.ISideModal.ModalIdArray) < 0 && top.$.ISideModal.ModalIdArray.push(s);
				h.HidePreModalNav();
				a.load(function() {
					var n = 0,
						t = function() {
							var i, f, e, r, u;
							if (n++, h.currentWindow.frames["frame_" + s] != undefined) {
								for (i = $(h.currentWindow.frames["frame_" + s].document.body), i.find("form").children().length == 0 && n < 5 && setTimeout(t, 500), h.ModalBody[s] = i.clone(!0), f = $(h.ModalBody[s]).find("input,select,area,radio,textarea"), e = i.find("input,select,area,radio,textarea"), r = 0; r < f.length; r++) $(f[r]).val($(e[r]).val());
								/msie/.test(navigator.userAgent.toLowerCase()) && !/opera/.test(navigator.userAgent.toLowerCase()) && (u = i.find("#ie11focus"), u.length == 0 && (u = $("<input type='text' id='ie11focus' style='width:0;height:0;padding:0;margin:0;border:0;' />"), i.find(".sheet_container").prepend(u)), u.focus())
							}
						};
					t();
					h.ClickDocumentToClose.apply(h, [s])
				});
				typeof f != "undefined" && (top.$.ISideModal.CustomParams[s] = f);
				$.isFunction(i) && (this.CallBackArray[s] = i)
			}
		},
		SetTile: function(n, t) {
			t ? $("#tile_" + t).text(n) : (t = top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1], t && this.SetTile(n, t))
		},
		GetParamValue: function(n) {
			var t = top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1];
			return top.$.ISideModal.CustomParams[t] == null || top.$.ISideModal.CustomParams[t][n] == "undefined" ? null : top.$.ISideModal.CustomParams[t][n]
		},
		ClickDocumentToClose: function(n) {
			var i = [],
				u = this,
				t, r;
			for (i.push(this.oldWindow), t = this.oldWindow; t != top;) i.push(t.parent), t = t.parent;
			t == top && (r = $(top.document).find('iframe[data-active="true"]'), r.length > 0 && i.push(r[0].contentWindow));
			$.each(i, function(t, i) {
				var f = $(i.document).data("events"),
					e, r;
				if (f && f.click) for (e = f.click, r = 0; r < e.length; r++) if (e[r].namespace == "Close_" + n) return;
				$(i.document).off("click.Close_" + n).one("click.Close_" + n, [n, u], function(t) {
					var r = t.data[0];
					return $(t.target).closest("#" + r).length == 0 && $(t.target).closest("div.jconfirm").length == 0 && $(t.target).closest("div.modal-backdrop").length == 0 && $(t.target).closest("div.modal-dialog-confirm").length == 0 && $(t.target).closest(".DeveloperTool").length == 0 && $(t.target).closest(".DeveloperMask").length == 0 ? i == top && top.$.ISideModal.ModalIdArray.length > 1 && r == top.$.ISideModal.ModalIdArray[0] ? ($.ISideModal.CloseAllModal(), !1) : top.$.ISideModal.ModalIdArray.length == 0 ? !1 : ($.ISideModal.AutoClose(r, !0), !t.data[1].IsChanged) : (t.data[1].ClickDocumentToClose.apply(t.data[1], [n]), !1)
				})
			})
		},
		CheckBodyIsChange: function(n) {
			var u = this.ModalBody[n],
				f, o, i, r, s, c, t;
			if (u == null || this.currentWindow.frames["frame_" + n] == null) return !1;
			var e = $(this.currentWindow.frames["frame_" + n].document.body),
				h = u.find("input:not([type='file']),select,area,radio,textarea"),
				l = e.find("input:not([type='file']),select,area,radio,textarea");
			for (t = 0; t < h.length; t++) if ((f = $(h[t]), o = $(l[t]), f.val() != o.val()) || (f.attr("type") == "radio" || f.attr("type") == "checkbox") && f.prop("checked") != o.prop("checked")) return !0;
			for (i = u.find("div.SheetUser[data-datafield][data-controlkey='FormUser']"), r = e.find("div.SheetUser[data-datafield][data-controlkey='FormUser']"), t = 0; t < i.length; t++) if ($(i[t]).find("span.SheetUser-Item").length != $(r[t]).find("span.SheetUser-Item").length || $(i[t]).find("span.SheetUser-Item").length > 0 && (console.log($(i[t]).find("span.SheetUser-Item").text()), $(i[t]).find("span.SheetUser-Item").text() != $(r[t]).find("span.SheetUser-Item").text())) return !0;
			for (i = u.find("div.SheetUser[data-datafield][data-controlkey='FormMultiUser']"), r = e.find("div.SheetUser[data-datafield][data-controlkey='FormMultiUser']"), t = 0; t < i.length; t++) if ($(i[t]).find("span.SheetUser-Item").length != $(r[t]).find("span.SheetUser-Item").length || $(i[t]).find("span.SheetUser-Item").length > 0 && (console.log($(i[t]).find("span.SheetUser-Item").text()), $(i[t]).find("span.SheetUser-Item").text() != $(r[t]).find("span.SheetUser-Item").text())) return !0;
			for (s = u.find("div[data-datafield][data-controlkey='SheetQuery']"), c = e.find("div[data-datafield][data-controlkey='SheetQuery']"), t = 0; t < s.length; t++) if ($(s[t]).find("pre").html() != $(c[t]).find("pre").html()) return !0;
			return !1
		},
		HideLastModal: function() {
			top.$.ISideModal.ModalIdArray.length > 0 && $("#" + top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1]).animate({
				right: $("body").width() * -.75
			})
		},
		CloseAllModal: function() {
			for (var n = top.$.ISideModal.ModalIdArray.length - 1; n >= 0; n--) this.Close(top.$.ISideModal.ModalIdArray[n]);
			top.$.ISideModal.ModalIdArray = []
		},
		AutoClose: function(n, t) {
			var i = this;
			if (this.CheckIsChange && this.CheckBodyIsChange(n)) {
				this.IsChanged = !0;
				$.IConfirm("", "确定放弃保存?放弃后数据不会被保存！", function(r) {
					i.IsChanged = !1;
					r ? (delete i.ModalBody[n], i.Close.apply(i, [n])) : t && i.ClickDocumentToClose.apply(i, [n])
				});
				return
			}
			this.Close(n)
		},
		Close: function(n, t) {
			var i = this,
				r;
			n ? (this.currentWindow == undefined && (this.currentWindow = top), i.ShowPreModalNav(), $(this.currentWindow.document).unbind("click.Close_" + n), this.currentWindow.$("#" + n).animate({
				right: this.currentWindow.$("body").width() * -.75
			}, function() {
				i.currentWindow.$("#" + n).find("iframe").remove();
				i.currentWindow.$("#" + n).remove();
				i.currentWindow.$("body").css("overflow-y", "auto");
				i.currentWindow.$("body").removeClass("modal-back")
			}), r = $.inArray(n, top.$.ISideModal.ModalIdArray), r > -1 && top.$.ISideModal.ModalIdArray.splice(r, 1), this.CallBackArray[n] && $.isFunction(this.CallBackArray[n]) && this.CallBackArray[n].call(this, t)) : this.CloseLastModal(t)
		},
		CloseLastModal: function(n) {
			top.$.ISideModal.ModalIdArray.length > 0 && this.Close(top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1], n)
		},
		ShowLastModal: function() {
			if (top.$.ISideModal.ModalIdArray.length > 0) {
				var n = top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 1];
				$("#" + n).animate({
					right: 0
				});
				this.ClickDocumentToClose.apply(this, [n])
			}
		},
		GetPreModalBody: function() {
			return top.$.ISideModal.ModalIdArray && top.$.ISideModal.ModalIdArray.length > 1 ? window.frames["frame_" + top.$.ISideModal.ModalIdArray[top.$.ISideModal.ModalIdArray.length - 2]].document.body : null
		},
		HidePreModalNav: function() {
			this.currentWindow != top && $(this.currentWindow.document.body).find("ul.navbar-nav").hide()
		},
		ShowPreModalNav: function() {
			window.parent && $(this.currentWindow.document.body).find("ul.navbar-nav").show()
		},
		IsAnnounceShow: function() {
			var n = $(".announce");
			return n && n.is(":visible") ? !0 : !1
		}
	},
	ISheetModal: {
		SheetMoal: null,
		Show: function(n, t, i) {
			n = n.indexOf("?") > -1 ? n + "&t=" + $.IGuid() : n + "?t=" + $.IGuid();
			this.SheetMoal ? this.SheetMoal.Show(n) : this.SheetMoal = new $.IModal(t, n, null, null, i)
		},
		Hide: function() {
			this.SheetMoal.Hide()
		}
	},
	IGetDateString: function(n) {
		var o = n.getFullYear(),
			i = n.getMonth() + 1,
			r = n.getDate(),
			u = n.getHours(),
			f = n.getMinutes(),
			e = n.getSeconds(),
			t = "";
		return t = o + "-", t = i > 10 ? t + i + "-" : t + "0" + i + "-", t = r > 10 ? t + r + " " : t + "0" + r + " ", t = u > 10 ? t + u + ":" : t + "0" + u + ":", t = f > 10 ? t + f + ":" : t + "0" + f + ":", e > 10 ? t + e : t + "0" + e
	},
	IGetIndex: function(n, t, i) {
		for (var r = 0; r < t.length; r++) if (t[r][i] == n[i]) return r;
		return -1
	},
	IIfMobile: function() {
		var n = function() {
				var t = navigator.userAgent.toLowerCase(),
					n = {
						IOS: /ipod|iphone|ipad/.test(t),
						IPHONE: /iphone/.test(t),
						IPAD: /ipad/.test(t),
						ANDROID: /android/.test(t),
						WINDOWS: /windows/.test(t),
						TOUCH_DEVICE: "ontouchstart" in window || /touch/.test(t),
						MOBILE: /mobile/.test(t),
						ANDROID_TABLET: !1,
						WINDOWS_TABLET: !1,
						TABLET: !1,
						SMART_PHONE: !1
					};
				return n.ANDROID_TABLET = n.ANDROID && !n.MOBILE, n.WINDOWS_TABLET = n.WINDOWS && /tablet/.test(t), n.TABLET = n.IPAD || n.ANDROID_TABLET || n.WINDOWS_TABLET, n.SMART_PHONE = n.MOBILE && !n.TABLET, n
			}();
		return n.SMART_PHONE ? !0 : !1
	},
	IValidateStrictText: function(n, t) {
		var r, u, i;
		if (n == null || n.trim() == "") return !1;
		if (r = ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "{", "]", "}", "\\", "|", ";", ":", "'", '"', ",", "<", ".", ">", "/?", " ", "~", "！", "￥", "…", "（", "）", "【", "】", "、", "：", "；", "‘", "“", "”", "，", "。", "《", "》", "？"], !$.isEmptyObject(t)) for (i = 0; i < t.length; i++) u = r.indexOf(t[i]), u > -1 && r.splice(u, 1);
		for (i = 0; i < n.length; i++) if (r.indexOf(n.charAt(i)) > -1) return !1;
		return !0
	},
	IValidatePassword: function(n) {
		var i, r, t, u;
		if (n == null || n.trim() == "" || (i = /^[a-zA-Z0-9,.'"~!@@#$%^&*()_+{}[]|\/:;<>?`-=·！￥…（）—【】、，。《》？]*$/, r = /\s/, n.length < 6 || n.length > 20)) return !1;
		for (t = 0; t < n.length; t++) if (!i.test(n.charAt(t)) || r.test(n.charAt(t))) return !1;
		return (u = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, !u.test(n)) ? !1 : !0
	},
	IValidateMobile: function(n) {
		if (n == null || n.trim() == "") return !1;
		return /^1[3-8]\d{9}$/.test(n)
	},
	IValidateEmail: function(n) {
		if (n == null || n.trim() == "") return !1;
		return /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/.test(n)
	},
	IValidateChat: function() {},
	Ipreview: function(n) {
		var t = n.attr("data-imgurl"),
			i;
		t != "null" && t != null && t != void 0 && (i = $('<div class="preimg"><img src="' + t + '"  class="pcimg" /><\/div>'), n.mouseover(function(t) {
			n.after(i);
			$(".preimg").css({
				top: t.clientY + 3,
				left: t.clientX + 10
			})
		}).mousemove(function(n) {
			$(".preimg").css({
				top: n.clientY + 3,
				left: n.clientX + 10
			})
		}).mouseout(function() {
			$(".preimg").remove()
		}))
	},
	ISetCookie: function(n, t) {
		var i = n + "=" + escape(t);
		document.cookie = i
	},
	IGetCookie: function(n) {
		var i = document.cookie.split(";"),
			n, t, r;
		if (!n) return null;
		for (n = n.trim(), t = 0; t < i.length; t++) if (r = i[t].split("=")[0].trim(), r == n) return i[t].split("=")[1];
		return null
	},
	IRemoveCookie: function(n) {
		document.cookie = n + "=;expires=" + new Date(0).toGMTString()
	},
	IFontPicker: function() {
		var t = [],
			n = [],
			r = function() {
				var n = document.location.href,
					i = document.location.pathname,
					r = n.substr(0, n.indexOf(i));
				$.ajaxSettings.async = !1;
				$.getJSON(r + "/Content/H3-Icon/selection.json", function(n) {
					for (var r = [], i = 0, u = n.icons.length; i < u; i++) r.push("icon-" + n.icons[i].properties.name);
					t = r
				})
			},
			i;
		return r(), this.AddFontPicker = function(i) {
			if (t.length > 0) {
				var r = $(i).fontIconPicker({
					source: t,
					emptyIcon: !1,
					hasSearch: !1
				});
				n.push({
					selecter: i.selecter,
					picker: r
				})
			}
		}, i = function(t) {
			if (t) {
				if (n.length == 1) return n[0].picker;
				for (var i = 0, r = n.length; i < r; i++) if (n[i].picker && n[i].picker.selector == t.selector) return n[i].picker;
				return null
			}
		}, this.SetIcon = function(r, u) {
			var f = null;
			f = u ? i(u) : n[0].picker;
			f && f.refreshPicker({
				source: t,
				emptyIcon: !0,
				emptyIconValue: r,
				hasSearch: !1
			})
		}, this
	},
	isArray: function(n) {
		return Object.prototype.toString.call(n) === "[object Array]"
	},
	IShowLoading: function(n) {
		var n = n || "处理中，请稍等...",
			t = $(".loading-back");
		t.length > 0 ? t.find("load-title").text(n).end().show() : (t = $('<div class="loading-back"><div class="loading"><i class="fa fa-spinner fa-4x fa-pulse"><\/i><span class="load-title">' + n + "<\/span><\/div><\/div>"), $("body").append(t.show()))
	},
	IHideLoading: function() {
		$(".loading-back").hide()
	},
	IFilterCharacter: function(n) {
		var i = n,
			t = n.match(/[\u4e00-\u9fa5a-zA-Z0-9\~\!\@\#\$\%\&\*\(\)\_\+\|\:\"\<\>\?\/\-\=\[\]\;\,\.\！\￥\……]/g);
		return t == null ? "" : t.join("")
	},
	IToKbit: function(n) {
		var e = n,
			n = (n || 0).toString(),
			t = "",
			u;
		if (isNaN(n)) return 0;
		var r = n + "",
			i = r.indexOf("."),
			f = "";
		for (i > -1 && (n = r.slice(0, i), f = r.slice(i)), n = parseInt(n), u = !1, parseFloat(e) < 0 && (u = !0, n = Math.abs(n) + ""), n += ""; n.length > 3;) t = "," + n.slice(-3) + t, n = n.slice(0, n.length - 3);
		return n && (t = n + t), i > -1 && (t += f), u && (t = "-" + t), t
	},
	GetFirstAndLastMonthDay: function(n, t) {
		var r = n + "-" + t + "-01",
			i = new Date(n, t, 0);
		return n + "-" + t + "-" + i.getDate()
	},
	GetFirstAndLastdayweek: function() {
		var n = new Date;
		return n.getDay() != 0 ? n.setDate(n.getDate() - n.getDay() + 1) : n.setDate(n.getDate() - 6), weekfirstday = n.getFullYear() + "-" + (n.getMonth() - -1) + "-" + n.getDate(), n.setDate(n.getDate() + 6), weekdayLast = n.getFullYear() + "-" + (n.getMonth() - -1) + "-" + n.getDate(), [weekfirstday, weekdayLast]
	},
	GetFirstAndLastDayQuarter: function() {
		var f = new Date,
			t = f.getMonth() - -1,
			n = f.getFullYear();
		if (t >= 1 && t <= 3) {
			var i = n + "-" + 1 + "-01",
				r = new Date(n, 3, 0),
				u = n + "-" + 3 + "-" + r.getDate();
			return [i, u]
		}
		if (t >= 4 && t <= 6) {
			var i = n + "-" + 4 + "-01",
				r = new Date(n, 6, 0),
				u = n + "-" + 6 + "-" + r.getDate();
			return [i, u]
		}
		if (t >= 7 && t <= 9) {
			var i = n + "-07-01",
				r = new Date(n, 9, 0),
				u = n + "-09-" + r.getDate();
			return [i, u]
		}
		if (t >= 10 && t <= 12) {
			var i = n + "-10-01",
				r = new Date(n, 12, 0),
				u = n + "-12-" + r.getDate();
			return [i, u]
		}
	},
	nodeToString: function(n) {
		var t = document.createElement("div"),
			i;
		return t.appendChild(n.cloneNode(!0)), i = t.innerHTML, t = n = null, i
	},
	ClearArray: function(n) {
		var t, i;
		if (n) for (i = n.length - 1; i >= 0; i--) t = n.pop(), t.free && t.free(), t = null
	},
	Throttle: function(n, t, i) {
		return function() {
			var r = arguments;
			clearTimeout(n.timerId);
			n.timerId = setTimeout(function() {
				n.apply(t, r)
			}, i)
		}
	},
	GetDateTime: function(d) {
		return eval("new " + d.substr(1, d.length - 2))
	}
});
jQuery.extend($.SheetRuntimeContentCache, {
	MaxSheetNumber: 200,
	KeyName: "SheetRuntimeContentCache",
	TimeStampName: "TimeStamp",
	SheetContentName: "SheetContent",
	SchemaCodeName: "SchemaCode",
	JavaScriptName: "Javascript",
	EngineCodeName: "EngineCode",
	ListJavaScriptName: "ListJavascript",
	ListPostFix: "_List",
	Init: function(n) {
		var i = localStorage.getItem(this.KeyName),
			t, r, u;
		if (i && i != "") {
			t = JSON.parse(i);
			t[this.EngineCodeName] != n && (this.Clear(), t[this.EngineCodeName] = n);
			r = 0;
			for (u in t) r++;
			r > this.MaxSheetNumber && this.Clear()
		}
	},
	Get: function(n, t) {
		var r = localStorage.getItem(this.KeyName),
			i;
		return !r || r == "" ? null : (i = JSON.parse(r), t == "form") ? i[n] ? i[n] : null : t == "list" ? i[n + this.ListPostFix] ? i[n + this.ListPostFix] : null : void 0
	},
	Set: function(n, t, i, r, u, f) {
		var o, e;
		if (u == "form") {
			if (!n || !t || !i) return;
			o = localStorage.getItem(this.KeyName);
			e = o && o != "" ? JSON.parse(o) : {};
			e[n] || (e[n] = {});
			e[n][this.TimeStampName] = i;
			e[n][this.SheetContentName] = t;
			e[n][this.JavaScriptName] = r;
			e[this.EngineCodeName] = f;
			localStorage.setItem(this.KeyName, JSON.stringify(e))
		} else u == "list" && (o = localStorage.getItem(this.KeyName), e = o && o != "" ? JSON.parse(o) : {}, e[n + this.ListPostFix] || (e[n + this.ListPostFix] = {}), e[n + this.ListPostFix][this.TimeStampName] = i, e[n + this.ListPostFix][this.ListJavaScriptName] = r, e[this.EngineCodeName] = f, localStorage.setItem(this.KeyName, JSON.stringify(e)))
	},
	Clear: function() {
		localStorage.setItem(this.KeyName, "")
	}
});
SolutionState = {
	Expire: 0,
	WillExpire: 1,
	BOCountWillExceed: 5,
	BOCountExceed: 6,
	FileSizeWillExceed: 7,
	FileSizeExceed: 8,
	WillExpireAndBOCountExceed: 9,
	WillExpireAndBOCountWillExceed: 10,
	WillExpireAndFileSizeWillExceed: 11,
	WillExpireAndFileSizeExceed: 12,
	WillExpireAndBOCountExceedAndFileSizeExceed: 13,
	WillExpireAndBOCountExceedAndFileSizeWillExceed: 14,
	WillExpireAndBOCountWillExceedAndFileSizeExceed: 15,
	WillExpireAndBOCountWillExceedAndFileSizeWillExceed: 16,
	BOCountWillExceedAndFileSizeExceed: 17,
	BOCountWillExceedAndFileSizeWillExceed: 18,
	BOCountExceedAndFileSizeExceed: 19,
	BOCountExceedAndFileSizeWillExceed: 20,
	Normal: 21
};
MessageTemplate = {
	Expire: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务已经到期，为了不影响您的正常使用，请及时更新授权。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpire: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将于{ExpireDate}到期，为了不影响您的正常使用，请及时更新授权。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	BOCountExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用数据量已经用尽，为了不影响您的正常使用，请及时购买数据量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	BOCountWillExceed: {
		content: "&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用数据量即将用尽，为了不影响您的正常使用，请及时购买数据量。点击查看详情>><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00"
	},
	FileSizeExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用附件量已经用尽，为了不影响您的正常使用，请及时购买附件量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	FileSizeWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用附件量即将用尽，为了不影响您的正常使用，请及时购买附件量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndBOCountExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用数据量已经用尽，为了不影响您的正常使用，请及时购买数据量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndBOCountWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用数据量即将用尽，为了不影响您的正常使用，请及时购买数据量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndFileSizeWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用附件量即将用尽，为了不影响您的正常使用，请及时购买附件量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndFileSizeExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用附件量已经用尽，为了不影响您的正常使用，请及时购买附件量。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndBOCountExceedAndFileSizeExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用数据量已经用尽，附件量已经用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndBOCountExceedAndFileSizeWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用数据量已经用尽，附件量即将用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndBOCountWillExceedAndFileSizeExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用数据量即将用尽，附件量已经用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	WillExpireAndBOCountWillExceedAndFileSizeWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用应用服务即将到期，为了不影响您的正常使用，请及时更新授权。<br/>&nbsp;&nbsp;&nbsp;&nbsp;您的该应用数据量即将用尽，附件量即将用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	BOCountWillExceedAndFileSizeExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用数据量即将用尽，附件量已经用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	BOCountWillExceedAndFileSizeWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用数据量即将用尽，附件量即将用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	BOCountExceedAndFileSizeExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用数据量已经用尽，附件量已经用尽，为了不影响您的正常使用，请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	},
	BOCountExceedAndFileSizeWillExceed: {
		content: '&nbsp;&nbsp;&nbsp;&nbsp;尊敬的氚云用户您好，您的该应用数据量已经用尽，附件量即将用尽，为了不影响您的正常使用,请及时购买。<span class="n-link">点击查看详情>><\/span><br/>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：4000-899-893<br/>&nbsp;&nbsp;&nbsp;&nbsp;服务时间：周一至周五 上午9:00 - 12:00 下午13:30 - 18:00'
	}
};
$(function() {
	var n, t, i;
	$.ajax({
		url: "/Navigation/OnAction",
		dataType: "JSON",
		type: "POST",
		data: {
			PostData: JSON.stringify({
				ActionName: "GetAnnouncements"
			})
		},
		success: function(n) {
			var t, i, r, u;
			if (n.ReturnData && n.ReturnData.Result) {
				if (t = n.ReturnData.Announcement, i = n.ReturnData.EngineCode, localStorage[i + "-" + t.ObjectId + "announce"]) return;
				r = $("#announce-container");
				u = $("<p><\/p>").attr("id", t.ObjectId).html(t.Title);
				r.append(u);
				$(".announce").attr("data-code", t.ObjectId).attr("data-href", t.PCUrl).attr("data-enginecode", i).addClass("block").show();
				$(".mainwrapper").addClass("has-announce")
			}
		},
		error: function() {}
	});
	$("#announce-close").on("click", function(n) {
		$(".announce").removeClass("block").hide();
		$(".mainwrapper").removeClass("has-announce");
		var t = $(".announce").attr("data-code"),
			i = $(".announce").attr("data-enginecode");
		localStorage[i + "-" + t + "announce"] = !0;
		n.stopPropagation()
	});
	$(".announce").click(function() {
		var n = $(this).attr("data-href");
		window.open(n, "_blank")
	});
	$("#app-trigger").powerFloat({
		eventType: "hover",
		hoverHold: !0,
		showDelay: 200,
		position: "7-5",
		reverseSharp: !0,
		width: 300,
		offsets: {
			x: -30,
			y: -10
		}
	});
	$(".top-trigger").powerFloat({
		eventType: "hover",
		hoverHold: !0,
		showDelay: 200,
		position: "7-5",
		reverseSharp: !0
	});
	$("#engine-trigger").powerFloat({
		eventType: "hover",
		hoverHold: !0,
		showDelay: 200,
		position: "7-5",
		reverseSharp: !0,
		offsets: {
			x: -60,
			y: -10
		}
	});

	$("span.head-search-btn").on("click", function() {
		var t = $(this).siblings("input").val(),
			n;
		if (t) n = "_blank", window.location.toString().toLocaleLowerCase().indexOf("/globalsearch") > -1 && (n = "_self"), window.open("/GlobalSearch/Index?Keyword=" + t, n);
		else return
	});
	$("#optionengines").find("li[data-options]").each(function() {
		$(this).on("click", function() {
			var n = $(this).attr("data-code");
			document.cookie = "EngineCode=" + n + ";path=/";
			window.location.href = "/Login/Index?enginecode=" + n
		})
	});
	$("li[data-href]").on("click", function(n) {
		if (top.$.ISideModal.ModalIdArray.length > 0) n.preventDefault();
		else {
			var t = $(this).attr("data-href");
			window.open(t, "_self")
		}
	});
	$(".enter-market").on("click", function() {
		window.open("/store", "_blank")
	});
	$(".box-item").each(function() {
		$(this).on("click", function() {
			var n = $(this).attr("data-href"),
				t = $(this).attr("data-code");
			window.open(n, "_Home_" + t)
		})
	});
	n = $(".leftpanel");
	t = $(".mainpanel");
	$("#Left-tool").unbind("click.left-tool").bind("click.left-tool", function() {
		var r = $(this),
			i, u;
		r.hasClass("left-show") ? (r.removeClass("left-show").addClass("left-hide"), n.show(), t.removeAttr("style")) : (r.removeClass("left-hide").addClass("left-show"), n.hide(), t.css("margin-left", "50px"));
		i = $.ListView.Element.width();
		$.ListView.SetMainContentWidth ? $.ListView.SetMainContentWidth(i) : $.ListView.$Table.width() < i && ($.ListView.$Table.css({
			"min-width": i + "px"
		}), u = $.ListView.$Table.data("bootstrap.table"), u && u.resetView())
	});
	$(".leftpanel").off("mouseenter.leftpanel").on("mouseenter.leftpanel", "span", function() {
		var n = $(this),
			t;
		return n.find("td").length > 0 ? !1 : ($TextLabel.text(n.text()), $TextLabel.width() > n.width() && (t = n.offset(), $tableTip.text(n.text()).css({
			left: t.left + (n.outerWidth() - $tableTip.outerWidth()) / 2 - $(window).scrollLeft(),
			bottom: $(window).height() - t.top + 6 + $(window).scrollTop()
		}).toggle()), !1)
	});
	$(".leftpanel").off("mouseleave.leftpanel").on("mouseleave.leftpanel", "span", function() {
		$tableTip && $tableTip.hide()
	});
	$("#report").off("mouseleave.list").on("mouseleave.list", ".table td,.table th", function() {
		$tableTip && $tableTip.hide()
	});
	i = 0;
	i = $(".leftpanel-saassetting").hasClass("settinghide") ? $(".leftpanel").height() - ($(".leftpanel-saassetting-icon").length > 0 ? $(".leftpanel-saassetting-icon").height() : 0) + "px" : $(".leftpanel").height() - ($(".leftpanel-saassetting").length > 0 ? $(".leftpanel-saassetting").height() : 0) + "px";
	$(".leftpanel>ul").css("max-height", i);
	$(".leftpanel-saassetting-icon").find("span").off("click").on("click", function() {
		$(".leftpanel-saassetting-icon").addClass("settinghide");
		$(".leftpanel-saassetting").removeClass("settinghide");
		$(".leftpanel>ul").css("max-height", $(".leftpanel").height() - $(".leftpanel-saassetting").height() + "px")
	});
	$(".leftpanel-saassetting").find(".saassetting-nav").find("span").off("click").on("click", function() {
		$(".leftpanel-saassetting-icon").removeClass("settinghide");
		$(".leftpanel-saassetting").addClass("settinghide");
		$(".leftpanel>ul").css("max-height", $(".leftpanel").height() - $(".leftpanel-saassetting-icon").height() + "px")
	})
});
var collectMobileValidate = {
	mobile: "",
	verifyCode: "",
	telbox: null,
	IsCollected: !1
},
	countDown = 60,
	clk_flag = !1,
	settime = function() {
		countDown == 0 ? (clk_flag = !1, $("#get-code").text("获取验证码"), $("#get-code").css("padding-left", "15px"), $("#get-code").removeClass("mobile-collect-btn-disabled").addClass("mobile-collect-btn-active"), $("#tip-verifycode").hide(), countDown = 60) : ($("#get-code").removeClass("mobile-collect-btn-active").addClass("mobile-collect-btn-disabled"), $("#get-code").text("重新发送(" + countDown + ")"), $("#get-code").css("padding-left", "10px"), countDown--, setTimeout(function() {
			settime()
		}, 1e3))
	},
	resetVerifyCode = function() {
		$("#get-code").removeClass("mobile-collect-btn-disabled").addClass("mobile-collect-btn-active");
		$("#get-code").text("获取验证码");
		$("#verifyCode").val("");
		countDown = 60
	},
	showCollectMobileTips = function() {
		var n = $("#mobile").val();
		return !n || !/^1(3|4|5|7|8)\d{9}$/.test(n) ? ($("#mobile").next("span").show(), $("#mobile").css("border", "1px solid red"), !1) : !0
	},
	collectMobile = function() {
		if (showCollectMobileTips()) {
			var n = $("#mobile").val(),
				t = $("#verifycode").val();
			if (t != collectMobileValidate.verifyCode) {
				$("#verifycode").next().next("span").show();
				$("#verifycode").css("border", "1px solid red");
				return
			}
			if (n != collectMobileValidate.mobile) {
				$.IShowWarn("手机号码已经发生变化，请重新输入");
				resetVerifyCode();
				return
			}
			$.ajax({
				type: "POST",
				url: "/Account/UpdateAdminTelephone",
				data: {
					Mobile: n
				},
				success: function(n) {
					n.Result ? (collectMobileValidate.IsCollected = !0, collectMobileValidate.telbox && collectMobileValidate.telbox.hide(), $.IShowSuccess("非常感谢您的配合，祝您使用愉快！")) : $.IShowWarn(n.ErrorMessage)
				},
				error: function() {}
			})
		}
	},
	getVerifyCode = function() {
		if (showCollectMobileTips()) {
			var n = $("#mobile").val();
			clk_flag = !0;
			$.ajax({
				type: "POST",
				url: "/Account/SendVerifyCode",
				data: {
					receiveMobile: n
				},
				success: function(n) {
					n.Result && ($("#get-code").removeClass("mobile-collect-btn-active").addClass("mobile-collect-btn-disable"), collectMobileValidate.verifyCode = n.Code, collectMobileValidate.mobile = n.Mobile, $("#tip-verifycode").show(), setTimeout(function() {
						$("#tip-verifycode").fadeOut(2e3)
					}, 1e3), settime())
				},
				error: function() {}
			})
		}
	};
$("#mobile").change(function() {
	var n = $(this).val();
	n ? ($("#get-code").removeClass("mobile-collect-btn-disabled").addClass("mobile-collect-btn-active"), $("#mobile").next("span").hide(), $("#mobile").css("border", "")) : ($("#get-code").removeClass("mobile-collect-btn-active").addClass("mobile-collect-btn-disable"), $("#mobile").next("span").show(), $("#mobile").css("border", "1px solid red"))
});
$("#verifycode").change(function() {
	var n = $(this).val();
	n ? ($("#verifycode").next("span").hide(), $("#verifycode").css("border", ""), $("#tip-verifycode").hide(), $("#btnCollectMobileOK").removeClass("mobile-collect-btn-disable").addClass("mobile-collect-btn-active")) : $("#btnCollectMobileOK").removeClass("mobile-collect-btn-active").addClass("mobile-collect-btn-disable")
});
$("#verifycode").focus(function() {
	var n = $("#mobile").val();
	if ($("#verifycode").next().next("span").hide(), $("#verifycode").css("border", ""), !n) {
		$("#mobile").next("span").text("请输入手机号码");
		$("#mobile").next("span").show();
		$("#mobile").css("border", "1px solid red");
		return
	}
	$("#btnCollectMobileOK").removeClass("mobile-collect-btn-disable").addClass("mobile-collect-btn-active")
}).blur(function() {
	$("#mobile").next("span").text("请正确输入手机号码");
	$("#mobile").next("span").hide();
	$("#mobile").css("border", "")
});
$("#btnCollectMobileOK").off("click").on("click", function() {
	collectMobile()
});
$("#get-code").click(function() {
	clk_flag || getVerifyCode()
});
lefttreeclick = function(n) {
	var i = $(n).parent(),
		t = $(n).find("i");
	i.hasClass("leftopen") ? (i.removeClass("leftopen"), t.removeClass("fa-folder-open"), t.addClass("fa-folder")) : (i.addClass("leftopen"), t.removeClass("fa-folder"), t.addClass("fa-folder-open"))
};
$TextLabel = $("<label style='opacity:0;position:fixed;z-index:-1;'>").hide().appendTo("body");
