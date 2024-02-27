<template>
    <div>
        <button @click="toggle">切换</button>
        <transition name="b" appear>
            <div class="box" v-if="show"></div>
        </transition>
    </div>
</template>

<script>

export default {
    data(){
        return{
            show:true,
        }
    },
    methods:{
        toggle(){
            this.show=!this.show;
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
/* 动画 */
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


</style>
