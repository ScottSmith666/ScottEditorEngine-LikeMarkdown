import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isDark: false,
        // 弹窗series
        saveWindow: false,
        oploadMediaWindow: false,
        // 提示series
        tips: false,
        kind: '',
        status: 'half_edit_preview',  // 'edit'、'preview'、'half_edit_preview'

        popWords: '',  // 弹框提示词
    },
    mutations: {
        changeTheme(state) {
            state.isDark = !state.isDark;
        },
        changeEdit(state) {
            state.status = 'edit';
        },
        changePreview(state) {
            state.status = 'preview';
        },
        changeHalfEditPreview(state) {
            state.status = 'half_edit_preview';
        },
        saveMyDocument(state) {
            state.saveWindow = !state.saveWindow;
        },
        uploadMyMedia(state) {
            state.oploadMediaWindow = !state.oploadMediaWindow;
        },
        alertTips(state, def) {  // def props: [kind, text]
            state.popWords = def[1];
            state.tips = !state.tips;
            state.kind = def[0];
            //auto close
            setTimeout(() => {
                state.tips = false;
            }, 1000);
        },
    },
    actions: {},
    modules: {}
});
