function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},t=o.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in i){var o=i[e];delete i[e];var t={id:e,exports:{}};return n[e]=t,o.call(t.exports,t,t.exports),t.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){i[e]=o},o.parcelRequired7c6=t);var r=t("eWCmQ");var l,s;document.querySelector("form").addEventListener("submit",(function(e){e.preventDefault(),console.log("submitForm active")})),(l=2,s=1500,new Promise(((e,o)=>{const n=Math.random()>.3;setInterval((()=>{n?e({position:l,delay:s}):o({position:l,delay:s})}))}))).then((({position:o,delay:n})=>{console.log(`✅ Fulfilled promise ${o} in ${n}ms`),e(r).Notify.success(`✅ Fulfilled promise ${o} in ${n}ms`)})).catch((({position:o,delay:n})=>{console.log(`❌ Rejected promise ${o} in ${n}ms`),e(r).Notify.failure(`❌ Rejected promise ${o} in ${n}ms`)}));
//# sourceMappingURL=03-promises.7914f163.js.map
