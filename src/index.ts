import {
  Animator,
  AudioSource,
  AvatarAttach,
  engine,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform,
  VisibilityComponent,
  AvatarModifierArea,
  AvatarModifierType, 
  Schemas,
  raycastSystem,
  RaycastQueryType,
  AvatarShape,
  executeTask,
  Tween,
  EasingFunction, 
    ColliderLayer,
    PointerEvents,
    PointerEventType,
    AvatarAnchorPointType
} from '@dcl/sdk/ecs'

import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { circularSystem } from './systems'
import { setupUi } from './ui'
import { Spinner } from './components'
import { createCube } from './factory'
import { movePlayerTo, openExternalUrl } from "~system/RestrictedActions";
import { getUserData } from "~system/UserIdentity";

/*import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'
// You can remove this if you don't use any asset packs
initAssetPacks(engine, pointerEventsSystem, {
  Animator,
  AudioSource,
  AvatarAttach,
  Transform,
  VisibilityComponent,
  GltfContainer
})*/

// Defining behavior. See `src/systems.ts` file.
// engine.addSystem(circularSystem)

export function main() {
  // draw UI
  // setupUi()
  
  // fetch cube from Inspector
  /*const cube = createCube(8, 1, 8, true)
  if (cube) {
    // Give the cube a color
    Material.setPbrMaterial(cube, { albedoColor: Color4.Blue() })

    // Make the cube spin, with the circularSystem
    // Spinner.create(cube, { speed: 10 })

    // Give the cube a collider, to make it clickable
    MeshCollider.setBox(cube)

    // Add a click behavior to the cube, spawning new cubes in random places, and adding a bouncy effect for feedback
    pointerEventsSystem.onPointerDown(
      { entity: cube, opts: { button: InputAction.IA_POINTER, hoverText: 'spawn' } },
      () => {
        createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
      }
    )
  }*/
  
  /*const excludedUser = '0x51777c0b8DBA8B4dfE8a1c3d0a1eDAA5B139B4e0'
  // const excludedUser = 'USER-WALLET-ADDRESS-GOES-HERE'
  const avatarModifierAreaEntity = engine.addEntity()
  const areaSize = Vector3.create(4, 4, 4)
  Transform.create(avatarModifierAreaEntity, { 
    position: Vector3.create(8, 1, 8),
    scale: areaSize
  })
  AvatarModifierArea.create(avatarModifierAreaEntity, {
    area: areaSize,
    modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
    // modifiers: [AvatarModifierType.AMT_DISABLE_PASSPORTS],
    excludeIds: []
  })
  MeshRenderer.setBox(avatarModifierAreaEntity)
  Material.setPbrMaterial(avatarModifierAreaEntity, { albedoColor: Color4.create(0.5, 0.5, 0.5, 0.5) })
  const cube = createCube(8, 1, 12, false)
  MeshCollider.setBox(cube)
  pointerEventsSystem.onPointerDown(
      { entity: cube, opts: { button: InputAction.IA_POINTER, hoverText: 'toggle excluded id' } },
      () => {
        const mutable = AvatarModifierArea.getMutable(avatarModifierAreaEntity)
        if (mutable.excludeIds.includes(excludedUser)) {
          mutable.excludeIds = []
          console.log(`PRAVS - REMOVED excluded ID -> ${mutable.excludeIds[0]}`)
        }
        else {
          mutable.excludeIds = [excludedUser]
          console.log(`PRAVS - ADDED excluded ID -> ${mutable.excludeIds[0]}`)
        }
      }
  )*/
  
  // For testing manifest builder...
  /*const gltfEntity = engine.addEntity()
  Transform.create(gltfEntity, {
    position: Vector3.create(6, 10, 10),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(4, 4, 4)
  })
  GltfContainer.create(gltfEntity, {
    src: "models/Monster.glb"
  })

  const cubeEntity = engine.addEntity()
  Transform.create(cubeEntity, {
    position: Vector3.create(4, 2, 4),
    rotation: Quaternion.fromEulerDegrees(32.5, 55, 78.69),
    scale: Vector3.create(0.75, 1.25, 0.75)
  })
  MeshRenderer.setBox(cubeEntity)
  Material.setBasicMaterial(cubeEntity, {
    texture: Material.Texture.Common({
      src: 'images/scene-thumbnail.png',
    }),
  })

  const cylinderEntity = engine.addEntity()
  Transform.create(cylinderEntity, {
    position: Vector3.create(12, 2, 12),
    rotation: Quaternion.fromEulerDegrees(11.22, 66.6, -126),
    scale: Vector3.create(2.33, 1.25, 1)
  })
  MeshRenderer.setCylinder(cylinderEntity, 0, 1)
  Material.setPbrMaterial(cylinderEntity, {
    albedoColor: { r: 15, g:0, b:0, a: 1 }
  })*/

  /*const cubeEntity = engine.addEntity()
  Transform.create(cubeEntity, {
    position: Vector3.create(8, 2.5, 8),
    scale: Vector3.create(5, 5, 5)
  })
  MeshRenderer.setBox(cubeEntity)
  MeshCollider.setBox(cubeEntity)

  const avatarModifierAreaEntity = engine.addEntity()
  const areaSize = Vector3.create(15, 15, 15)
  Transform.create(avatarModifierAreaEntity, {
    position: Vector3.create(8, 7.5, 8),
    scale: areaSize
  })
  AvatarModifierArea.create(avatarModifierAreaEntity, {
    area: areaSize,
    modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
    excludeIds: []
  })
  MeshRenderer.setBox(avatarModifierAreaEntity)
  Material.setPbrMaterial(avatarModifierAreaEntity, { albedoColor: Color4.create(0.5, 0.5, 0.5, 0.5) })*/
}

