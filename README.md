# tb_area

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```js
//如何引用 下载模块
npm i tb_area

//在Vue 中main.js引入该模块
import TbAddress from "tb_area";  //引入模块
import "tb_area/dist/tb_area.css"; //引入模块样式

//使用方法
// <Address :areaParent="areaParamer" :tbState="openAddressState" @closeTbModel="closeTbModel"></Address>
> areaParent 这是传入的地址数组
> tbState  这是控制模块的显示和隐藏
> closeTbModel  这是地址关闭之后的返回的方法

  
```

