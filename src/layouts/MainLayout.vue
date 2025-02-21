<template>
  <q-layout view="hHh Lpr fff">
    <PageHeader />
    <div class="centered-content-wrap">
      <MainLeftPageMenu />

      <q-page-container class="flex flex-center">
        <q-page class="centered-content-page">
          <router-view />
        </q-page>
      </q-page-container>
    </div>

    <PageFooter />
  </q-layout>
</template>

<script setup lang="ts">
import PageHeader from 'src/components/main-page/PageHeader.vue'
import MainLeftPageMenu from 'src/components/main-page/MainLeftPageMenu.vue'
import PageFooter from 'src/components/main-page/PageFooter.vue'
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '/src/css/app.scss';
.centered-content-page {
  @extend .px-6;
  @extend .pt-4;
  @extend .pb-2;

  max-width: $breakpoint-sm;
  width: 100vw;
  background: $grey-2;

  .body--light & {
    @extend .centered-content-page;
  }

  .body--dark & {
    @extend .centered-content-page;
    background: $grey-10;
  }
}

.centered-content-wrap {
  max-width: $breakpoint-sm;
  justify-self: center;

  border: 1px solid $primary;
  box-shadow: 0 0 5px 0px $primary;

  @media (max-width: $breakpoint-sm) {
    border: 0;
    box-shadow: 0;
  }
}
</style>
