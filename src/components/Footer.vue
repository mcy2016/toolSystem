<template>
  <div id="footer">
    <div class="footer">
      <el-menu theme="light" class="el-menu-demo navbar">
        <el-menu-item class="navbar-item" index="1">Copyright © 2017 XXXXXXXX. All rights reserved</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer'
  }
</script>

<style>
  #footer{
    width:100%;
    position:fixed;
    bottom:0px;
  }
  .footer {
    margin-top:10px;
  }
  .navbar {
    text-align: center;
  }
</style>
