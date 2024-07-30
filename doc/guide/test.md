# 编辑器
* 此区域的内容不会保留，请及时备份

<RichTextEditor v-model="editorContent" />

<script setup>
import { ref } from 'vue';

// 用于绑定 v-model
const editorContent = ref('');
</script>
