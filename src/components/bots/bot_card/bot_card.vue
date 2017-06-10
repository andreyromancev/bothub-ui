<template>
<router-link :to="`/bots/${bot.id}`" class="card">
    <div class="title">{{ bot.name }}</div>
    <div class="description">{{ bot.shortDescription }}</div>
</router-link>
</template>

<script lang="ts" src="./bot_card.ts"></script>
<style scoped lang="sass" src="./bot_card.sass"></style>
