import Vue from 'vue'
import Component from 'vue-class-component'


@Component
export default class Hello extends Vue {
  private name = 'hello'
  private msg = 'Welcome to Your Vue.js App'
}
