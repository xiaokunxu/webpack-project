import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from "object-path"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: 'profile',
        user: {
            id: '',
            username: ''
        },
        resume: {
            // visibleItems: ['profile', 'work history', 'education', 'projects', 'awards', 'contacts', 'others'],
            config: [
                { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday'] },
                { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details'] },
                { field: 'education', icon: 'book', type: 'array', keys: ['school', 'details'] },
                { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'details'] },
                { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'details'] },
                { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact', 'content'] },
            ],
        }
    },
    mutations: {
        initState(state, payload) {
            state.resume.config.map((item) => {
                if (item.type === 'array') {
                    // state.resume[item.field] = []  // 这样写 Vue 无法监听属性变化
                    Vue.set(state.resume, item.field, [])
                } else {
                    // state.resume[item.field] = {}  // 这样写 Vue 无法监听属性变化
                    Vue.set(state.resume, item.field, {})
                    item.keys.map((key) => {
                        // state.resume[item.field][key] = ''  // 这样写 Vue 无法监听属性变化
                        Vue.set(state.resume[item.field], key, '')
                    })
                }
            })
            Object.assign(state, payload)
        },
        switchTab(state, payload) {
            state.selected = payload
            localStorage.setItem('state', JSON.stringify(state))
        },
        updateResume(state, { path, value }) {
            objectPath.set(state.resume, path, value)
            localStorage.setItem('state', JSON.stringify(state))
        },
        setUser(state, payload) {
            Object.assign(state.user, payload)
        },
        removeUser(state) {
            state.user.id = null
        }
    }
})