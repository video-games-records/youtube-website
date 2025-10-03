<script setup lang="ts">
import { Menu, User, LogIn, Search } from "lucide-vue-next";
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/features/auth/stores/auth.ts';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import LanguageSelector from '@/features/language/components/LanguageSelector.vue';
import { useI18n } from '@/core/i18n';
import ThemeSelector from "@/features/theme/components/ThemeSelector.vue";
import UserAvatar from '@/features/auth/components/UserAvatar.vue';
import SearchBar from '@/features/core/components/search/SearchBar.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const showDropdown = ref(false);
const showMobileSearch = ref(false);

// Toggle the user dropdown menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Toggle mobile search
const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
};

// Close dropdown when clicking outside
const closeDropdown = (_e: MouseEvent) => {
  if (showDropdown.value) {
    showDropdown.value = false;
  }
  if (showMobileSearch.value) {
    showMobileSearch.value = false;
  }
};

// Handle logout action
const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
  showDropdown.value = false;
};

// User display name
const userDisplayName = computed(() => {
  return authStore.user?.username || 'Guest';
});

// User email or ID
const userSubtitle = computed(() => {
  return authStore.user?.slug || 'm@example.com';
});

// Check if user is authenticated
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

// Handle keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showMobileSearch.value) {
    showMobileSearch.value = false;
  }
};

// Setup click outside listener
onMounted(() => {
  document.addEventListener('click', closeDropdown);
  document.addEventListener('keydown', handleKeydown);
});

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <header class="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background w-full px-4 sm:px-6">
    <!-- Mobile Search Header (replaces everything when active) -->
    <div v-if="showMobileSearch" class="md:hidden flex flex-1 items-center gap-2" @click.stop>
      <button
        @click="showMobileSearch = false"
        class="p-2 hover:bg-muted rounded-full transition-colors"
        aria-label="Close search"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="flex-1">
        <SearchBar @search="showMobileSearch = false" />
      </div>
    </div>

    <!-- Normal Header (hidden when mobile search is active) -->
    <template v-else>
      <SidebarTrigger class="lg:hidden">
        <Menu class="h-6 w-6" />
      </SidebarTrigger>

      <div class="flex flex-1 items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <RouterLink 
            :to="{ name: 'Home', params: { lang: route.params.lang } }"
            class="font-semibold text-lg hover:text-primary transition-colors"
          >
            {{ t('app.name') }}
          </RouterLink>
        </div>

        <!-- Search Bar -->
        <div class="hidden md:block flex-1 max-w-2xl">
          <SearchBar />
        </div>

        <div class="flex items-center gap-2">
          <!-- Mobile Search Button -->
          <button
            @click.stop="toggleMobileSearch"
            class="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Search"
          >
            <Search class="h-5 w-5" />
          </button>

          <!-- Language Selector -->
          <LanguageSelector />
          <ThemeSelector />

          <!-- Login link when user is not authenticated -->
          <RouterLink
              v-if="!isAuthenticated"
              :to="{name: 'Login'}"
              class="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <LogIn class="h-5 w-5" />
            <span class="hidden sm:inline">{{ t('layout.header.login') }}</span>
          </RouterLink>

          <!-- User avatar only when authenticated -->
          <div v-else class="relative">
            <button
                @click.stop="toggleDropdown"
                class="focus:outline-none cursor-pointer"
                aria-label="Menu utilisateur"
            >
              <UserAvatar size="md" bordered />
            </button>
            <!-- Dropdown menu -->
            <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover border border-border text-popover-foreground"
            >
              <div class="p-2">
                <div class="px-4 py-2 border-b border-border flex items-center gap-3">
                  <UserAvatar size="sm" />
                  <div>
                    <p class="font-medium text-popover-foreground">{{ userDisplayName }}</p>
                    <p class="text-xs text-muted-foreground">{{ userSubtitle }}</p>
                  </div>
                </div>

                <div class="py-1">
                  <RouterLink
                      :to="{name: 'Profile'}"
                      class="flex items-center gap-2 px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                      @click="showDropdown = false"
                  >
                    <User class="h-4 w-4" />
                    <span>{{ t('layout.header.profile') }}</span>
                    <span class="ml-auto text-xs text-muted-foreground">⌘P</span>
                  </RouterLink>

                  <RouterLink
                      :to="{ name: 'UserProfile', params: { lang: route.params.lang, id: authStore.user?.id, slug: authStore.user?.slug } }"
                      class="flex items-center gap-2 px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                      @click="showDropdown = false"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{{ t('layout.header.myVideos') }}</span>
                    <span class="ml-auto text-xs text-muted-foreground">⌘V</span>
                  </RouterLink>

                  <RouterLink
                      :to="{name: 'DashboardIndex'}"
                      class="flex items-center gap-2 px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                      @click="showDropdown = false"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Dashboard</span>
                    <span class="ml-auto text-xs text-muted-foreground">⌘D</span>
                  </RouterLink>

                </div>

                <div class="py-1 border-t border-border">
                  <button
                      @click="handleLogout"
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md text-left"
                  >
                    <span>{{ t('layout.header.logout') }}</span>
                    <span class="ml-auto text-xs text-muted-foreground">⌘⇧Q</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </header>
</template>