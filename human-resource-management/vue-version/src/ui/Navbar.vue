<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <router-link :to="{ name: 'home' }">
        <a class="btn btn-ghost text-xl"> Admin Panel </a>
      </router-link>
    </div>

    <!-- User Button -->
    <div class="navbar-end" v-if="user">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              :src="user.user_metadata.avatar"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a @click="toggleTheme">Switch To {{ oppositeTheme }}</a>
          </li>
          <li><a @click="logoutCurrentUser">Logout</a></li>
        </ul>
      </div>
    </div>

    <div class="navbar-end" v-else>
      <button
        class="btn btn-primary mx-1"
        @click="goToLogin"
        onclick="auth_form.showModal()"
      >
        Login
      </button>
      <button
        class="btn btn-accent mx-1"
        @click="goToSignup"
        onclick="auth_form.showModal()"
      >
        Signup
      </button>
    </div>
  </div>

  <dialog id="auth_form" class="modal">
    <Modal>
      <AuthForm />
    </Modal>
  </dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { useAuthPath } from '@/features/auth/useAuthPath';
import { useThemeToggle } from '@/hooks/useThemeToggle';

import Modal from '@/ui/Modal.vue';
import AuthForm from '@/features/auth/AuthForm.vue';

const userStore = useUserStore();
const { logoutCurrentUser } = userStore;
const { user } = storeToRefs(userStore);

const { goToLogin, goToSignup } = useAuthPath();
const { oppositeTheme, toggleTheme } = useThemeToggle();
</script>
