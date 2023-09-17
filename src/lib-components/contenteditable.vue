<style scoped>
</style>

<template>
    <component
            :is="this.tag"
            :contenteditable="this.contenteditable"
            @input="this.update"
            @blur="this.update"
            @paste="this.onPaste"
            @keypress="this.onKeypress"
            ref="element"
    >
    </component>
</template>

<script>
    import { defineComponent, ref, watch, onMounted } from 'vue';

    export default defineComponent({
        name: 'contenteditable',
        props : {
            'tag' : String,
            'id' : String,
            'contenteditable' : {
                type : Boolean,
                default : true,
            },
            'modelValue' : String,
            'noHTML' : {
                type : Boolean,
                default : true,
            },
            'noNL' : {
                type : Boolean,
                default : false,
            },
        },
        methods: {
            replaceAll(str, search, replacement) {
                return str.split(search).join(replacement);
            },
        }
        ,emits : {
            'returned' : String,
            'update:modelValue' : String,
            'onTemplateMenu': String,
        },
        setup(props, {emit} ){
            const element = ref<HTMLElement | null>(null)

            function currentContent(){
                let ret = undefined;
                if(props.noHTML) {
                    if(element.value) {
                        ret = element.value.innerText;
                    }
                } else {
                    if(element.value) {
                        ret = element.value.innerHTML;
                    }
                }
                return ret;
            }
            function updateContent(newcontent){
                if(props.noHTML) {
                    if(element.value !== undefined) {
                        element.value.innerText = newcontent;
                    }
                }
                else {
                    if(element.value !== undefined) {
                        element.value.innerHTML = newcontent;
                    }
                }
            }
            function update(event) {
                console.log('update?', event);
                // emit('update:modelValue', currentContent());
                emit('update:modelValue', event.target.innerHTML);
            }
            function onPaste(event) {
                event.preventDefault();
                let text = (event.originalEvent || event).clipboardData.getData('text/plain');
                if(props.noNL) {
                    text = replaceAll(text, '\r\n', ' ');
                    text = replaceAll(text, '\n', ' ');
                    text = replaceAll(text, '\r', ' ');
                }
                window.document.execCommand('insertText', false, text);
            }
            function onKeypress(event) {
              console.log('event', event);
                if(event.key == 'Enter' && props.noNL) {
                    event.preventDefault();
                    const ret = {
                      id: props.id,
                      content: currentContent()
                    }
                    emit('returned', ret, event);
                } else if(event.key == '/') {
                  emit('onTemplateMenu');
                } else if(event.keyCode == '38') {
                  console.log('arrow up');
                } else if(event.keyCode == '40') {
                  console.log('arrow down');
                }

            }
            onMounted(() =>{
                updateContent(props.modelValue ?? '')
            })
            watch( () => props.modelValue, (newval, oldval) => {
                if(newval != currentContent()){
                    updateContent(newval ?? '')
                }
            })
            return {
                update,
                onPaste,
                onKeypress,
                element,
            }
        },
    })

    /*export default defineComponent({
        name : 'contenteditable',
        props : {
            'tag' : String,
            'contenteditable' : {
                type : Boolean,
                default : true,
            },
            'modelValue' : String,
            'noHTML' : {
                type : Boolean,
                default : true,
            },
            'noNL' : {
                type : Boolean,
                default : false,
            },
        },
        emits : {
            'returned' : String,
            'update:modelValue' : String,
        },
        setup(props, {emit} ){
            const element = ref<HTMLElement | null>(null)

            function currentContent(){
                return props.noHTML ?
                    element.value!.innerText
                    :
                    element.value!.innerHTML
            }
            function updateContent(newcontent: string){
                if(props.noHTML) {
                    element.value!.innerText = newcontent;
                }
                else {
                    element.value!.innerHTML = newcontent;
                }
            }
            function update(event: any) {
                emit('update:modelValue', currentContent());
            }
            function onPaste(event: any) {
                event.preventDefault();
                let text = (event.originalEvent || event).clipboardData.getData('text/plain');
                if(props.noNL) {
                    text = replaceAll(text, '\r\n', ' ');
                    text = replaceAll(text, '\n', ' ');
                    text = replaceAll(text, '\r', ' ');
                }
                window.document.execCommand('insertText', false, text);
            }
            function onKeypress(event: any) {
                if(event.key == 'Enter' && props.noNL) {
                    event.preventDefault();
                    emit('returned', currentContent());
                }
            }
            onMounted(() =>{
                updateContent(props.modelValue ?? '')
            })
            watch( () => props.modelValue, (newval, oldval) => {
                if(newval != currentContent()){
                    updateContent(newval ?? '')
                }
            })
            return {
                update,
                onPaste,
                onKeypress,
                element,
            }
        },
    })*/
</script>
