<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <!--这里没有直接使用接收到的age，而是在data中定义了myAge进行进一步加工-->
    <h2>学生年龄：{{myAge+1}}</h2>
    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    console.log(this)
    return {
      msg: '我是一个尚硅谷的学生',
      // props中的属性优先级高于data中的属性
      // 注意：接收到的属性尽量不要修改！如果非要修改，在data中定义一个其他名称的变量，如：myAge: this.age
      myAge: this.age
    }
  },
  methods: {
    updateAge() {
      this.myAge++
    }
  },
  // 简单声明接收
  // props:['name','age','sex']

  // 接收的同时对数据进行类型限制
  /* props:{
			name:String,
			age:Number,
			sex:String
		} */

  // 接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  props: {
    name: {
      type: String, // name的类型是字符串
      required: true // name是必要的
    },
    age: {
      type: Number,
      default: 99 // 默认值，如果不传入age为默认值
    },
    sex: {
      type: String,
      required: true
    }
  }
}
</script>