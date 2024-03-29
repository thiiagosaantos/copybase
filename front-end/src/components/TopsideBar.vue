<template>
    <div class="topside-bar">
        <img src="../assets/logo-branco.svg" alt="Logo" class="logo">
        <div class="menu">
            <UploadForm @file-uploaded="handleFileUploaded" />
        </div>
    </div>
</template>

<script>
import UploadForm from '@/components/UploadForm.vue';

export default {
    name: 'TopsideBar',
    components: {
        UploadForm
    },
    methods: {
        handleFileUploaded(data) {
            this.$emit('file-uploaded', data);
        }
    }
};
</script>

<style scoped>
.topside-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgb(112, 45, 250);
    background: linear-gradient(90deg, rgba(112, 45, 250, 1) 0%, rgba(82, 25, 164, 1) 50%, rgba(85, 19, 180, 1) 100%);
    color: white;
    text-align: center;
    z-index: 1000;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    max-width: 200px;
    margin-left: 30px;
}

.menu {
    margin-right: 30px; 
}
</style>
