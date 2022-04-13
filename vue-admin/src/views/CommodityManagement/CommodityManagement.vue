<template>
  <div>
    <el-button class="addshop" @click="AdddialogForm()">添加商品</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="商品名称" width="500">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="180">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.cover"
            style="width: 100px; height: 100px"
            :src="`${url}${scope.row.cover[0].url}`"
            :preview-src-list="scope.row.srcList"
          >
          </el-image>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品参数">
        <template slot-scope="scope">
          <span>{{ scope.row.parameter }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="商品内容">
        <template slot-scope="scope">
          <span v-html="scope.row.BriefIntroduction"></span>
        </template>
      </el-table-column> -->
      <div id="editor"></div>
      <el-table-column label="商品分类" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.classificationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格（元）" width="180">
        <template slot-scope="scope">
          {{ scope.row.money }}
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
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="商品编辑" :visible.sync="AdddialogFormVisible">
      <el-form :model="addform">
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            :on-remove="handleRemove"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="onchange"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="addform.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品参数" :label-width="formLabelWidth">
          <el-input v-model="form.parameter[0]" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="商品内容" :label-width="formLabelWidth">
          <!-- <el-input
            v-model="addform.BriefIntroduction"
            autocomplete="off"
          ></el-input> -->
        </el-form-item>
        <div id="editorA"></div>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select
            value-key="_id"
            v-model="tableDatas"
            placeholder="请选择"
            @change="tableDatass(1)"
          >
            <el-option
              v-for="item in Classlist"
              :key="item._id"
              :label="item.ClassName"
              :value="item"
            >
              {{ item.ClassName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input
            v-model="addform.money"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AdddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Shopadd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-image
            v-for="(item, index) in form.cover"
            :key="index"
            style="width: 100px; height: 100px"
            :src="`${url}${item.url}`"
            fit="cover"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品参数" :label-width="formLabelWidth">
          <el-input v-model="form.parameter[0]" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="商品内容" :label-width="formLabelWidth">
          <!-- <el-input
            v-model="form.BriefIntroduction"
            autocomplete="off"
          ></el-input> -->
          </el-form-item>
          <div id="editorE"></div>
        
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select
            value-key="_id"
            v-model="tableDatas"
            placeholder="请选择"
            @change="tableDatass(0)"
          >
            <el-option
              v-for="item in Classlist"
              :key="item._id"
              :label="item.ClassName"
              :value="item"
            >
              {{ item.ClassName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input
            v-model="form.money"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ShopUpdates()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import E from "wangeditor";
import { url } from "../../api/intercept";
import {
  Classfind,
  ShopFind,
  ShopRemove,
  ShopInsert,
  ShopUpdate,
} from "../../api/api";
var editor;
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      AdddialogFormVisible: false,
      //  formLabelWidth: "300px",
      dialogFormVisible: false,
      classs: [{ value: "文献" }, { value: "历史" }, { value: "科学" }],
      addform: {},
      form: {
        classification: [],
      },
      tableDatas: {
        ClassName: "",
        _id: "",
      },
      fileList: [],
      tableData: [],
      url: url,
      srcList: [],
      Classlist: [],
    };
  },
  created() {
    this.info();
  },
  mounted() {
    // this.editors();
  },
  methods: {
    info() {
      this.ShopFinds();
      this.Classfinds();
    },
    AdddialogForm() {
      this.AdddialogFormVisible = true;
      this.$nextTick(() => {
        editor = new E("#editorA");
        this.editors();
      });
    },
    //编辑器设置
    editors(e) {
      
      editor.config.uploadImgShowBase64=true;
     // editor.config.showLinkImg = false;
     // editor.config.uploadImgServer = `${url}updateCoverImageByMenuId`; // 上传图片的接口地址
      //editor.config.uploadFileName = "file"; // formdata中的name属性
      editor.config.debug = true; // 开启debug模式
      editor.config.uploadImgHeaders = {
        // 设置请求头
      };
      // editor.config.uploadImgParams = {
      //   coverId: this.coverId.coverId,
      //   imageUrlSource: '',
      //   menuId: this.coverId.menuId,
      // }
      // editor.config.uploadImgHooks = {
      //   // 图片上传并返回结果，但图片插入错误时触发
      //   fail: function (xhr, editor, result) {
      //     this.$message("图片上传失败");
      //   },
      //   success: function (xhr, editor, result) {},
      //   customInsert: (insertImg, result, editor) => {
      //     let url = [result.url];
      //     insertImg(url);
      //     this.$message("图片上传成功");
      //   },
      // };
      // 设置编辑区域高度为 500px
      //  editor.config.height = 700;
      editor.create();
      if (e) {
        editor.txt.html(this.form.BriefIntroduction);
      }
    },
    onchange(e, ee) {
      for (let v in ee) {
        this.fileList[v] = ee[v];
      }
    },
    Shopadd() {
      this.addform.BriefIntroduction=editor.txt.html()
      var r = /^[0-9]*[1-9][0-9]*$/;
      if (r.test(this.addform.money)) {
        this.addform.money = `${this.addform.money}.00`;
      }
      let formdatas = new FormData();
      for (let v in this.fileList) {
        formdatas.append("files", this.fileList[v].raw);
      }
      for (let v in this.addform) {
        formdatas.append([v], this.addform[v]);
      }
      ShopInsert(formdatas).then((res) => {
        if (res.onerror == 0) {
          this.ShopFinds();
          this.AdddialogFormVisible = false;
        }
        this.$message(res.msg);
      });
    },
    handleRemove(file) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    tableDatass(e) {
      if (e == 0) {
        this.form.classificationId = this.tableDatas._id;
        this.form.classificationName = this.tableDatas.ClassName;
      }
      if (e == 1) {
        this.addform.classificationId = this.tableDatas._id;
        this.addform.classificationName = this.tableDatas.ClassName;
      }
    },
    handleEdit(index, row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        editor = new E("#editorE");
        this.editors(true);
      })
    },
    handleCommand(e) {
      console.log(e);
    },
    ShopUpdates() {
      this.form.BriefIntroduction=editor.txt.html()
      var r = /^[0-9]*[1-9][0-9]*$/;
      if (r.test(this.form.money)) {
        this.form.money = `${this.form.money}.00`;
      }
      let FormDatas = new FormData();
      for (let v in this.form) {
        FormDatas.append([v], this.form[v]);
      }

      ShopUpdate(FormDatas).then((res) => {
        if (res.onerror == 0) {
          this.ShopFinds();
          this.dialogFormVisible = false;
        }
        this.$message(res.msg);
      });
    },
    handleDelete(index, row) {
      ShopRemove(row).then((res) => {
        if (res.onerror == 0) {
          this.ShopFinds();
        }
        this.$message(res.msg);
      });
    },
    Classfinds() {
      Classfind().then((res) => {
        this.Classlist = res;
      });
    },
    ShopFinds() {
      ShopFind().then((res) => {
        this.tableData = res;
        for (let v in res) {
          res[v].srcList = [];
          for (let l in res[v].cover) {
            res[v].srcList.push(`${url}${res[v].cover[l].url}`);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-avatar > img {
    width: 100%;
    height: auto;
  }
}
.addshop {
  color: #fff;
  background-color: rgb(6, 198, 247);
  margin: 20px;
}
</style>