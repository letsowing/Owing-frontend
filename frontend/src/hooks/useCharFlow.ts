import { useCallback, useRef } from 'react'

import { useCharacter } from '@hooks/useCharacter'
import { useFlow } from '@hooks/useFlow'

import { generateUUID } from '@utils/uuid'

import {
  Character,
  CharacterRelationship,
  CustomEdge,
  CustomNode,
} from '@types'
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
      const nodes: CustomNode[] = initialNodes.map((node) => ({
        id: node.id?.toString() || generateUUID(),
        position: node.position || { x: 0, y: 0 },
        type: 'customNode',
        data: {
          name: node.name || '',
          role: node.role || '',
          image: node.imageUrl || '',
        },
      }))
      onNodesSet(nodes)
      const edges: CustomEdge[] = initialRelationships.map((rel) => ({
        id: rel.uuid ?? generateUUID(),
        source: rel.sourceId.toString(),
        target: rel.targetId.toString(),
        label: rel.label,
        type: rel.type,
        sourceHandle: rel.sourceHandle.toLowerCase(),
        targetHandle: rel.targetHandle.toLowerCase(),
      }))
      onEdgesSet(edges)
    },
    [onNodesSet, onEdgesSet],
  )

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
      return character
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
        console.log(id)
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
