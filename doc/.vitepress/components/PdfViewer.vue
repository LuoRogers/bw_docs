<script setup>
// 修改导入方式（注意需正确安装对应库）
import { VuePDF, usePDF } from '@tato30/vue-pdf' // 或你实际使用的包名
import { ref, watchEffect } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true // 强制要求提供 PDF 地址
  }
})

const { pdf, pages } = usePDF(props.url)
const currentPage = ref(1)

// 添加 PDF 加载状态
const isLoading = ref(true)
watchEffect(() => {
  if (pdf.value) isLoading.value = false
})
</script>

<template>
  <!-- 加载状态提示 -->
  <div v-if="isLoading" class="loading">Loading PDF...</div>
  
  <!-- PDF 渲染区域 -->
  <div v-else>
    <div v-for="page in pages" :key="page" class="pdf-page">
      <VuePDF 
        :pdf="pdf" 
        :page="page" 
        :scale="0.8" 
        style="border: 1px solid #eee;"
      />
    </div>
  </div>
</template>

<style scoped>
.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}
.pdf-page {
  margin-bottom: 16px;
}
</style>