//Class Component(class 组件)
class Hello {}

//Function Component(function 组件)
const Test = () => {
  return <div>124</div>;
};

//Vue2
{
    data:{
        name:'1243'
    },
    methods:{
        clicked(){

        }
    }
}

//Vue3
// 实现将状态逻辑与UI逻辑分离
//封装组件
const useName = () => {
  const { ref, reactive, computed, watch, onMounted } = Vue;
  const name = ref("124");
  const clicked = () => {};
  return {
    name,
    clicked,
  };
};
//组件调用
const { name, clicked } = useName();
