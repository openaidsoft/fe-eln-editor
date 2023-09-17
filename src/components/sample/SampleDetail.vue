<template>
    <div>
        ㅇㅇㅇㅇ {{boardId}} --
    </div>
    <div v-if="obj">
        ID : {{obj.id}}<br/>
        Title: {{obj.title}}<br/>
        Content: {{obj.body}}
    </div>
</template>

<script>
    import SampleService from '@/services/sample.service'

    export default {
        name: 'SampleDetail',
        props: {
            boardId: {
                type: String,
                required: true
            }
        },
        data: function() {
            return {
                id: this.boardId,
                obj: null
            }
        },
        mounted() {
            SampleService.getDetail(this.id)
                .then(response => {
                    this.obj = response;
                }).catch(reason => {
                  console.log(reason);
                });
        }
    }
</script>
