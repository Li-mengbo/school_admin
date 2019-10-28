<template>
  <div class="index">
    <el-button type="primary" @click="handAddCenter">增加位置</el-button>
    <el-table
      :data="centerDatas.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="地点名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="center"
        label="地点位置">
      </el-table-column>   
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>         
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="dataLength"
      @current-change="handleCurrentChange"
      style="text-align: center;"
    >
  </el-pagination>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="地点名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="地点位置" prop="center">
        <el-input v-model="ruleForm.center"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handOk('ruleForm')">确 定</el-button>
    </div>
  </el-dialog> 
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
      data() {
        return {
          search: '',
          dialogFormVisible: false,
          title: '',
          ruleForm: {
            name: '',
            center: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入地点名称', trigger: 'blur' }
            ],
            center: [
              { required: true, message: '请输入地点位置', trigger: 'blur' }
            ]
          },
          type: '',
          page: 0
        }
      },
      computed: {
        ...mapGetters(['centerDatas', 'dataLength'])
      },
      created() {
        this.$store.dispatch('getCenterData', 1)
      },
      methods: {
        handleCurrentChange(val) {
          this.page = val
          this.$store.dispatch('getCenterData', val)
        },
        handAddCenter() {
          this.dialogFormVisible = true
          this.title = '增加位置'
          this.type = 'add'
        },
        handleEdit(index, row) {
          console.log(index, row);
          this.dialogFormVisible = true
          this.ruleForm = {
            id: row.id,
            name: row.name,
            center: row.center
          },
          this.title = '修改位置'
          this.type = 'set'
        },
        handleDelete(index, row) {
          console.log(index, row);
          const id = row.id
          const value = this.page
          this.$store.dispatch('delCenterData', { id,value })
        },
        handOk(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const form = this.ruleForm
              const value = this.page
              if (this.type === 'add') {
                this.$store.dispatch('addCenterData', { form,value })
              } else if (this.type === 'set') {
                this.$store.dispatch('setCentertData', { form,value })
              } 
              this.ruleForm = {
                name: '',
                center: ''
              },
              this.dialogFormVisible = false
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>
<style lang="less">
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
  }
</style>

