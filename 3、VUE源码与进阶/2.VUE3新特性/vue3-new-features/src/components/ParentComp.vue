<template>
    <div>{{ message }}</div>
    <Subcomp :message="message" @modifyMessage="modifyMessage"></Subcomp>
</template>
<script>
import SubComp from "./SubComp.vue"
import { ref } from "vue"
export default {
    setup() {
        const message = ref('heiheihi');
        return {message};
        
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
// export default {
//     data(){
//         return{
//             message:'heiheihi',
//         }
//     },
//     methods:{
//         modifyMessage(msg){
//             this.message=msg
//         },
//     },
//     components:{
//         SubComp,
//     }
// }
// const message = ref('heiheihi');
// const modifyMessage = () => {
//     message.vue=msg
// }
</script>