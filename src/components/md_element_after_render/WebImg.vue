<template>
    <div class="fonts" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img style="width: 70%" :src="conf.imgUrl" :alt="conf.description === '' ? '此图片暂无描述' : conf.description">
        <div>{{ conf.description }}</div>
    </div>
</template>

<script>
export default {
    name: "WebImg",
    props: {
        conf: {
            type: Object,
            default: () => {
                // imgUrl: {
                //     type: String,
                //     default: '',
                // },
                // description: {
                //     type: String,
                //     default: '',
                // },
                return {
                    'imgUrl': '',
                    'description': '',
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
    color: #8e8e8e;
}
</style>
