# 安装等相关指令
## 安装最新的vue的latest版本
npm create vue@latest
## 安装依赖
npm i
## 启动服务
npm run dev

# vscode插件
vetur是支持vue2的插件，volar是支持vue3的插件

# Composition API（组合式API）
VUE2中是没有的，vue2中的是选项式的API
vue2的选项式API定义组件时的写法
```JS
<script>
export default {
  // 定义数据
  data(){
    return{
      name:'Bonny',
    };
  },
  // 定义函数
  methods:{
    helloWorld(){},
  },
  // 定义生命周期
  mounted(){
    console.log(this);
    console.log('mounted');
  }
}
</script>

<template>
  <div>
    {{name}}
  </div>
</template>

<style scoped>
</style>

```
vue3中的Composition API的写法
```JS
<script setup>

import {ref,onMounted} from 'vue';
// 定义响应式数据
const name = ref('Bonny');
// 定义函数方法
const helloWorld = () => {};
// 定义生命周期
onMounted(() => {
  console.log('vue3 mounted');
});
</script>

<template>
  <div>
    {{name}}
  </div>
</template>

<style scoped>
</style>

```
vue2的选项式API和vue3的Composition API（组合式API）的区别：
1.选项式api是在组合式API的基础上实现的；
2.选项式api是以组件实例的概念为中心的，也就是他们都是围绕着this来执行的，this指向的就是当前组件的实例；
3.组合式api，数据实在ref这个方法中定义，其核心思想就是直接在函数作用域里面定义响应式的状态变量，并且从多个函数中得到的状态组合起来，进而处理复杂的问题。这种形式会更加的自由。

# vue2和vue3在父组件和子组件之间的通讯的区别
ParenComp.vue是父组件，SubComp.vue是子组件
1.vue2
ParenComp.vue代码
```JS
<template>
    <div>{{message}}</div>
    <Subcomp :message="message" @modifyMessage="modifyMessage"></Subcomp>
</template>
<script>
import SubComp from "./SubComp.vue"
export default {
    data(){
        return{
            message:'heiheihi',
        }
    },
    methods:{
        modifyMessage(msg){
            this.message=msg 
        },
    },
    components:{
        SubComp,
    }
}
</script>
```
SubComp.vue的代码

```JS
<template>
    <button @click="reversMessage">Reverse Message</button>
    <div>{{message}}</div>
</template>
<script lang="ts">
export default {
    props:{
        message:{
            required:true,
            type:String,
        }
    },
    methods:{
        reversMessage(){
            const msg = this.message.split('').reverse().join('')
        }
    }
}
</script>
```
App.vue的代码
```JS
<script >
import ParentComp from "@/components/ParentComp.vue"
export default {
  // 定义数据
  data(){
    return{
      name:'Bonny',
    };
  },
  // 定义函数
  methods:{
    helloWorld(){},
  },
  // 定义生命周期
  mounted(){
    console.log(this);
    console.log('mounted');
  },
  components:{
    ParentComp,
  }
}

</script>

<template>
  <ParentComp />
  <!-- <div>
    {{name}}
  </div> -->
</template>

<style scoped>
</style>

```
2.vue3
ParenComp.vue代码
```JS
<template>
    <div>{{message}}</div>
    <Subcomp :message="message" @modifyMessage="modifyMessage"></Subcomp>
</template>
<script setup>
import SubComp from "./SubComp.vue"
import { ref } from "vue"

const message = ref('heiheihi');
const modifyMessage = () => {
    message.value=msg 
}
</script>
```
值得注意的是，在vue3中如果是通过ref定义的响应式变量，后续想要修改其值，要像上面的代码一样message.value=msg通过改变量的value来修改其值，而不是直接message=msg

SubComp.vue的代码
```JS
<template>
    <button @click="reversMessage">Reverse Message</button>
    <div>{{messages}}</div>
</template>
<script lang="ts" setup>

// 宏
const props = defineProps({
    messages:{
        required:true,
        type:String,
    }
});

const emits = defineEmits(['modifyMessage']);

const  reversMessage = ()=>{
            const msg = props.messages.split('').reverse().join('')
            emits('modifyMessage',msg);
    }

</script>
```

