<template>
  <div>
    <q-drawer
      v-model="drawerState"
      class="centered-content-drawer"
      :behavior="drawerMode"
      :width="260"
      :overlay="greaterThanMobileScreen ? false : true"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item
            v-for="item in routeItems"
            :key="item.id"
            clickable
            v-ripple
            :active="item.isActive.value"
            active-class="text-accent"
            :to="item.to"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section> {{ t(item.label) }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import {
  useRoute,
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router'

const { t } = useI18n()
const $q = useQuasar()
const route = useRoute()

// menu states
const greaterThanMobileScreen = computed(() => $q.screen.gt.sm)
const drawerState = ref($q.screen.gt.sm)
const drawerMode = ref<'desktop' | 'mobile'>('desktop')
watch(
  greaterThanMobileScreen,
  (value) => {
    drawerMode.value = value ? 'desktop' : 'mobile'
    drawerState.value = value
  },
  {
    immediate: true,
  },
)

function toggleMenuState() {
  console.log('hello!?')
  drawerState.value = !drawerState.value
}

defineExpose({
  toggleMenuState,
})

// routing
interface IRoutingItem {
  id: string
  label: string
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  icon: string
  isActive: ComputedRef<boolean>
}

const routeItems: IRoutingItem[] = [
  {
    id: 'routerLinkAboutMe',
    label: 'routerLinks_aboutMe',
    to: { name: 'aboutMe' },
    icon: 'bi-person-circle',
    isActive: computed(() => route.name == 'aboutMe'),
  },
  {
    id: 'routerLinkProjects',
    label: 'routerLinks_projects',
    to: { name: 'projects' },
    icon: 'bi-git',
    isActive: computed(() => route.name == 'projects'),
  },
  {
    id: 'routerLinkForEmployers',
    label: 'routerLinks_forEmployers',
    to: { name: 'employers' },
    icon: 'fa-solid fa-briefcase',
    isActive: computed(() => route.name == 'employers'),
  },
  {
    id: 'routerLinkChangelog',
    label: 'routerLinks_changelog',
    to: { name: 'changelog' },
    icon: 'bi-list-columns-reverse',
    isActive: computed(() => route.name == 'changelog'),
  },
]
</script>

<style lang="scss">
.q-drawer {
  &:has(.centered-content-drawer) {
    box-shadow: inset -5px 0px 7px -7px $primary;

    @media (max-width: $breakpoint-sm) {
      box-shadow: unset;
    }
  }

  &--left:has(.centered-content-drawer) {
    left: unset !important;
  }
}
</style>
