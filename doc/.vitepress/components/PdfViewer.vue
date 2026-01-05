<script setup>
// 修改导入方式（注意需正确安装对应库）
import { VuePDF, usePDF } from '@tato30/vue-pdf' // 或你实际使用的包名
import { ref, watchEffect, onMounted } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true // 强制要求提供 PDF 地址
  }
})

// 添加客户端检查
const isClient = typeof window !== 'undefined'
const { pdf, pages } = isClient ? usePDF(props.url) : { pdf: ref(null), pages: ref([]) }
const currentPage = ref(1)

// 添加 PDF 加载状态
const isLoading = ref(true)
if (isClient) {
  watchEffect(() => {
    if (pdf.value) isLoading.value = false
  })
} else {
  // 在服务器端，直接设置为非加载状态但不显示PDF
  isLoading.value = false
}
</script>

<template>
  <!-- 服务器端渲染时显示占位符 -->
  <div v-if="!isClient" class="pdf-placeholder">
    <p>PDF预览将在客户端加载</p>
  </div>
  
  <!-- 客户端渲染 -->
  <div v-else>
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
.pdf-placeholder {
  padding: 40px;
  text-align: center;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #888;
  background-color: #f9f9f9;
}
</style>