2.1 vue3中的setup
在<script>标签中设置setup，这就代表着使用的是组合形式来进行代码编写，也就是用vue3进行代码的编写。
如果不是卸载script里的setup，它会有 个参数：props，context
2.1.1 props
props是响应式的，也就是说访问的方式是通过点的方式比如props.age，不可以通过结构式，也就是const age = props;的方式访问，结构式访问会破坏掉响应式，使得age变成了非响应式。如果既想使用结构式的写法访问数据，又不想破坏响应式。可以这样处理：
使用vue提供的toRefs或者toRef
```JS
import { toRefs,toRef } from "vue";
export default {
  const {message} = toRefs(props);
  const message toRef(props,'message')
}
```

2.1.2 context
包含了上下文的信息，是非响应式的，可以直接用结构式进行访问。
2.1.2.1 expose
一个用于暴露公共属性的函数，也就是在子组件中控制父组件能访问到的子组件的实例值。
小tips：父组件在子组件标签中使用ref就可以访问子组件的实例代码如下
```JS
<template>
    <div>{{ message }}</div>
    <Subcomp ref="subComRef" :message="message" @modifyMessage="modifyMessage"></Subcomp>
</template>
<script>
import SubComp from "./SubComp.vue"
import { ref } from "vue"
export default {
    setup() {
        const message = ref('heiheihi');
        const subComRef = ref(null)
        return {message,subComRef};
        
    },
    mounted(){
      console.log(this.subComRef)
    },
        methods:{
        modifyMessage(msg){
            this.message=msg
        },
    },
    components:{
        SubComp,
    }
}
```


2.2 Props vue2的写法
Props是一种用于父组件向子组件传递数据的机制。子组件在标签上面通过使用v-bind或者: 来绑定父组件传递的数据

2.3 defineProps vue3中的宏
defineProps的作用和vue2中的Props作用是一样的，但是它不需要再引用，因为它是一个全局的。

2.4 defineEmits vue3中的宏
defineEmits用于定义事件，语法如下
```JS
defineEmits(['XXXX'])
```
defineEmits定义组件可以触发的事件，然后通过emits函数来触发具体的事件。
# vue提供的一些好用的方法
## shallowRef
ref会深层次地将所有属性递归地变成响应式的，而shallowRef只会将（）里的第一层属性变成响应式的。举个例子。
```JS
const user = ref({
  name:'bonny',
});
const user1 = shallowRef({
  name:'bonny',
})

// 要将user的name的值修改，写法如下
this.user.name='hahah';
// 如果想把user1的name进行修改，写法如下
this.user={
  name:'hahah'
};
```
如果想用shallowRef又不想用this.user={name:'hahah'};这种方式进行值的修改的话，可以使用triggerRef，进行手动触发响应式机制。但是是要在script标签中使用setup后再在后续的代码中使用triggerRef才能生效。上面代码中的修改值的语句就可以改成下面的代码
```JS
//JavaScript
this.user.name='hahah';
triggerRef(this.user);
```
## reactive
也是将数据变成响应式的，用法和ref是一样的
```JS
const user = reactive({name:'bonny'});
const changeState = () => {
  user.name='blue',
}
```
## shallowReactive
和shallowRef用法是一样，而且也同样只会对浅层生效，不会深入递归

ref和reactive的区别：
1.ref定义的响应式变量，想要修改其值的时候是通过访问其value再访问相关属性才可以进行修改的；reactive就不需要，可以直接修改相关属性；
2.想要访问子组件实例的时候需要使用ref来定义，但是reactive没有这个作用；
3.reactive定义的属性返回给的变量，后续只能修改变量的相关属性，不能直接给变量重新赋值。如
```JS
const user=reactive({name:'bonny'});
const changeState =()=>{
  user.name='blue';
  // 下面这样写是不生效的
  // user={
  //   name:'blue',
  // };
}
```
## computed
对应vue2里面的计算属性，用法如下
```JS
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```
## watch
观察，当数据发生变化，就触发相关事件。它有三个参数，
1.第一个参数是观察的对象，如下代码中的user；
2.第二个参数就是，当观察到的数据发生变化后返回的回调函数；
3.第三个参数，控制watch的一些动作。其中immediate控制是否立即执行；deep控制是否要深度遍历数据源；flush控制调整回调函数执行的时机的，它有三个值“pre”，“post”，“sync”，默认值是pre，pre表示在数据改变之前执行，post表示是在数据改变之后执行，syvc表示数据改变和执行是同步进行的。
```JS
watch(user,(newUser,oldUser)=>{
  console.log(newUser,oldUser);
});
```
## watchEffect
watchEffect 中的响应式数据会被自动追踪，所以你不需要手动指定要观察的数据。这使得 watchEffect 的使用更为简洁。另外，watchEffect 返回一个停止观察的函数stopWatching();，你可以在组件销毁或不需要观察时调用该函数来停止副作用的执行，以优化性能。
## watchPostEffect
其实就相当于给watchEffect设置了flush并设置其值为
post
## watchSyncEffect
其实就相当于给watchEffect设置了flush并设置其值为
sync
# 生命周期

