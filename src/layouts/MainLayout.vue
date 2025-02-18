<template>
  <q-layout view="hHh LpR fff">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          {{ t('siteHeader', { name: siteHeader }) }}
        </q-toolbar-title>
        <q-space />
        <q-toggle
          v-model="isLightMode"
          checked-icon="light_mode"
          color="amber-6"
          unchecked-icon="dark_mode"
        />
        <q-btn-dropdown
          size="sm"
          dropdown-icon="fa-solid fa-language"
          no-wrap
          no-caps
          no-icon-animation
          flat
          dense
          class="ml-1"
        >
          <q-list dense>
            <q-btn-toggle
              v-model="locale"
              :options="localeOptions"
              size="sm"
              toggle-color="accent"
            ></q-btn-toggle>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical dark class="mx-4" inset />
        <q-btn
          href="https://github.com/Z3roTech"
          icon="fa-brands fa-github"
          target="_blank"
          round
          flat
          size="sm"
          dense
        ></q-btn>
      </q-toolbar>
    </q-header>

    <!-- TODO: Добавить боковое меню -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 inset-shadow">
      <q-toolbar>
        <q-space />
        <div class="flex justify-center items-center footer__license mt-3 mb-2">
          <div>&copy; 2025 Ilya Shelikov (Zero) - MIT License</div>
          <q-btn
            flat
            rounded
            href="https://github.com/Z3roTech/zero-tech-ru"
            label="Source code on GitHub"
            icon-right="open_in_new"
            target="_blank"
            size="sm"
          ></q-btn>
        </div>
        <q-space />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { watch, ref } from 'vue'
import { useLocalStorage, useInterval } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const { t, locale, availableLocales } = useI18n()
const isLightMode = ref(!$q.dark.isActive)

const localeOptions = availableLocales.map((el) => ({
  label: el,
  value: el,
}))

const siteHeader = ref('Zero')
useInterval(5000, {
  controls: true,
  immediate: true,
  callback: function () {
    siteHeader.value = 'Zero'
  },
})

watch(isLightMode, (current) => {
  $q.dark.set(!current)
  useLocalStorage('dark-mode', !current).value = !current
})

watch(locale, (current) => {
  useLocalStorage('locale', current).value = current
})
</script>

<style lang="css" scoped>
.left-drawer__scroll-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd;
}

.footer__license {
  flex-direction: column;
}
</style>
