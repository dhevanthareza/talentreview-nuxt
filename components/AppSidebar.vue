<template>
  <header class="header">
    <div class="header__inner">
      <!-- Brand -->
      <div class="header__brand">
        <div class="brand-wrap">
          <!-- Brand title -->
          <div class="brand-title">STAR</div>
        </div>
      </div>
      <!-- End - Brand -->

      <div class="header__content">
        <!-- Content Header - Left Side: -->
        <div class="header__content-start">
          <!-- Navigation Toggler -->
          <button
            type="button"
            class="nav-toggler header__btn btn btn-icon btn-sm"
            aria-label="Nav Toggler"
          >
            <i class="psi-view-list"></i>
          </button>
        </div>
        <!-- End - Content Header - Left Side -->
      </div>
    </div>
  </header>

  <nav id="mainnav-container" class="mainnav">
    <div class="mainnav__inner">
      <!-- Navigation menu -->
      <div class="mainnav__top-content scrollable-content pb-5">
        <!-- Navigation Category -->
        <div class="mainnav__categoriy py-3">
          <ul class="mainnav__menu nav flex-column">
            <!-- Dynamic menu items -->
            <li
              v-for="item in menuItems"
              :key="item.id"
              class="nav-item"
              :class="{ 'has-sub': item.type === 'submenu' }"
            >
              <!-- Regular menu link -->
              <template v-if="item.type === 'link'">
                <NuxtLink :to="item.route" class="mininav-toggle nav-link">
                  <i :class="`${item.icon} fs-5 me-2`"></i>
                  <span class="nav-label mininav-content ms-1">{{
                    item.title
                  }}</span>
                </NuxtLink>
              </template>

              <!-- Submenu link -->
              <template v-else-if="item.type === 'submenu'">
                <a href="#" class="mininav-toggle nav-link">
                  <i :class="`${item.icon} fs-5 me-2`"></i>
                  <span class="nav-label ms-1">{{ item.title }}</span>
                </a>

                <!-- Submenu list -->
                <ul
                  class="mininav-content nav collapse"
                  :class="{ show: openSubmenus[item.id] }"
                >
                  <li
                    v-for="child in item.children"
                    :key="child.id"
                    class="nav-item"
                  >
                    <NuxtLink
                      :to="child.route"
                      class="nav-link"
                      :class="{ active: route.path === child.route }"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
        <!-- END : Navigation Category -->
      </div>
      <!-- End - Navigation menu -->

      <!-- Bottom navigation menu -->
      <div class="mainnav__bottom-content border-top pb-2">
        <ul class="mainnav__menu nav flex-column">
          <li v-for="item in bottomMenuItems" :key="item.id" class="nav-item">
            <a
              href="#"
              class="nav-link mininav-toggle collapsed"
              @click.prevent="handleMenuAction(item)"
              aria-expanded="false"
            >
              <i :class="`${item.icon} fs-5 me-2`"></i>
              <span class="nav-label ms-1">{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- End - Bottom navigation menu -->
    </div>
  </nav>
</template>

<script setup>
const route = useRoute();
const { logout } = useAuth();

// Menu data
const menuItems = [
  {
    id: "home",
    title: "Home",
    icon: "pli-home",
    route: "/",
    type: "link",
  },
  {
    id: "profile",
    title: "Profile",
    icon: "pli-male",
    type: "submenu",
    children: [
      {
        id: "my-profile",
        title: "My Profile",
        route: "/profile",
      },
      {
        id: "my-cv",
        title: "My CV",
        route: "/profile/cv",
      },
      {
        id: "my-star",
        title: "My STAR",
        route: "/star",
      },
    ],
  },
  {
    id: "aspiration",
    title: "Aspiration",
    icon: "pli-gear",
    route: "/aspiration",
    type: "link",
  },
  {
    id: "job-posting",
    title: "Internal Job Posting",
    icon: "pli-gear",
    route: "/job-posting",
    type: "link",
  },
  {
    id: "subordinat",
    title: "Subordinat",
    icon: "pli-gear",
    type: "submenu",
    children: [
      {
        id: "review-start",
        title: "Review Start",
        route: "/review-star",
      },
    ],
  },
  {
    id: "trm-process",
    title: "Trm Process",
    icon: "pli-gear",
    route: "/trm-process",
    type: "link",
  },
];

const bottomMenuItems = [
  {
    id: "logout",
    title: "Logout",
    icon: "demo-pli-unlock",
    type: "action",
    action: "logout",
  },
];

// Track open submenus
const openSubmenus = ref({});

// Toggle submenu
const toggleSubmenu = (itemId) => {
  openSubmenus.value[itemId] = !openSubmenus.value[itemId];
};

// Handle menu actions
const handleMenuAction = async (item) => {
  if (item.action === "logout") {
    await handleLogout();
  }
};

const handleLogout = async () => {
  logout();
  await navigateTo("/user/login");
};

// Watch route changes to auto-open submenus
watch(
  () => route.path,
  (newPath) => {
    menuItems.forEach((item) => {
      if (
        item.type === "submenu" &&
        item.children.some((child) => newPath.startsWith(child.route))
      ) {
        openSubmenus.value[item.id] = true;
      }
    });
  },
  { immediate: true }
);

// Initialize
onMounted(async () => {
  // Auto-open submenus for current route
  menuItems.forEach((item) => {
    if (
      item.type === "submenu" &&
      item.children.some((child) => route.path.startsWith(child.route))
    ) {
      openSubmenus.value[item.id] = true;
    }
  });

  setTimeout(() => {
    try {
      initializeStyle();
    } catch (err) {}
  }, 200);
});
</script>
