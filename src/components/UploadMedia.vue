<template>
    <div class="fonts">
        <Transition name="fade">
            <div v-if="showModal" class="modal"></div>
        </Transition>
        <Transition name="fade">
            <div v-if="showModal" class="face" :class="$store.state.isDark ? 'face-dark' : ''">
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                    <h2 :style="'color: ' + ($store.state.isDark ? 'white' : '#213547') + ';'">
                        上传多媒体
                    </h2>
                    <h1 :style="'cursor: pointer; color: ' + ($store.state.isDark ? 'white' : '#213547') + ';'" @click="close">
                        ×
                    </h1>
                </div>
                <div>
                    <h4 :style="$store.state.isDark ? 'color: white;' : ''">选择需要上传的单个视频、图片或音频</h4>
                    <div style="display: flex; flex-direction: row;">
                        <label for="upm">
                            <div class="button fonts" style="background-color: #42b883; margin-right: 10px; border-radius: 5px; width: 120px; height: 40px; line-height: 40px;">点击上传</div>
                        </label>
                        <input id="upm" placeholder="选择文件" type="file" style="display: none;" @change="change" />
                        <div style="width: 100%;height: 40px; border-radius: 5px; line-height: 40px; padding-left: 5px;" :class="$store.state.isDark ? 'ip-dark' : 'ip'">
                            {{ fileName + ' ' + fileSize + ' ' + unit }}
                        </div>
                    </div>
                    <h4 :style="$store.state.isDark ? 'color: white;' : ''">或者输入在线网址（务必选择媒体类型）</h4>
                    <div style="display: flex; flex-direction: row;">
                        <!-- <input placeholder="选择上传类型" style="width: 30%; height: 40px; border-radius: 5px; margin-right: 10px;" :class="$store.state.isDark ? 'ip-dark' : 'ip'" /> -->

                        <select name="mediaType" id="mediaType" style="width: 30%; height: 40px; border-radius: 5px; margin-right: 10px;" :class="$store.state.isDark ? 'ip-dark' : 'ip'">
                            <option value="video">视频</option>
                            <option value="audio">音频</option>
                            <option value="image">图片</option>
                        </select>

                        <input placeholder="输入网址（URL）" style="width: 100%; height: 40px; border-radius: 5px" :class="$store.state.isDark ? 'ip-dark' : 'ip'" />
                    </div>
                </div>
                <div style="display: flex; flex-direction: row; margin-top: 20px; justify-content: flex-end;">
                    <div class="button fonts" style="background-color: #42b883;" @click="submit">上传并生成文档标记</div>
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
    name: "UploadMedia",
    components: {
        WebCard,
        Separate,
    },
    data() {
        return {
            fileName: '',
            fileSize: '',
            unit: '',
        };
    },
    props: {
        showModal: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        close() {
            this.$store.commit('uploadMyMedia');
        },
        change(event) {
            let file = event.target.files[0];
            // 显示文件名
            if (file.name.length > 25) {
                this.$data.fileName = file.name.substring(0, 15) + ' ... ' + file.name.substring(file.name.length - 15);
            } else this.$data.fileName = file.name;

            // 显示文件大小
            if (file.size < 1024) {
                this.$data.unit = 'Byte';
                this.$data.fileSize = file.size;
            } else if (file.size / 1024 < 1024) {
                this.$data.unit = 'KiB';
                this.$data.fileSize = (file.size / 1024).toFixed(2);
            } else if (file.size / 1024 / 1024 < 1024) {
                this.$data.unit = 'MiB';
                this.$data.fileSize = (file.size / 1024 / 1024).toFixed(2);
            } else if (file.size / 1024 / 1024 / 1024 < 1024) {
                this.$data.unit = 'GiB';
                this.$data.fileSize = (file.size / 1024 / 1024 / 1024).toFixed(2);
            }
        },
        submit() {
            let that = this;
            // insert code here.
            x0p({
                title: '确认',
                text: '确认上传？',
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

                    console.log("上传成功！");
                }
                if(data.button == 'cancel') {
                    console.log("用户取消上传操作。");
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
    width: 180px;
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
