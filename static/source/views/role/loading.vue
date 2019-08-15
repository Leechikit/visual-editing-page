<template>
    <div class="loading">
        <a v-if="showLoadingImg"><img src="../../images/loading.gif" /></a>
        <p class="desc" style="color:#fff;">{{title}}</p>
    </div>
</template>

<script>

export default {
    props: {
        title:{
            type: String,
            default: ''
        },
        showLoadingImg: {
            type: Boolean,
            default: true
        }
    },
}
</script>

<style>


.loading img{
    width: 12%;
}

</style>




// WEBPACK FOOTER //
// src/components/role/loading.vue