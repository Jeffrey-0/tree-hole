<template>
  <div id=''>
      <!-- 计划模态框 -->
    <el-dialog title="修改目标" :visible.sync="dialogFormVisible" id="updatePlan">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">
              <el-popover
                placement="left"
                width="400"
                trigger="click"
                v-model="iconsVisible"
                >
                <div id="icons">
                  <el-button v-for="item in icons" :key="item" @click="chanceIcon(item)">
                    <i :class="item"></i>
                  </el-button>
                </div>
                <el-button slot="reference"><i class="icon" :class="form.icon"></i></el-button>
              </el-popover>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.times"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.times"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="重复方式">
          <el-checkbox-group v-model="form.days">
            <el-checkbox label="周一"></el-checkbox>
            <el-checkbox label="周二"></el-checkbox>
            <el-checkbox label="周三"></el-checkbox>
            <el-checkbox label="周四"></el-checkbox>
            <el-checkbox label="周五"></el-checkbox>
            <el-checkbox label="周六"></el-checkbox>
            <el-checkbox label="周日"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditDialog',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created() {
  }
}
</script>

<style scoped lang='scss'>

</style>