/*
// custom components
const CubeOscilator = engine.defineComponent('CubeOscilator', {
  t: Schemas.Float,
})

const TimerComponent = engine.defineComponent('TimerComponent', {
  t: Schemas.Float,
})

const RAY_INTERVAL = 0.01

const raycastEntity = engine.addEntity()

// check rays
engine.addSystem((dt) => {
  for (const [entity] of engine.getEntitiesWith(TimerComponent)) {
    const timer = TimerComponent.getMutable(entity)
    timer.t += dt

    if (timer.t > RAY_INTERVAL) {
      timer.t = 0

      // console.log('PRAVS - registerGlobalDirectionRaycast()!')
      
      raycastSystem.registerGlobalDirectionRaycast(
          {
            entity: raycastEntity,
            opts: {
              queryType: RaycastQueryType.RQT_HIT_FIRST,
              direction: Vector3.Forward(),
              maxDistance: 16
            },
          },
          function (raycastResult) {
            // console.log('PRAVS - raycast result: ')
            console.log(raycastResult.hits)
          }
      )
    }
  }
})

TimerComponent.create(engine.addEntity())

// oscillating cube system
engine.addSystem((dt) => {
  for (const [entity, cube] of engine.getEntitiesWith(
      CubeOscilator,
      Transform
  )) {
    CubeOscilator.getMutable(entity).t += dt
    Transform.getMutable(entity).position.y = 2 + Math.cos(cube.t)
  }
})

// create cube
const cubeEntity = engine.addEntity()
Transform.create(cubeEntity, { position: { x: 8, y: 1, z: 8 } })
CubeOscilator.create(cubeEntity)
MeshRenderer.setBox(cubeEntity)
MeshCollider.setBox(cubeEntity)*/

/*let timer = 5
let count = true
engine.addSystem((dt) => {
  timer -= dt

  if (count && timer <= 0) {
    count = false
    openExternalUrl({url: "https://google.com"})
  }
})*/

