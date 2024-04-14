<template>
    <div>
        <div v-if="!conf.htmlDirectRender" class="fonts" style="display: flex; justify-content: center;">
            <table>
                <tr v-if="conf.header">
                    <th v-for="(item, index) in conf.data[0]" :style="'text-align: ' + conf.align[index] + ';'"
                    v-dompurify-html="item"></th>
                </tr>
                <tr v-for="(item, index) in (conf.header ? conf.data.slice(1) : conf.data)">
                    <td v-for="(i, idx) in item" :style="'text-align: ' + conf.align[idx] + ';'" v-dompurify-html="i"></td>
                </tr>
            </table>
        </div>
        <div v-else v-dompurify-html="conf.tableSourceCode" class="fonts" style="display: flex; justify-content: center;"></div>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        conf: {
            type: Object,
            default: () => {
                // header: {
                //     type: Boolean,
                //     default: true,
                // },
                // htmlDirectRender: {
                //     type: Boolean,
                //     default: false,
                // },
                // data: {
                //     type: Array,
                //     default: () => [],
                // },
                // align: {
                //     type: Array,
                //     default: () => [],
                // },
                // tableSourceCode: {
                //     type: String,
                //     default: '',
                // },
                return {
                    'header': true,
                    'htmlDirectRender': false,
                    'data': [],
                    'align': [],
                    'tableSourceCode': '',
                };
            },
        },
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
    color: #676767;
}

table {
    border-right: 0;
    border-bottom: 1px solid #8e8e8e;
    text-align: center;
    border-spacing: 0;
    width: 100%;
}

table th {
    border-left: 0;
    border-top: 1px solid #8e8e8e;
    border-spacing: 0;
    padding: 0.6rem;
}

th {
    color: black;
}

table td {
    border-left: 0;
    border-top: 1px solid #8e8e8e;
    border-spacing: 0;
    padding: 0.6rem;
}
</style>

<style>
/* 专门应用于html直接渲染的复杂表格 */
table {
    border-right: 0;
    border-bottom: 1px solid #8e8e8e;
    text-align: center;
    border-spacing: 0;
    width: 100%;
}

table th {
    border-left: 0;
    border-top: 1px solid #8e8e8e;
    border-spacing: 0;
    padding: 0.6rem;
}

tr:hover {
    background-color: #1d1d1d;
    transition: background-color 0.5s;
}

table td {
    border-left: 0;
    border-top: 1px solid #8e8e8e;
    border-spacing: 0;
    padding: 0.6rem;
}
</style>