# 异步组件
在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。换言之，我们的组件可能不再是同步导入或者组件需要等待 Promise resolve 完成后才被渲染。这样的组件我们称为异步组件。Vue 提供了 defineAsyncComponent 方法来实现此功能：
```JS
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => {
    return new Promise((resolve, reject) => {
        // ...从服务器获取组件
        resolve(/* 获取到的组件 */)
    })
}) // ... 像使用其他一般组件一样使用 `AsyncComp`

```
defineAsyncComponent 方法接收一个返回 Promise 的加载函数。这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用。你也可以调用 reject(reason) 表明加载失败。

ES 模块动态导入：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import 也会返回一个 Promise，所以多数情况下我们会将它和 defineAsyncComponent 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：
```JS
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```
## Suspense
在使用动态组件或者异步组件的时候通常会与Suspense搭配使用。<Suspense> 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。
不过暂时最好不要在生产环境大量使用这一特性，因为该特性目前还不是稳定版本，后续可能会有变更。

动态组件和异步组件，可以有效地减少网页第一次加载的时候的体积，提高访问时间。

# 自定义指令
我们都知道指令是为了增强组件的，我们常见的指令有：v-if、v-show、v-model、v-bind:value、v-on:click 等。
自定义指令其实非常简单，我们需要始终关注以下几个问题：
1. 指令的钩子函数，有点类似生命周期函数钩子
2. 指令钩子函数中的参数
3. 指令的逻辑处理
## 自定义一个v-focus 指令
例如，我们想要 input 组件在初始化渲染时，就聚焦，那么我们可以这样：
```JS
//JavaScript
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) {
    el.focus()
  }
}
</script>

<template>
  <input v-focus />
</template>
```
在script中使用setup后自定义指令很简单，指令名为v+首字母大写的指令名，如上述代码中的vFocus，然后等号右边是一个对象。
## 指令钩子
```JS
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```
## 参数详解
指令的钩子会传递以下几种参数：
- el：指令绑定到的元素。这可以用于直接操作 DOM。
- binding：一个对象，包含以下属性。
  - value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
  - oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
  - arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
  - modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
  - instance：使用该指令的组件实例。
  - dir：指令的定义对象。
- vnode：虚拟节点代表绑定元素的底层 VNode。
- prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

## v-model
github官网：https://github.com/vuejs/core/blob/507f3e7a16c98398a661c150ce89d36b1441f6cc/packages/compiler-core/src/transforms/vModel.ts#L114C9-L114C9
v-model其实就是一个语法糖，它其实使用的是v-bind:model-value和v-on:update:model-value

# Teleport
该特性允许你将组件内的某个子组件挂载到任意 HTML 节点上，这个特性像极了 React 中的 createPortal。这个特性到底有什么作用呢？我们一般用在哪？思考这个问题之前，我们不妨一起来看看这个问题：
页面中有一个按钮，当按钮点击时，会弹出 modal。看到这个需求，我们很容易就能想到实现方案：
1.不使用 Teleport
```JS
// App.vue
<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->

<script setup>
import Modal from './Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
</template>
```
然后在同级创建 Modal 组件，相关代码如下：
```JS
<script setup>
const props = defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button
              class="modal-default-button"
              @click="$emit('close')"
            >OK</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
```
2.使用 Teleport
Modal.vue 内容不变，调整 App.vue 的内容，如下：
```JS
<!-- App.vue -->
<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->

<script setup>
import Modal from './Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    {/* to：指定将下面的标签移动到指定的html下面； */}
    <!-- 使用这个 modal 组件，传入 prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
</template>
```
## Teleport 原理简单介绍
github官网：https://github.com/vuejs/core/blob/507f3e7a16c98398a661c150ce89d36b1441f6cc/packages/runtime-core/src/components/Teleport.ts#L65
- Teleport 组件渲染的时候会调用patch方法，patch方法会判断如果 shapeFlag 是一个 Teleport 组件,则会调用它的 process 方法。process 方法包含了Teleport组件创建和组件更新的逻辑。
- Teleport 组件创建
  - 首先会在在主视图里插入注释节点或者空白文本节点
  - 接着获取目标元素节点
  - 最后调用mount方法创建子节点往目标元素插入 Teleport 组件的子节点
