<template>
<div class="login container-fluid">
    <div class="row">
        <div class="col-sm">
            <div class="form login-form align-middle">
                <div class="submit">
                    <span @click="submit_login" class="submit-login">Войти</span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
                <div class="panel">
                    <input v-model="username" class="default-input" placeholder="Email"/>
                    <input v-model="password" class="default-input" type="password" placeholder="Пароль"/>
                </div>
            </div>
        </div>
        <div class="col-sm">
            <div class="form register-form align-middle">
                <div class="submit">
                    <span @click="submit_register" class="submit-register">Зарегистрироваться</span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
                <div class="panel">
                    <input v-model="username" class="default-input" placeholder="Email"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" src="./login.ts"></script>
<style scoped lang="sass" src="./login.sass"></style>
