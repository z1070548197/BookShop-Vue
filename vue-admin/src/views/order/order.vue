<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="订单id" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户id" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品" width="180">
        <template slot-scope="scope">
          <div class="imgbox">
            <div v-for="(item, index) in scope.row.ShopList" :key="index">
              <img class="shoplists__img" :src="item.srcList[0]" alt="" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="180">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.OrderState ? 'success' : 'warning'"
            disable-transitions
            >{{ scope.row.OrderState ? "已支付" : "未支付" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="下单日期">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <span>{{ scope.row.SubmitTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款日期">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <span>{{ scope.row.PaymentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <span>{{ scope.row.Money }}</span>
        </template>
      </el-table-column>
            <el-table-column label="用户信息">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <span>{{ scope.row.Money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看买家信息</el-button
          >
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="订单编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="买家地址" :label-width="formLabelWidth">
         {{form.address}}
        </el-form-item>
 <el-form-item label="买家姓名" :label-width="formLabelWidth">
         {{form.name}}
        </el-form-item>
         <el-form-item label="买家电话" :label-width="formLabelWidth">
         {{form.tel}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { FindOrder } from "../../api/api";
export default {
  data() {
    return {
      state: ["已支付", "未支付"],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "",
        tag: "",
        time: "",
      },
      tableData: [
        {
          name: "iphoneiphoneiphoneiphone",
          tag: "已支付",
          time: new Date(2001, 12, 29, 12, 10, 1, 2),
        },
        {
          name: "i夫妇撒分",
          tag: "已支付",
          time: new Date(2001, 12, 29, 12, 10, 1, 2),
        },
        {
          name: "范德萨范德萨发",
          tag: "未支付",
          time: new Date(2001, 12, 29, 12, 10, 1, 2),
        },
      ],
    };
  },
  created() {
    this.FindOrders();
  },
  methods: {
    FindOrders() {
      FindOrder().then((res) => {
        this.tableData = res;
      });
    },
    ok() {
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.form = row.UserFromInfo;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$delete(this.tableData, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.shoplists__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.imgbox {
  display: flex;
  overflow: auto;
  div {
    margin-right: 3px;
  }
}
</style>