- Teleport 组件更新首先会更新子节点，处理 disabled 属性变化的情况，处理 to 属性变化的情况。
- 最后 Teleport 组件挂载会调用unmount方法，会判断如果 shapeFlag 是一个 Teleport 组件，则会执行它的 remove 方法。
- remove 方法 会调用hostRemove方法移除文本节点，然后遍历子节点循环调用 unmount 方法挂载子节点。
## 应用场景
作用与 react 的 createPortal 类似
- 弹出层
- Popover 等
- tooltip

# 自定义Hooks
hooks开源库github网址：https://github.com/InhiblabCore/vue-hooks-plus
通过自定义 Hook，可以将组件的状态与 UI 实现分离，hook只包含逻辑、状态和修改状态的逻辑代码。虽然这个 api 和早期的 mixin 非常像，但是他的设计思想实在先进太多。
优点：
1.可以更加直观地组织逻辑；
2.更好地进行代码复用；
3.更好的类型推断；
4.更好的进行代码维护。

注意：封装的hook的文件名必须是use开头
## 自定义Hook示例
假设我们需要封装一个计数器，该计数器用于实现数字的增加或者减少，并且我们可以指定数字可最大和最小值，如果我们使用 vue3 composition 封装，会是怎样的呢？
我们先设想一下使用方法：
```JS
<template>
  <div>
    <p>{{ current }} [max: 10; min: 1;]</p>
    <div class="contain">
      <button @click="inc()">
        Inc()
      </button>
      <button @click="dec()" style="margin-left: 8px">
        Dec()
      </button>
      <button @click="set(3)" style="margin-left: 8px">
        Set(3)
      </button>
      <button @click="reset()" style="margin-left: 8px">
        Reset()
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCounter } from './useCounter'
  const [current, { inc, dec, set, reset }] = useCounter(20, { min: 1, max: 10 })
</script>
```
看到了使用方法，我们可以尝试定义这个 hook 函数，这里我们新建一个文件，用于编写 useCounter 相关代码。
```JS
import { Ref, readonly, ref } from 'vue'

// 判断是否为数字
const isNumber = (value: unknown): value is number => typeof value === 'number'

export interface UseCounterOptions {
  /**
   *  Min count
   */
  min?: number

  /**
   *  Max count
   */
  max?: number
}

export interface UseCounterActions {
  /**
   * Increment, default delta is 1
   * @param delta number
   * @returns void
   */
  inc: (delta?: number) => void

  /**
   * Decrement, default delta is 1
   * @param delta number
   * @returns void
   */
  dec: (delta?: number) => void

  /**
   * Set current value
   * @param value number | ((c: number) => number)
   * @returns void
   */
  set: (value: number | ((c: number) => number)) => void

  /**
   * Reset current value to initial value
   * @returns void
   */
  reset: () => void
}

export type ValueParam = number | ((c: number) => number)

function getTargetValue(val: number, options: UseCounterOptions = {}) {
  const { min, max } = options
  let target = val
  if (isNumber(max)) {
    target = Math.min(max, target)
  }
  if (isNumber(min)) {
    target = Math.max(min, target)
  }
  return target
}

function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {},
): [Ref<number>, UseCounterActions] {
  const { min, max } = options

  const current = ref(
    getTargetValue(initialValue, {
      min,
      max,
    }),
  )

  const setValue = (value: ValueParam) => {
    const target = isNumber(value) ? value : value(current.value)
    current.value = getTargetValue(target, {
      max,
      min,
    })
    return current.value
  }

  const inc = (delta = 1) => {
    setValue(c => c + delta)
  }

  const dec = (delta = 1) => {
    setValue(c => c - delta)
  }

  const set = (value: ValueParam) => {
    setValue(value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return [
    readonly(current),
    {
      inc,
      dec,
      set,
      reset,
    },
  ]
}

export default useCounter
```
