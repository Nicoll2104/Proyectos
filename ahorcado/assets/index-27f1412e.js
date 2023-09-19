(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) i(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerPolicy && (s.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function i(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = n(r);
    fetch(r.href, s);
  }
})();
function Ui(e, t) {
  const n = Object.create(null),
    i = e.split(",");
  for (let r = 0; r < i.length; r++) n[i[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const oe = {},
  Ft = [],
  Je = () => {},
  Fo = () => !1,
  To = /^on[^a-z]/,
  Mn = (e) => To.test(e),
  qi = (e) => e.startsWith("onUpdate:"),
  fe = Object.assign,
  Mi = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Qo = Object.prototype.hasOwnProperty,
  Z = (e, t) => Qo.call(e, t),
  O = Array.isArray,
  Tt = (e) => Pn(e) === "[object Map]",
  bs = (e) => Pn(e) === "[object Set]",
  D = (e) => typeof e == "function",
  ae = (e) => typeof e == "string",
  Pi = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  As = (e) => le(e) && D(e.then) && D(e.catch),
  ys = Object.prototype.toString,
  Pn = (e) => ys.call(e),
  Lo = (e) => Pn(e).slice(8, -1),
  Es = (e) => Pn(e) === "[object Object]",
  Oi = (e) =>
    ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  kn = Ui(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  On = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Jo = /-(\w)/g,
  Jt = On((e) => e.replace(Jo, (t, n) => (n ? n.toUpperCase() : ""))),
  Uo = /\B([A-Z])/g,
  Pt = On((e) => e.replace(Uo, "-$1").toLowerCase()),
  ws = On((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ri = On((e) => (e ? `on${ws(e)}` : "")),
  tn = (e, t) => !Object.is(e, t),
  si = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  _n = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  qo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Mo = (e) => {
    const t = ae(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let ar;
const vi = () =>
  ar ||
  (ar =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Ki(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n],
        r = ae(i) ? No(i) : Ki(i);
      if (r) for (const s in r) t[s] = r[s];
    }
    return t;
  } else {
    if (ae(e)) return e;
    if (le(e)) return e;
  }
}
const Po = /;(?![^(]*\))/g,
  Oo = /:([^]+)/,
  Ko = /\/\*[^]*?\*\//g;
function No(e) {
  const t = {};
  return (
    e
      .replace(Ko, "")
      .split(Po)
      .forEach((n) => {
        if (n) {
          const i = n.split(Oo);
          i.length > 1 && (t[i[0].trim()] = i[1].trim());
        }
      }),
    t
  );
}
function Ni(e) {
  let t = "";
  if (ae(e)) t = e;
  else if (O(e))
    for (let n = 0; n < e.length; n++) {
      const i = Ni(e[n]);
      i && (t += i + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const jo =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Do = Ui(jo);
function ks(e) {
  return !!e || e === "";
}
const Rt = (e) =>
    ae(e)
      ? e
      : e == null
      ? ""
      : O(e) || (le(e) && (e.toString === ys || !D(e.toString)))
      ? JSON.stringify(e, xs, 2)
      : String(e),
  xs = (e, t) =>
    t && t.__v_isRef
      ? xs(e, t.value)
      : Tt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [i, r]) => ((n[`${i} =>`] = r), n),
            {}
          ),
        }
      : bs(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : le(t) && !O(t) && !Es(t)
      ? String(t)
      : t;
let Fe;
class Ho {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Fe),
      !t && Fe && (this.index = (Fe.scopes || (Fe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Fe;
      try {
        return (Fe = this), t();
      } finally {
        Fe = n;
      }
    }
  }
  on() {
    Fe = this;
  }
  off() {
    Fe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, i = this.scopes.length; n < i; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Vo(e, t = Fe) {
  t && t.active && t.effects.push(e);
}
function Yo() {
  return Fe;
}
const ji = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Cs = (e) => (e.w & rt) > 0,
  Rs = (e) => (e.n & rt) > 0,
  Wo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= rt;
  },
  zo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let i = 0; i < t.length; i++) {
        const r = t[i];
        Cs(r) && !Rs(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~rt),
          (r.n &= ~rt);
      }
      t.length = n;
    }
  },
  bi = new WeakMap();
let Vt = 0,
  rt = 1;
const Ai = 30;
let Qe;
const mt = Symbol(""),
  yi = Symbol("");
class Di {
  constructor(t, n = null, i) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Vo(this, i);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Qe,
      n = nt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Qe),
        (Qe = this),
        (nt = !0),
        (rt = 1 << ++Vt),
        Vt <= Ai ? Wo(this) : cr(this),
        this.fn()
      );
    } finally {
      Vt <= Ai && zo(this),
        (rt = 1 << --Vt),
        (Qe = this.parent),
        (nt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Qe === this
      ? (this.deferStop = !0)
      : this.active &&
        (cr(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function cr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let nt = !0;
const Ss = [];
function Ot() {
  Ss.push(nt), (nt = !1);
}
function Kt() {
  const e = Ss.pop();
  nt = e === void 0 ? !0 : e;
}
function we(e, t, n) {
  if (nt && Qe) {
    let i = bi.get(e);
    i || bi.set(e, (i = new Map()));
    let r = i.get(n);
    r || i.set(n, (r = ji())), Bs(r);
  }
}
function Bs(e, t) {
  let n = !1;
  Vt <= Ai ? Rs(e) || ((e.n |= rt), (n = !Cs(e))) : (n = !e.has(Qe)),
    n && (e.add(Qe), Qe.deps.push(e));
}
function He(e, t, n, i, r, s) {
  const o = bi.get(e);
  if (!o) return;
  let l = [];
  if (t === "clear") l = [...o.values()];
  else if (n === "length" && O(e)) {
    const a = Number(i);
    o.forEach((u, d) => {
      (d === "length" || d >= a) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(o.get(n)), t)) {
      case "add":
        O(e)
          ? Oi(n) && l.push(o.get("length"))
          : (l.push(o.get(mt)), Tt(e) && l.push(o.get(yi)));
        break;
      case "delete":
        O(e) || (l.push(o.get(mt)), Tt(e) && l.push(o.get(yi)));
        break;
      case "set":
        Tt(e) && l.push(o.get(mt));
        break;
    }
  if (l.length === 1) l[0] && Ei(l[0]);
  else {
    const a = [];
    for (const u of l) u && a.push(...u);
    Ei(ji(a));
  }
}
function Ei(e, t) {
  const n = O(e) ? e : [...e];
  for (const i of n) i.computed && ur(i);
  for (const i of n) i.computed || ur(i);
}
function ur(e, t) {
  (e !== Qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Zo = Ui("__proto__,__v_isRef,__isVue"),
  Is = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Pi)
  ),
  Go = Hi(),
  Xo = Hi(!1, !0),
  $o = Hi(!0),
  fr = el();
function el() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const i = X(this);
        for (let s = 0, o = this.length; s < o; s++) we(i, "get", s + "");
        const r = i[t](...n);
        return r === -1 || r === !1 ? i[t](...n.map(X)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ot();
        const i = X(this)[t].apply(this, n);
        return Kt(), i;
      };
    }),
    e
  );
}
function tl(e) {
  const t = X(this);
  return we(t, "has", e), t.hasOwnProperty(e);
}
function Hi(e = !1, t = !1) {
  return function (i, r, s) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && s === (e ? (t ? vl : Ls) : t ? Qs : Ts).get(i))
      return i;
    const o = O(i);
    if (!e) {
      if (o && Z(fr, r)) return Reflect.get(fr, r, s);
      if (r === "hasOwnProperty") return tl;
    }
    const l = Reflect.get(i, r, s);
    return (Pi(r) ? Is.has(r) : Zo(r)) || (e || we(i, "get", r), t)
      ? l
      : be(l)
      ? o && Oi(r)
        ? l
        : l.value
      : le(l)
      ? e
        ? Js(l)
        : dn(l)
      : l;
  };
}
const nl = _s(),
  il = _s(!0);
function _s(e = !1) {
  return function (n, i, r, s) {
    let o = n[i];
    if (Ut(o) && be(o) && !be(r)) return !1;
    if (
      !e &&
      (!Fn(r) && !Ut(r) && ((o = X(o)), (r = X(r))), !O(n) && be(o) && !be(r))
    )
      return (o.value = r), !0;
    const l = O(n) && Oi(i) ? Number(i) < n.length : Z(n, i),
      a = Reflect.set(n, i, r, s);
    return (
      n === X(s) && (l ? tn(r, o) && He(n, "set", i, r) : He(n, "add", i, r)), a
    );
  };
}
function rl(e, t) {
  const n = Z(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && n && He(e, "delete", t, void 0), i;
}
function sl(e, t) {
  const n = Reflect.has(e, t);
  return (!Pi(t) || !Is.has(t)) && we(e, "has", t), n;
}
function ol(e) {
  return we(e, "iterate", O(e) ? "length" : mt), Reflect.ownKeys(e);
}
const Fs = { get: Go, set: nl, deleteProperty: rl, has: sl, ownKeys: ol },
  ll = {
    get: $o,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  al = fe({}, Fs, { get: Xo, set: il }),
  Vi = (e) => e,
  Kn = (e) => Reflect.getPrototypeOf(e);
function hn(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const r = X(e),
    s = X(t);
  n || (t !== s && we(r, "get", t), we(r, "get", s));
  const { has: o } = Kn(r),
    l = i ? Vi : n ? zi : nn;
  if (o.call(r, t)) return l(e.get(t));
  if (o.call(r, s)) return l(e.get(s));
  e !== r && e.get(t);
}
function gn(e, t = !1) {
  const n = this.__v_raw,
    i = X(n),
    r = X(e);
  return (
    t || (e !== r && we(i, "has", e), we(i, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function pn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && we(X(e), "iterate", mt), Reflect.get(e, "size", e)
  );
}
function dr(e) {
  e = X(e);
  const t = X(this);
  return Kn(t).has.call(t, e) || (t.add(e), He(t, "add", e, e)), this;
}
function hr(e, t) {
  t = X(t);
  const n = X(this),
    { has: i, get: r } = Kn(n);
  let s = i.call(n, e);
  s || ((e = X(e)), (s = i.call(n, e)));
  const o = r.call(n, e);
  return (
    n.set(e, t), s ? tn(t, o) && He(n, "set", e, t) : He(n, "add", e, t), this
  );
}
function gr(e) {
  const t = X(this),
    { has: n, get: i } = Kn(t);
  let r = n.call(t, e);
  r || ((e = X(e)), (r = n.call(t, e))), i && i.call(t, e);
  const s = t.delete(e);
  return r && He(t, "delete", e, void 0), s;
}
function pr() {
  const e = X(this),
    t = e.size !== 0,
    n = e.clear();
  return t && He(e, "clear", void 0, void 0), n;
}
function mn(e, t) {
  return function (i, r) {
    const s = this,
      o = s.__v_raw,
      l = X(o),
      a = t ? Vi : e ? zi : nn;
    return (
      !e && we(l, "iterate", mt), o.forEach((u, d) => i.call(r, a(u), a(d), s))
    );
  };
}
function vn(e, t, n) {
  return function (...i) {
    const r = this.__v_raw,
      s = X(r),
      o = Tt(s),
      l = e === "entries" || (e === Symbol.iterator && o),
      a = e === "keys" && o,
      u = r[e](...i),
      d = n ? Vi : t ? zi : nn;
    return (
      !t && we(s, "iterate", a ? yi : mt),
      {
        next() {
          const { value: g, done: h } = u.next();
          return h
            ? { value: g, done: h }
            : { value: l ? [d(g[0]), d(g[1])] : d(g), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ze(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function cl() {
  const e = {
      get(s) {
        return hn(this, s);
      },
      get size() {
        return pn(this);
      },
      has: gn,
      add: dr,
      set: hr,
      delete: gr,
      clear: pr,
      forEach: mn(!1, !1),
    },
    t = {
      get(s) {
        return hn(this, s, !1, !0);
      },
      get size() {
        return pn(this);
      },
      has: gn,
      add: dr,
      set: hr,
      delete: gr,
      clear: pr,
      forEach: mn(!1, !0),
    },
    n = {
      get(s) {
        return hn(this, s, !0);
      },
      get size() {
        return pn(this, !0);
      },
      has(s) {
        return gn.call(this, s, !0);
      },
      add: Ze("add"),
      set: Ze("set"),
      delete: Ze("delete"),
      clear: Ze("clear"),
      forEach: mn(!0, !1),
    },
    i = {
      get(s) {
        return hn(this, s, !0, !0);
      },
      get size() {
        return pn(this, !0);
      },
      has(s) {
        return gn.call(this, s, !0);
      },
      add: Ze("add"),
      set: Ze("set"),
      delete: Ze("delete"),
      clear: Ze("clear"),
      forEach: mn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = vn(s, !1, !1)),
        (n[s] = vn(s, !0, !1)),
        (t[s] = vn(s, !1, !0)),
        (i[s] = vn(s, !0, !0));
    }),
    [e, n, t, i]
  );
}
const [ul, fl, dl, hl] = cl();
function Yi(e, t) {
  const n = t ? (e ? hl : dl) : e ? fl : ul;
  return (i, r, s) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? i
      : Reflect.get(Z(n, r) && r in i ? n : i, r, s);
}
const gl = { get: Yi(!1, !1) },
  pl = { get: Yi(!1, !0) },
  ml = { get: Yi(!0, !1) },
  Ts = new WeakMap(),
  Qs = new WeakMap(),
  Ls = new WeakMap(),
  vl = new WeakMap();
function bl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Al(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : bl(Lo(e));
}
function dn(e) {
  return Ut(e) ? e : Wi(e, !1, Fs, gl, Ts);
}
function yl(e) {
  return Wi(e, !1, al, pl, Qs);
}
function Js(e) {
  return Wi(e, !0, ll, ml, Ls);
}
function Wi(e, t, n, i, r) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = r.get(e);
  if (s) return s;
  const o = Al(e);
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? i : n);
  return r.set(e, l), l;
}
function Qt(e) {
  return Ut(e) ? Qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ut(e) {
  return !!(e && e.__v_isReadonly);
}
function Fn(e) {
  return !!(e && e.__v_isShallow);
}
function Us(e) {
  return Qt(e) || Ut(e);
}
function X(e) {
  const t = e && e.__v_raw;
  return t ? X(t) : e;
}
function Nn(e) {
  return _n(e, "__v_skip", !0), e;
}
const nn = (e) => (le(e) ? dn(e) : e),
  zi = (e) => (le(e) ? Js(e) : e);
function qs(e) {
  nt && Qe && ((e = X(e)), Bs(e.dep || (e.dep = ji())));
}
function Ms(e, t) {
  e = X(e);
  const n = e.dep;
  n && Ei(n);
}
function be(e) {
  return !!(e && e.__v_isRef === !0);
}
function he(e) {
  return El(e, !1);
}
function El(e, t) {
  return be(e) ? e : new wl(e, t);
}
class wl {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : X(t)),
      (this._value = n ? t : nn(t));
  }
  get value() {
    return qs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Fn(t) || Ut(t);
    (t = n ? t : X(t)),
      tn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : nn(t)), Ms(this));
  }
}
function kl(e) {
  return be(e) ? e.value : e;
}
const xl = {
  get: (e, t, n) => kl(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const r = e[t];
    return be(r) && !be(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, i);
  },
};
function Ps(e) {
  return Qt(e) ? e : new Proxy(e, xl);
}
class Cl {
  constructor(t, n, i, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Di(t, () => {
        this._dirty || ((this._dirty = !0), Ms(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = i);
  }
  get value() {
    const t = X(this);
    return (
      qs(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Rl(e, t, n = !1) {
  let i, r;
  const s = D(e);
  return (
    s ? ((i = e), (r = Je)) : ((i = e.get), (r = e.set)),
    new Cl(i, r, s || !r, n)
  );
}
function it(e, t, n, i) {
  let r;
  try {
    r = i ? e(...i) : e();
  } catch (s) {
    jn(s, t, n);
  }
  return r;
}
function Ie(e, t, n, i) {
  if (D(e)) {
    const s = it(e, t, n, i);
    return (
      s &&
        As(s) &&
        s.catch((o) => {
          jn(o, t, n);
        }),
      s
    );
  }
  const r = [];
  for (let s = 0; s < e.length; s++) r.push(Ie(e[s], t, n, i));
  return r;
}
function jn(e, t, n, i = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const o = t.proxy,
      l = n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, o, l) === !1) return;
      }
      s = s.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      it(a, null, 10, [e, o, l]);
      return;
    }
  }
  Sl(e, n, r, i);
}
function Sl(e, t, n, i = !0) {
  console.error(e);
}
let rn = !1,
  wi = !1;
const ve = [];
let Ke = 0;
const Lt = [];
let je = null,
  dt = 0;
const Os = Promise.resolve();
let Zi = null;
function Tn(e) {
  const t = Zi || Os;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bl(e) {
  let t = Ke + 1,
    n = ve.length;
  for (; t < n; ) {
    const i = (t + n) >>> 1;
    sn(ve[i]) < e ? (t = i + 1) : (n = i);
  }
  return t;
}
function Gi(e) {
  (!ve.length || !ve.includes(e, rn && e.allowRecurse ? Ke + 1 : Ke)) &&
    (e.id == null ? ve.push(e) : ve.splice(Bl(e.id), 0, e), Ks());
}
function Ks() {
  !rn && !wi && ((wi = !0), (Zi = Os.then(js)));
}
function Il(e) {
  const t = ve.indexOf(e);
  t > Ke && ve.splice(t, 1);
}
function _l(e) {
  O(e)
    ? Lt.push(...e)
    : (!je || !je.includes(e, e.allowRecurse ? dt + 1 : dt)) && Lt.push(e),
    Ks();
}
function mr(e, t = rn ? Ke + 1 : 0) {
  for (; t < ve.length; t++) {
    const n = ve[t];
    n && n.pre && (ve.splice(t, 1), t--, n());
  }
}
function Ns(e) {
  if (Lt.length) {
    const t = [...new Set(Lt)];
    if (((Lt.length = 0), je)) {
      je.push(...t);
      return;
    }
    for (je = t, je.sort((n, i) => sn(n) - sn(i)), dt = 0; dt < je.length; dt++)
      je[dt]();
    (je = null), (dt = 0);
  }
}
const sn = (e) => (e.id == null ? 1 / 0 : e.id),
  Fl = (e, t) => {
    const n = sn(e) - sn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function js(e) {
  (wi = !1), (rn = !0), ve.sort(Fl);
  const t = Je;
  try {
    for (Ke = 0; Ke < ve.length; Ke++) {
      const n = ve[Ke];
      n && n.active !== !1 && it(n, null, 14);
    }
  } finally {
    (Ke = 0),
      (ve.length = 0),
      Ns(),
      (rn = !1),
      (Zi = null),
      (ve.length || Lt.length) && js();
  }
}
function Tl(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || oe;
  let r = n;
  const s = t.startsWith("update:"),
    o = s && t.slice(7);
  if (o && o in i) {
    const d = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: g, trim: h } = i[d] || oe;
    h && (r = n.map((A) => (ae(A) ? A.trim() : A))), g && (r = n.map(qo));
  }
  let l,
    a = i[(l = ri(t))] || i[(l = ri(Jt(t)))];
  !a && s && (a = i[(l = ri(Pt(t)))]), a && Ie(a, e, 6, r);
  const u = i[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Ie(u, e, 6, r);
  }
}
function Ds(e, t, n = !1) {
  const i = t.emitsCache,
    r = i.get(e);
  if (r !== void 0) return r;
  const s = e.emits;
  let o = {},
    l = !1;
  if (!D(e)) {
    const a = (u) => {
      const d = Ds(u, t, !0);
      d && ((l = !0), fe(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !s && !l
    ? (le(e) && i.set(e, null), null)
    : (O(s) ? s.forEach((a) => (o[a] = null)) : fe(o, s),
      le(e) && i.set(e, o),
      o);
}
function Dn(e, t) {
  return !e || !Mn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Z(e, t[0].toLowerCase() + t.slice(1)) || Z(e, Pt(t)) || Z(e, t));
}
let Be = null,
  Hs = null;
function Qn(e) {
  const t = Be;
  return (Be = e), (Hs = (e && e.type.__scopeId) || null), t;
}
function Yt(e, t = Be, n) {
  if (!t || e._n) return e;
  const i = (...r) => {
    i._d && Br(-1);
    const s = Qn(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Qn(s), i._d && Br(1);
    }
    return o;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function oi(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: r,
    props: s,
    propsOptions: [o],
    slots: l,
    attrs: a,
    emit: u,
    render: d,
    renderCache: g,
    data: h,
    setupState: A,
    ctx: w,
    inheritAttrs: x,
  } = e;
  let B, M;
  const S = Qn(e);
  try {
    if (n.shapeFlag & 4) {
      const _ = r || i;
      (B = Oe(d.call(_, _, g, s, A, h, w))), (M = a);
    } else {
      const _ = t;
      (B = Oe(
        _.length > 1 ? _(s, { attrs: a, slots: l, emit: u }) : _(s, null)
      )),
        (M = t.props ? a : Ql(a));
    }
  } catch (_) {
    (en.length = 0), jn(_, e, 1), (B = ge(De));
  }
  let K = B;
  if (M && x !== !1) {
    const _ = Object.keys(M),
      { shapeFlag: q } = K;
    _.length && q & 7 && (o && _.some(qi) && (M = Ll(M, o)), (K = st(K, M)));
  }
  return (
    n.dirs && ((K = st(K)), (K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (K.transition = n.transition),
    (B = K),
    Qn(S),
    B
  );
}
const Ql = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Mn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ll = (e, t) => {
    const n = {};
    for (const i in e) (!qi(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
    return n;
  };
function Jl(e, t, n) {
  const { props: i, children: r, component: s } = e,
    { props: o, children: l, patchFlag: a } = t,
    u = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return i ? vr(i, o, u) : !!o;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        const h = d[g];
        if (o[h] !== i[h] && !Dn(u, h)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : i === o
      ? !1
      : i
      ? o
        ? vr(i, o, u)
        : !0
      : !!o;
  return !1;
}
function vr(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < i.length; r++) {
    const s = i[r];
    if (t[s] !== e[s] && !Dn(n, s)) return !0;
  }
  return !1;
}
function Ul({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const ql = (e) => e.__isSuspense;
function Ml(e, t) {
  t && t.pendingBranch
    ? O(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : _l(e);
}
const bn = {};
function vt(e, t, n) {
  return Vs(e, t, n);
}
function Vs(
  e,
  t,
  { immediate: n, deep: i, flush: r, onTrack: s, onTrigger: o } = oe
) {
  var l;
  const a = Yo() === ((l = pe) == null ? void 0 : l.scope) ? pe : null;
  let u,
    d = !1,
    g = !1;
  if (
    (be(e)
      ? ((u = () => e.value), (d = Fn(e)))
      : Qt(e)
      ? ((u = () => e), (i = !0))
      : O(e)
      ? ((g = !0),
        (d = e.some((_) => Qt(_) || Fn(_))),
        (u = () =>
          e.map((_) => {
            if (be(_)) return _.value;
            if (Qt(_)) return pt(_);
            if (D(_)) return it(_, a, 2);
          })))
      : D(e)
      ? t
        ? (u = () => it(e, a, 2))
        : (u = () => {
            if (!(a && a.isUnmounted)) return h && h(), Ie(e, a, 3, [A]);
          })
      : (u = Je),
    t && i)
  ) {
    const _ = u;
    u = () => pt(_());
  }
  let h,
    A = (_) => {
      h = S.onStop = () => {
        it(_, a, 4);
      };
    },
    w;
  if (ln)
    if (
      ((A = Je),
      t ? n && Ie(t, a, 3, [u(), g ? [] : void 0, A]) : u(),
      r === "sync")
    ) {
      const _ = qa();
      w = _.__watcherHandles || (_.__watcherHandles = []);
    } else return Je;
  let x = g ? new Array(e.length).fill(bn) : bn;
  const B = () => {
    if (S.active)
      if (t) {
        const _ = S.run();
        (i || d || (g ? _.some((q, Y) => tn(q, x[Y])) : tn(_, x))) &&
          (h && h(),
          Ie(t, a, 3, [_, x === bn ? void 0 : g && x[0] === bn ? [] : x, A]),
          (x = _));
      } else S.run();
  };
  B.allowRecurse = !!t;
  let M;
  r === "sync"
    ? (M = B)
    : r === "post"
    ? (M = () => ye(B, a && a.suspense))
    : ((B.pre = !0), a && (B.id = a.uid), (M = () => Gi(B)));
  const S = new Di(u, M);
  t
    ? n
      ? B()
      : (x = S.run())
    : r === "post"
    ? ye(S.run.bind(S), a && a.suspense)
    : S.run();
  const K = () => {
    S.stop(), a && a.scope && Mi(a.scope.effects, S);
  };
  return w && w.push(K), K;
}
function Pl(e, t, n) {
  const i = this.proxy,
    r = ae(e) ? (e.includes(".") ? Ys(i, e) : () => i[e]) : e.bind(i, i);
  let s;
  D(t) ? (s = t) : ((s = t.handler), (n = t));
  const o = pe;
  qt(this);
  const l = Vs(r, s.bind(i), n);
  return o ? qt(o) : bt(), l;
}
function Ys(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let r = 0; r < n.length && i; r++) i = i[n[r]];
    return i;
  };
}
function pt(e, t) {
  if (!le(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), be(e))) pt(e.value, t);
  else if (O(e)) for (let n = 0; n < e.length; n++) pt(e[n], t);
  else if (bs(e) || Tt(e))
    e.forEach((n) => {
      pt(n, t);
    });
  else if (Es(e)) for (const n in e) pt(e[n], t);
  return e;
}
function Ws(e, t) {
  const n = Be;
  if (n === null) return e;
  const i = Zn(n) || n.proxy,
    r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [o, l, a, u = oe] = t[s];
    o &&
      (D(o) && (o = { mounted: o, updated: o }),
      o.deep && pt(l),
      r.push({
        dir: o,
        instance: i,
        value: l,
        oldValue: void 0,
        arg: a,
        modifiers: u,
      }));
  }
  return e;
}
function ot(e, t, n, i) {
  const r = e.dirs,
    s = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    s && (l.oldValue = s[o].value);
    let a = l.dir[i];
    a && (Ot(), Ie(a, n, 8, [e.el, l, e, t]), Kt());
  }
}
function Ol() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Yn(() => {
      e.isMounted = !0;
    }),
    wt(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ce = [Function, Array],
  zs = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Ce,
    onEnter: Ce,
    onAfterEnter: Ce,
    onEnterCancelled: Ce,
    onBeforeLeave: Ce,
    onLeave: Ce,
    onAfterLeave: Ce,
    onLeaveCancelled: Ce,
    onBeforeAppear: Ce,
    onAppear: Ce,
    onAfterAppear: Ce,
    onAppearCancelled: Ce,
  },
  Kl = {
    name: "BaseTransition",
    props: zs,
    setup(e, { slots: t }) {
      const n = Ye(),
        i = Ol();
      let r;
      return () => {
        const s = t.default && Gs(t.default(), !0);
        if (!s || !s.length) return;
        let o = s[0];
        if (s.length > 1) {
          for (const x of s)
            if (x.type !== De) {
              o = x;
              break;
            }
        }
        const l = X(e),
          { mode: a } = l;
        if (i.isLeaving) return li(o);
        const u = br(o);
        if (!u) return li(o);
        const d = ki(u, l, i, n);
        xi(u, d);
        const g = n.subTree,
          h = g && br(g);
        let A = !1;
        const { getTransitionKey: w } = u.type;
        if (w) {
          const x = w();
          r === void 0 ? (r = x) : x !== r && ((r = x), (A = !0));
        }
        if (h && h.type !== De && (!ht(u, h) || A)) {
          const x = ki(h, l, i, n);
          if ((xi(h, x), a === "out-in"))
            return (
              (i.isLeaving = !0),
              (x.afterLeave = () => {
                (i.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              li(o)
            );
          a === "in-out" &&
            u.type !== De &&
            (x.delayLeave = (B, M, S) => {
              const K = Zs(i, h);
              (K[String(h.key)] = h),
                (B._leaveCb = () => {
                  M(), (B._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = S);
            });
        }
        return o;
      };
    },
  },
  Nl = Kl;
function Zs(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || ((i = Object.create(null)), n.set(t.type, i)), i;
}
function ki(e, t, n, i) {
  const {
      appear: r,
      mode: s,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: g,
      onLeave: h,
      onAfterLeave: A,
      onLeaveCancelled: w,
      onBeforeAppear: x,
      onAppear: B,
      onAfterAppear: M,
      onAppearCancelled: S,
    } = t,
    K = String(e.key),
    _ = Zs(n, e),
    q = (F, T) => {
      F && Ie(F, i, 9, T);
    },
    Y = (F, T) => {
      const P = T[1];
      q(F, T),
        O(F) ? F.every((L) => L.length <= 1) && P() : F.length <= 1 && P();
    },
    H = {
      mode: s,
      persisted: o,
      beforeEnter(F) {
        let T = l;
        if (!n.isMounted)
          if (r) T = x || l;
          else return;
        F._leaveCb && F._leaveCb(!0);
        const P = _[K];
        P && ht(e, P) && P.el._leaveCb && P.el._leaveCb(), q(T, [F]);
      },
      enter(F) {
        let T = a,
          P = u,
          L = d;
        if (!n.isMounted)
          if (r) (T = B || a), (P = M || u), (L = S || d);
          else return;
        let R = !1;
        const W = (F._enterCb = (I) => {
          R ||
            ((R = !0),
            I ? q(L, [F]) : q(P, [F]),
            H.delayedLeave && H.delayedLeave(),
            (F._enterCb = void 0));
        });
        T ? Y(T, [F, W]) : W();
      },
      leave(F, T) {
        const P = String(e.key);
        if ((F._enterCb && F._enterCb(!0), n.isUnmounting)) return T();
        q(g, [F]);
        let L = !1;
        const R = (F._leaveCb = (W) => {
          L ||
            ((L = !0),
            T(),
            W ? q(w, [F]) : q(A, [F]),
            (F._leaveCb = void 0),
            _[P] === e && delete _[P]);
        });
        (_[P] = e), h ? Y(h, [F, R]) : R();
      },
      clone(F) {
        return ki(F, t, n, i);
      },
    };
  return H;
}
function li(e) {
  if (Hn(e)) return (e = st(e)), (e.children = null), e;
}
function br(e) {
  return Hn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function xi(e, t) {
  e.shapeFlag & 6 && e.component
    ? xi(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Gs(e, t = !1, n) {
  let i = [],
    r = 0;
  for (let s = 0; s < e.length; s++) {
    let o = e[s];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : s);
    o.type === Ee
      ? (o.patchFlag & 128 && r++, (i = i.concat(Gs(o.children, t, l))))
      : (t || o.type !== De) && i.push(l != null ? st(o, { key: l }) : o);
  }
  if (r > 1) for (let s = 0; s < i.length; s++) i[s].patchFlag = -2;
  return i;
}
function jl(e, t) {
  return D(e) ? (() => fe({ name: e.name }, t, { setup: e }))() : e;
}
const xn = (e) => !!e.type.__asyncLoader,
  Hn = (e) => e.type.__isKeepAlive;
function Dl(e, t) {
  Xs(e, "a", t);
}
function Xi(e, t) {
  Xs(e, "da", t);
}
function Xs(e, t, n = pe) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((Vn(t, i, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Hn(r.parent.vnode) && Hl(i, t, n, r), (r = r.parent);
  }
}
function Hl(e, t, n, i) {
  const r = Vn(t, e, i, !0);
  $i(() => {
    Mi(i[t], r);
  }, n);
}
function Vn(e, t, n = pe, i = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          Ot(), qt(n);
          const l = Ie(t, n, e, o);
          return bt(), Kt(), l;
        });
    return i ? r.unshift(s) : r.push(s), s;
  }
}
const Ve =
    (e) =>
    (t, n = pe) =>
      (!ln || e === "sp") && Vn(e, (...i) => t(...i), n),
  Vl = Ve("bm"),
  Yn = Ve("m"),
  Yl = Ve("bu"),
  Wl = Ve("u"),
  wt = Ve("bum"),
  $i = Ve("um"),
  zl = Ve("sp"),
  Zl = Ve("rtg"),
  Gl = Ve("rtc");
function Xl(e, t = pe) {
  Vn("ec", e, t);
}
const $l = Symbol.for("v-ndc");
function An(e, t, n, i) {
  let r;
  const s = n && n[i];
  if (O(e) || ae(e)) {
    r = new Array(e.length);
    for (let o = 0, l = e.length; o < l; o++)
      r[o] = t(e[o], o, void 0, s && s[o]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, s && s[o]);
  } else if (le(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (o, l) => t(o, l, void 0, s && s[l]));
    else {
      const o = Object.keys(e);
      r = new Array(o.length);
      for (let l = 0, a = o.length; l < a; l++) {
        const u = o[l];
        r[l] = t(e[u], u, l, s && s[l]);
      }
    }
  else r = [];
  return n && (n[i] = r), r;
}
const Ci = (e) => (e ? (ao(e) ? Zn(e) || e.proxy : Ci(e.parent)) : null),
  Xt = fe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ci(e.parent),
    $root: (e) => Ci(e.root),
    $emit: (e) => e.emit,
    $options: (e) => er(e),
    $forceUpdate: (e) => e.f || (e.f = () => Gi(e.update)),
    $nextTick: (e) => e.n || (e.n = Tn.bind(e.proxy)),
    $watch: (e) => Pl.bind(e),
  }),
  ai = (e, t) => e !== oe && !e.__isScriptSetup && Z(e, t),
  ea = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: i,
        data: r,
        props: s,
        accessCache: o,
        type: l,
        appContext: a,
      } = e;
      let u;
      if (t[0] !== "$") {
        const A = o[t];
        if (A !== void 0)
          switch (A) {
            case 1:
              return i[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (ai(i, t)) return (o[t] = 1), i[t];
          if (r !== oe && Z(r, t)) return (o[t] = 2), r[t];
          if ((u = e.propsOptions[0]) && Z(u, t)) return (o[t] = 3), s[t];
          if (n !== oe && Z(n, t)) return (o[t] = 4), n[t];
          Ri && (o[t] = 0);
        }
      }
      const d = Xt[t];
      let g, h;
      if (d) return t === "$attrs" && we(e, "get", t), d(e);
      if ((g = l.__cssModules) && (g = g[t])) return g;
      if (n !== oe && Z(n, t)) return (o[t] = 4), n[t];
      if (((h = a.config.globalProperties), Z(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: i, setupState: r, ctx: s } = e;
      return ai(r, t)
        ? ((r[t] = n), !0)
        : i !== oe && Z(i, t)
        ? ((i[t] = n), !0)
        : Z(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: i,
          appContext: r,
          propsOptions: s,
        },
      },
      o
    ) {
      let l;
      return (
        !!n[o] ||
        (e !== oe && Z(e, o)) ||
        ai(t, o) ||
        ((l = s[0]) && Z(l, o)) ||
        Z(i, o) ||
        Z(Xt, o) ||
        Z(r.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Z(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Ar(e) {
  return O(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Ri = !0;
function ta(e) {
  const t = er(e),
    n = e.proxy,
    i = e.ctx;
  (Ri = !1), t.beforeCreate && yr(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: s,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    created: d,
    beforeMount: g,
    mounted: h,
    beforeUpdate: A,
    updated: w,
    activated: x,
    deactivated: B,
    beforeDestroy: M,
    beforeUnmount: S,
    destroyed: K,
    unmounted: _,
    render: q,
    renderTracked: Y,
    renderTriggered: H,
    errorCaptured: F,
    serverPrefetch: T,
    expose: P,
    inheritAttrs: L,
    components: R,
    directives: W,
    filters: I,
  } = t;
  if ((u && na(u, i, null), o))
    for (const ie in o) {
      const $ = o[ie];
      D($) && (i[ie] = $.bind(n));
    }
  if (r) {
    const ie = r.call(n, n);
    le(ie) && (e.data = dn(ie));
  }
  if (((Ri = !0), s))
    for (const ie in s) {
      const $ = s[ie],
        Ue = D($) ? $.bind(n, n) : D($.get) ? $.get.bind(n, n) : Je,
        We = !D($) && D($.set) ? $.set.bind(n) : Je,
        Ne = N({ get: Ue, set: We });
      Object.defineProperty(i, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (xe) => (Ne.value = xe),
      });
    }
  if (l) for (const ie in l) $s(l[ie], i, n, ie);
  if (a) {
    const ie = D(a) ? a.call(n) : a;
    Reflect.ownKeys(ie).forEach(($) => {
      aa($, ie[$]);
    });
  }
  d && yr(d, e, "c");
  function ee(ie, $) {
    O($) ? $.forEach((Ue) => ie(Ue.bind(n))) : $ && ie($.bind(n));
  }
  if (
    (ee(Vl, g),
    ee(Yn, h),
    ee(Yl, A),
    ee(Wl, w),
    ee(Dl, x),
    ee(Xi, B),
    ee(Xl, F),
    ee(Gl, Y),
    ee(Zl, H),
    ee(wt, S),
    ee($i, _),
    ee(zl, T),
    O(P))
  )
    if (P.length) {
      const ie = e.exposed || (e.exposed = {});
      P.forEach(($) => {
        Object.defineProperty(ie, $, {
          get: () => n[$],
          set: (Ue) => (n[$] = Ue),
        });
      });
    } else e.exposed || (e.exposed = {});
  q && e.render === Je && (e.render = q),
    L != null && (e.inheritAttrs = L),
    R && (e.components = R),
    W && (e.directives = W);
}
function na(e, t, n = Je) {
  O(e) && (e = Si(e));
  for (const i in e) {
    const r = e[i];
    let s;
    le(r)
      ? "default" in r
        ? (s = Cn(r.from || i, r.default, !0))
        : (s = Cn(r.from || i))
      : (s = Cn(r)),
      be(s)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (o) => (s.value = o),
          })
        : (t[i] = s);
  }
}
function yr(e, t, n) {
  Ie(O(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function $s(e, t, n, i) {
  const r = i.includes(".") ? Ys(n, i) : () => n[i];
  if (ae(e)) {
    const s = t[e];
    D(s) && vt(r, s);
  } else if (D(e)) vt(r, e.bind(n));
  else if (le(e))
    if (O(e)) e.forEach((s) => $s(s, t, n, i));
    else {
      const s = D(e.handler) ? e.handler.bind(n) : t[e.handler];
      D(s) && vt(r, s, e);
    }
}
function er(e) {
  const t = e.type,
    { mixins: n, extends: i } = t,
    {
      mixins: r,
      optionsCache: s,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = s.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !r.length && !n && !i
      ? (a = t)
      : ((a = {}), r.length && r.forEach((u) => Ln(a, u, o, !0)), Ln(a, t, o)),
    le(t) && s.set(t, a),
    a
  );
}
function Ln(e, t, n, i = !1) {
  const { mixins: r, extends: s } = t;
  s && Ln(e, s, n, !0), r && r.forEach((o) => Ln(e, o, n, !0));
  for (const o in t)
    if (!(i && o === "expose")) {
      const l = ia[o] || (n && n[o]);
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const ia = {
  data: Er,
  props: wr,
  emits: wr,
  methods: Wt,
  computed: Wt,
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  components: Wt,
  directives: Wt,
  watch: sa,
  provide: Er,
  inject: ra,
};
function Er(e, t) {
  return t
    ? e
      ? function () {
          return fe(
            D(e) ? e.call(this, this) : e,
            D(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function ra(e, t) {
  return Wt(Si(e), Si(t));
}
function Si(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Wt(e, t) {
  return e ? fe(Object.create(null), e, t) : t;
}
function wr(e, t) {
  return e
    ? O(e) && O(t)
      ? [...new Set([...e, ...t])]
      : fe(Object.create(null), Ar(e), Ar(t ?? {}))
    : t;
}
function sa(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = fe(Object.create(null), e);
  for (const i in t) n[i] = Ae(e[i], t[i]);
  return n;
}
function eo() {
  return {
    app: null,
    config: {
      isNativeTag: Fo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let oa = 0;
function la(e, t) {
  return function (i, r = null) {
    D(i) || (i = fe({}, i)), r != null && !le(r) && (r = null);
    const s = eo(),
      o = new Set();
    let l = !1;
    const a = (s.app = {
      _uid: oa++,
      _component: i,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: Ma,
      get config() {
        return s.config;
      },
      set config(u) {},
      use(u, ...d) {
        return (
          o.has(u) ||
            (u && D(u.install)
              ? (o.add(u), u.install(a, ...d))
              : D(u) && (o.add(u), u(a, ...d))),
          a
        );
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, d) {
        return d ? ((s.components[u] = d), a) : s.components[u];
      },
      directive(u, d) {
        return d ? ((s.directives[u] = d), a) : s.directives[u];
      },
      mount(u, d, g) {
        if (!l) {
          const h = ge(i, r);
          return (
            (h.appContext = s),
            d && t ? t(h, u) : e(h, u, g),
            (l = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Zn(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, d) {
        return (s.provides[u] = d), a;
      },
      runWithContext(u) {
        Jn = a;
        try {
          return u();
        } finally {
          Jn = null;
        }
      },
    });
    return a;
  };
}
let Jn = null;
function aa(e, t) {
  if (pe) {
    let n = pe.provides;
    const i = pe.parent && pe.parent.provides;
    i === n && (n = pe.provides = Object.create(i)), (n[e] = t);
  }
}
function Cn(e, t, n = !1) {
  const i = pe || Be;
  if (i || Jn) {
    const r = i
      ? i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides
      : Jn._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && D(t) ? t.call(i && i.proxy) : t;
  }
}
function ca(e, t, n, i = !1) {
  const r = {},
    s = {};
  _n(s, zn, 1), (e.propsDefaults = Object.create(null)), to(e, t, r, s);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  n ? (e.props = i ? r : yl(r)) : e.type.props ? (e.props = r) : (e.props = s),
    (e.attrs = s);
}
function ua(e, t, n, i) {
  const {
      props: r,
      attrs: s,
      vnode: { patchFlag: o },
    } = e,
    l = X(r),
    [a] = e.propsOptions;
  let u = !1;
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        let h = d[g];
        if (Dn(e.emitsOptions, h)) continue;
        const A = t[h];
        if (a)
          if (Z(s, h)) A !== s[h] && ((s[h] = A), (u = !0));
          else {
            const w = Jt(h);
            r[w] = Bi(a, l, w, A, e, !1);
          }
        else A !== s[h] && ((s[h] = A), (u = !0));
      }
    }
  } else {
    to(e, t, r, s) && (u = !0);
    let d;
    for (const g in l)
      (!t || (!Z(t, g) && ((d = Pt(g)) === g || !Z(t, d)))) &&
        (a
          ? n &&
            (n[g] !== void 0 || n[d] !== void 0) &&
            (r[g] = Bi(a, l, g, void 0, e, !0))
          : delete r[g]);
    if (s !== l) for (const g in s) (!t || !Z(t, g)) && (delete s[g], (u = !0));
  }
  u && He(e, "set", "$attrs");
}
function to(e, t, n, i) {
  const [r, s] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let a in t) {
      if (kn(a)) continue;
      const u = t[a];
      let d;
      r && Z(r, (d = Jt(a)))
        ? !s || !s.includes(d)
          ? (n[d] = u)
          : ((l || (l = {}))[d] = u)
        : Dn(e.emitsOptions, a) ||
          ((!(a in i) || u !== i[a]) && ((i[a] = u), (o = !0)));
    }
  if (s) {
    const a = X(n),
      u = l || oe;
    for (let d = 0; d < s.length; d++) {
      const g = s[d];
      n[g] = Bi(r, a, g, u[g], e, !Z(u, g));
    }
  }
  return o;
}
function Bi(e, t, n, i, r, s) {
  const o = e[n];
  if (o != null) {
    const l = Z(o, "default");
    if (l && i === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && D(a)) {
        const { propsDefaults: u } = r;
        n in u ? (i = u[n]) : (qt(r), (i = u[n] = a.call(null, t)), bt());
      } else i = a;
    }
    o[0] &&
      (s && !l ? (i = !1) : o[1] && (i === "" || i === Pt(n)) && (i = !0));
  }
  return i;
}
function no(e, t, n = !1) {
  const i = t.propsCache,
    r = i.get(e);
  if (r) return r;
  const s = e.props,
    o = {},
    l = [];
  let a = !1;
  if (!D(e)) {
    const d = (g) => {
      a = !0;
      const [h, A] = no(g, t, !0);
      fe(o, h), A && l.push(...A);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!s && !a) return le(e) && i.set(e, Ft), Ft;
  if (O(s))
    for (let d = 0; d < s.length; d++) {
      const g = Jt(s[d]);
      kr(g) && (o[g] = oe);
    }
  else if (s)
    for (const d in s) {
      const g = Jt(d);
      if (kr(g)) {
        const h = s[d],
          A = (o[g] = O(h) || D(h) ? { type: h } : fe({}, h));
        if (A) {
          const w = Rr(Boolean, A.type),
            x = Rr(String, A.type);
          (A[0] = w > -1),
            (A[1] = x < 0 || w < x),
            (w > -1 || Z(A, "default")) && l.push(g);
        }
      }
    }
  const u = [o, l];
  return le(e) && i.set(e, u), u;
}
function kr(e) {
  return e[0] !== "$";
}
function xr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Cr(e, t) {
  return xr(e) === xr(t);
}
function Rr(e, t) {
  return O(t) ? t.findIndex((n) => Cr(n, e)) : D(t) && Cr(t, e) ? 0 : -1;
}
const io = (e) => e[0] === "_" || e === "$stable",
  tr = (e) => (O(e) ? e.map(Oe) : [Oe(e)]),
  fa = (e, t, n) => {
    if (t._n) return t;
    const i = Yt((...r) => tr(t(...r)), n);
    return (i._c = !1), i;
  },
  ro = (e, t, n) => {
    const i = e._ctx;
    for (const r in e) {
      if (io(r)) continue;
      const s = e[r];
      if (D(s)) t[r] = fa(r, s, i);
      else if (s != null) {
        const o = tr(s);
        t[r] = () => o;
      }
    }
  },
  so = (e, t) => {
    const n = tr(t);
    e.slots.default = () => n;
  },
  da = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = X(t)), _n(t, "_", n)) : ro(t, (e.slots = {}));
    } else (e.slots = {}), t && so(e, t);
    _n(e.slots, zn, 1);
  },
  ha = (e, t, n) => {
    const { vnode: i, slots: r } = e;
    let s = !0,
      o = oe;
    if (i.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (s = !1)
          : (fe(r, t), !n && l === 1 && delete r._)
        : ((s = !t.$stable), ro(t, r)),
        (o = t);
    } else t && (so(e, t), (o = { default: 1 }));
    if (s) for (const l in r) !io(l) && !(l in o) && delete r[l];
  };
function Ii(e, t, n, i, r = !1) {
  if (O(e)) {
    e.forEach((h, A) => Ii(h, t && (O(t) ? t[A] : t), n, i, r));
    return;
  }
  if (xn(i) && !r) return;
  const s = i.shapeFlag & 4 ? Zn(i.component) || i.component.proxy : i.el,
    o = r ? null : s,
    { i: l, r: a } = e,
    u = t && t.r,
    d = l.refs === oe ? (l.refs = {}) : l.refs,
    g = l.setupState;
  if (
    (u != null &&
      u !== a &&
      (ae(u)
        ? ((d[u] = null), Z(g, u) && (g[u] = null))
        : be(u) && (u.value = null)),
    D(a))
  )
    it(a, l, 12, [o, d]);
  else {
    const h = ae(a),
      A = be(a);
    if (h || A) {
      const w = () => {
        if (e.f) {
          const x = h ? (Z(g, a) ? g[a] : d[a]) : a.value;
          r
            ? O(x) && Mi(x, s)
            : O(x)
            ? x.includes(s) || x.push(s)
            : h
            ? ((d[a] = [s]), Z(g, a) && (g[a] = d[a]))
            : ((a.value = [s]), e.k && (d[e.k] = a.value));
        } else
          h
            ? ((d[a] = o), Z(g, a) && (g[a] = o))
            : A && ((a.value = o), e.k && (d[e.k] = o));
      };
      o ? ((w.id = -1), ye(w, n)) : w();
    }
  }
}
const ye = Ml;
function ga(e) {
  return pa(e);
}
function pa(e, t) {
  const n = vi();
  n.__VUE__ = !0;
  const {
      insert: i,
      remove: r,
      patchProp: s,
      createElement: o,
      createText: l,
      createComment: a,
      setText: u,
      setElementText: d,
      parentNode: g,
      nextSibling: h,
      setScopeId: A = Je,
      insertStaticContent: w,
    } = e,
    x = (
      c,
      f,
      p,
      v = null,
      m = null,
      E = null,
      C = !1,
      y = null,
      k = !!f.dynamicChildren
    ) => {
      if (c === f) return;
      c && !ht(c, f) && ((v = ze(c)), xe(c, m, E, !0), (c = null)),
        f.patchFlag === -2 && ((k = !1), (f.dynamicChildren = null));
      const { type: b, ref: J, shapeFlag: Q } = f;
      switch (b) {
        case Wn:
          B(c, f, p, v);
          break;
        case De:
          M(c, f, p, v);
          break;
        case Rn:
          c == null && S(f, p, v, C);
          break;
        case Ee:
          R(c, f, p, v, m, E, C, y, k);
          break;
        default:
          Q & 1
            ? q(c, f, p, v, m, E, C, y, k)
            : Q & 6
            ? W(c, f, p, v, m, E, C, y, k)
            : (Q & 64 || Q & 128) && b.process(c, f, p, v, m, E, C, y, k, qe);
      }
      J != null && m && Ii(J, c && c.ref, E, f || c, !f);
    },
    B = (c, f, p, v) => {
      if (c == null) i((f.el = l(f.children)), p, v);
      else {
        const m = (f.el = c.el);
        f.children !== c.children && u(m, f.children);
      }
    },
    M = (c, f, p, v) => {
      c == null ? i((f.el = a(f.children || "")), p, v) : (f.el = c.el);
    },
    S = (c, f, p, v) => {
      [c.el, c.anchor] = w(c.children, f, p, v, c.el, c.anchor);
    },
    K = ({ el: c, anchor: f }, p, v) => {
      let m;
      for (; c && c !== f; ) (m = h(c)), i(c, p, v), (c = m);
      i(f, p, v);
    },
    _ = ({ el: c, anchor: f }) => {
      let p;
      for (; c && c !== f; ) (p = h(c)), r(c), (c = p);
      r(f);
    },
    q = (c, f, p, v, m, E, C, y, k) => {
      (C = C || f.type === "svg"),
        c == null ? Y(f, p, v, m, E, C, y, k) : T(c, f, m, E, C, y, k);
    },
    Y = (c, f, p, v, m, E, C, y) => {
      let k, b;
      const { type: J, props: Q, shapeFlag: U, transition: j, dirs: V } = c;
      if (
        ((k = c.el = o(c.type, E, Q && Q.is, Q)),
        U & 8
          ? d(k, c.children)
          : U & 16 &&
            F(c.children, k, null, v, m, E && J !== "foreignObject", C, y),
        V && ot(c, null, v, "created"),
        H(k, c, c.scopeId, C, v),
        Q)
      ) {
        for (const ne in Q)
          ne !== "value" &&
            !kn(ne) &&
            s(k, ne, null, Q[ne], E, c.children, v, m, re);
        "value" in Q && s(k, "value", null, Q.value),
          (b = Q.onVnodeBeforeMount) && Pe(b, v, c);
      }
      V && ot(c, null, v, "beforeMount");
      const se = (!m || (m && !m.pendingBranch)) && j && !j.persisted;
      se && j.beforeEnter(k),
        i(k, f, p),
        ((b = Q && Q.onVnodeMounted) || se || V) &&
          ye(() => {
            b && Pe(b, v, c), se && j.enter(k), V && ot(c, null, v, "mounted");
          }, m);
    },
    H = (c, f, p, v, m) => {
      if ((p && A(c, p), v)) for (let E = 0; E < v.length; E++) A(c, v[E]);
      if (m) {
        let E = m.subTree;
        if (f === E) {
          const C = m.vnode;
          H(c, C, C.scopeId, C.slotScopeIds, m.parent);
        }
      }
    },
    F = (c, f, p, v, m, E, C, y, k = 0) => {
      for (let b = k; b < c.length; b++) {
        const J = (c[b] = y ? tt(c[b]) : Oe(c[b]));
        x(null, J, f, p, v, m, E, C, y);
      }
    },
    T = (c, f, p, v, m, E, C) => {
      const y = (f.el = c.el);
      let { patchFlag: k, dynamicChildren: b, dirs: J } = f;
      k |= c.patchFlag & 16;
      const Q = c.props || oe,
        U = f.props || oe;
      let j;
      p && lt(p, !1),
        (j = U.onVnodeBeforeUpdate) && Pe(j, p, f, c),
        J && ot(f, c, p, "beforeUpdate"),
        p && lt(p, !0);
      const V = m && f.type !== "foreignObject";
      if (
        (b
          ? P(c.dynamicChildren, b, y, p, v, V, E)
          : C || $(c, f, y, null, p, v, V, E, !1),
        k > 0)
      ) {
        if (k & 16) L(y, f, Q, U, p, v, m);
        else if (
          (k & 2 && Q.class !== U.class && s(y, "class", null, U.class, m),
          k & 4 && s(y, "style", Q.style, U.style, m),
          k & 8)
        ) {
          const se = f.dynamicProps;
          for (let ne = 0; ne < se.length; ne++) {
            const ce = se[ne],
              _e = Q[ce],
              Ct = U[ce];
            (Ct !== _e || ce === "value") &&
              s(y, ce, _e, Ct, m, c.children, p, v, re);
          }
        }
        k & 1 && c.children !== f.children && d(y, f.children);
      } else !C && b == null && L(y, f, Q, U, p, v, m);
      ((j = U.onVnodeUpdated) || J) &&
        ye(() => {
          j && Pe(j, p, f, c), J && ot(f, c, p, "updated");
        }, v);
    },
    P = (c, f, p, v, m, E, C) => {
      for (let y = 0; y < f.length; y++) {
        const k = c[y],
          b = f[y],
          J =
            k.el && (k.type === Ee || !ht(k, b) || k.shapeFlag & 70)
              ? g(k.el)
              : p;
        x(k, b, J, null, v, m, E, C, !0);
      }
    },
    L = (c, f, p, v, m, E, C) => {
      if (p !== v) {
        if (p !== oe)
          for (const y in p)
            !kn(y) && !(y in v) && s(c, y, p[y], null, C, f.children, m, E, re);
        for (const y in v) {
          if (kn(y)) continue;
          const k = v[y],
            b = p[y];
          k !== b && y !== "value" && s(c, y, b, k, C, f.children, m, E, re);
        }
        "value" in v && s(c, "value", p.value, v.value);
      }
    },
    R = (c, f, p, v, m, E, C, y, k) => {
      const b = (f.el = c ? c.el : l("")),
        J = (f.anchor = c ? c.anchor : l(""));
      let { patchFlag: Q, dynamicChildren: U, slotScopeIds: j } = f;
      j && (y = y ? y.concat(j) : j),
        c == null
          ? (i(b, p, v), i(J, p, v), F(f.children, p, J, m, E, C, y, k))
          : Q > 0 && Q & 64 && U && c.dynamicChildren
          ? (P(c.dynamicChildren, U, p, m, E, C, y),
            (f.key != null || (m && f === m.subTree)) && nr(c, f, !0))
          : $(c, f, p, J, m, E, C, y, k);
    },
    W = (c, f, p, v, m, E, C, y, k) => {
      (f.slotScopeIds = y),
        c == null
          ? f.shapeFlag & 512
            ? m.ctx.activate(f, p, v, C, k)
            : I(f, p, v, m, E, C, k)
          : te(c, f, k);
    },
    I = (c, f, p, v, m, E, C) => {
      const y = (c.component = _a(c, v, m));
      if ((Hn(c) && (y.ctx.renderer = qe), Fa(y), y.asyncDep)) {
        if ((m && m.registerDep(y, ee), !c.el)) {
          const k = (y.subTree = ge(De));
          M(null, k, f, p);
        }
        return;
      }
      ee(y, c, f, p, m, E, C);
    },
    te = (c, f, p) => {
      const v = (f.component = c.component);
      if (Jl(c, f, p))
        if (v.asyncDep && !v.asyncResolved) {
          ie(v, f, p);
          return;
        } else (v.next = f), Il(v.update), v.update();
      else (f.el = c.el), (v.vnode = f);
    },
    ee = (c, f, p, v, m, E, C) => {
      const y = () => {
          if (c.isMounted) {
            let { next: J, bu: Q, u: U, parent: j, vnode: V } = c,
              se = J,
              ne;
            lt(c, !1),
              J ? ((J.el = V.el), ie(c, J, C)) : (J = V),
              Q && si(Q),
              (ne = J.props && J.props.onVnodeBeforeUpdate) && Pe(ne, j, J, V),
              lt(c, !0);
            const ce = oi(c),
              _e = c.subTree;
            (c.subTree = ce),
              x(_e, ce, g(_e.el), ze(_e), c, m, E),
              (J.el = ce.el),
              se === null && Ul(c, ce.el),
              U && ye(U, m),
              (ne = J.props && J.props.onVnodeUpdated) &&
                ye(() => Pe(ne, j, J, V), m);
          } else {
            let J;
            const { el: Q, props: U } = f,
              { bm: j, m: V, parent: se } = c,
              ne = xn(f);
            if (
              (lt(c, !1),
              j && si(j),
              !ne && (J = U && U.onVnodeBeforeMount) && Pe(J, se, f),
              lt(c, !0),
              Q && ii)
            ) {
              const ce = () => {
                (c.subTree = oi(c)), ii(Q, c.subTree, c, m, null);
              };
              ne
                ? f.type.__asyncLoader().then(() => !c.isUnmounted && ce())
                : ce();
            } else {
              const ce = (c.subTree = oi(c));
              x(null, ce, p, v, c, m, E), (f.el = ce.el);
            }
            if ((V && ye(V, m), !ne && (J = U && U.onVnodeMounted))) {
              const ce = f;
              ye(() => Pe(J, se, ce), m);
            }
            (f.shapeFlag & 256 ||
              (se && xn(se.vnode) && se.vnode.shapeFlag & 256)) &&
              c.a &&
              ye(c.a, m),
              (c.isMounted = !0),
              (f = p = v = null);
          }
        },
        k = (c.effect = new Di(y, () => Gi(b), c.scope)),
        b = (c.update = () => k.run());
      (b.id = c.uid), lt(c, !0), b();
    },
    ie = (c, f, p) => {
      f.component = c;
      const v = c.vnode.props;
      (c.vnode = f),
        (c.next = null),
        ua(c, f.props, v, p),
        ha(c, f.children, p),
        Ot(),
        mr(),
        Kt();
    },
    $ = (c, f, p, v, m, E, C, y, k = !1) => {
      const b = c && c.children,
        J = c ? c.shapeFlag : 0,
        Q = f.children,
        { patchFlag: U, shapeFlag: j } = f;
      if (U > 0) {
        if (U & 128) {
          We(b, Q, p, v, m, E, C, y, k);
          return;
        } else if (U & 256) {
          Ue(b, Q, p, v, m, E, C, y, k);
          return;
        }
      }
      j & 8
        ? (J & 16 && re(b, m, E), Q !== b && d(p, Q))
        : J & 16
        ? j & 16
          ? We(b, Q, p, v, m, E, C, y, k)
          : re(b, m, E, !0)
        : (J & 8 && d(p, ""), j & 16 && F(Q, p, v, m, E, C, y, k));
    },
    Ue = (c, f, p, v, m, E, C, y, k) => {
      (c = c || Ft), (f = f || Ft);
      const b = c.length,
        J = f.length,
        Q = Math.min(b, J);
      let U;
      for (U = 0; U < Q; U++) {
        const j = (f[U] = k ? tt(f[U]) : Oe(f[U]));
        x(c[U], j, p, null, m, E, C, y, k);
      }
      b > J ? re(c, m, E, !0, !1, Q) : F(f, p, v, m, E, C, y, k, Q);
    },
    We = (c, f, p, v, m, E, C, y, k) => {
      let b = 0;
      const J = f.length;
      let Q = c.length - 1,
        U = J - 1;
      for (; b <= Q && b <= U; ) {
        const j = c[b],
          V = (f[b] = k ? tt(f[b]) : Oe(f[b]));
        if (ht(j, V)) x(j, V, p, null, m, E, C, y, k);
        else break;
        b++;
      }
      for (; b <= Q && b <= U; ) {
        const j = c[Q],
          V = (f[U] = k ? tt(f[U]) : Oe(f[U]));
        if (ht(j, V)) x(j, V, p, null, m, E, C, y, k);
        else break;
        Q--, U--;
      }
      if (b > Q) {
        if (b <= U) {
          const j = U + 1,
            V = j < J ? f[j].el : v;
          for (; b <= U; )
            x(null, (f[b] = k ? tt(f[b]) : Oe(f[b])), p, V, m, E, C, y, k), b++;
        }
      } else if (b > U) for (; b <= Q; ) xe(c[b], m, E, !0), b++;
      else {
        const j = b,
          V = b,
          se = new Map();
        for (b = V; b <= U; b++) {
          const ke = (f[b] = k ? tt(f[b]) : Oe(f[b]));
          ke.key != null && se.set(ke.key, b);
        }
        let ne,
          ce = 0;
        const _e = U - V + 1;
        let Ct = !1,
          sr = 0;
        const jt = new Array(_e);
        for (b = 0; b < _e; b++) jt[b] = 0;
        for (b = j; b <= Q; b++) {
          const ke = c[b];
          if (ce >= _e) {
            xe(ke, m, E, !0);
            continue;
          }
          let Me;
          if (ke.key != null) Me = se.get(ke.key);
          else
            for (ne = V; ne <= U; ne++)
              if (jt[ne - V] === 0 && ht(ke, f[ne])) {
                Me = ne;
                break;
              }
          Me === void 0
            ? xe(ke, m, E, !0)
            : ((jt[Me - V] = b + 1),
              Me >= sr ? (sr = Me) : (Ct = !0),
              x(ke, f[Me], p, null, m, E, C, y, k),
              ce++);
        }
        const or = Ct ? ma(jt) : Ft;
        for (ne = or.length - 1, b = _e - 1; b >= 0; b--) {
          const ke = V + b,
            Me = f[ke],
            lr = ke + 1 < J ? f[ke + 1].el : v;
          jt[b] === 0
            ? x(null, Me, p, lr, m, E, C, y, k)
            : Ct && (ne < 0 || b !== or[ne] ? Ne(Me, p, lr, 2) : ne--);
        }
      }
    },
    Ne = (c, f, p, v, m = null) => {
      const { el: E, type: C, transition: y, children: k, shapeFlag: b } = c;
      if (b & 6) {
        Ne(c.component.subTree, f, p, v);
        return;
      }
      if (b & 128) {
        c.suspense.move(f, p, v);
        return;
      }
      if (b & 64) {
        C.move(c, f, p, qe);
        return;
      }
      if (C === Ee) {
        i(E, f, p);
        for (let Q = 0; Q < k.length; Q++) Ne(k[Q], f, p, v);
        i(c.anchor, f, p);
        return;
      }
      if (C === Rn) {
        K(c, f, p);
        return;
      }
      if (v !== 2 && b & 1 && y)
        if (v === 0) y.beforeEnter(E), i(E, f, p), ye(() => y.enter(E), m);
        else {
          const { leave: Q, delayLeave: U, afterLeave: j } = y,
            V = () => i(E, f, p),
            se = () => {
              Q(E, () => {
                V(), j && j();
              });
            };
          U ? U(E, V, se) : se();
        }
      else i(E, f, p);
    },
    xe = (c, f, p, v = !1, m = !1) => {
      const {
        type: E,
        props: C,
        ref: y,
        children: k,
        dynamicChildren: b,
        shapeFlag: J,
        patchFlag: Q,
        dirs: U,
      } = c;
      if ((y != null && Ii(y, null, p, c, !0), J & 256)) {
        f.ctx.deactivate(c);
        return;
      }
      const j = J & 1 && U,
        V = !xn(c);
      let se;
      if ((V && (se = C && C.onVnodeBeforeUnmount) && Pe(se, f, c), J & 6))
        z(c.component, p, v);
      else {
        if (J & 128) {
          c.suspense.unmount(p, v);
          return;
        }
        j && ot(c, null, f, "beforeUnmount"),
          J & 64
            ? c.type.remove(c, f, p, m, qe, v)
            : b && (E !== Ee || (Q > 0 && Q & 64))
            ? re(b, f, p, !1, !0)
            : ((E === Ee && Q & 384) || (!m && J & 16)) && re(k, f, p),
          v && xt(c);
      }
      ((V && (se = C && C.onVnodeUnmounted)) || j) &&
        ye(() => {
          se && Pe(se, f, c), j && ot(c, null, f, "unmounted");
        }, p);
    },
    xt = (c) => {
      const { type: f, el: p, anchor: v, transition: m } = c;
      if (f === Ee) {
        ti(p, v);
        return;
      }
      if (f === Rn) {
        _(c);
        return;
      }
      const E = () => {
        r(p), m && !m.persisted && m.afterLeave && m.afterLeave();
      };
      if (c.shapeFlag & 1 && m && !m.persisted) {
        const { leave: C, delayLeave: y } = m,
          k = () => C(p, E);
        y ? y(c.el, E, k) : k();
      } else E();
    },
    ti = (c, f) => {
      let p;
      for (; c !== f; ) (p = h(c)), r(c), (c = p);
      r(f);
    },
    z = (c, f, p) => {
      const { bum: v, scope: m, update: E, subTree: C, um: y } = c;
      v && si(v),
        m.stop(),
        E && ((E.active = !1), xe(C, c, f, p)),
        y && ye(y, f),
        ye(() => {
          c.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    re = (c, f, p, v = !1, m = !1, E = 0) => {
      for (let C = E; C < c.length; C++) xe(c[C], f, p, v, m);
    },
    ze = (c) =>
      c.shapeFlag & 6
        ? ze(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : h(c.anchor || c.el),
    Nt = (c, f, p) => {
      c == null
        ? f._vnode && xe(f._vnode, null, null, !0)
        : x(f._vnode || null, c, f, null, null, null, p),
        mr(),
        Ns(),
        (f._vnode = c);
    },
    qe = {
      p: x,
      um: xe,
      m: Ne,
      r: xt,
      mt: I,
      mc: F,
      pc: $,
      pbc: P,
      n: ze,
      o: e,
    };
  let ni, ii;
  return (
    t && ([ni, ii] = t(qe)), { render: Nt, hydrate: ni, createApp: la(Nt, ni) }
  );
}
function lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function nr(e, t, n = !1) {
  const i = e.children,
    r = t.children;
  if (O(i) && O(r))
    for (let s = 0; s < i.length; s++) {
      const o = i[s];
      let l = r[s];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[s] = tt(r[s])), (l.el = o.el)),
        n || nr(o, l)),
        l.type === Wn && (l.el = o.el);
    }
}
function ma(e) {
  const t = e.slice(),
    n = [0];
  let i, r, s, o, l;
  const a = e.length;
  for (i = 0; i < a; i++) {
    const u = e[i];
    if (u !== 0) {
      if (((r = n[n.length - 1]), e[r] < u)) {
        (t[i] = r), n.push(i);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        (l = (s + o) >> 1), e[n[l]] < u ? (s = l + 1) : (o = l);
      u < e[n[s]] && (s > 0 && (t[i] = n[s - 1]), (n[s] = i));
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; ) (n[s] = o), (o = t[o]);
  return n;
}
const va = (e) => e.__isTeleport,
  $t = (e) => e && (e.disabled || e.disabled === ""),
  Sr = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  _i = (e, t) => {
    const n = e && e.to;
    return ae(n) ? (t ? t(n) : null) : n;
  },
  ba = {
    __isTeleport: !0,
    process(e, t, n, i, r, s, o, l, a, u) {
      const {
          mc: d,
          pc: g,
          pbc: h,
          o: { insert: A, querySelector: w, createText: x, createComment: B },
        } = u,
        M = $t(t.props);
      let { shapeFlag: S, children: K, dynamicChildren: _ } = t;
      if (e == null) {
        const q = (t.el = x("")),
          Y = (t.anchor = x(""));
        A(q, n, i), A(Y, n, i);
        const H = (t.target = _i(t.props, w)),
          F = (t.targetAnchor = x(""));
        H && (A(F, H), (o = o || Sr(H)));
        const T = (P, L) => {
          S & 16 && d(K, P, L, r, s, o, l, a);
        };
        M ? T(n, Y) : H && T(H, F);
      } else {
        t.el = e.el;
        const q = (t.anchor = e.anchor),
          Y = (t.target = e.target),
          H = (t.targetAnchor = e.targetAnchor),
          F = $t(e.props),
          T = F ? n : Y,
          P = F ? q : H;
        if (
          ((o = o || Sr(Y)),
          _
            ? (h(e.dynamicChildren, _, T, r, s, o, l), nr(e, t, !0))
            : a || g(e, t, T, P, r, s, o, l, !1),
          M)
        )
          F || yn(t, n, q, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const L = (t.target = _i(t.props, w));
          L && yn(t, L, null, u, 0);
        } else F && yn(t, Y, H, u, 1);
      }
      oo(t);
    },
    remove(e, t, n, i, { um: r, o: { remove: s } }, o) {
      const {
        shapeFlag: l,
        children: a,
        anchor: u,
        targetAnchor: d,
        target: g,
        props: h,
      } = e;
      if ((g && s(d), (o || !$t(h)) && (s(u), l & 16)))
        for (let A = 0; A < a.length; A++) {
          const w = a[A];
          r(w, t, n, !0, !!w.dynamicChildren);
        }
    },
    move: yn,
    hydrate: Aa,
  };
function yn(e, t, n, { o: { insert: i }, m: r }, s = 2) {
  s === 0 && i(e.targetAnchor, t, n);
  const { el: o, anchor: l, shapeFlag: a, children: u, props: d } = e,
    g = s === 2;
  if ((g && i(o, t, n), (!g || $t(d)) && a & 16))
    for (let h = 0; h < u.length; h++) r(u[h], t, n, 2);
  g && i(l, t, n);
}
function Aa(
  e,
  t,
  n,
  i,
  r,
  s,
  { o: { nextSibling: o, parentNode: l, querySelector: a } },
  u
) {
  const d = (t.target = _i(t.props, a));
  if (d) {
    const g = d._lpa || d.firstChild;
    if (t.shapeFlag & 16)
      if ($t(t.props))
        (t.anchor = u(o(e), t, l(e), n, i, r, s)), (t.targetAnchor = g);
      else {
        t.anchor = o(e);
        let h = g;
        for (; h; )
          if (
            ((h = o(h)), h && h.nodeType === 8 && h.data === "teleport anchor")
          ) {
            (t.targetAnchor = h),
              (d._lpa = t.targetAnchor && o(t.targetAnchor));
            break;
          }
        u(g, t, d, n, i, r, s);
      }
    oo(t);
  }
  return t.anchor && o(t.anchor);
}
const ya = ba;
function oo(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const Ee = Symbol.for("v-fgt"),
  Wn = Symbol.for("v-txt"),
  De = Symbol.for("v-cmt"),
  Rn = Symbol.for("v-stc"),
  en = [];
let Le = null;
function Ge(e = !1) {
  en.push((Le = e ? null : []));
}
function Ea() {
  en.pop(), (Le = en[en.length - 1] || null);
}
let on = 1;
function Br(e) {
  on += e;
}
function wa(e) {
  return (
    (e.dynamicChildren = on > 0 ? Le || Ft : null),
    Ea(),
    on > 0 && Le && Le.push(e),
    e
  );
}
function Xe(e, t, n, i, r, s) {
  return wa(de(e, t, n, i, r, s, !0));
}
function Fi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const zn = "__vInternal",
  lo = ({ key: e }) => e ?? null,
  Sn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ae(e) || be(e) || D(e)
        ? { i: Be, r: e, k: t, f: !!n }
        : e
      : null
  );
function de(
  e,
  t = null,
  n = null,
  i = 0,
  r = null,
  s = e === Ee ? 0 : 1,
  o = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && lo(t),
    ref: t && Sn(t),
    scopeId: Hs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: i,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Be,
  };
  return (
    l
      ? (ir(a, n), s & 128 && e.normalize(a))
      : n && (a.shapeFlag |= ae(n) ? 8 : 16),
    on > 0 &&
      !o &&
      Le &&
      (a.patchFlag > 0 || s & 6) &&
      a.patchFlag !== 32 &&
      Le.push(a),
    a
  );
}
const ge = ka;
function ka(e, t = null, n = null, i = 0, r = null, s = !1) {
  if (((!e || e === $l) && (e = De), Fi(e))) {
    const l = st(e, t, !0);
    return (
      n && ir(l, n),
      on > 0 &&
        !s &&
        Le &&
        (l.shapeFlag & 6 ? (Le[Le.indexOf(e)] = l) : Le.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Ja(e) && (e = e.__vccOpts), t)) {
    t = xa(t);
    let { class: l, style: a } = t;
    l && !ae(l) && (t.class = Ni(l)),
      le(a) && (Us(a) && !O(a) && (a = fe({}, a)), (t.style = Ki(a)));
  }
  const o = ae(e) ? 1 : ql(e) ? 128 : va(e) ? 64 : le(e) ? 4 : D(e) ? 2 : 0;
  return de(e, t, n, i, r, o, s, !0);
}
function xa(e) {
  return e ? (Us(e) || zn in e ? fe({}, e) : e) : null;
}
function st(e, t, n = !1) {
  const { props: i, ref: r, patchFlag: s, children: o } = e,
    l = t ? Sa(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && lo(l),
    ref:
      t && t.ref ? (n && r ? (O(r) ? r.concat(Sn(t)) : [r, Sn(t)]) : Sn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ee ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Ca(e = " ", t = 0) {
  return ge(Wn, null, e, t);
}
function Ra(e, t) {
  const n = ge(Rn, null, e);
  return (n.staticCount = t), n;
}
function Oe(e) {
  return e == null || typeof e == "boolean"
    ? ge(De)
    : O(e)
    ? ge(Ee, null, e.slice())
    : typeof e == "object"
    ? tt(e)
    : ge(Wn, null, String(e));
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e);
}
function ir(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (O(t)) n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ir(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(zn in t)
        ? (t._ctx = Be)
        : r === 3 &&
          Be &&
          (Be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    D(t)
      ? ((t = { default: t, _ctx: Be }), (n = 32))
      : ((t = String(t)), i & 64 ? ((n = 16), (t = [Ca(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Sa(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const r in i)
      if (r === "class")
        t.class !== i.class && (t.class = Ni([t.class, i.class]));
      else if (r === "style") t.style = Ki([t.style, i.style]);
      else if (Mn(r)) {
        const s = t[r],
          o = i[r];
        o &&
          s !== o &&
          !(O(s) && s.includes(o)) &&
          (t[r] = s ? [].concat(s, o) : o);
      } else r !== "" && (t[r] = i[r]);
  }
  return t;
}
function Pe(e, t, n, i = null) {
  Ie(e, t, 7, [n, i]);
}
const Ba = eo();
let Ia = 0;
function _a(e, t, n) {
  const i = e.type,
    r = (t ? t.appContext : e.appContext) || Ba,
    s = {
      uid: Ia++,
      vnode: e,
      type: i,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ho(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: no(i, r),
      emitsOptions: Ds(i, r),
      emit: null,
      emitted: null,
      propsDefaults: oe,
      inheritAttrs: i.inheritAttrs,
      ctx: oe,
      data: oe,
      props: oe,
      attrs: oe,
      slots: oe,
      refs: oe,
      setupState: oe,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = Tl.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let pe = null;
const Ye = () => pe || Be;
let rr,
  St,
  Ir = "__VUE_INSTANCE_SETTERS__";
(St = vi()[Ir]) || (St = vi()[Ir] = []),
  St.push((e) => (pe = e)),
  (rr = (e) => {
    St.length > 1 ? St.forEach((t) => t(e)) : St[0](e);
  });
const qt = (e) => {
    rr(e), e.scope.on();
  },
  bt = () => {
    pe && pe.scope.off(), rr(null);
  };
function ao(e) {
  return e.vnode.shapeFlag & 4;
}
let ln = !1;
function Fa(e, t = !1) {
  ln = t;
  const { props: n, children: i } = e.vnode,
    r = ao(e);
  ca(e, n, r, t), da(e, i);
  const s = r ? Ta(e, t) : void 0;
  return (ln = !1), s;
}
function Ta(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Nn(new Proxy(e.ctx, ea)));
  const { setup: i } = n;
  if (i) {
    const r = (e.setupContext = i.length > 1 ? La(e) : null);
    qt(e), Ot();
    const s = it(i, e, 0, [e.props, r]);
    if ((Kt(), bt(), As(s))) {
      if ((s.then(bt, bt), t))
        return s
          .then((o) => {
            _r(e, o, t);
          })
          .catch((o) => {
            jn(o, e, 0);
          });
      e.asyncDep = s;
    } else _r(e, s, t);
  } else co(e, t);
}
function _r(e, t, n) {
  D(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = Ps(t)),
    co(e, n);
}
let Fr;
function co(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Fr && !i.render) {
      const r = i.template || er(e).template;
      if (r) {
        const { isCustomElement: s, compilerOptions: o } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = i,
          u = fe(fe({ isCustomElement: s, delimiters: l }, o), a);
        i.render = Fr(r, u);
      }
    }
    e.render = i.render || Je;
  }
  qt(e), Ot(), ta(e), Kt(), bt();
}
function Qa(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return we(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function La(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Qa(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Zn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ps(Nn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Xt) return Xt[n](e);
        },
        has(t, n) {
          return n in t || n in Xt;
        },
      }))
    );
}
function Ja(e) {
  return D(e) && "__vccOpts" in e;
}
const N = (e, t) => Rl(e, t, ln);
function G(e, t, n) {
  const i = arguments.length;
  return i === 2
    ? le(t) && !O(t)
      ? Fi(t)
        ? ge(e, null, [t])
        : ge(e, t)
      : ge(e, null, t)
    : (i > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : i === 3 && Fi(n) && (n = [n]),
      ge(e, t, n));
}
const Ua = Symbol.for("v-scx"),
  qa = () => Cn(Ua),
  Ma = "3.3.4",
  Pa = "http://www.w3.org/2000/svg",
  gt = typeof document < "u" ? document : null,
  Tr = gt && gt.createElement("template"),
  Oa = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, i) => {
      const r = t
        ? gt.createElementNS(Pa, e)
        : gt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          i &&
          i.multiple != null &&
          r.setAttribute("multiple", i.multiple),
        r
      );
    },
    createText: (e) => gt.createTextNode(e),
    createComment: (e) => gt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => gt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, i, r, s) {
      const o = n ? n.previousSibling : t.lastChild;
      if (r && (r === s || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === s || !(r = r.nextSibling));

        );
      else {
        Tr.innerHTML = i ? `<svg>${e}</svg>` : e;
        const l = Tr.content;
        if (i) {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Ka(e, t, n) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Na(e, t, n) {
  const i = e.style,
    r = ae(n);
  if (n && !r) {
    if (t && !ae(t)) for (const s in t) n[s] == null && Ti(i, s, "");
    for (const s in n) Ti(i, s, n[s]);
  } else {
    const s = i.display;
    r ? t !== n && (i.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (i.display = s);
  }
}
const Qr = /\s*!important$/;
function Ti(e, t, n) {
  if (O(n)) n.forEach((i) => Ti(e, t, i));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const i = ja(e, t);
    Qr.test(n)
      ? e.setProperty(Pt(i), n.replace(Qr, ""), "important")
      : (e[i] = n);
  }
}
const Lr = ["Webkit", "Moz", "ms"],
  ci = {};
function ja(e, t) {
  const n = ci[t];
  if (n) return n;
  let i = Jt(t);
  if (i !== "filter" && i in e) return (ci[t] = i);
  i = ws(i);
  for (let r = 0; r < Lr.length; r++) {
    const s = Lr[r] + i;
    if (s in e) return (ci[t] = s);
  }
  return t;
}
const Jr = "http://www.w3.org/1999/xlink";
function Da(e, t, n, i, r) {
  if (i && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Jr, t.slice(6, t.length))
      : e.setAttributeNS(Jr, t, n);
  else {
    const s = Do(t);
    n == null || (s && !ks(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function Ha(e, t, n, i, r, s, o) {
  if (t === "innerHTML" || t === "textContent") {
    i && o(i, r, s), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value,
      d = n ?? "";
    u !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = ks(n))
      : n == null && u === "string"
      ? ((n = ""), (a = !0))
      : u === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Va(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function Ya(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
function Wa(e, t, n, i, r = null) {
  const s = e._vei || (e._vei = {}),
    o = s[t];
  if (i && o) o.value = i;
  else {
    const [l, a] = za(t);
    if (i) {
      const u = (s[t] = Xa(i, r));
      Va(e, l, u, a);
    } else o && (Ya(e, l, o, a), (s[t] = void 0));
  }
}
const Ur = /(?:Once|Passive|Capture)$/;
function za(e) {
  let t;
  if (Ur.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Ur)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Pt(e.slice(2)), t];
}
let ui = 0;
const Za = Promise.resolve(),
  Ga = () => ui || (Za.then(() => (ui = 0)), (ui = Date.now()));
function Xa(e, t) {
  const n = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= n.attached) return;
    Ie($a(i, n.value), t, 5, [i]);
  };
  return (n.value = e), (n.attached = Ga()), n;
}
function $a(e, t) {
  if (O(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((i) => (r) => !r._stopped && i && i(r))
    );
  } else return t;
}
const qr = /^on[a-z]/,
  ec = (e, t, n, i, r = !1, s, o, l, a) => {
    t === "class"
      ? Ka(e, i, r)
      : t === "style"
      ? Na(e, n, i)
      : Mn(t)
      ? qi(t) || Wa(e, t, n, i, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : tc(e, t, i, r)
        )
      ? Ha(e, t, i, s, o, l, a)
      : (t === "true-value"
          ? (e._trueValue = i)
          : t === "false-value" && (e._falseValue = i),
        Da(e, t, i, r));
  };
function tc(e, t, n, i) {
  return i
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && qr.test(t) && D(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (qr.test(t) && ae(n))
    ? !1
    : t in e;
}
const $e = "transition",
  Dt = "animation",
  an = (e, { slots: t }) => G(Nl, nc(e), t);
an.displayName = "Transition";
const uo = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
an.props = fe({}, zs, uo);
const at = (e, t = []) => {
    O(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Mr = (e) => (e ? (O(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function nc(e) {
  const t = {};
  for (const R in e) R in uo || (t[R] = e[R]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: i,
      duration: r,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = s,
      appearActiveClass: u = o,
      appearToClass: d = l,
      leaveFromClass: g = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: A = `${n}-leave-to`,
    } = e,
    w = ic(r),
    x = w && w[0],
    B = w && w[1],
    {
      onBeforeEnter: M,
      onEnter: S,
      onEnterCancelled: K,
      onLeave: _,
      onLeaveCancelled: q,
      onBeforeAppear: Y = M,
      onAppear: H = S,
      onAppearCancelled: F = K,
    } = t,
    T = (R, W, I) => {
      ct(R, W ? d : l), ct(R, W ? u : o), I && I();
    },
    P = (R, W) => {
      (R._isLeaving = !1), ct(R, g), ct(R, A), ct(R, h), W && W();
    },
    L = (R) => (W, I) => {
      const te = R ? H : S,
        ee = () => T(W, R, I);
      at(te, [W, ee]),
        Pr(() => {
          ct(W, R ? a : s), et(W, R ? d : l), Mr(te) || Or(W, i, x, ee);
        });
    };
  return fe(t, {
    onBeforeEnter(R) {
      at(M, [R]), et(R, s), et(R, o);
    },
    onBeforeAppear(R) {
      at(Y, [R]), et(R, a), et(R, u);
    },
    onEnter: L(!1),
    onAppear: L(!0),
    onLeave(R, W) {
      R._isLeaving = !0;
      const I = () => P(R, W);
      et(R, g),
        oc(),
        et(R, h),
        Pr(() => {
          R._isLeaving && (ct(R, g), et(R, A), Mr(_) || Or(R, i, B, I));
        }),
        at(_, [R, I]);
    },
    onEnterCancelled(R) {
      T(R, !1), at(K, [R]);
    },
    onAppearCancelled(R) {
      T(R, !0), at(F, [R]);
    },
    onLeaveCancelled(R) {
      P(R), at(q, [R]);
    },
  });
}
function ic(e) {
  if (e == null) return null;
  if (le(e)) return [fi(e.enter), fi(e.leave)];
  {
    const t = fi(e);
    return [t, t];
  }
}
function fi(e) {
  return Mo(e);
}
function et(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function ct(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Pr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let rc = 0;
function Or(e, t, n, i) {
  const r = (e._endId = ++rc),
    s = () => {
      r === e._endId && i();
    };
  if (n) return setTimeout(s, n);
  const { type: o, timeout: l, propCount: a } = sc(e, t);
  if (!o) return i();
  const u = o + "end";
  let d = 0;
  const g = () => {
      e.removeEventListener(u, h), s();
    },
    h = (A) => {
      A.target === e && ++d >= a && g();
    };
  setTimeout(() => {
    d < a && g();
  }, l + 1),
    e.addEventListener(u, h);
}
function sc(e, t) {
  const n = window.getComputedStyle(e),
    i = (w) => (n[w] || "").split(", "),
    r = i(`${$e}Delay`),
    s = i(`${$e}Duration`),
    o = Kr(r, s),
    l = i(`${Dt}Delay`),
    a = i(`${Dt}Duration`),
    u = Kr(l, a);
  let d = null,
    g = 0,
    h = 0;
  t === $e
    ? o > 0 && ((d = $e), (g = o), (h = s.length))
    : t === Dt
    ? u > 0 && ((d = Dt), (g = u), (h = a.length))
    : ((g = Math.max(o, u)),
      (d = g > 0 ? (o > u ? $e : Dt) : null),
      (h = d ? (d === $e ? s.length : a.length) : 0));
  const A =
    d === $e && /\b(transform|all)(,|$)/.test(i(`${$e}Property`).toString());
  return { type: d, timeout: g, propCount: h, hasTransform: A };
}
function Kr(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, i) => Nr(n) + Nr(e[i])));
}
function Nr(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function oc() {
  return document.body.offsetHeight;
}
const lc = fe({ patchProp: ec }, Oa);
let jr;
function ac() {
  return jr || (jr = ga(lc));
}
const cc = (...e) => {
  const t = ac().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (i) => {
      const r = uc(i);
      if (!r) return;
      const s = t._component;
      !D(s) && !s.render && !s.template && (s.template = r.innerHTML),
        (r.innerHTML = "");
      const o = n(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function uc(e) {
  return ae(e) ? document.querySelector(e) : e;
}
function Gn(e, t, n, i) {
  return Object.defineProperty(e, t, { get: n, set: i, enumerable: !0 }), e;
}
const Et = he(!1);
let Xn;
function fc(e, t) {
  const n =
    /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) ||
    /(opr)[\/]([\w.]+)/.exec(e) ||
    /(vivaldi)[\/]([\w.]+)/.exec(e) ||
    /(chrome|crios)[\/]([\w.]+)/.exec(e) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(
      e
    ) ||
    /(firefox|fxios)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+)/.exec(e) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) ||
    [];
  return {
    browser: n[5] || n[3] || n[1] || "",
    version: n[2] || n[4] || "0",
    versionNumber: n[4] || n[2] || "0",
    platform: t[0] || "",
  };
}
function dc(e) {
  return (
    /(ipad)/.exec(e) ||
    /(ipod)/.exec(e) ||
    /(windows phone)/.exec(e) ||
    /(iphone)/.exec(e) ||
    /(kindle)/.exec(e) ||
    /(silk)/.exec(e) ||
    /(android)/.exec(e) ||
    /(win)/.exec(e) ||
    /(mac)/.exec(e) ||
    /(linux)/.exec(e) ||
    /(cros)/.exec(e) ||
    /(playbook)/.exec(e) ||
    /(bb)/.exec(e) ||
    /(blackberry)/.exec(e) ||
    []
  );
}
const fo = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function hc(e) {
  (Xn = { is: { ...e } }), delete e.mac, delete e.desktop;
  const t =
    Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: !0, ios: !0, platform: t, [t]: !0 });
}
function gc(e) {
  const t = e.toLowerCase(),
    n = dc(t),
    i = fc(t, n),
    r = {};
  i.browser &&
    ((r[i.browser] = !0),
    (r.version = i.version),
    (r.versionNumber = parseInt(i.versionNumber, 10))),
    i.platform && (r[i.platform] = !0);
  const s =
    r.android ||
    r.ios ||
    r.bb ||
    r.blackberry ||
    r.ipad ||
    r.iphone ||
    r.ipod ||
    r.kindle ||
    r.playbook ||
    r.silk ||
    r["windows phone"];
  return (
    s === !0 || t.indexOf("mobile") > -1
      ? ((r.mobile = !0),
        r.edga || r.edgios
          ? ((r.edge = !0), (i.browser = "edge"))
          : r.crios
          ? ((r.chrome = !0), (i.browser = "chrome"))
          : r.fxios && ((r.firefox = !0), (i.browser = "firefox")))
      : (r.desktop = !0),
    (r.ipod || r.ipad || r.iphone) && (r.ios = !0),
    r["windows phone"] && ((r.winphone = !0), delete r["windows phone"]),
    (r.chrome ||
      r.opr ||
      r.safari ||
      r.vivaldi ||
      (r.mobile === !0 && r.ios !== !0 && s !== !0)) &&
      (r.webkit = !0),
    r.edg && ((i.browser = "edgechromium"), (r.edgeChromium = !0)),
    ((r.safari && r.blackberry) || r.bb) &&
      ((i.browser = "blackberry"), (r.blackberry = !0)),
    r.safari && r.playbook && ((i.browser = "playbook"), (r.playbook = !0)),
    r.opr && ((i.browser = "opera"), (r.opera = !0)),
    r.safari && r.android && ((i.browser = "android"), (r.android = !0)),
    r.safari && r.kindle && ((i.browser = "kindle"), (r.kindle = !0)),
    r.safari && r.silk && ((i.browser = "silk"), (r.silk = !0)),
    r.vivaldi && ((i.browser = "vivaldi"), (r.vivaldi = !0)),
    (r.name = i.browser),
    (r.platform = i.platform),
    t.indexOf("electron") > -1
      ? (r.electron = !0)
      : document.location.href.indexOf("-extension://") > -1
      ? (r.bex = !0)
      : (window.Capacitor !== void 0
          ? ((r.capacitor = !0),
            (r.nativeMobile = !0),
            (r.nativeMobileWrapper = "capacitor"))
          : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
            ((r.cordova = !0),
            (r.nativeMobile = !0),
            (r.nativeMobileWrapper = "cordova")),
        fo === !0 &&
          r.mac === !0 &&
          ((r.desktop === !0 && r.safari === !0) ||
            (r.nativeMobile === !0 &&
              r.android !== !0 &&
              r.ios !== !0 &&
              r.ipad !== !0)) &&
          hc(r)),
    r
  );
}
const Dr = navigator.userAgent || navigator.vendor || window.opera,
  pc = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  ue = {
    userAgent: Dr,
    is: gc(Dr),
    has: { touch: fo },
    within: { iframe: window.self !== window.top },
  },
  Qi = {
    install(e) {
      const { $q: t } = e;
      Et.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, ue), (Et.value = !1), (Xn = void 0);
          }),
          (t.platform = dn(this)))
        : (t.platform = this);
    },
  };
{
  let e;
  Gn(ue.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage) return (e = !0), !0;
    } catch {}
    return (e = !1), !1;
  }),
    ue.is.ios === !0 && window.navigator.vendor.toLowerCase().indexOf("apple"),
    Et.value === !0 ? Object.assign(Qi, ue, Xn, pc) : Object.assign(Qi, ue);
}
const $n = (e, t) => {
    const n = dn(e);
    for (const i in e)
      Gn(
        t,
        i,
        () => n[i],
        (r) => {
          n[i] = r;
        }
      );
    return t;
  },
  Se = { hasPassive: !1, passiveCapture: !0, notPassiveCapture: !0 };
try {
  const e = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(Se, {
        hasPassive: !0,
        passive: { passive: !0 },
        notPassive: { passive: !1 },
        passiveCapture: { passive: !0, capture: !0 },
        notPassiveCapture: { passive: !1, capture: !0 },
      });
    },
  });
  window.addEventListener("qtest", null, e),
    window.removeEventListener("qtest", null, e);
} catch {}
function cn() {}
function mc(e) {
  return (
    e.touches && e.touches[0]
      ? (e = e.touches[0])
      : e.changedTouches && e.changedTouches[0]
      ? (e = e.changedTouches[0])
      : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]),
    { top: e.clientY, left: e.clientX }
  );
}
function vc(e) {
  if (e.path) return e.path;
  if (e.composedPath) return e.composedPath();
  const t = [];
  let n = e.target;
  for (; n; ) {
    if ((t.push(n), n.tagName === "HTML"))
      return t.push(document), t.push(window), t;
    n = n.parentElement;
  }
}
function ho(e) {
  e.stopPropagation();
}
function bc(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function ft(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function Ac(e, t, n) {
  const i = `__q_${t}_evt`;
  (e[i] = e[i] !== void 0 ? e[i].concat(n) : n),
    n.forEach((r) => {
      r[0].addEventListener(r[1], e[r[2]], Se[r[3]]);
    });
}
function yc(e, t) {
  const n = `__q_${t}_evt`;
  e[n] !== void 0 &&
    (e[n].forEach((i) => {
      i[0].removeEventListener(i[1], e[i[2]], Se[i[3]]);
    }),
    (e[n] = void 0));
}
function Ec(e, t = 250, n) {
  let i = null;
  function r() {
    const s = arguments,
      o = () => {
        (i = null), n !== !0 && e.apply(this, s);
      };
    i !== null ? clearTimeout(i) : n === !0 && e.apply(this, s),
      (i = setTimeout(o, t));
  }
  return (
    (r.cancel = () => {
      i !== null && clearTimeout(i);
    }),
    r
  );
}
const di = ["sm", "md", "lg", "xl"],
  { passive: Hr } = Se,
  wc = $n(
    {
      width: 0,
      height: 0,
      name: "xs",
      sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
      lt: { sm: !0, md: !0, lg: !0, xl: !0 },
      gt: { xs: !1, sm: !1, md: !1, lg: !1 },
      xs: !0,
      sm: !1,
      md: !1,
      lg: !1,
      xl: !1,
    },
    {
      setSizes: cn,
      setDebounce: cn,
      install({ $q: e, onSSRHydrated: t }) {
        if (((e.screen = this), this.__installed === !0)) {
          e.config.screen !== void 0 &&
            (e.config.screen.bodyClasses === !1
              ? document.body.classList.remove(`screen--${this.name}`)
              : this.__update(!0));
          return;
        }
        const { visualViewport: n } = window,
          i = n || window,
          r = document.scrollingElement || document.documentElement,
          s =
            n === void 0 || ue.is.mobile === !0
              ? () => [
                  Math.max(window.innerWidth, r.clientWidth),
                  Math.max(window.innerHeight, r.clientHeight),
                ]
              : () => [
                  n.width * n.scale + window.innerWidth - r.clientWidth,
                  n.height * n.scale + window.innerHeight - r.clientHeight,
                ],
          o = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0;
        this.__update = (g) => {
          const [h, A] = s();
          if ((A !== this.height && (this.height = A), h !== this.width))
            this.width = h;
          else if (g !== !0) return;
          let w = this.sizes;
          (this.gt.xs = h >= w.sm),
            (this.gt.sm = h >= w.md),
            (this.gt.md = h >= w.lg),
            (this.gt.lg = h >= w.xl),
            (this.lt.sm = h < w.sm),
            (this.lt.md = h < w.md),
            (this.lt.lg = h < w.lg),
            (this.lt.xl = h < w.xl),
            (this.xs = this.lt.sm),
            (this.sm = this.gt.xs === !0 && this.lt.md === !0),
            (this.md = this.gt.sm === !0 && this.lt.lg === !0),
            (this.lg = this.gt.md === !0 && this.lt.xl === !0),
            (this.xl = this.gt.lg),
            (w =
              (this.xs === !0 && "xs") ||
              (this.sm === !0 && "sm") ||
              (this.md === !0 && "md") ||
              (this.lg === !0 && "lg") ||
              "xl"),
            w !== this.name &&
              (o === !0 &&
                (document.body.classList.remove(`screen--${this.name}`),
                document.body.classList.add(`screen--${w}`)),
              (this.name = w));
        };
        let l,
          a = {},
          u = 16;
        (this.setSizes = (g) => {
          di.forEach((h) => {
            g[h] !== void 0 && (a[h] = g[h]);
          });
        }),
          (this.setDebounce = (g) => {
            u = g;
          });
        const d = () => {
          const g = getComputedStyle(document.body);
          g.getPropertyValue("--q-size-sm") &&
            di.forEach((h) => {
              this.sizes[h] = parseInt(g.getPropertyValue(`--q-size-${h}`), 10);
            }),
            (this.setSizes = (h) => {
              di.forEach((A) => {
                h[A] && (this.sizes[A] = h[A]);
              }),
                this.__update(!0);
            }),
            (this.setDebounce = (h) => {
              l !== void 0 && i.removeEventListener("resize", l, Hr),
                (l = h > 0 ? Ec(this.__update, h) : this.__update),
                i.addEventListener("resize", l, Hr);
            }),
            this.setDebounce(u),
            Object.keys(a).length !== 0
              ? (this.setSizes(a), (a = void 0))
              : this.__update(),
            o === !0 &&
              this.name === "xs" &&
              document.body.classList.add("screen--xs");
        };
        Et.value === !0 ? t.push(d) : d();
      },
    }
  ),
  me = $n(
    { isActive: !1, mode: !1 },
    {
      __media: void 0,
      set(e) {
        (me.mode = e),
          e === "auto"
            ? (me.__media === void 0 &&
                ((me.__media = window.matchMedia(
                  "(prefers-color-scheme: dark)"
                )),
                (me.__updateMedia = () => {
                  me.set("auto");
                }),
                me.__media.addListener(me.__updateMedia)),
              (e = me.__media.matches))
            : me.__media !== void 0 &&
              (me.__media.removeListener(me.__updateMedia),
              (me.__media = void 0)),
          (me.isActive = e === !0),
          document.body.classList.remove(
            `body--${e === !0 ? "light" : "dark"}`
          ),
          document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
      },
      toggle() {
        me.set(me.isActive === !1);
      },
      install({ $q: e, onSSRHydrated: t, ssrContext: n }) {
        const { dark: i } = e.config;
        if (((e.dark = this), this.__installed === !0 && i === void 0)) return;
        this.isActive = i === !0;
        const r = i !== void 0 ? i : !1;
        if (Et.value === !0) {
          const s = (l) => {
              this.__fromSSR = l;
            },
            o = this.set;
          (this.set = s),
            s(r),
            t.push(() => {
              (this.set = o), this.set(this.__fromSSR);
            });
        } else this.set(r);
      },
    }
  ),
  go = () => !0;
function kc(e) {
  return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function xc(e) {
  return (
    e.startsWith("#") === !0 && (e = e.substring(1)),
    e.startsWith("/") === !1 && (e = "/" + e),
    e.endsWith("/") === !0 && (e = e.substring(0, e.length - 1)),
    "#" + e
  );
}
function Cc(e) {
  if (e.backButtonExit === !1) return () => !1;
  if (e.backButtonExit === "*") return go;
  const t = ["#/"];
  return (
    Array.isArray(e.backButtonExit) === !0 &&
      t.push(...e.backButtonExit.filter(kc).map(xc)),
    () => t.includes(window.location.hash)
  );
}
const Li = {
    __history: [],
    add: cn,
    remove: cn,
    install({ $q: e }) {
      if (this.__installed === !0) return;
      const { cordova: t, capacitor: n } = ue.is;
      if (t !== !0 && n !== !0) return;
      const i = e.config[t === !0 ? "cordova" : "capacitor"];
      if (
        (i !== void 0 && i.backButton === !1) ||
        (n === !0 &&
          (window.Capacitor === void 0 ||
            window.Capacitor.Plugins.App === void 0))
      )
        return;
      (this.add = (o) => {
        o.condition === void 0 && (o.condition = go), this.__history.push(o);
      }),
        (this.remove = (o) => {
          const l = this.__history.indexOf(o);
          l >= 0 && this.__history.splice(l, 1);
        });
      const r = Cc(Object.assign({ backButtonExit: !0 }, i)),
        s = () => {
          if (this.__history.length) {
            const o = this.__history[this.__history.length - 1];
            o.condition() === !0 && (this.__history.pop(), o.handler());
          } else r() === !0 ? navigator.app.exitApp() : window.history.back();
        };
      t === !0
        ? document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", s, !1);
          })
        : window.Capacitor.Plugins.App.addListener("backButton", s);
    },
  },
  Vr = {
    isoName: "en-US",
    nativeName: "English (US)",
    label: {
      clear: "Clear",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      set: "Set",
      select: "Select",
      reset: "Reset",
      remove: "Remove",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      expand: (e) => (e ? `Expand "${e}"` : "Expand"),
      collapse: (e) => (e ? `Collapse "${e}"` : "Collapse"),
    },
    date: {
      days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
        "_"
      ),
      daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      months:
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: "days",
    },
    table: {
      noData: "No data available",
      noResults: "No matching records found",
      loading: "Loading...",
      selectedRecords: (e) =>
        e === 1
          ? "1 record selected."
          : (e === 0 ? "No" : e) + " records selected.",
      recordsPerPage: "Records per page:",
      allRows: "All",
      pagination: (e, t, n) => e + "-" + t + " of " + n,
      columns: "Columns",
    },
    editor: {
      url: "URL",
      bold: "Bold",
      italic: "Italic",
      strikethrough: "Strikethrough",
      underline: "Underline",
      unorderedList: "Unordered List",
      orderedList: "Ordered List",
      subscript: "Subscript",
      superscript: "Superscript",
      hyperlink: "Hyperlink",
      toggleFullscreen: "Toggle Fullscreen",
      quote: "Quote",
      left: "Left align",
      center: "Center align",
      right: "Right align",
      justify: "Justify align",
      print: "Print",
      outdent: "Decrease indentation",
      indent: "Increase indentation",
      removeFormat: "Remove formatting",
      formatting: "Formatting",
      fontSize: "Font Size",
      align: "Align",
      hr: "Insert Horizontal Rule",
      undo: "Undo",
      redo: "Redo",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      heading4: "Heading 4",
      heading5: "Heading 5",
      heading6: "Heading 6",
      paragraph: "Paragraph",
      code: "Code",
      size1: "Very small",
      size2: "A bit small",
      size3: "Normal",
      size4: "Medium-large",
      size5: "Big",
      size6: "Very big",
      size7: "Maximum",
      defaultFont: "Default Font",
      viewSource: "View Source",
    },
    tree: {
      noNodes: "No nodes available",
      noResults: "No matching nodes found",
    },
  };
function Yr() {
  const e =
    Array.isArray(navigator.languages) === !0 &&
    navigator.languages.length !== 0
      ? navigator.languages[0]
      : navigator.language;
  if (typeof e == "string")
    return e
      .split(/[-_]/)
      .map((t, n) =>
        n === 0
          ? t.toLowerCase()
          : n > 1 || t.length < 4
          ? t.toUpperCase()
          : t[0].toUpperCase() + t.slice(1).toLowerCase()
      )
      .join("-");
}
const Te = $n(
  { __langPack: {} },
  {
    getLocale: Yr,
    set(e = Vr, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: Yr };
      {
        if (
          ((n.set = Te.set),
          Te.__langConfig === void 0 || Te.__langConfig.noHtmlAttrs !== !0)
        ) {
          const i = document.documentElement;
          i.setAttribute("dir", n.rtl === !0 ? "rtl" : "ltr"),
            i.setAttribute("lang", n.isoName);
        }
        Object.assign(Te.__langPack, n),
          (Te.props = n),
          (Te.isoName = n.isoName),
          (Te.nativeName = n.nativeName);
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      (e.lang = Te.__langPack),
        (Te.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : this.set(t || Vr);
    },
  }
);
function Rc(e, t, n = document.body) {
  if (typeof e != "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t != "string") throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t);
}
let po = !1;
function Sc(e) {
  po = e.isComposing === !0;
}
function Bc(e) {
  return (
    po === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
  );
}
function un(e, t) {
  return Bc(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
function mo(e) {
  if (e.ios === !0) return "ios";
  if (e.android === !0) return "android";
}
function Ic({ is: e, has: t, within: n }, i) {
  const r = [
    e.desktop === !0 ? "desktop" : "mobile",
    `${t.touch === !1 ? "no-" : ""}touch`,
  ];
  if (e.mobile === !0) {
    const s = mo(e);
    s !== void 0 && r.push("platform-" + s);
  }
  if (e.nativeMobile === !0) {
    const s = e.nativeMobileWrapper;
    r.push(s),
      r.push("native-mobile"),
      e.ios === !0 &&
        (i[s] === void 0 || i[s].iosStatusBarPadding !== !1) &&
        r.push("q-ios-padding");
  } else e.electron === !0 ? r.push("electron") : e.bex === !0 && r.push("bex");
  return n.iframe === !0 && r.push("within-iframe"), r;
}
function _c() {
  const { is: e } = ue,
    t = document.body.className,
    n = new Set(t.replace(/ {2}/g, " ").split(" "));
  if (Xn !== void 0)
    n.delete("desktop"), n.add("platform-ios"), n.add("mobile");
  else if (e.nativeMobile !== !0 && e.electron !== !0 && e.bex !== !0) {
    if (e.desktop === !0)
      n.delete("mobile"),
        n.delete("platform-ios"),
        n.delete("platform-android"),
        n.add("desktop");
    else if (e.mobile === !0) {
      n.delete("desktop"), n.add("mobile");
      const r = mo(e);
      r !== void 0
        ? (n.add(`platform-${r}`),
          n.delete(`platform-${r === "ios" ? "android" : "ios"}`))
        : (n.delete("platform-ios"), n.delete("platform-android"));
    }
  }
  ue.has.touch === !0 && (n.delete("no-touch"), n.add("touch")),
    ue.within.iframe === !0 && n.add("within-iframe");
  const i = Array.from(n).join(" ");
  t !== i && (document.body.className = i);
}
function Fc(e) {
  for (const t in e) Rc(t, e[t]);
}
const Tc = {
    install(e) {
      if (this.__installed !== !0) {
        if (Et.value === !0) _c();
        else {
          const { $q: t } = e;
          t.config.brand !== void 0 && Fc(t.config.brand);
          const n = Ic(ue, t.config);
          document.body.classList.add.apply(document.body.classList, n);
        }
        ue.is.ios === !0 && document.body.addEventListener("touchstart", cn),
          window.addEventListener("keydown", Sc, !0);
      }
    },
  },
  Qc = {
    name: "material-icons",
    type: {
      positive: "check_circle",
      negative: "warning",
      info: "info",
      warning: "priority_high",
    },
    arrow: {
      up: "arrow_upward",
      right: "arrow_forward",
      down: "arrow_downward",
      left: "arrow_back",
      dropdown: "arrow_drop_down",
    },
    chevron: { left: "chevron_left", right: "chevron_right" },
    colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" },
    pullToRefresh: { icon: "refresh" },
    carousel: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
      navigationIcon: "lens",
    },
    chip: { remove: "cancel", selected: "check" },
    datetime: {
      arrowLeft: "chevron_left",
      arrowRight: "chevron_right",
      now: "access_time",
      today: "today",
    },
    editor: {
      bold: "format_bold",
      italic: "format_italic",
      strikethrough: "strikethrough_s",
      underline: "format_underlined",
      unorderedList: "format_list_bulleted",
      orderedList: "format_list_numbered",
      subscript: "vertical_align_bottom",
      superscript: "vertical_align_top",
      hyperlink: "link",
      toggleFullscreen: "fullscreen",
      quote: "format_quote",
      left: "format_align_left",
      center: "format_align_center",
      right: "format_align_right",
      justify: "format_align_justify",
      print: "print",
      outdent: "format_indent_decrease",
      indent: "format_indent_increase",
      removeFormat: "format_clear",
      formatting: "text_format",
      fontSize: "format_size",
      align: "format_align_left",
      hr: "remove",
      undo: "undo",
      redo: "redo",
      heading: "format_size",
      code: "code",
      size: "format_size",
      font: "font_download",
      viewSource: "code",
    },
    expansionItem: {
      icon: "keyboard_arrow_down",
      denseIcon: "arrow_drop_down",
    },
    fab: { icon: "add", activeIcon: "close" },
    field: { clear: "cancel", error: "error" },
    pagination: {
      first: "first_page",
      prev: "keyboard_arrow_left",
      next: "keyboard_arrow_right",
      last: "last_page",
    },
    rating: { icon: "grade" },
    stepper: { done: "check", active: "edit", error: "warning" },
    tabs: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
    },
    table: {
      arrowUp: "arrow_upward",
      warning: "warning",
      firstPage: "first_page",
      prevPage: "chevron_left",
      nextPage: "chevron_right",
      lastPage: "last_page",
    },
    tree: { icon: "play_arrow" },
    uploader: {
      done: "done",
      clear: "clear",
      add: "add_box",
      upload: "cloud_upload",
      removeQueue: "clear_all",
      removeUploaded: "done_all",
    },
  },
  Un = $n(
    { iconMapFn: null, __icons: {} },
    {
      set(e, t) {
        const n = { ...e, rtl: e.rtl === !0 };
        (n.set = Un.set), Object.assign(Un.__icons, n);
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__icons),
          Gn(
            e,
            "iconMapFn",
            () => this.iconMapFn,
            (i) => {
              this.iconMapFn = i;
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : this.set(t || Qc);
      },
    }
  ),
  Lc = "_q_",
  qn = {};
let vo = !1;
function Jc() {
  vo = !0;
}
function Wr(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
const zr = [Qi, Tc, me, wc, Li, Te, Un];
function Zr(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0);
  });
}
function Uc(e, t, n) {
  (e.config.globalProperties.$q = n.$q),
    e.provide(Lc, n.$q),
    Zr(n, zr),
    t.components !== void 0 &&
      Object.values(t.components).forEach((i) => {
        Wr(i) === !0 && i.name !== void 0 && e.component(i.name, i);
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((i) => {
        Wr(i) === !0 && i.name !== void 0 && e.directive(i.name, i);
      }),
    t.plugins !== void 0 &&
      Zr(
        n,
        Object.values(t.plugins).filter(
          (i) => typeof i.install == "function" && zr.includes(i) === !1
        )
      ),
    Et.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((i) => {
          i();
        }),
          (n.$q.onSSRHydrated = () => {});
      });
}
const qc = function (e, t = {}) {
    const n = { version: "2.12.6" };
    vo === !1
      ? (t.config !== void 0 && Object.assign(qn, t.config),
        (n.config = { ...qn }),
        Jc())
      : (n.config = t.config || {}),
      Uc(e, t, {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: [],
      });
  },
  Mc = { version: "2.12.6", install: qc, lang: Te, iconSet: Un };
const kt = (e) => Nn(jl(e)),
  bo = (e) => Nn(e),
  Pc = G("div", { class: "q-space" }),
  Oc = kt({
    name: "QSpace",
    setup() {
      return () => Pc;
    },
  }),
  Ji = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  Ao = { size: String };
function yo(e, t = Ji) {
  return N(() =>
    e.size !== void 0
      ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
      : null
  );
}
function ei(e, t) {
  return (e !== void 0 && e()) || t;
}
function zt(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
const Gr = "0 0 24 24",
  Xr = (e) => e,
  hi = (e) => `ionicons ${e}`,
  Eo = {
    "mdi-": (e) => `mdi ${e}`,
    "icon-": Xr,
    "bt-": (e) => `bt ${e}`,
    "eva-": (e) => `eva ${e}`,
    "ion-md": hi,
    "ion-ios": hi,
    "ion-logo": hi,
    "iconfont ": Xr,
    "ti-": (e) => `themify-icon ${e}`,
    "bi-": (e) => `bootstrap-icons ${e}`,
  },
  wo = { o_: "-outlined", r_: "-round", s_: "-sharp" },
  ko = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" },
  Kc = new RegExp("^(" + Object.keys(Eo).join("|") + ")"),
  Nc = new RegExp("^(" + Object.keys(wo).join("|") + ")"),
  $r = new RegExp("^(" + Object.keys(ko).join("|") + ")"),
  jc = /^[Mm]\s?[-+]?\.?\d/,
  Dc = /^img:/,
  Hc = /^svguse:/,
  Vc = /^ion-/,
  Yc = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /,
  es = kt({
    name: "QIcon",
    props: {
      ...Ao,
      tag: { type: String, default: "i" },
      name: String,
      color: String,
      left: Boolean,
      right: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Ye(),
        i = yo(e),
        r = N(
          () =>
            "q-icon" +
            (e.left === !0 ? " on-left" : "") +
            (e.right === !0 ? " on-right" : "") +
            (e.color !== void 0 ? ` text-${e.color}` : "")
        ),
        s = N(() => {
          let o,
            l = e.name;
          if (l === "none" || !l) return { none: !0 };
          if (n.iconMapFn !== null) {
            const d = n.iconMapFn(l);
            if (d !== void 0)
              if (d.icon !== void 0) {
                if (((l = d.icon), l === "none" || !l)) return { none: !0 };
              } else
                return {
                  cls: d.cls,
                  content: d.content !== void 0 ? d.content : " ",
                };
          }
          if (jc.test(l) === !0) {
            const [d, g = Gr] = l.split("|");
            return {
              svg: !0,
              viewBox: g,
              nodes: d.split("&&").map((h) => {
                const [A, w, x] = h.split("@@");
                return G("path", { style: w, d: A, transform: x });
              }),
            };
          }
          if (Dc.test(l) === !0) return { img: !0, src: l.substring(4) };
          if (Hc.test(l) === !0) {
            const [d, g = Gr] = l.split("|");
            return { svguse: !0, src: d.substring(7), viewBox: g };
          }
          let a = " ";
          const u = l.match(Kc);
          if (u !== null) o = Eo[u[1]](l);
          else if (Yc.test(l) === !0) o = l;
          else if (Vc.test(l) === !0)
            o = `ionicons ion-${
              n.platform.is.ios === !0 ? "ios" : "md"
            }${l.substring(3)}`;
          else if ($r.test(l) === !0) {
            o = "notranslate material-symbols";
            const d = l.match($r);
            d !== null && ((l = l.substring(6)), (o += ko[d[1]])), (a = l);
          } else {
            o = "notranslate material-icons";
            const d = l.match(Nc);
            d !== null && ((l = l.substring(2)), (o += wo[d[1]])), (a = l);
          }
          return { cls: o, content: a };
        });
      return () => {
        const o = {
          class: r.value,
          style: i.value,
          "aria-hidden": "true",
          role: "presentation",
        };
        return s.value.none === !0
          ? G(e.tag, o, ei(t.default))
          : s.value.img === !0
          ? G("span", o, zt(t.default, [G("img", { src: s.value.src })]))
          : s.value.svg === !0
          ? G(
              "span",
              o,
              zt(t.default, [
                G(
                  "svg",
                  { viewBox: s.value.viewBox || "0 0 24 24" },
                  s.value.nodes
                ),
              ])
            )
          : s.value.svguse === !0
          ? G(
              "span",
              o,
              zt(t.default, [
                G("svg", { viewBox: s.value.viewBox }, [
                  G("use", { "xlink:href": s.value.src }),
                ]),
              ])
            )
          : (s.value.cls !== void 0 && (o.class += " " + s.value.cls),
            G(e.tag, o, zt(t.default, [s.value.content])));
      };
    },
  }),
  Wc = { size: { type: [Number, String], default: "1em" }, color: String };
function zc(e) {
  return {
    cSize: N(() => (e.size in Ji ? `${Ji[e.size]}px` : e.size)),
    classes: N(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")),
  };
}
const Zc = kt({
  name: "QSpinner",
  props: { ...Wc, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = zc(e);
    return () =>
      G(
        "svg",
        {
          class: n.value + " q-spinner-mat",
          width: t.value,
          height: t.value,
          viewBox: "25 25 50 50",
        },
        [
          G("circle", {
            class: "path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": e.thickness,
            "stroke-miterlimit": "10",
          }),
        ]
      );
  },
});
function Gc(e, t) {
  const n = e.style;
  for (const i in t) n[i] = t[i];
}
function Xc(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1;
}
function $c(e, t = 250) {
  let n = !1,
    i;
  return function () {
    return (
      n === !1 &&
        ((n = !0),
        setTimeout(() => {
          n = !1;
        }, t),
        (i = e.apply(this, arguments))),
      i
    );
  };
}
function ts(e, t, n, i) {
  n.modifiers.stop === !0 && ho(e);
  const r = n.modifiers.color;
  let s = n.modifiers.center;
  s = s === !0 || i === !0;
  const o = document.createElement("span"),
    l = document.createElement("span"),
    a = mc(e),
    { left: u, top: d, width: g, height: h } = t.getBoundingClientRect(),
    A = Math.sqrt(g * g + h * h),
    w = A / 2,
    x = `${(g - A) / 2}px`,
    B = s ? x : `${a.left - u - w}px`,
    M = `${(h - A) / 2}px`,
    S = s ? M : `${a.top - d - w}px`;
  (l.className = "q-ripple__inner"),
    Gc(l, {
      height: `${A}px`,
      width: `${A}px`,
      transform: `translate3d(${B},${S},0) scale3d(.2,.2,1)`,
      opacity: 0,
    }),
    (o.className = `q-ripple${r ? " text-" + r : ""}`),
    o.setAttribute("dir", "ltr"),
    o.appendChild(l),
    t.appendChild(o);
  const K = () => {
    o.remove(), clearTimeout(_);
  };
  n.abort.push(K);
  let _ = setTimeout(() => {
    l.classList.add("q-ripple__inner--enter"),
      (l.style.transform = `translate3d(${x},${M},0) scale3d(1,1,1)`),
      (l.style.opacity = 0.2),
      (_ = setTimeout(() => {
        l.classList.remove("q-ripple__inner--enter"),
          l.classList.add("q-ripple__inner--leave"),
          (l.style.opacity = 0),
          (_ = setTimeout(() => {
            o.remove(), n.abort.splice(n.abort.indexOf(K), 1);
          }, 275));
      }, 250));
  }, 50);
}
function ns(e, { modifiers: t, value: n, arg: i }) {
  const r = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: r.early === !0,
    stop: r.stop === !0,
    center: r.center === !0,
    color: r.color || i,
    keyCodes: [].concat(r.keyCodes || 13),
  };
}
const eu = bo({
    name: "ripple",
    beforeMount(e, t) {
      const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
      if (n.ripple === !1) return;
      const i = {
        cfg: n,
        enabled: t.value !== !1,
        modifiers: {},
        abort: [],
        start(r) {
          i.enabled === !0 &&
            r.qSkipRipple !== !0 &&
            r.type === (i.modifiers.early === !0 ? "pointerdown" : "click") &&
            ts(r, e, i, r.qKeyEvent === !0);
        },
        keystart: $c((r) => {
          i.enabled === !0 &&
            r.qSkipRipple !== !0 &&
            un(r, i.modifiers.keyCodes) === !0 &&
            r.type === `key${i.modifiers.early === !0 ? "down" : "up"}` &&
            ts(r, e, i, !0);
        }, 300),
      };
      ns(i, t),
        (e.__qripple = i),
        Ac(i, "main", [
          [e, "pointerdown", "start", "passive"],
          [e, "click", "start", "passive"],
          [e, "keydown", "keystart", "passive"],
          [e, "keyup", "keystart", "passive"],
        ]);
    },
    updated(e, t) {
      if (t.oldValue !== t.value) {
        const n = e.__qripple;
        n !== void 0 &&
          ((n.enabled = t.value !== !1),
          n.enabled === !0 && Object(t.value) === t.value && ns(n, t));
      }
    },
    beforeUnmount(e) {
      const t = e.__qripple;
      t !== void 0 &&
        (t.abort.forEach((n) => {
          n();
        }),
        yc(t, "main"),
        delete e._qripple);
    },
  }),
  xo = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch",
  },
  tu = Object.keys(xo),
  nu = { align: { type: String, validator: (e) => tu.includes(e) } };
function iu(e) {
  return N(() => {
    const t =
      e.align === void 0 ? (e.vertical === !0 ? "stretch" : "left") : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${xo[t]}`;
  });
}
function Bn(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function Co(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function Ro(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function is(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
function rs(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ru(e, t) {
  for (const n in t) {
    const i = t[n],
      r = e[n];
    if (typeof i == "string") {
      if (i !== r) return !1;
    } else if (
      Array.isArray(r) === !1 ||
      r.length !== i.length ||
      i.some((s, o) => s !== r[o])
    )
      return !1;
  }
  return !0;
}
function ss(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, i) => n === t[i])
    : e.length === 1 && e[0] === t;
}
function su(e, t) {
  return Array.isArray(e) === !0
    ? ss(e, t)
    : Array.isArray(t) === !0
    ? ss(t, e)
    : e === t;
}
function ou(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (su(e[n], t[n]) === !1) return !1;
  return !0;
}
const lu = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: { type: String, default: "q-router-link--active" },
  exactActiveClass: { type: String, default: "q-router-link--exact-active" },
  href: String,
  target: String,
  disable: Boolean,
};
function au({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const n = Ye(),
    { props: i, proxy: r, emit: s } = n,
    o = Co(n),
    l = N(() => i.disable !== !0 && i.href !== void 0),
    a = N(
      t === !0
        ? () =>
            o === !0 &&
            i.disable !== !0 &&
            l.value !== !0 &&
            i.to !== void 0 &&
            i.to !== null &&
            i.to !== ""
        : () =>
            o === !0 &&
            l.value !== !0 &&
            i.to !== void 0 &&
            i.to !== null &&
            i.to !== ""
    ),
    u = N(() => (a.value === !0 ? S(i.to) : null)),
    d = N(() => u.value !== null),
    g = N(() => l.value === !0 || d.value === !0),
    h = N(() => (i.type === "a" || g.value === !0 ? "a" : i.tag || e || "div")),
    A = N(() =>
      l.value === !0
        ? { href: i.href, target: i.target }
        : d.value === !0
        ? { href: u.value.href, target: i.target }
        : {}
    ),
    w = N(() => {
      if (d.value === !1) return -1;
      const { matched: q } = u.value,
        { length: Y } = q,
        H = q[Y - 1];
      if (H === void 0) return -1;
      const F = r.$route.matched;
      if (F.length === 0) return -1;
      const T = F.findIndex(rs.bind(null, H));
      if (T > -1) return T;
      const P = is(q[Y - 2]);
      return Y > 1 && is(H) === P && F[F.length - 1].path !== P
        ? F.findIndex(rs.bind(null, q[Y - 2]))
        : T;
    }),
    x = N(
      () =>
        d.value === !0 && w.value !== -1 && ru(r.$route.params, u.value.params)
    ),
    B = N(
      () =>
        x.value === !0 &&
        w.value === r.$route.matched.length - 1 &&
        ou(r.$route.params, u.value.params)
    ),
    M = N(() =>
      d.value === !0
        ? B.value === !0
          ? ` ${i.exactActiveClass} ${i.activeClass}`
          : i.exact === !0
          ? ""
          : x.value === !0
          ? ` ${i.activeClass}`
          : ""
        : ""
    );
  function S(q) {
    try {
      return r.$router.resolve(q);
    } catch {}
    return null;
  }
  function K(
    q,
    { returnRouterError: Y, to: H = i.to, replace: F = i.replace } = {}
  ) {
    if (i.disable === !0) return q.preventDefault(), Promise.resolve(!1);
    if (
      q.metaKey ||
      q.altKey ||
      q.ctrlKey ||
      q.shiftKey ||
      (q.button !== void 0 && q.button !== 0) ||
      i.target === "_blank"
    )
      return Promise.resolve(!1);
    q.preventDefault();
    const T = r.$router[F === !0 ? "replace" : "push"](H);
    return Y === !0 ? T : T.then(() => {}).catch(() => {});
  }
  function _(q) {
    if (d.value === !0) {
      const Y = (H) => K(q, H);
      s("click", q, Y), q.defaultPrevented !== !0 && Y();
    } else s("click", q);
  }
  return {
    hasRouterLink: d,
    hasHrefLink: l,
    hasLink: g,
    linkTag: h,
    resolvedLink: u,
    linkIsActive: x,
    linkIsExactActive: B,
    linkClass: M,
    linkAttrs: A,
    getLink: S,
    navigateToRouterLink: K,
    navigateOnClick: _,
  };
}
const os = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  cu = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
  uu = ["button", "submit", "reset"],
  fu = /[^\s]\/[^\s]/,
  du = ["flat", "outline", "push", "unelevated"],
  hu = (e, t) =>
    e.flat === !0
      ? "flat"
      : e.outline === !0
      ? "outline"
      : e.push === !0
      ? "push"
      : e.unelevated === !0
      ? "unelevated"
      : t,
  gu = {
    ...Ao,
    ...lu,
    type: { type: String, default: "button" },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...du.reduce((e, t) => (e[t] = Boolean) && e, {}),
    square: Boolean,
    round: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: { type: [Boolean, Object], default: !0 },
    align: { ...nu.align, default: "center" },
    stack: Boolean,
    stretch: Boolean,
    loading: { type: Boolean, default: null },
    disable: Boolean,
  };
function pu(e) {
  const t = yo(e, cu),
    n = iu(e),
    {
      hasRouterLink: i,
      hasLink: r,
      linkTag: s,
      linkAttrs: o,
      navigateOnClick: l,
    } = au({ fallbackTag: "button" }),
    a = N(() => {
      const B = e.fab === !1 && e.fabMini === !1 ? t.value : {};
      return e.padding !== void 0
        ? Object.assign({}, B, {
            padding: e.padding
              .split(/\s+/)
              .map((M) => (M in os ? os[M] + "px" : M))
              .join(" "),
            minWidth: "0",
            minHeight: "0",
          })
        : B;
    }),
    u = N(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    d = N(() => e.disable !== !0 && e.loading !== !0),
    g = N(() => (d.value === !0 ? e.tabindex || 0 : -1)),
    h = N(() => hu(e, "standard")),
    A = N(() => {
      const B = { tabindex: g.value };
      return (
        r.value === !0
          ? Object.assign(B, o.value)
          : uu.includes(e.type) === !0 && (B.type = e.type),
        s.value === "a"
          ? (e.disable === !0
              ? (B["aria-disabled"] = "true")
              : B.href === void 0 && (B.role = "button"),
            i.value !== !0 && fu.test(e.type) === !0 && (B.type = e.type))
          : e.disable === !0 &&
            ((B.disabled = ""), (B["aria-disabled"] = "true")),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(B, {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.percentage,
          }),
        B
      );
    }),
    w = N(() => {
      let B;
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (B = `text-${e.textColor || e.color}`)
          : (B = `bg-${e.color} text-${e.textColor || "white"}`)
        : e.textColor && (B = `text-${e.textColor}`);
      const M =
        e.round === !0
          ? "round"
          : `rectangle${
              u.value === !0
                ? " q-btn--rounded"
                : e.square === !0
                ? " q-btn--square"
                : ""
            }`;
      return (
        `q-btn--${h.value} q-btn--${M}` +
        (B !== void 0 ? " " + B : "") +
        (d.value === !0
          ? " q-btn--actionable q-focusable q-hoverable"
          : e.disable === !0
          ? " disabled"
          : "") +
        (e.fab === !0
          ? " q-btn--fab"
          : e.fabMini === !0
          ? " q-btn--fab-mini"
          : "") +
        (e.noCaps === !0 ? " q-btn--no-uppercase" : "") +
        (e.dense === !0 ? " q-btn--dense" : "") +
        (e.stretch === !0 ? " no-border-radius self-stretch" : "") +
        (e.glossy === !0 ? " glossy" : "") +
        (e.square ? " q-btn--square" : "")
      );
    }),
    x = N(
      () =>
        n.value +
        (e.stack === !0 ? " column" : " row") +
        (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") +
        (e.loading === !0 ? " q-btn__content--hidden" : "")
    );
  return {
    classes: w,
    style: a,
    innerClasses: x,
    attributes: A,
    hasLink: r,
    linkTag: s,
    navigateOnClick: l,
    isActionable: d,
  };
}
const { passiveCapture: Re } = Se;
let Bt = null,
  It = null,
  _t = null;
const mu = kt({
    name: "QBtn",
    props: {
      ...gu,
      percentage: Number,
      darkPercentage: Boolean,
      onTouchstart: [Function, Array],
    },
    emits: ["click", "keydown", "mousedown", "keyup"],
    setup(e, { slots: t, emit: n }) {
      const { proxy: i } = Ye(),
        {
          classes: r,
          style: s,
          innerClasses: o,
          attributes: l,
          hasLink: a,
          linkTag: u,
          navigateOnClick: d,
          isActionable: g,
        } = pu(e),
        h = he(null),
        A = he(null);
      let w = null,
        x,
        B = null;
      const M = N(
          () => e.label !== void 0 && e.label !== null && e.label !== ""
        ),
        S = N(() =>
          e.disable === !0 || e.ripple === !1
            ? !1
            : {
                keyCodes: a.value === !0 ? [13, 32] : [13],
                ...(e.ripple === !0 ? {} : e.ripple),
              }
        ),
        K = N(() => ({ center: e.round })),
        _ = N(() => {
          const I = Math.max(0, Math.min(100, e.percentage));
          return I > 0
            ? {
                transition: "transform 0.6s",
                transform: `translateX(${I - 100}%)`,
              }
            : {};
        }),
        q = N(() => {
          if (e.loading === !0)
            return {
              onMousedown: W,
              onTouchstart: W,
              onClick: W,
              onKeydown: W,
              onKeyup: W,
            };
          if (g.value === !0) {
            const I = { onClick: H, onKeydown: F, onMousedown: P };
            if (i.$q.platform.has.touch === !0) {
              const te = e.onTouchstart !== void 0 ? "" : "Passive";
              I[`onTouchstart${te}`] = T;
            }
            return I;
          }
          return { onClick: ft };
        }),
        Y = N(() => ({
          ref: h,
          class: "q-btn q-btn-item non-selectable no-outline " + r.value,
          style: s.value,
          ...l.value,
          ...q.value,
        }));
      function H(I) {
        if (h.value !== null) {
          if (I !== void 0) {
            if (I.defaultPrevented === !0) return;
            const te = document.activeElement;
            if (
              e.type === "submit" &&
              te !== document.body &&
              h.value.contains(te) === !1 &&
              te.contains(h.value) === !1
            ) {
              h.value.focus();
              const ee = () => {
                document.removeEventListener("keydown", ft, !0),
                  document.removeEventListener("keyup", ee, Re),
                  h.value !== null &&
                    h.value.removeEventListener("blur", ee, Re);
              };
              document.addEventListener("keydown", ft, !0),
                document.addEventListener("keyup", ee, Re),
                h.value.addEventListener("blur", ee, Re);
            }
          }
          d(I);
        }
      }
      function F(I) {
        h.value !== null &&
          (n("keydown", I),
          un(I, [13, 32]) === !0 &&
            It !== h.value &&
            (It !== null && R(),
            I.defaultPrevented !== !0 &&
              (h.value.focus(),
              (It = h.value),
              h.value.classList.add("q-btn--active"),
              document.addEventListener("keyup", L, !0),
              h.value.addEventListener("blur", L, Re)),
            ft(I)));
      }
      function T(I) {
        h.value !== null &&
          (n("touchstart", I),
          I.defaultPrevented !== !0 &&
            (Bt !== h.value &&
              (Bt !== null && R(),
              (Bt = h.value),
              (w = I.target),
              w.addEventListener("touchcancel", L, Re),
              w.addEventListener("touchend", L, Re)),
            (x = !0),
            B !== null && clearTimeout(B),
            (B = setTimeout(() => {
              (B = null), (x = !1);
            }, 200))));
      }
      function P(I) {
        h.value !== null &&
          ((I.qSkipRipple = x === !0),
          n("mousedown", I),
          I.defaultPrevented !== !0 &&
            _t !== h.value &&
            (_t !== null && R(),
            (_t = h.value),
            h.value.classList.add("q-btn--active"),
            document.addEventListener("mouseup", L, Re)));
      }
      function L(I) {
        if (
          h.value !== null &&
          !(
            I !== void 0 &&
            I.type === "blur" &&
            document.activeElement === h.value
          )
        ) {
          if (I !== void 0 && I.type === "keyup") {
            if (It === h.value && un(I, [13, 32]) === !0) {
              const te = new MouseEvent("click", I);
              (te.qKeyEvent = !0),
                I.defaultPrevented === !0 && bc(te),
                I.cancelBubble === !0 && ho(te),
                h.value.dispatchEvent(te),
                ft(I),
                (I.qKeyEvent = !0);
            }
            n("keyup", I);
          }
          R();
        }
      }
      function R(I) {
        const te = A.value;
        I !== !0 &&
          (Bt === h.value || _t === h.value) &&
          te !== null &&
          te !== document.activeElement &&
          (te.setAttribute("tabindex", -1), te.focus()),
          Bt === h.value &&
            (w !== null &&
              (w.removeEventListener("touchcancel", L, Re),
              w.removeEventListener("touchend", L, Re)),
            (Bt = w = null)),
          _t === h.value &&
            (document.removeEventListener("mouseup", L, Re), (_t = null)),
          It === h.value &&
            (document.removeEventListener("keyup", L, !0),
            h.value !== null && h.value.removeEventListener("blur", L, Re),
            (It = null)),
          h.value !== null && h.value.classList.remove("q-btn--active");
      }
      function W(I) {
        ft(I), (I.qSkipRipple = !0);
      }
      return (
        wt(() => {
          R(!0);
        }),
        Object.assign(i, { click: H }),
        () => {
          let I = [];
          e.icon !== void 0 &&
            I.push(
              G(es, {
                name: e.icon,
                left: e.stack === !1 && M.value === !0,
                role: "img",
                "aria-hidden": "true",
              })
            ),
            M.value === !0 && I.push(G("span", { class: "block" }, [e.label])),
            (I = zt(t.default, I)),
            e.iconRight !== void 0 &&
              e.round === !1 &&
              I.push(
                G(es, {
                  name: e.iconRight,
                  right: e.stack === !1 && M.value === !0,
                  role: "img",
                  "aria-hidden": "true",
                })
              );
          const te = [G("span", { class: "q-focus-helper", ref: A })];
          return (
            e.loading === !0 &&
              e.percentage !== void 0 &&
              te.push(
                G(
                  "span",
                  {
                    class:
                      "q-btn__progress absolute-full overflow-hidden" +
                      (e.darkPercentage === !0 ? " q-btn__progress--dark" : ""),
                  },
                  [
                    G("span", {
                      class: "q-btn__progress-indicator fit block",
                      style: _.value,
                    }),
                  ]
                )
              ),
            te.push(
              G(
                "span",
                {
                  class:
                    "q-btn__content text-center col items-center q-anchor--skip " +
                    o.value,
                },
                I
              )
            ),
            e.loading !== null &&
              te.push(
                G(an, { name: "q-transition--fade" }, () =>
                  e.loading === !0
                    ? [
                        G(
                          "span",
                          {
                            key: "loading",
                            class: "absolute-full flex flex-center",
                          },
                          t.loading !== void 0 ? t.loading() : [G(Zc)]
                        ),
                      ]
                    : null
                )
              ),
            Ws(G(u.value, Y.value, te), [[eu, S.value, void 0, K.value]])
          );
        }
      );
    },
  }),
  ls = kt({
    name: "QCardSection",
    props: { tag: { type: String, default: "div" }, horizontal: Boolean },
    setup(e, { slots: t }) {
      const n = N(
        () =>
          `q-card__section q-card__section--${
            e.horizontal === !0 ? "horiz row no-wrap" : "vert"
          }`
      );
      return () => G(e.tag, { class: n.value }, ei(t.default));
    },
  }),
  vu = { dark: { type: Boolean, default: null } };
function bu(e, t) {
  return N(() => (e.dark === null ? t.dark.isActive : e.dark));
}
const Au = kt({
  name: "QCard",
  props: {
    ...vu,
    tag: { type: String, default: "div" },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
  },
  setup(e, { slots: t }) {
    const {
        proxy: { $q: n },
      } = Ye(),
      i = bu(e, n),
      r = N(
        () =>
          "q-card" +
          (i.value === !0 ? " q-card--dark q-dark" : "") +
          (e.bordered === !0 ? " q-card--bordered" : "") +
          (e.square === !0 ? " q-card--square no-border-radius" : "") +
          (e.flat === !0 ? " q-card--flat no-shadow" : "")
      );
    return () => G(e.tag, { class: r.value }, ei(t.default));
  },
});
function yu(e, t, n) {
  let i;
  function r() {
    i !== void 0 && (Li.remove(i), (i = void 0));
  }
  return (
    wt(() => {
      e.value === !0 && r();
    }),
    {
      removeFromHistory: r,
      addToHistory() {
        (i = { condition: () => n.value === !0, handler: t }), Li.add(i);
      },
    }
  );
}
function Eu() {
  let e = null;
  const t = Ye();
  function n() {
    e !== null && (clearTimeout(e), (e = null));
  }
  return (
    Xi(n),
    wt(n),
    {
      removeTimeout: n,
      registerTimeout(i, r) {
        n(), Ro(t) === !1 && (e = setTimeout(i, r));
      },
    }
  );
}
function wu() {
  let e;
  const t = Ye();
  function n() {
    e = void 0;
  }
  return (
    Xi(n),
    wt(n),
    {
      removeTick: n,
      registerTick(i) {
        (e = i),
          Tn(() => {
            e === i && (Ro(t) === !1 && e(), (e = void 0));
          });
      },
    }
  );
}
const ku = {
    modelValue: { type: Boolean, default: null },
    "onUpdate:modelValue": [Function, Array],
  },
  xu = ["beforeShow", "show", "beforeHide", "hide"];
function Cu({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: i,
  handleHide: r,
  processOnMount: s,
}) {
  const o = Ye(),
    { props: l, emit: a, proxy: u } = o;
  let d;
  function g(S) {
    e.value === !0 ? w(S) : h(S);
  }
  function h(S) {
    if (
      l.disable === !0 ||
      (S !== void 0 && S.qAnchorHandled === !0) ||
      (t !== void 0 && t(S) !== !0)
    )
      return;
    const K = l["onUpdate:modelValue"] !== void 0;
    K === !0 &&
      (a("update:modelValue", !0),
      (d = S),
      Tn(() => {
        d === S && (d = void 0);
      })),
      (l.modelValue === null || K === !1) && A(S);
  }
  function A(S) {
    e.value !== !0 &&
      ((e.value = !0), a("beforeShow", S), i !== void 0 ? i(S) : a("show", S));
  }
  function w(S) {
    if (l.disable === !0) return;
    const K = l["onUpdate:modelValue"] !== void 0;
    K === !0 &&
      (a("update:modelValue", !1),
      (d = S),
      Tn(() => {
        d === S && (d = void 0);
      })),
      (l.modelValue === null || K === !1) && x(S);
  }
  function x(S) {
    e.value !== !1 &&
      ((e.value = !1), a("beforeHide", S), r !== void 0 ? r(S) : a("hide", S));
  }
  function B(S) {
    l.disable === !0 && S === !0
      ? l["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !1)
      : (S === !0) !== e.value && (S === !0 ? A : x)(d);
  }
  vt(() => l.modelValue, B),
    n !== void 0 &&
      Co(o) === !0 &&
      vt(
        () => u.$route.fullPath,
        () => {
          n.value === !0 && e.value === !0 && w();
        }
      ),
    s === !0 &&
      Yn(() => {
        B(l.modelValue);
      });
  const M = { show: h, hide: w, toggle: g };
  return Object.assign(u, M), M;
}
const Ru = {
  transitionShow: { type: String, default: "fade" },
  transitionHide: { type: String, default: "fade" },
  transitionDuration: { type: [String, Number], default: 300 },
};
function Su(e, t = () => {}, n = () => {}) {
  return {
    transitionProps: N(() => {
      const i = `q-transition--${e.transitionShow || t()}`,
        r = `q-transition--${e.transitionHide || n()}`;
      return {
        appear: !0,
        enterFromClass: `${i}-enter-from`,
        enterActiveClass: `${i}-enter-active`,
        enterToClass: `${i}-enter-to`,
        leaveFromClass: `${r}-leave-from`,
        leaveActiveClass: `${r}-leave-active`,
        leaveToClass: `${r}-leave-to`,
      };
    }),
    transitionStyle: N(
      () => `--q-transition-duration: ${e.transitionDuration}ms`
    ),
  };
}
let Zt = [],
  fn = [];
function So(e) {
  fn = fn.filter((t) => t !== e);
}
function Bu(e) {
  So(e), fn.push(e);
}
function as(e) {
  So(e), fn.length === 0 && Zt.length !== 0 && (Zt[Zt.length - 1](), (Zt = []));
}
function Iu(e) {
  fn.length === 0 ? e() : Zt.push(e);
}
let _u = 1,
  Fu = document.body;
function Tu(e, t) {
  const n = document.createElement("div");
  if (
    ((n.id = t !== void 0 ? `q-portal--${t}--${_u++}` : e),
    qn.globalNodes !== void 0)
  ) {
    const i = qn.globalNodes.class;
    i !== void 0 && (n.className = i);
  }
  return Fu.appendChild(n), n;
}
function Qu(e) {
  e.remove();
}
const In = [];
function Lu(e) {
  return In.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function Ju(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if ((e.hide(t), e.$props.separateClosePopup === !0)) return Bn(e);
    } else if (e.__qPortal === !0) {
      const n = Bn(e);
      return n !== void 0 && n.$options.name === "QPopupProxy"
        ? (e.hide(t), n)
        : e;
    }
    e = Bn(e);
  } while (e != null);
}
function Uu(e, t, n) {
  for (; n !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if ((n--, e.$options.name === "QMenu")) {
        e = Ju(e, t);
        continue;
      }
      e.hide(t);
    }
    e = Bn(e);
  }
}
function qu(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function Mu(e, t, n, i) {
  const r = he(!1),
    s = he(!1);
  let o = null;
  const l = {},
    a = i === "dialog" && qu(e);
  function u(g) {
    if (g === !0) {
      as(l), (s.value = !0);
      return;
    }
    (s.value = !1),
      r.value === !1 &&
        (a === !1 && o === null && (o = Tu(!1, i)),
        (r.value = !0),
        In.push(e.proxy),
        Bu(l));
  }
  function d(g) {
    if (((s.value = !1), g !== !0)) return;
    as(l), (r.value = !1);
    const h = In.indexOf(e.proxy);
    h !== -1 && In.splice(h, 1), o !== null && (Qu(o), (o = null));
  }
  return (
    $i(() => {
      d(!0);
    }),
    (e.proxy.__qPortal = !0),
    Gn(e.proxy, "contentEl", () => t.value),
    {
      showPortal: u,
      hidePortal: d,
      portalIsActive: r,
      portalIsAccessible: s,
      renderPortal: () =>
        a === !0 ? n() : r.value === !0 ? [G(ya, { to: o }, n())] : void 0,
    }
  );
}
function Pu(e) {
  return e === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : e.scrollTop;
}
function Ou(e) {
  return e === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : e.scrollLeft;
}
function Ku(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE
    ? !1
    : t
    ? e.scrollHeight > e.clientHeight &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"]))
    : e.scrollWidth > e.clientWidth &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
let Ht = 0,
  gi,
  pi,
  Gt,
  mi = !1,
  cs,
  us,
  fs,
  ut = null;
function Nu(e) {
  ju(e) && ft(e);
}
function ju(e) {
  if (
    e.target === document.body ||
    e.target.classList.contains("q-layout__backdrop")
  )
    return !0;
  const t = vc(e),
    n = e.shiftKey && !e.deltaX,
    i = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    r = n || i ? e.deltaY : e.deltaX;
  for (let s = 0; s < t.length; s++) {
    const o = t[s];
    if (Ku(o, i))
      return i
        ? r < 0 && o.scrollTop === 0
          ? !0
          : r > 0 && o.scrollTop + o.clientHeight === o.scrollHeight
        : r < 0 && o.scrollLeft === 0
        ? !0
        : r > 0 && o.scrollLeft + o.clientWidth === o.scrollWidth;
  }
  return !0;
}
function ds(e) {
  e.target === document &&
    (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function En(e) {
  mi !== !0 &&
    ((mi = !0),
    requestAnimationFrame(() => {
      mi = !1;
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: i } = document.scrollingElement;
      (Gt === void 0 || t !== window.innerHeight) &&
        ((Gt = n - t), (document.scrollingElement.scrollTop = i)),
        i > Gt &&
          (document.scrollingElement.scrollTop -= Math.ceil((i - Gt) / 8));
    }));
}
function hs(e) {
  const t = document.body,
    n = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: i, overflowX: r } = window.getComputedStyle(t);
    (gi = Ou(window)),
      (pi = Pu(window)),
      (cs = t.style.left),
      (us = t.style.top),
      (fs = window.location.href),
      (t.style.left = `-${gi}px`),
      (t.style.top = `-${pi}px`),
      r !== "hidden" &&
        (r === "scroll" || t.scrollWidth > window.innerWidth) &&
        t.classList.add("q-body--force-scrollbar-x"),
      i !== "hidden" &&
        (i === "scroll" || t.scrollHeight > window.innerHeight) &&
        t.classList.add("q-body--force-scrollbar-y"),
      t.classList.add("q-body--prevent-scroll"),
      (document.qScrollPrevented = !0),
      ue.is.ios === !0 &&
        (n === !0
          ? (window.scrollTo(0, 0),
            window.visualViewport.addEventListener(
              "resize",
              En,
              Se.passiveCapture
            ),
            window.visualViewport.addEventListener(
              "scroll",
              En,
              Se.passiveCapture
            ),
            window.scrollTo(0, 0))
          : window.addEventListener("scroll", ds, Se.passiveCapture));
  }
  ue.is.desktop === !0 &&
    ue.is.mac === !0 &&
    window[`${e}EventListener`]("wheel", Nu, Se.notPassive),
    e === "remove" &&
      (ue.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener(
              "resize",
              En,
              Se.passiveCapture
            ),
            window.visualViewport.removeEventListener(
              "scroll",
              En,
              Se.passiveCapture
            ))
          : window.removeEventListener("scroll", ds, Se.passiveCapture)),
      t.classList.remove("q-body--prevent-scroll"),
      t.classList.remove("q-body--force-scrollbar-x"),
      t.classList.remove("q-body--force-scrollbar-y"),
      (document.qScrollPrevented = !1),
      (t.style.left = cs),
      (t.style.top = us),
      window.location.href === fs && window.scrollTo(gi, pi),
      (Gt = void 0));
}
function Du(e) {
  let t = "add";
  if (e === !0) {
    if ((Ht++, ut !== null)) {
      clearTimeout(ut), (ut = null);
      return;
    }
    if (Ht > 1) return;
  } else {
    if (Ht === 0 || (Ht--, Ht > 0)) return;
    if (((t = "remove"), ue.is.ios === !0 && ue.is.nativeMobile === !0)) {
      ut !== null && clearTimeout(ut),
        (ut = setTimeout(() => {
          hs(t), (ut = null);
        }, 100));
      return;
    }
  }
  hs(t);
}
function Hu() {
  let e;
  return {
    preventBodyScroll(t) {
      t !== e && (e !== void 0 || t === !0) && ((e = t), Du(t));
    },
  };
}
const At = [];
let Mt;
function Vu(e) {
  Mt = e.keyCode === 27;
}
function Yu() {
  Mt === !0 && (Mt = !1);
}
function Wu(e) {
  Mt === !0 && ((Mt = !1), un(e, 27) === !0 && At[At.length - 1](e));
}
function Bo(e) {
  window[e]("keydown", Vu),
    window[e]("blur", Yu),
    window[e]("keyup", Wu),
    (Mt = !1);
}
function zu(e) {
  ue.is.desktop === !0 &&
    (At.push(e), At.length === 1 && Bo("addEventListener"));
}
function gs(e) {
  const t = At.indexOf(e);
  t > -1 && (At.splice(t, 1), At.length === 0 && Bo("removeEventListener"));
}
const yt = [];
function Io(e) {
  yt[yt.length - 1](e);
}
function Zu(e) {
  ue.is.desktop === !0 &&
    (yt.push(e),
    yt.length === 1 && document.body.addEventListener("focusin", Io));
}
function ps(e) {
  const t = yt.indexOf(e);
  t > -1 &&
    (yt.splice(t, 1),
    yt.length === 0 && document.body.removeEventListener("focusin", Io));
}
let wn = 0;
const Gu = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center",
  },
  ms = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"],
  },
  Xu = kt({
    name: "QDialog",
    inheritAttrs: !1,
    props: {
      ...ku,
      ...Ru,
      transitionShow: String,
      transitionHide: String,
      persistent: Boolean,
      autoClose: Boolean,
      allowFocusOutside: Boolean,
      noEscDismiss: Boolean,
      noBackdropDismiss: Boolean,
      noRouteDismiss: Boolean,
      noRefocus: Boolean,
      noFocus: Boolean,
      noShake: Boolean,
      seamless: Boolean,
      maximized: Boolean,
      fullWidth: Boolean,
      fullHeight: Boolean,
      square: Boolean,
      position: {
        type: String,
        default: "standard",
        validator: (e) =>
          e === "standard" || ["top", "bottom", "left", "right"].includes(e),
      },
    },
    emits: [...xu, "shake", "click", "escapeKey"],
    setup(e, { slots: t, emit: n, attrs: i }) {
      const r = Ye(),
        s = he(null),
        o = he(!1),
        l = he(!1);
      let a = null,
        u = null,
        d,
        g;
      const h = N(
          () =>
            e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0
        ),
        { preventBodyScroll: A } = Hu(),
        { registerTimeout: w } = Eu(),
        { registerTick: x, removeTick: B } = wu(),
        { transitionProps: M, transitionStyle: S } = Su(
          e,
          () => ms[e.position][0],
          () => ms[e.position][1]
        ),
        {
          showPortal: K,
          hidePortal: _,
          portalIsAccessible: q,
          renderPortal: Y,
        } = Mu(r, s, ti, "dialog"),
        { hide: H } = Cu({
          showing: o,
          hideOnRouteChange: h,
          handleShow: I,
          handleHide: te,
          processOnMount: !0,
        }),
        { addToHistory: F, removeFromHistory: T } = yu(o, H, h),
        P = N(
          () =>
            `q-dialog__inner flex no-pointer-events q-dialog__inner--${
              e.maximized === !0 ? "maximized" : "minimized"
            } q-dialog__inner--${e.position} ${Gu[e.position]}` +
            (l.value === !0 ? " q-dialog__inner--animating" : "") +
            (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") +
            (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") +
            (e.square === !0 ? " q-dialog__inner--square" : "")
        ),
        L = N(() => o.value === !0 && e.seamless !== !0),
        R = N(() => (e.autoClose === !0 ? { onClick: Ne } : {})),
        W = N(() => [
          `q-dialog fullscreen no-pointer-events q-dialog--${
            L.value === !0 ? "modal" : "seamless"
          }`,
          i.class,
        ]);
      vt(
        () => e.maximized,
        (z) => {
          o.value === !0 && We(z);
        }
      ),
        vt(L, (z) => {
          A(z), z === !0 ? (Zu(xt), zu($)) : (ps(xt), gs($));
        });
      function I(z) {
        F(),
          (u =
            e.noRefocus === !1 && document.activeElement !== null
              ? document.activeElement
              : null),
          We(e.maximized),
          K(),
          (l.value = !0),
          e.noFocus !== !0
            ? (document.activeElement !== null && document.activeElement.blur(),
              x(ee))
            : B(),
          w(() => {
            if (r.proxy.$q.platform.is.ios === !0) {
              if (e.seamless !== !0 && document.activeElement) {
                const { top: re, bottom: ze } =
                    document.activeElement.getBoundingClientRect(),
                  { innerHeight: Nt } = window,
                  qe =
                    window.visualViewport !== void 0
                      ? window.visualViewport.height
                      : Nt;
                re > 0 &&
                  ze > qe / 2 &&
                  (document.scrollingElement.scrollTop = Math.min(
                    document.scrollingElement.scrollHeight - qe,
                    ze >= Nt
                      ? 1 / 0
                      : Math.ceil(
                          document.scrollingElement.scrollTop + ze - qe / 2
                        )
                  )),
                  document.activeElement.scrollIntoView();
              }
              (g = !0), s.value.click(), (g = !1);
            }
            K(!0), (l.value = !1), n("show", z);
          }, e.transitionDuration);
      }
      function te(z) {
        B(),
          T(),
          Ue(!0),
          (l.value = !0),
          _(),
          u !== null &&
            ((
              (z && z.type.indexOf("key") === 0
                ? u.closest('[tabindex]:not([tabindex^="-"])')
                : void 0) || u
            ).focus(),
            (u = null)),
          w(() => {
            _(!0), (l.value = !1), n("hide", z);
          }, e.transitionDuration);
      }
      function ee(z) {
        Iu(() => {
          let re = s.value;
          re === null ||
            re.contains(document.activeElement) === !0 ||
            ((re =
              (z !== "" ? re.querySelector(z) : null) ||
              re.querySelector(
                "[autofocus][tabindex], [data-autofocus][tabindex]"
              ) ||
              re.querySelector(
                "[autofocus] [tabindex], [data-autofocus] [tabindex]"
              ) ||
              re.querySelector("[autofocus], [data-autofocus]") ||
              re),
            re.focus({ preventScroll: !0 }));
        });
      }
      function ie(z) {
        z && typeof z.focus == "function"
          ? z.focus({ preventScroll: !0 })
          : ee(),
          n("shake");
        const re = s.value;
        re !== null &&
          (re.classList.remove("q-animate--scale"),
          re.classList.add("q-animate--scale"),
          a !== null && clearTimeout(a),
          (a = setTimeout(() => {
            (a = null),
              s.value !== null &&
                (re.classList.remove("q-animate--scale"), ee());
          }, 170)));
      }
      function $() {
        e.seamless !== !0 &&
          (e.persistent === !0 || e.noEscDismiss === !0
            ? e.maximized !== !0 && e.noShake !== !0 && ie()
            : (n("escapeKey"), H()));
      }
      function Ue(z) {
        a !== null && (clearTimeout(a), (a = null)),
          (z === !0 || o.value === !0) &&
            (We(!1), e.seamless !== !0 && (A(!1), ps(xt), gs($))),
          z !== !0 && (u = null);
      }
      function We(z) {
        z === !0
          ? d !== !0 &&
            (wn < 1 && document.body.classList.add("q-body--dialog"),
            wn++,
            (d = !0))
          : d === !0 &&
            (wn < 2 && document.body.classList.remove("q-body--dialog"),
            wn--,
            (d = !1));
      }
      function Ne(z) {
        g !== !0 && (H(z), n("click", z));
      }
      function xe(z) {
        e.persistent !== !0 && e.noBackdropDismiss !== !0
          ? H(z)
          : e.noShake !== !0 && ie();
      }
      function xt(z) {
        e.allowFocusOutside !== !0 &&
          q.value === !0 &&
          Xc(s.value, z.target) !== !0 &&
          ee('[tabindex]:not([tabindex="-1"])');
      }
      Object.assign(r.proxy, {
        focus: ee,
        shake: ie,
        __updateRefocusTarget(z) {
          u = z || null;
        },
      }),
        wt(Ue);
      function ti() {
        return G(
          "div",
          {
            role: "dialog",
            "aria-modal": L.value === !0 ? "true" : "false",
            ...i,
            class: W.value,
          },
          [
            G(an, { name: "q-transition--fade", appear: !0 }, () =>
              L.value === !0
                ? G("div", {
                    class: "q-dialog__backdrop fixed-full",
                    style: S.value,
                    "aria-hidden": "true",
                    tabindex: -1,
                    onClick: xe,
                  })
                : null
            ),
            G(an, M.value, () =>
              o.value === !0
                ? G(
                    "div",
                    {
                      ref: s,
                      class: P.value,
                      style: S.value,
                      tabindex: -1,
                      ...R.value,
                    },
                    ei(t.default)
                  )
                : null
            ),
          ]
        );
      }
      return Y;
    },
  });
function vs(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
const $u = bo({
    name: "close-popup",
    beforeMount(e, { value: t }) {
      const n = {
        depth: vs(t),
        handler(i) {
          n.depth !== 0 &&
            setTimeout(() => {
              const r = Lu(e);
              r !== void 0 && Uu(r, i, n.depth);
            });
        },
        handlerKey(i) {
          un(i, 13) === !0 && n.handler(i);
        },
      };
      (e.__qclosepopup = n),
        e.addEventListener("click", n.handler),
        e.addEventListener("keyup", n.handlerKey);
    },
    updated(e, { value: t, oldValue: n }) {
      t !== n && (e.__qclosepopup.depth = vs(t));
    },
    beforeUnmount(e) {
      const t = e.__qclosepopup;
      e.removeEventListener("click", t.handler),
        e.removeEventListener("keyup", t.handlerKey),
        delete e.__qclosepopup;
    },
  }),
  ef =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAADbCAYAAADjwTpVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKNSURBVHhe7d0xEoIwEEBR4v3vjBRpsNQ4fPG9hhzgzzabDGM/bBDxmF9IECQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBknL59bMxxjzxibvcIjQhSREkKYIkRZCkCJIUQZIiSFIESYogSREkKT+zOrzLauzVqtWp1SF8gSBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQp/gZ7MW9qzkxIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkKQIkhRBkiJIUsZ+mOe3jTHmiX+zIJ8TE5IUQZIiSFIESYogSREkKYIkRZCkCJIUQZIiSFIESYogSREkKYIkZcl9SFjFhCRFkKQIkhRBkiJIUgRJiiBJESQpgiRFkIRs2xMuJiiZQVWQTwAAAABJRU5ErkJggg==",
  tf =
    "data:image/png;base64,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",
  nf =
    "data:image/png;base64,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",
  rf =
    "data:image/png;base64,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",
  sf =
    "data:image/png;base64,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",
  of =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAADRCAYAAABhAUjmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAxBSURBVHhe7Z3Xa1RbFIdXrLHHEnsj9oZgx66IIipGBRUkvojogyAKiv+DvviioFhQRBQk+OCDIvYaO9gLWGPXWElsc+e375zLkJs5zsw5M7P3yu+DYTInM2dmcr6zXGvtvY95kShCiDLqxO4JUQXFJiqh2EQlFJuohGITlVBsohKKTVRCsYlKKDZRCcUmKqHYRCUUm6jEqUlQeXl5sZ9IEGrDvDdGbKISik1UQrGJSig2UQnFJiqh2EQlFJuohGITlVBsohKKTVSickhd65BxWFMKOKROiKNQbKISik1UQrGJSig2UQnFJiqh2EQlFJuohGITlVBsohKKTVRCsYlKKDZRCcUmKqHYRCUUm6hEpdhfv36N/URqK86InYqs+/fvl+vXr8uHDx9iW0htw/qlYZDz6dOncvToUVmzZk1sqz+9evWSvn37ypgxY2TixIkyYMAAadq0aey37sKlYcljtdg3b96UI0eOyMmTJ+XGjRtSXl4uw4cPlzp16sirV6/k5cuX8u3bN2nSpIl06NBB2rdvL3/+/JELFy5I3bp1pXXr1jJixAiZPn26TJ06VYqKimJ7dhOKnTzWin3lyhXZuXOnHDx4UF6/fi2jR482or979y72DDHyQnIccHyN379/G7HbtGljovSpU6ckPz9funXrJrNmzZIFCxbI0KFDY692D4qdPFaKffv2bdmyZYvJlVu0aGHkxTaAgwuhsR0RuGPHjub3FRUV8ujRI3MS/Pz50wjev39/c3///n1p166dzJgxQ5YsWSKjRo0y+3INip081on97Nkz2bp1q+zatctE3rt375p0A/LWr19f2rZtKwMHDpSxY8eaKI70A5H648ePJsqfPXtWrl69Ki9evJCqqipp3Lix9OnTR65du2ZSk/nz58uKFSukX79+sXd0B4qdPFaJ/f37d9mzZ49s3LjRRFoUjZAaERoRd+TIkaYYRFHYs2dPE7Xj+fTpkzx//tzk5MeOHZNz587JmzdvTDrSpUsXuXfvnnTv3l1WrVolixcv/t/rbYdipwDEtoVLly5FiouLI1ERI9E0An/9SDRSR7p27RpZuXJlpKysLBJNOWLPTkz0ZDD7Wr16dSQqciR6Yvy3v4YNG5r3uHz5cuzZ7oDPH8atNmBNHxvRFpE2KpzJgZFTI0K1atVKZs6cKUuXLjUdkWSiLNKPYcOGybJly2TevHkmXUFKM2HCBJN/Iy05c+aMeU+iE2vEfvjwoZHt7du3pvsBGjRoYNKPhQsXmi5HqvTu3VsWLVpkUhfs69atWybFQasQuTjSFqITK8RG5IymDqZXjUiLlh6KReTF6EEHadFhsGbSpEnSqVMnM9iDghNRGyOTFy9eNHk90YcVYmO4HKkHIqlXIEVzYROtJ0+ebFKLdMGII1IbtP68vjeiNgZ3kJ6gm0L0YYXY6EEjBUHbDnJDPowkIroiagclWnyadATtPvS5AaI2OibouhB9WCE2IilEixazJpJCbMg4ZMiQUOZ4oADF0DpybsgM8C8DIjfek+jDCrERqSE3ZPMGYyBjs2bNYs8IDkYo0R2prKyMbTF9r9hPRBtWiI0RRU9sTGjCfb169cz2sPAitJevQ2qcUNhO9GGF2JDMExu5NR6jU4LcOywwMxD5dWFhoXnsiY0UiOjDCrEBIjRAuvDr1y958OCBaQGG0Y7DSYL5I5gkhbkmAGIj5cEJRfRhhdhIDzCiCMmQLuCGCIvFBd6sviBg8Of06dPy/v17s2+AdiJOoiCtRGIvVojdvHlz07FAO+78+fNmVh9m5mF4HcPsQYa+8VqMaGIYHScPJkYhUqOYxCxBvBfRhxViQzi049DeQyTF8DlSBfS2MUsPaUS6YC72iRMnTH/cm6qK98C8E/TJGbF1Yk2OjZHBKVOmSOfOnU3agMc/fvwww95YSYPlXqmCNAbTYLEPTHNF9PeiNeZzhzH4Q+zEGrEROTF8jmF0RFSvNYf5HYcOHZLNmzfL8ePHk0pLUHBiWdimTZuktLTUDNmjAwJQpOKkwTC7hgW+pGasERsggmLRLSYuoeDDypd4uTds2CDbtm0zuXdN3RIIfOfOHdmxY4esX79e9u3bZ16L/WFeCKI1FixgUhRGNolerFwatn37dtm9e7c8fvzYSAkhISymnqIPjRmASFtw37JlS9OL/vLli5mxh0IRqQf2g/QDkTpe6rlz58ry5ctN4egaYQ0mWXbIM4KVi3lR8CGvxmLeJ0+emL42FglgPjVadkhVkCdDehSe+L13/RHMNcFQPApF5NQAbUTk7sXFxVJSUuLsSnWKnTxWig0g9969e+XAgQMmLUH7D3k3OhmIvhhFRNcEKQnSFQy8ICIjQqOlByACToIePXqYSI3LL6SzYMEWKHbyWCs2QDqBVt3hw4dNeoEVLxD8bx8Z4mOeiZe24LIL06ZNc74LQrGTx2qxAQpCCI5+NkYi0dNGOoL0A+Dje18BBx5dD0TuwYMHy7hx42T8+PGmC6KhX02xk8d6sT2QcqAvXVZWZtIUDLjgMfJqyIy8GpdWQG49aNAgM+BT0yUaXIZiJ48zYnugj/3582czQWrt2rVmYhOKQ8g9e/ZsWbdunblClCahPSh28ljVx04GCItcGdEZc0wgNQpEgPQE7T+NUpPUcE5sj4KCAtPCw1WekIagx41I5M3eI7UbZ8X2Oh/eUDmiNeaWeI9J7cZZsRGdvVwR6QgkR9SG8IQ4a4GXcnjrIr0lXhSbgMAWoFKvfssGEBuph3fZBtyy9f7x3zUb70dSJ5DYiQ5qNg440g+kHojYeC/cZ6p49L5Pou9V0zaSWzL677afDEFByoH9ImKjYAy7eMzkZyeZJ2sJadiiZKJ4DPszktwRSGxPrFQJQ6CwiscwPku6fweSOQJHbC9yBpU8VdItHr3nJPPcvxHke5PMEmoq4h3odA52qsKlWjwmu18/4r9fOt+RZI9QxY4n6MH/m4h/Kx691/9tP37ESxzku5DskzGxPYLKkUjO+P15xSMW/OLCO+mK7JHuZyX2kHGxqxNEmnjJvZQDlwXG5dAwlTUI3uei0DrI+XzsoNE1XVwUOKy/VW04ea1baJBp0V0+qBQ7eaxdQcOD+H/4N0merOfYyYI/fvwtWXCphnReR3RhrdjVSVZUTlslwDkL/ATHRXEynaMTN3A2vGF1+pw5c8x6R1zuDPcQPhPTVol7OCt2pqetErdxVuz4lIRrHkl1nLUgrGmrRCdOi52rNY/EfpwVO5trHol7OCs2i0fih7Nis3gkfjidYwMWj6QmnBabxSNJhLNis3gkfjgrNotH4oezYrN4JH44nWMDFo+kJpwWm8UjSYSzYrN4JH44KzaLR+KHs2KzeCR+OJ1jAxaPpCacFpvFI0mEs2KzeCR+OCs2i0fih7Nis3gkfjidYwMWj6QmnBabxSNJhLNis3gkfjgrNotH4oezYrN4JH44nWMDFo+kJpwWm8UjSYSzYrN4JH44KzaLR+KHs2KzeCR+OJ1jAxaPpCacFpvFI0mEs2KzeCR+OCs2i0fih7NixxePXsRm8Ug8nLWgqKhISktLpbKy0tyqqqrMdopNgJMWVC8QKyoqjNCFhYWSn58f20pqM86JnajrUVJSYv4D04KCgtgWUpvJi+ap/yaqDpBIalBeXm6kbtSoUWyLPvy+fyo4dMjTxhmx/Q5qbThQgGInjxOpCKUmqWK92JSapIPVYlNqki7Wik2pSRCsFJtSk6BYJzalJmFgldiUmoSFNWJTahImVohNqUnY5FxsSk0yQU7FptQkU+RMbEpNMklOxKbUJNNkXWxKTbJBVsWm1CRbZE1sSk2ySVbEptQk22RcbEpNckFGxabUJFdkTGxKTXJJRsSm1CTXhC42pSY2EKrYlJrYQmhiU2piE6GITamJbQQWm1ITGwkkNqUmthJq8ehBqUmuCV1sSk1sIJDY1SWm1MQWAkdsyOzdCLGFjOTYhOQaik1UQrGJSig2UQnFJiqh2EQlFJuohGITlVBsohKKTVRCsYlKKDZRCcUmKqHYRCUUm6iEYhOVUGyiEopNVEKxiUooNlEJxSYqodhEJXmRLF83we+yaEQ32VSNEZuohGITlVBsohKKTVRCsYlKKDZRCcUmKqHYRCUUm6iEYhOVUGyiEopNVEKxiUooNlEJxSYqyfp8bEKyASM2UQnFJgoR+QfDSyS1TrR81AAAAABJRU5ErkJggg==",
  lf =
    "data:image/png;base64,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",
  af = "./assets/colores-3f429678.png",
  cf = "./assets/animales-c8270de4.png",
  uf = "./assets/frutas-b8e02f22.png",
  ff = "./assets/nombres-70af92f5.png";
const df = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [i, r] of t) n[i] = r;
    return n;
  },
  hf = { class: "body1" },
  gf = { key: 0, class: "" },
  pf = { class: "div1" },
  mf = Ra(
    '<div class="sub1" data-v-8802d747><span class="titulo" data-v-8802d747>E</span> <span class="titulo" data-v-8802d747>L</span><span class="titulo" data-v-8802d747></span> <span class="titulo" data-v-8802d747>A</span><span class="titulo" data-v-8802d747>H</span> <span class="titulo" data-v-8802d747>O</span><span class="titulo" data-v-8802d747>R</span> <span class="titulo" data-v-8802d747>C</span><span class="titulo" data-v-8802d747>A</span> <span class="titulo" data-v-8802d747>D</span><span class="titulo" data-v-8802d747>O</span></div>',
    1
  ),
  vf = { class: "q-pa-md q-gutter-sm" },
  bf = { class: "text-h6" },
  Af = ["onClick"],
  yf = ["src"],
  Ef = ["onClick"],
  wf = { key: 1 },
  kf = { class: "contenedor" },
  xf = ["onClick"],
  Cf = { class: "cuadros" },
  Rf = { class: "cambiar" },
  Sf = ["src"],
  Bf = {
    __name: "App",
    setup(e) {
      const t = he(!0),
        n = [
          "A",
          "B",
          "C",
          "D",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "Ñ",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ],
        i = {
          colores: {
            Facil: ["Rojo", "Verde", "Azul", "Amarillo", "Blanco"],
            Medio: ["Naranja", "Morado", "Gris", "Rosa", "Negro"],
            Dificil: ["Turquesa", "Magenta", "Cian", "Dorado", "Plateado"],
          },
          frutas: {
            Facil: ["Manzana", "Banana", "Fresa", "Naranja", "Pera"],
            Medio: ["Uva", "Kiwi", "Mango", "Cereza", "Sandía"],
            Dificil: ["Granada", "Pitahaya", "Lichi", "Maracuyá", "Carambola"],
          },
          animales: {
            Facil: ["Perro", "Gato", "Pato", "Conejo", "Tigre"],
            Medio: ["León", "Elefante", "Jirafa", "Cocodrilo", "Hipopótamo"],
            Dificil: ["Oricteropo", "Axolote", "Quokka", "Narval", "Pangolín"],
          },
          nombres: {
            Facil: ["Juan", "Ana", "Carlos", "Luis", "Sofía"],
            Medio: ["Eduardo", "Valentina", "Gabriel", "Isabella", "Mateo"],
            Dificil: [
              "Sebastián",
              "Constanza",
              "Benjamín",
              "Valeria",
              "Leonardo",
            ],
          },
        },
        r = he([]),
        s = he([]),
        o = [ef, tf, nf, rf, sf, of, lf],
        l = he(0),
        a = { Facil: 5, Medio: 3, Dificil: 2 },
        u = he(0),
        d = he(!0),
        g = he({ categorias: "colores", dificultad: "Facil" }),
        h = () => Math.floor(Math.random() * 3),
        A = () => {
          console.log(g.value);
          const T = i[g.value.categorias][g.value.dificultad][h()],
            P = Array.from(T);
          r.value.length > 0 && (r.value = []);
          for (const L of P) r.value.push(L);
        },
        w = (T) => {
          if (r.value.includes(T.toLowerCase())) {
            if (
              (console.log(
                s.value.includes(T),
                "data",
                g.value.dificultad !== "dificil"
              ),
              s.value.includes(T) && g.value.dificultad === "Dificil")
            ) {
              l.value += a[g.value.dificultad];
              return;
            }
            s.value.push(T),
              g.value.dificultad !== "Dificil" &&
                event.target.setAttribute("disabled", "true");
            return;
          }
          (l.value += a[g.value.dificultad]),
            g.value.dificultad !== "Dificil" &&
              event.target.setAttribute("disabled", "true");
        },
        x = N(
          () => (T) =>
            s.value.find((L) => String(L) === String(T.toUpperCase())) ? T : ""
        ),
        B = N(() => {
          let T = !1;
          for (const P of r.value) {
            if (!s.value.includes(P.toUpperCase())) {
              T = !1;
              break;
            }
            T = !0;
          }
          return T === !0 ? "ganaste" : "perdiste";
        }),
        M = (T) => {
          (T === "ganaste" || l.value >= 9) && (S.value = !0);
        },
        S = he(!1),
        K = [
          { nombre: "colores", imagen: af },
          { nombre: "frutas", imagen: uf },
          { nombre: "animales", imagen: cf },
          { nombre: "nombres", imagen: ff },
        ],
        _ = ["Facil", "Medio", "Dificil"],
        q = () => {
          g.value = { categorias: "", dificultad: "" };
        };
      he([]);
      const Y = he(!1),
        H = async (T) => {
          (s.value = [""]),
            (S.value = !1),
            (t.value = !0),
            (d.value = !1),
            (l.value = 0),
            (g.value.dificultad = T),
            (Y.value = !0),
            A();
        };
      Yn(() => {});
      const F = (T) => {
        (g.value.categorias = T), (t.value = !1);
      };
      return (T, P) => (
        Ge(),
        Xe("div", hf, [
          d.value === !0
            ? (Ge(),
              Xe("div", gf, [
                de("div", pf, [
                  mf,
                  de(
                    "button",
                    {
                      class: "iniciar",
                      onClick:
                        P[0] ||
                        (P[0] = (L) => {
                          (S.value = !0), q();
                        }),
                    },
                    " jugar "
                  ),
                  de("div", vf, [
                    ge(
                      Xu,
                      {
                        modelValue: S.value,
                        "onUpdate:modelValue":
                          P[1] || (P[1] = (L) => (S.value = L)),
                      },
                      {
                        default: Yt(() => [
                          ge(Au, null, {
                            default: Yt(() => [
                              ge(
                                ls,
                                { class: "row items-center q-pb-none" },
                                {
                                  default: Yt(() => [
                                    de(
                                      "div",
                                      bf,
                                      Rt(
                                        g.value.categorias === ""
                                          ? "Elije la categoría"
                                          : "Elije la dificultad"
                                      ),
                                      1
                                    ),
                                    ge(Oc),
                                    Ws(
                                      ge(
                                        mu,
                                        {
                                          icon: "X",
                                          flat: "",
                                          round: "",
                                          dense: "",
                                        },
                                        null,
                                        512
                                      ),
                                      [[$u]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                              ge(
                                ls,
                                { class: "row" },
                                {
                                  default: Yt(() => [
                                    t.value
                                      ? (Ge(),
                                        Xe(
                                          Ee,
                                          { key: 0 },
                                          An(K, (L, R) =>
                                            de(
                                              "div",
                                              {
                                                key: R,
                                                class: "cardCategoria",
                                                onClick: (W) => F(L.nombre),
                                              },
                                              [
                                                de(
                                                  "img",
                                                  {
                                                    src: L.imagen,
                                                    alt: "",
                                                    class: "imgsCategoria",
                                                  },
                                                  null,
                                                  8,
                                                  yf
                                                ),
                                                de("h4", null, Rt(L.nombre), 1),
                                              ],
                                              8,
                                              Af
                                            )
                                          ),
                                          64
                                        ))
                                      : (Ge(),
                                        Xe(
                                          Ee,
                                          { key: 1 },
                                          An(_, (L, R) =>
                                            de(
                                              "button",
                                              { key: R, onClick: (W) => H(L) },
                                              Rt(L),
                                              9,
                                              Ef
                                            )
                                          ),
                                          64
                                        )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"]
                    ),
                  ]),
                ]),
              ]))
            : (Ge(),
              Xe("div", wf, [
                de("div", kf, [
                  (Ge(),
                  Xe(
                    Ee,
                    null,
                    An(n, (L, R) =>
                      de(
                        "button",
                        { key: R, onClick: (W) => w(L), class: "palabras" },
                        Rt(L),
                        9,
                        xf
                      )
                    ),
                    64
                  )),
                  (Ge(!0),
                  Xe(
                    Ee,
                    null,
                    An(
                      r.value.value,
                      (L) => (
                        Ge(), Xe("div", Cf, [de("p", Rf, Rt(x.value(L)), 1)])
                      )
                    ),
                    256
                  )),
                ]),
                de("div", null, [
                  de("img", { src: o[u.value], alt: "" }, null, 8, Sf),
                  de(
                    "button",
                    { onClick: P[2] || (P[2] = (L) => M(B.value)) },
                    "volver"
                  ),
                ]),
                de("div", null, [de("h1", null, "Estado: " + Rt(B.value), 1)]),
              ])),
        ])
      );
    },
  },
  If = df(Bf, [["__scopeId", "data-v-8802d747"]]),
  _o = cc(If);
_o.use(Mc, { plugins: {} });
_o.mount("#app");
