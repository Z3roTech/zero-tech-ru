<template>
  <q-layout view="hHh LpR fff">
    <q-header class="flex flex-center header-layout">
      <q-toolbar class="bg-primary centered-layout">
        <q-toolbar-title>
          {{ t('siteHeader', { name: siteHeader }) }}
        </q-toolbar-title>
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

    <div class="centered-content-wrap">
      <!-- <q-drawer v-model="leftDrawerState" class="centered-content-drawer">
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer> -->

      <q-page-container class="flex flex-center">
        <q-page padding class="centered-content-page no-box-shadow">
          <router-view />
        </q-page>
      </q-page-container>
    </div>

    <q-footer class="bg-grey-9 inset-shadow">
      <q-toolbar>
        <q-space />
        <div class="flex justify-center items-center footer__license mt-3 mb-2">
          <div>
            &copy; 2024 - {{ now.getFullYear() }} {{ t('siteFooterDeveloperName') }} (Zero) - MIT
            License
          </div>
          <q-btn
            flat
            rounded
            href="https://github.com/Z3roTech/zero-tech-ru"
            :label="t('siteFooterSourceCodeLink', { site: 'GitHub' })"
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

const now = new Date()
// const leftDrawerState = ref(true)

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

<style lang="scss" scoped>
@use 'sass:color';

.footer__license {
  flex-direction: column;
}

.header-layout {
  background: var(--page);
}

.centered-layout {
  box-shadow: 0 0px 5px 3px var(--q-primary);
  border-radius: 0 0 1em 1em;
  max-width: 1024px;
}

.centered-content-page {
  @extend .centered-layout;

  box-shadow: 0;
  background: $grey-2;
  .body--light & {
    @extend .centered-content-page;
  }
  .body--dark & {
    @extend .centered-content-page;
    background: $grey-10;
  }
}

aside.q-drawer--left div.centered-content-drawer {
  left: unset !important;
}

.centered-content-wrap {
  max-width: 1024px;
  border: 1px solid var(--q-primary);
  box-shadow: 0 0 5px 0px var(--q-primary);
  border-radius: 0 0 1em 1em;
  justify-self: center;
}
</style>
