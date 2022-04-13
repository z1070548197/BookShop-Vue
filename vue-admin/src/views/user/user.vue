<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户密码(加密)">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="removes(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updates()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { find,remove,update } from "../../api/api";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "狗蛋",
        phone: "1000",
        password: "213",
      },
      tableData: [ ],
    };
  },
  created(){
    this.finds()
  },
  methods: {
    finds() {
      find().then((res) => {
        this.tableData = res;
      });
    },
    removes(index,row){
      remove({_id:row._id}).then((res)=>{
        if(res.onerror==0){
            this.finds() 
        }
          this.$message(res.msg);
      })
    },
    updates(){
      update(this.form).then(res=>{
          if(res.onerror==0){
            this.$message(res.msg)
            this.dialogFormVisible = false
            this.finds() 
          }
      })
    },
    handleEdit(index, row) {
      this.form = {...row};
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$delete(this.tableData, index);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>