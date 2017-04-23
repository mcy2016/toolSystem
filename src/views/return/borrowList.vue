<template>
  <div>
    <div class="line"></div>
    <!--还回人信息-->
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-input placeholder="员工号" v-model="this.$store.state.res.reUser.u_jn" :disabled="true">
          <template slot="prepend">员工号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="姓名" v-model="this.$store.state.res.reUser.u_name" :disabled="true">
          <template slot="prepend">姓名</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="部门" v-model="this.$store.state.res.reUser.u_department" :disabled="true">
          <template slot="prepend">部门</template>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="时间" v-model="date" :disabled="true">
          <template slot="prepend">时间</template>
        </el-input>
      </el-col>
    </el-row>
    <div class="line"></div>

    <!--借用工具信息表格-->
    <el-table v-if="tableShow"
              :data="this.$store.state.res.borrowTools"
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
        label="工具名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tl_pn"
        label="工具件号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="u_name"
        label="借用人"width="120">
      </el-table-column>
      <el-table-column
        prop="borrow_admin"
        label="借出管理员">
      </el-table-column>
      <el-table-column
        prop="tl_position"
        label="架位"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>


    <!--借用人信息输入框-->
    <el-dialog title="借用人工号" v-model="boJobNumber">
      <el-form :model="boInfo">
        <el-form-item label="借用人工号" :label-width="formLabelWidth">
          <el-input v-model="boInfo.jn" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="boJobNumber = false">取 消</el-button>
        <el-button type="primary" @click="getBoJn">确 定</el-button>
      </div>
    </el-dialog>


    <el-row type="flex" justify="space-around">
      <el-col :span="6">
        <el-button type="primary" :plain="true" class="mcy-marginRight mcy-margin-top10"
                   @click="boJobNumber = true">
          借用人
        </el-button>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" class="mcy-marginRight mcy-margin-top10" :disabled="isClient" @click="printOk">
          确认打印
        </el-button>
      </el-col>
    </el-row>
    <div class="line"></div>
  </div>
</template>

<script>
  import ApiConfig from './../../config/apiConfig';
  var _ = require('lodash');
  var debounce = require('lodash/debounce');
  import Vue from 'vue'
  import VueResource from 'vue-resource';
  import router from './../../router'
  Vue.use(VueResource);
  export default {
    name: 'returnScan',

    data() {
      return {
        tableShow: false,
        jobNumber: true,
        reJobNumber: false,//控制还回人信息弹出框
        boJobNumber: false,//控制借用人信息弹出框
        barCodeScaner: false,
        isClient: false,
        barCode: {bc: ''},
        reInfo: {
          jn: '' //还回人员工号
        },
        boInfo: {
          jn: '' //借用人员工号
        },
        borrowTools: [],
        pInfos: [],
        multipleSelection: [],//保存选择的复选框
        formLabelWidth: '120px',
        date: ''
      }

    },

    methods: {
      getJobNumber: function () {
        this.reJobNumber = false
      },
      getBarCode: function () {
        const tlBorrowList = {};//POST提交的数据对象
        //const uJn = []
        const tlBarcodeList = []
        //uJn.push(this.$store.state.res.user.u_jn)//获取store中的user里的u_jn
        for (var i = 0; i < this.$store.state.res.barcodeTools.length; i++) {
          tlBarcodeList.push(this.$store.state.res.barcodeTools[i].tl_barcode)//获得store中to_barcode集合
        }

        const tlBarcodes = tlBarcodeList.join(",")
        //console.log(tlBarcodes)
        tlBorrowList.isReturn = 0
        //tlBorrowList.borrowNo = '123123'
        tlBorrowList.date = this.date//组合成对象，用于Post提交
        tlBorrowList.uJn = this.$store.state.res.user.u_jn//组合成对象，用于Post提交
        //console.log(tlBorrowList.uJn)
        tlBorrowList.tlBarcodeList = tlBarcodes//组合成对象，用于Post提交
        if (!tlBarcodeList || tlBarcodeList == "") {
          this.openError('大哥，你要扫描条码啊！')
          return false
        }
        this.$http.post('http://www.toolsystem.net/index.php/admin/tool/insertborrow/',
          tlBorrowList, {emulateHTTP: true, emulateJSON: true}).then((res) => {
          //成功处理

          //this.openSucces($store.state.res.tlBorcode)
          this.isClient = true
          //console.log(res.body)
        }, res => {
          //错误处理
          this.isClient = false
          console.log(res.body.error)
        })

      },
      openSucces(str) {
        this.$message(str);
      },
      openError(str) {
        this.$message.error(str);
      },

      getBoJn(){
        //console.log(this.pInfo.jn)
        this.getJn()
        if (this.boInfo.jn == null | !this.boInfo.jn) this.boJobNumber = true
        this.$http.get('http://www.toolsystem.net/index.php/admin/borrow/getbouser', {
          params: {
            jobNumber: this.boInfo.jn
          }
        }).then(res => {
          if (res.body.code == 400) {
            this.boJobNumber = true
            this.boInfo.jn = ''
            this.openError(res.body.error)
            return
          }
          this.$store.state.res.borrowTools = res.body.data
//          console.log(res.body)
          console.log(this.$store.state.res.borrowTools)
          this.boJobNumber = false
          this.tableShow = true
          this.showBoUjn = true

        }, res => {
          console.log("ajax错误！")
        })
      },

      //确认打印
      printOk(){
        router.push({ path: '/printAgain' })
      },

      //还回选择按工具条码
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$store.state.res.handleSelectionChange=val
        console.log(this.multipleSelection)
      },
      getJn () {
        //console.log(this.pInfo.jn)
        if (this.boInfo.jn == null | !this.boInfo.jn) this.reJobNumber = false
        this.$http.get('http://www.toolsystem.net/index.php/admin/user/getbyujn', {
          params: {
            jobNumber: this.boInfo.jn
          }
        }).then(res => {
          if (res.body.code == 400) {
            this.boJobNumber = true
            this.boInfo.jn = ''
            this.openError(res.body.error)
            return
          }

          this.$store.state.res.reUser = res.body.data[0]//data[0]取这个数组的第一个元素
          //console.log(this.$store.state.res.user)
          this.date = new Date().toLocaleString()
          //console.log(this.date)
          //console.log(this.$store.state.res.reUser)
        }, res => {
          console.log("ajax错误！")
        })
      },
    },
    watch: {
      barCode: {
        handler: function (val, oldval) {
          if (val.bc == null | !val.bc) return
          this.get()
        },
        deep: true//深度观察
      },
      reInfo: {
        handler: function (val, oldval) {
          if (val.jn == null | !val.jn) return
          //console.log(val.jn)
          this.getJn()
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
  }

  .mcy-textCenter {
    text-align: center;
  }

  .mcy-marginLeft45 {
    margin-left: 45px;
  }

  .mcy-marginRight {
    margin-right: 45px;
  }

  .mcy-floatLeft {
    float: left;
  }

  .line {
    margin: 10px 0;
    height: 1px;
    background: #e0e6ed;
  }

  .mcy-fontSinz24 {
    font-size: large;
  }

  .mcy-marginBottom10 {
    margin-bottom: 10px;
  }

  .mcy-margin-top10 {
    margin-top: 10px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  /*去掉默认的横向滚动条*/
  .el-table__body-wrapper {
    overflow: hidden;
  }
</style>
