import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction,
  Material, pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Cube, Spinner} from './components'
import { Color4 } from '@dcl/sdk/math'
import { getRandomHexColor } from './utils'
import {movePlayerTo} from "~system/RestrictedActions";

// Cube factory
export function createCube(x: number, y: number, z: number, spawner = true): Entity {
  const entity = engine.addEntity()

  // Used to track the cubes
  Cube.create(entity)

  Transform.create(entity, { position: { x, y, z } })

  // set how the cube looks and collides
  MeshRenderer.setBox(entity)
  MeshCollider.setBox(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) })

  // Make the cube spin, with the circularSystem
  Spinner.create(entity, { speed: 10 * Math.random() })

  // if it is a spawner, then we set the pointer hover feedback
  if (spawner) {
    // PointerEvents.create(entity, {
    //   pointerEvents: [
    //     {
    //       eventType: PointerEventType.PET_DOWN,
    //       eventInfo: {
    //         button: InputAction.IA_PRIMARY,
    //         hoverText: 'Press E to spawn',
    //         maxDistance: 100,
    //         showFeedback: true
    //       }
    //     }
    //   ]
    // })

    pointerEventsSystem.onPointerDown(
        {
          entity: entity,
          opts: {
            button: InputAction.IA_PRIMARY,
            hoverText: 'Press E to spawn',
            maxDistance: 100,
            showFeedback: true
          },
        },
        function () {
          // createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
          movePlayerTo({ newRelativePosition: { x: 8, y: 1, z: 8 }})
        }
    )
  }

  return entity
}
