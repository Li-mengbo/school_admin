<template>
  <div>
     <!-- <el-button type="primary" @click="addEdit">增加</el-button> -->
    <div class="select-box">
      <el-select v-model="value" placeholder="请选择" @change="selectVal">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
      <el-table-column
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth" :rules="{required: true, message: '姓名不能为空'}">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTable('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { companyList, setCompanyList, addCompanyList } from '../../api/nav1.js';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        options: [{
          value: '0',
          label: '活动查询'
        }, {
          value: '1',
          label: '校庆专题'
        }, {
          value: '2',
          label: '迎新专题'
        }],
        value: '',
        dialogVisible: false,
        form: {
          name: '',
          status:'DEL'
        },
        formLabelWidth: '120px',
        setIndex: '',
        title: '',
        type: ''
      }
    },
    computed: {
      ...mapGetters({
        tableData: 'data'
      })
    },
    methods: {
      //选择下拉框
      selectVal() {
        const value = this.value;
        this.$store.dispatch('getCompanyList', {value})
      },
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.setIndex = index;
        this.form.id = row.id;
        this.title = '编辑';
        this.type = 'set';
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      setTable(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form)
            const form = this.form;
            if(this.type == 'add') {
              this.$store.dispatch('addCompanyList', form)
            }else {
              const index = this.setIndex;
              this.$store.dispatch('setCompanyList', {form, index})
            }
            this.dialogVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addEdit() {
        this.dialogVisible = true;
        this.title = '增加';
        this.type = 'add';
      }
    },
    created () {
      // this.$store.dispatch('getCompanyList')
    }
  }
</script>

<style lang="less">
  .select-box {
    margin: 10px;
  }
</style>

