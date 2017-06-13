import Rubberband from './Rubberband.vue'

export default function install(Vue) {
  Vue.component('rubberband', Rubberband)
}

/* global window */
if (typeof window !== 'undefined' && typeof window.Vue === 'function') {
  window.Vue.use(install)
}
