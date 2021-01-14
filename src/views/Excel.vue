<template>
  <Excel
    :columns="columns"
    :data="data"
    :pattern="true"
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
    columns : [
      [
        {
          value : '姓名' ,
          solt : 'name' ,
          // rowspan : 2 ,
          // colspan : 2 ,
          width : 400
        },
        {
          value : '年龄' ,
          // rowspan : 2 ,
          solt : 'age' ,
          width : 400
        },
        {
          value : '性别' ,
          solt : 'gender' ,
          width : 400
        },
        {
          value : '电话' ,
          solt : 'phone' ,
          width : 400
        },
        {
          value : '身份证' ,
          solt : 'idcard' ,
          width : 400
        },
        {
          value : '住址' ,
          solt : 'address' ,
          width : 400
        },
        {
          value : '紧急联系人' ,
          solt : 'urgent' ,
          width : 400
        },
        {
          value : '紧急联系电话' ,
          solt : 'urgent_phone' ,
          width : 400
        },
      ],
    ],
    data : [
      [
        {
          value : '张三' ,
          solt : 'name' ,
        },
        {
          value : '姓名' ,
          solt : 'name' ,
        },
      ],
      [
        {
          value : '张三' ,
          solt : 'name' ,
        },
        {
          value : '11' ,
          solt : 'name' ,
        },
      ]
    ]
  })
}
</script>
