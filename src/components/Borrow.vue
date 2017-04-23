<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-row :gutter="20">
        <el-col :span="4" class="mcy-noprint">
          <el-menu mode="vertical" default-active="activeIndex" class="el-menu-vertical-demo" theme="dark"
                   @select="handleOpen" router>
            <el-menu-item-group title="工具查询" class="mcy-menuTitle">
              <el-menu-item index="query" :route="{name:'query'}" class="mcy-menuItem"><i class="el-icon-message "></i>工具查询
              </el-menu-item>
              <!--<el-menu-item index="2" class="mcy-menuItem"><i class="el-icon-message"></i>工具件号</el-menu-item>-->
            </el-menu-item-group>
            <el-menu-item-group title="工具借出" class="mcy-menuTitle">
              <el-menu-item index="barcodeScan" :route="{name:'barcodeScan'}" class="mcy-menuItem"><i
                class="el-icon-message "></i>条码扫描
              </el-menu-item>
              <el-menu-item index="borrowList" :route="{name:'borrowList'}" class="mcy-menuItem"><i
                class="el-icon-message "></i>借单补打
              </el-menu-item>
              <el-menu-item index="borrowquery" class="mcy-menuItem"><i class="el-icon-message"></i>借出查询</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="工具归还" class="mcy-menuTitle">
              <el-menu-item index="returnScan" :route="{name:'returnScan'}" class="mcy-menuItem"><i
                class="el-icon-message"></i>工具还回
              </el-menu-item>
              <el-menu-item index="4" class="mcy-menuItem"><i class="el-icon-message"></i>预留功能</el-menu-item>
            </el-menu-item-group>
            <!--<el-menu-item-group title="个人中心" class="mcy-menuTitle">-->
            <!--&lt;!&ndash;<el-menu-item index="5" class="mcy-menuItem"><i class="el-icon-message"></i>密码修改</el-menu-item>-->
            <!--<el-menu-item index="6" class="mcy-menuItem"><i class="el-icon-message"></i>借用查询</el-menu-item>&ndash;&gt;-->
            <!--<el-menu-item index="7" class="mcy-menuItem"><i class="el-icon-message"></i>工号查询</el-menu-item>-->
            <!--</el-menu-item-group>-->
          </el-menu>
        </el-col>
        <el-col :span="20" class="mcy-bg11">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Borrow',
    data(){
      return {
        activeIndex: 'query'
      }
    },
    created() {
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      var tmpArr1 = this.$route.path.split('/')
      if(tmpArr1[1]=='borrow'){
        this.$router.push({path: '/borrow/query'})
        this.activeIndex='query'
      }
      this.handleOpen(tmpArr1[2])
      this.activeIndex=tmpArr1[2]
    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {
      '$route'(to, from) {
        const path = to.path
        var tmpArr1 = path.split('/')
        console.log(tmpArr1)
        this.handleOpen(tmpArr1[2])
      }
    },
    methods: {
      handleOpen(key) {
        //console.log(key, keyPath);
        this.activeIndex = key;
        this.$router.push({path: key})
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="">
  .el-menu-item.is-active {
    color: #20a0ff !important;
  }

  .mcy-bg11 {
    background-color: #318B69;
  }

  .mcy-menuTitle div {
    font-size: larger !important;
  }

  .mcy-menuItem {
    color: #fff !important;
  }
</style>
