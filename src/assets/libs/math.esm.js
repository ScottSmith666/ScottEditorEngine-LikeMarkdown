function e(e,t){void 0===e&&(e={}),function(){if(!window.MathJax){var e=document.createElement("script");e.src="https://lib.baomitu.com/mathjax/3.2.2/es5/tex-svg-full.min.js",e.async=!0,document.head.appendChild(e)}}();var n={tex:{inlineMath:[["$","$"]],displayMath:[["$$","$$"]],processEnvironments:!0,processRefs:!0},options:{skipHtmlTags:["noscript","style","textarea","pre","code"],ignoreHtmlClass:"tex2jax_ignore"},startup:{pageReady:function(){t&&t()}},svg:{fontCache:"global"}},i=Object.assign({},n,e);window.MathJax=i}function t(e){if(window.MathJax.version)return e&&!Array.isArray(e)&&(e=[e]),new Promise((function(t,n){window.MathJax.typesetPromise(e).then((function(){t(void 0)})).catch((function(e){return n(e)}))}))}function n(e,t,n,i,o,a,r,s,d,c){"boolean"!=typeof r&&(d=s,s=r,r=!1);var f,h="function"==typeof n?n.options:n;if(e&&e.render&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns,h._compiled=!0,o&&(h.functional=!0)),i&&(h._scopeId=i),a?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(a)},h._ssrRegister=f):t&&(f=r?function(e){t.call(this,c(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,s(e))}),f)if(h.functional){var l=h.render;h.render=function(e,t){return f.call(t),l(e,t)}}else{var u=h.beforeCreate;h.beforeCreate=u?[].concat(u,f):[f]}return n}var i={name:"MathJax",props:{latex:{type:String,default:""},block:{type:Boolean,default:!1}},watch:{latex:function(){this.renderMathJax()}},mounted:function(){this.renderMathJax()},methods:{renderMathJax:function(){this.$el.innerText=this.block?"$$ "+this.latex+" $$":"$ "+this.latex+" $",t(this.$el)}}},o=function(){var e=this.$createElement;return(this._self._c||e)("span")};o._withStripped=!0;var a=n({render:o,staticRenderFns:[]},undefined,i,undefined,false,undefined,!1,void 0,void 0,void 0);function r(e){e.component("MathJax",a)}var s={version:"0.0.1",install:r};"undefined"!=typeof window&&window.Vue&&r(window.Vue);export default s;export{a as MathJax,e as initMathJax,t as renderByMathjax};