<template>
    <div>
        <canvas id="canvas"></canvas>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container" @keyup.native.enter="handleSubmit">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
            <span class="tip_account tip">账号：admin</span>
            <span class="tip_password tip">密码：123456</span>
        </el-form>
    </div>
</template>

<script>
import { requestLogin } from "../api/api";
import { checkAccount, checkPassword } from "@/common/js/checkRules";
import loginBg from "@/common/js/loginCanvas";

export default {
    data() {
        return {
            logining: false,
            ruleForm: {
                account: "admin",
                password: "123456"
            },
            rules: {
                account: [{ validator: checkAccount, trigger: "blur" }],
                password: [{ validator: checkPassword, trigger: "blur" }]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // console.log("success!!");
                    this.logining = true;
                    let loginParams = {
                        username: this.ruleForm.account,
                        password: this.ruleForm.password
                    };
                    requestLogin(loginParams).then(data => {
                        this.logining = false;
                        let { msg, code, user } = data;
                        if (code !== 200) {
                            // console.log("error!!");
                            this.$message({ message: msg, type: "error" });
                        } else {
                            //  console.log("session!!");
                            sessionStorage.setItem(
                                "user",
                                JSON.stringify(user)
                            );
                            this.$router.push({ path: "/manage" });
                        }
                    });
                } else {
                    // console.log("error!!");
                    return false;
                }
            });
        }
    },
    mounted() {
        loginBg.canvasInit();
    }
};
</script>

<style lang="scss" scoped>
body {
    background-color: #eee;
    overflow: hidden;
}
canvas {
    background-color: #eee;
    display: block;
    margin: 0 auto;
}
.login-container {
    position: absolute;
    top: 180px;
    left: 65%;
    // transform: translateX(-50%);
    border-radius: 5px;
    background-clip: padding-box;
    width: 330px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,.35);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .tip {
        display: inline-block;
        width: 150px;
        color: dimgrey;
    }
    .tip_account {
        text-align: left;
    }
    .tip_password {
        text-align: right;
    }
}
</style>