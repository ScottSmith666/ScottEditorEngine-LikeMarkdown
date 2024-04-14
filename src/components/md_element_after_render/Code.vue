<template>
    <div>
        <prism-editor :readonly="true" class="my-editor" v-model="conf.content" :highlight="highlighter" line-numbers :class="!$store.state.isDark ? 'bg-light' : ''"
                      :tab-size="4"></prism-editor>
        <div style="display: flex; justify-content: right;" class="fonts">Language: {{ firstLetterUpperCase(conf.kind) }}</div>
    </div>
</template>

<script>
// import Prism Editor
import {PrismEditor} from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

export default {
    name: "Code",
    components: {
        PrismEditor,
    },
    props: {
        conf: {
            type: Object,
            default: () => {
                // kind: {
                //     type: String,
                //     default: 'javascript',
                // },
                // content: {
                //     type: String,
                //     default: '',
                // },
                return {
                    'kind': 'javascript',
                    'content': 'console.log("test");',
                };
            },
        },
    },
    methods: {
        highlighter(content) {
            return highlight(content, languages[this.$props.conf.kind], this.$props.conf.kind); // languages.<insert language> to return html with markup
        },

        firstLetterUpperCase(str) {
            return str[0].toUpperCase() + str.slice(1);
        }
    },
}
</script>

<style scoped>
/* required class */
.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;
    /*color: #80118c;*/
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    border-radius: 4px;
}

.bg-light {
    background: #f6f6f6 !important;
    color: #5e5e5e !important;
}

.prism-editor-wrapper {
    height: auto !important;
    width: auto !important;
}

@font-face {
    /* 中文字体全局定义为“阿里巴巴普惠体” */
    font-family: AlibabaPuHuiTi;
    src: url("../../../src/assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Regular.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTi;
    color: #8e8e8e;
    font-weight: bold;
}
</style>
