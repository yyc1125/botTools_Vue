<template>
  <div class="billings-container" style="padding:20px">
    <el-button type="primary" round @click="viewAdd = true">添加账单</el-button>
    <el-button round @click="viewImport = true">导入账单</el-button>
    <el-button round @click="handleExport">导出账单</el-button>
    <el-button type="danger" round style="float:right;margin-right:70px" @click="removeRows">批量删除</el-button>
    <el-button type="warning" round style="float:right" @click="showBatchEdit">批量修改</el-button>
    <!-- 添加账单窗口 -->
    <el-dialog :visible.sync="viewAdd" title="添加账单" width="35%">
      <el-form ref="addData" :model="addData" label-width="80px">
        <el-form-item label="账单名称">
          <el-input v-model="addData.profileName" />
        </el-form-item>
        <el-form-item label="首姓名">
          <el-input v-model="addData.fname" />
        </el-form-item>
        <el-form-item label="尾姓名">
          <el-input v-model="addData.lname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addData.email" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addData.phone" />
        </el-form-item>
        <el-form-item label="地址一">
          <el-input v-model="addData.address1" />
        </el-form-item>
        <el-form-item label="地址二">
          <el-input v-model="addData.address2" />
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="addData.zip" />
        </el-form-item>
        <el-form-item label="州">
          <el-select v-model="addData.state" filterable placeholder="请选择州">
            <el-option
              v-for="item in stateList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="addData.country" placeholder="请选择国家" @change="changeCountry($event)">
            <el-option label="US" value="US" />
            <el-option label="CA" value="CA" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="addProfileSubmit">添加账单</el-button>
          <el-button @click="viewAdd = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改账单窗口 -->
    <el-dialog :visible.sync="viewEdit" title="修改账单" width="35%">
      <el-form ref="editData" :model="editData" label-width="80px">
        <el-form-item label="账单名称">
          <el-input v-model="editData.profileName" />
        </el-form-item>
        <el-form-item label="首姓名">
          <el-input v-model="editData.fname" />
        </el-form-item>
        <el-form-item label="尾姓名">
          <el-input v-model="editData.lname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editData.email" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editData.phone" />
        </el-form-item>
        <el-form-item label="地址一">
          <el-input v-model="editData.address1" />
        </el-form-item>
        <el-form-item label="地址二">
          <el-input v-model="editData.address2" />
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="editData.zip" />
        </el-form-item>
        <el-form-item label="州">
          <el-select v-model="editData.state" placeholder="请选择州">
            <el-option
              v-for="item in stateList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="editData.country" placeholder="请选择国家" @change="changeCountry($event)">
            <el-option label="US" value="US" />
            <el-option label="CA" value="CA" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox label="修饰电话号码" border />
            <el-checkbox label="修饰邮箱" border />
            <el-checkbox label="修饰地址" border />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="updateProfileSubmit">修改账单</el-button>
          <el-button @click="viewEdit = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 批量修改账单窗口 -->
    <el-dialog :visible.sync="viewBatchEdit" title="批量修改账单" width="35%">
      <el-form ref="batchEditData" :model="batchEditData" label-width="80px">
        <el-form-item label="账单名称">
          <el-input v-model="batchEditData.profileName" />
        </el-form-item>
        <el-form-item label="首姓名">
          <el-input v-model="batchEditData.fname" />
        </el-form-item>
        <el-form-item label="尾姓名">
          <el-input v-model="batchEditData.lname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="batchEditData.email" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="batchEditData.phone" />
        </el-form-item>
        <el-form-item label="地址一">
          <el-input v-model="batchEditData.address1" />
        </el-form-item>
        <el-form-item label="地址二">
          <el-input v-model="batchEditData.address2" />
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="batchEditData.zip" />
        </el-form-item>
        <el-form-item label="州">
          <el-select v-model="batchEditData.state" placeholder="请选择州">
            <el-option label="DE" value="DE" />
            <el-option label="NJ" value="NJ" />
          </el-select>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="batchEditData.country" placeholder="请选择国家">
            <el-option label="US" value="US" />
            <el-option label="CA" value="CA" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox label="修饰电话号码" border />
            <el-checkbox label="修饰邮箱" border />
            <el-checkbox label="修饰地址" border />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="UpdateRows">批量修改账单</el-button>
          <el-button @click="viewBatchEdit = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 账单页面展示 -->
    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="profileName" label="账单名称" />
      <el-table-column prop="fname" label="首姓名" />
      <el-table-column prop="lname" label="尾姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="address1" label="地址一" />
      <el-table-column prop="address2" label="地址二" />
      <el-table-column prop="zip" label="邮编" />
      <el-table-column prop="state" label="州" />
      <el-table-column prop="country" label="国家" />
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{row}">
          <!-- <el-button
            icon="el-icon-document"
            type="text"
            @click="showDetail(row)"
          >详情
          </el-button> -->
          <el-button
            icon="el-icon-edit"
            type="text"
            @click="showEdit(row)"
          >修改
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 导入页面展示 -->
    <el-dialog
      title="导入账单"
      :visible.sync="viewImport"
      width="40%"
      :show-close="false"
    >
      <el-form
        label-width="300px"
        label-position="right"
      >
        <el-row>
          <el-col>
            <el-form-item>
              <el-upload
                ref="uploadAdd"
                style="display:inline-block;padding:20px;"
                :limit="1"
                class="upload-demo"
                action="string"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" plain>选取文件</el-button>
                <el-button
                  style="margin-left: 10px;"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUploadAdd"
                >上传
                </el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
      </el-form>
    </el-dialog>
    <el-pagination
      style="padding: 30px 0;text-align:center"
      :page-sizes="[10, 15, 20]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      />

    </el-pagination>
  </div>
