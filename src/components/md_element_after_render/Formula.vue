<template>
    <div style="text-align: center;">
        <math-jax :style="$store.state.isDark ? 'color: #ccc;' : 'color: #000000;'" :latex="conf.content"></math-jax>
    </div>
</template>

<script>
import {MathJax} from "mathjax-vue";

export default {
    name: "Formula",
    components: {
        MathJax,
    },
    props: {
        conf: {
            type: Object,
            default: () => {
                // content: {
                //     type: String,
                //     default: '',
                // },
                return {
                    'content': '',
                };
            },
        },
    }
}
</script>

<style scoped>

</style>
