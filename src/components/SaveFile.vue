<template>
    <div class="fonts">
        <Transition name="fade">
            <div v-if="showModal" class="modal"></div>
        </Transition>
        <Transition name="fade">
            <div v-if="showModal" class="face" :class="$store.state.isDark ? 'face-dark' : ''">
                <div style="display: flex; flex-direction: row; align-items: center;">
                    <h2 :style="'color: ' + ($store.state.isDark ? 'white' : '#213547') + ';'">
                        保存并发布
                    </h2>
                </div>
                <div>
                    <h4 :style="$store.state.isDark ? 'color: white;' : ''">发布标题</h4>
                    <input placeholder="输入合适的标题" style="width: 100%; height: 40px; border-radius: 5px;" :class="$store.state.isDark ? 'ip-dark' : 'ip'" />
                    <h4 :style="$store.state.isDark ? 'color: white;' : ''">分类标签</h4>
                    <input placeholder="输入合适的分类标签" style="width: 100%; height: 40px; border-radius: 5px" :class="$store.state.isDark ? 'ip-dark' : 'ip'" />
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 20px; justify-content: flex-end;">
                    <div class="button fonts" style="background-color: #42b883;" @click="submit">确定</div>
                    <div style="width: 10px; height: 1px;"></div>
                    <div class="button fonts" style="background-color: #d81e06;" @click="close">取消</div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import x0p from 'x0popup';
import 'x0popup/dist/x0popup.min.css';

import WebCard from "./md_element_after_render/WebCard";
import Separate from "./md_element_after_render/Separate";

export default {
    name: "SaveFile",
    components: {
        WebCard,
        Separate,
    },
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
        md: {
            type: String,
            default: '',
        }
    },
    methods: {
        close() {
            this.$store.commit("saveMyDocument");
        },
        submit() {
            let that = this;
            // insert code here.
            x0p({
                title: '确认',
                text: '确认提交本次内容？',
                buttons: [
                    {
                        type: 'cancel',
                        text: '取消',
                    },
                    {
                        type: 'warning',
                        text: '确认',
                    },
                ]
            }).then(function (data) {
                if(data.button == 'warning') {
                    console.log(that.$props.md);
                    console.log("提交成功！");
                    that.$store.commit("saveMyDocument");
                    localStorage.removeItem("scottEditorEngineContentCache");
                    localStorage.removeItem("cacheEditTime");
                    that.$store.commit('alertTips', ['success', "提交成功！"]);
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                }
                if(data.button == 'cancel') {
                    console.log("用户取消提交操作。");
                }
            });
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
    width: 590px;
    /*min-height: 310px;*/
    border-radius: 10px;
    background-color: #ffffff;
    position: fixed;

    left: 0;
    /* top: 50%; */
    bottom: 50%;
    right: 0;
    box-sizing: border-box;
    margin: auto;
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    /*align-items: center;*/
    padding: 20px;
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
    src: url("../assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Regular.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTi;
}

.ip {
    border: none;
    outline: none;
    background-color: #f5f5f5;
}

.button {
    width: 60px;
    height: 35px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    text-align: center;
    line-height: 35px;
}

.button:hover {
    cursor: pointer;
}

.button:active {
    filter: brightness(80%);
}

.ip-dark {
    border: none;
    outline: none;
    background-color: rgb(59, 59, 59);
    color: white;
}
</style>
