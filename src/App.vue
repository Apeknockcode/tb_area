<template>
  <div id="app">
    <Address
      :areaParent="areaParamer"
      :tbState="openAddressState"
      @closeTbModel="closeTbModel"
    />
    <button @click="openAddress">打开地址</button>
  </div>
</template>
<script>
import area from "./assets/area.js";
import Address from "./components/Address/address";
export default {
  data() {
    return {
      openAddressState: false,
      areaParamer: []
    };
  },
  created() {},
  components: {
    Address
  },
  methods: {
    // 打开地址
    openAddress() {
      this.openAddressState = true;
      this.areaParamer = area;
    },
    // 关闭地址
    closeTbModel(data) {
      this.openAddressState = data.state;
      console.log(data.address);
    }
  }
};
</script>

<style lang="less">
* {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
