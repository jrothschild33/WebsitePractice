<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: 'About'
  // 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载
  /* beforeDestroy() {
			console.log('About组件即将被销毁了')
		},*/
  /* mounted() {
			console.log('About组件挂载完毕了',this)
			window.aboutRoute = this.$route
			window.aboutRouter = this.$router
		},  */
}
</script>