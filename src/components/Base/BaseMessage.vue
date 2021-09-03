<template>
    <div class="base-message"
        :class="{
            'base-message_my' : message.is_me,
            'base-message_not-my' : !message.is_me,
        }"
    >
        <div v-if="message.type === 'text'" class="base-message__container">
            <div class="base-message__message"
                 v-html="fullTextMessage"></div>
        </div>
        <div v-if="message.type === 'img'" class="base-message__container base-message__container_full">
            <div class="base-message__message base-message__message_full">
                <div class="base-message__image"
                     :style="{'background': `url(${convertedSrc}) center center / cover no-repeat`}"
                >
                    <div class="base-message__state base-message__state_image" style="color: white;">
                        {{validTime(message.time)}}
                        <svg v-if="message.is_read&&message.is_sending"  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                        </svg>
                         <svg class="base-message__is-read" v-else-if="message.is_read&&!message.is_sending" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                                      stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                                      fill="#2A5F5F"/>
                            </svg>
                        <svg v-else class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                                  :stroke="message.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="message.type === 'document'" class="base-message__container">
          <div class="base-message__message">
                <div class="base-message__docs">
                    <div class="base-message__docs-img">

                    </div>
                    <div class="base-message__docs-title">
                        <a :href="'#'" @mouseup="downloadDocs(message)"  :id="'linkDownload_'+message.message_id" >{{message.file_name}}</a><!--{{res}}-->
                    </div>
                </div>
               <div class="base-message__state">{{validTime(message.time)}}
                    <svg v-if="message.is_read&&message.is_sending"  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                    </svg>
                    <svg class="base-message__is-read" v-else-if="message.is_read&&!message.is_sending" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                        stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                        fill="#2A5F5F"/>
                    </svg>
                    <svg v-else class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                        :stroke="message.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
        </div>
                <div v-if="message.type === 'video'" class="base-message__container ">
            <div class="base-message__message base-message__message_full">
                <div class="base-message__docs">
                    <div class="base-message__docs-title">
                       <video :src="convertedSrc" controls  >
                        </video>
                    </div>
                </div>
                   <div class="base-message__state">{{validTime(message.time)}}
                    <svg v-if="message.is_read&&message.is_sending"  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                    </svg>
                    <svg class="base-message__is-read" v-else-if="message.is_read&&!message.is_sending" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                        stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                        fill="#2A5F5F"/>
                    </svg>
                    <svg v-else class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                        :stroke="message.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
           
            </div>
        </div>
    </div>
</template>

<script>
    import { useDate } from "../../composition/useDate";
    import { computed, ref, onMounted } from 'vue'
    import { useEmoji } from "../../composition/useEmoji";
    import {useImages} from "../../composition/useImages";
  
    export default {  
             
        props: {
            message: {
                is_me: Boolean,
                is_read: Boolean,
                message: String,
                message_id: [Number, String],
                message_uid: [Number, String],
                time: [Number],
                type: [String],
                is_sending:Boolean,
                file_name: String
            }, 
        },
        
        setup(props) {
            const expansion = ref("");
            const res = ref("");
            const { validTime } = useDate()
            const { wrapEmoji } = useEmoji()
            const { getImage } = useImages()
            const fullTextMessage = computed(() => {  
                if (props.message.type === 'text') {
                    let str = wrapEmoji(props.message.message.replace(/\n/g, '<br>'));
                    str = str + ` <div class="base-message__state">
                        ${validTime(props.message.time)}`

                  let subst = props.message.is_me? (
                      !props.message.is_read&&props.message.is_sending? 
                      `<svg  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                        </svg>` 
                        : 
                        props.message.is_read&&!props.message.is_sending? `
                            <svg class="base-message__is-read" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                                      stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                                      fill="#2A5F5F"/>
                            </svg>
                            ` : `<svg class="base-message__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                                      stroke="#2A5F5F" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>`) : '';
                    return str + subst + `</div>`;  
                }
          
                
            })
            const urlDocs = () => {
                if (props.message.type === 'document'){
                    const expansion = props.message.file_name;
                    const res = expansion.split('.').pop(); 
                    console.log( props.message.file_name)
                    console.log(res)
                }

            }
           const downloadDocs = (message) => {
            const link = document.getElementById('linkDownload_'+message.message_id)   
            convertedSrc.value='#';    
                     if (props.message.type === 'document') {
                        getImage(props.message.document)
                        .then(r => { 
                            let url = URL.createObjectURL(r);
                            convertedSrc.value = `${url}`;
                            link.setAttribute('href', convertedSrc.value);
                            link.setAttribute('download',message.file_name);
                            link.click();      
                        })
                }
                      
           }
            const convertedSrc = ref(null);
            onMounted(() => {
                if (props.message.type === 'img') {
                    getImage(props.message.img)
                        .then(r => {
                            let url = URL.createObjectURL(r);
                            convertedSrc.value = `${url}`;

                        })
                }
                 if (props.message.type === 'video') {
                    getImage(props.message.video)
                        .then(r => {
                            let url = URL.createObjectURL(r);
                            convertedSrc.value = `${url}`;

                        })
                }
            })

            return {
                message: computed(() => props.message),
                validTime,
                wrapEmoji,
                fullTextMessage,
                convertedSrc,
                urlDocs,
                expansion,
                res,
                downloadDocs,
            }
        }

    }
</script>

<style lang="scss">
    .base-message {
        width: 100%;
        display: flex;
        margin: 5px 0;
    }
    .base-message__container {
        padding: 8px 10px;
        border-radius: 0px 9px 9px 9px;
        position: relative;
        max-width: calc(50% - 10px);
        display: flex;
        justify-content: space-between;
        min-height: 30px;
        &.base-message__container_full {
            width: calc(50% - 10px);
        }
    }
    .base-message__message {
        /*white-space: pre-wrap;*/
        word-wrap: break-word;
        text-align: left;
        max-width: 100%;
        padding: 0 5px 5px;
        &.base-message__message_full {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
    .base-message__image {
        width: 100%;
        margin-bottom: 0;
        height: 280px;
        position: relative;
    }
    .base-message__state{
        display: inline-block;
        //float: right;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 19px;
        min-width: 79px;
        transform: translateY(8px) translateX(5px);
        padding-left: 22px;
        text-align: right;
        &.base-message__state_image {
            display: flex;
            align-self: flex-end;
            align-items: center;
            justify-content: flex-end;

            position: absolute;
            right: 0;
            bottom: 0;
            padding: 0;
            transform: translate(0);
        }
    }
    .base-message__is-read {
        margin-left: 3px;
        width: 17px;
    }
    .base-message_my {
        justify-content: flex-end;
        .base-message__container {
            border-radius: 9px 0px 9px 9px;
            background: var(--green-color);
            color: var(--font-my-message-color);
        }
    }
    .base-message_not-my {
        justify-content: flex-start;
        .base-message__container {
            border-radius: 0px 9px 9px 9px;
        }
        .base-message__container {
            background: var(--messages-color);
            color: var(--font-color);
        }
        .base-message__state{
            color: var(--sub-text-color);
            &.base-message__state_image {
                color: white;
            }
        }
    }
    .base-message_my + .base-message_not-my {
        margin-top: 16px;
    }
    .base-message_not-my + .base-message_my {
        margin-top: 16px;
    }
</style>