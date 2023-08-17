import {storieservice} from './story.service.js'
import {logger} from '../../services/logger.service.js'

export async function getStories(req, res) {
  try {
    logger.debug('Getting Stories:', req.query)
    const filterBy = {
      txt: req.query.txt || '',
      pageIdx: req.query.pageIdx
    }
    const stories = await storieservice.query(filterBy)
    res.json(stories)
  } catch (err) {
    logger.error('Failed to get stories', err)
    res.status(400).send({ err: 'Failed to get stories' })
  }
}

export async function getStoryById(req, res) {
  try {
    const storyId = req.params.id
    const story = await storieservice.getById(storyId)
    res.json(story)
  } catch (err) {
    logger.error('Failed to get story', err)
    res.status(400).send({ err: 'Failed to get story' })
  }
}

export async function addStory(req, res) {
  const {loggedinUser} = req

  try {
    const story = req.body
    story.owner = loggedinUser
    const addedStory = await storieservice.add(story)
    res.json(addedStory)
  } catch (err) {
    logger.error('Failed to add story', err)
    res.status(400).send({ err: 'Failed to add story' })
  }
}


export async function updateStory(req, res) {
  try {
    const story = req.body
    const updatedStory = await storieservice.update(story)
    res.json(updatedStory)
  } catch (err) {
    logger.error('Failed to update story', err)
    res.status(400).send({ err: 'Failed to update story' })

  }
}

export async function removeStory(req, res) {
  try {
    const storyId = req.params.id
    const removedId = await storieservice.remove(storyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove story', err)
    res.status(400).send({ err: 'Failed to remove story' })
  }
}

export async function addStoryMsg(req, res) {
  const {loggedinUser} = req
  try {
    const storyId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await storieservice.addStoryMsg(storyId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update story', err)
    res.status(400).send({ err: 'Failed to update story' })

  }
}

export async function removeStoryMsg(req, res) {
  const {loggedinUser} = req
  try {
    const storyId = req.params.id
    const {msgId} = req.params

    const removedId = await storieservice.removeStoryMsg(storyId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove story msg', err)
    res.status(400).send({ err: 'Failed to remove story msg' })

  }
}


