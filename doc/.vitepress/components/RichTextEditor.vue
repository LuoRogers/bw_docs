<template>
    <div>
        <div ref="editor" class="editor"></div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, defineProps, toRefs } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps<{ modelValue: string }>();
const { modelValue } = toRefs(props);
const editor = ref<HTMLDivElement | null>(null);
let vditorInstance: Vditor | null = null;

const emit = defineEmits(['update:modelValue']);

// 确保 modelValue 的默认值为一个空字符串
const initialValue = modelValue.value || '';
onMounted(() => {
  if (editor.value) {
    vditorInstance = new Vditor(editor.value, {
      height: 500,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        id: 'vditor',
        enable: false,
      },
      after: () => {
        vditorInstance?.setValue(initialValue);
      },
      input: (value: string) => {
        emit('update:modelValue', value);
      },
    });
  }
});

onBeforeUnmount(() => {
    if (vditorInstance) {
        vditorInstance.destroy();
    }
});

watch(modelValue, (newValue) => {
    if (vditorInstance && newValue !== vditorInstance.getValue()) {
        vditorInstance.setValue(newValue || '');
    }
});
</script>
  
<style scoped>
.editor {
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>
  