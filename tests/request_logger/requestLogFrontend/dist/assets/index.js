(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function H(){}function ue(n){return n()}function Y(){return Object.create(null)}function I(n){n.forEach(ue)}function fe(n){return typeof n=="function"}function be(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}function ve(n){return Object.keys(n).length===0}function C(n,e){n.appendChild(e)}function P(n,e,t){n.insertBefore(e,t||null)}function $(n){n.parentNode&&n.parentNode.removeChild(n)}function Z(n,e){for(let t=0;t<n.length;t+=1)n[t]&&n[t].d(e)}function w(n){return document.createElement(n)}function X(n){return document.createTextNode(n)}function z(){return X(" ")}function W(n,e,t,s){return n.addEventListener(e,t,s),()=>n.removeEventListener(e,t,s)}function R(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function ye(n){return Array.from(n.childNodes)}function Q(n,e){e=""+e,n.data!==e&&(n.data=e)}function ee(n,e,t){n.classList[t?"add":"remove"](e)}let B;function J(n){B=n}function ke(){if(!B)throw new Error("Function called outside component initialization");return B}function we(n){ke().$$.on_mount.push(n)}const L=[],te=[];let x=[];const ne=[],Ee=Promise.resolve();let V=!1;function je(){V||(V=!0,Ee.then(de))}function K(n){x.push(n)}const D=new Set;let A=0;function de(){if(A!==0)return;const n=B;do{try{for(;A<L.length;){const e=L[A];A++,J(e),Ce(e.$$)}}catch(e){throw L.length=0,A=0,e}for(J(null),L.length=0,A=0;te.length;)te.pop()();for(let e=0;e<x.length;e+=1){const t=x[e];D.has(t)||(D.add(t),t())}x.length=0}while(L.length);for(;ne.length;)ne.pop()();V=!1,D.clear(),J(n)}function Ce(n){if(n.fragment!==null){n.update(),I(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(K)}}function Te(n){const e=[],t=[];x.forEach(s=>n.indexOf(s)===-1?e.push(s):t.push(s)),t.forEach(s=>s()),x=e}const Re=new Set;function pe(n,e){n&&n.i&&(Re.delete(n),n.i(e))}function me(n,e){n.d(1),e.delete(n.key)}function ge(n,e,t,s,i,o,r,c,h,a,b,k){let g=n.length,v=o.length,f=g;const p={};for(;f--;)p[n[f].key]=f;const d=[],E=new Map,N=new Map,S=[];for(f=v;f--;){const l=k(i,o,f),y=t(l);let T=r.get(y);T?s&&S.push(()=>T.p(l,e)):(T=a(y,l),T.c()),E.set(y,d[f]=T),y in p&&N.set(y,Math.abs(f-p[y]))}const _=new Set,u=new Set;function m(l){pe(l,1),l.m(c,b),r.set(l.key,l),b=l.first,v--}for(;g&&v;){const l=d[v-1],y=n[g-1],T=l.key,q=y.key;l===y?(b=l.first,g--,v--):E.has(q)?!r.has(T)||_.has(T)?m(l):u.has(q)?g--:N.get(T)>N.get(q)?(u.add(T),m(l)):(_.add(q),g--):(h(y,r),g--)}for(;g--;){const l=n[g];E.has(l.key)||h(l,r)}for(;v;)m(d[v-1]);return I(S),d}function $e(n,e,t,s){const{fragment:i,after_update:o}=n.$$;i&&i.m(e,t),s||K(()=>{const r=n.$$.on_mount.map(ue).filter(fe);n.$$.on_destroy?n.$$.on_destroy.push(...r):I(r),n.$$.on_mount=[]}),o.forEach(K)}function Se(n,e){const t=n.$$;t.fragment!==null&&(Te(t.after_update),I(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function Oe(n,e){n.$$.dirty[0]===-1&&(L.push(n),je(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function Pe(n,e,t,s,i,o,r,c=[-1]){const h=B;J(n);const a=n.$$={fragment:null,ctx:[],props:o,update:H,not_equal:i,bound:Y(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(h?h.$$.context:[])),callbacks:Y(),dirty:c,skip_bound:!1,root:e.target||h.$$.root};r&&r(a.root);let b=!1;if(a.ctx=t?t(n,e.props||{},(k,g,...v)=>{const f=v.length?v[0]:g;return a.ctx&&i(a.ctx[k],a.ctx[k]=f)&&(!a.skip_bound&&a.bound[k]&&a.bound[k](f),b&&Oe(n,k)),g}):[],a.update(),b=!0,I(a.before_update),a.fragment=s?s(a.ctx):!1,e.target){if(e.hydrate){const k=ye(e.target);a.fragment&&a.fragment.l(k),k.forEach($)}else a.fragment&&a.fragment.c();e.intro&&pe(n.$$.fragment),$e(n,e.target,e.anchor,e.customElement),de()}J(h)}class Me{$destroy(){Se(this,1),this.$destroy=H}$on(e,t){if(!fe(t))return H;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(t),()=>{const i=s.indexOf(t);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!ve(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Ne="1.0.0",O={connecting:0,open:1,closing:2,closed:3},Ae=1e4,j={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},M={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},G={longpoll:"longpoll",websocket:"websocket"};class F{constructor(e,t,s,i){this.channel=e,this.event=t,this.payload=s||{},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1}resend(e){this.timeout=e,this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}matchReceive({status:e,response:t,ref:s}){this.recHooks.filter(i=>i.status===e).forEach(i=>i.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer||(this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout))}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}}class Le{constructor(e,t,s){this.state=j.closed,this.topic=e,this.params=t||{},this.socket=s,this.bindings=[],this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new F(this,M.join,this.params,this.timeout),this.pushBuffer=[],this.rejoinTimer=new _e(()=>this.rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=j.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this.joinRef()}`),this.state=j.closed,this.socket.remove(this)}),this.onError(i=>{this.isLeaving()||this.isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=j.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this.isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=j.errored,this.rejoinTimer.scheduleTimeout())}),this.on(M.reply,(i,o)=>{this.trigger(this.replyEventName(o),i)})}rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this.rejoin()}join(e=this.timeout){if(this.joinedOnce)throw"tried to join multiple times. 'join' can only be called a single time per channel instance";return this.joinedOnce=!0,this.rejoin(e),this.joinPush}onClose(e){this.on(M.close,e)}onError(e){this.on(M.error,t=>e(t))}on(e,t){this.bindings.push({event:e,callback:t})}off(e){this.bindings=this.bindings.filter(t=>t.event!==e)}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`;let i=new F(this,e,t,s);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(e=this.timeout){this.state=j.leaving;let t=()=>{this.socket.log("channel",`leave ${this.topic}`),this.trigger(M.close,"leave",this.joinRef())},s=new F(this,M.leave,{},e);return s.receive("ok",()=>t()).receive("timeout",()=>t()),s.send(),this.canPush()||s.trigger("ok",{}),s}onMessage(e,t,s){return t}isMember(e){return this.topic===e}joinRef(){return this.joinPush.ref}sendJoin(e){this.state=j.joining,this.joinPush.resend(e)}rejoin(e=this.timeout){this.isLeaving()||this.sendJoin(e)}trigger(e,t,s){let{close:i,error:o,leave:r,join:c}=M;if(s&&[i,o,r,c].indexOf(e)>=0&&s!==this.joinRef())return;let h=this.onMessage(e,t,s);if(t&&!h)throw"channel onMessage callbacks must return the payload, modified or unmodified";this.bindings.filter(a=>a.event===e).map(a=>a.callback(h,s))}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===j.closed}isErrored(){return this.state===j.errored}isJoined(){return this.state===j.joined}isJoining(){return this.state===j.joining}isLeaving(){return this.state===j.leaving}}class xe{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.timeout=t.timeout||Ae,this.transport=t.transport||window.WebSocket||Ue,this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.reconnectAfterMs=t.reconnectAfterMs||function(s){return[1e3,2e3,5e3,1e4][s-1]||1e4},this.logger=t.logger||function(){},this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=t.params||{},this.endPoint=`${e}/${G.websocket}`,this.reconnectTimer=new _e(()=>{this.disconnect(()=>this.connect())},this.reconnectAfterMs)}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let e=U.appendParams(U.appendParams(this.endPoint,this.params),{vsn:Ne});return e.charAt(0)!=="/"?e:e.charAt(1)==="/"?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`}disconnect(e,t,s){this.conn&&(this.conn.onclose=function(){},t?this.conn.close(t,s||""):this.conn.close(),this.conn=null),e&&e()}connect(e){e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=e),!this.conn&&(this.conn=new this.transport(this.endPointURL()),this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=t=>this.onConnError(t),this.conn.onmessage=t=>this.onConnMessage(t),this.conn.onclose=t=>this.onConnClose(t))}log(e,t,s){this.logger(e,t,s)}onOpen(e){this.stateChangeCallbacks.open.push(e)}onClose(e){this.stateChangeCallbacks.close.push(e)}onError(e){this.stateChangeCallbacks.error.push(e)}onMessage(e){this.stateChangeCallbacks.message.push(e)}onConnOpen(){this.log("transport",`connected to ${this.endPointURL()}`,this.transport.prototype),this.flushSendBuffer(),this.reconnectTimer.reset(),this.conn.skipHeartbeat||(clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)),this.stateChangeCallbacks.open.forEach(e=>e())}onConnClose(e){this.log("transport","close",e),this.triggerChanError(),clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(t=>t(e))}onConnError(e){this.log("transport",e),this.triggerChanError(),this.stateChangeCallbacks.error.forEach(t=>t(e))}triggerChanError(){this.channels.forEach(e=>e.trigger(M.error))}connectionState(){switch(this.conn&&this.conn.readyState){case O.connecting:return"connecting";case O.open:return"open";case O.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(e){this.channels=this.channels.filter(t=>t.joinRef()!==e.joinRef())}channel(e,t={}){let s=new Le(e,t,this);return this.channels.push(s),s}push(e){let{topic:t,event:s,payload:i,ref:o}=e,r=()=>this.conn.send(JSON.stringify(e));this.log("push",`${t} ${s} (${o})`,i),this.isConnected()?r():this.sendBuffer.push(r)}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){this.isConnected()&&this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.makeRef()})}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){let t=JSON.parse(e.data),{topic:s,event:i,payload:o,ref:r}=t;this.log("receive",`${o.status||""} ${s} ${i} ${r&&"("+r+")"||""}`,o),this.channels.filter(c=>c.isMember(s)).forEach(c=>c.trigger(i,o,r)),this.stateChangeCallbacks.message.forEach(c=>c(t))}}class Ue{constructor(e){this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=O.connecting,this.poll()}normalizeEndpoint(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+G.websocket),"$1/"+G.longpoll)}endpointURL(){return U.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(){this.close(),this.readyState=O.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry()}poll(){(this.readyState===O.open||this.readyState===O.connecting)&&U.request("GET",this.endpointURL(),"application/json",null,this.timeout,this.ontimeout.bind(this),e=>{if(e){var{status:t,token:s,messages:i}=e;this.token=s}else var t=0;switch(t){case 200:i.forEach(o=>this.onmessage({data:JSON.stringify(o)})),this.poll();break;case 204:this.poll();break;case 410:this.readyState=O.open,this.onopen(),this.poll();break;case 0:case 500:this.onerror(),this.closeAndRetry();break;default:throw`unhandled poll status ${t}`}})}send(e){U.request("POST",this.endpointURL(),"application/json",e,this.timeout,this.onerror.bind(this,"timeout"),t=>{(!t||t.status!==200)&&(this.onerror(status),this.closeAndRetry())})}close(e,t){this.readyState=O.closed,this.onclose()}}class U{static request(e,t,s,i,o,r,c){if(window.XDomainRequest){let h=new XDomainRequest;this.xdomainRequest(h,e,t,i,o,r,c)}else{let h=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");this.xhrRequest(h,e,t,s,i,o,r,c)}}static xdomainRequest(e,t,s,i,o,r,c){e.timeout=o,e.open(t,s),e.onload=()=>{let h=this.parseJSON(e.responseText);c&&c(h)},r&&(e.ontimeout=r),e.onprogress=()=>{},e.send(i)}static xhrRequest(e,t,s,i,o,r,c,h){e.timeout=r,e.open(t,s,!0),e.setRequestHeader("Content-Type",i),e.onerror=()=>{h&&h(null)},e.onreadystatechange=()=>{if(e.readyState===this.states.complete&&h){let a=this.parseJSON(e.responseText);h(a)}},c&&(e.ontimeout=c),e.send(o)}static parseJSON(e){return e&&e!==""?JSON.parse(e):null}static serialize(e,t){let s=[];for(var i in e){if(!e.hasOwnProperty(i))continue;let o=t?`${t}[${i}]`:i,r=e[i];typeof r=="object"?s.push(this.serialize(r,o)):s.push(encodeURIComponent(o)+"="+encodeURIComponent(r))}return s.join("&")}static appendParams(e,t){if(Object.keys(t).length===0)return e;let s=e.match(/\?/)?"&":"?";return`${e}${s}${this.serialize(t)}`}}U.states={complete:4};class _e{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=null,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}function se(n,e,t){const s=n.slice();return s[11]=e[t],s[13]=t,s}function ie(n,e,t){const s=n.slice();return s[2]=e[t],s}function oe(n,e,t){const s=n.slice();return s[2]=e[t],s}function re(n,e,t){const s=n.slice();return s[18]=e[t],s}function He(n){let e,t,s,i,o,r,c,h,a=[],b=new Map,k,g,v,f,p=n[1],d=[];for(let u=0;u<p.length;u+=1)d[u]=le(re(n,p,u));let E=n[2];const N=u=>u[2];for(let u=0;u<E.length;u+=1){let m=oe(n,E,u),l=N(m);b.set(l,a[u]=ce(l,m))}let S=n[4],_=[];for(let u=0;u<S.length;u+=1)_[u]=ae(se(n,S,u));return{c(){e=w("div"),t=w("button"),t.textContent="DELETE",s=z();for(let u=0;u<d.length;u+=1)d[u].c();i=z(),o=w("div"),r=w("table"),c=w("thead"),h=w("tr");for(let u=0;u<a.length;u+=1)a[u].c();k=z(),g=w("tbody");for(let u=0;u<_.length;u+=1)_[u].c();R(t,"id","del"),R(t,"class","svelte-1rb3lrs"),R(e,"class","buttons svelte-1rb3lrs"),R(h,"class","svelte-1rb3lrs"),R(r,"class","svelte-1rb3lrs"),R(o,"class","container")},m(u,m){P(u,e,m),C(e,t),C(e,s);for(let l=0;l<d.length;l+=1)d[l]&&d[l].m(e,null);P(u,i,m),P(u,o,m),C(o,r),C(r,c),C(c,h);for(let l=0;l<a.length;l+=1)a[l]&&a[l].m(h,null);C(r,k),C(r,g);for(let l=0;l<_.length;l+=1)_[l]&&_[l].m(g,null);v||(f=W(t,"click",n[6]),v=!0)},p(u,m){if(m&2){p=u[1];let l;for(l=0;l<p.length;l+=1){const y=re(u,p,l);d[l]?d[l].p(y,m):(d[l]=le(y),d[l].c(),d[l].m(e,null))}for(;l<d.length;l+=1)d[l].d(1);d.length=p.length}if(m&6&&(E=u[2],a=ge(a,m,N,1,u,E,b,h,me,ce,null,oe)),m&28){S=u[4];let l;for(l=0;l<S.length;l+=1){const y=se(u,S,l);_[l]?_[l].p(y,m):(_[l]=ae(y),_[l].c(),_[l].m(g,null))}for(;l<_.length;l+=1)_[l].d(1);_.length=S.length}},d(u){u&&$(e),Z(d,u),u&&$(i),u&&$(o);for(let m=0;m<a.length;m+=1)a[m].d();Z(_,u),v=!1,f()}}}function Je(n){let e;return{c(){e=w("div"),e.textContent="No requests so far..."},m(t,s){P(t,e,s)},p:H,d(t){t&&$(e)}}}function le(n){let e,t=n[18]+"",s,i,o;function r(){return n[7](n[18])}return{c(){e=w("button"),s=X(t),R(e,"class","svelte-1rb3lrs")},m(c,h){P(c,e,h),C(e,s),i||(o=W(e,"click",r),i=!0)},p(c,h){n=c,h&2&&t!==(t=n[18]+"")&&Q(s,t)},d(c){c&&$(e),i=!1,o()}}}function ce(n,e){let t,s=e[2]+"",i,o,r;function c(){return e[8](e[2])}return{key:n,first:null,c(){t=w("th"),i=X(s),R(t,"class","svelte-1rb3lrs"),this.first=t},m(h,a){P(h,t,a),C(t,i),o||(r=W(t,"click",c),o=!0)},p(h,a){e=h,a&4&&s!==(s=e[2]+"")&&Q(i,s)},d(h){h&&$(t),o=!1,r()}}}function he(n,e){let t,s=e[11][e[2]]+"",i;return{key:n,first:null,c(){t=w("td"),i=X(s),R(t,"class","svelte-1rb3lrs"),ee(t,"isnew",e[3]>e[13]),this.first=t},m(o,r){P(o,t,r),C(t,i)},p(o,r){e=o,r&20&&s!==(s=e[11][e[2]]+"")&&Q(i,s),r&8&&ee(t,"isnew",e[3]>e[13])},d(o){o&&$(t)}}}function ae(n){let e,t=[],s=new Map,i,o=n[2];const r=c=>c[2];for(let c=0;c<o.length;c+=1){let h=ie(n,o,c),a=r(h);s.set(a,t[c]=he(a,h))}return{c(){e=w("tr");for(let c=0;c<t.length;c+=1)t[c].c();i=z(),R(e,"class","svelte-1rb3lrs")},m(c,h){P(c,e,h);for(let a=0;a<t.length;a+=1)t[a]&&t[a].m(e,null);C(e,i)},p(c,h){h&28&&(o=c[2],t=ge(t,h,r,1,c,o,s,e,me,he,i,ie))},d(c){c&&$(e);for(let h=0;h<t.length;h+=1)t[h].d()}}}function Be(n){let e;function t(o,r){return o[0].length===0?Je:He}let s=t(n),i=s(n);return{c(){e=w("body"),i.c()},m(o,r){P(o,e,r),i.m(e,null)},p(o,[r]){s===(s=t(o))&&i?i.p(o,r):(i.d(1),i=s(o),i&&(i.c(),i.m(e,null)))},i:H,o:H,d(o){o&&$(e),i.d()}}}const Ie="http://localhost:4000/requests/json";function qe(n,e,t){let s,i;const o=async f=>{let p=Ie;return f&&(p=p+"?action=delete"),(await fetch(p)).json()};let r,c,h=0,a=[],b=[];we(()=>{r=new xe("ws://127.0.0.1:4000/socket"),r.connect(),c=r.channel("requests:lobby",{}),c.join().receive("ok",()=>{o().then(f=>t(0,a=f))}).receive("error",()=>{console.log("Unable to join")}),c.on("new_request",f=>{t(3,h++,h),t(0,a=[f,...a]),setTimeout(()=>{t(3,h--,h)},2e3)}),c.on("delete_request",()=>t(0,a=[]))});const k=()=>o(!0),g=f=>t(1,b=b.filter(p=>p!==f)),v=f=>{t(1,b=[...b,f])};return n.$$.update=()=>{n.$$.dirty&3&&t(2,s=(()=>{let f=[];return a.forEach(p=>Object.keys(p).forEach(d=>f.push(d))),f=[...new Set(f)],f=f.filter(p=>!b.includes(p)),f.sort()})()),n.$$.dirty&5&&t(4,i=(()=>{let f=[];return a.forEach(p=>{const d={};s.forEach(E=>{d[E]=p.hasOwnProperty(E)?p[E]:""}),f.push(d)}),f})())},[a,b,s,h,i,o,k,g,v]}class ze extends Me{constructor(e){super(),Pe(this,e,qe,Be,be,{})}}new ze({target:document.body});