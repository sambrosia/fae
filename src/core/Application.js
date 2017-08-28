import EventEmitter from 'eventemitter3'
import logBanner from '../utils/logBanner'
import defaultLoop from './defaultLoop'

// Provides events and manages systems, scenes, and entity groups
export default class Application {
  constructor (startGame = defaultLoop) {
    // ## Properties
    // *(read-only)*

    // An EventEmitter for messaging throughout the game
    this.event = new EventEmitter()

    // A Set containing all currently running ECS systems
    this.systems = new Set()

    // An object whose keys are group names and whose values are Sets
    // containing groups of related entities
    this.groups = { all: new Set() }

    // Call the `startGame` function, which should initiate the game loop
    // It takes the app instance as its only argument
    startGame(this)
    logBanner()
  }

  // ## Methods

  // Return an array of entities that belong to all of the provided groups
  entitiesWith (...groups) {
    groups.sort((a, b) => this.groups[a].size - this.groups[b].size)
    const entities = []
    for (const entity of this.groups[groups[0]]) {
      if (entity.hasGroups(...groups)) entities.push(entity)
    }
    return entities
  }

  // Register `system`'s event listeners and return `system`
  startSystem (system) {
    this.systems.add(system)
    for (const listener in system.listeners) {
      this.event.on(listener, system.listeners[listener], system)
    }
    return system
  }

  // Unregister `system`'s event listeners
  stopSystem (system) {
    this.systems.delete(system)
    for (const listener in system.listeners) {
      this.event.removeListener(listener, system.listeners[listener], system)
    }
  }

  // Stop/destroy all non-persistent systems and entities
  // Includes persistent entities if `clearAll` is `true`
  clear (clearAll = false) {
    for (const system of this.systems) {
      if (!system.persistent || clearAll) this.stopSystem(system)
    }
    for (const entity of this.groups.all) {
      if (!entity.persistent || clearAll) entity.destroy()
    }
  }
}
