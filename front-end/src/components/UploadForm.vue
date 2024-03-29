<template>
    <div>
        <label class="upload-button">
            Subir arquivo
            <input type="file" accept=".csv, .xlsx" @change="handleFileUpload" class="file-input">
        </label>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        async handleFileUpload(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Fazer uma requisição para enviar o arquivo para o back-end
                const response = await axios.post('http://localhost:3000/upload', formData);

                this.$emit('file-uploaded', response.data);
            } catch (error) {
                console.error('Erro ao enviar arquivo:', error);
            }
        }
    }
};
</script>

<style scoped>
.upload-button {
    display: inline-block;
    background-color: #1bda7e;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 600;
    border-radius: 5px;
    font-size: 14px;
}

.upload-button:hover {
    background-color: #45a049;
    /* transition: opacity .2s; */
}

.file-input {
    display: none;
}
</style>