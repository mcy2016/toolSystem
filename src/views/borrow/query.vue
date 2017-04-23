<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="mcy-margin-top10"></div>
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="查询方式">
            <el-select v-model="query.queryMethod" placeholder="请选择查询方式">
              <el-option v-for="option in query.queryOption" v-bind:value="option.value" :label="option.text"
                         :key="option.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="query.queryMethod=='byname'" label="工具名称：">
            <el-input v-model="query.keywords" placeholder="请输入工具名称"></el-input>
          </el-form-item>
          <el-form-item v-if="query.queryMethod=='bypn'" label="工具件号：">
            <el-input v-model="query.keywords" placeholder="请输入工具件号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(query)">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="this.$store.state.res.allTools"
                  style="width: 100%">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="工具名称：">
                  <span>{{ props.row.tl_name }}</span>
                </el-form-item>
                <el-form-item label="工具件号：">
                  <span>{{ props.row.tl_pn }}</span>
                </el-form-item>
                <el-form-item label="工具类型：">
                  <span>{{ props.row.tl_type }}</span>
                </el-form-item>
                <el-form-item label="工具规格：">
                  <span>{{ props.row.tl_standard }}</span>
                </el-form-item>
                <el-form-item label="工具描述：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="工具图片：">
                  <span>待开发···</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="工具条码"
            prop="tl_barcode">
          </el-table-column>
          <el-table-column
            label="工具名称"
            prop="tl_name">
          </el-table-column>
          <el-table-column
            label="架位"
            prop="tl_position">
          </el-table-column>
          <el-table-column
            label="操作"
            prop="tl_status">
            <template scope="scope">
              <el-button v-if="scope.row.tl_status==1" type="success">借</el-button>
              <el-button v-else-if="scope.row.tl_status==0" :plain="true" type="success">还</el-button>
              <el-button v-else-if="scope.row.tl_status==-1" :plain="true" type="danger" disabled>禁</el-button>
              <el-button v-else :plain="true" type="danger" disabled>禁</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="状态" prop="tl_status"
            :filters="[{ text: '正常', value: 1 }, { text: '借出中', value: 0 },{ text: '损坏', value: -1 }]"
            :filter-method="filterTag">
            <template scope="scope">
              <el-button :type="scope.row.tl_status == 1 ? 'primary' : 'danger'"
                         close-transition v-if="scope.row.tl_status == 1">正常
              </el-button>
              <el-button :type="scope.row.tl_status == 1 ? 'primary' : 'danger'"
                         close-transition v-else-if="scope.row.tl_status == 0">借出中
              </el-button>
              <el-button :type="scope.row.tl_status == 1 ? 'primary' : 'danger'"
                         close-transition v-else-if="scope.row.tl_status == -1">损坏
              </el-button>
              <el-button :type="scope.row.tl_status == 1 ? 'primary' : 'danger'"
                         close-transition v-else>无中生有
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-bottom:15px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ApiConfig from './../../config/apiConfig';
  var debounce = require('lodash/debounce');
  import Vue from 'vue'
  import VueResource from 'vue-resource';
  Vue.use(VueResource);
  export default {
    name: 'Index',
    created(){
      this.$store.dispatch("loadData", {url: ApiConfig.API_tools, key: "allTools"})
      //console.log(this.$store.state.res.allTools)
    },
    data() {
      return {
        query: {
          keywords: '',
          queryMethod: 'byname',
          queryOption: [
            {text: '名称查询', value: 'byname'},
            {text: '件号查询', value: 'bypn'}
          ]
        }
      }
    },
    methods: {
      //根据件号或者名称查询工具
      onSubmit(query) {
        var params = {}
        params.queryMethod = query.queryMethod
        params.keywords = query.keywords
        if (params.keywords == null) {
          this.$store.dispatch("loadData", {url: ApiConfig.API_tools, key: "allTools"})
        }
        this.$store.dispatch("loadData", {url: ApiConfig.API_getbyname, key: "allTools", param: params})
        //console.log(this.$store.state.res.allTools)
      },
      filterTag(value, row){
        return row.tl_status == value;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .mcy-margin-top10 {
    margin-top: 10px;
  }
  .el-table__body-wrapper {
    overflow: hidden;
  }
</style>
