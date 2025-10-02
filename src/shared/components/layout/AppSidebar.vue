<script setup lang="ts">
import { Home, Users, ExternalLink } from "lucide-vue-next"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { useI18n } from '@/core/i18n'
import { useSidebar } from '@/shared/components/ui/sidebar'
import { useRouter } from 'vue-router'
import { watch, ref, onMounted } from 'vue'
import PlayerService from '@/features/core/services/player.service'
import PlayerAvatar from '@/features/core/components/player/PlayerAvatar.vue'
import type { Player } from '@/features/core/types/player.types'

const { t } = useI18n()
const { setOpenMobile } = useSidebar()
const router = useRouter()

// Active channels state
const activeChannels = ref<Player[]>([])

/**
 * Load active channels with 20+ videos
 */
const loadActiveChannels = async () => {
  try {
    const response = await PlayerService.getActiveChannels()
    // Limit to first 8 channels for sidebar
    activeChannels.value = response['hydra:member'].slice(0, 100)
  } catch (error) {
    console.error('Error loading active channels:', error)
  }
}

/**
 * Navigate to player profile
 */
const navigateToChannel = (player: Player) => {
  const currentLang = router.currentRoute.value.params.lang as string
  router.push(`/${currentLang}/player/${player.id}/${player.slug}`)
  setOpenMobile(false) // Close mobile sidebar after navigation
}

/**
 * Watch for route changes and close mobile sidebar
 * This handles cases where navigation happens programmatically
 */
watch(() => router.currentRoute.value.path, () => {
    setOpenMobile(false)
})

onMounted(() => {
  loadActiveChannels()
})
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{{ t('layout.sidebar.title') }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink :to="{name: 'Home'}">
                  <Home />
                  <span>{{ t('menu.home') }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="https://www.videogamesrecords.net/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
                  <span>Video Games Records</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Active Channels Section -->
      <SidebarGroup class="mt-6">
        <SidebarGroupLabel>
          <Users class="w-4 h-4" />
          {{ t('player.channels.active') }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="channel in activeChannels" :key="channel.id">
              <SidebarMenuButton @click="navigateToChannel(channel)" class="cursor-pointer">
                <PlayerAvatar :player="channel" class="w-5 h-5" />
                <div class="flex flex-col items-start min-w-0 flex-1">
                  <span class="text-sm font-medium truncate">{{ channel.pseudo }}</span>
                  <span class="text-xs text-muted-foreground">{{ channel.nbVideo }} videos</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

    </SidebarContent>
  </Sidebar>
</template>
