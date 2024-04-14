<template>
    <div @mouseover="sharp1Appear" @mouseleave="sharp1Disappear" class="fonts"
         style="display: flex; flex-direction: row; align-items: center; margin-bottom: 15px;"
         :style="conf.border ? 'border-bottom: 1px rgba(60, 60, 60, .12) solid;' : ''" :class="$store.state.isDark ? 'line-dark' : ''">
        <div>
            <h1 :class="$store.state.isDark ? 'fonts-dark' : ''" v-if="conf.size === 1" style="color: #213547">{{ conf.content }}</h1>
            <h2 :class="$store.state.isDark ? 'fonts-dark' : ''" v-if="conf.size === 2" style="color: #213547">{{ conf.content }}</h2>
            <h3 :class="$store.state.isDark ? 'fonts-dark' : ''" v-if="conf.size === 3" style="color: #213547">{{ conf.content }}</h3>
            <h4 :class="$store.state.isDark ? 'fonts-dark' : ''" v-if="conf.size === 4" style="color: #213547">{{ conf.content }}</h4>
            <h5 :class="$store.state.isDark ? 'fonts-dark' : ''" v-if="conf.size === 5" style="color: #213547">{{ conf.content }}</h5>
            <h6 :class="$store.state.isDark ? 'fonts-dark' : ''" v-if="conf.size === 6" style="color: #213547">{{ conf.content }}</h6>
        </div>
        <transition>
            <a :href="'#' + conf.content" v-show="showSharp" class="sharp">
                <h1 v-if="conf.size === 1">&nbsp;#</h1>
                <h2 v-if="conf.size === 2">&nbsp;#</h2>
                <h3 v-if="conf.size === 3">&nbsp;#</h3>
                <h4 v-if="conf.size === 4">&nbsp;#</h4>
                <h5 v-if="conf.size === 5">&nbsp;#</h5>
                <h6 v-if="conf.size === 6">&nbsp;#</h6>
            </a>
        </transition>
    </div>
</template>

<script>
export default {
    name: "Title",
    data() {
        return {
            showSharp: false,
        };
    },
    methods: {
        sharp1Appear() {
            this.$data.showSharp = true;
        },

        sharp1Disappear() {
            this.$data.showSharp = false;
        }
    },
    props: {
        conf: {
            type: Object,
            default: () => {
                // 全部参数
                // content: {
                //     type: String,
                // },
                // size: {
                //     type: Number,
                //     default: 1,
                // },
                // border: {
                //     type: Boolean,
                //     default: true,
                // }
                return {
                    'content': '标题测试Title Test',
                    'size': 1,
                    'border': true,
                };
            },
        },
    }
}
</script>

<style scoped>
@font-face {
    /* 标题，中文字体全局定义为“阿里巴巴普惠体”且为粗体 */
    font-family: AlibabaPuHuiTiBold;
    src: url("../../../src/assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Bold.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTiBold !important;
}

.fonts-dark {
    transition: color 0.5s;
    color: #ccc !important;
}

.sharp {
    color: #42b883;
    text-decoration: none;
}

/*animation*/
.v-enter-active, .v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}

.line-dark {
    border-bottom: 1px #ccc solid !important;
}
</style>
