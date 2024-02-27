# 相关命令
- 全局安装vue
```js
npm install -g @vue/cli
```
- 创建名为vue2-advanced-gramar
```JS
vue create vue2-advanced-gramar
```
- 进入对应项目目录，运行项目
```JS
npm run serve
```
# Maxin
mixin主要是用于实现复用，但是存在很多例如命名污染、依赖不透明等问题，所以vue3中已经不再使用，vue3中使用Composition API（组合式API）替代了。
## 合并策略
多个组件嵌套使用，比如c使用了b，b使用了a
1.data选项，数据对象内部进行递归合并，发生冲突，则以后者数据优先。也就是如果a,b,c中都有data，对于data里面的数据如果是都不一样的，那就合并一起，如果重复的，就只取c的数据。
2.生命周期钩子函数，合并为一个数组，前者优先执行。也就是，按a=>b=>c的顺序执行生命周期的钩子函数。
3.值为对象的配置，如果键名发生冲突，则取后者的键值。也就是，如果a，b，c中都在在methods、directives、components中定义了相同的函数名的函数，就只取c里的函数。

## mixin问题
1.不清晰的数据来源
2.命名容易冲突
3.隐式的跨mixin交流 

# 动画特效
## transition
### 单元素的进入/离开效果
vue提供了transition的封装组件。在html中使用<transition></transition>包裹住要有动画效果的其他标签。
html中使用transition
```HTML
 <transition appear>
            <div class="box" v-if="show"></div>
        </transition>
```
小tips：appear表示页面加载出来的时候就需要有动画效果
1.进入效果
transition是过渡效果
```CSS
.v-enter{
    opacity: 0;
}
.v-enter-active{
    transition: opacity 3s;
}
.v-enter-to{
    opacity: 1;
}
```
2.出去效果
```CSS
.v-leave{
    opacity: 1;
}
.v-leave-active{
    transition: opacity 3s;
}
.v-leave-to{
    opacity: 0;
}
```
注意：如果在transition中没有写name属性，那么在css中就按上面所写命名动画效果，如果在transition中写了name属性，那么上面的css的动画效果命名中的v就改成对应的transition的name，也就是只改前缀，后缀时不能改的，不然vue是无法识别的

### 多元素过度
#### 按钮
```HTML
<transition 
                appear 
                enter-active-class="animate__animated animate__rotateIn"
                leave-active-class="animate__animated animate__rotateOut"
                mode="out-in"
            >
               <button v-if="isEdit" key="save">保存</button>
               <button v-else key="edit">编辑</button>
            </transition>
```
其中mode可以控制编辑按钮是在保存按钮出去再进来，还是先进来在等保存按钮出去

#### 列表




## animation.css
animation库的链接：https://animate.style
1.@keyframes ：是css中用于创建动画的一种规则。它允许开发者定义一个动画序列，描述动画从开始到结束的每一步。这个规则使用了关键帧（keyframes）来指定动画中的关键时刻。它可以用于创建复杂的动画，允许开发者定义动画中的每一步的样式，以及持续时间/缓动函数等参数。下面是一个简单的例子
```CSS
/* @keyframes是CSS中用于创建动画的一种规则 */
@keyframes bounce{
    0%{
        transform:scale(0);
    }
    50%{
        transform:scale(1.5);
    }
    100%{
        transform:scale(1);
    }
}
/* 应用bounce动画 */

.b-enter-active{
    animation:bounce 0.5s;
}

/* reverse就是把bounce动画从100%-0%执行 */
.b-leave-active{
    animation:bounce 0.5s reverse;
}

```
小tips：revers就是反向播放动画，scale是缩放效果，translate是平移,rotate是旋转,transform:scale(1.5)表示水平和垂直方向都缩小到原来的一半

## velocity.js
github链接：https://github.com/julianshapiro/velocity

## GSAP
github链接：https://github.com/greensock/GSAP

## 总结
- transition中的重要属性：appear、name
- 自定义类名
- 自定义钩子函数
- animate.css
- velocity.js
- 多元素动画交互 mode
- 列表动画
- 状态动画

