
import fs from 'fs'
import { utilService } from './util.service.js'
import { loggerService } from './logger.service.js'

export const storyService = {
    query,
    getById,
    remove,
    save
}

const PAGE_SIZE = 5
const storys = utilService.readJsonFile('data/story.json')

function query(filterBy = { txt: '' }) {
    // const regex = new RegExp(filterBy.txt, 'i')
    var storysToReturn = storys.filter(story => regex.test(story.vendor))
    // if (filterBy.minSpeed) {
    //     storysToReturn = storysToReturn.filter(story => story.speed >= filterBy.minSpeed)
    // }
    // if (filterBy.pageIdx !== undefined) {
    //     const startIdx = filterBy.pageIdx * PAGE_SIZE
    //     storysToReturn = storysToReturn.slice(startIdx, startIdx + PAGE_SIZE)
    // }
    return Promise.resolve(storysToReturn)
}

function getById(storyId) {
    const story = storys.find(story => story._id === storyId)
    return Promise.resolve(story)
}

function remove(storyId) {
    const idx = storys.findIndex(story => story._id === storyId)
    storys.splice(idx, 1)
    return _savestorysToFile()
}

function save(story) {
    if (story._id) {
        const idx = storys.findIndex(currstory => currstory._id === story._id)
        storys[idx] = story
    } else {
        story._id = utilService.makeId()
        storys.unshift(story)
    }
    return _savestorysToFile().then(() => story)
}

function _savestorysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(storys, null, 2)
        fs.writeFile('data/story.json', data, (err) => {
            if (err) {
                loggerService.error('Cannot write to storys file', err)
                return reject(err)
            }
            resolve()
        })
    })
}
