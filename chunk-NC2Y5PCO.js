import{A as mt,B as pt,C as ct,D as dt,E as gt,a as z,b as $,c as Q,d as j,e as A,f as B,g as G,h as K,i as T,j as R,k as U,l as q,m as W,n as X,o as H,p as J,q as Y,r as Z,s as tt,t as et,u as nt,v as it,w as ot,x as at,y as rt,z as lt}from"./chunk-Y4HXTBKX.js";import{Aa as c,Ba as O,Ga as S,Ja as P,La as E,Pa as v,Qa as b,Ra as I,Sa as D,Ta as F,Ua as e,Va as t,Wa as _,Ya as u,ab as d,ca as h,cb as g,gb as f,ha as s,hb as n,ia as x,ib as w,jb as k,nb as y,wb as V,xb as N,zb as L}from"./chunk-RF77WKQM.js";var st=["timepicker"];function xt(a,o){a&1&&(e(0,"span",9),n(1," | "),t())}function _t(a,o){if(a&1){let m=u();e(0,"span",7),d("click",function(){let r=s(m).$implicit,p=g();return x(p.updateLocale(r))}),n(1),t(),v(2,xt,2,0,"span",8)}if(a&2){let m=o.$implicit,l=o.$index,i=o.$count,r=g();E("active",m===r.currentLocaleKey),c(1),k(" ",m," "),c(1),b(2,l!==i-1?2:-1)}}function ut(a,o){if(a&1){let m=u();e(0,"div")(1,"h2"),n(2,"Picker with 12h format"),t(),e(3,"p"),n(4," using "),e(5,"span",10),n(6,"default"),t(),n(7," palette (primary) "),t(),e(8,"app-code-viewer")(9,"div",11)(10,"button",12),d("click",function(){s(m);let i=g();return x(i.openDialog())}),n(11," OPEN DIALOG "),t(),e(12,"ngx-mat-timepicker-field",13),d("timeChanged",function(i){s(m);let r=g();return x(r.time=i)}),t(),e(13,"p"),n(14),t()(),e(15,"pre",14),n(16,"                    "),e(17,"code"),n(18,`

                    `),t(),n(19,`
                `),t()()()}if(a&2){let m=g();c(12),P("format",24)("defaultTime",m.time)("controlOnly",!0),c(2),w(m.time)}}var ft=(()=>{let o=class o{constructor(){this.date="2:00"}};o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=h({type:o,selectors:[["app-dialog"]],standalone:!0,features:[y],decls:14,vars:4,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"time-input-width"],["matInput","","name","selected_time_a","readonly","",3,"format","ngModel","ngxMatTimepicker","ngModelChange"],["foo","matInput"],["matSuffix","",3,"click"],["appendToInput","true"],["pickerA",""]],template:function(i,r){if(i&1){let p=u();e(0,"div",0),n(1,"Dialog Title"),t(),e(2,"div",1)(3,"mat-form-field",2)(4,"mat-label"),n(5,"Time"),t(),e(6,"input",3,4),d("ngModelChange",function(M){return r.date=M}),t(),e(8,"mat-icon",5),d("click",function(){s(p);let M=f(13);return x(M.open())}),n(9,"watch_later "),t()(),e(10,"p"),n(11),t(),_(12,"ngx-mat-timepicker",6,7),t()}if(i&2){let p=f(7),C=f(13);c(6),P("format",24)("ngModel",r.date)("ngxMatTimepicker",C),c(5),k("FIELD FOCUSED: ",p.focused,"")}},dependencies:[rt,ot,at,W,q,R,U,H,X,T,z,Q,G,ct,nt,et,mt],encapsulation:2});let a=o;return a})(),zt=(()=>{let o=class o extends gt{constructor(l,i){super(i),this._matDialog=l,this.formControlItem=new B("",[$.pattern(/([0-9]|[1-2]\d):[0-5]\d/)]),this.time="00:00"}onClear(){this.formControlItem.setValue(null)}onFieldBlur(){this.formControlItem.valid&&this.pickerFreeInput.updateTime(this.formControlItem.value)}openDialog(){this._matDialog.open(ft,{width:"300px"})}openFromIcon(l){this.formControlItem.disabled||l.open()}};o.\u0275fac=function(i){return new(i||o)(O(it),O(lt))},o.\u0275cmp=h({type:o,selectors:[["app-test"]],viewQuery:function(i,r){if(i&1&&N(st,5),i&2){let p;V(p=L())&&(r.timepicker=p.first)}},standalone:!0,features:[S,y],decls:23,vars:2,consts:[["color","primary",1,"ngx-mtp-header","mat-elevation-z6"],["src","assets/angular-white-transparent.svg","alt","",1,"ngx-mtp-ng-logo"],["title","toggle locale",1,"ngx-mtp-header-title"],[1,"ngx-mtp-container"],[1,"ngx-mtp-locales"],["mat-raised-button","","color","primary",3,"click"],[1,"demo-form"],[1,"locale",3,"click"],["class","separator"],[1,"separator"],[1,"mat-color-primary"],[1,"example","ngx-mtp-d-flex","ngx-mtp-align-center","ngx-mtp-flex-column"],["mat-button","","color","primary",3,"click"],["color","warn",3,"format","defaultTime","controlOnly","timeChanged"],[1,"language-markup"]],template:function(i,r){i&1&&(e(0,"mat-toolbar",0)(1,"div"),_(2,"img",1),e(3,"span",2),n(4," ngx-mat-timepicker "),t()(),_(5,"div"),t(),e(6,"div",3)(7,"div",4)(8,"p"),n(9,"Dynamic locale (v >= 12.2.0)"),t(),e(10,"p"),D(11,_t,3,4,null,null,I),t(),e(13,"button",5),d("click",function(){return r.updateLocale()}),n(14," Next locale "),t()(),e(15,"form",6),v(16,ut,20,4,"div"),t()(),e(17,"footer")(18,"p"),n(19," \xA9 "),e(20,"span"),n(21),t(),n(22," MIT License "),t()()),i&2&&(F(11,r.myLocaleKeys),c(16),b(16,16),c(5),w(r.year))},dependencies:[tt,Z,Y,J,T,K,j,A,dt,pt],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:block;padding-top:56px}.ngx-mtp-header[_ngcontent-%COMP%]{overflow:hidden;justify-content:space-between;align-items:center;position:fixed;z-index:2;top:0;left:0}.ngx-mtp-header[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;align-items:center}.ngx-mtp-header[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > img.ngx-mtp-ng-logo[_ngcontent-%COMP%]{display:inline-block;margin-right:16px;height:26px}.ngx-mtp-header[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > .ngx-mtp-header-title[_ngcontent-%COMP%]{font-size:22px}.ngx-mtp-header[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .ngx-mtp-github-link-desktop[_ngcontent-%COMP%]{color:inherit}.ngx-mtp-header[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .ngx-mtp-github-link-desktop[_ngcontent-%COMP%]   span.ngx-mtp-github-logo-text[_ngcontent-%COMP%]{display:inline-block;margin-left:8px}@media (max-width: 991px){.ngx-mtp-header[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .ngx-mtp-github-link-desktop[_ngcontent-%COMP%]   span.ngx-mtp-github-logo-text[_ngcontent-%COMP%]{display:none}}@media (max-width: 991px){.ngx-mtp-header[_ngcontent-%COMP%]{padding-left:8px;padding-right:8px}}.ngx-mtp-github-logo[_ngcontent-%COMP%]{display:inline-block;height:26px;vertical-align:middle}.ngx-mtp-top[_ngcontent-%COMP%]{width:100%;min-height:20px;text-align:center;overflow:hidden;padding-top:60px;padding-bottom:20px;position:relative}.ngx-mtp-top[_ngcontent-%COMP%]:before{content:"";position:absolute;background-image:url("./media/angular-white-transparent-V2XW22PQ.svg");background-size:contain;bottom:0;right:150px;background-repeat:no-repeat;background-position:center;opacity:.2;width:200px;height:200px}@media (max-width: 991px){.ngx-mtp-top[_ngcontent-%COMP%]:before{right:calc(50% - 100px);opacity:.1}}.ngx-mtp-top[_ngcontent-%COMP%] > h1.ngx-mtp-main-title[_ngcontent-%COMP%]{font-size:56px;font-weight:300;line-height:56px;margin:15px 5px}.ngx-mtp-top[_ngcontent-%COMP%]   .ngx-mtp-badges[_ngcontent-%COMP%] > img[_ngcontent-%COMP%], .ngx-mtp-top[_ngcontent-%COMP%]   .ngx-mtp-badges[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-right:8px}.ngx-mtp-top[_ngcontent-%COMP%]   .ngx-mtp-badges[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:last-child, .ngx-mtp-top[_ngcontent-%COMP%]   .ngx-mtp-badges[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:last-child{margin-right:0}.ngx-mtp-container[_ngcontent-%COMP%]{padding:20px;text-align:center}.ngx-mtp-locales[_ngcontent-%COMP%]   .locale[_ngcontent-%COMP%]{cursor:pointer;opacity:.5;transition:opacity .2s ease-in-out}.ngx-mtp-locales[_ngcontent-%COMP%]   .locale.active[_ngcontent-%COMP%]{opacity:1}.demo-form[_ngcontent-%COMP%]{padding:16px;box-sizing:border-box;display:flex;flex-wrap:wrap;width:100%}.demo-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{box-sizing:border-box;margin:8px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}@media (min-width: 768px){.demo-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:calc(50% - 16px)}}@media (max-width: 991px){.demo-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:calc(100% - 16px)}}.demo-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:0}footer[_ngcontent-%COMP%]{text-align:center;padding:25px 0;width:100%}.terminal[_ngcontent-%COMP%]{position:relative;width:80%;max-width:600px;border-radius:6px;padding-top:45px;margin-top:8px;overflow:hidden;background-color:#0f0f10}@media (max-width: 991px){.terminal[_ngcontent-%COMP%]{width:100%}}.terminal[_ngcontent-%COMP%]:before{content:"\\2022\\2022\\2022";position:absolute;z-index:1;top:0;left:0;background:#3a3a3a;color:#c2c3c4;width:100%;font-size:34px;line-height:26px;text-indent:6px;text-align:left;height:34px}.terminal[_ngcontent-%COMP%]{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;color:#fff;padding:0 1rem 1rem;margin:0;text-align:left;padding-top:44px}.terminal[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.terminal[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{line-height:1.3rem}']});let a=o;return a})();export{ft as NgxMatTimepickerTestDialogComponent,zt as TestComponent};