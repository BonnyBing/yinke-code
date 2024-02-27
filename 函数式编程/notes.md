# 函数式编程

1、在此之前，我们都会倾向于编程思想
- 封装
- 继承
- 多态

2、react里UI和状态的解耦是非常难受的

3、vue2中，如果组件中有状态的时候，没办法把状态和组件本身拆开，如下面代码所示,导致复用性很差
```js
{
    data:{
        name:'1243'
    },
    methods:{
        clicked(){

        }
    }
}
```

## VUE的演进过程
1、考虑状态的复用性问题：一个组件的复用性要考虑状态复用和UI复用

2、在vue2中用Mixin，解决一些复用性问题，但是Minxin存在很多问题，所以就跨入到了Vue3，提出了组合式API，也就是Composition API，如下代码所示

```js
// 实现将状态逻辑与UI逻辑分离
//封装组件
const useName=()=>{
    const {ref,reactive,computed,watch,onMounted}=Vue
    const name=ref('124')
    const clicked=()=>{

    }
    return {
        name,
        clicked
    }
}
//组件调用
const {name,clicked}=useName()
```
## 面向对象 VS 函数式编程
1、面向对象编程会出现：违背函数的不可变性的缺点，也就是输出结果会受到外部的影响

2、函数式编程，就是为了解决这个问题

## 什么是纯函数
纯函数是一个函数，有相同的输入，就必定得到相同输出，而且没有任何的可观察的副作用。
- 相同的输入->相同输出
- 无副作用

```js
// 纯函数和不是纯函数的例子
// 1.纯函数
function sum1(a,b){
    return a+b;
}

// 2.非纯函数
function sum2(a,b){
    return a+b+Math.random();//随机数导致的输出结果不可预测
}

// 3.非纯函数
let c=1;
function sum3(a,b){
    return a+b+c;//因为用了外部的变量c，而c的改变可能导致sum函数无法预知
}

// 4.非纯函数
function sum4(a,b){
    const res=await fetch('http://xxx.com/xxx');//异步导致了结果无法预知
    return a+res;
}

// 5.这个时候的slice方法是纯函数吗？答案：不是 
// 数组方法学习的时候，通常的分类有：变异方法、非变异方法
// slice方法是非变异方法，它不会改变原数组，而是返回一个新数组
const arr=[0,1,2]
arr.slice(0,1)

// 如果是函数式编程思想，应该怎么组织这部分代码？
// lodash、ramda、underscore都有对应的方法解决
// 用lodash举例
_.slice(array,[start=0],[end=array.length])
// 这里的slice的封装原理如下
function slice(array,start,end){
    // ...传入的参数一致，则返回一定一样
}


// 柯里化
function slice(array){
    // ...
    return function(start,end){
        // ...
    }
}
```
自动化测试和单元测试中，只有纯函数才能预知结果并且做好测试

## 纯函数的特性
- 可移植（高复用）
- 可缓存
- 可测试（测试更友好）
- 更合理，代码可读性更高

## 纯函数的应用
- 柯里化 
```js
// 闭包的概念：函数形成的作用域引用或者使用了上一层作用域的变量，称之为闭包
// 下面这样写不算闭包
function test(){
    return function test1(){
        console.log("test1");
    }
}

//闭包例子
 function test(){
    const a=1;
    return function test1(){
        console.log("test1",a);
    }
}

```

### 代换和规约
- 代换： Alpha 代换知道是变量的名称是不重要的，你可以写入λm.λn.m+n,也可以写成λx.λy.x+y，在演算过程中它们表示同一个函数。也就是我们只关心计算形式，而不关心细节用什么变量去实现。这方便我们不改变运算结果的前提下，去修改变量名，以方便在函数比较复杂的情况下进行化简操作。实际上，连整个lambda演算式的名字也是不重要的，我们只需要这种形式的计算，而不在乎这个形式的命名。

