class t{constructor(){this.events=new Map}addListener(t,e,...s){let i=this.events.get(t);return i||(i=new Map,this.events.set(t,i)),i.set(e,s),this}removeListener(t,e){const s=this.events.get(t);if(s)return s.delete(e),0===s.size&&this.events.delete(t),this}emit(t,...e){const s=this.events.get(t);s&&s.forEach((t,s)=>{s.call(void 0,...t,...e)})}}class e{constructor(t){this.collection=t,this.app=t.app,this.components=new Map,this.tags=new Set,this.tag("all")}attach(t,...e){return this[t.tag]=t.init(this,...e),this.components.set(t.tag,t),this.tag(t.tag),this}detach(t){const{exit:e}=this.components.get(t);return this[t]=void 0,this.components.delete(t),this.untag(t),e&&e(this),this}tag(t){return this.tags.add(t),this.collection.index(t).set.add(this),this}untag(t){return this.tags.delete(t),this.collection.index(t).set.delete(this),this}destroy(){this.components.values().forEach(({exit:t})=>{t&&t(this)}),this.tags.forEach(t=>{this.collection.index(t).set.delete(this)}),this.destroyed=!0}}class s{constructor(t,e){this.collection=t,this.set=new Set(e)}and(t){return this.filter(e=>e.tags.has(t))}andNot(t){return this.filter(e=>!e.tags.has(t))}or(t){return new s(this.collection,[...this.set,...this.collection.get(t)])}filter(t){const e=new s(this.collection);return this.forEach(s=>{t(s)&&e.set.add(s)}),e}forEach(t){this.set.forEach(t)}[Symbol.iterator](){return this.set.values()}}class i{constructor(t){this.app=t,this.indexes=new Map}create(){return new e(this)}get(t){return this.indexes.has(t)?this.indexes.get(t):new s(this)}index(t){let e;return this.indexes.has(t)?e=this.indexes.get(t):(e=new s(this),this.indexes.set(t,e)),e}}class n{constructor(t){this.app=t,this.systems=new Set}start(t){const e=[t.event,t.action,this.app];if(t.init){const s=t.init(this.app);void 0!==s&&e.push(s)}this.systems.add(t),this.app.event.addListener(...e)}stop(t){this.app.event.removeListener(t.event,t.action),this.systems.delete(t),t.exit&&t.exit(this.app)}}function o(){if(globalThis.performance)return performance.now()/1e3;{const t=process.hrtime();return t[0]+t[1]/1e9}}function a(t){let e,s,i=o();function n(){e=o(),s=e-i,i=e,t.event.emit("update",s),t.event.emit("draw")}globalThis.requestAnimationFrame?requestAnimationFrame((function t(){n(),requestAnimationFrame(t)})):setInterval(n,1e3/60)}var h="1.4.1",r="junebloom/fae";function c(){const t=`%cfae ♥ ${h}%c https://github.com/${r} `;globalThis.document?console.log(t,"\n        background: #aaf;\n        color: white;\n        padding: 4px 10px;\n        border-radius: 30px;\n      ","color: #aaf;"):console.log(t.replace(/%c/,"[35m[1m").replace(/%c/,"[0m[35m")+"[0m")}class l{constructor({startGame:e=a,state:s={},hideBanner:o=!1}){this.state=s,this.event=new t,this.entity=new i(this),this.system=new n(this),e(this),o||c()}}var d={Application:l,getTime:o,logBanner:c};export default d;export{l as Application,o as getTime,c as logBanner};
//# sourceMappingURL=fae.js.map
