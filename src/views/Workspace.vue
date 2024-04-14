<!--本页面的参数：(1) example, (2) file_id、title、time-->
<template>
    <div class="keep-head-tail" @click="leftMenu = false; rightMenu = false;">

        <About :show-modal="about" @closeModal="about = false;"></About>

        <SaveFile :show-modal="$store.state.saveWindow" :md="md"></SaveFile>

        <UploadMedia :show-modal="$store.state.oploadMediaWindow"></UploadMedia>

        <Tips :kind="$store.state.kind" :show-modal="$store.state.tips"></Tips>

        <!--nav-->
        <docs-nav :md="md" :index-is-in-example="$route.query.example" :content="navContent" :sub-content="navSubContent" @clearContent="md = ''"></docs-nav>

        <!--body-->
        <div class="body-wrap">

            <!--bg-->
            <div class="bg-container bg-wrap">
                <particles-bg :style="'background-color: ' + ($store.state.isDark ? '#1A1A1A' : '#f8f8f8') + ';'"
                              type="color" :bg="true" :num="10"/>
            </div>

            <!--content-->
            <div class="content-wrap">
                <!--Markdown编辑区-->
                <div v-if="$store.state.status === 'edit' || $store.state.status === 'half_edit_preview'"
                     class="content-resize content-like upper" ref="edit"
                     :class="$store.state.isDark ? 'content-like-dark' : ''">
                    <div class="middle-content" @mouseup="clickToSelectSpecificText($event.target);" style="padding: 0;"
                         @contextmenu.prevent="showLeftMenu($event);"
                         @click="clickToFocus">
                        <prism-editor v-if="$route.query.example !== 'true'" ref="area" placeholder="请在此输入内容..." :readonly="false" class="my-editor line-numbers"
                                      :class="$store.state.isDark ? 'editor-dark' : ''"
                                      v-model="md" :highlight="highlighter"
                                      :line-numbers="lineNumber"
                                      :tab-size="4"></prism-editor>
                        <prism-editor v-else ref="area" placeholder="请在此输入内容以演示示例..." :readonly="false" class="my-editor line-numbers"
                                      :class="$store.state.isDark ? 'editor-dark' : ''"
                                      v-model="mdExample" :highlight="highlighter"
                                      :line-numbers="lineNumber"
                                      :tab-size="4"></prism-editor>
                    </div>

                    <!--左区域右击菜单-->
                    <Transition name="fade">
                        <div class="lower dp-menu fonts" :class="$store.state.isDark ? 'dp-menu-dark' : ''"
                             v-show="leftMenu" id="leftMenu">
                            <div class="dp-menu-element" @click="copy">
                                <h6>复制</h6>
                            </div>
                            <div class="dp-menu-element" @click="paste">
                                <h6>粘贴</h6>
                            </div>
                            <div class="dp-menu-element" @click="importScottEditorFiles">
                                <h6>导入Scott Editor Files</h6>
                            </div>
                            <div class="dp-menu-element" @click="exportScottEditorFiles">
                                <h6>导出为Scott Editor Files</h6>
                            </div>
                            <div class="dp-menu-element" @click="lineNumber = !lineNumber;">
                                <h6>{{ lineNumber ? '隐藏' : '显示' }}行号</h6>
                            </div>
                            <div class="dp-menu-element" @click="$store.commit('changeTheme');">
                                <h6>切换为{{ $store.state.isDark ? '白昼' : '夜间' }}模式</h6>
                            </div>
                            <div class="dp-menu-element" @click="openUrl('/workspace?example=true', '_blank');">
                                <h6>显示示例</h6>
                            </div>
                            <div class="dp-menu-element" @click="about = true;">
                                <h6>关于</h6>
                            </div>
                        </div>
                    </transition>
                </div>

                <!--Markdown渲染区-->
                <div v-if="$store.state.status === 'preview' || $store.state.status === 'half_edit_preview'"
                     class="content-resize content-like upper" id="preview" ref="preview"
                     :class="$store.state.isDark ? 'content-like-dark' : ''">
                    <div v-if="$route.query.example !== 'true'" class="middle-content" @mouseup="clickToSelectSpecificText"
                         @contextmenu.prevent="showRightMenu($event);">
                        <div class="fonts" v-if="md.length === 0">
                            <h1 style="color: #8e8e8e;">Scott Editor File渲染区域</h1>
                        </div>
                        <div class="fonts" v-else>
                            <!--所有的文档内容，均inject在该标签的内部，不可inject在其他地方！-->
                            <template v-for="(item, index) in renderMenu">
                                <Component v-if="item['component'] === 'Table'"
                                           :is="$store.state.isDark ? 'TableDark' : item['component']"
                                           :conf="$store.state.isDark && item['conf']['htmlDirectRender']
                                           ? addNewKeyValue(item['conf'], item['conf']['tableSourceCode'] + '' +
                                            '<style>\n'+
                                            '/* 专门应用于html直接渲染的复杂表格 */\n'+
                                            'table {\n'+
                                            '    border-right: 0;\n'+
                                            '    border-bottom: 1px solid #ccc;\n'+
                                            '    text-align: center;\n'+
                                            '    border-spacing: 0;\n'+
                                            '    width: 100%;\n'+
                                            '}\n'+
                                            '\n'+
                                            'table th {\n'+
                                            '    border-left: 0;\n'+
                                            '    border-top: 1px solid #ccc;\n'+
                                            '    border-spacing: 0;\n'+
                                            '    padding: 0.6rem;\n'+
                                            '}\n'+
                                            '\n'+
                                            'th {\n'+
                                            '    color: #ccc;\n'+
                                            '}\n'+
                                            '\n'+
                                            'tr {\n'+
                                            '    background-color: #242424;\n'+
                                            '    transition: background-color 0.5s;\n'+
                                            '}\n'+
                                            '\n'+
                                            'tr:hover {\n'+
                                            '    background-color: #3a3a3a;\n'+
                                            '    transition: background-color 0.5s;\n'+
                                            '}\n'+
                                            '\n'+
                                            'table td {\n'+
                                            '    border-left: 0;\n'+
                                            '    border-top: 1px solid #ccc;\n'+
                                            '    border-spacing: 0;\n'+
                                            '    padding: 0.6rem;\n'+
                                            '}\n'+
                                            '</style>') : item['conf']"></Component>
                                <Component v-else :is="item['component']" :conf="item['conf']"></Component>
                            </template>
                        </div>
                    </div>

                    <div v-else class="middle-content" @mouseup="clickToSelectSpecificText"
                         @contextmenu.prevent="showRightMenu($event);">
                        <div class="fonts" v-if="mdExample.length === 0">
                            <h1 style="color: #8e8e8e;">Scott Editor File渲染示例区</h1>
                        </div>
                        <div class="fonts" v-else>
                            <!--所有的文档内容，均inject在该标签的内部，不可inject在其他地方！-->
                            <template v-for="(item, index) in renderMenuExample">
                                <Component v-if="item['component'] === 'Table'"
                                           :is="$store.state.isDark ? 'TableDark' : item['component']"
                                           :conf="$store.state.isDark && item['conf']['htmlDirectRender']
                                           ? addNewKeyValue(item['conf'], item['conf']['tableSourceCode'] + '' +
                                            '<style>\n'+
                                            '/* 专门应用于html直接渲染的复杂表格 */\n'+
                                            'table {\n'+
                                            '    border-right: 0;\n'+
                                            '    border-bottom: 1px solid #ccc;\n'+
                                            '    text-align: center;\n'+
                                            '    border-spacing: 0;\n'+
                                            '    width: 100%;\n'+
                                            '}\n'+
                                            '\n'+
                                            'table th {\n'+
                                            '    border-left: 0;\n'+
                                            '    border-top: 1px solid #ccc;\n'+
                                            '    border-spacing: 0;\n'+
                                            '    padding: 0.6rem;\n'+
                                            '}\n'+
                                            '\n'+
                                            'th {\n'+
                                            '    color: #ccc;\n'+
                                            '}\n'+
                                            '\n'+
                                            'tr {\n'+
                                            '    background-color: #242424;\n'+
                                            '    transition: background-color 0.5s;\n'+
                                            '}\n'+
                                            '\n'+
                                            'tr:hover {\n'+
                                            '    background-color: #3a3a3a;\n'+
                                            '    transition: background-color 0.5s;\n'+
                                            '}\n'+
                                            '\n'+
                                            'table td {\n'+
                                            '    border-left: 0;\n'+
                                            '    border-top: 1px solid #ccc;\n'+
                                            '    border-spacing: 0;\n'+
                                            '    padding: 0.6rem;\n'+
                                            '}\n'+
                                            '</style>') : item['conf']"></Component>
                                <Component v-else :is="item['component']" :conf="item['conf']"></Component>
                            </template>
                        </div>
                    </div>

                    <!--右区域右击菜单-->
                    <Transition name="fade">
                        <div class="lower dp-menu fonts" :class="$store.state.isDark ? 'dp-menu-dark' : ''"
                             v-show="rightMenu" id="rightMenu">
                            <div class="dp-menu-element" @click="copy">
                                <h6>复制</h6>
                            </div>
                            <div class="dp-menu-element" @click="$store.commit('changeTheme');">
                                <h6>切换为{{ $store.state.isDark ? '白昼' : '夜间' }}模式</h6>
                            </div>
                            <div class="dp-menu-element" @click="openUrl('/workspace?example=true', '_blank');">
                                <h6>显示示例</h6>
                            </div>
                            <div class="dp-menu-element" @click="about = true;">
                                <h6>关于</h6>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <!--footer-->
        <docs-footer></docs-footer>
    </div>
