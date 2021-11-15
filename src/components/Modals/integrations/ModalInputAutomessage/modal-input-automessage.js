import { ref } from 'vue'
const isPopup = ref(false);
const automessage = ref('Ввести');
const automessagePopup = ref('');
const automedia = ref([]);
const automessageArray = ref([]);
const indexPopup = ref();
const message = ref('Ввести');
const emptyMessage = ref(false);
export function ModalInputAutomessageFunc() {

  const showPopup = (index) => {
    isPopup.value = !isPopup.value;
    indexPopup.value = index;
    return index
  }
  const emptyInput = () => {
    emptyMessage.value = false;
  }
  const getText = () => {
    const text = document.getElementsByTagName('textarea');
    if (text[0].value.length != 0) {
      automessage.value = text[0].value;
      automessagePopup.value = text[0].value;
      message.value = text[0].value; 
      return true
    }
    else {
      automessage.value = '';
      automessagePopup.value = text[0].value;
      message.value = text[0].value;
      return false
    }
     
  }
  const getMedia = (event) => {
    automedia.value = event;
  }
  const getPopup = (index, file) => {
    getText();
    getMedia(file);

    if (!getText()) {
      automessageArray.value[index] = [null, automedia.value]
    }
    else {
      automessageArray.value[index] = [automessage.value, automedia.value]
      message.value = automessage.value;
    }
  }
  const showText = (index) => {
    if (!automessageArray.value[index]) {
      message.value = '';
    }
    else {
      message.value = automessageArray.value[index][0];
    }
  }
  return {
    showPopup,
    isPopup,
    getText,
    automessage,
    automessagePopup,
    getMedia,
    automedia,
    indexPopup,
    getPopup,
    automessageArray,
    message,
    showText,
    emptyMessage,
    emptyInput

  }

}