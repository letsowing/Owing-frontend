import axiosInstance from '@utils/httpCommons'

import { Character } from '@types'

interface CharacterCoord {
  x: number
  y: number
}

interface CharacterGraph {
  nodes: Character[]
  edges: CharacterRelationship[]
}

interface CharacterRelationship {
  sourceId: number
  targetId: number
  label: string
  connectionType: 'DIRECTIONAL' | 'BIDIRECTIONAL'
  sourceHandleStr: string
  targetHandleStr: string
}

// GET /api/casting/{castingId}
export const getCharacter = async (castingId: string): Promise<Character> => {
  try {
    const response = await axiosInstance.get<Character>(
      `/api/casting/${castingId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get character:', error)
    throw error
  }
}

// PUT /api/casting/{castingId}
export const putCharacter = async (
  castingId: string,
  data: Partial<Character>,
): Promise<Character> => {
  try {
    const response = await axiosInstance.put<Character>(
      `/api/casting/${castingId}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update character:', error)
    throw error
  }
}

// DELETE /api/casting/{castingId}
export const deleteCharacter = async (castingId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/casting/${castingId}`)
  } catch (error) {
    console.error('Failed to delete character:', error)
    throw error
  }
}

// PUT /api/casting/{castingId}/coord
export const putCharacterCoord = async (
  castingId: string,
  data: CharacterCoord,
): Promise<Character> => {
  try {
    const response = await axiosInstance.put<Character>(
      `/api/casting/${castingId}/coord`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update character coord:', error)
    throw error
  }
}

// PUT /api/casting/relationship/{uuid}
export const putCharacterRelationship = async (
  uuid: string,
  data: CharacterRelationship,
): Promise<CharacterRelationship> => {
  try {
    const response = await axiosInstance.put<CharacterRelationship>(
      `/api/casting/relationship/${uuid}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update character relationship:', error)
    throw error
  }
}

// DELETE /api/casting/relationship/{uuid}
export const deleteCharacterRelationship = async (
  uuid: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/casting/relationship/${uuid}`)
  } catch (error) {
    console.error('Failed to delete character relationship:', error)
    throw error
  }
}

// GET /api/casting
export const getCharacters = async (folderId: string): Promise<Character[]> => {
  try {
    const response = await axiosInstance.get<Character[]>(
      `/api/casting?folderId=${folderId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get characters:', error)
    throw error
  }
}

// POST /api/casting
export const postCharacter = async (
  data: Partial<Character>,
): Promise<Character> => {
  try {
    const response = await axiosInstance.post('/api/casting', data)
    return response.data
  } catch (error) {
    console.error('Failed to create character:', error)
    throw error
  }
}

// POST /api/casting/relationship
export const postCharacterRelationship = async (
  data: Omit<CharacterRelationship, 'uuid'>,
): Promise<CharacterRelationship> => {
  try {
    const response = await axiosInstance.post<CharacterRelationship>(
      '/api/casting/relationship',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to create character relationship:', error)
    throw error
  }
}

// POST /api/casting/image
export const uploadCharacterImage = async (
  data: Partial<Character>,
): Promise<string> => {
  try {
    const response = await axiosInstance.post<string>(
      '/api/casting/image',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to upload character image:', error)
    throw error
  }
}

// GET /api/casting/graph
export const getCharacterGraph = async (
  projectId: string,
): Promise<CharacterGraph> => {
  try {
    const response = await axiosInstance.get<CharacterGraph>(
      `/api/casting/graph?projectId=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get character graph:', error)
    throw error
  }
}
