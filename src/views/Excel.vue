<template>
  <Excel
    :head="head"
  />
</template>
<script>
import Excel from '@/components/excel/excel'
export default {
  name : 'Model-Excel' ,
  components : {
    Excel
  },
  data : () => ({
    head : [
      {
        name : '姓名' ,
        solt : 'name' ,
        width : '400' ,
        child : [
            {
                name : '字'
            },
            {
                name : '号'
            }
        ]
      },
      {
        name : '年龄' ,
        solt : 'age' ,
      },
      {
        name : '性别' ,
        solt : 'gender'
      },
      {
        name : '电话' ,
        solt : 'phone'
      },
      {
        name : '身份证' ,
        solt : 'idcard'
      },
      {
        name : '住址' ,
        solt : 'address'
      },
      {
        name : '紧急联系人紧急联系人紧急联系人紧急联系人紧急联系人' ,
        solt : 'urgent'
      },
      {
        name : '紧急联系电话' ,
        solt : 'urgent_phone'
      }
    ]
  })
}
</script>
