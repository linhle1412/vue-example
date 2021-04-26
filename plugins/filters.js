import Vue from 'vue'

Vue.filter('money', val => val.toLocaleString())