</template>

<script>
import DocsNav from "../components/DocsNav";
import DocsFooter from "../components/DocsFooter";

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

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';

import 'prismjs/components/prism-css';

import 'prismjs/themes/prism-tomorrow.css';

// 修复行号bug
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import Title from "../components/md_element_after_render/Title"; // import syntax highlighting styles
import DocsNavForExample from "../components/DocsNavForExample";
import Paragraph from "../components/md_element_after_render/Paragraph";
import Formula from "../components/md_element_after_render/Formula";
import Quote from "../components/md_element_after_render/Quote";
import Separate from "../components/md_element_after_render/Separate";
import Code from "../components/md_element_after_render/Code";
import WebCard from "../components/md_element_after_render/WebCard";
import WebImg from "../components/md_element_after_render/WebImg";
import Table from "../components/md_element_after_render/Table";
import InformationBlock from "../components/md_element_after_render/InformationBlock";
import Video from "../components/md_element_after_render/Video";
import Audio from "../components/md_element_after_render/Audio";

import Tips from "../components/little_tips/Tips";

import {saveAs} from 'file-saver';
import About from "../components/About";
import SaveFile from "../components/SaveFile";
import UploadMedia from "../components/UploadMedia";
import PersonalInfo from "../components/md_element_after_render/PersonalInfo";

let date = new Date();

