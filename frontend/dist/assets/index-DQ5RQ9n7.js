var qS=Object.defineProperty;var YS=(s,t,i)=>t in s?qS(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var sv=(s,t,i)=>YS(s,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function N0(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Rh={exports:{}},Ho={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ov;function ZS(){if(ov)return Ho;ov=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(r,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:s,type:r,key:f,ref:l!==void 0?l:null,props:c}}return Ho.Fragment=t,Ho.jsx=i,Ho.jsxs=i,Ho}var lv;function KS(){return lv||(lv=1,Rh.exports=ZS()),Rh.exports}var I=KS(),Ch={exports:{}},oe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cv;function QS(){if(cv)return oe;cv=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),y=Symbol.iterator;function M(O){return O===null||typeof O!="object"?null:(O=y&&O[y]||O["@@iterator"],typeof O=="function"?O:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function v(O,st,St){this.props=O,this.context=st,this.refs=S,this.updater=St||E}v.prototype.isReactComponent={},v.prototype.setState=function(O,st){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,st,"setState")},v.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function L(){}L.prototype=v.prototype;function U(O,st,St){this.props=O,this.context=st,this.refs=S,this.updater=St||E}var w=U.prototype=new L;w.constructor=U,T(w,v.prototype),w.isPureReactComponent=!0;var B=Array.isArray;function H(){}var N={H:null,A:null,T:null,S:null},X=Object.prototype.hasOwnProperty;function D(O,st,St){var Z=St.ref;return{$$typeof:s,type:O,key:st,ref:Z!==void 0?Z:null,props:St}}function C(O,st){return D(O.type,st,O.props)}function V(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function rt(O){var st={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(St){return st[St]})}var nt=/\/+/g;function ft(O,st){return typeof O=="object"&&O!==null&&O.key!=null?rt(""+O.key):st.toString(36)}function ut(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(H,H):(O.status="pending",O.then(function(st){O.status==="pending"&&(O.status="fulfilled",O.value=st)},function(st){O.status==="pending"&&(O.status="rejected",O.reason=st)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function z(O,st,St,Z,pt){var At=typeof O;(At==="undefined"||At==="boolean")&&(O=null);var Et=!1;if(O===null)Et=!0;else switch(At){case"bigint":case"string":case"number":Et=!0;break;case"object":switch(O.$$typeof){case s:case t:Et=!0;break;case g:return Et=O._init,z(Et(O._payload),st,St,Z,pt)}}if(Et)return pt=pt(O),Et=Z===""?"."+ft(O,0):Z,B(pt)?(St="",Et!=null&&(St=Et.replace(nt,"$&/")+"/"),z(pt,st,St,"",function($t){return $t})):pt!=null&&(V(pt)&&(pt=C(pt,St+(pt.key==null||O&&O.key===pt.key?"":(""+pt.key).replace(nt,"$&/")+"/")+Et)),st.push(pt)),1;Et=0;var zt=Z===""?".":Z+":";if(B(O))for(var Jt=0;Jt<O.length;Jt++)Z=O[Jt],At=zt+ft(Z,Jt),Et+=z(Z,st,St,At,pt);else if(Jt=M(O),typeof Jt=="function")for(O=Jt.call(O),Jt=0;!(Z=O.next()).done;)Z=Z.value,At=zt+ft(Z,Jt++),Et+=z(Z,st,St,At,pt);else if(At==="object"){if(typeof O.then=="function")return z(ut(O),st,St,Z,pt);throw st=String(O),Error("Objects are not valid as a React child (found: "+(st==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":st)+"). If you meant to render a collection of children, use an array instead.")}return Et}function Q(O,st,St){if(O==null)return O;var Z=[],pt=0;return z(O,Z,"","",function(At){return st.call(St,At,pt++)}),Z}function K(O){if(O._status===-1){var st=O._result;st=st(),st.then(function(St){(O._status===0||O._status===-1)&&(O._status=1,O._result=St)},function(St){(O._status===0||O._status===-1)&&(O._status=2,O._result=St)}),O._status===-1&&(O._status=0,O._result=st)}if(O._status===1)return O._result.default;throw O._result}var Mt=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var st=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(st))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},Ct={map:Q,forEach:function(O,st,St){Q(O,function(){st.apply(this,arguments)},St)},count:function(O){var st=0;return Q(O,function(){st++}),st},toArray:function(O){return Q(O,function(st){return st})||[]},only:function(O){if(!V(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return oe.Activity=_,oe.Children=Ct,oe.Component=v,oe.Fragment=i,oe.Profiler=l,oe.PureComponent=U,oe.StrictMode=r,oe.Suspense=p,oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,oe.__COMPILER_RUNTIME={__proto__:null,c:function(O){return N.H.useMemoCache(O)}},oe.cache=function(O){return function(){return O.apply(null,arguments)}},oe.cacheSignal=function(){return null},oe.cloneElement=function(O,st,St){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var Z=T({},O.props),pt=O.key;if(st!=null)for(At in st.key!==void 0&&(pt=""+st.key),st)!X.call(st,At)||At==="key"||At==="__self"||At==="__source"||At==="ref"&&st.ref===void 0||(Z[At]=st[At]);var At=arguments.length-2;if(At===1)Z.children=St;else if(1<At){for(var Et=Array(At),zt=0;zt<At;zt++)Et[zt]=arguments[zt+2];Z.children=Et}return D(O.type,pt,Z)},oe.createContext=function(O){return O={$$typeof:f,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},oe.createElement=function(O,st,St){var Z,pt={},At=null;if(st!=null)for(Z in st.key!==void 0&&(At=""+st.key),st)X.call(st,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(pt[Z]=st[Z]);var Et=arguments.length-2;if(Et===1)pt.children=St;else if(1<Et){for(var zt=Array(Et),Jt=0;Jt<Et;Jt++)zt[Jt]=arguments[Jt+2];pt.children=zt}if(O&&O.defaultProps)for(Z in Et=O.defaultProps,Et)pt[Z]===void 0&&(pt[Z]=Et[Z]);return D(O,At,pt)},oe.createRef=function(){return{current:null}},oe.forwardRef=function(O){return{$$typeof:d,render:O}},oe.isValidElement=V,oe.lazy=function(O){return{$$typeof:g,_payload:{_status:-1,_result:O},_init:K}},oe.memo=function(O,st){return{$$typeof:m,type:O,compare:st===void 0?null:st}},oe.startTransition=function(O){var st=N.T,St={};N.T=St;try{var Z=O(),pt=N.S;pt!==null&&pt(St,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(H,Mt)}catch(At){Mt(At)}finally{st!==null&&St.types!==null&&(st.types=St.types),N.T=st}},oe.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},oe.use=function(O){return N.H.use(O)},oe.useActionState=function(O,st,St){return N.H.useActionState(O,st,St)},oe.useCallback=function(O,st){return N.H.useCallback(O,st)},oe.useContext=function(O){return N.H.useContext(O)},oe.useDebugValue=function(){},oe.useDeferredValue=function(O,st){return N.H.useDeferredValue(O,st)},oe.useEffect=function(O,st){return N.H.useEffect(O,st)},oe.useEffectEvent=function(O){return N.H.useEffectEvent(O)},oe.useId=function(){return N.H.useId()},oe.useImperativeHandle=function(O,st,St){return N.H.useImperativeHandle(O,st,St)},oe.useInsertionEffect=function(O,st){return N.H.useInsertionEffect(O,st)},oe.useLayoutEffect=function(O,st){return N.H.useLayoutEffect(O,st)},oe.useMemo=function(O,st){return N.H.useMemo(O,st)},oe.useOptimistic=function(O,st){return N.H.useOptimistic(O,st)},oe.useReducer=function(O,st,St){return N.H.useReducer(O,st,St)},oe.useRef=function(O){return N.H.useRef(O)},oe.useState=function(O){return N.H.useState(O)},oe.useSyncExternalStore=function(O,st,St){return N.H.useSyncExternalStore(O,st,St)},oe.useTransition=function(){return N.H.useTransition()},oe.version="19.2.7",oe}var uv;function rp(){return uv||(uv=1,Ch.exports=QS()),Ch.exports}var et=rp();const JS=N0(et);var wh={exports:{}},Go={},Dh={exports:{}},Uh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fv;function $S(){return fv||(fv=1,(function(s){function t(z,Q){var K=z.length;z.push(Q);t:for(;0<K;){var Mt=K-1>>>1,Ct=z[Mt];if(0<l(Ct,Q))z[Mt]=Q,z[K]=Ct,K=Mt;else break t}}function i(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var Q=z[0],K=z.pop();if(K!==Q){z[0]=K;t:for(var Mt=0,Ct=z.length,O=Ct>>>1;Mt<O;){var st=2*(Mt+1)-1,St=z[st],Z=st+1,pt=z[Z];if(0>l(St,K))Z<Ct&&0>l(pt,St)?(z[Mt]=pt,z[Z]=K,Mt=Z):(z[Mt]=St,z[st]=K,Mt=st);else if(Z<Ct&&0>l(pt,K))z[Mt]=pt,z[Z]=K,Mt=Z;else break t}}return Q}function l(z,Q){var K=z.sortIndex-Q.sortIndex;return K!==0?K:z.id-Q.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();s.unstable_now=function(){return f.now()-d}}var p=[],m=[],g=1,_=null,y=3,M=!1,E=!1,T=!1,S=!1,v=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function w(z){for(var Q=i(m);Q!==null;){if(Q.callback===null)r(m);else if(Q.startTime<=z)r(m),Q.sortIndex=Q.expirationTime,t(p,Q);else break;Q=i(m)}}function B(z){if(T=!1,w(z),!E)if(i(p)!==null)E=!0,H||(H=!0,rt());else{var Q=i(m);Q!==null&&ut(B,Q.startTime-z)}}var H=!1,N=-1,X=5,D=-1;function C(){return S?!0:!(s.unstable_now()-D<X)}function V(){if(S=!1,H){var z=s.unstable_now();D=z;var Q=!0;try{t:{E=!1,T&&(T=!1,L(N),N=-1),M=!0;var K=y;try{e:{for(w(z),_=i(p);_!==null&&!(_.expirationTime>z&&C());){var Mt=_.callback;if(typeof Mt=="function"){_.callback=null,y=_.priorityLevel;var Ct=Mt(_.expirationTime<=z);if(z=s.unstable_now(),typeof Ct=="function"){_.callback=Ct,w(z),Q=!0;break e}_===i(p)&&r(p),w(z)}else r(p);_=i(p)}if(_!==null)Q=!0;else{var O=i(m);O!==null&&ut(B,O.startTime-z),Q=!1}}break t}finally{_=null,y=K,M=!1}Q=void 0}}finally{Q?rt():H=!1}}}var rt;if(typeof U=="function")rt=function(){U(V)};else if(typeof MessageChannel<"u"){var nt=new MessageChannel,ft=nt.port2;nt.port1.onmessage=V,rt=function(){ft.postMessage(null)}}else rt=function(){v(V,0)};function ut(z,Q){N=v(function(){z(s.unstable_now())},Q)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_next=function(z){switch(y){case 1:case 2:case 3:var Q=3;break;default:Q=y}var K=y;y=Q;try{return z()}finally{y=K}},s.unstable_requestPaint=function(){S=!0},s.unstable_runWithPriority=function(z,Q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=y;y=z;try{return Q()}finally{y=K}},s.unstable_scheduleCallback=function(z,Q,K){var Mt=s.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?Mt+K:Mt):K=Mt,z){case 1:var Ct=-1;break;case 2:Ct=250;break;case 5:Ct=1073741823;break;case 4:Ct=1e4;break;default:Ct=5e3}return Ct=K+Ct,z={id:g++,callback:Q,priorityLevel:z,startTime:K,expirationTime:Ct,sortIndex:-1},K>Mt?(z.sortIndex=K,t(m,z),i(p)===null&&z===i(m)&&(T?(L(N),N=-1):T=!0,ut(B,K-Mt))):(z.sortIndex=Ct,t(p,z),E||M||(E=!0,H||(H=!0,rt()))),z},s.unstable_shouldYield=C,s.unstable_wrapCallback=function(z){var Q=y;return function(){var K=y;y=Q;try{return z.apply(this,arguments)}finally{y=K}}}})(Uh)),Uh}var hv;function tM(){return hv||(hv=1,Dh.exports=$S()),Dh.exports}var Lh={exports:{}},wn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dv;function eM(){if(dv)return wn;dv=1;var s=rp();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:g}}var f=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,wn.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,g)},wn.flushSync=function(p){var m=f.T,g=r.p;try{if(f.T=null,r.p=2,p)return p()}finally{f.T=m,r.p=g,r.d.f()}},wn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(p,m))},wn.prefetchDNS=function(p){typeof p=="string"&&r.d.D(p)},wn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,_=d(g,m.crossOrigin),y=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?r.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:y,fetchPriority:M}):g==="script"&&r.d.X(p,{crossOrigin:_,integrity:y,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},wn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=d(m.as,m.crossOrigin);r.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&r.d.M(p)},wn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,_=d(g,m.crossOrigin);r.d.L(p,g,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},wn.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=d(m.as,m.crossOrigin);r.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else r.d.m(p)},wn.requestFormReset=function(p){r.d.r(p)},wn.unstable_batchedUpdates=function(p,m){return p(m)},wn.useFormState=function(p,m,g){return f.H.useFormState(p,m,g)},wn.useFormStatus=function(){return f.H.useHostTransitionStatus()},wn.version="19.2.7",wn}var pv;function nM(){if(pv)return Lh.exports;pv=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),Lh.exports=eM(),Lh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mv;function iM(){if(mv)return Go;mv=1;var s=tM(),t=rp(),i=nM();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(r(188))}function m(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(r(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return p(u),e;if(h===o)return p(u),n;h=h.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=h;else{for(var x=!1,A=u.child;A;){if(A===a){x=!0,a=u,o=h;break}if(A===o){x=!0,o=u,a=h;break}A=A.sibling}if(!x){for(A=h.child;A;){if(A===a){x=!0,a=h,o=u;break}if(A===o){x=!0,o=h,a=u;break}A=A.sibling}if(!x)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,y=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),U=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),B=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function rt(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var nt=Symbol.for("react.client.reference");function ft(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===nt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case v:return"Profiler";case S:return"StrictMode";case B:return"Suspense";case H:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case U:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case w:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return n=e.displayName||null,n!==null?n:ft(e.type)||"Memo";case X:n=e._payload,e=e._init;try{return ft(e(n))}catch{}}return null}var ut=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},Mt=[],Ct=-1;function O(e){return{current:e}}function st(e){0>Ct||(e.current=Mt[Ct],Mt[Ct]=null,Ct--)}function St(e,n){Ct++,Mt[Ct]=e.current,e.current=n}var Z=O(null),pt=O(null),At=O(null),Et=O(null);function zt(e,n){switch(St(At,n),St(pt,e),St(Z,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?w_(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=w_(n),e=D_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}st(Z),St(Z,e)}function Jt(){st(Z),st(pt),st(At)}function $t(e){e.memoizedState!==null&&St(Et,e);var n=Z.current,a=D_(n,e.type);n!==a&&(St(pt,e),St(Z,a))}function Oe(e){pt.current===e&&(st(Z),st(pt)),Et.current===e&&(st(Et),zo._currentValue=K)}var Xe,Ee;function G(e){if(Xe===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Xe=n&&n[1]||"",Ee=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Xe+e+Ee}var fn=!1;function xe(e,n){if(!e||fn)return"";fn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(ct){var at=ct}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(ct){at=ct}e.call(_t.prototype)}}else{try{throw Error()}catch(ct){at=ct}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(ct){if(ct&&at&&typeof ct.stack=="string")return[ct.stack,at.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),x=h[0],A=h[1];if(x&&A){var F=x.split(`
`),tt=A.split(`
`);for(u=o=0;o<F.length&&!F[o].includes("DetermineComponentFrameRoot");)o++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(o===F.length||u===tt.length)for(o=F.length-1,u=tt.length-1;1<=o&&0<=u&&F[o]!==tt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(F[o]!==tt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||F[o]!==tt[u]){var dt=`
`+F[o].replace(" at new "," at ");return e.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",e.displayName)),dt}while(1<=o&&0<=u);break}}}finally{fn=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?G(a):""}function Pe(e,n){switch(e.tag){case 26:case 27:case 5:return G(e.type);case 16:return G("Lazy");case 13:return e.child!==n&&n!==null?G("Suspense Fallback"):G("Suspense");case 19:return G("SuspenseList");case 0:case 15:return xe(e.type,!1);case 11:return xe(e.type.render,!1);case 1:return xe(e.type,!0);case 31:return G("Activity");default:return""}}function Xt(e){try{var n="",a=null;do n+=Pe(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var _e=Object.prototype.hasOwnProperty,Zt=s.unstable_scheduleCallback,se=s.unstable_cancelCallback,nn=s.unstable_shouldYield,P=s.unstable_requestPaint,b=s.unstable_now,it=s.unstable_getCurrentPriorityLevel,gt=s.unstable_ImmediatePriority,yt=s.unstable_UserBlockingPriority,ht=s.unstable_NormalPriority,jt=s.unstable_LowPriority,Dt=s.unstable_IdlePriority,Vt=s.log,Wt=s.unstable_setDisableYieldValue,xt=null,wt=null;function qt(e){if(typeof Vt=="function"&&Wt(e),wt&&typeof wt.setStrictMode=="function")try{wt.setStrictMode(xt,e)}catch{}}var Gt=Math.clz32?Math.clz32:j,Ut=Math.log,ie=Math.LN2;function j(e){return e>>>=0,e===0?32:31-(Ut(e)/ie|0)|0}var Lt=256,Tt=262144,Bt=4194304;function bt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function vt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,x=e.pingedLanes;e=e.warmLanes;var A=o&134217727;return A!==0?(o=A&~h,o!==0?u=bt(o):(x&=A,x!==0?u=bt(x):a||(a=A&~e,a!==0&&(u=bt(a))))):(A=o&~h,A!==0?u=bt(A):x!==0?u=bt(x):a||(a=o&~e,a!==0&&(u=bt(a)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:u}function Ft(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function ae(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ze(){var e=Bt;return Bt<<=1,(Bt&62914560)===0&&(Bt=4194304),e}function Ae(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function xn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function yi(e,n,a,o,u,h){var x=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var A=e.entanglements,F=e.expirationTimes,tt=e.hiddenUpdates;for(a=x&~a;0<a;){var dt=31-Gt(a),_t=1<<dt;A[dt]=0,F[dt]=-1;var at=tt[dt];if(at!==null)for(tt[dt]=null,dt=0;dt<at.length;dt++){var ct=at[dt];ct!==null&&(ct.lane&=-536870913)}a&=~_t}o!==0&&qs(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(x&~n))}function qs(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Gt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Ys(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Gt(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function Oi(e,n){var a=n&-n;return a=(a&42)!==0?1:er(a),(a&(e.suspendedLanes|n))!==0?0:a}function er(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function zr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Zs(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:$_(e.type))}function nr(e,n){var a=Q.p;try{return Q.p=e,n()}finally{Q.p=a}}var xi=Math.random().toString(36).slice(2),Qe="__reactFiber$"+xi,Sn="__reactProps$"+xi,ji="__reactContainer$"+xi,Ks="__reactEvents$"+xi,xu="__reactListeners$"+xi,Su="__reactHandles$"+xi,ul="__reactResources$"+xi,ir="__reactMarker$"+xi;function Qs(e){delete e[Qe],delete e[Sn],delete e[Ks],delete e[xu],delete e[Su]}function R(e){var n=e[Qe];if(n)return n;for(var a=e.parentNode;a;){if(n=a[ji]||a[Qe]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=I_(e);e!==null;){if(a=e[Qe])return a;e=I_(e)}return n}e=a,a=e.parentNode}return null}function q(e){if(e=e[Qe]||e[ji]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function ot(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function lt(e){var n=e[ul];return n||(n=e[ul]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function W(e){e[ir]=!0}var Rt=new Set,Nt={};function It(e,n){Pt(e,n),Pt(e+"Capture",n)}function Pt(e,n){for(Nt[e]=n,e=0;e<n.length;e++)Rt.add(n[e])}var ee=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ne={},Yt={};function de(e){return _e.call(Yt,e)?!0:_e.call(ne,e)?!1:ee.test(e)?Yt[e]=!0:(ne[e]=!0,!1)}function Te(e,n,a){if(de(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ie(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Re(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function re(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Qt(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function hn(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(x){a=""+x,h.call(this,x)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(x){a=""+x},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function be(e){if(!e._valueTracker){var n=Qt(e)?"checked":"value";e._valueTracker=hn(e,n,""+e[n])}}function In(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=Qt(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Si(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ln=/[\n"\\]/g;function _n(e){return e.replace(Ln,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Be(e,n,a,o,u,h,x,A){e.name="",x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"?e.type=x:e.removeAttribute("type"),n!=null?x==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+re(n)):e.value!==""+re(n)&&(e.value=""+re(n)):x!=="submit"&&x!=="reset"||e.removeAttribute("value"),n!=null?Cn(e,x,re(n)):a!=null?Cn(e,x,re(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.name=""+re(A):e.removeAttribute("name")}function Nn(e,n,a,o,u,h,x,A){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){be(e);return}a=a!=null?""+re(a):"",n=n!=null?""+re(n):a,A||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=A?e.checked:!!o,e.defaultChecked=!!o,x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"&&(e.name=x),be(e)}function Cn(e,n,a){n==="number"&&Si(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Je(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+re(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Mn(e,n,a){if(n!=null&&(n=""+re(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+re(a):""}function Ir(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(ut(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=re(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),be(e)}function Bn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Vy=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ap(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||Vy.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Rp(e,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Ap(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&Ap(e,h,n[h])}function Mu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ky=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Xy=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function fl(e){return Xy.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Wi(){}var Eu=null;function Tu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Br=null,Fr=null;function Cp(e){var n=q(e);if(n&&(e=n.stateNode)){var a=e[Sn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Be(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+_n(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Sn]||null;if(!u)throw Error(r(90));Be(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&In(o)}break t;case"textarea":Mn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Je(e,!!a.multiple,n,!1)}}}var bu=!1;function wp(e,n,a){if(bu)return e(n,a);bu=!0;try{var o=e(n);return o}finally{if(bu=!1,(Br!==null||Fr!==null)&&(Jl(),Br&&(n=Br,e=Fr,Fr=Br=null,Cp(n),e)))for(n=0;n<e.length;n++)Cp(e[n])}}function Js(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Sn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var qi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Au=!1;if(qi)try{var $s={};Object.defineProperty($s,"passive",{get:function(){Au=!0}}),window.addEventListener("test",$s,$s),window.removeEventListener("test",$s,$s)}catch{Au=!1}var xa=null,Ru=null,hl=null;function Dp(){if(hl)return hl;var e,n=Ru,a=n.length,o,u="value"in xa?xa.value:xa.textContent,h=u.length;for(e=0;e<a&&n[e]===u[e];e++);var x=a-e;for(o=1;o<=x&&n[a-o]===u[h-o];o++);return hl=u.slice(e,1<o?1-o:void 0)}function dl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function pl(){return!0}function Up(){return!1}function Fn(e){function n(a,o,u,h,x){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=x,this.currentTarget=null;for(var A in e)e.hasOwnProperty(A)&&(a=e[A],this[A]=a?a(h):h[A]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?pl:Up,this.isPropagationStopped=Up,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=pl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=pl)},persist:function(){},isPersistent:pl}),n}var ar={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ml=Fn(ar),to=_({},ar,{view:0,detail:0}),jy=Fn(to),Cu,wu,eo,gl=_({},to,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Uu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==eo&&(eo&&e.type==="mousemove"?(Cu=e.screenX-eo.screenX,wu=e.screenY-eo.screenY):wu=Cu=0,eo=e),Cu)},movementY:function(e){return"movementY"in e?e.movementY:wu}}),Lp=Fn(gl),Wy=_({},gl,{dataTransfer:0}),qy=Fn(Wy),Yy=_({},to,{relatedTarget:0}),Du=Fn(Yy),Zy=_({},ar,{animationName:0,elapsedTime:0,pseudoElement:0}),Ky=Fn(Zy),Qy=_({},ar,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Jy=Fn(Qy),$y=_({},ar,{data:0}),Np=Fn($y),tx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ex={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ix(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=nx[e])?!!n[e]:!1}function Uu(){return ix}var ax=_({},to,{key:function(e){if(e.key){var n=tx[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=dl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ex[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Uu,charCode:function(e){return e.type==="keypress"?dl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?dl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),rx=Fn(ax),sx=_({},gl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Op=Fn(sx),ox=_({},to,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Uu}),lx=Fn(ox),cx=_({},ar,{propertyName:0,elapsedTime:0,pseudoElement:0}),ux=Fn(cx),fx=_({},gl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hx=Fn(fx),dx=_({},ar,{newState:0,oldState:0}),px=Fn(dx),mx=[9,13,27,32],Lu=qi&&"CompositionEvent"in window,no=null;qi&&"documentMode"in document&&(no=document.documentMode);var gx=qi&&"TextEvent"in window&&!no,Pp=qi&&(!Lu||no&&8<no&&11>=no),zp=" ",Ip=!1;function Bp(e,n){switch(e){case"keyup":return mx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hr=!1;function _x(e,n){switch(e){case"compositionend":return Fp(n);case"keypress":return n.which!==32?null:(Ip=!0,zp);case"textInput":return e=n.data,e===zp&&Ip?null:e;default:return null}}function vx(e,n){if(Hr)return e==="compositionend"||!Lu&&Bp(e,n)?(e=Dp(),hl=Ru=xa=null,Hr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Pp&&n.locale!=="ko"?null:n.data;default:return null}}var yx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!yx[e.type]:n==="textarea"}function Gp(e,n,a,o){Br?Fr?Fr.push(o):Fr=[o]:Br=o,n=rc(n,"onChange"),0<n.length&&(a=new ml("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var io=null,ao=null;function xx(e){E_(e,0)}function _l(e){var n=ot(e);if(In(n))return e}function Vp(e,n){if(e==="change")return n}var kp=!1;if(qi){var Nu;if(qi){var Ou="oninput"in document;if(!Ou){var Xp=document.createElement("div");Xp.setAttribute("oninput","return;"),Ou=typeof Xp.oninput=="function"}Nu=Ou}else Nu=!1;kp=Nu&&(!document.documentMode||9<document.documentMode)}function jp(){io&&(io.detachEvent("onpropertychange",Wp),ao=io=null)}function Wp(e){if(e.propertyName==="value"&&_l(ao)){var n=[];Gp(n,ao,e,Tu(e)),wp(xx,n)}}function Sx(e,n,a){e==="focusin"?(jp(),io=n,ao=a,io.attachEvent("onpropertychange",Wp)):e==="focusout"&&jp()}function Mx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return _l(ao)}function Ex(e,n){if(e==="click")return _l(n)}function Tx(e,n){if(e==="input"||e==="change")return _l(n)}function bx(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Kn=typeof Object.is=="function"?Object.is:bx;function ro(e,n){if(Kn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!_e.call(n,u)||!Kn(e[u],n[u]))return!1}return!0}function qp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Yp(e,n){var a=qp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=qp(a)}}function Zp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Zp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Kp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Si(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Si(e.document)}return n}function Pu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Ax=qi&&"documentMode"in document&&11>=document.documentMode,Gr=null,zu=null,so=null,Iu=!1;function Qp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Iu||Gr==null||Gr!==Si(o)||(o=Gr,"selectionStart"in o&&Pu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),so&&ro(so,o)||(so=o,o=rc(zu,"onSelect"),0<o.length&&(n=new ml("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Gr)))}function rr(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Vr={animationend:rr("Animation","AnimationEnd"),animationiteration:rr("Animation","AnimationIteration"),animationstart:rr("Animation","AnimationStart"),transitionrun:rr("Transition","TransitionRun"),transitionstart:rr("Transition","TransitionStart"),transitioncancel:rr("Transition","TransitionCancel"),transitionend:rr("Transition","TransitionEnd")},Bu={},Jp={};qi&&(Jp=document.createElement("div").style,"AnimationEvent"in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),"TransitionEvent"in window||delete Vr.transitionend.transition);function sr(e){if(Bu[e])return Bu[e];if(!Vr[e])return e;var n=Vr[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Jp)return Bu[e]=n[a];return e}var $p=sr("animationend"),tm=sr("animationiteration"),em=sr("animationstart"),Rx=sr("transitionrun"),Cx=sr("transitionstart"),wx=sr("transitioncancel"),nm=sr("transitionend"),im=new Map,Fu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Fu.push("scrollEnd");function Mi(e,n){im.set(e,n),It(n,[e])}var vl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},oi=[],kr=0,Hu=0;function yl(){for(var e=kr,n=Hu=kr=0;n<e;){var a=oi[n];oi[n++]=null;var o=oi[n];oi[n++]=null;var u=oi[n];oi[n++]=null;var h=oi[n];if(oi[n++]=null,o!==null&&u!==null){var x=o.pending;x===null?u.next=u:(u.next=x.next,x.next=u),o.pending=u}h!==0&&am(a,u,h)}}function xl(e,n,a,o){oi[kr++]=e,oi[kr++]=n,oi[kr++]=a,oi[kr++]=o,Hu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Gu(e,n,a,o){return xl(e,n,a,o),Sl(e)}function or(e,n){return xl(e,null,null,n),Sl(e)}function am(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-Gt(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),h):null}function Sl(e){if(50<wo)throw wo=0,Qf=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Xr={};function Dx(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qn(e,n,a,o){return new Dx(e,n,a,o)}function Vu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Yi(e,n){var a=e.alternate;return a===null?(a=Qn(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function rm(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Ml(e,n,a,o,u,h){var x=0;if(o=e,typeof e=="function")Vu(e)&&(x=1);else if(typeof e=="string")x=PS(e,a,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=Qn(31,a,n,u),e.elementType=D,e.lanes=h,e;case T:return lr(a.children,u,h,n);case S:x=8,u|=24;break;case v:return e=Qn(12,a,n,u|2),e.elementType=v,e.lanes=h,e;case B:return e=Qn(13,a,n,u),e.elementType=B,e.lanes=h,e;case H:return e=Qn(19,a,n,u),e.elementType=H,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case U:x=10;break t;case L:x=9;break t;case w:x=11;break t;case N:x=14;break t;case X:x=16,o=null;break t}x=29,a=Error(r(130,e===null?"null":typeof e,"")),o=null}return n=Qn(x,a,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function lr(e,n,a,o){return e=Qn(7,e,o,n),e.lanes=a,e}function ku(e,n,a){return e=Qn(6,e,null,n),e.lanes=a,e}function sm(e){var n=Qn(18,null,null,0);return n.stateNode=e,n}function Xu(e,n,a){return n=Qn(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var om=new WeakMap;function li(e,n){if(typeof e=="object"&&e!==null){var a=om.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Xt(n)},om.set(e,n),n)}return{value:e,source:n,stack:Xt(n)}}var jr=[],Wr=0,El=null,oo=0,ci=[],ui=0,Sa=null,Pi=1,zi="";function Zi(e,n){jr[Wr++]=oo,jr[Wr++]=El,El=e,oo=n}function lm(e,n,a){ci[ui++]=Pi,ci[ui++]=zi,ci[ui++]=Sa,Sa=e;var o=Pi;e=zi;var u=32-Gt(o)-1;o&=~(1<<u),a+=1;var h=32-Gt(n)+u;if(30<h){var x=u-u%5;h=(o&(1<<x)-1).toString(32),o>>=x,u-=x,Pi=1<<32-Gt(n)+u|a<<u|o,zi=h+e}else Pi=1<<h|a<<u|o,zi=e}function ju(e){e.return!==null&&(Zi(e,1),lm(e,1,0))}function Wu(e){for(;e===El;)El=jr[--Wr],jr[Wr]=null,oo=jr[--Wr],jr[Wr]=null;for(;e===Sa;)Sa=ci[--ui],ci[ui]=null,zi=ci[--ui],ci[ui]=null,Pi=ci[--ui],ci[ui]=null}function cm(e,n){ci[ui++]=Pi,ci[ui++]=zi,ci[ui++]=Sa,Pi=n.id,zi=n.overflow,Sa=e}var En=null,We=null,Se=!1,Ma=null,fi=!1,qu=Error(r(519));function Ea(e){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw lo(li(n,e)),qu}function um(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[Qe]=e,n[Sn]=o,a){case"dialog":me("cancel",n),me("close",n);break;case"iframe":case"object":case"embed":me("load",n);break;case"video":case"audio":for(a=0;a<Uo.length;a++)me(Uo[a],n);break;case"source":me("error",n);break;case"img":case"image":case"link":me("error",n),me("load",n);break;case"details":me("toggle",n);break;case"input":me("invalid",n),Nn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":me("invalid",n);break;case"textarea":me("invalid",n),Ir(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||R_(n.textContent,a)?(o.popover!=null&&(me("beforetoggle",n),me("toggle",n)),o.onScroll!=null&&me("scroll",n),o.onScrollEnd!=null&&me("scrollend",n),o.onClick!=null&&(n.onclick=Wi),n=!0):n=!1,n||Ea(e,!0)}function fm(e){for(En=e.return;En;)switch(En.tag){case 5:case 31:case 13:fi=!1;return;case 27:case 3:fi=!0;return;default:En=En.return}}function qr(e){if(e!==En)return!1;if(!Se)return fm(e),Se=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||hh(e.type,e.memoizedProps)),a=!a),a&&We&&Ea(e),fm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));We=z_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));We=z_(e)}else n===27?(n=We,Ia(e.type)?(e=_h,_h=null,We=e):We=n):We=En?di(e.stateNode.nextSibling):null;return!0}function cr(){We=En=null,Se=!1}function Yu(){var e=Ma;return e!==null&&(kn===null?kn=e:kn.push.apply(kn,e),Ma=null),e}function lo(e){Ma===null?Ma=[e]:Ma.push(e)}var Zu=O(null),ur=null,Ki=null;function Ta(e,n,a){St(Zu,n._currentValue),n._currentValue=a}function Qi(e){e._currentValue=Zu.current,st(Zu)}function Ku(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Qu(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var x=u.child;h=h.firstContext;t:for(;h!==null;){var A=h;h=u;for(var F=0;F<n.length;F++)if(A.context===n[F]){h.lanes|=a,A=h.alternate,A!==null&&(A.lanes|=a),Ku(h.return,a,e),o||(x=null);break t}h=A.next}}else if(u.tag===18){if(x=u.return,x===null)throw Error(r(341));x.lanes|=a,h=x.alternate,h!==null&&(h.lanes|=a),Ku(x,a,e),x=null}else x=u.child;if(x!==null)x.return=u;else for(x=u;x!==null;){if(x===e){x=null;break}if(u=x.sibling,u!==null){u.return=x.return,x=u;break}x=x.return}u=x}}function Yr(e,n,a,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var x=u.alternate;if(x===null)throw Error(r(387));if(x=x.memoizedProps,x!==null){var A=u.type;Kn(u.pendingProps.value,x.value)||(e!==null?e.push(A):e=[A])}}else if(u===Et.current){if(x=u.alternate,x===null)throw Error(r(387));x.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(zo):e=[zo])}u=u.return}e!==null&&Qu(n,e,a,o),n.flags|=262144}function Tl(e){for(e=e.firstContext;e!==null;){if(!Kn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function fr(e){ur=e,Ki=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Tn(e){return hm(ur,e)}function bl(e,n){return ur===null&&fr(e),hm(e,n)}function hm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ki===null){if(e===null)throw Error(r(308));Ki=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Ki=Ki.next=n;return a}var Ux=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Lx=s.unstable_scheduleCallback,Nx=s.unstable_NormalPriority,sn={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ju(){return{controller:new Ux,data:new Map,refCount:0}}function co(e){e.refCount--,e.refCount===0&&Lx(Nx,function(){e.controller.abort()})}var uo=null,$u=0,Zr=0,Kr=null;function Ox(e,n){if(uo===null){var a=uo=[];$u=0,Zr=ih(),Kr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return $u++,n.then(dm,dm),n}function dm(){if(--$u===0&&uo!==null){Kr!==null&&(Kr.status="fulfilled");var e=uo;uo=null,Zr=0,Kr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Px(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var pm=z.S;z.S=function(e,n){Qg=b(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ox(e,n),pm!==null&&pm(e,n)};var hr=O(null);function tf(){var e=hr.current;return e!==null?e:je.pooledCache}function Al(e,n){n===null?St(hr,hr.current):St(hr,n.pool)}function mm(){var e=tf();return e===null?null:{parent:sn._currentValue,pool:e}}var Qr=Error(r(460)),ef=Error(r(474)),Rl=Error(r(542)),Cl={then:function(){}};function gm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function _m(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Wi,Wi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,ym(e),e;default:if(typeof n.status=="string")n.then(Wi,Wi);else{if(e=je,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,ym(e),e}throw pr=n,Qr}}function dr(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(pr=a,Qr):a}}var pr=null;function vm(){if(pr===null)throw Error(r(459));var e=pr;return pr=null,e}function ym(e){if(e===Qr||e===Rl)throw Error(r(483))}var Jr=null,fo=0;function wl(e){var n=fo;return fo+=1,Jr===null&&(Jr=[]),_m(Jr,e,n)}function ho(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Dl(e,n){throw n.$$typeof===y?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function xm(e){function n(Y,k){if(e){var $=Y.deletions;$===null?(Y.deletions=[k],Y.flags|=16):$.push(k)}}function a(Y,k){if(!e)return null;for(;k!==null;)n(Y,k),k=k.sibling;return null}function o(Y){for(var k=new Map;Y!==null;)Y.key!==null?k.set(Y.key,Y):k.set(Y.index,Y),Y=Y.sibling;return k}function u(Y,k){return Y=Yi(Y,k),Y.index=0,Y.sibling=null,Y}function h(Y,k,$){return Y.index=$,e?($=Y.alternate,$!==null?($=$.index,$<k?(Y.flags|=67108866,k):$):(Y.flags|=67108866,k)):(Y.flags|=1048576,k)}function x(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function A(Y,k,$,mt){return k===null||k.tag!==6?(k=ku($,Y.mode,mt),k.return=Y,k):(k=u(k,$),k.return=Y,k)}function F(Y,k,$,mt){var Kt=$.type;return Kt===T?dt(Y,k,$.props.children,mt,$.key):k!==null&&(k.elementType===Kt||typeof Kt=="object"&&Kt!==null&&Kt.$$typeof===X&&dr(Kt)===k.type)?(k=u(k,$.props),ho(k,$),k.return=Y,k):(k=Ml($.type,$.key,$.props,null,Y.mode,mt),ho(k,$),k.return=Y,k)}function tt(Y,k,$,mt){return k===null||k.tag!==4||k.stateNode.containerInfo!==$.containerInfo||k.stateNode.implementation!==$.implementation?(k=Xu($,Y.mode,mt),k.return=Y,k):(k=u(k,$.children||[]),k.return=Y,k)}function dt(Y,k,$,mt,Kt){return k===null||k.tag!==7?(k=lr($,Y.mode,mt,Kt),k.return=Y,k):(k=u(k,$),k.return=Y,k)}function _t(Y,k,$){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return k=ku(""+k,Y.mode,$),k.return=Y,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case M:return $=Ml(k.type,k.key,k.props,null,Y.mode,$),ho($,k),$.return=Y,$;case E:return k=Xu(k,Y.mode,$),k.return=Y,k;case X:return k=dr(k),_t(Y,k,$)}if(ut(k)||rt(k))return k=lr(k,Y.mode,$,null),k.return=Y,k;if(typeof k.then=="function")return _t(Y,wl(k),$);if(k.$$typeof===U)return _t(Y,bl(Y,k),$);Dl(Y,k)}return null}function at(Y,k,$,mt){var Kt=k!==null?k.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Kt!==null?null:A(Y,k,""+$,mt);if(typeof $=="object"&&$!==null){switch($.$$typeof){case M:return $.key===Kt?F(Y,k,$,mt):null;case E:return $.key===Kt?tt(Y,k,$,mt):null;case X:return $=dr($),at(Y,k,$,mt)}if(ut($)||rt($))return Kt!==null?null:dt(Y,k,$,mt,null);if(typeof $.then=="function")return at(Y,k,wl($),mt);if($.$$typeof===U)return at(Y,k,bl(Y,$),mt);Dl(Y,$)}return null}function ct(Y,k,$,mt,Kt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return Y=Y.get($)||null,A(k,Y,""+mt,Kt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case M:return Y=Y.get(mt.key===null?$:mt.key)||null,F(k,Y,mt,Kt);case E:return Y=Y.get(mt.key===null?$:mt.key)||null,tt(k,Y,mt,Kt);case X:return mt=dr(mt),ct(Y,k,$,mt,Kt)}if(ut(mt)||rt(mt))return Y=Y.get($)||null,dt(k,Y,mt,Kt,null);if(typeof mt.then=="function")return ct(Y,k,$,wl(mt),Kt);if(mt.$$typeof===U)return ct(Y,k,$,bl(k,mt),Kt);Dl(k,mt)}return null}function Ht(Y,k,$,mt){for(var Kt=null,Ce=null,kt=k,ue=k=0,ye=null;kt!==null&&ue<$.length;ue++){kt.index>ue?(ye=kt,kt=null):ye=kt.sibling;var we=at(Y,kt,$[ue],mt);if(we===null){kt===null&&(kt=ye);break}e&&kt&&we.alternate===null&&n(Y,kt),k=h(we,k,ue),Ce===null?Kt=we:Ce.sibling=we,Ce=we,kt=ye}if(ue===$.length)return a(Y,kt),Se&&Zi(Y,ue),Kt;if(kt===null){for(;ue<$.length;ue++)kt=_t(Y,$[ue],mt),kt!==null&&(k=h(kt,k,ue),Ce===null?Kt=kt:Ce.sibling=kt,Ce=kt);return Se&&Zi(Y,ue),Kt}for(kt=o(kt);ue<$.length;ue++)ye=ct(kt,Y,ue,$[ue],mt),ye!==null&&(e&&ye.alternate!==null&&kt.delete(ye.key===null?ue:ye.key),k=h(ye,k,ue),Ce===null?Kt=ye:Ce.sibling=ye,Ce=ye);return e&&kt.forEach(function(Va){return n(Y,Va)}),Se&&Zi(Y,ue),Kt}function te(Y,k,$,mt){if($==null)throw Error(r(151));for(var Kt=null,Ce=null,kt=k,ue=k=0,ye=null,we=$.next();kt!==null&&!we.done;ue++,we=$.next()){kt.index>ue?(ye=kt,kt=null):ye=kt.sibling;var Va=at(Y,kt,we.value,mt);if(Va===null){kt===null&&(kt=ye);break}e&&kt&&Va.alternate===null&&n(Y,kt),k=h(Va,k,ue),Ce===null?Kt=Va:Ce.sibling=Va,Ce=Va,kt=ye}if(we.done)return a(Y,kt),Se&&Zi(Y,ue),Kt;if(kt===null){for(;!we.done;ue++,we=$.next())we=_t(Y,we.value,mt),we!==null&&(k=h(we,k,ue),Ce===null?Kt=we:Ce.sibling=we,Ce=we);return Se&&Zi(Y,ue),Kt}for(kt=o(kt);!we.done;ue++,we=$.next())we=ct(kt,Y,ue,we.value,mt),we!==null&&(e&&we.alternate!==null&&kt.delete(we.key===null?ue:we.key),k=h(we,k,ue),Ce===null?Kt=we:Ce.sibling=we,Ce=we);return e&&kt.forEach(function(WS){return n(Y,WS)}),Se&&Zi(Y,ue),Kt}function Ge(Y,k,$,mt){if(typeof $=="object"&&$!==null&&$.type===T&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case M:t:{for(var Kt=$.key;k!==null;){if(k.key===Kt){if(Kt=$.type,Kt===T){if(k.tag===7){a(Y,k.sibling),mt=u(k,$.props.children),mt.return=Y,Y=mt;break t}}else if(k.elementType===Kt||typeof Kt=="object"&&Kt!==null&&Kt.$$typeof===X&&dr(Kt)===k.type){a(Y,k.sibling),mt=u(k,$.props),ho(mt,$),mt.return=Y,Y=mt;break t}a(Y,k);break}else n(Y,k);k=k.sibling}$.type===T?(mt=lr($.props.children,Y.mode,mt,$.key),mt.return=Y,Y=mt):(mt=Ml($.type,$.key,$.props,null,Y.mode,mt),ho(mt,$),mt.return=Y,Y=mt)}return x(Y);case E:t:{for(Kt=$.key;k!==null;){if(k.key===Kt)if(k.tag===4&&k.stateNode.containerInfo===$.containerInfo&&k.stateNode.implementation===$.implementation){a(Y,k.sibling),mt=u(k,$.children||[]),mt.return=Y,Y=mt;break t}else{a(Y,k);break}else n(Y,k);k=k.sibling}mt=Xu($,Y.mode,mt),mt.return=Y,Y=mt}return x(Y);case X:return $=dr($),Ge(Y,k,$,mt)}if(ut($))return Ht(Y,k,$,mt);if(rt($)){if(Kt=rt($),typeof Kt!="function")throw Error(r(150));return $=Kt.call($),te(Y,k,$,mt)}if(typeof $.then=="function")return Ge(Y,k,wl($),mt);if($.$$typeof===U)return Ge(Y,k,bl(Y,$),mt);Dl(Y,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,k!==null&&k.tag===6?(a(Y,k.sibling),mt=u(k,$),mt.return=Y,Y=mt):(a(Y,k),mt=ku($,Y.mode,mt),mt.return=Y,Y=mt),x(Y)):a(Y,k)}return function(Y,k,$,mt){try{fo=0;var Kt=Ge(Y,k,$,mt);return Jr=null,Kt}catch(kt){if(kt===Qr||kt===Rl)throw kt;var Ce=Qn(29,kt,null,Y.mode);return Ce.lanes=mt,Ce.return=Y,Ce}finally{}}}var mr=xm(!0),Sm=xm(!1),ba=!1;function nf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function af(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Aa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ra(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Ue&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Sl(e),am(e,null,a),n}return xl(e,o,n,a),Sl(e)}function po(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Ys(e,a)}}function rf(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var x={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=x:h=h.next=x,a=a.next}while(a!==null);h===null?u=h=n:h=h.next=n}else u=h=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var sf=!1;function mo(){if(sf){var e=Kr;if(e!==null)throw e}}function go(e,n,a,o){sf=!1;var u=e.updateQueue;ba=!1;var h=u.firstBaseUpdate,x=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var F=A,tt=F.next;F.next=null,x===null?h=tt:x.next=tt,x=F;var dt=e.alternate;dt!==null&&(dt=dt.updateQueue,A=dt.lastBaseUpdate,A!==x&&(A===null?dt.firstBaseUpdate=tt:A.next=tt,dt.lastBaseUpdate=F))}if(h!==null){var _t=u.baseState;x=0,dt=tt=F=null,A=h;do{var at=A.lane&-536870913,ct=at!==A.lane;if(ct?(ve&at)===at:(o&at)===at){at!==0&&at===Zr&&(sf=!0),dt!==null&&(dt=dt.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var Ht=e,te=A;at=n;var Ge=a;switch(te.tag){case 1:if(Ht=te.payload,typeof Ht=="function"){_t=Ht.call(Ge,_t,at);break t}_t=Ht;break t;case 3:Ht.flags=Ht.flags&-65537|128;case 0:if(Ht=te.payload,at=typeof Ht=="function"?Ht.call(Ge,_t,at):Ht,at==null)break t;_t=_({},_t,at);break t;case 2:ba=!0}}at=A.callback,at!==null&&(e.flags|=64,ct&&(e.flags|=8192),ct=u.callbacks,ct===null?u.callbacks=[at]:ct.push(at))}else ct={lane:at,tag:A.tag,payload:A.payload,callback:A.callback,next:null},dt===null?(tt=dt=ct,F=_t):dt=dt.next=ct,x|=at;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;ct=A,A=ct.next,ct.next=null,u.lastBaseUpdate=ct,u.shared.pending=null}}while(!0);dt===null&&(F=_t),u.baseState=F,u.firstBaseUpdate=tt,u.lastBaseUpdate=dt,h===null&&(u.shared.lanes=0),La|=x,e.lanes=x,e.memoizedState=_t}}function Mm(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function Em(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Mm(a[e],n)}var $r=O(null),Ul=O(0);function Tm(e,n){e=sa,St(Ul,e),St($r,n),sa=e|n.baseLanes}function of(){St(Ul,sa),St($r,$r.current)}function lf(){sa=Ul.current,st($r),st(Ul)}var Jn=O(null),hi=null;function Ca(e){var n=e.alternate;St(an,an.current&1),St(Jn,e),hi===null&&(n===null||$r.current!==null||n.memoizedState!==null)&&(hi=e)}function cf(e){St(an,an.current),St(Jn,e),hi===null&&(hi=e)}function bm(e){e.tag===22?(St(an,an.current),St(Jn,e),hi===null&&(hi=e)):wa()}function wa(){St(an,an.current),St(Jn,Jn.current)}function $n(e){st(Jn),hi===e&&(hi=null),st(an)}var an=O(0);function Ll(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||mh(a)||gh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ji=0,le=null,Fe=null,on=null,Nl=!1,ts=!1,gr=!1,Ol=0,_o=0,es=null,zx=0;function $e(){throw Error(r(321))}function uf(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Kn(e[a],n[a]))return!1;return!0}function ff(e,n,a,o,u,h){return Ji=h,le=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=e===null||e.memoizedState===null?lg:Af,gr=!1,h=a(o,u),gr=!1,ts&&(h=Rm(n,a,o,u)),Am(e),h}function Am(e){z.H=xo;var n=Fe!==null&&Fe.next!==null;if(Ji=0,on=Fe=le=null,Nl=!1,_o=0,es=null,n)throw Error(r(300));e===null||ln||(e=e.dependencies,e!==null&&Tl(e)&&(ln=!0))}function Rm(e,n,a,o){le=e;var u=0;do{if(ts&&(es=null),_o=0,ts=!1,25<=u)throw Error(r(301));if(u+=1,on=Fe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}z.H=cg,h=n(a,o)}while(ts);return h}function Ix(){var e=z.H,n=e.useState()[0];return n=typeof n.then=="function"?vo(n):n,e=e.useState()[0],(Fe!==null?Fe.memoizedState:null)!==e&&(le.flags|=1024),n}function hf(){var e=Ol!==0;return Ol=0,e}function df(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function pf(e){if(Nl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Nl=!1}Ji=0,on=Fe=le=null,ts=!1,_o=Ol=0,es=null}function On(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?le.memoizedState=on=e:on=on.next=e,on}function rn(){if(Fe===null){var e=le.alternate;e=e!==null?e.memoizedState:null}else e=Fe.next;var n=on===null?le.memoizedState:on.next;if(n!==null)on=n,Fe=e;else{if(e===null)throw le.alternate===null?Error(r(467)):Error(r(310));Fe=e,e={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},on===null?le.memoizedState=on=e:on=on.next=e}return on}function Pl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function vo(e){var n=_o;return _o+=1,es===null&&(es=[]),e=_m(es,e,n),n=le,(on===null?n.memoizedState:on.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?lg:Af),e}function zl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return vo(e);if(e.$$typeof===U)return Tn(e)}throw Error(r(438,String(e)))}function mf(e){var n=null,a=le.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=le.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Pl(),le.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=C;return n.index++,a}function $i(e,n){return typeof n=="function"?n(e):n}function Il(e){var n=rn();return gf(n,Fe,e)}function gf(e,n,a){var o=e.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var x=u.next;u.next=h.next,h.next=x}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var A=x=null,F=null,tt=n,dt=!1;do{var _t=tt.lane&-536870913;if(_t!==tt.lane?(ve&_t)===_t:(Ji&_t)===_t){var at=tt.revertLane;if(at===0)F!==null&&(F=F.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),_t===Zr&&(dt=!0);else if((Ji&at)===at){tt=tt.next,at===Zr&&(dt=!0);continue}else _t={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},F===null?(A=F=_t,x=h):F=F.next=_t,le.lanes|=at,La|=at;_t=tt.action,gr&&a(h,_t),h=tt.hasEagerState?tt.eagerState:a(h,_t)}else at={lane:_t,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},F===null?(A=F=at,x=h):F=F.next=at,le.lanes|=_t,La|=_t;tt=tt.next}while(tt!==null&&tt!==n);if(F===null?x=h:F.next=A,!Kn(h,e.memoizedState)&&(ln=!0,dt&&(a=Kr,a!==null)))throw a;e.memoizedState=h,e.baseState=x,e.baseQueue=F,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function _f(e){var n=rn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=n.memoizedState;if(u!==null){a.pending=null;var x=u=u.next;do h=e(h,x.action),x=x.next;while(x!==u);Kn(h,n.memoizedState)||(ln=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function Cm(e,n,a){var o=le,u=rn(),h=Se;if(h){if(a===void 0)throw Error(r(407));a=a()}else a=n();var x=!Kn((Fe||u).memoizedState,a);if(x&&(u.memoizedState=a,ln=!0),u=u.queue,xf(Um.bind(null,o,u,e),[e]),u.getSnapshot!==n||x||on!==null&&on.memoizedState.tag&1){if(o.flags|=2048,ns(9,{destroy:void 0},Dm.bind(null,o,u,a,n),null),je===null)throw Error(r(349));h||(Ji&127)!==0||wm(o,n,a)}return a}function wm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=le.updateQueue,n===null?(n=Pl(),le.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Dm(e,n,a,o){n.value=a,n.getSnapshot=o,Lm(n)&&Nm(e)}function Um(e,n,a){return a(function(){Lm(n)&&Nm(e)})}function Lm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Kn(e,a)}catch{return!0}}function Nm(e){var n=or(e,2);n!==null&&Xn(n,e,2)}function vf(e){var n=On();if(typeof e=="function"){var a=e;if(e=a(),gr){qt(!0);try{a()}finally{qt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:e},n}function Om(e,n,a,o){return e.baseState=a,gf(e,Fe,typeof o=="function"?o:$i)}function Bx(e,n,a,o,u){if(Hl(e))throw Error(r(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(x){h.listeners.push(x)}};z.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,Pm(n,h)):(h.next=a.next,n.pending=a.next=h)}}function Pm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=z.T,x={};z.T=x;try{var A=a(u,o),F=z.S;F!==null&&F(x,A),zm(e,n,A)}catch(tt){yf(e,n,tt)}finally{h!==null&&x.types!==null&&(h.types=x.types),z.T=h}}else try{h=a(u,o),zm(e,n,h)}catch(tt){yf(e,n,tt)}}function zm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Im(e,n,o)},function(o){return yf(e,n,o)}):Im(e,n,a)}function Im(e,n,a){n.status="fulfilled",n.value=a,Bm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Pm(e,a)))}function yf(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Bm(n),n=n.next;while(n!==o)}e.action=null}function Bm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Fm(e,n){return n}function Hm(e,n){if(Se){var a=je.formState;if(a!==null){t:{var o=le;if(Se){if(We){e:{for(var u=We,h=fi;u.nodeType!==8;){if(!h){u=null;break e}if(u=di(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){We=di(u.nextSibling),o=u.data==="F!";break t}}Ea(o)}o=!1}o&&(n=a[0])}}return a=On(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fm,lastRenderedState:n},a.queue=o,a=rg.bind(null,le,o),o.dispatch=a,o=vf(!1),h=bf.bind(null,le,!1,o.queue),o=On(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=Bx.bind(null,le,u,h,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Gm(e){var n=rn();return Vm(n,Fe,e)}function Vm(e,n,a){if(n=gf(e,n,Fm)[0],e=Il($i)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=vo(n)}catch(x){throw x===Qr?Rl:x}else o=n;n=rn();var u=n.queue,h=u.dispatch;return a!==n.memoizedState&&(le.flags|=2048,ns(9,{destroy:void 0},Fx.bind(null,u,a),null)),[o,h,e]}function Fx(e,n){e.action=n}function km(e){var n=rn(),a=Fe;if(a!==null)return Vm(n,a,e);rn(),n=n.memoizedState,a=rn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function ns(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=le.updateQueue,n===null&&(n=Pl(),le.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Xm(){return rn().memoizedState}function Bl(e,n,a,o){var u=On();le.flags|=e,u.memoizedState=ns(1|n,{destroy:void 0},a,o===void 0?null:o)}function Fl(e,n,a,o){var u=rn();o=o===void 0?null:o;var h=u.memoizedState.inst;Fe!==null&&o!==null&&uf(o,Fe.memoizedState.deps)?u.memoizedState=ns(n,h,a,o):(le.flags|=e,u.memoizedState=ns(1|n,h,a,o))}function jm(e,n){Bl(8390656,8,e,n)}function xf(e,n){Fl(2048,8,e,n)}function Hx(e){le.flags|=4;var n=le.updateQueue;if(n===null)n=Pl(),le.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Wm(e){var n=rn().memoizedState;return Hx({ref:n,nextImpl:e}),function(){if((Ue&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function qm(e,n){return Fl(4,2,e,n)}function Ym(e,n){return Fl(4,4,e,n)}function Zm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Km(e,n,a){a=a!=null?a.concat([e]):null,Fl(4,4,Zm.bind(null,n,e),a)}function Sf(){}function Qm(e,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&uf(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Jm(e,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&uf(n,o[1]))return o[0];if(o=e(),gr){qt(!0);try{e()}finally{qt(!1)}}return a.memoizedState=[o,n],o}function Mf(e,n,a){return a===void 0||(Ji&1073741824)!==0&&(ve&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=$g(),le.lanes|=e,La|=e,a)}function $m(e,n,a,o){return Kn(a,n)?a:$r.current!==null?(e=Mf(e,a,o),Kn(e,n)||(ln=!0),e):(Ji&42)===0||(Ji&1073741824)!==0&&(ve&261930)===0?(ln=!0,e.memoizedState=a):(e=$g(),le.lanes|=e,La|=e,n)}function tg(e,n,a,o,u){var h=Q.p;Q.p=h!==0&&8>h?h:8;var x=z.T,A={};z.T=A,bf(e,!1,n,a);try{var F=u(),tt=z.S;if(tt!==null&&tt(A,F),F!==null&&typeof F=="object"&&typeof F.then=="function"){var dt=Px(F,o);yo(e,n,dt,ni(e))}else yo(e,n,o,ni(e))}catch(_t){yo(e,n,{then:function(){},status:"rejected",reason:_t},ni())}finally{Q.p=h,x!==null&&A.types!==null&&(x.types=A.types),z.T=x}}function Gx(){}function Ef(e,n,a,o){if(e.tag!==5)throw Error(r(476));var u=eg(e).queue;tg(e,u,n,K,a===null?Gx:function(){return ng(e),a(o)})}function eg(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function ng(e){var n=eg(e);n.next===null&&(n=e.alternate.memoizedState),yo(e,n.next.queue,{},ni())}function Tf(){return Tn(zo)}function ig(){return rn().memoizedState}function ag(){return rn().memoizedState}function Vx(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=ni();e=Aa(a);var o=Ra(n,e,a);o!==null&&(Xn(o,n,a),po(o,n,a)),n={cache:Ju()},e.payload=n;return}n=n.return}}function kx(e,n,a){var o=ni();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Hl(e)?sg(n,a):(a=Gu(e,n,a,o),a!==null&&(Xn(a,e,o),og(a,n,o)))}function rg(e,n,a){var o=ni();yo(e,n,a,o)}function yo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Hl(e))sg(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var x=n.lastRenderedState,A=h(x,a);if(u.hasEagerState=!0,u.eagerState=A,Kn(A,x))return xl(e,n,u,0),je===null&&yl(),!1}catch{}finally{}if(a=Gu(e,n,u,o),a!==null)return Xn(a,e,o),og(a,n,o),!0}return!1}function bf(e,n,a,o){if(o={lane:2,revertLane:ih(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Hl(e)){if(n)throw Error(r(479))}else n=Gu(e,a,o,2),n!==null&&Xn(n,e,2)}function Hl(e){var n=e.alternate;return e===le||n!==null&&n===le}function sg(e,n){ts=Nl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function og(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Ys(e,a)}}var xo={readContext:Tn,use:zl,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e};xo.useEffectEvent=$e;var lg={readContext:Tn,use:zl,useCallback:function(e,n){return On().memoizedState=[e,n===void 0?null:n],e},useContext:Tn,useEffect:jm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Bl(4194308,4,Zm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Bl(4194308,4,e,n)},useInsertionEffect:function(e,n){Bl(4,2,e,n)},useMemo:function(e,n){var a=On();n=n===void 0?null:n;var o=e();if(gr){qt(!0);try{e()}finally{qt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=On();if(a!==void 0){var u=a(n);if(gr){qt(!0);try{a(n)}finally{qt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=kx.bind(null,le,e),[o.memoizedState,e]},useRef:function(e){var n=On();return e={current:e},n.memoizedState=e},useState:function(e){e=vf(e);var n=e.queue,a=rg.bind(null,le,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Sf,useDeferredValue:function(e,n){var a=On();return Mf(a,e,n)},useTransition:function(){var e=vf(!1);return e=tg.bind(null,le,e.queue,!0,!1),On().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=le,u=On();if(Se){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),je===null)throw Error(r(349));(ve&127)!==0||wm(o,n,a)}u.memoizedState=a;var h={value:a,getSnapshot:n};return u.queue=h,jm(Um.bind(null,o,h,e),[e]),o.flags|=2048,ns(9,{destroy:void 0},Dm.bind(null,o,h,a,n),null),a},useId:function(){var e=On(),n=je.identifierPrefix;if(Se){var a=zi,o=Pi;a=(o&~(1<<32-Gt(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Ol++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=zx++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Tf,useFormState:Hm,useActionState:Hm,useOptimistic:function(e){var n=On();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=bf.bind(null,le,!0,a),a.dispatch=n,[e,n]},useMemoCache:mf,useCacheRefresh:function(){return On().memoizedState=Vx.bind(null,le)},useEffectEvent:function(e){var n=On(),a={impl:e};return n.memoizedState=a,function(){if((Ue&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Af={readContext:Tn,use:zl,useCallback:Qm,useContext:Tn,useEffect:xf,useImperativeHandle:Km,useInsertionEffect:qm,useLayoutEffect:Ym,useMemo:Jm,useReducer:Il,useRef:Xm,useState:function(){return Il($i)},useDebugValue:Sf,useDeferredValue:function(e,n){var a=rn();return $m(a,Fe.memoizedState,e,n)},useTransition:function(){var e=Il($i)[0],n=rn().memoizedState;return[typeof e=="boolean"?e:vo(e),n]},useSyncExternalStore:Cm,useId:ig,useHostTransitionStatus:Tf,useFormState:Gm,useActionState:Gm,useOptimistic:function(e,n){var a=rn();return Om(a,Fe,e,n)},useMemoCache:mf,useCacheRefresh:ag};Af.useEffectEvent=Wm;var cg={readContext:Tn,use:zl,useCallback:Qm,useContext:Tn,useEffect:xf,useImperativeHandle:Km,useInsertionEffect:qm,useLayoutEffect:Ym,useMemo:Jm,useReducer:_f,useRef:Xm,useState:function(){return _f($i)},useDebugValue:Sf,useDeferredValue:function(e,n){var a=rn();return Fe===null?Mf(a,e,n):$m(a,Fe.memoizedState,e,n)},useTransition:function(){var e=_f($i)[0],n=rn().memoizedState;return[typeof e=="boolean"?e:vo(e),n]},useSyncExternalStore:Cm,useId:ig,useHostTransitionStatus:Tf,useFormState:km,useActionState:km,useOptimistic:function(e,n){var a=rn();return Fe!==null?Om(a,Fe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:mf,useCacheRefresh:ag};cg.useEffectEvent=Wm;function Rf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Cf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=ni(),u=Aa(o);u.payload=n,a!=null&&(u.callback=a),n=Ra(e,u,o),n!==null&&(Xn(n,e,o),po(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=ni(),u=Aa(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ra(e,u,o),n!==null&&(Xn(n,e,o),po(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=ni(),o=Aa(a);o.tag=2,n!=null&&(o.callback=n),n=Ra(e,o,a),n!==null&&(Xn(n,e,a),po(n,e,a))}};function ug(e,n,a,o,u,h,x){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,x):n.prototype&&n.prototype.isPureReactComponent?!ro(a,o)||!ro(u,h):!0}function fg(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&Cf.enqueueReplaceState(n,n.state,null)}function _r(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function hg(e){vl(e)}function dg(e){console.error(e)}function pg(e){vl(e)}function Gl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function mg(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function wf(e,n,a){return a=Aa(a),a.tag=3,a.payload={element:null},a.callback=function(){Gl(e,n)},a}function gg(e){return e=Aa(e),e.tag=3,e}function _g(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){mg(n,a,o)}}var x=a.stateNode;x!==null&&typeof x.componentDidCatch=="function"&&(e.callback=function(){mg(n,a,o),typeof u!="function"&&(Na===null?Na=new Set([this]):Na.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})})}function Xx(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Yr(n,a,u,!0),a=Jn.current,a!==null){switch(a.tag){case 31:case 13:return hi===null?$l():a.alternate===null&&tn===0&&(tn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Cl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),th(e,o,u)),!1;case 22:return a.flags|=65536,o===Cl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),th(e,o,u)),!1}throw Error(r(435,a.tag))}return th(e,o,u),$l(),!1}if(Se)return n=Jn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==qu&&(e=Error(r(422),{cause:o}),lo(li(e,a)))):(o!==qu&&(n=Error(r(423),{cause:o}),lo(li(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=li(o,a),u=wf(e.stateNode,o,u),rf(e,u),tn!==4&&(tn=2)),!1;var h=Error(r(520),{cause:o});if(h=li(h,a),Co===null?Co=[h]:Co.push(h),tn!==4&&(tn=2),n===null)return!0;o=li(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=wf(a.stateNode,o,e),rf(a,e),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Na===null||!Na.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=gg(u),_g(u,e,a,o),rf(a,u),!1}a=a.return}while(a!==null);return!1}var Df=Error(r(461)),ln=!1;function bn(e,n,a,o){n.child=e===null?Sm(n,null,a,o):mr(n,e.child,a,o)}function vg(e,n,a,o,u){a=a.render;var h=n.ref;if("ref"in o){var x={};for(var A in o)A!=="ref"&&(x[A]=o[A])}else x=o;return fr(n),o=ff(e,n,a,x,h,u),A=hf(),e!==null&&!ln?(df(e,n,u),ta(e,n,u)):(Se&&A&&ju(n),n.flags|=1,bn(e,n,o,u),n.child)}function yg(e,n,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!Vu(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,xg(e,n,h,o,u)):(e=Ml(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!Bf(e,u)){var x=h.memoizedProps;if(a=a.compare,a=a!==null?a:ro,a(x,o)&&e.ref===n.ref)return ta(e,n,u)}return n.flags|=1,e=Yi(h,o),e.ref=n.ref,e.return=n,n.child=e}function xg(e,n,a,o,u){if(e!==null){var h=e.memoizedProps;if(ro(h,o)&&e.ref===n.ref)if(ln=!1,n.pendingProps=o=h,Bf(e,u))(e.flags&131072)!==0&&(ln=!0);else return n.lanes=e.lanes,ta(e,n,u)}return Uf(e,n,a,o,u)}function Sg(e,n,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return Mg(e,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Al(n,h!==null?h.cachePool:null),h!==null?Tm(n,h):of(),bm(n);else return o=n.lanes=536870912,Mg(e,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Al(n,h.cachePool),Tm(n,h),wa(),n.memoizedState=null):(e!==null&&Al(n,null),of(),wa());return bn(e,n,u,a),n.child}function So(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Mg(e,n,a,o,u){var h=tf();return h=h===null?null:{parent:sn._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},e!==null&&Al(n,null),of(),bm(n),e!==null&&Yr(e,n,o,!0),n.childLanes=u,null}function Vl(e,n){return n=Xl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Eg(e,n,a){return mr(n,e.child,null,a),e=Vl(n,n.pendingProps),e.flags|=2,$n(n),n.memoizedState=null,e}function jx(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Se){if(o.mode==="hidden")return e=Vl(n,o),n.lanes=536870912,So(null,e);if(cf(n),(e=We)?(e=P_(e,fi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Sa!==null?{id:Pi,overflow:zi}:null,retryLane:536870912,hydrationErrors:null},a=sm(e),a.return=n,n.child=a,En=n,We=null)):e=null,e===null)throw Ea(n);return n.lanes=536870912,null}return Vl(n,o)}var h=e.memoizedState;if(h!==null){var x=h.dehydrated;if(cf(n),u)if(n.flags&256)n.flags&=-257,n=Eg(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(r(558));else if(ln||Yr(e,n,a,!1),u=(a&e.childLanes)!==0,ln||u){if(o=je,o!==null&&(x=Oi(o,a),x!==0&&x!==h.retryLane))throw h.retryLane=x,or(e,x),Xn(o,e,x),Df;$l(),n=Eg(e,n,a)}else e=h.treeContext,We=di(x.nextSibling),En=n,Se=!0,Ma=null,fi=!1,e!==null&&cm(n,e),n=Vl(n,o),n.flags|=4096;return n}return e=Yi(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function kl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function Uf(e,n,a,o,u){return fr(n),a=ff(e,n,a,o,void 0,u),o=hf(),e!==null&&!ln?(df(e,n,u),ta(e,n,u)):(Se&&o&&ju(n),n.flags|=1,bn(e,n,a,u),n.child)}function Tg(e,n,a,o,u,h){return fr(n),n.updateQueue=null,a=Rm(n,o,a,u),Am(e),o=hf(),e!==null&&!ln?(df(e,n,h),ta(e,n,h)):(Se&&o&&ju(n),n.flags|=1,bn(e,n,a,h),n.child)}function bg(e,n,a,o,u){if(fr(n),n.stateNode===null){var h=Xr,x=a.contextType;typeof x=="object"&&x!==null&&(h=Tn(x)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Cf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},nf(n),x=a.contextType,h.context=typeof x=="object"&&x!==null?Tn(x):Xr,h.state=n.memoizedState,x=a.getDerivedStateFromProps,typeof x=="function"&&(Rf(n,a,x,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(x=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),x!==h.state&&Cf.enqueueReplaceState(h,h.state,null),go(n,o,h,u),mo(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var A=n.memoizedProps,F=_r(a,A);h.props=F;var tt=h.context,dt=a.contextType;x=Xr,typeof dt=="object"&&dt!==null&&(x=Tn(dt));var _t=a.getDerivedStateFromProps;dt=typeof _t=="function"||typeof h.getSnapshotBeforeUpdate=="function",A=n.pendingProps!==A,dt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(A||tt!==x)&&fg(n,h,o,x),ba=!1;var at=n.memoizedState;h.state=at,go(n,o,h,u),mo(),tt=n.memoizedState,A||at!==tt||ba?(typeof _t=="function"&&(Rf(n,a,_t,o),tt=n.memoizedState),(F=ba||ug(n,a,F,o,at,tt,x))?(dt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=tt),h.props=o,h.state=tt,h.context=x,o=F):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,af(e,n),x=n.memoizedProps,dt=_r(a,x),h.props=dt,_t=n.pendingProps,at=h.context,tt=a.contextType,F=Xr,typeof tt=="object"&&tt!==null&&(F=Tn(tt)),A=a.getDerivedStateFromProps,(tt=typeof A=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(x!==_t||at!==F)&&fg(n,h,o,F),ba=!1,at=n.memoizedState,h.state=at,go(n,o,h,u),mo();var ct=n.memoizedState;x!==_t||at!==ct||ba||e!==null&&e.dependencies!==null&&Tl(e.dependencies)?(typeof A=="function"&&(Rf(n,a,A,o),ct=n.memoizedState),(dt=ba||ug(n,a,dt,o,at,ct,F)||e!==null&&e.dependencies!==null&&Tl(e.dependencies))?(tt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ct,F),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ct,F)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||x===e.memoizedProps&&at===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||x===e.memoizedProps&&at===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ct),h.props=o,h.state=ct,h.context=F,o=dt):(typeof h.componentDidUpdate!="function"||x===e.memoizedProps&&at===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||x===e.memoizedProps&&at===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,kl(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=mr(n,e.child,null,u),n.child=mr(n,null,a,u)):bn(e,n,a,u),n.memoizedState=h.state,e=n.child):e=ta(e,n,u),e}function Ag(e,n,a,o){return cr(),n.flags|=256,bn(e,n,a,o),n.child}var Lf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Nf(e){return{baseLanes:e,cachePool:mm()}}function Of(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ei),e}function Rg(e,n,a){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,x;if((x=h)||(x=e!==null&&e.memoizedState===null?!1:(an.current&2)!==0),x&&(u=!0,n.flags&=-129),x=(n.flags&32)!==0,n.flags&=-33,e===null){if(Se){if(u?Ca(n):wa(),(e=We)?(e=P_(e,fi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Sa!==null?{id:Pi,overflow:zi}:null,retryLane:536870912,hydrationErrors:null},a=sm(e),a.return=n,n.child=a,En=n,We=null)):e=null,e===null)throw Ea(n);return gh(e)?n.lanes=32:n.lanes=536870912,null}var A=o.children;return o=o.fallback,u?(wa(),u=n.mode,A=Xl({mode:"hidden",children:A},u),o=lr(o,u,a,null),A.return=n,o.return=n,A.sibling=o,n.child=A,o=n.child,o.memoizedState=Nf(a),o.childLanes=Of(e,x,a),n.memoizedState=Lf,So(null,o)):(Ca(n),Pf(n,A))}var F=e.memoizedState;if(F!==null&&(A=F.dehydrated,A!==null)){if(h)n.flags&256?(Ca(n),n.flags&=-257,n=zf(e,n,a)):n.memoizedState!==null?(wa(),n.child=e.child,n.flags|=128,n=null):(wa(),A=o.fallback,u=n.mode,o=Xl({mode:"visible",children:o.children},u),A=lr(A,u,a,null),A.flags|=2,o.return=n,A.return=n,o.sibling=A,n.child=o,mr(n,e.child,null,a),o=n.child,o.memoizedState=Nf(a),o.childLanes=Of(e,x,a),n.memoizedState=Lf,n=So(null,o));else if(Ca(n),gh(A)){if(x=A.nextSibling&&A.nextSibling.dataset,x)var tt=x.dgst;x=tt,o=Error(r(419)),o.stack="",o.digest=x,lo({value:o,source:null,stack:null}),n=zf(e,n,a)}else if(ln||Yr(e,n,a,!1),x=(a&e.childLanes)!==0,ln||x){if(x=je,x!==null&&(o=Oi(x,a),o!==0&&o!==F.retryLane))throw F.retryLane=o,or(e,o),Xn(x,e,o),Df;mh(A)||$l(),n=zf(e,n,a)}else mh(A)?(n.flags|=192,n.child=e.child,n=null):(e=F.treeContext,We=di(A.nextSibling),En=n,Se=!0,Ma=null,fi=!1,e!==null&&cm(n,e),n=Pf(n,o.children),n.flags|=4096);return n}return u?(wa(),A=o.fallback,u=n.mode,F=e.child,tt=F.sibling,o=Yi(F,{mode:"hidden",children:o.children}),o.subtreeFlags=F.subtreeFlags&65011712,tt!==null?A=Yi(tt,A):(A=lr(A,u,a,null),A.flags|=2),A.return=n,o.return=n,o.sibling=A,n.child=o,So(null,o),o=n.child,A=e.child.memoizedState,A===null?A=Nf(a):(u=A.cachePool,u!==null?(F=sn._currentValue,u=u.parent!==F?{parent:F,pool:F}:u):u=mm(),A={baseLanes:A.baseLanes|a,cachePool:u}),o.memoizedState=A,o.childLanes=Of(e,x,a),n.memoizedState=Lf,So(e.child,o)):(Ca(n),a=e.child,e=a.sibling,a=Yi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(x=n.deletions,x===null?(n.deletions=[e],n.flags|=16):x.push(e)),n.child=a,n.memoizedState=null,a)}function Pf(e,n){return n=Xl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Xl(e,n){return e=Qn(22,e,null,n),e.lanes=0,e}function zf(e,n,a){return mr(n,e.child,null,a),e=Pf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Cg(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Ku(e.return,n,a)}function If(e,n,a,o,u,h){var x=e.memoizedState;x===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(x.isBackwards=n,x.rendering=null,x.renderingStartTime=0,x.last=o,x.tail=a,x.tailMode=u,x.treeForkCount=h)}function wg(e,n,a){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var x=an.current,A=(x&2)!==0;if(A?(x=x&1|2,n.flags|=128):x&=1,St(an,x),bn(e,n,o,a),o=Se?oo:0,!A&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Cg(e,a,n);else if(e.tag===19)Cg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Ll(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),If(n,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Ll(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}If(n,!0,a,null,h,o);break;case"together":If(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ta(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),La|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(Yr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,a=Yi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Yi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Bf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Tl(e)))}function Wx(e,n,a){switch(n.tag){case 3:zt(n,n.stateNode.containerInfo),Ta(n,sn,e.memoizedState.cache),cr();break;case 27:case 5:$t(n);break;case 4:zt(n,n.stateNode.containerInfo);break;case 10:Ta(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,cf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ca(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Rg(e,n,a):(Ca(n),e=ta(e,n,a),e!==null?e.sibling:null);Ca(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Yr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return wg(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),St(an,an.current),o)break;return null;case 22:return n.lanes=0,Sg(e,n,a,n.pendingProps);case 24:Ta(n,sn,e.memoizedState.cache)}return ta(e,n,a)}function Dg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)ln=!0;else{if(!Bf(e,a)&&(n.flags&128)===0)return ln=!1,Wx(e,n,a);ln=(e.flags&131072)!==0}else ln=!1,Se&&(n.flags&1048576)!==0&&lm(n,oo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=dr(n.elementType),n.type=e,typeof e=="function")Vu(e)?(o=_r(e,o),n.tag=1,n=bg(null,n,e,o,a)):(n.tag=0,n=Uf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===w){n.tag=11,n=vg(null,n,e,o,a);break t}else if(u===N){n.tag=14,n=yg(null,n,e,o,a);break t}}throw n=ft(e)||e,Error(r(306,n,""))}}return n;case 0:return Uf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=_r(o,n.pendingProps),bg(e,n,o,u,a);case 3:t:{if(zt(n,n.stateNode.containerInfo),e===null)throw Error(r(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,af(e,n),go(n,o,null,a);var x=n.memoizedState;if(o=x.cache,Ta(n,sn,o),o!==h.cache&&Qu(n,[sn],a,!0),mo(),o=x.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:x.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=Ag(e,n,o,a);break t}else if(o!==u){u=li(Error(r(424)),n),lo(u),n=Ag(e,n,o,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(We=di(e.firstChild),En=n,Se=!0,Ma=null,fi=!0,a=Sm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(cr(),o===u){n=ta(e,n,a);break t}bn(e,n,o,a)}n=n.child}return n;case 26:return kl(e,n),e===null?(a=G_(n.type,null,n.pendingProps,null))?n.memoizedState=a:Se||(a=n.type,e=n.pendingProps,o=sc(At.current).createElement(a),o[Qe]=n,o[Sn]=e,An(o,a,e),W(o),n.stateNode=o):n.memoizedState=G_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return $t(n),e===null&&Se&&(o=n.stateNode=B_(n.type,n.pendingProps,At.current),En=n,fi=!0,u=We,Ia(n.type)?(_h=u,We=di(o.firstChild)):We=u),bn(e,n,n.pendingProps.children,a),kl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Se&&((u=o=We)&&(o=MS(o,n.type,n.pendingProps,fi),o!==null?(n.stateNode=o,En=n,We=di(o.firstChild),fi=!1,u=!0):u=!1),u||Ea(n)),$t(n),u=n.type,h=n.pendingProps,x=e!==null?e.memoizedProps:null,o=h.children,hh(u,h)?o=null:x!==null&&hh(u,x)&&(n.flags|=32),n.memoizedState!==null&&(u=ff(e,n,Ix,null,null,a),zo._currentValue=u),kl(e,n),bn(e,n,o,a),n.child;case 6:return e===null&&Se&&((e=a=We)&&(a=ES(a,n.pendingProps,fi),a!==null?(n.stateNode=a,En=n,We=null,e=!0):e=!1),e||Ea(n)),null;case 13:return Rg(e,n,a);case 4:return zt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=mr(n,null,o,a):bn(e,n,o,a),n.child;case 11:return vg(e,n,n.type,n.pendingProps,a);case 7:return bn(e,n,n.pendingProps,a),n.child;case 8:return bn(e,n,n.pendingProps.children,a),n.child;case 12:return bn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ta(n,n.type,o.value),bn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,fr(n),u=Tn(u),o=o(u),n.flags|=1,bn(e,n,o,a),n.child;case 14:return yg(e,n,n.type,n.pendingProps,a);case 15:return xg(e,n,n.type,n.pendingProps,a);case 19:return wg(e,n,a);case 31:return jx(e,n,a);case 22:return Sg(e,n,a,n.pendingProps);case 24:return fr(n),o=Tn(sn),e===null?(u=tf(),u===null&&(u=je,h=Ju(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),n.memoizedState={parent:o,cache:u},nf(n),Ta(n,sn,u)):((e.lanes&a)!==0&&(af(e,n),go(n,null,null,a),mo()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ta(n,sn,o)):(o=h.cache,Ta(n,sn,o),o!==u.cache&&Qu(n,[sn],a,!0))),bn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function ea(e){e.flags|=4}function Ff(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(i_())e.flags|=8192;else throw pr=Cl,ef}else e.flags&=-16777217}function Ug(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!W_(n))if(i_())e.flags|=8192;else throw pr=Cl,ef}function jl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ze():536870912,e.lanes|=n,ss|=n)}function Mo(e,n){if(!Se)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function qe(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function qx(e,n,a){var o=n.pendingProps;switch(Wu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(n),null;case 1:return qe(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Qi(sn),Jt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(qr(n)?ea(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Yu())),qe(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(ea(n),h!==null?(qe(n),Ug(n,h)):(qe(n),Ff(n,u,null,o,a))):h?h!==e.memoizedState?(ea(n),qe(n),Ug(n,h)):(qe(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ea(n),qe(n),Ff(n,u,e,o,a)),null;case 27:if(Oe(n),a=At.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ea(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return qe(n),null}e=Z.current,qr(n)?um(n):(e=B_(u,o,a),n.stateNode=e,ea(n))}return qe(n),null;case 5:if(Oe(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ea(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return qe(n),null}if(h=Z.current,qr(n))um(n);else{var x=sc(At.current);switch(h){case 1:h=x.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=x.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=x.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?x.createElement("select",{is:o.is}):x.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?x.createElement(u,{is:o.is}):x.createElement(u)}}h[Qe]=n,h[Sn]=o;t:for(x=n.child;x!==null;){if(x.tag===5||x.tag===6)h.appendChild(x.stateNode);else if(x.tag!==4&&x.tag!==27&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===n)break t;for(;x.sibling===null;){if(x.return===null||x.return===n)break t;x=x.return}x.sibling.return=x.return,x=x.sibling}n.stateNode=h;t:switch(An(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ea(n)}}return qe(n),Ff(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ea(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(e=At.current,qr(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=En,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[Qe]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||R_(e.nodeValue,a)),e||Ea(n,!0)}else e=sc(e).createTextNode(o),e[Qe]=n,n.stateNode=e}return qe(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=qr(n),a!==null){if(e===null){if(!o)throw Error(r(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[Qe]=n}else cr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),e=!1}else a=Yu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?($n(n),n):($n(n),null);if((n.flags&128)!==0)throw Error(r(558))}return qe(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=qr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[Qe]=n}else cr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),u=!1}else u=Yu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?($n(n),n):($n(n),null)}return $n(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),jl(n,n.updateQueue),qe(n),null);case 4:return Jt(),e===null&&oh(n.stateNode.containerInfo),qe(n),null;case 10:return Qi(n.type),qe(n),null;case 19:if(st(an),o=n.memoizedState,o===null)return qe(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)Mo(o,!1);else{if(tn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Ll(e),h!==null){for(n.flags|=128,Mo(o,!1),e=h.updateQueue,n.updateQueue=e,jl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)rm(a,e),a=a.sibling;return St(an,an.current&1|2),Se&&Zi(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&b()>Kl&&(n.flags|=128,u=!0,Mo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Ll(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,jl(n,e),Mo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Se)return qe(n),null}else 2*b()-o.renderingStartTime>Kl&&a!==536870912&&(n.flags|=128,u=!0,Mo(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=b(),e.sibling=null,a=an.current,St(an,u?a&1|2:a&1),Se&&Zi(n,o.treeForkCount),e):(qe(n),null);case 22:case 23:return $n(n),lf(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(qe(n),n.subtreeFlags&6&&(n.flags|=8192)):qe(n),a=n.updateQueue,a!==null&&jl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&st(hr),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Qi(sn),qe(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function Yx(e,n){switch(Wu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Qi(sn),Jt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Oe(n),null;case 31:if(n.memoizedState!==null){if($n(n),n.alternate===null)throw Error(r(340));cr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if($n(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));cr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return st(an),null;case 4:return Jt(),null;case 10:return Qi(n.type),null;case 22:case 23:return $n(n),lf(),e!==null&&st(hr),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Qi(sn),null;case 25:return null;default:return null}}function Lg(e,n){switch(Wu(n),n.tag){case 3:Qi(sn),Jt();break;case 26:case 27:case 5:Oe(n);break;case 4:Jt();break;case 31:n.memoizedState!==null&&$n(n);break;case 13:$n(n);break;case 19:st(an);break;case 10:Qi(n.type);break;case 22:case 23:$n(n),lf(),e!==null&&st(hr);break;case 24:Qi(sn)}}function Eo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,x=a.inst;o=h(),x.destroy=o}a=a.next}while(a!==u)}}catch(A){Ne(n,n.return,A)}}function Da(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var x=o.inst,A=x.destroy;if(A!==void 0){x.destroy=void 0,u=n;var F=a,tt=A;try{tt()}catch(dt){Ne(u,F,dt)}}}o=o.next}while(o!==h)}}catch(dt){Ne(n,n.return,dt)}}function Ng(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Em(n,a)}catch(o){Ne(e,e.return,o)}}}function Og(e,n,a){a.props=_r(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ne(e,n,o)}}function To(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ne(e,n,u)}}function Ii(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ne(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ne(e,n,u)}else a.current=null}function Pg(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ne(e,e.return,u)}}function Hf(e,n,a){try{var o=e.stateNode;gS(o,e.type,a,n),o[Sn]=n}catch(u){Ne(e,e.return,u)}}function zg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ia(e.type)||e.tag===4}function Gf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||zg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ia(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Wi));else if(o!==4&&(o===27&&Ia(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Vf(e,n,a),e=e.sibling;e!==null;)Vf(e,n,a),e=e.sibling}function Wl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Ia(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Wl(e,n,a),e=e.sibling;e!==null;)Wl(e,n,a),e=e.sibling}function Ig(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);An(n,o,a),n[Qe]=e,n[Sn]=a}catch(h){Ne(e,e.return,h)}}var na=!1,cn=!1,kf=!1,Bg=typeof WeakSet=="function"?WeakSet:Set,vn=null;function Zx(e,n){if(e=e.containerInfo,uh=dc,e=Kp(e),Pu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var x=0,A=-1,F=-1,tt=0,dt=0,_t=e,at=null;e:for(;;){for(var ct;_t!==a||u!==0&&_t.nodeType!==3||(A=x+u),_t!==h||o!==0&&_t.nodeType!==3||(F=x+o),_t.nodeType===3&&(x+=_t.nodeValue.length),(ct=_t.firstChild)!==null;)at=_t,_t=ct;for(;;){if(_t===e)break e;if(at===a&&++tt===u&&(A=x),at===h&&++dt===o&&(F=x),(ct=_t.nextSibling)!==null)break;_t=at,at=_t.parentNode}_t=ct}a=A===-1||F===-1?null:{start:A,end:F}}else a=null}a=a||{start:0,end:0}}else a=null;for(fh={focusedElem:e,selectionRange:a},dc=!1,vn=n;vn!==null;)if(n=vn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,vn=e;else for(;vn!==null;){switch(n=vn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=n,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Ht=_r(a.type,u);e=o.getSnapshotBeforeUpdate(Ht,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(te){Ne(a,a.return,te)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)ph(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ph(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,vn=e;break}vn=n.return}}function Fg(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:aa(e,a),o&4&&Eo(5,a);break;case 1:if(aa(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(x){Ne(a,a.return,x)}else{var u=_r(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(x){Ne(a,a.return,x)}}o&64&&Ng(a),o&512&&To(a,a.return);break;case 3:if(aa(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Em(e,n)}catch(x){Ne(a,a.return,x)}}break;case 27:n===null&&o&4&&Ig(a);case 26:case 5:aa(e,a),n===null&&o&4&&Pg(a),o&512&&To(a,a.return);break;case 12:aa(e,a);break;case 31:aa(e,a),o&4&&Vg(e,a);break;case 13:aa(e,a),o&4&&kg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=aS.bind(null,a),TS(e,a))));break;case 22:if(o=a.memoizedState!==null||na,!o){n=n!==null&&n.memoizedState!==null||cn,u=na;var h=cn;na=o,(cn=n)&&!h?ra(e,a,(a.subtreeFlags&8772)!==0):aa(e,a),na=u,cn=h}break;case 30:break;default:aa(e,a)}}function Hg(e){var n=e.alternate;n!==null&&(e.alternate=null,Hg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Qs(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ye=null,Hn=!1;function ia(e,n,a){for(a=a.child;a!==null;)Gg(e,n,a),a=a.sibling}function Gg(e,n,a){if(wt&&typeof wt.onCommitFiberUnmount=="function")try{wt.onCommitFiberUnmount(xt,a)}catch{}switch(a.tag){case 26:cn||Ii(a,n),ia(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:cn||Ii(a,n);var o=Ye,u=Hn;Ia(a.type)&&(Ye=a.stateNode,Hn=!1),ia(e,n,a),No(a.stateNode),Ye=o,Hn=u;break;case 5:cn||Ii(a,n);case 6:if(o=Ye,u=Hn,Ye=null,ia(e,n,a),Ye=o,Hn=u,Ye!==null)if(Hn)try{(Ye.nodeType===9?Ye.body:Ye.nodeName==="HTML"?Ye.ownerDocument.body:Ye).removeChild(a.stateNode)}catch(h){Ne(a,n,h)}else try{Ye.removeChild(a.stateNode)}catch(h){Ne(a,n,h)}break;case 18:Ye!==null&&(Hn?(e=Ye,N_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ps(e)):N_(Ye,a.stateNode));break;case 4:o=Ye,u=Hn,Ye=a.stateNode.containerInfo,Hn=!0,ia(e,n,a),Ye=o,Hn=u;break;case 0:case 11:case 14:case 15:Da(2,a,n),cn||Da(4,a,n),ia(e,n,a);break;case 1:cn||(Ii(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Og(a,n,o)),ia(e,n,a);break;case 21:ia(e,n,a);break;case 22:cn=(o=cn)||a.memoizedState!==null,ia(e,n,a),cn=o;break;default:ia(e,n,a)}}function Vg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ps(e)}catch(a){Ne(n,n.return,a)}}}function kg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ps(e)}catch(a){Ne(n,n.return,a)}}function Kx(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Bg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Bg),n;default:throw Error(r(435,e.tag))}}function ql(e,n){var a=Kx(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=rS.bind(null,e,o);o.then(u,u)}})}function Gn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,x=n,A=x;t:for(;A!==null;){switch(A.tag){case 27:if(Ia(A.type)){Ye=A.stateNode,Hn=!1;break t}break;case 5:Ye=A.stateNode,Hn=!1;break t;case 3:case 4:Ye=A.stateNode.containerInfo,Hn=!0;break t}A=A.return}if(Ye===null)throw Error(r(160));Gg(h,x,u),Ye=null,Hn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Xg(n,e),n=n.sibling}var Ei=null;function Xg(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Gn(n,e),Vn(e),o&4&&(Da(3,e,e.return),Eo(3,e),Da(5,e,e.return));break;case 1:Gn(n,e),Vn(e),o&512&&(cn||a===null||Ii(a,a.return)),o&64&&na&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ei;if(Gn(n,e),Vn(e),o&512&&(cn||a===null||Ii(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[ir]||h[Qe]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),An(h,o,a),h[Qe]=e,W(h),o=h;break t;case"link":var x=X_("link","href",u).get(o+(a.href||""));if(x){for(var A=0;A<x.length;A++)if(h=x[A],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){x.splice(A,1);break e}}h=u.createElement(o),An(h,o,a),u.head.appendChild(h);break;case"meta":if(x=X_("meta","content",u).get(o+(a.content||""))){for(A=0;A<x.length;A++)if(h=x[A],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){x.splice(A,1);break e}}h=u.createElement(o),An(h,o,a),u.head.appendChild(h);break;default:throw Error(r(468,o))}h[Qe]=e,W(h),o=h}e.stateNode=o}else j_(u,e.type,e.stateNode);else e.stateNode=k_(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?j_(u,e.type,e.stateNode):k_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Hf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Gn(n,e),Vn(e),o&512&&(cn||a===null||Ii(a,a.return)),a!==null&&o&4&&Hf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Gn(n,e),Vn(e),o&512&&(cn||a===null||Ii(a,a.return)),e.flags&32){u=e.stateNode;try{Bn(u,"")}catch(Ht){Ne(e,e.return,Ht)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Hf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(kf=!0);break;case 6:if(Gn(n,e),Vn(e),o&4){if(e.stateNode===null)throw Error(r(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Ht){Ne(e,e.return,Ht)}}break;case 3:if(cc=null,u=Ei,Ei=oc(n.containerInfo),Gn(n,e),Ei=u,Vn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{ps(n.containerInfo)}catch(Ht){Ne(e,e.return,Ht)}kf&&(kf=!1,jg(e));break;case 4:o=Ei,Ei=oc(e.stateNode.containerInfo),Gn(n,e),Vn(e),Ei=o;break;case 12:Gn(n,e),Vn(e);break;case 31:Gn(n,e),Vn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 13:Gn(n,e),Vn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Zl=b()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 22:u=e.memoizedState!==null;var F=a!==null&&a.memoizedState!==null,tt=na,dt=cn;if(na=tt||u,cn=dt||F,Gn(n,e),cn=dt,na=tt,Vn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||F||na||cn||vr(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){F=a=n;try{if(h=F.stateNode,u)x=h.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none";else{A=F.stateNode;var _t=F.memoizedProps.style,at=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;A.style.display=at==null||typeof at=="boolean"?"":(""+at).trim()}}catch(Ht){Ne(F,F.return,Ht)}}}else if(n.tag===6){if(a===null){F=n;try{F.stateNode.nodeValue=u?"":F.memoizedProps}catch(Ht){Ne(F,F.return,Ht)}}}else if(n.tag===18){if(a===null){F=n;try{var ct=F.stateNode;u?O_(ct,!0):O_(F.stateNode,!1)}catch(Ht){Ne(F,F.return,Ht)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,ql(e,a))));break;case 19:Gn(n,e),Vn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 30:break;case 21:break;default:Gn(n,e),Vn(e)}}function Vn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(zg(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,h=Gf(e);Wl(e,h,u);break;case 5:var x=a.stateNode;a.flags&32&&(Bn(x,""),a.flags&=-33);var A=Gf(e);Wl(e,A,x);break;case 3:case 4:var F=a.stateNode.containerInfo,tt=Gf(e);Vf(e,tt,F);break;default:throw Error(r(161))}}catch(dt){Ne(e,e.return,dt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function jg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;jg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function aa(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Fg(e,n.alternate,n),n=n.sibling}function vr(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Da(4,n,n.return),vr(n);break;case 1:Ii(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Og(n,n.return,a),vr(n);break;case 27:No(n.stateNode);case 26:case 5:Ii(n,n.return),vr(n);break;case 22:n.memoizedState===null&&vr(n);break;case 30:vr(n);break;default:vr(n)}e=e.sibling}}function ra(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,x=h.flags;switch(h.tag){case 0:case 11:case 15:ra(u,h,a),Eo(4,h);break;case 1:if(ra(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){Ne(o,o.return,tt)}if(o=h,u=o.updateQueue,u!==null){var A=o.stateNode;try{var F=u.shared.hiddenCallbacks;if(F!==null)for(u.shared.hiddenCallbacks=null,u=0;u<F.length;u++)Mm(F[u],A)}catch(tt){Ne(o,o.return,tt)}}a&&x&64&&Ng(h),To(h,h.return);break;case 27:Ig(h);case 26:case 5:ra(u,h,a),a&&o===null&&x&4&&Pg(h),To(h,h.return);break;case 12:ra(u,h,a);break;case 31:ra(u,h,a),a&&x&4&&Vg(u,h);break;case 13:ra(u,h,a),a&&x&4&&kg(u,h);break;case 22:h.memoizedState===null&&ra(u,h,a),To(h,h.return);break;case 30:break;default:ra(u,h,a)}n=n.sibling}}function Xf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&co(a))}function jf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&co(e))}function Ti(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Wg(e,n,a,o),n=n.sibling}function Wg(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ti(e,n,a,o),u&2048&&Eo(9,n);break;case 1:Ti(e,n,a,o);break;case 3:Ti(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&co(e)));break;case 12:if(u&2048){Ti(e,n,a,o),e=n.stateNode;try{var h=n.memoizedProps,x=h.id,A=h.onPostCommit;typeof A=="function"&&A(x,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(F){Ne(n,n.return,F)}}else Ti(e,n,a,o);break;case 31:Ti(e,n,a,o);break;case 13:Ti(e,n,a,o);break;case 23:break;case 22:h=n.stateNode,x=n.alternate,n.memoizedState!==null?h._visibility&2?Ti(e,n,a,o):bo(e,n):h._visibility&2?Ti(e,n,a,o):(h._visibility|=2,is(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Xf(x,n);break;case 24:Ti(e,n,a,o),u&2048&&jf(n.alternate,n);break;default:Ti(e,n,a,o)}}function is(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,x=n,A=a,F=o,tt=x.flags;switch(x.tag){case 0:case 11:case 15:is(h,x,A,F,u),Eo(8,x);break;case 23:break;case 22:var dt=x.stateNode;x.memoizedState!==null?dt._visibility&2?is(h,x,A,F,u):bo(h,x):(dt._visibility|=2,is(h,x,A,F,u)),u&&tt&2048&&Xf(x.alternate,x);break;case 24:is(h,x,A,F,u),u&&tt&2048&&jf(x.alternate,x);break;default:is(h,x,A,F,u)}n=n.sibling}}function bo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:bo(a,o),u&2048&&Xf(o.alternate,o);break;case 24:bo(a,o),u&2048&&jf(o.alternate,o);break;default:bo(a,o)}n=n.sibling}}var Ao=8192;function as(e,n,a){if(e.subtreeFlags&Ao)for(e=e.child;e!==null;)qg(e,n,a),e=e.sibling}function qg(e,n,a){switch(e.tag){case 26:as(e,n,a),e.flags&Ao&&e.memoizedState!==null&&zS(a,Ei,e.memoizedState,e.memoizedProps);break;case 5:as(e,n,a);break;case 3:case 4:var o=Ei;Ei=oc(e.stateNode.containerInfo),as(e,n,a),Ei=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Ao,Ao=16777216,as(e,n,a),Ao=o):as(e,n,a));break;default:as(e,n,a)}}function Yg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ro(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];vn=o,Kg(o,e)}Yg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zg(e),e=e.sibling}function Zg(e){switch(e.tag){case 0:case 11:case 15:Ro(e),e.flags&2048&&Da(9,e,e.return);break;case 3:Ro(e);break;case 12:Ro(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Yl(e)):Ro(e);break;default:Ro(e)}}function Yl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];vn=o,Kg(o,e)}Yg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Da(8,n,n.return),Yl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Yl(n));break;default:Yl(n)}e=e.sibling}}function Kg(e,n){for(;vn!==null;){var a=vn;switch(a.tag){case 0:case 11:case 15:Da(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:co(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,vn=o;else t:for(a=e;vn!==null;){o=vn;var u=o.sibling,h=o.return;if(Hg(o),o===a){vn=null;break t}if(u!==null){u.return=h,vn=u;break t}vn=h}}}var Qx={getCacheForType:function(e){var n=Tn(sn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Tn(sn).controller.signal}},Jx=typeof WeakMap=="function"?WeakMap:Map,Ue=0,je=null,pe=null,ve=0,Le=0,ti=null,Ua=!1,rs=!1,Wf=!1,sa=0,tn=0,La=0,yr=0,qf=0,ei=0,ss=0,Co=null,kn=null,Yf=!1,Zl=0,Qg=0,Kl=1/0,Ql=null,Na=null,dn=0,Oa=null,os=null,oa=0,Zf=0,Kf=null,Jg=null,wo=0,Qf=null;function ni(){return(Ue&2)!==0&&ve!==0?ve&-ve:z.T!==null?ih():Zs()}function $g(){if(ei===0)if((ve&536870912)===0||Se){var e=Tt;Tt<<=1,(Tt&3932160)===0&&(Tt=262144),ei=e}else ei=536870912;return e=Jn.current,e!==null&&(e.flags|=32),ei}function Xn(e,n,a){(e===je&&(Le===2||Le===9)||e.cancelPendingCommit!==null)&&(ls(e,0),Pa(e,ve,ei,!1)),xn(e,a),((Ue&2)===0||e!==je)&&(e===je&&((Ue&2)===0&&(yr|=a),tn===4&&Pa(e,ve,ei,!1)),Bi(e))}function t_(e,n,a){if((Ue&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Ft(e,n),u=o?eS(e,n):$f(e,n,!0),h=o;do{if(u===0){rs&&!o&&Pa(e,n,0,!1);break}else{if(a=e.current.alternate,h&&!$x(a)){u=$f(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var x=0;else x=e.pendingLanes&-536870913,x=x!==0?x:x&536870912?536870912:0;if(x!==0){n=x;t:{var A=e;u=Co;var F=A.current.memoizedState.isDehydrated;if(F&&(ls(A,x).flags|=256),x=$f(A,x,!1),x!==2){if(Wf&&!F){A.errorRecoveryDisabledLanes|=h,yr|=h,u=4;break t}h=kn,kn=u,h!==null&&(kn===null?kn=h:kn.push.apply(kn,h))}u=x}if(h=!1,u!==2)continue}}if(u===1){ls(e,0),Pa(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Pa(o,n,ei,!Ua);break t;case 2:kn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=Zl+300-b(),10<u)){if(Pa(o,n,ei,!Ua),vt(o,0,!0)!==0)break t;oa=n,o.timeoutHandle=U_(e_.bind(null,o,a,kn,Ql,Yf,n,ei,yr,ss,Ua,h,"Throttled",-0,0),u);break t}e_(o,a,kn,Ql,Yf,n,ei,yr,ss,Ua,h,null,-0,0)}}break}while(!0);Bi(e)}function e_(e,n,a,o,u,h,x,A,F,tt,dt,_t,at,ct){if(e.timeoutHandle=-1,_t=n.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Wi},qg(n,h,_t);var Ht=(h&62914560)===h?Zl-b():(h&4194048)===h?Qg-b():0;if(Ht=IS(_t,Ht),Ht!==null){oa=h,e.cancelPendingCommit=Ht(c_.bind(null,e,n,h,a,o,u,x,A,F,dt,_t,null,at,ct)),Pa(e,h,x,!tt);return}}c_(e,n,h,a,o,u,x,A,F)}function $x(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!Kn(h(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Pa(e,n,a,o){n&=~qf,n&=~yr,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-Gt(u),x=1<<h;o[h]=-1,u&=~x}a!==0&&qs(e,a,n)}function Jl(){return(Ue&6)===0?(Do(0),!1):!0}function Jf(){if(pe!==null){if(Le===0)var e=pe.return;else e=pe,Ki=ur=null,pf(e),Jr=null,fo=0,e=pe;for(;e!==null;)Lg(e.alternate,e),e=e.return;pe=null}}function ls(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,yS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),oa=0,Jf(),je=e,pe=a=Yi(e.current,null),ve=n,Le=0,ti=null,Ua=!1,rs=Ft(e,n),Wf=!1,ss=ei=qf=yr=La=tn=0,kn=Co=null,Yf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Gt(o),h=1<<u;n|=e[u],o&=~h}return sa=n,yl(),a}function n_(e,n){le=null,z.H=xo,n===Qr||n===Rl?(n=vm(),Le=3):n===ef?(n=vm(),Le=4):Le=n===Df?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ti=n,pe===null&&(tn=1,Gl(e,li(n,e.current)))}function i_(){var e=Jn.current;return e===null?!0:(ve&4194048)===ve?hi===null:(ve&62914560)===ve||(ve&536870912)!==0?e===hi:!1}function a_(){var e=z.H;return z.H=xo,e===null?xo:e}function r_(){var e=z.A;return z.A=Qx,e}function $l(){tn=4,Ua||(ve&4194048)!==ve&&Jn.current!==null||(rs=!0),(La&134217727)===0&&(yr&134217727)===0||je===null||Pa(je,ve,ei,!1)}function $f(e,n,a){var o=Ue;Ue|=2;var u=a_(),h=r_();(je!==e||ve!==n)&&(Ql=null,ls(e,n)),n=!1;var x=tn;t:do try{if(Le!==0&&pe!==null){var A=pe,F=ti;switch(Le){case 8:Jf(),x=6;break t;case 3:case 2:case 9:case 6:Jn.current===null&&(n=!0);var tt=Le;if(Le=0,ti=null,cs(e,A,F,tt),a&&rs){x=0;break t}break;default:tt=Le,Le=0,ti=null,cs(e,A,F,tt)}}tS(),x=tn;break}catch(dt){n_(e,dt)}while(!0);return n&&e.shellSuspendCounter++,Ki=ur=null,Ue=o,z.H=u,z.A=h,pe===null&&(je=null,ve=0,yl()),x}function tS(){for(;pe!==null;)s_(pe)}function eS(e,n){var a=Ue;Ue|=2;var o=a_(),u=r_();je!==e||ve!==n?(Ql=null,Kl=b()+500,ls(e,n)):rs=Ft(e,n);t:do try{if(Le!==0&&pe!==null){n=pe;var h=ti;e:switch(Le){case 1:Le=0,ti=null,cs(e,n,h,1);break;case 2:case 9:if(gm(h)){Le=0,ti=null,o_(n);break}n=function(){Le!==2&&Le!==9||je!==e||(Le=7),Bi(e)},h.then(n,n);break t;case 3:Le=7;break t;case 4:Le=5;break t;case 7:gm(h)?(Le=0,ti=null,o_(n)):(Le=0,ti=null,cs(e,n,h,7));break;case 5:var x=null;switch(pe.tag){case 26:x=pe.memoizedState;case 5:case 27:var A=pe;if(x?W_(x):A.stateNode.complete){Le=0,ti=null;var F=A.sibling;if(F!==null)pe=F;else{var tt=A.return;tt!==null?(pe=tt,tc(tt)):pe=null}break e}}Le=0,ti=null,cs(e,n,h,5);break;case 6:Le=0,ti=null,cs(e,n,h,6);break;case 8:Jf(),tn=6;break t;default:throw Error(r(462))}}nS();break}catch(dt){n_(e,dt)}while(!0);return Ki=ur=null,z.H=o,z.A=u,Ue=a,pe!==null?0:(je=null,ve=0,yl(),tn)}function nS(){for(;pe!==null&&!nn();)s_(pe)}function s_(e){var n=Dg(e.alternate,e,sa);e.memoizedProps=e.pendingProps,n===null?tc(e):pe=n}function o_(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Tg(a,n,n.pendingProps,n.type,void 0,ve);break;case 11:n=Tg(a,n,n.pendingProps,n.type.render,n.ref,ve);break;case 5:pf(n);default:Lg(a,n),n=pe=rm(n,sa),n=Dg(a,n,sa)}e.memoizedProps=e.pendingProps,n===null?tc(e):pe=n}function cs(e,n,a,o){Ki=ur=null,pf(n),Jr=null,fo=0;var u=n.return;try{if(Xx(e,u,n,a,ve)){tn=1,Gl(e,li(a,e.current)),pe=null;return}}catch(h){if(u!==null)throw pe=u,h;tn=1,Gl(e,li(a,e.current)),pe=null;return}n.flags&32768?(Se||o===1?e=!0:rs||(ve&536870912)!==0?e=!1:(Ua=e=!0,(o===2||o===9||o===3||o===6)&&(o=Jn.current,o!==null&&o.tag===13&&(o.flags|=16384))),l_(n,e)):tc(n)}function tc(e){var n=e;do{if((n.flags&32768)!==0){l_(n,Ua);return}e=n.return;var a=qx(n.alternate,n,sa);if(a!==null){pe=a;return}if(n=n.sibling,n!==null){pe=n;return}pe=n=e}while(n!==null);tn===0&&(tn=5)}function l_(e,n){do{var a=Yx(e.alternate,e);if(a!==null){a.flags&=32767,pe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){pe=e;return}pe=e=a}while(e!==null);tn=6,pe=null}function c_(e,n,a,o,u,h,x,A,F){e.cancelPendingCommit=null;do ec();while(dn!==0);if((Ue&6)!==0)throw Error(r(327));if(n!==null){if(n===e.current)throw Error(r(177));if(h=n.lanes|n.childLanes,h|=Hu,yi(e,a,h,x,A,F),e===je&&(pe=je=null,ve=0),os=n,Oa=e,oa=a,Zf=h,Kf=u,Jg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,sS(ht,function(){return p_(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Q.p,Q.p=2,x=Ue,Ue|=4;try{Zx(e,n,a)}finally{Ue=x,Q.p=u,z.T=o}}dn=1,u_(),f_(),h_()}}function u_(){if(dn===1){dn=0;var e=Oa,n=os,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Ue;Ue|=4;try{Xg(n,e);var h=fh,x=Kp(e.containerInfo),A=h.focusedElem,F=h.selectionRange;if(x!==A&&A&&A.ownerDocument&&Zp(A.ownerDocument.documentElement,A)){if(F!==null&&Pu(A)){var tt=F.start,dt=F.end;if(dt===void 0&&(dt=tt),"selectionStart"in A)A.selectionStart=tt,A.selectionEnd=Math.min(dt,A.value.length);else{var _t=A.ownerDocument||document,at=_t&&_t.defaultView||window;if(at.getSelection){var ct=at.getSelection(),Ht=A.textContent.length,te=Math.min(F.start,Ht),Ge=F.end===void 0?te:Math.min(F.end,Ht);!ct.extend&&te>Ge&&(x=Ge,Ge=te,te=x);var Y=Yp(A,te),k=Yp(A,Ge);if(Y&&k&&(ct.rangeCount!==1||ct.anchorNode!==Y.node||ct.anchorOffset!==Y.offset||ct.focusNode!==k.node||ct.focusOffset!==k.offset)){var $=_t.createRange();$.setStart(Y.node,Y.offset),ct.removeAllRanges(),te>Ge?(ct.addRange($),ct.extend(k.node,k.offset)):($.setEnd(k.node,k.offset),ct.addRange($))}}}}for(_t=[],ct=A;ct=ct.parentNode;)ct.nodeType===1&&_t.push({element:ct,left:ct.scrollLeft,top:ct.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<_t.length;A++){var mt=_t[A];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}dc=!!uh,fh=uh=null}finally{Ue=u,Q.p=o,z.T=a}}e.current=n,dn=2}}function f_(){if(dn===2){dn=0;var e=Oa,n=os,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Ue;Ue|=4;try{Fg(e,n.alternate,n)}finally{Ue=u,Q.p=o,z.T=a}}dn=3}}function h_(){if(dn===4||dn===3){dn=0,P();var e=Oa,n=os,a=oa,o=Jg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?dn=5:(dn=0,os=Oa=null,d_(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Na=null),zr(a),n=n.stateNode,wt&&typeof wt.onCommitFiberRoot=="function")try{wt.onCommitFiberRoot(xt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=z.T,u=Q.p,Q.p=2,z.T=null;try{for(var h=e.onRecoverableError,x=0;x<o.length;x++){var A=o[x];h(A.value,{componentStack:A.stack})}}finally{z.T=n,Q.p=u}}(oa&3)!==0&&ec(),Bi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Qf?wo++:(wo=0,Qf=e):wo=0,Do(0)}}function d_(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,co(n)))}function ec(){return u_(),f_(),h_(),p_()}function p_(){if(dn!==5)return!1;var e=Oa,n=Zf;Zf=0;var a=zr(oa),o=z.T,u=Q.p;try{Q.p=32>a?32:a,z.T=null,a=Kf,Kf=null;var h=Oa,x=oa;if(dn=0,os=Oa=null,oa=0,(Ue&6)!==0)throw Error(r(331));var A=Ue;if(Ue|=4,Zg(h.current),Wg(h,h.current,x,a),Ue=A,Do(0,!1),wt&&typeof wt.onPostCommitFiberRoot=="function")try{wt.onPostCommitFiberRoot(xt,h)}catch{}return!0}finally{Q.p=u,z.T=o,d_(e,n)}}function m_(e,n,a){n=li(a,n),n=wf(e.stateNode,n,2),e=Ra(e,n,2),e!==null&&(xn(e,2),Bi(e))}function Ne(e,n,a){if(e.tag===3)m_(e,e,a);else for(;n!==null;){if(n.tag===3){m_(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Na===null||!Na.has(o))){e=li(a,e),a=gg(2),o=Ra(n,a,2),o!==null&&(_g(a,o,n,e),xn(o,2),Bi(o));break}}n=n.return}}function th(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Jx;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Wf=!0,u.add(a),e=iS.bind(null,e,n,a),n.then(e,e))}function iS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,je===e&&(ve&a)===a&&(tn===4||tn===3&&(ve&62914560)===ve&&300>b()-Zl?(Ue&2)===0&&ls(e,0):qf|=a,ss===ve&&(ss=0)),Bi(e)}function g_(e,n){n===0&&(n=ze()),e=or(e,n),e!==null&&(xn(e,n),Bi(e))}function aS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),g_(e,a)}function rS(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),g_(e,a)}function sS(e,n){return Zt(e,n)}var nc=null,us=null,eh=!1,ic=!1,nh=!1,za=0;function Bi(e){e!==us&&e.next===null&&(us===null?nc=us=e:us=us.next=e),ic=!0,eh||(eh=!0,lS())}function Do(e,n){if(!nh&&ic){nh=!0;do for(var a=!1,o=nc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var x=o.suspendedLanes,A=o.pingedLanes;h=(1<<31-Gt(42|e)+1)-1,h&=u&~(x&~A),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,x_(o,h))}else h=ve,h=vt(o,o===je?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Ft(o,h)||(a=!0,x_(o,h));o=o.next}while(a);nh=!1}}function oS(){__()}function __(){ic=eh=!1;var e=0;za!==0&&vS()&&(e=za);for(var n=b(),a=null,o=nc;o!==null;){var u=o.next,h=v_(o,n);h===0?(o.next=null,a===null?nc=u:a.next=u,u===null&&(us=a)):(a=o,(e!==0||(h&3)!==0)&&(ic=!0)),o=u}dn!==0&&dn!==5||Do(e),za!==0&&(za=0)}function v_(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var x=31-Gt(h),A=1<<x,F=u[x];F===-1?((A&a)===0||(A&o)!==0)&&(u[x]=ae(A,n)):F<=n&&(e.expiredLanes|=A),h&=~A}if(n=je,a=ve,a=vt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Le===2||Le===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&se(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Ft(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&se(o),zr(a)){case 2:case 8:a=yt;break;case 32:a=ht;break;case 268435456:a=Dt;break;default:a=ht}return o=y_.bind(null,e),a=Zt(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&se(o),e.callbackPriority=2,e.callbackNode=null,2}function y_(e,n){if(dn!==0&&dn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(ec()&&e.callbackNode!==a)return null;var o=ve;return o=vt(e,e===je?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(t_(e,o,n),v_(e,b()),e.callbackNode!=null&&e.callbackNode===a?y_.bind(null,e):null)}function x_(e,n){if(ec())return null;t_(e,n,!0)}function lS(){xS(function(){(Ue&6)!==0?Zt(gt,oS):__()})}function ih(){if(za===0){var e=Zr;e===0&&(e=Lt,Lt<<=1,(Lt&261888)===0&&(Lt=256)),za=e}return za}function S_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:fl(""+e)}function M_(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function cS(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var h=S_((u[Sn]||null).action),x=o.submitter;x&&(n=(n=x[Sn]||null)?S_(n.formAction):x.getAttribute("formAction"),n!==null&&(h=n,x=null));var A=new ml("action","action",null,o,u);e.push({event:A,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(za!==0){var F=x?M_(u,x):new FormData(u);Ef(a,{pending:!0,data:F,method:u.method,action:h},null,F)}}else typeof h=="function"&&(A.preventDefault(),F=x?M_(u,x):new FormData(u),Ef(a,{pending:!0,data:F,method:u.method,action:h},h,F))},currentTarget:u}]})}}for(var ah=0;ah<Fu.length;ah++){var rh=Fu[ah],uS=rh.toLowerCase(),fS=rh[0].toUpperCase()+rh.slice(1);Mi(uS,"on"+fS)}Mi($p,"onAnimationEnd"),Mi(tm,"onAnimationIteration"),Mi(em,"onAnimationStart"),Mi("dblclick","onDoubleClick"),Mi("focusin","onFocus"),Mi("focusout","onBlur"),Mi(Rx,"onTransitionRun"),Mi(Cx,"onTransitionStart"),Mi(wx,"onTransitionCancel"),Mi(nm,"onTransitionEnd"),Pt("onMouseEnter",["mouseout","mouseover"]),Pt("onMouseLeave",["mouseout","mouseover"]),Pt("onPointerEnter",["pointerout","pointerover"]),Pt("onPointerLeave",["pointerout","pointerover"]),It("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),It("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),It("onBeforeInput",["compositionend","keypress","textInput","paste"]),It("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),It("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),It("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Uo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Uo));function E_(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var x=o.length-1;0<=x;x--){var A=o[x],F=A.instance,tt=A.currentTarget;if(A=A.listener,F!==h&&u.isPropagationStopped())break t;h=A,u.currentTarget=tt;try{h(u)}catch(dt){vl(dt)}u.currentTarget=null,h=F}else for(x=0;x<o.length;x++){if(A=o[x],F=A.instance,tt=A.currentTarget,A=A.listener,F!==h&&u.isPropagationStopped())break t;h=A,u.currentTarget=tt;try{h(u)}catch(dt){vl(dt)}u.currentTarget=null,h=F}}}}function me(e,n){var a=n[Ks];a===void 0&&(a=n[Ks]=new Set);var o=e+"__bubble";a.has(o)||(T_(n,e,2,!1),a.add(o))}function sh(e,n,a){var o=0;n&&(o|=4),T_(a,e,o,n)}var ac="_reactListening"+Math.random().toString(36).slice(2);function oh(e){if(!e[ac]){e[ac]=!0,Rt.forEach(function(a){a!=="selectionchange"&&(hS.has(a)||sh(a,!1,e),sh(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ac]||(n[ac]=!0,sh("selectionchange",!1,n))}}function T_(e,n,a,o){switch($_(n)){case 2:var u=HS;break;case 8:u=GS;break;default:u=Mh}a=u.bind(null,n,a,e),u=void 0,!Au||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function lh(e,n,a,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var x=o.tag;if(x===3||x===4){var A=o.stateNode.containerInfo;if(A===u)break;if(x===4)for(x=o.return;x!==null;){var F=x.tag;if((F===3||F===4)&&x.stateNode.containerInfo===u)return;x=x.return}for(;A!==null;){if(x=R(A),x===null)return;if(F=x.tag,F===5||F===6||F===26||F===27){o=h=x;continue t}A=A.parentNode}}o=o.return}wp(function(){var tt=h,dt=Tu(a),_t=[];t:{var at=im.get(e);if(at!==void 0){var ct=ml,Ht=e;switch(e){case"keypress":if(dl(a)===0)break t;case"keydown":case"keyup":ct=rx;break;case"focusin":Ht="focus",ct=Du;break;case"focusout":Ht="blur",ct=Du;break;case"beforeblur":case"afterblur":ct=Du;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ct=Lp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ct=qy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ct=lx;break;case $p:case tm:case em:ct=Ky;break;case nm:ct=ux;break;case"scroll":case"scrollend":ct=jy;break;case"wheel":ct=hx;break;case"copy":case"cut":case"paste":ct=Jy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ct=Op;break;case"toggle":case"beforetoggle":ct=px}var te=(n&4)!==0,Ge=!te&&(e==="scroll"||e==="scrollend"),Y=te?at!==null?at+"Capture":null:at;te=[];for(var k=tt,$;k!==null;){var mt=k;if($=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||$===null||Y===null||(mt=Js(k,Y),mt!=null&&te.push(Lo(k,mt,$))),Ge)break;k=k.return}0<te.length&&(at=new ct(at,Ht,null,a,dt),_t.push({event:at,listeners:te}))}}if((n&7)===0){t:{if(at=e==="mouseover"||e==="pointerover",ct=e==="mouseout"||e==="pointerout",at&&a!==Eu&&(Ht=a.relatedTarget||a.fromElement)&&(R(Ht)||Ht[ji]))break t;if((ct||at)&&(at=dt.window===dt?dt:(at=dt.ownerDocument)?at.defaultView||at.parentWindow:window,ct?(Ht=a.relatedTarget||a.toElement,ct=tt,Ht=Ht?R(Ht):null,Ht!==null&&(Ge=c(Ht),te=Ht.tag,Ht!==Ge||te!==5&&te!==27&&te!==6)&&(Ht=null)):(ct=null,Ht=tt),ct!==Ht)){if(te=Lp,mt="onMouseLeave",Y="onMouseEnter",k="mouse",(e==="pointerout"||e==="pointerover")&&(te=Op,mt="onPointerLeave",Y="onPointerEnter",k="pointer"),Ge=ct==null?at:ot(ct),$=Ht==null?at:ot(Ht),at=new te(mt,k+"leave",ct,a,dt),at.target=Ge,at.relatedTarget=$,mt=null,R(dt)===tt&&(te=new te(Y,k+"enter",Ht,a,dt),te.target=$,te.relatedTarget=Ge,mt=te),Ge=mt,ct&&Ht)e:{for(te=dS,Y=ct,k=Ht,$=0,mt=Y;mt;mt=te(mt))$++;mt=0;for(var Kt=k;Kt;Kt=te(Kt))mt++;for(;0<$-mt;)Y=te(Y),$--;for(;0<mt-$;)k=te(k),mt--;for(;$--;){if(Y===k||k!==null&&Y===k.alternate){te=Y;break e}Y=te(Y),k=te(k)}te=null}else te=null;ct!==null&&b_(_t,at,ct,te,!1),Ht!==null&&Ge!==null&&b_(_t,Ge,Ht,te,!0)}}t:{if(at=tt?ot(tt):window,ct=at.nodeName&&at.nodeName.toLowerCase(),ct==="select"||ct==="input"&&at.type==="file")var Ce=Vp;else if(Hp(at))if(kp)Ce=Tx;else{Ce=Mx;var kt=Sx}else ct=at.nodeName,!ct||ct.toLowerCase()!=="input"||at.type!=="checkbox"&&at.type!=="radio"?tt&&Mu(tt.elementType)&&(Ce=Vp):Ce=Ex;if(Ce&&(Ce=Ce(e,tt))){Gp(_t,Ce,a,dt);break t}kt&&kt(e,at,tt),e==="focusout"&&tt&&at.type==="number"&&tt.memoizedProps.value!=null&&Cn(at,"number",at.value)}switch(kt=tt?ot(tt):window,e){case"focusin":(Hp(kt)||kt.contentEditable==="true")&&(Gr=kt,zu=tt,so=null);break;case"focusout":so=zu=Gr=null;break;case"mousedown":Iu=!0;break;case"contextmenu":case"mouseup":case"dragend":Iu=!1,Qp(_t,a,dt);break;case"selectionchange":if(Ax)break;case"keydown":case"keyup":Qp(_t,a,dt)}var ue;if(Lu)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Hr?Bp(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(Pp&&a.locale!=="ko"&&(Hr||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Hr&&(ue=Dp()):(xa=dt,Ru="value"in xa?xa.value:xa.textContent,Hr=!0)),kt=rc(tt,ye),0<kt.length&&(ye=new Np(ye,e,null,a,dt),_t.push({event:ye,listeners:kt}),ue?ye.data=ue:(ue=Fp(a),ue!==null&&(ye.data=ue)))),(ue=gx?_x(e,a):vx(e,a))&&(ye=rc(tt,"onBeforeInput"),0<ye.length&&(kt=new Np("onBeforeInput","beforeinput",null,a,dt),_t.push({event:kt,listeners:ye}),kt.data=ue)),cS(_t,e,tt,a,dt)}E_(_t,n)})}function Lo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function rc(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=Js(e,a),u!=null&&o.unshift(Lo(e,u,h)),u=Js(e,n),u!=null&&o.push(Lo(e,u,h))),e.tag===3)return o;e=e.return}return[]}function dS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function b_(e,n,a,o,u){for(var h=n._reactName,x=[];a!==null&&a!==o;){var A=a,F=A.alternate,tt=A.stateNode;if(A=A.tag,F!==null&&F===o)break;A!==5&&A!==26&&A!==27||tt===null||(F=tt,u?(tt=Js(a,h),tt!=null&&x.unshift(Lo(a,tt,F))):u||(tt=Js(a,h),tt!=null&&x.push(Lo(a,tt,F)))),a=a.return}x.length!==0&&e.push({event:n,listeners:x})}var pS=/\r\n?/g,mS=/\u0000|\uFFFD/g;function A_(e){return(typeof e=="string"?e:""+e).replace(pS,`
`).replace(mS,"")}function R_(e,n){return n=A_(n),A_(e)===n}function He(e,n,a,o,u,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Bn(e,""+o);break;case"className":Ie(e,"class",o);break;case"tabIndex":Ie(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ie(e,a,o);break;case"style":Rp(e,o,h);break;case"data":if(n!=="object"){Ie(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=fl(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&He(e,n,"name",u.name,u,null),He(e,n,"formEncType",u.formEncType,u,null),He(e,n,"formMethod",u.formMethod,u,null),He(e,n,"formTarget",u.formTarget,u,null)):(He(e,n,"encType",u.encType,u,null),He(e,n,"method",u.method,u,null),He(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=fl(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Wi);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=fl(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":me("beforetoggle",e),me("toggle",e),Te(e,"popover",o);break;case"xlinkActuate":Re(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Re(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Re(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Re(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Re(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Re(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Re(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Re(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Re(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Te(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ky.get(a)||a,Te(e,a,o))}}function ch(e,n,a,o,u,h){switch(a){case"style":Rp(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&Bn(e,""+o);break;case"onScroll":o!=null&&me("scroll",e);break;case"onScrollEnd":o!=null&&me("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Wi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Nt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),h=e[Sn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Te(e,a,o)}}}function An(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var x=a[h];if(x!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:He(e,n,h,x,a,null)}}u&&He(e,n,"srcSet",a.srcSet,a,null),o&&He(e,n,"src",a.src,a,null);return;case"input":me("invalid",e);var A=h=x=u=null,F=null,tt=null;for(o in a)if(a.hasOwnProperty(o)){var dt=a[o];if(dt!=null)switch(o){case"name":u=dt;break;case"type":x=dt;break;case"checked":F=dt;break;case"defaultChecked":tt=dt;break;case"value":h=dt;break;case"defaultValue":A=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(r(137,n));break;default:He(e,n,o,dt,a,null)}}Nn(e,h,A,F,tt,x,u,!1);return;case"select":me("invalid",e),o=x=h=null;for(u in a)if(a.hasOwnProperty(u)&&(A=a[u],A!=null))switch(u){case"value":h=A;break;case"defaultValue":x=A;break;case"multiple":o=A;default:He(e,n,u,A,a,null)}n=h,a=x,e.multiple=!!o,n!=null?Je(e,!!o,n,!1):a!=null&&Je(e,!!o,a,!0);return;case"textarea":me("invalid",e),h=u=o=null;for(x in a)if(a.hasOwnProperty(x)&&(A=a[x],A!=null))switch(x){case"value":o=A;break;case"defaultValue":u=A;break;case"children":h=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(r(91));break;default:He(e,n,x,A,a,null)}Ir(e,o,u,h);return;case"option":for(F in a)if(a.hasOwnProperty(F)&&(o=a[F],o!=null))switch(F){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:He(e,n,F,o,a,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(o=0;o<Uo.length;o++)me(Uo[o],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(o=a[tt],o!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:He(e,n,tt,o,a,null)}return;default:if(Mu(n)){for(dt in a)a.hasOwnProperty(dt)&&(o=a[dt],o!==void 0&&ch(e,n,dt,o,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(o=a[A],o!=null&&He(e,n,A,o,a,null))}function gS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,x=null,A=null,F=null,tt=null,dt=null;for(ct in a){var _t=a[ct];if(a.hasOwnProperty(ct)&&_t!=null)switch(ct){case"checked":break;case"value":break;case"defaultValue":F=_t;default:o.hasOwnProperty(ct)||He(e,n,ct,null,o,_t)}}for(var at in o){var ct=o[at];if(_t=a[at],o.hasOwnProperty(at)&&(ct!=null||_t!=null))switch(at){case"type":h=ct;break;case"name":u=ct;break;case"checked":tt=ct;break;case"defaultChecked":dt=ct;break;case"value":x=ct;break;case"defaultValue":A=ct;break;case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(r(137,n));break;default:ct!==_t&&He(e,n,at,ct,o,_t)}}Be(e,x,A,F,tt,dt,h,u);return;case"select":ct=x=A=at=null;for(h in a)if(F=a[h],a.hasOwnProperty(h)&&F!=null)switch(h){case"value":break;case"multiple":ct=F;default:o.hasOwnProperty(h)||He(e,n,h,null,o,F)}for(u in o)if(h=o[u],F=a[u],o.hasOwnProperty(u)&&(h!=null||F!=null))switch(u){case"value":at=h;break;case"defaultValue":A=h;break;case"multiple":x=h;default:h!==F&&He(e,n,u,h,o,F)}n=A,a=x,o=ct,at!=null?Je(e,!!a,at,!1):!!o!=!!a&&(n!=null?Je(e,!!a,n,!0):Je(e,!!a,a?[]:"",!1));return;case"textarea":ct=at=null;for(A in a)if(u=a[A],a.hasOwnProperty(A)&&u!=null&&!o.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:He(e,n,A,null,o,u)}for(x in o)if(u=o[x],h=a[x],o.hasOwnProperty(x)&&(u!=null||h!=null))switch(x){case"value":at=u;break;case"defaultValue":ct=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==h&&He(e,n,x,u,o,h)}Mn(e,at,ct);return;case"option":for(var Ht in a)if(at=a[Ht],a.hasOwnProperty(Ht)&&at!=null&&!o.hasOwnProperty(Ht))switch(Ht){case"selected":e.selected=!1;break;default:He(e,n,Ht,null,o,at)}for(F in o)if(at=o[F],ct=a[F],o.hasOwnProperty(F)&&at!==ct&&(at!=null||ct!=null))switch(F){case"selected":e.selected=at&&typeof at!="function"&&typeof at!="symbol";break;default:He(e,n,F,at,o,ct)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var te in a)at=a[te],a.hasOwnProperty(te)&&at!=null&&!o.hasOwnProperty(te)&&He(e,n,te,null,o,at);for(tt in o)if(at=o[tt],ct=a[tt],o.hasOwnProperty(tt)&&at!==ct&&(at!=null||ct!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(at!=null)throw Error(r(137,n));break;default:He(e,n,tt,at,o,ct)}return;default:if(Mu(n)){for(var Ge in a)at=a[Ge],a.hasOwnProperty(Ge)&&at!==void 0&&!o.hasOwnProperty(Ge)&&ch(e,n,Ge,void 0,o,at);for(dt in o)at=o[dt],ct=a[dt],!o.hasOwnProperty(dt)||at===ct||at===void 0&&ct===void 0||ch(e,n,dt,at,o,ct);return}}for(var Y in a)at=a[Y],a.hasOwnProperty(Y)&&at!=null&&!o.hasOwnProperty(Y)&&He(e,n,Y,null,o,at);for(_t in o)at=o[_t],ct=a[_t],!o.hasOwnProperty(_t)||at===ct||at==null&&ct==null||He(e,n,_t,at,o,ct)}function C_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _S(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,x=u.initiatorType,A=u.duration;if(h&&A&&C_(x)){for(x=0,A=u.responseEnd,o+=1;o<a.length;o++){var F=a[o],tt=F.startTime;if(tt>A)break;var dt=F.transferSize,_t=F.initiatorType;dt&&C_(_t)&&(F=F.responseEnd,x+=dt*(F<A?1:(A-tt)/(F-tt)))}if(--o,n+=8*(h+x)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var uh=null,fh=null;function sc(e){return e.nodeType===9?e:e.ownerDocument}function w_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function D_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function hh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var dh=null;function vS(){var e=window.event;return e&&e.type==="popstate"?e===dh?!1:(dh=e,!0):(dh=null,!1)}var U_=typeof setTimeout=="function"?setTimeout:void 0,yS=typeof clearTimeout=="function"?clearTimeout:void 0,L_=typeof Promise=="function"?Promise:void 0,xS=typeof queueMicrotask=="function"?queueMicrotask:typeof L_<"u"?function(e){return L_.resolve(null).then(e).catch(SS)}:U_;function SS(e){setTimeout(function(){throw e})}function Ia(e){return e==="head"}function N_(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),ps(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")No(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,No(a);for(var h=a.firstChild;h;){var x=h.nextSibling,A=h.nodeName;h[ir]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=x}}else a==="body"&&No(e.ownerDocument.body);a=u}while(a);ps(n)}function O_(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function ph(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":ph(a),Qs(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function MS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[ir])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=di(e.nextSibling),e===null)break}return null}function ES(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=di(e.nextSibling),e===null))return null;return e}function P_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=di(e.nextSibling),e===null))return null;return e}function mh(e){return e.data==="$?"||e.data==="$~"}function gh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function TS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function di(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var _h=null;function z_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return di(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function I_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function B_(e,n,a){switch(n=sc(a),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function No(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Qs(e)}var pi=new Map,F_=new Set;function oc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var la=Q.d;Q.d={f:bS,r:AS,D:RS,C:CS,L:wS,m:DS,X:LS,S:US,M:NS};function bS(){var e=la.f(),n=Jl();return e||n}function AS(e){var n=q(e);n!==null&&n.tag===5&&n.type==="form"?ng(n):la.r(e)}var fs=typeof document>"u"?null:document;function H_(e,n,a){var o=fs;if(o&&typeof n=="string"&&n){var u=_n(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),F_.has(u)||(F_.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),An(n,"link",e),W(n),o.head.appendChild(n)))}}function RS(e){la.D(e),H_("dns-prefetch",e,null)}function CS(e,n){la.C(e,n),H_("preconnect",e,n)}function wS(e,n,a){la.L(e,n,a);var o=fs;if(o&&e&&n){var u='link[rel="preload"][as="'+_n(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+_n(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+_n(a.imageSizes)+'"]')):u+='[href="'+_n(e)+'"]';var h=u;switch(n){case"style":h=hs(e);break;case"script":h=ds(e)}pi.has(h)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),pi.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Oo(h))||n==="script"&&o.querySelector(Po(h))||(n=o.createElement("link"),An(n,"link",e),W(n),o.head.appendChild(n)))}}function DS(e,n){la.m(e,n);var a=fs;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+_n(o)+'"][href="'+_n(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=ds(e)}if(!pi.has(h)&&(e=_({rel:"modulepreload",href:e},n),pi.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Po(h)))return}o=a.createElement("link"),An(o,"link",e),W(o),a.head.appendChild(o)}}}function US(e,n,a){la.S(e,n,a);var o=fs;if(o&&e){var u=lt(o).hoistableStyles,h=hs(e);n=n||"default";var x=u.get(h);if(!x){var A={loading:0,preload:null};if(x=o.querySelector(Oo(h)))A.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=pi.get(h))&&vh(e,a);var F=x=o.createElement("link");W(F),An(F,"link",e),F._p=new Promise(function(tt,dt){F.onload=tt,F.onerror=dt}),F.addEventListener("load",function(){A.loading|=1}),F.addEventListener("error",function(){A.loading|=2}),A.loading|=4,lc(x,n,o)}x={type:"stylesheet",instance:x,count:1,state:A},u.set(h,x)}}}function LS(e,n){la.X(e,n);var a=fs;if(a&&e){var o=lt(a).hoistableScripts,u=ds(e),h=o.get(u);h||(h=a.querySelector(Po(u)),h||(e=_({src:e,async:!0},n),(n=pi.get(u))&&yh(e,n),h=a.createElement("script"),W(h),An(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function NS(e,n){la.M(e,n);var a=fs;if(a&&e){var o=lt(a).hoistableScripts,u=ds(e),h=o.get(u);h||(h=a.querySelector(Po(u)),h||(e=_({src:e,async:!0,type:"module"},n),(n=pi.get(u))&&yh(e,n),h=a.createElement("script"),W(h),An(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function G_(e,n,a,o){var u=(u=At.current)?oc(u):null;if(!u)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=hs(a.href),a=lt(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=hs(a.href);var h=lt(u).hoistableStyles,x=h.get(e);if(x||(u=u.ownerDocument||u,x={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,x),(h=u.querySelector(Oo(e)))&&!h._p&&(x.instance=h,x.state.loading=5),pi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},pi.set(e,a),h||OS(u,e,a,x.state))),n&&o===null)throw Error(r(528,""));return x}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ds(a),a=lt(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function hs(e){return'href="'+_n(e)+'"'}function Oo(e){return'link[rel="stylesheet"]['+e+"]"}function V_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function OS(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),An(n,"link",a),W(n),e.head.appendChild(n))}function ds(e){return'[src="'+_n(e)+'"]'}function Po(e){return"script[async]"+e}function k_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+_n(a.href)+'"]');if(o)return n.instance=o,W(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),W(o),An(o,"style",u),lc(o,a.precedence,e),n.instance=o;case"stylesheet":u=hs(a.href);var h=e.querySelector(Oo(u));if(h)return n.state.loading|=4,n.instance=h,W(h),h;o=V_(a),(u=pi.get(u))&&vh(o,u),h=(e.ownerDocument||e).createElement("link"),W(h);var x=h;return x._p=new Promise(function(A,F){x.onload=A,x.onerror=F}),An(h,"link",o),n.state.loading|=4,lc(h,a.precedence,e),n.instance=h;case"script":return h=ds(a.src),(u=e.querySelector(Po(h)))?(n.instance=u,W(u),u):(o=a,(u=pi.get(h))&&(o=_({},a),yh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),W(u),An(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,lc(o,a.precedence,e));return n.instance}function lc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,x=0;x<o.length;x++){var A=o[x];if(A.dataset.precedence===n)h=A;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function vh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function yh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var cc=null;function X_(e,n,a){if(cc===null){var o=new Map,u=cc=new Map;u.set(a,o)}else u=cc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[ir]||h[Qe]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var x=h.getAttribute(n)||"";x=e+x;var A=o.get(x);A?A.push(h):o.set(x,[h])}}return o}function j_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function PS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function W_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function zS(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=hs(o.href),h=n.querySelector(Oo(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=uc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=h,W(h);return}h=n.ownerDocument||n,o=V_(o),(u=pi.get(u))&&vh(o,u),h=h.createElement("link"),W(h);var x=h;x._p=new Promise(function(A,F){x.onload=A,x.onerror=F}),An(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=uc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var xh=0;function IS(e,n){return e.stylesheets&&e.count===0&&hc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&hc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&xh===0&&(xh=62500*_S());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&hc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>xh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function uc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)hc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var fc=null;function hc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,fc=new Map,n.forEach(BS,e),fc=null,uc.call(e))}function BS(e,n){if(!(n.state.loading&4)){var a=fc.get(e);if(a)var o=a.get(null);else{a=new Map,fc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var x=u[h];(x.nodeName==="LINK"||x.getAttribute("media")!=="not all")&&(a.set(x.dataset.precedence,x),o=x)}o&&a.set(null,o)}u=n.instance,x=u.getAttribute("data-precedence"),h=a.get(x)||o,h===o&&a.set(null,u),a.set(x,u),this.count++,o=uc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var zo={$$typeof:U,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function FS(e,n,a,o,u,h,x,A,F){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=x,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=F,this.incompleteTransitions=new Map}function q_(e,n,a,o,u,h,x,A,F,tt,dt,_t){return e=new FS(e,n,a,x,F,tt,dt,_t,A),n=1,h===!0&&(n|=24),h=Qn(3,null,null,n),e.current=h,h.stateNode=e,n=Ju(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},nf(h),e}function Y_(e){return e?(e=Xr,e):Xr}function Z_(e,n,a,o,u,h){u=Y_(u),o.context===null?o.context=u:o.pendingContext=u,o=Aa(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Ra(e,o,n),a!==null&&(Xn(a,e,n),po(a,e,n))}function K_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Sh(e,n){K_(e,n),(e=e.alternate)&&K_(e,n)}function Q_(e){if(e.tag===13||e.tag===31){var n=or(e,67108864);n!==null&&Xn(n,e,67108864),Sh(e,67108864)}}function J_(e){if(e.tag===13||e.tag===31){var n=ni();n=er(n);var a=or(e,n);a!==null&&Xn(a,e,n),Sh(e,n)}}var dc=!0;function HS(e,n,a,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=2,Mh(e,n,a,o)}finally{Q.p=h,z.T=u}}function GS(e,n,a,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=8,Mh(e,n,a,o)}finally{Q.p=h,z.T=u}}function Mh(e,n,a,o){if(dc){var u=Eh(o);if(u===null)lh(e,n,o,pc,a),tv(e,o);else if(kS(u,e,n,a,o))o.stopPropagation();else if(tv(e,o),n&4&&-1<VS.indexOf(e)){for(;u!==null;){var h=q(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var x=bt(h.pendingLanes);if(x!==0){var A=h;for(A.pendingLanes|=2,A.entangledLanes|=2;x;){var F=1<<31-Gt(x);A.entanglements[1]|=F,x&=~F}Bi(h),(Ue&6)===0&&(Kl=b()+500,Do(0))}}break;case 31:case 13:A=or(h,2),A!==null&&Xn(A,h,2),Jl(),Sh(h,2)}if(h=Eh(o),h===null&&lh(e,n,o,pc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else lh(e,n,o,null,a)}}function Eh(e){return e=Tu(e),Th(e)}var pc=null;function Th(e){if(pc=null,e=R(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return pc=e,null}function $_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(it()){case gt:return 2;case yt:return 8;case ht:case jt:return 32;case Dt:return 268435456;default:return 32}default:return 32}}var bh=!1,Ba=null,Fa=null,Ha=null,Io=new Map,Bo=new Map,Ga=[],VS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function tv(e,n){switch(e){case"focusin":case"focusout":Ba=null;break;case"dragenter":case"dragleave":Fa=null;break;case"mouseover":case"mouseout":Ha=null;break;case"pointerover":case"pointerout":Io.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bo.delete(n.pointerId)}}function Fo(e,n,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=q(n),n!==null&&Q_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function kS(e,n,a,o,u){switch(n){case"focusin":return Ba=Fo(Ba,e,n,a,o,u),!0;case"dragenter":return Fa=Fo(Fa,e,n,a,o,u),!0;case"mouseover":return Ha=Fo(Ha,e,n,a,o,u),!0;case"pointerover":var h=u.pointerId;return Io.set(h,Fo(Io.get(h)||null,e,n,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Bo.set(h,Fo(Bo.get(h)||null,e,n,a,o,u)),!0}return!1}function ev(e){var n=R(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,nr(e.priority,function(){J_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,nr(e.priority,function(){J_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function mc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Eh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Eu=o,a.target.dispatchEvent(o),Eu=null}else return n=q(a),n!==null&&Q_(n),e.blockedOn=a,!1;n.shift()}return!0}function nv(e,n,a){mc(e)&&a.delete(n)}function XS(){bh=!1,Ba!==null&&mc(Ba)&&(Ba=null),Fa!==null&&mc(Fa)&&(Fa=null),Ha!==null&&mc(Ha)&&(Ha=null),Io.forEach(nv),Bo.forEach(nv)}function gc(e,n){e.blockedOn===n&&(e.blockedOn=null,bh||(bh=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,XS)))}var _c=null;function iv(e){_c!==e&&(_c=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){_c===e&&(_c=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(Th(o||a)===null)continue;break}var h=q(a);h!==null&&(e.splice(n,3),n-=3,Ef(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function ps(e){function n(F){return gc(F,e)}Ba!==null&&gc(Ba,e),Fa!==null&&gc(Fa,e),Ha!==null&&gc(Ha,e),Io.forEach(n),Bo.forEach(n);for(var a=0;a<Ga.length;a++){var o=Ga[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Ga.length&&(a=Ga[0],a.blockedOn===null);)ev(a),a.blockedOn===null&&Ga.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],x=u[Sn]||null;if(typeof h=="function")x||iv(a);else if(x){var A=null;if(h&&h.hasAttribute("formAction")){if(u=h,x=h[Sn]||null)A=x.formAction;else if(Th(u)!==null)continue}else A=x.action;typeof A=="function"?a[o+1]=A:(a.splice(o,3),o-=3),iv(a)}}}function av(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(x){return u=x})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Ah(e){this._internalRoot=e}vc.prototype.render=Ah.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ni();Z_(a,o,e,n,null,null)},vc.prototype.unmount=Ah.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Z_(e.current,2,null,e,null,null),Jl(),n[ji]=null}};function vc(e){this._internalRoot=e}vc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zs();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Ga.length&&n!==0&&n<Ga[a].priority;a++);Ga.splice(a,0,e),a===0&&ev(e)}};var rv=t.version;if(rv!=="19.2.7")throw Error(r(527,rv,"19.2.7"));Q.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=m(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var jS={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yc.isDisabled&&yc.supportsFiber)try{xt=yc.inject(jS),wt=yc}catch{}}return Go.createRoot=function(e,n){if(!l(e))throw Error(r(299));var a=!1,o="",u=hg,h=dg,x=pg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(x=n.onRecoverableError)),n=q_(e,1,!1,null,null,a,o,null,u,h,x,av),e[ji]=n.current,oh(e),new Ah(n)},Go.hydrateRoot=function(e,n,a){if(!l(e))throw Error(r(299));var o=!1,u="",h=hg,x=dg,A=pg,F=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(x=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(F=a.formState)),n=q_(e,1,!0,n,a??null,o,u,F,h,x,A,av),n.context=Y_(null),a=n.current,o=ni(),o=er(o),u=Aa(o),u.callback=null,Ra(a,u,o),a=o,n.current.lanes=a,xn(n,a),Bi(n),e[ji]=n.current,oh(e),new vc(n)},Go.version="19.2.7",Go}var gv;function aM(){if(gv)return wh.exports;gv=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),wh.exports=iM(),wh.exports}var rM=aM();const sM=N0(rM);/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var sp=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,O0=/^[\\/]{2}/;function oM(s,t){return t+s.replace(/\\/g,"/")}var _v="popstate";function vv(s){return typeof s=="object"&&s!=null&&"pathname"in s&&"search"in s&&"hash"in s&&"state"in s&&"key"in s}function lM(s={}){function t(r,l){var m;let c=(m=l.state)==null?void 0:m.masked,{pathname:f,search:d,hash:p}=c||r.location;return md("",{pathname:f,search:d,hash:p},l.state&&l.state.usr||null,l.state&&l.state.key||"default",c?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function i(r,l){return typeof l=="string"?l:Jo(l)}return uM(t,i,null,s)}function Ze(s,t){if(s===!1||s===null||typeof s>"u")throw new Error(t)}function vi(s,t){if(!s){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function cM(){return Math.random().toString(36).substring(2,10)}function yv(s,t){return{usr:s.state,key:s.key,idx:t,masked:s.mask?{pathname:s.pathname,search:s.search,hash:s.hash}:void 0}}function md(s,t,i=null,r,l){return{pathname:typeof s=="string"?s:s.pathname,search:"",hash:"",...typeof t=="string"?Vs(t):t,state:i,key:t&&t.key||r||cM(),mask:l}}function Jo({pathname:s="/",search:t="",hash:i=""}){return t&&t!=="?"&&(s+=t.charAt(0)==="?"?t:"?"+t),i&&i!=="#"&&(s+=i.charAt(0)==="#"?i:"#"+i),s}function Vs(s){let t={};if(s){let i=s.indexOf("#");i>=0&&(t.hash=s.substring(i),s=s.substring(0,i));let r=s.indexOf("?");r>=0&&(t.search=s.substring(r),s=s.substring(0,r)),s&&(t.pathname=s)}return t}function uM(s,t,i,r={}){let{window:l=document.defaultView,v5Compat:c=!1}=r,f=l.history,d="POP",p=null,m=g();m==null&&(m=0,f.replaceState({...f.state,idx:m},""));function g(){return(f.state||{idx:null}).idx}function _(){d="POP";let S=g(),v=S==null?null:S-m;m=S,p&&p({action:d,location:T.location,delta:v})}function y(S,v){d="PUSH";let L=vv(S)?S:md(T.location,S,v);m=g()+1;let U=yv(L,m),w=T.createHref(L.mask||L);try{f.pushState(U,"",w)}catch(B){if(B instanceof DOMException&&B.name==="DataCloneError")throw B;l.location.assign(w)}c&&p&&p({action:d,location:T.location,delta:1})}function M(S,v){d="REPLACE";let L=vv(S)?S:md(T.location,S,v);m=g();let U=yv(L,m),w=T.createHref(L.mask||L);f.replaceState(U,"",w),c&&p&&p({action:d,location:T.location,delta:0})}function E(S){return fM(l,S)}let T={get action(){return d},get location(){return s(l,f)},listen(S){if(p)throw new Error("A history only accepts one active listener");return l.addEventListener(_v,_),p=S,()=>{l.removeEventListener(_v,_),p=null}},createHref(S){return t(l,S)},createURL:E,encodeLocation(S){let v=E(S);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:y,replace:M,go(S){return f.go(S)}};return T}function fM(s,t,i=!1){let r="http://localhost";s&&(r=s.location.origin!=="null"?s.location.origin:s.location.href),Ze(r,"No window.location.(origin|href) available to create URL");let l=typeof t=="string"?t:Jo(t);return l=l.replace(/ $/,"%20"),!i&&O0.test(l)&&(l=r+l),new URL(l,r)}function P0(s,t,i="/"){return hM(s,t,i,!1)}function hM(s,t,i,r,l){let c=typeof t=="string"?Vs(t):t,f=ya(c.pathname||"/",i);if(f==null)return null;let d=dM(s),p=null,m=TM(f);for(let g=0;p==null&&g<d.length;++g)p=EM(d[g],m,r);return p}function dM(s){let t=z0(s);return pM(t),t}function z0(s,t=[],i=[],r="",l=!1){let c=(f,d,p=l,m)=>{let g={relativePath:m===void 0?f.path||"":m,caseSensitive:f.caseSensitive===!0,childrenIndex:d,route:f};if(g.relativePath.startsWith("/")){if(!g.relativePath.startsWith(r)&&p)return;Ze(g.relativePath.startsWith(r),`Absolute route path "${g.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),g.relativePath=g.relativePath.slice(r.length)}let _=Ui([r,g.relativePath]),y=i.concat(g);f.children&&f.children.length>0&&(Ze(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${_}".`),z0(f.children,t,y,_,p)),!(f.path==null&&!f.index)&&t.push({path:_,score:SM(_,f.index),routesMeta:y.map((M,E)=>{let[T,S]=F0(M.relativePath,M.caseSensitive,E===y.length-1);return{...M,matcher:T,compiledParams:S}})})};return s.forEach((f,d)=>{var p;if(f.path===""||!((p=f.path)!=null&&p.includes("?")))c(f,d);else for(let m of I0(f.path))c(f,d,!0,m)}),t}function I0(s){let t=s.split("/");if(t.length===0)return[];let[i,...r]=t,l=i.endsWith("?"),c=i.replace(/\?$/,"");if(r.length===0)return l?[c,""]:[c];let f=I0(r.join("/")),d=[];return d.push(...f.map(p=>p===""?c:[c,p].join("/"))),l&&d.push(...f),d.map(p=>s.startsWith("/")&&p===""?"/":p)}function pM(s){s.sort((t,i)=>t.score!==i.score?i.score-t.score:MM(t.routesMeta.map(r=>r.childrenIndex),i.routesMeta.map(r=>r.childrenIndex)))}var mM=/^:[\w-]+$/,gM=3,_M=2,vM=1,yM=10,xM=-2,xv=s=>s==="*";function SM(s,t){let i=s.split("/"),r=i.length;return i.some(xv)&&(r+=xM),t&&(r+=_M),i.filter(l=>!xv(l)).reduce((l,c)=>l+(mM.test(c)?gM:c===""?vM:yM),r)}function MM(s,t){return s.length===t.length&&s.slice(0,-1).every((r,l)=>r===t[l])?s[s.length-1]-t[t.length-1]:0}function EM(s,t,i=!1){let{routesMeta:r}=s,l={},c="/",f=[];for(let d=0;d<r.length;++d){let p=r[d],m=d===r.length-1,g=c==="/"?t:t.slice(c.length)||"/",_={path:p.relativePath,caseSensitive:p.caseSensitive,end:m},y=p.matcher&&p.compiledParams?B0(_,g,p.matcher,p.compiledParams):eu(_,g),M=p.route;if(!y&&m&&i&&!r[r.length-1].route.index&&(y=eu({path:p.relativePath,caseSensitive:p.caseSensitive,end:!1},g)),!y)return null;Object.assign(l,y.params),f.push({params:l,pathname:Ui([c,y.pathname]),pathnameBase:RM(Ui([c,y.pathnameBase])),route:M}),y.pathnameBase!=="/"&&(c=Ui([c,y.pathnameBase]))}return f}function eu(s,t){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[i,r]=F0(s.path,s.caseSensitive,s.end);return B0(s,t,i,r)}function B0(s,t,i,r){let l=t.match(i);if(!l)return null;let c=l[0],f=c.replace(/(.)\/+$/,"$1"),d=l.slice(1);return{params:r.reduce((m,{paramName:g,isOptional:_},y)=>{if(g==="*"){let E=d[y]||"";f=c.slice(0,c.length-E.length).replace(/(.)\/+$/,"$1")}const M=d[y];return _&&!M?m[g]=void 0:m[g]=(M||"").replace(/%2F/g,"/"),m},{}),pathname:c,pathnameBase:f,pattern:s}}function F0(s,t=!1,i=!0){vi(s==="*"||!s.endsWith("*")||s.endsWith("/*"),`Route path "${s}" will be treated as if it were "${s.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/,"/*")}".`);let r=[],l="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,d,p,m,g)=>{if(r.push({paramName:d,isOptional:p!=null}),p){let _=g.charAt(m+f.length);return _&&_!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return s.endsWith("*")?(r.push({paramName:"*"}),l+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?l+="\\/*$":s!==""&&s!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,t?void 0:"i"),r]}function TM(s){try{return s.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return vi(!1,`The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),s}}function ya(s,t){if(t==="/")return s;if(!s.toLowerCase().startsWith(t.toLowerCase()))return null;let i=t.endsWith("/")?t.length-1:t.length,r=s.charAt(i);return r&&r!=="/"?null:s.slice(i)||"/"}function bM(s,t="/"){let{pathname:i,search:r="",hash:l=""}=typeof s=="string"?Vs(s):s,c;return i?(i=H0(i),i.startsWith("/")?c=Sv(i.substring(1),"/"):c=Sv(i,t)):c=t,{pathname:c,search:CM(r),hash:wM(l)}}function Sv(s,t){let i=nu(t).split("/");return s.split("/").forEach(l=>{l===".."?i.length>1&&i.pop():l!=="."&&i.push(l)}),i.length>1?i.join("/"):"/"}function Nh(s,t,i,r){return`Cannot include a '${s}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function AM(s){return s.filter((t,i)=>i===0||t.route.path&&t.route.path.length>0)}function op(s){let t=AM(s);return t.map((i,r)=>r===t.length-1?i.pathname:i.pathnameBase)}function cu(s,t,i,r=!1){let l;typeof s=="string"?l=Vs(s):(l={...s},Ze(!l.pathname||!l.pathname.includes("?"),Nh("?","pathname","search",l)),Ze(!l.pathname||!l.pathname.includes("#"),Nh("#","pathname","hash",l)),Ze(!l.search||!l.search.includes("#"),Nh("#","search","hash",l)));let c=s===""||l.pathname==="",f=c?"/":l.pathname,d;if(f==null)d=i;else{let _=t.length-1;if(!r&&f.startsWith("..")){let y=f.split("/");for(;y[0]==="..";)y.shift(),_-=1;l.pathname=y.join("/")}d=_>=0?t[_]:"/"}let p=bM(l,d),m=f&&f!=="/"&&f.endsWith("/"),g=(c||f===".")&&i.endsWith("/");return!p.pathname.endsWith("/")&&(m||g)&&(p.pathname+="/"),p}var H0=s=>s.replace(/[\\/]{2,}/g,"/"),Ui=s=>H0(s.join("/")),nu=s=>s.replace(/\/+$/,""),RM=s=>nu(s).replace(/^\/*/,"/"),CM=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,wM=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s,DM=class{constructor(s,t,i,r=!1){this.status=s,this.statusText=t||"",this.internal=r,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}};function UM(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}function LM(s){let t=s.map(i=>i.route.path).filter(Boolean);return Ui(t)||"/"}var G0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function V0(s,t){let i=s;if(typeof i!="string"||!sp.test(i))return{absoluteURL:void 0,isExternal:!1,to:i};let r=i,l=!1;if(G0)try{let c=new URL(window.location.href),f=O0.test(i)?new URL(oM(i,c.protocol)):new URL(i),d=ya(f.pathname,t);f.origin===c.origin&&d!=null?i=d+f.search+f.hash:l=!0}catch{vi(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:l,to:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var k0=["POST","PUT","PATCH","DELETE"];new Set(k0);var NM=["GET",...k0];new Set(NM);var OM=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function PM(s){try{return OM.includes(new URL(s).protocol)}catch{return!1}}var ks=et.createContext(null);ks.displayName="DataRouter";var uu=et.createContext(null);uu.displayName="DataRouterState";var X0=et.createContext(!1);function zM(){return et.useContext(X0)}var j0=et.createContext({isTransitioning:!1});j0.displayName="ViewTransition";var IM=et.createContext(new Map);IM.displayName="Fetchers";var BM=et.createContext(null);BM.displayName="Await";var ri=et.createContext(null);ri.displayName="Navigation";var al=et.createContext(null);al.displayName="Location";var Ni=et.createContext({outlet:null,matches:[],isDataRoute:!1});Ni.displayName="Route";var lp=et.createContext(null);lp.displayName="RouteError";var W0="REACT_ROUTER_ERROR",FM="REDIRECT",HM="ROUTE_ERROR_RESPONSE";function GM(s){if(s.startsWith(`${W0}:${FM}:{`))try{let t=JSON.parse(s.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function VM(s){if(s.startsWith(`${W0}:${HM}:{`))try{let t=JSON.parse(s.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new DM(t.status,t.statusText,t.data)}catch{}}function kM(s,{relative:t}={}){Ze(Xs(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:r}=et.useContext(ri),{hash:l,pathname:c,search:f}=rl(s,{relative:t}),d=c;return i!=="/"&&(d=c==="/"?i:Ui([i,c])),r.createHref({pathname:d,search:f,hash:l})}function Xs(){return et.useContext(al)!=null}function si(){return Ze(Xs(),"useLocation() may be used only in the context of a <Router> component."),et.useContext(al).location}var q0="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Y0(s){et.useContext(ri).static||et.useLayoutEffect(s)}function fu(){let{isDataRoute:s}=et.useContext(Ni);return s?aE():XM()}function XM(){Ze(Xs(),"useNavigate() may be used only in the context of a <Router> component.");let s=et.useContext(ks),{basename:t,navigator:i}=et.useContext(ri),{matches:r}=et.useContext(Ni),{pathname:l}=si(),c=JSON.stringify(op(r)),f=et.useRef(!1);return Y0(()=>{f.current=!0}),et.useCallback((p,m={})=>{if(vi(f.current,q0),!f.current)return;if(typeof p=="number"){i.go(p);return}let g=cu(p,JSON.parse(c),l,m.relative==="path");s==null&&t!=="/"&&(g.pathname=g.pathname==="/"?t:Ui([t,g.pathname])),(m.replace?i.replace:i.push)(g,m.state,m)},[t,i,c,l,s])}var jM=et.createContext(null);function WM(s){let t=et.useContext(Ni).outlet;return et.useMemo(()=>t&&et.createElement(jM.Provider,{value:s},t),[t,s])}function rl(s,{relative:t}={}){let{matches:i}=et.useContext(Ni),{pathname:r}=si(),l=JSON.stringify(op(i));return et.useMemo(()=>cu(s,JSON.parse(l),r,t==="path"),[s,l,r,t])}function qM(s,t){return Z0(s,t)}function Z0(s,t,i){var S;Ze(Xs(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=et.useContext(ri),{matches:l}=et.useContext(Ni),c=l[l.length-1],f=c?c.params:{},d=c?c.pathname:"/",p=c?c.pathnameBase:"/",m=c&&c.route;{let v=m&&m.path||"";Q0(d,!m||v.endsWith("*")||v.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${v}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${v}"> to <Route path="${v==="/"?"*":`${v}/*`}">.`)}let g=si(),_;if(t){let v=typeof t=="string"?Vs(t):t;Ze(p==="/"||((S=v.pathname)==null?void 0:S.startsWith(p)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${v.pathname}" was given in the \`location\` prop.`),_=v}else _=g;let y=_.pathname||"/",M=y;if(p!=="/"){let v=p.replace(/^\//,"").split("/");M="/"+y.replace(/^\//,"").split("/").slice(v.length).join("/")}let E=i&&i.state.matches.length?i.state.matches.map(v=>Object.assign(v,{route:i.manifest[v.route.id]||v.route})):P0(s,{pathname:M});vi(m||E!=null,`No routes matched location "${_.pathname}${_.search}${_.hash}" `),vi(E==null||E[E.length-1].route.element!==void 0||E[E.length-1].route.Component!==void 0||E[E.length-1].route.lazy!==void 0,`Matched leaf route at location "${_.pathname}${_.search}${_.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let T=JM(E&&E.map(v=>Object.assign({},v,{params:Object.assign({},f,v.params),pathname:Ui([p,r.encodeLocation?r.encodeLocation(v.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?p:Ui([p,r.encodeLocation?r.encodeLocation(v.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:v.pathnameBase])})),l,i);return t&&T?et.createElement(al.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,..._},navigationType:"POP"}},T):T}function YM(){let s=iE(),t=UM(s)?`${s.status} ${s.statusText}`:s instanceof Error?s.message:JSON.stringify(s),i=s instanceof Error?s.stack:null,r="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:r},c={padding:"2px 4px",backgroundColor:r},f=null;return console.error("Error handled by React Router default ErrorBoundary:",s),f=et.createElement(et.Fragment,null,et.createElement("p",null,"💿 Hey developer 👋"),et.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",et.createElement("code",{style:c},"ErrorBoundary")," or"," ",et.createElement("code",{style:c},"errorElement")," prop on your route.")),et.createElement(et.Fragment,null,et.createElement("h2",null,"Unexpected Application Error!"),et.createElement("h3",{style:{fontStyle:"italic"}},t),i?et.createElement("pre",{style:l},i):null,f)}var ZM=et.createElement(YM,null),K0=class extends et.Component{constructor(s){super(s),this.state={location:s.location,revalidation:s.revalidation,error:s.error}}static getDerivedStateFromError(s){return{error:s}}static getDerivedStateFromProps(s,t){return t.location!==s.location||t.revalidation!=="idle"&&s.revalidation==="idle"?{error:s.error,location:s.location,revalidation:s.revalidation}:{error:s.error!==void 0?s.error:t.error,location:t.location,revalidation:s.revalidation||t.revalidation}}componentDidCatch(s,t){this.props.onError?this.props.onError(s,t):console.error("React Router caught the following error during render",s)}render(){let s=this.state.error;if(this.context&&typeof s=="object"&&s&&"digest"in s&&typeof s.digest=="string"){const i=VM(s.digest);i&&(s=i)}let t=s!==void 0?et.createElement(Ni.Provider,{value:this.props.routeContext},et.createElement(lp.Provider,{value:s,children:this.props.component})):this.props.children;return this.context?et.createElement(KM,{error:s},t):t}};K0.contextType=X0;var Oh=new WeakMap;function KM({children:s,error:t}){let{basename:i}=et.useContext(ri);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=GM(t.digest);if(r){let l=Oh.get(t);if(l)throw l;let c=V0(r.location,i),f=c.absoluteURL||c.to;if(PM(f))throw new Error("Invalid redirect location");if(G0&&!Oh.get(t))if(c.isExternal||r.reloadDocument)window.location.href=f;else{const d=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(c.to,{replace:r.replace}));throw Oh.set(t,d),d}return et.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f}`})}}return s}function QM({routeContext:s,match:t,children:i}){let r=et.useContext(ks);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),et.createElement(Ni.Provider,{value:s},i)}function JM(s,t=[],i){let r=i==null?void 0:i.state;if(s==null){if(!r)return null;if(r.errors)s=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)s=r.matches;else return null}let l=s,c=r==null?void 0:r.errors;if(c!=null){let g=l.findIndex(_=>_.route.id&&(c==null?void 0:c[_.route.id])!==void 0);Ze(g>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`),l=l.slice(0,Math.min(l.length,g+1))}let f=!1,d=-1;if(i&&r){f=r.renderFallback;for(let g=0;g<l.length;g++){let _=l[g];if((_.route.HydrateFallback||_.route.hydrateFallbackElement)&&(d=g),_.route.id){let{loaderData:y,errors:M}=r,E=_.route.loader&&!y.hasOwnProperty(_.route.id)&&(!M||M[_.route.id]===void 0);if(_.route.lazy||E){i.isStatic&&(f=!0),d>=0?l=l.slice(0,d+1):l=[l[0]];break}}}}let p=i==null?void 0:i.onError,m=r&&p?(g,_)=>{var y,M;p(g,{location:r.location,params:((M=(y=r.matches)==null?void 0:y[0])==null?void 0:M.params)??{},pattern:LM(r.matches),errorInfo:_})}:void 0;return l.reduceRight((g,_,y)=>{let M,E=!1,T=null,S=null;r&&(M=c&&_.route.id?c[_.route.id]:void 0,T=_.route.errorElement||ZM,f&&(d<0&&y===0?(Q0("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),E=!0,S=null):d===y&&(E=!0,S=_.route.hydrateFallbackElement||null)));let v=t.concat(l.slice(0,y+1)),L=()=>{let U;return M?U=T:E?U=S:_.route.Component?U=et.createElement(_.route.Component,null):_.route.element?U=_.route.element:U=g,et.createElement(QM,{match:_,routeContext:{outlet:g,matches:v,isDataRoute:r!=null},children:U})};return r&&(_.route.ErrorBoundary||_.route.errorElement||y===0)?et.createElement(K0,{location:r.location,revalidation:r.revalidation,component:T,error:M,children:L(),routeContext:{outlet:null,matches:v,isDataRoute:!0},onError:m}):L()},null)}function cp(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function $M(s){let t=et.useContext(ks);return Ze(t,cp(s)),t}function tE(s){let t=et.useContext(uu);return Ze(t,cp(s)),t}function eE(s){let t=et.useContext(Ni);return Ze(t,cp(s)),t}function up(s){let t=eE(s),i=t.matches[t.matches.length-1];return Ze(i.route.id,`${s} can only be used on routes that contain a unique "id"`),i.route.id}function nE(){return up("useRouteId")}function iE(){var r;let s=et.useContext(lp),t=tE("useRouteError"),i=up("useRouteError");return s!==void 0?s:(r=t.errors)==null?void 0:r[i]}function aE(){let{router:s}=$M("useNavigate"),t=up("useNavigate"),i=et.useRef(!1);return Y0(()=>{i.current=!0}),et.useCallback(async(l,c={})=>{vi(i.current,q0),i.current&&(typeof l=="number"?await s.navigate(l):await s.navigate(l,{fromRouteId:t,...c}))},[s,t])}var Mv={};function Q0(s,t,i){!t&&!Mv[s]&&(Mv[s]=!0,vi(!1,i))}et.memo(rE);function rE({routes:s,manifest:t,future:i,state:r,isStatic:l,onError:c}){return Z0(s,void 0,{manifest:t,state:r,isStatic:l,onError:c})}function sE({to:s,replace:t,state:i,relative:r}){Ze(Xs(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=et.useContext(ri);vi(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:c}=et.useContext(Ni),{pathname:f}=si(),d=fu(),p=cu(s,op(c),f,r==="path"),m=JSON.stringify(p);return et.useEffect(()=>{d(JSON.parse(m),{replace:t,state:i,relative:r})},[d,m,r,t,i]),null}function oE(s){return WM(s.context)}function Ar(s){Ze(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function lE({basename:s="/",children:t=null,location:i,navigationType:r="POP",navigator:l,static:c=!1,useTransitions:f}){Ze(!Xs(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=s.replace(/^\/*/,"/"),p=et.useMemo(()=>({basename:d,navigator:l,static:c,useTransitions:f,future:{}}),[d,l,c,f]);typeof i=="string"&&(i=Vs(i));let{pathname:m="/",search:g="",hash:_="",state:y=null,key:M="default",mask:E}=i,T=et.useMemo(()=>{let S=ya(m,d);return S==null?null:{location:{pathname:S,search:g,hash:_,state:y,key:M,mask:E},navigationType:r}},[d,m,g,_,y,M,r,E]);return vi(T!=null,`<Router basename="${d}"> is not able to match the URL "${m}${g}${_}" because it does not start with the basename, so the <Router> won't render anything.`),T==null?null:et.createElement(ri.Provider,{value:p},et.createElement(al.Provider,{children:t,value:T}))}function cE({children:s,location:t}){return qM(gd(s),t)}function gd(s,t=[]){let i=[];return et.Children.forEach(s,(r,l)=>{if(!et.isValidElement(r))return;let c=[...t,l];if(r.type===et.Fragment){i.push.apply(i,gd(r.props.children,c));return}Ze(r.type===Ar,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ze(!r.props.index||!r.props.children,"An index route cannot have child routes.");let f={id:r.props.id||c.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(f.children=gd(r.props.children,c)),i.push(f)}),i}var jc="get",Wc="application/x-www-form-urlencoded";function hu(s){return typeof HTMLElement<"u"&&s instanceof HTMLElement}function uE(s){return hu(s)&&s.tagName.toLowerCase()==="button"}function fE(s){return hu(s)&&s.tagName.toLowerCase()==="form"}function hE(s){return hu(s)&&s.tagName.toLowerCase()==="input"}function dE(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function pE(s,t){return s.button===0&&(!t||t==="_self")&&!dE(s)}function _d(s=""){return new URLSearchParams(typeof s=="string"||Array.isArray(s)||s instanceof URLSearchParams?s:Object.keys(s).reduce((t,i)=>{let r=s[i];return t.concat(Array.isArray(r)?r.map(l=>[i,l]):[[i,r]])},[]))}function mE(s,t){let i=_d(s);return t&&t.forEach((r,l)=>{i.has(l)||t.getAll(l).forEach(c=>{i.append(l,c)})}),i}var xc=null;function gE(){if(xc===null)try{new FormData(document.createElement("form"),0),xc=!1}catch{xc=!0}return xc}var _E=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ph(s){return s!=null&&!_E.has(s)?(vi(!1,`"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Wc}"`),null):s}function vE(s,t){let i,r,l,c,f;if(fE(s)){let d=s.getAttribute("action");r=d?ya(d,t):null,i=s.getAttribute("method")||jc,l=Ph(s.getAttribute("enctype"))||Wc,c=new FormData(s)}else if(uE(s)||hE(s)&&(s.type==="submit"||s.type==="image")){let d=s.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let p=s.getAttribute("formaction")||d.getAttribute("action");if(r=p?ya(p,t):null,i=s.getAttribute("formmethod")||d.getAttribute("method")||jc,l=Ph(s.getAttribute("formenctype"))||Ph(d.getAttribute("enctype"))||Wc,c=new FormData(d,s),!gE()){let{name:m,type:g,value:_}=s;if(g==="image"){let y=m?`${m}.`:"";c.append(`${y}x`,"0"),c.append(`${y}y`,"0")}else m&&c.append(m,_)}}else{if(hu(s))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=jc,r=null,l=Wc,f=s}return c&&l==="text/plain"&&(f=c,c=void 0),{action:r,method:i.toLowerCase(),encType:l,formData:c,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function fp(s,t){if(s===!1||s===null||typeof s>"u")throw new Error(t)}function J0(s,t,i,r){let l=typeof s=="string"?new URL(s,typeof window>"u"?"server://singlefetch/":window.location.origin):s;return i?l.pathname.endsWith("/")?l.pathname=`${l.pathname}_.${r}`:l.pathname=`${l.pathname}.${r}`:l.pathname==="/"?l.pathname=`_root.${r}`:t&&ya(l.pathname,t)==="/"?l.pathname=`${nu(t)}/_root.${r}`:l.pathname=`${nu(l.pathname)}.${r}`,l}async function yE(s,t){if(s.id in t)return t[s.id];try{let i=await import(s.module);return t[s.id]=i,i}catch(i){return console.error(`Error loading route module \`${s.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function xE(s){return s==null?!1:s.href==null?s.rel==="preload"&&typeof s.imageSrcSet=="string"&&typeof s.imageSizes=="string":typeof s.rel=="string"&&typeof s.href=="string"}async function SE(s,t,i){let r=await Promise.all(s.map(async l=>{let c=t.routes[l.route.id];if(c){let f=await yE(c,i);return f.links?f.links():[]}return[]}));return bE(r.flat(1).filter(xE).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function Ev(s,t,i,r,l,c){let f=(p,m)=>i[m]?p.route.id!==i[m].route.id:!0,d=(p,m)=>{var g;return i[m].pathname!==p.pathname||((g=i[m].route.path)==null?void 0:g.endsWith("*"))&&i[m].params["*"]!==p.params["*"]};return c==="assets"?t.filter((p,m)=>f(p,m)||d(p,m)):c==="data"?t.filter((p,m)=>{var _;let g=r.routes[p.route.id];if(!g||!g.hasLoader)return!1;if(f(p,m)||d(p,m))return!0;if(p.route.shouldRevalidate){let y=p.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:((_=i[0])==null?void 0:_.params)||{},nextUrl:new URL(s,window.origin),nextParams:p.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function ME(s,t,{includeHydrateFallback:i}={}){return EE(s.map(r=>{let l=t.routes[r.route.id];if(!l)return[];let c=[l.module];return l.clientActionModule&&(c=c.concat(l.clientActionModule)),l.clientLoaderModule&&(c=c.concat(l.clientLoaderModule)),i&&l.hydrateFallbackModule&&(c=c.concat(l.hydrateFallbackModule)),l.imports&&(c=c.concat(l.imports)),c}).flat(1))}function EE(s){return[...new Set(s)]}function TE(s){let t={},i=Object.keys(s).sort();for(let r of i)t[r]=s[r];return t}function bE(s,t){let i=new Set;return new Set(t),s.reduce((r,l)=>{let c=JSON.stringify(TE(l));return i.has(c)||(i.add(c),r.push({key:c,link:l})),r},[])}function hp(){let s=et.useContext(ks);return fp(s,"You must render this element inside a <DataRouterContext.Provider> element"),s}function AE(){let s=et.useContext(uu);return fp(s,"You must render this element inside a <DataRouterStateContext.Provider> element"),s}var dp=et.createContext(void 0);dp.displayName="FrameworkContext";function du(){let s=et.useContext(dp);return fp(s,"You must render this element inside a <HydratedRouter> element"),s}function RE(s,t){let i=et.useContext(dp),[r,l]=et.useState(!1),[c,f]=et.useState(!1),{onFocus:d,onBlur:p,onMouseEnter:m,onMouseLeave:g,onTouchStart:_}=t,y=et.useRef(null);et.useEffect(()=>{if(s==="render"&&f(!0),s==="viewport"){let T=v=>{v.forEach(L=>{f(L.isIntersecting)})},S=new IntersectionObserver(T,{threshold:.5});return y.current&&S.observe(y.current),()=>{S.disconnect()}}},[s]),et.useEffect(()=>{if(r){let T=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(T)}}},[r]);let M=()=>{l(!0)},E=()=>{l(!1),f(!1)};return i?s!=="intent"?[c,y,{}]:[c,y,{onFocus:Vo(d,M),onBlur:Vo(p,E),onMouseEnter:Vo(m,M),onMouseLeave:Vo(g,E),onTouchStart:Vo(_,M)}]:[!1,y,{}]}function Vo(s,t){return i=>{s&&s(i),i.defaultPrevented||t(i)}}function CE({page:s,...t}){let i=zM(),{nonce:r}=du(),{router:l}=hp(),c=et.useMemo(()=>P0(l.routes,s,l.basename),[l.routes,s,l.basename]);return c?(t.nonce==null&&r&&(t={...t,nonce:r}),i?et.createElement(DE,{page:s,matches:c,...t}):et.createElement(UE,{page:s,matches:c,...t})):null}function wE(s){let{manifest:t,routeModules:i}=du(),[r,l]=et.useState([]);return et.useEffect(()=>{let c=!1;return SE(s,t,i).then(f=>{c||l(f)}),()=>{c=!0}},[s,t,i]),r}function DE({page:s,matches:t,...i}){let r=si(),{future:l}=du(),{basename:c}=hp(),f=et.useMemo(()=>{if(s===r.pathname+r.search+r.hash)return[];let d=J0(s,c,l.v8_trailingSlashAwareDataRequests,"rsc"),p=!1,m=[];for(let g of t)typeof g.route.shouldRevalidate=="function"?p=!0:m.push(g.route.id);return p&&m.length>0&&d.searchParams.set("_routes",m.join(",")),[d.pathname+d.search]},[c,l.v8_trailingSlashAwareDataRequests,s,r,t]);return et.createElement(et.Fragment,null,f.map(d=>et.createElement("link",{key:d,rel:"prefetch",as:"fetch",href:d,...i})))}function UE({page:s,matches:t,...i}){let r=si(),{future:l,manifest:c,routeModules:f}=du(),{basename:d}=hp(),{loaderData:p,matches:m}=AE(),g=et.useMemo(()=>Ev(s,t,m,c,r,"data"),[s,t,m,c,r]),_=et.useMemo(()=>Ev(s,t,m,c,r,"assets"),[s,t,m,c,r]),y=et.useMemo(()=>{if(s===r.pathname+r.search+r.hash)return[];let T=new Set,S=!1;if(t.forEach(L=>{var w;let U=c.routes[L.route.id];!U||!U.hasLoader||(!g.some(B=>B.route.id===L.route.id)&&L.route.id in p&&((w=f[L.route.id])!=null&&w.shouldRevalidate)||U.hasClientLoader?S=!0:T.add(L.route.id))}),T.size===0)return[];let v=J0(s,d,l.v8_trailingSlashAwareDataRequests,"data");return S&&T.size>0&&v.searchParams.set("_routes",t.filter(L=>T.has(L.route.id)).map(L=>L.route.id).join(",")),[v.pathname+v.search]},[d,l.v8_trailingSlashAwareDataRequests,p,r,c,g,t,s,f]),M=et.useMemo(()=>ME(_,c),[_,c]),E=wE(_);return et.createElement(et.Fragment,null,y.map(T=>et.createElement("link",{key:T,rel:"prefetch",as:"fetch",href:T,...i})),M.map(T=>et.createElement("link",{key:T,rel:"modulepreload",href:T,...i})),E.map(({key:T,link:S})=>et.createElement("link",{key:T,nonce:i.nonce,...S,crossOrigin:S.crossOrigin??i.crossOrigin})))}function LE(...s){return t=>{s.forEach(i=>{typeof i=="function"?i(t):i!=null&&(i.current=t)})}}var NE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{NE&&(window.__reactRouterVersion="7.18.0")}catch{}function OE({basename:s,children:t,useTransitions:i,window:r}){let l=et.useRef();l.current==null&&(l.current=lM({window:r,v5Compat:!0}));let c=l.current,[f,d]=et.useState({action:c.action,location:c.location}),p=et.useCallback(m=>{i===!1?d(m):et.startTransition(()=>d(m))},[i]);return et.useLayoutEffect(()=>c.listen(p),[c,p]),et.createElement(lE,{basename:s,children:t,location:f.location,navigationType:f.action,navigator:c,useTransitions:i})}var pu=et.forwardRef(function({onClick:t,discover:i="render",prefetch:r="none",relative:l,reloadDocument:c,replace:f,mask:d,state:p,target:m,to:g,preventScrollReset:_,viewTransition:y,defaultShouldRevalidate:M,...E},T){let{basename:S,navigator:v,useTransitions:L}=et.useContext(ri),U=typeof g=="string"&&sp.test(g),w=V0(g,S);g=w.to;let B=kM(g,{relative:l}),H=si(),N=null;if(d){let ut=cu(d,[],H.mask?H.mask.pathname:"/",!0);S!=="/"&&(ut.pathname=ut.pathname==="/"?S:Ui([S,ut.pathname])),N=v.createHref(ut)}let[X,D,C]=RE(r,E),V=IE(g,{replace:f,mask:d,state:p,target:m,preventScrollReset:_,relative:l,viewTransition:y,defaultShouldRevalidate:M,useTransitions:L});function rt(ut){t&&t(ut),ut.defaultPrevented||V(ut)}let nt=!(w.isExternal||c),ft=et.createElement("a",{...E,...C,href:(nt?N:void 0)||w.absoluteURL||B,onClick:nt?rt:t,ref:LE(T,D),target:m,"data-discover":!U&&i==="render"?"true":void 0});return X&&!U?et.createElement(et.Fragment,null,ft,et.createElement(CE,{page:B})):ft});pu.displayName="Link";var $o=et.forwardRef(function({"aria-current":t="page",caseSensitive:i=!1,className:r="",end:l=!1,style:c,to:f,viewTransition:d,children:p,...m},g){let _=rl(f,{relative:m.relative}),y=si(),M=et.useContext(uu),{navigator:E,basename:T}=et.useContext(ri),S=M!=null&&kE(_)&&d===!0,v=E.encodeLocation?E.encodeLocation(_).pathname:_.pathname,L=y.pathname,U=M&&M.navigation&&M.navigation.location?M.navigation.location.pathname:null;i||(L=L.toLowerCase(),U=U?U.toLowerCase():null,v=v.toLowerCase()),U&&T&&(U=ya(U,T)||U);const w=v!=="/"&&v.endsWith("/")?v.length-1:v.length;let B=L===v||!l&&L.startsWith(v)&&L.charAt(w)==="/",H=U!=null&&(U===v||!l&&U.startsWith(v)&&U.charAt(v.length)==="/"),N={isActive:B,isPending:H,isTransitioning:S},X=B?t:void 0,D;typeof r=="function"?D=r(N):D=[r,B?"active":null,H?"pending":null,S?"transitioning":null].filter(Boolean).join(" ");let C=typeof c=="function"?c(N):c;return et.createElement(pu,{...m,"aria-current":X,className:D,ref:g,style:C,to:f,viewTransition:d},typeof p=="function"?p(N):p)});$o.displayName="NavLink";var PE=et.forwardRef(({discover:s="render",fetcherKey:t,navigate:i,reloadDocument:r,replace:l,state:c,method:f=jc,action:d,onSubmit:p,relative:m,preventScrollReset:g,viewTransition:_,defaultShouldRevalidate:y,...M},E)=>{let{useTransitions:T}=et.useContext(ri),S=GE(),v=VE(d,{relative:m}),L=f.toLowerCase()==="get"?"get":"post",U=typeof d=="string"&&sp.test(d),w=B=>{if(p&&p(B),B.defaultPrevented)return;B.preventDefault();let H=B.nativeEvent.submitter,N=(H==null?void 0:H.getAttribute("formmethod"))||f,X=()=>S(H||B.currentTarget,{fetcherKey:t,method:N,navigate:i,replace:l,state:c,relative:m,preventScrollReset:g,viewTransition:_,defaultShouldRevalidate:y});T&&i!==!1?et.startTransition(()=>X()):X()};return et.createElement("form",{ref:E,method:L,action:v,onSubmit:r?p:w,...M,"data-discover":!U&&s==="render"?"true":void 0})});PE.displayName="Form";function zE(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function $0(s){let t=et.useContext(ks);return Ze(t,zE(s)),t}function IE(s,{target:t,replace:i,mask:r,state:l,preventScrollReset:c,relative:f,viewTransition:d,defaultShouldRevalidate:p,useTransitions:m}={}){let g=fu(),_=si(),y=rl(s,{relative:f});return et.useCallback(M=>{if(pE(M,t)){M.preventDefault();let E=i!==void 0?i:Jo(_)===Jo(y),T=()=>g(s,{replace:E,mask:r,state:l,preventScrollReset:c,relative:f,viewTransition:d,defaultShouldRevalidate:p});m?et.startTransition(()=>T()):T()}},[_,g,y,i,r,l,t,s,c,f,d,p,m])}function BE(s){vi(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=et.useRef(_d(s)),i=et.useRef(!1),r=si(),l=et.useMemo(()=>mE(r.search,i.current?null:t.current),[r.search]),c=fu(),f=et.useCallback((d,p)=>{const m=_d(typeof d=="function"?d(new URLSearchParams(l)):d);i.current=!0,c("?"+m,p)},[c,l]);return[l,f]}var FE=0,HE=()=>`__${String(++FE)}__`;function GE(){let{router:s}=$0("useSubmit"),{basename:t}=et.useContext(ri),i=nE(),r=s.fetch,l=s.navigate;return et.useCallback(async(c,f={})=>{let{action:d,method:p,encType:m,formData:g,body:_}=vE(c,t);if(f.navigate===!1){let y=f.fetcherKey||HE();await r(y,i,f.action||d,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:g,body:_,formMethod:f.method||p,formEncType:f.encType||m,flushSync:f.flushSync})}else await l(f.action||d,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:g,body:_,formMethod:f.method||p,formEncType:f.encType||m,replace:f.replace,state:f.state,fromRouteId:i,flushSync:f.flushSync,viewTransition:f.viewTransition})},[r,l,t,i])}function VE(s,{relative:t}={}){let{basename:i}=et.useContext(ri),r=et.useContext(Ni);Ze(r,"useFormAction must be used inside a RouteContext");let[l]=r.matches.slice(-1),c={...rl(s||".",{relative:t})},f=si();if(s==null){c.search=f.search;let d=new URLSearchParams(c.search),p=d.getAll("index");if(p.some(g=>g==="")){d.delete("index"),p.filter(_=>_).forEach(_=>d.append("index",_));let g=d.toString();c.search=g?`?${g}`:""}}return(!s||s===".")&&l.route.index&&(c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(c.pathname=c.pathname==="/"?i:Ui([i,c.pathname])),Jo(c)}function kE(s,{relative:t}={}){let i=et.useContext(j0);Ze(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=$0("useViewTransitionState"),l=rl(s,{relative:t});if(!i.isTransitioning)return!1;let c=ya(i.currentLocation.pathname,r)||i.currentLocation.pathname,f=ya(i.nextLocation.pathname,r)||i.nextLocation.pathname;return eu(l.pathname,f)!=null||eu(l.pathname,c)!=null}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XE=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ty=(...s)=>s.filter((t,i,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===i).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var jE={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WE=et.forwardRef(({color:s="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:l="",children:c,iconNode:f,...d},p)=>et.createElement("svg",{ref:p,...jE,width:t,height:t,stroke:s,strokeWidth:r?Number(i)*24/Number(t):i,className:ty("lucide",l),...d},[...f.map(([m,g])=>et.createElement(m,g)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zn=(s,t)=>{const i=et.forwardRef(({className:r,...l},c)=>et.createElement(WE,{ref:c,iconNode:t,className:ty(`lucide-${XE(s)}`,r),...l}));return i.displayName=`${s}`,i};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qE=zn("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tv=zn("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YE=zn("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZE=zn("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KE=zn("CloudUpload",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ey=zn("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QE=zn("FileArchive",[["path",{d:"M10 12v-1",key:"v7bkov"}],["path",{d:"M10 18v-2",key:"1cjy8d"}],["path",{d:"M10 7V6",key:"dljcrl"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01",key:"gkbcor"}],["circle",{cx:"10",cy:"20",r:"2",key:"1xzdoj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JE=zn("FileDown",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny=zn("GitCompare",[["circle",{cx:"18",cy:"18",r:"3",key:"1xkwt0"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7",key:"1yeb86"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9",key:"19pyzm"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=zn("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $E=zn("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy=zn("Network",[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=zn("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tT=zn("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eT=zn("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),nT="/api".replace(/\/$/,""),Ls="demo-user",iT={accountAgeDays:1240,topics:[{name:"tech",postVolume:82,sentiment:.6},{name:"career",postVolume:44,sentiment:.3},{name:"social",postVolume:31,sentiment:-.1}]};function aT(s){if(!s||typeof s!="object")return null;const t=s,i=typeof t.name=="string"?t.name.trim():"";if(!i)return null;const r=typeof t.postVolume=="number"?t.postVolume:typeof t.weight=="number"?t.weight:0,l=typeof t.sentiment=="number"?t.sentiment:0;return{name:i,postVolume:r,sentiment:l}}function rT(s){if(!s||typeof s!="object")return null;const t=s,i=typeof t.accountAgeDays=="number"?t.accountAgeDays:0,r=Array.isArray(t.topics)?t.topics.map(aT).filter(l=>l!==null):[];return r.length?{accountAgeDays:i,topics:r}:null}function sT(s){const t=rT(s);return t?{data:t,source:"analysis"}:{data:iT,source:"sample"}}function oT(s){return"Demo User"}function ws(s){return s==null||Number.isNaN(s)?"—":`${s>0?"+":""}${s.toFixed(2)}`}function lT(s){return!s||s<=0?"—":`${Math.min(100,Math.round(s*4.5))}%`}const cT=[{to:"/",label:"Dashboard",end:!0},{to:"/insights",label:"Insights"},{to:"/share",label:"Share"}];function uT(){return I.jsxs("header",{className:"topbar",children:[I.jsxs($o,{className:"brand",to:"/","aria-label":"Coralytics home",children:[I.jsx("span",{className:"brand-mark","aria-hidden":"true"}),I.jsx("span",{children:"Coralytics"})]}),I.jsx("nav",{className:"main-nav","aria-label":"Main navigation",children:cT.map(s=>I.jsx($o,{to:s.to,end:s.end,className:({isActive:t})=>t?"active":void 0,children:s.label},s.to))}),I.jsxs("div",{className:"account-actions",children:[I.jsxs("span",{className:"welcome",children:["Welcome, ",oT()]}),I.jsx("button",{className:"icon-button",type:"button","aria-label":"User profile",children:I.jsx(ZE,{size:22})}),I.jsx("button",{className:"icon-button",type:"button","aria-label":"Settings",children:I.jsx(tT,{size:21})}),I.jsx("button",{className:"icon-button menu-button",type:"button","aria-label":"Open menu",children:I.jsx($E,{size:22})})]})]})}class Av extends Error{constructor(i,r){super(i);sv(this,"status");this.name="ApiError",this.status=r}}async function mu(s,t){var r;let i;try{i=await fetch(`${nT}${s}`,{...t,headers:{Accept:"application/json",...t==null?void 0:t.headers}})}catch{throw new Av("Cannot reach the API. Start the backend and Firestore emulator (see README).",0)}if(!i.ok){let l=i.statusText;try{const c=await i.json();typeof c.detail=="string"?l=c.detail:Array.isArray(c.detail)&&((r=c.detail[0])!=null&&r.msg)&&(l=c.detail[0].msg)}catch{}throw i.status>=500&&l==="Internal Server Error"&&(l="API server error. Check backend logs and that FIRESTORE_EMULATOR_HOST is set for local dev."),new Av(l||`Request failed (${i.status})`,i.status)}return i.json()}function fT(s){return mu(`/analyses/${encodeURIComponent(s)}`)}function hT(s){return mu(`/uploads/${encodeURIComponent(s)}`)}function dT(s,t,i){const r=new FormData;return r.append("user_id",s),r.append("file",t),mu("/uploads",{method:"POST",body:r})}function pT(s){return mu("/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:s.user_id,upload_ids:s.upload_ids,posts:[],persist:s.persist??!0})})}function ay(s,t){return s instanceof Error?s.message==="Failed to fetch"?"Cannot reach the API. Start the backend (uvicorn) and ensure VITE_API_URL points to /api or http://localhost:8000.":s.message==="Internal Server Error"?"API returned 500. Check the backend terminal — is Firestore emulator running on port 8080?":s.message:t}function ry(s){const[t,i]=et.useState({status:"loading",uploads:[],error:null}),r=et.useCallback(async()=>{i(l=>({...l,status:"loading",error:null}));try{const{uploads:l}=await hT(s);i({status:"success",uploads:l,error:null})}catch(l){i({status:"error",uploads:[],error:ay(l,"Failed to load uploads.")})}},[s]);return et.useEffect(()=>{r()},[r]),{...t,reload:r}}function sy(s){if(!s)return"—";const t=new Date(s);return Number.isNaN(t.getTime())?"—":t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}function qc(s){return!s||s==="mixed"?"Mixed":s.charAt(0).toUpperCase()+s.slice(1)}const mT=[{to:"/upload",label:"Import or export coral",icon:eT},{to:"/share",label:"Download coral report",icon:JE},{to:"/",label:"My dashboard",icon:qE,end:!0},{to:"/share",label:"Compare my coral",icon:ny},{to:"/share",label:"Connect with others",icon:iy}];function gT({selectedUploadId:s,onSelectUpload:t}){const i=si(),r=new URLSearchParams(i.search).get("upload"),{status:l,uploads:c,error:f,reload:d}=ry(Ls);return I.jsxs("aside",{className:"sidebar","aria-label":"Uploads and quick links",children:[I.jsxs("div",{className:"sidebar-section",children:[I.jsxs("div",{className:"sidebar-section-header",children:[I.jsxs("div",{children:[I.jsx("p",{className:"section-kicker",children:"Your uploads"}),I.jsx("h2",{children:"Export history"})]}),I.jsx("button",{className:"text-button",type:"button",onClick:()=>void d(),children:"Refresh"})]}),l==="loading"?I.jsxs("div",{className:"sidebar-status",role:"status",children:[I.jsx(iu,{className:"spin-icon",size:16,"aria-hidden":"true"}),I.jsx("span",{children:"Loading uploads…"})]}):null,l==="error"?I.jsxs("div",{className:"sidebar-status sidebar-status--error",role:"alert",children:[I.jsx("span",{children:f}),I.jsx("button",{className:"text-button",type:"button",onClick:()=>void d(),children:"Retry"})]}):null,l==="success"&&c.length===0?I.jsxs("p",{className:"sidebar-empty",children:["No uploads yet."," ",I.jsx($o,{to:"/upload",children:"Import your first export"}),"."]}):null,l==="success"&&c.length>0?I.jsx("ul",{className:"uploads-list",children:c.map(p=>{const m=s===p.upload_id||r===p.upload_id,g=I.jsxs(I.Fragment,{children:[I.jsx("span",{className:"upload-filename",children:p.filename}),I.jsxs("span",{className:"upload-meta",children:[qc(p.platform)," · ",p.post_count," posts ·"," ",sy(p.created_at)]})]});return t?I.jsx("li",{children:I.jsx("button",{type:"button",className:`upload-item${m?" upload-item--selected":""}`,onClick:()=>t(p.upload_id),children:g})},p.upload_id):I.jsx("li",{children:I.jsx(pu,{to:`/upload?upload=${p.upload_id}`,className:`upload-item${m?" upload-item--selected":""}`,children:g})},p.upload_id)})}):null]}),I.jsxs("div",{className:"sidebar-section quick-links",children:[I.jsx("p",{className:"section-kicker",children:"Quick links"}),mT.map(p=>{const m=p.icon;return I.jsxs($o,{className:"quick-link",to:p.to,end:p.end,children:[I.jsx(m,{size:18}),I.jsx("span",{children:p.label})]},p.label)})]})]})}function _T(){return I.jsxs("main",{className:"app-shell",children:[I.jsx(uT,{}),I.jsxs("div",{className:"dashboard",children:[I.jsx(gT,{}),I.jsx("div",{className:"page-content",children:I.jsx(oE,{})})]})]})}function oy({status:s,error:t,onRetry:i}){return s==="loading"?I.jsxs("div",{className:"data-banner data-banner--loading",role:"status",children:[I.jsx(iu,{className:"spin-icon",size:18,"aria-hidden":"true"}),I.jsx("span",{children:"Loading your latest analysis…"})]}):s==="empty"?I.jsxs("div",{className:"data-banner data-banner--empty",role:"status",children:[I.jsx(Tv,{size:18,"aria-hidden":"true"}),I.jsx("span",{children:"No analysis found yet. Run `npm run seed` to load demo data."}),i?I.jsxs("button",{className:"banner-action",type:"button",onClick:i,children:[I.jsx(bv,{size:15}),I.jsx("span",{children:"Retry"})]}):null]}):I.jsxs("div",{className:"data-banner data-banner--error",role:"alert",children:[I.jsx(Tv,{size:18,"aria-hidden":"true"}),I.jsx("span",{children:t??"Could not reach the Coralytics API."}),i?I.jsxs("button",{className:"banner-action",type:"button",onClick:i,children:[I.jsx(bv,{size:15}),I.jsx("span",{children:"Retry"})]}):null]})}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pp="177",Ns={ROTATE:0,DOLLY:1,PAN:2},Ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vT=0,Rv=1,yT=2,ly=1,xT=2,pa=3,$a=0,qn=1,ma=2,Qa=0,Os=1,Cv=2,wv=3,Dv=4,ST=5,Cr=100,MT=101,ET=102,TT=103,bT=104,AT=200,RT=201,CT=202,wT=203,vd=204,yd=205,DT=206,UT=207,LT=208,NT=209,OT=210,PT=211,zT=212,IT=213,BT=214,xd=0,Sd=1,Md=2,Is=3,Ed=4,Td=5,bd=6,Ad=7,cy=0,FT=1,HT=2,Ja=0,GT=1,VT=2,kT=3,XT=4,jT=5,WT=6,qT=7,uy=300,Bs=301,Fs=302,Rd=303,Cd=304,gu=306,wd=1e3,Dr=1001,Dd=1002,Li=1003,YT=1004,Sc=1005,Hi=1006,zh=1007,Ur=1008,Vi=1009,fy=1010,hy=1011,tl=1012,mp=1013,Lr=1014,ga=1015,sl=1016,gp=1017,_p=1018,el=1020,dy=35902,py=1021,my=1022,wi=1023,nl=1026,il=1027,gy=1028,vp=1029,_y=1030,yp=1031,xp=1033,Yc=33776,Zc=33777,Kc=33778,Qc=33779,Ud=35840,Ld=35841,Nd=35842,Od=35843,Pd=36196,zd=37492,Id=37496,Bd=37808,Fd=37809,Hd=37810,Gd=37811,Vd=37812,kd=37813,Xd=37814,jd=37815,Wd=37816,qd=37817,Yd=37818,Zd=37819,Kd=37820,Qd=37821,Jc=36492,Jd=36494,$d=36495,vy=36283,tp=36284,ep=36285,np=36286,ZT=3200,KT=3201,yy=0,QT=1,Ka="",gi="srgb",Hs="srgb-linear",au="linear",Ve="srgb",ms=7680,Uv=519,JT=512,$T=513,tb=514,xy=515,eb=516,nb=517,ib=518,ab=519,Lv=35044,Nv="300 es",_a=2e3,ru=2001;class Pr{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(i)===-1&&r[t].push(i)}hasEventListener(t,i){const r=this._listeners;return r===void 0?!1:r[t]!==void 0&&r[t].indexOf(i)!==-1}removeEventListener(t,i){const r=this._listeners;if(r===void 0)return;const l=r[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const r=i[t.type];if(r!==void 0){t.target=this;const l=r.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$c=Math.PI/180,ip=180/Math.PI;function ol(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Dn[s&255]+Dn[s>>8&255]+Dn[s>>16&255]+Dn[s>>24&255]+"-"+Dn[t&255]+Dn[t>>8&255]+"-"+Dn[t>>16&15|64]+Dn[t>>24&255]+"-"+Dn[i&63|128]+Dn[i>>8&255]+"-"+Dn[i>>16&255]+Dn[i>>24&255]+Dn[r&255]+Dn[r>>8&255]+Dn[r>>16&255]+Dn[r>>24&255]).toLowerCase()}function ge(s,t,i){return Math.max(t,Math.min(i,s))}function rb(s,t){return(s%t+t)%t}function Ih(s,t,i){return(1-i)*s+i*t}function ko(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function jn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const sb={DEG2RAD:$c};class ce{constructor(t=0,i=0){ce.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,r=this.y,l=t.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ge(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(ge(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*r-f*l+t.x,this.y=c*l+f*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nr{constructor(t=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=r,this._w=l}static slerpFlat(t,i,r,l,c,f,d){let p=r[l+0],m=r[l+1],g=r[l+2],_=r[l+3];const y=c[f+0],M=c[f+1],E=c[f+2],T=c[f+3];if(d===0){t[i+0]=p,t[i+1]=m,t[i+2]=g,t[i+3]=_;return}if(d===1){t[i+0]=y,t[i+1]=M,t[i+2]=E,t[i+3]=T;return}if(_!==T||p!==y||m!==M||g!==E){let S=1-d;const v=p*y+m*M+g*E+_*T,L=v>=0?1:-1,U=1-v*v;if(U>Number.EPSILON){const B=Math.sqrt(U),H=Math.atan2(B,v*L);S=Math.sin(S*H)/B,d=Math.sin(d*H)/B}const w=d*L;if(p=p*S+y*w,m=m*S+M*w,g=g*S+E*w,_=_*S+T*w,S===1-d){const B=1/Math.sqrt(p*p+m*m+g*g+_*_);p*=B,m*=B,g*=B,_*=B}}t[i]=p,t[i+1]=m,t[i+2]=g,t[i+3]=_}static multiplyQuaternionsFlat(t,i,r,l,c,f){const d=r[l],p=r[l+1],m=r[l+2],g=r[l+3],_=c[f],y=c[f+1],M=c[f+2],E=c[f+3];return t[i]=d*E+g*_+p*M-m*y,t[i+1]=p*E+g*y+m*_-d*M,t[i+2]=m*E+g*M+d*y-p*_,t[i+3]=g*E-d*_-p*y-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,r,l){return this._x=t,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const r=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,p=Math.sin,m=d(r/2),g=d(l/2),_=d(c/2),y=p(r/2),M=p(l/2),E=p(c/2);switch(f){case"XYZ":this._x=y*g*_+m*M*E,this._y=m*M*_-y*g*E,this._z=m*g*E+y*M*_,this._w=m*g*_-y*M*E;break;case"YXZ":this._x=y*g*_+m*M*E,this._y=m*M*_-y*g*E,this._z=m*g*E-y*M*_,this._w=m*g*_+y*M*E;break;case"ZXY":this._x=y*g*_-m*M*E,this._y=m*M*_+y*g*E,this._z=m*g*E+y*M*_,this._w=m*g*_-y*M*E;break;case"ZYX":this._x=y*g*_-m*M*E,this._y=m*M*_+y*g*E,this._z=m*g*E-y*M*_,this._w=m*g*_+y*M*E;break;case"YZX":this._x=y*g*_+m*M*E,this._y=m*M*_+y*g*E,this._z=m*g*E-y*M*_,this._w=m*g*_-y*M*E;break;case"XZY":this._x=y*g*_-m*M*E,this._y=m*M*_-y*g*E,this._z=m*g*E+y*M*_,this._w=m*g*_+y*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const r=i/2,l=Math.sin(r);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,r=i[0],l=i[4],c=i[8],f=i[1],d=i[5],p=i[9],m=i[2],g=i[6],_=i[10],y=r+d+_;if(y>0){const M=.5/Math.sqrt(y+1);this._w=.25/M,this._x=(g-p)*M,this._y=(c-m)*M,this._z=(f-l)*M}else if(r>d&&r>_){const M=2*Math.sqrt(1+r-d-_);this._w=(g-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+m)/M}else if(d>_){const M=2*Math.sqrt(1+d-r-_);this._w=(c-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+g)/M}else{const M=2*Math.sqrt(1+_-r-d);this._w=(f-l)/M,this._x=(c+m)/M,this._y=(p+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let r=t.dot(i)+1;return r<Number.EPSILON?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,i){const r=this.angleTo(t);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const r=t._x,l=t._y,c=t._z,f=t._w,d=i._x,p=i._y,m=i._z,g=i._w;return this._x=r*g+f*d+l*m-c*p,this._y=l*g+f*p+c*d-r*m,this._z=c*g+f*m+r*p-l*d,this._w=f*g-r*d-l*p-c*m,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const r=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+r*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=r,this._y=l,this._z=c,this;const p=1-d*d;if(p<=Number.EPSILON){const M=1-i;return this._w=M*f+i*this._w,this._x=M*r+i*this._x,this._y=M*l+i*this._y,this._z=M*c+i*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,d),_=Math.sin((1-i)*g)/m,y=Math.sin(i*g)/m;return this._w=f*_+this._w*y,this._x=r*_+this._x*y,this._y=l*_+this._y*y,this._z=c*_+this._z*y,this._onChangeCallback(),this}slerpQuaternions(t,i,r){return this.copy(t).slerp(i,r)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,i=0,r=0){J.prototype.isVector3=!0,this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Ov.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Ov.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,r=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,r=this.y,l=this.z,c=t.x,f=t.y,d=t.z,p=t.w,m=2*(f*l-d*r),g=2*(d*i-c*l),_=2*(c*r-f*i);return this.x=i+p*m+f*_-d*g,this.y=r+p*g+d*m-c*_,this.z=l+p*_+c*g-f*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,r=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ge(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const r=t.x,l=t.y,c=t.z,f=i.x,d=i.y,p=i.z;return this.x=l*p-c*d,this.y=c*f-r*p,this.z=r*d-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return Bh.copy(this).projectOnVector(t),this.sub(Bh)}reflect(t){return this.sub(Bh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(ge(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y,l=this.z-t.z;return i*i+r*r+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){const l=Math.sin(i)*t;return this.x=l*Math.sin(r),this.y=Math.cos(i)*t,this.z=l*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bh=new J,Ov=new Nr;class fe{constructor(t,i,r,l,c,f,d,p,m){fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,l,c,f,d,p,m)}set(t,i,r,l,c,f,d,p,m){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=p,g[6]=r,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,c=this.elements,f=r[0],d=r[3],p=r[6],m=r[1],g=r[4],_=r[7],y=r[2],M=r[5],E=r[8],T=l[0],S=l[3],v=l[6],L=l[1],U=l[4],w=l[7],B=l[2],H=l[5],N=l[8];return c[0]=f*T+d*L+p*B,c[3]=f*S+d*U+p*H,c[6]=f*v+d*w+p*N,c[1]=m*T+g*L+_*B,c[4]=m*S+g*U+_*H,c[7]=m*v+g*w+_*N,c[2]=y*T+M*L+E*B,c[5]=y*S+M*U+E*H,c[8]=y*v+M*w+E*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],f=t[4],d=t[5],p=t[6],m=t[7],g=t[8];return i*f*g-i*d*m-r*c*g+r*d*p+l*c*m-l*f*p}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],f=t[4],d=t[5],p=t[6],m=t[7],g=t[8],_=g*f-d*m,y=d*p-g*c,M=m*c-f*p,E=i*_+r*y+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=_*T,t[1]=(l*m-g*r)*T,t[2]=(d*r-l*f)*T,t[3]=y*T,t[4]=(g*i-l*p)*T,t[5]=(l*c-d*i)*T,t[6]=M*T,t[7]=(r*p-m*i)*T,t[8]=(f*i-r*c)*T,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,l,c,f,d){const p=Math.cos(c),m=Math.sin(c);return this.set(r*p,r*m,-r*(p*f+m*d)+f+t,-l*m,l*p,-l*(-m*f+p*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(Fh.makeScale(t,i)),this}rotate(t){return this.premultiply(Fh.makeRotation(-t)),this}translate(t,i){return this.premultiply(Fh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fh=new fe;function Sy(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function su(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ob(){const s=su("canvas");return s.style.display="block",s}const Pv={};function Ps(s){s in Pv||(Pv[s]=!0,console.warn(s))}function lb(s,t,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}function cb(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ub(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const zv=new fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Iv=new fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fb(){const s={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Ve&&(l.r=va(l.r),l.g=va(l.g),l.b=va(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Ve&&(l.r=zs(l.r),l.g=zs(l.g),l.b=zs(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ka?au:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Ps("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Ps("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Hs]:{primaries:t,whitePoint:r,transfer:au,toXYZ:zv,fromXYZ:Iv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:gi},outputColorSpaceConfig:{drawingBufferColorSpace:gi}},[gi]:{primaries:t,whitePoint:r,transfer:Ve,toXYZ:zv,fromXYZ:Iv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:gi}}}),s}const De=fb();function va(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function zs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let gs;class hb{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let r;if(t instanceof HTMLCanvasElement)r=t;else{gs===void 0&&(gs=su("canvas")),gs.width=t.width,gs.height=t.height;const l=gs.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),r=gs}return r.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=su("canvas");i.width=t.width,i.height=t.height;const r=i.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const l=r.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=va(c[f]/255)*255;return r.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(va(i[r]/255)*255):i[r]=va(i[r]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let db=0;class Sp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:db++}),this.uuid=ol(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(Hh(l[f].image)):c.push(Hh(l[f]))}else c=Hh(l);r.url=c}return i||(t.images[this.uuid]=r),r}}function Hh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?hb.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pb=0;const Gh=new J;class Yn extends Pr{constructor(t=Yn.DEFAULT_IMAGE,i=Yn.DEFAULT_MAPPING,r=Dr,l=Dr,c=Hi,f=Ur,d=wi,p=Vi,m=Yn.DEFAULT_ANISOTROPY,g=Ka){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pb++}),this.uuid=ol(),this.name="",this.source=new Sp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Gh).x}get height(){return this.source.getSize(Gh).y}get depth(){return this.source.getSize(Gh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const r=t[i];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==uy)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wd:t.x=t.x-Math.floor(t.x);break;case Dr:t.x=t.x<0?0:1;break;case Dd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wd:t.y=t.y-Math.floor(t.y);break;case Dr:t.y=t.y<0?0:1;break;case Dd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=uy;Yn.DEFAULT_ANISOTROPY=1;class en{constructor(t=0,i=0,r=0,l=1){en.prototype.isVector4=!0,this.x=t,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,l){return this.x=t,this.y=i,this.z=r,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*r+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*r+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*r+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*r+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,l,c;const p=t.elements,m=p[0],g=p[4],_=p[8],y=p[1],M=p[5],E=p[9],T=p[2],S=p[6],v=p[10];if(Math.abs(g-y)<.01&&Math.abs(_-T)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+y)<.1&&Math.abs(_+T)<.1&&Math.abs(E+S)<.1&&Math.abs(m+M+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(m+1)/2,w=(M+1)/2,B=(v+1)/2,H=(g+y)/4,N=(_+T)/4,X=(E+S)/4;return U>w&&U>B?U<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(U),l=H/r,c=N/r):w>B?w<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(w),r=H/l,c=X/l):B<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(B),r=N/c,l=X/c),this.set(r,l,c,i),this}let L=Math.sqrt((S-E)*(S-E)+(_-T)*(_-T)+(y-g)*(y-g));return Math.abs(L)<.001&&(L=1),this.x=(S-E)/L,this.y=(_-T)/L,this.z=(y-g)/L,this.w=Math.acos((m+M+v-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this.w=ge(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this.w=ge(this.w,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ge(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mb extends Pr{constructor(t=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=r.depth,this.scissor=new en(0,0,t,i),this.scissorTest=!1,this.viewport=new en(0,0,t,i);const l={width:t,height:i,depth:r.depth},c=new Yn(l);this.textures=[];const f=r.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(t={}){const i={minFilter:Hi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,r=1){if(this.width!==t||this.height!==i||this.depth!==r){this.width=t,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Sp(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Or extends mb{constructor(t=1,i=1,r={}){super(t,i,r),this.isWebGLRenderTarget=!0}}class My extends Yn{constructor(t=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=Li,this.minFilter=Li,this.wrapR=Dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class gb extends Yn{constructor(t=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=Li,this.minFilter=Li,this.wrapR=Dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ll{constructor(t=new J(1/0,1/0,1/0),i=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i+=3)this.expandByPoint(bi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,r=t.count;i<r;i++)this.expandByPoint(bi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const r=bi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,bi):bi.fromBufferAttribute(c,f),bi.applyMatrix4(t.matrixWorld),this.expandByPoint(bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mc.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Mc.copy(r.boundingBox)),Mc.applyMatrix4(t.matrixWorld),this.union(Mc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bi),bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,r;return t.normal.x>0?(i=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),i<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xo),Ec.subVectors(this.max,Xo),_s.subVectors(t.a,Xo),vs.subVectors(t.b,Xo),ys.subVectors(t.c,Xo),ka.subVectors(vs,_s),Xa.subVectors(ys,vs),xr.subVectors(_s,ys);let i=[0,-ka.z,ka.y,0,-Xa.z,Xa.y,0,-xr.z,xr.y,ka.z,0,-ka.x,Xa.z,0,-Xa.x,xr.z,0,-xr.x,-ka.y,ka.x,0,-Xa.y,Xa.x,0,-xr.y,xr.x,0];return!Vh(i,_s,vs,ys,Ec)||(i=[1,0,0,0,1,0,0,0,1],!Vh(i,_s,vs,ys,Ec))?!1:(Tc.crossVectors(ka,Xa),i=[Tc.x,Tc.y,Tc.z],Vh(i,_s,vs,ys,Ec))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ca),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ca=[new J,new J,new J,new J,new J,new J,new J,new J],bi=new J,Mc=new ll,_s=new J,vs=new J,ys=new J,ka=new J,Xa=new J,xr=new J,Xo=new J,Ec=new J,Tc=new J,Sr=new J;function Vh(s,t,i,r,l){for(let c=0,f=s.length-3;c<=f;c+=3){Sr.fromArray(s,c);const d=l.x*Math.abs(Sr.x)+l.y*Math.abs(Sr.y)+l.z*Math.abs(Sr.z),p=t.dot(Sr),m=i.dot(Sr),g=r.dot(Sr);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>d)return!1}return!0}const _b=new ll,jo=new J,kh=new J;class _u{constructor(t=new J,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const r=this.center;i!==void 0?r.copy(i):_b.setFromPoints(t).getCenter(r);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,r.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const r=this.center.distanceToSquared(t);return i.copy(t),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;jo.subVectors(t,this.center);const i=jo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(jo,l/r),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(jo.copy(t.center).add(kh)),this.expandByPoint(jo.copy(t.center).sub(kh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ua=new J,Xh=new J,bc=new J,ja=new J,jh=new J,Ac=new J,Wh=new J;class Mp{constructor(t=new J,i=new J(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ua)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ua.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ua.copy(this.origin).addScaledVector(this.direction,i),ua.distanceToSquared(t))}distanceSqToSegment(t,i,r,l){Xh.copy(t).add(i).multiplyScalar(.5),bc.copy(i).sub(t).normalize(),ja.copy(this.origin).sub(Xh);const c=t.distanceTo(i)*.5,f=-this.direction.dot(bc),d=ja.dot(this.direction),p=-ja.dot(bc),m=ja.lengthSq(),g=Math.abs(1-f*f);let _,y,M,E;if(g>0)if(_=f*p-d,y=f*d-p,E=c*g,_>=0)if(y>=-E)if(y<=E){const T=1/g;_*=T,y*=T,M=_*(_+f*y+2*d)+y*(f*_+y+2*p)+m}else y=c,_=Math.max(0,-(f*y+d)),M=-_*_+y*(y+2*p)+m;else y=-c,_=Math.max(0,-(f*y+d)),M=-_*_+y*(y+2*p)+m;else y<=-E?(_=Math.max(0,-(-f*c+d)),y=_>0?-c:Math.min(Math.max(-c,-p),c),M=-_*_+y*(y+2*p)+m):y<=E?(_=0,y=Math.min(Math.max(-c,-p),c),M=y*(y+2*p)+m):(_=Math.max(0,-(f*c+d)),y=_>0?c:Math.min(Math.max(-c,-p),c),M=-_*_+y*(y+2*p)+m);else y=f>0?-c:c,_=Math.max(0,-(f*y+d)),M=-_*_+y*(y+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Xh).addScaledVector(bc,y),M}intersectSphere(t,i){ua.subVectors(t.center,this.origin);const r=ua.dot(this.direction),l=ua.dot(ua)-r*r,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=r-f,p=r+f;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/i;return r>=0?r:null}intersectPlane(t,i){const r=this.distanceToPlane(t);return r===null?null:this.at(r,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let r,l,c,f,d,p;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,y=this.origin;return m>=0?(r=(t.min.x-y.x)*m,l=(t.max.x-y.x)*m):(r=(t.max.x-y.x)*m,l=(t.min.x-y.x)*m),g>=0?(c=(t.min.y-y.y)*g,f=(t.max.y-y.y)*g):(c=(t.max.y-y.y)*g,f=(t.min.y-y.y)*g),r>f||c>l||((c>r||isNaN(r))&&(r=c),(f<l||isNaN(l))&&(l=f),_>=0?(d=(t.min.z-y.z)*_,p=(t.max.z-y.z)*_):(d=(t.max.z-y.z)*_,p=(t.min.z-y.z)*_),r>p||d>l)||((d>r||r!==r)&&(r=d),(p<l||l!==l)&&(l=p),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(t){return this.intersectBox(t,ua)!==null}intersectTriangle(t,i,r,l,c){jh.subVectors(i,t),Ac.subVectors(r,t),Wh.crossVectors(jh,Ac);let f=this.direction.dot(Wh),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;ja.subVectors(this.origin,t);const p=d*this.direction.dot(Ac.crossVectors(ja,Ac));if(p<0)return null;const m=d*this.direction.dot(jh.cross(ja));if(m<0||p+m>f)return null;const g=-d*ja.dot(Wh);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(t,i,r,l,c,f,d,p,m,g,_,y,M,E,T,S){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,l,c,f,d,p,m,g,_,y,M,E,T,S)}set(t,i,r,l,c,f,d,p,m,g,_,y,M,E,T,S){const v=this.elements;return v[0]=t,v[4]=i,v[8]=r,v[12]=l,v[1]=c,v[5]=f,v[9]=d,v[13]=p,v[2]=m,v[6]=g,v[10]=_,v[14]=y,v[3]=M,v[7]=E,v[11]=T,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){const i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,r=t.elements,l=1/xs.setFromMatrixColumn(t,0).length(),c=1/xs.setFromMatrixColumn(t,1).length(),f=1/xs.setFromMatrixColumn(t,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*f,i[9]=r[9]*f,i[10]=r[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,r=t.x,l=t.y,c=t.z,f=Math.cos(r),d=Math.sin(r),p=Math.cos(l),m=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const y=f*g,M=f*_,E=d*g,T=d*_;i[0]=p*g,i[4]=-p*_,i[8]=m,i[1]=M+E*m,i[5]=y-T*m,i[9]=-d*p,i[2]=T-y*m,i[6]=E+M*m,i[10]=f*p}else if(t.order==="YXZ"){const y=p*g,M=p*_,E=m*g,T=m*_;i[0]=y+T*d,i[4]=E*d-M,i[8]=f*m,i[1]=f*_,i[5]=f*g,i[9]=-d,i[2]=M*d-E,i[6]=T+y*d,i[10]=f*p}else if(t.order==="ZXY"){const y=p*g,M=p*_,E=m*g,T=m*_;i[0]=y-T*d,i[4]=-f*_,i[8]=E+M*d,i[1]=M+E*d,i[5]=f*g,i[9]=T-y*d,i[2]=-f*m,i[6]=d,i[10]=f*p}else if(t.order==="ZYX"){const y=f*g,M=f*_,E=d*g,T=d*_;i[0]=p*g,i[4]=E*m-M,i[8]=y*m+T,i[1]=p*_,i[5]=T*m+y,i[9]=M*m-E,i[2]=-m,i[6]=d*p,i[10]=f*p}else if(t.order==="YZX"){const y=f*p,M=f*m,E=d*p,T=d*m;i[0]=p*g,i[4]=T-y*_,i[8]=E*_+M,i[1]=_,i[5]=f*g,i[9]=-d*g,i[2]=-m*g,i[6]=M*_+E,i[10]=y-T*_}else if(t.order==="XZY"){const y=f*p,M=f*m,E=d*p,T=d*m;i[0]=p*g,i[4]=-_,i[8]=m*g,i[1]=y*_+T,i[5]=f*g,i[9]=M*_-E,i[2]=E*_-M,i[6]=d*g,i[10]=T*_+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vb,t,yb)}lookAt(t,i,r){const l=this.elements;return ii.subVectors(t,i),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),Wa.crossVectors(r,ii),Wa.lengthSq()===0&&(Math.abs(r.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),Wa.crossVectors(r,ii)),Wa.normalize(),Rc.crossVectors(ii,Wa),l[0]=Wa.x,l[4]=Rc.x,l[8]=ii.x,l[1]=Wa.y,l[5]=Rc.y,l[9]=ii.y,l[2]=Wa.z,l[6]=Rc.z,l[10]=ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,c=this.elements,f=r[0],d=r[4],p=r[8],m=r[12],g=r[1],_=r[5],y=r[9],M=r[13],E=r[2],T=r[6],S=r[10],v=r[14],L=r[3],U=r[7],w=r[11],B=r[15],H=l[0],N=l[4],X=l[8],D=l[12],C=l[1],V=l[5],rt=l[9],nt=l[13],ft=l[2],ut=l[6],z=l[10],Q=l[14],K=l[3],Mt=l[7],Ct=l[11],O=l[15];return c[0]=f*H+d*C+p*ft+m*K,c[4]=f*N+d*V+p*ut+m*Mt,c[8]=f*X+d*rt+p*z+m*Ct,c[12]=f*D+d*nt+p*Q+m*O,c[1]=g*H+_*C+y*ft+M*K,c[5]=g*N+_*V+y*ut+M*Mt,c[9]=g*X+_*rt+y*z+M*Ct,c[13]=g*D+_*nt+y*Q+M*O,c[2]=E*H+T*C+S*ft+v*K,c[6]=E*N+T*V+S*ut+v*Mt,c[10]=E*X+T*rt+S*z+v*Ct,c[14]=E*D+T*nt+S*Q+v*O,c[3]=L*H+U*C+w*ft+B*K,c[7]=L*N+U*V+w*ut+B*Mt,c[11]=L*X+U*rt+w*z+B*Ct,c[15]=L*D+U*nt+w*Q+B*O,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[4],l=t[8],c=t[12],f=t[1],d=t[5],p=t[9],m=t[13],g=t[2],_=t[6],y=t[10],M=t[14],E=t[3],T=t[7],S=t[11],v=t[15];return E*(+c*p*_-l*m*_-c*d*y+r*m*y+l*d*M-r*p*M)+T*(+i*p*M-i*m*y+c*f*y-l*f*M+l*m*g-c*p*g)+S*(+i*m*_-i*d*M-c*f*_+r*f*M+c*d*g-r*m*g)+v*(-l*d*g-i*p*_+i*d*y+l*f*_-r*f*y+r*p*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=r),this}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],f=t[4],d=t[5],p=t[6],m=t[7],g=t[8],_=t[9],y=t[10],M=t[11],E=t[12],T=t[13],S=t[14],v=t[15],L=_*S*m-T*y*m+T*p*M-d*S*M-_*p*v+d*y*v,U=E*y*m-g*S*m-E*p*M+f*S*M+g*p*v-f*y*v,w=g*T*m-E*_*m+E*d*M-f*T*M-g*d*v+f*_*v,B=E*_*p-g*T*p-E*d*y+f*T*y+g*d*S-f*_*S,H=i*L+r*U+l*w+c*B;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/H;return t[0]=L*N,t[1]=(T*y*c-_*S*c-T*l*M+r*S*M+_*l*v-r*y*v)*N,t[2]=(d*S*c-T*p*c+T*l*m-r*S*m-d*l*v+r*p*v)*N,t[3]=(_*p*c-d*y*c-_*l*m+r*y*m+d*l*M-r*p*M)*N,t[4]=U*N,t[5]=(g*S*c-E*y*c+E*l*M-i*S*M-g*l*v+i*y*v)*N,t[6]=(E*p*c-f*S*c-E*l*m+i*S*m+f*l*v-i*p*v)*N,t[7]=(f*y*c-g*p*c+g*l*m-i*y*m-f*l*M+i*p*M)*N,t[8]=w*N,t[9]=(E*_*c-g*T*c-E*r*M+i*T*M+g*r*v-i*_*v)*N,t[10]=(f*T*c-E*d*c+E*r*m-i*T*m-f*r*v+i*d*v)*N,t[11]=(g*d*c-f*_*c-g*r*m+i*_*m+f*r*M-i*d*M)*N,t[12]=B*N,t[13]=(g*T*l-E*_*l+E*r*y-i*T*y-g*r*S+i*_*S)*N,t[14]=(E*d*l-f*T*l-E*r*p+i*T*p+f*r*S-i*d*S)*N,t[15]=(f*_*l-g*d*l+g*r*p-i*_*p-f*r*y+i*d*y)*N,this}scale(t){const i=this.elements,r=t.x,l=t.y,c=t.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,f=t.x,d=t.y,p=t.z,m=c*f,g=c*d;return this.set(m*f+r,m*d-l*p,m*p+l*d,0,m*d+l*p,g*d+r,g*p-l*f,0,m*p-l*d,g*p+l*f,c*p*p+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,l,c,f){return this.set(1,r,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,r){const l=this.elements,c=i._x,f=i._y,d=i._z,p=i._w,m=c+c,g=f+f,_=d+d,y=c*m,M=c*g,E=c*_,T=f*g,S=f*_,v=d*_,L=p*m,U=p*g,w=p*_,B=r.x,H=r.y,N=r.z;return l[0]=(1-(T+v))*B,l[1]=(M+w)*B,l[2]=(E-U)*B,l[3]=0,l[4]=(M-w)*H,l[5]=(1-(y+v))*H,l[6]=(S+L)*H,l[7]=0,l[8]=(E+U)*N,l[9]=(S-L)*N,l[10]=(1-(y+T))*N,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,r){const l=this.elements;let c=xs.set(l[0],l[1],l[2]).length();const f=xs.set(l[4],l[5],l[6]).length(),d=xs.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Ai.copy(this);const m=1/c,g=1/f,_=1/d;return Ai.elements[0]*=m,Ai.elements[1]*=m,Ai.elements[2]*=m,Ai.elements[4]*=g,Ai.elements[5]*=g,Ai.elements[6]*=g,Ai.elements[8]*=_,Ai.elements[9]*=_,Ai.elements[10]*=_,i.setFromRotationMatrix(Ai),r.x=c,r.y=f,r.z=d,this}makePerspective(t,i,r,l,c,f,d=_a){const p=this.elements,m=2*c/(i-t),g=2*c/(r-l),_=(i+t)/(i-t),y=(r+l)/(r-l);let M,E;if(d===_a)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(d===ru)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=g,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,r,l,c,f,d=_a){const p=this.elements,m=1/(i-t),g=1/(r-l),_=1/(f-c),y=(i+t)*m,M=(r+l)*g;let E,T;if(d===_a)E=(f+c)*_,T=-2*_;else if(d===ru)E=c*_,T=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-y,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=T,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}}const xs=new J,Ai=new Ke,vb=new J(0,0,0),yb=new J(1,1,1),Wa=new J,Rc=new J,ii=new J,Bv=new Ke,Fv=new Nr;class ki{constructor(t=0,i=0,r=0,l=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,l=this._order){return this._x=t,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],p=l[1],m=l[5],g=l[9],_=l[2],y=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(y,m),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(ge(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-ge(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(y,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(ge(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(y,m),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Bv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bv,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Fv.setFromEuler(this),this.setFromQuaternion(Fv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class Ey{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xb=0;const Hv=new J,Ss=new Nr,fa=new Ke,Cc=new J,Wo=new J,Sb=new J,Mb=new Nr,Gv=new J(1,0,0),Vv=new J(0,1,0),kv=new J(0,0,1),Xv={type:"added"},Eb={type:"removed"},Ms={type:"childadded",child:null},qh={type:"childremoved",child:null};class Rn extends Pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xb++}),this.uuid=ol(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const t=new J,i=new ki,r=new Nr,l=new J(1,1,1);function c(){r.setFromEuler(i,!1)}function f(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ke},normalMatrix:{value:new fe}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ey,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Ss.setFromAxisAngle(t,i),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(t,i){return Ss.setFromAxisAngle(t,i),this.quaternion.premultiply(Ss),this}rotateX(t){return this.rotateOnAxis(Gv,t)}rotateY(t){return this.rotateOnAxis(Vv,t)}rotateZ(t){return this.rotateOnAxis(kv,t)}translateOnAxis(t,i){return Hv.copy(t).applyQuaternion(this.quaternion),this.position.add(Hv.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Gv,t)}translateY(t){return this.translateOnAxis(Vv,t)}translateZ(t){return this.translateOnAxis(kv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fa.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Cc.copy(t):Cc.set(t,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Wo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fa.lookAt(Wo,Cc,this.up):fa.lookAt(Cc,Wo,this.up),this.quaternion.setFromRotationMatrix(fa),l&&(fa.extractRotation(l.matrixWorld),Ss.setFromRotationMatrix(fa),this.quaternion.premultiply(Ss.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xv),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Eb),qh.child=t,this.dispatchEvent(qh),qh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fa.multiply(t.parent.matrixWorld)),t.applyMatrix4(fa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xv),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const f=this.children[r].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wo,t,Sb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wo,Mb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const _=p[m];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(c(t.materials,this.material[p]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];l.animations.push(c(t.animations,p))}}if(i){const d=f(t.geometries),p=f(t.materials),m=f(t.textures),g=f(t.images),_=f(t.shapes),y=f(t.skeletons),M=f(t.animations),E=f(t.nodes);d.length>0&&(r.geometries=d),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),_.length>0&&(r.shapes=_),y.length>0&&(r.skeletons=y),M.length>0&&(r.animations=M),E.length>0&&(r.nodes=E)}return r.object=l,r;function f(d){const p=[];for(const m in d){const g=d[m];delete g.metadata,p.push(g)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){const l=t.children[r];this.add(l.clone())}return this}}Rn.DEFAULT_UP=new J(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ri=new J,ha=new J,Yh=new J,da=new J,Es=new J,Ts=new J,jv=new J,Zh=new J,Kh=new J,Qh=new J,Jh=new en,$h=new en,td=new en;class Ci{constructor(t=new J,i=new J,r=new J){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,l){l.subVectors(r,i),Ri.subVectors(t,i),l.cross(Ri);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,r,l,c){Ri.subVectors(l,i),ha.subVectors(r,i),Yh.subVectors(t,i);const f=Ri.dot(Ri),d=Ri.dot(ha),p=Ri.dot(Yh),m=ha.dot(ha),g=ha.dot(Yh),_=f*m-d*d;if(_===0)return c.set(0,0,0),null;const y=1/_,M=(m*p-d*g)*y,E=(f*g-d*p)*y;return c.set(1-M-E,E,M)}static containsPoint(t,i,r,l){return this.getBarycoord(t,i,r,l,da)===null?!1:da.x>=0&&da.y>=0&&da.x+da.y<=1}static getInterpolation(t,i,r,l,c,f,d,p){return this.getBarycoord(t,i,r,l,da)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,da.x),p.addScaledVector(f,da.y),p.addScaledVector(d,da.z),p)}static getInterpolatedAttribute(t,i,r,l,c,f){return Jh.setScalar(0),$h.setScalar(0),td.setScalar(0),Jh.fromBufferAttribute(t,i),$h.fromBufferAttribute(t,r),td.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Jh,c.x),f.addScaledVector($h,c.y),f.addScaledVector(td,c.z),f}static isFrontFacing(t,i,r,l){return Ri.subVectors(r,i),ha.subVectors(t,i),Ri.cross(ha).dot(l)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,l){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,r,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ri.subVectors(this.c,this.b),ha.subVectors(this.a,this.b),Ri.cross(ha).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ci.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ci.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,l,c){return Ci.getInterpolation(t,this.a,this.b,this.c,i,r,l,c)}containsPoint(t){return Ci.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ci.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const r=this.a,l=this.b,c=this.c;let f,d;Es.subVectors(l,r),Ts.subVectors(c,r),Zh.subVectors(t,r);const p=Es.dot(Zh),m=Ts.dot(Zh);if(p<=0&&m<=0)return i.copy(r);Kh.subVectors(t,l);const g=Es.dot(Kh),_=Ts.dot(Kh);if(g>=0&&_<=g)return i.copy(l);const y=p*_-g*m;if(y<=0&&p>=0&&g<=0)return f=p/(p-g),i.copy(r).addScaledVector(Es,f);Qh.subVectors(t,c);const M=Es.dot(Qh),E=Ts.dot(Qh);if(E>=0&&M<=E)return i.copy(c);const T=M*m-p*E;if(T<=0&&m>=0&&E<=0)return d=m/(m-E),i.copy(r).addScaledVector(Ts,d);const S=g*E-M*_;if(S<=0&&_-g>=0&&M-E>=0)return jv.subVectors(c,l),d=(_-g)/(_-g+(M-E)),i.copy(l).addScaledVector(jv,d);const v=1/(S+T+y);return f=T*v,d=y*v,i.copy(r).addScaledVector(Es,f).addScaledVector(Ts,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ty={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qa={h:0,s:0,l:0},wc={h:0,s:0,l:0};function ed(s,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(t-s)*6*i:i<1/2?t:i<2/3?s+(t-s)*6*(2/3-i):s}class Me{constructor(t,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,r)}set(t,i,r){if(i===void 0&&r===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=gi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,De.colorSpaceToWorking(this,i),this}setRGB(t,i,r,l=De.workingColorSpace){return this.r=t,this.g=i,this.b=r,De.colorSpaceToWorking(this,l),this}setHSL(t,i,r,l=De.workingColorSpace){if(t=rb(t,1),i=ge(i,0,1),r=ge(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,f=2*r-c;this.r=ed(f,c,t+1/3),this.g=ed(f,c,t),this.b=ed(f,c,t-1/3)}return De.colorSpaceToWorking(this,l),this}setStyle(t,i=gi){function r(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=gi){const r=Ty[t.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=va(t.r),this.g=va(t.g),this.b=va(t.b),this}copyLinearToSRGB(t){return this.r=zs(t.r),this.g=zs(t.g),this.b=zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=gi){return De.workingToColorSpace(Un.copy(this),t),Math.round(ge(Un.r*255,0,255))*65536+Math.round(ge(Un.g*255,0,255))*256+Math.round(ge(Un.b*255,0,255))}getHexString(t=gi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=De.workingColorSpace){De.workingToColorSpace(Un.copy(this),i);const r=Un.r,l=Un.g,c=Un.b,f=Math.max(r,l,c),d=Math.min(r,l,c);let p,m;const g=(d+f)/2;if(d===f)p=0,m=0;else{const _=f-d;switch(m=g<=.5?_/(f+d):_/(2-f-d),f){case r:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-r)/_+2;break;case c:p=(r-l)/_+4;break}p/=6}return t.h=p,t.s=m,t.l=g,t}getRGB(t,i=De.workingColorSpace){return De.workingToColorSpace(Un.copy(this),i),t.r=Un.r,t.g=Un.g,t.b=Un.b,t}getStyle(t=gi){De.workingToColorSpace(Un.copy(this),t);const i=Un.r,r=Un.g,l=Un.b;return t!==gi?`color(${t} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(t,i,r){return this.getHSL(qa),this.setHSL(qa.h+t,qa.s+i,qa.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,r){return this.r=t.r+(i.r-t.r)*r,this.g=t.g+(i.g-t.g)*r,this.b=t.b+(i.b-t.b)*r,this}lerpHSL(t,i){this.getHSL(qa),t.getHSL(wc);const r=Ih(qa.h,wc.h,i),l=Ih(qa.s,wc.s,i),c=Ih(qa.l,wc.l,i);return this.setHSL(r,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,r=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Un=new Me;Me.NAMES=Ty;let Tb=0;class js extends Pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tb++}),this.uuid=ol(),this.name="",this.type="Material",this.blending=Os,this.side=$a,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vd,this.blendDst=yd,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const r=t[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Os&&(r.blending=this.blending),this.side!==$a&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==vd&&(r.blendSrc=this.blendSrc),this.blendDst!==yd&&(r.blendDst=this.blendDst),this.blendEquation!==Cr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Is&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Uv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const f=[];for(const d in c){const p=c[d];delete p.metadata,f.push(p)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(r.textures=c),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class by extends js{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=cy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const un=new J,Dc=new ce;let bb=0;class Gi{constructor(t,i,r=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bb++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=r,this.usage=Lv,this.updateRanges=[],this.gpuType=ga,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,r){t*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[r+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Dc.fromBufferAttribute(this,i),Dc.applyMatrix3(t),this.setXY(i,Dc.x,Dc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.applyMatrix3(t),this.setXYZ(i,un.x,un.y,un.z);return this}applyMatrix4(t){for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.applyMatrix4(t),this.setXYZ(i,un.x,un.y,un.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.applyNormalMatrix(t),this.setXYZ(i,un.x,un.y,un.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.transformDirection(t),this.setXYZ(i,un.x,un.y,un.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let r=this.array[t*this.itemSize+i];return this.normalized&&(r=ko(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=jn(r,this.array)),this.array[t*this.itemSize+i]=r,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=ko(i,this.array)),i}setX(t,i){return this.normalized&&(i=jn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=ko(i,this.array)),i}setY(t,i){return this.normalized&&(i=jn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=ko(i,this.array)),i}setZ(t,i){return this.normalized&&(i=jn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=ko(i,this.array)),i}setW(t,i){return this.normalized&&(i=jn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,r){return t*=this.itemSize,this.normalized&&(i=jn(i,this.array),r=jn(r,this.array)),this.array[t+0]=i,this.array[t+1]=r,this}setXYZ(t,i,r,l){return t*=this.itemSize,this.normalized&&(i=jn(i,this.array),r=jn(r,this.array),l=jn(l,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this}setXYZW(t,i,r,l,c){return t*=this.itemSize,this.normalized&&(i=jn(i,this.array),r=jn(r,this.array),l=jn(l,this.array),c=jn(c,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Lv&&(t.usage=this.usage),t}}class Ay extends Gi{constructor(t,i,r){super(new Uint16Array(t),i,r)}}class Ry extends Gi{constructor(t,i,r){super(new Uint32Array(t),i,r)}}class Zn extends Gi{constructor(t,i,r){super(new Float32Array(t),i,r)}}let Ab=0;const mi=new Ke,nd=new Rn,bs=new J,ai=new ll,qo=new ll,yn=new J;class Xi extends Pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ab++}),this.uuid=ol(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sy(t)?Ry:Ay)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new fe().getNormalMatrix(t);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mi.makeRotationFromQuaternion(t),this.applyMatrix4(mi),this}rotateX(t){return mi.makeRotationX(t),this.applyMatrix4(mi),this}rotateY(t){return mi.makeRotationY(t),this.applyMatrix4(mi),this}rotateZ(t){return mi.makeRotationZ(t),this.applyMatrix4(mi),this}translate(t,i,r){return mi.makeTranslation(t,i,r),this.applyMatrix4(mi),this}scale(t,i,r){return mi.makeScale(t,i,r),this.applyMatrix4(mi),this}lookAt(t){return nd.lookAt(t),nd.updateMatrix(),this.applyMatrix4(nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Zn(r,3))}else{const r=Math.min(t.length,i.count);for(let l=0;l<r;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ll);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];ai.setFromBufferAttribute(c),this.morphTargetsRelative?(yn.addVectors(this.boundingBox.min,ai.min),this.boundingBox.expandByPoint(yn),yn.addVectors(this.boundingBox.max,ai.max),this.boundingBox.expandByPoint(yn)):(this.boundingBox.expandByPoint(ai.min),this.boundingBox.expandByPoint(ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _u);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const r=this.boundingSphere.center;if(ai.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const d=i[c];qo.setFromBufferAttribute(d),this.morphTargetsRelative?(yn.addVectors(ai.min,qo.min),ai.expandByPoint(yn),yn.addVectors(ai.max,qo.max),ai.expandByPoint(yn)):(ai.expandByPoint(qo.min),ai.expandByPoint(qo.max))}ai.getCenter(r);let l=0;for(let c=0,f=t.count;c<f;c++)yn.fromBufferAttribute(t,c),l=Math.max(l,r.distanceToSquared(yn));if(i)for(let c=0,f=i.length;c<f;c++){const d=i[c],p=this.morphTargetsRelative;for(let m=0,g=d.count;m<g;m++)yn.fromBufferAttribute(d,m),p&&(bs.fromBufferAttribute(t,m),yn.add(bs)),l=Math.max(l,r.distanceToSquared(yn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gi(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),d=[],p=[];for(let X=0;X<r.count;X++)d[X]=new J,p[X]=new J;const m=new J,g=new J,_=new J,y=new ce,M=new ce,E=new ce,T=new J,S=new J;function v(X,D,C){m.fromBufferAttribute(r,X),g.fromBufferAttribute(r,D),_.fromBufferAttribute(r,C),y.fromBufferAttribute(c,X),M.fromBufferAttribute(c,D),E.fromBufferAttribute(c,C),g.sub(m),_.sub(m),M.sub(y),E.sub(y);const V=1/(M.x*E.y-E.x*M.y);isFinite(V)&&(T.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(V),S.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(V),d[X].add(T),d[D].add(T),d[C].add(T),p[X].add(S),p[D].add(S),p[C].add(S))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let X=0,D=L.length;X<D;++X){const C=L[X],V=C.start,rt=C.count;for(let nt=V,ft=V+rt;nt<ft;nt+=3)v(t.getX(nt+0),t.getX(nt+1),t.getX(nt+2))}const U=new J,w=new J,B=new J,H=new J;function N(X){B.fromBufferAttribute(l,X),H.copy(B);const D=d[X];U.copy(D),U.sub(B.multiplyScalar(B.dot(D))).normalize(),w.crossVectors(H,D);const V=w.dot(p[X])<0?-1:1;f.setXYZW(X,U.x,U.y,U.z,V)}for(let X=0,D=L.length;X<D;++X){const C=L[X],V=C.start,rt=C.count;for(let nt=V,ft=V+rt;nt<ft;nt+=3)N(t.getX(nt+0)),N(t.getX(nt+1)),N(t.getX(nt+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Gi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let y=0,M=r.count;y<M;y++)r.setXYZ(y,0,0,0);const l=new J,c=new J,f=new J,d=new J,p=new J,m=new J,g=new J,_=new J;if(t)for(let y=0,M=t.count;y<M;y+=3){const E=t.getX(y+0),T=t.getX(y+1),S=t.getX(y+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,T),f.fromBufferAttribute(i,S),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,T),m.fromBufferAttribute(r,S),d.add(g),p.add(g),m.add(g),r.setXYZ(E,d.x,d.y,d.z),r.setXYZ(T,p.x,p.y,p.z),r.setXYZ(S,m.x,m.y,m.z)}else for(let y=0,M=i.count;y<M;y+=3)l.fromBufferAttribute(i,y+0),c.fromBufferAttribute(i,y+1),f.fromBufferAttribute(i,y+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),r.setXYZ(y+0,g.x,g.y,g.z),r.setXYZ(y+1,g.x,g.y,g.z),r.setXYZ(y+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)yn.fromBufferAttribute(t,i),yn.normalize(),t.setXYZ(i,yn.x,yn.y,yn.z)}toNonIndexed(){function t(d,p){const m=d.array,g=d.itemSize,_=d.normalized,y=new m.constructor(p.length*g);let M=0,E=0;for(let T=0,S=p.length;T<S;T++){d.isInterleavedBufferAttribute?M=p[T]*d.data.stride+d.offset:M=p[T]*g;for(let v=0;v<g;v++)y[E++]=m[M++]}return new Gi(y,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Xi,r=this.index.array,l=this.attributes;for(const d in l){const p=l[d],m=t(p,r);i.setAttribute(d,m)}const c=this.morphAttributes;for(const d in c){const p=[],m=c[d];for(let g=0,_=m.length;g<_;g++){const y=m[g],M=t(y,r);p.push(M)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,p=f.length;d<p;d++){const m=f[d];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const p in r){const m=r[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let _=0,y=m.length;_<y;_++){const M=m[_];g.push(M.toJSON(t.data))}g.length>0&&(l[p]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone());const l=t.attributes;for(const m in l){const g=l[m];this.setAttribute(m,g.clone(i))}const c=t.morphAttributes;for(const m in c){const g=[],_=c[m];for(let y=0,M=_.length;y<M;y++)g.push(_[y].clone(i));this.morphAttributes[m]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let m=0,g=f.length;m<g;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wv=new Ke,Mr=new Mp,Uc=new _u,qv=new J,Lc=new J,Nc=new J,Oc=new J,id=new J,Pc=new J,Yv=new J,zc=new J;class Di extends Rn{constructor(t=new Xi,i=new by){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,f=r.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Pc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const g=d[p],_=c[p];g!==0&&(id.fromBufferAttribute(_,t),f?Pc.addScaledVector(id,g):Pc.addScaledVector(id.sub(i),g))}i.add(Pc)}return i}raycast(t,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Uc.copy(r.boundingSphere),Uc.applyMatrix4(c),Mr.copy(t.ray).recast(t.near),!(Uc.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(Uc,qv)===null||Mr.origin.distanceToSquared(qv)>(t.far-t.near)**2))&&(Wv.copy(c).invert(),Mr.copy(t.ray).applyMatrix4(Wv),!(r.boundingBox!==null&&Mr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,i,Mr)))}_computeIntersections(t,i,r){let l;const c=this.geometry,f=this.material,d=c.index,p=c.attributes.position,m=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,y=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(f))for(let E=0,T=y.length;E<T;E++){const S=y[E],v=f[S.materialIndex],L=Math.max(S.start,M.start),U=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let w=L,B=U;w<B;w+=3){const H=d.getX(w),N=d.getX(w+1),X=d.getX(w+2);l=Ic(this,v,t,r,m,g,_,H,N,X),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(d.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const L=d.getX(S),U=d.getX(S+1),w=d.getX(S+2);l=Ic(this,f,t,r,m,g,_,L,U,w),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let E=0,T=y.length;E<T;E++){const S=y[E],v=f[S.materialIndex],L=Math.max(S.start,M.start),U=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let w=L,B=U;w<B;w+=3){const H=w,N=w+1,X=w+2;l=Ic(this,v,t,r,m,g,_,H,N,X),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),T=Math.min(p.count,M.start+M.count);for(let S=E,v=T;S<v;S+=3){const L=S,U=S+1,w=S+2;l=Ic(this,f,t,r,m,g,_,L,U,w),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function Rb(s,t,i,r,l,c,f,d){let p;if(t.side===qn?p=r.intersectTriangle(f,c,l,!0,d):p=r.intersectTriangle(l,c,f,t.side===$a,d),p===null)return null;zc.copy(d),zc.applyMatrix4(s.matrixWorld);const m=i.ray.origin.distanceTo(zc);return m<i.near||m>i.far?null:{distance:m,point:zc.clone(),object:s}}function Ic(s,t,i,r,l,c,f,d,p,m){s.getVertexPosition(d,Lc),s.getVertexPosition(p,Nc),s.getVertexPosition(m,Oc);const g=Rb(s,t,i,r,Lc,Nc,Oc,Yv);if(g){const _=new J;Ci.getBarycoord(Yv,Lc,Nc,Oc,_),l&&(g.uv=Ci.getInterpolatedAttribute(l,d,p,m,_,new ce)),c&&(g.uv1=Ci.getInterpolatedAttribute(c,d,p,m,_,new ce)),f&&(g.normal=Ci.getInterpolatedAttribute(f,d,p,m,_,new J),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const y={a:d,b:p,c:m,normal:new J,materialIndex:0};Ci.getNormal(Lc,Nc,Oc,y.normal),g.face=y,g.barycoord=_}return g}class cl extends Xi{constructor(t=1,i=1,r=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],g=[],_=[];let y=0,M=0;E("z","y","x",-1,-1,r,i,t,f,c,0),E("z","y","x",1,-1,r,i,-t,f,c,1),E("x","z","y",1,1,t,r,i,l,f,2),E("x","z","y",1,-1,t,r,-i,l,f,3),E("x","y","z",1,-1,t,i,r,l,c,4),E("x","y","z",-1,-1,t,i,-r,l,c,5),this.setIndex(p),this.setAttribute("position",new Zn(m,3)),this.setAttribute("normal",new Zn(g,3)),this.setAttribute("uv",new Zn(_,2));function E(T,S,v,L,U,w,B,H,N,X,D){const C=w/N,V=B/X,rt=w/2,nt=B/2,ft=H/2,ut=N+1,z=X+1;let Q=0,K=0;const Mt=new J;for(let Ct=0;Ct<z;Ct++){const O=Ct*V-nt;for(let st=0;st<ut;st++){const St=st*C-rt;Mt[T]=St*L,Mt[S]=O*U,Mt[v]=ft,m.push(Mt.x,Mt.y,Mt.z),Mt[T]=0,Mt[S]=0,Mt[v]=H>0?1:-1,g.push(Mt.x,Mt.y,Mt.z),_.push(st/N),_.push(1-Ct/X),Q+=1}}for(let Ct=0;Ct<X;Ct++)for(let O=0;O<N;O++){const st=y+O+ut*Ct,St=y+O+ut*(Ct+1),Z=y+(O+1)+ut*(Ct+1),pt=y+(O+1)+ut*Ct;p.push(st,St,pt),p.push(St,Z,pt),K+=6}d.addGroup(M,K,D),M+=K,y+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Gs(s){const t={};for(const i in s){t[i]={};for(const r in s[i]){const l=s[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=l.clone():Array.isArray(l)?t[i][r]=l.slice():t[i][r]=l}}return t}function Pn(s){const t={};for(let i=0;i<s.length;i++){const r=Gs(s[i]);for(const l in r)t[l]=r[l]}return t}function Cb(s){const t=[];for(let i=0;i<s.length;i++)t.push(s[i].clone());return t}function Cy(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:De.workingColorSpace}const wb={clone:Gs,merge:Pn};var Db=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ub=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tr extends js{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Db,this.fragmentShader=Ub,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gs(t.uniforms),this.uniformsGroups=Cb(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class wy extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=_a}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ya=new J,Zv=new ce,Kv=new ce;class _i extends wy{constructor(t=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=ip*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($c*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ip*2*Math.atan(Math.tan($c*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,r){Ya.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ya.x,Ya.y).multiplyScalar(-t/Ya.z),Ya.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Ya.x,Ya.y).multiplyScalar(-t/Ya.z)}getViewSize(t,i){return this.getViewBounds(t,Zv,Kv),i.subVectors(Kv,Zv)}setViewOffset(t,i,r,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan($c*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,i-=f.offsetY*r/m,l*=f.width/p,r*=f.height/m}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const As=-90,Rs=1;class Lb extends Rn{constructor(t,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new _i(As,Rs,t,i);l.layers=this.layers,this.add(l);const c=new _i(As,Rs,t,i);c.layers=this.layers,this.add(c);const f=new _i(As,Rs,t,i);f.layers=this.layers,this.add(f);const d=new _i(As,Rs,t,i);d.layers=this.layers,this.add(d);const p=new _i(As,Rs,t,i);p.layers=this.layers,this.add(p);const m=new _i(As,Rs,t,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[r,l,c,f,d,p]=i;for(const m of i)this.remove(m);if(t===_a)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===ru)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of i)this.add(m),m.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,p,m,g]=this.children,_=t.getRenderTarget(),y=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const T=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,t.setRenderTarget(r,0,l),t.render(i,c),t.setRenderTarget(r,1,l),t.render(i,f),t.setRenderTarget(r,2,l),t.render(i,d),t.setRenderTarget(r,3,l),t.render(i,p),t.setRenderTarget(r,4,l),t.render(i,m),r.texture.generateMipmaps=T,t.setRenderTarget(r,5,l),t.render(i,g),t.setRenderTarget(_,y,M),t.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Dy extends Yn{constructor(t=[],i=Bs,r,l,c,f,d,p,m,g){super(t,i,r,l,c,f,d,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nb extends Or{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},l=[r,r,r,r,r,r];this.texture=new Dy(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new cl(5,5,5),c=new tr({name:"CubemapFromEquirect",uniforms:Gs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:qn,blending:Qa});c.uniforms.tEquirect.value=i;const f=new Di(l,c),d=i.minFilter;return i.minFilter===Ur&&(i.minFilter=Hi),new Lb(1,10,this).update(t,f),i.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,r=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,r,l);t.setRenderTarget(c)}}class Zo extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ob={type:"move"};class ad{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const r of t.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,r){let l=null,c=null,f=null;const d=this._targetRay,p=this._grip,m=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(m&&t.hand){f=!0;for(const T of t.hand.values()){const S=i.getJointPose(T,r),v=this._getHandJoint(m,T);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],y=g.position.distanceTo(_.position),M=.02,E=.005;m.inputState.pinching&&y>M+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&y<=M-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,r),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(Ob)))}return d!==null&&(d.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const r=new Zo;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[i.jointName]=r,t.add(r)}return t.joints[i.jointName]}}class Pb extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const rd=new J,zb=new J,Ib=new fe;class Za{constructor(t=new J(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,r,l){return this.normal.set(t,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,r){const l=rd.subVectors(r,i).cross(zb.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const r=t.delta(rd),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(r,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return i<0&&r>0||r<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const r=i||Ib.getNormalMatrix(t),l=this.coplanarPoint(rd).applyMatrix4(t),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Er=new _u,Bc=new J;class Ep{constructor(t=new Za,i=new Za,r=new Za,l=new Za,c=new Za,f=new Za){this.planes=[t,i,r,l,c,f]}set(t,i,r,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,i=_a){const r=this.planes,l=t.elements,c=l[0],f=l[1],d=l[2],p=l[3],m=l[4],g=l[5],_=l[6],y=l[7],M=l[8],E=l[9],T=l[10],S=l[11],v=l[12],L=l[13],U=l[14],w=l[15];if(r[0].setComponents(p-c,y-m,S-M,w-v).normalize(),r[1].setComponents(p+c,y+m,S+M,w+v).normalize(),r[2].setComponents(p+f,y+g,S+E,w+L).normalize(),r[3].setComponents(p-f,y-g,S-E,w-L).normalize(),r[4].setComponents(p-d,y-_,S-T,w-U).normalize(),i===_a)r[5].setComponents(p+d,y+_,S+T,w+U).normalize();else if(i===ru)r[5].setComponents(d,_,T,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Er.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Er.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Er)}intersectsSprite(t){return Er.center.set(0,0,0),Er.radius=.7071067811865476,Er.applyMatrix4(t.matrixWorld),this.intersectsSphere(Er)}intersectsSphere(t){const i=this.planes,r=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Bc.x=l.normal.x>0?t.max.x:t.min.x,Bc.y=l.normal.y>0?t.max.y:t.min.y,Bc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Bc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Uy extends js{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ou=new J,lu=new J,Qv=new Ke,Yo=new Mp,Fc=new _u,sd=new J,Jv=new J;class Bb extends Rn{constructor(t=new Xi,i=new Uy){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,r=[0];for(let l=1,c=i.count;l<c;l++)ou.fromBufferAttribute(i,l-1),lu.fromBufferAttribute(i,l),r[l]=r[l-1],r[l]+=ou.distanceTo(lu);t.setAttribute("lineDistance",new Zn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const r=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Fc.copy(r.boundingSphere),Fc.applyMatrix4(l),Fc.radius+=c,t.ray.intersectsSphere(Fc)===!1)return;Qv.copy(l).invert(),Yo.copy(t.ray).applyMatrix4(Qv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=d*d,m=this.isLineSegments?2:1,g=r.index,y=r.attributes.position;if(g!==null){const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const v=g.getX(T),L=g.getX(T+1),U=Hc(this,t,Yo,p,v,L,T);U&&i.push(U)}if(this.isLineLoop){const T=g.getX(E-1),S=g.getX(M),v=Hc(this,t,Yo,p,T,S,E-1);v&&i.push(v)}}else{const M=Math.max(0,f.start),E=Math.min(y.count,f.start+f.count);for(let T=M,S=E-1;T<S;T+=m){const v=Hc(this,t,Yo,p,T,T+1,T);v&&i.push(v)}if(this.isLineLoop){const T=Hc(this,t,Yo,p,E-1,M,E-1);T&&i.push(T)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Hc(s,t,i,r,l,c,f){const d=s.geometry.attributes.position;if(ou.fromBufferAttribute(d,l),lu.fromBufferAttribute(d,c),i.distanceSqToSegment(ou,lu,sd,Jv)>r)return;sd.applyMatrix4(s.matrixWorld);const m=t.ray.origin.distanceTo(sd);if(!(m<t.near||m>t.far))return{distance:m,point:Jv.clone().applyMatrix4(s.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:s}}const $v=new J,t0=new J;class Fb extends Bb{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,r=[];for(let l=0,c=i.count;l<c;l+=2)$v.fromBufferAttribute(i,l),t0.fromBufferAttribute(i,l+1),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+$v.distanceTo(t0);t.setAttribute("lineDistance",new Zn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ly extends Yn{constructor(t,i,r=Lr,l,c,f,d=Li,p=Li,m,g=nl,_=1){if(g!==nl&&g!==il)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const y={width:t,height:i,depth:_};super(y,l,c,f,d,p,g,r,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Qo extends Xi{constructor(t=1,i=1,r=1,l=32,c=1,f=!1,d=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:r,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:p};const m=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],y=[],M=[];let E=0;const T=[],S=r/2;let v=0;L(),f===!1&&(t>0&&U(!0),i>0&&U(!1)),this.setIndex(g),this.setAttribute("position",new Zn(_,3)),this.setAttribute("normal",new Zn(y,3)),this.setAttribute("uv",new Zn(M,2));function L(){const w=new J,B=new J;let H=0;const N=(i-t)/r;for(let X=0;X<=c;X++){const D=[],C=X/c,V=C*(i-t)+t;for(let rt=0;rt<=l;rt++){const nt=rt/l,ft=nt*p+d,ut=Math.sin(ft),z=Math.cos(ft);B.x=V*ut,B.y=-C*r+S,B.z=V*z,_.push(B.x,B.y,B.z),w.set(ut,N,z).normalize(),y.push(w.x,w.y,w.z),M.push(nt,1-C),D.push(E++)}T.push(D)}for(let X=0;X<l;X++)for(let D=0;D<c;D++){const C=T[D][X],V=T[D+1][X],rt=T[D+1][X+1],nt=T[D][X+1];(t>0||D!==0)&&(g.push(C,V,nt),H+=3),(i>0||D!==c-1)&&(g.push(V,rt,nt),H+=3)}m.addGroup(v,H,0),v+=H}function U(w){const B=E,H=new ce,N=new J;let X=0;const D=w===!0?t:i,C=w===!0?1:-1;for(let rt=1;rt<=l;rt++)_.push(0,S*C,0),y.push(0,C,0),M.push(.5,.5),E++;const V=E;for(let rt=0;rt<=l;rt++){const ft=rt/l*p+d,ut=Math.cos(ft),z=Math.sin(ft);N.x=D*z,N.y=S*C,N.z=D*ut,_.push(N.x,N.y,N.z),y.push(0,C,0),H.x=ut*.5+.5,H.y=z*.5*C+.5,M.push(H.x,H.y),E++}for(let rt=0;rt<l;rt++){const nt=B+rt,ft=V+rt;w===!0?g.push(ft,ft+1,nt):g.push(ft+1,ft,nt),X+=3}m.addGroup(v,X,w===!0?1:2),v+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qo(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vu extends Xi{constructor(t=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:l};const c=t/2,f=i/2,d=Math.floor(r),p=Math.floor(l),m=d+1,g=p+1,_=t/d,y=i/p,M=[],E=[],T=[],S=[];for(let v=0;v<g;v++){const L=v*y-f;for(let U=0;U<m;U++){const w=U*_-c;E.push(w,-L,0),T.push(0,0,1),S.push(U/d),S.push(1-v/p)}}for(let v=0;v<p;v++)for(let L=0;L<d;L++){const U=L+m*v,w=L+m*(v+1),B=L+1+m*(v+1),H=L+1+m*v;M.push(U,w,H),M.push(w,B,H)}this.setIndex(M),this.setAttribute("position",new Zn(E,3)),this.setAttribute("normal",new Zn(T,3)),this.setAttribute("uv",new Zn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vu(t.width,t.height,t.widthSegments,t.heightSegments)}}class e0 extends js{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yy,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hb extends js{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ZT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gb extends js{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ny extends Rn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}const od=new Ke,n0=new J,i0=new J;class Vb{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=Vi,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ep,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new en(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,r=this.matrix;n0.setFromMatrixPosition(t.matrixWorld),i.position.copy(n0),i0.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(i0),i.updateMatrixWorld(),od.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(od),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(od)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Oy extends wy{constructor(t=-1,i=1,r=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,r,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-t,f=r+t,d=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,d-=g*this.view.offsetY,p=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class kb extends Vb{constructor(){super(new Oy(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xb extends Ny{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rn.DEFAULT_UP),this.updateMatrix(),this.target=new Rn,this.shadow=new kb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class jb extends Ny{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}class Wb extends _i{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class qb{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=a0(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=a0();t=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=t}return t}}function a0(){return performance.now()}class r0{constructor(t=1,i=0,r=0){this.radius=t,this.phi=i,this.theta=r}set(t,i,r){return this.radius=t,this.phi=i,this.theta=r,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,r){return this.radius=Math.sqrt(t*t+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,r),this.phi=Math.acos(ge(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Yb extends Fb{constructor(t=10,i=10,r=4473924,l=8947848){r=new Me(r),l=new Me(l);const c=i/2,f=t/i,d=t/2,p=[],m=[];for(let y=0,M=0,E=-d;y<=i;y++,E+=f){p.push(-d,0,E,d,0,E),p.push(E,0,-d,E,0,d);const T=y===c?r:l;T.toArray(m,M),M+=3,T.toArray(m,M),M+=3,T.toArray(m,M),M+=3,T.toArray(m,M),M+=3}const g=new Xi;g.setAttribute("position",new Zn(p,3)),g.setAttribute("color",new Zn(m,3));const _=new Uy({vertexColors:!0,toneMapped:!1});super(g,_),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Zb extends Pr{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function s0(s,t,i,r){const l=Kb(r);switch(i){case py:return s*t;case gy:return s*t/l.components*l.byteLength;case vp:return s*t/l.components*l.byteLength;case _y:return s*t*2/l.components*l.byteLength;case yp:return s*t*2/l.components*l.byteLength;case my:return s*t*3/l.components*l.byteLength;case wi:return s*t*4/l.components*l.byteLength;case xp:return s*t*4/l.components*l.byteLength;case Yc:case Zc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Kc:case Qc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ld:case Od:return Math.max(s,16)*Math.max(t,8)/4;case Ud:case Nd:return Math.max(s,8)*Math.max(t,8)/2;case Pd:case zd:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Id:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Bd:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Fd:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Hd:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Gd:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Vd:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case kd:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Xd:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case jd:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Wd:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case qd:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Zd:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Kd:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Qd:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Jc:case Jd:case $d:return Math.ceil(s/4)*Math.ceil(t/4)*16;case vy:case tp:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ep:case np:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Kb(s){switch(s){case Vi:case fy:return{byteLength:1,components:1};case tl:case hy:case sl:return{byteLength:2,components:1};case gp:case _p:return{byteLength:2,components:4};case Lr:case mp:case ga:return{byteLength:4,components:1};case dy:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Py(){let s=null,t=!1,i=null,r=null;function l(c,f){i(c,f),r=s.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(r=s.requestAnimationFrame(l),t=!0)},stop:function(){s.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function Qb(s){const t=new WeakMap;function i(d,p){const m=d.array,g=d.usage,_=m.byteLength,y=s.createBuffer();s.bindBuffer(p,y),s.bufferData(p,m,g),d.onUploadCallback();let M;if(m instanceof Float32Array)M=s.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=s.SHORT;else if(m instanceof Uint32Array)M=s.UNSIGNED_INT;else if(m instanceof Int32Array)M=s.INT;else if(m instanceof Int8Array)M=s.BYTE;else if(m instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:y,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:_}}function r(d,p,m){const g=p.array,_=p.updateRanges;if(s.bindBuffer(m,d),_.length===0)s.bufferSubData(m,0,g);else{_.sort((M,E)=>M.start-E.start);let y=0;for(let M=1;M<_.length;M++){const E=_[y],T=_[M];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++y,_[y]=T)}_.length=y+1;for(let M=0,E=_.length;M<E;M++){const T=_[M];s.bufferSubData(m,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=t.get(d);p&&(s.deleteBuffer(p.buffer),t.delete(d))}function f(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=t.get(d);if(m===void 0)t.set(d,i(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,d,p),m.version=d.version}}return{get:l,remove:c,update:f}}var Jb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$b=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,t1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,e1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,a1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,r1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,s1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,o1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,l1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,c1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,f1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,h1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,d1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,p1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,v1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,y1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,x1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,S1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,M1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,E1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,T1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,b1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,A1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,R1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,C1="gl_FragColor = linearToOutputTexel( gl_FragColor );",w1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,D1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,U1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,L1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,N1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,P1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,z1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,B1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,H1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,G1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,V1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,X1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,j1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,W1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,q1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Y1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Z1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,K1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Q1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,J1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tA=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,eA=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nA=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iA=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,aA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,oA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,pA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_A=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,SA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,MA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,EA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,TA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,AA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,RA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,CA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,DA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,UA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,LA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,NA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,OA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,PA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,BA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,FA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,HA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,GA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,VA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,XA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,WA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ZA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,KA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const QA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,JA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$A=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,aR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,rR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,oR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_R=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,MR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ER=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,AR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,DR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,he={alphahash_fragment:Jb,alphahash_pars_fragment:$b,alphamap_fragment:t1,alphamap_pars_fragment:e1,alphatest_fragment:n1,alphatest_pars_fragment:i1,aomap_fragment:a1,aomap_pars_fragment:r1,batching_pars_vertex:s1,batching_vertex:o1,begin_vertex:l1,beginnormal_vertex:c1,bsdfs:u1,iridescence_fragment:f1,bumpmap_pars_fragment:h1,clipping_planes_fragment:d1,clipping_planes_pars_fragment:p1,clipping_planes_pars_vertex:m1,clipping_planes_vertex:g1,color_fragment:_1,color_pars_fragment:v1,color_pars_vertex:y1,color_vertex:x1,common:S1,cube_uv_reflection_fragment:M1,defaultnormal_vertex:E1,displacementmap_pars_vertex:T1,displacementmap_vertex:b1,emissivemap_fragment:A1,emissivemap_pars_fragment:R1,colorspace_fragment:C1,colorspace_pars_fragment:w1,envmap_fragment:D1,envmap_common_pars_fragment:U1,envmap_pars_fragment:L1,envmap_pars_vertex:N1,envmap_physical_pars_fragment:X1,envmap_vertex:O1,fog_vertex:P1,fog_pars_vertex:z1,fog_fragment:I1,fog_pars_fragment:B1,gradientmap_pars_fragment:F1,lightmap_pars_fragment:H1,lights_lambert_fragment:G1,lights_lambert_pars_fragment:V1,lights_pars_begin:k1,lights_toon_fragment:j1,lights_toon_pars_fragment:W1,lights_phong_fragment:q1,lights_phong_pars_fragment:Y1,lights_physical_fragment:Z1,lights_physical_pars_fragment:K1,lights_fragment_begin:Q1,lights_fragment_maps:J1,lights_fragment_end:$1,logdepthbuf_fragment:tA,logdepthbuf_pars_fragment:eA,logdepthbuf_pars_vertex:nA,logdepthbuf_vertex:iA,map_fragment:aA,map_pars_fragment:rA,map_particle_fragment:sA,map_particle_pars_fragment:oA,metalnessmap_fragment:lA,metalnessmap_pars_fragment:cA,morphinstance_vertex:uA,morphcolor_vertex:fA,morphnormal_vertex:hA,morphtarget_pars_vertex:dA,morphtarget_vertex:pA,normal_fragment_begin:mA,normal_fragment_maps:gA,normal_pars_fragment:_A,normal_pars_vertex:vA,normal_vertex:yA,normalmap_pars_fragment:xA,clearcoat_normal_fragment_begin:SA,clearcoat_normal_fragment_maps:MA,clearcoat_pars_fragment:EA,iridescence_pars_fragment:TA,opaque_fragment:bA,packing:AA,premultiplied_alpha_fragment:RA,project_vertex:CA,dithering_fragment:wA,dithering_pars_fragment:DA,roughnessmap_fragment:UA,roughnessmap_pars_fragment:LA,shadowmap_pars_fragment:NA,shadowmap_pars_vertex:OA,shadowmap_vertex:PA,shadowmask_pars_fragment:zA,skinbase_vertex:IA,skinning_pars_vertex:BA,skinning_vertex:FA,skinnormal_vertex:HA,specularmap_fragment:GA,specularmap_pars_fragment:VA,tonemapping_fragment:kA,tonemapping_pars_fragment:XA,transmission_fragment:jA,transmission_pars_fragment:WA,uv_pars_fragment:qA,uv_pars_vertex:YA,uv_vertex:ZA,worldpos_vertex:KA,background_vert:QA,background_frag:JA,backgroundCube_vert:$A,backgroundCube_frag:tR,cube_vert:eR,cube_frag:nR,depth_vert:iR,depth_frag:aR,distanceRGBA_vert:rR,distanceRGBA_frag:sR,equirect_vert:oR,equirect_frag:lR,linedashed_vert:cR,linedashed_frag:uR,meshbasic_vert:fR,meshbasic_frag:hR,meshlambert_vert:dR,meshlambert_frag:pR,meshmatcap_vert:mR,meshmatcap_frag:gR,meshnormal_vert:_R,meshnormal_frag:vR,meshphong_vert:yR,meshphong_frag:xR,meshphysical_vert:SR,meshphysical_frag:MR,meshtoon_vert:ER,meshtoon_frag:TR,points_vert:bR,points_frag:AR,shadow_vert:RR,shadow_frag:CR,sprite_vert:wR,sprite_frag:DR},Ot={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fe}},envmap:{envMap:{value:null},envMapRotation:{value:new fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fe},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0},uvTransform:{value:new fe}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fe},alphaMap:{value:null},alphaMapTransform:{value:new fe},alphaTest:{value:0}}},Fi={basic:{uniforms:Pn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:Pn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Me(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:Pn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:Pn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:Pn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Me(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:Pn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:Pn([Ot.points,Ot.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:Pn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:Pn([Ot.common,Ot.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:Pn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:Pn([Ot.sprite,Ot.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new fe}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:Pn([Ot.common,Ot.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:Pn([Ot.lights,Ot.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};Fi.physical={uniforms:Pn([Fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fe},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fe},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fe},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fe},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fe},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fe}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};const Gc={r:0,b:0,g:0},Tr=new ki,UR=new Ke;function LR(s,t,i,r,l,c,f){const d=new Me(0);let p=c===!0?0:1,m,g,_=null,y=0,M=null;function E(U){let w=U.isScene===!0?U.background:null;return w&&w.isTexture&&(w=(U.backgroundBlurriness>0?i:t).get(w)),w}function T(U){let w=!1;const B=E(U);B===null?v(d,p):B&&B.isColor&&(v(B,1),w=!0);const H=s.xr.getEnvironmentBlendMode();H==="additive"?r.buffers.color.setClear(0,0,0,1,f):H==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(s.autoClear||w)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function S(U,w){const B=E(w);B&&(B.isCubeTexture||B.mapping===gu)?(g===void 0&&(g=new Di(new cl(1,1,1),new tr({name:"BackgroundCubeMaterial",uniforms:Gs(Fi.backgroundCube.uniforms),vertexShader:Fi.backgroundCube.vertexShader,fragmentShader:Fi.backgroundCube.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(H,N,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),Tr.copy(w.backgroundRotation),Tr.x*=-1,Tr.y*=-1,Tr.z*=-1,B.isCubeTexture&&B.isRenderTargetTexture===!1&&(Tr.y*=-1,Tr.z*=-1),g.material.uniforms.envMap.value=B,g.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(UR.makeRotationFromEuler(Tr)),g.material.toneMapped=De.getTransfer(B.colorSpace)!==Ve,(_!==B||y!==B.version||M!==s.toneMapping)&&(g.material.needsUpdate=!0,_=B,y=B.version,M=s.toneMapping),g.layers.enableAll(),U.unshift(g,g.geometry,g.material,0,0,null)):B&&B.isTexture&&(m===void 0&&(m=new Di(new vu(2,2),new tr({name:"BackgroundMaterial",uniforms:Gs(Fi.background.uniforms),vertexShader:Fi.background.vertexShader,fragmentShader:Fi.background.fragmentShader,side:$a,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=B,m.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,m.material.toneMapped=De.getTransfer(B.colorSpace)!==Ve,B.matrixAutoUpdate===!0&&B.updateMatrix(),m.material.uniforms.uvTransform.value.copy(B.matrix),(_!==B||y!==B.version||M!==s.toneMapping)&&(m.material.needsUpdate=!0,_=B,y=B.version,M=s.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function v(U,w){U.getRGB(Gc,Cy(s)),r.buffers.color.setClear(Gc.r,Gc.g,Gc.b,w,f)}function L(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return d},setClearColor:function(U,w=1){d.set(U),p=w,v(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(U){p=U,v(d,p)},render:T,addToRenderList:S,dispose:L}}function NR(s,t){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=y(null);let c=l,f=!1;function d(C,V,rt,nt,ft){let ut=!1;const z=_(nt,rt,V);c!==z&&(c=z,m(c.object)),ut=M(C,nt,rt,ft),ut&&E(C,nt,rt,ft),ft!==null&&t.update(ft,s.ELEMENT_ARRAY_BUFFER),(ut||f)&&(f=!1,w(C,V,rt,nt),ft!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ft).buffer))}function p(){return s.createVertexArray()}function m(C){return s.bindVertexArray(C)}function g(C){return s.deleteVertexArray(C)}function _(C,V,rt){const nt=rt.wireframe===!0;let ft=r[C.id];ft===void 0&&(ft={},r[C.id]=ft);let ut=ft[V.id];ut===void 0&&(ut={},ft[V.id]=ut);let z=ut[nt];return z===void 0&&(z=y(p()),ut[nt]=z),z}function y(C){const V=[],rt=[],nt=[];for(let ft=0;ft<i;ft++)V[ft]=0,rt[ft]=0,nt[ft]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:rt,attributeDivisors:nt,object:C,attributes:{},index:null}}function M(C,V,rt,nt){const ft=c.attributes,ut=V.attributes;let z=0;const Q=rt.getAttributes();for(const K in Q)if(Q[K].location>=0){const Ct=ft[K];let O=ut[K];if(O===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(O=C.instanceColor)),Ct===void 0||Ct.attribute!==O||O&&Ct.data!==O.data)return!0;z++}return c.attributesNum!==z||c.index!==nt}function E(C,V,rt,nt){const ft={},ut=V.attributes;let z=0;const Q=rt.getAttributes();for(const K in Q)if(Q[K].location>=0){let Ct=ut[K];Ct===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(Ct=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(Ct=C.instanceColor));const O={};O.attribute=Ct,Ct&&Ct.data&&(O.data=Ct.data),ft[K]=O,z++}c.attributes=ft,c.attributesNum=z,c.index=nt}function T(){const C=c.newAttributes;for(let V=0,rt=C.length;V<rt;V++)C[V]=0}function S(C){v(C,0)}function v(C,V){const rt=c.newAttributes,nt=c.enabledAttributes,ft=c.attributeDivisors;rt[C]=1,nt[C]===0&&(s.enableVertexAttribArray(C),nt[C]=1),ft[C]!==V&&(s.vertexAttribDivisor(C,V),ft[C]=V)}function L(){const C=c.newAttributes,V=c.enabledAttributes;for(let rt=0,nt=V.length;rt<nt;rt++)V[rt]!==C[rt]&&(s.disableVertexAttribArray(rt),V[rt]=0)}function U(C,V,rt,nt,ft,ut,z){z===!0?s.vertexAttribIPointer(C,V,rt,ft,ut):s.vertexAttribPointer(C,V,rt,nt,ft,ut)}function w(C,V,rt,nt){T();const ft=nt.attributes,ut=rt.getAttributes(),z=V.defaultAttributeValues;for(const Q in ut){const K=ut[Q];if(K.location>=0){let Mt=ft[Q];if(Mt===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(Mt=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(Mt=C.instanceColor)),Mt!==void 0){const Ct=Mt.normalized,O=Mt.itemSize,st=t.get(Mt);if(st===void 0)continue;const St=st.buffer,Z=st.type,pt=st.bytesPerElement,At=Z===s.INT||Z===s.UNSIGNED_INT||Mt.gpuType===mp;if(Mt.isInterleavedBufferAttribute){const Et=Mt.data,zt=Et.stride,Jt=Mt.offset;if(Et.isInstancedInterleavedBuffer){for(let $t=0;$t<K.locationSize;$t++)v(K.location+$t,Et.meshPerAttribute);C.isInstancedMesh!==!0&&nt._maxInstanceCount===void 0&&(nt._maxInstanceCount=Et.meshPerAttribute*Et.count)}else for(let $t=0;$t<K.locationSize;$t++)S(K.location+$t);s.bindBuffer(s.ARRAY_BUFFER,St);for(let $t=0;$t<K.locationSize;$t++)U(K.location+$t,O/K.locationSize,Z,Ct,zt*pt,(Jt+O/K.locationSize*$t)*pt,At)}else{if(Mt.isInstancedBufferAttribute){for(let Et=0;Et<K.locationSize;Et++)v(K.location+Et,Mt.meshPerAttribute);C.isInstancedMesh!==!0&&nt._maxInstanceCount===void 0&&(nt._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Et=0;Et<K.locationSize;Et++)S(K.location+Et);s.bindBuffer(s.ARRAY_BUFFER,St);for(let Et=0;Et<K.locationSize;Et++)U(K.location+Et,O/K.locationSize,Z,Ct,O*pt,O/K.locationSize*Et*pt,At)}}else if(z!==void 0){const Ct=z[Q];if(Ct!==void 0)switch(Ct.length){case 2:s.vertexAttrib2fv(K.location,Ct);break;case 3:s.vertexAttrib3fv(K.location,Ct);break;case 4:s.vertexAttrib4fv(K.location,Ct);break;default:s.vertexAttrib1fv(K.location,Ct)}}}}L()}function B(){X();for(const C in r){const V=r[C];for(const rt in V){const nt=V[rt];for(const ft in nt)g(nt[ft].object),delete nt[ft];delete V[rt]}delete r[C]}}function H(C){if(r[C.id]===void 0)return;const V=r[C.id];for(const rt in V){const nt=V[rt];for(const ft in nt)g(nt[ft].object),delete nt[ft];delete V[rt]}delete r[C.id]}function N(C){for(const V in r){const rt=r[V];if(rt[C.id]===void 0)continue;const nt=rt[C.id];for(const ft in nt)g(nt[ft].object),delete nt[ft];delete rt[C.id]}}function X(){D(),f=!0,c!==l&&(c=l,m(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:X,resetDefaultState:D,dispose:B,releaseStatesOfGeometry:H,releaseStatesOfProgram:N,initAttributes:T,enableAttribute:S,disableUnusedAttributes:L}}function OR(s,t,i){let r;function l(m){r=m}function c(m,g){s.drawArrays(r,m,g),i.update(g,r,1)}function f(m,g,_){_!==0&&(s.drawArraysInstanced(r,m,g,_),i.update(g,r,_))}function d(m,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];i.update(M,r,1)}function p(m,g,_,y){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<m.length;E++)f(m[E],g[E],y[E]);else{M.multiDrawArraysInstancedWEBGL(r,m,0,g,0,y,0,_);let E=0;for(let T=0;T<_;T++)E+=g[T]*y[T];i.update(E,r,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function PR(s,t,i,r){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const N=t.get("EXT_texture_filter_anisotropic");l=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(N){return!(N!==wi&&r.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(N){const X=N===sl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==Vi&&r.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==ga&&!X)}function p(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const g=p(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=i.logarithmicDepthBuffer===!0,y=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=s.getParameter(s.MAX_TEXTURE_SIZE),S=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),L=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),U=s.getParameter(s.MAX_VARYING_VECTORS),w=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),B=E>0,H=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:y,maxTextures:M,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:S,maxAttributes:v,maxVertexUniforms:L,maxVaryings:U,maxFragmentUniforms:w,vertexTextures:B,maxSamples:H}}function zR(s){const t=this;let i=null,r=0,l=!1,c=!1;const f=new Za,d=new fe,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,y){const M=_.length!==0||y||r!==0||l;return l=y,r=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,y){i=g(_,y,0)},this.setState=function(_,y,M){const E=_.clippingPlanes,T=_.clipIntersection,S=_.clipShadows,v=s.get(_);if(!l||E===null||E.length===0||c&&!S)c?g(null):m();else{const L=c?0:r,U=L*4;let w=v.clippingState||null;p.value=w,w=g(E,y,U,M);for(let B=0;B!==U;++B)w[B]=i[B];v.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=L}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function g(_,y,M,E){const T=_!==null?_.length:0;let S=null;if(T!==0){if(S=p.value,E!==!0||S===null){const v=M+T*4,L=y.matrixWorldInverse;d.getNormalMatrix(L),(S===null||S.length<v)&&(S=new Float32Array(v));for(let U=0,w=M;U!==T;++U,w+=4)f.copy(_[U]).applyMatrix4(L,d),f.normal.toArray(S,w),S[w+3]=f.constant}p.value=S,p.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function IR(s){let t=new WeakMap;function i(f,d){return d===Rd?f.mapping=Bs:d===Cd&&(f.mapping=Fs),f}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Rd||d===Cd)if(t.has(f)){const p=t.get(f).texture;return i(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new Nb(p.height);return m.fromEquirectangularTexture(s,f),t.set(f,m),f.addEventListener("dispose",l),i(m.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function c(){t=new WeakMap}return{get:r,dispose:c}}const Us=4,o0=[.125,.215,.35,.446,.526,.582],wr=20,ld=new Oy,l0=new Me;let cd=null,ud=0,fd=0,hd=!1;const Rr=(1+Math.sqrt(5))/2,Cs=1/Rr,c0=[new J(-Rr,Cs,0),new J(Rr,Cs,0),new J(-Cs,0,Rr),new J(Cs,0,Rr),new J(0,Rr,-Cs),new J(0,Rr,Cs),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)],BR=new J;class u0{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,r=.1,l=100,c={}){const{size:f=256,position:d=BR}=c;cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(t,r,l,p,d),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=d0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=h0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(cd,ud,fd),this._renderer.xr.enabled=hd,t.scissorTest=!1,Vc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Bs||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),cd=this._renderer.getRenderTarget(),ud=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Hi,minFilter:Hi,generateMipmaps:!1,type:sl,format:wi,colorSpace:Hs,depthBuffer:!1},l=f0(t,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=f0(t,i,r);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=FR(c)),this._blurMaterial=HR(c,t,i)}return l}_compileMaterial(t){const i=new Di(this._lodPlanes[0],t);this._renderer.compile(i,ld)}_sceneToCubeUV(t,i,r,l,c){const p=new _i(90,1,i,r),m=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,y=_.autoClear,M=_.toneMapping;_.getClearColor(l0),_.toneMapping=Ja,_.autoClear=!1;const E=new by({name:"PMREM.Background",side:qn,depthWrite:!1,depthTest:!1}),T=new Di(new cl,E);let S=!1;const v=t.background;v?v.isColor&&(E.color.copy(v),t.background=null,S=!0):(E.color.copy(l0),S=!0);for(let L=0;L<6;L++){const U=L%3;U===0?(p.up.set(0,m[L],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x+g[L],c.y,c.z)):U===1?(p.up.set(0,0,m[L]),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y+g[L],c.z)):(p.up.set(0,m[L],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y,c.z+g[L]));const w=this._cubeSize;Vc(l,U*w,L>2?w:0,w,w),_.setRenderTarget(l),S&&_.render(T,p),_.render(t,p)}T.geometry.dispose(),T.material.dispose(),_.toneMapping=M,_.autoClear=y,t.background=v}_textureToCubeUV(t,i){const r=this._renderer,l=t.mapping===Bs||t.mapping===Fs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=d0()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=h0());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new Di(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const p=this._cubeSize;Vc(i,0,0,3*p,2*p),r.setRenderTarget(i),r.render(f,ld)}_applyPMREM(t){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=c0[(l-c-1)%c0.length];this._blur(t,c-1,c,f,d)}i.autoClear=r}_blur(t,i,r,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,i,r,l,"latitudinal",c),this._halfBlur(f,t,r,r,l,"longitudinal",c)}_halfBlur(t,i,r,l,c,f,d){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Di(this._lodPlanes[l],m),y=m.uniforms,M=this._sizeLods[r]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*wr-1),T=c/E,S=isFinite(c)?1+Math.floor(g*T):wr;S>wr&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${wr}`);const v=[];let L=0;for(let N=0;N<wr;++N){const X=N/T,D=Math.exp(-X*X/2);v.push(D),N===0?L+=D:N<S&&(L+=2*D)}for(let N=0;N<v.length;N++)v[N]=v[N]/L;y.envMap.value=t.texture,y.samples.value=S,y.weights.value=v,y.latitudinal.value=f==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:U}=this;y.dTheta.value=E,y.mipInt.value=U-r;const w=this._sizeLods[l],B=3*w*(l>U-Us?l-U+Us:0),H=4*(this._cubeSize-w);Vc(i,B,H,3*w,2*w),p.setRenderTarget(i),p.render(_,ld)}}function FR(s){const t=[],i=[],r=[];let l=s;const c=s-Us+1+o0.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);i.push(d);let p=1/d;f>s-Us?p=o0[f-s+Us-1]:f===0&&(p=0),r.push(p);const m=1/(d-2),g=-m,_=1+m,y=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,T=3,S=2,v=1,L=new Float32Array(T*E*M),U=new Float32Array(S*E*M),w=new Float32Array(v*E*M);for(let H=0;H<M;H++){const N=H%3*2/3-1,X=H>2?0:-1,D=[N,X,0,N+2/3,X,0,N+2/3,X+1,0,N,X,0,N+2/3,X+1,0,N,X+1,0];L.set(D,T*E*H),U.set(y,S*E*H);const C=[H,H,H,H,H,H];w.set(C,v*E*H)}const B=new Xi;B.setAttribute("position",new Gi(L,T)),B.setAttribute("uv",new Gi(U,S)),B.setAttribute("faceIndex",new Gi(w,v)),t.push(B),l>Us&&l--}return{lodPlanes:t,sizeLods:i,sigmas:r}}function f0(s,t,i){const r=new Or(s,t,i);return r.texture.mapping=gu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Vc(s,t,i,r,l){s.viewport.set(t,i,r,l),s.scissor.set(t,i,r,l)}function HR(s,t,i){const r=new Float32Array(wr),l=new J(0,1,0);return new tr({name:"SphericalGaussianBlur",defines:{n:wr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Tp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qa,depthTest:!1,depthWrite:!1})}function h0(){return new tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qa,depthTest:!1,depthWrite:!1})}function d0(){return new tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qa,depthTest:!1,depthWrite:!1})}function Tp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function GR(s){let t=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const p=d.mapping,m=p===Rd||p===Cd,g=p===Bs||p===Fs;if(m||g){let _=t.get(d);const y=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new u0(s)),_=m?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const M=d.image;return m&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new u0(s)),_=m?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let p=0;const m=6;for(let g=0;g<m;g++)d[g]!==void 0&&p++;return p===m}function c(d){const p=d.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function VR(s){const t={};function i(r){if(t[r]!==void 0)return t[r];let l;switch(r){case"WEBGL_depth_texture":l=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=s.getExtension(r)}return t[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&Ps("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function kR(s,t,i,r){const l={},c=new WeakMap;function f(_){const y=_.target;y.index!==null&&t.remove(y.index);for(const E in y.attributes)t.remove(y.attributes[E]);y.removeEventListener("dispose",f),delete l[y.id];const M=c.get(y);M&&(t.remove(M),c.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(_,y){return l[y.id]===!0||(y.addEventListener("dispose",f),l[y.id]=!0,i.memory.geometries++),y}function p(_){const y=_.attributes;for(const M in y)t.update(y[M],s.ARRAY_BUFFER)}function m(_){const y=[],M=_.index,E=_.attributes.position;let T=0;if(M!==null){const L=M.array;T=M.version;for(let U=0,w=L.length;U<w;U+=3){const B=L[U+0],H=L[U+1],N=L[U+2];y.push(B,H,H,N,N,B)}}else if(E!==void 0){const L=E.array;T=E.version;for(let U=0,w=L.length/3-1;U<w;U+=3){const B=U+0,H=U+1,N=U+2;y.push(B,H,H,N,N,B)}}else return;const S=new(Sy(y)?Ry:Ay)(y,1);S.version=T;const v=c.get(_);v&&t.remove(v),c.set(_,S)}function g(_){const y=c.get(_);if(y){const M=_.index;M!==null&&y.version<M.version&&m(_)}else m(_);return c.get(_)}return{get:d,update:p,getWireframeAttribute:g}}function XR(s,t,i){let r;function l(y){r=y}let c,f;function d(y){c=y.type,f=y.bytesPerElement}function p(y,M){s.drawElements(r,M,c,y*f),i.update(M,r,1)}function m(y,M,E){E!==0&&(s.drawElementsInstanced(r,M,c,y*f,E),i.update(M,r,E))}function g(y,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,c,y,0,E);let S=0;for(let v=0;v<E;v++)S+=M[v];i.update(S,r,1)}function _(y,M,E,T){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<y.length;v++)m(y[v]/f,M[v],T[v]);else{S.multiDrawElementsInstancedWEBGL(r,M,0,c,y,0,T,0,E);let v=0;for(let L=0;L<E;L++)v+=M[L]*T[L];i.update(v,r,1)}}this.setMode=l,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function jR(s){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,f,d){switch(i.calls++,f){case s.TRIANGLES:i.triangles+=d*(c/3);break;case s.LINES:i.lines+=d*(c/2);break;case s.LINE_STRIP:i.lines+=d*(c-1);break;case s.LINE_LOOP:i.lines+=d*c;break;case s.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:r}}function WR(s,t,i){const r=new WeakMap,l=new en;function c(f,d,p){const m=f.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let y=r.get(d);if(y===void 0||y.count!==_){let C=function(){X.dispose(),r.delete(d),d.removeEventListener("dispose",C)};var M=C;y!==void 0&&y.texture.dispose();const E=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],L=d.morphAttributes.normal||[],U=d.morphAttributes.color||[];let w=0;E===!0&&(w=1),T===!0&&(w=2),S===!0&&(w=3);let B=d.attributes.position.count*w,H=1;B>t.maxTextureSize&&(H=Math.ceil(B/t.maxTextureSize),B=t.maxTextureSize);const N=new Float32Array(B*H*4*_),X=new My(N,B,H,_);X.type=ga,X.needsUpdate=!0;const D=w*4;for(let V=0;V<_;V++){const rt=v[V],nt=L[V],ft=U[V],ut=B*H*4*V;for(let z=0;z<rt.count;z++){const Q=z*D;E===!0&&(l.fromBufferAttribute(rt,z),N[ut+Q+0]=l.x,N[ut+Q+1]=l.y,N[ut+Q+2]=l.z,N[ut+Q+3]=0),T===!0&&(l.fromBufferAttribute(nt,z),N[ut+Q+4]=l.x,N[ut+Q+5]=l.y,N[ut+Q+6]=l.z,N[ut+Q+7]=0),S===!0&&(l.fromBufferAttribute(ft,z),N[ut+Q+8]=l.x,N[ut+Q+9]=l.y,N[ut+Q+10]=l.z,N[ut+Q+11]=ft.itemSize===4?l.w:1)}}y={count:_,texture:X,size:new ce(B,H)},r.set(d,y),d.addEventListener("dispose",C)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(s,"morphTexture",f.morphTexture,i);else{let E=0;for(let S=0;S<m.length;S++)E+=m[S];const T=d.morphTargetsRelative?1:1-E;p.getUniforms().setValue(s,"morphTargetBaseInfluence",T),p.getUniforms().setValue(s,"morphTargetInfluences",m)}p.getUniforms().setValue(s,"morphTargetsTexture",y.texture,i),p.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}return{update:c}}function qR(s,t,i,r){let l=new WeakMap;function c(p){const m=r.render.frame,g=p.geometry,_=t.get(p,g);if(l.get(_)!==m&&(t.update(_),l.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),l.get(p)!==m&&(i.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,s.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const y=p.skeleton;l.get(y)!==m&&(y.update(),l.set(y,m))}return _}function f(){l=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:c,dispose:f}}const zy=new Yn,p0=new Ly(1,1),Iy=new My,By=new gb,Fy=new Dy,m0=[],g0=[],_0=new Float32Array(16),v0=new Float32Array(9),y0=new Float32Array(4);function Ws(s,t,i){const r=s[0];if(r<=0||r>0)return s;const l=t*i;let c=m0[l];if(c===void 0&&(c=new Float32Array(l),m0[l]=c),t!==0){r.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=i,s[f].toArray(c,d)}return c}function mn(s,t){if(s.length!==t.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==t[i])return!1;return!0}function gn(s,t){for(let i=0,r=t.length;i<r;i++)s[i]=t[i]}function yu(s,t){let i=g0[t];i===void 0&&(i=new Int32Array(t),g0[t]=i);for(let r=0;r!==t;++r)i[r]=s.allocateTextureUnit();return i}function YR(s,t){const i=this.cache;i[0]!==t&&(s.uniform1f(this.addr,t),i[0]=t)}function ZR(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(mn(i,t))return;s.uniform2fv(this.addr,t),gn(i,t)}}function KR(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(mn(i,t))return;s.uniform3fv(this.addr,t),gn(i,t)}}function QR(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(mn(i,t))return;s.uniform4fv(this.addr,t),gn(i,t)}}function JR(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(mn(i,t))return;s.uniformMatrix2fv(this.addr,!1,t),gn(i,t)}else{if(mn(i,r))return;y0.set(r),s.uniformMatrix2fv(this.addr,!1,y0),gn(i,r)}}function $R(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(mn(i,t))return;s.uniformMatrix3fv(this.addr,!1,t),gn(i,t)}else{if(mn(i,r))return;v0.set(r),s.uniformMatrix3fv(this.addr,!1,v0),gn(i,r)}}function tC(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(mn(i,t))return;s.uniformMatrix4fv(this.addr,!1,t),gn(i,t)}else{if(mn(i,r))return;_0.set(r),s.uniformMatrix4fv(this.addr,!1,_0),gn(i,r)}}function eC(s,t){const i=this.cache;i[0]!==t&&(s.uniform1i(this.addr,t),i[0]=t)}function nC(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(mn(i,t))return;s.uniform2iv(this.addr,t),gn(i,t)}}function iC(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(mn(i,t))return;s.uniform3iv(this.addr,t),gn(i,t)}}function aC(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(mn(i,t))return;s.uniform4iv(this.addr,t),gn(i,t)}}function rC(s,t){const i=this.cache;i[0]!==t&&(s.uniform1ui(this.addr,t),i[0]=t)}function sC(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(mn(i,t))return;s.uniform2uiv(this.addr,t),gn(i,t)}}function oC(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(mn(i,t))return;s.uniform3uiv(this.addr,t),gn(i,t)}}function lC(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(mn(i,t))return;s.uniform4uiv(this.addr,t),gn(i,t)}}function cC(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(p0.compareFunction=xy,c=p0):c=zy,i.setTexture2D(t||c,l)}function uC(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(t||By,l)}function fC(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(t||Fy,l)}function hC(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(t||Iy,l)}function dC(s){switch(s){case 5126:return YR;case 35664:return ZR;case 35665:return KR;case 35666:return QR;case 35674:return JR;case 35675:return $R;case 35676:return tC;case 5124:case 35670:return eC;case 35667:case 35671:return nC;case 35668:case 35672:return iC;case 35669:case 35673:return aC;case 5125:return rC;case 36294:return sC;case 36295:return oC;case 36296:return lC;case 35678:case 36198:case 36298:case 36306:case 35682:return cC;case 35679:case 36299:case 36307:return uC;case 35680:case 36300:case 36308:case 36293:return fC;case 36289:case 36303:case 36311:case 36292:return hC}}function pC(s,t){s.uniform1fv(this.addr,t)}function mC(s,t){const i=Ws(t,this.size,2);s.uniform2fv(this.addr,i)}function gC(s,t){const i=Ws(t,this.size,3);s.uniform3fv(this.addr,i)}function _C(s,t){const i=Ws(t,this.size,4);s.uniform4fv(this.addr,i)}function vC(s,t){const i=Ws(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function yC(s,t){const i=Ws(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function xC(s,t){const i=Ws(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function SC(s,t){s.uniform1iv(this.addr,t)}function MC(s,t){s.uniform2iv(this.addr,t)}function EC(s,t){s.uniform3iv(this.addr,t)}function TC(s,t){s.uniform4iv(this.addr,t)}function bC(s,t){s.uniform1uiv(this.addr,t)}function AC(s,t){s.uniform2uiv(this.addr,t)}function RC(s,t){s.uniform3uiv(this.addr,t)}function CC(s,t){s.uniform4uiv(this.addr,t)}function wC(s,t,i){const r=this.cache,l=t.length,c=yu(i,l);mn(r,c)||(s.uniform1iv(this.addr,c),gn(r,c));for(let f=0;f!==l;++f)i.setTexture2D(t[f]||zy,c[f])}function DC(s,t,i){const r=this.cache,l=t.length,c=yu(i,l);mn(r,c)||(s.uniform1iv(this.addr,c),gn(r,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||By,c[f])}function UC(s,t,i){const r=this.cache,l=t.length,c=yu(i,l);mn(r,c)||(s.uniform1iv(this.addr,c),gn(r,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||Fy,c[f])}function LC(s,t,i){const r=this.cache,l=t.length,c=yu(i,l);mn(r,c)||(s.uniform1iv(this.addr,c),gn(r,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||Iy,c[f])}function NC(s){switch(s){case 5126:return pC;case 35664:return mC;case 35665:return gC;case 35666:return _C;case 35674:return vC;case 35675:return yC;case 35676:return xC;case 5124:case 35670:return SC;case 35667:case 35671:return MC;case 35668:case 35672:return EC;case 35669:case 35673:return TC;case 5125:return bC;case 36294:return AC;case 36295:return RC;case 36296:return CC;case 35678:case 36198:case 36298:case 36306:case 35682:return wC;case 35679:case 36299:case 36307:return DC;case 35680:case 36300:case 36308:case 36293:return UC;case 36289:case 36303:case 36311:case 36292:return LC}}class OC{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.setValue=dC(i.type)}}class PC{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=NC(i.type)}}class zC{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,r){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,i[d.id],r)}}}const dd=/(\w+)(\])?(\[|\.)?/g;function x0(s,t){s.seq.push(t),s.map[t.id]=t}function IC(s,t,i){const r=s.name,l=r.length;for(dd.lastIndex=0;;){const c=dd.exec(r),f=dd.lastIndex;let d=c[1];const p=c[2]==="]",m=c[3];if(p&&(d=d|0),m===void 0||m==="["&&f+2===l){x0(i,m===void 0?new OC(d,s,t):new PC(d,s,t));break}else{let _=i.map[d];_===void 0&&(_=new zC(d),x0(i,_)),i=_}}}class tu{constructor(t,i){this.seq=[],this.map={};const r=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const c=t.getActiveUniform(i,l),f=t.getUniformLocation(i,c.name);IC(c,f,this)}}setValue(t,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(t,r,l)}setOptional(t,i,r){const l=i[r];l!==void 0&&this.setValue(t,r,l)}static upload(t,i,r,l){for(let c=0,f=i.length;c!==f;++c){const d=i[c],p=r[d.id];p.needsUpdate!==!1&&d.setValue(t,p.value,l)}}static seqWithValue(t,i){const r=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&r.push(f)}return r}}function S0(s,t,i){const r=s.createShader(t);return s.shaderSource(r,i),s.compileShader(r),r}const BC=37297;let FC=0;function HC(s,t){const i=s.split(`
`),r=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const d=f+1;r.push(`${d===t?">":" "} ${d}: ${i[f]}`)}return r.join(`
`)}const M0=new fe;function GC(s){De._getMatrix(M0,De.workingColorSpace,s);const t=`mat3( ${M0.elements.map(i=>i.toFixed(4))} )`;switch(De.getTransfer(s)){case au:return[t,"LinearTransferOETF"];case Ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function E0(s,t,i){const r=s.getShaderParameter(t,s.COMPILE_STATUS),l=s.getShaderInfoLog(t).trim();if(r&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+HC(s.getShaderSource(t),f)}else return l}function VC(s,t){const i=GC(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function kC(s,t){let i;switch(t){case GT:i="Linear";break;case VT:i="Reinhard";break;case kT:i="Cineon";break;case XT:i="ACESFilmic";break;case WT:i="AgX";break;case qT:i="Neutral";break;case jT:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const kc=new J;function XC(){De.getLuminanceCoefficients(kc);const s=kc.x.toFixed(4),t=kc.y.toFixed(4),i=kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jC(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ko).join(`
`)}function WC(s){const t=[];for(const i in s){const r=s[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function qC(s,t){const i={},r=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(t,l),f=c.name;let d=1;c.type===s.FLOAT_MAT2&&(d=2),c.type===s.FLOAT_MAT3&&(d=3),c.type===s.FLOAT_MAT4&&(d=4),i[f]={type:c.type,location:s.getAttribLocation(t,f),locationSize:d}}return i}function Ko(s){return s!==""}function T0(s,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function b0(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const YC=/^[ \t]*#include +<([\w\d./]+)>/gm;function ap(s){return s.replace(YC,KC)}const ZC=new Map;function KC(s,t){let i=he[t];if(i===void 0){const r=ZC.get(t);if(r!==void 0)i=he[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return ap(i)}const QC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function A0(s){return s.replace(QC,JC)}function JC(s,t,i,r){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function R0(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $C(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ly?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===xT?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===pa&&(t="SHADOWMAP_TYPE_VSM"),t}function t2(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Bs:case Fs:t="ENVMAP_TYPE_CUBE";break;case gu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function e2(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Fs:t="ENVMAP_MODE_REFRACTION";break}return t}function n2(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case cy:t="ENVMAP_BLENDING_MULTIPLY";break;case FT:t="ENVMAP_BLENDING_MIX";break;case HT:t="ENVMAP_BLENDING_ADD";break}return t}function i2(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function a2(s,t,i,r){const l=s.getContext(),c=i.defines;let f=i.vertexShader,d=i.fragmentShader;const p=$C(i),m=t2(i),g=e2(i),_=n2(i),y=i2(i),M=jC(i),E=WC(c),T=l.createProgram();let S,v,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Ko).join(`
`),S.length>0&&(S+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Ko).join(`
`),v.length>0&&(v+=`
`)):(S=[R0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ko).join(`
`),v=[R0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ja?"#define TONE_MAPPING":"",i.toneMapping!==Ja?he.tonemapping_pars_fragment:"",i.toneMapping!==Ja?kC("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",he.colorspace_pars_fragment,VC("linearToOutputTexel",i.outputColorSpace),XC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ko).join(`
`)),f=ap(f),f=T0(f,i),f=b0(f,i),d=ap(d),d=T0(d,i),d=b0(d,i),f=A0(f),d=A0(d),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,v=["#define varying in",i.glslVersion===Nv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Nv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const U=L+S+f,w=L+v+d,B=S0(l,l.VERTEX_SHADER,U),H=S0(l,l.FRAGMENT_SHADER,w);l.attachShader(T,B),l.attachShader(T,H),i.index0AttributeName!==void 0?l.bindAttribLocation(T,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function N(V){if(s.debug.checkShaderErrors){const rt=l.getProgramInfoLog(T).trim(),nt=l.getShaderInfoLog(B).trim(),ft=l.getShaderInfoLog(H).trim();let ut=!0,z=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(ut=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,T,B,H);else{const Q=E0(l,B,"vertex"),K=E0(l,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+rt+`
`+Q+`
`+K)}else rt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",rt):(nt===""||ft==="")&&(z=!1);z&&(V.diagnostics={runnable:ut,programLog:rt,vertexShader:{log:nt,prefix:S},fragmentShader:{log:ft,prefix:v}})}l.deleteShader(B),l.deleteShader(H),X=new tu(l,T),D=qC(l,T)}let X;this.getUniforms=function(){return X===void 0&&N(this),X};let D;this.getAttributes=function(){return D===void 0&&N(this),D};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(T,BC)),C},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=FC++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=B,this.fragmentShader=H,this}let r2=0;class s2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,r=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(r),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let r=i.get(t);return r===void 0&&(r=new Set,i.set(t,r)),r}_getShaderStage(t){const i=this.shaderCache;let r=i.get(t);return r===void 0&&(r=new o2(t),i.set(t,r)),r}}class o2{constructor(t){this.id=r2++,this.code=t,this.usedTimes=0}}function l2(s,t,i,r,l,c,f){const d=new Ey,p=new s2,m=new Set,g=[],_=l.logarithmicDepthBuffer,y=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(D){return m.add(D),D===0?"uv":`uv${D}`}function S(D,C,V,rt,nt){const ft=rt.fog,ut=nt.geometry,z=D.isMeshStandardMaterial?rt.environment:null,Q=(D.isMeshStandardMaterial?i:t).get(D.envMap||z),K=Q&&Q.mapping===gu?Q.image.height:null,Mt=E[D.type];D.precision!==null&&(M=l.getMaxPrecision(D.precision),M!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",M,"instead."));const Ct=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,O=Ct!==void 0?Ct.length:0;let st=0;ut.morphAttributes.position!==void 0&&(st=1),ut.morphAttributes.normal!==void 0&&(st=2),ut.morphAttributes.color!==void 0&&(st=3);let St,Z,pt,At;if(Mt){const Ae=Fi[Mt];St=Ae.vertexShader,Z=Ae.fragmentShader}else St=D.vertexShader,Z=D.fragmentShader,p.update(D),pt=p.getVertexShaderID(D),At=p.getFragmentShaderID(D);const Et=s.getRenderTarget(),zt=s.state.buffers.depth.getReversed(),Jt=nt.isInstancedMesh===!0,$t=nt.isBatchedMesh===!0,Oe=!!D.map,Xe=!!D.matcap,Ee=!!Q,G=!!D.aoMap,fn=!!D.lightMap,xe=!!D.bumpMap,Pe=!!D.normalMap,Xt=!!D.displacementMap,_e=!!D.emissiveMap,Zt=!!D.metalnessMap,se=!!D.roughnessMap,nn=D.anisotropy>0,P=D.clearcoat>0,b=D.dispersion>0,it=D.iridescence>0,gt=D.sheen>0,yt=D.transmission>0,ht=nn&&!!D.anisotropyMap,jt=P&&!!D.clearcoatMap,Dt=P&&!!D.clearcoatNormalMap,Vt=P&&!!D.clearcoatRoughnessMap,Wt=it&&!!D.iridescenceMap,xt=it&&!!D.iridescenceThicknessMap,wt=gt&&!!D.sheenColorMap,qt=gt&&!!D.sheenRoughnessMap,Gt=!!D.specularMap,Ut=!!D.specularColorMap,ie=!!D.specularIntensityMap,j=yt&&!!D.transmissionMap,Lt=yt&&!!D.thicknessMap,Tt=!!D.gradientMap,Bt=!!D.alphaMap,bt=D.alphaTest>0,vt=!!D.alphaHash,Ft=!!D.extensions;let ae=Ja;D.toneMapped&&(Et===null||Et.isXRRenderTarget===!0)&&(ae=s.toneMapping);const ze={shaderID:Mt,shaderType:D.type,shaderName:D.name,vertexShader:St,fragmentShader:Z,defines:D.defines,customVertexShaderID:pt,customFragmentShaderID:At,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:M,batching:$t,batchingColor:$t&&nt._colorsTexture!==null,instancing:Jt,instancingColor:Jt&&nt.instanceColor!==null,instancingMorph:Jt&&nt.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:Et===null?s.outputColorSpace:Et.isXRRenderTarget===!0?Et.texture.colorSpace:Hs,alphaToCoverage:!!D.alphaToCoverage,map:Oe,matcap:Xe,envMap:Ee,envMapMode:Ee&&Q.mapping,envMapCubeUVHeight:K,aoMap:G,lightMap:fn,bumpMap:xe,normalMap:Pe,displacementMap:y&&Xt,emissiveMap:_e,normalMapObjectSpace:Pe&&D.normalMapType===QT,normalMapTangentSpace:Pe&&D.normalMapType===yy,metalnessMap:Zt,roughnessMap:se,anisotropy:nn,anisotropyMap:ht,clearcoat:P,clearcoatMap:jt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Vt,dispersion:b,iridescence:it,iridescenceMap:Wt,iridescenceThicknessMap:xt,sheen:gt,sheenColorMap:wt,sheenRoughnessMap:qt,specularMap:Gt,specularColorMap:Ut,specularIntensityMap:ie,transmission:yt,transmissionMap:j,thicknessMap:Lt,gradientMap:Tt,opaque:D.transparent===!1&&D.blending===Os&&D.alphaToCoverage===!1,alphaMap:Bt,alphaTest:bt,alphaHash:vt,combine:D.combine,mapUv:Oe&&T(D.map.channel),aoMapUv:G&&T(D.aoMap.channel),lightMapUv:fn&&T(D.lightMap.channel),bumpMapUv:xe&&T(D.bumpMap.channel),normalMapUv:Pe&&T(D.normalMap.channel),displacementMapUv:Xt&&T(D.displacementMap.channel),emissiveMapUv:_e&&T(D.emissiveMap.channel),metalnessMapUv:Zt&&T(D.metalnessMap.channel),roughnessMapUv:se&&T(D.roughnessMap.channel),anisotropyMapUv:ht&&T(D.anisotropyMap.channel),clearcoatMapUv:jt&&T(D.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&T(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Vt&&T(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Wt&&T(D.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&T(D.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&T(D.sheenColorMap.channel),sheenRoughnessMapUv:qt&&T(D.sheenRoughnessMap.channel),specularMapUv:Gt&&T(D.specularMap.channel),specularColorMapUv:Ut&&T(D.specularColorMap.channel),specularIntensityMapUv:ie&&T(D.specularIntensityMap.channel),transmissionMapUv:j&&T(D.transmissionMap.channel),thicknessMapUv:Lt&&T(D.thicknessMap.channel),alphaMapUv:Bt&&T(D.alphaMap.channel),vertexTangents:!!ut.attributes.tangent&&(Pe||nn),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pointsUvs:nt.isPoints===!0&&!!ut.attributes.uv&&(Oe||Bt),fog:!!ft,useFog:D.fog===!0,fogExp2:!!ft&&ft.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:zt,skinning:nt.isSkinnedMesh===!0,morphTargets:ut.morphAttributes.position!==void 0,morphNormals:ut.morphAttributes.normal!==void 0,morphColors:ut.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:st,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:D.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:ae,decodeVideoTexture:Oe&&D.map.isVideoTexture===!0&&De.getTransfer(D.map.colorSpace)===Ve,decodeVideoTextureEmissive:_e&&D.emissiveMap.isVideoTexture===!0&&De.getTransfer(D.emissiveMap.colorSpace)===Ve,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===ma,flipSided:D.side===qn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:Ft&&D.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&D.extensions.multiDraw===!0||$t)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return ze.vertexUv1s=m.has(1),ze.vertexUv2s=m.has(2),ze.vertexUv3s=m.has(3),m.clear(),ze}function v(D){const C=[];if(D.shaderID?C.push(D.shaderID):(C.push(D.customVertexShaderID),C.push(D.customFragmentShaderID)),D.defines!==void 0)for(const V in D.defines)C.push(V),C.push(D.defines[V]);return D.isRawShaderMaterial===!1&&(L(C,D),U(C,D),C.push(s.outputColorSpace)),C.push(D.customProgramCacheKey),C.join()}function L(D,C){D.push(C.precision),D.push(C.outputColorSpace),D.push(C.envMapMode),D.push(C.envMapCubeUVHeight),D.push(C.mapUv),D.push(C.alphaMapUv),D.push(C.lightMapUv),D.push(C.aoMapUv),D.push(C.bumpMapUv),D.push(C.normalMapUv),D.push(C.displacementMapUv),D.push(C.emissiveMapUv),D.push(C.metalnessMapUv),D.push(C.roughnessMapUv),D.push(C.anisotropyMapUv),D.push(C.clearcoatMapUv),D.push(C.clearcoatNormalMapUv),D.push(C.clearcoatRoughnessMapUv),D.push(C.iridescenceMapUv),D.push(C.iridescenceThicknessMapUv),D.push(C.sheenColorMapUv),D.push(C.sheenRoughnessMapUv),D.push(C.specularMapUv),D.push(C.specularColorMapUv),D.push(C.specularIntensityMapUv),D.push(C.transmissionMapUv),D.push(C.thicknessMapUv),D.push(C.combine),D.push(C.fogExp2),D.push(C.sizeAttenuation),D.push(C.morphTargetsCount),D.push(C.morphAttributeCount),D.push(C.numDirLights),D.push(C.numPointLights),D.push(C.numSpotLights),D.push(C.numSpotLightMaps),D.push(C.numHemiLights),D.push(C.numRectAreaLights),D.push(C.numDirLightShadows),D.push(C.numPointLightShadows),D.push(C.numSpotLightShadows),D.push(C.numSpotLightShadowsWithMaps),D.push(C.numLightProbes),D.push(C.shadowMapType),D.push(C.toneMapping),D.push(C.numClippingPlanes),D.push(C.numClipIntersection),D.push(C.depthPacking)}function U(D,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),D.push(d.mask)}function w(D){const C=E[D.type];let V;if(C){const rt=Fi[C];V=wb.clone(rt.uniforms)}else V=D.uniforms;return V}function B(D,C){let V;for(let rt=0,nt=g.length;rt<nt;rt++){const ft=g[rt];if(ft.cacheKey===C){V=ft,++V.usedTimes;break}}return V===void 0&&(V=new a2(s,C,D,c),g.push(V)),V}function H(D){if(--D.usedTimes===0){const C=g.indexOf(D);g[C]=g[g.length-1],g.pop(),D.destroy()}}function N(D){p.remove(D)}function X(){p.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:w,acquireProgram:B,releaseProgram:H,releaseShaderCache:N,programs:g,dispose:X}}function c2(){let s=new WeakMap;function t(f){return s.has(f)}function i(f){let d=s.get(f);return d===void 0&&(d={},s.set(f,d)),d}function r(f){s.delete(f)}function l(f,d,p){s.get(f)[d]=p}function c(){s=new WeakMap}return{has:t,get:i,remove:r,update:l,dispose:c}}function u2(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function C0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function w0(){const s=[];let t=0;const i=[],r=[],l=[];function c(){t=0,i.length=0,r.length=0,l.length=0}function f(_,y,M,E,T,S){let v=s[t];return v===void 0?(v={id:_.id,object:_,geometry:y,material:M,groupOrder:E,renderOrder:_.renderOrder,z:T,group:S},s[t]=v):(v.id=_.id,v.object=_,v.geometry=y,v.material=M,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=T,v.group=S),t++,v}function d(_,y,M,E,T,S){const v=f(_,y,M,E,T,S);M.transmission>0?r.push(v):M.transparent===!0?l.push(v):i.push(v)}function p(_,y,M,E,T,S){const v=f(_,y,M,E,T,S);M.transmission>0?r.unshift(v):M.transparent===!0?l.unshift(v):i.unshift(v)}function m(_,y){i.length>1&&i.sort(_||u2),r.length>1&&r.sort(y||C0),l.length>1&&l.sort(y||C0)}function g(){for(let _=t,y=s.length;_<y;_++){const M=s[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:d,unshift:p,finish:g,sort:m}}function f2(){let s=new WeakMap;function t(r,l){const c=s.get(r);let f;return c===void 0?(f=new w0,s.set(r,[f])):l>=c.length?(f=new w0,c.push(f)):f=c[l],f}function i(){s=new WeakMap}return{get:t,dispose:i}}function h2(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new J,color:new Me};break;case"SpotLight":i={position:new J,direction:new J,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new J,color:new Me,distance:0,decay:0};break;case"HemisphereLight":i={direction:new J,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":i={color:new Me,position:new J,halfWidth:new J,halfHeight:new J};break}return s[t.id]=i,i}}}function d2(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=i,i}}}let p2=0;function m2(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function g2(s){const t=new h2,i=d2(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new J);const l=new J,c=new Ke,f=new Ke;function d(m){let g=0,_=0,y=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let M=0,E=0,T=0,S=0,v=0,L=0,U=0,w=0,B=0,H=0,N=0;m.sort(m2);for(let D=0,C=m.length;D<C;D++){const V=m[D],rt=V.color,nt=V.intensity,ft=V.distance,ut=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)g+=rt.r*nt,_+=rt.g*nt,y+=rt.b*nt;else if(V.isLightProbe){for(let z=0;z<9;z++)r.probe[z].addScaledVector(V.sh.coefficients[z],nt);N++}else if(V.isDirectionalLight){const z=t.get(V);if(z.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const Q=V.shadow,K=i.get(V);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,r.directionalShadow[M]=K,r.directionalShadowMap[M]=ut,r.directionalShadowMatrix[M]=V.shadow.matrix,L++}r.directional[M]=z,M++}else if(V.isSpotLight){const z=t.get(V);z.position.setFromMatrixPosition(V.matrixWorld),z.color.copy(rt).multiplyScalar(nt),z.distance=ft,z.coneCos=Math.cos(V.angle),z.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),z.decay=V.decay,r.spot[T]=z;const Q=V.shadow;if(V.map&&(r.spotLightMap[B]=V.map,B++,Q.updateMatrices(V),V.castShadow&&H++),r.spotLightMatrix[T]=Q.matrix,V.castShadow){const K=i.get(V);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,r.spotShadow[T]=K,r.spotShadowMap[T]=ut,w++}T++}else if(V.isRectAreaLight){const z=t.get(V);z.color.copy(rt).multiplyScalar(nt),z.halfWidth.set(V.width*.5,0,0),z.halfHeight.set(0,V.height*.5,0),r.rectArea[S]=z,S++}else if(V.isPointLight){const z=t.get(V);if(z.color.copy(V.color).multiplyScalar(V.intensity),z.distance=V.distance,z.decay=V.decay,V.castShadow){const Q=V.shadow,K=i.get(V);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,r.pointShadow[E]=K,r.pointShadowMap[E]=ut,r.pointShadowMatrix[E]=V.shadow.matrix,U++}r.point[E]=z,E++}else if(V.isHemisphereLight){const z=t.get(V);z.skyColor.copy(V.color).multiplyScalar(nt),z.groundColor.copy(V.groundColor).multiplyScalar(nt),r.hemi[v]=z,v++}}S>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ot.LTC_FLOAT_1,r.rectAreaLTC2=Ot.LTC_FLOAT_2):(r.rectAreaLTC1=Ot.LTC_HALF_1,r.rectAreaLTC2=Ot.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=_,r.ambient[2]=y;const X=r.hash;(X.directionalLength!==M||X.pointLength!==E||X.spotLength!==T||X.rectAreaLength!==S||X.hemiLength!==v||X.numDirectionalShadows!==L||X.numPointShadows!==U||X.numSpotShadows!==w||X.numSpotMaps!==B||X.numLightProbes!==N)&&(r.directional.length=M,r.spot.length=T,r.rectArea.length=S,r.point.length=E,r.hemi.length=v,r.directionalShadow.length=L,r.directionalShadowMap.length=L,r.pointShadow.length=U,r.pointShadowMap.length=U,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=L,r.pointShadowMatrix.length=U,r.spotLightMatrix.length=w+B-H,r.spotLightMap.length=B,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=N,X.directionalLength=M,X.pointLength=E,X.spotLength=T,X.rectAreaLength=S,X.hemiLength=v,X.numDirectionalShadows=L,X.numPointShadows=U,X.numSpotShadows=w,X.numSpotMaps=B,X.numLightProbes=N,r.version=p2++)}function p(m,g){let _=0,y=0,M=0,E=0,T=0;const S=g.matrixWorldInverse;for(let v=0,L=m.length;v<L;v++){const U=m[v];if(U.isDirectionalLight){const w=r.directional[_];w.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),_++}else if(U.isSpotLight){const w=r.spot[M];w.position.setFromMatrixPosition(U.matrixWorld),w.position.applyMatrix4(S),w.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(S),M++}else if(U.isRectAreaLight){const w=r.rectArea[E];w.position.setFromMatrixPosition(U.matrixWorld),w.position.applyMatrix4(S),f.identity(),c.copy(U.matrixWorld),c.premultiply(S),f.extractRotation(c),w.halfWidth.set(U.width*.5,0,0),w.halfHeight.set(0,U.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),E++}else if(U.isPointLight){const w=r.point[y];w.position.setFromMatrixPosition(U.matrixWorld),w.position.applyMatrix4(S),y++}else if(U.isHemisphereLight){const w=r.hemi[T];w.direction.setFromMatrixPosition(U.matrixWorld),w.direction.transformDirection(S),T++}}}return{setup:d,setupView:p,state:r}}function D0(s){const t=new g2(s),i=[],r=[];function l(g){m.camera=g,i.length=0,r.length=0}function c(g){i.push(g)}function f(g){r.push(g)}function d(){t.setup(i)}function p(g){t.setupView(i,g)}const m={lightsArray:i,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:d,setupLightsView:p,pushLight:c,pushShadow:f}}function _2(s){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new D0(s),t.set(l,[d])):c>=f.length?(d=new D0(s),f.push(d)):d=f[c],d}function r(){t=new WeakMap}return{get:i,dispose:r}}const v2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function x2(s,t,i){let r=new Ep;const l=new ce,c=new ce,f=new en,d=new Hb({depthPacking:KT}),p=new Gb,m={},g=i.maxTextureSize,_={[$a]:qn,[qn]:$a,[ma]:ma},y=new tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:v2,fragmentShader:y2}),M=y.clone();M.defines.HORIZONTAL_PASS=1;const E=new Xi;E.setAttribute("position",new Gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Di(E,y),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ly;let v=this.type;this.render=function(H,N,X){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||H.length===0)return;const D=s.getRenderTarget(),C=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),rt=s.state;rt.setBlending(Qa),rt.buffers.color.setClear(1,1,1,1),rt.buffers.depth.setTest(!0),rt.setScissorTest(!1);const nt=v!==pa&&this.type===pa,ft=v===pa&&this.type!==pa;for(let ut=0,z=H.length;ut<z;ut++){const Q=H[ut],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const Mt=K.getFrameExtents();if(l.multiply(Mt),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/Mt.x),l.x=c.x*Mt.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/Mt.y),l.y=c.y*Mt.y,K.mapSize.y=c.y)),K.map===null||nt===!0||ft===!0){const O=this.type!==pa?{minFilter:Li,magFilter:Li}:{};K.map!==null&&K.map.dispose(),K.map=new Or(l.x,l.y,O),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}s.setRenderTarget(K.map),s.clear();const Ct=K.getViewportCount();for(let O=0;O<Ct;O++){const st=K.getViewport(O);f.set(c.x*st.x,c.y*st.y,c.x*st.z,c.y*st.w),rt.viewport(f),K.updateMatrices(Q,O),r=K.getFrustum(),w(N,X,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===pa&&L(K,X),K.needsUpdate=!1}v=this.type,S.needsUpdate=!1,s.setRenderTarget(D,C,V)};function L(H,N){const X=t.update(T);y.defines.VSM_SAMPLES!==H.blurSamples&&(y.defines.VSM_SAMPLES=H.blurSamples,M.defines.VSM_SAMPLES=H.blurSamples,y.needsUpdate=!0,M.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new Or(l.x,l.y)),y.uniforms.shadow_pass.value=H.map.texture,y.uniforms.resolution.value=H.mapSize,y.uniforms.radius.value=H.radius,s.setRenderTarget(H.mapPass),s.clear(),s.renderBufferDirect(N,null,X,y,T,null),M.uniforms.shadow_pass.value=H.mapPass.texture,M.uniforms.resolution.value=H.mapSize,M.uniforms.radius.value=H.radius,s.setRenderTarget(H.map),s.clear(),s.renderBufferDirect(N,null,X,M,T,null)}function U(H,N,X,D){let C=null;const V=X.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(V!==void 0)C=V;else if(C=X.isPointLight===!0?p:d,s.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const rt=C.uuid,nt=N.uuid;let ft=m[rt];ft===void 0&&(ft={},m[rt]=ft);let ut=ft[nt];ut===void 0&&(ut=C.clone(),ft[nt]=ut,N.addEventListener("dispose",B)),C=ut}if(C.visible=N.visible,C.wireframe=N.wireframe,D===pa?C.side=N.shadowSide!==null?N.shadowSide:N.side:C.side=N.shadowSide!==null?N.shadowSide:_[N.side],C.alphaMap=N.alphaMap,C.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,C.map=N.map,C.clipShadows=N.clipShadows,C.clippingPlanes=N.clippingPlanes,C.clipIntersection=N.clipIntersection,C.displacementMap=N.displacementMap,C.displacementScale=N.displacementScale,C.displacementBias=N.displacementBias,C.wireframeLinewidth=N.wireframeLinewidth,C.linewidth=N.linewidth,X.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const rt=s.properties.get(C);rt.light=X}return C}function w(H,N,X,D,C){if(H.visible===!1)return;if(H.layers.test(N.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&C===pa)&&(!H.frustumCulled||r.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,H.matrixWorld);const nt=t.update(H),ft=H.material;if(Array.isArray(ft)){const ut=nt.groups;for(let z=0,Q=ut.length;z<Q;z++){const K=ut[z],Mt=ft[K.materialIndex];if(Mt&&Mt.visible){const Ct=U(H,Mt,D,C);H.onBeforeShadow(s,H,N,X,nt,Ct,K),s.renderBufferDirect(X,null,nt,Ct,H,K),H.onAfterShadow(s,H,N,X,nt,Ct,K)}}}else if(ft.visible){const ut=U(H,ft,D,C);H.onBeforeShadow(s,H,N,X,nt,ut,null),s.renderBufferDirect(X,null,nt,ut,H,null),H.onAfterShadow(s,H,N,X,nt,ut,null)}}const rt=H.children;for(let nt=0,ft=rt.length;nt<ft;nt++)w(rt[nt],N,X,D,C)}function B(H){H.target.removeEventListener("dispose",B);for(const X in m){const D=m[X],C=H.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}}const S2={[xd]:Sd,[Md]:bd,[Ed]:Ad,[Is]:Td,[Sd]:xd,[bd]:Md,[Ad]:Ed,[Td]:Is};function M2(s,t){function i(){let j=!1;const Lt=new en;let Tt=null;const Bt=new en(0,0,0,0);return{setMask:function(bt){Tt!==bt&&!j&&(s.colorMask(bt,bt,bt,bt),Tt=bt)},setLocked:function(bt){j=bt},setClear:function(bt,vt,Ft,ae,ze){ze===!0&&(bt*=ae,vt*=ae,Ft*=ae),Lt.set(bt,vt,Ft,ae),Bt.equals(Lt)===!1&&(s.clearColor(bt,vt,Ft,ae),Bt.copy(Lt))},reset:function(){j=!1,Tt=null,Bt.set(-1,0,0,0)}}}function r(){let j=!1,Lt=!1,Tt=null,Bt=null,bt=null;return{setReversed:function(vt){if(Lt!==vt){const Ft=t.get("EXT_clip_control");vt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT),Lt=vt;const ae=bt;bt=null,this.setClear(ae)}},getReversed:function(){return Lt},setTest:function(vt){vt?Et(s.DEPTH_TEST):zt(s.DEPTH_TEST)},setMask:function(vt){Tt!==vt&&!j&&(s.depthMask(vt),Tt=vt)},setFunc:function(vt){if(Lt&&(vt=S2[vt]),Bt!==vt){switch(vt){case xd:s.depthFunc(s.NEVER);break;case Sd:s.depthFunc(s.ALWAYS);break;case Md:s.depthFunc(s.LESS);break;case Is:s.depthFunc(s.LEQUAL);break;case Ed:s.depthFunc(s.EQUAL);break;case Td:s.depthFunc(s.GEQUAL);break;case bd:s.depthFunc(s.GREATER);break;case Ad:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Bt=vt}},setLocked:function(vt){j=vt},setClear:function(vt){bt!==vt&&(Lt&&(vt=1-vt),s.clearDepth(vt),bt=vt)},reset:function(){j=!1,Tt=null,Bt=null,bt=null,Lt=!1}}}function l(){let j=!1,Lt=null,Tt=null,Bt=null,bt=null,vt=null,Ft=null,ae=null,ze=null;return{setTest:function(Ae){j||(Ae?Et(s.STENCIL_TEST):zt(s.STENCIL_TEST))},setMask:function(Ae){Lt!==Ae&&!j&&(s.stencilMask(Ae),Lt=Ae)},setFunc:function(Ae,xn,yi){(Tt!==Ae||Bt!==xn||bt!==yi)&&(s.stencilFunc(Ae,xn,yi),Tt=Ae,Bt=xn,bt=yi)},setOp:function(Ae,xn,yi){(vt!==Ae||Ft!==xn||ae!==yi)&&(s.stencilOp(Ae,xn,yi),vt=Ae,Ft=xn,ae=yi)},setLocked:function(Ae){j=Ae},setClear:function(Ae){ze!==Ae&&(s.clearStencil(Ae),ze=Ae)},reset:function(){j=!1,Lt=null,Tt=null,Bt=null,bt=null,vt=null,Ft=null,ae=null,ze=null}}}const c=new i,f=new r,d=new l,p=new WeakMap,m=new WeakMap;let g={},_={},y=new WeakMap,M=[],E=null,T=!1,S=null,v=null,L=null,U=null,w=null,B=null,H=null,N=new Me(0,0,0),X=0,D=!1,C=null,V=null,rt=null,nt=null,ft=null;const ut=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=Q>=2);let Mt=null,Ct={};const O=s.getParameter(s.SCISSOR_BOX),st=s.getParameter(s.VIEWPORT),St=new en().fromArray(O),Z=new en().fromArray(st);function pt(j,Lt,Tt,Bt){const bt=new Uint8Array(4),vt=s.createTexture();s.bindTexture(j,vt),s.texParameteri(j,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(j,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ft=0;Ft<Tt;Ft++)j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?s.texImage3D(Lt,0,s.RGBA,1,1,Bt,0,s.RGBA,s.UNSIGNED_BYTE,bt):s.texImage2D(Lt+Ft,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,bt);return vt}const At={};At[s.TEXTURE_2D]=pt(s.TEXTURE_2D,s.TEXTURE_2D,1),At[s.TEXTURE_CUBE_MAP]=pt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[s.TEXTURE_2D_ARRAY]=pt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),At[s.TEXTURE_3D]=pt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),Et(s.DEPTH_TEST),f.setFunc(Is),xe(!1),Pe(Rv),Et(s.CULL_FACE),G(Qa);function Et(j){g[j]!==!0&&(s.enable(j),g[j]=!0)}function zt(j){g[j]!==!1&&(s.disable(j),g[j]=!1)}function Jt(j,Lt){return _[j]!==Lt?(s.bindFramebuffer(j,Lt),_[j]=Lt,j===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Lt),j===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Lt),!0):!1}function $t(j,Lt){let Tt=M,Bt=!1;if(j){Tt=y.get(Lt),Tt===void 0&&(Tt=[],y.set(Lt,Tt));const bt=j.textures;if(Tt.length!==bt.length||Tt[0]!==s.COLOR_ATTACHMENT0){for(let vt=0,Ft=bt.length;vt<Ft;vt++)Tt[vt]=s.COLOR_ATTACHMENT0+vt;Tt.length=bt.length,Bt=!0}}else Tt[0]!==s.BACK&&(Tt[0]=s.BACK,Bt=!0);Bt&&s.drawBuffers(Tt)}function Oe(j){return E!==j?(s.useProgram(j),E=j,!0):!1}const Xe={[Cr]:s.FUNC_ADD,[MT]:s.FUNC_SUBTRACT,[ET]:s.FUNC_REVERSE_SUBTRACT};Xe[TT]=s.MIN,Xe[bT]=s.MAX;const Ee={[AT]:s.ZERO,[RT]:s.ONE,[CT]:s.SRC_COLOR,[vd]:s.SRC_ALPHA,[OT]:s.SRC_ALPHA_SATURATE,[LT]:s.DST_COLOR,[DT]:s.DST_ALPHA,[wT]:s.ONE_MINUS_SRC_COLOR,[yd]:s.ONE_MINUS_SRC_ALPHA,[NT]:s.ONE_MINUS_DST_COLOR,[UT]:s.ONE_MINUS_DST_ALPHA,[PT]:s.CONSTANT_COLOR,[zT]:s.ONE_MINUS_CONSTANT_COLOR,[IT]:s.CONSTANT_ALPHA,[BT]:s.ONE_MINUS_CONSTANT_ALPHA};function G(j,Lt,Tt,Bt,bt,vt,Ft,ae,ze,Ae){if(j===Qa){T===!0&&(zt(s.BLEND),T=!1);return}if(T===!1&&(Et(s.BLEND),T=!0),j!==ST){if(j!==S||Ae!==D){if((v!==Cr||w!==Cr)&&(s.blendEquation(s.FUNC_ADD),v=Cr,w=Cr),Ae)switch(j){case Os:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Cv:s.blendFunc(s.ONE,s.ONE);break;case wv:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dv:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case Os:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Cv:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case wv:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dv:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}L=null,U=null,B=null,H=null,N.set(0,0,0),X=0,S=j,D=Ae}return}bt=bt||Lt,vt=vt||Tt,Ft=Ft||Bt,(Lt!==v||bt!==w)&&(s.blendEquationSeparate(Xe[Lt],Xe[bt]),v=Lt,w=bt),(Tt!==L||Bt!==U||vt!==B||Ft!==H)&&(s.blendFuncSeparate(Ee[Tt],Ee[Bt],Ee[vt],Ee[Ft]),L=Tt,U=Bt,B=vt,H=Ft),(ae.equals(N)===!1||ze!==X)&&(s.blendColor(ae.r,ae.g,ae.b,ze),N.copy(ae),X=ze),S=j,D=!1}function fn(j,Lt){j.side===ma?zt(s.CULL_FACE):Et(s.CULL_FACE);let Tt=j.side===qn;Lt&&(Tt=!Tt),xe(Tt),j.blending===Os&&j.transparent===!1?G(Qa):G(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),f.setFunc(j.depthFunc),f.setTest(j.depthTest),f.setMask(j.depthWrite),c.setMask(j.colorWrite);const Bt=j.stencilWrite;d.setTest(Bt),Bt&&(d.setMask(j.stencilWriteMask),d.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),d.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),_e(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?Et(s.SAMPLE_ALPHA_TO_COVERAGE):zt(s.SAMPLE_ALPHA_TO_COVERAGE)}function xe(j){C!==j&&(j?s.frontFace(s.CW):s.frontFace(s.CCW),C=j)}function Pe(j){j!==vT?(Et(s.CULL_FACE),j!==V&&(j===Rv?s.cullFace(s.BACK):j===yT?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):zt(s.CULL_FACE),V=j}function Xt(j){j!==rt&&(z&&s.lineWidth(j),rt=j)}function _e(j,Lt,Tt){j?(Et(s.POLYGON_OFFSET_FILL),(nt!==Lt||ft!==Tt)&&(s.polygonOffset(Lt,Tt),nt=Lt,ft=Tt)):zt(s.POLYGON_OFFSET_FILL)}function Zt(j){j?Et(s.SCISSOR_TEST):zt(s.SCISSOR_TEST)}function se(j){j===void 0&&(j=s.TEXTURE0+ut-1),Mt!==j&&(s.activeTexture(j),Mt=j)}function nn(j,Lt,Tt){Tt===void 0&&(Mt===null?Tt=s.TEXTURE0+ut-1:Tt=Mt);let Bt=Ct[Tt];Bt===void 0&&(Bt={type:void 0,texture:void 0},Ct[Tt]=Bt),(Bt.type!==j||Bt.texture!==Lt)&&(Mt!==Tt&&(s.activeTexture(Tt),Mt=Tt),s.bindTexture(j,Lt||At[j]),Bt.type=j,Bt.texture=Lt)}function P(){const j=Ct[Mt];j!==void 0&&j.type!==void 0&&(s.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function b(){try{s.compressedTexImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function it(){try{s.compressedTexImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function gt(){try{s.texSubImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function yt(){try{s.texSubImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ht(){try{s.compressedTexSubImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function jt(){try{s.compressedTexSubImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Dt(){try{s.texStorage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Vt(){try{s.texStorage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Wt(){try{s.texImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function xt(){try{s.texImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function wt(j){St.equals(j)===!1&&(s.scissor(j.x,j.y,j.z,j.w),St.copy(j))}function qt(j){Z.equals(j)===!1&&(s.viewport(j.x,j.y,j.z,j.w),Z.copy(j))}function Gt(j,Lt){let Tt=m.get(Lt);Tt===void 0&&(Tt=new WeakMap,m.set(Lt,Tt));let Bt=Tt.get(j);Bt===void 0&&(Bt=s.getUniformBlockIndex(Lt,j.name),Tt.set(j,Bt))}function Ut(j,Lt){const Bt=m.get(Lt).get(j);p.get(Lt)!==Bt&&(s.uniformBlockBinding(Lt,Bt,j.__bindingPointIndex),p.set(Lt,Bt))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),f.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),g={},Mt=null,Ct={},_={},y=new WeakMap,M=[],E=null,T=!1,S=null,v=null,L=null,U=null,w=null,B=null,H=null,N=new Me(0,0,0),X=0,D=!1,C=null,V=null,rt=null,nt=null,ft=null,St.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:Et,disable:zt,bindFramebuffer:Jt,drawBuffers:$t,useProgram:Oe,setBlending:G,setMaterial:fn,setFlipSided:xe,setCullFace:Pe,setLineWidth:Xt,setPolygonOffset:_e,setScissorTest:Zt,activeTexture:se,bindTexture:nn,unbindTexture:P,compressedTexImage2D:b,compressedTexImage3D:it,texImage2D:Wt,texImage3D:xt,updateUBOMapping:Gt,uniformBlockBinding:Ut,texStorage2D:Dt,texStorage3D:Vt,texSubImage2D:gt,texSubImage3D:yt,compressedTexSubImage2D:ht,compressedTexSubImage3D:jt,scissor:wt,viewport:qt,reset:ie}}function E2(s,t,i,r,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new ce,g=new WeakMap;let _;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(P,b){return M?new OffscreenCanvas(P,b):su("canvas")}function T(P,b,it){let gt=1;const yt=nn(P);if((yt.width>it||yt.height>it)&&(gt=it/Math.max(yt.width,yt.height)),gt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ht=Math.floor(gt*yt.width),jt=Math.floor(gt*yt.height);_===void 0&&(_=E(ht,jt));const Dt=b?E(ht,jt):_;return Dt.width=ht,Dt.height=jt,Dt.getContext("2d").drawImage(P,0,0,ht,jt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+yt.width+"x"+yt.height+") to ("+ht+"x"+jt+")."),Dt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+yt.width+"x"+yt.height+")."),P;return P}function S(P){return P.generateMipmaps}function v(P){s.generateMipmap(P)}function L(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function U(P,b,it,gt,yt=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ht=b;if(b===s.RED&&(it===s.FLOAT&&(ht=s.R32F),it===s.HALF_FLOAT&&(ht=s.R16F),it===s.UNSIGNED_BYTE&&(ht=s.R8)),b===s.RED_INTEGER&&(it===s.UNSIGNED_BYTE&&(ht=s.R8UI),it===s.UNSIGNED_SHORT&&(ht=s.R16UI),it===s.UNSIGNED_INT&&(ht=s.R32UI),it===s.BYTE&&(ht=s.R8I),it===s.SHORT&&(ht=s.R16I),it===s.INT&&(ht=s.R32I)),b===s.RG&&(it===s.FLOAT&&(ht=s.RG32F),it===s.HALF_FLOAT&&(ht=s.RG16F),it===s.UNSIGNED_BYTE&&(ht=s.RG8)),b===s.RG_INTEGER&&(it===s.UNSIGNED_BYTE&&(ht=s.RG8UI),it===s.UNSIGNED_SHORT&&(ht=s.RG16UI),it===s.UNSIGNED_INT&&(ht=s.RG32UI),it===s.BYTE&&(ht=s.RG8I),it===s.SHORT&&(ht=s.RG16I),it===s.INT&&(ht=s.RG32I)),b===s.RGB_INTEGER&&(it===s.UNSIGNED_BYTE&&(ht=s.RGB8UI),it===s.UNSIGNED_SHORT&&(ht=s.RGB16UI),it===s.UNSIGNED_INT&&(ht=s.RGB32UI),it===s.BYTE&&(ht=s.RGB8I),it===s.SHORT&&(ht=s.RGB16I),it===s.INT&&(ht=s.RGB32I)),b===s.RGBA_INTEGER&&(it===s.UNSIGNED_BYTE&&(ht=s.RGBA8UI),it===s.UNSIGNED_SHORT&&(ht=s.RGBA16UI),it===s.UNSIGNED_INT&&(ht=s.RGBA32UI),it===s.BYTE&&(ht=s.RGBA8I),it===s.SHORT&&(ht=s.RGBA16I),it===s.INT&&(ht=s.RGBA32I)),b===s.RGB&&it===s.UNSIGNED_INT_5_9_9_9_REV&&(ht=s.RGB9_E5),b===s.RGBA){const jt=yt?au:De.getTransfer(gt);it===s.FLOAT&&(ht=s.RGBA32F),it===s.HALF_FLOAT&&(ht=s.RGBA16F),it===s.UNSIGNED_BYTE&&(ht=jt===Ve?s.SRGB8_ALPHA8:s.RGBA8),it===s.UNSIGNED_SHORT_4_4_4_4&&(ht=s.RGBA4),it===s.UNSIGNED_SHORT_5_5_5_1&&(ht=s.RGB5_A1)}return(ht===s.R16F||ht===s.R32F||ht===s.RG16F||ht===s.RG32F||ht===s.RGBA16F||ht===s.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function w(P,b){let it;return P?b===null||b===Lr||b===el?it=s.DEPTH24_STENCIL8:b===ga?it=s.DEPTH32F_STENCIL8:b===tl&&(it=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Lr||b===el?it=s.DEPTH_COMPONENT24:b===ga?it=s.DEPTH_COMPONENT32F:b===tl&&(it=s.DEPTH_COMPONENT16),it}function B(P,b){return S(P)===!0||P.isFramebufferTexture&&P.minFilter!==Li&&P.minFilter!==Hi?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function H(P){const b=P.target;b.removeEventListener("dispose",H),X(b),b.isVideoTexture&&g.delete(b)}function N(P){const b=P.target;b.removeEventListener("dispose",N),C(b)}function X(P){const b=r.get(P);if(b.__webglInit===void 0)return;const it=P.source,gt=y.get(it);if(gt){const yt=gt[b.__cacheKey];yt.usedTimes--,yt.usedTimes===0&&D(P),Object.keys(gt).length===0&&y.delete(it)}r.remove(P)}function D(P){const b=r.get(P);s.deleteTexture(b.__webglTexture);const it=P.source,gt=y.get(it);delete gt[b.__cacheKey],f.memory.textures--}function C(P){const b=r.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),r.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let gt=0;gt<6;gt++){if(Array.isArray(b.__webglFramebuffer[gt]))for(let yt=0;yt<b.__webglFramebuffer[gt].length;yt++)s.deleteFramebuffer(b.__webglFramebuffer[gt][yt]);else s.deleteFramebuffer(b.__webglFramebuffer[gt]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[gt])}else{if(Array.isArray(b.__webglFramebuffer))for(let gt=0;gt<b.__webglFramebuffer.length;gt++)s.deleteFramebuffer(b.__webglFramebuffer[gt]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let gt=0;gt<b.__webglColorRenderbuffer.length;gt++)b.__webglColorRenderbuffer[gt]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[gt]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const it=P.textures;for(let gt=0,yt=it.length;gt<yt;gt++){const ht=r.get(it[gt]);ht.__webglTexture&&(s.deleteTexture(ht.__webglTexture),f.memory.textures--),r.remove(it[gt])}r.remove(P)}let V=0;function rt(){V=0}function nt(){const P=V;return P>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l.maxTextures),V+=1,P}function ft(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function ut(P,b){const it=r.get(P);if(P.isVideoTexture&&Zt(P),P.isRenderTargetTexture===!1&&P.version>0&&it.__version!==P.version){const gt=P.image;if(gt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{At(it,P,b);return}}i.bindTexture(s.TEXTURE_2D,it.__webglTexture,s.TEXTURE0+b)}function z(P,b){const it=r.get(P);if(P.version>0&&it.__version!==P.version){At(it,P,b);return}i.bindTexture(s.TEXTURE_2D_ARRAY,it.__webglTexture,s.TEXTURE0+b)}function Q(P,b){const it=r.get(P);if(P.version>0&&it.__version!==P.version){At(it,P,b);return}i.bindTexture(s.TEXTURE_3D,it.__webglTexture,s.TEXTURE0+b)}function K(P,b){const it=r.get(P);if(P.version>0&&it.__version!==P.version){Et(it,P,b);return}i.bindTexture(s.TEXTURE_CUBE_MAP,it.__webglTexture,s.TEXTURE0+b)}const Mt={[wd]:s.REPEAT,[Dr]:s.CLAMP_TO_EDGE,[Dd]:s.MIRRORED_REPEAT},Ct={[Li]:s.NEAREST,[YT]:s.NEAREST_MIPMAP_NEAREST,[Sc]:s.NEAREST_MIPMAP_LINEAR,[Hi]:s.LINEAR,[zh]:s.LINEAR_MIPMAP_NEAREST,[Ur]:s.LINEAR_MIPMAP_LINEAR},O={[JT]:s.NEVER,[ab]:s.ALWAYS,[$T]:s.LESS,[xy]:s.LEQUAL,[tb]:s.EQUAL,[ib]:s.GEQUAL,[eb]:s.GREATER,[nb]:s.NOTEQUAL};function st(P,b){if(b.type===ga&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Hi||b.magFilter===zh||b.magFilter===Sc||b.magFilter===Ur||b.minFilter===Hi||b.minFilter===zh||b.minFilter===Sc||b.minFilter===Ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,Mt[b.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,Mt[b.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,Mt[b.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,Ct[b.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,Ct[b.minFilter]),b.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,O[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Li||b.minFilter!==Sc&&b.minFilter!==Ur||b.type===ga&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||r.get(b).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,l.getMaxAnisotropy())),r.get(b).__currentAnisotropy=b.anisotropy}}}function St(P,b){let it=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",H));const gt=b.source;let yt=y.get(gt);yt===void 0&&(yt={},y.set(gt,yt));const ht=ft(b);if(ht!==P.__cacheKey){yt[ht]===void 0&&(yt[ht]={texture:s.createTexture(),usedTimes:0},f.memory.textures++,it=!0),yt[ht].usedTimes++;const jt=yt[P.__cacheKey];jt!==void 0&&(yt[P.__cacheKey].usedTimes--,jt.usedTimes===0&&D(b)),P.__cacheKey=ht,P.__webglTexture=yt[ht].texture}return it}function Z(P,b,it){return Math.floor(Math.floor(P/it)/b)}function pt(P,b,it,gt){const ht=P.updateRanges;if(ht.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,it,gt,b.data);else{ht.sort((xt,wt)=>xt.start-wt.start);let jt=0;for(let xt=1;xt<ht.length;xt++){const wt=ht[jt],qt=ht[xt],Gt=wt.start+wt.count,Ut=Z(qt.start,b.width,4),ie=Z(wt.start,b.width,4);qt.start<=Gt+1&&Ut===ie&&Z(qt.start+qt.count-1,b.width,4)===Ut?wt.count=Math.max(wt.count,qt.start+qt.count-wt.start):(++jt,ht[jt]=qt)}ht.length=jt+1;const Dt=s.getParameter(s.UNPACK_ROW_LENGTH),Vt=s.getParameter(s.UNPACK_SKIP_PIXELS),Wt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let xt=0,wt=ht.length;xt<wt;xt++){const qt=ht[xt],Gt=Math.floor(qt.start/4),Ut=Math.ceil(qt.count/4),ie=Gt%b.width,j=Math.floor(Gt/b.width),Lt=Ut,Tt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ie),s.pixelStorei(s.UNPACK_SKIP_ROWS,j),i.texSubImage2D(s.TEXTURE_2D,0,ie,j,Lt,Tt,it,gt,b.data)}P.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,Dt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Vt),s.pixelStorei(s.UNPACK_SKIP_ROWS,Wt)}}function At(P,b,it){let gt=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(gt=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(gt=s.TEXTURE_3D);const yt=St(P,b),ht=b.source;i.bindTexture(gt,P.__webglTexture,s.TEXTURE0+it);const jt=r.get(ht);if(ht.version!==jt.__version||yt===!0){i.activeTexture(s.TEXTURE0+it);const Dt=De.getPrimaries(De.workingColorSpace),Vt=b.colorSpace===Ka?null:De.getPrimaries(b.colorSpace),Wt=b.colorSpace===Ka||Dt===Vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let xt=T(b.image,!1,l.maxTextureSize);xt=se(b,xt);const wt=c.convert(b.format,b.colorSpace),qt=c.convert(b.type);let Gt=U(b.internalFormat,wt,qt,b.colorSpace,b.isVideoTexture);st(gt,b);let Ut;const ie=b.mipmaps,j=b.isVideoTexture!==!0,Lt=jt.__version===void 0||yt===!0,Tt=ht.dataReady,Bt=B(b,xt);if(b.isDepthTexture)Gt=w(b.format===il,b.type),Lt&&(j?i.texStorage2D(s.TEXTURE_2D,1,Gt,xt.width,xt.height):i.texImage2D(s.TEXTURE_2D,0,Gt,xt.width,xt.height,0,wt,qt,null));else if(b.isDataTexture)if(ie.length>0){j&&Lt&&i.texStorage2D(s.TEXTURE_2D,Bt,Gt,ie[0].width,ie[0].height);for(let bt=0,vt=ie.length;bt<vt;bt++)Ut=ie[bt],j?Tt&&i.texSubImage2D(s.TEXTURE_2D,bt,0,0,Ut.width,Ut.height,wt,qt,Ut.data):i.texImage2D(s.TEXTURE_2D,bt,Gt,Ut.width,Ut.height,0,wt,qt,Ut.data);b.generateMipmaps=!1}else j?(Lt&&i.texStorage2D(s.TEXTURE_2D,Bt,Gt,xt.width,xt.height),Tt&&pt(b,xt,wt,qt)):i.texImage2D(s.TEXTURE_2D,0,Gt,xt.width,xt.height,0,wt,qt,xt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){j&&Lt&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Bt,Gt,ie[0].width,ie[0].height,xt.depth);for(let bt=0,vt=ie.length;bt<vt;bt++)if(Ut=ie[bt],b.format!==wi)if(wt!==null)if(j){if(Tt)if(b.layerUpdates.size>0){const Ft=s0(Ut.width,Ut.height,b.format,b.type);for(const ae of b.layerUpdates){const ze=Ut.data.subarray(ae*Ft/Ut.data.BYTES_PER_ELEMENT,(ae+1)*Ft/Ut.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,bt,0,0,ae,Ut.width,Ut.height,1,wt,ze)}b.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,bt,0,0,0,Ut.width,Ut.height,xt.depth,wt,Ut.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,bt,Gt,Ut.width,Ut.height,xt.depth,0,Ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else j?Tt&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,bt,0,0,0,Ut.width,Ut.height,xt.depth,wt,qt,Ut.data):i.texImage3D(s.TEXTURE_2D_ARRAY,bt,Gt,Ut.width,Ut.height,xt.depth,0,wt,qt,Ut.data)}else{j&&Lt&&i.texStorage2D(s.TEXTURE_2D,Bt,Gt,ie[0].width,ie[0].height);for(let bt=0,vt=ie.length;bt<vt;bt++)Ut=ie[bt],b.format!==wi?wt!==null?j?Tt&&i.compressedTexSubImage2D(s.TEXTURE_2D,bt,0,0,Ut.width,Ut.height,wt,Ut.data):i.compressedTexImage2D(s.TEXTURE_2D,bt,Gt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):j?Tt&&i.texSubImage2D(s.TEXTURE_2D,bt,0,0,Ut.width,Ut.height,wt,qt,Ut.data):i.texImage2D(s.TEXTURE_2D,bt,Gt,Ut.width,Ut.height,0,wt,qt,Ut.data)}else if(b.isDataArrayTexture)if(j){if(Lt&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Bt,Gt,xt.width,xt.height,xt.depth),Tt)if(b.layerUpdates.size>0){const bt=s0(xt.width,xt.height,b.format,b.type);for(const vt of b.layerUpdates){const Ft=xt.data.subarray(vt*bt/xt.data.BYTES_PER_ELEMENT,(vt+1)*bt/xt.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,vt,xt.width,xt.height,1,wt,qt,Ft)}b.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,wt,qt,xt.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Gt,xt.width,xt.height,xt.depth,0,wt,qt,xt.data);else if(b.isData3DTexture)j?(Lt&&i.texStorage3D(s.TEXTURE_3D,Bt,Gt,xt.width,xt.height,xt.depth),Tt&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,wt,qt,xt.data)):i.texImage3D(s.TEXTURE_3D,0,Gt,xt.width,xt.height,xt.depth,0,wt,qt,xt.data);else if(b.isFramebufferTexture){if(Lt)if(j)i.texStorage2D(s.TEXTURE_2D,Bt,Gt,xt.width,xt.height);else{let bt=xt.width,vt=xt.height;for(let Ft=0;Ft<Bt;Ft++)i.texImage2D(s.TEXTURE_2D,Ft,Gt,bt,vt,0,wt,qt,null),bt>>=1,vt>>=1}}else if(ie.length>0){if(j&&Lt){const bt=nn(ie[0]);i.texStorage2D(s.TEXTURE_2D,Bt,Gt,bt.width,bt.height)}for(let bt=0,vt=ie.length;bt<vt;bt++)Ut=ie[bt],j?Tt&&i.texSubImage2D(s.TEXTURE_2D,bt,0,0,wt,qt,Ut):i.texImage2D(s.TEXTURE_2D,bt,Gt,wt,qt,Ut);b.generateMipmaps=!1}else if(j){if(Lt){const bt=nn(xt);i.texStorage2D(s.TEXTURE_2D,Bt,Gt,bt.width,bt.height)}Tt&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,wt,qt,xt)}else i.texImage2D(s.TEXTURE_2D,0,Gt,wt,qt,xt);S(b)&&v(gt),jt.__version=ht.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Et(P,b,it){if(b.image.length!==6)return;const gt=St(P,b),yt=b.source;i.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+it);const ht=r.get(yt);if(yt.version!==ht.__version||gt===!0){i.activeTexture(s.TEXTURE0+it);const jt=De.getPrimaries(De.workingColorSpace),Dt=b.colorSpace===Ka?null:De.getPrimaries(b.colorSpace),Vt=b.colorSpace===Ka||jt===Dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);const Wt=b.isCompressedTexture||b.image[0].isCompressedTexture,xt=b.image[0]&&b.image[0].isDataTexture,wt=[];for(let vt=0;vt<6;vt++)!Wt&&!xt?wt[vt]=T(b.image[vt],!0,l.maxCubemapSize):wt[vt]=xt?b.image[vt].image:b.image[vt],wt[vt]=se(b,wt[vt]);const qt=wt[0],Gt=c.convert(b.format,b.colorSpace),Ut=c.convert(b.type),ie=U(b.internalFormat,Gt,Ut,b.colorSpace),j=b.isVideoTexture!==!0,Lt=ht.__version===void 0||gt===!0,Tt=yt.dataReady;let Bt=B(b,qt);st(s.TEXTURE_CUBE_MAP,b);let bt;if(Wt){j&&Lt&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Bt,ie,qt.width,qt.height);for(let vt=0;vt<6;vt++){bt=wt[vt].mipmaps;for(let Ft=0;Ft<bt.length;Ft++){const ae=bt[Ft];b.format!==wi?Gt!==null?j?Tt&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft,0,0,ae.width,ae.height,Gt,ae.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft,ie,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?Tt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft,0,0,ae.width,ae.height,Gt,Ut,ae.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft,ie,ae.width,ae.height,0,Gt,Ut,ae.data)}}}else{if(bt=b.mipmaps,j&&Lt){bt.length>0&&Bt++;const vt=nn(wt[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Bt,ie,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(xt){j?Tt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,wt[vt].width,wt[vt].height,Gt,Ut,wt[vt].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,ie,wt[vt].width,wt[vt].height,0,Gt,Ut,wt[vt].data);for(let Ft=0;Ft<bt.length;Ft++){const ze=bt[Ft].image[vt].image;j?Tt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft+1,0,0,ze.width,ze.height,Gt,Ut,ze.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft+1,ie,ze.width,ze.height,0,Gt,Ut,ze.data)}}else{j?Tt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Gt,Ut,wt[vt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,ie,Gt,Ut,wt[vt]);for(let Ft=0;Ft<bt.length;Ft++){const ae=bt[Ft];j?Tt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft+1,0,0,Gt,Ut,ae.image[vt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Ft+1,ie,Gt,Ut,ae.image[vt])}}}S(b)&&v(s.TEXTURE_CUBE_MAP),ht.__version=yt.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function zt(P,b,it,gt,yt,ht){const jt=c.convert(it.format,it.colorSpace),Dt=c.convert(it.type),Vt=U(it.internalFormat,jt,Dt,it.colorSpace),Wt=r.get(b),xt=r.get(it);if(xt.__renderTarget=b,!Wt.__hasExternalTextures){const wt=Math.max(1,b.width>>ht),qt=Math.max(1,b.height>>ht);yt===s.TEXTURE_3D||yt===s.TEXTURE_2D_ARRAY?i.texImage3D(yt,ht,Vt,wt,qt,b.depth,0,jt,Dt,null):i.texImage2D(yt,ht,Vt,wt,qt,0,jt,Dt,null)}i.bindFramebuffer(s.FRAMEBUFFER,P),_e(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,gt,yt,xt.__webglTexture,0,Xt(b)):(yt===s.TEXTURE_2D||yt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&yt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,gt,yt,xt.__webglTexture,ht),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Jt(P,b,it){if(s.bindRenderbuffer(s.RENDERBUFFER,P),b.depthBuffer){const gt=b.depthTexture,yt=gt&&gt.isDepthTexture?gt.type:null,ht=w(b.stencilBuffer,yt),jt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Dt=Xt(b);_e(b)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Dt,ht,b.width,b.height):it?s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,ht,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,ht,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,jt,s.RENDERBUFFER,P)}else{const gt=b.textures;for(let yt=0;yt<gt.length;yt++){const ht=gt[yt],jt=c.convert(ht.format,ht.colorSpace),Dt=c.convert(ht.type),Vt=U(ht.internalFormat,jt,Dt,ht.colorSpace),Wt=Xt(b);it&&_e(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt,Vt,b.width,b.height):_e(b)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt,Vt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Vt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function $t(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(s.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const gt=r.get(b.depthTexture);gt.__renderTarget=b,(!gt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ut(b.depthTexture,0);const yt=gt.__webglTexture,ht=Xt(b);if(b.depthTexture.format===nl)_e(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,yt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,yt,0);else if(b.depthTexture.format===il)_e(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,yt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,yt,0);else throw new Error("Unknown depthTexture format")}function Oe(P){const b=r.get(P),it=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){const gt=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),gt){const yt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,gt.removeEventListener("dispose",yt)};gt.addEventListener("dispose",yt),b.__depthDisposeCallback=yt}b.__boundDepthTexture=gt}if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");const gt=P.texture.mipmaps;gt&&gt.length>0?$t(b.__webglFramebuffer[0],P):$t(b.__webglFramebuffer,P)}else if(it){b.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)if(i.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[gt]),b.__webglDepthbuffer[gt]===void 0)b.__webglDepthbuffer[gt]=s.createRenderbuffer(),Jt(b.__webglDepthbuffer[gt],P,!1);else{const yt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=b.__webglDepthbuffer[gt];s.bindRenderbuffer(s.RENDERBUFFER,ht),s.framebufferRenderbuffer(s.FRAMEBUFFER,yt,s.RENDERBUFFER,ht)}}else{const gt=P.texture.mipmaps;if(gt&&gt.length>0?i.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),Jt(b.__webglDepthbuffer,P,!1);else{const yt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ht),s.framebufferRenderbuffer(s.FRAMEBUFFER,yt,s.RENDERBUFFER,ht)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function Xe(P,b,it){const gt=r.get(P);b!==void 0&&zt(gt.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),it!==void 0&&Oe(P)}function Ee(P){const b=P.texture,it=r.get(P),gt=r.get(b);P.addEventListener("dispose",N);const yt=P.textures,ht=P.isWebGLCubeRenderTarget===!0,jt=yt.length>1;if(jt||(gt.__webglTexture===void 0&&(gt.__webglTexture=s.createTexture()),gt.__version=b.version,f.memory.textures++),ht){it.__webglFramebuffer=[];for(let Dt=0;Dt<6;Dt++)if(b.mipmaps&&b.mipmaps.length>0){it.__webglFramebuffer[Dt]=[];for(let Vt=0;Vt<b.mipmaps.length;Vt++)it.__webglFramebuffer[Dt][Vt]=s.createFramebuffer()}else it.__webglFramebuffer[Dt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){it.__webglFramebuffer=[];for(let Dt=0;Dt<b.mipmaps.length;Dt++)it.__webglFramebuffer[Dt]=s.createFramebuffer()}else it.__webglFramebuffer=s.createFramebuffer();if(jt)for(let Dt=0,Vt=yt.length;Dt<Vt;Dt++){const Wt=r.get(yt[Dt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=s.createTexture(),f.memory.textures++)}if(P.samples>0&&_e(P)===!1){it.__webglMultisampledFramebuffer=s.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let Dt=0;Dt<yt.length;Dt++){const Vt=yt[Dt];it.__webglColorRenderbuffer[Dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,it.__webglColorRenderbuffer[Dt]);const Wt=c.convert(Vt.format,Vt.colorSpace),xt=c.convert(Vt.type),wt=U(Vt.internalFormat,Wt,xt,Vt.colorSpace,P.isXRRenderTarget===!0),qt=Xt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,wt,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,it.__webglColorRenderbuffer[Dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(it.__webglDepthRenderbuffer=s.createRenderbuffer(),Jt(it.__webglDepthRenderbuffer,P,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ht){i.bindTexture(s.TEXTURE_CUBE_MAP,gt.__webglTexture),st(s.TEXTURE_CUBE_MAP,b);for(let Dt=0;Dt<6;Dt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Vt=0;Vt<b.mipmaps.length;Vt++)zt(it.__webglFramebuffer[Dt][Vt],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,Vt);else zt(it.__webglFramebuffer[Dt],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0);S(b)&&v(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(jt){for(let Dt=0,Vt=yt.length;Dt<Vt;Dt++){const Wt=yt[Dt],xt=r.get(Wt);i.bindTexture(s.TEXTURE_2D,xt.__webglTexture),st(s.TEXTURE_2D,Wt),zt(it.__webglFramebuffer,P,Wt,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,0),S(Wt)&&v(s.TEXTURE_2D)}i.unbindTexture()}else{let Dt=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Dt=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Dt,gt.__webglTexture),st(Dt,b),b.mipmaps&&b.mipmaps.length>0)for(let Vt=0;Vt<b.mipmaps.length;Vt++)zt(it.__webglFramebuffer[Vt],P,b,s.COLOR_ATTACHMENT0,Dt,Vt);else zt(it.__webglFramebuffer,P,b,s.COLOR_ATTACHMENT0,Dt,0);S(b)&&v(Dt),i.unbindTexture()}P.depthBuffer&&Oe(P)}function G(P){const b=P.textures;for(let it=0,gt=b.length;it<gt;it++){const yt=b[it];if(S(yt)){const ht=L(P),jt=r.get(yt).__webglTexture;i.bindTexture(ht,jt),v(ht),i.unbindTexture()}}}const fn=[],xe=[];function Pe(P){if(P.samples>0){if(_e(P)===!1){const b=P.textures,it=P.width,gt=P.height;let yt=s.COLOR_BUFFER_BIT;const ht=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,jt=r.get(P),Dt=b.length>1;if(Dt)for(let Wt=0;Wt<b.length;Wt++)i.bindFramebuffer(s.FRAMEBUFFER,jt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,jt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,jt.__webglMultisampledFramebuffer);const Vt=P.texture.mipmaps;Vt&&Vt.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,jt.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,jt.__webglFramebuffer);for(let Wt=0;Wt<b.length;Wt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(yt|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(yt|=s.STENCIL_BUFFER_BIT)),Dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,jt.__webglColorRenderbuffer[Wt]);const xt=r.get(b[Wt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,xt,0)}s.blitFramebuffer(0,0,it,gt,0,0,it,gt,yt,s.NEAREST),p===!0&&(fn.length=0,xe.length=0,fn.push(s.COLOR_ATTACHMENT0+Wt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(fn.push(ht),xe.push(ht),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,xe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fn))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Dt)for(let Wt=0;Wt<b.length;Wt++){i.bindFramebuffer(s.FRAMEBUFFER,jt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.RENDERBUFFER,jt.__webglColorRenderbuffer[Wt]);const xt=r.get(b[Wt]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,jt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.TEXTURE_2D,xt,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,jt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&p){const b=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function Xt(P){return Math.min(l.maxSamples,P.samples)}function _e(P){const b=r.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Zt(P){const b=f.render.frame;g.get(P)!==b&&(g.set(P,b),P.update())}function se(P,b){const it=P.colorSpace,gt=P.format,yt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||it!==Hs&&it!==Ka&&(De.getTransfer(it)===Ve?(gt!==wi||yt!==Vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),b}function nn(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(m.width=P.naturalWidth||P.width,m.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(m.width=P.displayWidth,m.height=P.displayHeight):(m.width=P.width,m.height=P.height),m}this.allocateTextureUnit=nt,this.resetTextureUnits=rt,this.setTexture2D=ut,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=Xe,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=zt,this.useMultisampledRTT=_e}function T2(s,t){function i(r,l=Ka){let c;const f=De.getTransfer(l);if(r===Vi)return s.UNSIGNED_BYTE;if(r===gp)return s.UNSIGNED_SHORT_4_4_4_4;if(r===_p)return s.UNSIGNED_SHORT_5_5_5_1;if(r===dy)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===fy)return s.BYTE;if(r===hy)return s.SHORT;if(r===tl)return s.UNSIGNED_SHORT;if(r===mp)return s.INT;if(r===Lr)return s.UNSIGNED_INT;if(r===ga)return s.FLOAT;if(r===sl)return s.HALF_FLOAT;if(r===py)return s.ALPHA;if(r===my)return s.RGB;if(r===wi)return s.RGBA;if(r===nl)return s.DEPTH_COMPONENT;if(r===il)return s.DEPTH_STENCIL;if(r===gy)return s.RED;if(r===vp)return s.RED_INTEGER;if(r===_y)return s.RG;if(r===yp)return s.RG_INTEGER;if(r===xp)return s.RGBA_INTEGER;if(r===Yc||r===Zc||r===Kc||r===Qc)if(f===Ve)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Yc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Zc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Qc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Yc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Zc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Kc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Qc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ud||r===Ld||r===Nd||r===Od)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===Ud)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ld)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Nd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Od)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Pd||r===zd||r===Id)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(r===Pd||r===zd)return f===Ve?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===Id)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Bd||r===Fd||r===Hd||r===Gd||r===Vd||r===kd||r===Xd||r===jd||r===Wd||r===qd||r===Yd||r===Zd||r===Kd||r===Qd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(r===Bd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Fd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Hd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Gd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Vd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===kd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Xd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===jd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===qd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Yd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Zd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Kd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Qd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Jc||r===Jd||r===$d)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(r===Jc)return f===Ve?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Jd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===$d)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===vy||r===tp||r===ep||r===np)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(r===Jc)return c.COMPRESSED_RED_RGTC1_EXT;if(r===tp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ep)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===np)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===el?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const b2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class R2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,r){if(this.texture===null){const l=new Yn,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!==r.depthNear||i.depthFar!==r.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,r=new tr({vertexShader:b2,fragmentShader:A2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Di(new vu(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C2 extends Pr{constructor(t,i){super();const r=this;let l=null,c=1,f=null,d="local-floor",p=1,m=null,g=null,_=null,y=null,M=null,E=null;const T=new R2,S=i.getContextAttributes();let v=null,L=null;const U=[],w=[],B=new ce;let H=null;const N=new _i;N.viewport=new en;const X=new _i;X.viewport=new en;const D=[N,X],C=new Wb;let V=null,rt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let pt=U[Z];return pt===void 0&&(pt=new ad,U[Z]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(Z){let pt=U[Z];return pt===void 0&&(pt=new ad,U[Z]=pt),pt.getGripSpace()},this.getHand=function(Z){let pt=U[Z];return pt===void 0&&(pt=new ad,U[Z]=pt),pt.getHandSpace()};function nt(Z){const pt=w.indexOf(Z.inputSource);if(pt===-1)return;const At=U[pt];At!==void 0&&(At.update(Z.inputSource,Z.frame,m||f),At.dispatchEvent({type:Z.type,data:Z.inputSource}))}function ft(){l.removeEventListener("select",nt),l.removeEventListener("selectstart",nt),l.removeEventListener("selectend",nt),l.removeEventListener("squeeze",nt),l.removeEventListener("squeezestart",nt),l.removeEventListener("squeezeend",nt),l.removeEventListener("end",ft),l.removeEventListener("inputsourceschange",ut);for(let Z=0;Z<U.length;Z++){const pt=w[Z];pt!==null&&(w[Z]=null,U[Z].disconnect(pt))}V=null,rt=null,T.reset(),t.setRenderTarget(v),M=null,y=null,_=null,l=null,L=null,St.stop(),r.isPresenting=!1,t.setPixelRatio(H),t.setSize(B.width,B.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(Z){m=Z},this.getBaseLayer=function(){return y!==null?y:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",nt),l.addEventListener("selectstart",nt),l.addEventListener("selectend",nt),l.addEventListener("squeeze",nt),l.addEventListener("squeezestart",nt),l.addEventListener("squeezeend",nt),l.addEventListener("end",ft),l.addEventListener("inputsourceschange",ut),S.xrCompatible!==!0&&await i.makeXRCompatible(),H=t.getPixelRatio(),t.getSize(B),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Et=null,zt=null;S.depth&&(zt=S.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,At=S.stencil?il:nl,Et=S.stencil?el:Lr);const Jt={colorFormat:i.RGBA8,depthFormat:zt,scaleFactor:c};_=new XRWebGLBinding(l,i),y=_.createProjectionLayer(Jt),l.updateRenderState({layers:[y]}),t.setPixelRatio(1),t.setSize(y.textureWidth,y.textureHeight,!1),L=new Or(y.textureWidth,y.textureHeight,{format:wi,type:Vi,depthTexture:new Ly(y.textureWidth,y.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}else{const At={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,At),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),L=new Or(M.framebufferWidth,M.framebufferHeight,{format:wi,type:Vi,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(d),St.setContext(l),St.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function ut(Z){for(let pt=0;pt<Z.removed.length;pt++){const At=Z.removed[pt],Et=w.indexOf(At);Et>=0&&(w[Et]=null,U[Et].disconnect(At))}for(let pt=0;pt<Z.added.length;pt++){const At=Z.added[pt];let Et=w.indexOf(At);if(Et===-1){for(let Jt=0;Jt<U.length;Jt++)if(Jt>=w.length){w.push(At),Et=Jt;break}else if(w[Jt]===null){w[Jt]=At,Et=Jt;break}if(Et===-1)break}const zt=U[Et];zt&&zt.connect(At)}}const z=new J,Q=new J;function K(Z,pt,At){z.setFromMatrixPosition(pt.matrixWorld),Q.setFromMatrixPosition(At.matrixWorld);const Et=z.distanceTo(Q),zt=pt.projectionMatrix.elements,Jt=At.projectionMatrix.elements,$t=zt[14]/(zt[10]-1),Oe=zt[14]/(zt[10]+1),Xe=(zt[9]+1)/zt[5],Ee=(zt[9]-1)/zt[5],G=(zt[8]-1)/zt[0],fn=(Jt[8]+1)/Jt[0],xe=$t*G,Pe=$t*fn,Xt=Et/(-G+fn),_e=Xt*-G;if(pt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(_e),Z.translateZ(Xt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),zt[10]===-1)Z.projectionMatrix.copy(pt.projectionMatrix),Z.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Zt=$t+Xt,se=Oe+Xt,nn=xe-_e,P=Pe+(Et-_e),b=Xe*Oe/se*Zt,it=Ee*Oe/se*Zt;Z.projectionMatrix.makePerspective(nn,P,b,it,Zt,se),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Mt(Z,pt){pt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(pt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let pt=Z.near,At=Z.far;T.texture!==null&&(T.depthNear>0&&(pt=T.depthNear),T.depthFar>0&&(At=T.depthFar)),C.near=X.near=N.near=pt,C.far=X.far=N.far=At,(V!==C.near||rt!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),V=C.near,rt=C.far),N.layers.mask=Z.layers.mask|2,X.layers.mask=Z.layers.mask|4,C.layers.mask=N.layers.mask|X.layers.mask;const Et=Z.parent,zt=C.cameras;Mt(C,Et);for(let Jt=0;Jt<zt.length;Jt++)Mt(zt[Jt],Et);zt.length===2?K(C,N,X):C.projectionMatrix.copy(N.projectionMatrix),Ct(Z,C,Et)};function Ct(Z,pt,At){At===null?Z.matrix.copy(pt.matrixWorld):(Z.matrix.copy(At.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(pt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(pt.projectionMatrix),Z.projectionMatrixInverse.copy(pt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ip*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(y===null&&M===null))return p},this.setFoveation=function(Z){p=Z,y!==null&&(y.fixedFoveation=Z),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Z)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(C)};let O=null;function st(Z,pt){if(g=pt.getViewerPose(m||f),E=pt,g!==null){const At=g.views;M!==null&&(t.setRenderTargetFramebuffer(L,M.framebuffer),t.setRenderTarget(L));let Et=!1;At.length!==C.cameras.length&&(C.cameras.length=0,Et=!0);for(let $t=0;$t<At.length;$t++){const Oe=At[$t];let Xe=null;if(M!==null)Xe=M.getViewport(Oe);else{const G=_.getViewSubImage(y,Oe);Xe=G.viewport,$t===0&&(t.setRenderTargetTextures(L,G.colorTexture,G.depthStencilTexture),t.setRenderTarget(L))}let Ee=D[$t];Ee===void 0&&(Ee=new _i,Ee.layers.enable($t),Ee.viewport=new en,D[$t]=Ee),Ee.matrix.fromArray(Oe.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Oe.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),$t===0&&(C.matrix.copy(Ee.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Et===!0&&C.cameras.push(Ee)}const zt=l.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&_){const $t=_.getDepthInformation(At[0]);$t&&$t.isValid&&$t.texture&&T.init(t,$t,l.renderState)}}for(let At=0;At<U.length;At++){const Et=w[At],zt=U[At];Et!==null&&zt!==void 0&&zt.update(Et,pt,m||f)}O&&O(Z,pt),pt.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:pt}),E=null}const St=new Py;St.setAnimationLoop(st),this.setAnimationLoop=function(Z){O=Z},this.dispose=function(){}}}const br=new ki,w2=new Ke;function D2(s,t){function i(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function r(S,v){v.color.getRGB(S.fogColor.value,Cy(s)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function l(S,v,L,U,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(S,v):v.isMeshToonMaterial?(c(S,v),_(S,v)):v.isMeshPhongMaterial?(c(S,v),g(S,v)):v.isMeshStandardMaterial?(c(S,v),y(S,v),v.isMeshPhysicalMaterial&&M(S,v,w)):v.isMeshMatcapMaterial?(c(S,v),E(S,v)):v.isMeshDepthMaterial?c(S,v):v.isMeshDistanceMaterial?(c(S,v),T(S,v)):v.isMeshNormalMaterial?c(S,v):v.isLineBasicMaterial?(f(S,v),v.isLineDashedMaterial&&d(S,v)):v.isPointsMaterial?p(S,v,L,U):v.isSpriteMaterial?m(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,i(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,i(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,i(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===qn&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,i(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===qn&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,i(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,i(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const L=t.get(v),U=L.envMap,w=L.envMapRotation;U&&(S.envMap.value=U,br.copy(w),br.x*=-1,br.y*=-1,br.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(br.y*=-1,br.z*=-1),S.envMapRotation.value.setFromMatrix4(w2.makeRotationFromEuler(br)),S.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap&&(S.lightMap.value=v.lightMap,S.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,S.lightMapTransform)),v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,S.aoMapTransform))}function f(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,i(v.map,S.mapTransform))}function d(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function p(S,v,L,U){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*L,S.scale.value=U*.5,v.map&&(S.map.value=v.map,i(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,i(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function m(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,i(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,i(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function g(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function _(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function y(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,S.roughnessMapTransform)),v.envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function M(S,v,L){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===qn&&S.clearcoatNormalScale.value.negate())),v.dispersion>0&&(S.dispersion.value=v.dispersion),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=L.texture,S.transmissionSamplerSize.value.set(L.width,L.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,v){v.matcap&&(S.matcap.value=v.matcap)}function T(S,v){const L=t.get(v).light;S.referencePosition.value.setFromMatrixPosition(L.matrixWorld),S.nearDistance.value=L.shadow.camera.near,S.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function U2(s,t,i,r){let l={},c={},f=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function p(L,U){const w=U.program;r.uniformBlockBinding(L,w)}function m(L,U){let w=l[L.id];w===void 0&&(E(L),w=g(L),l[L.id]=w,L.addEventListener("dispose",S));const B=U.program;r.updateUBOMapping(L,B);const H=t.render.frame;c[L.id]!==H&&(y(L),c[L.id]=H)}function g(L){const U=_();L.__bindingPointIndex=U;const w=s.createBuffer(),B=L.__size,H=L.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,B,H),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,U,w),w}function _(){for(let L=0;L<d;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(L){const U=l[L.id],w=L.uniforms,B=L.__cache;s.bindBuffer(s.UNIFORM_BUFFER,U);for(let H=0,N=w.length;H<N;H++){const X=Array.isArray(w[H])?w[H]:[w[H]];for(let D=0,C=X.length;D<C;D++){const V=X[D];if(M(V,H,D,B)===!0){const rt=V.__offset,nt=Array.isArray(V.value)?V.value:[V.value];let ft=0;for(let ut=0;ut<nt.length;ut++){const z=nt[ut],Q=T(z);typeof z=="number"||typeof z=="boolean"?(V.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,rt+ft,V.__data)):z.isMatrix3?(V.__data[0]=z.elements[0],V.__data[1]=z.elements[1],V.__data[2]=z.elements[2],V.__data[3]=0,V.__data[4]=z.elements[3],V.__data[5]=z.elements[4],V.__data[6]=z.elements[5],V.__data[7]=0,V.__data[8]=z.elements[6],V.__data[9]=z.elements[7],V.__data[10]=z.elements[8],V.__data[11]=0):(z.toArray(V.__data,ft),ft+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,rt,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(L,U,w,B){const H=L.value,N=U+"_"+w;if(B[N]===void 0)return typeof H=="number"||typeof H=="boolean"?B[N]=H:B[N]=H.clone(),!0;{const X=B[N];if(typeof H=="number"||typeof H=="boolean"){if(X!==H)return B[N]=H,!0}else if(X.equals(H)===!1)return X.copy(H),!0}return!1}function E(L){const U=L.uniforms;let w=0;const B=16;for(let N=0,X=U.length;N<X;N++){const D=Array.isArray(U[N])?U[N]:[U[N]];for(let C=0,V=D.length;C<V;C++){const rt=D[C],nt=Array.isArray(rt.value)?rt.value:[rt.value];for(let ft=0,ut=nt.length;ft<ut;ft++){const z=nt[ft],Q=T(z),K=w%B,Mt=K%Q.boundary,Ct=K+Mt;w+=Mt,Ct!==0&&B-Ct<Q.storage&&(w+=B-Ct),rt.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),rt.__offset=w,w+=Q.storage}}}const H=w%B;return H>0&&(w+=B-H),L.__size=w,L.__cache={},this}function T(L){const U={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(U.boundary=4,U.storage=4):L.isVector2?(U.boundary=8,U.storage=8):L.isVector3||L.isColor?(U.boundary=16,U.storage=12):L.isVector4?(U.boundary=16,U.storage=16):L.isMatrix3?(U.boundary=48,U.storage=48):L.isMatrix4?(U.boundary=64,U.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),U}function S(L){const U=L.target;U.removeEventListener("dispose",S);const w=f.indexOf(U.__bindingPointIndex);f.splice(w,1),s.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function v(){for(const L in l)s.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:p,update:m,dispose:v}}class L2{constructor(t={}){const{canvas:i=ob(),context:r=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:y=!1}=t;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),T=new Int32Array(4);let S=null,v=null;const L=[],U=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ja,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let B=!1;this._outputColorSpace=gi;let H=0,N=0,X=null,D=-1,C=null;const V=new en,rt=new en;let nt=null;const ft=new Me(0);let ut=0,z=i.width,Q=i.height,K=1,Mt=null,Ct=null;const O=new en(0,0,z,Q),st=new en(0,0,z,Q);let St=!1;const Z=new Ep;let pt=!1,At=!1;const Et=new Ke,zt=new Ke,Jt=new J,$t=new en,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function Ee(){return X===null?K:1}let G=r;function fn(R,q){return i.getContext(R,q)}try{const R={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${pp}`),i.addEventListener("webglcontextlost",Bt,!1),i.addEventListener("webglcontextrestored",bt,!1),i.addEventListener("webglcontextcreationerror",vt,!1),G===null){const q="webgl2";if(G=fn(q,R),G===null)throw fn(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let xe,Pe,Xt,_e,Zt,se,nn,P,b,it,gt,yt,ht,jt,Dt,Vt,Wt,xt,wt,qt,Gt,Ut,ie,j;function Lt(){xe=new VR(G),xe.init(),Ut=new T2(G,xe),Pe=new PR(G,xe,t,Ut),Xt=new M2(G,xe),Pe.reverseDepthBuffer&&y&&Xt.buffers.depth.setReversed(!0),_e=new jR(G),Zt=new c2,se=new E2(G,xe,Xt,Zt,Pe,Ut,_e),nn=new IR(w),P=new GR(w),b=new Qb(G),ie=new NR(G,b),it=new kR(G,b,_e,ie),gt=new qR(G,it,b,_e),wt=new WR(G,Pe,se),Vt=new zR(Zt),yt=new l2(w,nn,P,xe,Pe,ie,Vt),ht=new D2(w,Zt),jt=new f2,Dt=new _2(xe),xt=new LR(w,nn,P,Xt,gt,M,p),Wt=new x2(w,gt,Pe),j=new U2(G,_e,Pe,Xt),qt=new OR(G,xe,_e),Gt=new XR(G,xe,_e),_e.programs=yt.programs,w.capabilities=Pe,w.extensions=xe,w.properties=Zt,w.renderLists=jt,w.shadowMap=Wt,w.state=Xt,w.info=_e}Lt();const Tt=new C2(w,G);this.xr=Tt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const R=xe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=xe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(R){R!==void 0&&(K=R,this.setSize(z,Q,!1))},this.getSize=function(R){return R.set(z,Q)},this.setSize=function(R,q,ot=!0){if(Tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,Q=q,i.width=Math.floor(R*K),i.height=Math.floor(q*K),ot===!0&&(i.style.width=R+"px",i.style.height=q+"px"),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(z*K,Q*K).floor()},this.setDrawingBufferSize=function(R,q,ot){z=R,Q=q,K=ot,i.width=Math.floor(R*ot),i.height=Math.floor(q*ot),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(V)},this.getViewport=function(R){return R.copy(O)},this.setViewport=function(R,q,ot,lt){R.isVector4?O.set(R.x,R.y,R.z,R.w):O.set(R,q,ot,lt),Xt.viewport(V.copy(O).multiplyScalar(K).round())},this.getScissor=function(R){return R.copy(st)},this.setScissor=function(R,q,ot,lt){R.isVector4?st.set(R.x,R.y,R.z,R.w):st.set(R,q,ot,lt),Xt.scissor(rt.copy(st).multiplyScalar(K).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(R){Xt.setScissorTest(St=R)},this.setOpaqueSort=function(R){Mt=R},this.setTransparentSort=function(R){Ct=R},this.getClearColor=function(R){return R.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,ot=!0){let lt=0;if(R){let W=!1;if(X!==null){const Rt=X.texture.format;W=Rt===xp||Rt===yp||Rt===vp}if(W){const Rt=X.texture.type,Nt=Rt===Vi||Rt===Lr||Rt===tl||Rt===el||Rt===gp||Rt===_p,It=xt.getClearColor(),Pt=xt.getClearAlpha(),ee=It.r,ne=It.g,Yt=It.b;Nt?(E[0]=ee,E[1]=ne,E[2]=Yt,E[3]=Pt,G.clearBufferuiv(G.COLOR,0,E)):(T[0]=ee,T[1]=ne,T[2]=Yt,T[3]=Pt,G.clearBufferiv(G.COLOR,0,T))}else lt|=G.COLOR_BUFFER_BIT}q&&(lt|=G.DEPTH_BUFFER_BIT),ot&&(lt|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(lt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Bt,!1),i.removeEventListener("webglcontextrestored",bt,!1),i.removeEventListener("webglcontextcreationerror",vt,!1),xt.dispose(),jt.dispose(),Dt.dispose(),Zt.dispose(),nn.dispose(),P.dispose(),gt.dispose(),ie.dispose(),j.dispose(),yt.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",qs),Tt.removeEventListener("sessionend",Ys),Oi.stop()};function Bt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;const R=_e.autoReset,q=Wt.enabled,ot=Wt.autoUpdate,lt=Wt.needsUpdate,W=Wt.type;Lt(),_e.autoReset=R,Wt.enabled=q,Wt.autoUpdate=ot,Wt.needsUpdate=lt,Wt.type=W}function vt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ft(R){const q=R.target;q.removeEventListener("dispose",Ft),ae(q)}function ae(R){ze(R),Zt.remove(R)}function ze(R){const q=Zt.get(R).programs;q!==void 0&&(q.forEach(function(ot){yt.releaseProgram(ot)}),R.isShaderMaterial&&yt.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,ot,lt,W,Rt){q===null&&(q=Oe);const Nt=W.isMesh&&W.matrixWorld.determinant()<0,It=Ks(R,q,ot,lt,W);Xt.setMaterial(lt,Nt);let Pt=ot.index,ee=1;if(lt.wireframe===!0){if(Pt=it.getWireframeAttribute(ot),Pt===void 0)return;ee=2}const ne=ot.drawRange,Yt=ot.attributes.position;let de=ne.start*ee,Te=(ne.start+ne.count)*ee;Rt!==null&&(de=Math.max(de,Rt.start*ee),Te=Math.min(Te,(Rt.start+Rt.count)*ee)),Pt!==null?(de=Math.max(de,0),Te=Math.min(Te,Pt.count)):Yt!=null&&(de=Math.max(de,0),Te=Math.min(Te,Yt.count));const Ie=Te-de;if(Ie<0||Ie===1/0)return;ie.setup(W,lt,It,ot,Pt);let Re,re=qt;if(Pt!==null&&(Re=b.get(Pt),re=Gt,re.setIndex(Re)),W.isMesh)lt.wireframe===!0?(Xt.setLineWidth(lt.wireframeLinewidth*Ee()),re.setMode(G.LINES)):re.setMode(G.TRIANGLES);else if(W.isLine){let Qt=lt.linewidth;Qt===void 0&&(Qt=1),Xt.setLineWidth(Qt*Ee()),W.isLineSegments?re.setMode(G.LINES):W.isLineLoop?re.setMode(G.LINE_LOOP):re.setMode(G.LINE_STRIP)}else W.isPoints?re.setMode(G.POINTS):W.isSprite&&re.setMode(G.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Ps("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(xe.get("WEBGL_multi_draw"))re.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Qt=W._multiDrawStarts,hn=W._multiDrawCounts,be=W._multiDrawCount,In=Pt?b.get(Pt).bytesPerElement:1,Si=Zt.get(lt).currentProgram.getUniforms();for(let Ln=0;Ln<be;Ln++)Si.setValue(G,"_gl_DrawID",Ln),re.render(Qt[Ln]/In,hn[Ln])}else if(W.isInstancedMesh)re.renderInstances(de,Ie,W.count);else if(ot.isInstancedBufferGeometry){const Qt=ot._maxInstanceCount!==void 0?ot._maxInstanceCount:1/0,hn=Math.min(ot.instanceCount,Qt);re.renderInstances(de,Ie,hn)}else re.render(de,Ie)};function Ae(R,q,ot){R.transparent===!0&&R.side===ma&&R.forceSinglePass===!1?(R.side=qn,R.needsUpdate=!0,Qe(R,q,ot),R.side=$a,R.needsUpdate=!0,Qe(R,q,ot),R.side=ma):Qe(R,q,ot)}this.compile=function(R,q,ot=null){ot===null&&(ot=R),v=Dt.get(ot),v.init(q),U.push(v),ot.traverseVisible(function(W){W.isLight&&W.layers.test(q.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),R!==ot&&R.traverseVisible(function(W){W.isLight&&W.layers.test(q.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),v.setupLights();const lt=new Set;return R.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Rt=W.material;if(Rt)if(Array.isArray(Rt))for(let Nt=0;Nt<Rt.length;Nt++){const It=Rt[Nt];Ae(It,ot,W),lt.add(It)}else Ae(Rt,ot,W),lt.add(Rt)}),v=U.pop(),lt},this.compileAsync=function(R,q,ot=null){const lt=this.compile(R,q,ot);return new Promise(W=>{function Rt(){if(lt.forEach(function(Nt){Zt.get(Nt).currentProgram.isReady()&&lt.delete(Nt)}),lt.size===0){W(R);return}setTimeout(Rt,10)}xe.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let xn=null;function yi(R){xn&&xn(R)}function qs(){Oi.stop()}function Ys(){Oi.start()}const Oi=new Py;Oi.setAnimationLoop(yi),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(R){xn=R,Tt.setAnimationLoop(R),R===null?Oi.stop():Oi.start()},Tt.addEventListener("sessionstart",qs),Tt.addEventListener("sessionend",Ys),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(q),q=Tt.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,q,X),v=Dt.get(R,U.length),v.init(q),U.push(v),zt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Z.setFromProjectionMatrix(zt),At=this.localClippingEnabled,pt=Vt.init(this.clippingPlanes,At),S=jt.get(R,L.length),S.init(),L.push(S),Tt.enabled===!0&&Tt.isPresenting===!0){const Rt=w.xr.getDepthSensingMesh();Rt!==null&&er(Rt,q,-1/0,w.sortObjects)}er(R,q,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(Mt,Ct),Xe=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,Xe&&xt.addToRenderList(S,R),this.info.render.frame++,pt===!0&&Vt.beginShadows();const ot=v.state.shadowsArray;Wt.render(ot,R,q),pt===!0&&Vt.endShadows(),this.info.autoReset===!0&&this.info.reset();const lt=S.opaque,W=S.transmissive;if(v.setupLights(),q.isArrayCamera){const Rt=q.cameras;if(W.length>0)for(let Nt=0,It=Rt.length;Nt<It;Nt++){const Pt=Rt[Nt];Zs(lt,W,R,Pt)}Xe&&xt.render(R);for(let Nt=0,It=Rt.length;Nt<It;Nt++){const Pt=Rt[Nt];zr(S,R,Pt,Pt.viewport)}}else W.length>0&&Zs(lt,W,R,q),Xe&&xt.render(R),zr(S,R,q);X!==null&&N===0&&(se.updateMultisampleRenderTarget(X),se.updateRenderTargetMipmap(X)),R.isScene===!0&&R.onAfterRender(w,R,q),ie.resetDefaultState(),D=-1,C=null,U.pop(),U.length>0?(v=U[U.length-1],pt===!0&&Vt.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,L.pop(),L.length>0?S=L[L.length-1]:S=null};function er(R,q,ot,lt){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)ot=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){lt&&$t.setFromMatrixPosition(R.matrixWorld).applyMatrix4(zt);const Nt=gt.update(R),It=R.material;It.visible&&S.push(R,Nt,It,ot,$t.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const Nt=gt.update(R),It=R.material;if(lt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),$t.copy(R.boundingSphere.center)):(Nt.boundingSphere===null&&Nt.computeBoundingSphere(),$t.copy(Nt.boundingSphere.center)),$t.applyMatrix4(R.matrixWorld).applyMatrix4(zt)),Array.isArray(It)){const Pt=Nt.groups;for(let ee=0,ne=Pt.length;ee<ne;ee++){const Yt=Pt[ee],de=It[Yt.materialIndex];de&&de.visible&&S.push(R,Nt,de,ot,$t.z,Yt)}}else It.visible&&S.push(R,Nt,It,ot,$t.z,null)}}const Rt=R.children;for(let Nt=0,It=Rt.length;Nt<It;Nt++)er(Rt[Nt],q,ot,lt)}function zr(R,q,ot,lt){const W=R.opaque,Rt=R.transmissive,Nt=R.transparent;v.setupLightsView(ot),pt===!0&&Vt.setGlobalState(w.clippingPlanes,ot),lt&&Xt.viewport(V.copy(lt)),W.length>0&&nr(W,q,ot),Rt.length>0&&nr(Rt,q,ot),Nt.length>0&&nr(Nt,q,ot),Xt.buffers.depth.setTest(!0),Xt.buffers.depth.setMask(!0),Xt.buffers.color.setMask(!0),Xt.setPolygonOffset(!1)}function Zs(R,q,ot,lt){if((ot.isScene===!0?ot.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[lt.id]===void 0&&(v.state.transmissionRenderTarget[lt.id]=new Or(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")||xe.has("EXT_color_buffer_float")?sl:Vi,minFilter:Ur,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:De.workingColorSpace}));const Rt=v.state.transmissionRenderTarget[lt.id],Nt=lt.viewport||V;Rt.setSize(Nt.z*w.transmissionResolutionScale,Nt.w*w.transmissionResolutionScale);const It=w.getRenderTarget();w.setRenderTarget(Rt),w.getClearColor(ft),ut=w.getClearAlpha(),ut<1&&w.setClearColor(16777215,.5),w.clear(),Xe&&xt.render(ot);const Pt=w.toneMapping;w.toneMapping=Ja;const ee=lt.viewport;if(lt.viewport!==void 0&&(lt.viewport=void 0),v.setupLightsView(lt),pt===!0&&Vt.setGlobalState(w.clippingPlanes,lt),nr(R,ot,lt),se.updateMultisampleRenderTarget(Rt),se.updateRenderTargetMipmap(Rt),xe.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let Yt=0,de=q.length;Yt<de;Yt++){const Te=q[Yt],Ie=Te.object,Re=Te.geometry,re=Te.material,Qt=Te.group;if(re.side===ma&&Ie.layers.test(lt.layers)){const hn=re.side;re.side=qn,re.needsUpdate=!0,xi(Ie,ot,lt,Re,re,Qt),re.side=hn,re.needsUpdate=!0,ne=!0}}ne===!0&&(se.updateMultisampleRenderTarget(Rt),se.updateRenderTargetMipmap(Rt))}w.setRenderTarget(It),w.setClearColor(ft,ut),ee!==void 0&&(lt.viewport=ee),w.toneMapping=Pt}function nr(R,q,ot){const lt=q.isScene===!0?q.overrideMaterial:null;for(let W=0,Rt=R.length;W<Rt;W++){const Nt=R[W],It=Nt.object,Pt=Nt.geometry,ee=Nt.group;let ne=Nt.material;ne.allowOverride===!0&&lt!==null&&(ne=lt),It.layers.test(ot.layers)&&xi(It,q,ot,Pt,ne,ee)}}function xi(R,q,ot,lt,W,Rt){R.onBeforeRender(w,q,ot,lt,W,Rt),R.modelViewMatrix.multiplyMatrices(ot.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),W.onBeforeRender(w,q,ot,lt,R,Rt),W.transparent===!0&&W.side===ma&&W.forceSinglePass===!1?(W.side=qn,W.needsUpdate=!0,w.renderBufferDirect(ot,q,lt,W,R,Rt),W.side=$a,W.needsUpdate=!0,w.renderBufferDirect(ot,q,lt,W,R,Rt),W.side=ma):w.renderBufferDirect(ot,q,lt,W,R,Rt),R.onAfterRender(w,q,ot,lt,W,Rt)}function Qe(R,q,ot){q.isScene!==!0&&(q=Oe);const lt=Zt.get(R),W=v.state.lights,Rt=v.state.shadowsArray,Nt=W.state.version,It=yt.getParameters(R,W.state,Rt,q,ot),Pt=yt.getProgramCacheKey(It);let ee=lt.programs;lt.environment=R.isMeshStandardMaterial?q.environment:null,lt.fog=q.fog,lt.envMap=(R.isMeshStandardMaterial?P:nn).get(R.envMap||lt.environment),lt.envMapRotation=lt.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,ee===void 0&&(R.addEventListener("dispose",Ft),ee=new Map,lt.programs=ee);let ne=ee.get(Pt);if(ne!==void 0){if(lt.currentProgram===ne&&lt.lightsStateVersion===Nt)return ji(R,It),ne}else It.uniforms=yt.getUniforms(R),R.onBeforeCompile(It,w),ne=yt.acquireProgram(It,Pt),ee.set(Pt,ne),lt.uniforms=It.uniforms;const Yt=lt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Yt.clippingPlanes=Vt.uniform),ji(R,It),lt.needsLights=Su(R),lt.lightsStateVersion=Nt,lt.needsLights&&(Yt.ambientLightColor.value=W.state.ambient,Yt.lightProbe.value=W.state.probe,Yt.directionalLights.value=W.state.directional,Yt.directionalLightShadows.value=W.state.directionalShadow,Yt.spotLights.value=W.state.spot,Yt.spotLightShadows.value=W.state.spotShadow,Yt.rectAreaLights.value=W.state.rectArea,Yt.ltc_1.value=W.state.rectAreaLTC1,Yt.ltc_2.value=W.state.rectAreaLTC2,Yt.pointLights.value=W.state.point,Yt.pointLightShadows.value=W.state.pointShadow,Yt.hemisphereLights.value=W.state.hemi,Yt.directionalShadowMap.value=W.state.directionalShadowMap,Yt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Yt.spotShadowMap.value=W.state.spotShadowMap,Yt.spotLightMatrix.value=W.state.spotLightMatrix,Yt.spotLightMap.value=W.state.spotLightMap,Yt.pointShadowMap.value=W.state.pointShadowMap,Yt.pointShadowMatrix.value=W.state.pointShadowMatrix),lt.currentProgram=ne,lt.uniformsList=null,ne}function Sn(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=tu.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function ji(R,q){const ot=Zt.get(R);ot.outputColorSpace=q.outputColorSpace,ot.batching=q.batching,ot.batchingColor=q.batchingColor,ot.instancing=q.instancing,ot.instancingColor=q.instancingColor,ot.instancingMorph=q.instancingMorph,ot.skinning=q.skinning,ot.morphTargets=q.morphTargets,ot.morphNormals=q.morphNormals,ot.morphColors=q.morphColors,ot.morphTargetsCount=q.morphTargetsCount,ot.numClippingPlanes=q.numClippingPlanes,ot.numIntersection=q.numClipIntersection,ot.vertexAlphas=q.vertexAlphas,ot.vertexTangents=q.vertexTangents,ot.toneMapping=q.toneMapping}function Ks(R,q,ot,lt,W){q.isScene!==!0&&(q=Oe),se.resetTextureUnits();const Rt=q.fog,Nt=lt.isMeshStandardMaterial?q.environment:null,It=X===null?w.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Hs,Pt=(lt.isMeshStandardMaterial?P:nn).get(lt.envMap||Nt),ee=lt.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,ne=!!ot.attributes.tangent&&(!!lt.normalMap||lt.anisotropy>0),Yt=!!ot.morphAttributes.position,de=!!ot.morphAttributes.normal,Te=!!ot.morphAttributes.color;let Ie=Ja;lt.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Ie=w.toneMapping);const Re=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,re=Re!==void 0?Re.length:0,Qt=Zt.get(lt),hn=v.state.lights;if(pt===!0&&(At===!0||R!==C)){const Je=R===C&&lt.id===D;Vt.setState(lt,R,Je)}let be=!1;lt.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==hn.state.version||Qt.outputColorSpace!==It||W.isBatchedMesh&&Qt.batching===!1||!W.isBatchedMesh&&Qt.batching===!0||W.isBatchedMesh&&Qt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Qt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Qt.instancing===!1||!W.isInstancedMesh&&Qt.instancing===!0||W.isSkinnedMesh&&Qt.skinning===!1||!W.isSkinnedMesh&&Qt.skinning===!0||W.isInstancedMesh&&Qt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Qt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Qt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Qt.instancingMorph===!1&&W.morphTexture!==null||Qt.envMap!==Pt||lt.fog===!0&&Qt.fog!==Rt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Vt.numPlanes||Qt.numIntersection!==Vt.numIntersection)||Qt.vertexAlphas!==ee||Qt.vertexTangents!==ne||Qt.morphTargets!==Yt||Qt.morphNormals!==de||Qt.morphColors!==Te||Qt.toneMapping!==Ie||Qt.morphTargetsCount!==re)&&(be=!0):(be=!0,Qt.__version=lt.version);let In=Qt.currentProgram;be===!0&&(In=Qe(lt,q,W));let Si=!1,Ln=!1,_n=!1;const Be=In.getUniforms(),Nn=Qt.uniforms;if(Xt.useProgram(In.program)&&(Si=!0,Ln=!0,_n=!0),lt.id!==D&&(D=lt.id,Ln=!0),Si||C!==R){Xt.buffers.depth.getReversed()?(Et.copy(R.projectionMatrix),cb(Et),ub(Et),Be.setValue(G,"projectionMatrix",Et)):Be.setValue(G,"projectionMatrix",R.projectionMatrix),Be.setValue(G,"viewMatrix",R.matrixWorldInverse);const Mn=Be.map.cameraPosition;Mn!==void 0&&Mn.setValue(G,Jt.setFromMatrixPosition(R.matrixWorld)),Pe.logarithmicDepthBuffer&&Be.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(lt.isMeshPhongMaterial||lt.isMeshToonMaterial||lt.isMeshLambertMaterial||lt.isMeshBasicMaterial||lt.isMeshStandardMaterial||lt.isShaderMaterial)&&Be.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,Ln=!0,_n=!0)}if(W.isSkinnedMesh){Be.setOptional(G,W,"bindMatrix"),Be.setOptional(G,W,"bindMatrixInverse");const Je=W.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),Be.setValue(G,"boneTexture",Je.boneTexture,se))}W.isBatchedMesh&&(Be.setOptional(G,W,"batchingTexture"),Be.setValue(G,"batchingTexture",W._matricesTexture,se),Be.setOptional(G,W,"batchingIdTexture"),Be.setValue(G,"batchingIdTexture",W._indirectTexture,se),Be.setOptional(G,W,"batchingColorTexture"),W._colorsTexture!==null&&Be.setValue(G,"batchingColorTexture",W._colorsTexture,se));const Cn=ot.morphAttributes;if((Cn.position!==void 0||Cn.normal!==void 0||Cn.color!==void 0)&&wt.update(W,ot,In),(Ln||Qt.receiveShadow!==W.receiveShadow)&&(Qt.receiveShadow=W.receiveShadow,Be.setValue(G,"receiveShadow",W.receiveShadow)),lt.isMeshGouraudMaterial&&lt.envMap!==null&&(Nn.envMap.value=Pt,Nn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),lt.isMeshStandardMaterial&&lt.envMap===null&&q.environment!==null&&(Nn.envMapIntensity.value=q.environmentIntensity),Ln&&(Be.setValue(G,"toneMappingExposure",w.toneMappingExposure),Qt.needsLights&&xu(Nn,_n),Rt&&lt.fog===!0&&ht.refreshFogUniforms(Nn,Rt),ht.refreshMaterialUniforms(Nn,lt,K,Q,v.state.transmissionRenderTarget[R.id]),tu.upload(G,Sn(Qt),Nn,se)),lt.isShaderMaterial&&lt.uniformsNeedUpdate===!0&&(tu.upload(G,Sn(Qt),Nn,se),lt.uniformsNeedUpdate=!1),lt.isSpriteMaterial&&Be.setValue(G,"center",W.center),Be.setValue(G,"modelViewMatrix",W.modelViewMatrix),Be.setValue(G,"normalMatrix",W.normalMatrix),Be.setValue(G,"modelMatrix",W.matrixWorld),lt.isShaderMaterial||lt.isRawShaderMaterial){const Je=lt.uniformsGroups;for(let Mn=0,Ir=Je.length;Mn<Ir;Mn++){const Bn=Je[Mn];j.update(Bn,In),j.bind(Bn,In)}}return In}function xu(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function Su(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(R,q,ot){const lt=Zt.get(R);lt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,lt.__autoAllocateDepthBuffer===!1&&(lt.__useRenderToTexture=!1),Zt.get(R.texture).__webglTexture=q,Zt.get(R.depthTexture).__webglTexture=lt.__autoAllocateDepthBuffer?void 0:ot,lt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){const ot=Zt.get(R);ot.__webglFramebuffer=q,ot.__useDefaultFramebuffer=q===void 0};const ul=G.createFramebuffer();this.setRenderTarget=function(R,q=0,ot=0){X=R,H=q,N=ot;let lt=!0,W=null,Rt=!1,Nt=!1;if(R){const Pt=Zt.get(R);if(Pt.__useDefaultFramebuffer!==void 0)Xt.bindFramebuffer(G.FRAMEBUFFER,null),lt=!1;else if(Pt.__webglFramebuffer===void 0)se.setupRenderTarget(R);else if(Pt.__hasExternalTextures)se.rebindTextures(R,Zt.get(R.texture).__webglTexture,Zt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Yt=R.depthTexture;if(Pt.__boundDepthTexture!==Yt){if(Yt!==null&&Zt.has(Yt)&&(R.width!==Yt.image.width||R.height!==Yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");se.setupDepthRenderbuffer(R)}}const ee=R.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Nt=!0);const ne=Zt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ne[q])?W=ne[q][ot]:W=ne[q],Rt=!0):R.samples>0&&se.useMultisampledRTT(R)===!1?W=Zt.get(R).__webglMultisampledFramebuffer:Array.isArray(ne)?W=ne[ot]:W=ne,V.copy(R.viewport),rt.copy(R.scissor),nt=R.scissorTest}else V.copy(O).multiplyScalar(K).floor(),rt.copy(st).multiplyScalar(K).floor(),nt=St;if(ot!==0&&(W=ul),Xt.bindFramebuffer(G.FRAMEBUFFER,W)&&lt&&Xt.drawBuffers(R,W),Xt.viewport(V),Xt.scissor(rt),Xt.setScissorTest(nt),Rt){const Pt=Zt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+q,Pt.__webglTexture,ot)}else if(Nt){const Pt=Zt.get(R.texture),ee=q;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Pt.__webglTexture,ot,ee)}else if(R!==null&&ot!==0){const Pt=Zt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Pt.__webglTexture,ot)}D=-1},this.readRenderTargetPixels=function(R,q,ot,lt,W,Rt,Nt,It=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Zt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Nt!==void 0&&(Pt=Pt[Nt]),Pt){Xt.bindFramebuffer(G.FRAMEBUFFER,Pt);try{const ee=R.textures[It],ne=ee.format,Yt=ee.type;if(!Pe.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-lt&&ot>=0&&ot<=R.height-W&&(R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+It),G.readPixels(q,ot,lt,W,Ut.convert(ne),Ut.convert(Yt),Rt))}finally{const ee=X!==null?Zt.get(X).__webglFramebuffer:null;Xt.bindFramebuffer(G.FRAMEBUFFER,ee)}}},this.readRenderTargetPixelsAsync=async function(R,q,ot,lt,W,Rt,Nt,It=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Zt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Nt!==void 0&&(Pt=Pt[Nt]),Pt)if(q>=0&&q<=R.width-lt&&ot>=0&&ot<=R.height-W){Xt.bindFramebuffer(G.FRAMEBUFFER,Pt);const ee=R.textures[It],ne=ee.format,Yt=ee.type;if(!Pe.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const de=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,de),G.bufferData(G.PIXEL_PACK_BUFFER,Rt.byteLength,G.STREAM_READ),R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+It),G.readPixels(q,ot,lt,W,Ut.convert(ne),Ut.convert(Yt),0);const Te=X!==null?Zt.get(X).__webglFramebuffer:null;Xt.bindFramebuffer(G.FRAMEBUFFER,Te);const Ie=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await lb(G,Ie,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,de),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Rt),G.deleteBuffer(de),G.deleteSync(Ie),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,q=null,ot=0){const lt=Math.pow(2,-ot),W=Math.floor(R.image.width*lt),Rt=Math.floor(R.image.height*lt),Nt=q!==null?q.x:0,It=q!==null?q.y:0;se.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,ot,0,0,Nt,It,W,Rt),Xt.unbindTexture()};const ir=G.createFramebuffer(),Qs=G.createFramebuffer();this.copyTextureToTexture=function(R,q,ot=null,lt=null,W=0,Rt=null){Rt===null&&(W!==0?(Ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Rt=W,W=0):Rt=0);let Nt,It,Pt,ee,ne,Yt,de,Te,Ie;const Re=R.isCompressedTexture?R.mipmaps[Rt]:R.image;if(ot!==null)Nt=ot.max.x-ot.min.x,It=ot.max.y-ot.min.y,Pt=ot.isBox3?ot.max.z-ot.min.z:1,ee=ot.min.x,ne=ot.min.y,Yt=ot.isBox3?ot.min.z:0;else{const Cn=Math.pow(2,-W);Nt=Math.floor(Re.width*Cn),It=Math.floor(Re.height*Cn),R.isDataArrayTexture?Pt=Re.depth:R.isData3DTexture?Pt=Math.floor(Re.depth*Cn):Pt=1,ee=0,ne=0,Yt=0}lt!==null?(de=lt.x,Te=lt.y,Ie=lt.z):(de=0,Te=0,Ie=0);const re=Ut.convert(q.format),Qt=Ut.convert(q.type);let hn;q.isData3DTexture?(se.setTexture3D(q,0),hn=G.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(se.setTexture2DArray(q,0),hn=G.TEXTURE_2D_ARRAY):(se.setTexture2D(q,0),hn=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,q.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,q.unpackAlignment);const be=G.getParameter(G.UNPACK_ROW_LENGTH),In=G.getParameter(G.UNPACK_IMAGE_HEIGHT),Si=G.getParameter(G.UNPACK_SKIP_PIXELS),Ln=G.getParameter(G.UNPACK_SKIP_ROWS),_n=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,Re.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Re.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,ee),G.pixelStorei(G.UNPACK_SKIP_ROWS,ne),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Yt);const Be=R.isDataArrayTexture||R.isData3DTexture,Nn=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const Cn=Zt.get(R),Je=Zt.get(q),Mn=Zt.get(Cn.__renderTarget),Ir=Zt.get(Je.__renderTarget);Xt.bindFramebuffer(G.READ_FRAMEBUFFER,Mn.__webglFramebuffer),Xt.bindFramebuffer(G.DRAW_FRAMEBUFFER,Ir.__webglFramebuffer);for(let Bn=0;Bn<Pt;Bn++)Be&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Zt.get(R).__webglTexture,W,Yt+Bn),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Zt.get(q).__webglTexture,Rt,Ie+Bn)),G.blitFramebuffer(ee,ne,Nt,It,de,Te,Nt,It,G.DEPTH_BUFFER_BIT,G.NEAREST);Xt.bindFramebuffer(G.READ_FRAMEBUFFER,null),Xt.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(W!==0||R.isRenderTargetTexture||Zt.has(R)){const Cn=Zt.get(R),Je=Zt.get(q);Xt.bindFramebuffer(G.READ_FRAMEBUFFER,ir),Xt.bindFramebuffer(G.DRAW_FRAMEBUFFER,Qs);for(let Mn=0;Mn<Pt;Mn++)Be?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Cn.__webglTexture,W,Yt+Mn):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Cn.__webglTexture,W),Nn?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Je.__webglTexture,Rt,Ie+Mn):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Je.__webglTexture,Rt),W!==0?G.blitFramebuffer(ee,ne,Nt,It,de,Te,Nt,It,G.COLOR_BUFFER_BIT,G.NEAREST):Nn?G.copyTexSubImage3D(hn,Rt,de,Te,Ie+Mn,ee,ne,Nt,It):G.copyTexSubImage2D(hn,Rt,de,Te,ee,ne,Nt,It);Xt.bindFramebuffer(G.READ_FRAMEBUFFER,null),Xt.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Nn?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(hn,Rt,de,Te,Ie,Nt,It,Pt,re,Qt,Re.data):q.isCompressedArrayTexture?G.compressedTexSubImage3D(hn,Rt,de,Te,Ie,Nt,It,Pt,re,Re.data):G.texSubImage3D(hn,Rt,de,Te,Ie,Nt,It,Pt,re,Qt,Re):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Rt,de,Te,Nt,It,re,Qt,Re.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Rt,de,Te,Re.width,Re.height,re,Re.data):G.texSubImage2D(G.TEXTURE_2D,Rt,de,Te,Nt,It,re,Qt,Re);G.pixelStorei(G.UNPACK_ROW_LENGTH,be),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,In),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Si),G.pixelStorei(G.UNPACK_SKIP_ROWS,Ln),G.pixelStorei(G.UNPACK_SKIP_IMAGES,_n),Rt===0&&q.generateMipmaps&&G.generateMipmap(hn),Xt.unbindTexture()},this.copyTextureToTexture3D=function(R,q,ot=null,lt=null,W=0){return Ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,q,ot,lt,W)},this.initRenderTarget=function(R){Zt.get(R).__webglFramebuffer===void 0&&se.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?se.setTextureCube(R,0):R.isData3DTexture?se.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?se.setTexture2DArray(R,0):se.setTexture2D(R,0),Xt.unbindTexture()},this.resetState=function(){H=0,N=0,X=null,Xt.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _a}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=De._getDrawingBufferColorSpace(t),i.unpackColorSpace=De._getUnpackColorSpace()}}const U0={type:"change"},bp={type:"start"},Hy={type:"end"},Xc=new Mp,L0=new Za,N2=Math.cos(70*sb.DEG2RAD),pn=new J,Wn=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pd=1e-6;class O2 extends Zb{constructor(t,i=null){super(t,i),this.state=ke.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ns.ROTATE,MIDDLE:Ns.DOLLY,RIGHT:Ns.PAN},this.touches={ONE:Ds.ROTATE,TWO:Ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new Nr,this._lastTargetPosition=new J,this._quat=new Nr().setFromUnitVectors(t.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new r0,this._sphericalDelta=new r0,this._scale=1,this._panOffset=new J,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new J,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=z2.bind(this),this._onPointerDown=P2.bind(this),this._onPointerUp=I2.bind(this),this._onContextMenu=X2.bind(this),this._onMouseWheel=H2.bind(this),this._onKeyDown=G2.bind(this),this._onTouchStart=V2.bind(this),this._onTouchMove=k2.bind(this),this._onMouseDown=B2.bind(this),this._onMouseMove=F2.bind(this),this._interceptControlDown=j2.bind(this),this._interceptControlUp=W2.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(U0),this.update(),this.state=ke.NONE}update(t=null){const i=this.object.position;pn.copy(i).sub(this.target),pn.applyQuaternion(this._quat),this._spherical.setFromVector3(pn),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(r)&&isFinite(l)&&(r<-Math.PI?r+=Wn:r>Math.PI&&(r-=Wn),l<-Math.PI?l+=Wn:l>Math.PI&&(l-=Wn),r<=l?this._spherical.theta=Math.max(r,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+l)/2?Math.max(r,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(pn.setFromSpherical(this._spherical),pn.applyQuaternion(this._quatInverse),i.copy(this.target).add(pn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const d=pn.length();f=this._clampDistance(d*this._scale);const p=d-f;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),c=!!p}else if(this.object.isOrthographicCamera){const d=new J(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=p!==this.object.zoom;const m=new J(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),f=pn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Xc.origin.copy(this.object.position),Xc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xc.direction))<N2?this.object.lookAt(this.target):(L0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xc.intersectPlane(L0,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>pd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pd||this._lastTargetPosition.distanceToSquared(this.target)>pd?(this.dispatchEvent(U0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Wn/60*this.autoRotateSpeed*t:Wn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){pn.setFromMatrixColumn(i,0),pn.multiplyScalar(-t),this._panOffset.add(pn)}_panUp(t,i){this.screenSpacePanning===!0?pn.setFromMatrixColumn(i,1):(pn.setFromMatrixColumn(i,0),pn.crossVectors(this.object.up,pn)),pn.multiplyScalar(t),this._panOffset.add(pn)}_pan(t,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;pn.copy(l).sub(this.target);let c=pn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/r.clientHeight,this.object.matrix),this._panUp(2*i*c/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),l=t-r.left,c=i-r.top,f=r.width,d=r.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Wn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Wn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(r,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(r,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),r=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(r*r+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const r=this._getSecondPointerPosition(t),l=.5*(t.pageX+r.x),c=.5*(t.pageY+r.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Wn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Wn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(r,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),r=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(r*r+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(f,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ce,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,r={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function P2(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function z2(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function I2(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hy),this.state=ke.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function B2(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ke.DOLLY;break;case Ns.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ke.ROTATE}break;case Ns.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(bp)}function F2(s){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function H2(s){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(s.preventDefault(),this.dispatchEvent(bp),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Hy))}function G2(s){this.enabled!==!1&&this._handleKeyDown(s)}function V2(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ke.TOUCH_ROTATE;break;case Ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case Ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ke.TOUCH_DOLLY_PAN;break;case Ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(bp)}function k2(s){switch(this._trackPointer(s),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ke.NONE}}function X2(s){this.enabled!==!1&&s.preventDefault()}function j2(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function W2(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const q2=(s,t)=>{const i=new Zo;s.add(i);const r=.25,l=.3,c="#ffd5f2",f="#f97316",d=8,p=.25,m=new Qo(.3,.3,r,40,10),g=new e0({color:c,roughness:.7,metalness:0,flatShading:!0}),_=new Di(m,g);_.position.y=r/2,i.add(_),new Qo(.05,.05,l);const y=new e0({color:f,roughness:.7,metalness:0,flatShading:!0}),M=[];for(let T=0;T<d;T++){const S=T/d*Math.PI*2,v=new Qo(.05,.05,l,16,32);v.toNonIndexed();const L=v.attributes.position,U=new Float32Array(L.array.length);U.set(L.array);const w=new Di(v,y);w.position.set(Math.cos(S)*p,r+l/2,Math.sin(S)*p),i.add(w),M.push({geometry:v,original:U,angle:S})}return i.userData.tentacleData=M,i.userData.tentacleHeight=l,{coral:i,cleanup:()=>{s.remove(i),i.traverse(T=>{if(T.isMesh){const S=T;S.geometry.dispose(),Array.isArray(S.material)?S.material.forEach(v=>v.dispose()):S.material.dispose()}})}}},Y2=q2,Z2=new qb,K2=1.2,Q2=.3;function J2({data:s,dataSource:t="analysis",isLoading:i=!1}){const r=et.useRef(null);et.useEffect(()=>{const c=r.current;if(!c)return;const f=new Pb;f.background=new Me("#f9fbfc");const d=new _i(42,1,.1,100);d.position.set(4,3,6),d.lookAt(0,.6,0);const p=new L2({antialias:!0,alpha:!0});p.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.appendChild(p.domElement);const m=new jb("#ffffff",1.4),g=new Xb("#ffffff",2);g.position.set(3,5,4),f.add(m,g);const _=new Yb(6,12,"#cbd5db","#e3e9ed");_.position.y=-1.2,f.add(_);const{coral:y,cleanup:M}=Y2(f),E=()=>{const{clientWidth:U,clientHeight:w}=c;d.aspect=U/Math.max(w,1),d.updateProjectionMatrix(),p.setSize(U,w)},T=new ResizeObserver(E);T.observe(c),E();let S=0;const v=new O2(d,p.domElement);v.enablePan=!0;const L=()=>{S=window.requestAnimationFrame(L),v.update();const U=Z2.getElapsedTime(),w=(Math.sin(U*K2)+1)/2,B=y.userData,H=B.tentacleData;if(H&&B.tentacleHeight){const N=B.tentacleHeight,X=new J;for(const{geometry:D,original:C,angle:V}of H){const rt=D.attributes.position;for(let nt=0;nt<rt.count;nt++){X.fromArray(C,nt*3);const ft=(X.y+N/2)/N,ut=Q2*w*ft;X.x+=Math.cos(V)*ut,X.z+=Math.sin(V)*ut,rt.setXYZ(nt,X.x,X.y,X.z)}rt.needsUpdate=!0,D.computeVertexNormals()}}p.render(f,d)};return L(),()=>{window.cancelAnimationFrame(S),T.disconnect(),v.dispose(),M(),p.dispose(),c.removeChild(p.domElement)}},[s]);const l=t==="sample"?"Sample coral — upload & analyze to personalize":`${s.topics.length} topic${s.topics.length===1?"":"s"} · drag to orbit`;return I.jsxs("div",{className:`organism-viewport${i?" organism-viewport--loading":""}`,ref:r,children:[i?I.jsx("div",{className:"viewport-overlay",role:"status","aria-live":"polite",children:"Loading coral…"}):null,I.jsx("div",{className:"viewport-label",children:l})]})}function Gy(s){const[t,i]=et.useState({status:"loading",analysis:null,error:null}),r=et.useCallback(async()=>{i({status:"loading",analysis:null,error:null});try{const{analyses:l}=await fT(s),c=l[0]??null;if(!c){i({status:"empty",analysis:null,error:null});return}i({status:"success",analysis:c,error:null})}catch(l){i({status:"error",analysis:null,error:ay(l,"Failed to load analysis data.")})}},[s]);return et.useEffect(()=>{r()},[r]),{...t,reload:r}}function $2(){var g,_;const s=si(),{status:t,analysis:i,error:r,reload:l}=Gy(Ls),{data:c,source:f}=sT(i==null?void 0:i.organism_data),d=(i==null?void 0:i.post_count)??null,p=((g=i==null?void 0:i.sentiment_summary)==null?void 0:g.compound)??null,m=t==="loading"||t==="empty"||t==="error";return et.useEffect(()=>{const y=s.state;y!=null&&y.refreshAnalysis&&l()},[s.state,l]),I.jsxs(I.Fragment,{children:[m?I.jsx("div",{className:"page-banner-wrap",children:I.jsx(oy,{status:t,error:r,onRetry:l})}):null,I.jsxs("section",{className:"content-grid","aria-label":"Coralytics overview",children:[I.jsxs("article",{className:`metric-panel${t==="loading"?" metric-panel--loading":""}`,children:[I.jsx("p",{children:"Impact strength"}),I.jsx("strong",{children:lT(d)}),I.jsx("span",{children:"Based on posts in your latest analysis"})]}),I.jsxs("article",{className:`metric-panel${t==="loading"?" metric-panel--loading":""}`,children:[I.jsx("p",{children:"Sentiment balance"}),I.jsx("strong",{children:ws(p)}),I.jsx("span",{children:"Average tone across uploads"})]}),I.jsxs("section",{className:"organism-panel","aria-label":"3D coral visualiser",children:[I.jsxs("div",{className:"panel-heading",children:[I.jsxs("div",{children:[I.jsx("p",{className:"section-kicker",children:"Personalized 3D coral"}),I.jsx("h1",{children:"My Coral"})]}),I.jsxs("button",{className:"secondary-action",type:"button",disabled:!0,children:[I.jsx(ey,{size:17}),I.jsx("span",{children:"Export"})]})]}),I.jsx(J2,{data:c,dataSource:f,isLoading:t==="loading"})]}),i?I.jsxs("article",{className:"summary-panel",children:[I.jsx("p",{className:"section-kicker",children:"Latest analysis"}),I.jsx("h2",{children:"Analysis snapshot"}),I.jsxs("dl",{className:"summary-grid",children:[I.jsxs("div",{children:[I.jsx("dt",{children:"Posts"}),I.jsx("dd",{children:i.post_count})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Topics"}),I.jsx("dd",{children:i.topics.length})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Uploads used"}),I.jsx("dd",{children:((_=i.upload_ids)==null?void 0:_.length)??0})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Coral data"}),I.jsx("dd",{children:f==="analysis"?"From analysis":"Sample preview"})]})]})]}):null]})]})}function tw(){const{status:s,analysis:t,error:i,reload:r}=Gy(Ls),l=s==="loading"||s==="empty"||s==="error",c=(t==null?void 0:t.topics)??[],f=t==null?void 0:t.sentiment_summary;return I.jsxs("section",{className:"insights-page","aria-label":"Insights",children:[I.jsxs("header",{className:"page-header",children:[I.jsx("p",{className:"section-kicker",children:"Insights"}),I.jsx("h1",{children:"Topic & sentiment breakdown"}),I.jsx("p",{className:"page-lead",children:"Topics and sentiment scores will populate once NLP is integrated on the backend."})]}),l?I.jsx("div",{className:"page-banner-wrap",children:I.jsx(oy,{status:s,error:i,onRetry:r})}):null,I.jsxs("div",{className:"insights-grid",children:[I.jsxs("article",{className:"metric-panel",children:[I.jsx("p",{children:"Overall sentiment"}),I.jsx("strong",{children:ws(f==null?void 0:f.compound)}),I.jsx("span",{children:"Compound score from VADER (when available)"})]}),I.jsxs("article",{className:"metric-panel",children:[I.jsx("p",{children:"Posts in analysis"}),I.jsx("strong",{children:(t==null?void 0:t.post_count)??"—"}),I.jsx("span",{children:"From your latest analysis run"})]}),I.jsxs("article",{className:"topics-panel",children:[I.jsx("p",{className:"section-kicker",children:"Topics"}),I.jsx("h2",{children:"Detected themes"}),c.length===0?I.jsx("p",{className:"panel-empty",children:"No topics yet. Upload an export and run analysis — results will appear here when TF-IDF clustering is enabled."}):I.jsx("ul",{className:"topics-list",children:c.map(d=>I.jsxs("li",{children:[I.jsx("span",{children:d.name}),I.jsxs("span",{children:[d.postVolume??d.weight??0," posts"]}),I.jsx("span",{children:ws(d.sentiment)})]},d.name))})]}),f?I.jsxs("article",{className:"sentiment-panel",children:[I.jsx("p",{className:"section-kicker",children:"Sentiment mix"}),I.jsx("h2",{children:"Tone distribution"}),I.jsxs("dl",{className:"summary-grid",children:[I.jsxs("div",{children:[I.jsx("dt",{children:"Positive"}),I.jsx("dd",{children:ws(f.positive)})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Neutral"}),I.jsx("dd",{children:ws(f.neutral)})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Negative"}),I.jsx("dd",{children:ws(f.negative)})]})]})]}):null]})]})}const ew=[{icon:ey,title:"Download coral report",description:"Export a PDF or JSON snapshot of your analysis and 3D coral."},{icon:ny,title:"Compare my coral",description:"Place two analyses side by side to see how your footprint changes."},{icon:iy,title:"Connect with others",description:"Share a read-only coral preview with recruiters or collaborators."}];function nw(){return I.jsxs("section",{className:"share-page","aria-label":"Share and export",children:[I.jsxs("header",{className:"page-header",children:[I.jsx("p",{className:"section-kicker",children:"Share"}),I.jsx("h1",{children:"Export & compare"}),I.jsx("p",{className:"page-lead",children:"Sharing and export tools are planned for a future sprint. Upload and analyze your data first from the import page."})]}),I.jsx("div",{className:"share-grid",children:ew.map(s=>{const t=s.icon;return I.jsxs("article",{className:"share-card",children:[I.jsx(t,{size:24,"aria-hidden":"true"}),I.jsx("h2",{children:s.title}),I.jsx("p",{children:s.description}),I.jsx("span",{className:"coming-soon-pill",children:"Coming soon"})]},s.title)})}),I.jsxs("p",{className:"share-cta",children:["Ready to grow your coral?"," ",I.jsx(pu,{to:"/upload",children:"Import an export"})," and run analysis."]})]})}const iw=".zip,.json,.csv";function aw({disabled:s=!1,onFileSelected:t}){const i=et.useRef(null),[r,l]=et.useState(!1),c=et.useCallback(f=>{const d=f==null?void 0:f[0];!d||s||t(d)},[s,t]);return I.jsxs("div",{className:`upload-dropzone${r?" upload-dropzone--active":""}${s?" upload-dropzone--disabled":""}`,onDragEnter:f=>{f.preventDefault(),s||l(!0)},onDragOver:f=>{f.preventDefault(),s||l(!0)},onDragLeave:f=>{f.preventDefault(),l(!1)},onDrop:f=>{f.preventDefault(),l(!1),c(f.dataTransfer.files)},children:[I.jsx("input",{ref:i,type:"file",accept:iw,hidden:!0,disabled:s,onChange:f=>c(f.target.files)}),I.jsx(KE,{size:36,"aria-hidden":"true"}),I.jsx("p",{className:"dropzone-title",children:"Drop your export here"}),I.jsx("p",{className:"dropzone-hint",children:"Supports .zip, .json, and .csv platform exports"}),I.jsxs("button",{className:"primary-action",type:"button",disabled:s,onClick:()=>{var f;return(f=i.current)==null?void 0:f.click()},children:[I.jsx(QE,{size:17}),I.jsx("span",{children:"Choose file"})]})]})}function rw(){var v,L,U,w;const s=fu(),[t]=BE(),i=t.get("upload"),{uploads:r,reload:l}=ry(Ls),[c,f]=et.useState("idle"),[d,p]=et.useState(null),[m,g]=et.useState(null),[_,y]=et.useState(i);et.useEffect(()=>{i&&y(i)},[i]),et.useEffect(()=>{if(!i||r.length===0)return;const B=r.find(H=>H.upload_id===i);B&&(g(B),f("uploaded"))},[i,r]);const M=r.find(B=>B.upload_id===_)??m,E=et.useCallback(async B=>{p(null),f("uploading");try{const H=await dT(Ls,B);g(H),y(H.upload_id),f("uploaded"),await l()}catch(H){const N=H instanceof Error?H.message:"Upload failed.";p(N),f("idle")}},[l]),T=et.useCallback(async B=>{p(null),f("analyzing");try{await pT({user_id:Ls,upload_ids:[B],persist:!0}),f("done"),s("/",{state:{refreshAnalysis:!0}})}catch(H){const N=H instanceof Error?H.message:"Analysis failed.";p(N),f("uploaded")}},[s]),S=c==="uploading"||c==="analyzing";return I.jsxs("section",{className:"upload-page","aria-label":"Import export",children:[I.jsxs("header",{className:"page-header",children:[I.jsx("p",{className:"section-kicker",children:"Import"}),I.jsx("h1",{children:"Import or export coral"}),I.jsx("p",{className:"page-lead",children:"Upload a social export (.zip, .json, or .csv). We parse it in memory, save normalized posts to Firestore, then run analysis to grow your coral."})]}),I.jsx(aw,{disabled:S,onFileSelected:B=>void E(B)}),c==="uploading"?I.jsxs("div",{className:"flow-status",role:"status",children:[I.jsx(iu,{className:"spin-icon",size:18,"aria-hidden":"true"}),I.jsx("span",{children:"Uploading and parsing your export…"})]}):null,c==="analyzing"?I.jsxs("div",{className:"flow-status",role:"status",children:[I.jsx(iu,{className:"spin-icon",size:18,"aria-hidden":"true"}),I.jsx("span",{children:"Running analysis on your posts…"})]}):null,d?I.jsx("div",{className:"flow-status flow-status--error",role:"alert",children:I.jsx("span",{children:d})}):null,M?I.jsxs("article",{className:"upload-result-panel",children:[I.jsxs("div",{className:"panel-heading",children:[I.jsxs("div",{children:[I.jsx("p",{className:"section-kicker",children:"Ingest report"}),I.jsx("h2",{children:M.filename})]}),c==="done"?I.jsxs("span",{className:"success-pill",children:[I.jsx(YE,{size:16}),"Analyzed"]}):null]}),I.jsxs("dl",{className:"summary-grid",children:[I.jsxs("div",{children:[I.jsx("dt",{children:"Platform"}),I.jsx("dd",{children:qc(M.platform)})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Posts parsed"}),I.jsx("dd",{children:M.post_count})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Comments"}),I.jsx("dd",{children:M.comment_count})]}),I.jsxs("div",{children:[I.jsx("dt",{children:"Uploaded"}),I.jsx("dd",{children:sy(M.created_at)})]})]}),(L=(v=M.ingest_report)==null?void 0:v.files)!=null&&L.length?I.jsxs("div",{className:"ingest-files",children:[I.jsx("h3",{children:"Files processed"}),I.jsx("ul",{children:M.ingest_report.files.map(B=>I.jsxs("li",{children:[I.jsx("span",{children:B.path}),I.jsxs("span",{children:[B.platform?qc(B.platform):"Unknown"," ·"," ",B.post_count??0," posts"]})]},B.path))})]}):null,(w=(U=M.ingest_report)==null?void 0:U.warnings)!=null&&w.length?I.jsxs("div",{className:"ingest-warnings",children:[I.jsx("h3",{children:"Warnings"}),I.jsx("ul",{children:M.ingest_report.warnings.map(B=>I.jsx("li",{children:B},B))})]}):null,I.jsxs("div",{className:"upload-actions",children:[I.jsx("button",{className:"primary-action",type:"button",disabled:S||c==="done",onClick:()=>void T(M.upload_id),children:"Analyze now"}),I.jsx("button",{className:"secondary-action",type:"button",disabled:S,onClick:()=>s("/"),children:"Back to dashboard"})]})]}):null,r.length>1?I.jsxs("section",{className:"upload-history-panel",children:[I.jsx("h2",{children:"Previous uploads"}),I.jsx("ul",{className:"upload-history-list",children:r.map(B=>I.jsx("li",{children:I.jsxs("button",{type:"button",className:`upload-item${_===B.upload_id?" upload-item--selected":""}`,onClick:()=>{y(B.upload_id),g(B),f("uploaded"),p(null)},children:[I.jsx("span",{className:"upload-filename",children:B.filename}),I.jsxs("span",{className:"upload-meta",children:[qc(B.platform)," · ",B.post_count," posts"]})]})},B.upload_id))})]}):null]})}function sw(){return I.jsx(OE,{children:I.jsx(cE,{children:I.jsxs(Ar,{element:I.jsx(_T,{}),children:[I.jsx(Ar,{path:"/",element:I.jsx($2,{})}),I.jsx(Ar,{path:"/upload",element:I.jsx(rw,{})}),I.jsx(Ar,{path:"/insights",element:I.jsx(tw,{})}),I.jsx(Ar,{path:"/share",element:I.jsx(nw,{})}),I.jsx(Ar,{path:"*",element:I.jsx(sE,{to:"/",replace:!0})})]})})})}sM.createRoot(document.getElementById("root")).render(I.jsx(JS.StrictMode,{children:I.jsx(sw,{})}));
