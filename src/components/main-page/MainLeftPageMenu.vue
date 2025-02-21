<template>
  <q-drawer v-model="drawerState" class="centered-content-drawer" behavior="desktop" :width="200">
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const drawerState = ref($q.screen.gt.sm)
const drawerMode = ref<'desktop' | 'mobile'>('desktop')
const greaterThanMobileScreen = computed(() => $q.screen.gt.sm)
watch(greaterThanMobileScreen, (value) => {
  drawerMode.value = value ? 'desktop' : 'mobile'
  drawerState.value = value
})
</script>

<style lang="scss">
.q-drawer {
  &:has(.centered-content-drawer) {
    box-shadow: inset -5px 0px 7px -7px $primary;
  }

  &--left:has(.centered-content-drawer) {
    left: unset !important;
  }
}
</style>
