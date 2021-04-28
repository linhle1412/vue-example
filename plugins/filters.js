import Vue from 'vue'

Vue.filter('money', val => new Intl.NumberFormat('vi-VN').format(val))