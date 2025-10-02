<!-- src/features/core/components/video/InfiniteVideoList -->
<template>
  <div>
    <div ref="scrollComponent" class="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-1 scrolling-component">
      <Card v-for="video in videos" :key="video.id">
        <CardContent class="p-0 thumbnail">
          <router-link :to="{name: 'VideoIndex', params:{id :video.id}}">
            <img class="w-full object-cover" :src="video.thumbnail" alt="thumbnail" />
          </router-link>
        </CardContent>
        <CardFooter class="p-1 text-sm">
          <player-avatar :player="video.player" class="m-1" />
          {{ video.title }}
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Card, CardContent,
  CardFooter,
} from '@/shared/components/ui/card'
import {ref, onMounted, onUnmounted, defineProps, watch} from 'vue'
import PlayerAvatar from "@/features/core/components/player/PlayerAvatar.vue"
import VideoService from '@/features/core/services/video.service'
import type { Video } from '@/features/core/types/video.types'

const scrollComponent = ref(null)
const page = ref(0)
const videos = ref<Video[]>([])

const props = defineProps<{
  playerId?: string
  search?: string
}>()


onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const handleScroll = () => {
  const element = scrollComponent.value
  if (element?.getBoundingClientRect().bottom < window.innerHeight) {
    loadMoreVideos()
  }
}

watch(
  () => props.playerId,
  () => {
    page.value = 0
    videos.value = []
    loadMoreVideos()
  }
)

watch(
  () => props.search,
  () => {
    page.value = 0
    videos.value = []
    loadMoreVideos()
  }
)

const getVideos = async () => {
  try {
    const filters = {
      page: page.value,
      itemsPerPage: 30,
      search: props.search
    }
    
    const response = await VideoService.getVideos(filters)
    return response['hydra:member']
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

const loadMoreVideos = async () => {
  page.value = page.value + 1
  const newVideos = await getVideos()
  videos.value.push(...newVideos)
}

loadMoreVideos()
</script>

<style scoped>
img {
  object-fit: cover;
  height: 94%;
  width: 100%;
}

.thumbnail  {
  width:100%;
}
</style>
