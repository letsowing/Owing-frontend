import { useCallback, useRef } from 'react'

import { useCharacter } from '@hooks/useCharacter'
import { useFlow } from '@hooks/useFlow'

import { generateUUID } from '@utils/uuid'

import { Character, CharacterRelationship } from '@types'
import { Connection, Edge } from '@xyflow/react'

export const useCharFlow = () => {
  const {
    characters,
    setCharacters: setCharacterStore,
    addCharacter: addCharacterToStore,
    updateCharacter: updateCharacterInStore,
    deleteCharacter: deleteCharacterFromStore,
    getCharacterById,
  } = useCharacter()

  const {
    nodes,
    edges,
    reconnect,
    removeEdge,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesSet,
    onEdgesSet,
    onNodeAdd,
    onNodeRemove,
    onNodeUpdate,
    isBidirectionalEdge,
    setIsBidirectionalEdge,
    onEdgeLabelChange,
  } = useFlow()

  const edgeReconnectSuccessful = useRef(true)

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false
  }, [])

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true
      reconnect(oldEdge, newConnection)
    },
    [reconnect],
  )

  const onReconnectEnd = useCallback(
    (_Event: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        removeEdge(edge.id)
      }
    },
    [removeEdge],
  )

  // 초기화 함수들
  const setInitialCharacters = useCallback(
    (initialCharacters: Character[]) => {
      setCharacterStore(initialCharacters)
    },
    [setCharacterStore],
  )

  const setInitialFlow = useCallback(
    (
      initialNodes: Partial<Character>[],
      initialRelationships: CharacterRelationship[],
    ) => {
      const nodes = initialNodes.map((node) => ({
        id: node.id?.toString() || generateUUID(),
        position: node.position || { x: 0, y: 0 },
        type: 'customNode',
        data: {
          name: node.name || '',
          role: node.role || '',
          image: node.imageUrl || '',
        },
      }))

      const edges = initialRelationships.map((rel) => ({
        id: rel.uuid ?? generateUUID(),
        source: rel.sourceId.toString(),
        target: rel.targetId.toString(),
        label: rel.label,
        type: rel.type,
        sourceHandle: rel.sourceHandle.toLowerCase(),
        targetHandle: rel.targetHandle.toLowerCase(),
      }))

      onNodesSet(nodes)
      onEdgesSet(edges)
    },
    [onNodesSet, onEdgesSet],
  )

  // 동기화 함수들
  const addCharacter = useCallback(
    (character: Character) => {
      addCharacterToStore(character)
      onNodeAdd(
        character.id,
        {
          name: character.name,
          role: character.role,
          image: character.imageUrl,
        },
        character.position,
      )
    },
    [addCharacterToStore, onNodeAdd],
  )

  const updateCharacter = useCallback(
    (character: Character) => {
      const node = nodes.find((n) => n.id === character.id)
      if (!node) return

      updateCharacterInStore(character)
      onNodeUpdate(character.id, {
        name: character.name,
        role: character.role,
        image: character.imageUrl,
      })
    },
    [updateCharacterInStore, onNodeUpdate, nodes],
  )

  const deleteCharacter = useCallback(
    (id: string) => {
      const exists = getCharacterById(id) || nodes.find((n) => n.id === id)
      if (!exists) return

      deleteCharacterFromStore(id)
      onNodeRemove(id)
    },
    [deleteCharacterFromStore, onNodeRemove, nodes, getCharacterById],
  )

  return {
    characters,
    nodes,
    edges,
    edgeReconnectSuccessful,
    setInitialCharacters,
    setInitialFlow,
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
