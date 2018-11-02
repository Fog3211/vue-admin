<template>
    <div>
        <div class="edit_container">
            <quill-editor v-model="content" ref="myQuillEditor" class="editer" :options="editorOption">
            </quill-editor>
        </div>
        <div class="submit_btn">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>

import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
    data() {
        return {
            content: "<h1>文本编辑</h1>",
            editorOption: {}
        };
    },
    components: {
        quillEditor
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    methods: {
        submit() {
            // console.log(this.content);
            this.$message.success("提交成功！");
        }
    }
};
</script>

<style lang="scss">
.edit_container {
    padding: 40px;
    margin-bottom: 40px;
}
.editer {
    height: 350px;
}
.submit_btn {
    text-align: center;
}
</style>
