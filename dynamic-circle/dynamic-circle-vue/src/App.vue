<template>
  <main>
    <label>
      Purple
      <input type="checkbox" value="{isPurple}" v-model="isPurple" />
    </label>

    <label>
      text color
      <select v-model="textColor">
        <option value="" selected>White</option>
        <option value="text-black">Black</option>
        <option value="text-orange">Orange</option>
      </select>
    </label>

    <label>
      Circle Size
      <input type="number" value="{size}" v-model="size" />
    </label>

    <label>
      Circle Rotate
      <input type="number" value="{rotate}" v-model="rotate" />
    </label>
    <div
      :class="['circle', { purple: isPurple }, textColor]"
      :style="circleStyle"
    >
      Hi!
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';

const isPurple = ref(false);
const textColor = ref('');
const size = ref(150);
const rotate = ref(0);

const circleStyle = computed(() => {
  return {
    width: `${size.value}px`,
    height: `${size.value}px`,
    transform: `rotate(${rotate.value}deg)`,
  };
});
</script>

<style scoped>
body {
  font-size: 20px;
  font-family: sans-serif;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
label {
  margin-bottom: 20px;
  font-size: 20px;
  display: block;
}
select {
  font-size: 20px;
  margin-bottom: 20px;
}
input[type='number'] {
  display: block;
  font-size: 20px;
  margin-bottom: 20px;
}
.circle {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: #45d619;
  text-align: center;
  color: #fff;
  line-height: 150px;
  font-size: 32px;
  font-weight: bold;
}

.purple {
  background-color: purple;
}
.text-black {
  color: #424242;
}
.text-orange {
  color: #ffc26f;
}
</style>
