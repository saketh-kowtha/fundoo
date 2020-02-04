import geti18N from '../strings'

const {notes, trash, archive, reminders} = geti18N()

export const primary = [
    {label: notes, icon: "emoji_objects", to: notes},
    {label: reminders, icon: "notifications", to: reminders},
]


export const secondary =                     [
    {label: archive, icon: "archive", to: archive},
    {label: trash, icon: "delete", to: trash},
]