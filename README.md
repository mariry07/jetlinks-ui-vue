# jetlinks-vue

## Project setup

进入工程目录执行

```
npm install
```

### Compiles and hot-reloads for development

进入项目根目录，修改vue.config.js中的后端ip地址。

```javascript
  devServer: {
    port: 1024,
    proxy: {
        '/api': {
             target: 'http://192.168.10.233:8000/',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}
```

运行项目

```
npm run serve
```


