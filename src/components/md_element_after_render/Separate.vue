<template>
    <div>
        <div style="height: 15px;"></div>
        <div v-if="conf.isLine" style="border-bottom: 2px rgba(60, 60, 60, .24) dotted;" :class="$store.state.isDark ? 'dark' : ''"></div>
        <div style="height: 15px;"></div>
    </div>
</template>

<script>
export default {
    name: "Separate",
    props: {
        conf: {
            type: Object,
            default: () => {
                // isLine: {
                //     type: Boolean,
                //     default: false,
                // },
                return {
                    'isLine': false,
                };
            }
        },
    }
}
</script>

<style scoped>
.dark {
    border-bottom: 1px #ccc dotted !important;
}
</style>
