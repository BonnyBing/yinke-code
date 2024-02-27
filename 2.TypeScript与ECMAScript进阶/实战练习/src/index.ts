import {Button} from "./components"
import "./styles/index.css"

const a: number = 1;
const b: string = '2';

console.log(a+b);

// 箭头函数
[1,2,3].map((n) => n+1);
// 箭头函数在 es5中是无法运行的，所以我们就需要使用babel来转换

// 类
// 也进行babel转换
class Person{
    name: string;
    constructor(name){
        this.name = name;
    }
    satHi(){
        console.log(this.name)
    }
}

console.log(Button.name);