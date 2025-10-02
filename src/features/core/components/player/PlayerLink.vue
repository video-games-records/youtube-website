<template>
  <router-link
    :to="{ name: 'UserProfile', params: { id: player.id, slug: player.slug } }"
    class="hover:underline focus:underline focus:outline-none"
    :class="linkClass"
  >
    <span v-if="player.team && showTeamTag" class="text-muted-foreground text-sm mr-2">[{{ player.team.tag }}]</span>{{ player.pseudo }}
  </router-link>
</template>

<script setup lang="ts">
import type { Player } from '@/features/core/types/player.types.ts'

interface Props {
  player: Player
  showTeamTag?: boolean
  linkClass?: string
}

withDefaults(defineProps<Props>(), {
  showTeamTag: true,
  linkClass: ''
})
</script>