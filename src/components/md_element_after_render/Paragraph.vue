<template>
    <div><p class="fonts" v-dompurify-html="conf.content" :class="$store.state.isDark ? 'dark' : ''"></p></div>
</template>

<script>
export default {
    name: "Paragraph",
    data() {
        return {};
    },
    props: {
        conf: {
            type: Object,
            default: () => {
                // content: {
                //     type: String,
                //     default: 'paragraph',
                // }
                return {
                    'content': '段落测试Paragraph Test',
                };
            },
        },
    }
}
</script>

<style scoped>
@font-face {
    /* 中文字体全局定义为“阿里巴巴普惠体” */
    font-family: AlibabaPuHuiTi;
    src: url("../../../src/assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Regular.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTi;
}

.dark {
    color: #ccc !important;
}
</style>
