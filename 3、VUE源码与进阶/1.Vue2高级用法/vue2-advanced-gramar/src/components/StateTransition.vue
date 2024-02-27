<template>
    <div>
        <input v-model.number="number" />
        <div>{{animatedNumber.toFixed(0)}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                number:0,
                animatedNumber:0,
            }
        },
        watch:{
            number(newValue){
                window.gsap.to(this.$data,{duration:0.5,animatedNumber:newValue||0})
                console.log(newValue);
            }
        }
    }
</script>