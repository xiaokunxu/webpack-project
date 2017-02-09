<template>
  <div>
    <p>{{text}}</p>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      text: '你好',
      msg: 'hello'
    }
  }
}
</script>

<style>
p {
  color: red
}
</style>
