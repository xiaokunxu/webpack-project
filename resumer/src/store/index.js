import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: 'profile',
        resume: {
            // visibleItems: ['profile', 'work history', 'education', 'projects', 'awards', 'contacts', 'others'],
            config: [
                { field: 'profile', icon: 'id' },
                { field: 'workHistory', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' },
            ],
            profile: {
                name: '徐XX',
                city: '火星',
                title: '前端工程师',
                birthday: '1993-01-01'
            },
            'workHistory': [
                { company: '酱油公司', content: '专注打酱油100年，主要负责界面设计' },
                { company: 'TX', content: '我的第一份工作是' },
            ],
            education: [
                { school: '社会大学', content: '研究生' },
                { school: '社会大学', content: '本科' },
            ],
            projects: [
                { name: '项目2', content: '文字' },
                { name: '项目1', content: '文字' },
            ],
            awards: [
                { name: 'awards A', content: '文字' },
                { name: 'awards B', content: '文字' },
            ],
            contacts: [
                { contact: '手机', content: '13412434567' },
                { contact: 'QQ', content: '12345678' },
            ],
        }
    },
    mutations: {
        switchTab(state, payload) {
            state.selected = payload
        },
        updateResume(state, { field, subfield, value }) {
            state.resume[field][subfield] = value
        }
    }
})