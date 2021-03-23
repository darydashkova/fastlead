import { ref } from 'vue'

export function useCustomScroll() {
    const container = ref(null)
    const content = ref(null)
    const scrollbar = ref(null)

    const scrollTo = ($event) => {
        scrollbar.value.style.top = $event.offsetY + "px";
        content.value.scrollTop = (content.value.scrollHeight * scrollbar.value.offsetTop / container.value.clientHeight);
        content.value.focus();
    }
    const init = (onBottomCallback = () => null) => {
        const onActive = () => {
            scrollbar.value.style.opacity = 1;
            scrollbar.value.style.transform = 'scaleX(2)';
        }
        const onDeactive = () => {
            scrollbar.value.style.opacity = 0;
            scrollbar.value.style.transform = 'scaleX(1)';
        }
        let fTime = new Date().getTime();
        let sTime = new Date().getTime();
        const onScroll = () => {
            fTime = new Date().getTime();
            onActive();
            setTimeout(() => {
                sTime = new Date().getTime();
                if (sTime - fTime > 100) {
                    onDeactive();
                }
            }, 101)
            scrollbar.value.style.height = container.value.clientHeight * content.value.clientHeight / content.value.scrollHeight + "px";
            scrollbar.value.style.top = container.value.clientHeight * content.value.scrollTop / content.value.scrollHeight + "px";

            if ((content.value.scrollTop + content.value.clientHeight) === content.value.scrollHeight) {
                onBottomCallback()
            }
        }
        onScroll();
        content.value.addEventListener('scroll', (e) => {
            onScroll();
        });


        let scrolling = false;

        container.value.addEventListener('mouseover', () => {
            onActive()
        })
        container.value.addEventListener('mouseout', () => {
            if (!scrolling) {
                onDeactive()
            }
        })
        scrollbar.value.addEventListener('mousedown', (start) => {
            start.preventDefault();
            onActive()
            scrolling = true;
            let y = scrollbar.value.offsetTop;
            let onMove = (end) => {
                let delta = end.pageY - start.pageY;
                scrollbar.value.style.top = Math.min(container.value.clientHeight - scrollbar.value.clientHeight, Math.max(0, y + delta)) + 'px';
                content.value.scrollTop = (content.value.scrollHeight * scrollbar.value.offsetTop / container.value.clientHeight);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', () => {
                onDeactive()
                scrolling = false;
                document.removeEventListener('mousemove', onMove);
            });
        });
    }

    return {
        container,
        content,
        scrollbar,
        scrollTo,
        init,
    }
}