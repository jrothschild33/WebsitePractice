/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/

const initState = 0 // 初始化状态初始化状态（接管子组件中的state，可用store.getState()获取，从此子组件中的state与redux无关了）
// preState = initState：基本JS语法，形参默认值，如果没有传递preState参数，或传递值为undefined，preState默认等于initState
export default function countReducer(preState = initState, action) {
  //  console.log(preState);
  // 从action对象中获取：type、data
  const { type, data } = action
  // 根据type决定如何加工数据
  switch (type) {
    case 'increment': // 如果是加
      return preState + data
    case 'decrement': // 若果是减
      return preState - data
    // 初始化时
    default:
      return preState
  }
}
