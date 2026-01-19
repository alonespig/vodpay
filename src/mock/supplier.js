import Mock from 'mockjs'

// 拦截 /api/user/list 请求，模拟返回数据
Mock.mock('/api/supplier', 'get', {
  // mock 语法：生成随机数据
  'code': 200,
  'msg': 'success',
  'data|5-10': [ // 生成 5-10 条数据
    {
      'id|+1': 1, // id 自增（从 1 开始）
      'name': '@cname', // 随机中文姓名
      'age|18-60': 1, // 随机年龄（18-60）
      'email': '@email' // 随机邮箱
    }
  ]
})
