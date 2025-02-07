var Se = Object.defineProperty;
var $e = (l, e, t) => e in l ? Se(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var oe = (l, e, t) => $e(l, typeof e != "symbol" ? e + "" : e, t);
import { toValue as p, defineComponent as S, useModel as q, withDirectives as pe, openBlock as m, createElementBlock as A, vModelText as Ne, renderSlot as Re, createBlock as x, withCtx as O, createElementVNode as V, createVNode as _, mergeProps as k, mergeModels as me, computed as M, Fragment as F, renderList as Ue, toDisplayString as Q, vModelSelect as Ee, createTextVNode as K, withModifiers as P, ref as g, watch as fe, unref as i, isRef as j, createCommentVNode as E, createApp as qe } from "vue";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const se = () => {
};
function Oe(l, e) {
  function t(...r) {
    return new Promise((a, n) => {
      Promise.resolve(l(() => e.apply(this, r), { fn: e, thisArg: this, args: r })).then(a).catch(n);
    });
  }
  return t;
}
function Te(l, e = {}) {
  let t, r, a = se;
  const n = (s) => {
    clearTimeout(s), a(), a = se;
  };
  return (s) => {
    const u = p(l), d = p(e.maxWait);
    return t && n(t), u <= 0 || d !== void 0 && d <= 0 ? (r && (n(r), r = null), Promise.resolve(s())) : new Promise((f, w) => {
      a = e.rejectOnCancel ? w : f, d && !r && (r = setTimeout(() => {
        t && n(t), r = null, f(s());
      }, d)), t = setTimeout(() => {
        r && n(r), r = null, f(s());
      }, u);
    });
  };
}
function ae(l, e = 200, t = {}) {
  return Oe(
    Te(e, t),
    l
  );
}
const Ie = /* @__PURE__ */ S({
  __name: "BaseTextField",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => pe((m(), A("input", {
      "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
      type: "text"
    }, null, 512)), [
      [Ne, e.value]
    ]);
  }
}), G = (l, e) => {
  const t = l.__vccOpts || l;
  for (const [r, a] of e)
    t[r] = a;
  return t;
}, B = /* @__PURE__ */ G(Ie, [["__scopeId", "data-v-d3af3741"]]), Pe = {};
function je(l, e) {
  return m(), A("div", null, [
    Re(l.$slots, "default")
  ]);
}
const T = /* @__PURE__ */ G(Pe, [["render", je]]), ke = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldAddressAutocomplete",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => (m(), x(T, null, {
      default: O(() => [
        r[1] || (r[1] = V("label", { for: "searchQuery" }, "Street, Housenumber, City", -1)),
        _(B, k({
          id: "searchQuery",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
          name: "searchQuery",
          required: ""
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), Fe = ["value"], ye = /* @__PURE__ */ S({
  __name: "BaseSelect",
  props: /* @__PURE__ */ me({
    options: {},
    addEmptyOption: { type: Boolean, default: !0 }
  }, {
    modelValue: { default: "" },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(l) {
    const e = l, t = q(l, "modelValue"), r = M(() => e.addEmptyOption ? [{ value: "", label: "Select an option" }, ...e.options] : e.options);
    return (a, n) => pe((m(), A("select", {
      "onUpdate:modelValue": n[0] || (n[0] = (o) => t.value = o)
    }, [
      (m(!0), A(F, null, Ue(r.value, (o) => (m(), A("option", {
        key: o.value,
        value: o.value
      }, Q(o.label), 9, Fe))), 128))
    ], 512)), [
      [Ee, t.value]
    ]);
  }
}), ne = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldAddressSelect",
  props: {
    addresses: {}
  },
  emits: ["address-select"],
  setup(l, { emit: e }) {
    const t = l, r = e, a = M(() => t.addresses.map((o, s) => ({
      value: s.toString(),
      label: `${o.street} ${o.houseNumber}${o.houseNumberSuffix || ""}, ${o.city}`
    }))), n = (o) => {
      const s = o.target;
      if (!s.value) return;
      const u = parseInt(s.value), d = t.addresses[u];
      r("address-select", d);
    };
    return (o, s) => (m(), x(T, null, {
      default: O(() => [
        s[0] || (s[0] = V("label", { for: "addressSelect" }, "Select the right address", -1)),
        _(ye, {
          name: "addressSelect",
          options: a.value,
          onInput: n
        }, null, 8, ["options"])
      ]),
      _: 1
    }));
  }
}), Be = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldCountry",
  props: /* @__PURE__ */ me({
    allowedCountries: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue"), t = l, r = [
      { code: "NL", label: "Netherlands" },
      { code: "BE", label: "Belgium" }
    ], a = M(
      () => {
        var n;
        return (n = t.allowedCountries) != null && n.length ? t.allowedCountries.map((o) => ({
          value: o.code,
          label: o.label
        })) : r.map((o) => ({
          value: o.code,
          label: o.label
        }));
      }
    );
    return (n, o) => (m(), x(T, null, {
      default: O(() => [
        o[1] || (o[1] = V("label", { for: "country" }, "Country", -1)),
        _(ye, k({
          modelValue: e.value,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => e.value = s),
          name: "country",
          options: a.value,
          required: ""
        }, n.$attrs), null, 16, ["modelValue", "options"])
      ]),
      _: 1
    }));
  }
}), De = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldPostalCode",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => (m(), x(T, null, {
      default: O(() => [
        r[1] || (r[1] = V("label", { for: "postalCode" }, "Postal code", -1)),
        _(B, k({
          id: "postalCode",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
          name: "postalCode",
          length: "4",
          required: "",
          inputmode: "numeric"
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), Me = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldHouseNumber",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => (m(), x(T, null, {
      default: O(() => [
        r[1] || (r[1] = V("label", { for: "houseNumber" }, "House number", -1)),
        _(B, k({
          id: "houseNumber",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
          name: "houseNumber",
          length: "8",
          required: "",
          inputmode: "numeric"
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), We = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldHouseNumberSuffix",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => (m(), x(T, null, {
      default: O(() => [
        r[1] || (r[1] = V("label", { for: "houseNumberSuffix" }, [
          K("House number suffix "),
          V("em", null, "(optional)")
        ], -1)),
        _(B, k({
          id: "houseNumberSuffix",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
          name: "houseNumberSuffix",
          length: "5"
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), Le = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldStreet",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => (m(), x(T, null, {
      default: O(() => [
        r[1] || (r[1] = V("label", { for: "street" }, "Street", -1)),
        _(B, k({
          id: "street",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
          name: "street",
          required: ""
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), He = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldCity",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    const e = q(l, "modelValue");
    return (t, r) => (m(), x(T, null, {
      default: O(() => [
        r[1] || (r[1] = V("label", { for: "city" }, "City", -1)),
        _(B, k({
          id: "city",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => e.value = a),
          name: "city",
          required: ""
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), ze = /* @__PURE__ */ S({
  __name: "ButtonOverride",
  emits: ["override-requested"],
  setup(l, { emit: e }) {
    const t = e;
    function r() {
      t("override-requested");
    }
    return (a, n) => (m(), x(T, null, {
      default: O(() => [
        V("button", {
          onClick: P(r, ["prevent"])
        }, "Override address")
      ]),
      _: 1
    }));
  }
}), Qe = /* @__PURE__ */ G(ze, [["__scopeId", "data-v-66a6eb81"]]);
var Ke = /\{[^{}]+\}/g, L = ({ allowReserved: l, name: e, value: t }) => {
  if (t == null) return "";
  if (typeof t == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${l ? t : encodeURIComponent(t)}`;
}, Ge = (l) => {
  switch (l) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Je = (l) => {
  switch (l) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, Ze = (l) => {
  switch (l) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, ve = ({ allowReserved: l, explode: e, name: t, style: r, value: a }) => {
  if (!e) {
    let s = (l ? a : a.map((u) => encodeURIComponent(u))).join(Je(r));
    switch (r) {
      case "label":
        return `.${s}`;
      case "matrix":
        return `;${t}=${s}`;
      case "simple":
        return s;
      default:
        return `${t}=${s}`;
    }
  }
  let n = Ge(r), o = a.map((s) => r === "label" || r === "simple" ? l ? s : encodeURIComponent(s) : L({ allowReserved: l, name: t, value: s })).join(n);
  return r === "label" || r === "matrix" ? n + o : o;
}, he = ({ allowReserved: l, explode: e, name: t, style: r, value: a }) => {
  if (a instanceof Date) return `${t}=${a.toISOString()}`;
  if (r !== "deepObject" && !e) {
    let s = [];
    Object.entries(a).forEach(([d, f]) => {
      s = [...s, d, l ? f : encodeURIComponent(f)];
    });
    let u = s.join(",");
    switch (r) {
      case "form":
        return `${t}=${u}`;
      case "label":
        return `.${u}`;
      case "matrix":
        return `;${t}=${u}`;
      default:
        return u;
    }
  }
  let n = Ze(r), o = Object.entries(a).map(([s, u]) => L({ allowReserved: l, name: r === "deepObject" ? `${t}[${s}]` : s, value: u })).join(n);
  return r === "label" || r === "matrix" ? n + o : o;
}, Xe = ({ path: l, url: e }) => {
  let t = e, r = e.match(Ke);
  if (r) for (let a of r) {
    let n = !1, o = a.substring(1, a.length - 1), s = "simple";
    o.endsWith("*") && (n = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), s = "label") : o.startsWith(";") && (o = o.substring(1), s = "matrix");
    let u = l[o];
    if (u == null) continue;
    if (Array.isArray(u)) {
      t = t.replace(a, ve({ explode: n, name: o, style: s, value: u }));
      continue;
    }
    if (typeof u == "object") {
      t = t.replace(a, he({ explode: n, name: o, style: s, value: u }));
      continue;
    }
    if (s === "matrix") {
      t = t.replace(a, `;${L({ name: o, value: u })}`);
      continue;
    }
    let d = encodeURIComponent(s === "label" ? `.${u}` : u);
    t = t.replace(a, d);
  }
  return t;
}, be = ({ allowReserved: l, array: e, object: t } = {}) => (r) => {
  let a = [];
  if (r && typeof r == "object") for (let n in r) {
    let o = r[n];
    if (o != null) {
      if (Array.isArray(o)) {
        a = [...a, ve({ allowReserved: l, explode: !0, name: n, style: "form", value: o, ...e })];
        continue;
      }
      if (typeof o == "object") {
        a = [...a, he({ allowReserved: l, explode: !0, name: n, style: "deepObject", value: o, ...t })];
        continue;
      }
      a = [...a, L({ allowReserved: l, name: n, value: o })];
    }
  }
  return a.join("&");
}, Ye = (l) => {
  var t;
  if (!l) return;
  let e = (t = l.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((r) => e.startsWith(r))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, et = async (l, e) => {
  if (l.fn === "accessToken") {
    let t = typeof e.accessToken == "function" ? await e.accessToken() : e.accessToken;
    return t ? `Bearer ${t}` : void 0;
  }
  if (l.fn === "apiKey") return typeof e.apiKey == "function" ? await e.apiKey() : e.apiKey;
}, tt = async ({ security: l, ...e }) => {
  for (let t of l) {
    let r = await et(t, e);
    if (r) {
      t.in === "header" ? e.headers.set(t.name, r) : t.in === "query" && (e.query || (e.query = {}), e.query[t.name] = r);
      return;
    }
  }
}, ue = (l) => rt({ baseUrl: l.baseUrl ?? "", path: l.path, query: l.query, querySerializer: typeof l.querySerializer == "function" ? l.querySerializer : be(l.querySerializer), url: l.url }), rt = ({ baseUrl: l, path: e, query: t, querySerializer: r, url: a }) => {
  let n = a.startsWith("/") ? a : `/${a}`, o = l + n;
  e && (o = Xe({ path: e, url: o }));
  let s = t ? r(t) : "";
  return s.startsWith("?") && (s = s.substring(1)), s && (o += `?${s}`), o;
}, ie = (l, e) => {
  var r;
  let t = { ...l, ...e };
  return (r = t.baseUrl) != null && r.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = we(l.headers, e.headers), t;
}, we = (...l) => {
  let e = new Headers();
  for (let t of l) {
    if (!t || typeof t != "object") continue;
    let r = t instanceof Headers ? t.entries() : Object.entries(t);
    for (let [a, n] of r) if (n === null) e.delete(a);
    else if (Array.isArray(n)) for (let o of n) e.append(a, o);
    else n !== void 0 && e.set(a, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return e;
}, z = class {
  constructor() {
    oe(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(l) {
    return this._fns.indexOf(l) !== -1;
  }
  eject(l) {
    let e = this._fns.indexOf(l);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(l) {
    this._fns = [...this._fns, l];
  }
}, lt = () => ({ error: new z(), request: new z(), response: new z() }), ot = { bodySerializer: (l) => JSON.stringify(l) }, st = be({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), at = { "Content-Type": "application/json" }, ge = (l = {}) => ({ ...ot, baseUrl: "", headers: at, parseAs: "auto", querySerializer: st, ...l }), nt = (l = {}) => {
  let e = ie(ge(), l), t = () => ({ ...e }), r = (o) => (e = ie(e, o), t()), a = lt(), n = async (o) => {
    let s = { ...e, ...o, fetch: o.fetch ?? e.fetch ?? globalThis.fetch, headers: we(e.headers, o.headers) };
    s.security && await tt({ ...s, security: s.security }), s.body && s.bodySerializer && (s.body = s.bodySerializer(s.body)), s.body || s.headers.delete("Content-Type");
    let u = ue(s), d = { redirect: "follow", ...s }, f = new Request(u, d);
    for (let b of a.request._fns) f = await b(f, s);
    let w = s.fetch, v = await w(f);
    for (let b of a.response._fns) v = await b(v, f, s);
    let $ = { request: f, response: v };
    if (v.ok) {
      if (v.status === 204 || v.headers.get("Content-Length") === "0") return { data: {}, ...$ };
      if (s.parseAs === "stream") return { data: v.body, ...$ };
      let b = (s.parseAs === "auto" ? Ye(v.headers.get("Content-Type")) : s.parseAs) ?? "json", U = await v[b]();
      return b === "json" && (s.responseValidator && await s.responseValidator(U), s.responseTransformer && (U = await s.responseTransformer(U))), { data: U, ...$ };
    }
    let y = await v.text();
    try {
      y = JSON.parse(y);
    } catch {
    }
    let N = y;
    for (let b of a.error._fns) N = await b(y, v, f, s);
    if (N = N || {}, s.throwOnError) throw N;
    return { error: N, ...$ };
  };
  return { buildUrl: ue, connect: (o) => n({ ...o, method: "CONNECT" }), delete: (o) => n({ ...o, method: "DELETE" }), get: (o) => n({ ...o, method: "GET" }), getConfig: t, head: (o) => n({ ...o, method: "HEAD" }), interceptors: a, options: (o) => n({ ...o, method: "OPTIONS" }), patch: (o) => n({ ...o, method: "PATCH" }), post: (o) => n({ ...o, method: "POST" }), put: (o) => n({ ...o, method: "PUT" }), request: n, setConfig: r, trace: (o) => n({ ...o, method: "TRACE" }) };
};
const W = nt(ge()), ut = (l) => ((l == null ? void 0 : l.client) ?? W).get({
  ...l,
  security: [
    {
      fn: "apiKey",
      in: "header",
      name: "Authorization"
    }
  ],
  url: "/addresses"
}), Ve = "https://address.api.myparcel.nl";
function it() {
  const l = g("acd37b05ce939d3d316537ba0f153099513965c9"), e = g(Ve);
  function t(a) {
    a.apiKey && (l.value = a.apiKey), a.apiUrl && (e.value = a.apiUrl);
  }
  function r() {
    typeof window < "u" && window.MyParcelAddressConfig && t(window.MyParcelAddressConfig);
  }
  return {
    apiKey: l,
    apiUrl: e,
    setConfig: t,
    setConfigFromWindow: r
  };
}
function dt() {
  var r;
  const { setConfigFromWindow: l, apiKey: e, apiUrl: t } = it();
  if (l(), !((r = t.value) != null && r.length))
    throw new Error("Cannot init API: API URL is not set");
  if (!e.value && t.value === Ve)
    throw new Error("An API key must be set when using the default API URL");
  return W.setConfig({
    baseUrl: t.value
  }), W.interceptors.request.use((a) => {
    var n;
    return (n = p(e)) != null && n.length && a.headers.set(
      "Authorization",
      `bearer ${btoa(p(e))}`
    ), a;
  }), {
    client: W
  };
}
const de = new Error("Request cancelled because of new input");
function ct() {
  const l = g(), e = g(!1), t = g(), r = (s) => {
    if (typeof s != "object" || s === null)
      return !1;
    const u = s;
    return u.type === "urn:problem:validation-error" && u.status === 400 && Array.isArray(u.errors);
  }, a = async (s, u, d, f) => {
    var v;
    if (p(d) !== "NL")
      throw new Error(
        "Postal code lookup is only supported for the Netherlands"
        // @TODO translate
      );
    const w = {
      query: {
        postalCode: p(s) || "",
        houseNumber: p(u) || "",
        houseNumberSuffix: (v = p(f)) != null && v.length ? p(f) : void 0,
        countryCode: p(d)
      },
      url: "/addresses"
    };
    await o(w);
  }, n = async (s, u) => {
    const d = {
      query: {
        query: p(s),
        countryCode: p(u)
      },
      url: "/addresses"
    };
    await o(d);
  }, o = async (s) => {
    var d, f;
    const { client: u } = dt();
    (d = t.value) == null || d.abort(de), t.value = new AbortController();
    try {
      e.value = !0;
      const { error: w, response: v, data: $ } = await ut({
        client: u,
        ...s,
        signal: (f = t.value) == null ? void 0 : f.signal
      });
      if (e.value = !1, w)
        throw w;
      if (!v.ok)
        throw new Error("Failed to fetch address");
      l.value = $.results;
    } catch (w) {
      if (e.value = !1, w === de) {
        console.debug(
          "Request was aborted because it did not finish in time for new input."
        );
        return;
      }
      throw w;
    }
  };
  return {
    addressResults: l,
    loading: e,
    isProblemDetailsBadRequest: r,
    fetchAddressByPostalCode: a,
    fetchAddressBySearchQuery: n
  };
}
const pt = 3, mt = 6;
function ft(l) {
  const e = g(), t = g(), r = g(), a = g(), n = g(), o = g(), s = g(), u = g(), d = () => {
    u.value = void 0, t.value = void 0, r.value = void 0, a.value = void 0, n.value = void 0, o.value = void 0, s.value = void 0;
  }, f = (y) => {
    u.value = y, t.value = y.postalCode, r.value = y.houseNumber, a.value = y.houseNumberSuffix, n.value = y.street, o.value = y.city;
  };
  function w(y) {
    var N, b;
    return p(y.countryCode) === "NL" && (((N = p(y.postalCode)) == null ? void 0 : N.length) ?? 0) >= mt && (((b = p(y.houseNumber)) == null ? void 0 : b.length) ?? 0) > 0;
  }
  const v = M(() => {
    const y = new RegExp(
      `(?=.*[a-zA-Z]{${pt},})(?=.*\\d)`
    );
    return !!s.value && y.test(s.value);
  }), $ = M(() => w({
    countryCode: e,
    postalCode: t,
    houseNumber: r
  }));
  return l && fe(u, (y) => {
    l("address-selected", y || null), window.dispatchEvent(
      new CustomEvent("address-selected", { detail: y })
    );
  }), {
    countryCode: e,
    postalCode: t,
    houseNumber: r,
    houseNumberSuffix: a,
    street: n,
    city: o,
    searchQuery: s,
    selectedAddress: u,
    doReset: d,
    selectAddress: f,
    hasRequiredPostalcodeLookupAttributes: w,
    isReadyForPostalCodeLookup: $,
    isReadyForAutocompleteSearch: v
  };
}
const yt = ["data-loading"], vt = {
  key: 0,
  class: "text-red-500"
}, ht = {
  key: 1,
  class: "text-red-500"
}, bt = { key: 0 }, wt = {
  key: 0,
  class: "p-3 bg-slate-200 inline-block"
}, ce = 150, gt = /* @__PURE__ */ S({
  __name: "TheAddressWidget",
  emits: ["address-selected"],
  setup(l, { emit: e }) {
    const t = e, {
      countryCode: r,
      searchQuery: a,
      postalCode: n,
      houseNumber: o,
      houseNumberSuffix: s,
      street: u,
      city: d,
      selectedAddress: f,
      doReset: w,
      selectAddress: v,
      hasRequiredPostalcodeLookupAttributes: $,
      isReadyForAutocompleteSearch: y,
      isReadyForPostalCodeLookup: N
    } = ft(t), b = g(), U = g(!1), D = g(!1), {
      addressResults: R,
      loading: I,
      isProblemDetailsBadRequest: J,
      fetchAddressByPostalCode: _e,
      fetchAddressBySearchQuery: Ce
    } = ct(), Ae = () => {
      w(), R.value = void 0;
    }, H = ae(async () => {
      const h = {
        countryCode: r,
        postalCode: n,
        houseNumber: o,
        houseNumberSuffix: s
      };
      if ($(h))
        try {
          b.value = void 0, await _e(
            p(h.postalCode),
            p(h.houseNumber),
            p(h.countryCode),
            p(h.houseNumberSuffix)
          );
        } catch (c) {
          if (J(c))
            b.value = c.errors;
          else
            throw c;
        }
      else
        R.value = void 0;
    }, ce), xe = ae(async () => {
      if (y.value)
        try {
          b.value = void 0, await Ce(
            p(a),
            p(r)
          );
        } catch (h) {
          J(h) && (b.value = h.errors);
        }
      else
        R.value = void 0;
    }, ce), Z = () => {
      const h = { countryCode: r, postalCode: n, houseNumber: o };
      p(D) && $(h) && typeof u.value == "string" && typeof d.value == "string" && v({
        street: u.value,
        city: d.value,
        postalCode: p(h.postalCode.value),
        houseNumber: p(h.houseNumber.value),
        houseNumberSuffix: p(s),
        countryCode: p(h.countryCode),
        postOfficeBox: !1
        // cannot be user-defined, so assume false,
      });
    };
    return fe(R, (h) => {
      var c;
      !y.value && !N.value || (f.value = void 0, u.value = void 0, d.value = void 0, h != null && h.length ? U.value = !1 : (U.value = !0, console.warn("No address found, enter manually or try again")), h != null && h.length && ((c = p(h)) == null ? void 0 : c.length) === 1 && (U.value = !1, v(p(h)[0])));
    }), (h, c) => {
      var X, Y, ee, te, re, le;
      return m(), A(F, null, [
        c[10] || (c[10] = V("pre", null, `    Voorbeeld met toevoegingen:
    Herestraat 77
    9711 LC Groningen
  `, -1)),
        V("div", {
          class: "p-4 flex flex-col space-y-4 max-w-80",
          "data-loading": i(I)
        }, [
          _(Be, {
            modelValue: i(r),
            "onUpdate:modelValue": c[0] || (c[0] = (C) => j(r) ? r.value = C : null),
            onChange: P(Ae, ["stop"])
          }, null, 8, ["modelValue"]),
          (X = i(r)) != null && X.length ? (m(), A(F, { key: 0 }, [
            i(r) === "NL" ? (m(), A(F, { key: 0 }, [
              U.value && !((Y = b.value) != null && Y.length) ? (m(), A("span", vt, " No address found, are you sure the postal code and house number are correct? ")) : E("", !0),
              (ee = b.value) != null && ee.length ? (m(), A("span", ht, Q(b.value), 1)) : E("", !0),
              _(De, {
                modelValue: i(n),
                "onUpdate:modelValue": c[1] || (c[1] = (C) => j(n) ? n.value = C : null),
                onInput: P(i(H), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              _(Me, {
                modelValue: i(o),
                "onUpdate:modelValue": c[2] || (c[2] = (C) => j(o) ? o.value = C : null),
                onInput: P(i(H), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              _(We, {
                modelValue: i(s),
                "onUpdate:modelValue": c[3] || (c[3] = (C) => j(s) ? s.value = C : null),
                onInput: P(i(H), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              i(R) && ((te = i(R)) == null ? void 0 : te.length) > 1 && !i(I) ? (m(), x(ne, {
                key: 2,
                addresses: i(R),
                onAddressSelect: i(v)
              }, null, 8, ["addresses", "onAddressSelect"])) : E("", !0),
              i(N) ? (m(), A(F, { key: 3 }, [
                _(Le, {
                  modelValue: i(u),
                  "onUpdate:modelValue": c[4] || (c[4] = (C) => j(u) ? u.value = C : null),
                  readonly: !D.value,
                  disabled: i(I),
                  placeholder: i(I) ? "..." : "",
                  onInput: P(Z, ["stop"])
                }, null, 8, ["modelValue", "readonly", "disabled", "placeholder"]),
                _(He, {
                  modelValue: i(d),
                  "onUpdate:modelValue": c[5] || (c[5] = (C) => j(d) ? d.value = C : null),
                  readonly: !D.value,
                  disabled: i(I),
                  placeholder: i(I) ? "..." : "",
                  onInput: P(Z, ["stop"])
                }, null, 8, ["modelValue", "readonly", "disabled", "placeholder"]),
                !i(I) && !D.value ? (m(), x(Qe, {
                  key: 0,
                  onOverrideRequested: c[6] || (c[6] = (C) => D.value = !0)
                })) : E("", !0)
              ], 64)) : E("", !0)
            ], 64)) : (m(), A(F, { key: 1 }, [
              _(ke, {
                modelValue: i(a),
                "onUpdate:modelValue": c[7] || (c[7] = (C) => j(a) ? a.value = C : null),
                onInput: P(i(xe), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              (re = i(a)) != null && re.length && !i(y) ? (m(), A("p", bt, c[8] || (c[8] = [
                K(" Enter at least a street and house number to start searching."),
                V("br", null, null, -1),
                K(" Example: "),
                V("em", null, " Herestraat 77 ", -1)
              ]))) : E("", !0),
              i(R) && ((le = i(R)) == null ? void 0 : le.length) > 1 && !i(I) ? (m(), x(ne, {
                key: 1,
                addresses: i(R),
                onAddressSelect: i(v)
              }, null, 8, ["addresses", "onAddressSelect"])) : E("", !0)
            ], 64))
          ], 64)) : E("", !0)
        ], 8, yt),
        V("section", null, [
          c[9] || (c[9] = V("h2", { class: "font-bold" }, "Address to be sent to MyParcel:", -1)),
          i(f) ? (m(), A("pre", wt, Q(i(f)), 1)) : E("", !0)
        ])
      ], 64);
    };
  }
}), Vt = /* @__PURE__ */ S({
  __name: "App",
  setup(l) {
    return (e, t) => (m(), x(gt));
  }
}), At = qe(Vt);
export {
  At as default
};
//# sourceMappingURL=main.js.map
