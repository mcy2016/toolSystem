<template>
  <div>
    <div class="line"></div>
    <!--借用人信息-->
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-input placeholder="员工号" v-model="this.$store.state.res.user.u_jn" :disabled="true">
          <template slot="prepend">员工号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="姓名" v-model="this.$store.state.res.user.u_name" :disabled="true">
          <template slot="prepend">姓名</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="部门" v-model="this.$store.state.res.user.u_department" :disabled="true">
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
              :data="this.$store.state.res.barcodeTools"
              style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="工具名称">
              <span>{{ props.row.tl_name }}</span>
            </el-form-item>
            <el-form-item label="工具件号">
              <span>{{ props.row.tl_pn }}</span>
            </el-form-item>
            <el-form-item label="条码号">
              <span>{{ props.row.tl_barcode }}</span>
            </el-form-item>
            <el-form-item label="架位">
              <span>{{ props.row.tl_position }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.tl_type }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.tl_status }}</span>
            </el-form-item>
            <el-form-item label="规格">
              <span>{{ props.row.tl_standard }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="条码"
        prop="tl_barcode">
      </el-table-column>
      <el-table-column
        label="工具名称"
        prop="tl_name">
      </el-table-column>
      <el-table-column
        label="件号"
        prop="tl_pn">
      </el-table-column>
      <el-table-column
        label="架位"
        prop="tl_position">
      </el-table-column>
    </el-table>

    <el-dialog title="借用人工号" v-model="jobNumber">
      <el-form :model="pInfo">
        <el-form-item label="借用人工号" :label-width="formLabelWidth">
          <el-input v-model="pInfo.jn" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="jobNumber = false">取 消</el-button>
        <el-button type="primary" @click="getJobNumber">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="工具条码扫描" v-model="barCodeScaner">
      <el-form :model="barCode">
        <el-form-item label="工具条码" :label-width="formLabelWidth">
          <el-input v-model="barCode.bc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="barCodeScaner = false">取 消</el-button>
        <el-button type="primary" @click="barCodeScaner = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-row type="flex" justify="space-around">
      <el-col :span="6">
        <el-button type="primary" :plain="true" class="mcy-marginRight mcy-margin-top10" @click="jobNumber=true">还回人</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :plain="true" class="mcy-marginRight mcy-margin-top10" @click="jobNumber=true">借用人</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :plain="true" class="mcy-marginRight mcy-margin-top10" @click="barCodeScaner=true">条码号</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :plain="true" class="mcy-marginRight mcy-margin-top10" @click="barCodeScaner=true">借单号</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" class="mcy-marginRight mcy-margin-top10" :disabled="isClient" @click="getBarCode">确认还回</el-button>
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
  Vue.use(VueResource);
  export default {
    name: 'returnScan',

    data() {
      return {
        tableShow: false,
        jobNumber: true,
        barCodeScaner: false,
        isClient:false,
        barCode: {bc: ''},
        pInfo: {
          jn: '' //员工号
        },
        pInfos: [],
        tools: [],
        formLabelWidth: '120px',
        date: ''
      }

    },

    methods: {
      getJobNumber: function () {
        this.jobNumber = false
        this.barCodeScaner = true
      },
      getBarCode: function () {

        const tlBorrowList = {};//POST提交的数据对象
        //const uJn = []
        const tlBarcodeList = []
        //uJn.push(this.$store.state.res.user.u_jn)//获取store中的user里的u_jn
        for (var i = 0; i < this.$store.state.res.barcodeTools.length; i++) {
          tlBarcodeList.push(this.$store.state.res.barcodeTools[i].tl_barcode)//获得store中to_barcode集合
        }

        const tlBarcodes=tlBarcodeList.join(",")
        //console.log(tlBarcodes)
        tlBorrowList.isReturn = 0
        //tlBorrowList.borrowNo = '123123'
        tlBorrowList.date=this.date//组合成对象，用于Post提交
        tlBorrowList.uJn = this.$store.state.res.user.u_jn//组合成对象，用于Post提交
        //console.log(tlBorrowList.uJn)
        tlBorrowList.tlBarcodeList = tlBarcodes//组合成对象，用于Post提交
        if(!tlBarcodeList||tlBarcodeList==""){
          this.openError('大哥，你要扫描条码啊！')
          return false
        }
        this.$http.post('http://www.toolsystem.net/admin/tool/insertborrow/',
          tlBorrowList, {emulateHTTP: true, emulateJSON: true}).then((res) => {
          //成功处理
          this.openSucces(res.body.data)
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

      get: _.debounce(function () {
        if (this.barCode.bc == null | !this.barCode.bc) return
        this.$http.get('http://www.toolsystem.net/admin/tool/gettoolbybd/', {
          params: {
            tiaoma: this.barCode.bc
          }
        }).then(response => {
          //根据返回的状态码判断 返回的data是否有值
          if (response.body.code == 400) {
            this.barCodeScaner = true
            this.barCode.bc = ''
            this.openError('错了哦，没有这个条形码或工具')
            return
          }
          console.log(response.body.data[0]['tl_status'])
          //判断工具状态 状态为1为正常
          if(response.body.data[0]['tl_status']=="-1"){
            this.barCodeScaner = true
            this.barCode.bc = ''
            this.openError('该工具R44借出中')
            return
          }
          if(response.body.data[0]['tl_status']=="0"){
            this.barCodeScaner = true
            this.barCode.bc = ''
            this.openError('该工具状态借出中')
            return
          }
          //console.log(response.body.data[0])
          this.tools.push(response.body.data[0])//把数据push到tools
          this.$store.state.res.barcodeTools = this.tools//把数据传到store中
          this.tableShow = true
          this.barCodeScaner = true
          this.barCode.bc = ''
          this.openSucces('扫描成功！请扫描下一件或点击确定')
          //console.log(this.tools)
        }, response => {
          console.log("ajax请求错误")
        });
      }, 1000),
      getJn: _.debounce(function () {
        //console.log(this.pInfo.jn)
        if (this.pInfo.jn | !this.pInfo.jn) this.jobNumber = false
        this.$http.get('http://www.toolsystem.net/admin/user/getbyujn', {
          params: {
            jobNumber: this.pInfo.jn
          }
        }).then(res => {
          if (res.body.code == 400) {
            this.jobNumber = true
            this.pInfo.jn = ''
            this.openError(res.body.error)
            return
          }
          this.pInfos.push(res.body.data)
          //console.log(res.body.data)
          this.$store.state.res.user = res.body.data[0]//data[0]取这个数组的第一个元素
          //console.log(this.$store.state.res.user)
          this.date = new Date().toLocaleString()
          //console.log(this.date)
          //console.log(this.$store.state.res.user)
          this.getJobNumber()
        }, res => {
          console.log("ajax错误！")
        })
      }, 1000),
      getBorrowList(){
//        var a=[{name:'王东',age:19},{name:'王西',age:20}]
//        var b = [{sex:'男',xifu:'无'}]
      }
    },
    watch: {
      barCode: {
        handler: function (val, oldval) {
          if (val.bc == null | !val.bc) return
          this.get()
        },
        deep: true//深度观察
      },
      pInfo: {
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
