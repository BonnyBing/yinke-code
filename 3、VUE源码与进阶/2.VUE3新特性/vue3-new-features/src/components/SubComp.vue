<template>
    <button @click="reversMessage">Reverse Message</button>
    <div>{{messages}}</div>
</template>
<script lang="ts" setup>
// export default {
//     props:{
//         message:{
//             required:true,
//             type:String,
//         }
//     },
//     methods:{
//         reversMessage(){
//             const msg = this.message.split('').reverse().join('')
//         }
//     }
// }
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