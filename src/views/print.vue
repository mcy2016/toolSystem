<template>
  <div id="brrowListPrint" class="printContent">
    <h1 style="text-align:center;">Ameco北京飞机维修工程有限公司贵阳分公司零散工具清单</h1>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="7">
        <div style="height: 80px;text-align: center"><img id="jsBarcode"/></div>
      </el-col>
      <el-col :span="4" style="padding-top:20px">
        <el-input placeholder="员工号" v-model="this.$store.state.res.user.u_jn" :disabled="true">
          <template slot="prepend">员工号</template>
        </el-input>
      </el-col>
      <el-col :span="4" style="padding-top:20px">
        <el-input placeholder="姓名" v-model="this.$store.state.res.user.u_name" :disabled="true">
          <template slot="prepend">姓名</template>
        </el-input>
      </el-col>
      <el-col :span="4" style="padding-top:20px">
        <el-input placeholder="部门" v-model="this.$store.state.res.user.u_department" :disabled="true">
          <template slot="prepend">部门</template>
        </el-input>
      </el-col>
      <el-col :span="5" style="padding-top:20px">
        <el-input placeholder="时间" v-model="date" :disabled="true">
          <template slot="prepend">时间</template>
        </el-input>
      </el-col>
    </el-row>
    <div class="line"></div>
    <el-table
      :data="this.$store.state.res.barcodeTools"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="工具条码"
        width="120">
        <template scope="scope">{{ scope.row.tl_barcode }}</template>
      </el-table-column>
      <el-table-column
        prop="tl_name"
        label="工具名称" width="200">
      </el-table-column>
      <el-table-column
        prop="tl_pn"
        label="件号" width="200">
      </el-table-column>
      <el-table-column
        prop="tl_position"
        label="架位" show-overflow-tooltip>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import ApiConfig from './../config/apiConfig';
  var _ = require('lodash');
  var debounce = require('lodash/debounce');
  var JsBarcode = require('jsbarcode');
  //var Canvas = require("canvas");
  import Vue from 'vue'
  import VueResource from 'vue-resource';
  import router from './../router'
  Vue.use(VueResource);
  export default {
    name: 'print',
    created(){
      this.getBarcode()
      this.printBorcodeList()

    },
    data() {
      return {
        multipleSelection: [],//保存选择的复选框
        date: new Date().toLocaleString(),
        tlBarcode:'0000'//得到借单号this.$store.state.res.tlBorcode
      }
    },
    methods: {

      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      getBarcode: _.debounce(function () {
        var barcode = document.getElementById('jsBarcode'),
          options = {
            format: "CODE128",
            displayValue: true,
            lineColor: "#0aa",
            fontSize: 18,
            height: 60
          };
        JsBarcode("#jsBarcode", this.$store.state.res.tlBorcode, options);//原生
      }, 1000),
      printBorcodeList: _.debounce(function () {

        window.print();
        this.$store.state.res.user = []
        this.$store.state.res.barcodeTools = []
        router.push({name: 'query'})
      }, 4000),

    }
  }
</script>

<style>
  @media print {
    h1 {
      color: #000;
      background: none;
    }

    nav, aside {
      display: none;
    }

    body, article {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    @page {
      size: A4 landscape;
      margin: 2cm;
    }

    @page :left {
      margin-left: 0.2cm;
    }

    @page :right {
      margin-left: 0.5cm;
    }

    .mcy-noprint {
      visibility: hidden;
      width: 100%
    }

    .el-table__body-wrapper {
      overflow: hidden;
    }
  }
</style>
