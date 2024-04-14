import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueParticlesBg from "particles-bg-vue";
import MathJax, {initMathJax, renderByMathjax} from 'mathjax-vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

Vue.use(VueDOMPurifyHTML);

function onMathJaxReady() {
    const el = document.getElementById('elementId');
    renderByMathjax(el);
}

initMathJax({}, onMathJaxReady);

Vue.use(MathJax);

Vue.use(VueParticlesBg);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
