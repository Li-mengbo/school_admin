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
    <div v-if="value == 0">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        >
        <el-table-column
          label="id"
          prop="id">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="说明"
          prop="description">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
            >编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="value == 1">
      <el-table
        :data="centerdata"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        >
        <el-table-column
          label="id"
          prop="id">
        </el-table-column>
        <el-table-column
          label="活动类型"
          prop="type">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit1(scope.$index, scope.row)"
              icon="el-icon-edit"
            >编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <el-form :model="form0" ref="ruleForm">
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form0.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="description" :label-width="formLabelWidth">
          <el-input v-model="form0.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTable('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible1"
      width="50%"
      center>
      <el-form :model="form1" ref="ruleForm">
        <el-form-item label="地点名字">
          <el-select v-model="form1.title" placeholder="地点名字">
            <el-option
              v-for="item in centerList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点位置">
          <el-select v-model="form1.center" placeholder="地点位置">
            <el-option
              v-for="item in centerList"
              :key="item.id"
              :label="item.name"
              :value="item.center">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form1.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="center" :label-width="formLabelWidth">
          <el-input v-model="form1.center" autocomplete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="setTable1('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//
  import { companyList, setCompanyList, addCompanyList, getCenterList } from '../../api/nav1.js';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        options: [{
          value: '0',
          label: '修改内容'
        }, {
          value: '1',
          label: '修改位置'
        }],
        value: '',
        dialogVisible: false,
        dialogVisible1: false,
        form0: {
          title: '',
          description: ''
        },
        form1: {
          title: '',
          center: ''
        },
        formLabelWidth: '120px',
        setIndex: '',
        title: '',
        type: '',
        type1: '',
        centerList: []
      }
    },
    computed: {
      ...mapGetters({
        tableData: 'contentdata',
        centerdata: 'centerdata'
      })
    },
    created () {
      getCenterList().then(res => {
        if(res.code == 200) {
          this.centerList = res.data;
        }
      }).catch(reeor => {
        console.log(error)
      })
    },
    methods: {
      //选择下拉框
      selectVal() {
        const value = this.value;
        this.$store.dispatch('getCompanyList', {value})
      },
      handleEdit(index, row) {
        console.log(11111, row)
        this.dialogVisible = true;
        // this.setIndex = index;
        this.form0 = {
          title: row.title,
          description: row.description
        }
        this.form0.id = row.id;
        this.title = '编辑';
        this.type = 'set';
        console.log(index, row);
      },
      handleEdit1(index, row) {
        console.log(row)
        this.dialogVisible1 = true;
        // this.setIndex = index;
        this.form1 = {
          title: row.title,
          center: row.center
        }
        this.form1.id = row.id;
        this.title = '编辑';
        this.type1 = 'set';
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      setTable(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const form = this.form0;
            const value = this.value;
            if(this.type == 'add') {
              this.$store.dispatch('addCompanyList', form)
            }else {
              console.log(form)
              // const index = this.setIndex;
              this.$store.dispatch('setContent', {form, value})
            }
            this.dialogVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      setTable1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const form = this.form1;
            const value = this.value;
            console.log(form)
            if(this.type1 == 'add') {
              this.$store.dispatch('addCompanyList', form)
            }else {
              // const index = this.setIndex;
              this.$store.dispatch('setCenter', {form, value})
            }
            this.dialogVisible1 = false;
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
    }
  }
</script>

<style lang="less">
  .select-box {
    margin: 10px;
  }
</style>
