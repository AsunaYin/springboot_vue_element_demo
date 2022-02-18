<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
        >
            <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="190"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="书名"
                    width="550"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="300"
                    align="center">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="dialogFormVisible = true,editBook(scope.row)" type="text" size="small">修改
                    </el-button>
                    <el-button @click="centerDialogVisible = true,deleteBook(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页效果 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size=pageSize
                :total=total
                @current-change="changePage">
        </el-pagination>

        <!-- 编辑按钮 弹出对话框 默认不可见-->
        <el-dialog title="编辑书籍" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="当前书籍顺序编号" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="请输入新的书籍名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请输入作者名称" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="form.author" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除按钮 弹出对话框 默认不可见-->
        <el-dialog title="确定删除" :visible.sync="centerDialogVisible" width="30%" center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false,confirmDelete()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<style>
el-pagination {

}
</style>

<script>
export default {
    methods: {

        //点击编辑按钮弹出对话框内赋值
        editBook(row) {
            //console.log(row);
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.author = row.author;
        },

        //修改→提交
        submitForm(formName) {
            const _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios.post("http://localhost:8081/book/update", _this.form).then(function (response) {
                        console.log(response);
                        if (response.data == 'success') {
                            _this.$message({
                                message: '更改成功',
                                type: 'success'
                            });
                        } else {
                            _this.$message({
                                message: '更改失败',
                                type: 'error'
                            });
                        }
                    })
                } else {
                    _this.$message({
                        message: '书籍名或作者不能为空！',
                        type: 'error'
                    });
                    return false;
                }
            });
        },

        //点击删除按钮取所选书籍的 id 值
        deleteBook(row) {
            console.log(row.id)
            this.form.id = row.id;
            console.log(this.form.id);
        },
        //点击确认删除
        confirmDelete(){
            const _this = this;
            this.$axios.post("http://localhost:8081/book/delete",_this.form).then(function (response){
                console.log(_this.form);
                console.log(response);
            })
        },

        changePage(currentPage) {
            const _this = this;
            this.$axios.get("http://localhost:8081/book/allbook/" + currentPage).then(function (response) {
                //console.log(response);
                _this.tableData = response.data.records;
                _this.total = response.data.total;
            }, function (err) {
                console.log(err);
            })
        }
    },
    created() {
        const _this = this;
        this.$axios.get("http://localhost:8081/book/allbook/1").then(function (response) {
            //console.log(response);
            _this.pageSize = response.data.size;
            _this.tableData = response.data.records;
            _this.total = response.data.total;
        }, function (err) {
            console.log(err);
        })
    },
    data() {
        return {
            //校验规则
            rules: {
                name: [
                    {required: true, message: '书籍名称不能为空', trigger: 'blur'},
                    {min: 1, message: '长度至少为1个字符', trigger: 'blur'}
                ],
                author: [
                    {required: true, message: '请输入作者姓名', trigger: 'blur'},
                    {min: 1, message: '长度至少为1个字符', trigger: 'blur'}
                ]
            },

            pageSize: null,
            total: null,
            tableData: [],

            /*默认对话框和表单不可见*/
            dialogTableVisible: false,
            dialogFormVisible: false,
            centerDialogVisible: false,
            form: {
                name: '',
                author: '',
                id: ''
            },

            /*设置input框前面文字长度*/
            formLabelWidth: '180px'
        }
    }
}
</script>