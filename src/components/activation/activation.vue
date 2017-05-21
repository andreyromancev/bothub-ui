<template>
<div class="activation container-fluid">
    <div class="form activate-form align-middle">
        <div class="submit">
            <span @click="submit_activation" class="submit-login">Активировать</span>
            <i class="material-icons">keyboard_arrow_right</i>
        </div>
        <div class="panel">
            <input v-model="password" class="default-input" type="password" placeholder="Пароль"/>
        </div>
    </div>
</div>
</template>

<script lang="ts" src="./activation.ts"></script>
<style scoped lang="sass" src="./activation.sass"></style>
