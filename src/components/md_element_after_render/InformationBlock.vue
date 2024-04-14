<template>
    <div :class="'wrapper-' + conf.types + ' fonts-' + conf.types + ' ' + conf.types + '-border ' + conf.types + '-bg ' + ($store.state.isDark ? 'dark-bg' : '')">
        <div style="width: 18px; height: 18px;" v-if="conf.types === 'info' && conf.showIcon">
            <svg style="width: 18px; height: 18px;" t="1661061891516" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2381" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#2196F3" p-id="2382"></path>
                <path d="M469.333333 469.333333h85.333334v234.666667h-85.333334z" fill="#FFFFFF" p-id="2383"></path>
                <path
                    d="M512 352m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z"
                    fill="#FFFFFF" p-id="2384"></path>
            </svg>
        </div>
        <div style="width: 18px; height: 18px;" v-else-if="conf.types === 'warn' && conf.showIcon">
            <svg style="width: 18px; height: 18px;" t="1661063529225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2160" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                <path
                    d="M1019.20384 901.632L546.62784 82.944c-15.36-26.112-52.736-26.112-68.096 0L5.44384 901.632c-15.36 26.112 3.584 58.88 34.304 58.88h945.152c30.208 0 49.152-32.768 34.304-58.88z"
                    fill="#E9994B" p-id="2161"></path>
                <path
                    d="M462.14784 353.792h0.512c0-26.112 20.992-47.104 47.104-47.104h5.632c26.112 0 47.104 20.992 47.104 47.104v254.464c0 26.112-21.504 47.616-48.128 47.104h-4.608c-26.112 0-47.616-20.992-47.616-47.104V353.792zM569.66784 775.68c-5.12 26.112-20.48 41.984-46.592 47.616-6.144 1.536-12.288 1.536-18.432 0-27.136-5.632-43.52-20.992-49.152-46.592-1.536-6.656-1.536-13.312 0-19.456 5.632-25.6 22.016-40.96 49.152-46.08 6.144-1.024 12.288-1.024 18.432 0 26.112 5.632 41.472 20.992 46.592 47.104 1.024 5.632 1.024 11.776 0 17.408z"
                    fill="#FFFFFF" p-id="2162"></path>
            </svg>
        </div>
        <div style="width: 18px; height: 18px;" v-else-if="conf.types === 'err' && conf.showIcon">
            <svg style="width: 18px; height: 18px;" t="1661063631352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="3090" width="200" height="200">
                <path
                    d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m218.624 672.256c15.872 15.872 15.872 41.984 0 57.856-8.192 8.192-18.432 11.776-29.184 11.776s-20.992-4.096-29.184-11.776L512 569.856l-160.256 160.256c-8.192 8.192-18.432 11.776-29.184 11.776s-20.992-4.096-29.184-11.776c-15.872-15.872-15.872-41.984 0-57.856L454.144 512 293.376 351.744c-15.872-15.872-15.872-41.984 0-57.856 15.872-15.872 41.984-15.872 57.856 0L512 454.144l160.256-160.256c15.872-15.872 41.984-15.872 57.856 0 15.872 15.872 15.872 41.984 0 57.856L569.856 512l160.768 160.256z"
                    fill="#CF3736" p-id="3091"></path>
            </svg>
        </div>
        <div style="margin-left: 5px;" v-dompurify-html="conf.content"></div>
    </div>
</template>

<script>
export default {
    name: "InformationBlock",
    props: {
        conf: {
            type: Object,
            default: () => {
                // types: {
                //     type: String,
                //     default: 'info'  // info、warn、err
                // },
                // content: {
                //     type: String,
                //     default: '',
                // },
                // showIcon: {
                //     type: Boolean,
                //     default: true,
                // },
                return {
                    'types': 'info',
                    'content': '',
                    'showIcon': true,
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

.fonts-info {
    font-family: Lato, AlibabaPuHuiTi;
    color: #1660d0;
    font-weight: bold;
}

.fonts-warn {
    font-family: Lato, AlibabaPuHuiTi;
    color: #ee954d;
    font-weight: bold;
}

.fonts-err {
    font-family: Lato, AlibabaPuHuiTi;
    color: #d73f3e;
    font-weight: bold;
}

.wrapper-info {
    padding: 1rem;
    border-radius: 12px 12px 12px 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
    word-break: break-all;
    outline-color: #359BEE !important;
}

.wrapper-warn {
    padding: 1rem;
    border-radius: 12px 12px 12px 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
    word-break: break-all;
    outline-color: #EAA15B !important;
}

.wrapper-err {
    padding: 1rem;
    border-radius: 12px 12px 12px 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
    word-break: break-all;
    outline-color: #D24948 !important;
}

.wrapper-info:hover {
    transition: outline-color 0.5s;
    outline-color: #359BEE;
}

.wrapper-warn:hover {
    transition: outline-color 0.5s;
    outline-color: #EAA15B;
}

.wrapper-err:hover {
    transition: outline-color 0.5s;
    outline-color: #D24948;
}

.info-border {
    outline: 1px rgba(255, 255, 255, 0) solid;
    transition: outline-color 0.5s;
    outline-offset: -2px;
}

.warn-border {
    outline: 1px rgba(255, 255, 255, 0) solid;
    transition: outline-color 0.5s;
    outline-offset: -2px;
}

.err-border {
    outline: 1px rgba(255, 255, 255, 0) solid;
    transition: outline-color 0.5s;
    outline-offset: -2px;
}

.info-bg {
    background-color: #eff3fd;
}

.warn-bg {
    background-color: #fff4ed;
}

.err-bg {
    background-color: #ffecec;
}

.dark-bg {
    background-color: #2d2d2d;
}
</style>
