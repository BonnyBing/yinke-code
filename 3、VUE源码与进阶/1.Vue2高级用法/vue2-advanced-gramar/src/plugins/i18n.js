export const i18n = {
    // Vue就是main.js中使用import Vue from 'vue'导入的Vue
    // options就是在使用这个插件的时候，传入的参数
    install(Vue,options){
        // 注册一个实例方法
        Vue.prototype.$translate = (key) => {
            return key.split('.').reduce((o,i) =>{
                if(o) return o[i];
            },options);
        };

    }
};