"use strict";(self.webpackChunkflashscore=self.webpackChunkflashscore||[]).push([[8974],{84303:(e,A,_)=>{_.d(A,{Y8:()=>a,iI:()=>L,th:()=>n});var r=_(67294),E=_(70186),t=_(23618);function n(){return"visible"===document.visibilityState}function L(){return navigator.onLine}function a(e,A,_){void 0===A&&(A=1/0),void 0===_&&(_=3e3);var a=(0,r.useRef)((()=>{})),c=(0,r.useRef)((()=>{})),u=(0,r.useMemo)((()=>{var[E,n,L]=(0,t.YP)(e,A,_);return a.current=L,c.current=n,r.lazy((()=>E))}),[]),R=(0,r.useCallback)((()=>a.current(!(L()&&n()))),[]);return(0,E.O)("online",R,window),(0,E.O)("offline",R,window),(0,E.O)("visibilitychange",R,document),(0,r.useEffect)((()=>(R(),()=>c.current())),[]),u}},27187:(e,A,_)=>{_.d(A,{Z:()=>a});var r=_(84303),E=_(67294),t=_(85870),n=_(90983);function L(){return L=Object.assign?Object.assign.bind():function(e){for(var A=1;A<arguments.length;A++){var _=arguments[A];for(var r in _)Object.prototype.hasOwnProperty.call(_,r)&&(e[r]=_[r])}return e},L.apply(this,arguments)}function a(e){var{trans:A,serviceStatus:_,placement:r}=e;if(!function(e){switch(e){case n.$.UNAVAILABLE_UPDATES:case n.$.UNAVAILABLE_LIVE_CENTRE:case n.$.UNAVAILABLE_STANDINGS:case n.$.UNAVAILABLE_LC:case n.$.UNAVAILABLE_H2H:case n.$.UNAVAILABLE_MY_GAMES:case n.$.UNAVAILABLE_ODDS:return[t.e.LIVE_TABLE];case n.$.UNAVAILABLE_UPDATES_ON_DETAIL:return[t.e.DETAIL];case n.$.UNAVAILABLE_UPDATES_ON_DETAIL_AND_LIVETABLE:return[t.e.LIVE_TABLE,t.e.DETAIL]}return[]}(_).includes(r))return null;var[L,a]=function(e){switch(e){case n.$.UNAVAILABLE_UPDATES:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_UPDATES_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_UPDATES_PART_2"];case n.$.UNAVAILABLE_LIVE_CENTRE:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_LIVE_CENTRE_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_LIVE_CENTRE_PART_2"];case n.$.UNAVAILABLE_STANDINGS:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_STANDINGS_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_STANDINGS_PART_2"];case n.$.UNAVAILABLE_LC:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_LC_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_LC_PART_2"];case n.$.UNAVAILABLE_H2H:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_H2H_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_H2H_PART_2"];case n.$.UNAVAILABLE_MY_GAMES:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_MY_GAMES_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_MY_GAMES_PART_2"];case n.$.UNAVAILABLE_ODDS:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_ODDS_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_ODDS_PART_2"];case n.$.UNAVAILABLE_UPDATES_ON_DETAIL:case n.$.UNAVAILABLE_UPDATES_ON_DETAIL_AND_LIVETABLE:return["TRANS_SYSTEM_ERROR_UNAVAILABLE_UPDATES_PART_1","TRANS_SYSTEM_ERROR_UNAVAILABLE_UPDATES_PART_2"]}return["",""]}(_);return E.createElement(c,{textPart1:A.translate(L),textPart2:A.translate(a),titleOnClose:A.translate("TRANS_CLOSE")})}function c(e){var A=(0,r.Y8)((()=>_.e(6473).then(_.bind(_,7436))));return E.createElement(E.Suspense,{fallback:null},E.createElement(A,L({},e)))}},15402:(e,A,_)=>{var r=_(67294),E=_(20745),t=_(85870),n=_(27187),L=document.getElementById("fscon");if(L){var a=(0,E.s)(L);cjs.Api.loader.get("cjs").call((e=>{e.Api.loader.get("Helper_ServiceStatusBox").fulfill((A=>{a.render(r.createElement(n.Z,{placement:t.e.LIVE_TABLE,trans:e.dic.get("util_trans"),serviceStatus:A}))}))}))}},70186:(e,A,_)=>{_.d(A,{O:()=>t,P:()=>E});var r=_(67294);function E(e,A,_){var E=(0,r.useRef)(null);(0,r.useEffect)((()=>{E.current=A}),[A]),(0,r.useEffect)((()=>{var A=_.current,r=e=>E.current&&E.current(e);return null==A||A.addEventListener(e,r),()=>{null==A||A.removeEventListener(e,r)}}),[e,_])}function t(e,A,_){var E=(0,r.useRef)(A);(0,r.useEffect)((()=>{E.current=A}),[A]),(0,r.useEffect)((()=>{var A=e=>E.current&&E.current(e);return _.addEventListener(e,A),()=>_.removeEventListener(e,A)}),[_,e])}},85870:(e,A,_)=>{_.d(A,{e:()=>r});var r=Object.freeze({LIVE_TABLE:1,DETAIL:2})},90983:(e,A,_)=>{_.d(A,{$:()=>r});var r=Object.freeze({OK:1,UNAVAILABLE_UPDATES:2,UNAVAILABLE_LIVE_CENTRE:3,UNAVAILABLE_STANDINGS:4,UNAVAILABLE_LC:6,UNAVAILABLE_H2H:7,UNAVAILABLE_MY_GAMES:8,UNAVAILABLE_ODDS:9,UNAVAILABLE_UPDATES_ON_DETAIL:10,UNAVAILABLE_UPDATES_ON_DETAIL_AND_LIVETABLE:11})},23618:(e,A,_)=>{_.d(A,{$A:()=>n,XD:()=>t,YP:()=>L});var r=_(86515),E=_(16716);function t(e,A,_){return void 0===A&&(A=1/0),void 0===_&&(_=3e3),new Promise(((r,E)=>{e().then(r).catch((n=>{setTimeout((()=>{A<=1?E(n):t(e,A-1,_).then(r,E)}),_)}))}))}function n(e,A,_,r,E){void 0===r&&(r=1/0),void 0===E&&(E=3e3);var t=!1,L=A.subscribe((()=>t=!0));return new Promise(((a,c)=>{e().then(a).catch((u=>{var R=()=>{clearInterval(s),L.unsubscribe(),T.unsubscribe()},S=()=>{R(),c(u)},T=A.subscribe(S),s=setInterval((()=>{r<=1||t?S():_.getValue()||(R(),n(e,A,_,r-1,E).then(a,c))}),E)}))}))}function L(e,A,_){var t=new E.x,L=new r.X(!1);return[n(e,t,L,A,_),()=>t.next(),e=>L.next(e)]}}},e=>{e.O(0,[1216],(()=>{return A=15402,e(e.s=A);var A}));e.O()}]);