/*const avatarShapeEntity1 = engine.addEntity()
Transform.create(avatarShapeEntity1, {
    position: Vector3.create(6, 0.1, 8),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})
AvatarShape.create(avatarShapeEntity1, {
    wearables: [
      "urn:decentraland:off-chain:base-avatars:eyebrows_00",
      "urn:decentraland:off-chain:base-avatars:mouth_00",
      "urn:decentraland:off-chain:base-avatars:eyes_00",
        "urn:decentraland:off-chain:base-avatars:blue_tshirt",
        "urn:decentraland:off-chain:base-avatars:brown_pants",
        "urn:decentraland:off-chain:base-avatars:classic_shoes",
        "urn:decentraland:off-chain:base-avatars:cornrows"
    ],
    id: "dagon-id",
    name: "Dagon", 
    bodyShape: "urn:decentraland:off-chain:base-avatars:BaseMale",
    hairColor: { "r": 0.9281997, "g": 0.997558951, "b": 0.715044141 },
    skinColor: { "r": 0.78, "g": 0.53, "b": 0.26 },
    emotes: []
})

const avatarShapeEntity2 = engine.addEntity()
Transform.create(avatarShapeEntity2, {
    position: Vector3.create(10, 0.1, 8),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
})
AvatarShape.create(avatarShapeEntity2, {
    wearables: [
        "urn:decentraland:off-chain:base-avatars:eyebrows_00",
        "urn:decentraland:off-chain:base-avatars:mouth_00",
        "urn:decentraland:off-chain:base-avatars:eyes_00",
        "urn:decentraland:ethereum:collections-v1:xmas_2019:santa_facial_hair",
        "urn:decentraland:matic:collections-v2:0x4334a820f556a54845a35f8aad5986aecdf07d43:1",
        "urn:decentraland:matic:collections-v2:0x3a53afcd4f3a40953fa1217a56265909bb2f6309:0",
        "urn:decentraland:ethereum:collections-v1:sugarclub_yumi:yumi_retro_shades_eyewear",
        "urn:decentraland:matic:collections-v2:0x4334a820f556a54845a35f8aad5986aecdf07d43:0"
    ],
    id: "cthulhu-id",
    name: "Cthulhu",
    hairColor: Color4.Red(),
    skinColor: Color4.Green(),
    emotes: []
})
let timer = 5
engine.addSystem((dt) => {
    timer -= dt
    if (timer <= 0) {
        timer = 5        
        Transform.getMutable(avatarShapeEntity1).position = {
            x: 2 + Math.random() * 4,
            y: 0.1,
            z: 4 + Math.random() * 4
        }
        Transform.getMutable(avatarShapeEntity2).position = {
            x: 7 + Math.random() * 4,
            y: 0.1,
            z: 4 + Math.random() * 4
        }
    }
})*/

/*executeTask(async () => {
  let userData = await getUserData({})
  console.log(userData.data)

  if (
      !userData.data ||
      !userData.data.avatar ||
      !userData.data.avatar.wearables
  )
    return

  for (let wearablesKey in userData.data?.avatar?.wearables) {
    console.log(userData.data?.avatar?.wearables[wearablesKey])
  }
  
  const myAvatar = engine.addEntity()
  AvatarShape.create(myAvatar, {
    id: 'Manequin',
    emotes: [],
    wearables: userData.data?.avatar?.wearables,
  })

  Transform.create(myAvatar, {
    position: Vector3.create(8, 0.25, 8),
  })
})*/

/*const avatarShapeEntity = engine.addEntity()
Transform.create(avatarShapeEntity, {
  position: Vector3.create(2, 0.25, 2),
})
AvatarShape.create(avatarShapeEntity, {
  wearables: [
    "urn:decentraland:matic:collections-v2:0xee77b0a104cd6db1bbbcfa2f13076f234647c017:2",
    "urn:decentraland:matic:collections-v2:0x7429c88e33288599dfa5defb7eae49ae95ad44c5:0",
    "urn:decentraland:matic:collections-v2:0x3a53afcd4f3a40953fa1217a56265909bb2f6309:3",
    "urn:decentraland:matic:collections-v2:0x3a53afcd4f3a40953fa1217a56265909bb2f6309:0",
    "urn:decentraland:matic:collections-v2:0x36e94d12899317dc792e558f993213eef9b85c78:0",
    "urn:decentraland:matic:collections-v2:0xff8e630bd43246bf5c37aecc0228af5418a8ceef:4"
  ],
  id: "test-avatar",
  
  emotes: []  
})
let timer = 7
let moveAvatar = true
engine.addSystem((dt: number) => {
  timer -= dt
  if (moveAvatar && timer <= 0) {
    moveAvatar = false
    Transform.getMutable(avatarShapeEntity).position = { x: 15, y: 0.25, z: 15 }
  }    
})*/


// urn:decentraland:<CHAIN>:<CONTRACT_STANDARD>:<CONTRACT_ADDRESS>:<TOKEN_ID>
/*const myAvatar = engine.addEntity()
AvatarShape.create(myAvatar, {
  id: "",
  emotes: [
    'urn:decentraland:matic:collections-v2:0xbb4edbfbc558f81d1486c373029ac5c8413f4756:2',
    'urn:decentraland:matic:collections-v2:0x75d3148cf3289550af3936ecd4f154c8c6c18329:44'
  ],
  wearables: [
    // 'urn:decentraland:matic:collections-v2:0xbb4edbfbc558f81d1486c373029ac5c8413f4756:2',
    // 'urn:decentraland:matic:collections-v2:0x75d3148cf3289550af3936ecd4f154c8c6c18329:44'
  ],
  // expressionTriggerId:'robot',
  expressionTriggerId:'urn:decentraland:matic:collections-v2:0xbb4edbfbc558f81d1486c373029ac5c8413f4756:2',
  // expressionTriggerId:'urn:decentraland:matic:collections-v2:0x75d3148cf3289550af3936ecd4f154c8c6c18329:44',
  // expressionTriggerTimestamp: Date.now()/1000
})

Transform.create(myAvatar, {
  position: Vector3.create(4, 0.25, 5)
})*/


