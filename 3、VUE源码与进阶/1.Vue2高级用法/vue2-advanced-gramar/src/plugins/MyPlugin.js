export const Myplugin = {
    install(Vue,options){
        console.log(options)
        // 注册过滤器
        Vue.filter();
        // 注册全局组件
        Vue.component();
        // 注册全局mixin
        Vue.mixin();
        // 加实例方法
        Vue.prototype.hell=()=>{
            console.log('hello');
        }
    }
};

// export const Myplugin = function(){};