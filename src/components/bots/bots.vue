<template>
<div class="container-fluid">
    <div class="content">
        <input v-model="searchString" class="default-input search-input" type="text"/>
        <bot-card v-for="bot in bots" :key="bot.content.id" :model="bot"></bot-card>
    </div>
</div>
</template>

<script lang="ts" src="./bots.ts"></script>
<style scoped lang="sass" src="./bots.sass"></style>
