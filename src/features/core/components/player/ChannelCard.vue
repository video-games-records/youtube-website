<template>
  <div class="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
    <!-- Channel Avatar -->
    <PlayerAvatar :player="player" class="w-8 h-8 flex-shrink-0" />
    
    <!-- Channel Info -->
    <div class="flex-1 min-w-0">
      <div class="font-medium text-sm truncate">
        {{ player.pseudo }}
      </div>
      <div class="text-xs text-muted-foreground">
        {{ player.nbVideo }} videos
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerAvatar from './PlayerAvatar.vue'
import type { Player } from '@/features/core/types/player.types'

interface Props {
  player: Player
}

defineProps<Props>()
</script>