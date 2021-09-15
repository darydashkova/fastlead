import data from "../components/emoji-component/data/apple.json";
import {EmojiIndex } from "../components/emoji-component/src";
import emojiRegex from 'emoji-regex'

let emojiIndex = new EmojiIndex(data);


export function useEmoji() {
    const unicodeEmojiRegex = emojiRegex()

    const wrapEmoji = (text) => {
        if (text) {
            return text.replace(unicodeEmojiRegex, function(match, offset) {
                const before = text.substring(0, offset)
                if (before.endsWith('alt="') || before.endsWith('data-text="')) {
                    // Emoji inside the replaced <img>
                    return match
                }
                // Find emoji object by native emoji.
                let emoji = emojiIndex.nativeEmoji(match)
                if (!emoji) {
                    // Can't find unicode emoji in our index
                    return match
                }
                // See `emojiToHtml` function above.
                return emojiToHtml(emoji)
            })
        } else return '';

    }
    const emojiToHtml = (emoji) => {
        let style = `background-position: ${emoji.getPosition()}; width: 24px; height: 24px; display: inline-block; margin: 0 2px; vertical-align: middle;`
        return `<img data-text="${emoji.native}" alt="${emoji.native}"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        class="emoji-set-apple emoji-type-image emoji-type-image_small" style="${style}">`
    }


    return {
        wrapEmoji,
        emojiToHtml,
        emojiIndex,
    }
}