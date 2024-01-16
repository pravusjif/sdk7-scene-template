import {
  engine,
  Transform, 
    // PointerFilterMode
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Cube } from './components'
import { createCube } from './factory'
import {openExternalUrl} from "~system/RestrictedActions";

export function setupUi() {
  // ReactEcsRenderer.setUiRenderer(uiComponent)
  // ReactEcsRenderer.setUiRenderer(uiComponent2)
  ReactEcsRenderer.setUiRenderer(uiComponent3)
  // ReactEcsRenderer.setUiRenderer(uiComponent4)
  // ReactEcsRenderer.setUiRenderer(uiComponent5)
  // ReactEcsRenderer.setUiRenderer(uiComponent6)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 400,
      height: 230,
      margin: '16px 0 8px 270px',
      padding: 4,
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 50,
          margin: '8px 0'
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'images/scene-thumbnail.png',
          },
        }}
        uiText={{ value: 'SDK7', fontSize: 18 }}
      />
      <Label
        onMouseDown={() => {console.log('Player Position clicked !')}}
        value={`Player: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 } }
      />
      <Label
        onMouseDown={() => {console.log('# Cubes clicked !')}}
        value={`# Cubes: ${[...engine.getEntitiesWith(Cube)].length}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 } }
      />
      <Button
        uiTransform={{ width: 100, height: 40, margin: 8 }}
        value='Spawn cube'
        variant='primary'
        fontSize={14}
        onMouseDown={() => {
          createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
        }}
      />
     </UiEntity>
  </UiEntity>
)

const uiComponent2 = () => (
    <UiEntity
        uiTransform={{
            width: 400,
            height: 230,
            positionType: "absolute",
            alignSelf: "center",
            position: {
                left: "35%"
            }
        }}
        uiBackground={{
            color: Color4.create(0.5, 0.8, 0.1, 0.6)
        }}
    >
        <UiEntity
            uiTransform={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
        >
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: 50,
                    margin: '8px 0',
                    pointerFilter: 'block'
                }}
                uiBackground={{
                    textureMode: 'center',
                    color: Color4.Yellow()
                }}
            />
            <Label
                value={'BLOCKS POINTER'}
                fontSize={18}
                uiTransform={{
                    width: 150,
                    height: 30,
                    pointerFilter: 'none',
                    positionType: "absolute",
                    alignSelf: "center",
                    position: {
                        left: "25%",
                        top: "30%"
                    }
                }}
                onMouseDown={() => {}}
            />
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: 30,
                    position: {
                        top: "10%"
                    },
                    pointerFilter: 'none'
                }}
                uiText={{
                    value:'DOESNT BLOCK POINTER',
                    fontSize:18
                }}
            />
            <Button
                uiTransform={{ width: 100, height: 40, margin: 8 }}
                value='THIS IS A BUTTON'
                variant='primary'
                fontSize={14}
                onMouseDown={() => {
    
                }}
            />
        </UiEntity>
    </UiEntity>
)

const uiComponent3 = () => (
    <UiEntity
        uiTransform={{
            width: 400,
            height: 200,
            positionType: "absolute",
            alignSelf: "center",
            position: {
                left: "35%"
            }
        }}
        uiBackground={{
            color: Color4.Green()
        }}
        // onMouseUp={() => {console.log('clicked!')}}
        onMouseDown={() => {
            openExternalUrl({url: "https://google.com"})
        }}
    />
)

const uiComponent4 = () => (
  <UiEntity
    uiTransform={{
      width: "auto",
      height: "auto",
      alignSelf: "center",
    }}
    uiBackground={{
      color: Color4.Red()
    }}
    uiText={{
      value:'IA IA CTHULHU FHTAGHN!',
      fontSize:18
    }}
  />
)

const uiComponent5 = () => (
  <UiEntity
    uiTransform={{
      width: "auto",
      height: "auto",
      positionType: "absolute",
      position: {
        left: "15%",
        top: "40%"
      }
    }}
    uiBackground={{
      color: Color4.Red()
    }}
    uiText={{
      value:'IA IA CTHULHU FHTAGHN!',
      fontSize:18
    }}
  />
)

const uiComponent6 = () => (
    <UiEntity
        uiTransform={{
            positionType: 'absolute',
            width: 400,
            height: 300,
            position: {
                left: "25%",
                top: "30%"
            }
        }}
        uiBackground={{
            textureMode:'stretch',
            color: Color4.Gray()
        }}
    >
        <Button
            uiTransform={{
                width: "auto",
                height: "auto",
                margin: 8,
                alignSelf: "center"
            }}
            value='THIS IS A BUTTON'
            variant='primary'
            fontSize={14}
            onMouseDown={() => {
                //...
            }}
        />

        <UiEntity
            uiTransform={{
                width: "auto",
                height: "auto",
                // width: 100,
                // height: 50,
                positionType: "absolute",
                position: {
                    left: "55%",
                    top: "65%"
                }
            }}
            uiBackground={{
                color: Color4.Red()
            }}
        >
            <UiEntity
                uiTransform={{
                    width: "auto",
                    height: "auto",
                    positionType: "relative",
                }}
                uiText={{
                    value:'IA IA CTHULHU FHTAGHN!',
                    fontSize:18
                }}
            />

            <UiEntity>
                <Label
                    value = {"<b>" + 'A LABEL!!!!!!' + "</b>"}
                    fontSize = {12}
                    font = "monospace"
                    color = {Color4.Yellow()}
                    uiTransform={{
                        width: "auto",
                        height: "auto",
                        positionType: 'relative'
                    }}
                />
            </UiEntity>
        </UiEntity>
    </UiEntity>
)

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

