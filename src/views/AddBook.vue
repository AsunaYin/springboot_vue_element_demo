<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

        <el-form-item label="图书名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-form>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                author: ''
            },
            rules: {
                name: [
                    {required: true, message: '书籍名称不能为空', trigger: 'blur'},
                    {min: 1, message: '长度至少为1个字符', trigger: 'blur'}
                ],
                author: [
                    {required: true, message: '请输入作者姓名', trigger: 'blur'},
                    {min: 1, message: '长度至少为1个字符', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            const _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios.post("http://localhost:8081/book/save",_this.ruleForm).then(function (response){
                        console.log(response);
                        if (response.data === 'success'){
                            _this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            _this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>