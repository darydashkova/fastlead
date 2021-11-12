<template>
    <div class="modal-input-automessage">
      
        <div class="modal-input-automessage__header">
            <div class="modal-input-automessage__header-title">Редактировать сообщение </div>
            <div class="modal-input-automessage__header-close" @click="attachment.close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L12.5 12.5M12.5 1L1 12.5" stroke="#575773" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
         <div class="modal-input-automessage__message"  >
                <div class="modal-input-automessage__message-activities">
                    <div class="modal-input-automessage__message-activities-title">Сообщение</div>
                    <div>
                            <button class="modal-input-automessage__message-activities-input" @click="attachment.add">
                                <svg class="pointer" width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
                                 <!-- @click="attachment.toggle" //////-->
                             <path d="M13.2458 5.53727C13.0375 5.53727 12.8492 5.61572 12.7016 5.74105L12.6939 5.73328L6.04702 12.392C5.29377 13.149 4.98493 13.8875 4.98098 14.9419C4.98098 15.7665 5.28409 16.5083 5.8343 17.0307C6.40257 17.5699 7.19178 17.8549 8.11699 17.8548H8.13641C9.09946 17.8504 10.0006 17.4695 10.6731 16.7831L18.3856 9.03205C20.339 7.06822 20.3903 4.26939 18.5075 2.37663C17.5737 1.438 16.3304 0.921021 15.0066 0.921021C13.6829 0.921021 12.4399 1.438 11.5068 2.3767L1.84701 12.0857C-0.615669 14.5613 -0.615669 18.5895 1.84701 21.0652C3.03805 22.2621 4.62406 22.9211 6.31284 22.9211C8.00166 22.9211 9.58778 22.2621 10.7793 21.065L20.7796 10.9768C20.7796 10.9768 21 10.759 21 10.3917C21 9.92105 20.6204 9.53941 20.1522 9.53941C19.9297 9.53941 19.7287 9.62755 19.5774 9.7686L19.5748 9.766L9.57437 19.8544C8.70453 20.7283 7.54618 21.2096 6.31266 21.2096C5.07915 21.2096 3.92098 20.7283 3.05146 19.8544C1.25296 18.0458 1.25296 15.104 3.05146 13.2966L12.7112 3.58779C13.3233 2.97248 14.1385 2.63369 15.0066 2.63369C15.8748 2.63369 16.6905 2.97263 17.3031 3.58779C17.914 4.2019 18.221 4.93144 18.1913 5.69785C18.1619 6.45212 17.8127 7.18635 17.1811 7.82118L9.45242 15.5887C9.0991 15.9444 8.62934 16.141 8.13037 16.1422C7.18124 16.1422 6.68468 15.5411 6.68468 14.9481C6.68659 14.447 6.88208 13.975 7.2354 13.6193L13.8984 6.94437L13.8909 6.93678C14.0155 6.78845 14.0936 6.59921 14.0936 6.38972C14.0937 5.91873 13.714 5.53727 13.2458 5.53727Z" fill="var(--default-svg-fill)">
                                    </path>
                                    </svg>
                            </button>           
                            <button class="modal-input-automessage__message-activities-smile pointer" @click="smiles.toggle()" >
                                
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2119 22.2104C8.27371 22.2104 5.51138 21.0662 3.43371 18.9887C1.35613 16.911 0.211914 14.1487 0.211914 11.2104C0.211914 8.27225 1.35613 5.50991 3.43371 3.43225C5.51138 1.35466 8.27371 0.210449 11.2119 0.210449C14.1501 0.210449 16.9124 1.35466 18.9901 3.43225C21.0677 5.50991 22.2119 8.27225 22.2119 11.2104C22.2119 14.1487 21.0677 16.911 18.9901 18.9887C16.9124 21.0662 14.1501 22.2104 11.2119 22.2104ZM11.2119 1.9292C6.09421 1.9292 1.93066 6.09274 1.93066 11.2104C1.93066 16.3282 6.09421 20.4917 11.2119 20.4917C16.3296 20.4917 20.4932 16.3282 20.4932 11.2104C20.4932 6.09274 16.3296 1.9292 11.2119 1.9292ZM15.2397 13.1092C14.8392 12.8543 14.3081 12.9723 14.0533 13.3728C14.0427 13.3894 12.9732 15.0373 11.1689 15.0373C9.36469 15.0373 8.2952 13.3894 8.28458 13.3728C8.02978 12.9724 7.49864 12.8543 7.09821 13.1092C6.69779 13.364 6.57975 13.8951 6.83456 14.2955C6.8985 14.396 8.43179 16.756 11.1689 16.756C13.9061 16.756 15.4394 14.396 15.5033 14.2955C15.7581 13.8951 15.6401 13.364 15.2397 13.1092ZM7.21582 7.30029C7.80909 7.30029 8.29004 7.78124 8.29004 8.37451C8.29004 8.96778 7.80909 9.44873 7.21582 9.44873C6.62255 9.44873 6.1416 8.96778 6.1416 8.37451C6.1416 7.78124 6.62255 7.30029 7.21582 7.30029ZM14.1338 8.37451C14.1338 8.96778 14.6147 9.44873 15.208 9.44873C15.8013 9.44873 16.2822 8.96778 16.2822 8.37451C16.2822 7.78124 15.8013 7.30029 15.208 7.30029C14.6147 7.30029 14.1338 7.78124 14.1338 8.37451Z"
                                        fill="var(--default-svg-fill)"/>
                                </svg>
                            </button>
                    </div>
                </div>
                 <!-- <template v-if='message.lenght!=0'> -->
                <textarea class="modal-input-automessage__message-textarea"   ref="textarea"  @paste="smiles.paste" @copy="smiles.copy" @input="input">
               {{message}} 
                  
                </textarea>
                <!-- </template> -->
               
               
                   <Picker
                v-show="smiles.isOpened"
                :data="emojiIndex"
                :showPreview="false"
                style="width: 100%"
                set="apple"
                @select="smiles.addEmoji"
        />   
                <template v-if="files.length!=0">  
                    <ModalInputAutomessageMedia  :files = "files"></ModalInputAutomessageMedia>
                </template>
                <template v-else>
                    <template v-if="updateMedia.hasOwnProperty('type')&&updateMedia.type!='text' &&(!automessageArray[index]||automessageArray[index][1]==null)">
                        <ModalInputAutomessageMedia :updateMedia = "updateMedia"></ModalInputAutomessageMedia>
                        </template>
                    <template v-if="automessageArray[index]&&automessageArray[index][1]!=null">
                           <ModalInputAutomessageMedia :files = "automessageArray[index][1]"></ModalInputAutomessageMedia>
                    </template>
                </template>
                <div class="modal-input-automessage__message-buttons">
                    <div class="modal-input-automessage__message-buttons-item_save modal-input-automessage__message-buttons-item pointer"  @click="attachment.save(index)">Сохранить</div>
                    <div class="modal-input-automessage__message-buttons-item_cancel modal-input-automessage__message-buttons-item pointer" @click="attachment.close">Отмена</div>
                </div>
            </div>
            <input @change="attachment.chooseFiles"
                   type="file"
                   style="display: none;"
                   id="messages-container-input__attachment"
                   multiple
                   accept="video/mp4,video/x-m4v,video/*,image/jpeg,image/png,image/gif,image/JPEG,image/PNG,image/GIF,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            >
    </div>
