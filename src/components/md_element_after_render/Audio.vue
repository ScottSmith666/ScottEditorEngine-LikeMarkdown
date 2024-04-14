<template>
    <div class="fonts" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <audio style="width: 70%" controls>
            <source :src="conf.audioUrl">
        </audio>
        <div>{{ conf.description }}</div>
    </div>
</template>
<script>
    export default {
        name: "Audio",
        components: {
            
        },
        props: {
            conf: {
                type: Object,
                default: () => {
                    // videoUrl: {
                    //     type: String,
                    //     default: '',
                    // },
                    // description: {
                    //     type: String,
                    //     default: '',
                    // },
                    return {
                        'audioUrl': '',
                        'description': '',
                    };
                },
            },
        },
        methods: {
            
        },
        data() {
            return {
                
            };
        },
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
