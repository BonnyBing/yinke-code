<template>
    <div>
        <div>
            <button @click="toggleZ">切换_tran自带</button>
            <transition name="b" appear>
                <div class="box" v-if="showZ"></div>
            </transition>
        </div>
        <div>
            <button @click="toggleA">切换animate库</button>
            <transition  appear
                appear-active-class="animate__animated animate__rotateIn"
                enter-active-class="animate__animated animate__backInDown"
                leave-active-class="animate__animated animate__backOutDown"
            >
                <div class="box" v-if="showA"></div>
            </transition>
        </div>
        <div>
            <button @click="toggleJ">切换_js自定义动画</button>
            <transition appear :css="false"
                @before-appear="beforeAppear"
                @appear="appear"

                @before-enter="beforeEnter"
                @enter="enter"

                @before-leave="beforeLeave"
                @leave="leave"
            >
                <div class="box" v-if="showJ"></div>
            </transition>
        </div>
        <div>
            <button @click="toggleD">切换_多元素</button>
            <transition 
                appear 
                enter-active-class="animate__animated animate__rotateIn"
                leave-active-class="animate__animated animate__rotateOut"
                mode="out-in"
            >
               <button v-if="isEdit" key="save">保存</button>
               <button v-else key="edit">编辑</button>
            </transition>
        </div>
        <div>
            <button @click="add">增加</button>
            <button @click="remove">删除</button>
            <button @click="shuffle">打乱</button>
        </div>
        <div>
            
            <transition-group name="group">
                <span v-for="item in items" :key="item">{{item}}</span>
            </transition-group>
        </div>
    </div>
    
</template>

<script>

import {random,shuffle} from 'lodash-es';
export default {
    data(){
        return{
            showZ:true,
            showA:true,
            showJ:true,
            isEdit:true,
            items:Array.from({length:10},(_,index)=>index),
            nextNum:10,
        }
    },
    methods:{
        toggleZ(){
            this.showZ=!this.showZ;
        },
        toggleA(){
            this.showA=!this.showA;
        },
        toggleJ(){
            this.showJ=!this.showJ;
        },
        toggleD(){
            this.isEdit=!this.isEdit;
        },
        add(){
            this.items.push(this.nextNum++);
        },
        remove(){
            const index = random(0,this.items.length-1);
            this.items.splice(index,1);
        },
        shuffle(){

            this.items=shuffle(this.items);
        },
        // 第一次加载时的动画
        beforeAppear(el){
            el.style.opacity=0;

        },
        appear(el,done){
            window.Velocity(el,{opacity:1,width:50},{duration:50})
            window.Velocity(el,{opacity:1,width:30},{complete:done})

        },
        afterAppear(el){
            console.log(el);
        },
        appearCancelled(el){
            console.log(el);
        },

        // 定义进入的动画的4个函数
        beforeEnter(el){
            el.style.opacity=0;
        },
        enter(el,done){
            window.Velocity(el,{opacity:1,width:50},{duration:50})
            window.Velocity(el,{opacity:1,width:30},{complete:done})

        },
        afterEnter(){

        },
        enterCancelled(){

        },

        // 定义出去的动画的4个函数
        beforeLeave(){

        },
        leave(el,done){
             window.Velocity(el,{opacity:0},{duration:30,complete:done})
        },
        afterLeave(){

        },
        leaveCancelled(){

        },
    }
}
</script>
<style >
.box{
    margin:40px auto;
    width:30px;
    height:30px;
    background: blue;
}
/* 进入时的动画 */
.b-enter{
    opacity: 0;
}
.b-enter-active{
    transition: opacity 3s;
}
.b-enter-to{
    opacity: 1;
}

/* 出去时的动画 */
.b-leave{
    opacity: 1;
}
.b-leave-active{
    transition: opacity 3s;
}
.b-leave-to{
    opacity: 0;
}
div span{
    display: inline-block;
    margin:0 4px;
    transition:all 0.5s;
}

.group-enter,.group-leave-to{
    opacity:0;
    transform: translateY(20px);
}
.group-leave-active{
    position:absolute;
}
</style>