- 规约：Beta  规约指的是如果有一个函数应用（函数调用），那么你可以对这个函数体中与标识符对应的部分做代换（substitution），方式为使用参数（可能是另个演算式）去替换标识符。实际上就是函数调用的参数替换。

小知识点：一个函数它本身绑定的length属性，返回的是这个函数的入参个数。函数的形参的个数，如果设置了默认值，则不算在length内，例如：
```js
function fun(a,b=1){
    console.log(fun.length);
}
// fun.length   返回结果为1，因为b设置了默认值，所以当调用函数的length属性的时候，只算a没有算b
```

### 柯里化实现思路
下面代码中的sum2的函数就是sum1的柯里化形式
```js
function sum1(aa,bb,cc){
    return aa+bb+cc;
}
//调用
sum1(1,2,3,4);

function sum2(aa){
    return function(bb){
        return function(cc){
            return function(dd){
                return aa + bb + cc + dd;
            }
        }
    }
}
// 调用
sum2(1)(2)(3)(4)

```

柯里化过程
```js
function curry(func){
    const funcLen =func.length;
    // 已处理的参数列表，进行收集.一定要保证收集到的参数的个数和函数的形参个数是一致的

    return function partial(...args){
        // 如果长度一致就执行
        if(args.length>=func.length){
            return func.apply(this,args);
        }else{
            // 否则就需要先收集参数，以达到长度一致
            return function(...args2){
                // 收集过程
               return partial.bind(null,...args);
            }
        }
    }
}

const currySum = curry(sum1);
const a=currySum(1)(2)(3)(4);
const b=currySum(1,2)(3)(4)
const c=currySum(1,2,3)(4)
const d=currySum(1,2,3,4)
// 上面a,b,c,d种方式的形参调用行数都能够获取到正确的结果，他们的结果都是一致的
```

## compose的应用
compose用于函数组合，所以入参是多个函数
```js

function fn1(){
    console.log('fn1');
}
function fn2(){
    console.log('fn2')
}

//compose的使用,将多个函数组合起来
const res=compose(fn1,fn2)
// 输出结果：
// fn2
// fn1
```
- 一般运用在插件化机制
- 中间件的机制
  比如在redux的中间件的，**applyMiddleware**（洋葱模型）
```js
function compose(...funcs){
    // 参数长度判断
    // 长度是0
    if(funcs.length ===0){
        return arg=>rag;
    }
    // 长度是1
    if(funcs.length ===1){
        return funcs[0];
    }
    // 小于funcs参数长度

    // 大于funcs参数长度，就需要将funcs参数进行组合，一层一层进行包装。用数组，然后使用reduce方法，reduce函数式数组的万能方法
    return funcs.reduce((prev,cur)=>(..args)=>prev(cur(...ags)));
}

```

拓展知识：reduce.reduce基本上可以替代map,filter,forEach,some,every等方法。
```js
const arr=[11,22,33,44,55];
arr.reduce(prev,cur,index)=>{
    console.log(prev,cur,index);
    return cur;
    //  return cur;打印的结果为
    // undefined
    // 11 22 1
    // 22 33 2
    // 33 44 3
    // 44 55 4
    
    return cur + prev:
    //  return  cur + prev:打印的结果为
    // undefined
    // 11 22 1
    // 33 33 2
    // 66 44 3
    // 110 55 4
}


```

## 纯函数在测试层面的考虑
- redux中，useSelector方法的使用.useSelector是允许传入函数的。纯函数编程可以将useSelector(store=>store.detail.name)解耦成下面的样子。
```js
const detaiNameSelector=store=>store.detail.name
```

```js
useSelector(detailNameSelector)
```
redux官网的代码
```js
import React,{useState} from 'react'
import {useAppSelector,userAppDispatch} from 'app/hooks'
import {decrement,increment} from './counterSlice'
export function Counter(){
    const count = userAppSelector((state)=>state.counter.value)
    const dispatch=useAppDispatch()
}
```