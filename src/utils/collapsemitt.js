// src/utils/bus.js
import mitt from 'mitt'

// 创建 mitt 实例
const  collapseMitt = mitt()

// 导出实例（全局唯一）
export default collapseMitt
