<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// dark-mode init
const $q = useQuasar()
$q.dark.set(useLocalStorage('dark-mode', $q.dark.isActive).value)

// locale init
const { locale } = useI18n()
locale.value = useLocalStorage('locale', locale.value).value
</script>
