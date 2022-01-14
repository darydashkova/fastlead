<template>
    <div class="shadows">
        <div class="date-range">
            <div class="date-range__header">
                <div class="date-range__header_title">Диапазон времени</div>
                <img src="@/assets/close.svg" class="pointer" @click="closeModalDateRange">
            </div>
            <div class="date-range__main main">
                <div class="main__with">
                    <div class="main__with_text">С</div>
                    <input v-model="startTime" class="main__with_range" placeholder="00:00" v-maska="'##:##'" @input="validTime()">
                </div>
                <div class="main__before">
                <div class="main__before_text">До</div>
                    <input v-model="endTime" class="main__before_range" placeholder="00:00" v-maska="'##:##'" @input="validTime()">
                </div>
            </div>
            <div class="date-range__buttons">
                <div class="date-range__buttons_accept pointer" @click="initialAnswerphone()">Готово</div>
                <div class="date-range__buttons_cancel pointer" @click="closeModalDateRange">Отмена</div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, watch} from 'vue'
import { useAnswerphone } from "@/composition/useAnswerphone"

export default {
    setup(props, { emit }){

        const {answerphone} = useAnswerphone()

        const startTime = ref('')
        const endTime = ref('')

        const validTime = () => {
            if(startTime.value > '24:59'){
                startTime.value = '00:00'
            }
            if(endTime.value > '24:59'){
                endTime.value = '00:00'
            }
        }

        const closeModalDateRange = () => {
            emit('closeModalDateRange')
        }

        const initialAnswerphone = () => {
            answerphone.value.range_work.start = startTime.value
            answerphone.value.range_work.stop = endTime.value

            closeModalDateRange()
        }

        watch(() => {
            validTime()
        })
        return{
            startTime,
            endTime,
            answerphone,

            validTime,
            closeModalDateRange,
            initialAnswerphone,
        }
    }
    
}
</script>

<style lang="scss">
    .date-range{
        width: 350px;
        height: 253px;
        &__header{
            background: #252544;
            display: flex;
            border-radius: 4px 4px 0px 0px;
            justify-content: space-between;
            padding: 27px 24px;
            align-items: center;
            &_title{
                font-size: 24px;
                color: #F0F0FA;
            }
        }
        &__main{
            display: flex;
            align-items: center;
        }
        &__buttons{
            padding: 19px 24px 20px;
            display: flex;
            background: #252544;
            border-radius: 0px 0px 4px 4px;
            font-weight: 500;
            &_accept{
                background: linear-gradient(45.66deg, #22A595 -40.44%, #84D160 120.07%);
                color: #252544;
                font-size: 16px;
                border-radius: 6px;
                padding: 8px 26px;
            }
            &_cancel{
                font-size: 16px;
                color: #5EC075;
                border: 1px solid #5EC075;
                border-radius: 6px;
                padding: 8px 26px;

                margin-left: 22px;
            }
        }
    }
    .main{
        background: #141427;
        padding: 25px 20px 31px;
        &__with{
            margin-right: 13px;
            align-items: center;
            display: flex;
            &_text{
                font-size: 18px;
                color: #9797BB;
            }
            &_range{
                margin-left: 12px;
                width: 116px;
                background: #1D1D35;
                color: #F0F0FA;;
                font-size: 16px;
                padding: 10px 12px;
                border-radius: 4px;
                &::placeholder{
                    color: #40406B;
                }
            }
        }
        &__before{
            display: flex;
            align-items: center;
            &_text{
                font-size: 18px;
                color: #9797BB;
            }
            &_range{
                margin-left: 12px;
                width: 116px;
                background: #1D1D35;
                color: #F0F0FA;
                font-size: 16px;
                padding: 10px 12px;
                border-radius: 4px;
                &::placeholder{
                    color: #40406B;
                }
            }
        }
    }

</style>