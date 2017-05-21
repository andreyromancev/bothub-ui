<template>
<div class="container-fluid">
    <div @click="logout" class="hello">Логин: {{ login }}. Жмяки, чтобы выйти.</div>
</div>
</template>

<script lang="ts" src="./messenger.ts"></script>
<style scoped lang="sass" src="./messenger.sass"></style>