# 过滤器（VUE2中有，vue3就没有了）
VUE3中已经移除，使用methods,computed可以代替
## 全局中定义
在main.js文件中加入代码如下
```JS
Vue.filter('capitalize',function(value){
    return value.charAt(0).toUpperCase()+value.slice(1);
});
```
## 组件中定义过滤器
```JS
<template>
  <div>
    {{name | capitalize | capitalizeLastWord('!')}}
  </div>
</template>
<script>
    export default{
        data(){
            return{
                name:'hello world',
            };
        };
    },
    filters:{
        capitalize(value){
            return value.charAt(0).toUpperCase()+value.slice(1);
        },
        // suffix就是上面div中capitalizeLastWord方法所传入的参数
        capitalizeLastWord(value,suffix){
            return value.slice(0,-1)+value.slice(-1)..toUpperCase()+suffix;
        }
    }
</script>
```
# 插件
## 定义插件
vue规定定义插件的两种方法
1.方法一
```JS
export const Myplugin = {
    // Vue就是main.js中使用import Vue from 'vue'导入的Vue
    // options就是在使用这个插件的时候，传入的参数
    install(Vue,options){}
};

```
2.方法二
```JS
export const Myplugin = function(){

};
```
## 使用插件
在main.js中加入代码
```JS
import {MyPlugin} from "@/plugins/MyPlugin"

Vue.use(MyPlugin,{
    name:'Bonny',
});
```
# 插槽
## 默认插槽和指定插槽
现在有两个文件，SlotSyntax.vue和PageLayout.vue
SlotSyntax.vued代码如下
```JS
<template>
   <div>
    <PageLayout>
        这是一段话
        <template v-slot:header>
            这是header内容
        </template>
        <template v-slot:footer>
            这是footer内容
        </template>
    </PageLayout>
   </div>
</template>
<script>
import { PageLayout } from "./PageLayout.vue";
    export default {
        components:{
            PageLayout
        }
    }
</script>
```
PageLayout.vue代码如下
```JS
<template>
<div class="container">
   <div class="header">
    <slot name="header"></slot>
   </div>
   <div class="content">
    <slot name="default"></slot>
   </div>
   <div class="footer">
    <slot name="footer"></slot>
   </div>
</div>
</template>
<script>
    export default {
       
    }
</script>
<style>
.container{
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    display:flex;
    flex-direction:column;

}
.header{
    flex:none;
    height:50px;
    box-shadow:0 1px blue;
}
.content{
    flex:auto;
}
.footer{
    flex:none;
    height:50px;
    box-shadow:0 1px blue;
}
</style>
```
其中在SlotSyntax.vue中<PageLayout></PageLayout>中的文字就会在PageLayout.vue中的<slot></slot>中显示。
<slot></slot>中没有定义name属性就不会显示特定的内容，如果需要显示特定的内容，就需要在SlotSyntax.vue中<PageLayout></PageLayout>中使用<template v-slot:header>定义好内容

## 作用域插槽
现在有两个文件，SlotSyntax.vue和PageLayout.vue
SlotSyntax.vue代码如下
```JS
<template>
   <div>
    <PageLayout>
        <template #{slotName}>
            这是一段话
        </template>
        
        <template v-slot:header="{user}">
            {{user.name}}
        </template>
        
    </PageLayout>
   </div>
</template>
<script>
import { PageLayout } from "./PageLayout.vue";
    export default {
        data(){
            slotName:'footer',
        },
        components:{
            PageLayout
        }
    }
</script>
```
PageLayout.vue代码如下
```JS
<template>
<div class="container">
   <div class="header">
    <slot name="header" :user="user"></slot>
   </div>
   <div class="content">
    <slot></slot>
   </div>
   <div class="footer">
    <slot name="footer"></slot>
   </div>
</div>
</template>
<script>
    export default {
       data(){
        return (
            user:{
                name:'bonny',
                age:18,
            },
        ),
       };
    }
</script>
<style>
.container{
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    display:flex;
    flex-direction:column;

}
.header{
    flex:none;
    height:50px;
    box-shadow:0 1px blue;
}
.content{
    flex:auto;
}
.footer{
    flex:none;
    height:50px;
    box-shadow:0 1px blue;
}
</style>
```
在PageLayout.vue（子组件中）有一个user数据，可以通过在子组件中的<slot></slot>标签中使用:来绑定数据，在SlotSyntax.vue（父组件）中用v-slot:header="{user}"来绑定子组件的数据。这就是作用域插槽。


# 相关缩写
- v-on  @
- v-bind :
- v-slot #
