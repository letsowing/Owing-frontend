import { useCallback } from 'react'

import { useCharacter } from '@hooks/useCharacter'
import { useFlow } from '@hooks/useFlow'

import { generateUUID } from '@utils/uuid'

import { Character } from '@types'

export const useCharFlow = () => {
  const {
    characters,
    addCharacter: addCharacterToStore,
    updateCharacter: updateCharacterInStore,
    deleteCharacter: deleteCharacterFromStore,
    getCharacterById,
  } = useCharacter()

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeAdd,
    onNodeRemove,
    onNodeUpdate,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  } = useFlow()

  // 캐릭터 변경사항을 노드에 동기화
  // useEffect(() => {
  //   const characterIds = new Set(characters.map((char) => char.id))
  //   const nodeIds = new Set(nodes.map((node) => node.data.characterId))

  //   // 새로운 캐릭터에 대한 노드 추가
  //   characters.forEach((char) => {
  //     if (!nodeIds.has(char.id)) {
  //       onNodeAdd(
  //         {
  //           characterId: char.id,
  //           name: char.name,
  //           role: char.role,
  //           image: char.imageUrl,
  //         },
  //         { x: Math.random() * 500, y: Math.random() * 500 }, // 랜덤 위치
  //       )
  //     }
  //   })

  //   // 삭제된 캐릭터의 노드 제거
  //   nodes.forEach((node) => {
  //     if (!characterIds.has(node.id)) {
  //       onNodeRemove(node.id)
  //     }
  //   })

  //   // 기존 노드 업데이트
  //   nodes.forEach((node) => {
  //     const character = getCharacterById(node.id)
  //     if (
  //       character &&
  //       (node.data.name !== character.name ||
  //         node.data.role !== character.role ||
  //         node.data.image !== character.imageUrl)
  //     ) {
  //       onNodeUpdate(node.id, {
  //         name: character.name,
  //         role: character.role,
  //         image: character.imageUrl,
  //       })
  //     }
  //   })
  // }, [
  //   characters,
  //   nodes,
  //   onNodeAdd,
  //   onNodeRemove,
  //   onNodeUpdate,
  //   getCharacterById,
  // ])

  const addCharacter = useCallback(
    (character: Character) => {
      const newCharacter = {
        ...character, // 받은 characterData와 병합
        id: generateUUID(), // getUUID로 새로운 id 생성
      }
      addCharacterToStore(newCharacter)
      onNodeAdd(
        newCharacter.id,
        {
          name: newCharacter.name,
          role: newCharacter.role,
          image: newCharacter.imageUrl,
        },
        { x: Math.random() * 500, y: Math.random() * 500 }, // 랜덤 위치
      )
      return newCharacter
    },
    [addCharacterToStore, onNodeAdd],
  )

  const updateCharacter = useCallback(
    (character: Character) => {
      updateCharacterInStore(character)
      const node = nodes.find((n) => n.id === character.id)
      if (node) {
        onNodeUpdate(node.id, {
          name: character.name,
          role: character.role,
          image: character.imageUrl,
        })
      }
    },
    [updateCharacterInStore, onNodeUpdate, nodes],
  )

  const deleteCharacter = useCallback(
    (id: string) => {
      if (getCharacterById(id)) {
        deleteCharacterFromStore(id)
      }
      if (nodes.find((n) => n.id === id)) {
        onNodeRemove(id)
      }
    },
    [deleteCharacterFromStore, onNodeRemove, nodes, getCharacterById],
  )

  return {
    characters,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterById,
  }
}
