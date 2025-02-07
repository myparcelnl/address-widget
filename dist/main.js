var Se = Object.defineProperty;
var Ne = (o, e, t) => e in o ? Se(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var le = (o, e, t) => Ne(o, typeof e != "symbol" ? e + "" : e, t);
import { toValue as p, defineComponent as S, useModel as U, withDirectives as pe, openBlock as f, createElementBlock as A, vModelText as $e, renderSlot as Re, createBlock as x, withCtx as q, createElementVNode as V, createVNode as _, mergeProps as k, mergeModels as fe, computed as M, Fragment as F, renderList as Oe, toDisplayString as K, vModelSelect as Ee, createTextVNode as Q, withModifiers as P, ref as w, watch as me, unref as i, isRef as j, createCommentVNode as E, createApp as Ue } from "vue";
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
    r(s);
  new MutationObserver((s) => {
    for (const a of s)
      if (a.type === "childList")
        for (const l of a.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const a = {};
    return s.integrity && (a.integrity = s.integrity), s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? a.credentials = "include" : s.crossOrigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin", a;
  }
  function r(s) {
    if (s.ep)
      return;
    s.ep = !0;
    const a = t(s);
    fetch(s.href, a);
  }
})();
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const se = () => {
};
function qe(o, e) {
  function t(...r) {
    return new Promise((s, a) => {
      Promise.resolve(o(() => e.apply(this, r), { fn: e, thisArg: this, args: r })).then(s).catch(a);
    });
  }
  return t;
}
function Te(o, e = {}) {
  let t, r, s = se;
  const a = (n) => {
    clearTimeout(n), s(), s = se;
  };
  return (n) => {
    const u = p(o), d = p(e.maxWait);
    return t && a(t), u <= 0 || d !== void 0 && d <= 0 ? (r && (a(r), r = null), Promise.resolve(n())) : new Promise((m, g) => {
      s = e.rejectOnCancel ? g : m, d && !r && (r = setTimeout(() => {
        t && a(t), r = null, m(n());
      }, d)), t = setTimeout(() => {
        r && a(r), r = null, m(n());
      }, u);
    });
  };
}
function ne(o, e = 200, t = {}) {
  return qe(
    Te(e, t),
    o
  );
}
const Ie = /* @__PURE__ */ S({
  __name: "BaseTextField",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => pe((f(), A("input", {
      "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
      type: "text"
    }, null, 512)), [
      [$e, e.value]
    ]);
  }
}), G = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, L = /* @__PURE__ */ G(Ie, [["__scopeId", "data-v-d3af3741"]]), Pe = {};
function je(o, e) {
  return f(), A("div", null, [
    Re(o.$slots, "default")
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
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => (f(), x(T, null, {
      default: q(() => [
        r[1] || (r[1] = V("label", { for: "searchQuery" }, "Street, Housenumber, City", -1)),
        _(L, k({
          id: "searchQuery",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
          name: "searchQuery",
          required: ""
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), Fe = ["value"], ye = /* @__PURE__ */ S({
  __name: "BaseSelect",
  props: /* @__PURE__ */ fe({
    options: {},
    addEmptyOption: { type: Boolean, default: !0 }
  }, {
    modelValue: { default: "" },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = U(o, "modelValue"), r = M(() => e.addEmptyOption ? [{ value: "", label: "Select an option" }, ...e.options] : e.options);
    return (s, a) => pe((f(), A("select", {
      "onUpdate:modelValue": a[0] || (a[0] = (l) => t.value = l)
    }, [
      (f(!0), A(F, null, Oe(r.value, (l) => (f(), A("option", {
        key: l.value,
        value: l.value
      }, K(l.label), 9, Fe))), 128))
    ], 512)), [
      [Ee, t.value]
    ]);
  }
}), ae = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldAddressSelect",
  props: {
    addresses: {}
  },
  emits: ["address-select"],
  setup(o, { emit: e }) {
    const t = o, r = e, s = M(() => t.addresses.map((l, n) => ({
      value: n.toString(),
      label: `${l.street} ${l.houseNumber}${l.houseNumberSuffix || ""}, ${l.city}`
    }))), a = (l) => {
      const n = l.target;
      if (!n.value) return;
      const u = parseInt(n.value), d = t.addresses[u];
      r("address-select", d);
    };
    return (l, n) => (f(), x(T, null, {
      default: q(() => [
        n[0] || (n[0] = V("label", { for: "addressSelect" }, "Select the right address", -1)),
        _(ye, {
          name: "addressSelect",
          options: s.value,
          onInput: a
        }, null, 8, ["options"])
      ]),
      _: 1
    }));
  }
}), Le = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldCountry",
  props: /* @__PURE__ */ fe({
    allowedCountries: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = U(o, "modelValue"), t = o, r = [
      { code: "NL", label: "Netherlands" },
      { code: "BE", label: "Belgium" }
    ], s = M(
      () => {
        var a;
        return (a = t.allowedCountries) != null && a.length ? t.allowedCountries.map((l) => ({
          value: l.code,
          label: l.label
        })) : r.map((l) => ({
          value: l.code,
          label: l.label
        }));
      }
    );
    return (a, l) => (f(), x(T, null, {
      default: q(() => [
        l[1] || (l[1] = V("label", { for: "country" }, "Country", -1)),
        _(ye, k({
          modelValue: e.value,
          "onUpdate:modelValue": l[0] || (l[0] = (n) => e.value = n),
          name: "country",
          options: s.value,
          required: ""
        }, a.$attrs), null, 16, ["modelValue", "options"])
      ]),
      _: 1
    }));
  }
}), Be = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldPostalCode",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => (f(), x(T, null, {
      default: q(() => [
        r[1] || (r[1] = V("label", { for: "postalCode" }, "Postal code", -1)),
        _(L, k({
          id: "postalCode",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
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
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => (f(), x(T, null, {
      default: q(() => [
        r[1] || (r[1] = V("label", { for: "houseNumber" }, "House number", -1)),
        _(L, k({
          id: "houseNumber",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
          name: "houseNumber",
          length: "8",
          required: "",
          inputmode: "numeric"
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), De = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldHouseNumberSuffix",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => (f(), x(T, null, {
      default: q(() => [
        r[1] || (r[1] = V("label", { for: "houseNumberSuffix" }, [
          Q("House number suffix "),
          V("em", null, "(optional)")
        ], -1)),
        _(L, k({
          id: "houseNumberSuffix",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
          name: "houseNumberSuffix",
          length: "5"
        }, t.$attrs), null, 16, ["modelValue"])
      ]),
      _: 1
    }));
  }
}), We = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "FieldStreet",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => (f(), x(T, null, {
      default: q(() => [
        r[1] || (r[1] = V("label", { for: "street" }, "Street", -1)),
        _(L, k({
          id: "street",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
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
  setup(o) {
    const e = U(o, "modelValue");
    return (t, r) => (f(), x(T, null, {
      default: q(() => [
        r[1] || (r[1] = V("label", { for: "city" }, "City", -1)),
        _(L, k({
          id: "city",
          modelValue: e.value,
          "onUpdate:modelValue": r[0] || (r[0] = (s) => e.value = s),
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
  setup(o, { emit: e }) {
    const t = e;
    function r() {
      t("override-requested");
    }
    return (s, a) => (f(), x(T, null, {
      default: q(() => [
        V("button", {
          onClick: P(r, ["prevent"])
        }, "Override address")
      ]),
      _: 1
    }));
  }
}), Ke = /* @__PURE__ */ G(ze, [["__scopeId", "data-v-66a6eb81"]]);
var Qe = /\{[^{}]+\}/g, W = ({ allowReserved: o, name: e, value: t }) => {
  if (t == null) return "";
  if (typeof t == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${o ? t : encodeURIComponent(t)}`;
}, Ge = (o) => {
  switch (o) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Je = (o) => {
  switch (o) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, Ze = (o) => {
  switch (o) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, ve = ({ allowReserved: o, explode: e, name: t, style: r, value: s }) => {
  if (!e) {
    let n = (o ? s : s.map((u) => encodeURIComponent(u))).join(Je(r));
    switch (r) {
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${t}=${n}`;
      case "simple":
        return n;
      default:
        return `${t}=${n}`;
    }
  }
  let a = Ge(r), l = s.map((n) => r === "label" || r === "simple" ? o ? n : encodeURIComponent(n) : W({ allowReserved: o, name: t, value: n })).join(a);
  return r === "label" || r === "matrix" ? a + l : l;
}, he = ({ allowReserved: o, explode: e, name: t, style: r, value: s }) => {
  if (s instanceof Date) return `${t}=${s.toISOString()}`;
  if (r !== "deepObject" && !e) {
    let n = [];
    Object.entries(s).forEach(([d, m]) => {
      n = [...n, d, o ? m : encodeURIComponent(m)];
    });
    let u = n.join(",");
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
  let a = Ze(r), l = Object.entries(s).map(([n, u]) => W({ allowReserved: o, name: r === "deepObject" ? `${t}[${n}]` : n, value: u })).join(a);
  return r === "label" || r === "matrix" ? a + l : l;
}, Xe = ({ path: o, url: e }) => {
  let t = e, r = e.match(Qe);
  if (r) for (let s of r) {
    let a = !1, l = s.substring(1, s.length - 1), n = "simple";
    l.endsWith("*") && (a = !0, l = l.substring(0, l.length - 1)), l.startsWith(".") ? (l = l.substring(1), n = "label") : l.startsWith(";") && (l = l.substring(1), n = "matrix");
    let u = o[l];
    if (u == null) continue;
    if (Array.isArray(u)) {
      t = t.replace(s, ve({ explode: a, name: l, style: n, value: u }));
      continue;
    }
    if (typeof u == "object") {
      t = t.replace(s, he({ explode: a, name: l, style: n, value: u }));
      continue;
    }
    if (n === "matrix") {
      t = t.replace(s, `;${W({ name: l, value: u })}`);
      continue;
    }
    let d = encodeURIComponent(n === "label" ? `.${u}` : u);
    t = t.replace(s, d);
  }
  return t;
}, be = ({ allowReserved: o, array: e, object: t } = {}) => (r) => {
  let s = [];
  if (r && typeof r == "object") for (let a in r) {
    let l = r[a];
    if (l != null) {
      if (Array.isArray(l)) {
        s = [...s, ve({ allowReserved: o, explode: !0, name: a, style: "form", value: l, ...e })];
        continue;
      }
      if (typeof l == "object") {
        s = [...s, he({ allowReserved: o, explode: !0, name: a, style: "deepObject", value: l, ...t })];
        continue;
      }
      s = [...s, W({ allowReserved: o, name: a, value: l })];
    }
  }
  return s.join("&");
}, Ye = (o) => {
  var t;
  if (!o) return;
  let e = (t = o.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((r) => e.startsWith(r))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, et = async (o, e) => {
  if (o.fn === "accessToken") {
    let t = typeof e.accessToken == "function" ? await e.accessToken() : e.accessToken;
    return t ? `Bearer ${t}` : void 0;
  }
  if (o.fn === "apiKey") return typeof e.apiKey == "function" ? await e.apiKey() : e.apiKey;
}, tt = async ({ security: o, ...e }) => {
  for (let t of o) {
    let r = await et(t, e);
    if (r) {
      t.in === "header" ? e.headers.set(t.name, r) : t.in === "query" && (e.query || (e.query = {}), e.query[t.name] = r);
      return;
    }
  }
}, ue = (o) => rt({ baseUrl: o.baseUrl ?? "", path: o.path, query: o.query, querySerializer: typeof o.querySerializer == "function" ? o.querySerializer : be(o.querySerializer), url: o.url }), rt = ({ baseUrl: o, path: e, query: t, querySerializer: r, url: s }) => {
  let a = s.startsWith("/") ? s : `/${s}`, l = o + a;
  e && (l = Xe({ path: e, url: l }));
  let n = t ? r(t) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (l += `?${n}`), l;
}, ie = (o, e) => {
  var r;
  let t = { ...o, ...e };
  return (r = t.baseUrl) != null && r.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = ge(o.headers, e.headers), t;
}, ge = (...o) => {
  let e = new Headers();
  for (let t of o) {
    if (!t || typeof t != "object") continue;
    let r = t instanceof Headers ? t.entries() : Object.entries(t);
    for (let [s, a] of r) if (a === null) e.delete(s);
    else if (Array.isArray(a)) for (let l of a) e.append(s, l);
    else a !== void 0 && e.set(s, typeof a == "object" ? JSON.stringify(a) : a);
  }
  return e;
}, z = class {
  constructor() {
    le(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(o) {
    return this._fns.indexOf(o) !== -1;
  }
  eject(o) {
    let e = this._fns.indexOf(o);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(o) {
    this._fns = [...this._fns, o];
  }
}, ot = () => ({ error: new z(), request: new z(), response: new z() }), lt = { bodySerializer: (o) => JSON.stringify(o) }, st = be({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), nt = { "Content-Type": "application/json" }, we = (o = {}) => ({ ...lt, baseUrl: "", headers: nt, parseAs: "auto", querySerializer: st, ...o }), at = (o = {}) => {
  let e = ie(we(), o), t = () => ({ ...e }), r = (l) => (e = ie(e, l), t()), s = ot(), a = async (l) => {
    let n = { ...e, ...l, fetch: l.fetch ?? e.fetch ?? globalThis.fetch, headers: ge(e.headers, l.headers) };
    n.security && await tt({ ...n, security: n.security }), n.body && n.bodySerializer && (n.body = n.bodySerializer(n.body)), n.body || n.headers.delete("Content-Type");
    let u = ue(n), d = { redirect: "follow", ...n }, m = new Request(u, d);
    for (let b of s.request._fns) m = await b(m, n);
    let g = n.fetch, v = await g(m);
    for (let b of s.response._fns) v = await b(v, m, n);
    let N = { request: m, response: v };
    if (v.ok) {
      if (v.status === 204 || v.headers.get("Content-Length") === "0") return { data: {}, ...N };
      if (n.parseAs === "stream") return { data: v.body, ...N };
      let b = (n.parseAs === "auto" ? Ye(v.headers.get("Content-Type")) : n.parseAs) ?? "json", O = await v[b]();
      return b === "json" && (n.responseValidator && await n.responseValidator(O), n.responseTransformer && (O = await n.responseTransformer(O))), { data: O, ...N };
    }
    let y = await v.text();
    try {
      y = JSON.parse(y);
    } catch {
    }
    let $ = y;
    for (let b of s.error._fns) $ = await b(y, v, m, n);
    if ($ = $ || {}, n.throwOnError) throw $;
    return { error: $, ...N };
  };
  return { buildUrl: ue, connect: (l) => a({ ...l, method: "CONNECT" }), delete: (l) => a({ ...l, method: "DELETE" }), get: (l) => a({ ...l, method: "GET" }), getConfig: t, head: (l) => a({ ...l, method: "HEAD" }), interceptors: s, options: (l) => a({ ...l, method: "OPTIONS" }), patch: (l) => a({ ...l, method: "PATCH" }), post: (l) => a({ ...l, method: "POST" }), put: (l) => a({ ...l, method: "PUT" }), request: a, setConfig: r, trace: (l) => a({ ...l, method: "TRACE" }) };
};
const D = at(we()), ut = (o) => ((o == null ? void 0 : o.client) ?? D).get({
  ...o,
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
  const o = w("acd37b05ce939d3d316537ba0f153099513965c9"), e = w(Ve);
  function t(s) {
    s.apiKey && (o.value = s.apiKey), s.apiUrl && (e.value = s.apiUrl);
  }
  function r() {
    typeof window < "u" && window.MyParcelAddressConfig && t(window.MyParcelAddressConfig);
  }
  return {
    apiKey: o,
    apiUrl: e,
    setConfig: t,
    setConfigFromWindow: r
  };
}
function dt() {
  var r;
  const { setConfigFromWindow: o, apiKey: e, apiUrl: t } = it();
  if (o(), !((r = t.value) != null && r.length))
    throw new Error("Cannot init API: API URL is not set");
  if (!e.value && t.value === Ve)
    throw new Error("An API key must be set when using the default API URL");
  return D.setConfig({
    baseUrl: t.value
  }), D.interceptors.request.use((s) => {
    var a;
    return (a = p(e)) != null && a.length && s.headers.set(
      "Authorization",
      `bearer ${btoa(p(e))}`
    ), s;
  }), {
    client: D
  };
}
const de = new Error("Request cancelled because of new input");
function ct() {
  const o = w(), e = w(!1), t = w(), r = (n) => {
    if (typeof n != "object" || n === null)
      return !1;
    const u = n;
    return u.type === "urn:problem:validation-error" && u.status === 400 && Array.isArray(u.errors);
  }, s = async (n, u, d, m) => {
    var v;
    if (p(d) !== "NL")
      throw new Error(
        "Postal code lookup is only supported for the Netherlands"
        // @TODO translate
      );
    const g = {
      query: {
        postalCode: p(n) || "",
        houseNumber: p(u) || "",
        houseNumberSuffix: (v = p(m)) != null && v.length ? p(m) : void 0,
        countryCode: p(d)
      },
      url: "/addresses"
    };
    await l(g);
  }, a = async (n, u) => {
    const d = {
      query: {
        query: p(n),
        countryCode: p(u)
      },
      url: "/addresses"
    };
    await l(d);
  }, l = async (n) => {
    var d, m;
    const { client: u } = dt();
    (d = t.value) == null || d.abort(de), t.value = new AbortController();
    try {
      e.value = !0;
      const { error: g, response: v, data: N } = await ut({
        client: u,
        ...n,
        signal: (m = t.value) == null ? void 0 : m.signal
      });
      if (e.value = !1, g)
        throw g;
      if (!v.ok)
        throw new Error("Failed to fetch address");
      o.value = N.results;
    } catch (g) {
      if (e.value = !1, g === de) {
        console.debug(
          "Request was aborted because it did not finish in time for new input."
        );
        return;
      }
      throw g;
    }
  };
  return {
    addressResults: o,
    loading: e,
    isProblemDetailsBadRequest: r,
    fetchAddressByPostalCode: s,
    fetchAddressBySearchQuery: a
  };
}
const pt = 3, ft = 6;
function mt(o) {
  const e = w(), t = w(), r = w(), s = w(), a = w(), l = w(), n = w(), u = w(), d = () => {
    u.value = void 0, t.value = void 0, r.value = void 0, s.value = void 0, a.value = void 0, l.value = void 0, n.value = void 0;
  }, m = (y) => {
    u.value = y, t.value = y.postalCode, r.value = y.houseNumber, s.value = y.houseNumberSuffix, a.value = y.street, l.value = y.city;
  };
  function g(y) {
    var $, b;
    return p(y.countryCode) === "NL" && ((($ = p(y.postalCode)) == null ? void 0 : $.length) ?? 0) >= ft && (((b = p(y.houseNumber)) == null ? void 0 : b.length) ?? 0) > 0;
  }
  const v = M(() => {
    const y = new RegExp(
      `(?=.*[a-zA-Z]{${pt},})(?=.*\\d)`
    );
    return !!n.value && y.test(n.value);
  }), N = M(() => g({
    countryCode: e,
    postalCode: t,
    houseNumber: r
  }));
  return o && me(u, (y) => {
    o("address-selected", y || null), window.dispatchEvent(
      new CustomEvent("address-selected", { detail: y })
    );
  }), {
    countryCode: e,
    postalCode: t,
    houseNumber: r,
    houseNumberSuffix: s,
    street: a,
    city: l,
    searchQuery: n,
    selectedAddress: u,
    doReset: d,
    selectAddress: m,
    hasRequiredPostalcodeLookupAttributes: g,
    isReadyForPostalCodeLookup: N,
    isReadyForAutocompleteSearch: v
  };
}
const yt = ["data-loading"], vt = {
  key: 0,
  class: "text-red-500"
}, ht = {
  key: 1,
  class: "text-red-500"
}, bt = { key: 0 }, gt = {
  key: 0,
  class: "p-3 bg-slate-200 inline-block"
}, ce = 150, wt = /* @__PURE__ */ S({
  __name: "TheAddressWidget",
  emits: ["address-selected"],
  setup(o, { emit: e }) {
    const t = e, {
      countryCode: r,
      searchQuery: s,
      postalCode: a,
      houseNumber: l,
      houseNumberSuffix: n,
      street: u,
      city: d,
      selectedAddress: m,
      doReset: g,
      selectAddress: v,
      hasRequiredPostalcodeLookupAttributes: N,
      isReadyForAutocompleteSearch: y,
      isReadyForPostalCodeLookup: $
    } = mt(t), b = w(), O = w(!1), B = w(!1), {
      addressResults: R,
      loading: I,
      isProblemDetailsBadRequest: J,
      fetchAddressByPostalCode: _e,
      fetchAddressBySearchQuery: Ce
    } = ct(), Ae = () => {
      g(), R.value = void 0;
    }, H = ne(async () => {
      const h = {
        countryCode: r,
        postalCode: a,
        houseNumber: l,
        houseNumberSuffix: n
      };
      if (N(h))
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
    }, ce), xe = ne(async () => {
      if (y.value)
        try {
          b.value = void 0, await Ce(
            p(s),
            p(r)
          );
        } catch (h) {
          J(h) && (b.value = h.errors);
        }
      else
        R.value = void 0;
    }, ce), Z = () => {
      const h = { countryCode: r, postalCode: a, houseNumber: l };
      p(B) && N(h) && typeof u.value == "string" && typeof d.value == "string" && v({
        street: u.value,
        city: d.value,
        postalCode: p(h.postalCode.value),
        houseNumber: p(h.houseNumber.value),
        houseNumberSuffix: p(n),
        countryCode: p(h.countryCode),
        postOfficeBox: !1
        // cannot be user-defined, so assume false,
      });
    };
    return me(R, (h) => {
      var c;
      !y.value && !$.value || (m.value = void 0, u.value = void 0, d.value = void 0, h != null && h.length ? O.value = !1 : (O.value = !0, console.warn("No address found, enter manually or try again")), h != null && h.length && ((c = p(h)) == null ? void 0 : c.length) === 1 && (O.value = !1, v(p(h)[0])));
    }), (h, c) => {
      var X, Y, ee, te, re, oe;
      return f(), A(F, null, [
        c[10] || (c[10] = V("pre", null, `    Voorbeeld met toevoegingen:
    Herestraat 77
    9711 LC Groningen
  `, -1)),
        V("div", {
          class: "p-4 flex flex-col space-y-4 max-w-80",
          "data-loading": i(I)
        }, [
          _(Le, {
            modelValue: i(r),
            "onUpdate:modelValue": c[0] || (c[0] = (C) => j(r) ? r.value = C : null),
            onChange: P(Ae, ["stop"])
          }, null, 8, ["modelValue"]),
          (X = i(r)) != null && X.length ? (f(), A(F, { key: 0 }, [
            i(r) === "NL" ? (f(), A(F, { key: 0 }, [
              O.value && !((Y = b.value) != null && Y.length) ? (f(), A("span", vt, " No address found, are you sure the postal code and house number are correct? ")) : E("", !0),
              (ee = b.value) != null && ee.length ? (f(), A("span", ht, K(b.value), 1)) : E("", !0),
              _(Be, {
                modelValue: i(a),
                "onUpdate:modelValue": c[1] || (c[1] = (C) => j(a) ? a.value = C : null),
                onInput: P(i(H), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              _(Me, {
                modelValue: i(l),
                "onUpdate:modelValue": c[2] || (c[2] = (C) => j(l) ? l.value = C : null),
                onInput: P(i(H), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              _(De, {
                modelValue: i(n),
                "onUpdate:modelValue": c[3] || (c[3] = (C) => j(n) ? n.value = C : null),
                onInput: P(i(H), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              i(R) && ((te = i(R)) == null ? void 0 : te.length) > 1 && !i(I) ? (f(), x(ae, {
                key: 2,
                addresses: i(R),
                onAddressSelect: i(v)
              }, null, 8, ["addresses", "onAddressSelect"])) : E("", !0),
              i($) ? (f(), A(F, { key: 3 }, [
                _(We, {
                  modelValue: i(u),
                  "onUpdate:modelValue": c[4] || (c[4] = (C) => j(u) ? u.value = C : null),
                  readonly: !B.value,
                  disabled: i(I),
                  placeholder: i(I) ? "..." : "",
                  onInput: P(Z, ["stop"])
                }, null, 8, ["modelValue", "readonly", "disabled", "placeholder"]),
                _(He, {
                  modelValue: i(d),
                  "onUpdate:modelValue": c[5] || (c[5] = (C) => j(d) ? d.value = C : null),
                  readonly: !B.value,
                  disabled: i(I),
                  placeholder: i(I) ? "..." : "",
                  onInput: P(Z, ["stop"])
                }, null, 8, ["modelValue", "readonly", "disabled", "placeholder"]),
                !i(I) && !B.value ? (f(), x(Ke, {
                  key: 0,
                  onOverrideRequested: c[6] || (c[6] = (C) => B.value = !0)
                })) : E("", !0)
              ], 64)) : E("", !0)
            ], 64)) : (f(), A(F, { key: 1 }, [
              _(ke, {
                modelValue: i(s),
                "onUpdate:modelValue": c[7] || (c[7] = (C) => j(s) ? s.value = C : null),
                onInput: P(i(xe), ["stop"])
              }, null, 8, ["modelValue", "onInput"]),
              (re = i(s)) != null && re.length && !i(y) ? (f(), A("p", bt, c[8] || (c[8] = [
                Q(" Enter at least a street and house number to start searching."),
                V("br", null, null, -1),
                Q(" Example: "),
                V("em", null, " Herestraat 77 ", -1)
              ]))) : E("", !0),
              i(R) && ((oe = i(R)) == null ? void 0 : oe.length) > 1 && !i(I) ? (f(), x(ae, {
                key: 1,
                addresses: i(R),
                onAddressSelect: i(v)
              }, null, 8, ["addresses", "onAddressSelect"])) : E("", !0)
            ], 64))
          ], 64)) : E("", !0)
        ], 8, yt),
        V("section", null, [
          c[9] || (c[9] = V("h2", { class: "font-bold" }, "Address to be sent to MyParcel:", -1)),
          i(m) ? (f(), A("pre", gt, K(i(m)), 1)) : E("", !0)
        ])
      ], 64);
    };
  }
}), Vt = /* @__PURE__ */ S({
  __name: "App",
  setup(o) {
    return (e, t) => (f(), x(wt));
  }
}), _t = Ue(Vt);
_t.mount("#form");
//# sourceMappingURL=main.js.map
