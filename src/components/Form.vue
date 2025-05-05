<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FormData {
    username: string
    role: string
}

const formData = reactive<FormData>({
    username: '',
    role: 'user',
})

const errors = ref<Record<keyof FormData, string>>({
    username: '',
    role: ''
})

const validations: Record<keyof FormData, (value: any) => string | undefined> = {
    username: (value) => {
        if(value.length < 3) {
            return '用户名至少3个字符'
        }
        if(!/^[a-zA-Z0-9]+$/.test(value)) {
            return '只能包含字母数字'
        }
        return undefined
    },
    role: (value) => {
        if(!value) {
            return '请选择用户角色'
        }
        return undefined
    }
}

const validateField = (field: keyof FormData) => {
    const validator = validations[field]
    if(validator) {
        errors.value[field] = validator(formData[field]) || ''
    }
}

const hadnleSubmit = () => {
    errors.value = {
        username: '',
        role: ''
    }
    Object.keys(validations).forEach((field: string) => {
        validateField(field as keyof FormData)
    })
    if(Object.values(errors.value).every((error) => !error)) {
        console.log('提交成功，formData: ', formData);
    } else {
        console.log('提交失败');
    }
}
</script>

<template>
    <form @submit.prevent="hadnleSubmit">
        <div class="form-group">
            <label for="username">用户名：</label>
            <input 
            type="text"
            id="username"
            class="form-input"
            placeholder="请输入..."
            v-model="formData.username"
            @input="validateField('username')"
            @blur="validateField('username')"
            >
            <div
            class="error"
            v-if="errors.username"
            >
                {{ errors.username }}
            </div>
        </div>
        <div class="form-group">
            <label for="role">用户角色：</label>
            <select 
            name="" 
            id="role"
            class="form-select"
            placeholder="请选择..."
            v-model="formData.role"
            @change="validateField('role')"
            @blur="validateField('role')"
            >
                <option value="">请选择...</option>
                <option value="admin">管理员</option>
                <option value="editor">编辑</option>
                <option value="user">普通用户</option>
            </select>
            <div v-if="errors.role" class="error">
                {{ errors.role }}
            </div>
        </div>
        <button type="submit" class="submit-btn">提交</button>
    </form>
</template>

<style scoped>
.form-group {
    margin-bottom: 1.5rem;
}

.form-input, .form-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
}

.form-select {
    appearance: none;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6"><path fill="%23333" d="M0 0L10 0L5 6z"/></svg>') no-repeat right 12px center;
    background-size: 12px;
    padding-right: 30px;
}

.error {
    color: #dc3545;
    font-size: 0.875em;
    margin-top: 0.25rem;
}

.submit-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #0056b3;
}
</style>