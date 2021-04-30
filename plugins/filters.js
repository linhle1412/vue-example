import Vue from 'vue'

Vue.filter('money', val => new Intl.NumberFormat('vi-VN').format(val))
Vue.filter('date', val => new Intl.DateTimeFormat('en-GB').format(val))