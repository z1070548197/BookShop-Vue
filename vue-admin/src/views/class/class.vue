<template>
  <div>
    <div class="addclass">
      <el-input v-model="addclassname" autocomplete="off"></el-input>
      <el-button type="primary" @click="ClassAdds">添加分类</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="分类名称" width="800">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <span>{{ scope.row.ClassName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="ClassRemoves(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分类编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.ClassName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ClassUpdates"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { Classfind, ClassRemove, ClassAdd, ClassUpdate } from "../../api/api";
export default {
  data() {
    return {
      addclassname: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "",
      },
      tableData: [
        {
          ClassName: "iphoneiphoneiphoneiphone",
        },
      ],
    };
  },
  created() {
    this.Classfinds();
  },
  methods: {
    handleEdit(index, row) {
      this.form = {...row};
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$delete(this.tableData, index);
    },
    Classfinds() {
      Classfind().then((res) => {
        this.tableData = res;
      });
    },
    ClassRemoves(e) {
      ClassRemove(e).then((res) => {
        if (res.onerror == 0) {
          this.Classfinds();
        }
        this.$message(res.msg);
      });
    },
    ClassAdds() {
      if (this.addclassname == "") {
        this.$message("分类名称不能为空");
        return;
      }
      ClassAdd({ ClassName: this.addclassname }).then((res) => {
        if (res.onerror == 0) {
          this.Classfinds();
          this.addclassname = "";
        }
        this.$message(res.msg);
      });
    },
    ClassUpdates() {
      ClassUpdate(this.form).then((res) => {
        if (res.onerror == 0) {
          this.Classfinds();
          this.dialogFormVisible = false;
        }
        this.$message(res.msg);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addclass {
  width: 300px;
  display: flex;
  margin: 20px;
}
</style>