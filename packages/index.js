// 整个包的一个入口
import Address from "./Address/address.vue";
const components = {
  Address
};
const install = function(Vue) {
  components.forEach(item => {
    Vue.component(item.name, item);
  });
};
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== "undefined" && window.vue) {
  install(window.Vue);
}
export default {
  install
};
