<template>
  <q-header class="flex flex-center header-layout">
    <q-toolbar class="bg-primary centered-layout header-toolbar-glow">
      <q-btn class="lg-hide xl-hide md-hide" flat icon="bi-list" @click="$emit('open-left-menu')" />
      <q-toolbar-title shrink class="clickable" @click="onTitleClick">
        {{ t('header_headerTitle', { name: siteHeader }) }}
        <q-badge align="top" rounded color="accent" text-color="white"> &#x1D6FC; </q-badge>
      </q-toolbar-title>
      <q-space />
      <q-toggle
        v-model="isLightMode"
        checked-icon="light_mode"
        color="amber-6"
        unchecked-icon="dark_mode"
        class="xs-hide"
      />
      <q-btn-dropdown
        size="md"
        dropdown-icon="fa-solid fa-language"
        no-wrap
        no-caps
        no-icon-animation
        flat
        dense
        class="ml-1 xs-hide"
      >
        <q-list dense bordered>
          <q-item
            v-for="(item, index) in localeOptions"
            :key="`locale-${index}`"
            clickable
            v-ripple
            :active="item.isActive()"
            @click="locale = item.value"
            active-class="bg-accent text-white"
          >
            <q-item-section class="text-center">
              <span :class="['fi', item.flag]"></span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator vertical dark class="mx-4 xs-hide" inset />
      <q-btn
        href="https://github.com/Z3roTech"
        icon="fa-brands fa-github"
        target="_blank"
        round
        flat
        size="md"
        dense
        class="xs-hide"
      ></q-btn>
      <q-btn icon="bi-three-dots" class="sm-hide md-hide lg-hide xl-hide" dense flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item>
              <q-item-section avatar>{{ t('header_submenu_appearance') }}</q-item-section>
              <q-item-section side>
                <q-toggle
                  v-model="isLightMode"
                  checked-icon="light_mode"
                  color="amber-6"
                  unchecked-icon="dark_mode"
                />
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section class="text-center items-center">
                <q-item-label class="mb-1">{{ t('header_submenu_locale') }}</q-item-label>
                <q-btn-toggle v-model="locale" no-wrap :options="localeOptions" glossy>
                  <template v-slot:ru>
                    <div class="row items-center no-wrap">
                      <span :class="['fi', localeFlags.ru]"></span>
                    </div>
                  </template>

                  <template v-slot:en>
                    <div class="row items-center no-wrap">
                      <span :class="['fi', localeFlags.en]"></span>
                    </div>
                  </template>
                </q-btn-toggle>
              </q-item-section>
            </q-item>

            <q-separator spaced />
            <q-item>
              <q-item-section>
                <q-item-label class="text-center">{{ t('header_submenu_myLinks') }}</q-item-label>
                <q-separator inset class="mb-2" />
                <q-btn
                  href="https://github.com/Z3roTech"
                  icon="fa-brands fa-github"
                  target="_blank"
                  label="GitHub"
                  round
                  flat
                  no-wrap
                  no-caps
                  size="md"
                  dense
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { useLocalStorage } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const $q = useQuasar()

// dark-mode toggle
const isLightMode = ref(!$q.dark.isActive)
watch(isLightMode, (current) => {
  $q.dark.set(!current)
  useLocalStorage('dark-mode', !current).value = !current
})

// Localization
interface ILocaleOption {
  label: string
  value: string
  isActive: () => boolean
  flag: string
  slot: string
}
const { t, locale, availableLocales } = useI18n()
const localeFlags: { [index: string]: string | undefined } = {
  en: 'fi-us',
  ru: 'fi-ru',
}

const localeOptions: ILocaleOption[] = availableLocales.map((el) => ({
  label: '',
  value: el,
  isActive: () => el == locale.value,
  flag: localeFlags[el] || 'fi-xx',
  slot: el,
}))

// TODO: in future it must be animated changing of site header
const siteHeader = ref('Zero')
watch(locale, (current) => {
  useLocalStorage('locale', current).value = current
})

const router = useRouter()
async function onTitleClick() {
  await router.push({ name: 'indexPage' })
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
.header-layout {
  background: transparent;
}

.centered-layout {
  max-width: $breakpoint-sm;
}

.header-toolbar-glow {
  box-shadow: 0 0px 5px 3px $primary;
  border-radius: 0 0 1em 1em;

  @media (max-width: $breakpoint-sm) {
    box-shadow: none;
    border-radius: 0;
  }
}

.clickable:hover {
  cursor: pointer;
}
</style>
