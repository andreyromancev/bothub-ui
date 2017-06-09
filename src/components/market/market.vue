<template>
<div class="container-fluid">
    <div class="content">
        <input v-model="searchString" class="default-input search-input" type="text"/>
        <bot-card v-for="bot in bots" :key="bot.data.id" :model="bot"></bot-card>
    </div>
</div>
</template>

<script lang="ts" src="./market.ts"></script>
<style scoped lang="sass" src="./market.sass"></style>
