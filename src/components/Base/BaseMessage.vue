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
                        <svg v-if="message.is_read && message.is_sending"  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                        </svg>
                         <svg class="base-message__is-read" v-else-if="message.is_read && !message.is_sending" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div class="base-message__docs-img-save preloader" v-if="preloaderActive">
                        <svg class="preloader__image" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="48px" height="48px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M64 128A64 64 0 0 1 18.34 19.16L21.16 22a60 60 0 1 0 52.8-17.17l.62-3.95A64 64 0 0 1 64 128z" fill="#fffcfc"/>
                        <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></g></svg>
                        <svg class="preloader__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6288 0.372219C15.3904 0.133887 15.0671 0 14.73 0C14.3928 0 14.0695 0.133887 13.8311 0.372219L8.00098 6.20239L2.17081 0.372219C1.93241 0.133887 1.6091 0 1.272 0C0.9349 0 0.611599 0.133887 0.373195 0.372219C0.134864 0.610622 0.000976562 0.933923 0.000976562 1.27103C0.000976562 1.60813 0.134864 1.93143 0.373195 2.16983L6.20336 8L0.373195 13.8302C0.134864 14.0686 0.000976563 14.3919 0.000976562 14.729C0.000976563 15.0661 0.134864 15.3894 0.373195 15.6278C0.611599 15.8661 0.9349 16 1.272 16C1.6091 16 1.93241 15.8661 2.17081 15.6278L8.00098 9.79761L13.8311 15.6278C14.0695 15.8661 14.3928 16 14.73 16C15.0671 16 15.3904 15.8661 15.6288 15.6278C15.8671 15.3894 16.001 15.0661 16.001 14.729C16.001 14.3919 15.8671 14.0686 15.6288 13.8302L9.79859 8L15.6288 2.16983C15.8671 1.93143 16.001 1.60813 16.001 1.27103C16.001 0.933923 15.8671 0.610622 15.6288 0.372219Z" fill="#F0F0FA"/>
                        </svg>
                    </div>
                    <div class="base-message__docs-img-save" v-else>
                    <svg class="preloader__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4998 6.66662H17.9498C17.6589 5.89568 17.2069 5.19568 16.624 4.6133L13.7207 1.7083C13.1376 1.12607 12.4374 0.674395 11.6665 0.383301V5.8333C11.6665 6.2935 12.0396 6.66662 12.4998 6.66662Z" fill="#F0F0FA"/>
                    <path d="M18.3131 8.33332H12.4998C11.1191 8.33332 9.99982 7.21402 9.99982 5.83332V0.02C9.86564 0.0108203 9.7315 0 9.59564 0H5.83314C3.53311 0.00277344 1.66924 1.86664 1.6665 4.16668V15.8334C1.66924 18.1334 3.53311 19.9973 5.83314 20H14.1665C16.4665 19.9973 18.3304 18.1334 18.3331 15.8333V8.7375C18.3331 8.60168 18.3223 8.4675 18.3131 8.33332Z" fill="#F0F0FA"/>
                    </svg>
                    </div>
                    <div class="base-message__docs-container">
                        <div class="base-message__docs-title">
                            <a :href="'#'" @mouseup="downloadDocs(message)" class='base-message__docs-link'>{{message.file_name}}</a>
                            </div>
                        <div class="base-message__docs-container-size">
                            <div>
                                {{conv_size(message.size)}} 
                            </div>
                            <div class="base-message__state">{{validTime(message.time)}}
                                <svg v-if="message.is_read && message.is_sending"  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                        </svg>
                         <svg class="base-message__is-read" v-else-if="message.is_read && !message.is_sending" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
               
            </div>
        </div>
        <div v-if="message.type === 'video'" class="base-message__container ">
            <div class="base-message__message base-message__message_full">
                <div class="base-message__docs">
                    <div class="base-message__docs-title">
                        <div @click="videoPlayer" >
                                    <video :src="convertedSrc" class="modal-send-videos__video" >
                                    </video > 
                                    <div class="modal-send-videos__player">
                                        <svg v-if="!statusSvg"   class="modal-send-videos__video-container-play" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16.5" cy="16.5" r="16.5" fill="#2E2E4E" fill-opacity="0.8"/>
                                        <g clip-path="url(#clip0)">
                                        <path d="M13.9242 8.91488C12.4934 8.09412 11.3333 8.7665 11.3333 10.4155V22.5842C11.3333 24.2348 12.4934 24.9063 13.9242 24.0864L24.5603 17.9866C25.9917 17.1656 25.9917 15.8354 24.5603 15.0145L13.9242 8.91488Z" fill="#EDEDEF"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0">
                                        <rect width="15.871" height="15.871" fill="white" transform="translate(10.5481 8.56494)"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                    </div>
                            </div>
                    </div>
                </div>
                   <div class="base-message__state  base-message__state_background">{{validTime(message.time)}}
                    <svg v-if="message.is_read && message.is_sending"  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                    </svg>
                    <svg class="base-message__is-read" v-else-if="message.is_read && !message.is_sending"  width="17" height="12" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 7.1L4.76617 9.5L11.5853 1.5" stroke="#F0F0FA" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M9.6807 9.5L9.25952 10.1206L9.81555 10.4979L10.2515 9.98653L9.6807 9.5ZM17.0706 1.98653C17.3393 1.6713 17.3016 1.19792 16.9864 0.929221C16.6712 0.660518 16.1978 0.698238 15.9291 1.01347L17.0706 1.98653ZM7.74532 9.09287L9.25952 10.1206L10.1019 8.87943L8.58769 7.85174L7.74532 9.09287ZM10.2515 9.98653L17.0706 1.98653L15.9291 1.01347L9.10992 9.01347L10.2515 9.98653Z" fill="#F0F0FA"/>
                    </svg>
                    <svg v-else class="base-message__is-read" width="13" height="11"   viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 7.1L4.76617 9.5L11.5853 1.5" stroke="#F0F0FA" stroke-width="1.5" stroke-linecap="round"/>
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
    import {useMessages} from "../../composition/useMessages";
    import {useModalsVideos} from "../../composition/useModalsVideos";

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
            const { preloaderActive } = useMessages();
            const {videoPlayer} = useModalsVideos();
            const fullTextMessage = computed(() => {  
                if (props.message.type === 'text') {
                    let str = wrapEmoji(props.message.message.replace(/\n/g, '<br>'));
                    str = str + ` <div class="base-message__state">
                        ${validTime(props.message.time)}`

                  let subst = props.message.is_me? (
                      !props.message.is_read && props.message.is_sending? 
                      `<svg  viewBox="0 0 16 15" width="16" height="15" class="base-message__is-read">
                        <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"/>
                        </svg>` 
                        : 
                        props.message.is_read && !props.message.is_sending? `
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
                }

            }
           const downloadDocs = (message) => {
            const link = document.createElement('a');
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
            function conv_size(b){
                let fsizekb = b / 1024,
                    fsizemb = fsizekb / 1024,
                    fsizegb = fsizemb / 1024,
                    fsizetb = fsizegb / 1024,
                    fsize
                if (fsizekb <= 1024) {
                    fsize = fsizekb.toFixed(2) + ' KB';
                } else if (fsizekb >= 1024 && fsizemb <= 1024) {
                    fsize = fsizemb.toFixed(2) + ' MB';
                } else if (fsizemb >= 1024 && fsizegb <= 1024) {
                    fsize = fsizegb.toFixed(2) + ' GB';
                } else {
                    fsize = fsizetb.toFixed(2) + ' TB';
                }
                return fsize;
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
                conv_size,
                videoPlayer
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
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .base-message__state_background{
                background: rgba(46, 46, 78, 0.7);
                border-radius: 39px; 
                padding: 5px 0px;
                min-width: 73px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 98%;
                transform: translateY(-98%);
                right: 7.5px;
            }
        }
    }
    .base-message__image {
        width: 100%;
        margin-bottom: 0;
        height: 280px;
        position: relative;
    }
    .base-message__state{
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 19px;
        min-width: 79px;

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
    .base-message__docs-link{
        color: #EDEDEF;
        text-decoration: none;
    }
    .base-message__docs{
        display: flex;
    }
.preloader { }
.base-message__docs-img-save{
        overflow: hidden;
        position: relative;
        width: 48px;
        height: 48px;
        background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
        border-radius: 48px;
        z-index: 1001;
}
.base-message__docs-title{
    display: flex;
    flex-direction: column;
}
.base-message__docs-container{
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.base-message__docs-container-size{
    display: flex;
}
.preloader__image {
  position: absolute;
  width: 48px;
  height: 48px;
  text-align: center;
  animation: preloader-rotate 2s infinite linear;
}
.preloader__icon {
    position: absolute;
    z-index: 99999;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
}
@keyframes preloader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.loaded_hiding .preloader {
  transition: 0.3s opacity;
  opacity: 0;
}

</style>