export default {
    name: "Workspace",
    components: {
        PersonalInfo,
        About,
        SaveFile,
        UploadMedia,
        DocsFooter,
        DocsNav,
        DocsNavForExample,

        PrismEditor,

        // Markdown Element After Render
        Title,
        InformationBlock,
        Table,
        WebImg,
        WebCard,
        Code,
        Separate,
        Quote,
        Formula,
        Paragraph,
        Video,
        Audio,

        Tips,
    },
    data() {
        return {
            md: '',  // 输入的文本

            mdExample: "# Examples"+
                            "\n"+
                            "# English Title"+
                            "\n"+
                            "# 中文标题"+
                            "\n"+
                            "# 中文标题English Title"+
                            "\n"+
                            "## 中文标题English Title"+
                            "\n"+
                            "### 中文标题English Title"+
                            "\n"+
                            "#### 中文标题English Title"+
                            "\n"+
                            "##### 中文标题English Title"+
                            "\n"+
                            "###### 中文标题English Title"+
                            "\n"+
                            "段落1：Bring that over here, Scott, do you hear me? Bring that over, I'm going to do something big. First hit the box that says \"ATTENTION PLEASE do NOT try this AT HOME!!!\" and run! If you don't run away in time, you might end up in heaven!"+
                            "\n"+
                            "段落2：把那个<i>拿过来</i>，斯科特，你听到了吗？ 把它拿过来，我要做一件大事。 首先点击“注意请不要在家里尝试这个！！！”框。跑！如果你不及时逃跑，你可能会上天堂！"+
                            "\n"+
                            "段落4：请把那个拿过来，Scott，听到没有？把那个拿过来，我要搞一个<u>大事情</u>。首先在写着\"<strong style=\"color: red;\">ATTENTION PLEASE do NOT try this AT HOME!!!</strong>\"的箱子上砸一榔头，然后赶紧跑！如果你没有及时跑掉，你可能会进入heaven！"+
                            "\n"+
                            "> 这是一段引用（This is a quote.）。\n"+
                            "> 这是父引用（This is a quote.）。 \n"+
                            ">> 这是子引用（This is a quote.）。\n"+
                            ">>> 这是孙引用（This is a quote.）。\n"+
                            "\n"+
                            "> 请把那个拿过来，Scott，听到没有？把那个拿过来，我要搞一个<u>大事情</u>。首先在写着\"<strong style=\"color: red;\">ATTENTION PLEASE do NOT try this AT HOME!!!</strong>\"的箱子上砸一榔头，然后赶紧跑！如果你没有及时跑掉，你可能会进入heaven！\n"+
                            ">> <h1>这是子引用（This is a quote.）。</h1>\n"+
                            ">>> <ol><li style=\"line-height: 1.7;\">First item</li><li style=\"line-height: 1.7;\">Second item</li><li style=\"line-height: 1.7;\">Third item</li><ol><li style=\"line-height: 1.7;\">First item</li><li style=\"line-height: 1.7;\">Second item</li><li style=\"line-height: 1.7;\">Third item</li><li style=\"line-height: 1.7;\">Fourth item</li></ol><li style=\"line-height: 1.7;\">Fourth item</li></ol>\n"+
                            "\n"+
                            "[百度一下](https://www.baidu.com)\n"+
                            "\n"+
                            "![英伟达](https://www.nvidia.cn/content/dam/en-zz/Solutions/geforce/news/computex-2022-rtx-dlss-game-updates/deep-rock-galactic-geforce-rtx-3840x2160-nvidia-dlss-desktop-gpu-performance.png)\n"+
                            "![video:千岛湖](http://ali-v.cztv.com/cztv/vod/2023/06/05/761bd93fba7c4ab09337102b76630f53/h264_1500k_mp4.mp4)\n" +
                            "\n"+
                            "![audio:恋爱告急](https://er-sycdn.kuwo.cn/fcc12ccea352556ce4bda3fa35707f07/6608dfe6/resource/30106/trackmedia/M500003y3X63343mZa.mp3?from=vip)\n" + 
                            "<ol><li style=\"line-height: 1.7;\">First item</li><li style=\"line-height: 1.7;\">Second item</li><li style=\"line-height: 1.7;\">Third item</li><ol><li style=\"line-height: 1.7;\">First item</li><li style=\"line-height: 1.7;\">Second item</li><li style=\"line-height: 1.7;\">Third item</li><li style=\"line-height: 1.7;\">Fourth item</li></ol><li style=\"line-height: 1.7;\">Fourth item</li></ol>"+
                            "\n"+
                            "<ul><li style=\"line-height: 1.7;\">First item</li><li style=\"line-height: 1.7;\">Second item</li><li style=\"line-height: 1.7;\">Third item</li><ul><li style=\"line-height: 1.7;\">First item</li><li style=\"line-height: 1.7;\">Second item</li><li style=\"line-height: 1.7;\">Third item</li><li style=\"line-height: 1.7;\">Fourth item</li></ul><li style=\"line-height: 1.7;\">Fourth item</li></ul>"+
                            "\n"+
                            "<table><tr><th rowspan=2>序号</th><th rowspan=2>监测位置</th><th rowspan=2>供电通路</th><th rowspan=2>供电电压</th><th rowspan=2>负载电流</th><th rowspan=2>雷击次数</th><th rowspan=2>最近一次雷击时间</th><th colspan=2>后备保护空开状态</th><th rowspan=2>SPD损害数量</th><th colspan=2>输出空开状态</th></tr><tr><th>B级</th><th>C级</th><th>1路</th><th>2路</th></tr><tr> <th rowspan=4>1</th></tr><tr><td>1</td><td>78</td><td>96</td><td>67</td><td>98</td><td>88</td><td>75</td><td>94</td><td>69</td><td>23 </td><td>33 </td></tr><tr><th colspan=2>提示建议</th><th colspan=2>智能防雷箱状态</th><th colspan=2>防雷箱型号</th><th colspan=3>防雷箱序列号</th><th colspan=2>防雷箱版本</th></tr><tr><td colspan=2>建议整机按规程检测</td><td colspan=2>在线</td><td colspan=2>2018041201-035PF</td><td colspan=3>2018041201-256</td><td colspan=2>V1.0.0</td></tr></table>" +
                            "\n" +
                            "[java]{public class HelloWorld {\\n\\tpublic static void main(String[] args) {\\n\\t\\tSystem.out.println(\"Hello World\");\\n\\t}\\n}}"+
                            "\n" +
                            "[javascript]{<script>\\n\\talert(\"Fuck you!\");\\n</scrip" + "t>}"+
                            "\n"+
                            "$$ {2\\rm{C_2H_5OH}}\\xlongequal[140^\\circ {\\rm C}]{\\text{浓硫酸}}{\\rm C_2H_5OC_2H_5+H_2O} $$\n"+
                            "$$ \\overbrace{1+2+\\cdots+n}^{n个} \\qquad \\underbrace{a+b+\\cdots+z}_{26} $$\n"+
                            "$$ \\lim_{x \\to \\infty} x^2_{22} - \\int_{1}^{5}x\\mathrm{d}x + \\sum_{n=1}^{20} n^{2} = \\prod_{j=1}^{3} y_{j}  + \\lim_{x \\to -2} \\frac{x-2}{x} $$\n"+
                            "$$ D(x) = \\begin{cases} \\lim\\limits_{x \\to 0} \\frac{a^x}{b+c}, & x<3 \\\\ \\pi, & x=3 \\\\ \\int_a^{3b}x_{ij}+e^2 \\mathrm{d}x,& x>3 \\\\ \\end{cases} $$\n",

            leftMenu: false,
            rightMenu: false,

            lineNumber: true,

            selectText: '',

            insertPosition: 0,

            about: false,

            renderMenu: [],
            renderMenuExample: [],

            navContent: 'Scott Editor Engine',
            navSubContent: 'Useful, lightweight and powerful',
        };
    },
    methods: {
        highlighter(md) {
            return highlight(md, languages['markdown'], 'markdown');
        },

        addNewKeyValue(object, value) {
            let origin = {};
            origin['htmlDirectRender'] = true;
            origin['data'] = [];
            origin['header'] = false;
            origin['align'] = [];
            origin['tableSourceCode'] = value;
            return origin;
        },

        showLeftMenu(event) {
            let leftObj = document.getElementById('leftMenu');
            event.preventDefault(); //关闭浏览器右键默认事件
            if (this.$store.state.status === 'half_edit_preview') {
                leftObj.style.left = event.clientX + 200 < document.body.clientWidth / 2 - 20 ? event.clientX + 'px' : document.body.clientWidth / 2 - 40 - 200 + 'px';
                leftObj.style.top = event.clientY + 180 < document.body.clientHeight - 80 - 180 ? event.clientY - 100 + 'px' : document.body.clientHeight - 180 - 100 - 120 + 'px';
            } else {
                leftObj.style.left = event.clientX + 200 < document.body.clientWidth - 20 ? event.clientX + 'px' : document.body.clientWidth - 40 - 200 + 'px';
                leftObj.style.top = event.clientY + 180 < document.body.clientHeight - 80 - 180 ? event.clientY - 100 + 'px' : document.body.clientHeight - 180 - 100 - 120 + 'px';
            }
            this.$data.leftMenu = true;
            this.$data.rightMenu = false;
        },

        showRightMenu(event) {
            let rightObj = document.getElementById('rightMenu');
            event.preventDefault() //关闭浏览器右键默认事件
            if (this.$store.state.status === 'half_edit_preview') {
                rightObj.style.left = event.clientX + 200 < document.body.clientWidth - 20 ? event.clientX - document.body.clientWidth / 2 + 'px' : document.body.clientWidth / 2 - 40 - 200 + 'px';
                rightObj.style.top = event.clientY + 180 < document.body.clientHeight - 80 - 180 ? event.clientY - 80 + 'px' : document.body.clientHeight - 180 - 100 - 100 + 'px';
            } else {
                rightObj.style.left = event.clientX + 200 < document.body.clientWidth - 20 ? event.clientX + 'px' : document.body.clientWidth - 40 - 200 + 'px';
                rightObj.style.top = event.clientY + 180 < document.body.clientHeight - 80 - 180 ? event.clientY - 100 + 'px' : document.body.clientHeight - 180 - 100 - 100 + 'px';
            }
            this.$data.rightMenu = true;
            this.$data.leftMenu = false;
        },

        clickToSelectSpecificText() {

            // 获得文本选区中的字符串
            let selectionStr = window.getSelection();
            if (selectionStr.toString() !== '') {
                this.$data.selectText = selectionStr.toString();
                console.log('选中的内容：' + selectionStr.toString());
            }

            // 获得textarea中光标的位置
            let textarea = document.querySelector('.prism-editor__textarea');
            console.log('位置：' + textarea.selectionStart);
            this.$data.insertPosition = textarea.selectionStart;
        },

        clickToFocus() {
            document.querySelector('.prism-editor__textarea').focus();
        },

        copy() {
            navigator.clipboard.writeText(this.$data.selectText).then(() => {
                console.log('内容复制成功！');
            });
        },

        async paste() {
            try {
                const clipboardItems = await navigator.clipboard.read();

                for (const clipboardItem of clipboardItems) {
                    for (const type of clipboardItem.types) {

                        if (type === 'text/plain') {
                            const blob = await clipboardItem.getType(type);
                            blob.text().then(data => {
                                this.$data.md = this.$data.md.slice(0, this.$data.insertPosition) + data + this.$data.md.slice(this.$data.insertPosition);
                                return false;
                            }).catch(err => {
                                return false;
                            });
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        importScottEditorFiles() {
            let input = document.createElement('input');
            input.value = '选择文件';
            input.type = 'file';
            input.onchange = event => {
                let file = event.target.files[0];
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    this.$data.md = fileReader.result;
                };
                fileReader.readAsText(file, 'UTF-8');
            }
            input.click();
        },

        exportScottEditorFiles() {
            let blob = new Blob([this.$data.md], {type: "text/plain;charset=utf-8"});
            saveAs(blob, 'export-' + date.getFullYear() + '年'
                + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '月'
                + date.getDate() + '日-'
                + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + '时'
                + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + '分'
                + (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()) + '秒.ssef');
        },

        analyseOriginScottEditorFileLanguage(scottEditorFileRaw) {

            // 先初始化渲染部分
            this.$data.renderMenu = [];

            let contentList = scottEditorFileRaw.split('\n');
            contentList.forEach((item, index) => {  // 按顺序逐行读取源文件
                let titleExp = /#+ \S+/; // Markdown标题正则表达式
                let separateExp = '';  // Markdown换行正则表达式
                let webCardExp = /^([^!]*)(\[)(.*)(\])(\()(.*)(\))(.*)/;  // Markdown网络链接正则表达式
                let webImgExp = /(.*)(!\[)(.*)(\])(\()(.*)(\))(.*)/;  // Markdown网络图片正则表达式
                let quoteExp = /^(>+)(.*)/;  // Markdown引用正则表达式
                let codeExp = /(\[)(\S+)(\])(\{)(.+)(\})/;  // 代码块正则表达式
                if (titleExp.test(item)) {  // 符合Markdown标题格式
                    let hashNum = item.match(/#/g).length;
                    this.$data.renderMenu.push({
                        'component': 'Title',
                        'conf': {
                            'content': item.slice(hashNum),
                            'border': true,
                            'size': hashNum,
                        },
                    });
                } else if (separateExp === item) {  // 符合Markdown换行格式
                    this.$data.renderMenu.push({
                        'component': 'Separate',
                        'conf': {
                            'isLine': false,
                        },
                    });
                } else if (webCardExp.test(item)) {  // 符合Markdown网络链接格式
                    let split = item.match(webCardExp);
                    let forStr = split[1];
                    let desc = split[3];
                    let url = split[6];
                    let lastStr = split[8];
                    if (forStr !== '') this.$data.renderMenu.push({
                        'component': 'Paragraph',
                            'conf': {
                                'content': forStr,
                            },
                    });
                    this.$data.renderMenu.push({
                        'component': 'WebCard',
                        'conf': {
                            'url': url,
                            'description': desc,
                            'isImg': false,
                            'imgUrl': '',
                            'ico': '<svg style="width: 80px; height: 80px;" t="1661050069397" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"\n' +
                                '                 p-id="1475" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">\n' +
                                '                <path\n' +
                                '                    d="M512.001274 15.045039a497.880869 497.880869 0 0 1 496.99699 497.086142c0 137.285182-55.886849 261.573274-145.67566 351.652466-89.81301 90.098296-214.335444 145.167493-351.32133 145.167494-137.262257 0-261.529972-55.069197-351.31751-145.173862-89.788811-90.079192-145.67566-214.367284-145.67566-351.646098a497.880869 497.880869 0 0 1 496.99317-497.086142zM489.215293 932.144136V771.518957a405.118201 405.118201 0 0 0-129.123952 26.595319 137.138718 137.138718 0 0 0-17.101903 6.511917c3.53042 7.062113 6.785742 14.098754 10.570881 20.887043 25.514032 45.602527 55.33538 80.88762 88.987717 101.223193a372.744559 372.744559 0 0 0 46.671078 5.40898z m320.120674-717.103117a128.736778 128.736778 0 0 0-10.591259-10.061441 441.222218 441.222218 0 0 1-58.315604 36.934404c27.141693 70.795612 43.939205 156.01602 46.672351 247.447775h144.843999a419.629601 419.629601 0 0 0-122.609487-274.320738z m-46.672352-40.41388a415.300634 415.300634 0 0 0-85.71329-49.415687 434.384259 434.384259 0 0 1 33.623044 51.562976c3.805517 7.062113 7.861934 15.201692 11.942549 23.339997 13.571483-8.138305 27.117495-16.556802 40.137509-25.493654z m-181.233302-77.3572c-15.172399-2.404557-30.921738-4.056417-46.64688-5.133883V253.306336a429.022402 429.022402 0 0 0 129.127773-26.588951c5.985921-2.177856 11.392353-4.356986 17.076431-6.787015-2.954752-7.337211-7.036641-14.373851-10.541588-20.887043-24.989309-46.15527-55.610477-80.888893-89.013189-101.774662z m-92.217567-5.133883c-15.723868 1.077466-31.473207 2.729325-46.671078 5.133883-33.652337 20.887043-63.473685 55.619393-88.987717 101.774662-3.781319 6.510644-7.036641 13.547285-10.816686 20.887042 5.684078 2.430029 11.392353 4.609159 17.351529 6.787016a428.859382 428.859382 0 0 0 129.123952 26.595318V92.130962z m-142.141419 33.075396a414.845959 414.845959 0 0 0-85.732395 49.415687c13.020014 8.940673 26.591498 17.355349 40.412607 25.493654a233.26369 233.26369 0 0 1 11.667451-23.339997c10.041064-19.007209 21.708515-35.811089 33.652337-51.562976z m-122.088585 79.763031c-3.255322 3.004423-7.060839 6.536116-10.316162 10.061441a419.628328 419.628328 0 0 0-122.614581 274.32456h144.874565c2.703853-91.430482 19.529385-176.648342 46.370508-247.447775a478.47757 478.47757 0 0 1-58.31433-36.934405zM92.051999 535.189712a420.779662 420.779662 0 0 0 122.614581 274.319464l10.316162 10.293237a425.318773 425.318773 0 0 1 58.318151-37.413278c-26.841123-71.096182-43.666655-155.742195-46.370508-247.19815H92.051999z m169.286933 314.488813a415.88267 415.88267 0 0 0 85.732395 49.383847 360.53328 360.53328 0 0 1-33.652337-51.562976c-4.075521-7.313012-8.137031-15.176219-11.667451-22.788528a416.635367 416.635367 0 0 0-40.412607 24.962563z m273.441954 82.465611a371.780443 371.780443 0 0 0 46.646879-5.40898c33.402711-20.335574 64.02388-55.620666 89.013189-101.223194 3.504948-6.787015 7.586836-13.823656 10.541589-20.887042a133.885943 133.885943 0 0 0-17.076431-6.511918 405.259571 405.259571 0 0 0-129.120132-26.594045v160.625179z m142.169439-33.081764a416.339892 416.339892 0 0 0 85.71329-49.383847 390.678122 390.678122 0 0 0-40.137509-24.962563c-4.075521 7.612308-8.137031 15.475516-11.942548 22.788528-10.592533 18.706639-21.684316 36.362558-33.623045 51.562976z m121.789288-79.259959l10.591259-10.293237a420.780936 420.780936 0 0 0 122.614582-274.319464H787.101455c-2.729325 91.455954-19.530658 176.101968-46.672351 247.198149a395.620965 395.620965 0 0 1 58.315604 37.414552z m-99.82478-558.105599a203.624467 203.624467 0 0 1-19.004662 7.33721 460.617875 460.617875 0 0 1-145.124191 29.826442v190.500018h206.195866c-2.452954-84.393841-17.375727-162.553409-42.064466-227.66367z m-209.69954 37.163652a456.062207 456.062207 0 0 1-144.873292-29.826442 187.929892 187.929892 0 0 1-19.530658-7.33721c-24.412368 65.110261-39.608965 143.269829-42.064466 227.66367H489.215293V298.860466z m0 426.554165v-190.224919H282.746877c2.454228 84.144215 17.652098 161.977742 42.064466 227.388572 6.510644-2.428756 13.020014-5.158081 19.530658-7.33721 45.019218-17.354076 93.864332-27.396413 144.873292-29.826443z m45.570687 0a465.365857 465.365857 0 0 1 144.874566 29.826443c6.50937 2.17913 12.743643 4.908455 19.254287 7.33721 24.688739-65.410831 39.608965-143.244357 42.064466-227.388572H534.78598v190.224919z"\n' +
                                '                    p-id="1476"></path>\n' +
                                '            </svg>'
                        },
                    });
                    if (lastStr !== '') this.$data.renderMenu.push({
                        'component': 'Paragraph',
                            'conf': {
                                'content': lastStr,
                            },
                    });

                } else if (webImgExp.test(item)) {  // 符合Markdown网络图片、视频和音频格式
                    let split = item.match(webImgExp);
                    let desc = split[3];
                    let url = split[6];
                    
                    if (desc.substring(0, 6) === 'video:') {
                        desc = desc.substring(6);
                        this.$data.renderMenu.push({
                            'component': 'Video',
                            'conf': {
                                'videoUrl': url,
                                'description': desc,
                            },
                        });
                    } else if (desc.substring(0, 6) === 'audio:') {
                        desc = desc.substring(6);
                        this.$data.renderMenu.push({
                            'component': 'Audio',
                            'conf': {
                                'audioUrl': url,
                                'description': desc,
                            },
                        });
                    } else {
                        this.$data.renderMenu.push({
                            'component': 'WebImg',
                            'conf': {
                                'imgUrl': url,
                                'description': desc,
                            },
                        });
                    }
                } else if (quoteExp.test(item)) {  // 符合Markdown引用格式
                    let split = item.match(quoteExp);
                    let content = split[2].substring(1);
                    let layer = split[1].length;
                    this.$data.renderMenu.push({
                        'component': 'Quote',
                        'conf': {
                            'content': content,
                            'layer': layer,
                        },
                    });
                } else if (codeExp.test(item)) {  // 符合代码引用格式
                    let split = item.match(codeExp);
                    let kind = split[2];
                    let content = split[5].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                    this.$data.renderMenu.push({
                        'component': 'Code',
                        'conf': {
                            'kind': kind,
                            'content': content,
                        },
                    });
                } else if (item.substring(0, 2) === '$$') {


                    // console.log(item);

                    this.$data.renderMenu.push({
                        'component': 'Formula',
                        'conf': {
                            'content': item,
                        },
                    });
                } else {  // 符合Markdown段落格式
                    this.$data.renderMenu.push({
                        'component': 'Paragraph',
                            'conf': {
                                'content': item,
                            },
                        });
                }
            });
        },

        renderExample(scottEditorFileRaw) {

            // 先初始化渲染部分
            this.$data.renderMenuExample = [];

            let contentList = scottEditorFileRaw.split('\n');
            contentList.forEach((item, index) => {  // 按顺序逐行读取源文件
                let titleExp = /#+ \S+/; // Markdown标题正则表达式
                let separateExp = '';  // Markdown换行正则表达式
                let webCardExp = /^([^!]*)(\[)(.*)(\])(\()(.*)(\))(.*)/;  // Markdown网络链接正则表达式
                let webImgExp = /(.*)(!\[)(.*)(\])(\()(.*)(\))(.*)/;  // Markdown网络图片正则表达式
                let quoteExp = /^(>+)(.*)/;  // Markdown引用正则表达式
                let codeExp = /(\[)(\S+)(\])(\{)(.+)(\})/;  // 代码块正则表达式
                if (titleExp.test(item)) {  // 符合Markdown标题格式
                    let hashNum = item.match(/#/g).length;
                    this.$data.renderMenuExample.push({
                        'component': 'Title',
                        'conf': {
                            'content': item.slice(hashNum),
                            'border': true,
                            'size': hashNum,
                        },
                    });
                } else if (separateExp === item) {  // 符合Markdown换行格式
                    this.$data.renderMenuExample.push({
                        'component': 'Separate',
                        'conf': {
                            'isLine': false,
                        },
                    });
                } else if (webCardExp.test(item)) {  // 符合Markdown网络链接格式
                    let split = item.match(webCardExp);
                    let forStr = split[1];
                    let desc = split[3];
                    let url = split[6];
                    let lastStr = split[8];
                    if (forStr !== '') this.$data.renderMenuExample.push({
                        'component': 'Paragraph',
                            'conf': {
                                'content': forStr,
                            },
                    });
                    this.$data.renderMenuExample.push({
                        'component': 'WebCard',
                        'conf': {
                            'url': url,
                            'description': desc,
                            'isImg': false,
                            'imgUrl': '',
                            'ico': '<svg style="width: 80px; height: 80px;" t="1661050069397" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"\n' +
                                '                 p-id="1475" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">\n' +
                                '                <path\n' +
                                '                    d="M512.001274 15.045039a497.880869 497.880869 0 0 1 496.99699 497.086142c0 137.285182-55.886849 261.573274-145.67566 351.652466-89.81301 90.098296-214.335444 145.167493-351.32133 145.167494-137.262257 0-261.529972-55.069197-351.31751-145.173862-89.788811-90.079192-145.67566-214.367284-145.67566-351.646098a497.880869 497.880869 0 0 1 496.99317-497.086142zM489.215293 932.144136V771.518957a405.118201 405.118201 0 0 0-129.123952 26.595319 137.138718 137.138718 0 0 0-17.101903 6.511917c3.53042 7.062113 6.785742 14.098754 10.570881 20.887043 25.514032 45.602527 55.33538 80.88762 88.987717 101.223193a372.744559 372.744559 0 0 0 46.671078 5.40898z m320.120674-717.103117a128.736778 128.736778 0 0 0-10.591259-10.061441 441.222218 441.222218 0 0 1-58.315604 36.934404c27.141693 70.795612 43.939205 156.01602 46.672351 247.447775h144.843999a419.629601 419.629601 0 0 0-122.609487-274.320738z m-46.672352-40.41388a415.300634 415.300634 0 0 0-85.71329-49.415687 434.384259 434.384259 0 0 1 33.623044 51.562976c3.805517 7.062113 7.861934 15.201692 11.942549 23.339997 13.571483-8.138305 27.117495-16.556802 40.137509-25.493654z m-181.233302-77.3572c-15.172399-2.404557-30.921738-4.056417-46.64688-5.133883V253.306336a429.022402 429.022402 0 0 0 129.127773-26.588951c5.985921-2.177856 11.392353-4.356986 17.076431-6.787015-2.954752-7.337211-7.036641-14.373851-10.541588-20.887043-24.989309-46.15527-55.610477-80.888893-89.013189-101.774662z m-92.217567-5.133883c-15.723868 1.077466-31.473207 2.729325-46.671078 5.133883-33.652337 20.887043-63.473685 55.619393-88.987717 101.774662-3.781319 6.510644-7.036641 13.547285-10.816686 20.887042 5.684078 2.430029 11.392353 4.609159 17.351529 6.787016a428.859382 428.859382 0 0 0 129.123952 26.595318V92.130962z m-142.141419 33.075396a414.845959 414.845959 0 0 0-85.732395 49.415687c13.020014 8.940673 26.591498 17.355349 40.412607 25.493654a233.26369 233.26369 0 0 1 11.667451-23.339997c10.041064-19.007209 21.708515-35.811089 33.652337-51.562976z m-122.088585 79.763031c-3.255322 3.004423-7.060839 6.536116-10.316162 10.061441a419.628328 419.628328 0 0 0-122.614581 274.32456h144.874565c2.703853-91.430482 19.529385-176.648342 46.370508-247.447775a478.47757 478.47757 0 0 1-58.31433-36.934405zM92.051999 535.189712a420.779662 420.779662 0 0 0 122.614581 274.319464l10.316162 10.293237a425.318773 425.318773 0 0 1 58.318151-37.413278c-26.841123-71.096182-43.666655-155.742195-46.370508-247.19815H92.051999z m169.286933 314.488813a415.88267 415.88267 0 0 0 85.732395 49.383847 360.53328 360.53328 0 0 1-33.652337-51.562976c-4.075521-7.313012-8.137031-15.176219-11.667451-22.788528a416.635367 416.635367 0 0 0-40.412607 24.962563z m273.441954 82.465611a371.780443 371.780443 0 0 0 46.646879-5.40898c33.402711-20.335574 64.02388-55.620666 89.013189-101.223194 3.504948-6.787015 7.586836-13.823656 10.541589-20.887042a133.885943 133.885943 0 0 0-17.076431-6.511918 405.259571 405.259571 0 0 0-129.120132-26.594045v160.625179z m142.169439-33.081764a416.339892 416.339892 0 0 0 85.71329-49.383847 390.678122 390.678122 0 0 0-40.137509-24.962563c-4.075521 7.612308-8.137031 15.475516-11.942548 22.788528-10.592533 18.706639-21.684316 36.362558-33.623045 51.562976z m121.789288-79.259959l10.591259-10.293237a420.780936 420.780936 0 0 0 122.614582-274.319464H787.101455c-2.729325 91.455954-19.530658 176.101968-46.672351 247.198149a395.620965 395.620965 0 0 1 58.315604 37.414552z m-99.82478-558.105599a203.624467 203.624467 0 0 1-19.004662 7.33721 460.617875 460.617875 0 0 1-145.124191 29.826442v190.500018h206.195866c-2.452954-84.393841-17.375727-162.553409-42.064466-227.66367z m-209.69954 37.163652a456.062207 456.062207 0 0 1-144.873292-29.826442 187.929892 187.929892 0 0 1-19.530658-7.33721c-24.412368 65.110261-39.608965 143.269829-42.064466 227.66367H489.215293V298.860466z m0 426.554165v-190.224919H282.746877c2.454228 84.144215 17.652098 161.977742 42.064466 227.388572 6.510644-2.428756 13.020014-5.158081 19.530658-7.33721 45.019218-17.354076 93.864332-27.396413 144.873292-29.826443z m45.570687 0a465.365857 465.365857 0 0 1 144.874566 29.826443c6.50937 2.17913 12.743643 4.908455 19.254287 7.33721 24.688739-65.410831 39.608965-143.244357 42.064466-227.388572H534.78598v190.224919z"\n' +
                                '                    p-id="1476"></path>\n' +
                                '            </svg>'
                        },
                    });
                    if (lastStr !== '') this.$data.renderMenuExample.push({
                        'component': 'Paragraph',
                            'conf': {
                                'content': lastStr,
                            },
                    });

                } else if (webImgExp.test(item)) {  // 符合Markdown网络图片、视频和音频格式
                    let split = item.match(webImgExp);
                    let desc = split[3];
                    let url = split[6];
                    
                    if (desc.substring(0, 6) === 'video:') {
                        desc = desc.substring(6);
                        this.$data.renderMenuExample.push({
                            'component': 'Video',
                            'conf': {
                                'videoUrl': url,
                                'description': desc,
                            },
                        });
                    } else if (desc.substring(0, 6) === 'audio:') {
                        desc = desc.substring(6);
                        this.$data.renderMenuExample.push({
                            'component': 'Audio',
                            'conf': {
                                'audioUrl': url,
                                'description': desc,
                            },
                        });
                    } else {
                        this.$data.renderMenuExample.push({
                            'component': 'WebImg',
                            'conf': {
                                'imgUrl': url,
                                'description': desc,
                            },
                        });
                    }
                } else if (quoteExp.test(item)) {  // 符合Markdown引用格式
                    let split = item.match(quoteExp);
                    let content = split[2].substring(1);
                    let layer = split[1].length;
                    this.$data.renderMenuExample.push({
                        'component': 'Quote',
                        'conf': {
                            'content': content,
                            'layer': layer,
                        },
                    });
                } else if (codeExp.test(item)) {  // 符合代码引用格式
                    let split = item.match(codeExp);
                    let kind = split[2];
                    let content = split[5].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                    this.$data.renderMenuExample.push({
                        'component': 'Code',
                        'conf': {
                            'kind': kind,
                            'content': content,
                        },
                    });
                } else if (item.substring(0, 2) === '$$') {


                    // console.log(item);

                    this.$data.renderMenuExample.push({
                        'component': 'Formula',
                        'conf': {
                            'content': item,
                        },
                    });
                } else {  // 符合Markdown段落格式
                    this.$data.renderMenuExample.push({
                        'component': 'Paragraph',
                        'conf': {
                            'content': item,
                        },
                    });
                }
            });
        },

        openUrl(url, target) {
            window.open(url, target);
        },
    },
    created() {
        // 是否显示示例
        if (this.$route.query.example === "true") {
            document.title = "示例参考";
            this.renderExample(this.$data.mdExample);
        } else if (localStorage.getItem("scottEditorEngineContentCache") && localStorage.getItem("cacheEditTime") 
            && !this.$route.query.file_id && !this.$route.query.title && !this.$route.query.time) {
            // 读取缓存
            document.title = "未命名";
            this.$data.md = localStorage.getItem("scottEditorEngineContentCache");
            this.$data.navSubContent = '缓存版本，保存于' + localStorage.getItem('cacheEditTime');
            this.analyseOriginScottEditorFileLanguage(this.$data.md);
        } else if (this.$route.query.file_id && this.$route.query.title && this.$route.query.time) {
            // 读取已保存于服务器的数据
            // document.title = 
            this.analyseOriginScottEditorFileLanguage(this.$data.md);
        }
    },
    watch: {
        md(newValue, oldValue) {
            if (this.$route.query.example !== "true") {
                let editDate = new Date();
                this.analyseOriginScottEditorFileLanguage(newValue);
                // 修改nav title
                if (newValue !== '' && !this.$route.query.file_id && !this.$route.query.title && !this.$route.query.time) {

                    this.$data.navContent = '未命名';
                    document.title = "未命名";
                    // 缓存
                    if (newValue !== localStorage.getItem('scottEditorEngineContentCache')) 
                        localStorage.setItem('cacheEditTime', editDate.getFullYear() + '年'
                            + (editDate.getMonth() >= 9 ? editDate.getMonth() + 1 : '0' + (editDate.getMonth() + 1)) + '月'
                            + editDate.getDate() + '日，'
                            + (editDate.getHours() >= 10 ? editDate.getHours() : '0' + editDate.getHours()) + ':'
                            + (editDate.getMinutes() >= 10 ? editDate.getMinutes() : '0' + editDate.getMinutes()) + ':'
                            + (editDate.getSeconds() >= 10 ? editDate.getSeconds() : '0' + editDate.getSeconds()));
                    localStorage.setItem('scottEditorEngineContentCache', this.$data.md);
                    this.$data.navSubContent = '缓存版本，最后保存于' + localStorage.getItem('cacheEditTime');

                } else if (newValue === '' && !this.$route.query.file_id && !this.$route.query.title && !this.$route.query.time) {
                    document.title = "Scott Editor Engine";
                    this.$data.navContent = 'Scott Editor Engine';
                    this.$data.navSubContent = 'Useful, lightweight and powerful';
                }
            }
        },

        mdExample(newValue, oldValue) {
            this.renderExample(newValue);
        },

        navContent(newValue, oldValue) {},

        navSubContent(newValue, oldValue) {},
    },
}
</script>

<style scoped>
.keep-head-tail {
    display: flex;
    min-height: 100%;
    flex-flow: column;
}

.bg-container {
    top: 0;
    margin-bottom: 0;
    display: inline-block;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: middle;
    overflow: hidden;
    object-fit: cover;
}

.body-wrap {
    position: relative;
}

.bg-wrap {
    position: fixed;
    z-index: -1;
    height: 100%;
}

.content-wrap {
    display: flex;
    justify-content: center;
}

.content-resize {
    margin: 10px;
    width: 100%;
    padding: 20px;
}

.content-like {
    /*margin-top: 20px;*/
    /*margin-bottom: 20px;*/
    background-color: white;
    border-radius: 8px;
    opacity: 0.9;  /* 不要写百分数，否则webpack打包时会强制变成1% */
    display: flex;
    flex-direction: row;
    height: calc(100vh - 56px - 55px - 20px - 40px);
}

.content-like-dark {
    background-color: #242424 !important;
}

.middle-content {
    width: 100%;
    padding: 40px;
    overflow: scroll;

    word-wrap: break-word !important;
    word-break: break-all !important;
}

.middle-content::-webkit-scrollbar {
    display: none;
}

.dp-menu {
    box-shadow: 0 12px 32px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .08);
    border: 1px solid transparent;
    border-radius: 8px;
    width: 200px;
    background-color: white;
}

.dp-menu-dark {
    box-shadow: 0 12px 32px rgba(255, 255, 255, .1), 0 2px 6px rgba(255, 255, 255, .08) !important;
    background-color: #242424 !important;
    color: white;
}

.dp-menu-element {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    transition: color 0.2s;
    cursor: pointer;
}

.dp-menu-element:hover {
    color: #42b983;
}

.upper {
    position: relative;
}

.lower {
    position: absolute;
    z-index: 1000;
    right: 0;
    top: 45px;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
{
    transform: translateX(10px);
    opacity: 0;
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

.dark-mode {

}

@font-face {
    /* 中文字体全局定义为“阿里巴巴普惠体” */
    font-family: AlibabaPuHuiTi;
    src: url("../assets/fonts/AlibabaPuHuiTi/Alibaba-PuHuiTi-Regular.ttf");
}

.fonts {
    font-family: Lato, AlibabaPuHuiTi;
}

/* required class */
.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #ffffff;
    color: #5e5e5e;
    /*color: #80118c;*/
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    border-radius: 4px;

    word-wrap: break-word !important;
    word-break: break-all !important;
}

.editor-dark {
    background: #242424;
    color: #ccc;
}

.prism-editor-wrapper {
    height: auto !important;
    width: auto !important;
}
</style>
