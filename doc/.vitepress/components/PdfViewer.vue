<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

// 只在客户端使用的变量
const VuePDF = ref(null)
const pdf = ref(null)
const pages = ref([])
const isLoading = ref(true)
const isError = ref(false)

onMounted(async () => {
  try {
    // 动态导入 PDF 库（只在客户端执行）
    const { VuePDF: VuePDFComponent, usePDF } = await import('@tato30/vue-pdf')
    VuePDF.value = VuePDFComponent
    
    // 初始化 PDF
    const { pdf: pdfInstance, pages: pagesList } = usePDF(props.url)
    pdf.value = pdfInstance
    pages.value = pagesList
    
    // 监听 PDF 加载状态
    watch(pdfInstance, (newPdf) => {
      if (newPdf) {
        isLoading.value = false
      }
    }, { immediate: true })
  } catch (error) {
    console.error('PDF加载失败:', error)
    isError.value = true
    isLoading.value = false
  }
})
</script>

<template>
  <!-- 服务器端渲染时显示占位符 -->
  <div v-if="!VuePDF" class="pdf-placeholder">
    <p>PDF预览将在客户端加载</p>
  </div>
  
  <!-- 客户端渲染 -->
  <div v-else>
    <!-- 错误状态 -->
    <div v-if="isError" class="error">
      PDF加载失败，请检查链接是否有效
    </div>
    
    <!-- 加载状态 -->
    <div v-else-if="isLoading" class="loading">
      <div class="spinner"></div>
      正在加载PDF...
    </div>
    
    <!-- PDF 渲染区域 -->
    <div v-else>
      <div v-for="page in pages" :key="page" class="pdf-page">
        <component
          :is="VuePDF"
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
.loading, .error {
  padding: 40px;
  text-align: center;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #666;
  background-color: #f9f9f9;
  margin: 20px 0;
}

.error {
  color: #d32f2f;
  border-color: #ffcdd2;
  background-color: #ffebee;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #666;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  margin: 20px 0;
}
</style>