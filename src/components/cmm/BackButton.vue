<template>
    <button @click="onBack">{{$t('button.back')}}</button>
</template>

<script>
    export default {
        name: 'BackButton',
        props: {
            buttonName: {
                type: String,
                require: true
            }
        },
        methods: {
            onBack() {
                this.$router.back();
            }
        }
    }
</script>