</template>

<script>
    import {  reactive, ref } from 'vue'
    import { ModalInputAutomessageFunc } from "./modal-input-automessage";
    import  ModalInputAutomessageMedia  from "./ModalInputAutomessageMedia";
    import {useVideos} from "../../../../composition/useVideos";
    import {useEmoji} from "../../../../composition/useEmoji";
    import {useImages} from "../../../../composition/useImages";
    import { Picker } from "../../../emoji-component/src";
    import { useMessages } from "../../../../composition/useMessages";
     import { useFiles } from "../../../../composition/useFiles";
    export default {
        components: {ModalInputAutomessageMedia, Picker},
        props: {
            show: String,
            index: Number,
            arr: Number,
            message: String, 
            updateMedia:Object,
        },
        emits: ["save"],
        setup(props,{emit}) {
           const convertedSrc = ref();
            const { showPopup, isPopup, getText, automessagePopup, getMedia, automedia, getPopup, automessageArray, automessage } = ModalInputAutomessageFunc();
              const { videosToSend, createVideo, addVideo, deleteVideo, clearVideo } = useVideos()
               const {  getRandomInRange } = useMessages();
                const textarea = ref(null);
            const files = ref([]);
               const value = ref('');
             const { emojiIndex, emojiToHtml, wrapEmoji } = useEmoji();
             const {getImage, createImage}= useImages();
         
            const attachment = reactive({
        add: () => {
             document.getElementById('messages-container-input__attachment').click()
            },
        close: () => {
             showPopup();
        },
       
        save: (index) => {
             showPopup();
             if(files.value.length!=0){
                getPopup(index, files.value); 
                const data = ref([automessage.value,files.value,{is_media:true}])
                emit('save', data.value)
             }
            else {
                if(!automessageArray.value[props.index]||automessageArray.value[props.index]=='undefined'){
                    getPopup(index, null); 
                }
                    else{
                        getPopup(index, automessageArray.value[props.index][1]); 
                        emit('save',automessageArray.value[props.index])
                    }
                      emit('save', automessage.value)
            }
        },
        chooseFiles: ($event) => {
            // if(automessageArray.value[props.index]){
               
            //     if(automessageArray.value[props.index][1]){
            //          console.log('111')
            //       for(let i = 0; i< automessageArray.value[props.index][1].length; i++){
            //           files.value.push(automessageArray.value[props.index][1][i]) 
            //       }
            //      $event.target.files.forEach(item => {
            //         let fr = new FileReader();
            //         fr.addEventListener("load", function () {
            //          files.value.push([$event.target.files[0],fr.result ]);
            //              }, false);
            //         fr.readAsDataURL(item);
            //     })
            //     }
            //     else{
            //          console.log('111222')
            //           $event.target.files.forEach(item => {
            //         let fr = new FileReader();
            //         fr.addEventListener("load", function () {
            //          files.value.push([$event.target.files[0],fr.result ]);
            //              }, false);
            //         fr.readAsDataURL(item);
            //     })
            //     }
            // }
            // else{


            // getImage(fr.result)
            //               .then(r => {
            //                 let url = URL.createObjectURL(r);
            //                 convertedSrc.value = `${url}`;
            //                 console.log($event.target.files )
            //                files.value.push([$event.target.files[0],fr.result,convertedSrc.value,uidRandom ]); 
            //             })
                  $event.target.files.forEach(item => {
                    let fr = new FileReader();
                       fr.addEventListener("load", function () {
                           files.value=[]
                                createImage(item)
                                    .then((r) => {
                                      const uidRandom = getRandomInRange();
                                        files.value.push([$event.target.files[0],fr.result,r.files,uidRandom ]);
                                        })
                            }, false);
                            fr.readAsDataURL(item);
                    // fr.addEventListener("load", function () {
                    //      const uidRandom = getRandomInRange();
                    //   createFile()  
                    //   .then((r) => {
                    //         if (r.status === 'ok') {
                    //              files.value.push([$event.target.files[0],fr.result,convertedSrc.value,uidRandom ]);
                    //         }
                         
                    //        }

                    //      }, false);
                    // fr.readAsDataURL(item);
                })
        }
       
            }) 
             const smiles = reactive({
                isOpened: false,
                toggle: () => {
                    smiles.isOpened = !smiles.isOpened;
                },
                open: (boolean) => {
                    smiles.isOpened = boolean;
                },
                addEmoji: (emoji) => {
                   if (!textarea.value.innerHTML.length
                        || !window.getSelection()
                        || !window.getSelection().anchorNode
                        || !window.getSelection().anchorNode.classList
                        || (!window.getSelection().anchorNode.classList.contains('modal-input-automessage__message-textarea')
                            && !window.getSelection().anchorNode.parentElement.classList.contains('modal-input-automessage__message-textarea'))) {
                        if (!textarea.value.innerHTML.length) {
                            // textarea.value.innerHTML = emoji.native;
                            // value.value = textarea.value.innerHTML;
                            // textarea.value.focus();
                            // setCaretToPos(textarea.value, textarea.value.childNodes.length)
                               pasteText(emoji.native)
                        value.value = textarea.value.innerHTML

                              
                        } else {
                            textarea.value.focus();
                            setCaretToPos(textarea.value, textarea.value.childNodes.length);
                            value.value = textarea.value.innerHTML;
                        }
                    } 


                
                else {
                        pasteText(emoji.native)
                        value.value = textarea.value.innerHTML

                    }
                    },
                paste: ($event) => {
                     let paste = ($event.clipboardData || window.clipboardData ).getData('text');
                     
                      pasteText(paste);
                     value.value = textarea.value.innerHTML
    
                    $event.preventDefault();
                },
            })
                const setCaretToPos = (elem, pos) => {
                let range = document.createRange();
                let sel = window.getSelection();
                range.setStart(elem, pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
               const input = ($event) => {
                value.value = $event.target.innerHTML
            }
                const pasteHtmlAtCaret = (html) => {
                   let sel, range;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        let el = document.createElement("div");
                        el.innerHTML = html;
                        let frag = document.createDocumentFragment(), node, lastNode;
                        while ( (node = el.firstChild) ) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);
                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
                // 
            }
            const pasteText = (html) => {
                const text = document.querySelector('.modal-input-automessage__message-textarea');
                  text.value=text.value+html

            }
              const wrapTab = (text) => {
                return text.replace(/\n/g, '<br>')
            }
            
            return {
                attachment,
                showPopup,
                isPopup,
                automessagePopup,
                files,
                addVideo,
                automedia,
                automessageArray,
                getPopup,
                convertedSrc,
                emojiIndex,
                smiles,
                wrapTab,
                textarea,
                value,
                input,
                pasteText
                
            }
        },
    }
</script>
<style lang="scss">
.modal-input-automessage{
    background-color: #1D1D35;
    border-radius: 9px;
    position: absolute;
    max-width: 366px;
    z-index: 99999;
    -webkit-box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    box-shadow: -2px 2px 12px 18px rgba(34, 60, 80, 0.2);
    top: 25%;
    padding: 20px 23px 22px;
    left: 50%;
    transform: translate(-50%, -25%);
    &__header{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 47px;
        &-title{
            font-family: Segoe UI;
            font-weight: 600;
            font-size: 22px;
            line-height: 20px;
            display: flex;
            align-items: flex-end;
            color: #F0F0FA;
        }
        &-close{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 28px;
            cursor: pointer;
        }
    }
    &__message{
        &-activities{
            display: flex;
            justify-content: space-between;
            &-input{
                background-color: transparent;
            }
            &-smile{
                background-color: transparent;
            }
            &-title{
             background: var(--green-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;   
            }
        }
        &-textarea{
            margin-top: 8px;
            font-family: Segoe UI;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            width: 100%;
            padding: 8px 10px;
            color: var(--modal-font-color);
            background: var(--modal-element-hover-bg-color);
            border: 0.7px solid var(--modal-input-border-color);
            box-sizing: border-box;
            border-radius: 3px;
            text-align: left;
            width: 100%;
            position: relative;
            height: 137px;
        }
        &-buttons{
            display: flex;
            justify-content: space-between;
            margin-top: 27px;
            &-item{
                padding: 11px 36px;
                border-radius: 5px;
                color: #F0F0FA;
                font-family: Segoe UI;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 24px;
                &_save{
                    background: var(--green-color);
                }
                &_cancel{
                        background-color: #414159; 
                }
            }
        }
        &-data{
            width: 100%;
            height: inherit;
            overflow-y: scroll;
            margin-top: 10px;
            max-height: 200px;
            &-img{
                width: 100%;
                margin-bottom: 10px;
                height: 150px;
                border-radius: 3px;
            }
            &-video{
                max-height: inherit;
                background-color: black;
                
            }
            &-elem{
                height: inherit;
                max-height: inherit;
                &_background{
                    background-color: black;
                    border-radius: 3px;
                    margin-bottom: 10px;

                }
            }
            &-docs{
                display: flex;
                align-items: center;
                color:#EDEDEF ;
                font-family: Segoe UI;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 21px;
                margin-bottom: 10px;
                &-circle{
                    margin-right: 19px;
                    overflow: hidden;
                    position: relative;
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(
                45.66deg, #22A595 -40.44%, #84D160 120.07%);
                    border-radius: 48px;
                    &-img{
                        position: absolute;
                        z-index: 99999;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }
    }
}
</style>