<template>
  <q-footer class="bg-grey-9 inset-shadow">
    <q-toolbar>
      <q-space />
      <div class="flex justify-center items-center footer__license mt-2 mb-1 text-grey-5 p-1">
        <div>&copy; 2024 - {{ now.getFullYear() }} {{ t('siteFooterDeveloperName') }} (Zero)</div>
        <q-btn
          flat
          rounded
          href="https://github.com/Z3roTech/zero-tech-ru"
          :label="t('siteFooterSourceCodeLink', { site: 'GitHub' })"
          icon-right="open_in_new"
          target="_blank"
          size="sm"
        ></q-btn>
        <div style="font-size: 0.55rem">MIT License</div>
      </div>
      <q-space />
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const now = new Date()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.footer__license {
  flex-direction: column;
}
</style>
