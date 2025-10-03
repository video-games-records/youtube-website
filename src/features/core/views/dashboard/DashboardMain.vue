<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-2xl font-semibold text-foreground">{{ t('dashboard.title') }}</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/core/i18n'

const { t } = useI18n()
</script>