/*const avatarShapeEntity = engine.addEntity()
Transform.create(avatarShapeEntity, {
  position: Vector3.create(8, 0.25, 8),
})
Tween.create(avatarShapeEntity, {
  duration: 8000,
  easingFunction: EasingFunction.EF_LINEAR,
  currentTime: 0,
  playing: true,
  // mode: Tween.Mode.Move({
  //   start: Vector3.create(8, 0.25, 2),
  //   end: Vector3.create(8, 0.25, 14),
  // }),
  mode: Tween.Mode.Rotate({
    start: Quaternion.Identity(),
    end: Quaternion.fromEulerDegrees(0, 180, 0)
  })
})
AvatarShape.create(avatarShapeEntity, {
  wearables: [
    "urn:decentraland:matic:collections-v2:0xee77b0a104cd6db1bbbcfa2f13076f234647c017:2",
    "urn:decentraland:matic:collections-v2:0x7429c88e33288599dfa5defb7eae49ae95ad44c5:0",
    "urn:decentraland:matic:collections-v2:0x3a53afcd4f3a40953fa1217a56265909bb2f6309:3",
    "urn:decentraland:matic:collections-v2:0x3a53afcd4f3a40953fa1217a56265909bb2f6309:0",
    "urn:decentraland:matic:collections-v2:0x36e94d12899317dc792e558f993213eef9b85c78:0",
    "urn:decentraland:matic:collections-v2:0xff8e630bd43246bf5c37aecc0228af5418a8ceef:4"
  ],
  id: "test-avatar",
  emotes: []
})*/

/*engine.addSystem((dt) => {
  const avatarTransform = Transform.getMutable(avatarShapeEntity)

  avatarTransform.rotation = Quaternion.rotateTowards(avatarTransform.rotation, Quaternion.fromEulerDegrees(0, 180, 0), 0.5)
  // if (avatarTransform.position.z < 14)
  //   avatarTransform.position = Vector3.add(avatarTransform.position, Vector3.Forward())
})*/

/*const boxEntity = engine.addEntity()
Transform.create(boxEntity, {
  position: Vector3.create(4, 1, 4),
})
MeshRenderer.setBox(boxEntity)
Tween.create(boxEntity, {
  duration: 8000,
  easingFunction: EasingFunction.EF_LINEAR,
  currentTime: 0,
  playing: true,
  // mode: Tween.Mode.Move({
  //   start: Vector3.create(6.5, 7, 4),
  //   end: Vector3.create(6.5, 7, 12),
  // }),
  mode: Tween.Mode.Rotate({
    start: Quaternion.Identity(),
    end: Quaternion.fromEulerDegrees(0, 180, 0)
  })
})*/

// AVATAR ATTACH
/*
export let currentPlayerId: string
void executeTask(async () => {
    const user = await getUserData({})
    if (!user.data) return
    currentPlayerId = user.data?.userId
})
const glassEntity = engine.addEntity()
MeshRenderer.setBox(glassEntity)
MeshCollider.setBox(glassEntity, ColliderLayer.CL_POINTER)
Transform.create(glassEntity, { position: Vector3.create(8, 1, 8), scale: Vector3.create(0.1, 0.2, 0.1) })
pointerEventsSystem.onPointerDown(
    { entity: glassEntity, opts: { button: InputAction.IA_PRIMARY, hoverText: 'pick up', maxDistance: 5 } },
    () => {        
        AvatarAttach.create(glassEntity, {
            avatarId: currentPlayerId,
            anchorPointId: AvatarAnchorPointType.AAPT_RIGHT_HAND
        })
        Transform.createOrReplace(glassEntity, {
            position: Vector3.create(0, 0.225, 0),
            rotation: Quaternion.fromEulerDegrees(180, -90, -60),
            scale: Vector3.create(0.1, 0.2, 0.1)
        })
    }
)*/

function checkCameraMode() {
    if (!Transform.has(engine.CameraEntity)) return

    let cameraEntity = CameraMode.get(engine.CameraEntity)

    if (cameraEntity.mode == CameraType.CT_THIRD_PERSON) {
        console.log('The player is using the 3rd person camera')
    } else {
        console.log('The player is using the 1st person camera')
    }
}

engine.addSystem(checkCameraMode)
