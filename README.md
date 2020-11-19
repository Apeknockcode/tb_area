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
// 打开地址
    openAddress() {
      this.openAddressState = true;
    },
    // 关闭地址
    closeTbModel(data) {
      this.openAddressState = data.state;
      console.log(data.address);
    }
```
