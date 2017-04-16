<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" theme="dark" router>
            <el-menu-item-group title="工具查询" class="mcy-menuTitle">
              <el-menu-item index="query" :route="{name:'query'}" class="mcy-menuItem"><i class="el-icon-message "></i>工具查询
              </el-menu-item>
              <!--<el-menu-item index="2" class="mcy-menuItem"><i class="el-icon-message"></i>工具件号</el-menu-item>-->
            </el-menu-item-group>
            <el-menu-item-group title="工具借出" class="mcy-menuTitle">
              <el-menu-item index="barcodeScan" :route="{name:'barcodeScan'}" class="mcy-menuItem"><i
                class="el-icon-message "></i>条码扫描
              </el-menu-item>
              <el-menu-item index="barcodeScan" :route="{name:'barcodeScan'}" class="mcy-menuItem"><i
                class="el-icon-message "></i>借单补打
              </el-menu-item>
              <el-menu-item index="borrowquery" class="mcy-menuItem"><i class="el-icon-message"></i>借出查询</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="工具归还" class="mcy-menuTitle">
              <el-menu-item index="returnScan" :route="{name:'returnScan'}" class="mcy-menuItem"><i class="el-icon-message"></i>条码扫描</el-menu-item>
              <el-menu-item index="4" class="mcy-menuItem"><i class="el-icon-message"></i>预留功能</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="个人中心" class="mcy-menuTitle">
              <!--<el-menu-item index="5" class="mcy-menuItem"><i class="el-icon-message"></i>密码修改</el-menu-item>
              <el-menu-item index="6" class="mcy-menuItem"><i class="el-icon-message"></i>借用查询</el-menu-item>-->
              <el-menu-item index="7" class="mcy-menuItem"><i class="el-icon-message"></i>工号查询</el-menu-item>
            </el-menu-item-group>
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
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="">
  .mcy-bg11 {
    background-color: #408080;
  }
  .mcy-menuTitle div{
    font-size: larger !important;
  }
</style>
