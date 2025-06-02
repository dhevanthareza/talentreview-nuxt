<template>
  <div id="root" class="root mn--max hd--fair">
    <section id="content" class="content">
      <NuxtPage />
    </section>

    <AppSidebar />
  </div>

  <!-- SCROLL TO TOP BUTTON -->
  <div class="scroll-container">
    <a
      href="#root"
      class="scroll-page rounded-circle ratio ratio-1x1"
      aria-label="Scroll button"
    ></a>
  </div>
</template>

<script setup>
// Check authentication
const { getUser, isAuthenticated } = useAuth();

onMounted(() => {
  const user = getUser();
  if (!user) {
    navigateTo("/user/login");
  }
});
</script>
