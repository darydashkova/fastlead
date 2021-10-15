<template>
    <div  v-for="(file, index) in files" :key="index" class="modal-input-automessage__message-data-elem" :class="{'modal-input-automessage__message-data-elem_background': file[0].type.startsWith('video')}"> 
                        <div  v-if="file[0].type.startsWith('image')" :style="{
                        'background': `url(${file[1]}) no-repeat`,
                        'background-size': 'cover',
                        'background-position': 'center',
                        }"  class="modal-input-automessage__message-data-img"  ></div>
                            <video  v-else-if="file[0].type.startsWith('video')"  class="modal-input-automessage__message-data-video">
                                <source :src="file[1]">
                            </video>
                            <div v-else class="modal-input-automessage__message-data-docs">
                                <div class="modal-input-automessage__message-data-docs-circle">
                                    <svg class="modal-input-automessage__message-data-docs-circle-img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4998 6.66662H17.9498C17.6589 5.89568 17.2069 5.19568 16.624 4.6133L13.7207 1.7083C13.1376 1.12607 12.4374 0.674395 11.6665 0.383301V5.8333C11.6665 6.2935 12.0396 6.66662 12.4998 6.66662Z" fill="#F0F0FA"/>
                                    <path d="M18.3131 8.33332H12.4998C11.1191 8.33332 9.99982 7.21402 9.99982 5.83332V0.02C9.86564 0.0108203 9.7315 0 9.59564 0H5.83314C3.53311 0.00277344 1.66924 1.86664 1.6665 4.16668V15.8334C1.66924 18.1334 3.53311 19.9973 5.83314 20H14.1665C16.4665 19.9973 18.3304 18.1334 18.3331 15.8333V8.7375C18.3331 8.60168 18.3223 8.4675 18.3131 8.33332Z" fill="#F0F0FA"/>
                                    </svg>
                                    
                                </div>
                                {{file[0].name}}
                            </div>
                    </div>
</template>

<script>
export default {
    props: {
        files: Object
    },
    setup(props) {
    //   console.log(props.files)
        return {

        }
    },
}
</script>