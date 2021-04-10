// 自定义公用方法

import {selectReportById, showAllReportByPage, deleteReportById, insertReport, updateReportById} from '@/network/report'

export default {
  // 举报
  report: function (vue, contentId, userId, type) {
    console.log('调用举报', vue)
    vue.$prompt('请输入备注', '举报', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.{5,100}/,
      inputErrorMessage: '备注不能少于5个字符或超过100个字符'
    }).then(({ value }) => {
      let report = {
        contentId,
        userId,
        type,
        createTime: new Date(),
        note: value
      }
      insertReport(report).then(res => {
        if (res) {
          vue.$message.success('举报成功')
        } else {
          vue.$message.error('举报失败')
        }
      })
    }).catch(() => {})
  }
}