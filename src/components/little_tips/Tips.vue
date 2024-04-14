<template>
    <div class="fonts">
        <Transition name="fade">
            <div v-if="showModal" class="modal"></div>
        </Transition>
        <Transition name="fade">
            <div v-if="showModal" class="face" :class="$store.state.isDark ? 'face-dark' : ''">
                <!--图标与名称并排-->
                <div style="display: flex; flex-direction: row; align-items: center;">
                    <div style="margin-right: 15px;">
                        <!--成功-->
                        <svg v-if="kind === 'success'" style="width: 35px; height: 35px;" t="1711807494480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6294" width="200" height="200"><path d="M510.545 28.22c-267.043 0-483.521 216.477-483.521 483.52s216.479 483.521 483.521 483.521 483.52-216.479 483.52-483.521S777.588 28.22 510.545 28.22zM776.855 407.855l-315.37 315.37c-9.763 9.763-22.559 14.645-35.355 14.645-12.796 0-25.592-4.882-35.355-14.645l-176.13-176.13c-19.526-19.525-19.526-51.184 0-70.71 19.526-19.526 51.184-19.527 70.711 0L426.13 617.159l280.015-280.015c19.527-19.526 51.184-19.526 70.711 0C796.382 356.671 796.382 388.329 776.855 407.855z" fill="#42b883" p-id="6295" data-spm-anchor-id="a313x.search_index.0.i4.61b73a81DA0dak" class="selected"></path></svg>

                        <!--警告-->
                        <svg v-if="kind === 'warning'" style="width: 35px; height: 35px;" t="1711855711011" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4271" width="200" height="200"><path d="M1004.657 801.716 602.263 91.599c-49.213-86.817-129.646-86.817-178.866 0L21.004 801.716c-49.207 86.906-8.949 157.798 89.388 157.798l804.877 0C1013.606 959.514 1053.825 888.622 1004.657 801.716zM544.635 832.216l-63.649 0 0-63.649 63.649 0L544.635 832.216zM544.635 641.27l-63.649 0L480.986 259.377l63.649 0L544.635 641.27z" p-id="4272" fill="#ebd527"></path></svg>

                        <!--错误-->
                        <svg v-if="kind === 'error'" style="width: 35px; height: 35px;" t="1711855760877" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5462" width="200" height="200"><path d="M512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m44.245333-469.333333l159.914667-159.914667a31.274667 31.274667 0 1 0-44.245333-44.245333L512 467.754667 352.085333 307.84a31.274667 31.274667 0 1 0-44.245333 44.245333L467.754667 512l-159.914667 159.914667a31.274667 31.274667 0 1 0 44.245333 44.245333L512 556.245333l159.914667 159.914667a31.274667 31.274667 0 1 0 44.245333-44.245333L556.245333 512z" fill="#F5222D" p-id="5463"></path></svg>
                    </div>
                    <div class="fonts" :style="'font-weight: bold; color: ' + ($store.state.isDark ? 'white' : '#213547') + ';'">
                        {{ $store.state.popWords }}
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import WebCard from "../md_element_after_render/WebCard";
import Separate from "../md_element_after_render/Separate";

export default {
    name: "Tips",
    components: {
        WebCard,
        Separate,
    },
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
        kind: {
            type: String,  // success, warning and error
            default: 'success',
        },
        title: {
            type: String,
            default: "成功！",
        },
    },
    methods: {
        close() {
            this.$emit('closeModal');
        },
    },
}
</script>

<style scoped>
.modal {
    z-index: 250;
    display: block;
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    margin: 0 auto;
}

.face {
    z-index: 251;
    overflow: auto;
    width: 300px;
    /*min-height: 310px;*/
    border-radius: 10px;
    background-color: #ffffff;
    position: fixed;

    left: 0;
    top: 5%;
    right: 0;
    min-height: 10px;
    margin: auto;
    display: flex;
    flex-direction: row;
    /*justify-content: center;*/
    /*align-items: center;*/
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.face-dark {
    background-color: #242424 !important;
    box-shadow: 0 12px 32px rgba(255, 255, 255, .1), 0 2px 6px rgba(255, 255, 255, .08) !important;
}

.fade-enter-active {
    transition: opacity 0.3s;
}

.fade-enter {
    opacity: 0;
}

.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-leave-to {
    opacity: 0;
}

@font-face {
    /* 中文字体全局定义为“阿里巴巴普惠体” */
    font-family: AlibabaPuHuiTi;
    src: url("../../assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Regular.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTi !important;
}
</style>
