export const useAuth = () => {
  const user = ref(null);

  const login = (credentials: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    // Accept any login credentials for mockup
    const mockUser = {
      id: "1237678",
      name: "Hari Prasetyo Tri Wicaksono",
      username: credentials.username,
      position: "Manager Channel Digitalization Operation",
      unit: "PRL JAB 20",
      company: "Pertamina Patra Niaga",
      department: "Pemasaran Regional",
      avatar: "/images/10.png",
      loginTime: new Date().toISOString(),
    };

    // Store in localStorage
    if (process.client) {
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("loginCredentials", JSON.stringify(credentials));
    }

    user.value = mockUser;
    return mockUser;
  };

  const logout = () => {
    if (process.client) {
      localStorage.removeItem("user");
      localStorage.removeItem("loginCredentials");
    }
    user.value = null;
  };

  const getUser = () => {
    if (process.client && !user.value) {
      const stored = localStorage.getItem("user");
      if (stored) {
        user.value = JSON.parse(stored);
      }
    }
    return user.value;
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user: readonly(user),
    login,
    logout,
    getUser,
    isAuthenticated,
  };
};