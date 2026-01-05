<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

const isLoading = ref(true)
const hasError = ref(false)

onMounted(() => {
  // 模拟加载完成，实际中可以通过iframe的load事件来设置
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const handleIframeLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const handleIframeError = () => {
  isLoading.value = false
  hasError.value = true
}
</script>

<template>
  <div class="pdf-viewer-container">
    <div class="pdf-viewer-header">
      <span class="pdf-viewer-title">PDF 预览</span>
      <a :href="props.url" class="pdf-download-btn" target="_blank" title="下载PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        下载
      </a>
    </div>
    
    <div class="pdf-viewer-content">
      <div v-if="isLoading" class="pdf-loading">
        <div class="loading-spinner"></div>
        <p>正在加载PDF...</p>
      </div>
      
      <div v-if="hasError" class="pdf-error">
        <p>无法加载PDF文件</p>
        <a :href="props.url" class="error-download-link">请点击这里下载PDF文件</a>
      </div>
      
      <iframe 
        v-show="!isLoading && !hasError"
        :src="props.url" 
        class="pdf-iframe"
        @load="handleIframeLoad"
        @error="handleIframeError"
        title="PDF文档预览"
        allow="fullscreen"
      >
        您的浏览器不支持PDF预览
      </iframe>
    </div>
    
    <div class="pdf-viewer-footer">
      <span class="pdf-tip">提示：您可以在PDF中滚动、缩放或全屏查看</span>
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 1.5rem 0;
  transition: all 0.3s ease;
}

.pdf-viewer-container:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.pdf-viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.pdf-viewer-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.pdf-download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s, opacity 0.2s;
}

.pdf-download-btn:hover {
  background-color: var(--vp-c-brand-dark);
  opacity: 0.9;
  text-decoration: none;
}

.pdf-viewer-content {
  position: relative;
  min-height: 500px;
  background-color: var(--vp-c-bg);
}

.pdf-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pdf-loading p {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.pdf-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
  z-index: 10;
}

.pdf-error p {
  color: #dc2626;
  font-weight: 500;
  margin-bottom: 12px;
}

.error-download-link {
  color: var(--vp-c-brand);
  text-decoration: underline;
  font-size: 14px;
}

.error-download-link:hover {
  color: var(--vp-c-brand-dark);
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  min-height: 500px;
  border: none;
  display: block;
}

.pdf-viewer-footer {
  padding: 10px 16px;
  background-color: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.pdf-tip {
  display: block;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pdf-viewer-content {
    min-height: 400px;
  }
  
  .pdf-iframe {
    min-height: 400px;
  }
  
  .pdf-viewer-header {
    padding: 10px 12px;
  }
  
  .pdf-download-btn {
    padding: 5px 10px;
    font-size: 12px;
  }
}

/* 暗色模式适配 */
:global(.dark) .pdf-viewer-container {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

:global(.dark) .pdf-viewer-container:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

:global(.dark) .pdf-error p {
  color: #f87171; /* 暗色模式下的错误颜色 */
}
</style>
