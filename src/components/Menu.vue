<template>
    <div class="menu">
        <h4>Hello X-Vue3-Design!</h4>
        <ul>
            <li>
                <RouterLink to="/">RichTextEditor</RouterLink>
            </li>
            <li>
                <RouterLink to="/Button">Button</RouterLink>
            </li>
            <li>
                <RouterLink to="/Form">Form</RouterLink>
            </li>
            <li>
                <RouterLink to="/VirtualList">VirtualList</RouterLink>
            </li>
            <li>
                <RouterLink to="/WaterMark">WaterMark</RouterLink>
            </li>
            <li>
                <RouterLink to="/about">about</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.menu {
    height: 90vh;
    width: 200px;
    border-right: 1px solid #eee
}
ul {
    list-style: none;
}
</style>