<!-- src/components/player/PlayerAvatar.vue -->
<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { User } from 'lucide-vue-next'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/avatar'
import { cn } from '@/core/lib/utils.ts'
import type { Player } from '@/features/core/types/player.types.ts'

// Props for customization
const props = withDefaults(defineProps<{
  player: Player
  size?: 'sm' | 'md' | 'lg' | 'xl'
  bordered?: boolean
  showFallback?: boolean
  class?: string
}>(), {
  size: 'md',
  bordered: false,
  showFallback: true
})

// State management
const loaded = ref(false)
const error = ref(false)

// Player's initials for the fallback
const playerInitials = computed(() => {
  if (!props.player) return '?'

  // Use the player's pseudo/username
  return props.player.pseudo
      ? props.player.pseudo.substring(0, 2).toUpperCase()
      : props.player.initial || '??'
})

// Get avatar URL
const avatarUrl = computed(() => {
  if (!props.player?.id) return ''

  const apiRoot = import.meta.env.VITE_ROOT_API || ''
  // Add cache-busting parameter
  return `${apiRoot}/users/${props.player.id}/avatar`
})

// Size classes
const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg'
}

// Container classes
const containerClass = computed(() => {
  return cn(
      sizeClasses[props.size],
      props.bordered ? 'ring-2 ring-background' : '',
      props.class
  )
})

// Handle image load
const handleLoad = () => {
  loaded.value = true
  error.value = false
}

// Handle image error
const handleError = () => {
  loaded.value = false
  error.value = true
}

// Reset state when player or URL changes
watch(() => props.player?.id, () => {
  loaded.value = false
  error.value = false
})

onMounted(() => {
  loaded.value = false
  error.value = false
})
</script>

<template>
  <Avatar
      :class="containerClass"
      data-testid="player-avatar"
  >
    <!-- Actual player avatar image -->
    <AvatarImage
        v-if="player?.id && avatarUrl"
        :src="avatarUrl"
        :alt="`Avatar de ${player.pseudo}`"
        @load="handleLoad"
        @error="handleError"
    />

    <!-- Fallback with player initials or icon -->
    <AvatarFallback
        v-if="!loaded || error || !player?.id"
        class="bg-muted"
    >
      <template v-if="showFallback && playerInitials && !error">
        {{ playerInitials }}
      </template>
      <User v-else class="h-4 w-4" />
    </AvatarFallback>
  </Avatar>
</template>
