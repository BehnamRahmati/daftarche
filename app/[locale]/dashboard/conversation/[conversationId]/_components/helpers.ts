import { TMessage } from '@/lib/types'
import moment from 'moment-jalaali'

export function groupMessagesByDate(messages: TMessage[], locale: 'fa' | 'en') {
    const groupedMessages: { [date: string]: TMessage[] } = {}
    // const sortedMessages = messages.sort((a, b ) => a.createdAt.getDate() - b.createdAt.getDate())
    messages.forEach(message => {
        // Extract date part (ignoring time) from the message's createdAt

        if(!message) return []

        let dateKey
        if (locale === 'fa') {
            moment.loadPersian({ usePersianDigits: true })
            dateKey = moment(message.createdAt).format('jYYYY/jM/jD')
        } else {
            moment.loadPersian({ usePersianDigits: false })
            dateKey = moment(message.createdAt).format('YYYY/M/D')
        }

        // Group messages based on the date
        if (!groupedMessages[dateKey]) {
            groupedMessages[dateKey] = []
        }
        groupedMessages[dateKey].push(message)
    })

    const remodeledGroupedMessages: { [x: string]: TMessage[][] }[] = Object.keys(groupedMessages).map(date => {
        const newValues = createBubbles(groupedMessages[date])
        return { [date]: newValues }
    })
    return remodeledGroupedMessages
}

export const createBubbles = (messages: TMessage[]) => {
    let tempArr: TMessage[] = []
    const newArr: TMessage[][] = []

    // Iterate over the original array
    messages.forEach((item, index) => {
        // Check if this is the first item or matches the previous item's content
        if (index === 0 || item.senderId === messages[index - 1].senderId) {
            tempArr.push(item)
        } else {
            // When the content changes, push the current group to `newArr`
            newArr.push(tempArr)
            // Start a new group
            tempArr = [item]
        }
    })

    // Push the final tempArr to `newArr` (handles the last group in the array)
    if (tempArr.length > 0) {
        newArr.push(tempArr)
    }

    return newArr
}
