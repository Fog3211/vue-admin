<template>
    <el-container>
        <el-header :style="{ 'background-color': primaryColor }">
            <el-row>
                <el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                    {{collapsed?'':sysName}}
                </el-col>
                <el-col :span="10">
                    <div class="tools" @click="collapse">
                        <i class="fa fa-align-justify middle"></i>
                    </div>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner middle">
                            <img :src="this.sysUserAvatar" /> {{sysUserName}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="showThemeDialog">切换主题色</el-dropdown-item>
                            <el-dropdown-item divided @click.native.prevent="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-dialog center :visible.sync="themeDialogVisible" title="切换主题色" width="400px">
            <el-form :model="colors" :rules="rules" ref="form" class="theme-form" label-position="top" label-width="70px">
                <el-form-item label="主题色" prop="primary">
                    <el-color-picker v-model="colors.primary"></el-color-picker>
                </el-form-item>
                <el-form-item class="color-buttons">
                    <el-button type="primary" @click.native.prevent="submitForm">切换</el-button>
                    <el-button @click.native.prevent="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script>
import generateColors from "@/common/js/color";
export default {
    data() {
        const colorValidator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("主题色不能为空"));
            } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
                return callback(new Error("请输入 hex 格式的主题色"));
            } else {
                callback();
            }
        };
        return {
            sysName: "Vue-Admin",
            collapsed: false,
            sysUserName: "",
            sysUserAvatar: "",
            colors: {
                primary: "#409eff"
            },
            primaryColor: "#409eff",
            themeDialogVisible: false,
            originalStyle: "",
            originalStylesheetCount: -1,
            rules: {
                primary: [{ validator: colorValidator, trigger: "blur" }]
            }
        };
    },
    created() {
        this.getIndexStyle();
    },
    methods: {
        //退出登录
        logout() {
            let _this = this;
            this.$confirm("确认退出吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    //   console.log('logout');
                    sessionStorage.removeItem("user");
                    _this.$router.push("/login");
                })
                .catch(() => {
                    console.log("error");
                });
        },
        //折叠导航栏
        collapse() {
            this.collapsed = !this.collapsed;
            this.$emit("getcollapsed", this.collapsed); //不能用驼峰命名法
        },
        showThemeDialog() {
            this.themeDialogVisible = true;
        },
        writeNewStyle() {
            //  console.log(this.colors.primary)
            let cssText = this.originalStyle;
            Object.keys(this.colors).forEach(key => {
                cssText = cssText.replace(
                    new RegExp("(:|\\s+)" + key, "g"),
                    "$1" + this.colors[key]
                );
            });

            if (this.originalStylesheetCount === document.styleSheets.length) {
                const style = document.createElement("style");
                style.innerText = cssText;
                document.head.appendChild(style);
            } else {
                document.head.lastChild.innerText = cssText;
            }
        },
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.themeDialogVisible = false;
                    this.primaryColor = this.colors.primary;
                    this.colors = Object.assign(
                        {},
                        this.colors,
                        generateColors(this.colors.primary)
                    );
                    this.writeNewStyle();
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        },

        getIndexStyle() {
            this.getFile(
                "//unpkg.com/element-ui/lib/theme-chalk/index.css"
            ).then(({ data }) => {
                this.originalStyle = this.getStyleTemplate(data);
            });
        },
        getStyleTemplate(data) {
            const colorMap = {
                "#3a8ee6": "shade-1",
                "#409eff": "primary",
                "#53a8ff": "light-1",
                "#66b1ff": "light-2",
                "#79bbff": "light-3",
                "#8cc5ff": "light-4",
                "#a0cfff": "light-5",
                "#b3d8ff": "light-6",
                "#c6e2ff": "light-7",
                "#d9ecff": "light-8",
                "#ecf5ff": "light-9"
            };
            Object.keys(colorMap).forEach(key => {
                const value = colorMap[key];
                data = data.replace(new RegExp(key, "ig"), value);
            });
            return data;
        },
        getFile(url, isBlob = false) {
            return new Promise((resolve, reject) => {
                const client = new XMLHttpRequest();
                client.responseType = isBlob ? "blob" : "";
                client.onreadystatechange = () => {
                    if (client.readyState !== 4) {
                        return;
                    }
                    if (client.status === 200) {
                        const urlArr = client.responseURL.split("/");
                        resolve({
                            data: client.response,
                            url: urlArr[urlArr.length - 1]
                        });
                    } else {
                        reject(new Error(client.statusText));
                    }
                };
                client.open("GET", url);
                client.send();
            });
        }
    },
    mounted() {
        let user = sessionStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.name;
            this.sysUserAvatar = user.avatar;
        }

        this.$nextTick(() => {
            this.originalStylesheetCount = document.styleSheets.length;
        });
    }
};
</script>

<style scoped lang="scss">
// $color-primary: #18c79c;

.el-container {
    .el-header {
        height: 60px;
        line-height: 60px;
        color: #fff;
        // background-color: $color-primary;
        .logo {
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
        }
        .logo-width {
            width: 230px;
        }
        .logo-collapse-width {
            width: 60px;
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            font-size: 26px;
            line-height: 60px;
            cursor: pointer;
        }
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                font-size: 16px;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
    }
}
</style>