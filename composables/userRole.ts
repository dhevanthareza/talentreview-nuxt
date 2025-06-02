export const useUserRole = () => {
  const userRole = ref<"user" | "supervisor" | "committee">("user");

  const loadUserRole = () => {
    console.log("mnasul")
    const credentials = localStorage.getItem("loginCredentials");
    console.log(credentials)
    if (credentials) {
      const { username } = JSON.parse(credentials);
      console.log(username)
      switch (username) {
        case "supervisor":
          userRole.value = "supervisor";
          break;
        case "committee":
          userRole.value = "committee";
          break;
        case "employee":
        default:
          userRole.value = "user";
          break;
      }
    }
  };

  return {
    userRole,
    loadUserRole,
    isSupervisor: computed(() => userRole.value === "supervisor"),
    isCommittee: computed(() => userRole.value === "committee"),
    isEmployee: computed(() => userRole.value === "user"),
  };
};