</template>

<script>
import { addProfile, deleteProfileById, selectAllProfile, selectProfileById, updateProfile, batchDeleteProfile, batchUpdateProfile, exportProfile, importProfile } from '@/api/billing'
export default {
  name: 'Billing',
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 1000,
      caState: ['AB', 'CY'],
      usState: ['DE', 'NJ'],
      stateList: [],
      checkboxGroup: [],
      addData: {
        profileName: 'yyc',
        fname: 'yan',
        lname: 'yichen',
        email: '123@qq.com',
        phone: '123456',
        address1: 'gulou',
        address2: 'baoli',
        zip: '18901',
        state: 'DE',
        country: 'US',
        cardNumber: '4444444444444444',
        cardName: 'yyc',
        cardExp: '12/24'
      },
      editData: {
        profileName: 'yyc',
        fname: 'yan',
        lname: 'yichen',
        email: '123@qq.com',
        phone: '123456',
        address1: 'gulou',
        address2: 'baoli',
        zip: '18901',
        state: 'DE',
        country: 'US',
        cardNumber: '4444444444444444',
        cardName: 'yyc',
        cardExp: '12/24'
      },
      batchEditData: {
        profileName: 'yyc',
        fname: 'yan',
        lname: 'yichen',
        email: '123@qq.com',
        phone: '123456',
        address1: 'gulou',
        address2: 'baoli',
        zip: '18901',
        state: 'DE',
        country: 'US',
        cardNumber: '4444444444444444',
        cardName: 'yyc',
        cardExp: '12/24'
      },
      tableData: [],
      multipleSelection: [],
      fileName: '',
      fileList: [],
      file: '',
      viewAdd: false,
      viewEdit: false,
      viewBatchEdit: false,
      viewImport: false
    }
  },
  created() {
    var that = this
    that.list()
  },
  methods: {
    list() {
      selectAllProfile(this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data
        this.total = res.count
      })
    },
    // 增加账单
    addProfileSubmit() {
      addProfile(this.addData).then(res => {
        this.$message({
          message: '添加成功！',
          type: 'success',
          center: true
        })
        this.viewAdd = false
        this.list()
      })
    },
    handleCurrentChange(pager) {
      this.pageNum = pager
      selectAllProfile(this.pageNum, this.pageSize).then(res => {
        this.tableData = res.data
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.list()
    },
    // 展示账单修改页面
    showEdit(row) {
      var that = this
      selectProfileById(row.id).then(res => {
        that.editData = res.data
        that.viewEdit = true
      })
    },
    // 展示批量修改账单页面
    showBatchEdit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择需要修改的账单!',
          center: true
        })
      } else {
        this.viewBatchEdit = true
      }
    },
    // 提交账单修改
    updateProfileSubmit() {
      updateProfile(this.editData, this.checkboxGroup).then(res => {
        this.$message({
          message: '修改成功！',
          type: 'success',
          center: true
        })
        this.checkboxGroup = []
        this.viewEdit = false
        this.list()
      })
    },
    // 删除账单
    handleDelete(row) {
      var that = this
      that
        .$confirm('此操作将永久删除该账单信息, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          deleteProfileById(row.id).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.list()
          })
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除账单
    removeRows() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择需要删除的账单!',
          center: true
        })
      } else {
        this.$confirm('此操作将永久删除选中的账单信息, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // 确定执行 then 方法
          var idList = []
          // 遍历数组得到每个 id 值，设置到 idList 里面
          for (var i = 0; i < this.multipleSelection.length; i++) {
            var obj = this.multipleSelection[i]
            var id = obj.id
            idList.push(id)
          }
          // 调用接口
          batchDeleteProfile(idList).then(response => {
          // 提示
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
            // 刷新页面
            this.list()
          })
        })
      }
    },
    // 批量修改账单
    UpdateRows() {
      this.$confirm('此操作将修改所有选中的账单信息, 是否继续?', '提示', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行 then 方法
        var idList = []
        // 遍历数组得到每个 id 值，设置到 idList 里面
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i]
          var id = obj.id
          idList.push(id)
        }
        // 调用接口
        console.log(this.checkboxGroup)
        batchUpdateProfile(idList, this.batchEditData, this.checkboxGroup).then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '修改成功!',
            center: true
          })
          this.viewBatchEdit = false
          this.checkboxGroup = []
          // 刷新页面
          this.list()
        })
      })
    },
    // 导出账单
    handleExport() {
      this.$confirm('此操作将导出选中的账单信息, 是否继续?', '提示', {
        confirmButtonText: '导出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行 then 方法
        var idList = []
        // 遍历数组得到每个 id 值，设置到 idList 里面
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i]
          var id = obj.id
          idList.push(id)
        }
        // 调用接口
        exportProfile(idList).then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '导出成功!',
            center: true
          })
          // 刷新页面
          this.list()
        })
      })
    },
    // 上传文件
    uploadSectionFile(param) {
      var that = this
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      importProfile(form).then(res => {
        if (res.code === 200) {
          that.$message({
            type: 'success',
            message: '文件上传成功'
          })
          that.fileList = []
          that.viewImport = false
          that.list()
        } else {
          that.$message({
            type: 'error',
            message: res.msg
          })
          that.fileList = []
          that.viewImport = false
        }
        that.fileList = []
      })
    },
    // 上传
    submitUploadAdd() {
      var that = this
      const list = document.getElementsByClassName(
        'el-upload-list__item is-ready'
      )
      if (list.length === 0) {
        that.$message({
          type: 'warning',
          message: '请选择需要上传的文件！'
        })
        return
      }
      that.$refs.uploadAdd.submit()
    },
    // 州随国家改变而改变
    changeCountry(e) {
      if (e === 'US') {
        this.stateList = this.usState
      } else {
        this.stateList = this.caState
      }
    }
  }
}
</script>

<style>

</style>
