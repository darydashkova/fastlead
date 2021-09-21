<template>
  <div class="base-message__docs-img-save preloader" v-if="preloaderActive">
        <svg class="preloader__image" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="48px" height="48px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M64 128A64 64 0 0 1 18.34 19.16L21.16 22a60 60 0 1 0 52.8-17.17l.62-3.95A64 64 0 0 1 64 128z" fill="#fffcfc"/>
        <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></g></svg>
        <svg class="preloader__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.6288 0.372219C15.3904 0.133887 15.0671 0 14.73 0C14.3928 0 14.0695 0.133887 13.8311 0.372219L8.00098 6.20239L2.17081 0.372219C1.93241 0.133887 1.6091 0 1.272 0C0.9349 0 0.611599 0.133887 0.373195 0.372219C0.134864 0.610622 0.000976562 0.933923 0.000976562 1.27103C0.000976562 1.60813 0.134864 1.93143 0.373195 2.16983L6.20336 8L0.373195 13.8302C0.134864 14.0686 0.000976563 14.3919 0.000976562 14.729C0.000976563 15.0661 0.134864 15.3894 0.373195 15.6278C0.611599 15.8661 0.9349 16 1.272 16C1.6091 16 1.93241 15.8661 2.17081 15.6278L8.00098 9.79761L13.8311 15.6278C14.0695 15.8661 14.3928 16 14.73 16C15.0671 16 15.3904 15.8661 15.6288 15.6278C15.8671 15.3894 16.001 15.0661 16.001 14.729C16.001 14.3919 15.8671 14.0686 15.6288 13.8302L9.79859 8L15.6288 2.16983C15.8671 1.93143 16.001 1.60813 16.001 1.27103C16.001 0.933923 15.8671 0.610622 15.6288 0.372219Z" fill="#F0F0FA"/>
        </svg>
    </div>
    <div class="base-message__docs-img-save" v-else>
        <svg width="20" class="preloader__icon" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4998 6.66662H17.9498C17.6589 5.89568 17.2069 5.19568 16.624 4.6133L13.7207 1.7083C13.1376 1.12607 12.4374 0.674395 11.6665 0.383301V5.8333C11.6665 6.2935 12.0396 6.66662 12.4998 6.66662Z" fill="url(#paint0_linear)"/>
        <path d="M18.3131 8.33332H12.4998C11.1191 8.33332 9.99982 7.21402 9.99982 5.83332V0.02C9.86564 0.0108203 9.7315 0 9.59564 0H5.83314C3.53311 0.00277344 1.66924 1.86664 1.6665 4.16668V15.8334C1.66924 18.1334 3.53311 19.9973 5.83314 20H14.1665C16.4665 19.9973 18.3304 18.1334 18.3331 15.8333V8.7375C18.3331 8.60168 18.3223 8.4675 18.3131 8.33332Z" fill="url(#paint1_linear)"/>
        <defs>
        <linearGradient id="paint0_linear" x1="9.06785" y1="9.14892" x2="19.2685" y2="-0.819061" gradientUnits="userSpaceOnUse">
        <stop stop-color="#22A595"/>
        <stop offset="1" stop-color="#84D160"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="-5.22649" y1="27.9012" x2="26.578" y2="2.00217" gradientUnits="userSpaceOnUse">
        <stop stop-color="#22A595"/>
        <stop offset="1" stop-color="#84D160"/>
        </linearGradient>
        </defs>
        </svg>
    </div>
</template>

<script>
import {useMessages} from "../../composition/useMessages";
export default {
    
  setup(props) {
       const { preloaderActive } = useMessages();
    return {};
  },
};
</script>
<style lang="scss">
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