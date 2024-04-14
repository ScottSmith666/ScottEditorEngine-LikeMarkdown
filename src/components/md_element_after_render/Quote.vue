<template>
    <div :class="'quote-wrap trans' + ($store.state.isDark ? '-dark' : '') + ' fonts ' + ($store.state.isDark ? 'quote-wrap-dark' : '')" style="padding: 0 1rem;">
        <!--如果没有多层，那么直接显示内容-->
        <div style="padding: 0.5rem;" v-if="conf.layer === 1" v-dompurify-html="conf.content"></div>

        <!--如果有多层，那么就嵌套后再显示内容-->
        <div class="block-row" v-else style="margin-left: 0.2rem;">
            <!--几个引用竖边-->
            <div class="block-row">
                <div v-for="num in (conf.layer - 1)" class="quote-wrap fonts" :class="$store.state.isDark ? 'quote-wrap-dark' : ''" style="width: 0.2rem;"></div>
            </div>
            <!--引用的内容-->
            <div class="quote-wrap fonts" style="border: none; padding-left: 0;" v-dompurify-html="conf.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Quote",
    props: {
        conf: {
            type: Object,
            default: () => {
                // content: {
                //     type: String,
                //     default: '',
                // },
                // layer: {  // 引用嵌套层级
                //     type: Number,
                //     default: 1,
                // },
                return {
                    'content': '引用测试Quote Test',
                    'layer': 1,
                };
            }
        },
    }
}
</script>

<style scoped>
.quote-wrap {
    padding: 0.5rem;
    border-left: rgba(60, 60, 60, .29) 0.2rem solid;
}

.quote-wrap-dark {
    border-left: #6e6e6e 0.2rem solid;
}

.trans {
    background-color: #f8f8f8;
    transition: background-color 0.5s;
}

.trans-dark {
    background-color: #2d2d2d;
    transition: background-color 0.5s;
}

.trans:hover {
    background-color: #eaeaea;
    transition: background-color 0.5s;
}

.trans-dark:hover {
    background-color: #484848;
    transition: background-color 0.5s;
}

@font-face {
    /* 中文字体全局定义为“阿里巴巴普惠体” */
    font-family: AlibabaPuHuiTi;
    src: url("../../../src/assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Regular.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTi;
    color: #8e8e8e;
}

.block-row {
    display: flex;
    flex-direction: row;
}
</style>
