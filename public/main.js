import { storieservice } from './services/story.service.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadStories = onLoadStories
window.onLoadUsers = onLoadUsers
window.onAddStory = onAddStory
window.onGetStoryById = onGetStoryById
window.onRemoveStory = onRemoveStory
window.onAddStoryMsg = onAddStoryMsg

async function onLoadStories() {
    const stories = await storieservice.query()
    render('Stories', stories)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetStoryById() {
    const id = prompt('Story id?')
    if (!id) return
    const story = await storieservice.getById(id)
    render('Story', story)
}

async function onRemoveStory() {
    const id = prompt('Story id?')
    if (!id) return
    await storieservice.remove(id)
    render('Removed Story')
}

async function onAddStory() {
    await userService.login({ username: 'puki', password: '123' })
    const savedStory = await storieservice.save(storieservice.getEmptyStory())
    render('Saved Story', savedStory)
}

async function onAddStoryMsg() {
    await userService.login({ username: 'puki', password: '123' })
    const id = prompt('Story id?')
    if (!id) return

    const savedMsg = await storieservice.addStoryMsg(id, 'some msg')
    render('Saved Msg', savedMsg)
}

function render(title, mix = '') {
    console.log(title, mix)
    const output = utilService.prettyJSON(mix)
    document.querySelector('h2').innerText = title
    document.querySelector('pre').innerHTML = output
}

