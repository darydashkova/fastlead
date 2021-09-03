<template>
    <div class="base-grouped-images"
         :class="{
            'base-grouped-images_my' : images.is_me,
            'base-grouped-images_not-my' : !images.is_me,
        }"
         v-if="!loading"
    >
        <div class="base-grouped-images__container">
            <div class="base-grouped-images__message base-grouped-images__message_full">
                <div class="base-grouped-images__image"
                     v-for="img in imgs"
                     :key="img.message_id"
                     :style="{'background': `url(${img.img}) no-repeat`, 'background-size': 'cover', 'background-position': 'center center' }"
                >
                    <div class="base-grouped-images__count" v-if="img.count">
                        {{`+${img.count}`}}
                    </div>
                    <div class="base-grouped-images__state" style="color: white;">
                        {{validTime(img.time)}}
                        <svg v-if="img.is_read" class="base-grouped-images__is-read" width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.844971 7.64866L4.15637 10.2049L11.07 1.68408"
                                  :stroke="img.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M9.13905 10.2049L8.70363 10.8156L9.27743 11.2247L9.72145 10.6775L9.13905 10.2049ZM16.635 2.15663C16.896 1.83498 16.8468 1.36266 16.5252 1.10168C16.2035 0.840694 15.7312 0.889878 15.4702 1.21153L16.635 2.15663ZM7.16847 9.72098L8.70363 10.8156L9.57446 9.59425L8.0393 8.49964L7.16847 9.72098ZM9.72145 10.6775L16.635 2.15663L15.4702 1.21153L8.55664 9.73236L9.72145 10.6775Z"
                                  :fill="img.is_me? '#2A5F5F' : 'white'"/>
                        </svg>
                        <svg v-else class="base-grouped-images__is-read" width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.71436 7.01536L5.02576 9.57161L11.9394 1.05078"
                                  :stroke="img.is_me? '#2A5F5F' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {useDate} from "../../composition/useDate";
    import {  onMounted, ref } from 'vue'
    import {useImages} from "../../composition/useImages";
    export default {
        props: {
            images: [{
                is_me: Boolean,
                is_read: Boolean,
                img: String,
                message_id: [Number, String],
                time: [Number],
                type: [String],
            }],
        },
        setup(props) {
            const { validTime } = useDate();
            const { getImage } = useImages()
            const imgs = ref(null);
            const loading = ref(true);
            let k = 0;
            onMounted(() => {
                if (props.images.length > 4) {
                    let arr = props.images.filter((item, index) => index < 4);
                    //количество картинок минус 3
                    arr[3].count = props.images.length - 3;
                    imgs.value = arr;
                } else {
                    imgs.value = props.images;
                }
                imgs.value.forEach(item => {
                    getImage(item.img)
                        .then(r => {
                            let url = URL.createObjectURL(r);
                            item.img = `${url}`;
                            k++;
                            if (k === props.images.length) {
                                loading.value = false;
                            }
                        })
                })
            })
            return {
                imgs,
                loading,
                validTime,
            }
        }

    }
</script>

<style lang="scss">
    .base-grouped-images {
        width: 100%;
        display: flex;
        margin: 5px 0;
    }
    .base-grouped-images__container {
        padding: 8px 10px;
        border-radius: 0px 9px 9px 9px;
        position: relative;
        max-width: 50%;
        display: flex;
        justify-content: space-between;
        min-height: 30px;
        width: 50%;
        @media(max-width: 1366px) {
            max-width: 70%;
            width: 70%;
        }
    }
    .base-grouped-images__message {
        text-align: left;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .base-grouped-images__image {
        width: calc(50% - 2px);
        margin-bottom: 4px;
        height: 120px;
        position: relative;
    }
    .base-grouped-images__state{
        align-self: flex-end;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        display: flex;
        align-items: center;
        min-width: 79px;
        justify-content: flex-end;
        position: absolute;
        right: 4px;
        bottom: 0;
        padding: 0;
    }
    .base-grouped-images__is-read {
        margin-left: 5px;
        width: 17px;
    }
    .base-grouped-images_my {
        justify-content: flex-end;
        .base-grouped-images__container {
            border-radius: 9px 0px 9px 9px;
            background: var(--green-color);
            color: var(--font-my-message-color);
        }
    }
    .base-grouped-images__count {
        background: rgba(58, 55, 55, 0.51);
        backdrop-filter: blur(3px);
        border-radius: 5px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 48px;
        color: #FFFFFF;
    }
    .base-grouped-images_not-my {
        justify-content: flex-start;
        .base-grouped-images__container {
            border-radius: 0px 9px 9px 9px;
        }
        .base-grouped-images__container {
            background: var(--messages-color);
            color: var(--font-color);
        }
        .base-grouped-images__state{
            color: var(--sub-text-color);
            &.base-grouped-images__state_image {
                color: white;
            }
        }
    }
    .base-grouped-images_my + .base-grouped-images_not-my {
        margin-top: 16px;
    }
    .base-grouped-images_not-my + .base-grouped-images_my {
        margin-top: 16px;
    }
</style>