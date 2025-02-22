<template>
  <div>
    <q-card bordered class="p-3">
      {{ route }}
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
