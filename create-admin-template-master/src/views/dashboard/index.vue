<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { param2Obj } from '@/utils'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    const mytime = param2Obj('https://www.baidu.com/s?wd=js%20%E8%AE%A1%E7%AE%97%E6%97%B6%E9%97%B4%E7%9A%84%E6%97%B6%E9%97%B4%E6%88%B3&rsv_spt=1&rsv_iqid=0xa8ca4602000b4a9c&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&oq=lodash&inputT=7962&rsv_t=0622zdWAQyfomH4pHUfrMW3RF7QOBdzs%2BDhflp7N9w3jhi%2B73MWjDEF3xJfeQpoBaqBh&rsv_pq=9057d446001b7d2f&rsv_sug3=65&rsv_sug1=37&rsv_sug7=101&rsv_sug2=0&rsv_sug4=7963')
    console.log(mytime)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
