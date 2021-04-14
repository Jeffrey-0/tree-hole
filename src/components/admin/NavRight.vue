<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapse"
          background-color="#fff"
          text-color="#2f2f2f"
          active-text-color="#409EFF"
        >
          <el-menu-item index="1" @click="addTag('首页', 'el-icon-house')">
            <i class="el-icon-view"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item
            index="2"
            @click="addTag('用户管理', 'el-icon-user', 'user')"
          >
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item
            index="3"
            @click="addTag('秘密管理', 'el-icon-edit', 'secret')"
          >
            <i class="el-icon-edit"></i>
            <span slot="title">秘密管理</span>
          </el-menu-item>
          <el-menu-item
            index="4"
            @click="addTag('计划管理', 'el-icon-document-checked', 'plan')"
          >
            <i class="el-icon-document-checked"></i>
            <span slot="title">计划管理</span>
          </el-menu-item>
          <el-menu-item
            index="5"
            @click="addTag('相册管理', 'el-icon-picture-outline', 'album')"
          >
            <i class="el-icon-picture-outline"></i>
            <span slot="title">相册管理</span>
          </el-menu-item>
          <el-menu-item
            index="6"
            @click="addTag('好友管理', 'el-icon-s-custom', 'relation')"
          >
            <i class="el-icon-s-custom"></i>
            <span slot="title">好友管理</span>
          </el-menu-item>
          <el-menu-item
            index="7"
            @click="addTag('聊天管理', 'el-icon-chat-line-round', 'chat')"
          >
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">聊天管理</span>
          </el-menu-item>
          <!-- <el-menu-item
            index="8"
            @click="addTag('公告管理', 'el-icon-reading', 'notice')"
          >
            <i class="el-icon-bell"></i>
            <span slot="title">设置管理</span>
          </el-menu-item> -->
          <el-menu-item
            index="8"
            @click="addTag('举报管理', 'el-icon-warning-outline', 'report')"
          >
            <i class="el-icon-bell"></i>
            <span slot="title">举报管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "NavRight",
  data() {
    return {
      collapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isCollapse() {
      this.collapse = !this.collapse;
    },
    addTag(val, two, path) {
      this.$eventBusTag.$emit("eventBusName", val, path);
      this.$eventBusiIcon.$emit("eventBusName", val, two, path);
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", () => {
      this.isCollapse();
    });
  },
};
</script>


<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  text-align: left;
  /* background-color: #324157; */
  background-color: #fff;
  overflow-y: scroll;
  border-top: 1px solid #f0f0f0;
}

.sidebar .el-menu-vertical-demo {
  border: hidden;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
