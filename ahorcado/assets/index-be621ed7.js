(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const r of s.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function i(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function Ri(e, t) {
  const n = Object.create(null),
    i = e.split(",");
  for (let o = 0; o < i.length; o++) n[i[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const re = {},
  At = [],
  qe = () => {},
  Or = () => !1,
  Fr = /^on[^a-z]/,
  In = (e) => Fr.test(e),
  Bi = (e) => e.startsWith("onUpdate:"),
  fe = Object.assign,
  Ii = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  $r = Object.prototype.hasOwnProperty,
  J = (e, t) => $r.call(e, t),
  D = Array.isArray,
  Mt = (e) => Nn(e) === "[object Map]",
  ys = (e) => Nn(e) === "[object Set]",
  K = (e) => typeof e == "function",
  ae = (e) => typeof e == "string",
  Ni = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  ws = (e) => le(e) && K(e.then) && K(e.catch),
  xs = Object.prototype.toString,
  Nn = (e) => xs.call(e),
  qr = (e) => Nn(e).slice(8, -1),
  Cs = (e) => Nn(e) === "[object Object]",
  Di = (e) =>
    ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Cn = Ri(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Dn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Rr = /-(\w)/g,
  $t = Dn((e) => e.replace(Rr, (t, n) => (n ? n.toUpperCase() : ""))),
  Br = /\B([A-Z])/g,
  It = Dn((e) => e.replace(Br, "-$1").toLowerCase()),
  Es = Dn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ii = Dn((e) => (e ? `on${Es(e)}` : "")),
  tn = (e, t) => !Object.is(e, t),
  oi = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  An = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Ir = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Nr = (e) => {
    const t = ae(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let co;
const mi = () =>
  co ||
  (co =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function ji(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n],
        o = ae(i) ? zr(i) : ji(i);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else {
    if (ae(e)) return e;
    if (le(e)) return e;
  }
}
const Dr = /;(?![^(]*\))/g,
  jr = /:([^]+)/,
  Hr = /\/\*[^]*?\*\//g;
function zr(e) {
  const t = {};
  return (
    e
      .replace(Hr, "")
      .split(Dr)
      .forEach((n) => {
        if (n) {
          const i = n.split(jr);
          i.length > 1 && (t[i[0].trim()] = i[1].trim());
        }
      }),
    t
  );
}
function Hi(e) {
  let t = "";
  if (ae(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const i = Hi(e[n]);
      i && (t += i + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Kr =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ur = Ri(Kr);
function Ts(e) {
  return !!e || e === "";
}
const zt = (e) =>
    ae(e)
      ? e
      : e == null
      ? ""
      : D(e) || (le(e) && (e.toString === xs || !K(e.toString)))
      ? JSON.stringify(e, ks, 2)
      : String(e),
  ks = (e, t) =>
    t && t.__v_isRef
      ? ks(e, t.value)
      : Mt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [i, o]) => ((n[`${i} =>`] = o), n),
            {}
          ),
        }
      : ys(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : le(t) && !D(t) && !Cs(t)
      ? String(t)
      : t;
let Me;
class Wr {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Me),
      !t && Me && (this.index = (Me.scopes || (Me.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Me;
      try {
        return (Me = this), t();
      } finally {
        Me = n;
      }
    }
  }
  on() {
    Me = this;
  }
  off() {
    Me = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, i = this.scopes.length; n < i; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Vr(e, t = Me) {
  t && t.active && t.effects.push(e);
}
function Qr() {
  return Me;
}
const zi = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Ss = (e) => (e.w & ot) > 0,
  Ps = (e) => (e.n & ot) > 0,
  Yr = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ot;
  },
  Jr = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let i = 0; i < t.length; i++) {
        const o = t[i];
        Ss(o) && !Ps(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~ot),
          (o.n &= ~ot);
      }
      t.length = n;
    }
  },
  vi = new WeakMap();
let Wt = 0,
  ot = 1;
const bi = 30;
let Fe;
const mt = Symbol(""),
  _i = Symbol("");
class Ki {
  constructor(t, n = null, i) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Vr(this, i);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Fe,
      n = nt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Fe),
        (Fe = this),
        (nt = !0),
        (ot = 1 << ++Wt),
        Wt <= bi ? Yr(this) : uo(this),
        this.fn()
      );
    } finally {
      Wt <= bi && Jr(this),
        (ot = 1 << --Wt),
        (Fe = this.parent),
        (nt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Fe === this
      ? (this.deferStop = !0)
      : this.active &&
        (uo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function uo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let nt = !0;
const Ls = [];
function Nt() {
  Ls.push(nt), (nt = !1);
}
function Dt() {
  const e = Ls.pop();
  nt = e === void 0 ? !0 : e;
}
function xe(e, t, n) {
  if (nt && Fe) {
    let i = vi.get(e);
    i || vi.set(e, (i = new Map()));
    let o = i.get(n);
    o || i.set(n, (o = zi())), As(o);
  }
}
function As(e, t) {
  let n = !1;
  Wt <= bi ? Ps(e) || ((e.n |= ot), (n = !Ss(e))) : (n = !e.has(Fe)),
    n && (e.add(Fe), Fe.deps.push(e));
}
function Ue(e, t, n, i, o, s) {
  const r = vi.get(e);
  if (!r) return;
  let l = [];
  if (t === "clear") l = [...r.values()];
  else if (n === "length" && D(e)) {
    const a = Number(i);
    r.forEach((u, d) => {
      (d === "length" || d >= a) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(r.get(n)), t)) {
      case "add":
        D(e)
          ? Di(n) && l.push(r.get("length"))
          : (l.push(r.get(mt)), Mt(e) && l.push(r.get(_i)));
        break;
      case "delete":
        D(e) || (l.push(r.get(mt)), Mt(e) && l.push(r.get(_i)));
        break;
      case "set":
        Mt(e) && l.push(r.get(mt));
        break;
    }
  if (l.length === 1) l[0] && yi(l[0]);
  else {
    const a = [];
    for (const u of l) u && a.push(...u);
    yi(zi(a));
  }
}
function yi(e, t) {
  const n = D(e) ? e : [...e];
  for (const i of n) i.computed && fo(i);
  for (const i of n) i.computed || fo(i);
}
function fo(e, t) {
  (e !== Fe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Xr = Ri("__proto__,__v_isRef,__isVue"),
  Ms = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ni)
  ),
  Zr = Ui(),
  Gr = Ui(!1, !0),
  el = Ui(!0),
  ho = tl();
function tl() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const i = Z(this);
        for (let s = 0, r = this.length; s < r; s++) xe(i, "get", s + "");
        const o = i[t](...n);
        return o === -1 || o === !1 ? i[t](...n.map(Z)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Nt();
        const i = Z(this)[t].apply(this, n);
        return Dt(), i;
      };
    }),
    e
  );
}
function nl(e) {
  const t = Z(this);
  return xe(t, "has", e), t.hasOwnProperty(e);
}
function Ui(e = !1, t = !1) {
  return function (i, o, s) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && s === (e ? (t ? bl : Rs) : t ? qs : $s).get(i))
      return i;
    const r = D(i);
    if (!e) {
      if (r && J(ho, o)) return Reflect.get(ho, o, s);
      if (o === "hasOwnProperty") return nl;
    }
    const l = Reflect.get(i, o, s);
    return (Ni(o) ? Ms.has(o) : Xr(o)) || (e || xe(i, "get", o), t)
      ? l
      : be(l)
      ? r && Di(o)
        ? l
        : l.value
      : le(l)
      ? e
        ? Bs(l)
        : dn(l)
      : l;
  };
}
const il = Os(),
  ol = Os(!0);
function Os(e = !1) {
  return function (n, i, o, s) {
    let r = n[i];
    if (qt(r) && be(r) && !be(o)) return !1;
    if (
      !e &&
      (!Mn(o) && !qt(o) && ((r = Z(r)), (o = Z(o))), !D(n) && be(r) && !be(o))
    )
      return (r.value = o), !0;
    const l = D(n) && Di(i) ? Number(i) < n.length : J(n, i),
      a = Reflect.set(n, i, o, s);
    return (
      n === Z(s) && (l ? tn(o, r) && Ue(n, "set", i, o) : Ue(n, "add", i, o)), a
    );
  };
}
function sl(e, t) {
  const n = J(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && n && Ue(e, "delete", t, void 0), i;
}
function rl(e, t) {
  const n = Reflect.has(e, t);
  return (!Ni(t) || !Ms.has(t)) && xe(e, "has", t), n;
}
function ll(e) {
  return xe(e, "iterate", D(e) ? "length" : mt), Reflect.ownKeys(e);
}
const Fs = { get: Zr, set: il, deleteProperty: sl, has: rl, ownKeys: ll },
  al = {
    get: el,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  cl = fe({}, Fs, { get: Gr, set: ol }),
  Wi = (e) => e,
  jn = (e) => Reflect.getPrototypeOf(e);
function hn(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const o = Z(e),
    s = Z(t);
  n || (t !== s && xe(o, "get", t), xe(o, "get", s));
  const { has: r } = jn(o),
    l = i ? Wi : n ? Yi : nn;
  if (r.call(o, t)) return l(e.get(t));
  if (r.call(o, s)) return l(e.get(s));
  e !== o && e.get(t);
}
function pn(e, t = !1) {
  const n = this.__v_raw,
    i = Z(n),
    o = Z(e);
  return (
    t || (e !== o && xe(i, "has", e), xe(i, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function gn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && xe(Z(e), "iterate", mt), Reflect.get(e, "size", e)
  );
}
function po(e) {
  e = Z(e);
  const t = Z(this);
  return jn(t).has.call(t, e) || (t.add(e), Ue(t, "add", e, e)), this;
}
function go(e, t) {
  t = Z(t);
  const n = Z(this),
    { has: i, get: o } = jn(n);
  let s = i.call(n, e);
  s || ((e = Z(e)), (s = i.call(n, e)));
  const r = o.call(n, e);
  return (
    n.set(e, t), s ? tn(t, r) && Ue(n, "set", e, t) : Ue(n, "add", e, t), this
  );
}
function mo(e) {
  const t = Z(this),
    { has: n, get: i } = jn(t);
  let o = n.call(t, e);
  o || ((e = Z(e)), (o = n.call(t, e))), i && i.call(t, e);
  const s = t.delete(e);
  return o && Ue(t, "delete", e, void 0), s;
}
function vo() {
  const e = Z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ue(e, "clear", void 0, void 0), n;
}
function mn(e, t) {
  return function (i, o) {
    const s = this,
      r = s.__v_raw,
      l = Z(r),
      a = t ? Wi : e ? Yi : nn;
    return (
      !e && xe(l, "iterate", mt), r.forEach((u, d) => i.call(o, a(u), a(d), s))
    );
  };
}
function vn(e, t, n) {
  return function (...i) {
    const o = this.__v_raw,
      s = Z(o),
      r = Mt(s),
      l = e === "entries" || (e === Symbol.iterator && r),
      a = e === "keys" && r,
      u = o[e](...i),
      d = n ? Wi : t ? Yi : nn;
    return (
      !t && xe(s, "iterate", a ? _i : mt),
      {
        next() {
          const { value: p, done: h } = u.next();
          return h
            ? { value: p, done: h }
            : { value: l ? [d(p[0]), d(p[1])] : d(p), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Je(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ul() {
  const e = {
      get(s) {
        return hn(this, s);
      },
      get size() {
        return gn(this);
      },
      has: pn,
      add: po,
      set: go,
      delete: mo,
      clear: vo,
      forEach: mn(!1, !1),
    },
    t = {
      get(s) {
        return hn(this, s, !1, !0);
      },
      get size() {
        return gn(this);
      },
      has: pn,
      add: po,
      set: go,
      delete: mo,
      clear: vo,
      forEach: mn(!1, !0),
    },
    n = {
      get(s) {
        return hn(this, s, !0);
      },
      get size() {
        return gn(this, !0);
      },
      has(s) {
        return pn.call(this, s, !0);
      },
      add: Je("add"),
      set: Je("set"),
      delete: Je("delete"),
      clear: Je("clear"),
      forEach: mn(!0, !1),
    },
    i = {
      get(s) {
        return hn(this, s, !0, !0);
      },
      get size() {
        return gn(this, !0);
      },
      has(s) {
        return pn.call(this, s, !0);
      },
      add: Je("add"),
      set: Je("set"),
      delete: Je("delete"),
      clear: Je("clear"),
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
const [fl, dl, hl, pl] = ul();
function Vi(e, t) {
  const n = t ? (e ? pl : hl) : e ? dl : fl;
  return (i, o, s) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? i
      : Reflect.get(J(n, o) && o in i ? n : i, o, s);
}
const gl = { get: Vi(!1, !1) },
  ml = { get: Vi(!1, !0) },
  vl = { get: Vi(!0, !1) },
  $s = new WeakMap(),
  qs = new WeakMap(),
  Rs = new WeakMap(),
  bl = new WeakMap();
function _l(e) {
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
function yl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : _l(qr(e));
}
function dn(e) {
  return qt(e) ? e : Qi(e, !1, Fs, gl, $s);
}
function wl(e) {
  return Qi(e, !1, cl, ml, qs);
}
function Bs(e) {
  return Qi(e, !0, al, vl, Rs);
}
function Qi(e, t, n, i, o) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const r = yl(e);
  if (r === 0) return e;
  const l = new Proxy(e, r === 2 ? i : n);
  return o.set(e, l), l;
}
function Ot(e) {
  return qt(e) ? Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function qt(e) {
  return !!(e && e.__v_isReadonly);
}
function Mn(e) {
  return !!(e && e.__v_isShallow);
}
function Is(e) {
  return Ot(e) || qt(e);
}
function Z(e) {
  const t = e && e.__v_raw;
  return t ? Z(t) : e;
}
function Hn(e) {
  return An(e, "__v_skip", !0), e;
}
const nn = (e) => (le(e) ? dn(e) : e),
  Yi = (e) => (le(e) ? Bs(e) : e);
function Ns(e) {
  nt && Fe && ((e = Z(e)), As(e.dep || (e.dep = zi())));
}
function Ds(e, t) {
  e = Z(e);
  const n = e.dep;
  n && yi(n);
}
function be(e) {
  return !!(e && e.__v_isRef === !0);
}
function he(e) {
  return xl(e, !1);
}
function xl(e, t) {
  return be(e) ? e : new Cl(e, t);
}
class Cl {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Z(t)),
      (this._value = n ? t : nn(t));
  }
  get value() {
    return Ns(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Mn(t) || qt(t);
    (t = n ? t : Z(t)),
      tn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : nn(t)), Ds(this));
  }
}
function wi(e) {
  return be(e) ? e.value : e;
}
const El = {
  get: (e, t, n) => wi(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const o = e[t];
    return be(o) && !be(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, i);
  },
};
function js(e) {
  return Ot(e) ? e : new Proxy(e, El);
}
class Tl {
  constructor(t, n, i, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Ki(t, () => {
        this._dirty || ((this._dirty = !0), Ds(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = i);
  }
  get value() {
    const t = Z(this);
    return (
      Ns(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function kl(e, t, n = !1) {
  let i, o;
  const s = K(e);
  return (
    s ? ((i = e), (o = qe)) : ((i = e.get), (o = e.set)),
    new Tl(i, o, s || !o, n)
  );
}
function it(e, t, n, i) {
  let o;
  try {
    o = i ? e(...i) : e();
  } catch (s) {
    zn(s, t, n);
  }
  return o;
}
function Le(e, t, n, i) {
  if (K(e)) {
    const s = it(e, t, n, i);
    return (
      s &&
        ws(s) &&
        s.catch((r) => {
          zn(r, t, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < e.length; s++) o.push(Le(e[s], t, n, i));
  return o;
}
function zn(e, t, n, i = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const r = t.proxy,
      l = n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, r, l) === !1) return;
      }
      s = s.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      it(a, null, 10, [e, r, l]);
      return;
    }
  }
  Sl(e, n, o, i);
}
function Sl(e, t, n, i = !0) {
  console.error(e);
}
let on = !1,
  xi = !1;
const ve = [];
let je = 0;
const Ft = [];
let ze = null,
  dt = 0;
const Hs = Promise.resolve();
let Ji = null;
function On(e) {
  const t = Ji || Hs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Pl(e) {
  let t = je + 1,
    n = ve.length;
  for (; t < n; ) {
    const i = (t + n) >>> 1;
    sn(ve[i]) < e ? (t = i + 1) : (n = i);
  }
  return t;
}
function Xi(e) {
  (!ve.length || !ve.includes(e, on && e.allowRecurse ? je + 1 : je)) &&
    (e.id == null ? ve.push(e) : ve.splice(Pl(e.id), 0, e), zs());
}
function zs() {
  !on && !xi && ((xi = !0), (Ji = Hs.then(Us)));
}
function Ll(e) {
  const t = ve.indexOf(e);
  t > je && ve.splice(t, 1);
}
function Al(e) {
  D(e)
    ? Ft.push(...e)
    : (!ze || !ze.includes(e, e.allowRecurse ? dt + 1 : dt)) && Ft.push(e),
    zs();
}
function bo(e, t = on ? je + 1 : 0) {
  for (; t < ve.length; t++) {
    const n = ve[t];
    n && n.pre && (ve.splice(t, 1), t--, n());
  }
}
function Ks(e) {
  if (Ft.length) {
    const t = [...new Set(Ft)];
    if (((Ft.length = 0), ze)) {
      ze.push(...t);
      return;
    }
    for (ze = t, ze.sort((n, i) => sn(n) - sn(i)), dt = 0; dt < ze.length; dt++)
      ze[dt]();
    (ze = null), (dt = 0);
  }
}
const sn = (e) => (e.id == null ? 1 / 0 : e.id),
  Ml = (e, t) => {
    const n = sn(e) - sn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Us(e) {
  (xi = !1), (on = !0), ve.sort(Ml);
  const t = qe;
  try {
    for (je = 0; je < ve.length; je++) {
      const n = ve[je];
      n && n.active !== !1 && it(n, null, 14);
    }
  } finally {
    (je = 0),
      (ve.length = 0),
      Ks(),
      (on = !1),
      (Ji = null),
      (ve.length || Ft.length) && Us();
  }
}
function Ol(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || re;
  let o = n;
  const s = t.startsWith("update:"),
    r = s && t.slice(7);
  if (r && r in i) {
    const d = `${r === "modelValue" ? "model" : r}Modifiers`,
      { number: p, trim: h } = i[d] || re;
    h && (o = n.map((_) => (ae(_) ? _.trim() : _))), p && (o = n.map(Ir));
  }
  let l,
    a = i[(l = ii(t))] || i[(l = ii($t(t)))];
  !a && s && (a = i[(l = ii(It(t)))]), a && Le(a, e, 6, o);
  const u = i[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Le(u, e, 6, o);
  }
}
function Ws(e, t, n = !1) {
  const i = t.emitsCache,
    o = i.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let r = {},
    l = !1;
  if (!K(e)) {
    const a = (u) => {
      const d = Ws(u, t, !0);
      d && ((l = !0), fe(r, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !s && !l
    ? (le(e) && i.set(e, null), null)
    : (D(s) ? s.forEach((a) => (r[a] = null)) : fe(r, s),
      le(e) && i.set(e, r),
      r);
}
function Kn(e, t) {
  return !e || !In(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      J(e, t[0].toLowerCase() + t.slice(1)) || J(e, It(t)) || J(e, t));
}
let Pe = null,
  Vs = null;
function Fn(e) {
  const t = Pe;
  return (Pe = e), (Vs = (e && e.type.__scopeId) || null), t;
}
function Vt(e, t = Pe, n) {
  if (!t || e._n) return e;
  const i = (...o) => {
    i._d && Ao(-1);
    const s = Fn(t);
    let r;
    try {
      r = e(...o);
    } finally {
      Fn(s), i._d && Ao(1);
    }
    return r;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function si(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: o,
    props: s,
    propsOptions: [r],
    slots: l,
    attrs: a,
    emit: u,
    render: d,
    renderCache: p,
    data: h,
    setupState: _,
    ctx: x,
    inheritAttrs: E,
  } = e;
  let P, I;
  const k = Fn(e);
  try {
    if (n.shapeFlag & 4) {
      const A = o || i;
      (P = De(d.call(A, A, p, s, _, h, x))), (I = a);
    } else {
      const A = t;
      (P = De(
        A.length > 1 ? A(s, { attrs: a, slots: l, emit: u }) : A(s, null)
      )),
        (I = t.props ? a : Fl(a));
    }
  } catch (A) {
    (en.length = 0), zn(A, e, 1), (P = pe(Ke));
  }
  let j = P;
  if (I && E !== !1) {
    const A = Object.keys(I),
      { shapeFlag: B } = j;
    A.length && B & 7 && (r && A.some(Bi) && (I = $l(I, r)), (j = st(j, I)));
  }
  return (
    n.dirs && ((j = st(j)), (j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (j.transition = n.transition),
    (P = j),
    Fn(k),
    P
  );
}
const Fl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || In(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  $l = (e, t) => {
    const n = {};
    for (const i in e) (!Bi(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
    return n;
  };
function ql(e, t, n) {
  const { props: i, children: o, component: s } = e,
    { props: r, children: l, patchFlag: a } = t,
    u = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return i ? _o(i, r, u) : !!r;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const h = d[p];
        if (r[h] !== i[h] && !Kn(u, h)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : i === r
      ? !1
      : i
      ? r
        ? _o(i, r, u)
        : !0
      : !!r;
  return !1;
}
function _o(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < i.length; o++) {
    const s = i[o];
    if (t[s] !== e[s] && !Kn(n, s)) return !0;
  }
  return !1;
}
function Rl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Bl = (e) => e.__isSuspense;
function Il(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Al(e);
}
const bn = {};
function vt(e, t, n) {
  return Qs(e, t, n);
}
function Qs(
  e,
  t,
  { immediate: n, deep: i, flush: o, onTrack: s, onTrigger: r } = re
) {
  var l;
  const a = Qr() === ((l = ge) == null ? void 0 : l.scope) ? ge : null;
  let u,
    d = !1,
    p = !1;
  if (
    (be(e)
      ? ((u = () => e.value), (d = Mn(e)))
      : Ot(e)
      ? ((u = () => e), (i = !0))
      : D(e)
      ? ((p = !0),
        (d = e.some((A) => Ot(A) || Mn(A))),
        (u = () =>
          e.map((A) => {
            if (be(A)) return A.value;
            if (Ot(A)) return gt(A);
            if (K(A)) return it(A, a, 2);
          })))
      : K(e)
      ? t
        ? (u = () => it(e, a, 2))
        : (u = () => {
            if (!(a && a.isUnmounted)) return h && h(), Le(e, a, 3, [_]);
          })
      : (u = qe),
    t && i)
  ) {
    const A = u;
    u = () => gt(A());
  }
  let h,
    _ = (A) => {
      h = k.onStop = () => {
        it(A, a, 4);
      };
    },
    x;
  if (ln)
    if (
      ((_ = qe),
      t ? n && Le(t, a, 3, [u(), p ? [] : void 0, _]) : u(),
      o === "sync")
    ) {
      const A = Ba();
      x = A.__watcherHandles || (A.__watcherHandles = []);
    } else return qe;
  let E = p ? new Array(e.length).fill(bn) : bn;
  const P = () => {
    if (k.active)
      if (t) {
        const A = k.run();
        (i || d || (p ? A.some((B, V) => tn(B, E[V])) : tn(A, E))) &&
          (h && h(),
          Le(t, a, 3, [A, E === bn ? void 0 : p && E[0] === bn ? [] : E, _]),
          (E = A));
      } else k.run();
  };
  P.allowRecurse = !!t;
  let I;
  o === "sync"
    ? (I = P)
    : o === "post"
    ? (I = () => ye(P, a && a.suspense))
    : ((P.pre = !0), a && (P.id = a.uid), (I = () => Xi(P)));
  const k = new Ki(u, I);
  t
    ? n
      ? P()
      : (E = k.run())
    : o === "post"
    ? ye(k.run.bind(k), a && a.suspense)
    : k.run();
  const j = () => {
    k.stop(), a && a.scope && Ii(a.scope.effects, k);
  };
  return x && x.push(j), j;
}
function Nl(e, t, n) {
  const i = this.proxy,
    o = ae(e) ? (e.includes(".") ? Ys(i, e) : () => i[e]) : e.bind(i, i);
  let s;
  K(t) ? (s = t) : ((s = t.handler), (n = t));
  const r = ge;
  Rt(this);
  const l = Qs(o, s.bind(i), n);
  return r ? Rt(r) : bt(), l;
}
function Ys(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let o = 0; o < n.length && i; o++) i = i[n[o]];
    return i;
  };
}
function gt(e, t) {
  if (!le(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), be(e))) gt(e.value, t);
  else if (D(e)) for (let n = 0; n < e.length; n++) gt(e[n], t);
  else if (ys(e) || Mt(e))
    e.forEach((n) => {
      gt(n, t);
    });
  else if (Cs(e)) for (const n in e) gt(e[n], t);
  return e;
}
function Js(e, t) {
  const n = Pe;
  if (n === null) return e;
  const i = Yn(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [r, l, a, u = re] = t[s];
    r &&
      (K(r) && (r = { mounted: r, updated: r }),
      r.deep && gt(l),
      o.push({
        dir: r,
        instance: i,
        value: l,
        oldValue: void 0,
        arg: a,
        modifiers: u,
      }));
  }
  return e;
}
function rt(e, t, n, i) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const l = o[r];
    s && (l.oldValue = s[r].value);
    let a = l.dir[i];
    a && (Nt(), Le(a, n, 8, [e.el, l, e, t]), Dt());
  }
}
function Dl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Gi(() => {
      e.isMounted = !0;
    }),
    xt(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Te = [Function, Array],
  Xs = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Te,
    onEnter: Te,
    onAfterEnter: Te,
    onEnterCancelled: Te,
    onBeforeLeave: Te,
    onLeave: Te,
    onAfterLeave: Te,
    onLeaveCancelled: Te,
    onBeforeAppear: Te,
    onAppear: Te,
    onAfterAppear: Te,
    onAppearCancelled: Te,
  },
  jl = {
    name: "BaseTransition",
    props: Xs,
    setup(e, { slots: t }) {
      const n = Ve(),
        i = Dl();
      let o;
      return () => {
        const s = t.default && Gs(t.default(), !0);
        if (!s || !s.length) return;
        let r = s[0];
        if (s.length > 1) {
          for (const E of s)
            if (E.type !== Ke) {
              r = E;
              break;
            }
        }
        const l = Z(e),
          { mode: a } = l;
        if (i.isLeaving) return ri(r);
        const u = yo(r);
        if (!u) return ri(r);
        const d = Ci(u, l, i, n);
        Ei(u, d);
        const p = n.subTree,
          h = p && yo(p);
        let _ = !1;
        const { getTransitionKey: x } = u.type;
        if (x) {
          const E = x();
          o === void 0 ? (o = E) : E !== o && ((o = E), (_ = !0));
        }
        if (h && h.type !== Ke && (!ht(u, h) || _)) {
          const E = Ci(h, l, i, n);
          if ((Ei(h, E), a === "out-in"))
            return (
              (i.isLeaving = !0),
              (E.afterLeave = () => {
                (i.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              ri(r)
            );
          a === "in-out" &&
            u.type !== Ke &&
            (E.delayLeave = (P, I, k) => {
              const j = Zs(i, h);
              (j[String(h.key)] = h),
                (P._leaveCb = () => {
                  I(), (P._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = k);
            });
        }
        return r;
      };
    },
  },
  Hl = jl;
function Zs(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || ((i = Object.create(null)), n.set(t.type, i)), i;
}
function Ci(e, t, n, i) {
  const {
      appear: o,
      mode: s,
      persisted: r = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: p,
      onLeave: h,
      onAfterLeave: _,
      onLeaveCancelled: x,
      onBeforeAppear: E,
      onAppear: P,
      onAfterAppear: I,
      onAppearCancelled: k,
    } = t,
    j = String(e.key),
    A = Zs(n, e),
    B = (M, O) => {
      M && Le(M, i, 9, O);
    },
    V = (M, O) => {
      const N = O[1];
      B(M, O),
        D(M) ? M.every(($) => $.length <= 1) && N() : M.length <= 1 && N();
    },
    U = {
      mode: s,
      persisted: r,
      beforeEnter(M) {
        let O = l;
        if (!n.isMounted)
          if (o) O = E || l;
          else return;
        M._leaveCb && M._leaveCb(!0);
        const N = A[j];
        N && ht(e, N) && N.el._leaveCb && N.el._leaveCb(), B(O, [M]);
      },
      enter(M) {
        let O = a,
          N = u,
          $ = d;
        if (!n.isMounted)
          if (o) (O = P || a), (N = I || u), ($ = k || d);
          else return;
        let S = !1;
        const Q = (M._enterCb = (L) => {
          S ||
            ((S = !0),
            L ? B($, [M]) : B(N, [M]),
            U.delayedLeave && U.delayedLeave(),
            (M._enterCb = void 0));
        });
        O ? V(O, [M, Q]) : Q();
      },
      leave(M, O) {
        const N = String(e.key);
        if ((M._enterCb && M._enterCb(!0), n.isUnmounting)) return O();
        B(p, [M]);
        let $ = !1;
        const S = (M._leaveCb = (Q) => {
          $ ||
            (($ = !0),
            O(),
            Q ? B(x, [M]) : B(_, [M]),
            (M._leaveCb = void 0),
            A[N] === e && delete A[N]);
        });
        (A[N] = e), h ? V(h, [M, S]) : S();
      },
      clone(M) {
        return Ci(M, t, n, i);
      },
    };
  return U;
}
function ri(e) {
  if (Un(e)) return (e = st(e)), (e.children = null), e;
}
function yo(e) {
  return Un(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Ei(e, t) {
  e.shapeFlag & 6 && e.component
    ? Ei(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Gs(e, t = !1, n) {
  let i = [],
    o = 0;
  for (let s = 0; s < e.length; s++) {
    let r = e[s];
    const l = n == null ? r.key : String(n) + String(r.key != null ? r.key : s);
    r.type === we
      ? (r.patchFlag & 128 && o++, (i = i.concat(Gs(r.children, t, l))))
      : (t || r.type !== Ke) && i.push(l != null ? st(r, { key: l }) : r);
  }
  if (o > 1) for (let s = 0; s < i.length; s++) i[s].patchFlag = -2;
  return i;
}
function zl(e, t) {
  return K(e) ? (() => fe({ name: e.name }, t, { setup: e }))() : e;
}
const En = (e) => !!e.type.__asyncLoader,
  Un = (e) => e.type.__isKeepAlive;
function Kl(e, t) {
  er(e, "a", t);
}
function Zi(e, t) {
  er(e, "da", t);
}
function er(e, t, n = ge) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Wn(t, i, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      Un(o.parent.vnode) && Ul(i, t, n, o), (o = o.parent);
  }
}
function Ul(e, t, n, i) {
  const o = Wn(t, e, i, !0);
  eo(() => {
    Ii(i[t], o);
  }, n);
}
function Wn(e, t, n = ge, i = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...r) => {
          if (n.isUnmounted) return;
          Nt(), Rt(n);
          const l = Le(t, n, e, r);
          return bt(), Dt(), l;
        });
    return i ? o.unshift(s) : o.push(s), s;
  }
}
const We =
    (e) =>
    (t, n = ge) =>
      (!ln || e === "sp") && Wn(e, (...i) => t(...i), n),
  Wl = We("bm"),
  Gi = We("m"),
  Vl = We("bu"),
  Ql = We("u"),
  xt = We("bum"),
  eo = We("um"),
  Yl = We("sp"),
  Jl = We("rtg"),
  Xl = We("rtc");
function Zl(e, t = ge) {
  Wn("ec", e, t);
}
const Gl = Symbol.for("v-ndc");
function _n(e, t, n, i) {
  let o;
  const s = n && n[i];
  if (D(e) || ae(e)) {
    o = new Array(e.length);
    for (let r = 0, l = e.length; r < l; r++)
      o[r] = t(e[r], r, void 0, s && s[r]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let r = 0; r < e; r++) o[r] = t(r + 1, r, void 0, s && s[r]);
  } else if (le(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (r, l) => t(r, l, void 0, s && s[l]));
    else {
      const r = Object.keys(e);
      o = new Array(r.length);
      for (let l = 0, a = r.length; l < a; l++) {
        const u = r[l];
        o[l] = t(e[u], u, l, s && s[l]);
      }
    }
  else o = [];
  return n && (n[i] = o), o;
}
const Ti = (e) => (e ? (ur(e) ? Yn(e) || e.proxy : Ti(e.parent)) : null),
  Zt = fe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ti(e.parent),
    $root: (e) => Ti(e.root),
    $emit: (e) => e.emit,
    $options: (e) => to(e),
    $forceUpdate: (e) => e.f || (e.f = () => Xi(e.update)),
    $nextTick: (e) => e.n || (e.n = On.bind(e.proxy)),
    $watch: (e) => Nl.bind(e),
  }),
  li = (e, t) => e !== re && !e.__isScriptSetup && J(e, t),
  ea = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: i,
        data: o,
        props: s,
        accessCache: r,
        type: l,
        appContext: a,
      } = e;
      let u;
      if (t[0] !== "$") {
        const _ = r[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return i[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (li(i, t)) return (r[t] = 1), i[t];
          if (o !== re && J(o, t)) return (r[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && J(u, t)) return (r[t] = 3), s[t];
          if (n !== re && J(n, t)) return (r[t] = 4), n[t];
          ki && (r[t] = 0);
        }
      }
      const d = Zt[t];
      let p, h;
      if (d) return t === "$attrs" && xe(e, "get", t), d(e);
      if ((p = l.__cssModules) && (p = p[t])) return p;
      if (n !== re && J(n, t)) return (r[t] = 4), n[t];
      if (((h = a.config.globalProperties), J(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: i, setupState: o, ctx: s } = e;
      return li(o, t)
        ? ((o[t] = n), !0)
        : i !== re && J(i, t)
        ? ((i[t] = n), !0)
        : J(e.props, t) || (t[0] === "$" && t.slice(1) in e)
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
          appContext: o,
          propsOptions: s,
        },
      },
      r
    ) {
      let l;
      return (
        !!n[r] ||
        (e !== re && J(e, r)) ||
        li(t, r) ||
        ((l = s[0]) && J(l, r)) ||
        J(i, r) ||
        J(Zt, r) ||
        J(o.config.globalProperties, r)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : J(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function wo(e) {
  return D(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ki = !0;
function ta(e) {
  const t = to(e),
    n = e.proxy,
    i = e.ctx;
  (ki = !1), t.beforeCreate && xo(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: s,
    methods: r,
    watch: l,
    provide: a,
    inject: u,
    created: d,
    beforeMount: p,
    mounted: h,
    beforeUpdate: _,
    updated: x,
    activated: E,
    deactivated: P,
    beforeDestroy: I,
    beforeUnmount: k,
    destroyed: j,
    unmounted: A,
    render: B,
    renderTracked: V,
    renderTriggered: U,
    errorCaptured: M,
    serverPrefetch: O,
    expose: N,
    inheritAttrs: $,
    components: S,
    directives: Q,
    filters: L,
  } = t;
  if ((u && na(u, i, null), r))
    for (const ie in r) {
      const G = r[ie];
      K(G) && (i[ie] = G.bind(n));
    }
  if (o) {
    const ie = o.call(n, n);
    le(ie) && (e.data = dn(ie));
  }
  if (((ki = !0), s))
    for (const ie in s) {
      const G = s[ie],
        Re = K(G) ? G.bind(n, n) : K(G.get) ? G.get.bind(n, n) : qe,
        Qe = !K(G) && K(G.set) ? G.set.bind(n) : qe,
        He = H({ get: Re, set: Qe });
      Object.defineProperty(i, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => He.value,
        set: (Ee) => (He.value = Ee),
      });
    }
  if (l) for (const ie in l) tr(l[ie], i, n, ie);
  if (a) {
    const ie = K(a) ? a.call(n) : a;
    Reflect.ownKeys(ie).forEach((G) => {
      aa(G, ie[G]);
    });
  }
  d && xo(d, e, "c");
  function ee(ie, G) {
    D(G) ? G.forEach((Re) => ie(Re.bind(n))) : G && ie(G.bind(n));
  }
  if (
    (ee(Wl, p),
    ee(Gi, h),
    ee(Vl, _),
    ee(Ql, x),
    ee(Kl, E),
    ee(Zi, P),
    ee(Zl, M),
    ee(Xl, V),
    ee(Jl, U),
    ee(xt, k),
    ee(eo, A),
    ee(Yl, O),
    D(N))
  )
    if (N.length) {
      const ie = e.exposed || (e.exposed = {});
      N.forEach((G) => {
        Object.defineProperty(ie, G, {
          get: () => n[G],
          set: (Re) => (n[G] = Re),
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === qe && (e.render = B),
    $ != null && (e.inheritAttrs = $),
    S && (e.components = S),
    Q && (e.directives = Q);
}
function na(e, t, n = qe) {
  D(e) && (e = Si(e));
  for (const i in e) {
    const o = e[i];
    let s;
    le(o)
      ? "default" in o
        ? (s = Tn(o.from || i, o.default, !0))
        : (s = Tn(o.from || i))
      : (s = Tn(o)),
      be(s)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (r) => (s.value = r),
          })
        : (t[i] = s);
  }
}
function xo(e, t, n) {
  Le(D(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function tr(e, t, n, i) {
  const o = i.includes(".") ? Ys(n, i) : () => n[i];
  if (ae(e)) {
    const s = t[e];
    K(s) && vt(o, s);
  } else if (K(e)) vt(o, e.bind(n));
  else if (le(e))
    if (D(e)) e.forEach((s) => tr(s, t, n, i));
    else {
      const s = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(s) && vt(o, s, e);
    }
}
function to(e) {
  const t = e.type,
    { mixins: n, extends: i } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: r },
    } = e.appContext,
    l = s.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !o.length && !n && !i
      ? (a = t)
      : ((a = {}), o.length && o.forEach((u) => $n(a, u, r, !0)), $n(a, t, r)),
    le(t) && s.set(t, a),
    a
  );
}
function $n(e, t, n, i = !1) {
  const { mixins: o, extends: s } = t;
  s && $n(e, s, n, !0), o && o.forEach((r) => $n(e, r, n, !0));
  for (const r in t)
    if (!(i && r === "expose")) {
      const l = ia[r] || (n && n[r]);
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const ia = {
  data: Co,
  props: Eo,
  emits: Eo,
  methods: Qt,
  computed: Qt,
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  components: Qt,
  directives: Qt,
  watch: sa,
  provide: Co,
  inject: oa,
};
function Co(e, t) {
  return t
    ? e
      ? function () {
          return fe(
            K(e) ? e.call(this, this) : e,
            K(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function oa(e, t) {
  return Qt(Si(e), Si(t));
}
function Si(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qt(e, t) {
  return e ? fe(Object.create(null), e, t) : t;
}
function Eo(e, t) {
  return e
    ? D(e) && D(t)
      ? [...new Set([...e, ...t])]
      : fe(Object.create(null), wo(e), wo(t ?? {}))
    : t;
}
function sa(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = fe(Object.create(null), e);
  for (const i in t) n[i] = _e(e[i], t[i]);
  return n;
}
function nr() {
  return {
    app: null,
    config: {
      isNativeTag: Or,
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
let ra = 0;
function la(e, t) {
  return function (i, o = null) {
    K(i) || (i = fe({}, i)), o != null && !le(o) && (o = null);
    const s = nr(),
      r = new Set();
    let l = !1;
    const a = (s.app = {
      _uid: ra++,
      _component: i,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Ia,
      get config() {
        return s.config;
      },
      set config(u) {},
      use(u, ...d) {
        return (
          r.has(u) ||
            (u && K(u.install)
              ? (r.add(u), u.install(a, ...d))
              : K(u) && (r.add(u), u(a, ...d))),
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
      mount(u, d, p) {
        if (!l) {
          const h = pe(i, o);
          return (
            (h.appContext = s),
            d && t ? t(h, u) : e(h, u, p),
            (l = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Yn(h.component) || h.component.proxy
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
        qn = a;
        try {
          return u();
        } finally {
          qn = null;
        }
      },
    });
    return a;
  };
}
let qn = null;
function aa(e, t) {
  if (ge) {
    let n = ge.provides;
    const i = ge.parent && ge.parent.provides;
    i === n && (n = ge.provides = Object.create(i)), (n[e] = t);
  }
}
function Tn(e, t, n = !1) {
  const i = ge || Pe;
  if (i || qn) {
    const o = i
      ? i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides
      : qn._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && K(t) ? t.call(i && i.proxy) : t;
  }
}
function ca(e, t, n, i = !1) {
  const o = {},
    s = {};
  An(s, Qn, 1), (e.propsDefaults = Object.create(null)), ir(e, t, o, s);
  for (const r in e.propsOptions[0]) r in o || (o[r] = void 0);
  n ? (e.props = i ? o : wl(o)) : e.type.props ? (e.props = o) : (e.props = s),
    (e.attrs = s);
}
function ua(e, t, n, i) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: r },
    } = e,
    l = Z(o),
    [a] = e.propsOptions;
  let u = !1;
  if ((i || r > 0) && !(r & 16)) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        let h = d[p];
        if (Kn(e.emitsOptions, h)) continue;
        const _ = t[h];
        if (a)
          if (J(s, h)) _ !== s[h] && ((s[h] = _), (u = !0));
          else {
            const x = $t(h);
            o[x] = Pi(a, l, x, _, e, !1);
          }
        else _ !== s[h] && ((s[h] = _), (u = !0));
      }
    }
  } else {
    ir(e, t, o, s) && (u = !0);
    let d;
    for (const p in l)
      (!t || (!J(t, p) && ((d = It(p)) === p || !J(t, d)))) &&
        (a
          ? n &&
            (n[p] !== void 0 || n[d] !== void 0) &&
            (o[p] = Pi(a, l, p, void 0, e, !0))
          : delete o[p]);
    if (s !== l) for (const p in s) (!t || !J(t, p)) && (delete s[p], (u = !0));
  }
  u && Ue(e, "set", "$attrs");
}
function ir(e, t, n, i) {
  const [o, s] = e.propsOptions;
  let r = !1,
    l;
  if (t)
    for (let a in t) {
      if (Cn(a)) continue;
      const u = t[a];
      let d;
      o && J(o, (d = $t(a)))
        ? !s || !s.includes(d)
          ? (n[d] = u)
          : ((l || (l = {}))[d] = u)
        : Kn(e.emitsOptions, a) ||
          ((!(a in i) || u !== i[a]) && ((i[a] = u), (r = !0)));
    }
  if (s) {
    const a = Z(n),
      u = l || re;
    for (let d = 0; d < s.length; d++) {
      const p = s[d];
      n[p] = Pi(o, a, p, u[p], e, !J(u, p));
    }
  }
  return r;
}
function Pi(e, t, n, i, o, s) {
  const r = e[n];
  if (r != null) {
    const l = J(r, "default");
    if (l && i === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && K(a)) {
        const { propsDefaults: u } = o;
        n in u ? (i = u[n]) : (Rt(o), (i = u[n] = a.call(null, t)), bt());
      } else i = a;
    }
    r[0] &&
      (s && !l ? (i = !1) : r[1] && (i === "" || i === It(n)) && (i = !0));
  }
  return i;
}
function or(e, t, n = !1) {
  const i = t.propsCache,
    o = i.get(e);
  if (o) return o;
  const s = e.props,
    r = {},
    l = [];
  let a = !1;
  if (!K(e)) {
    const d = (p) => {
      a = !0;
      const [h, _] = or(p, t, !0);
      fe(r, h), _ && l.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!s && !a) return le(e) && i.set(e, At), At;
  if (D(s))
    for (let d = 0; d < s.length; d++) {
      const p = $t(s[d]);
      To(p) && (r[p] = re);
    }
  else if (s)
    for (const d in s) {
      const p = $t(d);
      if (To(p)) {
        const h = s[d],
          _ = (r[p] = D(h) || K(h) ? { type: h } : fe({}, h));
        if (_) {
          const x = Po(Boolean, _.type),
            E = Po(String, _.type);
          (_[0] = x > -1),
            (_[1] = E < 0 || x < E),
            (x > -1 || J(_, "default")) && l.push(p);
        }
      }
    }
  const u = [r, l];
  return le(e) && i.set(e, u), u;
}
function To(e) {
  return e[0] !== "$";
}
function ko(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function So(e, t) {
  return ko(e) === ko(t);
}
function Po(e, t) {
  return D(t) ? t.findIndex((n) => So(n, e)) : K(t) && So(t, e) ? 0 : -1;
}
const sr = (e) => e[0] === "_" || e === "$stable",
  no = (e) => (D(e) ? e.map(De) : [De(e)]),
  fa = (e, t, n) => {
    if (t._n) return t;
    const i = Vt((...o) => no(t(...o)), n);
    return (i._c = !1), i;
  },
  rr = (e, t, n) => {
    const i = e._ctx;
    for (const o in e) {
      if (sr(o)) continue;
      const s = e[o];
      if (K(s)) t[o] = fa(o, s, i);
      else if (s != null) {
        const r = no(s);
        t[o] = () => r;
      }
    }
  },
  lr = (e, t) => {
    const n = no(t);
    e.slots.default = () => n;
  },
  da = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = Z(t)), An(t, "_", n)) : rr(t, (e.slots = {}));
    } else (e.slots = {}), t && lr(e, t);
    An(e.slots, Qn, 1);
  },
  ha = (e, t, n) => {
    const { vnode: i, slots: o } = e;
    let s = !0,
      r = re;
    if (i.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (s = !1)
          : (fe(o, t), !n && l === 1 && delete o._)
        : ((s = !t.$stable), rr(t, o)),
        (r = t);
    } else t && (lr(e, t), (r = { default: 1 }));
    if (s) for (const l in o) !sr(l) && !(l in r) && delete o[l];
  };
function Li(e, t, n, i, o = !1) {
  if (D(e)) {
    e.forEach((h, _) => Li(h, t && (D(t) ? t[_] : t), n, i, o));
    return;
  }
  if (En(i) && !o) return;
  const s = i.shapeFlag & 4 ? Yn(i.component) || i.component.proxy : i.el,
    r = o ? null : s,
    { i: l, r: a } = e,
    u = t && t.r,
    d = l.refs === re ? (l.refs = {}) : l.refs,
    p = l.setupState;
  if (
    (u != null &&
      u !== a &&
      (ae(u)
        ? ((d[u] = null), J(p, u) && (p[u] = null))
        : be(u) && (u.value = null)),
    K(a))
  )
    it(a, l, 12, [r, d]);
  else {
    const h = ae(a),
      _ = be(a);
    if (h || _) {
      const x = () => {
        if (e.f) {
          const E = h ? (J(p, a) ? p[a] : d[a]) : a.value;
          o
            ? D(E) && Ii(E, s)
            : D(E)
            ? E.includes(s) || E.push(s)
            : h
            ? ((d[a] = [s]), J(p, a) && (p[a] = d[a]))
            : ((a.value = [s]), e.k && (d[e.k] = a.value));
        } else
          h
            ? ((d[a] = r), J(p, a) && (p[a] = r))
            : _ && ((a.value = r), e.k && (d[e.k] = r));
      };
      r ? ((x.id = -1), ye(x, n)) : x();
    }
  }
}
const ye = Il;
function pa(e) {
  return ga(e);
}
function ga(e, t) {
  const n = mi();
  n.__VUE__ = !0;
  const {
      insert: i,
      remove: o,
      patchProp: s,
      createElement: r,
      createText: l,
      createComment: a,
      setText: u,
      setElementText: d,
      parentNode: p,
      nextSibling: h,
      setScopeId: _ = qe,
      insertStaticContent: x,
    } = e,
    E = (
      c,
      f,
      g,
      v = null,
      m = null,
      w = null,
      T = !1,
      y = null,
      C = !!f.dynamicChildren
    ) => {
      if (c === f) return;
      c && !ht(c, f) && ((v = Ye(c)), Ee(c, m, w, !0), (c = null)),
        f.patchFlag === -2 && ((C = !1), (f.dynamicChildren = null));
      const { type: b, ref: q, shapeFlag: F } = f;
      switch (b) {
        case Vn:
          P(c, f, g, v);
          break;
        case Ke:
          I(c, f, g, v);
          break;
        case kn:
          c == null && k(f, g, v, T);
          break;
        case we:
          S(c, f, g, v, m, w, T, y, C);
          break;
        default:
          F & 1
            ? B(c, f, g, v, m, w, T, y, C)
            : F & 6
            ? Q(c, f, g, v, m, w, T, y, C)
            : (F & 64 || F & 128) && b.process(c, f, g, v, m, w, T, y, C, Be);
      }
      q != null && m && Li(q, c && c.ref, w, f || c, !f);
    },
    P = (c, f, g, v) => {
      if (c == null) i((f.el = l(f.children)), g, v);
      else {
        const m = (f.el = c.el);
        f.children !== c.children && u(m, f.children);
      }
    },
    I = (c, f, g, v) => {
      c == null ? i((f.el = a(f.children || "")), g, v) : (f.el = c.el);
    },
    k = (c, f, g, v) => {
      [c.el, c.anchor] = x(c.children, f, g, v, c.el, c.anchor);
    },
    j = ({ el: c, anchor: f }, g, v) => {
      let m;
      for (; c && c !== f; ) (m = h(c)), i(c, g, v), (c = m);
      i(f, g, v);
    },
    A = ({ el: c, anchor: f }) => {
      let g;
      for (; c && c !== f; ) (g = h(c)), o(c), (c = g);
      o(f);
    },
    B = (c, f, g, v, m, w, T, y, C) => {
      (T = T || f.type === "svg"),
        c == null ? V(f, g, v, m, w, T, y, C) : O(c, f, m, w, T, y, C);
    },
    V = (c, f, g, v, m, w, T, y) => {
      let C, b;
      const { type: q, props: F, shapeFlag: R, transition: z, dirs: W } = c;
      if (
        ((C = c.el = r(c.type, w, F && F.is, F)),
        R & 8
          ? d(C, c.children)
          : R & 16 &&
            M(c.children, C, null, v, m, w && q !== "foreignObject", T, y),
        W && rt(c, null, v, "created"),
        U(C, c, c.scopeId, T, v),
        F)
      ) {
        for (const ne in F)
          ne !== "value" &&
            !Cn(ne) &&
            s(C, ne, null, F[ne], w, c.children, v, m, oe);
        "value" in F && s(C, "value", null, F.value),
          (b = F.onVnodeBeforeMount) && Ne(b, v, c);
      }
      W && rt(c, null, v, "beforeMount");
      const se = (!m || (m && !m.pendingBranch)) && z && !z.persisted;
      se && z.beforeEnter(C),
        i(C, f, g),
        ((b = F && F.onVnodeMounted) || se || W) &&
          ye(() => {
            b && Ne(b, v, c), se && z.enter(C), W && rt(c, null, v, "mounted");
          }, m);
    },
    U = (c, f, g, v, m) => {
      if ((g && _(c, g), v)) for (let w = 0; w < v.length; w++) _(c, v[w]);
      if (m) {
        let w = m.subTree;
        if (f === w) {
          const T = m.vnode;
          U(c, T, T.scopeId, T.slotScopeIds, m.parent);
        }
      }
    },
    M = (c, f, g, v, m, w, T, y, C = 0) => {
      for (let b = C; b < c.length; b++) {
        const q = (c[b] = y ? tt(c[b]) : De(c[b]));
        E(null, q, f, g, v, m, w, T, y);
      }
    },
    O = (c, f, g, v, m, w, T) => {
      const y = (f.el = c.el);
      let { patchFlag: C, dynamicChildren: b, dirs: q } = f;
      C |= c.patchFlag & 16;
      const F = c.props || re,
        R = f.props || re;
      let z;
      g && lt(g, !1),
        (z = R.onVnodeBeforeUpdate) && Ne(z, g, f, c),
        q && rt(f, c, g, "beforeUpdate"),
        g && lt(g, !0);
      const W = m && f.type !== "foreignObject";
      if (
        (b
          ? N(c.dynamicChildren, b, y, g, v, W, w)
          : T || G(c, f, y, null, g, v, W, w, !1),
        C > 0)
      ) {
        if (C & 16) $(y, f, F, R, g, v, m);
        else if (
          (C & 2 && F.class !== R.class && s(y, "class", null, R.class, m),
          C & 4 && s(y, "style", F.style, R.style, m),
          C & 8)
        ) {
          const se = f.dynamicProps;
          for (let ne = 0; ne < se.length; ne++) {
            const ce = se[ne],
              Ae = F[ce],
              Tt = R[ce];
            (Tt !== Ae || ce === "value") &&
              s(y, ce, Ae, Tt, m, c.children, g, v, oe);
          }
        }
        C & 1 && c.children !== f.children && d(y, f.children);
      } else !T && b == null && $(y, f, F, R, g, v, m);
      ((z = R.onVnodeUpdated) || q) &&
        ye(() => {
          z && Ne(z, g, f, c), q && rt(f, c, g, "updated");
        }, v);
    },
    N = (c, f, g, v, m, w, T) => {
      for (let y = 0; y < f.length; y++) {
        const C = c[y],
          b = f[y],
          q =
            C.el && (C.type === we || !ht(C, b) || C.shapeFlag & 70)
              ? p(C.el)
              : g;
        E(C, b, q, null, v, m, w, T, !0);
      }
    },
    $ = (c, f, g, v, m, w, T) => {
      if (g !== v) {
        if (g !== re)
          for (const y in g)
            !Cn(y) && !(y in v) && s(c, y, g[y], null, T, f.children, m, w, oe);
        for (const y in v) {
          if (Cn(y)) continue;
          const C = v[y],
            b = g[y];
          C !== b && y !== "value" && s(c, y, b, C, T, f.children, m, w, oe);
        }
        "value" in v && s(c, "value", g.value, v.value);
      }
    },
    S = (c, f, g, v, m, w, T, y, C) => {
      const b = (f.el = c ? c.el : l("")),
        q = (f.anchor = c ? c.anchor : l(""));
      let { patchFlag: F, dynamicChildren: R, slotScopeIds: z } = f;
      z && (y = y ? y.concat(z) : z),
        c == null
          ? (i(b, g, v), i(q, g, v), M(f.children, g, q, m, w, T, y, C))
          : F > 0 && F & 64 && R && c.dynamicChildren
          ? (N(c.dynamicChildren, R, g, m, w, T, y),
            (f.key != null || (m && f === m.subTree)) && io(c, f, !0))
          : G(c, f, g, q, m, w, T, y, C);
    },
    Q = (c, f, g, v, m, w, T, y, C) => {
      (f.slotScopeIds = y),
        c == null
          ? f.shapeFlag & 512
            ? m.ctx.activate(f, g, v, T, C)
            : L(f, g, v, m, w, T, C)
          : te(c, f, C);
    },
    L = (c, f, g, v, m, w, T) => {
      const y = (c.component = Aa(c, v, m));
      if ((Un(c) && (y.ctx.renderer = Be), Ma(y), y.asyncDep)) {
        if ((m && m.registerDep(y, ee), !c.el)) {
          const C = (y.subTree = pe(Ke));
          I(null, C, f, g);
        }
        return;
      }
      ee(y, c, f, g, m, w, T);
    },
    te = (c, f, g) => {
      const v = (f.component = c.component);
      if (ql(c, f, g))
        if (v.asyncDep && !v.asyncResolved) {
          ie(v, f, g);
          return;
        } else (v.next = f), Ll(v.update), v.update();
      else (f.el = c.el), (v.vnode = f);
    },
    ee = (c, f, g, v, m, w, T) => {
      const y = () => {
          if (c.isMounted) {
            let { next: q, bu: F, u: R, parent: z, vnode: W } = c,
              se = q,
              ne;
            lt(c, !1),
              q ? ((q.el = W.el), ie(c, q, T)) : (q = W),
              F && oi(F),
              (ne = q.props && q.props.onVnodeBeforeUpdate) && Ne(ne, z, q, W),
              lt(c, !0);
            const ce = si(c),
              Ae = c.subTree;
            (c.subTree = ce),
              E(Ae, ce, p(Ae.el), Ye(Ae), c, m, w),
              (q.el = ce.el),
              se === null && Rl(c, ce.el),
              R && ye(R, m),
              (ne = q.props && q.props.onVnodeUpdated) &&
                ye(() => Ne(ne, z, q, W), m);
          } else {
            let q;
            const { el: F, props: R } = f,
              { bm: z, m: W, parent: se } = c,
              ne = En(f);
            if (
              (lt(c, !1),
              z && oi(z),
              !ne && (q = R && R.onVnodeBeforeMount) && Ne(q, se, f),
              lt(c, !0),
              F && ni)
            ) {
              const ce = () => {
                (c.subTree = si(c)), ni(F, c.subTree, c, m, null);
              };
              ne
                ? f.type.__asyncLoader().then(() => !c.isUnmounted && ce())
                : ce();
            } else {
              const ce = (c.subTree = si(c));
              E(null, ce, g, v, c, m, w), (f.el = ce.el);
            }
            if ((W && ye(W, m), !ne && (q = R && R.onVnodeMounted))) {
              const ce = f;
              ye(() => Ne(q, se, ce), m);
            }
            (f.shapeFlag & 256 ||
              (se && En(se.vnode) && se.vnode.shapeFlag & 256)) &&
              c.a &&
              ye(c.a, m),
              (c.isMounted = !0),
              (f = g = v = null);
          }
        },
        C = (c.effect = new Ki(y, () => Xi(b), c.scope)),
        b = (c.update = () => C.run());
      (b.id = c.uid), lt(c, !0), b();
    },
    ie = (c, f, g) => {
      f.component = c;
      const v = c.vnode.props;
      (c.vnode = f),
        (c.next = null),
        ua(c, f.props, v, g),
        ha(c, f.children, g),
        Nt(),
        bo(),
        Dt();
    },
    G = (c, f, g, v, m, w, T, y, C = !1) => {
      const b = c && c.children,
        q = c ? c.shapeFlag : 0,
        F = f.children,
        { patchFlag: R, shapeFlag: z } = f;
      if (R > 0) {
        if (R & 128) {
          Qe(b, F, g, v, m, w, T, y, C);
          return;
        } else if (R & 256) {
          Re(b, F, g, v, m, w, T, y, C);
          return;
        }
      }
      z & 8
        ? (q & 16 && oe(b, m, w), F !== b && d(g, F))
        : q & 16
        ? z & 16
          ? Qe(b, F, g, v, m, w, T, y, C)
          : oe(b, m, w, !0)
        : (q & 8 && d(g, ""), z & 16 && M(F, g, v, m, w, T, y, C));
    },
    Re = (c, f, g, v, m, w, T, y, C) => {
      (c = c || At), (f = f || At);
      const b = c.length,
        q = f.length,
        F = Math.min(b, q);
      let R;
      for (R = 0; R < F; R++) {
        const z = (f[R] = C ? tt(f[R]) : De(f[R]));
        E(c[R], z, g, null, m, w, T, y, C);
      }
      b > q ? oe(c, m, w, !0, !1, F) : M(f, g, v, m, w, T, y, C, F);
    },
    Qe = (c, f, g, v, m, w, T, y, C) => {
      let b = 0;
      const q = f.length;
      let F = c.length - 1,
        R = q - 1;
      for (; b <= F && b <= R; ) {
        const z = c[b],
          W = (f[b] = C ? tt(f[b]) : De(f[b]));
        if (ht(z, W)) E(z, W, g, null, m, w, T, y, C);
        else break;
        b++;
      }
      for (; b <= F && b <= R; ) {
        const z = c[F],
          W = (f[R] = C ? tt(f[R]) : De(f[R]));
        if (ht(z, W)) E(z, W, g, null, m, w, T, y, C);
        else break;
        F--, R--;
      }
      if (b > F) {
        if (b <= R) {
          const z = R + 1,
            W = z < q ? f[z].el : v;
          for (; b <= R; )
            E(null, (f[b] = C ? tt(f[b]) : De(f[b])), g, W, m, w, T, y, C), b++;
        }
      } else if (b > R) for (; b <= F; ) Ee(c[b], m, w, !0), b++;
      else {
        const z = b,
          W = b,
          se = new Map();
        for (b = W; b <= R; b++) {
          const Ce = (f[b] = C ? tt(f[b]) : De(f[b]));
          Ce.key != null && se.set(Ce.key, b);
        }
        let ne,
          ce = 0;
        const Ae = R - W + 1;
        let Tt = !1,
          ro = 0;
        const Ht = new Array(Ae);
        for (b = 0; b < Ae; b++) Ht[b] = 0;
        for (b = z; b <= F; b++) {
          const Ce = c[b];
          if (ce >= Ae) {
            Ee(Ce, m, w, !0);
            continue;
          }
          let Ie;
          if (Ce.key != null) Ie = se.get(Ce.key);
          else
            for (ne = W; ne <= R; ne++)
              if (Ht[ne - W] === 0 && ht(Ce, f[ne])) {
                Ie = ne;
                break;
              }
          Ie === void 0
            ? Ee(Ce, m, w, !0)
            : ((Ht[Ie - W] = b + 1),
              Ie >= ro ? (ro = Ie) : (Tt = !0),
              E(Ce, f[Ie], g, null, m, w, T, y, C),
              ce++);
        }
        const lo = Tt ? ma(Ht) : At;
        for (ne = lo.length - 1, b = Ae - 1; b >= 0; b--) {
          const Ce = W + b,
            Ie = f[Ce],
            ao = Ce + 1 < q ? f[Ce + 1].el : v;
          Ht[b] === 0
            ? E(null, Ie, g, ao, m, w, T, y, C)
            : Tt && (ne < 0 || b !== lo[ne] ? He(Ie, g, ao, 2) : ne--);
        }
      }
    },
    He = (c, f, g, v, m = null) => {
      const { el: w, type: T, transition: y, children: C, shapeFlag: b } = c;
      if (b & 6) {
        He(c.component.subTree, f, g, v);
        return;
      }
      if (b & 128) {
        c.suspense.move(f, g, v);
        return;
      }
      if (b & 64) {
        T.move(c, f, g, Be);
        return;
      }
      if (T === we) {
        i(w, f, g);
        for (let F = 0; F < C.length; F++) He(C[F], f, g, v);
        i(c.anchor, f, g);
        return;
      }
      if (T === kn) {
        j(c, f, g);
        return;
      }
      if (v !== 2 && b & 1 && y)
        if (v === 0) y.beforeEnter(w), i(w, f, g), ye(() => y.enter(w), m);
        else {
          const { leave: F, delayLeave: R, afterLeave: z } = y,
            W = () => i(w, f, g),
            se = () => {
              F(w, () => {
                W(), z && z();
              });
            };
          R ? R(w, W, se) : se();
        }
      else i(w, f, g);
    },
    Ee = (c, f, g, v = !1, m = !1) => {
      const {
        type: w,
        props: T,
        ref: y,
        children: C,
        dynamicChildren: b,
        shapeFlag: q,
        patchFlag: F,
        dirs: R,
      } = c;
      if ((y != null && Li(y, null, g, c, !0), q & 256)) {
        f.ctx.deactivate(c);
        return;
      }
      const z = q & 1 && R,
        W = !En(c);
      let se;
      if ((W && (se = T && T.onVnodeBeforeUnmount) && Ne(se, f, c), q & 6))
        Y(c.component, g, v);
      else {
        if (q & 128) {
          c.suspense.unmount(g, v);
          return;
        }
        z && rt(c, null, f, "beforeUnmount"),
          q & 64
            ? c.type.remove(c, f, g, m, Be, v)
            : b && (w !== we || (F > 0 && F & 64))
            ? oe(b, f, g, !1, !0)
            : ((w === we && F & 384) || (!m && q & 16)) && oe(C, f, g),
          v && Et(c);
      }
      ((W && (se = T && T.onVnodeUnmounted)) || z) &&
        ye(() => {
          se && Ne(se, f, c), z && rt(c, null, f, "unmounted");
        }, g);
    },
    Et = (c) => {
      const { type: f, el: g, anchor: v, transition: m } = c;
      if (f === we) {
        ei(g, v);
        return;
      }
      if (f === kn) {
        A(c);
        return;
      }
      const w = () => {
        o(g), m && !m.persisted && m.afterLeave && m.afterLeave();
      };
      if (c.shapeFlag & 1 && m && !m.persisted) {
        const { leave: T, delayLeave: y } = m,
          C = () => T(g, w);
        y ? y(c.el, w, C) : C();
      } else w();
    },
    ei = (c, f) => {
      let g;
      for (; c !== f; ) (g = h(c)), o(c), (c = g);
      o(f);
    },
    Y = (c, f, g) => {
      const { bum: v, scope: m, update: w, subTree: T, um: y } = c;
      v && oi(v),
        m.stop(),
        w && ((w.active = !1), Ee(T, c, f, g)),
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
    oe = (c, f, g, v = !1, m = !1, w = 0) => {
      for (let T = w; T < c.length; T++) Ee(c[T], f, g, v, m);
    },
    Ye = (c) =>
      c.shapeFlag & 6
        ? Ye(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : h(c.anchor || c.el),
    jt = (c, f, g) => {
      c == null
        ? f._vnode && Ee(f._vnode, null, null, !0)
        : E(f._vnode || null, c, f, null, null, null, g),
        bo(),
        Ks(),
        (f._vnode = c);
    },
    Be = {
      p: E,
      um: Ee,
      m: He,
      r: Et,
      mt: L,
      mc: M,
      pc: G,
      pbc: N,
      n: Ye,
      o: e,
    };
  let ti, ni;
  return (
    t && ([ti, ni] = t(Be)), { render: jt, hydrate: ti, createApp: la(jt, ti) }
  );
}
function lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function io(e, t, n = !1) {
  const i = e.children,
    o = t.children;
  if (D(i) && D(o))
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      let l = o[s];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[s] = tt(o[s])), (l.el = r.el)),
        n || io(r, l)),
        l.type === Vn && (l.el = r.el);
    }
}
function ma(e) {
  const t = e.slice(),
    n = [0];
  let i, o, s, r, l;
  const a = e.length;
  for (i = 0; i < a; i++) {
    const u = e[i];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[i] = o), n.push(i);
        continue;
      }
      for (s = 0, r = n.length - 1; s < r; )
        (l = (s + r) >> 1), e[n[l]] < u ? (s = l + 1) : (r = l);
      u < e[n[s]] && (s > 0 && (t[i] = n[s - 1]), (n[s] = i));
    }
  }
  for (s = n.length, r = n[s - 1]; s-- > 0; ) (n[s] = r), (r = t[r]);
  return n;
}
const va = (e) => e.__isTeleport,
  Gt = (e) => e && (e.disabled || e.disabled === ""),
  Lo = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  Ai = (e, t) => {
    const n = e && e.to;
    return ae(n) ? (t ? t(n) : null) : n;
  },
  ba = {
    __isTeleport: !0,
    process(e, t, n, i, o, s, r, l, a, u) {
      const {
          mc: d,
          pc: p,
          pbc: h,
          o: { insert: _, querySelector: x, createText: E, createComment: P },
        } = u,
        I = Gt(t.props);
      let { shapeFlag: k, children: j, dynamicChildren: A } = t;
      if (e == null) {
        const B = (t.el = E("")),
          V = (t.anchor = E(""));
        _(B, n, i), _(V, n, i);
        const U = (t.target = Ai(t.props, x)),
          M = (t.targetAnchor = E(""));
        U && (_(M, U), (r = r || Lo(U)));
        const O = (N, $) => {
          k & 16 && d(j, N, $, o, s, r, l, a);
        };
        I ? O(n, V) : U && O(U, M);
      } else {
        t.el = e.el;
        const B = (t.anchor = e.anchor),
          V = (t.target = e.target),
          U = (t.targetAnchor = e.targetAnchor),
          M = Gt(e.props),
          O = M ? n : V,
          N = M ? B : U;
        if (
          ((r = r || Lo(V)),
          A
            ? (h(e.dynamicChildren, A, O, o, s, r, l), io(e, t, !0))
            : a || p(e, t, O, N, o, s, r, l, !1),
          I)
        )
          M || yn(t, n, B, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const $ = (t.target = Ai(t.props, x));
          $ && yn(t, $, null, u, 0);
        } else M && yn(t, V, U, u, 1);
      }
      ar(t);
    },
    remove(e, t, n, i, { um: o, o: { remove: s } }, r) {
      const {
        shapeFlag: l,
        children: a,
        anchor: u,
        targetAnchor: d,
        target: p,
        props: h,
      } = e;
      if ((p && s(d), (r || !Gt(h)) && (s(u), l & 16)))
        for (let _ = 0; _ < a.length; _++) {
          const x = a[_];
          o(x, t, n, !0, !!x.dynamicChildren);
        }
    },
    move: yn,
    hydrate: _a,
  };
function yn(e, t, n, { o: { insert: i }, m: o }, s = 2) {
  s === 0 && i(e.targetAnchor, t, n);
  const { el: r, anchor: l, shapeFlag: a, children: u, props: d } = e,
    p = s === 2;
  if ((p && i(r, t, n), (!p || Gt(d)) && a & 16))
    for (let h = 0; h < u.length; h++) o(u[h], t, n, 2);
  p && i(l, t, n);
}
function _a(
  e,
  t,
  n,
  i,
  o,
  s,
  { o: { nextSibling: r, parentNode: l, querySelector: a } },
  u
) {
  const d = (t.target = Ai(t.props, a));
  if (d) {
    const p = d._lpa || d.firstChild;
    if (t.shapeFlag & 16)
      if (Gt(t.props))
        (t.anchor = u(r(e), t, l(e), n, i, o, s)), (t.targetAnchor = p);
      else {
        t.anchor = r(e);
        let h = p;
        for (; h; )
          if (
            ((h = r(h)), h && h.nodeType === 8 && h.data === "teleport anchor")
          ) {
            (t.targetAnchor = h),
              (d._lpa = t.targetAnchor && r(t.targetAnchor));
            break;
          }
        u(p, t, d, n, i, o, s);
      }
    ar(t);
  }
  return t.anchor && r(t.anchor);
}
const ya = ba;
function ar(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const we = Symbol.for("v-fgt"),
  Vn = Symbol.for("v-txt"),
  Ke = Symbol.for("v-cmt"),
  kn = Symbol.for("v-stc"),
  en = [];
let $e = null;
function Xe(e = !1) {
  en.push(($e = e ? null : []));
}
function wa() {
  en.pop(), ($e = en[en.length - 1] || null);
}
let rn = 1;
function Ao(e) {
  rn += e;
}
function xa(e) {
  return (
    (e.dynamicChildren = rn > 0 ? $e || At : null),
    wa(),
    rn > 0 && $e && $e.push(e),
    e
  );
}
function Ze(e, t, n, i, o, s) {
  return xa(de(e, t, n, i, o, s, !0));
}
function Mi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Qn = "__vInternal",
  cr = ({ key: e }) => e ?? null,
  Sn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ae(e) || be(e) || K(e)
        ? { i: Pe, r: e, k: t, f: !!n }
        : e
      : null
  );
function de(
  e,
  t = null,
  n = null,
  i = 0,
  o = null,
  s = e === we ? 0 : 1,
  r = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && cr(t),
    ref: t && Sn(t),
    scopeId: Vs,
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
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe,
  };
  return (
    l
      ? (oo(a, n), s & 128 && e.normalize(a))
      : n && (a.shapeFlag |= ae(n) ? 8 : 16),
    rn > 0 &&
      !r &&
      $e &&
      (a.patchFlag > 0 || s & 6) &&
      a.patchFlag !== 32 &&
      $e.push(a),
    a
  );
}
const pe = Ca;
function Ca(e, t = null, n = null, i = 0, o = null, s = !1) {
  if (((!e || e === Gl) && (e = Ke), Mi(e))) {
    const l = st(e, t, !0);
    return (
      n && oo(l, n),
      rn > 0 &&
        !s &&
        $e &&
        (l.shapeFlag & 6 ? ($e[$e.indexOf(e)] = l) : $e.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((qa(e) && (e = e.__vccOpts), t)) {
    t = Ea(t);
    let { class: l, style: a } = t;
    l && !ae(l) && (t.class = Hi(l)),
      le(a) && (Is(a) && !D(a) && (a = fe({}, a)), (t.style = ji(a)));
  }
  const r = ae(e) ? 1 : Bl(e) ? 128 : va(e) ? 64 : le(e) ? 4 : K(e) ? 2 : 0;
  return de(e, t, n, i, o, r, s, !0);
}
function Ea(e) {
  return e ? (Is(e) || Qn in e ? fe({}, e) : e) : null;
}
function st(e, t, n = !1) {
  const { props: i, ref: o, patchFlag: s, children: r } = e,
    l = t ? Sa(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && cr(l),
    ref:
      t && t.ref ? (n && o ? (D(o) ? o.concat(Sn(t)) : [o, Sn(t)]) : Sn(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== we ? (s === -1 ? 16 : s | 16) : s,
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
function Ta(e = " ", t = 0) {
  return pe(Vn, null, e, t);
}
function ka(e, t) {
  const n = pe(kn, null, e);
  return (n.staticCount = t), n;
}
function De(e) {
  return e == null || typeof e == "boolean"
    ? pe(Ke)
    : D(e)
    ? pe(we, null, e.slice())
    : typeof e == "object"
    ? tt(e)
    : pe(Vn, null, String(e));
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e);
}
function oo(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), oo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Qn in t)
        ? (t._ctx = Pe)
        : o === 3 &&
          Pe &&
          (Pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    K(t)
      ? ((t = { default: t, _ctx: Pe }), (n = 32))
      : ((t = String(t)), i & 64 ? ((n = 16), (t = [Ta(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Sa(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const o in i)
      if (o === "class")
        t.class !== i.class && (t.class = Hi([t.class, i.class]));
      else if (o === "style") t.style = ji([t.style, i.style]);
      else if (In(o)) {
        const s = t[o],
          r = i[o];
        r &&
          s !== r &&
          !(D(s) && s.includes(r)) &&
          (t[o] = s ? [].concat(s, r) : r);
      } else o !== "" && (t[o] = i[o]);
  }
  return t;
}
function Ne(e, t, n, i = null) {
  Le(e, t, 7, [n, i]);
}
const Pa = nr();
let La = 0;
function Aa(e, t, n) {
  const i = e.type,
    o = (t ? t.appContext : e.appContext) || Pa,
    s = {
      uid: La++,
      vnode: e,
      type: i,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Wr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: or(i, o),
      emitsOptions: Ws(i, o),
      emit: null,
      emitted: null,
      propsDefaults: re,
      inheritAttrs: i.inheritAttrs,
      ctx: re,
      data: re,
      props: re,
      attrs: re,
      slots: re,
      refs: re,
      setupState: re,
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
    (s.emit = Ol.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let ge = null;
const Ve = () => ge || Pe;
let so,
  kt,
  Mo = "__VUE_INSTANCE_SETTERS__";
(kt = mi()[Mo]) || (kt = mi()[Mo] = []),
  kt.push((e) => (ge = e)),
  (so = (e) => {
    kt.length > 1 ? kt.forEach((t) => t(e)) : kt[0](e);
  });
const Rt = (e) => {
    so(e), e.scope.on();
  },
  bt = () => {
    ge && ge.scope.off(), so(null);
  };
function ur(e) {
  return e.vnode.shapeFlag & 4;
}
let ln = !1;
function Ma(e, t = !1) {
  ln = t;
  const { props: n, children: i } = e.vnode,
    o = ur(e);
  ca(e, n, o, t), da(e, i);
  const s = o ? Oa(e, t) : void 0;
  return (ln = !1), s;
}
function Oa(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Hn(new Proxy(e.ctx, ea)));
  const { setup: i } = n;
  if (i) {
    const o = (e.setupContext = i.length > 1 ? $a(e) : null);
    Rt(e), Nt();
    const s = it(i, e, 0, [e.props, o]);
    if ((Dt(), bt(), ws(s))) {
      if ((s.then(bt, bt), t))
        return s
          .then((r) => {
            Oo(e, r, t);
          })
          .catch((r) => {
            zn(r, e, 0);
          });
      e.asyncDep = s;
    } else Oo(e, s, t);
  } else fr(e, t);
}
function Oo(e, t, n) {
  K(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = js(t)),
    fr(e, n);
}
let Fo;
function fr(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && Fo && !i.render) {
      const o = i.template || to(e).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: r } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = i,
          u = fe(fe({ isCustomElement: s, delimiters: l }, r), a);
        i.render = Fo(o, u);
      }
    }
    e.render = i.render || qe;
  }
  Rt(e), Nt(), ta(e), Dt(), bt();
}
function Fa(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return xe(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function $a(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Fa(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Yn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(js(Hn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Zt) return Zt[n](e);
        },
        has(t, n) {
          return n in t || n in Zt;
        },
      }))
    );
}
function qa(e) {
  return K(e) && "__vccOpts" in e;
}
const H = (e, t) => kl(e, t, ln);
function X(e, t, n) {
  const i = arguments.length;
  return i === 2
    ? le(t) && !D(t)
      ? Mi(t)
        ? pe(e, null, [t])
        : pe(e, t)
      : pe(e, null, t)
    : (i > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : i === 3 && Mi(n) && (n = [n]),
      pe(e, t, n));
}
const Ra = Symbol.for("v-scx"),
  Ba = () => Tn(Ra),
  Ia = "3.3.4",
  Na = "http://www.w3.org/2000/svg",
  pt = typeof document < "u" ? document : null,
  $o = pt && pt.createElement("template"),
  Da = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, i) => {
      const o = t
        ? pt.createElementNS(Na, e)
        : pt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          i &&
          i.multiple != null &&
          o.setAttribute("multiple", i.multiple),
        o
      );
    },
    createText: (e) => pt.createTextNode(e),
    createComment: (e) => pt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => pt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, i, o, s) {
      const r = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        $o.innerHTML = i ? `<svg>${e}</svg>` : e;
        const l = $o.content;
        if (i) {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        r ? r.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function ja(e, t, n) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Ha(e, t, n) {
  const i = e.style,
    o = ae(n);
  if (n && !o) {
    if (t && !ae(t)) for (const s in t) n[s] == null && Oi(i, s, "");
    for (const s in n) Oi(i, s, n[s]);
  } else {
    const s = i.display;
    o ? t !== n && (i.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (i.display = s);
  }
}
const qo = /\s*!important$/;
function Oi(e, t, n) {
  if (D(n)) n.forEach((i) => Oi(e, t, i));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const i = za(e, t);
    qo.test(n)
      ? e.setProperty(It(i), n.replace(qo, ""), "important")
      : (e[i] = n);
  }
}
const Ro = ["Webkit", "Moz", "ms"],
  ai = {};
function za(e, t) {
  const n = ai[t];
  if (n) return n;
  let i = $t(t);
  if (i !== "filter" && i in e) return (ai[t] = i);
  i = Es(i);
  for (let o = 0; o < Ro.length; o++) {
    const s = Ro[o] + i;
    if (s in e) return (ai[t] = s);
  }
  return t;
}
const Bo = "http://www.w3.org/1999/xlink";
function Ka(e, t, n, i, o) {
  if (i && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Bo, t.slice(6, t.length))
      : e.setAttributeNS(Bo, t, n);
  else {
    const s = Ur(t);
    n == null || (s && !Ts(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function Ua(e, t, n, i, o, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    i && r(i, o, s), (e[t] = n ?? "");
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
      ? (n = Ts(n))
      : n == null && u === "string"
      ? ((n = ""), (a = !0))
      : u === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Wa(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function Va(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
function Qa(e, t, n, i, o = null) {
  const s = e._vei || (e._vei = {}),
    r = s[t];
  if (i && r) r.value = i;
  else {
    const [l, a] = Ya(t);
    if (i) {
      const u = (s[t] = Za(i, o));
      Wa(e, l, u, a);
    } else r && (Va(e, l, r, a), (s[t] = void 0));
  }
}
const Io = /(?:Once|Passive|Capture)$/;
function Ya(e) {
  let t;
  if (Io.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Io)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : It(e.slice(2)), t];
}
let ci = 0;
const Ja = Promise.resolve(),
  Xa = () => ci || (Ja.then(() => (ci = 0)), (ci = Date.now()));
function Za(e, t) {
  const n = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= n.attached) return;
    Le(Ga(i, n.value), t, 5, [i]);
  };
  return (n.value = e), (n.attached = Xa()), n;
}
function Ga(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((i) => (o) => !o._stopped && i && i(o))
    );
  } else return t;
}
const No = /^on[a-z]/,
  ec = (e, t, n, i, o = !1, s, r, l, a) => {
    t === "class"
      ? ja(e, i, o)
      : t === "style"
      ? Ha(e, n, i)
      : In(t)
      ? Bi(t) || Qa(e, t, n, i, r)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : tc(e, t, i, o)
        )
      ? Ua(e, t, i, s, r, l, a)
      : (t === "true-value"
          ? (e._trueValue = i)
          : t === "false-value" && (e._falseValue = i),
        Ka(e, t, i, o));
  };
function tc(e, t, n, i) {
  return i
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && No.test(t) && K(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (No.test(t) && ae(n))
    ? !1
    : t in e;
}
const Ge = "transition",
  Kt = "animation",
  an = (e, { slots: t }) => X(Hl, nc(e), t);
an.displayName = "Transition";
const dr = {
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
an.props = fe({}, Xs, dr);
const at = (e, t = []) => {
    D(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Do = (e) => (e ? (D(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function nc(e) {
  const t = {};
  for (const S in e) S in dr || (t[S] = e[S]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: i,
      duration: o,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: r = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = s,
      appearActiveClass: u = r,
      appearToClass: d = l,
      leaveFromClass: p = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: _ = `${n}-leave-to`,
    } = e,
    x = ic(o),
    E = x && x[0],
    P = x && x[1],
    {
      onBeforeEnter: I,
      onEnter: k,
      onEnterCancelled: j,
      onLeave: A,
      onLeaveCancelled: B,
      onBeforeAppear: V = I,
      onAppear: U = k,
      onAppearCancelled: M = j,
    } = t,
    O = (S, Q, L) => {
      ct(S, Q ? d : l), ct(S, Q ? u : r), L && L();
    },
    N = (S, Q) => {
      (S._isLeaving = !1), ct(S, p), ct(S, _), ct(S, h), Q && Q();
    },
    $ = (S) => (Q, L) => {
      const te = S ? U : k,
        ee = () => O(Q, S, L);
      at(te, [Q, ee]),
        jo(() => {
          ct(Q, S ? a : s), et(Q, S ? d : l), Do(te) || Ho(Q, i, E, ee);
        });
    };
  return fe(t, {
    onBeforeEnter(S) {
      at(I, [S]), et(S, s), et(S, r);
    },
    onBeforeAppear(S) {
      at(V, [S]), et(S, a), et(S, u);
    },
    onEnter: $(!1),
    onAppear: $(!0),
    onLeave(S, Q) {
      S._isLeaving = !0;
      const L = () => N(S, Q);
      et(S, p),
        rc(),
        et(S, h),
        jo(() => {
          S._isLeaving && (ct(S, p), et(S, _), Do(A) || Ho(S, i, P, L));
        }),
        at(A, [S, L]);
    },
    onEnterCancelled(S) {
      O(S, !1), at(j, [S]);
    },
    onAppearCancelled(S) {
      O(S, !0), at(M, [S]);
    },
    onLeaveCancelled(S) {
      N(S), at(B, [S]);
    },
  });
}
function ic(e) {
  if (e == null) return null;
  if (le(e)) return [ui(e.enter), ui(e.leave)];
  {
    const t = ui(e);
    return [t, t];
  }
}
function ui(e) {
  return Nr(e);
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
function jo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let oc = 0;
function Ho(e, t, n, i) {
  const o = (e._endId = ++oc),
    s = () => {
      o === e._endId && i();
    };
  if (n) return setTimeout(s, n);
  const { type: r, timeout: l, propCount: a } = sc(e, t);
  if (!r) return i();
  const u = r + "end";
  let d = 0;
  const p = () => {
      e.removeEventListener(u, h), s();
    },
    h = (_) => {
      _.target === e && ++d >= a && p();
    };
  setTimeout(() => {
    d < a && p();
  }, l + 1),
    e.addEventListener(u, h);
}
function sc(e, t) {
  const n = window.getComputedStyle(e),
    i = (x) => (n[x] || "").split(", "),
    o = i(`${Ge}Delay`),
    s = i(`${Ge}Duration`),
    r = zo(o, s),
    l = i(`${Kt}Delay`),
    a = i(`${Kt}Duration`),
    u = zo(l, a);
  let d = null,
    p = 0,
    h = 0;
  t === Ge
    ? r > 0 && ((d = Ge), (p = r), (h = s.length))
    : t === Kt
    ? u > 0 && ((d = Kt), (p = u), (h = a.length))
    : ((p = Math.max(r, u)),
      (d = p > 0 ? (r > u ? Ge : Kt) : null),
      (h = d ? (d === Ge ? s.length : a.length) : 0));
  const _ =
    d === Ge && /\b(transform|all)(,|$)/.test(i(`${Ge}Property`).toString());
  return { type: d, timeout: p, propCount: h, hasTransform: _ };
}
function zo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, i) => Ko(n) + Ko(e[i])));
}
function Ko(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function rc() {
  return document.body.offsetHeight;
}
const lc = fe({ patchProp: ec }, Da);
let Uo;
function ac() {
  return Uo || (Uo = pa(lc));
}
const cc = (...e) => {
  const t = ac().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (i) => {
      const o = uc(i);
      if (!o) return;
      const s = t._component;
      !K(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = "");
      const r = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        r
      );
    }),
    t
  );
};
function uc(e) {
  return ae(e) ? document.querySelector(e) : e;
}
function Jn(e, t, n, i) {
  return Object.defineProperty(e, t, { get: n, set: i, enumerable: !0 }), e;
}
const wt = he(!1);
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
const hr = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function hc(e) {
  (Xn = { is: { ...e } }), delete e.mac, delete e.desktop;
  const t =
    Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: !0, ios: !0, platform: t, [t]: !0 });
}
function pc(e) {
  const t = e.toLowerCase(),
    n = dc(t),
    i = fc(t, n),
    o = {};
  i.browser &&
    ((o[i.browser] = !0),
    (o.version = i.version),
    (o.versionNumber = parseInt(i.versionNumber, 10))),
    i.platform && (o[i.platform] = !0);
  const s =
    o.android ||
    o.ios ||
    o.bb ||
    o.blackberry ||
    o.ipad ||
    o.iphone ||
    o.ipod ||
    o.kindle ||
    o.playbook ||
    o.silk ||
    o["windows phone"];
  return (
    s === !0 || t.indexOf("mobile") > -1
      ? ((o.mobile = !0),
        o.edga || o.edgios
          ? ((o.edge = !0), (i.browser = "edge"))
          : o.crios
          ? ((o.chrome = !0), (i.browser = "chrome"))
          : o.fxios && ((o.firefox = !0), (i.browser = "firefox")))
      : (o.desktop = !0),
    (o.ipod || o.ipad || o.iphone) && (o.ios = !0),
    o["windows phone"] && ((o.winphone = !0), delete o["windows phone"]),
    (o.chrome ||
      o.opr ||
      o.safari ||
      o.vivaldi ||
      (o.mobile === !0 && o.ios !== !0 && s !== !0)) &&
      (o.webkit = !0),
    o.edg && ((i.browser = "edgechromium"), (o.edgeChromium = !0)),
    ((o.safari && o.blackberry) || o.bb) &&
      ((i.browser = "blackberry"), (o.blackberry = !0)),
    o.safari && o.playbook && ((i.browser = "playbook"), (o.playbook = !0)),
    o.opr && ((i.browser = "opera"), (o.opera = !0)),
    o.safari && o.android && ((i.browser = "android"), (o.android = !0)),
    o.safari && o.kindle && ((i.browser = "kindle"), (o.kindle = !0)),
    o.safari && o.silk && ((i.browser = "silk"), (o.silk = !0)),
    o.vivaldi && ((i.browser = "vivaldi"), (o.vivaldi = !0)),
    (o.name = i.browser),
    (o.platform = i.platform),
    t.indexOf("electron") > -1
      ? (o.electron = !0)
      : document.location.href.indexOf("-extension://") > -1
      ? (o.bex = !0)
      : (window.Capacitor !== void 0
          ? ((o.capacitor = !0),
            (o.nativeMobile = !0),
            (o.nativeMobileWrapper = "capacitor"))
          : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
            ((o.cordova = !0),
            (o.nativeMobile = !0),
            (o.nativeMobileWrapper = "cordova")),
        hr === !0 &&
          o.mac === !0 &&
          ((o.desktop === !0 && o.safari === !0) ||
            (o.nativeMobile === !0 &&
              o.android !== !0 &&
              o.ios !== !0 &&
              o.ipad !== !0)) &&
          hc(o)),
    o
  );
}
const Wo = navigator.userAgent || navigator.vendor || window.opera,
  gc = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  ue = {
    userAgent: Wo,
    is: pc(Wo),
    has: { touch: hr },
    within: { iframe: window.self !== window.top },
  },
  Fi = {
    install(e) {
      const { $q: t } = e;
      wt.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, ue), (wt.value = !1), (Xn = void 0);
          }),
          (t.platform = dn(this)))
        : (t.platform = this);
    },
  };
{
  let e;
  Jn(ue.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage) return (e = !0), !0;
    } catch {}
    return (e = !1), !1;
  }),
    ue.is.ios === !0 && window.navigator.vendor.toLowerCase().indexOf("apple"),
    wt.value === !0 ? Object.assign(Fi, ue, Xn, gc) : Object.assign(Fi, ue);
}
const Zn = (e, t) => {
    const n = dn(e);
    for (const i in e)
      Jn(
        t,
        i,
        () => n[i],
        (o) => {
          n[i] = o;
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
function pr(e) {
  e.stopPropagation();
}
function bc(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function ft(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function _c(e, t, n) {
  const i = `__q_${t}_evt`;
  (e[i] = e[i] !== void 0 ? e[i].concat(n) : n),
    n.forEach((o) => {
      o[0].addEventListener(o[1], e[o[2]], Se[o[3]]);
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
function wc(e, t = 250, n) {
  let i = null;
  function o() {
    const s = arguments,
      r = () => {
        (i = null), n !== !0 && e.apply(this, s);
      };
    i !== null ? clearTimeout(i) : n === !0 && e.apply(this, s),
      (i = setTimeout(r, t));
  }
  return (
    (o.cancel = () => {
      i !== null && clearTimeout(i);
    }),
    o
  );
}
const fi = ["sm", "md", "lg", "xl"],
  { passive: Vo } = Se,
  xc = Zn(
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
          o = document.scrollingElement || document.documentElement,
          s =
            n === void 0 || ue.is.mobile === !0
              ? () => [
                  Math.max(window.innerWidth, o.clientWidth),
                  Math.max(window.innerHeight, o.clientHeight),
                ]
              : () => [
                  n.width * n.scale + window.innerWidth - o.clientWidth,
                  n.height * n.scale + window.innerHeight - o.clientHeight,
                ],
          r = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0;
        this.__update = (p) => {
          const [h, _] = s();
          if ((_ !== this.height && (this.height = _), h !== this.width))
            this.width = h;
          else if (p !== !0) return;
          let x = this.sizes;
          (this.gt.xs = h >= x.sm),
            (this.gt.sm = h >= x.md),
            (this.gt.md = h >= x.lg),
            (this.gt.lg = h >= x.xl),
            (this.lt.sm = h < x.sm),
            (this.lt.md = h < x.md),
            (this.lt.lg = h < x.lg),
            (this.lt.xl = h < x.xl),
            (this.xs = this.lt.sm),
            (this.sm = this.gt.xs === !0 && this.lt.md === !0),
            (this.md = this.gt.sm === !0 && this.lt.lg === !0),
            (this.lg = this.gt.md === !0 && this.lt.xl === !0),
            (this.xl = this.gt.lg),
            (x =
              (this.xs === !0 && "xs") ||
              (this.sm === !0 && "sm") ||
              (this.md === !0 && "md") ||
              (this.lg === !0 && "lg") ||
              "xl"),
            x !== this.name &&
              (r === !0 &&
                (document.body.classList.remove(`screen--${this.name}`),
                document.body.classList.add(`screen--${x}`)),
              (this.name = x));
        };
        let l,
          a = {},
          u = 16;
        (this.setSizes = (p) => {
          fi.forEach((h) => {
            p[h] !== void 0 && (a[h] = p[h]);
          });
        }),
          (this.setDebounce = (p) => {
            u = p;
          });
        const d = () => {
          const p = getComputedStyle(document.body);
          p.getPropertyValue("--q-size-sm") &&
            fi.forEach((h) => {
              this.sizes[h] = parseInt(p.getPropertyValue(`--q-size-${h}`), 10);
            }),
            (this.setSizes = (h) => {
              fi.forEach((_) => {
                h[_] && (this.sizes[_] = h[_]);
              }),
                this.__update(!0);
            }),
            (this.setDebounce = (h) => {
              l !== void 0 && i.removeEventListener("resize", l, Vo),
                (l = h > 0 ? wc(this.__update, h) : this.__update),
                i.addEventListener("resize", l, Vo);
            }),
            this.setDebounce(u),
            Object.keys(a).length !== 0
              ? (this.setSizes(a), (a = void 0))
              : this.__update(),
            r === !0 &&
              this.name === "xs" &&
              document.body.classList.add("screen--xs");
        };
        wt.value === !0 ? t.push(d) : d();
      },
    }
  ),
  me = Zn(
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
        const o = i !== void 0 ? i : !1;
        if (wt.value === !0) {
          const s = (l) => {
              this.__fromSSR = l;
            },
            r = this.set;
          (this.set = s),
            s(o),
            t.push(() => {
              (this.set = r), this.set(this.__fromSSR);
            });
        } else this.set(o);
      },
    }
  ),
  gr = () => !0;
function Cc(e) {
  return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function Ec(e) {
  return (
    e.startsWith("#") === !0 && (e = e.substring(1)),
    e.startsWith("/") === !1 && (e = "/" + e),
    e.endsWith("/") === !0 && (e = e.substring(0, e.length - 1)),
    "#" + e
  );
}
function Tc(e) {
  if (e.backButtonExit === !1) return () => !1;
  if (e.backButtonExit === "*") return gr;
  const t = ["#/"];
  return (
    Array.isArray(e.backButtonExit) === !0 &&
      t.push(...e.backButtonExit.filter(Cc).map(Ec)),
    () => t.includes(window.location.hash)
  );
}
const $i = {
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
      (this.add = (r) => {
        r.condition === void 0 && (r.condition = gr), this.__history.push(r);
      }),
        (this.remove = (r) => {
          const l = this.__history.indexOf(r);
          l >= 0 && this.__history.splice(l, 1);
        });
      const o = Tc(Object.assign({ backButtonExit: !0 }, i)),
        s = () => {
          if (this.__history.length) {
            const r = this.__history[this.__history.length - 1];
            r.condition() === !0 && (this.__history.pop(), r.handler());
          } else o() === !0 ? navigator.app.exitApp() : window.history.back();
        };
      t === !0
        ? document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", s, !1);
          })
        : window.Capacitor.Plugins.App.addListener("backButton", s);
    },
  },
  Qo = {
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
function Yo() {
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
const Oe = Zn(
  { __langPack: {} },
  {
    getLocale: Yo,
    set(e = Qo, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: Yo };
      {
        if (
          ((n.set = Oe.set),
          Oe.__langConfig === void 0 || Oe.__langConfig.noHtmlAttrs !== !0)
        ) {
          const i = document.documentElement;
          i.setAttribute("dir", n.rtl === !0 ? "rtl" : "ltr"),
            i.setAttribute("lang", n.isoName);
        }
        Object.assign(Oe.__langPack, n),
          (Oe.props = n),
          (Oe.isoName = n.isoName),
          (Oe.nativeName = n.nativeName);
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      (e.lang = Oe.__langPack),
        (Oe.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : this.set(t || Qo);
    },
  }
);
function kc(e, t, n = document.body) {
  if (typeof e != "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t != "string") throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t);
}
let mr = !1;
function Sc(e) {
  mr = e.isComposing === !0;
}
function Pc(e) {
  return (
    mr === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
  );
}
function un(e, t) {
  return Pc(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
function vr(e) {
  if (e.ios === !0) return "ios";
  if (e.android === !0) return "android";
}
function Lc({ is: e, has: t, within: n }, i) {
  const o = [
    e.desktop === !0 ? "desktop" : "mobile",
    `${t.touch === !1 ? "no-" : ""}touch`,
  ];
  if (e.mobile === !0) {
    const s = vr(e);
    s !== void 0 && o.push("platform-" + s);
  }
  if (e.nativeMobile === !0) {
    const s = e.nativeMobileWrapper;
    o.push(s),
      o.push("native-mobile"),
      e.ios === !0 &&
        (i[s] === void 0 || i[s].iosStatusBarPadding !== !1) &&
        o.push("q-ios-padding");
  } else e.electron === !0 ? o.push("electron") : e.bex === !0 && o.push("bex");
  return n.iframe === !0 && o.push("within-iframe"), o;
}
function Ac() {
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
      const o = vr(e);
      o !== void 0
        ? (n.add(`platform-${o}`),
          n.delete(`platform-${o === "ios" ? "android" : "ios"}`))
        : (n.delete("platform-ios"), n.delete("platform-android"));
    }
  }
  ue.has.touch === !0 && (n.delete("no-touch"), n.add("touch")),
    ue.within.iframe === !0 && n.add("within-iframe");
  const i = Array.from(n).join(" ");
  t !== i && (document.body.className = i);
}
function Mc(e) {
  for (const t in e) kc(t, e[t]);
}
const Oc = {
    install(e) {
      if (this.__installed !== !0) {
        if (wt.value === !0) Ac();
        else {
          const { $q: t } = e;
          t.config.brand !== void 0 && Mc(t.config.brand);
          const n = Lc(ue, t.config);
          document.body.classList.add.apply(document.body.classList, n);
        }
        ue.is.ios === !0 && document.body.addEventListener("touchstart", cn),
          window.addEventListener("keydown", Sc, !0);
      }
    },
  },
  Fc = {
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
  Rn = Zn(
    { iconMapFn: null, __icons: {} },
    {
      set(e, t) {
        const n = { ...e, rtl: e.rtl === !0 };
        (n.set = Rn.set), Object.assign(Rn.__icons, n);
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__icons),
          Jn(
            e,
            "iconMapFn",
            () => this.iconMapFn,
            (i) => {
              this.iconMapFn = i;
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : this.set(t || Fc);
      },
    }
  ),
  $c = "_q_",
  Bn = {};
let br = !1;
function qc() {
  br = !0;
}
function Jo(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
const Xo = [Fi, Oc, me, xc, $i, Oe, Rn];
function Zo(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0);
  });
}
function Rc(e, t, n) {
  (e.config.globalProperties.$q = n.$q),
    e.provide($c, n.$q),
    Zo(n, Xo),
    t.components !== void 0 &&
      Object.values(t.components).forEach((i) => {
        Jo(i) === !0 && i.name !== void 0 && e.component(i.name, i);
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((i) => {
        Jo(i) === !0 && i.name !== void 0 && e.directive(i.name, i);
      }),
    t.plugins !== void 0 &&
      Zo(
        n,
        Object.values(t.plugins).filter(
          (i) => typeof i.install == "function" && Xo.includes(i) === !1
        )
      ),
    wt.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((i) => {
          i();
        }),
          (n.$q.onSSRHydrated = () => {});
      });
}
const Bc = function (e, t = {}) {
    const n = { version: "2.12.6" };
    br === !1
      ? (t.config !== void 0 && Object.assign(Bn, t.config),
        (n.config = { ...Bn }),
        qc())
      : (n.config = t.config || {}),
      Rc(e, t, {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: [],
      });
  },
  Ic = { version: "2.12.6", install: Bc, lang: Oe, iconSet: Rn };
const Ct = (e) => Hn(zl(e)),
  _r = (e) => Hn(e),
  Nc = X("div", { class: "q-space" }),
  Dc = Ct({
    name: "QSpace",
    setup() {
      return () => Nc;
    },
  }),
  qi = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  yr = { size: String };
function wr(e, t = qi) {
  return H(() =>
    e.size !== void 0
      ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
      : null
  );
}
function Gn(e, t) {
  return (e !== void 0 && e()) || t;
}
function Yt(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
const Go = "0 0 24 24",
  es = (e) => e,
  di = (e) => `ionicons ${e}`,
  xr = {
    "mdi-": (e) => `mdi ${e}`,
    "icon-": es,
    "bt-": (e) => `bt ${e}`,
    "eva-": (e) => `eva ${e}`,
    "ion-md": di,
    "ion-ios": di,
    "ion-logo": di,
    "iconfont ": es,
    "ti-": (e) => `themify-icon ${e}`,
    "bi-": (e) => `bootstrap-icons ${e}`,
  },
  Cr = { o_: "-outlined", r_: "-round", s_: "-sharp" },
  Er = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" },
  jc = new RegExp("^(" + Object.keys(xr).join("|") + ")"),
  Hc = new RegExp("^(" + Object.keys(Cr).join("|") + ")"),
  ts = new RegExp("^(" + Object.keys(Er).join("|") + ")"),
  zc = /^[Mm]\s?[-+]?\.?\d/,
  Kc = /^img:/,
  Uc = /^svguse:/,
  Wc = /^ion-/,
  Vc = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /,
  ns = Ct({
    name: "QIcon",
    props: {
      ...yr,
      tag: { type: String, default: "i" },
      name: String,
      color: String,
      left: Boolean,
      right: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Ve(),
        i = wr(e),
        o = H(
          () =>
            "q-icon" +
            (e.left === !0 ? " on-left" : "") +
            (e.right === !0 ? " on-right" : "") +
            (e.color !== void 0 ? ` text-${e.color}` : "")
        ),
        s = H(() => {
          let r,
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
          if (zc.test(l) === !0) {
            const [d, p = Go] = l.split("|");
            return {
              svg: !0,
              viewBox: p,
              nodes: d.split("&&").map((h) => {
                const [_, x, E] = h.split("@@");
                return X("path", { style: x, d: _, transform: E });
              }),
            };
          }
          if (Kc.test(l) === !0) return { img: !0, src: l.substring(4) };
          if (Uc.test(l) === !0) {
            const [d, p = Go] = l.split("|");
            return { svguse: !0, src: d.substring(7), viewBox: p };
          }
          let a = " ";
          const u = l.match(jc);
          if (u !== null) r = xr[u[1]](l);
          else if (Vc.test(l) === !0) r = l;
          else if (Wc.test(l) === !0)
            r = `ionicons ion-${
              n.platform.is.ios === !0 ? "ios" : "md"
            }${l.substring(3)}`;
          else if (ts.test(l) === !0) {
            r = "notranslate material-symbols";
            const d = l.match(ts);
            d !== null && ((l = l.substring(6)), (r += Er[d[1]])), (a = l);
          } else {
            r = "notranslate material-icons";
            const d = l.match(Hc);
            d !== null && ((l = l.substring(2)), (r += Cr[d[1]])), (a = l);
          }
          return { cls: r, content: a };
        });
      return () => {
        const r = {
          class: o.value,
          style: i.value,
          "aria-hidden": "true",
          role: "presentation",
        };
        return s.value.none === !0
          ? X(e.tag, r, Gn(t.default))
          : s.value.img === !0
          ? X("span", r, Yt(t.default, [X("img", { src: s.value.src })]))
          : s.value.svg === !0
          ? X(
              "span",
              r,
              Yt(t.default, [
                X(
                  "svg",
                  { viewBox: s.value.viewBox || "0 0 24 24" },
                  s.value.nodes
                ),
              ])
            )
          : s.value.svguse === !0
          ? X(
              "span",
              r,
              Yt(t.default, [
                X("svg", { viewBox: s.value.viewBox }, [
                  X("use", { "xlink:href": s.value.src }),
                ]),
              ])
            )
          : (s.value.cls !== void 0 && (r.class += " " + s.value.cls),
            X(e.tag, r, Yt(t.default, [s.value.content])));
      };
    },
  }),
  Qc = { size: { type: [Number, String], default: "1em" }, color: String };
function Yc(e) {
  return {
    cSize: H(() => (e.size in qi ? `${qi[e.size]}px` : e.size)),
    classes: H(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")),
  };
}
const Jc = Ct({
  name: "QSpinner",
  props: { ...Qc, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = Yc(e);
    return () =>
      X(
        "svg",
        {
          class: n.value + " q-spinner-mat",
          width: t.value,
          height: t.value,
          viewBox: "25 25 50 50",
        },
        [
          X("circle", {
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
function Xc(e, t) {
  const n = e.style;
  for (const i in t) n[i] = t[i];
}
function Zc(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1;
}
function Gc(e, t = 250) {
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
function is(e, t, n, i) {
  n.modifiers.stop === !0 && pr(e);
  const o = n.modifiers.color;
  let s = n.modifiers.center;
  s = s === !0 || i === !0;
  const r = document.createElement("span"),
    l = document.createElement("span"),
    a = mc(e),
    { left: u, top: d, width: p, height: h } = t.getBoundingClientRect(),
    _ = Math.sqrt(p * p + h * h),
    x = _ / 2,
    E = `${(p - _) / 2}px`,
    P = s ? E : `${a.left - u - x}px`,
    I = `${(h - _) / 2}px`,
    k = s ? I : `${a.top - d - x}px`;
  (l.className = "q-ripple__inner"),
    Xc(l, {
      height: `${_}px`,
      width: `${_}px`,
      transform: `translate3d(${P},${k},0) scale3d(.2,.2,1)`,
      opacity: 0,
    }),
    (r.className = `q-ripple${o ? " text-" + o : ""}`),
    r.setAttribute("dir", "ltr"),
    r.appendChild(l),
    t.appendChild(r);
  const j = () => {
    r.remove(), clearTimeout(A);
  };
  n.abort.push(j);
  let A = setTimeout(() => {
    l.classList.add("q-ripple__inner--enter"),
      (l.style.transform = `translate3d(${E},${I},0) scale3d(1,1,1)`),
      (l.style.opacity = 0.2),
      (A = setTimeout(() => {
        l.classList.remove("q-ripple__inner--enter"),
          l.classList.add("q-ripple__inner--leave"),
          (l.style.opacity = 0),
          (A = setTimeout(() => {
            r.remove(), n.abort.splice(n.abort.indexOf(j), 1);
          }, 275));
      }, 250));
  }, 50);
}
function os(e, { modifiers: t, value: n, arg: i }) {
  const o = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: o.early === !0,
    stop: o.stop === !0,
    center: o.center === !0,
    color: o.color || i,
    keyCodes: [].concat(o.keyCodes || 13),
  };
}
const eu = _r({
    name: "ripple",
    beforeMount(e, t) {
      const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
      if (n.ripple === !1) return;
      const i = {
        cfg: n,
        enabled: t.value !== !1,
        modifiers: {},
        abort: [],
        start(o) {
          i.enabled === !0 &&
            o.qSkipRipple !== !0 &&
            o.type === (i.modifiers.early === !0 ? "pointerdown" : "click") &&
            is(o, e, i, o.qKeyEvent === !0);
        },
        keystart: Gc((o) => {
          i.enabled === !0 &&
            o.qSkipRipple !== !0 &&
            un(o, i.modifiers.keyCodes) === !0 &&
            o.type === `key${i.modifiers.early === !0 ? "down" : "up"}` &&
            is(o, e, i, !0);
        }, 300),
      };
      os(i, t),
        (e.__qripple = i),
        _c(i, "main", [
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
          n.enabled === !0 && Object(t.value) === t.value && os(n, t));
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
  Tr = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch",
  },
  tu = Object.keys(Tr),
  nu = { align: { type: String, validator: (e) => tu.includes(e) } };
function iu(e) {
  return H(() => {
    const t =
      e.align === void 0 ? (e.vertical === !0 ? "stretch" : "left") : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${Tr[t]}`;
  });
}
function Pn(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function kr(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function Sr(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function ss(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
function rs(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ou(e, t) {
  for (const n in t) {
    const i = t[n],
      o = e[n];
    if (typeof i == "string") {
      if (i !== o) return !1;
    } else if (
      Array.isArray(o) === !1 ||
      o.length !== i.length ||
      i.some((s, r) => s !== o[r])
    )
      return !1;
  }
  return !0;
}
function ls(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, i) => n === t[i])
    : e.length === 1 && e[0] === t;
}
function su(e, t) {
  return Array.isArray(e) === !0
    ? ls(e, t)
    : Array.isArray(t) === !0
    ? ls(t, e)
    : e === t;
}
function ru(e, t) {
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
  const n = Ve(),
    { props: i, proxy: o, emit: s } = n,
    r = kr(n),
    l = H(() => i.disable !== !0 && i.href !== void 0),
    a = H(
      t === !0
        ? () =>
            r === !0 &&
            i.disable !== !0 &&
            l.value !== !0 &&
            i.to !== void 0 &&
            i.to !== null &&
            i.to !== ""
        : () =>
            r === !0 &&
            l.value !== !0 &&
            i.to !== void 0 &&
            i.to !== null &&
            i.to !== ""
    ),
    u = H(() => (a.value === !0 ? k(i.to) : null)),
    d = H(() => u.value !== null),
    p = H(() => l.value === !0 || d.value === !0),
    h = H(() => (i.type === "a" || p.value === !0 ? "a" : i.tag || e || "div")),
    _ = H(() =>
      l.value === !0
        ? { href: i.href, target: i.target }
        : d.value === !0
        ? { href: u.value.href, target: i.target }
        : {}
    ),
    x = H(() => {
      if (d.value === !1) return -1;
      const { matched: B } = u.value,
        { length: V } = B,
        U = B[V - 1];
      if (U === void 0) return -1;
      const M = o.$route.matched;
      if (M.length === 0) return -1;
      const O = M.findIndex(rs.bind(null, U));
      if (O > -1) return O;
      const N = ss(B[V - 2]);
      return V > 1 && ss(U) === N && M[M.length - 1].path !== N
        ? M.findIndex(rs.bind(null, B[V - 2]))
        : O;
    }),
    E = H(
      () =>
        d.value === !0 && x.value !== -1 && ou(o.$route.params, u.value.params)
    ),
    P = H(
      () =>
        E.value === !0 &&
        x.value === o.$route.matched.length - 1 &&
        ru(o.$route.params, u.value.params)
    ),
    I = H(() =>
      d.value === !0
        ? P.value === !0
          ? ` ${i.exactActiveClass} ${i.activeClass}`
          : i.exact === !0
          ? ""
          : E.value === !0
          ? ` ${i.activeClass}`
          : ""
        : ""
    );
  function k(B) {
    try {
      return o.$router.resolve(B);
    } catch {}
    return null;
  }
  function j(
    B,
    { returnRouterError: V, to: U = i.to, replace: M = i.replace } = {}
  ) {
    if (i.disable === !0) return B.preventDefault(), Promise.resolve(!1);
    if (
      B.metaKey ||
      B.altKey ||
      B.ctrlKey ||
      B.shiftKey ||
      (B.button !== void 0 && B.button !== 0) ||
      i.target === "_blank"
    )
      return Promise.resolve(!1);
    B.preventDefault();
    const O = o.$router[M === !0 ? "replace" : "push"](U);
    return V === !0 ? O : O.then(() => {}).catch(() => {});
  }
  function A(B) {
    if (d.value === !0) {
      const V = (U) => j(B, U);
      s("click", B, V), B.defaultPrevented !== !0 && V();
    } else s("click", B);
  }
  return {
    hasRouterLink: d,
    hasHrefLink: l,
    hasLink: p,
    linkTag: h,
    resolvedLink: u,
    linkIsActive: E,
    linkIsExactActive: P,
    linkClass: I,
    linkAttrs: _,
    getLink: k,
    navigateToRouterLink: j,
    navigateOnClick: A,
  };
}
const as = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
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
  pu = {
    ...yr,
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
function gu(e) {
  const t = wr(e, cu),
    n = iu(e),
    {
      hasRouterLink: i,
      hasLink: o,
      linkTag: s,
      linkAttrs: r,
      navigateOnClick: l,
    } = au({ fallbackTag: "button" }),
    a = H(() => {
      const P = e.fab === !1 && e.fabMini === !1 ? t.value : {};
      return e.padding !== void 0
        ? Object.assign({}, P, {
            padding: e.padding
              .split(/\s+/)
              .map((I) => (I in as ? as[I] + "px" : I))
              .join(" "),
            minWidth: "0",
            minHeight: "0",
          })
        : P;
    }),
    u = H(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    d = H(() => e.disable !== !0 && e.loading !== !0),
    p = H(() => (d.value === !0 ? e.tabindex || 0 : -1)),
    h = H(() => hu(e, "standard")),
    _ = H(() => {
      const P = { tabindex: p.value };
      return (
        o.value === !0
          ? Object.assign(P, r.value)
          : uu.includes(e.type) === !0 && (P.type = e.type),
        s.value === "a"
          ? (e.disable === !0
              ? (P["aria-disabled"] = "true")
              : P.href === void 0 && (P.role = "button"),
            i.value !== !0 && fu.test(e.type) === !0 && (P.type = e.type))
          : e.disable === !0 &&
            ((P.disabled = ""), (P["aria-disabled"] = "true")),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(P, {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.percentage,
          }),
        P
      );
    }),
    x = H(() => {
      let P;
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (P = `text-${e.textColor || e.color}`)
          : (P = `bg-${e.color} text-${e.textColor || "white"}`)
        : e.textColor && (P = `text-${e.textColor}`);
      const I =
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
        `q-btn--${h.value} q-btn--${I}` +
        (P !== void 0 ? " " + P : "") +
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
    E = H(
      () =>
        n.value +
        (e.stack === !0 ? " column" : " row") +
        (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") +
        (e.loading === !0 ? " q-btn__content--hidden" : "")
    );
  return {
    classes: x,
    style: a,
    innerClasses: E,
    attributes: _,
    hasLink: o,
    linkTag: s,
    navigateOnClick: l,
    isActionable: d,
  };
}
const { passiveCapture: ke } = Se;
let St = null,
  Pt = null,
  Lt = null;
const mu = Ct({
    name: "QBtn",
    props: {
      ...pu,
      percentage: Number,
      darkPercentage: Boolean,
      onTouchstart: [Function, Array],
    },
    emits: ["click", "keydown", "mousedown", "keyup"],
    setup(e, { slots: t, emit: n }) {
      const { proxy: i } = Ve(),
        {
          classes: o,
          style: s,
          innerClasses: r,
          attributes: l,
          hasLink: a,
          linkTag: u,
          navigateOnClick: d,
          isActionable: p,
        } = gu(e),
        h = he(null),
        _ = he(null);
      let x = null,
        E,
        P = null;
      const I = H(
          () => e.label !== void 0 && e.label !== null && e.label !== ""
        ),
        k = H(() =>
          e.disable === !0 || e.ripple === !1
            ? !1
            : {
                keyCodes: a.value === !0 ? [13, 32] : [13],
                ...(e.ripple === !0 ? {} : e.ripple),
              }
        ),
        j = H(() => ({ center: e.round })),
        A = H(() => {
          const L = Math.max(0, Math.min(100, e.percentage));
          return L > 0
            ? {
                transition: "transform 0.6s",
                transform: `translateX(${L - 100}%)`,
              }
            : {};
        }),
        B = H(() => {
          if (e.loading === !0)
            return {
              onMousedown: Q,
              onTouchstart: Q,
              onClick: Q,
              onKeydown: Q,
              onKeyup: Q,
            };
          if (p.value === !0) {
            const L = { onClick: U, onKeydown: M, onMousedown: N };
            if (i.$q.platform.has.touch === !0) {
              const te = e.onTouchstart !== void 0 ? "" : "Passive";
              L[`onTouchstart${te}`] = O;
            }
            return L;
          }
          return { onClick: ft };
        }),
        V = H(() => ({
          ref: h,
          class: "q-btn q-btn-item non-selectable no-outline " + o.value,
          style: s.value,
          ...l.value,
          ...B.value,
        }));
      function U(L) {
        if (h.value !== null) {
          if (L !== void 0) {
            if (L.defaultPrevented === !0) return;
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
                  document.removeEventListener("keyup", ee, ke),
                  h.value !== null &&
                    h.value.removeEventListener("blur", ee, ke);
              };
              document.addEventListener("keydown", ft, !0),
                document.addEventListener("keyup", ee, ke),
                h.value.addEventListener("blur", ee, ke);
            }
          }
          d(L);
        }
      }
      function M(L) {
        h.value !== null &&
          (n("keydown", L),
          un(L, [13, 32]) === !0 &&
            Pt !== h.value &&
            (Pt !== null && S(),
            L.defaultPrevented !== !0 &&
              (h.value.focus(),
              (Pt = h.value),
              h.value.classList.add("q-btn--active"),
              document.addEventListener("keyup", $, !0),
              h.value.addEventListener("blur", $, ke)),
            ft(L)));
      }
      function O(L) {
        h.value !== null &&
          (n("touchstart", L),
          L.defaultPrevented !== !0 &&
            (St !== h.value &&
              (St !== null && S(),
              (St = h.value),
              (x = L.target),
              x.addEventListener("touchcancel", $, ke),
              x.addEventListener("touchend", $, ke)),
            (E = !0),
            P !== null && clearTimeout(P),
            (P = setTimeout(() => {
              (P = null), (E = !1);
            }, 200))));
      }
      function N(L) {
        h.value !== null &&
          ((L.qSkipRipple = E === !0),
          n("mousedown", L),
          L.defaultPrevented !== !0 &&
            Lt !== h.value &&
            (Lt !== null && S(),
            (Lt = h.value),
            h.value.classList.add("q-btn--active"),
            document.addEventListener("mouseup", $, ke)));
      }
      function $(L) {
        if (
          h.value !== null &&
          !(
            L !== void 0 &&
            L.type === "blur" &&
            document.activeElement === h.value
          )
        ) {
          if (L !== void 0 && L.type === "keyup") {
            if (Pt === h.value && un(L, [13, 32]) === !0) {
              const te = new MouseEvent("click", L);
              (te.qKeyEvent = !0),
                L.defaultPrevented === !0 && bc(te),
                L.cancelBubble === !0 && pr(te),
                h.value.dispatchEvent(te),
                ft(L),
                (L.qKeyEvent = !0);
            }
            n("keyup", L);
          }
          S();
        }
      }
      function S(L) {
        const te = _.value;
        L !== !0 &&
          (St === h.value || Lt === h.value) &&
          te !== null &&
          te !== document.activeElement &&
          (te.setAttribute("tabindex", -1), te.focus()),
          St === h.value &&
            (x !== null &&
              (x.removeEventListener("touchcancel", $, ke),
              x.removeEventListener("touchend", $, ke)),
            (St = x = null)),
          Lt === h.value &&
            (document.removeEventListener("mouseup", $, ke), (Lt = null)),
          Pt === h.value &&
            (document.removeEventListener("keyup", $, !0),
            h.value !== null && h.value.removeEventListener("blur", $, ke),
            (Pt = null)),
          h.value !== null && h.value.classList.remove("q-btn--active");
      }
      function Q(L) {
        ft(L), (L.qSkipRipple = !0);
      }
      return (
        xt(() => {
          S(!0);
        }),
        Object.assign(i, { click: U }),
        () => {
          let L = [];
          e.icon !== void 0 &&
            L.push(
              X(ns, {
                name: e.icon,
                left: e.stack === !1 && I.value === !0,
                role: "img",
                "aria-hidden": "true",
              })
            ),
            I.value === !0 && L.push(X("span", { class: "block" }, [e.label])),
            (L = Yt(t.default, L)),
            e.iconRight !== void 0 &&
              e.round === !1 &&
              L.push(
                X(ns, {
                  name: e.iconRight,
                  right: e.stack === !1 && I.value === !0,
                  role: "img",
                  "aria-hidden": "true",
                })
              );
          const te = [X("span", { class: "q-focus-helper", ref: _ })];
          return (
            e.loading === !0 &&
              e.percentage !== void 0 &&
              te.push(
                X(
                  "span",
                  {
                    class:
                      "q-btn__progress absolute-full overflow-hidden" +
                      (e.darkPercentage === !0 ? " q-btn__progress--dark" : ""),
                  },
                  [
                    X("span", {
                      class: "q-btn__progress-indicator fit block",
                      style: A.value,
                    }),
                  ]
                )
              ),
            te.push(
              X(
                "span",
                {
                  class:
                    "q-btn__content text-center col items-center q-anchor--skip " +
                    r.value,
                },
                L
              )
            ),
            e.loading !== null &&
              te.push(
                X(an, { name: "q-transition--fade" }, () =>
                  e.loading === !0
                    ? [
                        X(
                          "span",
                          {
                            key: "loading",
                            class: "absolute-full flex flex-center",
                          },
                          t.loading !== void 0 ? t.loading() : [X(Jc)]
                        ),
                      ]
                    : null
                )
              ),
            Js(X(u.value, V.value, te), [[eu, k.value, void 0, j.value]])
          );
        }
      );
    },
  }),
  cs = Ct({
    name: "QCardSection",
    props: { tag: { type: String, default: "div" }, horizontal: Boolean },
    setup(e, { slots: t }) {
      const n = H(
        () =>
          `q-card__section q-card__section--${
            e.horizontal === !0 ? "horiz row no-wrap" : "vert"
          }`
      );
      return () => X(e.tag, { class: n.value }, Gn(t.default));
    },
  }),
  vu = { dark: { type: Boolean, default: null } };
function bu(e, t) {
  return H(() => (e.dark === null ? t.dark.isActive : e.dark));
}
const _u = Ct({
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
      } = Ve(),
      i = bu(e, n),
      o = H(
        () =>
          "q-card" +
          (i.value === !0 ? " q-card--dark q-dark" : "") +
          (e.bordered === !0 ? " q-card--bordered" : "") +
          (e.square === !0 ? " q-card--square no-border-radius" : "") +
          (e.flat === !0 ? " q-card--flat no-shadow" : "")
      );
    return () => X(e.tag, { class: o.value }, Gn(t.default));
  },
});
function yu(e, t, n) {
  let i;
  function o() {
    i !== void 0 && ($i.remove(i), (i = void 0));
  }
  return (
    xt(() => {
      e.value === !0 && o();
    }),
    {
      removeFromHistory: o,
      addToHistory() {
        (i = { condition: () => n.value === !0, handler: t }), $i.add(i);
      },
    }
  );
}
function wu() {
  let e = null;
  const t = Ve();
  function n() {
    e !== null && (clearTimeout(e), (e = null));
  }
  return (
    Zi(n),
    xt(n),
    {
      removeTimeout: n,
      registerTimeout(i, o) {
        n(), Sr(t) === !1 && (e = setTimeout(i, o));
      },
    }
  );
}
function xu() {
  let e;
  const t = Ve();
  function n() {
    e = void 0;
  }
  return (
    Zi(n),
    xt(n),
    {
      removeTick: n,
      registerTick(i) {
        (e = i),
          On(() => {
            e === i && (Sr(t) === !1 && e(), (e = void 0));
          });
      },
    }
  );
}
const Cu = {
    modelValue: { type: Boolean, default: null },
    "onUpdate:modelValue": [Function, Array],
  },
  Eu = ["beforeShow", "show", "beforeHide", "hide"];
function Tu({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: i,
  handleHide: o,
  processOnMount: s,
}) {
  const r = Ve(),
    { props: l, emit: a, proxy: u } = r;
  let d;
  function p(k) {
    e.value === !0 ? x(k) : h(k);
  }
  function h(k) {
    if (
      l.disable === !0 ||
      (k !== void 0 && k.qAnchorHandled === !0) ||
      (t !== void 0 && t(k) !== !0)
    )
      return;
    const j = l["onUpdate:modelValue"] !== void 0;
    j === !0 &&
      (a("update:modelValue", !0),
      (d = k),
      On(() => {
        d === k && (d = void 0);
      })),
      (l.modelValue === null || j === !1) && _(k);
  }
  function _(k) {
    e.value !== !0 &&
      ((e.value = !0), a("beforeShow", k), i !== void 0 ? i(k) : a("show", k));
  }
  function x(k) {
    if (l.disable === !0) return;
    const j = l["onUpdate:modelValue"] !== void 0;
    j === !0 &&
      (a("update:modelValue", !1),
      (d = k),
      On(() => {
        d === k && (d = void 0);
      })),
      (l.modelValue === null || j === !1) && E(k);
  }
  function E(k) {
    e.value !== !1 &&
      ((e.value = !1), a("beforeHide", k), o !== void 0 ? o(k) : a("hide", k));
  }
  function P(k) {
    l.disable === !0 && k === !0
      ? l["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !1)
      : (k === !0) !== e.value && (k === !0 ? _ : E)(d);
  }
  vt(() => l.modelValue, P),
    n !== void 0 &&
      kr(r) === !0 &&
      vt(
        () => u.$route.fullPath,
        () => {
          n.value === !0 && e.value === !0 && x();
        }
      ),
    s === !0 &&
      Gi(() => {
        P(l.modelValue);
      });
  const I = { show: h, hide: x, toggle: p };
  return Object.assign(u, I), I;
}
const ku = {
  transitionShow: { type: String, default: "fade" },
  transitionHide: { type: String, default: "fade" },
  transitionDuration: { type: [String, Number], default: 300 },
};
function Su(e, t = () => {}, n = () => {}) {
  return {
    transitionProps: H(() => {
      const i = `q-transition--${e.transitionShow || t()}`,
        o = `q-transition--${e.transitionHide || n()}`;
      return {
        appear: !0,
        enterFromClass: `${i}-enter-from`,
        enterActiveClass: `${i}-enter-active`,
        enterToClass: `${i}-enter-to`,
        leaveFromClass: `${o}-leave-from`,
        leaveActiveClass: `${o}-leave-active`,
        leaveToClass: `${o}-leave-to`,
      };
    }),
    transitionStyle: H(
      () => `--q-transition-duration: ${e.transitionDuration}ms`
    ),
  };
}
let Jt = [],
  fn = [];
function Pr(e) {
  fn = fn.filter((t) => t !== e);
}
function Pu(e) {
  Pr(e), fn.push(e);
}
function us(e) {
  Pr(e), fn.length === 0 && Jt.length !== 0 && (Jt[Jt.length - 1](), (Jt = []));
}
function Lu(e) {
  fn.length === 0 ? e() : Jt.push(e);
}
let Au = 1,
  Mu = document.body;
function Ou(e, t) {
  const n = document.createElement("div");
  if (
    ((n.id = t !== void 0 ? `q-portal--${t}--${Au++}` : e),
    Bn.globalNodes !== void 0)
  ) {
    const i = Bn.globalNodes.class;
    i !== void 0 && (n.className = i);
  }
  return Mu.appendChild(n), n;
}
function Fu(e) {
  e.remove();
}
const Ln = [];
function $u(e) {
  return Ln.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function qu(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if ((e.hide(t), e.$props.separateClosePopup === !0)) return Pn(e);
    } else if (e.__qPortal === !0) {
      const n = Pn(e);
      return n !== void 0 && n.$options.name === "QPopupProxy"
        ? (e.hide(t), n)
        : e;
    }
    e = Pn(e);
  } while (e != null);
}
function Ru(e, t, n) {
  for (; n !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if ((n--, e.$options.name === "QMenu")) {
        e = qu(e, t);
        continue;
      }
      e.hide(t);
    }
    e = Pn(e);
  }
}
function Bu(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function Iu(e, t, n, i) {
  const o = he(!1),
    s = he(!1);
  let r = null;
  const l = {},
    a = i === "dialog" && Bu(e);
  function u(p) {
    if (p === !0) {
      us(l), (s.value = !0);
      return;
    }
    (s.value = !1),
      o.value === !1 &&
        (a === !1 && r === null && (r = Ou(!1, i)),
        (o.value = !0),
        Ln.push(e.proxy),
        Pu(l));
  }
  function d(p) {
    if (((s.value = !1), p !== !0)) return;
    us(l), (o.value = !1);
    const h = Ln.indexOf(e.proxy);
    h !== -1 && Ln.splice(h, 1), r !== null && (Fu(r), (r = null));
  }
  return (
    eo(() => {
      d(!0);
    }),
    (e.proxy.__qPortal = !0),
    Jn(e.proxy, "contentEl", () => t.value),
    {
      showPortal: u,
      hidePortal: d,
      portalIsActive: o,
      portalIsAccessible: s,
      renderPortal: () =>
        a === !0 ? n() : o.value === !0 ? [X(ya, { to: r }, n())] : void 0,
    }
  );
}
function Nu(e) {
  return e === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : e.scrollTop;
}
function Du(e) {
  return e === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : e.scrollLeft;
}
function ju(e, t = !0) {
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
let Ut = 0,
  hi,
  pi,
  Xt,
  gi = !1,
  fs,
  ds,
  hs,
  ut = null;
function Hu(e) {
  zu(e) && ft(e);
}
function zu(e) {
  if (
    e.target === document.body ||
    e.target.classList.contains("q-layout__backdrop")
  )
    return !0;
  const t = vc(e),
    n = e.shiftKey && !e.deltaX,
    i = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    o = n || i ? e.deltaY : e.deltaX;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    if (ju(r, i))
      return i
        ? o < 0 && r.scrollTop === 0
          ? !0
          : o > 0 && r.scrollTop + r.clientHeight === r.scrollHeight
        : o < 0 && r.scrollLeft === 0
        ? !0
        : o > 0 && r.scrollLeft + r.clientWidth === r.scrollWidth;
  }
  return !0;
}
function ps(e) {
  e.target === document &&
    (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function wn(e) {
  gi !== !0 &&
    ((gi = !0),
    requestAnimationFrame(() => {
      gi = !1;
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: i } = document.scrollingElement;
      (Xt === void 0 || t !== window.innerHeight) &&
        ((Xt = n - t), (document.scrollingElement.scrollTop = i)),
        i > Xt &&
          (document.scrollingElement.scrollTop -= Math.ceil((i - Xt) / 8));
    }));
}
function gs(e) {
  const t = document.body,
    n = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: i, overflowX: o } = window.getComputedStyle(t);
    (hi = Du(window)),
      (pi = Nu(window)),
      (fs = t.style.left),
      (ds = t.style.top),
      (hs = window.location.href),
      (t.style.left = `-${hi}px`),
      (t.style.top = `-${pi}px`),
      o !== "hidden" &&
        (o === "scroll" || t.scrollWidth > window.innerWidth) &&
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
              wn,
              Se.passiveCapture
            ),
            window.visualViewport.addEventListener(
              "scroll",
              wn,
              Se.passiveCapture
            ),
            window.scrollTo(0, 0))
          : window.addEventListener("scroll", ps, Se.passiveCapture));
  }
  ue.is.desktop === !0 &&
    ue.is.mac === !0 &&
    window[`${e}EventListener`]("wheel", Hu, Se.notPassive),
    e === "remove" &&
      (ue.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener(
              "resize",
              wn,
              Se.passiveCapture
            ),
            window.visualViewport.removeEventListener(
              "scroll",
              wn,
              Se.passiveCapture
            ))
          : window.removeEventListener("scroll", ps, Se.passiveCapture)),
      t.classList.remove("q-body--prevent-scroll"),
      t.classList.remove("q-body--force-scrollbar-x"),
      t.classList.remove("q-body--force-scrollbar-y"),
      (document.qScrollPrevented = !1),
      (t.style.left = fs),
      (t.style.top = ds),
      window.location.href === hs && window.scrollTo(hi, pi),
      (Xt = void 0));
}
function Ku(e) {
  let t = "add";
  if (e === !0) {
    if ((Ut++, ut !== null)) {
      clearTimeout(ut), (ut = null);
      return;
    }
    if (Ut > 1) return;
  } else {
    if (Ut === 0 || (Ut--, Ut > 0)) return;
    if (((t = "remove"), ue.is.ios === !0 && ue.is.nativeMobile === !0)) {
      ut !== null && clearTimeout(ut),
        (ut = setTimeout(() => {
          gs(t), (ut = null);
        }, 100));
      return;
    }
  }
  gs(t);
}
function Uu() {
  let e;
  return {
    preventBodyScroll(t) {
      t !== e && (e !== void 0 || t === !0) && ((e = t), Ku(t));
    },
  };
}
const _t = [];
let Bt;
function Wu(e) {
  Bt = e.keyCode === 27;
}
function Vu() {
  Bt === !0 && (Bt = !1);
}
function Qu(e) {
  Bt === !0 && ((Bt = !1), un(e, 27) === !0 && _t[_t.length - 1](e));
}
function Lr(e) {
  window[e]("keydown", Wu),
    window[e]("blur", Vu),
    window[e]("keyup", Qu),
    (Bt = !1);
}
function Yu(e) {
  ue.is.desktop === !0 &&
    (_t.push(e), _t.length === 1 && Lr("addEventListener"));
}
function ms(e) {
  const t = _t.indexOf(e);
  t > -1 && (_t.splice(t, 1), _t.length === 0 && Lr("removeEventListener"));
}
const yt = [];
function Ar(e) {
  yt[yt.length - 1](e);
}
function Ju(e) {
  ue.is.desktop === !0 &&
    (yt.push(e),
    yt.length === 1 && document.body.addEventListener("focusin", Ar));
}
function vs(e) {
  const t = yt.indexOf(e);
  t > -1 &&
    (yt.splice(t, 1),
    yt.length === 0 && document.body.removeEventListener("focusin", Ar));
}
let xn = 0;
const Xu = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center",
  },
  bs = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"],
  },
  Zu = Ct({
    name: "QDialog",
    inheritAttrs: !1,
    props: {
      ...Cu,
      ...ku,
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
    emits: [...Eu, "shake", "click", "escapeKey"],
    setup(e, { slots: t, emit: n, attrs: i }) {
      const o = Ve(),
        s = he(null),
        r = he(!1),
        l = he(!1);
      let a = null,
        u = null,
        d,
        p;
      const h = H(
          () =>
            e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0
        ),
        { preventBodyScroll: _ } = Uu(),
        { registerTimeout: x } = wu(),
        { registerTick: E, removeTick: P } = xu(),
        { transitionProps: I, transitionStyle: k } = Su(
          e,
          () => bs[e.position][0],
          () => bs[e.position][1]
        ),
        {
          showPortal: j,
          hidePortal: A,
          portalIsAccessible: B,
          renderPortal: V,
        } = Iu(o, s, ei, "dialog"),
        { hide: U } = Tu({
          showing: r,
          hideOnRouteChange: h,
          handleShow: L,
          handleHide: te,
          processOnMount: !0,
        }),
        { addToHistory: M, removeFromHistory: O } = yu(r, U, h),
        N = H(
          () =>
            `q-dialog__inner flex no-pointer-events q-dialog__inner--${
              e.maximized === !0 ? "maximized" : "minimized"
            } q-dialog__inner--${e.position} ${Xu[e.position]}` +
            (l.value === !0 ? " q-dialog__inner--animating" : "") +
            (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") +
            (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") +
            (e.square === !0 ? " q-dialog__inner--square" : "")
        ),
        $ = H(() => r.value === !0 && e.seamless !== !0),
        S = H(() => (e.autoClose === !0 ? { onClick: He } : {})),
        Q = H(() => [
          `q-dialog fullscreen no-pointer-events q-dialog--${
            $.value === !0 ? "modal" : "seamless"
          }`,
          i.class,
        ]);
      vt(
        () => e.maximized,
        (Y) => {
          r.value === !0 && Qe(Y);
        }
      ),
        vt($, (Y) => {
          _(Y), Y === !0 ? (Ju(Et), Yu(G)) : (vs(Et), ms(G));
        });
      function L(Y) {
        M(),
          (u =
            e.noRefocus === !1 && document.activeElement !== null
              ? document.activeElement
              : null),
          Qe(e.maximized),
          j(),
          (l.value = !0),
          e.noFocus !== !0
            ? (document.activeElement !== null && document.activeElement.blur(),
              E(ee))
            : P(),
          x(() => {
            if (o.proxy.$q.platform.is.ios === !0) {
              if (e.seamless !== !0 && document.activeElement) {
                const { top: oe, bottom: Ye } =
                    document.activeElement.getBoundingClientRect(),
                  { innerHeight: jt } = window,
                  Be =
                    window.visualViewport !== void 0
                      ? window.visualViewport.height
                      : jt;
                oe > 0 &&
                  Ye > Be / 2 &&
                  (document.scrollingElement.scrollTop = Math.min(
                    document.scrollingElement.scrollHeight - Be,
                    Ye >= jt
                      ? 1 / 0
                      : Math.ceil(
                          document.scrollingElement.scrollTop + Ye - Be / 2
                        )
                  )),
                  document.activeElement.scrollIntoView();
              }
              (p = !0), s.value.click(), (p = !1);
            }
            j(!0), (l.value = !1), n("show", Y);
          }, e.transitionDuration);
      }
      function te(Y) {
        P(),
          O(),
          Re(!0),
          (l.value = !0),
          A(),
          u !== null &&
            ((
              (Y && Y.type.indexOf("key") === 0
                ? u.closest('[tabindex]:not([tabindex^="-"])')
                : void 0) || u
            ).focus(),
            (u = null)),
          x(() => {
            A(!0), (l.value = !1), n("hide", Y);
          }, e.transitionDuration);
      }
      function ee(Y) {
        Lu(() => {
          let oe = s.value;
          oe === null ||
            oe.contains(document.activeElement) === !0 ||
            ((oe =
              (Y !== "" ? oe.querySelector(Y) : null) ||
              oe.querySelector(
                "[autofocus][tabindex], [data-autofocus][tabindex]"
              ) ||
              oe.querySelector(
                "[autofocus] [tabindex], [data-autofocus] [tabindex]"
              ) ||
              oe.querySelector("[autofocus], [data-autofocus]") ||
              oe),
            oe.focus({ preventScroll: !0 }));
        });
      }
      function ie(Y) {
        Y && typeof Y.focus == "function"
          ? Y.focus({ preventScroll: !0 })
          : ee(),
          n("shake");
        const oe = s.value;
        oe !== null &&
          (oe.classList.remove("q-animate--scale"),
          oe.classList.add("q-animate--scale"),
          a !== null && clearTimeout(a),
          (a = setTimeout(() => {
            (a = null),
              s.value !== null &&
                (oe.classList.remove("q-animate--scale"), ee());
          }, 170)));
      }
      function G() {
        e.seamless !== !0 &&
          (e.persistent === !0 || e.noEscDismiss === !0
            ? e.maximized !== !0 && e.noShake !== !0 && ie()
            : (n("escapeKey"), U()));
      }
      function Re(Y) {
        a !== null && (clearTimeout(a), (a = null)),
          (Y === !0 || r.value === !0) &&
            (Qe(!1), e.seamless !== !0 && (_(!1), vs(Et), ms(G))),
          Y !== !0 && (u = null);
      }
      function Qe(Y) {
        Y === !0
          ? d !== !0 &&
            (xn < 1 && document.body.classList.add("q-body--dialog"),
            xn++,
            (d = !0))
          : d === !0 &&
            (xn < 2 && document.body.classList.remove("q-body--dialog"),
            xn--,
            (d = !1));
      }
      function He(Y) {
        p !== !0 && (U(Y), n("click", Y));
      }
      function Ee(Y) {
        e.persistent !== !0 && e.noBackdropDismiss !== !0
          ? U(Y)
          : e.noShake !== !0 && ie();
      }
      function Et(Y) {
        e.allowFocusOutside !== !0 &&
          B.value === !0 &&
          Zc(s.value, Y.target) !== !0 &&
          ee('[tabindex]:not([tabindex="-1"])');
      }
      Object.assign(o.proxy, {
        focus: ee,
        shake: ie,
        __updateRefocusTarget(Y) {
          u = Y || null;
        },
      }),
        xt(Re);
      function ei() {
        return X(
          "div",
          {
            role: "dialog",
            "aria-modal": $.value === !0 ? "true" : "false",
            ...i,
            class: Q.value,
          },
          [
            X(an, { name: "q-transition--fade", appear: !0 }, () =>
              $.value === !0
                ? X("div", {
                    class: "q-dialog__backdrop fixed-full",
                    style: k.value,
                    "aria-hidden": "true",
                    tabindex: -1,
                    onClick: Ee,
                  })
                : null
            ),
            X(an, I.value, () =>
              r.value === !0
                ? X(
                    "div",
                    {
                      ref: s,
                      class: N.value,
                      style: k.value,
                      tabindex: -1,
                      ...S.value,
                    },
                    Gn(t.default)
                  )
                : null
            ),
          ]
        );
      }
      return V;
    },
  });
function _s(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
const Gu = _r({
    name: "close-popup",
    beforeMount(e, { value: t }) {
      const n = {
        depth: _s(t),
        handler(i) {
          n.depth !== 0 &&
            setTimeout(() => {
              const o = $u(e);
              o !== void 0 && Ru(o, i, n.depth);
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
      t !== n && (e.__qclosepopup.depth = _s(t));
    },
    beforeUnmount(e) {
      const t = e.__qclosepopup;
      e.removeEventListener("click", t.handler),
        e.removeEventListener("keyup", t.handlerKey),
        delete e.__qclosepopup;
    },
  }),
  ef = "./assets/img1-773abaf7.png",
  tf = "./assets/img2-71e1b259.png",
  nf = "./assets/img3-5e7dce1a.png",
  of = "./assets/img4-cd632fc9.png",
  sf = "./assets/img5-851667b3.png",
  rf = "./assets/img6-51fb2a21.png",
  lf = "./assets/img7-6361a40f.png",
  af = "./assets/img8-bca08924.png",
  cf = "./assets/img9-8b253a80.png",
  uf = "./assets/colores-3f429678.png",
  ff = "./assets/animales-c8270de4.png",
  df = "./assets/frutas-b8e02f22.png",
  hf = "./assets/nombres-70af92f5.png",
  pf = "./assets/ganaste-cc5312d5.png",
  gf = "./assets/perdiste-f4564b2a.png";
const mf = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [i, o] of t) n[i] = o;
    return n;
  },
  vf = { class: "body1" },
  bf = { key: 0, class: "" },
  _f = { class: "div1" },
  yf = ka(
    '<img class="logo" src="https://tomplay.com/storage/section-pages/November2022/CzKiXyiZ7kBUBY2iANmG.png" alt="" data-v-5920731f><div class="sub1" data-v-5920731f><span class="titulo" data-v-5920731f>E</span> <span class="titulo" data-v-5920731f>L</span> <span class="titulo" data-v-5920731f></span> <span class="titulo" data-v-5920731f>A</span> <span class="titulo" data-v-5920731f>H</span> <span class="titulo" data-v-5920731f>O</span> <span class="titulo" data-v-5920731f>R</span> <span class="titulo" data-v-5920731f>C</span> <span class="titulo" data-v-5920731f>A</span> <span class="titulo" data-v-5920731f>D</span> <span class="titulo" data-v-5920731f>O</span></div>',
    2
  ),
  wf = { key: 1, class: "div2" },
  xf = { class: "imagen" },
  Cf = ["src"],
  Ef = { class: "solo" },
  Tf = { class: "cuadros" },
  kf = { class: "cambiar" },
  Sf = { class: "contenedor" },
  Pf = { class: "letras" },
  Lf = ["onClick", "disabled"],
  Af = { class: "q-pa-md q-gutter-sm" },
  Mf = { class: "text-h6" },
  Of = ["onClick"],
  Ff = ["src"],
  $f = ["onClick"],
  qf = {
    __name: "App",
    setup(e) {
      const t = he(!0),
        n = [
          "A",
          "B",
          "C",
          "D",
          "E",
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
            Facil: ["rojo", "verde", "azul", "amarillo", "blanco"],
            Medio: ["naranja", "morado", "gris", "rosado", "negro"],
            Dificil: ["turquesa", "magenta", "cian", "dorado", "plateado"],
          },
          frutas: {
            Facil: ["manzana", "banana", "fresa", "naranja", "pera"],
            Medio: ["uva", "kiwi", "mango", "cereza", "sandia"],
            Dificil: ["granada", "pitahaya", "lichi", "maracuya", "carambola"],
          },
          animales: {
            Facil: ["perro", "gato", "pato", "conejo", "tigre"],
            Medio: ["león", "elefante", "jirafa", "cocodrilo", "hipopotamo"],
            Dificil: ["oricteropo", "axolote", "quokka", "narval", "pangolin"],
          },
          nombres: {
            Facil: ["juan", "ana", "carlos", "luis", "sofia"],
            Medio: ["eduardo", "valentina", "gabriel", "isabella", "mateo"],
            Dificil: [
              "sebastian",
              "constanza",
              "benjamin",
              "valeria",
              "leonardo",
            ],
          },
        },
        o = he([]),
        s = he([]),
        r = [ef, tf, nf, of, sf, rf, lf, af, cf],
        l = he(0),
        a = { Facil: 1, Medio: 2, Dificil: 3 },
        u = he(0),
        d = he(!0),
        p = he({ categorias: "colores", dificultad: "Facil" }),
        h = () => Math.floor(Math.random() * 3),
        _ = () => {
          u.value = 0;
          const O = i[p.value.categorias][p.value.dificultad][h()],
            N = Array.from(O);
          o.value.length > 0 && (o.value = []);
          for (const $ of N) o.value.push($);
        },
        x = (O) => {
          if (o.value.includes(O.toLowerCase())) {
            if (
              (console.log(
                s.value.includes(O),
                "data",
                p.value.dificultad !== "dificil"
              ),
              s.value.includes(O) && p.value.dificultad === "Dificil")
            ) {
              u.value += a[p.value.dificultad];
              return;
            }
            s.value.push(O),
              p.value.dificultad !== "Dificil" &&
                event.target.setAttribute("disabled", "true");
            return;
          }
          (u.value += a[p.value.dificultad]),
            p.value.dificultad !== "Dificil" &&
              event.target.setAttribute("disabled", "true");
        },
        E = H(
          () => (O) =>
            s.value.find(($) => String($) === String(O.toUpperCase())) ? O : ""
        ),
        P = H(() => {
          let O = !1;
          for (const N of o.value) {
            if (!s.value.includes(N.toUpperCase())) {
              O = !1;
              break;
            }
            O = !0;
          }
          return O === !0 ? "ganaste" : "perdiste";
        }),
        I = (O) => {
          (O === "ganaste" || l.value >= 9) &&
            ((k.value = !0),
            (u.value = 0),
            (s.value = []),
            (l.value = 0),
            (o.value = []));
        },
        k = he(!1),
        j = [
          { nombre: "colores", imagen: uf },
          { nombre: "frutas", imagen: df },
          { nombre: "animales", imagen: ff },
          { nombre: "nombres", imagen: hf },
        ],
        A = ["Facil", "Medio", "Dificil"],
        B = () => {
          p.value = { categorias: "", dificultad: "" };
        };
      he([]);
      const V = he(!1),
        U = async (O) => {
          (s.value = [""]),
            (k.value = !1),
            (t.value = !0),
            (d.value = !1),
            (l.value = 0),
            (p.value.dificultad = O),
            (V.value = !0),
            _();
        },
        M = (O) => {
          (p.value.categorias = O), (t.value = !1);
        };
      return (O, N) => (
        Xe(),
        Ze("div", vf, [
          d.value === !0
            ? (Xe(),
              Ze("div", bf, [
                de("div", _f, [
                  yf,
                  de(
                    "button",
                    {
                      type: "button",
                      class: "btn btn-warning",
                      onClick:
                        N[0] ||
                        (N[0] = ($) => {
                          (k.value = !0), B();
                        }),
                    },
                    "jugar "
                  ),
                ]),
              ]))
            : (Xe(),
              Ze("div", wf, [
                de("div", xf, [
                  de(
                    "img",
                    {
                      class: "avances",
                      src:
                        P.value === "ganaste"
                          ? wi(pf)
                          : u.value < 8
                          ? r[u.value]
                          : wi(gf),
                      alt: "",
                    },
                    null,
                    8,
                    Cf
                  ),
                ]),
                de("div", Ef, [
                  (Xe(!0),
                  Ze(
                    we,
                    null,
                    _n(
                      o.value,
                      ($) => (
                        Xe(),
                        Ze("div", Tf, [
                          de("p", kf, zt(E.value($.toLowerCase())), 1),
                        ])
                      )
                    ),
                    256
                  )),
                ]),
                de("div", Sf, [
                  de("div", Pf, [
                    (Xe(),
                    Ze(
                      we,
                      null,
                      _n(n, ($, S) =>
                        de(
                          "button",
                          {
                            key: S,
                            onClick: (Q) => x($),
                            disabled: u.value > 8 || P.value === "ganaste",
                            class: "palabras",
                          },
                          zt($),
                          9,
                          Lf
                        )
                      ),
                      64
                    )),
                  ]),
                  de("div", null, [
                    de(
                      "button",
                      {
                        class: "volver",
                        onClick:
                          N[1] ||
                          (N[1] = ($) => {
                            I(P.value), (k.value = !0);
                          }),
                      },
                      "volver"
                    ),
                  ]),
                ]),
              ])),
          de("div", Af, [
            pe(
              Zu,
              {
                modelValue: k.value,
                "onUpdate:modelValue": N[2] || (N[2] = ($) => (k.value = $)),
              },
              {
                default: Vt(() => [
                  pe(_u, null, {
                    default: Vt(() => [
                      pe(
                        cs,
                        { class: "row items-center q-pb-none" },
                        {
                          default: Vt(() => [
                            de(
                              "div",
                              Mf,
                              zt(
                                p.value.categorias === ""
                                  ? "Elije la categoría"
                                  : "Elije la dificultad"
                              ),
                              1
                            ),
                            pe(Dc),
                            Js(
                              pe(
                                mu,
                                {
                                  class: "cerrar",
                                  icon: "X",
                                  flat: "",
                                  round: "",
                                  dense: "",
                                },
                                null,
                                512
                              ),
                              [[Gu]]
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      pe(
                        cs,
                        { class: "row" },
                        {
                          default: Vt(() => [
                            t.value
                              ? (Xe(),
                                Ze(
                                  we,
                                  { key: 0 },
                                  _n(j, ($, S) =>
                                    de(
                                      "div",
                                      {
                                        key: S,
                                        class: "cardCategoria",
                                        onClick: (Q) => M($.nombre),
                                      },
                                      [
                                        de(
                                          "img",
                                          {
                                            src: $.imagen,
                                            alt: "",
                                            class: "imgsCategoria",
                                          },
                                          null,
                                          8,
                                          Ff
                                        ),
                                        de("h4", null, zt($.nombre), 1),
                                      ],
                                      8,
                                      Of
                                    )
                                  ),
                                  64
                                ))
                              : (Xe(),
                                Ze(
                                  we,
                                  { key: 1 },
                                  _n(A, ($, S) =>
                                    de(
                                      "button",
                                      {
                                        class: "botones",
                                        key: S,
                                        onClick: (Q) => U($),
                                      },
                                      zt($),
                                      9,
                                      $f
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
        ])
      );
    },
  },
  Rf = mf(qf, [["__scopeId", "data-v-5920731f"]]),
  Mr = cc(Rf);
Mr.use(Ic, { plugins: {} });
Mr.mount("#app");
